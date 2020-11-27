import React from 'react';
import Slider from '../components/Sider/Slider';
import styles from './index.css';

const App = () => {
    return (
        <div className={styles.productSliderModule}>
            <div>
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
