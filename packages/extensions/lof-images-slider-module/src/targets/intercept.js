module.exports = targets => {
    // Wrap the useProductFullDetail talon with this extension
    const peregrineTargets = targets.of('@landofcoder/yume-ui');
    const talonsTarget = peregrineTargets.talons;


    // Set the buildpack features required by this extension
    const builtins = targets.of('@magento/pwa-buildpack');
    builtins.specialFeatures.tap(featuresByModule => {
        featuresByModule['@landofcoder/lof-images-slider-module'] = {
            cssModules: true,
            esModules: true
        };
    });

    talonsTarget.tap(talonWrapperConfig => {
        talonWrapperConfig.Homepage.useImageSlider.wrapWith('@landofcoder/lof-images-slider-module');
    });

};
