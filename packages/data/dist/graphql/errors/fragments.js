var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
export var INVALID_ARGUMENTS_FIELDS = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tfragment invalidArgumentsFields on InvalidArgumentsError {\n\t\tinvalidArguments {\n\t\t\tkey\n\t\t\tmessage\n\t\t}\n\t}\n"], ["\n\tfragment invalidArgumentsFields on InvalidArgumentsError {\n\t\tinvalidArguments {\n\t\t\tkey\n\t\t\tmessage\n\t\t}\n\t}\n"])));
export var NOT_FOUND_FIELDS = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tfragment notFoundFields on NotFoundError {\n\t\tcode\n\t\tmessage\n\t}\n"], ["\n\tfragment notFoundFields on NotFoundError {\n\t\tcode\n\t\tmessage\n\t}\n"])));
export var UNABLE_TO_PROCESS_FIELDS = gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\tfragment unableToProcessFields on UnableToProcessError {\n\t\tcode\n\t\tmessage\n\t}\n"], ["\n\tfragment unableToProcessFields on UnableToProcessError {\n\t\tcode\n\t\tmessage\n\t}\n"])));
export var USER_AUTH_FIELDS = gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\tfragment userAuthFields on UserAuthenticationError {\n\t\tcode\n\t\tmessage\n\t}\n"], ["\n\tfragment userAuthFields on UserAuthenticationError {\n\t\tcode\n\t\tmessage\n\t}\n"])));
export var USER_FORBIDDEN_FIELDS = gql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n\tfragment userForbiddenFields on UserForbiddenError {\n\t\tcode\n\t\tmessage\n\t}\n"], ["\n\tfragment userForbiddenFields on UserForbiddenError {\n\t\tcode\n\t\tmessage\n\t}\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=fragments.js.map