import type { Store } from "./store";

export function mutator<T extends Store>(
  target: T,
  propertyKey: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const method = descriptor.value;
  descriptor.value = function (...args) {
    const result = method.apply(this, args);
    if (result instanceof Promise) {
      result
        .then(() => {
          this.set(this);
        })
        .catch((err) => {
          if (!(err instanceof Error)) {
            err = new Error(err);
          }
          this.emit("error", err);
        });
    } else {
      this.set(this);
    }

    return result;
  };
  return descriptor;
}
