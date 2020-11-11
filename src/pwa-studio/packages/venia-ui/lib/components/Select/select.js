import React, { Component, Fragment } from 'react';
import { arrayOf, node, number, oneOfType, shape, string } from 'prop-types';
import { BasicSelect, Option, asField } from 'informed';
import { compose } from 'redux';

import classify from '../../classify';
import { FieldIcons, Message } from '../Field';
import defaultClasses from './select.css';

import Icon from '../Icon';
import { ChevronDown as ChevronDownIcon } from 'react-feather';

const arrow = <Icon src={ChevronDownIcon} size={24} />;

class Select extends Component {
    static propTypes = {
        classes: shape({
            input: string
        }),
        field: string.isRequired,
        fieldState: shape({
            value: oneOfType([number, string])
        }),
        items: arrayOf(
            shape({
                key: oneOfType([number, string]),
                label: string,
                value: oneOfType([number, string])
            })
        ),
        message: node
    };

    render() {
        const { classes, fieldState, items, message, ...rest } = this.props;
        const options = items.map(
            ({ disabled = null, hidden = null, label, value, key = value }) => (
                <Option
                    disabled={disabled}
                    hidden={hidden}
                    key={key}
                    value={value}
                >
                    {label || (value != null ? value : '')}
                </Option>
            )
        );

        const inputClass = fieldState.error
            ? classes.input_error
            : classes.input;

        return (
            <Fragment>
                <FieldIcons after={arrow}>
                    <BasicSelect
                        {...rest}
                        fieldState={fieldState}
                        className={inputClass}
                    >
                        {options}
                    </BasicSelect>
                </FieldIcons>
                <Message fieldState={fieldState}>{message}</Message>
            </Fragment>
        );
    }
}

export default compose(
    classify(defaultClasses),
    asField
)(Select);
