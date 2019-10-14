import { shallow } from "enzyme";
import * as React from "react";
import Board from "./Board";
import Channel from "./Channel";
import CrossSection from "./CrossSection";
import Square from "./Square";

const boardSize = 9;

describe("Board", () => {
  const wrapper = shallow(<Board size={boardSize} />);
  it("include Square, Channel and CrossSection", () => {
    expect(wrapper.find(Square).length).toBe(boardSize * boardSize);
    expect(wrapper.find(Channel).length).toBe(boardSize * (boardSize - 1) * 2);
    expect(wrapper.find(CrossSection).length).toBe(
      (boardSize - 1) * (boardSize - 1)
    );
  });
});
