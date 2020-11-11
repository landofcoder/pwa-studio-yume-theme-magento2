import React from 'react';
import { createTestInstance } from '@magento/peregrine';
import { useProductForm } from '@magento/peregrine/lib/talons/CartPage/ProductListing/EditModal/useProductForm';

import ProductForm from '../productForm';

jest.mock(
    '@magento/peregrine/lib/talons/CartPage/ProductListing/EditModal/useProductForm'
);
jest.mock('../../../../../classify');
jest.mock('../../../../LoadingIndicator', () => 'LoadingIndicator');
jest.mock('../../../../ProductOptions', () => 'Options');

const mockItem = {
    id: '123',
    quantity: 5,
    configurable_options: ['option1', 'option2']
};

const mockTalonProps = {
    configItem: {
        configurable_options: ['option3', 'option4']
    },
    errors: new Map(),
    handleOptionSelection: jest.fn(),
    handleSubmit: jest.fn(),
    isLoading: false,
    setFormApi: jest.fn()
};

test('renders loading indicator while options are being fetched', () => {
    useProductForm.mockReturnValueOnce({
        isLoading: true
    });

    const tree = createTestInstance(
        <ProductForm item={{}} setIsUpdating={jest.fn()} />
    );
    expect(tree.toJSON()).toMatchSnapshot();
});

test('renders form with data', () => {
    useProductForm.mockReturnValueOnce(mockTalonProps);

    const tree = createTestInstance(
        <ProductForm item={mockItem} setIsUpdating={jest.fn()} />
    );
    expect(tree.toJSON()).toMatchSnapshot();
});

test('renders form errors', () => {
    useProductForm.mockReturnValueOnce({
        ...mockTalonProps,
        errors: new Map([['error', new Error('Form Error')]])
    });

    const tree = createTestInstance(
        <ProductForm item={mockItem} setIsUpdating={jest.fn()} />
    );
    expect(tree.toJSON()).toMatchSnapshot();
});
