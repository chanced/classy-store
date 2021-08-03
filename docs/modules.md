[classy-store](README.md) / Exports

# classy-store

## Table of contents

### Enumerations

- [ExecutingStatus](enums/ExecutingStatus.md)

### Classes

- [Store](classes/Store.md)
- [default](classes/default.md)

### Interfaces

- [Events](interfaces/Events.md)
- [Options](interfaces/Options.md)

### Type aliases

- [ExecutingStatuses](modules.md#executingstatuses)
- [Invalidator](modules.md#invalidator)
- [PartialPayload](modules.md#partialpayload)
- [ReservableKey](modules.md#reservablekey)
- [StartStopNotifier](modules.md#startstopnotifier)
- [Subscriber](modules.md#subscriber)
- [Unsubscriber](modules.md#unsubscriber)
- [Updater](modules.md#updater)

### Functions

- [mutator](modules.md#mutator)

## Type aliases

### ExecutingStatuses

Ƭ **ExecutingStatuses**<`T`, `V`\>: `Partial`<{ [K in keyof V]: ExecutingStatus}\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `V` | `Promises`<`T`\> |

#### Defined in

[src/store.ts:45](https://github.com/chanced/classy-store/blob/c266642/src/store.ts#L45)

___

### Invalidator

Ƭ **Invalidator**<`T`\>: (`value?`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`value?`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value?` | `T` |

##### Returns

`void`

#### Defined in

[src/store.ts:13](https://github.com/chanced/classy-store/blob/c266642/src/store.ts#L13)

___

### PartialPayload

Ƭ **PartialPayload**<`T`\>: `Omit`<`Partial`<`T`\>, `ReservedKeys`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/store.ts:186](https://github.com/chanced/classy-store/blob/c266642/src/store.ts#L186)

___

### ReservableKey

Ƭ **ReservableKey**<`T`, `E`\>: `Exclude`<keyof `T`, `ReservedKeys`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`default`](classes/default.md)<`T`, `E`\> |
| `E` | `void` |

#### Defined in

[src/store.ts:188](https://github.com/chanced/classy-store/blob/c266642/src/store.ts#L188)

___

### StartStopNotifier

Ƭ **StartStopNotifier**<`T`\>: (`set`: [`Subscriber`](modules.md#subscriber)<`T`\>) => [`Unsubscriber`](modules.md#unsubscriber) \| `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`set`): [`Unsubscriber`](modules.md#unsubscriber) \| `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `set` | [`Subscriber`](modules.md#subscriber)<`T`\> |

##### Returns

[`Unsubscriber`](modules.md#unsubscriber) \| `void`

#### Defined in

[src/store.ts:14](https://github.com/chanced/classy-store/blob/c266642/src/store.ts#L14)

___

### Subscriber

Ƭ **Subscriber**<`T`\>: (`value`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`value`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`void`

#### Defined in

[src/store.ts:9](https://github.com/chanced/classy-store/blob/c266642/src/store.ts#L9)

___

### Unsubscriber

Ƭ **Unsubscriber**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/store.ts:11](https://github.com/chanced/classy-store/blob/c266642/src/store.ts#L11)

___

### Updater

Ƭ **Updater**<`T`\>: (`value`: `T`) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`value`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

##### Returns

`T`

#### Defined in

[src/store.ts:12](https://github.com/chanced/classy-store/blob/c266642/src/store.ts#L12)

## Functions

### mutator

▸ **mutator**<`T`, `E`\>(`target`, `key`, `descriptor`): `PropertyDescriptor`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`default`](classes/default.md)<`T`, `E`, `T`\> |
| `E` | `void` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `target` | `T` |
| `key` | keyof `T` |
| `descriptor` | `PropertyDescriptor` |

#### Returns

`PropertyDescriptor`

#### Defined in

[src/mutator.ts:3](https://github.com/chanced/classy-store/blob/c266642/src/mutator.ts#L3)
