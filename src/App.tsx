import React from 'react';
import { TicTacToeStore } from './Context/TicTacToeStore';
import { TicTacToe } from './TicTacToe';

export const App: React.FunctionComponent<{}> = function(props: {}){
    return (
    <TicTacToeStore>
      <TicTacToe />
    </TicTacToeStore>
    )
}