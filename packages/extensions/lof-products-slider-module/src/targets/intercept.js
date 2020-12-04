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
        console.log(talonWrapperConfig);
        talonWrapperConfig.Homepage.useProductRelated.wrapWith('@landofcoder/lof-products-slider-module');
    });

};
