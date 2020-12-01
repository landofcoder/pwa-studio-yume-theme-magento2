import React from 'react';
import { createTestInstance } from '@magento/peregrine';

import Product from '../product';
import { useProduct } from '@magento/peregrine/lib/talons/CartPage/ProductListing/useProduct';

jest.mock('../../../Image', () => 'Image');
jest.mock('@magento/peregrine/lib/talons/CartPage/ProductListing/useProduct');
jest.mock('../../../../classify');
jest.mock('@apollo/client', () => {
    const executeMutation = jest.fn(() => ({ error: null }));
    const useMutation = jest.fn(() => [executeMutation]);

    return {
        gql: jest.fn(),
        useMutation
    };
});

jest.mock('@magento/peregrine/lib/context/cart', () => {
    const state = { cartId: 'cart123' };
    const api = {};
    const useCartContext = jest.fn(() => [state, api]);

    return { useCartContext };
});

jest.mock('@magento/venia-drivers', () => ({
    Link: ({ children, ...rest }) => <div {...rest}>{children}</div>,
    resourceUrl: x => x
}));

jest.mock('@magento/peregrine', () => {
    const useToasts = jest.fn(() => [
        { toasts: new Map() },
        { addToast: jest.fn() }
    ]);

    return {
        ...jest.requireActual('@magento/peregrine'),
        useToasts
    };
});

const props = {
    item: {
        id: '123',
        product: {
            name: 'Unit Test Product',
            small_image: {
                url: 'unittest.jpg'
            },
            urlKey: 'unittest',
            urlSuffix: '.html'
        },
        prices: {
            price: {
                currency: 'USD',
                value: 100
            }
        },
        quantity: 1
    }
};

test('renders simple product correctly', () => {
    useProduct.mockReturnValueOnce({
        errorMessage: undefined,
        handleEditItem: jest.fn(),
        handleRemoveFromCart: jest.fn(),
        handleToggleFavorites: jest.fn(),
        handleUpdateItemQuantity: jest.fn(),
        isEditable: false,
        isFavorite: false,
        product: {
            currency: 'USD',
            image: {},
            name: '',
            options: [],
            quantity: 1,
            unitPrice: 1,
            urlKey: 'unittest',
            urlSuffix: '.html'
        }
    });
    const tree = createTestInstance(<Product {...props} />);

    expect(tree.toJSON()).toMatchSnapshot();
});

test('renders out of stock product', () => {
    useProduct.mockReturnValueOnce({
        errorMessage: undefined,
        handleEditItem: jest.fn(),
        handleRemoveFromCart: jest.fn(),
        handleToggleFavorites: jest.fn(),
        handleUpdateItemQuantity: jest.fn(),
        isEditable: false,
        isFavorite: false,
        product: {
            currency: 'USD',
            image: {},
            name: '',
            options: [],
            quantity: 2,
            stockStatus: 'OUT_OF_STOCK',
            unitPrice: 55,
            urlKey: 'popular-product',
            urlSuffix: ''
        }
    });
    const tree = createTestInstance(<Product {...props} />);

    expect(tree.toJSON()).toMatchSnapshot();
});

test('renders configurable product with options', () => {
    useProduct.mockReturnValueOnce({
        errorMessage: undefined,
        handleEditItem: jest.fn(),
        handleRemoveFromCart: jest.fn(),
        handleToggleFavorites: jest.fn(),
        handleUpdateItemQuantity: jest.fn(),
        isEditable: true,
        isFavorite: false,
        product: {
            currency: 'USD',
            image: {},
            name: '',
            urlKey: 'unittest',
            urlSuffix: '.html',
            options: [
                {
                    option_label: 'Option 1',
                    value_label: 'Value 1'
                },
                {
                    option_label: 'Option 2',
                    value_label: 'Value 2'
                }
            ],
            quantity: 1,
            unitPrice: 1
        }
    });

    const tree = createTestInstance(<Product {...props} />);

    expect(tree.toJSON()).toMatchSnapshot();
});
