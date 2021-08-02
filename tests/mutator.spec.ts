import * as assert from "uvu/assert";
import { suite } from "uvu";
import { Store, mutator } from "../src/index";

class Test1 extends Store<Test1> {
	name: string;
	constructor() {
		super();
	}
	@mutator
	setName(v: string) {
		this.name = v;
	}
	@mutator
	async promised() {
		return "";
	}
}

const mutators = suite("mutators");

mutators("should execute broadcast after a method call", () => {});

mutators.run();
