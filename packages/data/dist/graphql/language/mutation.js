var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
import { INVALID_ARGUMENTS_FIELDS, UNABLE_TO_PROCESS_FIELDS, NOT_FOUND_FIELDS } from '../errors';
export var CREATE_LANGUAGE = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t", "\n\t", "\n\tmutation CreateLanguageOption($input: CreateLanguageOptionInput!) {\n\t\tcreateLanguageOption(input: $input) {\n\t\t\t... on LanguageOption {\n\t\t\t\tid\n\t\t\t\tnameFr\n\t\t\t\tnameEn\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\t", "\n\tmutation CreateLanguageOption($input: CreateLanguageOptionInput!) {\n\t\tcreateLanguageOption(input: $input) {\n\t\t\t... on LanguageOption {\n\t\t\t\tid\n\t\t\t\tnameFr\n\t\t\t\tnameEn\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"])), UNABLE_TO_PROCESS_FIELDS, INVALID_ARGUMENTS_FIELDS);
export var UPDATE_LANGUAGE = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t", "\n\t", "\n\t", "\n\tmutation UpdateLanguageOption($id: ID!, $input: UpdateLanguageOptionInput!) {\n\t\tupdateLanguageOption(id: $id, input: $input) {\n\t\t\t... on LanguageOption {\n\t\t\t\tid\n\t\t\t\tnameFr\n\t\t\t\tnameEn\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\t", "\n\t", "\n\tmutation UpdateLanguageOption($id: ID!, $input: UpdateLanguageOptionInput!) {\n\t\tupdateLanguageOption(id: $id, input: $input) {\n\t\t\t... on LanguageOption {\n\t\t\t\tid\n\t\t\t\tnameFr\n\t\t\t\tnameEn\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t}\n\t}\n"])), UNABLE_TO_PROCESS_FIELDS, INVALID_ARGUMENTS_FIELDS, NOT_FOUND_FIELDS);
export var DELETE_LANGUAGE = gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t", "\n\t", "\n\tmutation DeleteLanguageOption($id: ID!) {\n\t\tdeleteLanguageOption(id: $id) {\n\t\t\t... on BooleanResult {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\t", "\n\tmutation DeleteLanguageOption($id: ID!) {\n\t\tdeleteLanguageOption(id: $id) {\n\t\t\t... on BooleanResult {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t}\n\t}\n"])), INVALID_ARGUMENTS_FIELDS, NOT_FOUND_FIELDS);
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=mutation.js.map