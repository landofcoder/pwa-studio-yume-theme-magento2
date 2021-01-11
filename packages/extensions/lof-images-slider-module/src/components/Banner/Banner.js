import React from 'react';
import Swiper from 'react-id-swiper';
import styles from './style.css';
import { useQuery } from '@apollo/client';
import { GET_BANNERS_SLIDER } from './BannerSlider.gql';
import LoadingIndicator from '@landofcoder/yume-ui/src/components/LoadingIndicator';

const Banner = () => {
    const params = {
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    };
    const { loading, error, data } = useQuery(GET_BANNERS_SLIDER, {
        variables: {
            sliderId: 1
        }
    })
    if (loading) return (
        <LoadingIndicator />
    )
    if (error) {
        console.log("ERROR", error)
        return null
    }
    if (data) {
        console.log("DATA", data)
    }
    const items = data.lofBannerSlider.banners.map((banner, index) => {
        //check type banner
        if (banner.resource_type != "Youtube-video") {
            return (
                <div key={index}
                    style={{
                        backgroundImage: `url("${banner.resource_path}")`,
                    }}
                    className={styles.bannerImage}
                >
                    <div className={styles.bannerText}>
                        <h3 className={styles.subIntrolTitle}>You're looking good</h3>
                        <h1 className={styles.mainIntroTitle}>{banner.title}</h1>
                    </div>
                </div>
            )
        }
    })
    return (
        <div className={styles.bannerStyle}>
            <Swiper {...params}>
                {items}
                <div
                    className={styles.bannerImage}
                >
                    <iframe
                        style={{
                            margin: "0 50px 0 50px"
                        }}
                        width="1920"
                        height="500" src="https://www.youtube.com/embed/377AQ0y6LPA"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    ></iframe>
                </div>
            </Swiper>
        </div>
    );
};
export default Banner;
