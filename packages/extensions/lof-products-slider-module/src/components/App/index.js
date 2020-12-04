import React from 'react';
import Slider from '../ProductSlider/ProductSlider';
import styles from './index.css';
const App = () => {
    return (
        <div className={styles.productSliderModule}>
            <div className={styles.wrapperSlider}>
                <div className={styles.title}>
                    <h2>Top products</h2>
                </div>
                <Slider />
                <div className={styles.title}>
                    <h2>Feature products</h2>
                </div>
                <Slider />
                <div className={styles.title}>
                    <h2>Best seller products</h2>
                </div>
                <Slider />
                <div className={styles.title}>
                    <h2>Deals products</h2>
                </div>
                <Slider />
            </div>
        </div>
    );
};
export default App;
