import * as React from "react";

export interface ProgressProps {
  progress: number;
  animate?: boolean;
  animationDuration?: string;
  showPercentage?: boolean;
  showPercentageSymbol?: boolean;
  progressColor?: string;
  bgColor?: string;
  textColor?: string;
  size?: string;
  lineWidth?: string;
  percentSpacing?: number;
  textStyle?: React.CSSProperties;
  roundedStroke?: boolean;
  responsive?: boolean;
}

export interface ProgressState {}

export class Progress extends React.Component<ProgressProps, ProgressState> {
  static defaultProps: ProgressProps = {
    progress: 0,
    animate: true,
    animationDuration: "1s",
    showPercentage: true,
    showPercentageSymbol: true,
    progressColor: "currentColor",
    bgColor: "transparent",
    textColor: "currentColor",
    size: "100",
    lineWidth: "25",
    percentSpacing: 10,
    textStyle: { fontSize: "4rem", fontWeight: "bold" },
  };

  getOffset = (val: number = 0): number => {
    const radius: number = 175;
    const diameter: number = Math.round(Math.PI * radius * 2);

    return Math.round(((100 - val) / 100) * diameter);
  };

  getText = () => {
    const {
      progress,
      showPercentage,
      textColor,
      textStyle,
      percentSpacing,
      showPercentageSymbol,
    } = this.props;
    if (!showPercentage) return;

    const roundedProgress: number = Math.round(progress);

    return (
      <text
        style={textStyle}
        fill={textColor}
        x="50%"
        y="50%"
        dx="-25"
        textAnchor="middle"
      >
        {roundedProgress}
        {showPercentageSymbol && <tspan dx={percentSpacing}>%</tspan>}
      </text>
    );
  };

  render() {
    const {
      progress,
      size,
      bgColor,
      progressColor,
      lineWidth,
      animate,
      animationDuration,
      roundedStroke,
      responsive,
    } = this.props;

    const strokeDashoffset = this.getOffset(progress);
    const transition = animate
      ? `stroke-dashoffset ${animationDuration} ease-out`
      : undefined;

    const strokeLinecap = roundedStroke ? "round" : "butt";
    const svgSize = responsive ? "100%" : size;

    return (
      <svg width={svgSize} height={svgSize} viewBox="-25 -25 400 400">
        <circle
          stroke={bgColor}
          cx="175"
          cy="175"
          r="175"
          strokeWidth={lineWidth}
          fill="none"
        />
        <circle
          stroke={progressColor}
          transform="rotate(-90 175 175)"
          cx="175"
          cy="175"
          r="175"
          strokeDasharray="1100"
          strokeWidth={lineWidth}
          strokeDashoffset="1100"
          strokeLinecap={strokeLinecap}
          fill="none"
          style={{ strokeDashoffset, transition }}
        />
        {this.getText()}
      </svg>
    );
  }
}
