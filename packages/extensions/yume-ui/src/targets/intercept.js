module.exports = targets => {
    // Wrap the useProductFullDetail talon with this extension
    const peregrineTargets = targets.of('@magento/peregrine');
    const talonsTarget = peregrineTargets.talons;

    talonsTarget.tap(talonWrapperConfig => {
        console.log("talon config :")
        console.log(talonWrapperConfig);
        talonWrapperConfig.ProductFullDetail.useProductFullDetail.wrapWith(
            '@landofcoder/yume-ui'
        );
    });

    // Set the buildpack features required by this extension
    const builtins = targets.of('@magento/pwa-buildpack');
    builtins.specialFeatures.tap(featuresByModule => {
        console.log("feature by modules :");
        console.log(featuresByModule);
        featuresByModule['@landofcoder/yume-ui'] = {
            // Wrapper modules must be ES Modules
            esModules: true,
            cssModules: true
        };
    });
};
