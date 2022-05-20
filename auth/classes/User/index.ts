import RDK, { Data, InitResponse, Response, StepResponse } from "@retter/rdk";

const rdk = new RDK();

export async function authorizer(data: Data): Promise<Response> {
    return { statusCode: 200 };
}

export async function init(data: Data): Promise<Data> {
    data.state.public = {
        email: data.request.body.email
    }
    await rdk.setLookUpKey({
        key: { name: "email", value: data.state.public.email }
    })
    return data
}

export async function getState(data: Data): Promise<Response> {
    return { statusCode: 200, body: data.state };
}

export async function sayHello(data: Data): Promise<Data> {
    data.response = {
        statusCode: 200,
        body: { message: data.state.public.message },
    };
    return data;
}
