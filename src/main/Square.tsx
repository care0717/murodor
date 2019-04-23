import * as React from "react";

interface IProps {
  value: string;
  canMove: boolean;
}

class Square extends React.Component<IProps, {}> {
  public render() {
    const className = this.props.canMove ? "square canclick" : "square";
    return <div className={className}>{this.props.value}</div>;
  }
}

export default Square;
