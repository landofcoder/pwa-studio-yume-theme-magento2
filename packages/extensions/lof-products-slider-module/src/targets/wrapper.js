import React from 'react';
import App from '../components/App/index';
const wrapUseProductRelated = original => {
    return function useProductRelated(props) {
        const dataWrapper = original(props);
        return {
            ...dataWrapper,
            data: null,
            components: <App />
        };
    };
};

export default wrapUseProductRelated;
