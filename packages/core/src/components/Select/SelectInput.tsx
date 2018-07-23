import * as React from "react";
import styled, { css } from "../../common/styled";
import ThemeInterface from "../../common/styled/theme";

const reset = css`
  margin: 0;
  border: 0;
  padding: 0;
  display: inline-block;
  vertical-align: middle;
  white-space: normal;
  background: none;
  line-height: 1;
  color: inherit;
  font-size: inherit;
  &:focus {
    outline: none;
  }
`;

const common = css`
  font-family: inherit;
  font-weight: 500;
  line-height: 1.2;
  padding-left: ${props => props.theme.spacing.medium};
  border-radius: ${props => props.theme.border.radius.small};
  background-color: #fff;
`;

const selectInputStyle = css<any>`
  display: flex;
  input {
    ${reset};
    ${common};
    line-height: 64px;
    height: 64px;
    width: 100%;
    color: #333;
  }
`;

const SelectInputStyled = styled.div`
  ${selectInputStyle};
`;

export default class SelectInput extends React.Component<any, any> {
  render() {
    return <SelectInputStyled>{this.props.children}</SelectInputStyled>;
  }
}
