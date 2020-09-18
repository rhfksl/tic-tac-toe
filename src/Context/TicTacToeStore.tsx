import React, { useReducer } from 'react';
import { Reducer, initialState } from './Reducers';

export const TicTacToeContext = React.createContext('');

export const TicTacToeStore = function(props: any){
    const [ TicTacToeStates, dispatch ] = useReducer(Reducer, initialState);
    const { histories, isNextX, step, winner }: any = TicTacToeStates;
    const value: any = { histories, isNextX, step, winner, dispatch };
    return (
        <TicTacToeContext.Provider value={value}>
            {props.children}
        </TicTacToeContext.Provider>
    )
}