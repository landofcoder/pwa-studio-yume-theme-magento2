import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { Adapter } from '@magento/venia-drivers';
import store from '../store';
import '@landofcoder/yume-ui/lib/index.css';
import { AppContextProvider } from '@landofcoder/yume-ui/lib/components/App';

const loadStories = () => {
    // Load all stories from yume-ui
    const veniaContext = require.context(
        '../../node_modules/@landofcoder/yume-ui/lib',
        true,
        /__stories__\/.+\.js$/
    );
    veniaContext.keys().forEach(veniaContext);

    // Load all custom defined stories in src
    const customContext = require.context('..', true, /__stories__\/.+\.js$/);
    customContext.keys().forEach(customContext);
};

const backendUrl = process.env.MAGENTO_BACKEND_URL;
const apiBase = new URL('/graphql', backendUrl).toString();

addDecorator(storyFn => (
    <Adapter
        apiBase={apiBase}
        apollo={{ link: Adapter.apolloLink(apiBase) }}
        store={store}
    >
        <AppContextProvider>{storyFn()}</AppContextProvider>
    </Adapter>
));

configure(loadStories, module);
