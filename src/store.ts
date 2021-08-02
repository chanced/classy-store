/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { ListenerSignature, TypedEmitter } from "tiny-typed-emitter";

import type { default as TypedEmitter } from "typed-emitter";
import EventEmitter from "events";

export declare type Subscriber<T> = (value: T) => void;

export declare type Unsubscriber = () => void;
export declare type Updater<T> = (value: T) => T;
export declare type Invalidator<T> = (value?: T) => void;
export type StartStopNotifier<T> = (set: Subscriber<T>) => Unsubscriber | void;

class Base<T> extends (EventEmitter as { new <T>(): TypedEmitter<T> })<T> {
	constructor() {
		super();
	}
}

type IfEquals<T, U, Y = unknown, N = never> = (<G>() => G extends T ? 1 : 2) extends <
	G,
>() => G extends U ? 1 : 2
	? Y
	: N;

type Promises<D> = {
	[K in keyof D as D[K] extends (..._: never[]) => Promise<unknown>
		? IfEquals<ReturnType<D[K]>, any, never, K>
		: never]: D[K] extends (..._: never[]) => infer P ? P : never;
};

export enum ExecutingStatus {
	Pending = "pending",
	Resolved = "resolved",
	Error = "error",
}

export type ExecutingStatuses<T, V = Promises<T>> = Partial<
	{
		[K in keyof V]: ExecutingStatus;
	}
>;

export abstract class Store<T extends Store<T, E>, E = void> extends Base<
	Events<T, E> & Omit<E, keyof Events<T, E>>
> {
	private unsubscriber: Unsubscriber | null;
	private readonly starter: StartStopNotifier<T>;

	protected subscribers: Set<SubscribeInvalidateTuple<T>>;

	readonly executing: ExecutingStatuses<T>;

	constructor(options?: Options<T, E> | StartStopNotifier<T>) {
		super();
		if (typeof options == "function") {
			options = { startStopNotifier: options };
		}
		this.executing = {};
		options = options || {};
		this.subscribers = new Set();
		this.unsubscriber = null;
		const startStop: StartStopNotifier<T> = options.startStopNotifier || noop;
		this.starter = (sub) => {
			const result = startStop(sub);
			(this as any).emit("start", this);
			return result;
		};
	}

	set(value: Store<T, E> | PartialPayload<T>): void {
		if (value === this) {
			this.broadcast();
			return;
		}
		Object.assign(this, removeReserved(value));
		(this as any).emit("update", this);
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
		console.log(this.subscribers.size);
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

export interface Events<T extends Store<T, E>, E = void> {
	start: (store: T) => void;
	stop: (store: Store<T, E>) => void;
	error: (error: any) => void;
	update: (store: T) => void;
}

export type PartialPayload<T> = Omit<Partial<T>, ReservedKeys>;

export type ReservableKey<T extends Store<T, E>, E = void> = Exclude<keyof T, ReservedKeys>;

export interface Options<T extends Store<T, E> = Store<any>, E = void> {
	startStopNotifier?: StartStopNotifier<T>;
	protectedFields?: ReservableKey<T, E>[];
}

export default Store;

function removeReserved(value: any): any {
	const val = { ...(value || {}) };
	for (const key of Object.keys(value) as ReservedKeys[]) {
		if (protectedFields.includes(key)) {
			delete val[key];
		}
	}
	return val;
}
