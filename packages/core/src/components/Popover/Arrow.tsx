import * as React from "react";
import { arrowStyle } from "./popover.style";
import styled from "../../common/styled";

interface ArrowProps {
  passedRef: (ref: HTMLElement | null) => void;
  style: React.CSSProperties;
  className?: string;
  placement: string;
}

export class ArrowBase extends React.Component<ArrowProps, any> {
  render() {
    return (
      <div
        ref={this.props.passedRef}
        style={this.props.style}
        className={this.props.className}
        data-placement={this.props.placement}
      />
    );
  }
}

export const Arrow = styled(ArrowBase)`
  ${arrowStyle};
`;
