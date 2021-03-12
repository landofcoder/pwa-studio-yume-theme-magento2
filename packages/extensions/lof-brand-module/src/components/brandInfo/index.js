import React from 'react';
import { useParams } from 'react-router-dom';
import { useBrandInfo } from '../../hooks/useBrandInfo';
import LoadingIndicator from '@landofcoder/yume-ui/src/components/LoadingIndicator';
import classes from './brandInfo.css';
import RichContent from '@landofcoder/yume-ui/src/components/RichContent';
import Gallery from "@landofcoder/yume-ui/src/components/Gallery";

const BrandInfo = props => {
    const { brandUrl } = useParams();
    const { brandData, brandError, brandLoading } = useBrandInfo({ brandUrl });
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
        brandData.lofBrandList.total_count !== 0
        ) {
        console.log("Brand info", brandData);
        brand = brandData.lofBrandList.items[0]
    }

    const galleryItems = brandData.lofBrandList.items[0].products.map((item, index) => {
        return item.product;
    });
    return (
        <div>
            <img src={brand.image} className={classes.brandImage} alt={brand.name}/>
            <RichContent html={brand.description} />
            <div className="product-slider-container">
                <Gallery items={galleryItems}/>
            </div>
        </div>
    )
};
export default BrandInfo;
