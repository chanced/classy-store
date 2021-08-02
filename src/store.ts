/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { TypedEmitter } from "tiny-typed-emitter";
import type { ListenerSignature } from "tiny-typed-emitter";
export declare type Subscriber<T> = (value: T) => void;
export declare type Unsubscriber = () => void;
export declare type Updater<T> = (value: T) => T;
export declare type Invalidator<T> = (value?: T) => void;
export type StartStopNotifier<T> = (set: Subscriber<T>) => Unsubscriber | void;
// function proxyHandler = {}

type SubscribeInvalidateTuple<T> = [
  subscriber: Subscriber<T>,
  invalidator: Invalidator<T>
];

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}

const run = 0;
const invalidator = 1;

export interface Events<T extends Store<T, E>, E extends ListenerSignature<E>> {
  start: (store: Store<T, E>) => void;
  stop: (store: T) => void;
  error: (error: Error) => void;
  update: (store: T) => void;
}

export type PartialPayload<T> = Omit<
  Partial<T>,
  | "subscribers"
  | "set"
  | "broadcast"
  | "update"
  | "defaultMaxListeners"
  | "addListener"
  | "prependListener"
  | "prependOnceListener"
  | "removeListener"
  | "removeAllListeners"
  | "once"
  | "on"
  | "off"
  | "emit"
  | "eventNames"
  | "listenerCount"
  | "listeners"
  | "rawListeners"
  | "getMaxListeners"
  | "setMaxListeners"
>;

function removeUnsafe<T>(value: T): T {
  delete value["subscribers"];
  delete value["set"];
  delete value["subscribe"];
  delete value["broadcast"];
  delete value["update"];
  delete value["addListener"];
  delete value["defaultMaxListeners"];
  delete value["addListener"];
  delete value["prependListener"];
  delete value["prependOnceListener"];
  delete value["removeListener"];
  delete value["removeAllListeners"];
  delete value["once"];
  delete value["on"];
  delete value["off"];
  delete value["emit"];
  delete value["eventNames"];
  delete value["listenerCount"];
  delete value["listeners"];
  delete value["rawListeners"];
  delete value["getMaxListeners"];
  delete value["setMaxListeners"];
  delete value["unsubscriber"];
  return value;
}

export abstract class Store<
  T extends Store<T, E> = Store<any>,
  E extends ListenerSignature<E> = void
> extends TypedEmitter<Events<T, E>> {
  protected subscribers: Set<SubscribeInvalidateTuple<T>>;
  protected readonly notifier: StartStopNotifier<T>;
  private unsubscriber: Unsubscriber | null;
  private starter: StartStopNotifier<T>;
  constructor(startStop?: StartStopNotifier<T>) {
    super();
    this.subscribers = new Set();
    this.unsubscriber = null;
    this.emit("start", this);
    this.starter = startStop;
    this.notifier = (sub) => {
      let result: void | Unsubscriber;
      if (
        startStop !== undefined &&
        startStop !== null &&
        typeof startStop == "function"
      ) {
        result = startStop(sub);
      }
      this.emit("start", this);
      return result;
    };
  }
  set(value: this | PartialPayload<this>): void {
    if (value === this) {
      this.broadcast();
      return;
    }
    Object.assign(this, removeUnsafe(value));
    this.broadcast();
  }
  update(updater: Updater<this>): void {
    const updated = updater(this);
    if (updated !== undefined) {
      this.set(updated);
    } else {
      this.set(this);
    }
  }
  subscribe(
    run: Subscriber<T>,
    invalidate: Invalidator<T> = noop
  ): Unsubscriber {
    const subscriber: SubscribeInvalidateTuple<T> = [run, invalidate];
    this.subscribers.add(subscriber);
    if (this.subscribers.size === 1) {
      this.unsubscriber =
        this.notifier(this.set as unknown as Subscriber<T>) || noop;
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
