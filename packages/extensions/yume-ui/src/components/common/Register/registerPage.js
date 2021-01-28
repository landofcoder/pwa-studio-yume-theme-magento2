import React from 'react'
import CreateAccountPage from '../../CreateAccountPage/createAccountPage'
import defaultClasses from './register.css'
import { mergeClasses } from '@magento/venia-ui/lib/classify';

const RegisterPage = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    
    return (
        <React.Fragment>
            <h3 className={classes.title}>Register</h3>
            <CreateAccountPage/>
        </React.Fragment>
    )
}

export default RegisterPage
