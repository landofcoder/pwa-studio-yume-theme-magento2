import React from 'react';
import { useBlog } from '../../../lib/talons/Homepage/useBlog';
import { useImageSlider } from '../../../lib/talons/Homepage/useImageSlider';
import { useProductRelated } from '../../../lib/talons/Homepage/useProductRelated';
import globalCSS from './homePage.css';

// Research for custom one of the custom talons function

const HomePage = () => {
    const imageSlider = useImageSlider();
    const blog = useBlog();
    const productRelated = useProductRelated();
    // const
    return (
        <div>
            <span>Hello this is Home page</span>
            {imageSlider.components}
            {blog.components}
            {productRelated.components}
        </div>
    );
};

// `MagentoRoute` renders the CMS page, so this component renders nothing.
// This file would be obsolete if the CMS could deliver a stylesheet.

export default HomePage;

// Use the import to make webpack inject a stylesheet.
HomePage.globalCSS = globalCSS;
