import { DefaultTheme, css } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    pDarkest: string;
    pDarker: string;
    pDark: string;
    pBase: string;
    pLight: string;
    pLighter: string;
    pLightest: string;
    pText: string;
    white: string;
    black: string;
  }
}

export const darkTheme: DefaultTheme = {
  pDarkest: "#000000",
  pDarker: "#080708",
  pDark: "#242525",
  pBase: "#404342",
  pLight: "#5c615f",
  pLighter: "#787e7c",
  pLightest: "#999f9d",
  pText: "#FFFFFF",
  white: "#FFFFFF",
  black: "#000000"
};

export const rootVars = css`
  --pDarkest: #000000;
  --pDarker: #080708;
  --pDark: #242525;
  --pBase: #404342;
  --pLight: #5c615f;
  --pLighter: #787e7c;
  --pLightest: #999f9d;
  --pText: #FFFFFF;
  --white: #FFFFFF;
  --black: #000000;
  --tDarker: #004578;
	--tDark: #005A9E;
	--tBase: #0078D4;
	--tLight: #C7E0F4;
	--tLighter: #DEECF;
`;