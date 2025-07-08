import type { walk } from "oxc-walker";

type WalkCallback = Parameters<typeof walk>[1];
export type Node = Parameters<NonNullable<WalkCallback["enter"]>>[0];
