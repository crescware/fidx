#!/usr/bin/env node

import { main } from "./src/main";

main()
	.then(() => {
		process.exit(0);
	})
	.catch((error) => {
		console.error("Error:", error);
		process.exit(1);
	});
