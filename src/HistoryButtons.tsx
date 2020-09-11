import React from "react";
import  { HistoryButtonsProps } from './Interface/Interface';


class HistoryButtons extends React.Component<HistoryButtonsProps> {
  render(): JSX.Element {
    const historyButtons: JSX.Element[] = this.props.histories.map((_, step) => {
      return (
        <button key={step} onClick={this.props.jumpHistory.bind(this, step)}>
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
}

export default HistoryButtons;
