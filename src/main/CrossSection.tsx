import * as React from "react";

interface Props {
  putted: boolean;
  onClick: () => void;
}

const CrossSection = (props: Props) => {
  const puttedClass = props.putted ? "putted" : "";
  return (
    <div className={"cross-section " + puttedClass} onClick={props.onClick} />
  );
};

export default CrossSection;
