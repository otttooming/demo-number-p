import * as React from "react";
import styled, { css } from "../../common/styled";

export enum ContainerVariant {
  HERO = "HERO",
}

export interface ContainerProps {
  variant?: ContainerVariant;
}

export interface ContainerWrapperProps {
  variant?: ContainerVariant;
}

const Hero = css`
  background: linear-gradient(to right, #3741ea, #4462ee);
  color: #fff;
`;

const ContainerWrapper = styled.section<ContainerWrapperProps>`
  ${props => {
    switch (props.variant) {
      case ContainerVariant.HERO:
        return Hero;

      default:
        return null;
    }
  }};
`;

const ContainerContent = styled.div`
  margin-left: auto;
  margin-right: auto;
  padding: 32px;
  max-width: 1024px;
`;

export default class Container extends React.Component<ContainerProps, {}> {
  render() {
    const { children, variant } = this.props;

    return (
      <ContainerWrapper variant={variant}>
        <ContainerContent>{children}</ContainerContent>
      </ContainerWrapper>
    );
  }
}
