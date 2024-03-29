import React from 'react';
import App from '../components/App/index';
const wrapUseImageSlider = original => {
    return function useImageSlider(props) {
        const dataWrapper = original(props);
        return {
            ...dataWrapper,
            data: null,
            components: <App />
        };
    };
};

export default wrapUseImageSlider;
