# classy-store

class stores for svelte. this is very much a WIP.

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
  @mutator
  inc(n = 1) {
    this.count = this.count + n;
    // if you do not use @mutator, you can also:
    // this.broadcast()
    return this.count;
  }

  @mutator
  async delayed() {
    const delay = new Promise((res) => setTimeout(res, 500));
    await delay;
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

## Notes

### Dependencies

- [tiny-typed-emitter](https://github.com/binier/tiny-typed-emitter/)
- [events](https://github.com/browserify/events)

## TODO:

- better name
- tests
- better handling around promises?
- better docs
