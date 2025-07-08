import { dim } from "yoctocolors";

import { type ColorFunction, typeMetadata } from "./type-metadata";

export function displayLegend(): void {
	console.log(dim("Legend:"));

	const colorMap = Object.entries(typeMetadata).reduce((acc, [_, metadata]) => {
		const labels = acc.get(metadata.color) || [];
		labels.push(metadata.label);
		acc.set(metadata.color, labels);
		return acc;
	}, new Map<ColorFunction, string[]>());

	for (const [colorFn, labels] of colorMap) {
		const description = labels.join(" and ");
		const capitalizedDescription =
			description.charAt(0).toUpperCase() + description.slice(1);

		console.log(`  ${colorFn("name()")} - ${capitalizedDescription}`);
	}

	console.log();
}
