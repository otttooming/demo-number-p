import * as React from "react";
import styled, { css } from "../../common/styled";

const SelectListItemStyled = styled.li`
  padding: 32px;
`;

export default class SelectListItem extends React.Component<any, any> {
  render() {
    const { children, ...rest } = this.props;

    return <SelectListItemStyled {...rest}>{children}</SelectListItemStyled>;
  }
}
