import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from '@magento/venia-ui/lib/components/header';
import defaultClasses from '@magento/venia-ui/lib/components/header.css';

const stories = storiesOf('Venia/Header', module);

stories.add('Default', () => {
    return <Header classes={defaultClasses} />;
});
