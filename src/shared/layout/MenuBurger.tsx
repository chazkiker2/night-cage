import React from "react";
import styled from "styled-components";
interface BurgerProps {
  onClick?: (e: any) => void;
  props?: any;
}
const MenuBurger: React.FC<BurgerProps> = ({ children, onClick, props }) => {
  return (
    <SMenuBurger onClick={onClick} {...props}>
      <svg viewBox="0 0 100 80" width="35" height="35">
        <rect width="100" height="20" rx="8"></rect>
        <rect y="30" width="100" height="20" rx="8"></rect>
        <rect y="60" width="100" height="20" rx="8"></rect>
      </svg>
    </SMenuBurger>
  );
};

const SMenuBurger = styled.div<BurgerProps>`
	cursor: pointer;
	fill: var(--pText);
`;

export default MenuBurger;