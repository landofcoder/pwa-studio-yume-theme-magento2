/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import { mergeClasses } from '@landofcoder/yume-ui/src/classify';
import defaultClasses from './menuHorizontal.css';
import { useQuery } from '@apollo/client';
import { GET_MENU_HORIZONTAL } from './menuHorizontal.gql';
import { Link, resourceUrl } from '../../drivers';

const Children = props => {
    const classes = mergeClasses(defaultClasses, props.classes);
    // const { handleClick } = useCategoryLeaf({ onNavigate });
    const destination = resourceUrl(`/${props.children.url_path}${props.children.url_suffix}`);

    return (
        <li className={classes.liClass}>
            {/* <a className={classes.cssLink} href="">
                {props.children.name}
            </a> */}

            <Link
                className={classes.cssLink}
                to={destination}
            >
                <span>{props.children.name}</span>
            </Link>

            {props.children.children && (
                <ul className={classes.ulClass}>
                    {renderChild(props.children.children)}
                </ul>
            )}
        </li>
    );
};

const renderChild = items => items.map(it => <Children key={it.id} children={it} />);

const horizontalMenu = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const { loading, error, data } = useQuery(GET_MENU_HORIZONTAL, {
        variables: { id: '2' }
    });
    //console.log('----- data ------', data);

    return (
        <React.Fragment>
            {data && data.category && data.category.children.length && (
                <nav className={classes.menu}>
                    <ul className={classes.ulClass}>
                        {renderChild(data.category.children)}
                    </ul>
                </nav>
            )}
        </React.Fragment>
    );
};

export default horizontalMenu;
