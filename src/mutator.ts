import type { Store } from "./store";

export function mutator<T extends Store<T, E>, E = void>(
	target: T,
	propertyKey: keyof T,
	descriptor: PropertyDescriptor,
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
					this.emit("error", err);
				});
		} else {
			this.set(this);
		}

		return result;
	};
	return descriptor;
}
