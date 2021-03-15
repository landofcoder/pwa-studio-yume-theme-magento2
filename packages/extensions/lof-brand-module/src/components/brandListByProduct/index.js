import React from 'react';
import { useBrandListByProduct } from "../../hooks/useListBrandByProduct"
import LoadingIndicator from '@landofcoder/yume-ui/src/components/LoadingIndicator';
import style from './brandListByProduct.css';
import { Link } from '@magento/venia-drivers';


const BrandListByProduct = props => {
    const { listBrandData, listBrandError, listBrandLoading } = useBrandListByProduct(props);

    if (listBrandError) {
        return 'No items';
    }
    if (listBrandLoading) {
        return <LoadingIndicator />;
    }
    if (listBrandData.lofBrandByProduct.items.length <= 0) {
        return null;
    } else {
        return (
            <React.Fragment>
                <div className={style.brandsContainer}>
                    <div className={style.brandsList}>
                        <div className={style.brandListRow}>
                            <div className={style.brandTitle}>
                                <p>Brand: </p>
                            </div>
                            {listBrandData.lofBrandByProduct.items.map(
                                (brand, index) => {
                                    const lowercase = brand.name.toLowerCase();
                                    const formatted = lowercase.replace(' ', '-');
                                    return (
                                        <div
                                            className={style.brandItem}
                                            key={index}
                                        >
                                            <Link to={`/brand/${formatted}.html`}>
                                                <img
                                                    src={brand.thumbnail}
                                                    className={
                                                        style.brandThumbnail
                                                    }
                                                />
                                            </Link>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};
export default BrandListByProduct;
