interface EmailService {
    sendEmail(email: string, subject: string, message: string): Promise<void>;
}

class SampleEmailService implements EmailService {
    sendEmail(email: string, subject: string, message: string): Promise<void> {
        return new Promise((resolve, reject) => {
            console.log(`Sending email to ${email}`);
            resolve();
        });
    }
}

// Function returning a new instance of the service
export function getEmailService(): EmailService {
    return new SampleEmailService();
}