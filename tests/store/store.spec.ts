import { test } from "uvu";
import * as assert from "uvu/assert";

import { Store } from "../../src/index";

class Test1 extends Store<Test1> {
	name: string;
	constructor() {
		super({
			startStopNotifier: (set) => {
				set({ name: "new value" });
			},
			protectedFields: ["name"],
		});
	}
}

test("...", () => {
	const t = new Test1();
	t.set({ emit: (u, v) => true });
	t;
});
