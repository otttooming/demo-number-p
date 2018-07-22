import * as React from "react";
import styled from "../../common/styled";
import * as IconComponent from "./Icons";

export enum IconType {
  SEARCH = "SEARCH",
  UPLOAD = "UPLOAD",
}

export interface IconProps {
  icon: IconType;
}

const IconWrapper = styled.div<IconProps>``;

export default class Icon extends React.Component<IconProps, {}> {
  render() {
    const { children, icon } = this.props;

    switch (icon) {
      case IconType.SEARCH:
        return <IconComponent.SearchIcon />;
      case IconType.UPLOAD:
        return <IconComponent.UploadIcon />;
      default:
        return null;
    }
  }
}
