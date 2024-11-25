import { AxiosResponse, AxiosError } from "axios";

interface ApiException {
    code: number;
    message: string;
}

export class ExceptionHandler<T> {
    public response: AxiosResponse<T> | AxiosError<T>;
    public exceptions: ApiException[] = [];

    /**
     * @param response AxiosResponse
     */
    constructor(response: AxiosResponse<T> | AxiosError<T>) {
        this.response = response;
    }

    /**
     * Add a case
     * @param code HTTP Status Code to handle
     * @param message Error message to throw
     */
    public addCase(code: number, message: string) {
        this.exceptions.push({ code, message });
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
     * Handle the exception
     * @returns AxiosResponse | Error | undefined
     */
    public handle(): AxiosResponse<T> | Error | undefined {
        if (!(this.response instanceof AxiosError)) return this.response;

        const status = this.response.response?.status;

        for (const exception of this.exceptions) {
            if (exception.code === status) throw new Error(exception.message);
        }
        return undefined;
    }
}
