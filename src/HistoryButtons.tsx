import React, { useContext } from "react";
import { TicTacToeContext } from './Context/TicTacToeStore';
import { SET_TICTACTOE_STATES } from './Constans/Constans';

export const HistoryButtons: React.FunctionComponent<{}> = () => {
  // const { jumpHistory } = props;
  const { histories, winner, dispatch } = useContext(TicTacToeContext);

  function jumpHistory(newStep: number): void {
    dispatch({ type: SET_TICTACTOE_STATES, payload: { histories: histories, isNextX: newStep % 2 === 0, step: newStep, winner: winner } });
  }

  const historyButtons: JSX.Element[] = histories.map((_, step: number) => {
    return (
      <button key={step} onClick={()=>{jumpHistory(step)}}>
        {step === 0 ? "game start" : `go to ${step} step`}
      </button>
    );
  });

  return (
    <div className="history">
      Jump to history
      <div className="history-button-box">{historyButtons}</div>
    </div>
  );
}