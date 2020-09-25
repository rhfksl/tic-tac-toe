import React from "react";
import './HistoryButtons.css';

export interface HistoryButtonsProps{
  histories: (null | string)[][][];
  jumpHistory(step: number): void;
  backgroundColor: string;
  color: string;
  size: string;
  fontSize: string;
}

export const HistoryButtons: React.FunctionComponent<HistoryButtonsProps> = props => {
  const { histories, jumpHistory, backgroundColor, color, size, fontSize } = props;

  const historyButtons: JSX.Element[] = histories.map((_, step: number) => {
    return (
      <button 
        key={step} 
        onClick={()=>{jumpHistory(step)}}
        style={{backgroundColor, color, fontSize}}
        className={`button-size-${size}`}
        >
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