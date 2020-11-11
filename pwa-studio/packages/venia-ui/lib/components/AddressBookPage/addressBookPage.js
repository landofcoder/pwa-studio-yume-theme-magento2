import React, { useMemo } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PlusSquare } from 'react-feather';

import { useAddressBookPage } from '@magento/peregrine/lib/talons/AddressBookPage/useAddressBookPage';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import { GET_CUSTOMER_ADDRESSES } from '../CheckoutPage/AddressBook/addressBook.gql';
import AddressCard from '../CheckoutPage/AddressBook/addressCard';
import Icon from '../Icon';
import LinkButton from '../LinkButton';
import { Title } from '../Head';
import defaultClasses from './addressBookPage.css';

const AddressBookPage = props => {
    const talonProps = useAddressBookPage({
        queries: {
            getCustomerAddressesQuery: GET_CUSTOMER_ADDRESSES
        }
    });
    const { customerAddresses, handleAddAddress } = talonProps;

    const { formatMessage } = useIntl();
    const classes = mergeClasses(defaultClasses, props.classes);

    const PAGE_TITLE = formatMessage({
        id: 'addressBookPage.addressBookText',
        defaultMessage: 'Address Book'
    });
    const addressBookElements = useMemo(() => {
        return customerAddresses.map(addressEntry => (
            <AddressCard key={addressEntry.id} address={addressEntry} />
        ));
    }, [customerAddresses]);

    // STORE_NAME is injected by Webpack at build time.
    const title = `${PAGE_TITLE} - ${STORE_NAME}`;
    return (
        <div className={classes.root}>
            <Title>{title}</Title>
            <h1 className={classes.heading}>{PAGE_TITLE}</h1>
            <div className={classes.content}>
                <LinkButton
                    className={classes.addButton}
                    key="addAddressButton"
                    onClick={handleAddAddress}
                >
                    <Icon
                        classes={{
                            icon: classes.addIcon
                        }}
                        size={24}
                        src={PlusSquare}
                    />
                    <span className={classes.addText}>
                        <FormattedMessage
                            id={'addressBookPage.addAddressText'}
                            defaultMessage={'Add an Address'}
                        />
                    </span>
                </LinkButton>
                {addressBookElements}
            </div>
        </div>
    );
};

export default AddressBookPage;
