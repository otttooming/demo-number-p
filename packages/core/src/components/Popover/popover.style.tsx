import * as React from "react";
import styled, { css } from "../../common/styled";

export const arrowCorrection = "15px";

export const arrowStyle = css`
  position: absolute;
  width: 3em;
  height: 3em;
  &[data-placement*="bottom"] {
    top: ${arrowCorrection};
    left: 0;
    margin-top: -0.9em;
    width: 3em;
    height: 1em;
    &::before {
      border-width: 0 1.5em 1em 1.5em;
      border-color: transparent transparent #fff transparent;
    }
  }
  &[data-placement*="top"] {
    bottom: ${arrowCorrection};
    left: 0;
    margin-bottom: -0.9em;
    width: 3em;
    height: 1em;
    &::before {
      border-width: 1em 1.5em 0 1.5em;
      border-color: #fff transparent transparent transparent;
    }
  }
  &[data-placement*="right"] {
    left: ${arrowCorrection};
    margin-left: -0.9em;
    height: 3em;
    width: 1em;
    &::before {
      border-width: 1.5em 1em 1.5em 0;
      border-color: transparent #fff transparent transparent;
    }
  }
  &[data-placement*="left"] {
    right: ${arrowCorrection};
    margin-right: -0.9em;
    height: 3em;
    width: 1em;
    &::before {
      border-width: 1.5em 0 1.5em 1em;
      border-color: transparent transparent transparent#fff;
    }
  }
  &::before {
    content: "";
    margin: auto;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
  }
`;
