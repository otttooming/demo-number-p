import * as React from "react";
import styled from "../../common/styled";

export enum Color {
  BLUE = "BLUE",
  WHITE = "WHITE",
  GREEN = "GREEn",
  YELLOW = "YELLOW",
}

export interface CardMeta {
  label: string;
  content: string;
}

export interface CardTheme {
  color: Color;
}

export interface CardProps {
  title: string;
  meta: CardMeta[];
  theme: CardTheme;
}

function getColor(color: Color, solid?: boolean): string {
  switch (color) {
    case Color.BLUE:
      return solid ? "#4a00e0" : "linear-gradient(to right, #8e2de2, #4a00e0)";
    case Color.WHITE:
      return solid ? "#E9E4F0" : "linear-gradient(to right, #D3CCE3, #E9E4F0)";
    case Color.GREEN:
      return solid ? "#96c93d" : "linear-gradient(to right, #00b09b, #96c93d)";
    case Color.YELLOW:
      return solid ? "#ffd200" : "linear-gradient(to right, #f7971e, #ffd200)";
    default:
      return "#fff";
  }
}

const CardWrapper = styled.section<CardTheme>`
  display: flex;
  position: relative;
  border-radius: ${props => props.theme.border.radius.normal};
  padding: 16px;
  margin-bottom: 16px;
  margin-left: 32px;
  margin-top: -64px;
  background: ${props => {
    const { color } = props;

    return getColor(color);
  }};

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: -8px;
    right: 0;
    z-index: -1;
    filter: blur(10px);

    background: ${props => {
      const { color } = props;

      return getColor(color);
    }};
  }
`;

const CardInfo = styled.section<CardTheme>`
  position: relative;
  border-radius: ${props => props.theme.border.radius.normal};
  padding: 16px;
  margin-bottom: 16px;
  background: ${props => {
    const { color } = props;

    return getColor(color, true);
  }};
  margin-left: -48px;
  margin-right: 32px;
  height: 12rem;
  width: 12rem;
  min-width: 12rem;
`;

const CardContent = styled.div`
  background: red;
  border-radius: 8px;
  padding: 48px;
  background: linear-gradient(to right, #f9fafb, #f9fafb);
  width: 100%;
`;

const CardTitle = styled.h2``;

const CardMetaItem = styled.li``;

export default class Card extends React.Component<CardProps, {}> {
  renderMetaList = () => {
    const { meta } = this.props;

    return (
      <ul>
        {meta.map(({ label, content }, index) => (
          <li key={index}>
            <h3>{label}</h3>
            <p>{content}</p>
          </li>
        ))}
      </ul>
    );
  };

  render() {
    const { title, theme } = this.props;

    return (
      <CardWrapper color={theme.color}>
        <CardInfo color={theme.color} />

        <CardContent>
          <CardTitle>{title}</CardTitle>

          {this.renderMetaList()}

          {this.props.children}
        </CardContent>
      </CardWrapper>
    );
  }
}
