import React, { Fragment } from 'react';
import { mergeClasses } from '@magento/venia-ui/lib/classify';
import defaultClasses from './signInPage.css';
import CreateAccountPage from '../../CreateAccountPage/createAccountPage';
import { Form } from 'informed';
import { FormattedMessage, useIntl } from 'react-intl';
import { useSignIn } from '@magento/peregrine/lib/talons/SignIn/useSignIn';
import LoadingIndicator from '../../LoadingIndicator';
import TextInput from '../../TextInput';
import { GET_CART_DETAILS_QUERY } from '../../SignIn/signIn.gql';
import LinkButton from '../../LinkButton';
import Password from '../../Password';
import { isRequired } from '../../../util/formValidators';
import Button from '../../Button';
import Field from '../../Field';
import Checkbox from '../../Checkbox';

const SignInPage = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    const { setDefaultUsername, showCreateAccount, showForgotPassword } = props;
    const { formatMessage } = useIntl();
    const talonProps = useSignIn({
        getCartDetailsQuery: GET_CART_DETAILS_QUERY,
        setDefaultUsername,
        showCreateAccount,
        showForgotPassword
    });
    const {
        errors,
        handleCreateAccount,
        handleForgotPassword,
        handleSubmit,
        isBusy,
        setFormApi
    } = talonProps;
    if (isBusy) {
        return (
            <div className={classes.modal_active}>
                <LoadingIndicator>
                    <FormattedMessage
                        id={'signIn.loadingText'}
                        defaultMessage={'Signing In'}
                    />
                </LoadingIndicator>
            </div>
        );
    }
    const forgotPasswordClasses = {
        root: classes.forgotPasswordButton
    };
    return (
        <Fragment>
            <h3 className={classes.title}>Login</h3>
            <div className={classes.container}>
                <Form
                    getApi={setFormApi}
                    className={classes.form}
                    onSubmit={handleSubmit}
                >
                    <Field
                        label={formatMessage({
                            id: 'signIn.emailAddressText',
                            defaultMessage: 'Email address'
                        })}
                    >
                        <TextInput
                            autoComplete="email"
                            field="email"
                            validate={isRequired}
                        />
                    </Field>
                    <Password
                        fieldName="password"
                        label={formatMessage({
                            id: 'signIn.passwordText',
                            defaultMessage: 'Password'
                        })}
                        validate={isRequired}
                        autoComplete="current-password"
                        isToggleButtonHidden={false}
                    />
                    <div className={classes.forgotPasswordButtonContainer}>
                        <div>
                            <Checkbox
                                field="subscribe"
                                label={formatMessage({
                                    id: 'rememberMe',
                                    defaultMessage: 'Remember me'
                                })}
                            />
                        </div>
                        <div>
                            <LinkButton
                                classes={forgotPasswordClasses}
                                type="button"
                                onClick={handleForgotPassword}
                            >
                                <FormattedMessage
                                    id={'signIn.forgotPasswordText'}
                                    defaultMessage={'Forgot Password?'}
                                />
                            </LinkButton>
                        </div>
                    </div>
                    <div className={classes.buttonsContainer}>
                        <Button priority="high" type="submit">
                            <FormattedMessage
                                id={'signIn.signInText'}
                                defaultMessage={'Sign In'}
                            />
                        </Button>
                    </div>
                </Form>
            </div>
        </Fragment>
    );
};

export default React.memo(SignInPage);
