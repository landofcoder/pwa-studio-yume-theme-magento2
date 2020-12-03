import React  from 'react';
import Swiper from 'react-id-swiper';
import styles from './style.css';


const mapGalleryItem = item => {
    const { small_image } = item;
    return {
        ...item,
        small_image:
            typeof small_image === 'object' ? small_image.url : small_image
    };
};

const Slider = () => {
    const params = {
        slidesPerView: 1,
        spaceBetween: 30,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
    };
    return (
        <div className={styles.bannerStyle}>
            <Swiper {...params}>
                <div>
                    <img
                        className={styles.imageStyle}
                        src={
                            'https://venia.magento.com/media/venia-hero2.jpg?auto=webp&format=pjpg&quality=85'
                        }
                    />
                </div>
                <div>
                    <img
                        className={styles.imageStyle}
                        src={
                            'https://venia.magento.com/media/venia-hero1.jpg?auto=webp&format=pjpg&quality=85'
                        }
                    />
                </div>
            </Swiper>
        </div>
    );
};
export default Slider;
