var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
import { UNABLE_TO_PROCESS_FIELDS } from '../errors';
export var GET_LANGUAGE_OPTIONS = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t", "\n\tquery GetLanguagesOptions {\n\t\tlanguagesOptions {\n\t\t\t... on LanguageOptionsList {\n\t\t\t\tlanguageOptions {\n\t\t\t\t\tid\n\t\t\t\t\tnameFr\n\t\t\t\t\tnameEn\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\tquery GetLanguagesOptions {\n\t\tlanguagesOptions {\n\t\t\t... on LanguageOptionsList {\n\t\t\t\tlanguageOptions {\n\t\t\t\t\tid\n\t\t\t\t\tnameFr\n\t\t\t\t\tnameEn\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"])), UNABLE_TO_PROCESS_FIELDS);
var templateObject_1;
//# sourceMappingURL=query.js.map