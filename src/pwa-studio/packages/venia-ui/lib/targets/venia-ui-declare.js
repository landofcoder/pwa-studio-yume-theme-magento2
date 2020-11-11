/**
 * These targets are available for interception to modules which depend on `@magento/venia-ui`.
 *
 * Their implementations are found in `./venia-ui-intercept.js`.
 *
 */
module.exports = targets => {
    targets.declare({
        /**
         * Provides access to the list of rendering strategies used by the
         * RichContent component.
         *
         * This target collects a list of RichContentRenderer modules.
         * It builds an array of these renderers, which Venia's RichContent
         * component uses to try and render a block of "rich" content, such
         * as HTML.
         *
         * Use this target if your backend system uses a customized content
         * storage format instead of plain HTML in "rich content" fields such
         * as product descriptions and CMS blocks.
         *
         * @member {tapable.SyncHook}
         *
         * @see [Intercept function signature]{@link rendererInterceptFunction}
         * @see [RichContentRendererList]{@link #RichContentRendererList}
         * @see [RichContentRenderer]{@link RichContentRenderer}
         *
         * @example <caption>Add a renderer</caption>
         * targets.of('@magento/venia-ui').richContentRenderers.tap(
         *   renderers => renderers.add({
         *     componentName: 'AdobeXM',
         *     importPath: '@adobe/xm-components/xm-renderer'
         *   })
         * );
         */
        richContentRenderers: new targets.types.Sync(['renderers']),

        /**
         * Provides access to Venia's routing table.
         *
         * This target lets you add new routes to your storefronts.
         * You can also modify Venia's existing client-side routes,
         * such as cart or checkout URLs.
         *
         * NOTE: This target does not include routes controlled by the Magento
         * admin, such as CMS or catalog URLs.
         *
         * @member {tapable.AsyncSeriesWaterfall}
         *
         * @see [Intercept function signature]{@link routesInterceptFunction}
         * @see [Route definition object]{@link RouteDefinition}
         *
         * @example <caption>Add a custom route for a blog module</caption>
         * const veniaTargets = targets.of('@magento/venia-ui')
         * const routes = veniaTargets.routes
         * routes.tap(
         *   routesArray => {
         *      routesArray.push({
         *          name: 'Blog',
         *          pattern: '/blog/:slug/:id',
         *          path: '@partner/pwa-studio-blog'
         *      });
         *      return routesArray;
         *   })
         */
        routes: new targets.types.AsyncSeriesWaterfall(['routes']),

        /**
         * Provides access to Venia's payment methods
         *
         * This target lets you add new payment to your storefronts.
         *
         * @member {tapable.SyncHook}
         *
         * @see [Intercept function signature]{@link paymentInterceptFunction}
         * @see [PaymentMethodList]{@link #PaymentMethodList}
         * @see [Payment definition object]{@link PaymentDefinition}
         *
         * @example <caption>Add a payment</caption>
         * targets.of('@magento/venia-ui').payments.tap(
         *   payments => payments.add({
         *     paymentCode: 'braintree',
         *     importPath: '@magento/braintree_payment'
         *   })
         * );
         */
        payments: new targets.types.Sync(['payments'])
    });
};

/** Type definitions related to: richContentRenderers */

/**
 * Intercept function signature for the `richContentRenderers` target.
 *
 * Interceptors of `richContentRenderers` should call `.add` on the provided [renderer list]{@link #RichContentRendererList}.
 *
 * @callback rendererInterceptFunction
 *
 * @param {RichContentRendererList} renderers The list of renderers registered
 * so far in the build.
 *
 */

/**
 * Rich content renderers for the RichContent component must implement this
 * interface. Should be written as an ES Module—a module that exports functions
 * with these names, rather than an object with these functions as properties.
 *
 * @typedef {Object} RichContentRenderer
 * @interface
 * @property {React.Component} Component - The React component that does the actual rendering. It will receive the props passed to the RichContent object, including `html`.
 * @property {function} canRender - Function that receives the content to be rendered as
 * a string, and should return `true` if the `Component` can understand and
 * render that content.
 *
 * @example <caption>A renderer that can render any content containing the string "honk"</caption>
 * ```jsx
 * import React from 'react';
 * import PlainHtmlRenderer from '@magento/venia-ui/components/richContent/plainHtmlRenderer';
 *
 * function GooseRenderer(props) {
 *   const html = props.html.replace(/honk/gim, '<strong>HONK!🦢</strong>');
 *   return <PlainHtmlRenderer html={html} />;
 * }
 * export const Component = GooseRenderer;
 *
 * export function canRender(content) {
 *   return /honk/gim.test(content);
 * }
 * ```
 *
 */

/** Type definition related to: routes */

/**
 * Intercept function signature for the `routes` target.
 *
 * Interceptors of `routes` receive an array of {@link RouteDefinition}
 * objects, which Venia will use to generate React Router `<Route />` in the
 * final bundle.
 *
 * Interceptors **must** return an array of RouteDefinitions, either by
 * mutating and then returning the array they received, or by returning a new
 * array of RouteDefinitions.
 *
 * @callback routesInterceptFunction
 *
 * @param {RouteDefinition[]} routes Array of registered routes
 *
 * @returns {RouteDefinition[]} Your function must return the modified array,
 * or a new array you have constructed
 *
 * @example
 * const intercept = routesArray => {
 *      return [
 *        { name: 'Backstop', pattern: '*', path: '@my-components/backstop' },
 *        ...routesArray
 *      ]
 * }
 */

/**
 * A route definition object that describes a route in your storefront.
 *
 * @typedef {Object} RouteDefinition
 * @property {string} name Friendly name for the React component
 * @property {string} path Resolvable path to the component the
 *   Route component will render
 * @property {string} pattern Route pattern. This is used as the
 *   `path` prop for the `<Route/>` component.
 * @property {boolean} [exact] Tells the router whether it should match the route
 *   exactly or not. This property is optional.
 *
 * @example <caption>A custom route with a URL parameter</caption>
 * const myCustomRoute = {
 *      name: 'MyRoute',
 *      pattern: '/my-route/:myRouteParam',
 *      path: '@my-components/my-route-component'
 * }
 */

/** Type definition related to: payments */

/**
 * Intercept function signature for the `payments` target.
 *
 * Interceptors of `payments` should call `.add` on the provided [payment list]{@link #PaymentMethodList}.
 *
 * @callback paymentInterceptFunction
 *
 * @param {PaymentMethodList} renderers The list of payments registered
 * so far in the build.
 *
 */

/**
 * A payment definition object that describes a payment in your storefront.
 *
 * @typedef {Object} PaymentDefinition
 * @property {string} paymentCode is use to map your payment
 * @property {string} importPath Resolvable path to the component the
 *   Route component will render
 *
 * @example <caption>A custom payment method</caption>
 * const myCustomPayment = {
 *      paymentCode: 'cc',
 *     importPath: '@partner/module/path_to_your_component'
 * }
 */

/** Type definition related to: payments */

/**
 * Intercept function signature for the `payments` target.
 *
 * Interceptors of `payments` should call `.add` on the provided [payment list]{@link #PaymentMethodList}.
 *
 * @callback paymentInterceptFunction
 *
 * @param {PaymentMethodList} renderers The list of payments registered
 * so far in the build.
 *
 */

/**
 * A payment definition object that describes a payment in your storefront.
 *
 * @typedef {Object} PaymentDefinition
 * @property {string} paymentCode is use to map your payment
 * @property {string} importPath Resolvable path to the component the
 *   Route component will render
 *
 * @example <caption>A custom payment method</caption>
 * const myCustomPayment = {
 *      paymentCode: 'cc',
 *     importPath: '@partner/module/path_to_your_component'
 * }
 */
