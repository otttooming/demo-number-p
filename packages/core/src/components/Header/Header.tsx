import * as React from "react";
import styled from "../../common/styled";

export interface HeaderProps {}

const ButtonWrapper = styled.button`
  border-radius: ${props => props.theme.border.radius.normal};
  -webkit-appearance: none;
  border: none;
  padding: 0;
  margin: 0;
  display: inline-block;
  padding: 8px;
  background: #374ad4;
  color: #fff;
  outline: none;
  min-width: 64px;
  padding: 16px;
`;

const ButtonContent = styled.div``;

const ButtonTitle = styled.h2``;

const ButtonMetaItem = styled.li``;

export default class Button extends React.Component<HeaderProps, {}> {
  render() {
    const { children } = this.props;

    return (
      <ButtonWrapper>
        <ButtonContent>{children}</ButtonContent>
      </ButtonWrapper>
    );
  }
}
