var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
export var SEARCH_RECEIPTS = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tquery SearchReceipts($input: ReceiptSearchInput!) {\n\t\tsearchReceipts(input: $input) {\n\t\t\terrors {\n\t\t\t\tkey\n\t\t\t\tmessage\n\t\t\t}\n\t\t\treceipts {\n\t\t\t\tid\n\t\t\t\tdonationsIds\n\t\t\t\tfilesUrls\n\t\t\t\tamountDonated\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t\tpartner {\n\t\t\t\t\tname\n\t\t\t\t\tlogoUrl\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\tquery SearchReceipts($input: ReceiptSearchInput!) {\n\t\tsearchReceipts(input: $input) {\n\t\t\terrors {\n\t\t\t\tkey\n\t\t\t\tmessage\n\t\t\t}\n\t\t\treceipts {\n\t\t\t\tid\n\t\t\t\tdonationsIds\n\t\t\t\tfilesUrls\n\t\t\t\tamountDonated\n\t\t\t\tcreatedAt\n\t\t\t\tupdatedAt\n\t\t\t\tpartner {\n\t\t\t\t\tname\n\t\t\t\t\tlogoUrl\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n"])));
var templateObject_1;
//# sourceMappingURL=query.js.map