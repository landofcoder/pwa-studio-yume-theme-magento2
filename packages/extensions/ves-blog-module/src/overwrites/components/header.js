import React, { Suspense } from 'react';
import { shape, string } from 'prop-types';

import Logo from '@landofcoder/yume-ui/src/components/Logo';
import { Link, resourceUrl, Route } from '@magento/venia-drivers';

import AccountTrigger from '@landofcoder/yume-ui/src/components/Header/accountTrigger';
import CartTrigger from '@landofcoder/yume-ui/src/components/Header/cartTrigger';
import NavTrigger from '@landofcoder/yume-ui/src/components/Header/navTrigger';
import SearchTrigger from '@landofcoder/yume-ui/src/components/Header/searchTrigger';
import OnlineIndicator from '@landofcoder/yume-ui/src/components/Header/onlineIndicator';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';

import { mergeClasses } from '@landofcoder/yume-ui/src/classify';
import defaultClasses from '@landofcoder/yume-ui/src/components/Header/header.css';
import PageLoadingIndicator from '@magento/venia-ui/lib/components/PageLoadingIndicator';

import BlogIcon from './BlogIcon';

const SearchBar = React.lazy(() => import('@landofcoder/yume-ui/src/components/SearchBar'));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        searchOpen,
        isPageLoading
    } = useHeader();

    const classes = mergeClasses(defaultClasses, props.classes);
    const rootClass = searchOpen ? classes.open : classes.closed;
    const searchBarFallback = (
        <div className={classes.searchFallback}>
            <div className={classes.input}>
                <div className={classes.loader} />
            </div>
        </div>
    );
    const searchBar = searchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={searchOpen} />
            </Route>
        </Suspense>
    ) : null;
    const pageLoadingIndicator = isPageLoading ? (
        <PageLoadingIndicator />
    ) : null;

    return (
        <header className={rootClass}>
            <div className={classes.toolbar}>
                <div className={classes.primaryActions}>
                    <NavTrigger />
                </div>
                {pageLoadingIndicator}
                <OnlineIndicator
                    hasBeenOffline={hasBeenOffline}
                    isOnline={isOnline}
                />
                <Link to={resourceUrl('/')}>
                    <Logo classes={{ logo: classes.logo }} />
                </Link>
                <div className={classes.secondaryActions}>
                    <SearchTrigger
                        active={searchOpen}
                        onClick={handleSearchTriggerClick}
                    />
                    <BlogIcon />
                    <AccountTrigger />
                    <CartTrigger />
                </div>
            </div>
            {searchBar}
        </header>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string
    })
};

export default Header;
