import React from "react";
import styled, { css } from "styled-components";
// import { generalClickerStyles } from "./Link";

interface AnchorProps extends React.HTMLProps<HTMLAnchorElement> {
  secondary?: boolean;
  onClick?: (e: any) => void;
}

const Anchor: React.FC<AnchorProps> = (props: AnchorProps) => {
  if (props.secondary) {
    return (
      <StyledAnchor secondary={props.secondary} href={props.href} onClick={props.onClick}>
        {props.children}
      </StyledAnchor>
    );
  }
  return (
    <StyledAnchor onClick={props.onClick} href={props.href}>
      {props.children}
    </StyledAnchor>
  )
}

const clickerStyles = css`
	appearance: none;
	-moz-appearance: none;
  -webkit-appearance: none;
	background-color: var(--tBase);
	color: var(--white);
	display: inline-flex;
	flex-flow: row nowrap;
	justify-content: center;
	align-items: center;
	height: 5rem;
	width: 15rem;
	margin: 1rem;
	white-space: nowrap;
	line-height: normal;
	text-decoration: none;
	font-size: 1.6rem;
	outline: none;
	border: none;
	border-radius: 10px;
	cursor: pointer;
	&:hover {
		transition-duration: 0;
		cursor: pointer;
		background-color: var(--tDark);
	}
	&:active {
		transition-duration: 0;
		background-color: var(--tDarker);
	}
`;

const secondaryClickerStyles = css`
	background-color: var(--pLight);
	color: var(--pText);
	&:hover {
		transition-duration: 0;
		cursor: pointer;
		background-color: var(--pBase);
	}
	&:active {
		transition-duration: 0;
		background-color: var(--pDark);
	}
`;

export const generalClickerStyles = css<AnchorProps>`
  ${clickerStyles};
	${props => {
    return (props.secondary && secondaryClickerStyles)
  }};
`;

const StyledAnchor = styled.a`
	${generalClickerStyles};
`;

export default Anchor;