var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
export var CURRENT_ADMIN_USER = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tquery CurrentAdmin {\n\t\tcurrentAdmin {\n\t\t\tadmin {\n\t\t\t\tid\n\t\t\t\temail\n\t\t\t}\n\t\t\terrors {\n\t\t\t\tkey\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\tquery CurrentAdmin {\n\t\tcurrentAdmin {\n\t\t\tadmin {\n\t\t\t\tid\n\t\t\t\temail\n\t\t\t}\n\t\t\terrors {\n\t\t\t\tkey\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n"])));
export var GET_CRON_STATUS = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tquery GetCronStatus($cronName: String!) {\n\t\tgetCronStatus(cronName: $cronName) {\n\t\t\tstatus\n\t\t\terrors {\n\t\t\t\tkey\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\tquery GetCronStatus($cronName: String!) {\n\t\tgetCronStatus(cronName: $cronName) {\n\t\t\tstatus\n\t\t\terrors {\n\t\t\t\tkey\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=query.js.map