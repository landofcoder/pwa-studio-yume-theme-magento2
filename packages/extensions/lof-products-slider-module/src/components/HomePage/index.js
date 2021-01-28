import React from 'react';
import TopProductSlider from '../ProductSlider/TopProductSlider';
import FeaturedProductSlider from "../ProductSlider/FeaturedProductSlider";
import DealsProductSlider from "../ProductSlider/DealsProductSlider";
import BestSellerProductSlider from "../ProductSlider/BestSellerProductSlider";
import styles from './index.css';
const App = () => {
    return (
        <div className={styles.productSliderModule}>
            <div className={styles.wrapperSlider}>
                <div className={styles.title}>
                    <h2>Top products</h2>
                </div>
                <TopProductSlider />
                <div className={styles.title}>
                    <h2>Feature products</h2>
                </div>
                <FeaturedProductSlider />
                <div className={styles.title}>
                    <h2>Best seller products</h2>
                </div>
                <BestSellerProductSlider />
                <div className={styles.title}>
                    <h2>Deals products</h2>
                </div>
                <DealsProductSlider />
            </div>
        </div>
    );
};
export default App;
