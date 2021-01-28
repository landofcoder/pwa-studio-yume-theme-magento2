import React from 'react';
import { Facebook, Instagram, Twitter } from 'react-feather';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { shape, string } from 'prop-types';
import { useFooter } from '@magento/peregrine/lib/talons/Footer/useFooter';

import Logo from '../Logo';
import { mergeClasses } from '../../classify';
import defaultClasses from './footer.css';
import { DEFAULT_LINKS, LOREM_IPSUM } from './sampleData';

const Footer = props => {
    const { links } = props;
    const classes = mergeClasses(defaultClasses, props.classes);
    const talonProps = useFooter();

    const { copyrightText } = talonProps;

    const linkGroups = Array.from(links, ([groupKey, linkProps]) => {
        const linkElements = Array.from(linkProps, ([text, path]) => {
            const itemKey = `text: ${text} path:${path}`;
            const child = path ? (
                <Link className={classes.link} to={path}>
                    <FormattedMessage id={text} defaultMessage={text} />
                </Link>
            ) : (
                <span className={classes.label}>
                    <FormattedMessage id={text} defaultMessage={text} />
                </span>
            );

            return (
                <li key={itemKey} className={classes.linkItem}>
                    {child}
                </li>
            );
        });

        return (
            <ul key={groupKey} className={classes.linkGroup}>
                {linkElements}
            </ul>
        );
    });

    return (
        <div className={classes.wrapperColor}>
            <footer className={classes.root}>
                <div className={classes.links}>
                    {linkGroups}
                    <div className={classes.callout}>
                        <h3 className={classes.calloutHeading}>
                            <FormattedMessage
                                id={'footer.followText'}
                                defaultMessage={'Follow Us!'}
                            />
                        </h3>
                        <p className={classes.calloutBody}>
                            <FormattedMessage
                                id={'footer.calloutText'}
                                defaultMessage={LOREM_IPSUM}
                            />
                        </p>
                        <ul className={classes.socialLinks}>
                            <li>
                                <a target="_bank" href={'/'}>
                                    <Instagram size={20} />
                                </a>
                            </li>
                            <li>
                                <a target="_bank" href={'/'}>
                                    <Facebook
                                        size={20}
                                        target="_bank"
                                        href={'/'}
                                    />
                                </a>
                            </li>
                            <li>
                                <a target="_bank" href={'/'}>
                                    <Twitter
                                        size={20}
                                        target="_bank"
                                        href={'/'}
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={classes.branding}>
                    <ul className={classes.legal}>
                        <li className={classes.terms}>
                            <FormattedMessage
                                id={'footer.termsText'}
                                defaultMessage={'Terms of Use'}
                            />
                        </li>
                        <li className={classes.privacy}>
                            <FormattedMessage
                                id={'footer.privacyText'}
                                defaultMessage={'Privacy Policy'}
                            />
                        </li>
                    </ul>
                    <p className={classes.copyright}>{copyrightText || null}</p>
                    <Link className={classes.logo} to="/">
                        <Logo />
                    </Link>
                </div>
            </footer>
        </div>
    );
};

export default Footer;

Footer.defaultProps = {
    links: DEFAULT_LINKS
};

Footer.propTypes = {
    classes: shape({
        root: string
    })
};
