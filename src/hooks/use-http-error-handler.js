
import React, { useState, useEffect } from 'react';

export const useHttpErrorHandler = (axios)=>{

    const [error, setError] = useState(null);
    const reqInterceptor = axios.interceptors.request.use(request => {
        // Set error to null before each request is sent
        setError(null);
        return request;
    });
    const resInterceptor = axios.interceptors.response.use(response => response, error => {
        setError(error);
        return Promise.reject(error);
    });

    useEffect(() => {
        //cleanup
        return () => {
            axios.interceptors.request.eject(reqInterceptor);
            axios.interceptors.response.eject(resInterceptor);
        };
    }, [reqInterceptor, resInterceptor]);

    /*const errorConfirmedHandler = () => {
        setError(null);
    };*/


    return [ error, setError];
}

   
