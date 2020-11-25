import React from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
// import Swiper from 'react-id-swiper';
import Product from '../Product/Product';
import { Swiper, SwiperSlide } from 'swiper/react';

import defaultClasses from './slider-style.css';
const Slider = (props) => {
    const { classes: propClasses } = props;
    const classes = mergeClasses(defaultClasses, propClasses);

    return (
        <div className={classes.productSliderContainer}>
            <Swiper
                style={{ display: 'flex', backgroundColor: "red" }}
                spaceBetween={50}
                slidesPerView={3}
                onSlideChange={() => console.log('slide change')}
                onSwiper={swiper => console.log(swiper)}
            >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                ...
            </Swiper>
        </div>
    );
};

export default Slider;
