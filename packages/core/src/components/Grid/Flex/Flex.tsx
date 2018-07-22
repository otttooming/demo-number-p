import * as React from "react";
import styled from "../../../common/styled";

export interface FlexProps {}

const FlexWrapper = styled.div`
  display: flex;
`;

export default class Flex extends React.Component<FlexProps, {}> {
  render() {
    const { children } = this.props;

    return <FlexWrapper>{children}</FlexWrapper>;
  }
}
