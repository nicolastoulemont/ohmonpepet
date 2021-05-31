var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
export var CREATE_USER = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tmutation CreateUser($name: String!, $email: String!) {\n\t\tcreateUser(name: $name, email: $email) {\n\t\t\t... on ActiveUser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\temail\n\t\t\t\tposts {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\tcode\n\t\t\t\tmessage\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\tcode\n\t\t\t\tmessage\n\t\t\t\tinvalidArguments {\n\t\t\t\t\tkey\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\tmutation CreateUser($name: String!, $email: String!) {\n\t\tcreateUser(name: $name, email: $email) {\n\t\t\t... on ActiveUser {\n\t\t\t\tid\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\temail\n\t\t\t\tposts {\n\t\t\t\t\tid\n\t\t\t\t\ttitle\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\tcode\n\t\t\t\tmessage\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\tcode\n\t\t\t\tmessage\n\t\t\t\tinvalidArguments {\n\t\t\t\t\tkey\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"])));
export var CHANGE_USER_STATUS = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tmutation ChangeUserStatus($status: UserStatus!, $id: Int!) {\n\t\tchangeUserStatus(status: $status, id: $id) {\n\t\t\t... on Node {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on User {\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\t... on ActiveUser {\n\t\t\t\t\temail\n\t\t\t\t\tposts {\n\t\t\t\t\t\tid\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t... on DeletedUser {\n\t\t\t\t\tdeletedAt\n\t\t\t\t}\n\t\t\t\t... on BannedUser {\n\t\t\t\t\tbanReason\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\tcode\n\t\t\t\tmessage\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\tcode\n\t\t\t\tmessage\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\tcode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\tmutation ChangeUserStatus($status: UserStatus!, $id: Int!) {\n\t\tchangeUserStatus(status: $status, id: $id) {\n\t\t\t... on Node {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on User {\n\t\t\t\tname\n\t\t\t\tstatus\n\t\t\t\t... on ActiveUser {\n\t\t\t\t\temail\n\t\t\t\t\tposts {\n\t\t\t\t\t\tid\n\t\t\t\t\t\ttitle\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\t... on DeletedUser {\n\t\t\t\t\tdeletedAt\n\t\t\t\t}\n\t\t\t\t... on BannedUser {\n\t\t\t\t\tbanReason\n\t\t\t\t}\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\tcode\n\t\t\t\tmessage\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\tcode\n\t\t\t\tmessage\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\tcode\n\t\t\t\tmessage\n\t\t\t}\n\t\t}\n\t}\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=mutation.js.map