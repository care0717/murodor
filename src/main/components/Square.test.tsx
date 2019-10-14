/*
import { shallow } from "enzyme";
import * as React from "react";
import Square from "./Square";

const piece = "O";
const onClick = () => undefined;

describe("Square", () => {
  it("print can move square", () => {
    const wrapper = shallow(
      <Square canMove={true} onClick={onClick} value={piece} />
    );
    expect(wrapper.find(".can-click").length).toBe(1);
    wrapper.setProps({ canMove: false });
    expect(wrapper.find(".can-click").length).toBe(0);
  });
});

*/
