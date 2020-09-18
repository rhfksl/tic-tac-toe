import React from 'react';
import { TicTacToeStore } from './Context/TicTacToeStore';
import { TicTacToe } from './TicTacToe';

export const App = function(props: any){
   
    return (
    <TicTacToeStore>
      <TicTacToe />
    </TicTacToeStore>
    )
}