import React from 'react';
import { createTestInstance } from '@magento/peregrine';
import Header from '@magento/venia-ui/lib/components/header';
import { useHeader } from '@magento/peregrine/lib/talons/Header/useHeader';

jest.mock('@magento/venia-ui/lib/components/@magento/venia-ui/lib/classify');
jest.mock('@magento/venia-ui/lib/components/Logo', () => 'Logo');
jest.mock('@magento/venia-ui/lib/components/accountTrigger', () => 'AccountTrigger');
jest.mock('@magento/venia-ui/lib/components/cartTrigger', () => 'CartTrigger');
jest.mock('@magento/venia-ui/lib/components/navTrigger', () => 'NavTrigger');
jest.mock('@magento/venia-ui/lib/components/searchTrigger', () => 'SearchTrigger');
jest.mock('@magento/venia-ui/lib/components/onlineIndicator', () => 'OnlineIndicator');
jest.mock('@magento/venia-ui/lib/components/storeSwitcher', () => 'StoreSwitcher');
jest.mock('@magento/venia-ui/lib/components/currencySwitcher', () => 'CurrencySwitcher');
jest.mock('@magento/venia-ui/lib/components/PageLoadingIndicator', () => () => (
    <div id={'pageLoadingIndicator'} />
));

jest.mock('@magento/venia-drivers', () => ({
    resourceUrl: jest.fn(url => url),
    Link: jest.fn(() => null),
    Route: jest.fn(() => null)
}));

jest.mock('@magento/peregrine/lib/talons/Header/useHeader', () => {
    const state = {
        handleSearchTriggerClick: jest.fn(),
        hasBeenOffline: false,
        isOnline: true,
        isPageLoading: false,
        searchOpen: false
    };
    return {
        useHeader: jest.fn(() => state)
    };
});

test('verify Header can render in default state', () => {
    const component = createTestInstance(<Header />);

    expect(component.toJSON()).toMatchSnapshot();
});

test('verify PageLoadingIndicator is displayed when page is loading', () => {
    useHeader.mockImplementation(() => {
        return {
            handleSearchTriggerClick: jest.fn(),
            hasBeenOffline: false,
            isOnline: true,
            isPageLoading: true,
            searchOpen: false
        };
    });

    const component = createTestInstance(<Header />);
    component.root.findByProps({ id: 'pageLoadingIndicator' });
});
