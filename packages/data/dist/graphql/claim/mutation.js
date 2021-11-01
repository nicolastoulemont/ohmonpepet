var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
import { UNABLE_TO_PROCESS_FIELDS, USER_AUTH_FIELDS } from '../errors';
export var CREATE_BOOKING_CLAIM = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t", "\n\t", "\n\tmutation CreateBookingClaim($input: CreateBookingClaimInput!) {\n\t\tcreateBookingClaim(input: $input) {\n\t\t\t... on Claim {\n\t\t\t\tid\n\t\t\t\treason\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\t...UserAuthFields\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\t", "\n\tmutation CreateBookingClaim($input: CreateBookingClaimInput!) {\n\t\tcreateBookingClaim(input: $input) {\n\t\t\t... on Claim {\n\t\t\t\tid\n\t\t\t\treason\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\t...UserAuthFields\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t}\n\t}\n"])), UNABLE_TO_PROCESS_FIELDS, USER_AUTH_FIELDS);
var templateObject_1;
//# sourceMappingURL=mutation.js.map