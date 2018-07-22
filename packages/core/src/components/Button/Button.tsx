import * as React from "react";
import styled from "../../common/styled";
import Icon, { IconType } from "../Icon/Icon";

export interface ButtonProps {
  onClick?: () => void;
  icon?: IconType;
}

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
  padding: 32px;
  font-size: ${props => props.theme.typeface.size.normal};
`;

const ButtonContent = styled.div``;

const ButtonTitle = styled.h2``;

const ButtonMetaItem = styled.li``;

export default class Button extends React.Component<ButtonProps, {}> {
  handleClick = (event: React.SyntheticEvent<HTMLButtonElement>): void => {
    const { onClick } = this.props;
    console.log(event);

    if (onClick) {
      onClick();
    }
  };

  render() {
    const { children, icon } = this.props;

    return (
      <ButtonWrapper onClick={this.handleClick}>
        {icon && <Icon icon={icon} />}
        <ButtonContent>{children}</ButtonContent>
      </ButtonWrapper>
    );
  }
}
