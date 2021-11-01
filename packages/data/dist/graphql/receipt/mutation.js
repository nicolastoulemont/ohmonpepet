var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
export var CREATE_RECEIPT = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tmutation CreateReceipt($input: ReceiptInput!) {\n\t\tcreateReceipt(input: $input) {\n\t\t\terrors {\n\t\t\t\tkey\n\t\t\t\tmessage\n\t\t\t}\n\t\t\treceipt {\n\t\t\t\tid\n\t\t\t\tpartnerId\n\t\t\t\tdonationsIds\n\t\t\t\tfilesUrls\n\t\t\t\tamountDonated\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t\tpartner {\n\t\t\t\t\tname\n\t\t\t\t\tlogoUrl\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\tmutation CreateReceipt($input: ReceiptInput!) {\n\t\tcreateReceipt(input: $input) {\n\t\t\terrors {\n\t\t\t\tkey\n\t\t\t\tmessage\n\t\t\t}\n\t\t\treceipt {\n\t\t\t\tid\n\t\t\t\tpartnerId\n\t\t\t\tdonationsIds\n\t\t\t\tfilesUrls\n\t\t\t\tamountDonated\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t\tpartner {\n\t\t\t\t\tname\n\t\t\t\t\tlogoUrl\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"])));
var templateObject_1;
//# sourceMappingURL=mutation.js.map