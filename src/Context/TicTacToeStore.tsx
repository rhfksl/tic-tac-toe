import React, { useReducer } from 'react';
import { Reducer, initialState } from './Reducers';
import { TicTacToeContextType } from '../Interface/Interface';

export const TicTacToeContext = React.createContext<TicTacToeContextType>({...initialState.TicTacToeStates, dispatch: ()=> {}});

export const TicTacToeStore: React.FunctionComponent<{}> = function(props){
    
    const [ states, dispatch ] = useReducer(Reducer, initialState);
    const { histories, isNextX, step, winner } = states.TicTacToeStates;
    return (
        <TicTacToeContext.Provider value={{ histories, isNextX, step, winner, dispatch }}>
            {props.children}
        </TicTacToeContext.Provider>
    )
}