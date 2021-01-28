
/*
module.exports = targets => {
    // Wrap the useProductFullDetail talon with this extension
    const peregrineTargets = targets.of('@landofcoder/yume-ui');
    const talonsTarget = peregrineTargets.talons;


    // Set the buildpack features required by this extension
    const builtins = targets.of('@magento/pwa-buildpack');
    builtins.specialFeatures.tap(featuresByModule => {
        featuresByModule['@landofcoder/lof-products-slider-module'] = {
            cssModules: true,
            esModules: true
        };
    });

    talonsTarget.tap(talonWrapperConfig => {

        talonWrapperConfig.Homepage.useProductSlider.wrapWith('./wrapper.js');
    });

};
*/

//------------------------------------
//packages/extensions/yume-ui/lib/talons/Homepage/useProductSlider.js
const moduleOverridePlugin = require('./moduleOverrideWebpackPlugin');
const componentOverrideMapping = {
    '@landofcoder/yume-ui/lib/talons/Homepage/useProductSlider.js': './wrapperProductSlider.js',
    '@landofcoder/yume-ui/lib/talons/ProductDetail/useProductRelated.js': './wrapperRelatedProduct.js',
};

module.exports = targets => {
    targets.of('@magento/pwa-buildpack').specialFeatures.tap(flags => {
        /**
         *  Wee need to actived esModules and cssModules to allow build pack to load our extension
         * {@link https://magento.github.io/pwa-studio/pwa-buildpack/reference/configure-webpack/#special-flags}.
         */
        flags[targets.name] = {esModules: true, cssModules: true};
    });

    targets.of('@magento/pwa-buildpack').webpackCompiler.tap(compiler => {
        // registers our own overwrite plugin for webpack
        new moduleOverridePlugin(componentOverrideMapping).apply(compiler);
    })
}
