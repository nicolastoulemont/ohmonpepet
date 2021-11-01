var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from 'graphql-tag';
import { INVALID_ARGUMENTS_FIELDS, NOT_FOUND_FIELDS, UNABLE_TO_PROCESS_FIELDS, USER_AUTH_FIELDS } from '../errors';
export var CREATE_ACCOUNT = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\t", "\n\t", "\n\tmutation CreateAccount($input: CreateAccountInput!) {\n\t\tcreateAccount(input: $input) {\n\t\t\t... on Account {\n\t\t\t\tid\n\t\t\t\temail\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\t", "\n\tmutation CreateAccount($input: CreateAccountInput!) {\n\t\tcreateAccount(input: $input) {\n\t\t\t... on Account {\n\t\t\t\tid\n\t\t\t\temail\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"])), INVALID_ARGUMENTS_FIELDS, UNABLE_TO_PROCESS_FIELDS);
export var SIGN_IN = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\t", "\n\t", "\n\tmutation SignIn($input: EmailAndPasswordInput!) {\n\t\tsignIn(input: $input) {\n\t\t\t... on Account {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\t", "\n\tmutation SignIn($input: EmailAndPasswordInput!) {\n\t\tsignIn(input: $input) {\n\t\t\t... on Account {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"])), INVALID_ARGUMENTS_FIELDS, NOT_FOUND_FIELDS);
export var SIGN_OUT = gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n\t", "\n\t", "\n\tmutation SignOut {\n\t\tsignOut {\n\t\t\t... on BooleanResult {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\t...UserAuthFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\t", "\n\tmutation SignOut {\n\t\tsignOut {\n\t\t\t... on BooleanResult {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\t...UserAuthFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"])), USER_AUTH_FIELDS, UNABLE_TO_PROCESS_FIELDS);
export var SEND_VERIFICATION_EMAIL = gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n\t", "\n\t", "\n\t", "\n\tmutation SendVerificationEmail($email: String!) {\n\t\tsendVerificationEmail(email: $email) {\n\t\t\t... on BooleanResult {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\t", "\n\t", "\n\tmutation SendVerificationEmail($email: String!) {\n\t\tsendVerificationEmail(email: $email) {\n\t\t\t... on BooleanResult {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"])), UNABLE_TO_PROCESS_FIELDS, INVALID_ARGUMENTS_FIELDS, NOT_FOUND_FIELDS);
export var VERIFY_USER = gql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n\t", "\n\t", "\n\t", "\n\tmutation VerifyUser($input: VerifyUserInput!) {\n\t\tverifyUser(input: $input) {\n\t\t\t... on BooleanResult {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\t", "\n\t", "\n\tmutation VerifyUser($input: VerifyUserInput!) {\n\t\tverifyUser(input: $input) {\n\t\t\t... on BooleanResult {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"
    // TO_DO
    // export const CONNECT_USER_TO_PROCESSOR = gql`
    // 	mutation ConnectUserToProcessor {
    // 		connectUserToProcessor {
    // 			redirectUrl
    // 			errors {
    // 				key
    // 				message
    // 			}
    // 		}
    // 	}
    // `
    // export const VERIFY_USER_PROCESSOR_CONNECTION_COMPLETION = gql`
    // 	mutation VerifyUserProcessorConnectionCompletion {
    // 		verifyUserProcessorConnectionCompletion {
    // 			success
    // 			errors {
    // 				key
    // 				message
    // 			}
    // 		}
    // 	}
    // `
])), UNABLE_TO_PROCESS_FIELDS, INVALID_ARGUMENTS_FIELDS, NOT_FOUND_FIELDS);
// TO_DO
// export const CONNECT_USER_TO_PROCESSOR = gql`
// 	mutation ConnectUserToProcessor {
// 		connectUserToProcessor {
// 			redirectUrl
// 			errors {
// 				key
// 				message
// 			}
// 		}
// 	}
// `
// export const VERIFY_USER_PROCESSOR_CONNECTION_COMPLETION = gql`
// 	mutation VerifyUserProcessorConnectionCompletion {
// 		verifyUserProcessorConnectionCompletion {
// 			success
// 			errors {
// 				key
// 				message
// 			}
// 		}
// 	}
// `
export var DELETE_ACCOUNT = gql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n\t", "\n\t", "\n\t", "\n\tmutation DeleteAccount($confirmPassword: String!) {\n\t\tdeleteAccount(confirmPassword: $confirmPassword) {\n\t\t\t... on BooleanResult {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\t", "\n\t", "\n\tmutation DeleteAccount($confirmPassword: String!) {\n\t\tdeleteAccount(confirmPassword: $confirmPassword) {\n\t\t\t... on BooleanResult {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"])), UNABLE_TO_PROCESS_FIELDS, INVALID_ARGUMENTS_FIELDS, NOT_FOUND_FIELDS);
export var LOST_PASSWORD = gql(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n\t", "\n\tmutation LostPassword($email: String!) {\n\t\tlostPassword(email: $email) {\n\t\t\t... on BooleanResult {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\tmutation LostPassword($email: String!) {\n\t\tlostPassword(email: $email) {\n\t\t\t... on BooleanResult {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t}\n\t}\n"])), NOT_FOUND_FIELDS);
export var RESET_PASSWORD = gql(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n\t", "\n\t", "\n\tmutation ResetPassword($input: ResetPasswordInput!) {\n\t\tresetPassword(input: $input) {\n\t\t\t... on BooleanResult {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\t", "\n\tmutation ResetPassword($input: ResetPasswordInput!) {\n\t\tresetPassword(input: $input) {\n\t\t\t... on BooleanResult {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t}\n\t}\n"])), INVALID_ARGUMENTS_FIELDS, UNABLE_TO_PROCESS_FIELDS);
export var MODIFY_PASSWORD = gql(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n\t", "\n\t", "\n\t", "\n\t", "\n\tmutation ModifyPassword($password: String!, $newPassword: String!) {\n\t\tmodifyPassword(password: $password, newPassword: $newPassword) {\n\t\t\t... on Account {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\t...UserAuthFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\t", "\n\t", "\n\t", "\n\t", "\n\tmutation ModifyPassword($password: String!, $newPassword: String!) {\n\t\tmodifyPassword(password: $password, newPassword: $newPassword) {\n\t\t\t... on Account {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\t...UserAuthFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"])), INVALID_ARGUMENTS_FIELDS, NOT_FOUND_FIELDS, USER_AUTH_FIELDS, UNABLE_TO_PROCESS_FIELDS);
export var MODIFY_EMAIL = gql(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n\tmutation ModifyEmail($email: String!) {\n\t\tmodifyEmail(email: $email) {\n\t\t\t... on Account {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\t...UserAuthFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"], ["\n\tmutation ModifyEmail($email: String!) {\n\t\tmodifyEmail(email: $email) {\n\t\t\t... on Account {\n\t\t\t\tid\n\t\t\t}\n\t\t\t... on NotFoundError {\n\t\t\t\t...NotFoundFields\n\t\t\t}\n\t\t\t... on InvalidArgumentsError {\n\t\t\t\t...InvalidArgumentsFields\n\t\t\t}\n\t\t\t... on UserAuthenticationError {\n\t\t\t\t...UserAuthFields\n\t\t\t}\n\t\t\t... on UnableToProcessError {\n\t\t\t\t...UnableToProcessFields\n\t\t\t}\n\t\t}\n\t}\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10;
//# sourceMappingURL=mutation.js.map