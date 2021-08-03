import { Execution, Store } from "./store";

export function mutator<T extends Store<T, E>, E = void>(
	target: T,
	key: keyof T,
	descriptor: PropertyDescriptor,
): PropertyDescriptor {
	const method = descriptor.value;
	descriptor.value = function (...args) {
		const result = method.apply(this, args);
		if (result instanceof Promise) {
			this.executing[key] = Execution.Pending;
			result
				.then(() => {
					this.executing[key] = Execution.Resolved;
					this.emit("update", this);
					this.broadcast();
				})
				.catch((err) => {
					this.executing[key] = Execution.Error;
					this.emit("error", err);
					this.broadcast();
				});
		} else {
			this.broadcast();
		}

		return result;
	};
	return descriptor;
}
