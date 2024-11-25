import { AxiosResponse, AxiosError } from "axios";

class AxiosExceptionHandler<T> {
    public response: AxiosResponse<T> | AxiosError<T> | Error | unknown;
    public exceptions: Map<number, string> = new Map();
    public unHandledMessage: string = "Unhandled exception";

    /**
     * @param response AxiosResponse
     */
    constructor(response: AxiosResponse<T> | AxiosError<T> | Error | unknown) {
        this.response = response;
    }

    /**
     * Add a case
     * @param code HTTP Status Code to handle
     * @param message Error message to throw
     */
    public addCase(code: number, message: string) {
        this.exceptions.set(code, message);
        return this;
    }

    /**
     * Add multiple cases
     * @param {Number[]} codes HTTP Status Codes to handle
     * @param {String} message Error message to throw
     */
    public addCases(codes: number[], message: string) {
        codes.forEach((code) => this.addCase(code, message));
        return this;
    }

    /**
     * Add a default case
     * @param message Error message to throw
     * @default "Unhandled exception"
     */
    public addDefaultCase(message: string) {
        this.unHandledMessage = message;
        return this;
    }

    /**
     * Handle the exception
     * @returns AxiosResponse<T>
     */
    public handle(): AxiosResponse<T> {
        if (!(this.response instanceof AxiosError)) {
            if (this.response instanceof Error) throw this.response;
            return this.response as AxiosResponse<T>;
        }

        const status = this.response.response?.status;

        if (status && this.exceptions.has(status)) {
            throw new Error(this.exceptions.get(status));
        }

        throw new Error(this.unHandledMessage);
    }
}

function ExceptionHandler<T>(response: AxiosResponse<T> | AxiosError<T> | Error | unknown): AxiosExceptionHandler<T> {
    return new AxiosExceptionHandler(response);
}

export { ExceptionHandler };
export default ExceptionHandler;
