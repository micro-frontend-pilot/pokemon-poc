export default class LazyLoader {
    constructor($injector, $rootScope) {
        this.$injector = $injector;
        this.$rootScope = $rootScope;
    }

    async loadModules(bundleUrl) {
        // import에 문자열로 넘겨주지 않으면, 에러 발생
        const moduleName = await import(bundleUrl+"");
        const alreadyLoadedModules = Object.keys(this.$injector.modules);
        this.$injector.loadNewModules([moduleName.default]);
        
        const newModules = 
            Object.keys(this.$injector.modules)
                  .filter(moduleName => alreadyLoadedModules.indexOf(moduleName) === -1);

        // Notify of component loaded similar to ocLazyLoad.componentLoaded (https://oclazyload.readme.io/docs/oclazyloadprovider)
        newModules.forEach((moduleName) => {
            // This is a private usage, it may break in the future.
            this.$injector.modules[moduleName]['_invokeQueue'].forEach(([_, type, [typeName]]) => {
                this.$rootScope.$broadcast('componentLoaded', [moduleName, type, typeName]);
            });
        });
    }
}