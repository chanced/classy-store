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
			this.executing[key] = Execution.Running;
			this.broadcast();
			result
				.then(() => {
					this.executing[key] = Execution.Resolved;
					this.emit("update", { type: "update", store: this });
					this.broadcast();
				})
				.catch((error) => {
					this.executing[key] = Execution.Error;
					this.emit("error", { type: "error", store: this, error });
					this.broadcast();
				});
		} else {
			this.broadcast();
		}

		return result;
	};
	return descriptor;
}
