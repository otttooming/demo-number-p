import * as React from "react";
import styled from "../../../common/styled";

export interface BoxProps {
  width: number;
}

const BoxWrapper = styled.div<BoxProps>`
  width: ${props => props.width * 100}%;
`;

export default class Box extends React.Component<BoxProps, {}> {
  render() {
    const { children, ...rest } = this.props;

    return <BoxWrapper {...rest}>{children}</BoxWrapper>;
  }
}
