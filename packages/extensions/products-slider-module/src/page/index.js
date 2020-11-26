import React from 'react';
import Slider from '../components/Sider/Slider';
import styles from './index.css';
const App = () => {
    return (
        <div>
            <div className={styles.title}>Top products</div>
            <Slider />
        </div>
    );
};
export default App;
