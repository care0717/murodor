import * as React from "react";

interface Props {
  direction: string;
}

const Channel = (props: Props) => {
  return <div className={props.direction + " channel"} />;
};

export default Channel;
