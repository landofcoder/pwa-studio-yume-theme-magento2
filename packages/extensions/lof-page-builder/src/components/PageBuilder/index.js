import React, { useState } from 'react';
import {
    Editor,
    Frame,
    Canvas,
    Selector,
    useNode,
    Element,
    useEditor
} from '@craftjs/core';
import lz from 'lzutf8';
import { mergeClasses } from '@landofcoder/yume-ui/src/classify';
import { RenderNode, Header } from '../editor';
import defaultClasses from './index.css';
import { Container, Text } from '../selector';
import Button from '@landofcoder/yume-ui/src/components/Button';
import { FormattedMessage, useIntl } from 'react-intl';

const App = props => {
    const { enabled, connectors } = useEditor(state => ({
        enabled: state.options.enabled
    }));
    const classes = mergeClasses(defaultClasses, props.classes);
    // const [enabled] = useState(true);
    const base64 =
        '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';
    const uint8array = lz.decodeBase64(base64);
    const json = lz.decompress(uint8array);
    return (
        <div>
            <Editor
                resolver={{
                    Container,
                    Text
                }}
                enabled={enabled}
                onRender={RenderNode}
            >
                <div>
                    <Header />
                    <div className={classes.viewContent}>
                        <div className={classes.settingPanel}>
                            <label className={classes.styleLable}>
                                Drag to add
                            </label>
                            <div
                                className={classes.styleElement}
                                ref={ref =>
                                    connectors.create(ref, <Text text="Hi, World!" />)
                                }
                            >
                                <FormattedMessage
                                    id={'pagBuilder.editStatus'}
                                    defaultMessage={'Text'}
                                />
                            </div>
                        </div>

                        <div className={classes.page}>
                            <Frame>
                                <Element
                                    is={Container}
                                    padding={5}
                                    background="#EEE"
                                    canvas
                                />
                            </Frame>
                        </div>
                    </div>
                </div>
            </Editor>
        </div>
    );
};

export default App;
