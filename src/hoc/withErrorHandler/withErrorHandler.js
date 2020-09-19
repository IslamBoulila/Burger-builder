import React from 'react';


import Modal from '../../components/UI/Modal/Modal';
import {useHttpErrorHandler} from '../../hooks/use-http-error-handler';

const withErrorHandling = (WrappedComponent, axios) => {

    const WithErrorHandler = props => {
        const [error, setError] = useHttpErrorHandler(axios);
      
        const errorConfirmedHandler = () => {
            setError(null);
        };
        return (
            <>
                <Modal show={error} modalClosed={errorConfirmedHandler}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </>
        );
    };
    return WithErrorHandler;
};
export default withErrorHandling;