function processData<T extends string>(
	items: Array<T>,
	config: {
		enabled: boolean;
		options: string[];
	},
	callback: (value: T) => void,
): void {
	void items;
	void config;
	void callback;
}

const handleComplexArgs = <U, V>(
	map: Map<U, V[]>,
	settings: {
		timeout: number;
		retries: number;
	},
) => {
	void map;
	void settings;
};

void processData;
void handleComplexArgs;
