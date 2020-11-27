import React from 'react';
import Swiper from 'react-id-swiper';
import './slider-style.css';
// import { useQuery } from '@apollo/client';

import sliderQuery from './slider.gql';
const Slider = () => {
    const { queries } = sliderQuery;
    const { getCountryQuery, getTopProductQuery } = queries;
    // const { data, error, loading } = useQuery(getTopProductQuery);

    const params = {
        slidesPerView: 3,
        spaceBetween: 30,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        }
    };
    return (
        <div className="product-slider-container">
            <Swiper {...params}>
                <div
                    style={{
                        width: '300px',
                        height: '400px',
                        backgroundColor: 'yellow'
                    }}
                >
                    Slide #1
                </div>
                <div
                    style={{
                        width: '300px',
                        height: '400px',
                        backgroundColor: 'yellow'
                    }}
                >
                    Slide #1
                </div>
                <div
                    style={{
                        width: '300px',
                        height: '400px',
                        backgroundColor: 'yellow'
                    }}
                >
                    Slide #1
                </div>
                <div
                    style={{
                        width: '300px',
                        height: '400px',
                        backgroundColor: 'yellow'
                    }}
                >
                    Slide #1
                </div>
                <div
                    style={{
                        width: '300px',
                        height: '400px',
                        backgroundColor: 'yellow'
                    }}
                >
                    Slide #1
                </div>
            </Swiper>
        </div>
    );
};
export default Slider;
