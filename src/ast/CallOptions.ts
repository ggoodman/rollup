import type SpreadElement from './nodes/SpreadElement';
import type { ExpressionEntity } from './nodes/shared/Expression';

export const NO_ARGS = [];

export interface CallOptions {
	args: (ExpressionEntity | SpreadElement)[];
	thisParam: ExpressionEntity | null;
	withNew: boolean;
}
