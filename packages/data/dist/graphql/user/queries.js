var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
export var GET_USER_BY_ID = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tquery UserById($id: ID!) {\n\t\tuserById(id: $id) {\n\t\t\t... on ActiveUser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\temail\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\tquery UserById($id: ID!) {\n\t\tuserById(id: $id) {\n\t\t\t... on ActiveUser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\temail\n\t\t\t}\n\t\t}\n\t}\n"])));
export var GET_USERS = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tquery Users {\n\t\tusers {\n\t\t\t... on ActiveUser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\temail\n\t\t\t\tposts {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on DeletedUser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tdeletedAt\n\t\t\t}\n\t\t\t... on BannedUser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tbanReason\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\tquery Users {\n\t\tusers {\n\t\t\t... on ActiveUser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\temail\n\t\t\t\tposts {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on DeletedUser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tdeletedAt\n\t\t\t}\n\t\t\t... on BannedUser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\tbanReason\n\t\t\t}\n\t\t}\n\t}\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=queries.js.map