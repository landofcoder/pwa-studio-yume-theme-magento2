/**
 * @module YumeUI/Targets
 */
const RichContentRendererList = require('./RichContentRendererList');
const TalonWrapperConfig = require('./TalonWrapperConfig');
const path = require('path');

const packageDir = path.resolve(__dirname, '../../');
module.exports = targets => {
    //move builtins for reuse.
    const builtins = targets.of('@magento/pwa-buildpack');

    // inject ui

    builtins.specialFeatures.tap(featuresByModule => {
        featuresByModule['@landofcoder/yume-ui'] = {
            cssModules: true,
            esModules: true,
            graphqlQueries: true,
            rootComponents: true,
            upward: true
        };
    });

    builtins.webpackCompiler.tap(compiler =>
        compiler.hooks.compilation.tap(name, compilation => {
            const renderers = new RichContentRendererList();
            compilation.hooks.normalModuleLoader.tap(
                `${name}:RichContentRendererInjector`,
                (loaderContext, mod) => {
                    if (renderers.shouldInject(mod)) {
                        targets.own.richContentRenderers.call(renderers);
                        renderers.inject(mod);
                    }
                }
            );
        })
    );

    // Dogfood our own richContentRenderer hook to insert the fallback renderer.
    targets.own.richContentRenderers.tap(rendererInjector =>
        rendererInjector.add({
            componentName: 'PlainHtmlRenderer',
            importPath: './plainHtmlRenderer'
        })
    );

    /**
     * Implementation of our `routes` target. When Buildpack runs
     * `transformModules`, this interceptor will provide a nice API to
     * consumers of `routes`: instead of specifying the transform file
     * and the path to the routes component, you can just push route
     * requests into a neat little array.
     */
    builtins.transformModules.tap(addTransform => {
        addTransform({
            type: 'babel',
            fileToTransform:
                '@landofcoder/yume-ui/src/components/Routes/routes.js',
            transformModule:
                '@landofcoder/yume-ui/src/targets/BabelRouteInjectionPlugin',
            options: {
                routes: targets.own.routes.call([])
            }
        });
    });

    // The paths below are relative to packages/venia-ui/lib/components/Routes/routes.js.
    targets.own.routes.tap(routes => [
        ...routes,
        // {
        //     name: 'AddressBook',
        //     pattern: '/address-book',
        //     exact: true,
        //     path: '../AddressBookPage'
        // },
        {
            name: 'Cart',
            pattern: '/cart',
            exact: true,
            path: '../CartPage'
        },
        {
            name: 'CheckoutPage',
            pattern: '/checkout',
            exact: true,
            path: '../CheckoutPage'
        },
        {
            name: 'CommunicationsPage',
            pattern: '/communications',
            exact: true,
            path: '../CommunicationsPage'
        },
        {
            name: 'CreateAccountPage',
            pattern: '/create-account',
            exact: true,
            path: '../CreateAccountPage'
        },
        // {
        //     name: 'OrderHistory',
        //     pattern: '/order-history',
        //     exact: true,
        //     path: '../OrderHistoryPage'
        // },
        {
            /**
             * This path is configured in the forgot password
             * email template in the admin panel.
             */
            name: 'Reset Password',
            pattern: '/customer/account/createPassword',
            exact: true,
            path: '../MyAccount/ResetPassword'
        },
        {
            name: 'Search',
            pattern: '/search.html',
            exact: true,
            path: '../../RootComponents/Search'
        }
        // {
        //     name: 'WishlistPage',
        //     pattern: '/wishlist',
        //     exact: true,
        //     path: '../WishlistPage'
        // }
    ]);

    // inject peregrine used for talons target

    builtins.specialFeatures.tap(featuresByModule => {
        featuresByModule['@landofcoder/yume-ui'] = {
            cssModules: true,
            esModules: true,
            graphqlQueries: true
        };
    });
    /**
     * Tap the low-level Buildpack target for wrapping _any_ frontend module.
     * Wrap the config object in a TalonWrapperConfig, which presents
     * higher-level targets for named and namespaced talons, instead of the
     * file paths directly.
     * Pass that higher-level config through `talons` interceptors, so they can
     * add wrappers for the talon modules without tapping the `transformModules`
     * config themselves.
     */
    builtins.transformModules.tap(addTransform => {
        const talonWrapperConfig = new TalonWrapperConfig(addTransform);

        targets.own.talons.call(talonWrapperConfig);
    });
};
