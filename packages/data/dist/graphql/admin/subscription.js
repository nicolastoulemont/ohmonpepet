var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
export var SUBSCRIBE_TO_PENDING_PAYMENT_CRON = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tsubscription SubscribeToPendingPaymentCron {\n\t\tpendingPaymentCronSub {\n\t\t\terrors {\n\t\t\t\tkey\n\t\t\t\tmessage\n\t\t\t}\n\t\t\tsuccess\n\t\t}\n\t}\n"], ["\n\tsubscription SubscribeToPendingPaymentCron {\n\t\tpendingPaymentCronSub {\n\t\t\terrors {\n\t\t\t\tkey\n\t\t\t\tmessage\n\t\t\t}\n\t\t\tsuccess\n\t\t}\n\t}\n"])));
export var SUBSCRIBE_TO_SETUP_INTENT_CRON = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tsubscription SubscribeToSetupIntentCron {\n\t\tsetupIntentCronSub {\n\t\t\terrors {\n\t\t\t\tkey\n\t\t\t\tmessage\n\t\t\t}\n\t\t\tsuccess\n\t\t}\n\t}\n"], ["\n\tsubscription SubscribeToSetupIntentCron {\n\t\tsetupIntentCronSub {\n\t\t\terrors {\n\t\t\t\tkey\n\t\t\t\tmessage\n\t\t\t}\n\t\t\tsuccess\n\t\t}\n\t}\n"])));
export var SUBSCRIBE_TO_ERRORS_EMAILS_CRON = gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\tsubscription SubscribeToErrorsEmailCron {\n\t\terrorsEmailCronSub {\n\t\t\terrors {\n\t\t\t\tkey\n\t\t\t\tmessage\n\t\t\t}\n\t\t\tsuccess\n\t\t}\n\t}\n"], ["\n\tsubscription SubscribeToErrorsEmailCron {\n\t\terrorsEmailCronSub {\n\t\t\terrors {\n\t\t\t\tkey\n\t\t\t\tmessage\n\t\t\t}\n\t\t\tsuccess\n\t\t}\n\t}\n"])));
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=subscription.js.map