import * as React from "react";

interface IProps {
  value: string;
  canMove: boolean;
  onClick: () => void;
}

class Square extends React.Component<IProps, {}> {
  public render() {
    const className = this.props.canMove ? "square canclick" : "square";
    const square = this.props.canMove ? (
      <div className={className} onClick={this.props.onClick}>
        {this.props.value}
      </div>
    ) : (
      <div className={className}>{this.props.value}</div>
    );
    return square;
  }
}

export default Square;
