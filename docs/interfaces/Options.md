[classy-store](../README.md) / [Exports](../modules.md) / Options

# Interface: Options<T, E\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`default`](../classes/default.md)<`T`, `E`\>[`default`](../classes/default.md)<`any`\> |
| `E` | `void` |

## Table of contents

### Properties

- [maxErrorsToStore](Options.md#maxerrorstostore)
- [protectedFields](Options.md#protectedfields)
- [startStopNotifier](Options.md#startstopnotifier)

## Properties

### maxErrorsToStore

• `Optional` **maxErrorsToStore**: `number`

#### Defined in

[src/store.ts:18](https://github.com/chanced/classy-store/blob/ba2f041/src/store.ts#L18)

___

### protectedFields

• `Optional` **protectedFields**: `Exclude`<keyof `T`, ``"update"`` \| ``"subscribers"`` \| ``"set"`` \| ``"subscribe"`` \| ``"broadcast"`` \| ``"addListener"`` \| ``"defaultMaxListeners"`` \| ``"prependListener"`` \| ``"prependOnceListener"`` \| ``"removeListener"`` \| ``"removeAllListeners"`` \| ``"once"`` \| ``"on"`` \| ``"off"`` \| ``"emit"`` \| ``"eventNames"`` \| ``"listenerCount"`` \| ``"listeners"`` \| ``"rawListeners"`` \| ``"getMaxListeners"`` \| ``"setMaxListeners"`` \| ``"unsubscriber"``\>[]

#### Defined in

[src/store.ts:17](https://github.com/chanced/classy-store/blob/ba2f041/src/store.ts#L17)

___

### startStopNotifier

• `Optional` **startStopNotifier**: [`StartStopNotifier`](../modules.md#startstopnotifier)<`T`\>

#### Defined in

[src/store.ts:16](https://github.com/chanced/classy-store/blob/ba2f041/src/store.ts#L16)
