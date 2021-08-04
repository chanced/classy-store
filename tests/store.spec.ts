import * as assert from "uvu/assert";
import { suite } from "uvu";
import { Store } from "../src/index";

interface MyEvents {
	example: (v: string) => void;
	start: () => void;
}

class Test1 extends Store<Test1, MyEvents> {
	name: string;
	constructor() {
		super();
	}
}
const emitters = suite("emitters");

emitters("should fire 'start' after the first subscription", async () => {
	console.log("starting test");
	const t = new Test1();
	let beforeSubscribe = true;
	const res = new Promise<void>((resolve) => {
		t.on("start", () => {
			console.log("received start event");
			assert.equal(beforeSubscribe, true, "should not start until after subscribe");
			resolve();
		});
		t.on("start", ({ store, type }) => {});
	});
	t.subscribe((t1) => {
		console.log("firing subscribe");
		beforeSubscribe = false;
	});
	await res;
	assert.equal(beforeSubscribe, false);
});

emitters("should fire 'update' after set has been called", async () => {
	const t = new Test1();
	let promise: Promise<void>;
	const res = () =>
		(promise = new Promise<void>((res) => {
			assert.is(true, true);
			res();
		}));
	t.addListener("update", res);
	t.set({ name: "new name" });
	await promise;
});
emitters.run();
