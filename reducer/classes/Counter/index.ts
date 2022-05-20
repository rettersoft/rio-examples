import RDK, { Data, InitResponse, Response, StepResponse, KeyValue } from "@retter/rdk";
import { CounterInput, State } from './rio'
import { ActionType, initialState, reducer } from './state'

const rdk = new RDK();

export async function authorizer(data: Data): Promise<Response> {
    return { statusCode: 200 };
}

export async function init(data: Data): Promise<Data> {
    data.state.public = initialState
    return data
}

export async function getState(data: Data): Promise<Response> {
    return { statusCode: 200, body: data.state };
}

export async function increment(data: Data<CounterInput, State, State>): Promise<Data> {

    data.state.public = reducer(data.state.public, { type: ActionType.INCREMENT, payload: data.request.body.amount });

    data.response = {
        statusCode: 200,
        body: data.state.public,
    };

    return data;
}

export async function decrement(data: Data<CounterInput, State, State>): Promise<Data> {

    data.state.public = reducer(data.state.public, { type: ActionType.DECREMENT, payload: data.request.body.amount });

    data.response = {
        statusCode: 200,
        body: data.state.public,
    };
    
    return data;
}


