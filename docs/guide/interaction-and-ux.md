# Interaction and UX

Client-side validation is a UX tool for your users, as such there are many strategies regarding **when to validate?**.

There are multiple common strategies:

- **Aggressive**: Triggered when the user presses a key (on `input`).
- **Passive**: Triggered when the form is submitted.
- **Lazy**: Triggered when the user leaves the input (on `blur` or `change`).
- **Eager**: Is a combination of `aggressive` and `lazy`, as it first validates when the user leaves the input (on `blur` or `change`) then if the input is invalid it will behave aggressively until the input is valid again and it will go back to being lazy.

## Interaction Modes

vee-validate implements those common strategies for you, which are called **"interaction modes"**. You can set the mode either globally with `setInteractionMode` or with `mode` prop on the `ValidationProvider`.

```js{1,3}
import { setInteractionMode } from 'vee-validate';

setInteractionMode('lazy');
```

```vue{2}
<ValidationProvider
  mode="lazy"
  rules="required"
  v-slot="{ errors }"
>
  <!-- Some input -->
</ValidationProvider>
```

Here are some examples for the default modes available:

### Aggressive (Default)

This is the default mode for vee-validate. Validates on `input` and `blur`.

<RuleDemo rule="required|min:3|alpha" />

```vue{2}
<ValidationProvider
  mode="aggressive"
  rules="required|min:3|alpha"
  v-slot="{ errors }"
>
  <input v-model="value" type="text" placeholder="type something">
  <span>{{ errors[0] }}</span>
</ValidationProvider>
```

### Lazy

Validates on `change` or `blur`.

<RuleDemo rule="required|min:3|alpha" mode="lazy" />

```vue{2}
<ValidationProvider
  mode="lazy"
  rules="required|min:3|alpha"
  v-slot="{ errors }"
>
  <input v-model="value" type="text" placeholder="type something">
  <span>{{ errors[0] }}</span>
</ValidationProvider>
```

### Passive

Does not validate unless `validate` is called explicitly.

<RuleDemo rule="required|min:3|alpha" mode="passive" />

```vue{2}
<ValidationProvider
  mode="passive"
  rules="required|min:3|alpha"
  v-slot="{ errors, validate }"
>
  <input v-model="value" type="text" placeholder="type something">
  <span>{{ errors[0] }}</span>
  <button @click="validate()">Validate</button>
</ValidationProvider>
```

### Eager

This is arguably a better UX for your users since it isn't aggressive initially. It is **eager to pass** which is reason of its name.

Behaves like **lazy** when the field wasn't interacted with yet, and if it is invalid it will be **aggressive** until the input becomes valid again.

<RuleDemo rule="required|min:3|alpha" mode="eager" />

```vue{2}
<ValidationProvider
  mode="eager"
  rules="required|min:3|alpha"
  v-slot="{ errors }"
>
  <input v-model="value" type="text" placeholder="type something">
  <span>{{ errors[0] }}</span>
</ValidationProvider>
```

## Custom Modes

You can define new custom modes, interaction modes are a simple function that takes a context object with the following structure:

```ts
interface ModeContext {
  errors: string[];
  value: any;
  flags: ValidationFlags;
}
```

For example the **eager** rule implementation looks like this:

```js
const eager = ({ errors }) => {
  if (errors.length) {
    return {
      on: ['input', 'change']
    };
  }

  return {
    on: ['change', 'blur']
  };
};
```

You can pass the function directly to the `mode` prop on the `ValidationProvider`:

```vue{2,16-24}
<ValidationProvider
  :mode="custom"
  rules="required"
  v-slot="{ errors }"
>
  <input v-model="value" type="text" placeholder="type something">
  <span>{{ errors[0] }}</span>
</ValidationProvider>

<script>
export default {
 data: () => ({
    value: ''
  }),
  methods: {
    custom (context) {
      if (context.value === 'yes') {
        return {
          on: ['input']
        };
      }

      return { on: ['change'] };
    }
  }
};
</script>
```

Or you can set it globally with `setInteractionMode`:

```js
import { setInteractionMode } from 'vee-validate';

setInteractionMode('custom', (context) => {
  if (context.value === 'yes') {
    return {
      on: ['input']
    };
  }

  return { on: ['change'] };
});
```

:::tip Note
  The `mode` prop takes precedence over the globally configured mode, using `setInteraction` in runtime will only affect the new Providers created after its call.
:::
