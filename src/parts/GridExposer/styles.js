// Imports
// ------
import styled, { css } from 'styled-components';
import { Main, bp, Div } from '@tackl';

// Exports
// ------
export const Col = styled(Div)(
	(props) => css`
		height: 100%;

		display: ${props.$isMobile ? `flex` : `none`};

		${bp.medium`
			display: ${props.$isTablet ? `flex` : `none`};
		`}

		${bp.large`
			display: flex !important;
		`}

		span {
			display: block;
			opacity: ${props.$altColor ? 0.5 : 0.2};
			background-color: ${props.$altColor
				? props.theme.colors.feedback.negative
				: props.theme.colors.grey.scale100};

			width: 100%;
			height: 100%;
			transition: all 0.25s linear;
		}
	`
);

export const Jacket = styled(Main)(
	(props) => css`
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9999;
		width: 100%;
		height: ${props.$showGrid ? `100%` : `0%`};
		pointer-events: none;
		transition: all 1s ${props.theme.easing.bezzy};
		padding: 0 1.2rem;

		${bp.large`
			padding: 0;
		`}

		> .grid {
			height: 100%;
		}
	`
);
