module.exports = targets => {
    // Wrap the useProductFullDetail talon with this extension
    const peregrineTargets = targets.of('@magento/peregrine');
    const talonsTarget = peregrineTargets.talons;


    // Set the buildpack features required by this extension
    const builtins = targets.of('@magento/pwa-buildpack');
    builtins.specialFeatures.tap(featuresByModule => {
        featuresByModule['@landofcoder/lof-images-slider-module'] = {
            cssModules: true,
            // Wrapper modules must be ES Modules
            esModules: true
        };
    });

    talonsTarget.tap(talonWrapperConfig => {
        console.log(talonWrapperConfig);
        talonWrapperConfig.App.useApp.wrapWith('@landofcoder/lof-images-slider-module');
    });

};
