var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { useMemo } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createLinks } from './links';
var apolloClient = null;
function createApolloClient() {
    return new ApolloClient({
        link: createLinks('mobile'),
        cache: new InMemoryCache()
    });
}
function initializeMobileApollo(initialState) {
    if (initialState === void 0) { initialState = null; }
    var _apolloClient = apolloClient !== null && apolloClient !== void 0 ? apolloClient : createApolloClient();
    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        var existingCache = _apolloClient.extract();
        // Restore the cache using the data passed from getStaticProps/getServerSideProps
        // combined with the existing cached data
        _apolloClient.cache.restore(__assign(__assign({}, existingCache), initialState));
    }
    // Create the Apollo Client once in the client
    if (!apolloClient)
        apolloClient = _apolloClient;
    return _apolloClient;
}
export function useMobileApollo(initialState) {
    var store = useMemo(function () { return initializeMobileApollo(initialState); }, [initialState]);
    return store;
}
//# sourceMappingURL=mobile.js.map