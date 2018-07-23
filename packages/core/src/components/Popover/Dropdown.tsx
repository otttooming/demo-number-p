import * as React from "react";
import styled, { css } from "../../common/styled";

interface ArrowProps {}

export const arrowCorrection = "15px";

export const dropdownStyle = css`
  background: #fff;
  color: #333;
  position: relative;
  width: 640px;
  max-width: 90vw;
  box-shadow: 0 41px 66px 0 rgba(0, 0, 0, 0.2);
  height: 300px;
  overflow-y: scroll;
  border-radius: 4px;
  &[data-placement*="bottom"] {
    top: ${arrowCorrection};
  }
  &[data-placement*="top"] {
    bottom: ${arrowCorrection};
  }
  &[data-placement*="right"] {
    left: ${arrowCorrection};
  }
  &[data-placement*="left"] {
    right: ${arrowCorrection};
  }
`;

export const Dropdown = styled.div`
  ${dropdownStyle};
`;
