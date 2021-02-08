import React, { Fragment } from 'react';

import { usePageBuilder } from '@landofcoder/yume-ui/lib/talons/PageBuilder/usePageBuilder';

const PageBuilder = () => {
    const pageBuilder = usePageBuilder();

    return (
        <Fragment>
            {pageBuilder.components}
        </Fragment>
    );
};

export default PageBuilder;