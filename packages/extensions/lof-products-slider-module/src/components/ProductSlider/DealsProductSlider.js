import React, { useEffect, useState } from 'react';
import Swiper from 'react-id-swiper';
import styles from './style.css';
import { useQuery } from '@apollo/client';

import sliderQuery from './productSlider.gql';
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

const DealsProductSlider = () => {
    const { queries } = sliderQuery;
    const { getDealProductQuery } = queries;
    const { data, error, loading } = useQuery(getDealProductQuery);
    console.log(data);
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
    if (loading || data === undefined){
        return (<div/>)
    } else {
        const galleryItems = data.lofProductListDeals.items.map((item, index) => {
            return (
                <div key={index}>
                    <GalleryItem key={index} item={mapGalleryItem(item)}/>
                </div>
            );
        });
        return (
            <div>
                <div className={styles.title}>
                    <h2>Deals products</h2>
                </div>
                <div className="product-slider-container">
                    <Swiper {...params}>{galleryItems}</Swiper>
                </div>
            </div>
        );
    }
};
export default DealsProductSlider;
