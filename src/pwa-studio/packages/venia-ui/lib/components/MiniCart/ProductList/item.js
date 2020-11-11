import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { string, number, shape, func, arrayOf } from 'prop-types';
import { Trash2 as DeleteIcon } from 'react-feather';

import Price from '@magento/venia-ui/lib/components/Price';
import { Link, resourceUrl } from '@magento/venia-drivers';
import { useItem } from '@magento/peregrine/lib/talons/MiniCart/useItem';

import ProductOptions from '../../LegacyMiniCart/productOptions';
import Image from '../../Image';
import Icon from '../../Icon';
import { mergeClasses } from '../../../classify';

import defaultClasses from './item.css';

const Item = props => {
    const {
        classes: propClasses,
        product,
        id,
        quantity,
        configurable_options,
        handleRemoveItem,
        prices,
        closeMiniCart
    } = props;

    const { formatMessage } = useIntl();
    const classes = mergeClasses(defaultClasses, propClasses);
    const itemLink = useMemo(
        () => resourceUrl(`/${product.url_key}${product.url_suffix}`),
        [product.url_key, product.url_suffix]
    );
    const stockStatusText =
        product.stock_status === 'OUT_OF_STOCK'
            ? formatMessage({
                  id: 'productList.outOfStock',
                  defaultMessage: 'Out-of-stock'
              })
            : '';

    const { isDeleting, removeItem } = useItem({
        id,
        handleRemoveItem
    });

    const rootClass = isDeleting ? classes.root_disabled : classes.root;

    return (
        <div className={rootClass}>
            <Link
                className={classes.thumbnailContainer}
                to={itemLink}
                onClick={closeMiniCart}
            >
                <Image
                    alt={product.name}
                    classes={{
                        root: classes.thumbnail
                    }}
                    width={100}
                    resource={product.thumbnail.url}
                />
            </Link>
            <Link
                className={classes.name}
                to={itemLink}
                onClick={closeMiniCart}
            >
                {product.name}
            </Link>
            <ProductOptions
                options={configurable_options}
                classes={{
                    options: classes.options
                }}
            />
            <span className={classes.quantity}>
                <FormattedMessage
                    id={'productList.quantity'}
                    defaultMessage={'Qty :'}
                    values={{ quantity }}
                />
            </span>
            <span className={classes.price}>
                <Price
                    currencyCode={prices.price.currency}
                    value={prices.price.value}
                />
                <FormattedMessage
                    id={'productList.each'}
                    defaultMessage={' ea.'}
                />
            </span>
            <span className={classes.stockStatus}>{stockStatusText}</span>
            <button
                onClick={removeItem}
                type="button"
                className={classes.deleteButton}
                disabled={isDeleting}
            >
                <Icon
                    size={16}
                    src={DeleteIcon}
                    classes={{
                        icon: classes.editIcon
                    }}
                />
            </button>
        </div>
    );
};

export default Item;

Item.propTypes = {
    classes: shape({
        root: string,
        thumbnail: string,
        name: string,
        options: string,
        quantity: string,
        price: string,
        editButton: string,
        editIcon: string
    }),
    product: shape({
        name: string,
        thumbnail: shape({
            url: string
        })
    }),
    id: string,
    quantity: number,
    configurable_options: arrayOf(
        shape({
            id: number,
            option_label: string,
            value_id: number,
            value_label: string
        })
    ),
    handleRemoveItem: func,
    prices: shape({
        price: shape({
            value: number,
            currency: string
        })
    })
};
