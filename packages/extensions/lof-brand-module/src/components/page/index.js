import React from 'react';
import { useListBrand } from '../../hooks/useListBrand';
import LoadingIndicator from "@magento/venia-ui/lib/components/LoadingIndicator";
import { Title} from "@magento/venia-ui/lib/components/Head";
import BreadCrumb from '../breadcrumb/index';
import classes from './page.css';
import { Link } from '@magento/venia-drivers';
import Icon from "@magento/venia-ui/lib/components/Icon";
import { Search as SearchIc } from 'react-feather';
import SearchBrandBar from "../searchBrand";

const searchIcon = <Icon src={SearchIc} attrs={{ width: 16 }} />;

const Page = props => {
    const { listBrandData, listBrandError, listBrandLoading } = useListBrand();

    if (listBrandError) {
        return 'No items';
    }
    if (listBrandLoading) {
        return <LoadingIndicator />;
    }

    return (
        <React.Fragment>
            <Title>Brands</Title>
            <BreadCrumb
                items={[
                    {
                        label: 'Brands'
                    }
                ]}
            ></BreadCrumb>
            <div className={classes.brandsContainer}>
                <div className={classes.brandsSearch}>
                    <SearchBrandBar />
                </div>
                <div className={classes.brandsList}>
                    <div className={classes.brandListRow}>
                        {listBrandData.lofBrandList.items.map(
                            (brand, index) => {
                                const lowercase = brand.name.toLowerCase();
                                const formatted = lowercase.replace(' ', '-');
                                return (
                                    <div
                                        className={classes.brandItem}
                                        key={index}
                                    >
                                        <Link to={`/brand/${formatted}.html`}>
                                            <img
                                                src={brand.thumbnail}
                                                className={
                                                    classes.brandThumbnail
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
            {/* <div className={classes.parentContainer}>
                <div className={classes.searchBrandColumn}>
                    <h3>Search Brand</h3>
                </div>
                <div className={classes.brandsContainer}>
                    {listBrandData.lofBrandList.items.map((brand, index) => {
                        const lowercase = brand.name.toLowerCase();
                        const formatted = lowercase.replace(' ', '-');
                        return (
                            <div className={classes.brandItem} key={index}>
                                <Link to={`/brand/${formatted}.html`}>
                                    <img src={brand.thumbnail} />
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </div> */}
        </React.Fragment>
    );
};
export default Page;
