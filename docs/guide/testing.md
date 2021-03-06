# Testing

Testing is extremely important to give you confidence in your code. VeeValidate isn't special when it comes to testing, but a lot of issues seemed to miss a few important details about testing.

In this guide we will talk about testing in general and the best practices of testing frontend validation.

:::tip
  The following examples will use `vue-test-utils` API to conduct the tests.
:::

## Asynchronous Testing

VeeValidate is primarily asynchronous, so you would need to disable `vue-test-utils` sync mode. And you will use `flush-promises` to wait for the updated to take effect.

To disable the sync mode, when mounting the component set the `sync` option to false in the mounting options.

```js
const wrapper = mount(MyComponent, { sync: false });
```

After triggering an event like an `input` event, make sure to call `flushPromises` before checking the UI for changes:

```js
await flushPromises();
```

## Test behavior, not implementation

Generally you want to test how your UI behaves rather than how it does it.

> “I don’t care how you come up with the answer, just make sure that the answer is correct under this set of circumstances”

Consider this test for example, we have this component:

```vue
<div>
  <ValidationProvider rules="required" v-slot="{ errors }" ref="provider">
    <input v-model="value" type="text">
    <span class="error">{{ errors[0] }}</span>
  </ValidationProvider>
</div>
```

A test case could look like this:

```js
const wrapper = mount(MyComponent, { sync: false });

wrapper.find('input').setValue('');
// flush the pending validation.
await flushPromises();
// Get the error message from the ref
const error = wrapper.vm.$refs.provider.messages[0];
expect(error).toBeTruthy();
```

While this test would work fine, it could fail easily, since `messages` is internal property and may change at anytime without notice and also if you decided to swap vee-validate for something else it will immediately break, you want to test your UI the way the user would use it.

So instead of checking the internal messages, let's describe what the user will actually experience via a short story and simulate that.

> "The user should **see an error** when they input an empty value"

We could test that like this,

```js
const wrapper = mount(MyComponent, { sync: false });

wrapper.find('input').setValue('');
// flush the pending validation.
await flushPromises();

// Check if the element has text inside it.
const errorEl = wrapper.find('.error');
expect(error.text()).toBeTruthy();
```

This test is much more robust than the previous one, if you were to change the validation your tests would still work. Because we are not testing implementation details, we care if the validation is done, we don't care how it is being done.

## Testing Error Messages

Following upon the previous idea, testing specific error messages is also very flaky. Assume you have a language for which your messages may change at any time, for example they are generated by a backend service, or they can be improved as you iterate through your app. You want to keep improving those messages grammar-wise or style wise.

For example you have this in your tests:

```js
expect(error.text()).toBe('The name field is required');
```

The problem with this, is that you may change the style to `This field is required`. Or even change the field name for something less ambiguous like `full name`. Ask your self this: **do you really care if that specific message is displayed? or are you are only interested in having a message appear to your user?**

Depending on your answer, you might change how the test is conducted.

If you want to check if any message is going to be displayed, any of these would do:

```js
// Any message
expect(error.text()).toBeTruthy();

// we only care if the message has `required`.
expect(error.text()).toContain('required');
```
