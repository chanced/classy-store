import { ExecutingStatus, Store } from "./store";

export function mutator<T extends Store<T, E>, E = void>(
	target: T,
	key: keyof T,
	descriptor: PropertyDescriptor,
): PropertyDescriptor {
	const method = descriptor.value;
	descriptor.value = function (...args) {
		const result = method.apply(this, args);
		if (result instanceof Promise) {
			this.executing[key] = ExecutingStatus.Pending;
			result
				.then(() => {
					this.executing[key] = ExecutingStatus.Resolved;
					this.emit("update", this);
					this.broadcast();
				})
				.catch((err) => {
					this.executing[key] = ExecutingStatus.Error;
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
