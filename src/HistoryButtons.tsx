import React from "react";

interface Props{
  histories: (string|null)[][][];
  jumpHistory(step: number): void;
}

class HistoryButtons extends React.Component<Props> {
  render() {
    const historyButtons = this.props.histories.map((_, step) => {
      return (
        <button key={step} onClick={() => this.props.jumpHistory(step)}>
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
