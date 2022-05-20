import RDK, { Data, InitResponse, Response, StepResponse } from "@retter/rdk";

const rdk = new RDK();

import { getEmailService } from "./emailService";
const emailService = getEmailService()

export async function authorizer(data: Data): Promise<Response> {
    return { statusCode: 200 };
}

export async function getInstanceId(data: Data): Promise<string> {
    return data.request.body.email
}

export async function init(data: Data): Promise<Data> {
    data.state.public = {
        email: data.request.body.email
    }
    return data
}

export async function getState(data: Data): Promise<Response> {
    return { statusCode: 200, body: data.state };
}

export async function sendOtp(data: Data): Promise<Data> {

    const otp = Math.random().toString().slice(2, 6);

    data.state.private.otp = otp

    await emailService.sendEmail(data.state.public.email, "OTP", otp)

    data.response = {
        statusCode: 200,
        body: "OK",
    };
    return data;
}

export async function verifyOtp(data: Data): Promise<Data> {

    // Check if the OTP is correct
    if (data.request.body.otp === data.state.private.otp) {

        let instanceId:string|null = null

        data.state.private.otp = null;

        // Get the instance with the given Email
        const instanceLookupResult = await rdk.getInstance({
            classId: "User",
            lookupKey: {
                name: "email",
                value: data.state.public.email
            }
        })

        if ( instanceLookupResult.statusCode === 200 && instanceLookupResult.body.instanceId ) {
            instanceId = instanceLookupResult.body.instanceId
        } else {

            // Create a new instance because there is no instance with the given email
            const getInstanceResult = await rdk.getInstance({
                classId: "User", 
                body: {
                    email: data.state.public.email
                }
            })

            if (getInstanceResult.statusCode === 200 && getInstanceResult.body.instanceId) {
                instanceId = getInstanceResult.body.instanceId
            }

        }

        if(instanceId) {
            // Generate a new token
            const customTokenResult = await rdk.generateCustomToken({
                identity: "User",
                userId: instanceId,
            })
            if(customTokenResult.success) {
                data.response = {
                    statusCode: 200,
                    body: {
                        customToken: customTokenResult.data.customToken
                    }
                }
            } else {
                data.response = {
                    statusCode: 500,
                    body: "Could not generate token"
                }
            }
        } else {

            data.response = {
                statusCode: 500,
                body: "An error occured"
            }

        }
        
    } else {
        data.response = {
            statusCode: 400,
            body: {
                message: "Invalid OTP"
            }
        }
    }

    
    return data;
}
