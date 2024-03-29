import React from 'react';
import { mergeClasses } from '../../../classify';
import defaultClasses from './style.css';
const DeliveryInformation = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    return (
        <React.Fragment>
            <div className={classes.footerCategory}>Give Back</div>

            <div className={classes.wrapper}>
                <div>
                    <p>
                        This website ("website") is operated by Luma Inc., which
                        includes Luma stores, and Luma Private Sales. This privacy
                        policy only covers information collected at this website,
                        and does not cover any information collected offline by
                        Luma. All Luma websites are covered by this privacy policy.
                </p>
                    <h2>Luma Privacy Policy</h2>
                    <p>
                        To help us achieve our goal of providing the highest quality
                        products and services, we use information from our
                        interactions with you and other customers, as well as from
                        other parties. Because we respect your privacy, we have
                        implemented procedures to ensure that your personal
                        information is handled in a safe, secure, and responsible
                        manner. We have posted this privacy policy in order to
                        explain our information collection practices and the choices
                        you have about the way information is collected and used.
                </p>
                    <p>
                        As we continue to develop the Luma website and take
                        advantage of advances in technology to improve the services
                        we offer, this privacy policy likely will change. We
                        therefore encourage you to refer to this policy on an
                        ongoing basis so that you understand our current privacy
                        policy.
                </p>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DeliveryInformation;
