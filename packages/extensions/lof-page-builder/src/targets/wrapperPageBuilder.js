import React from 'react';
import App from '../components/PageBuilder';

export const usePageBuilder = (props = {}) => {

    console.log("hooks page builder");
    return {
        data: null,
        components: <App />
    };
};
