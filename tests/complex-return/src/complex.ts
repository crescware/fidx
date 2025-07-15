function getData<T>(): Promise<{
	result: T[];
	metadata: {
		count: number;
		hasMore: boolean;
	};
}> {
	return Promise.resolve({
		result: [] as T[],
		metadata: { count: 0, hasMore: false },
	});
}

const createResponse = <U extends Record<string, unknown>>(): {
	data: U;
	status: "success" | "error";
	errors?: string[];
} => {
	return {
		data: {} as U,
		status: "success" as const,
	};
};

void getData;
void createResponse;
