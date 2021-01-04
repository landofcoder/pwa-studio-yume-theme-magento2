import React  from 'react';
import Swiper from 'react-id-swiper';
import styles from './style.css';

const Banner = () => {
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
                            'https://i.pinimg.com/originals/02/cf/cf/02cfcffac595c832c514d58704cd82ce.jpg'
                        }
                    />
                </div>
                
            </Swiper>
        </div>
    );
};
export default Banner;
