## 🔃 Axios Exception Handler

A lightweight utility for clean and customizable Axios error handling.

## Installation

```bash
npm install axios-exception-handler
```

```bash
yarn add axios-exception-handler
```

## Usage

Easily handle Axios errors with custom messages for specific HTTP status codes.

### Example

```typescript
import axios from "axios";
import { ExceptionHandler } from "axios-exception-handler";

const getHello = async ({ name }) => {
    const response = await axios.post<SignUpResponseBody>("/hello", {
        name,
        studentId,
        phoneNumber,
    });

    return new ExceptionHandler(response)
        .addCase(404, "Cannot Find User")
        .addCase(409, "Conflict")
        .addCases([500, 501, 503], "Server Error")
        .handle();
};

// Usage
getHello()
    .then((data) => {
        console.log(data); // Hello name
    })
    .catch((err) => {
        console.error(err); // Cannot Find User | Conflict | Server Error
    });
```

## Features

-   **Custom Error Messages**: Map HTTP status codes to specific error messages.
-   **Simple API**: Easily chain `addCase` or `addCases` methods.
-   **TypeScript Support**: Fully typed for seamless integration.

## API

### `ExceptionHandler<T>`

#### Methods:

**`addCase(code: number, message: string): this`**  
Add a single HTTP status code to handle with a custom message.

**`addCases(codes: number[], message: string): this`**  
Add multiple HTTP status codes to handle with the same custom message.

**`handle(): AxiosResponse<T> | Error`**  
Throws an error with the custom message if the status code matches, otherwise returns the Axios response.

## License

This project is licensed under the [ISC License](./LICENSE.md).
