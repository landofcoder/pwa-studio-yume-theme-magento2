import React, { useMemo } from 'react';
import { arrayOf, object, shape, string } from 'prop-types';

import { mergeClasses } from '../../classify';
import Image from '../Image';

import defaultClasses from './collapsedImageGallery.css';

const DISPLAY_COUNT = 4;

const CollapsedImageGallery = props => {
    const { items } = props;

    const classes = mergeClasses(defaultClasses, props.classes);
    const remainderCount = items.length - DISPLAY_COUNT;

    const imageElements = useMemo(() => {
        if (items) {
            const baseImageElements = items
                .slice(0, DISPLAY_COUNT)
                .map(item => {
                    const { id, thumbnail } = item;
                    const { label, url } = thumbnail;

                    return <Image key={id} alt={label} src={url} width={48} />;
                });

            // If the order contains more than four products, render a remainder count in the last column.
            if (remainderCount > 0) {
                const remainderCountString = `+${remainderCount}`;
                baseImageElements.push(
                    <span
                        key={'remainder-column'}
                        className={classes.remainderCount}
                    >
                        {remainderCountString}
                    </span>
                );
            }

            return baseImageElements;
        }
    }, [classes.remainderCount, items, remainderCount]);

    return <div className={classes.root}>{imageElements}</div>;
};

export default CollapsedImageGallery;

CollapsedImageGallery.propTypes = {
    classes: shape({
        root: string,
        remainderCount: string
    }),
    items: arrayOf(object)
};
