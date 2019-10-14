import * as React from "react";
import { BoardActions, getBoardState } from "../interface";
import { useActions } from "typeless";

interface Props {
  direction: string;
  row: number;
  column: number;
}

const Channel = (props: Props) => {
  const { channelClick } = useActions(BoardActions);

  const { canClickChannels, channels } = getBoardState.useState();

  const canClickClass = canClickChannels[props.row][props.column]
    ? "can-click"
    : "";
  const putted = channels[props.row][props.column] ? "putted" : "";
  return (
    <div
      className={props.direction + " channel " + canClickClass + " " + putted}
      onClick={channelClick(props.row, props.column)}
    />
  );
};

export default Channel;
