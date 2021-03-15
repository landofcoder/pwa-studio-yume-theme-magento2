import React from 'react';
import styles from './index.css';
import BrandListByProduct from "../brandListByProduct";

const App = (props) => {
    console.log("props1", props)
    return (
        <section className={styles.brandListModule}>
            <BrandListByProduct props={props} />
        </section>
    );
};
export default App;
