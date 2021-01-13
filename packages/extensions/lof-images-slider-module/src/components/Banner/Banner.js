import React from 'react';
// import Swiper from 'react-id-swiper';
import ReactDOM from 'react-dom';
import styles from './style.css';
import { useQuery } from '@apollo/client';
import { GET_BANNERS_SLIDER } from './BannerSlider.gql';
import LoadingIndicator from '@landofcoder/yume-ui/src/components/LoadingIndicator';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import 'swiper/components/scrollbar/scrollbar.min.css';
import 'swiper/components/a11y/a11y.min.css';
import 'swiper/components/controller/controller.min.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Autoplay, Controller } from 'swiper';
import RichContent from '@landofcoder/yume-ui/src/components/RichContent';

SwiperCore.use([Navigation, Pagination, Scrollbar, , A11y, Autoplay, Controller])
const Banner = () => {
    const params = {
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false
        },
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        spaceBetween: 30,
        slidesPerView: 1

    }
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
        if (banner.resource_type == "youtube_video") {
            return (
                <SwiperSlide key={index}>
                    <div
                        className={styles.bannerImage}
                    >
                        <iframe
                            style={{
                                margin: "0 50px 0 50px"
                            }}
                            width="1920"
                            height="500" src={`${banner.resource_path}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                    </div>
                </SwiperSlide>
            )
        }
        else if (banner.resource_type == "external_image") {
            return (
                <SwiperSlide key={index}>
                    <div
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
                </SwiperSlide>
            )
        }
        else if (banner.resource_type == "local_image") {
            return (
                <SwiperSlide key={index}>
                    <div
                        style={{
                            backgroundImage: `url("http://magento2.landofcoder.com/media/${banner.resource_path}")`,
                        }}
                        className={styles.bannerImage}
                    >
                        <div className={styles.bannerText}>
                            <h3 className={styles.subIntrolTitle}>You're looking good</h3>
                            <h1 className={styles.mainIntroTitle}>{banner.title}</h1>
                        </div>
                    </div>
                </SwiperSlide>
            )
        }
        else if (banner.resource_type == "custom_html") {
            
            return (
                <SwiperSlide key={index}>
                    {/* <div className={styles.bannerImage}>
                        {ReactDOM.render(banner.)}
                        {banner.resource_path}
                    </div> */}
                    <RichContent html={banner.resource_path}></RichContent>
                    {/* {banner.resource_path} */}
                </SwiperSlide>
            )
        }
    })
    console.log("ITEMS", items)
    return (
        <div className={styles.bannerStyle}>
            <Swiper
                {...params}
            >
                {items}
            </Swiper>
        </div>
    );
};
export default Banner;
