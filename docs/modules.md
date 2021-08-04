[classy-store](README.md) / Exports

# classy-store

## Table of contents

### Enumerations

- [Execution](enums/Execution.md)

### Classes

- [Store](classes/Store.md)
- [default](classes/default.md)

### Interfaces

- [ErrorEvent](interfaces/ErrorEvent.md)
- [Event](interfaces/Event.md)
- [Events](interfaces/Events.md)
- [Options](interfaces/Options.md)

### Type aliases

- [Executions](modules.md#executions)
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

### Executions

Ƭ **Executions**<`T`, `V`\>: `Partial`<{ [K in keyof V]: Execution}\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `V` | `Promises`<`T`\> |

#### Defined in

[src/store.ts:60](https://github.com/chanced/classy-store/blob/0f71bdc/src/store.ts#L60)

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

[src/store.ts:28](https://github.com/chanced/classy-store/blob/0f71bdc/src/store.ts#L28)

___

### PartialPayload

Ƭ **PartialPayload**<`T`\>: `Omit`<`Partial`<`T`\>, `ReservedKeys`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[src/store.ts:207](https://github.com/chanced/classy-store/blob/0f71bdc/src/store.ts#L207)

___

### ReservableKey

Ƭ **ReservableKey**<`T`, `E`\>: `Exclude`<keyof `T`, `ReservedKeys`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`default`](classes/default.md)<`T`, `E`\> |
| `E` | `void` |

#### Defined in

[src/store.ts:209](https://github.com/chanced/classy-store/blob/0f71bdc/src/store.ts#L209)

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

[src/store.ts:29](https://github.com/chanced/classy-store/blob/0f71bdc/src/store.ts#L29)

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

[src/store.ts:8](https://github.com/chanced/classy-store/blob/0f71bdc/src/store.ts#L8)

___

### Unsubscriber

Ƭ **Unsubscriber**: () => `void`

#### Type declaration

▸ (): `void`

##### Returns

`void`

#### Defined in

[src/store.ts:26](https://github.com/chanced/classy-store/blob/0f71bdc/src/store.ts#L26)

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

[src/store.ts:27](https://github.com/chanced/classy-store/blob/0f71bdc/src/store.ts#L27)

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

[src/mutator.ts:3](https://github.com/chanced/classy-store/blob/0f71bdc/src/mutator.ts#L3)
