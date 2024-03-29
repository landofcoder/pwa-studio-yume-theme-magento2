function makeRoutesTarget(yume) {
    const routeList = yume.reactComponent(
        '@landofcoder/yume-ui/src/components/Routes/routes.js',
        async ({ routes }, self) => addRoutes(self, await routes.promise([]))
    );

    // Add our own default routes!
    addRoutes(routeList, require('../defaultRoutes.json'));
}

function addRoutes(routeList, routes) {
    for (const route of routes) {
        const AddedRoute = routeList.addReactLazyImport(route.path, route.name);
        routeList.prependJSX(
            'Switch',
            `<Route ${route.exact ? 'exact ' : ''}path={${JSON.stringify(
                route.pattern
            )}}><${AddedRoute}/></Route>`
        );
    }
}

module.exports = makeRoutesTarget;
