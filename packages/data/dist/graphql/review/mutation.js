var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
import { USER_AUTH_FIELDS, INVALID_ARGUMENTS_FIELDS, UNABLE_TO_PROCESS_FIELDS } from '../errors';
export var CREATE_REVIEW = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t", "\n\t", "\n\t", "\n\tmutation CreateReview($input: CreateReviewInput!) {\n\t\tcreateReview(input: $input) {\n\t\t\t... on UserReview {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on OperatorReview {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\t...UserAuthFields\n\t\t\t}\n\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\t", "\n\t", "\n\tmutation CreateReview($input: CreateReviewInput!) {\n\t\tcreateReview(input: $input) {\n\t\t\t... on UserReview {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on OperatorReview {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\t...UserAuthFields\n\t\t\t}\n\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"])), UNABLE_TO_PROCESS_FIELDS, INVALID_ARGUMENTS_FIELDS, USER_AUTH_FIELDS);
var templateObject_1;
//# sourceMappingURL=mutation.js.map