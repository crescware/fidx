class TestClass {
	constructor(a: string, b: number) {
		void a;
		void b;
	}

	methodOne(x: string): void {
		void x;
	}

	methodTwo(y: number, z: boolean): string {
		void y;
		void z;
		return "";
	}

	static staticMethod(param: string[]): number {
		void param;
		return 0;
	}
}

void TestClass;
