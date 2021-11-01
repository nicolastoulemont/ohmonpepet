import { from, HttpLink } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { isServer } from './utils';
export function createLinks(platform) {
    // HANDLE LINKS CREATION
    // src: https://www.apollographql.com/docs/react/data/subscriptions/
    var httpLink = new HttpLink({
        uri: process.env.NODE_ENV === 'development'
            ? process.env.DEV_HTTP_URI
            : process.env.PROD_HTTP_URI,
        credentials: 'include' // Additional fetch() options like `credentials` or `headers`
    });
    var wsWebLink = !isServer
        ? new WebSocketLink({
            uri: process.env.NODE_ENV === 'development'
                ? process.env.DEV_WS_URI
                : process.env.PROD_WS_URI,
            options: {
                lazy: true,
                reconnect: true
            }
        })
        : null;
    var wsMobileLink = new WebSocketLink({
        uri: process.env.NODE_ENV === 'development'
            ? process.env.DEV_WS_URI
            : process.env.PROD_WS_URI,
        options: {
            lazy: true,
            reconnect: true
        }
    });
    var webLink = !isServer
        ? split(
        // split based on operation type
        function (_a) {
            var query = _a.query;
            var definition = getMainDefinition(query);
            return (definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription');
        }, 
        // @ts-expect-error
        wsWebLink, httpLink)
        : httpLink;
    var mobileLink = split(
    // split based on operation type
    function (_a) {
        var query = _a.query;
        var definition = getMainDefinition(query);
        return (definition.kind === 'OperationDefinition' && definition.operation === 'subscription');
    }, 
    // @ts-expect-error
    wsMobileLink, httpLink);
    var errorLink = onError(function (_a) {
        var graphQLErrors = _a.graphQLErrors, networkError = _a.networkError;
        if (graphQLErrors) {
            graphQLErrors.map(function (error) {
                console.log(error);
                return error;
            });
        }
        if (networkError) {
            console.log(networkError);
        }
    });
    // @ts-expect-error
    return from([errorLink, platform === 'web' ? webLink : mobileLink]);
}
//# sourceMappingURL=links.js.map