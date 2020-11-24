module.exports = targets => {
    console.log('========================go local intercrept module');
    const buildpackTargets = targets.of('@magento/pwa-buildpack');

    buildpackTargets.specialFeatures.tap(featuresByModule => {
        featuresByModule['@landofcoder/products-slider-module'] = {
            esModules: true
        };
    });
    targets.of('@magento/venia-ui').routes.tap(routes => {
        routes.push({
            name: 'Placeholder Image demo page',
            pattern: '/homepage',
            exact: true,
            path: require.resolve('@landofcoder/products-slider-module')
        });
        return routes;
    });
};