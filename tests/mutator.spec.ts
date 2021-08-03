import * as assert from "uvu/assert";
import { suite } from "uvu";
import { Store, mutator, Execution } from "../src/index";

class MutatorTest extends Store<MutatorTest> {
	name: string;
	promiseResult: string;
	constructor() {
		super();
		this.promiseResult = "";
	}
	@mutator
	setName(v: string) {
		this.name = v;
	}
	@mutator
	async aPromiseExample(error?: "error") {
		await new Promise((res) => setTimeout(res, 100));
		if (error) {
			console.log("\n\n!!!!!!!!!!!!!!!!!!\n\n");
			console.log("throwing error");
			console.log("\n\n!!!!!!!!!!!!!!!!!!\n\n");
			throw new Error("err example");
		}

		this.promiseResult = "is finished";
	}
}

const mutators = suite("mutators");

mutators("should execute broadcast after a method call", async () => {
	const mt = new MutatorTest();
	const res = new Promise<void>((res) => {
		mt.subscribe(() => {
			if (mt.name === "newval") {
				assert.is(mt.name, "newval");
				res();
			}
		});
	});
	mt.setName("newval");
	await res;
});

mutators("should broadcast after a promise is resolved", async () => {
	const mt = new MutatorTest();
	const res = new Promise<void>((res) => {
		mt.subscribe(() => {
			if (mt.promiseResult === "is finished") {
				assert.is(mt.promiseResult, "is finished");
				res();
			}
		});
	});
	mt.aPromiseExample();
	await res;
});
mutators(
	"should set executing.methodName to 'pending' on start and then 'resolved' on successful completion",
	async () => {
		const mt = new MutatorTest();
		let pendingHasBeenSet = false;
		let resolvedHasBeenSet = false;
		const res = new Promise<void>((res) => {
			mt.subscribe(() => {
				if (mt.promiseResult === "is finished") {
					assert.is(mt.promiseResult, "is finished");
					res();
				}
				if (mt.executing.aPromiseExample === Execution.Running) {
					assert.is(false, pendingHasBeenSet);
					pendingHasBeenSet = true;
				}
				if (mt.executing.aPromiseExample === Execution.Resolved) {
					assert.is(false, resolvedHasBeenSet);
					resolvedHasBeenSet = true;
				}
			});
		});
		mt.aPromiseExample();
		await res;
	},
);
mutators(
	"should set executing.methodName to 'pending' on start and then 'error' on failure",
	async () => {
		console.log("this should be the problem");
		const mt = new MutatorTest();
		let pendingHasBeenSet = false;
		let errorHasBeenSet = false;
		const res = new Promise<void>((res) => {
			mt.subscribe(() => {
				if (mt.executing.aPromiseExample === Execution.Running) {
					// assert.is(false, pendingHasBeenSet);
					pendingHasBeenSet = true;
				}
				if (mt.executing.aPromiseExample === Execution.Error) {
					// assert.is(false, errorHasBeenSet);
					errorHasBeenSet = true;
					res();
				}
			});
		});
		let errorHasBeenCaught = false;
		try {
			await mt.aPromiseExample("error");
		} catch (err) {
			// console.log(err);
			errorHasBeenCaught = true;
			// console.log("ERROR HAS BEEN RESOLVED");
		} finally {
			assert.is(errorHasBeenCaught, true);
		}
		await res;
	},
);
mutators.run();
