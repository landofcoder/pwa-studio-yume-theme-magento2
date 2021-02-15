import React from 'react';
import { Form } from 'informed';
import Icon from '@landofcoder/yume-ui/src/components/Icon';
import { Search as SearchIc } from 'react-feather';
import classes from './searchBrand.css';
import { useSearchBrand } from '../../hooks/useSearchBrand';

const searchIcon = <Icon src={SearchIc} attrs={{ width: 16 }} />;

const SearchBrand = props => {

    const {
        brandData,
        brandError,
        brandLoading,
        setName
    } = useSearchBrand();
    if (brandData) {
        console.log("brand data", brandData)
    }
    return (
        <div className={classes.searchBrandBoxCol}>
            <h1 className={classes.brandTitle}>Search Brand</h1>
            <Form autoComplete="off" className={classes.searchForm}>
                <div className={classes.searchFieldCtn}>
                    <div className={classes.searchField}>
                        {searchIcon}
                        <input
                            id="brand-search-input-field"
                            type="text"
                            // onChange={e => {
                            //     setTimeout(() => {
                            //         if(!brandLoading) {
                            //             setName(document.getElementById('brand-search-input-field').value)
                            //         }
                            //     }, 2000)
                            // }}
                            onChange={e => {
                                if(!brandLoading) {
                                    setName(document.getElementById('brand-search-input-field').value)
                                }
                            }}
                            placeholder={`Search brand here...`}
                        />
                    </div>
                </div>
            </Form>
        </div>
    );
};
export default SearchBrand;
