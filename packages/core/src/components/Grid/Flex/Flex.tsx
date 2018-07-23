import * as React from "react";
import styled from "../../../common/styled";

export enum HorizontalAlignment {
  CENTER = "center",
  RIGHT = "flex-end",
}

export interface FlexProps {
  verticalCenter?: boolean;
  horizontalAlignment?: HorizontalAlignment;
}

const FlexWrapper = styled.div<FlexProps>`
  display: flex;
  ${props => (props.verticalCenter ? "align-items: center" : undefined)};
  ${props =>
    props.horizontalAlignment ? "justify-content: flex-end" : undefined};
`;

export default class Flex extends React.Component<FlexProps, {}> {
  render() {
    const { children, ...rest } = this.props;

    return <FlexWrapper {...rest}>{children}</FlexWrapper>;
  }
}
