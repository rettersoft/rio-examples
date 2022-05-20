import { State } from './rio'


export enum ActionType {
    INCREMENT = "INCREMENT",
    DECREMENT = "DECREMENT",
}
export interface Action {
    type: ActionType;
    payload: any;
}
export const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case ActionType.INCREMENT: {
            return { ...state, counter: state.counter + action.payload };
        }
        case ActionType.DECREMENT: {
            return { ...state, counter: state.counter - action.payload };
        }
        default:
            return state;
    }
};
export const initialState: State = {
    counter: 0
};


