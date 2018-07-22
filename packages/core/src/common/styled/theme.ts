const rootSize: number = 16;

function convertPxToRem(px: number, root: number): string {
  return `${px / root}rem`;
}

function convertPxToEm(px: number, root: number): string {
  return `${px / root}em`;
}

export interface BorderProps {
  radius: BorderRadiusProps;
}

export interface TypefaceWeightProps {
  thin: number;
  light: number;
  normal: number;
  bold: number;
}

export interface BorderRadiusProps {
  small: string;
  medium: string;
  normal: string;
  large: string;
}

export const border: BorderProps = {
  radius: { small: "4px", normal: "8px", medium: "16px", large: "24px" },
};

export interface SpacingProps {
  small: string;
  normal: string;
  medium: string;
  large: string;
}

export const spacing: SpacingProps = {
  small: convertPxToRem(4, rootSize),
  normal: convertPxToRem(8, rootSize),
  medium: convertPxToRem(16, rootSize),
  large: convertPxToRem(24, rootSize),
};

export interface TypefaceSizeProps {
  small: string;
  normal: string;
}

export interface TypefaceProps {
  weight: TypefaceWeightProps;
  size: TypefaceSizeProps;
}

export const typeface: TypefaceProps = {
  weight: { thin: 100, light: 300, normal: 400, bold: 700 },
  size: {
    small: convertPxToEm(12, rootSize),
    normal: convertPxToEm(16, rootSize),
  },
};

export default interface ThemeInterface {
  border: BorderProps;
  spacing: SpacingProps;
  typeface: TypefaceProps;
}

export const theme: ThemeInterface = {
  border,
  spacing,
  typeface,
};
