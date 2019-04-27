import * as React from "react";

interface Props {
  direction: string;
}

const Channel = (props: Props) => {
  return <div className={props.direction + "Channel"} />;
};

export default Channel;
