var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
import { UNABLE_TO_PROCESS_FIELDS, INVALID_ARGUMENTS_FIELDS, USER_AUTH_FIELDS, USER_FORBIDDEN_FIELDS } from '../errors';
export var CREATE__DONATION_RECEIPT = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t", "\n\t", "\n\t", "\n\t", "\n\tmutation CreateDonationReceipt($input: CreateDonationReceiptInput!) {\n\t\tcreateDonationReceipt(input: $input) {\n\t\t\t... on DonationReceipt {\n\t\t\t\tid\n\t\t\t\tamountDonated\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t\tdonations {\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t\tfiles {\n\t\t\t\t\tstoreUrl\n\t\t\t\t}\n\t\t\t\tpartner {\n\t\t\t\t\tname\n\t\t\t\t\tmedias {\n\t\t\t\t\t\tstoreUrl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\t...UserAuthFields\n\t\t\t}\n\t\t\t... on UserForbiddenError {\n\t\t\t\t...UserForbiddenFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\t", "\n\t", "\n\t", "\n\tmutation CreateDonationReceipt($input: CreateDonationReceiptInput!) {\n\t\tcreateDonationReceipt(input: $input) {\n\t\t\t... on DonationReceipt {\n\t\t\t\tid\n\t\t\t\tamountDonated\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t\tdonations {\n\t\t\t\t\tid\n\t\t\t\t}\n\t\t\t\tfiles {\n\t\t\t\t\tstoreUrl\n\t\t\t\t}\n\t\t\t\tpartner {\n\t\t\t\t\tname\n\t\t\t\t\tmedias {\n\t\t\t\t\t\tstoreUrl\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\t...UserAuthFields\n\t\t\t}\n\t\t\t... on UserForbiddenError {\n\t\t\t\t...UserForbiddenFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"])), UNABLE_TO_PROCESS_FIELDS, INVALID_ARGUMENTS_FIELDS, USER_AUTH_FIELDS, USER_FORBIDDEN_FIELDS);
var templateObject_1;
//# sourceMappingURL=mutation.js.map