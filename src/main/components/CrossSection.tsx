import * as React from "react";
import { BoardActions, getBoardState } from "../interface";
import { useActions } from "typeless";

interface Props {
  row: number;
  column: number;
}

const CrossSection = (props: Props) => {
  const { crossSectionClick } = useActions(BoardActions);
  const { crossSections } = getBoardState.useState();

  const puttedClass = crossSections[props.row][props.column] ? "putted" : "";
  return (
    <div
      className={"cross-section " + puttedClass}
      onClick={crossSectionClick(props.row, props.column)}
    />
  );
};

export default CrossSection;
