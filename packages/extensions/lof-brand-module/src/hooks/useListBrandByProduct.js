import React from 'react';
import { useQuery } from '@apollo/client';
import brandListQuery from './brand.gql';

const useBrandList = () => {
    const { queries } = brandListQuery;
    const { lofBrandByProduct } = queries;
    const { data, error, loading } = useQuery(lofBrandByProduct);
    console.log(data);
    if (loading || data === undefined){
        return (<div/>)
    } else {
        const brandList = data.lofBrandByProduct.items.map((item, index) => {
            return item.name
        });
        return (
            <div>
                <p>Test</p>
            </div>
        );
    }
};
export default useBrandList;
