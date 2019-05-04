import * as React from "react";

interface Props {
  direction: string;
  canClick: boolean;
  putted: boolean;
  onClick: () => void;
}

const Channel = (props: Props) => {
  const canClickClass = props.canClick ? "can-click" : "";
  const putted = props.putted ? "putted" : "";
  return (
    <div
      className={props.direction + " channel " + canClickClass + " " + putted}
      onClick={props.onClick}
    />
  );
};

export default Channel;
