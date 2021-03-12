import React from 'react';
import styles from './index.css';
import useBrandList from "../../hooks/useListBrandByProduct";

const App = (props) => {
    console.log("props", props)
    return (
        <div className={styles.brandListModule}>
            <useBrandList/>
        </div>
    );
};
export default App;
