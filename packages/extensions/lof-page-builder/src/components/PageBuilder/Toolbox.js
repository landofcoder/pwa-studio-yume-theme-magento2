import React from 'react';
import { Element, useEditor } from '@craftjs/core';
import { Container, Text } from '../selector';
import { mergeClasses } from '@landofcoder/yume-ui/src/classify';
import defaultClasses from './index.css';

export const Toolbox = props => {
    const { connectors } = useEditor();
    const classes = mergeClasses(defaultClasses, props.classes);

    return (
        <React.Fragment>
            <label className={classes.styleLable}>Drag to add</label>
            <div
                className={classes.styleElement}
                ref={ref =>
                    connectors.create(
                        ref,
                        <Element
                            canvas
                            is={Container}
                            background="#fff"
                            height="300px"
                            width="300px"
                        />
                    )
                }
            >
                Container
            </div>
            <div
                className={classes.styleElement}
                ref={ref =>
                    connectors.create(
                        ref,
                        <Text fontSize="12" textAlign="left" text="Hi there" />
                    )
                }
            >
                Text
            </div>
        </React.Fragment>
    );
};
