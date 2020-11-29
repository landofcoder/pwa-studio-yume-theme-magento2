import React, { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import styles from './style.css';
import { useQuery } from '@apollo/client';

import sliderQuery from './Banner.gql';
// import Product from "@magento/venia-ui/lib/components/Gallery";
import GalleryItem from '@landofcoder/yume-ui/src/components/Gallery/item';

const mapGalleryItem = item => {
    const { small_image } = item;
    return {
        ...item,
        small_image:
            typeof small_image === 'object' ? small_image.url : small_image
    };
};

const Slider = () => {
    const { queries } = sliderQuery;
    const { getTopProductQuery } = queries;
    const { data, error, loading } = useQuery(getTopProductQuery);
    console.log(data);
    const params = {
        slidesPerView: 1,
        spaceBetween: 30
    };
    if (loading) return null;
    const galleryItems = data.products.items.map((item, index) => {
        return (
            <div>
                <GalleryItem key={index} item={mapGalleryItem(item)} />
            </div>
        );
    });
    return (
        <div className={styles.bannerStyle}>
            <Swiper {...params}>{galleryItems}</Swiper>
        </div>
    );
};
export default Slider;
