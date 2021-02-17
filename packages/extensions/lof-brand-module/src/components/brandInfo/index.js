import React from 'react';
import { useParams } from 'react-router-dom';
import { useBrandInfo } from '../../hooks/useBrandInfo';
import LoadingIndicator from '@landofcoder/yume-ui/src/components/LoadingIndicator';
import classes from './brandInfo.css';
import RichContent from '@landofcoder/yume-ui/src/components/RichContent';

const BrandInfo = props => {
    const { brandUrl } = useParams()
    const { brandData, brandError, brandLoading } = useBrandInfo({ brandUrl })
    let brand = null;
    if (brandLoading) {
        return <LoadingIndicator/>
    }
    if (brandError) {
        return 'Something wrong'
    }
    if (
        brandData &&    
        brandData.lofBrandList &&
        brandData.lofBrandList.items &&
        brandData.lofBrandList.total_count != 0
        ) {
        console.log("Brand info", brandData)
        brand = brandData.lofBrandList.items[0]
    }

    return (
        <div>
            <img src={brand.image} className={classes.brandImage}/>
            <RichContent html={brand.description} />
        </div>
    )
}
export default BrandInfo;