/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TypedEmitter } from "tiny-typed-emitter";
import type { ListenerSignature } from "tiny-typed-emitter";
export declare type Subscriber<T> = (value: T | PartialPayload<T>) => void;

export declare type Unsubscriber = () => void;
export declare type Updater<T> = (value: T) => T;
export declare type Invalidator<T> = (value?: T) => void;
export type StartStopNotifier<T> = (set: Subscriber<T>) => Unsubscriber | void;
// function proxyHandler = {}

const protectedFields = [
	"subscribers",
	"set",
	"subscribe",
	"broadcast",
	"update",
	"addListener",
	"defaultMaxListeners",
	"prependListener",
	"prependOnceListener",
	"removeListener",
	"removeAllListeners",
	"once",
	"on",
	"off",
	"emit",
	"eventNames",
	"listenerCount",
	"listeners",
	"rawListeners",
	"getMaxListeners",
	"setMaxListeners",
	"unsubscriber",
] as const;
type ReservedKeys = typeof protectedFields[number];

type SubscribeInvalidateTuple<T> = [subscriber: Subscriber<T>, invalidator: Invalidator<T>];

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

const run = 0;
const invalidator = 1;

export interface Events<T extends Store<T, E>, E extends ListenerSignature<E>> {
	start: (store: Store<T, E>) => void;
	stop: (store: T) => void;
	error: (error: any) => void;
	update: (store: T) => void;
}

export type PartialPayload<T> = Omit<Partial<T>, ReservedKeys>;

export type ReservableKey<T extends Store<T, E>, E extends ListenerSignature<E> = void> = Exclude<
	keyof T,
	ReservedKeys
>;

export interface Options<
	T extends Store<T, E> = Store<any>,
	E extends ListenerSignature<E> = void,
> {
	startStopNotifier?: StartStopNotifier<T>;
	protectedFields?: ReservableKey<T, E>[];
}

export abstract class Store<
	T extends Store<T, E>,
	E extends ListenerSignature<E> = void,
> extends TypedEmitter<Events<T, E>> {
	protected subscribers: Set<SubscribeInvalidateTuple<T>>;
	private unsubscriber: Unsubscriber | null;
	private readonly starter: StartStopNotifier<T>;
	constructor(options?: Options<T, E> | StartStopNotifier<T>) {
		super();
		if (typeof options == "function") {
			options = { startStopNotifier: options };
		}
		options = options || {};
		this.subscribers = new Set();
		this.unsubscriber = null;
		this.emit("start", this);
		const startStop: StartStopNotifier<T> = options.startStopNotifier || noop;
		this.starter = (sub) => {
			const result = startStop(sub);
			this.emit("start", this);
			return result;
		};
	}

	set(value: Store<T, E> | PartialPayload<T>): void {
		if (value === this) {
			this.broadcast();
			return;
		}
		Object.assign(this, removeUnsafe(value));
		this.broadcast();
	}
	update(updater: Updater<Store<T, E>>): void {
		const updated = updater(this);
		if (updated !== undefined) {
			this.set(updated);
		} else {
			this.set(this);
		}
	}
	subscribe(run: Subscriber<T>, invalidate: Invalidator<T> = noop): Unsubscriber {
		const subscriber: SubscribeInvalidateTuple<T> = [run, invalidate];
		this.subscribers.add(subscriber);
		if (this.subscribers.size === 1) {
			this.unsubscriber =
				this.starter((val) => {
					this.set(val);
				}) || noop;
		}
		run(this as unknown as T);
		return () => {
			this.subscribers.delete(subscriber);
			if (this.subscribers.size === 0) {
				this.unsubscriber();
				this.unsubscriber = null;
			}
		};
	}
	broadcast(this: Store<T, E>) {
		if (this.unsubscriber) {
			// store is ready
			for (const subscriber of this.subscribers) {
				subscriber[invalidator]();
				subscriber[run](this as any as T);
			}
		}
	}
}

export default Store;

function removeUnsafe(value: any): any {
	value = value || {};
	for (const key of Object.keys(value)) {
		key;
	}
	return { ...value };
}
