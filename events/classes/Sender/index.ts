import RDK, { Data, InitResponse, Response, StepResponse } from "@retter/rdk";

const rdk = new RDK();

export async function authorizer(data: Data): Promise<Response> {
    return { statusCode: 200 };
}

export async function init(data: Data): Promise<Data> {
    data.state.public = {
        a: 1
    }
    return data
}

export async function getState(data: Data): Promise<Response> {
    return { statusCode: 200, body: data.state };
}

export async function publishEvent(data: Data): Promise<Data> {

    data.events = [{
        name: "CUSTOM_EVENT",
        payload: {
            "instanceId": "01gbx8kb5j7q1868gchkmej2hb",
            "someNumber": 15,
            "someField": "type2"
        }
    }]

    return data;
}
