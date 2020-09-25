import { StoreType, ActionType } from '../Interface/Interface';
import { SET_TICTACTOE_STATES } from '../Constans/Constans';

export const initialState: StoreType = {
    TicTacToeStates: {
        histories: [ [Array(3).fill('#'), Array(3).fill('#'), Array(3).fill('#')] ],
        isNextX: true,
        step: 0,
        winner: null
    }
    // 추후 관리해야하는 states가 늘어나도 사용할 수 있게
};


export const Reducer = function(state: StoreType, action: ActionType): StoreType{
    switch (action.type) {
        case SET_TICTACTOE_STATES:
          return {
              ...state,
              TicTacToeStates: action.payload,
          };
        default:
          return initialState;
      }
};

