// Imports
// ------------
import styled, { css } from 'styled-components';
import { bp, Section } from '@tackl';

// Exports
// ------------
export const Jacket = styled.a(
    props => css`
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1.2rem;

        &:hover {
            cursor: pointer !important;
            
            span:first-child {
                transform: scale(0.95);
            }
        }

        span {
            &:first-child {
                border-radius: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 12px;
                gap: 10px;

                width: 48px;
                height: 48px;
                background: linear-gradient(180deg, #CDB4DB 0%, #A2D2FF 100%);

                transition: all .4s ${props.theme.easing.bezzy};
            }
        }

        ${props.disabled && css`
            pointer-events: none;
            opacity: .3;
        `}
    `
);
