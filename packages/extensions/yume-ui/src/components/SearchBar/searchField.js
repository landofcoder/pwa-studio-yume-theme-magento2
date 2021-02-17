import React from 'react';
import { func } from 'prop-types';
import { Search as SearchIcon, X as ClearIcon } from 'react-feather';
import { useSearchField } from '@magento/peregrine/lib/talons/SearchBar';
import { mergeClasses } from '@landofcoder/yume-ui/src/classify';
import Icon from '../Icon';
import TextInput from '../TextInput';
import Trigger from '../Trigger';
import defaultClasses from './searchBar.css';

const clearIcon = <Icon src={ClearIcon} size={24} />;
const searchIcon = <Icon src={SearchIcon} size={24} />;

const SearchField = props => {
    const { isSearchOpen, onChange, onFocus } = props;
    const { inputRef, resetForm, value } = useSearchField({ isSearchOpen });
    const classes = mergeClasses(defaultClasses, props.classes);

    const resetButton = value ? (
        <Trigger action={resetForm}>{clearIcon}</Trigger>
    ) : null;

    return (
        <TextInput
            after={resetButton}
            before={searchIcon}
            field="search_query"
            onFocus={onFocus}
            onValueChange={onChange}
            forwardedRef={inputRef}
            classes={{ input: classes.input }}
        />
    );
};

export default SearchField;

SearchField.propTypes = {
    onChange: func,
    onFocus: func
};
