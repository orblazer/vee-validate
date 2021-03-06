import Vue, { CreateElement, VNode, VueConstructor } from 'vue';
import { isCallable, values, findIndex, warn } from '../utils';
import { ValidationResult, InactiveRefCache, VeeObserver, VNodeWithVeeContext } from '../types';
import { ValidationProvider } from './Provider';
import { normalizeChildren } from '../utils/vnode';

const flagMergingStrategy: {
  [x: string]: 'every' | 'some';
} = {
  pristine: 'every',
  dirty: 'some',
  touched: 'some',
  untouched: 'every',
  valid: 'every',
  invalid: 'some',
  pending: 'some',
  validated: 'every'
};

function mergeFlags(lhs: any, rhs: any, strategy: string) {
  const stratName = flagMergingStrategy[strategy];

  return [lhs, rhs][stratName](f => f);
}

type ProviderInstance = InstanceType<typeof ValidationProvider>;

let OBSERVER_COUNTER = 0;

function data() {
  const refs: Record<string, ProviderInstance> = {};
  const refsByName: typeof refs = {};
  const inactiveRefs: Record<string, InactiveRefCache> = {};
  // FIXME: Not sure of this one can be typed, circular type reference.
  const observers: any[] = [];

  return {
    refs,
    refsByName,
    observers,
    inactiveRefs
  };
}
type withObserverNode = VueConstructor<
  Vue & {
    $_veeObserver: VeeObserver;
    $vnode: VNodeWithVeeContext;
  }
>;

export const ValidationObserver = (Vue as withObserverNode).extend({
  name: 'ValidationObserver',
  provide() {
    return {
      $_veeObserver: this
    };
  },
  inject: {
    $_veeObserver: {
      from: '$_veeObserver',
      default() {
        if (!this.$vnode.context.$_veeObserver) {
          return null;
        }

        return this.$vnode.context.$_veeObserver;
      }
    }
  },
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    vid: {
      type: String,
      default() {
        return `obs_${OBSERVER_COUNTER++}`;
      }
    },
    slim: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data,
  computed: {
    ctx() {
      const ctx = {
        errors: {},
        passes: (cb: Function) => {
          return this.validate().then(result => {
            if (result) {
              return cb();
            }
          });
        },
        validate: (...args: any[]) => this.validate(...args),
        reset: () => this.reset()
      };
      return [
        ...values(this.refs),
        ...Object.keys(this.inactiveRefs).map(key => {
          return {
            vid: key,
            flags: this.inactiveRefs[key].flags,
            messages: this.inactiveRefs[key].errors
          };
        }),
        ...this.observers
      ].reduce((acc: any, provider: any) => {
        Object.keys(flagMergingStrategy).forEach(flag => {
          const flags = provider.flags || provider.ctx;
          if (!(flag in acc)) {
            acc[flag] = flags[flag];
            return;
          }

          acc[flag] = mergeFlags(acc[flag], flags[flag], flag);
        });

        acc.errors[provider.vid] =
          provider.messages ||
          values(provider.ctx.errors).reduce((errs: any[], obsErrors) => {
            return errs.concat(obsErrors);
          }, []);

        return acc;
      }, ctx);
    }
  },
  created() {
    if (this.$_veeObserver) {
      this.$_veeObserver.subscribe(this, 'observer');
    }
  },
  activated() {
    if (this.$_veeObserver) {
      this.$_veeObserver.subscribe(this, 'observer');
    }
  },
  deactivated() {
    if (this.$_veeObserver) {
      this.$_veeObserver.unsubscribe(this, 'observer');
    }
  },
  beforeDestroy() {
    if (this.$_veeObserver) {
      this.$_veeObserver.unsubscribe(this, 'observer');
    }
  },
  render(h: CreateElement): VNode {
    const children = normalizeChildren(this, this.ctx);

    return this.slim && children.length <= 1 ? children[0] : h(this.tag, { on: this.$listeners }, children);
  },
  methods: {
    subscribe(subscriber: any, kind = 'provider') {
      if (kind === 'observer') {
        this.observers.push(subscriber);
        return;
      }

      this.refs = { ...this.refs, ...{ [subscriber.vid]: subscriber } };
      this.refsByName = { ...this.refsByName, ...{ [subscriber.name]: subscriber } };
      if (subscriber.persist) {
        this.restoreProviderState(subscriber);
      }
    },
    unsubscribe({ vid, name }: any, kind = 'provider') {
      if (kind === 'provider') {
        this.removeProvider({ vid, name });
      }

      const idx = findIndex(this.observers, o => o.vid === vid);
      if (idx !== -1) {
        this.observers.splice(idx, 1);
      }
    },
    async validate({ silent = false }: { silent?: boolean } = {}) {
      const results = await Promise.all([
        ...values(this.refs)
          .filter(r => !r.disabled)
          .map((ref: any) => ref[silent ? 'validateSilent' : 'validate']().then((r: ValidationResult) => r.valid)),
        ...this.observers.filter(o => !o.disabled).map((obs: any) => obs.validate({ silent }))
      ]);

      return results.every(r => r);
    },
    reset() {
      Object.keys(this.inactiveRefs).forEach(key => {
        this.$delete(this.inactiveRefs, key);
      });

      return [...values(this.refs), ...this.observers].forEach(ref => ref.reset());
    },
    restoreProviderState(provider: ProviderInstance) {
      const id = provider.vid.indexOf('_vee_') === 0 ? provider.name : provider.vid;
      const state = this.inactiveRefs[id || provider.vid];
      if (!state) {
        return;
      }

      provider.setFlags(state.flags);
      provider.applyResult(state);
      this.$delete(this.inactiveRefs, provider.vid);
    },
    removeProvider({ vid, name }: { vid: string; name: string }) {
      const provider = this.refs[vid];
      // save it for the next time.
      if (provider && provider.persist) {
        const id = vid.indexOf('_vee_') === 0 ? name : vid;
        /* istanbul ignore next */
        if (process.env.NODE_ENV !== 'production') {
          if (vid.indexOf('_vee_') === 0 && !name) {
            warn(
              'Please provide a `vid` or a `name` prop when using `persist`, there might be unexpected issues otherwise.'
            );
          }
        }

        this.inactiveRefs[id || vid] = {
          flags: provider.flags,
          errors: provider.messages,
          failedRules: provider.failedRules
        };
      }

      this.$delete(this.refs, vid);
      this.$delete(this.refsByName, name);
    },
    setErrors(errors: Record<string, string[]>) {
      Object.keys(errors).forEach(key => {
        const provider = this.refs[key] || this.refsByName[key];
        if (!provider) return;

        provider.setErrors(errors[key] || []);
      });
    }
  }
});
