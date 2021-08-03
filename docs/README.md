classy-store / [Exports](modules.md)

# classy-store

class stores for svelte. this is still a WIP.

## Usage

```bash
npm i classy-store

# yarn add classy-store
```

You must enable `experimentalDecorators` in your tsconfig to use the `@mutator` decorator.

### Define a store

```typescript
import { mutator, Store } from "classy-store";
export class Spike extends Store<Spike> {
name: string;
	count: number;
	constructor(name: string, count?: number) {
		super();
		this.name = name;
		this.count = count ?? 0;
	}
	@mutator // <-- wraps your method so that updates are fired appropriately
	inc(n = 1) {
		this.count = this.count + n;
		// if you do not use @mutator, you can also:
		// this.broadcast()
		return this.count;
	}

	@mutator // <-- works with promises too
	async delayed() {
		await new Promise((res) => setTimeout(res, 500));
		this.count + 100;
	}
}
```

### Use the store

```html
<script lang="ts">
	import { Spike } from '$lib/spike';
	let spike = new Spike('this is a store');
</script>

<h1>Hello {$spike.name}</h1>

<h2>Bindings</h2>
<input bind:value={$spike.name} />

<h3>Using @mutator allows for methods:</h3>
<button on:click={() => $spike.inc()}>{$spike.count}</button>

<h3>methods can be promises:</h3>
<button on:click={() => { $spike.delayed(); }}>level up</button>
```

#### @mutator

`@mutator` is a simple wrapper around your method which executes 
`store.broadcast` after your method is finished altering its state.If your method returns a `Promise`, `broadcast` is called immediately and after the promise has been resolved or rejected.

- If the `Promise` he mutator sets `executing.{methodName}` to `Execution.Running`. 
- If the `Promise` resolves successfully, `executing.{methodName}` is set to `Execution.Resolved`. 
- If the `Promise` throws an error, `executing.{methodName}` is set to  `Execution.Rejected` and an `"error"` event is emitted. 

```html
<script lang="ts">
	import { Spike } from '$lib/spike';
	import { Execution } from 'classy-store'
	let spike = new Spike('this is a store');
	let disabled = false
	$: disabled = $spike.executing.delayed === Execution.Running
</script>
<button on:click={spike.delayed()} {disabled || undefined}>{$spike.count}</button>
```

#### errors

The default error handler stores `errors` in a queue on your store, with a configurable max size 
via the `maxErrorsToStore` property on `Options` passed to the `Store` constructor.

#### Derived stores

The stores can be derived:

```html
<script lang="ts">
	import { Spike } from "$lib/spike";
	import { derived } from "svelte/store";
	let spike = new Spike("this is a store");
	const screaming = derived(spike, ($spike) => $spike.name.toUpperCase());
</script>
<h1>hello {$screaming}</h1>

<input bind:value="{$spike.name}" />
```

#### Custom Events
The stores are event emitters although more work is needed on that front.

If you wish to emit custom events, type your store such as:

```typescript
interface MyEvents {
	example: (value: string) => void;
}

class Spike extends Store<Spike, MyEvents> {
	constructor() {
		super();
		this.emit("example", "example should be typed");
	}
}
```
#### Partial updates

You can update the store with a new instance or a partial of the fields:

```html
<script lang="ts">
	import { Spike } from "$lib/spike";
	let spike = new Spike("this is a store");
</script>

<h1>Hello {$spike.name}</h1>
<button on:click={()=> { $spike.set({name:"..."})}}>
```

Promises

## Notes

Please feel free to create an issue for any question, feedback or bug you encounter.

### Dependencies

-   [typed-emitter](https://github.com/andywer/typed-emitter)
-   [events](https://github.com/browserify/events)

## TODO:

-   better name
-   tests
-   better docs

## License
MIT