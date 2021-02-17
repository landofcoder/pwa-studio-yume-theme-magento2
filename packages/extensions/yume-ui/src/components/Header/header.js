import React, { Suspense, useEffect } from 'react';
import { shape, string } from 'prop-types';

import Logo from '../Logo';
import { Link, resourceUrl, Route } from '@magento/venia-drivers';

import AccountTrigger from './accountTrigger';
import CartTrigger from './cartTrigger';
import NavTrigger from './navTrigger';
import SearchTrigger from './searchTrigger';
import OnlineIndicator from './onlineIndicator';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';

import { mergeClasses } from '@landofcoder/yume-ui/src/classify';
import defaultClasses from './header.css';
import PageLoadingIndicator from '@landofcoder/yume-ui/src/components/PageLoadingIndicator';
import StoreSwitcher from './storeSwitcher';
import CurrencySwitcher from './currencySwitcher';
import useStoreConfig from '../../../lib/talons/Homepage/useStoreConfig';
import { connect } from 'react-redux';
import { getStoreConfig } from '../../reducer/storeConfig/asyncAction';
import MenuHorizontal from './menuHorizontal';
import SearchBar from '../SearchBar';

// const SearchBar = React.lazy(() =>
//     import('@landofcoder/yume-ui/src/components/SearchBar')
// );

const Header = props => {
    const { getStoreConfig } = props;
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isPageLoading,
        isSearchOpen,
        searchRef,
        searchTriggerRef
    } = useHeader();
    
    const {
        storeConfigLoading,
        storeConfigError,
        storeConfigData
    } = useStoreConfig()
    if (storeConfigData && storeConfigData.storeConfig && storeConfigData.storeConfig.lof_bannerslider) {
        getStoreConfig(storeConfigData.storeConfig.lof_bannerslider)
    }
    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = isSearchOpen ? classes.open : classes.closed;
    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );
    const searchBar = (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={true} ref={searchRef} />
            </Route>
        </Suspense>);
    const pageLoadingIndicator = isPageLoading ? (
        <PageLoadingIndicator />
    ) : null;

    return (
        <React.Fragment>
            <header className={rootClass} id="headerContainer">
                <div className={classes.switchersContainer}>
                    <div className={classes.switchers}>
                        <StoreSwitcher />
                        <CurrencySwitcher />
                    </div>
                </div>

                <div className={classes.toolbar}>
                    <div className={classes.primaryActions}>
                        <NavTrigger />
                    </div>
                    {pageLoadingIndicator}
                    <OnlineIndicator
                        hasBeenOffline={hasBeenOffline}
                        isOnline={isOnline}
                    />
                    <Link to={resourceUrl('/')} className={classes.logo}>
                        <Logo width={170} height={65} />
                    </Link>

                    <div className={classes.searchBar}>
                        <SearchBar isOpen={false} />
                    </div>

                    <div className={classes.secondaryActions}>
                        {/* <SearchTrigger
                            onClick={handleSearchTriggerClick}
                            ref={searchTriggerRef}
                        /> */}
                        <AccountTrigger />
                        <CartTrigger />
                    </div>
                </div>

                <div className={classes.menuHorizontal}>
                    <MenuHorizontal />
                </div>
            </header>
        </React.Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string,
        switchers: string,
        switchersContainer: string
    })
};
const mapPropsToDispatch = (dispatch) => {
    return {
        getStoreConfig: (payload) => dispatch(getStoreConfig(payload))
    }
}
export default connect(null, mapPropsToDispatch)(Header);
