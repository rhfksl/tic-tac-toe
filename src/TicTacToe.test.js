import React from "react";

import isWinner from "./functions";
import TicTacToe from "./TicTacToe";
import Board from "./Board";
import HistoryButtons from "./HistoryButtons";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallow } from "enzyme";
import sinon from "sinon";

Enzyme.configure({ adapter: new Adapter() });

describe("<TicTacToe /> Component Check", () => {
  it("renders 1 <Board /> and 1 <HistoryButtons />", () => {
    const wrapper = shallow(<TicTacToe />);
    expect(wrapper.find(Board)).toHaveLength(1);
    expect(wrapper.find(HistoryButtons)).toHaveLength(1);
  });

  it("renders an `#game-main`", () => {
    const wrapper = shallow(<TicTacToe />);
    expect(wrapper.find("#game-main")).toHaveLength(1);
  });

  // it('simulates click events', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = shallow(<Foo onButtonClick={onButtonClick} />);
  //   wrapper.find('button').simulate('click');
  //   expect(onButtonClick).to.have.property('callCount', 1);
  // });
});

describe("test isWinner func works well", () => {
  it("when board elements are all null", () => {
    expect(isWinner([null, null, null, null, null, null, null, null, null])).toBe(null);
  });
  test("when X is winner", () => {
    expect(isWinner([null, "X", "O", "O", "X", null, null, "X", null])).toBe("X");
  });
  test("boares are full but nobody wins", () => {
    expect(isWinner(["X", "O", "O", "O", "X", "X", "X", "X", "O"])).toBe(null);
  });
});
