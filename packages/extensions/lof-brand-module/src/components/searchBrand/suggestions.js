import React, { Fragment } from 'react';
import { arrayOf, bool, func, shape, string } from 'prop-types';
import { useSuggestions } from '@magento/peregrine/lib/talons/SearchBar';
import { mergeClasses } from "../../classify";
import defaultClasses from './suggestions.css';
import SuggestedBrands from "./suggestedBrands";

const Suggestions = props => {
    console.log("Test1")
    const {
        displayResult,
        filters,
        products,
        searchValue,
        setVisible,
        visible
    } = props;
    const { items } = products;

    const talonProps = useSuggestions({
        displayResult,
        filters,
        items,
        setVisible,
        visible
    });
    const { onNavigate, shouldRender } = talonProps;
    console.log("shouldRender", shouldRender)

    // render null without data
    if (!shouldRender) {
        return null;
    }

    return (
        <Fragment>
            <SuggestedBrands onNavigate={onNavigate} products={items} />
        </Fragment>
    );
};

export default Suggestions;

Suggestions.propTypes = {
    classes: shape({
        heading: string
    }),
    products: shape({
        filters: arrayOf(
            shape({
                filter_items: arrayOf(shape({})),
                name: string.isRequired
            }).isRequired
        ),
        items: arrayOf(shape({}))
    }),
    searchValue: string,
    setVisible: func,
    visible: bool
};
