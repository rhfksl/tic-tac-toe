import React from "react";

interface HistoryButtonsProps{
  histories: (null | string)[][][];
  jumpHistory(step: number): void;
}

export const HistoryButtons: React.FunctionComponent<HistoryButtonsProps> = props => {
  const { histories, jumpHistory } = props;

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