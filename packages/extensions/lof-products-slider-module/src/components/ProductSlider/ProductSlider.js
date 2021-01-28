import React, { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import styles from './style.css';
import { useQuery } from '@apollo/client';

import sliderQuery from './productSlider.gql';
// import Product from "@magento/venia-ui/lib/components/Gallery";
import GalleryItem from '@landofcoder/yume-ui/src/components/Gallery/item';

const mapGalleryItem = item => {
    const { small_image } = item;
    // console.log("ITEM", item)
    return {
        ...item,
        small_image:
            typeof small_image === 'object' ? small_image.url : small_image
    };
};

const Slider = () => {
    const { queries } = sliderQuery;
    const { getTopProductQuery } = queries;
    const { loading, error, data } = useQuery(getTopProductQuery);
    // console.log("ABC",data);
    const params = {
        slidesPerView: 5,
        spaceBetween: 30,
        breakpoints: {
            1281: {
                slidesPerView: 7
            },
            1024: {
                slidesPerView: 5
            },
            768: {
                slidesPerView: 4
            },
            640: {
                slidesPerView: 3
            },
            320: {
                slidesPerView: 2
            }
        }
    };
    if (loading) return null;
    const galleryItems = data.products.items.map((item, index) => {
        return (
            <div key={index}>
                <GalleryItem key={index} item={mapGalleryItem(item)} />
            </div>
        );
    });
    return (
        <div className="product-slider-container">
            <Swiper {...params}>{galleryItems}</Swiper>
        </div>
    );
};
export default Slider;
