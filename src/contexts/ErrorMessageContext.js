import { createContext } from 'react';

export const ErrorMessageContext = createContext({
    message: '',
    setErrorMessage() {},
});
