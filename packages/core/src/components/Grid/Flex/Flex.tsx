import * as React from "react";
import styled from "../../../common/styled";

export interface FlexProps {
  verticalCenter?: boolean;
}

const FlexWrapper = styled.div<FlexProps>`
  display: flex;
  ${props => (props.verticalCenter ? "align-items: center" : undefined)};
`;

export default class Flex extends React.Component<FlexProps, {}> {
  render() {
    const { children, ...rest } = this.props;

    return <FlexWrapper {...rest}>{children}</FlexWrapper>;
  }
}
