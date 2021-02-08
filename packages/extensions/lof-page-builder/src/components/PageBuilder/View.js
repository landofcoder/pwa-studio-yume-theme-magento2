import React from 'react';
import { Editor, Frame, Canvas, useEditor } from '@craftjs/core';

export const View = ({ children }) => {
    const { connectors } = useEditor();

    return (
        <div ref={ref => connectors.select(connectors.hover(ref, null), null)}>
            {children}
        </div>
    );
};
