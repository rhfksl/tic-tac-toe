import React from "react";
import renderer from "react-test-renderer";

import isWinner from "./functions";
import TicTacToe from "./TicTacToe";
import Board from "./Board";
import HistoryButtons from "./HistoryButtons";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow, mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

describe("Snapshot Check", () => {
  it("check snapshot and TicTacToe component", () => {
    const tree = renderer.create(<TicTacToe />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("<TicTacToe /> Component rendering Check", () => {
  const wrapper = shallow(<TicTacToe />);

  it("renders 1 <Board /> and 1 <HistoryButtons />", () => {
    expect(wrapper.find(Board)).toHaveLength(1);
    expect(wrapper.find(HistoryButtons)).toHaveLength(1);
  });

  it("renders an `#game-main` div element", () => {
    expect(wrapper.find("#game-main")).toHaveLength(1);
  });
});

describe("<TicTacToe /> Component state Check", () => {
  const wrapper = mount(<TicTacToe />);

  it("renders an states correctly", () => {
    const defaultBoard = [
      [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ],
    ];
    expect(wrapper.state().isNextX).toEqual(true);
    expect(wrapper.state().histories).toEqual(defaultBoard);
    expect(wrapper.state().step).toEqual(0);
  });

  it("renders an 9 squares first", () => {
    expect(wrapper.find(".square")).toHaveLength(9);
  });

  it("clicks first square", () => {
    const square = wrapper.find(".square").first();
    square.simulate("click");
    expect(wrapper.state().isNextX).toEqual(false);
    expect(wrapper.state().step).toEqual(1);
  });

  it("check X is written on first square", () => {
    const square = wrapper.find(".square").first();
    expect(square.text()).toEqual("X");
  });

  it("clicks second square", () => {
    const square = wrapper.find(".square").at(1);
    square.simulate("click");
    expect(wrapper.state().isNextX).toEqual(true);
    expect(wrapper.state().step).toEqual(2);
  });

  it("clicks 0->1->3->4->6 and check winner is X", () => {
    let square = wrapper.find(".square").at(3);
    square.simulate("click");
    square = wrapper.find(".square").at(4);
    square.simulate("click");
    square = wrapper.find(".square").at(6);
    square.simulate("click");
    expect(wrapper.state().isNextX).toEqual(false);
    expect(wrapper.state().step).toEqual(5);
    let histories = wrapper.state().histories;
    expect(isWinner(histories[histories.length - 1])).toBe("X");
  });
});

describe("test isWinner func works well", () => {
  it("when board elements are all null result should be null", () => {
    expect(
      isWinner([
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ])
    ).toBe(null);
  });
  test("when X is winner in 3x3 board", () => {
    expect(
      isWinner([
        [null, "X", "O"],
        ["O", "X", null],
        [null, "X", null],
      ])
    ).toBe("X");
  });
  test("boares are full but nobody wins in 4x4 board", () => {
    expect(
      isWinner([
        ["X", "O", "O", "O"],
        ["O", "X", "X", "X"],
        ["X", "X", "O", "O"],
        ["X", "X", "O", "X"],
      ])
    ).toBe(null);
  });
});
