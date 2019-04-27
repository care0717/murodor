import * as React from "react";

interface Props {
  direction: string;
}

class Channel extends React.Component<Props, {}> {
  public render() {
    return <div className={this.props.direction + "Channel"} />;
  }
}

export default Channel;
