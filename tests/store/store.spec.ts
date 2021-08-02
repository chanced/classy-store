import * as assert from "uvu/assert";
import { suite } from "uvu";
import { Store } from "../../src/index";

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

emitters("should fire start after the first subscription", async () => {
	console.log("starting test");
	const t = new Test1();
	let beforeSubscribe = true;
	const res = new Promise<void>((resolve, reject) => {
		t.on("start", () => {
			console.log("received start event");
			assert.equal(beforeSubscribe, true, "should not start until after subscribe");
			resolve();
		});
	});
	t.subscribe((t1) => {
		console.log("firing subscribe");
		beforeSubscribe = false;
	});
	await res;
	assert.equal(beforeSubscribe, false);
});

emitters.run();
