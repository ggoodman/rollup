import type MagicString from 'magic-string';
import type { RenderOptions } from '../../utils/renderHelpers';
import {
	BROKEN_FLOW_ERROR_RETURN_LABEL,
	type HasEffectsContext,
	type InclusionContext
} from '../ExecutionContext';
import type * as NodeType from './NodeType';
import { UNKNOWN_EXPRESSION } from './shared/Expression';
import { type ExpressionNode, type IncludeChildren, StatementBase } from './shared/Node';

export default class ReturnStatement extends StatementBase {
	declare argument: ExpressionNode | null;
	declare type: NodeType.tReturnStatement;

	hasEffects(context: HasEffectsContext): boolean {
		if (
			!context.ignore.returnYield ||
			(this.argument !== null && this.argument.hasEffects(context))
		)
			return true;
		context.brokenFlow = BROKEN_FLOW_ERROR_RETURN_LABEL;
		return false;
	}

	include(context: InclusionContext, includeChildrenRecursively: IncludeChildren): void {
		this.included = true;
		if (this.argument) {
			this.argument.include(context, includeChildrenRecursively);
		}
		context.brokenFlow = BROKEN_FLOW_ERROR_RETURN_LABEL;
	}

	initialise(): void {
		this.scope.addReturnExpression(this.argument || UNKNOWN_EXPRESSION);
	}

	render(code: MagicString, options: RenderOptions): void {
		if (this.argument) {
			this.argument.render(code, options, { preventASI: true });
			if (this.argument.start === this.start + 6 /* 'return'.length */) {
				code.prependLeft(this.start + 6, ' ');
			}
		}
	}
}
