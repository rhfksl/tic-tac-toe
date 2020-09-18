import { TicTacToeStates } from '../Interface/Interface';

export const initialState: TicTacToeStates = {
    histories: [ [Array(3).fill('#'), Array(3).fill('#'), Array(3).fill('#')] ],
    isNextX: true,
    step: 0,
    winner: null
};

export const Reducer = function(state: any, action: any){
    switch (action.type) {
        case 'SET_HISTORIES':
          return {
              ...state,
              histories: [...state.histories, action.payload]
          }
          break;
        case 'SET_ISNEXTX':
            return {
                ...state,
                isNextX: action.payload
            }
            break;
        case 'SET_STEP':
            return {
                ...state,
                step: action.payload
            }
            break;
        case 'SET_WINNER':
            return {
                ...state,
                winner: action.payload
            }
          break;
        default:
          return initialState;
      }
};

