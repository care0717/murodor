import * as React from "react";

interface IProps {
  value: string | null;
  onClick: () => void;
}

class Square extends React.Component<IProps, {}> {
  public render() {
    return (
      <button className="square" onClick={this.props.onClick}>
        {this.props.value}
      </button>
    );
  }
}

export default Square;
