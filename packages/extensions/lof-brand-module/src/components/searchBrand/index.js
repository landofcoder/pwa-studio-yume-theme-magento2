import React, { useMemo } from 'react';
import { Form } from 'informed';
import Icon from '@landofcoder/yume-ui/src/components/Icon';
import { Search as SearchIc } from 'react-feather';
import classes from './searchBrand.css';
import { useSearchBrand } from '../../hooks/useSearchBrand';
import LoadingIndicator from '@landofcoder/yume-ui/src/components/LoadingIndicator';
import { Link } from '@magento/venia-drivers';

const searchIcon = <Icon src={SearchIc} attrs={{ width: 16 }} />;

const SearchBrand = props => {
    const { brandData, brandError, brandLoading, setName } = useSearchBrand();
    let searchResult = [];
    if (brandError) {
        return 'Something wrong';
    }
    if (
        brandData &&
        brandData.lofBrandList &&
        brandData.lofBrandList.items &&
        brandData.lofBrandList.total_count != 0
    ) {
        const brands = brandData.lofBrandList.items;
        searchResult = brands.map((brand, index) => {
            return (
                <li key={index} className={classes.searchResultItem}>
                    <div>
                        <Link to={`/`}>
                            <p className={classes.brandName}>{brand.name}</p>
                        </Link>
                    </div>
                </li>
            );
        });
        console.log('brand data', searchResult);
    }
    return (
        <div className={classes.searchBrandBoxCol}>
            <h1 className={classes.brandTitle}>Brands</h1>
            <Form autoComplete="off" className={classes.searchForm}>
                <div className={classes.searchFieldCtn}>
                    <div className={classes.searchField}>
                        {searchIcon}
                        <input
                            id="brand-search-input-field"
                            type="text"
                            onChange={e => {
                                setTimeout(() => {
                                    if (!brandLoading) {
                                        setName(
                                            document.getElementById(
                                                'brand-search-input-field'
                                            ).value
                                        );
                                    }
                                }, 2000);
                            }}
                            // onChange={e => {
                            //     if(!brandLoading) {
                            //         setName(document.getElementById('brand-search-input-field').value)
                            //     }
                            // }}
                            placeholder={`Search brand here...`}
                        />
                    </div>
                </div>
                <div>
                    {brandLoading ? (
                        <LoadingIndicator />
                    ) : (
                        <ul>{searchResult}</ul>
                    )}
                </div>
            </Form>
        </div>
    );
};
export default SearchBrand;
