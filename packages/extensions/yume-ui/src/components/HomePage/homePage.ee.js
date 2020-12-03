import globalCSS from './homePage.css';

// Research for custom one of the custom talons function

const HomePage = () => {

    // const 
    return <span>Hello this is Truong kyle</span>
};

// `MagentoRoute` renders the CMS page, so this component renders nothing.
// This file would be obsolete if the CMS could deliver a stylesheet.

export default HomePage;

// Use the import to make webpack inject a stylesheet.
HomePage.globalCSS = globalCSS;
