export type FilterByType<T, S extends string> = T extends { type: infer R }
	? S extends R
		? T
		: never
	: never;
