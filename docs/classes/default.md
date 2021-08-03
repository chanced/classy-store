[classy-store](../README.md) / [Exports](../modules.md) / default

# Class: default<T, E\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`default`](default.md)<`T`, `E`\> |
| `E` | `void` |

## Hierarchy

- `Base`<[`Events`](../interfaces/Events.md)<`T`, `E`\> & `Omit`<`E`, keyof [`Events`](../interfaces/Events.md)<`T`, `E`\>\>\>

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](default.md#constructor)

### Properties

- [errors](default.md#errors)
- [executing](default.md#executing)
- [maxErrorsToStore](default.md#maxerrorstostore)
- [starter](default.md#starter)
- [subscribers](default.md#subscribers)
- [unsubscriber](default.md#unsubscriber)

### Methods

- [addListener](default.md#addlistener)
- [broadcast](default.md#broadcast)
- [emit](default.md#emit)
- [eventNames](default.md#eventnames)
- [getMaxListeners](default.md#getmaxlisteners)
- [listenerCount](default.md#listenercount)
- [listeners](default.md#listeners)
- [off](default.md#off)
- [on](default.md#on)
- [once](default.md#once)
- [prependListener](default.md#prependlistener)
- [prependOnceListener](default.md#prependoncelistener)
- [rawListeners](default.md#rawlisteners)
- [removeAllListeners](default.md#removealllisteners)
- [removeListener](default.md#removelistener)
- [set](default.md#set)
- [setMaxListeners](default.md#setmaxlisteners)
- [setupErrorHandler](default.md#setuperrorhandler)
- [subscribe](default.md#subscribe)
- [update](default.md#update)

## Constructors

### constructor

• **new default**<`T`, `E`\>(`options?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`default`](default.md)<`T`, `E`, `T`\> |
| `E` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options?` | [`Options`](../interfaces/Options.md)<`T`, `E`\> \| [`StartStopNotifier`](../modules.md#startstopnotifier)<`T`\> |

#### Overrides

Base&lt;
	Events&lt;T, E\&gt; &amp; Omit&lt;E, keyof Events&lt;T, E\&gt;\&gt;
\&gt;.constructor

#### Defined in

[src/store.ts:64](https://github.com/chanced/classy-store/blob/12b6fd3/src/store.ts#L64)

## Properties

### errors

• `Readonly` **errors**: `any`[]

#### Defined in

[src/store.ts:62](https://github.com/chanced/classy-store/blob/12b6fd3/src/store.ts#L62)

___

### executing

• `Readonly` **executing**: `Partial`<{ [K in string \| number \| symbol]: Execution}\>

#### Defined in

[src/store.ts:60](https://github.com/chanced/classy-store/blob/12b6fd3/src/store.ts#L60)

___

### maxErrorsToStore

• `Protected` **maxErrorsToStore**: `number`

#### Defined in

[src/store.ts:58](https://github.com/chanced/classy-store/blob/12b6fd3/src/store.ts#L58)

___

### starter

• `Private` `Readonly` **starter**: [`StartStopNotifier`](../modules.md#startstopnotifier)<`T`\>

#### Defined in

[src/store.ts:55](https://github.com/chanced/classy-store/blob/12b6fd3/src/store.ts#L55)

___

### subscribers

• `Protected` **subscribers**: `Set`<`SubscribeInvalidateTuple`<`T`\>\>

#### Defined in

[src/store.ts:57](https://github.com/chanced/classy-store/blob/12b6fd3/src/store.ts#L57)

___

### unsubscriber

• `Private` **unsubscriber**: [`Unsubscriber`](../modules.md#unsubscriber)

#### Defined in

[src/store.ts:54](https://github.com/chanced/classy-store/blob/12b6fd3/src/store.ts#L54)

## Methods

### addListener

▸ **addListener**<`E`\>(`event`, `listener`): [`default`](default.md)<`T`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | [`Events`](../interfaces/Events.md)<`T`, `E`\> & `Omit`<`E`, keyof [`Events`](../interfaces/Events.md)<`T`, `E`\>\>[`E`] |

#### Returns

[`default`](default.md)<`T`, `E`\>

#### Inherited from

Base.addListener

#### Defined in

node_modules/typed-emitter/index.d.ts:24

___

### broadcast

▸ **broadcast**(): `void`

#### Returns

`void`

#### Defined in

[src/store.ts:127](https://github.com/chanced/classy-store/blob/12b6fd3/src/store.ts#L127)

___

### emit

▸ **emit**<`E`\>(`event`, ...`args`): `boolean`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `...args` | `Arguments`<[`Events`](../interfaces/Events.md)<`T`, `E`\> & `Omit`<`E`, keyof [`Events`](../interfaces/Events.md)<`T`, `E`\>\>[`E`]\> |

#### Returns

`boolean`

#### Inherited from

Base.emit

#### Defined in

node_modules/typed-emitter/index.d.ts:34

___

### eventNames

▸ **eventNames**(): (`string` \| `symbol` \| `Exclude`<keyof `E`, keyof [`Events`](../interfaces/Events.md)<`T`, `E`\>\>)[]

#### Returns

(`string` \| `symbol` \| `Exclude`<keyof `E`, keyof [`Events`](../interfaces/Events.md)<`T`, `E`\>\>)[]

#### Inherited from

Base.eventNames

#### Defined in

node_modules/typed-emitter/index.d.ts:35

___

### getMaxListeners

▸ **getMaxListeners**(): `number`

#### Returns

`number`

#### Inherited from

Base.getMaxListeners

#### Defined in

node_modules/typed-emitter/index.d.ts:40

___

### listenerCount

▸ **listenerCount**<`E`\>(`event`): `number`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |

#### Returns

`number`

#### Inherited from

Base.listenerCount

#### Defined in

node_modules/typed-emitter/index.d.ts:38

___

### listeners

▸ **listeners**<`E`\>(`event`): `Function`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |

#### Returns

`Function`[]

#### Inherited from

Base.listeners

#### Defined in

node_modules/typed-emitter/index.d.ts:37

___

### off

▸ **off**<`E`\>(`event`, `listener`): [`default`](default.md)<`T`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | [`Events`](../interfaces/Events.md)<`T`, `E`\> & `Omit`<`E`, keyof [`Events`](../interfaces/Events.md)<`T`, `E`\>\>[`E`] |

#### Returns

[`default`](default.md)<`T`, `E`\>

#### Inherited from

Base.off

#### Defined in

node_modules/typed-emitter/index.d.ts:30

___

### on

▸ **on**<`E`\>(`event`, `listener`): [`default`](default.md)<`T`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | [`Events`](../interfaces/Events.md)<`T`, `E`\> & `Omit`<`E`, keyof [`Events`](../interfaces/Events.md)<`T`, `E`\>\>[`E`] |

#### Returns

[`default`](default.md)<`T`, `E`\>

#### Inherited from

Base.on

#### Defined in

node_modules/typed-emitter/index.d.ts:25

___

### once

▸ **once**<`E`\>(`event`, `listener`): [`default`](default.md)<`T`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | [`Events`](../interfaces/Events.md)<`T`, `E`\> & `Omit`<`E`, keyof [`Events`](../interfaces/Events.md)<`T`, `E`\>\>[`E`] |

#### Returns

[`default`](default.md)<`T`, `E`\>

#### Inherited from

Base.once

#### Defined in

node_modules/typed-emitter/index.d.ts:26

___

### prependListener

▸ **prependListener**<`E`\>(`event`, `listener`): [`default`](default.md)<`T`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | [`Events`](../interfaces/Events.md)<`T`, `E`\> & `Omit`<`E`, keyof [`Events`](../interfaces/Events.md)<`T`, `E`\>\>[`E`] |

#### Returns

[`default`](default.md)<`T`, `E`\>

#### Inherited from

Base.prependListener

#### Defined in

node_modules/typed-emitter/index.d.ts:27

___

### prependOnceListener

▸ **prependOnceListener**<`E`\>(`event`, `listener`): [`default`](default.md)<`T`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | [`Events`](../interfaces/Events.md)<`T`, `E`\> & `Omit`<`E`, keyof [`Events`](../interfaces/Events.md)<`T`, `E`\>\>[`E`] |

#### Returns

[`default`](default.md)<`T`, `E`\>

#### Inherited from

Base.prependOnceListener

#### Defined in

node_modules/typed-emitter/index.d.ts:28

___

### rawListeners

▸ **rawListeners**<`E`\>(`event`): `Function`[]

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |

#### Returns

`Function`[]

#### Inherited from

Base.rawListeners

#### Defined in

node_modules/typed-emitter/index.d.ts:36

___

### removeAllListeners

▸ **removeAllListeners**<`E`\>(`event?`): [`default`](default.md)<`T`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event?` | `E` |

#### Returns

[`default`](default.md)<`T`, `E`\>

#### Inherited from

Base.removeAllListeners

#### Defined in

node_modules/typed-emitter/index.d.ts:31

___

### removeListener

▸ **removeListener**<`E`\>(`event`, `listener`): [`default`](default.md)<`T`, `E`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | extends `string` \| `number` \| `symbol` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `event` | `E` |
| `listener` | [`Events`](../interfaces/Events.md)<`T`, `E`\> & `Omit`<`E`, keyof [`Events`](../interfaces/Events.md)<`T`, `E`\>\>[`E`] |

#### Returns

[`default`](default.md)<`T`, `E`\>

#### Inherited from

Base.removeListener

#### Defined in

node_modules/typed-emitter/index.d.ts:32

___

### set

▸ **set**(`value`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | [`default`](default.md)<`T`, `E`\> \| [`PartialPayload`](../modules.md#partialpayload)<`T`\> |

#### Returns

`void`

#### Defined in

[src/store.ts:91](https://github.com/chanced/classy-store/blob/12b6fd3/src/store.ts#L91)

___

### setMaxListeners

▸ **setMaxListeners**(`maxListeners`): [`default`](default.md)<`T`, `E`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `maxListeners` | `number` |

#### Returns

[`default`](default.md)<`T`, `E`\>

#### Inherited from

Base.setMaxListeners

#### Defined in

node_modules/typed-emitter/index.d.ts:41

___

### setupErrorHandler

▸ `Private` **setupErrorHandler**(): `void`

#### Returns

`void`

#### Defined in

[src/store.ts:136](https://github.com/chanced/classy-store/blob/12b6fd3/src/store.ts#L136)

___

### subscribe

▸ **subscribe**(`run`, `invalidate?`): [`Unsubscriber`](../modules.md#unsubscriber)

#### Parameters

| Name | Type |
| :------ | :------ |
| `run` | [`Subscriber`](../modules.md#subscriber)<`T`\> |
| `invalidate` | [`Invalidator`](../modules.md#invalidator)<`T`\> |

#### Returns

[`Unsubscriber`](../modules.md#unsubscriber)

#### Defined in

[src/store.ts:108](https://github.com/chanced/classy-store/blob/12b6fd3/src/store.ts#L108)

___

### update

▸ **update**(`updater`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `updater` | [`Updater`](../modules.md#updater)<[`default`](default.md)<`T`, `E`\>\> |

#### Returns

`void`

#### Defined in

[src/store.ts:100](https://github.com/chanced/classy-store/blob/12b6fd3/src/store.ts#L100)
