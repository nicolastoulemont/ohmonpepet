var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
var defaultOptions = {};
/** The booking different possible status */
export var BookingStatus;
(function (BookingStatus) {
    BookingStatus["BothConfirmed"] = "BOTH_CONFIRMED";
    BookingStatus["Canceled"] = "CANCELED";
    BookingStatus["NoneConfirmed"] = "NONE_CONFIRMED";
    BookingStatus["Paid"] = "PAID";
    BookingStatus["PaymentAuthorized"] = "PAYMENT_AUTHORIZED";
    BookingStatus["PendingOwnerValidation"] = "PENDING_OWNER_VALIDATION";
    BookingStatus["PendingSitterValidation"] = "PENDING_SITTER_VALIDATION";
    BookingStatus["UnderReview"] = "UNDER_REVIEW";
})(BookingStatus || (BookingStatus = {}));
/** The differents error codes the api will return if needed */
export var ErrorCode;
(function (ErrorCode) {
    ErrorCode["BadRequest"] = "BAD_REQUEST";
    ErrorCode["Forbidden"] = "FORBIDDEN";
    ErrorCode["NotFound"] = "NOT_FOUND";
    ErrorCode["UnableToProcess"] = "UNABLE_TO_PROCESS";
    ErrorCode["Unauthorized"] = "UNAUTHORIZED";
})(ErrorCode || (ErrorCode = {}));
/** The differents error message the api will return if needed */
export var ErrorMessage;
(function (ErrorMessage) {
    ErrorMessage["ForbiddenYouDoNotHaveAccessToThisResource"] = "FORBIDDEN_YOU_DO_NOT_HAVE_ACCESS_TO_THIS_RESOURCE";
    ErrorMessage["ResourceNotFound"] = "RESOURCE_NOT_FOUND";
    ErrorMessage["UnableToProcessRequestDueToClientError"] = "UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR";
    ErrorMessage["UnableToProcessRequestDueToServerError"] = "UNABLE_TO_PROCESS_REQUEST_DUE_TO_SERVER_ERROR";
    ErrorMessage["UnauthenticatedPleaseLogin"] = "UNAUTHENTICATED_PLEASE_LOGIN";
})(ErrorMessage || (ErrorMessage = {}));
/** Type of media accepted */
export var MediaType;
(function (MediaType) {
    MediaType["Image"] = "IMAGE";
    MediaType["Video"] = "VIDEO";
})(MediaType || (MediaType = {}));
/** All possible payment status */
export var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["AuthorizedButCancelled"] = "AUTHORIZED_BUT_CANCELLED";
    PaymentStatus["AuthorizedRequireCapture"] = "AUTHORIZED_REQUIRE_CAPTURE";
    PaymentStatus["CapturedAndPaid"] = "CAPTURED_AND_PAID";
    PaymentStatus["ErrorSendingAuthRequiredMail"] = "ERROR_SENDING_AUTH_REQUIRED_MAIL";
    PaymentStatus["ErrorSendingInsufficientFundsMail"] = "ERROR_SENDING_INSUFFICIENT_FUNDS_MAIL";
    PaymentStatus["ErrorSendingUnkownErrorMail"] = "ERROR_SENDING_UNKOWN_ERROR_MAIL";
    PaymentStatus["FailedCapture"] = "FAILED_CAPTURE";
    PaymentStatus["FailedPaymentIntentCreationAuthRequired"] = "FAILED_PAYMENT_INTENT_CREATION_AUTH_REQUIRED";
    PaymentStatus["FailedPaymentIntentCreationAuthRequiredMailSent"] = "FAILED_PAYMENT_INTENT_CREATION_AUTH_REQUIRED_MAIL_SENT";
    PaymentStatus["FailedPaymentIntentCreationInsufficientFunds"] = "FAILED_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS";
    PaymentStatus["FailedPaymentIntentCreationInsufficientFundsMailSent"] = "FAILED_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS_MAIL_SENT";
    PaymentStatus["FailedPaymentIntentCreationUnkownError"] = "FAILED_PAYMENT_INTENT_CREATION_UNKOWN_ERROR";
    PaymentStatus["FailedPaymentIntentCreationUnkownErrorMailSent"] = "FAILED_PAYMENT_INTENT_CREATION_UNKOWN_ERROR_MAIL_SENT";
    PaymentStatus["PendingAuthorization"] = "PENDING_AUTHORIZATION";
    PaymentStatus["SetupIntentConfirmedRequiredPaymentIntentCreation"] = "SETUP_INTENT_CONFIRMED_REQUIRED_PAYMENT_INTENT_CREATION";
    PaymentStatus["SetupIntentPendingConfirmation"] = "SETUP_INTENT_PENDING_CONFIRMATION";
})(PaymentStatus || (PaymentStatus = {}));
export var InvalidArgumentsFieldsFragmentDoc = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment InvalidArgumentsFields on InvalidArgumentsError {\n  invalidArguments {\n    key\n    message\n  }\n}\n    "], ["\n    fragment InvalidArgumentsFields on InvalidArgumentsError {\n  invalidArguments {\n    key\n    message\n  }\n}\n    "])));
export var NotFoundFieldsFragmentDoc = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    fragment NotFoundFields on NotFoundError {\n  code\n  message\n}\n    "], ["\n    fragment NotFoundFields on NotFoundError {\n  code\n  message\n}\n    "])));
export var UnableToProcessFieldsFragmentDoc = gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    fragment UnableToProcessFields on UnableToProcessError {\n  code\n  message\n}\n    "], ["\n    fragment UnableToProcessFields on UnableToProcessError {\n  code\n  message\n}\n    "])));
export var UserAuthFieldsFragmentDoc = gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    fragment UserAuthFields on UserAuthenticationError {\n  code\n  message\n}\n    "], ["\n    fragment UserAuthFields on UserAuthenticationError {\n  code\n  message\n}\n    "])));
export var UserForbiddenFieldsFragmentDoc = gql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    fragment UserForbiddenFields on UserForbiddenError {\n  code\n  message\n}\n    "], ["\n    fragment UserForbiddenFields on UserForbiddenError {\n  code\n  message\n}\n    "])));
export var MessageFieldsFragmentDoc = gql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    fragment MessageFields on Message {\n  id\n  updatedAt\n  readAt\n}\n    "], ["\n    fragment MessageFields on Message {\n  id\n  updatedAt\n  readAt\n}\n    "])));
export var CreateAccountDocument = gql(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    mutation CreateAccount($input: CreateAccountInput!) {\n  createAccount(input: $input) {\n    ... on Account {\n      id\n      email\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation CreateAccount($input: CreateAccountInput!) {\n  createAccount(input: $input) {\n    ... on Account {\n      id\n      email\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateAccountDocument, options);
}
export var SignInDocument = gql(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    mutation SignIn($input: EmailAndPasswordInput!) {\n  signIn(input: $input) {\n    ... on Account {\n      id\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation SignIn($input: EmailAndPasswordInput!) {\n  signIn(input: $input) {\n    ... on Account {\n      id\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), NotFoundFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(SignInDocument, options);
}
export var SignOutDocument = gql(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    mutation SignOut {\n  signOut {\n    ... on BooleanResult {\n      success\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation SignOut {\n  signOut {\n    ... on BooleanResult {\n      success\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""])), UserAuthFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(SignOutDocument, options);
}
export var SendVerificationEmailDocument = gql(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    mutation SendVerificationEmail($email: String!) {\n  sendVerificationEmail(email: $email) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation SendVerificationEmail($email: String!) {\n  sendVerificationEmail(email: $email) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, NotFoundFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useSendVerificationEmailMutation__
 *
 * To run a mutation, you first call `useSendVerificationEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendVerificationEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendVerificationEmailMutation, { data, loading, error }] = useSendVerificationEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendVerificationEmailMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(SendVerificationEmailDocument, options);
}
export var VerifyUserDocument = gql(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    mutation VerifyUser($input: VerifyUserInput!) {\n  verifyUser(input: $input) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation VerifyUser($input: VerifyUserInput!) {\n  verifyUser(input: $input) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, NotFoundFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useVerifyUserMutation__
 *
 * To run a mutation, you first call `useVerifyUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyUserMutation, { data, loading, error }] = useVerifyUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyUserMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(VerifyUserDocument, options);
}
export var DeleteAccountDocument = gql(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    mutation DeleteAccount($confirmPassword: String!) {\n  deleteAccount(confirmPassword: $confirmPassword) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation DeleteAccount($confirmPassword: String!) {\n  deleteAccount(confirmPassword: $confirmPassword) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, NotFoundFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useDeleteAccountMutation__
 *
 * To run a mutation, you first call `useDeleteAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccountMutation, { data, loading, error }] = useDeleteAccountMutation({
 *   variables: {
 *      confirmPassword: // value for 'confirmPassword'
 *   },
 * });
 */
export function useDeleteAccountMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(DeleteAccountDocument, options);
}
export var LostPasswordDocument = gql(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n    mutation LostPassword($email: String!) {\n  lostPassword(email: $email) {\n    ... on BooleanResult {\n      success\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", ""], ["\n    mutation LostPassword($email: String!) {\n  lostPassword(email: $email) {\n    ... on BooleanResult {\n      success\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", ""])), NotFoundFieldsFragmentDoc);
/**
 * __useLostPasswordMutation__
 *
 * To run a mutation, you first call `useLostPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLostPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [lostPasswordMutation, { data, loading, error }] = useLostPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useLostPasswordMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(LostPasswordDocument, options);
}
export var ResetPasswordDocument = gql(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n    mutation ResetPassword($input: ResetPasswordInput!) {\n  resetPassword(input: $input) {\n    ... on BooleanResult {\n      success\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation ResetPassword($input: ResetPasswordInput!) {\n  resetPassword(input: $input) {\n    ... on BooleanResult {\n      success\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", ""])), UnableToProcessFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc);
/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(ResetPasswordDocument, options);
}
export var ModifyPasswordDocument = gql(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n    mutation ModifyPassword($password: String!, $newPassword: String!) {\n  modifyPassword(password: $password, newPassword: $newPassword) {\n    ... on Account {\n      id\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""], ["\n    mutation ModifyPassword($password: String!, $newPassword: String!) {\n  modifyPassword(password: $password, newPassword: $newPassword) {\n    ... on Account {\n      id\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), NotFoundFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useModifyPasswordMutation__
 *
 * To run a mutation, you first call `useModifyPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyPasswordMutation, { data, loading, error }] = useModifyPasswordMutation({
 *   variables: {
 *      password: // value for 'password'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useModifyPasswordMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(ModifyPasswordDocument, options);
}
export var ModifyEmailDocument = gql(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n    mutation ModifyEmail($email: String!) {\n  modifyEmail(email: $email) {\n    ... on Account {\n      id\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""], ["\n    mutation ModifyEmail($email: String!) {\n  modifyEmail(email: $email) {\n    ... on Account {\n      id\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), NotFoundFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useModifyEmailMutation__
 *
 * To run a mutation, you first call `useModifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modifyEmailMutation, { data, loading, error }] = useModifyEmailMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useModifyEmailMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(ModifyEmailDocument, options);
}
export var CurrentAccountDocument = gql(templateObject_17 || (templateObject_17 = __makeTemplateObject(["\n    query CurrentAccount {\n  currentAccount {\n    ... on Account {\n      id\n      email\n      verifiedAt\n      user {\n        firstName\n      }\n      operator {\n        id\n        isActive\n      }\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    query CurrentAccount {\n  currentAccount {\n    ... on Account {\n      id\n      email\n      verifiedAt\n      user {\n        firstName\n      }\n      operator {\n        id\n        isActive\n      }\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", ""])), UserAuthFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useCurrentAccountQuery__
 *
 * To run a query within a React component, call `useCurrentAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentAccountQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentAccountQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(CurrentAccountDocument, options);
}
export function useCurrentAccountLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(CurrentAccountDocument, options);
}
export var AllAccountsDocument = gql(templateObject_18 || (templateObject_18 = __makeTemplateObject(["\n    query AllAccounts {\n  allAccounts {\n    ... on AccountsList {\n      accounts {\n        id\n        verifiedAt\n        updatedAt\n      }\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    query AllAccounts {\n  allAccounts {\n    ... on AccountsList {\n      accounts {\n        id\n        verifiedAt\n        updatedAt\n      }\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useAllAccountsQuery__
 *
 * To run a query within a React component, call `useAllAccountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAccountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllAccountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllAccountsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(AllAccountsDocument, options);
}
export function useAllAccountsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(AllAccountsDocument, options);
}
export var CreateBookingAdDocument = gql(templateObject_19 || (templateObject_19 = __makeTemplateObject(["\n    mutation CreateBookingAd($input: CreateBookingAdInput!) {\n  createBookingAd(input: $input) {\n    ... on BookingAd {\n      id\n      createdAt\n      updatedAt\n      animalsSpeciesIds\n      startDate\n      endDate\n      serviceOptionId\n      description\n      location {\n        latitude\n        longitude\n      }\n    }\n    ... on PreExistingUserAdError {\n      preExistingUserAdError\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation CreateBookingAd($input: CreateBookingAdInput!) {\n  createBookingAd(input: $input) {\n    ... on BookingAd {\n      id\n      createdAt\n      updatedAt\n      animalsSpeciesIds\n      startDate\n      endDate\n      serviceOptionId\n      description\n      location {\n        latitude\n        longitude\n      }\n    }\n    ... on PreExistingUserAdError {\n      preExistingUserAdError\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useCreateBookingAdMutation__
 *
 * To run a mutation, you first call `useCreateBookingAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingAdMutation, { data, loading, error }] = useCreateBookingAdMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookingAdMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateBookingAdDocument, options);
}
export var UpdateBookingAdDocument = gql(templateObject_20 || (templateObject_20 = __makeTemplateObject(["\n    mutation UpdateBookingAd($id: ID!, $input: UpdateBookingAdInput!) {\n  updateBookingAd(id: $id, input: $input) {\n    ... on BookingAd {\n      id\n      createdAt\n      updatedAt\n      animalsSpeciesIds\n      startDate\n      endDate\n      serviceOptionId\n      description\n      location {\n        latitude\n        longitude\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation UpdateBookingAd($id: ID!, $input: UpdateBookingAdInput!) {\n  updateBookingAd(id: $id, input: $input) {\n    ... on BookingAd {\n      id\n      createdAt\n      updatedAt\n      animalsSpeciesIds\n      startDate\n      endDate\n      serviceOptionId\n      description\n      location {\n        latitude\n        longitude\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), NotFoundFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useUpdateBookingAdMutation__
 *
 * To run a mutation, you first call `useUpdateBookingAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookingAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookingAdMutation, { data, loading, error }] = useUpdateBookingAdMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBookingAdMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(UpdateBookingAdDocument, options);
}
export var DeleteBookingAdDocument = gql(templateObject_21 || (templateObject_21 = __makeTemplateObject(["\n    mutation DeleteBookingAd($id: ID!) {\n  deleteBookingAd(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation DeleteBookingAd($id: ID!) {\n  deleteBookingAd(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), NotFoundFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useDeleteBookingAdMutation__
 *
 * To run a mutation, you first call `useDeleteBookingAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBookingAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBookingAdMutation, { data, loading, error }] = useDeleteBookingAdMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteBookingAdMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(DeleteBookingAdDocument, options);
}
export var BidForBookingAdDocument = gql(templateObject_22 || (templateObject_22 = __makeTemplateObject(["\n    mutation BidForBookingAd($id: ID!) {\n  bidForBookingAd(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation BidForBookingAd($id: ID!) {\n  bidForBookingAd(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), NotFoundFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useBidForBookingAdMutation__
 *
 * To run a mutation, you first call `useBidForBookingAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBidForBookingAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [bidForBookingAdMutation, { data, loading, error }] = useBidForBookingAdMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBidForBookingAdMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(BidForBookingAdDocument, options);
}
export var RemoveBidForBookingAdDocument = gql(templateObject_23 || (templateObject_23 = __makeTemplateObject(["\n    mutation RemoveBidForBookingAd($id: ID!) {\n  removeBidForBookingAd(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation RemoveBidForBookingAd($id: ID!) {\n  removeBidForBookingAd(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), NotFoundFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useRemoveBidForBookingAdMutation__
 *
 * To run a mutation, you first call `useRemoveBidForBookingAdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveBidForBookingAdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeBidForBookingAdMutation, { data, loading, error }] = useRemoveBidForBookingAdMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveBidForBookingAdMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(RemoveBidForBookingAdDocument, options);
}
export var CurrentUserAdsDocument = gql(templateObject_24 || (templateObject_24 = __makeTemplateObject(["\n    query CurrentUserAds {\n  currentUserAds {\n    ... on BookingAds {\n      bookingAds {\n        id\n        createdAt\n        updatedAt\n        animalsSpeciesIds\n        startDate\n        endDate\n        serviceOptionId\n        serviceMaxPrice\n        description\n        bidders {\n          id\n          bids {\n            id\n          }\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""], ["\n    query CurrentUserAds {\n  currentUserAds {\n    ... on BookingAds {\n      bookingAds {\n        id\n        createdAt\n        updatedAt\n        animalsSpeciesIds\n        startDate\n        endDate\n        serviceOptionId\n        serviceMaxPrice\n        description\n        bidders {\n          id\n          bids {\n            id\n          }\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""])), UnableToProcessFieldsFragmentDoc);
/**
 * __useCurrentUserAdsQuery__
 *
 * To run a query within a React component, call `useCurrentUserAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserAdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserAdsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(CurrentUserAdsDocument, options);
}
export function useCurrentUserAdsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(CurrentUserAdsDocument, options);
}
export var AdByIdDocument = gql(templateObject_25 || (templateObject_25 = __makeTemplateObject(["\n    query AdById($id: ID!) {\n  adById(id: $id) {\n    ... on BookingAd {\n      id\n      updatedAt\n      animalsSpeciesIds\n      startDate\n      endDate\n      serviceOptionId\n      description\n      serviceMaxPrice\n      location {\n        latitude\n        longitude\n      }\n      bidders {\n        id\n        account {\n          user {\n            firstName\n          }\n        }\n        avatar {\n          storeUrl\n        }\n        averageScore\n        location {\n          latitude\n          longitude\n        }\n        coreServices {\n          id\n          price\n        }\n        extraServices {\n          atHomeExclusivity\n          atHomeExclusivityExtraPrice\n          atHomeContinuously\n          atHomeContinuouslyExtraPrice\n          atHomeOnlyBringPet\n          atHomeOnlyBringPetExtraPrice\n          atHomeComeGetPet\n          atHomeComeGetPetExtraPrice\n          atOwnerHomePlantsCare\n          atOwnerHomePlantsCareExtraPrice\n          atOwnerHomeMail\n          atOwnerHomeMailExtraPrice\n          atOwnerHomeCurtains\n          atOwnerHomeCurtainsExtraPrice\n          acceptShortNotice\n          flexibleCancelation\n          isProfessionalOperator\n          abilityToProvideMedicalCare\n        }\n      }\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    query AdById($id: ID!) {\n  adById(id: $id) {\n    ... on BookingAd {\n      id\n      updatedAt\n      animalsSpeciesIds\n      startDate\n      endDate\n      serviceOptionId\n      description\n      serviceMaxPrice\n      location {\n        latitude\n        longitude\n      }\n      bidders {\n        id\n        account {\n          user {\n            firstName\n          }\n        }\n        avatar {\n          storeUrl\n        }\n        averageScore\n        location {\n          latitude\n          longitude\n        }\n        coreServices {\n          id\n          price\n        }\n        extraServices {\n          atHomeExclusivity\n          atHomeExclusivityExtraPrice\n          atHomeContinuously\n          atHomeContinuouslyExtraPrice\n          atHomeOnlyBringPet\n          atHomeOnlyBringPetExtraPrice\n          atHomeComeGetPet\n          atHomeComeGetPetExtraPrice\n          atOwnerHomePlantsCare\n          atOwnerHomePlantsCareExtraPrice\n          atOwnerHomeMail\n          atOwnerHomeMailExtraPrice\n          atOwnerHomeCurtains\n          atOwnerHomeCurtainsExtraPrice\n          acceptShortNotice\n          flexibleCancelation\n          isProfessionalOperator\n          abilityToProvideMedicalCare\n        }\n      }\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useAdByIdQuery__
 *
 * To run a query within a React component, call `useAdByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdByIdQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(AdByIdDocument, options);
}
export function useAdByIdLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(AdByIdDocument, options);
}
export var SearchAdsDocument = gql(templateObject_26 || (templateObject_26 = __makeTemplateObject(["\n    query SearchAds($input: SearchAdsInput!) {\n  searchAds(input: $input) {\n    ... on BookingAds {\n      bookingAds {\n        id\n        updatedAt\n        animalsSpeciesIds\n        startDate\n        endDate\n        serviceOptionId\n        description\n        location {\n          latitude\n          longitude\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""], ["\n    query SearchAds($input: SearchAdsInput!) {\n  searchAds(input: $input) {\n    ... on BookingAds {\n      bookingAds {\n        id\n        updatedAt\n        animalsSpeciesIds\n        startDate\n        endDate\n        serviceOptionId\n        description\n        location {\n          latitude\n          longitude\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""])), UnableToProcessFieldsFragmentDoc);
/**
 * __useSearchAdsQuery__
 *
 * To run a query within a React component, call `useSearchAdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchAdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchAdsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchAdsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(SearchAdsDocument, options);
}
export function useSearchAdsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(SearchAdsDocument, options);
}
export var CurrentOperatorBidsDocument = gql(templateObject_27 || (templateObject_27 = __makeTemplateObject(["\n    query CurrentOperatorBids {\n  currentOperatorBids {\n    ... on BookingAdBids {\n      bids {\n        bookingAd {\n          id\n          updatedAt\n          animalsSpeciesIds\n          startDate\n          endDate\n          serviceOptionId\n          description\n          location {\n            latitude\n            longitude\n          }\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""], ["\n    query CurrentOperatorBids {\n  currentOperatorBids {\n    ... on BookingAdBids {\n      bids {\n        bookingAd {\n          id\n          updatedAt\n          animalsSpeciesIds\n          startDate\n          endDate\n          serviceOptionId\n          description\n          location {\n            latitude\n            longitude\n          }\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""])), UnableToProcessFieldsFragmentDoc);
/**
 * __useCurrentOperatorBidsQuery__
 *
 * To run a query within a React component, call `useCurrentOperatorBidsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentOperatorBidsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentOperatorBidsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentOperatorBidsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(CurrentOperatorBidsDocument, options);
}
export function useCurrentOperatorBidsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(CurrentOperatorBidsDocument, options);
}
export var CreateBookingDocument = gql(templateObject_28 || (templateObject_28 = __makeTemplateObject(["\n    mutation CreateBooking($input: CreateBookingInput!) {\n  createBooking(input: $input) {\n    ... on Booking {\n      id\n      startDate\n      endDate\n      status\n      ownerConfirmationDate\n      operatorConfirmationDate\n      selectedOptions\n      animals {\n        specieOptionId\n      }\n      messages {\n        ... on UserBookingMessage {\n          id\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on CannotBookHimSelfError {\n      cannotBookHimSelfError\n    }\n    ... on ExistingBookingError {\n      existingBookingError\n    }\n    ... on NotSupportedExtraServiceError {\n      notSupportedExtraServiceError\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""], ["\n    mutation CreateBooking($input: CreateBookingInput!) {\n  createBooking(input: $input) {\n    ... on Booking {\n      id\n      startDate\n      endDate\n      status\n      ownerConfirmationDate\n      operatorConfirmationDate\n      selectedOptions\n      animals {\n        specieOptionId\n      }\n      messages {\n        ... on UserBookingMessage {\n          id\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on CannotBookHimSelfError {\n      cannotBookHimSelfError\n    }\n    ... on ExistingBookingError {\n      existingBookingError\n    }\n    ... on NotSupportedExtraServiceError {\n      notSupportedExtraServiceError\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), UnableToProcessFieldsFragmentDoc, NotFoundFieldsFragmentDoc, UserAuthFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc);
/**
 * __useCreateBookingMutation__
 *
 * To run a mutation, you first call `useCreateBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingMutation, { data, loading, error }] = useCreateBookingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookingMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateBookingDocument, options);
}
export var ConfirmBookingDocument = gql(templateObject_29 || (templateObject_29 = __makeTemplateObject(["\n    mutation ConfirmBooking($input: ConfirmBookingInput!) {\n  confirmBooking(input: $input) {\n    ... on Booking {\n      id\n      ownerConfirmationDate\n      operatorConfirmationDate\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""], ["\n    mutation ConfirmBooking($input: ConfirmBookingInput!) {\n  confirmBooking(input: $input) {\n    ... on Booking {\n      id\n      ownerConfirmationDate\n      operatorConfirmationDate\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), UnableToProcessFieldsFragmentDoc, NotFoundFieldsFragmentDoc, UserAuthFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc);
/**
 * __useConfirmBookingMutation__
 *
 * To run a mutation, you first call `useConfirmBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmBookingMutation, { data, loading, error }] = useConfirmBookingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfirmBookingMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(ConfirmBookingDocument, options);
}
export var CancelBookingDocument = gql(templateObject_30 || (templateObject_30 = __makeTemplateObject(["\n    mutation CancelBooking($input: CancelBookingInput!) {\n  cancelBooking(input: $input) {\n    ... on Booking {\n      id\n      ownerConfirmationDate\n      operatorConfirmationDate\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""], ["\n    mutation CancelBooking($input: CancelBookingInput!) {\n  cancelBooking(input: $input) {\n    ... on Booking {\n      id\n      ownerConfirmationDate\n      operatorConfirmationDate\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), UnableToProcessFieldsFragmentDoc, NotFoundFieldsFragmentDoc, UserAuthFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc);
/**
 * __useCancelBookingMutation__
 *
 * To run a mutation, you first call `useCancelBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelBookingMutation, { data, loading, error }] = useCancelBookingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelBookingMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CancelBookingDocument, options);
}
export var CancelOnGoingBookingDocument = gql(templateObject_31 || (templateObject_31 = __makeTemplateObject(["\n    mutation CancelOnGoingBooking($input: CancelOnGoingBookingInput!) {\n  cancelOnGoingBooking(input: $input) {\n    ... on Booking {\n      id\n      ownerConfirmationDate\n      operatorConfirmationDate\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""], ["\n    mutation CancelOnGoingBooking($input: CancelOnGoingBookingInput!) {\n  cancelOnGoingBooking(input: $input) {\n    ... on Booking {\n      id\n      ownerConfirmationDate\n      operatorConfirmationDate\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), UnableToProcessFieldsFragmentDoc, NotFoundFieldsFragmentDoc, UserAuthFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc);
/**
 * __useCancelOnGoingBookingMutation__
 *
 * To run a mutation, you first call `useCancelOnGoingBookingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelOnGoingBookingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelOnGoingBookingMutation, { data, loading, error }] = useCancelOnGoingBookingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCancelOnGoingBookingMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CancelOnGoingBookingDocument, options);
}
export var AuthorizePaymentDocument = gql(templateObject_32 || (templateObject_32 = __makeTemplateObject(["\n    mutation AuthorizePayment($id: ID!) {\n  authorizePayment(id: $id) {\n    ... on AuthorizedPayment {\n      clientSecret\n      stripeTargetApi\n      hadRef\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on InvalidOperatorError {\n      invalidOperatorError\n    }\n    ... on OperatorCannotProcessPaymentsError {\n      operatorCannotProcessPaymentsError\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation AuthorizePayment($id: ID!) {\n  authorizePayment(id: $id) {\n    ... on AuthorizedPayment {\n      clientSecret\n      stripeTargetApi\n      hadRef\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on InvalidOperatorError {\n      invalidOperatorError\n    }\n    ... on OperatorCannotProcessPaymentsError {\n      operatorCannotProcessPaymentsError\n    }\n  }\n}\n    ", "\n", "\n", ""])), UnableToProcessFieldsFragmentDoc, NotFoundFieldsFragmentDoc, UserAuthFieldsFragmentDoc);
/**
 * __useAuthorizePaymentMutation__
 *
 * To run a mutation, you first call `useAuthorizePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthorizePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authorizePaymentMutation, { data, loading, error }] = useAuthorizePaymentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAuthorizePaymentMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(AuthorizePaymentDocument, options);
}
export var UpdateBookingPaymentStatusDocument = gql(templateObject_33 || (templateObject_33 = __makeTemplateObject(["\n    mutation UpdateBookingPaymentStatus($input: UpdateBookingPaymentStatusInput!) {\n  updateBookingPaymentStatus(input: $input) {\n    ... on BooleanResult {\n      success\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on PaymentProcessorError {\n      paymentProcessorError\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""], ["\n    mutation UpdateBookingPaymentStatus($input: UpdateBookingPaymentStatusInput!) {\n  updateBookingPaymentStatus(input: $input) {\n    ... on BooleanResult {\n      success\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on PaymentProcessorError {\n      paymentProcessorError\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), UnableToProcessFieldsFragmentDoc, NotFoundFieldsFragmentDoc, UserAuthFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc);
/**
 * __useUpdateBookingPaymentStatusMutation__
 *
 * To run a mutation, you first call `useUpdateBookingPaymentStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBookingPaymentStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBookingPaymentStatusMutation, { data, loading, error }] = useUpdateBookingPaymentStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateBookingPaymentStatusMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(UpdateBookingPaymentStatusDocument, options);
}
export var GetCurrentUserAndOperatorBookingsDocument = gql(templateObject_34 || (templateObject_34 = __makeTemplateObject(["\n    query GetCurrentUserAndOperatorBookings {\n  currentUserAndOperatorBookings {\n    ... on BookingsList {\n      bookings {\n        id\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""], ["\n    query GetCurrentUserAndOperatorBookings {\n  currentUserAndOperatorBookings {\n    ... on BookingsList {\n      bookings {\n        id\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""])), UnableToProcessFieldsFragmentDoc);
/**
 * __useGetCurrentUserAndOperatorBookingsQuery__
 *
 * To run a query within a React component, call `useGetCurrentUserAndOperatorBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCurrentUserAndOperatorBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCurrentUserAndOperatorBookingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCurrentUserAndOperatorBookingsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(GetCurrentUserAndOperatorBookingsDocument, options);
}
export function useGetCurrentUserAndOperatorBookingsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(GetCurrentUserAndOperatorBookingsDocument, options);
}
export var BookingByIdDocument = gql(templateObject_35 || (templateObject_35 = __makeTemplateObject(["\n    query BookingById($id: ID!) {\n  bookingById(id: $id) {\n    ... on Booking {\n      id\n      updatedAt\n      status\n      startDate\n      endDate\n      service {\n        nameFr\n        nameEn\n      }\n      priceWithOutApplicationFee\n      applicationFeeAmount\n      selectedOptions\n      ownerConfirmationDate\n      operatorConfirmationDate\n      canceled\n      canceledBy\n      underReview\n      operator {\n        id\n        averageScore\n        averageResponseTime\n        partnerId\n        partnerPercentage\n        account {\n          user {\n            firstName\n          }\n        }\n        avatar {\n          storeUrl\n        }\n        location {\n          city\n        }\n        coreServices {\n          price\n          serviceOptionId\n        }\n        extraServices {\n          atHomeExclusivity\n          atHomeExclusivityExtraPrice\n          atHomeContinuously\n          atHomeContinuouslyExtraPrice\n          atHomeOnlyBringPet\n          atHomeOnlyBringPetExtraPrice\n          atHomeComeGetPet\n          atHomeComeGetPetExtraPrice\n          atOwnerHomePlantsCare\n          atOwnerHomePlantsCareExtraPrice\n          atOwnerHomeMail\n          atOwnerHomeMailExtraPrice\n          atOwnerHomeCurtains\n          atOwnerHomeCurtainsExtraPrice\n        }\n      }\n      user {\n        id\n        firstName\n        avatar {\n          storeUrl\n        }\n      }\n      reviews {\n        id\n        score\n        title\n        body\n      }\n      animals {\n        specie {\n          nameFr\n          nameEn\n        }\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    query BookingById($id: ID!) {\n  bookingById(id: $id) {\n    ... on Booking {\n      id\n      updatedAt\n      status\n      startDate\n      endDate\n      service {\n        nameFr\n        nameEn\n      }\n      priceWithOutApplicationFee\n      applicationFeeAmount\n      selectedOptions\n      ownerConfirmationDate\n      operatorConfirmationDate\n      canceled\n      canceledBy\n      underReview\n      operator {\n        id\n        averageScore\n        averageResponseTime\n        partnerId\n        partnerPercentage\n        account {\n          user {\n            firstName\n          }\n        }\n        avatar {\n          storeUrl\n        }\n        location {\n          city\n        }\n        coreServices {\n          price\n          serviceOptionId\n        }\n        extraServices {\n          atHomeExclusivity\n          atHomeExclusivityExtraPrice\n          atHomeContinuously\n          atHomeContinuouslyExtraPrice\n          atHomeOnlyBringPet\n          atHomeOnlyBringPetExtraPrice\n          atHomeComeGetPet\n          atHomeComeGetPetExtraPrice\n          atOwnerHomePlantsCare\n          atOwnerHomePlantsCareExtraPrice\n          atOwnerHomeMail\n          atOwnerHomeMailExtraPrice\n          atOwnerHomeCurtains\n          atOwnerHomeCurtainsExtraPrice\n        }\n      }\n      user {\n        id\n        firstName\n        avatar {\n          storeUrl\n        }\n      }\n      reviews {\n        id\n        score\n        title\n        body\n      }\n      animals {\n        specie {\n          nameFr\n          nameEn\n        }\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", ""])), NotFoundFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc);
/**
 * __useBookingByIdQuery__
 *
 * To run a query within a React component, call `useBookingByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookingByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookingByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useBookingByIdQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(BookingByIdDocument, options);
}
export function useBookingByIdLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(BookingByIdDocument, options);
}
export var CurrentUserOwnerBookingsDocument = gql(templateObject_36 || (templateObject_36 = __makeTemplateObject(["\n    query CurrentUserOwnerBookings($input: CurrentUserBookingFilterInput!) {\n  currentUserOwnerBookings(input: $input) {\n    ... on BookingsList {\n      bookings {\n        id\n        updatedAt\n        status\n        startDate\n        endDate\n        service {\n          nameFr\n          nameEn\n        }\n        priceWithOutApplicationFee\n        applicationFeeAmount\n        selectedOptions\n        messages {\n          ... on UserBookingMessage {\n            userId\n            readAt\n          }\n          ... on OperatorBookingMessage {\n            operatorId\n            readAt\n          }\n        }\n        operator {\n          id\n          account {\n            user {\n              firstName\n            }\n          }\n          partnerId\n          partnerPercentage\n          averageScore\n          avatar {\n            storeUrl\n          }\n          location {\n            city\n          }\n          coreServices {\n            serviceOptionId\n            price\n          }\n          extraServices {\n            atHomeExclusivity\n            atHomeExclusivityExtraPrice\n            atHomeContinuously\n            atHomeContinuouslyExtraPrice\n            atHomeOnlyBringPet\n            atHomeOnlyBringPetExtraPrice\n            atHomeComeGetPet\n            atHomeComeGetPetExtraPrice\n            atOwnerHomePlantsCare\n            atOwnerHomePlantsCareExtraPrice\n            atOwnerHomeMail\n            atOwnerHomeMailExtraPrice\n            atOwnerHomeCurtains\n            atOwnerHomeCurtainsExtraPrice\n          }\n        }\n        animals {\n          specie {\n            nameFr\n            nameEn\n          }\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    query CurrentUserOwnerBookings($input: CurrentUserBookingFilterInput!) {\n  currentUserOwnerBookings(input: $input) {\n    ... on BookingsList {\n      bookings {\n        id\n        updatedAt\n        status\n        startDate\n        endDate\n        service {\n          nameFr\n          nameEn\n        }\n        priceWithOutApplicationFee\n        applicationFeeAmount\n        selectedOptions\n        messages {\n          ... on UserBookingMessage {\n            userId\n            readAt\n          }\n          ... on OperatorBookingMessage {\n            operatorId\n            readAt\n          }\n        }\n        operator {\n          id\n          account {\n            user {\n              firstName\n            }\n          }\n          partnerId\n          partnerPercentage\n          averageScore\n          avatar {\n            storeUrl\n          }\n          location {\n            city\n          }\n          coreServices {\n            serviceOptionId\n            price\n          }\n          extraServices {\n            atHomeExclusivity\n            atHomeExclusivityExtraPrice\n            atHomeContinuously\n            atHomeContinuouslyExtraPrice\n            atHomeOnlyBringPet\n            atHomeOnlyBringPetExtraPrice\n            atHomeComeGetPet\n            atHomeComeGetPetExtraPrice\n            atOwnerHomePlantsCare\n            atOwnerHomePlantsCareExtraPrice\n            atOwnerHomeMail\n            atOwnerHomeMailExtraPrice\n            atOwnerHomeCurtains\n            atOwnerHomeCurtainsExtraPrice\n          }\n        }\n        animals {\n          specie {\n            nameFr\n            nameEn\n          }\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", ""])), UnableToProcessFieldsFragmentDoc, UserAuthFieldsFragmentDoc);
/**
 * __useCurrentUserOwnerBookingsQuery__
 *
 * To run a query within a React component, call `useCurrentUserOwnerBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserOwnerBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserOwnerBookingsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCurrentUserOwnerBookingsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(CurrentUserOwnerBookingsDocument, options);
}
export function useCurrentUserOwnerBookingsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(CurrentUserOwnerBookingsDocument, options);
}
export var CurrentUserOperatorBookingsDocument = gql(templateObject_37 || (templateObject_37 = __makeTemplateObject(["\n    query CurrentUserOperatorBookings($input: CurrentUserBookingFilterInput!) {\n  currentUserOperatorBookings(input: $input) {\n    ... on BookingsList {\n      bookings {\n        id\n        updatedAt\n        status\n        startDate\n        endDate\n        service {\n          nameFr\n          nameEn\n        }\n        priceWithOutApplicationFee\n        applicationFeeAmount\n        selectedOptions\n        messages {\n          ... on UserBookingMessage {\n            userId\n            readAt\n          }\n          ... on OperatorBookingMessage {\n            operatorId\n            readAt\n          }\n        }\n        user {\n          id\n          firstName\n          avatar {\n            storeUrl\n          }\n        }\n        operator {\n          id\n          partnerId\n          partnerPercentage\n          coreServices {\n            price\n            serviceOptionId\n          }\n          extraServices {\n            atHomeExclusivity\n            atHomeExclusivityExtraPrice\n            atHomeContinuously\n            atHomeContinuouslyExtraPrice\n            atHomeOnlyBringPet\n            atHomeOnlyBringPetExtraPrice\n            atHomeComeGetPet\n            atHomeComeGetPetExtraPrice\n            atOwnerHomePlantsCare\n            atOwnerHomePlantsCareExtraPrice\n            atOwnerHomeMail\n            atOwnerHomeMailExtraPrice\n            atOwnerHomeCurtains\n            atOwnerHomeCurtainsExtraPrice\n          }\n        }\n        animals {\n          specie {\n            nameFr\n            nameEn\n          }\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    query CurrentUserOperatorBookings($input: CurrentUserBookingFilterInput!) {\n  currentUserOperatorBookings(input: $input) {\n    ... on BookingsList {\n      bookings {\n        id\n        updatedAt\n        status\n        startDate\n        endDate\n        service {\n          nameFr\n          nameEn\n        }\n        priceWithOutApplicationFee\n        applicationFeeAmount\n        selectedOptions\n        messages {\n          ... on UserBookingMessage {\n            userId\n            readAt\n          }\n          ... on OperatorBookingMessage {\n            operatorId\n            readAt\n          }\n        }\n        user {\n          id\n          firstName\n          avatar {\n            storeUrl\n          }\n        }\n        operator {\n          id\n          partnerId\n          partnerPercentage\n          coreServices {\n            price\n            serviceOptionId\n          }\n          extraServices {\n            atHomeExclusivity\n            atHomeExclusivityExtraPrice\n            atHomeContinuously\n            atHomeContinuouslyExtraPrice\n            atHomeOnlyBringPet\n            atHomeOnlyBringPetExtraPrice\n            atHomeComeGetPet\n            atHomeComeGetPetExtraPrice\n            atOwnerHomePlantsCare\n            atOwnerHomePlantsCareExtraPrice\n            atOwnerHomeMail\n            atOwnerHomeMailExtraPrice\n            atOwnerHomeCurtains\n            atOwnerHomeCurtainsExtraPrice\n          }\n        }\n        animals {\n          specie {\n            nameFr\n            nameEn\n          }\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), UnableToProcessFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useCurrentUserOperatorBookingsQuery__
 *
 * To run a query within a React component, call `useCurrentUserOperatorBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserOperatorBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserOperatorBookingsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCurrentUserOperatorBookingsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(CurrentUserOperatorBookingsDocument, options);
}
export function useCurrentUserOperatorBookingsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(CurrentUserOperatorBookingsDocument, options);
}
export var BookingsDocument = gql(templateObject_38 || (templateObject_38 = __makeTemplateObject(["\n    query Bookings {\n  bookings {\n    ... on BookingsList {\n      bookings {\n        id\n        updatedAt\n        status\n        priceWithOutApplicationFee\n        applicationFeeAmount\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    query Bookings {\n  bookings {\n    ... on BookingsList {\n      bookings {\n        id\n        updatedAt\n        status\n        priceWithOutApplicationFee\n        applicationFeeAmount\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), UnableToProcessFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useBookingsQuery__
 *
 * To run a query within a React component, call `useBookingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useBookingsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(BookingsDocument, options);
}
export function useBookingsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(BookingsDocument, options);
}
export var BookingsWithPaymentStatusDocument = gql(templateObject_39 || (templateObject_39 = __makeTemplateObject(["\n    query BookingsWithPaymentStatus($input: BookingWithPaymentStatusInput!) {\n  bookingsWithPaymentStatus(input: $input) {\n    ... on BookingsList {\n      bookings {\n        id\n        updatedAt\n        priceWithOutApplicationFee\n        applicationFeeAmount\n        underReview\n        payment {\n          status\n          expectedPaymentIntentCaptureDate\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    query BookingsWithPaymentStatus($input: BookingWithPaymentStatusInput!) {\n  bookingsWithPaymentStatus(input: $input) {\n    ... on BookingsList {\n      bookings {\n        id\n        updatedAt\n        priceWithOutApplicationFee\n        applicationFeeAmount\n        underReview\n        payment {\n          status\n          expectedPaymentIntentCaptureDate\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), UnableToProcessFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useBookingsWithPaymentStatusQuery__
 *
 * To run a query within a React component, call `useBookingsWithPaymentStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useBookingsWithPaymentStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBookingsWithPaymentStatusQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useBookingsWithPaymentStatusQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(BookingsWithPaymentStatusDocument, options);
}
export function useBookingsWithPaymentStatusLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(BookingsWithPaymentStatusDocument, options);
}
export var SubscribeToBookingMessagesDocument = gql(templateObject_40 || (templateObject_40 = __makeTemplateObject(["\n    subscription SubscribeToBookingMessages($bookingId: ID!) {\n  bookingByIdChatSub(bookingId: $bookingId) {\n    ... on UserBookingMessage {\n      id\n      userId\n      readAt\n      content\n    }\n    ... on OperatorBookingMessage {\n      id\n      operatorId\n      readAt\n      content\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    subscription SubscribeToBookingMessages($bookingId: ID!) {\n  bookingByIdChatSub(bookingId: $bookingId) {\n    ... on UserBookingMessage {\n      id\n      userId\n      readAt\n      content\n    }\n    ... on OperatorBookingMessage {\n      id\n      operatorId\n      readAt\n      content\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", ""])), UserForbiddenFieldsFragmentDoc, UserAuthFieldsFragmentDoc);
/**
 * __useSubscribeToBookingMessagesSubscription__
 *
 * To run a query within a React component, call `useSubscribeToBookingMessagesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToBookingMessagesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToBookingMessagesSubscription({
 *   variables: {
 *      bookingId: // value for 'bookingId'
 *   },
 * });
 */
export function useSubscribeToBookingMessagesSubscription(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useSubscription(SubscribeToBookingMessagesDocument, options);
}
export var SubscribeToUserBookingsMessagesChangesDocument = gql(templateObject_41 || (templateObject_41 = __makeTemplateObject(["\n    subscription SubscribeToUserBookingsMessagesChanges($bookingsIds: [ID!], $authorId: ID) {\n  userBookingsMessagesChangesSub(bookingIds: $bookingsIds, authorId: $authorId) {\n    ... on UserBookingMessage {\n      id\n      bookingId\n      userId\n      readAt\n      content\n      user {\n        firstName\n        avatar {\n          storeUrl\n        }\n      }\n    }\n    ... on OperatorBookingMessage {\n      id\n      bookingId\n      operatorId\n      readAt\n      content\n      operator {\n        avatar {\n          storeUrl\n        }\n        account {\n          user {\n            firstName\n            lastName\n          }\n        }\n      }\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    subscription SubscribeToUserBookingsMessagesChanges($bookingsIds: [ID!], $authorId: ID) {\n  userBookingsMessagesChangesSub(bookingIds: $bookingsIds, authorId: $authorId) {\n    ... on UserBookingMessage {\n      id\n      bookingId\n      userId\n      readAt\n      content\n      user {\n        firstName\n        avatar {\n          storeUrl\n        }\n      }\n    }\n    ... on OperatorBookingMessage {\n      id\n      bookingId\n      operatorId\n      readAt\n      content\n      operator {\n        avatar {\n          storeUrl\n        }\n        account {\n          user {\n            firstName\n            lastName\n          }\n        }\n      }\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", ""])), UserForbiddenFieldsFragmentDoc, UserAuthFieldsFragmentDoc);
/**
 * __useSubscribeToUserBookingsMessagesChangesSubscription__
 *
 * To run a query within a React component, call `useSubscribeToUserBookingsMessagesChangesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToUserBookingsMessagesChangesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToUserBookingsMessagesChangesSubscription({
 *   variables: {
 *      bookingsIds: // value for 'bookingsIds'
 *      authorId: // value for 'authorId'
 *   },
 * });
 */
export function useSubscribeToUserBookingsMessagesChangesSubscription(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useSubscription(SubscribeToUserBookingsMessagesChangesDocument, options);
}
export var SubscribeToUserBookingsStatusChangesDocument = gql(templateObject_42 || (templateObject_42 = __makeTemplateObject(["\n    subscription SubscribeToUserBookingsStatusChanges($bookingsIds: [ID!]) {\n  userBookingsStatusChangesSub(bookingIds: $bookingsIds) {\n    ... on Booking {\n      id\n      status\n      startDate\n      endDate\n      user {\n        id\n        firstName\n        lastName\n      }\n      operator {\n        id\n        account {\n          user {\n            firstName\n            lastName\n          }\n        }\n        avatar {\n          storeUrl\n        }\n      }\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    subscription SubscribeToUserBookingsStatusChanges($bookingsIds: [ID!]) {\n  userBookingsStatusChangesSub(bookingIds: $bookingsIds) {\n    ... on Booking {\n      id\n      status\n      startDate\n      endDate\n      user {\n        id\n        firstName\n        lastName\n      }\n      operator {\n        id\n        account {\n          user {\n            firstName\n            lastName\n          }\n        }\n        avatar {\n          storeUrl\n        }\n      }\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", ""])), UserForbiddenFieldsFragmentDoc, UserAuthFieldsFragmentDoc);
/**
 * __useSubscribeToUserBookingsStatusChangesSubscription__
 *
 * To run a query within a React component, call `useSubscribeToUserBookingsStatusChangesSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToUserBookingsStatusChangesSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToUserBookingsStatusChangesSubscription({
 *   variables: {
 *      bookingsIds: // value for 'bookingsIds'
 *   },
 * });
 */
export function useSubscribeToUserBookingsStatusChangesSubscription(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useSubscription(SubscribeToUserBookingsStatusChangesDocument, options);
}
export var SubscribeToNewlyCreatedBookingsAsSitterDocument = gql(templateObject_43 || (templateObject_43 = __makeTemplateObject(["\n    subscription SubscribeToNewlyCreatedBookingsAsSitter($sitterId: ID) {\n  newlyCreatedBookingsAsSitterSub(sitterId: $sitterId) {\n    ... on Booking {\n      id\n      startDate\n      endDate\n      priceWithOutApplicationFee\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    subscription SubscribeToNewlyCreatedBookingsAsSitter($sitterId: ID) {\n  newlyCreatedBookingsAsSitterSub(sitterId: $sitterId) {\n    ... on Booking {\n      id\n      startDate\n      endDate\n      priceWithOutApplicationFee\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", ""])), UserForbiddenFieldsFragmentDoc, UserAuthFieldsFragmentDoc);
/**
 * __useSubscribeToNewlyCreatedBookingsAsSitterSubscription__
 *
 * To run a query within a React component, call `useSubscribeToNewlyCreatedBookingsAsSitterSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToNewlyCreatedBookingsAsSitterSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToNewlyCreatedBookingsAsSitterSubscription({
 *   variables: {
 *      sitterId: // value for 'sitterId'
 *   },
 * });
 */
export function useSubscribeToNewlyCreatedBookingsAsSitterSubscription(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useSubscription(SubscribeToNewlyCreatedBookingsAsSitterDocument, options);
}
export var CreateBookingClaimDocument = gql(templateObject_44 || (templateObject_44 = __makeTemplateObject(["\n    mutation CreateBookingClaim($input: CreateBookingClaimInput!) {\n  createBookingClaim(input: $input) {\n    ... on Claim {\n      id\n      reason\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation CreateBookingClaim($input: CreateBookingClaimInput!) {\n  createBookingClaim(input: $input) {\n    ... on Claim {\n      id\n      reason\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), UnableToProcessFieldsFragmentDoc, UserAuthFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc);
/**
 * __useCreateBookingClaimMutation__
 *
 * To run a mutation, you first call `useCreateBookingClaimMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBookingClaimMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBookingClaimMutation, { data, loading, error }] = useCreateBookingClaimMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBookingClaimMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateBookingClaimDocument, options);
}
export var GetBookingClaimsDocument = gql(templateObject_45 || (templateObject_45 = __makeTemplateObject(["\n    query GetBookingClaims {\n  claims {\n    ... on ClaimsList {\n      claims {\n        id\n        reason\n        user {\n          firstName\n          lastName\n          account {\n            email\n          }\n          avatar {\n            storeUrl\n          }\n        }\n        operator {\n          averageScore\n          location {\n            address\n            city\n          }\n          avatar {\n            storeUrl\n          }\n          account {\n            email\n            user {\n              firstName\n              lastName\n            }\n          }\n        }\n        booking {\n          id\n          startDate\n          endDate\n          animalsIds\n          priceWithOutApplicationFee\n          applicationFeeAmount\n          service {\n            nameFr\n            nameEn\n          }\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    query GetBookingClaims {\n  claims {\n    ... on ClaimsList {\n      claims {\n        id\n        reason\n        user {\n          firstName\n          lastName\n          account {\n            email\n          }\n          avatar {\n            storeUrl\n          }\n        }\n        operator {\n          averageScore\n          location {\n            address\n            city\n          }\n          avatar {\n            storeUrl\n          }\n          account {\n            email\n            user {\n              firstName\n              lastName\n            }\n          }\n        }\n        booking {\n          id\n          startDate\n          endDate\n          animalsIds\n          priceWithOutApplicationFee\n          applicationFeeAmount\n          service {\n            nameFr\n            nameEn\n          }\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), UnableToProcessFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useGetBookingClaimsQuery__
 *
 * To run a query within a React component, call `useGetBookingClaimsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingClaimsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingClaimsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBookingClaimsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(GetBookingClaimsDocument, options);
}
export function useGetBookingClaimsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(GetBookingClaimsDocument, options);
}
export var GetBookingClaimByIdDocument = gql(templateObject_46 || (templateObject_46 = __makeTemplateObject(["\n    query GetBookingClaimById($id: ID!) {\n  claimById(id: $id) {\n    ... on Claim {\n      id\n      reason\n      user {\n        firstName\n        lastName\n        account {\n          email\n        }\n        avatar {\n          storeUrl\n        }\n      }\n      operator {\n        averageScore\n        location {\n          address\n          city\n        }\n        avatar {\n          storeUrl\n        }\n        account {\n          email\n          user {\n            firstName\n            lastName\n          }\n        }\n      }\n      booking {\n        id\n        startDate\n        endDate\n        animalsIds\n        priceWithOutApplicationFee\n        applicationFeeAmount\n        service {\n          nameFr\n          nameEn\n        }\n        messages {\n          id\n          content\n          readAt\n          ... on UserBookingMessage {\n            userId\n          }\n          ... on OperatorBookingMessage {\n            operatorId\n          }\n        }\n      }\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    query GetBookingClaimById($id: ID!) {\n  claimById(id: $id) {\n    ... on Claim {\n      id\n      reason\n      user {\n        firstName\n        lastName\n        account {\n          email\n        }\n        avatar {\n          storeUrl\n        }\n      }\n      operator {\n        averageScore\n        location {\n          address\n          city\n        }\n        avatar {\n          storeUrl\n        }\n        account {\n          email\n          user {\n            firstName\n            lastName\n          }\n        }\n      }\n      booking {\n        id\n        startDate\n        endDate\n        animalsIds\n        priceWithOutApplicationFee\n        applicationFeeAmount\n        service {\n          nameFr\n          nameEn\n        }\n        messages {\n          id\n          content\n          readAt\n          ... on UserBookingMessage {\n            userId\n          }\n          ... on OperatorBookingMessage {\n            operatorId\n          }\n        }\n      }\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useGetBookingClaimByIdQuery__
 *
 * To run a query within a React component, call `useGetBookingClaimByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBookingClaimByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBookingClaimByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBookingClaimByIdQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(GetBookingClaimByIdDocument, options);
}
export function useGetBookingClaimByIdLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(GetBookingClaimByIdDocument, options);
}
export var CurrentOperatorDonationsDocument = gql(templateObject_47 || (templateObject_47 = __makeTemplateObject(["\n    query CurrentOperatorDonations {\n  currentOperatorDonations {\n    ... on DonationsList {\n      donations {\n        id\n        amountToDonate\n        donationDate\n        partnerId\n        booking {\n          status\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    query CurrentOperatorDonations {\n  currentOperatorDonations {\n    ... on DonationsList {\n      donations {\n        id\n        amountToDonate\n        donationDate\n        partnerId\n        booking {\n          status\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), UnableToProcessFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useCurrentOperatorDonationsQuery__
 *
 * To run a query within a React component, call `useCurrentOperatorDonationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentOperatorDonationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentOperatorDonationsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentOperatorDonationsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(CurrentOperatorDonationsDocument, options);
}
export function useCurrentOperatorDonationsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(CurrentOperatorDonationsDocument, options);
}
export var SearchDonationsDocument = gql(templateObject_48 || (templateObject_48 = __makeTemplateObject(["\n    query SearchDonations($input: SearchDonationsInput!) {\n  searchDonations(input: $input) {\n    ... on DonationsList {\n      donations {\n        id\n        amountToDonate\n        donationDate\n        partnerId\n        createdAt\n        updatedAt\n        booking {\n          status\n        }\n        partner {\n          name\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    query SearchDonations($input: SearchDonationsInput!) {\n  searchDonations(input: $input) {\n    ... on DonationsList {\n      donations {\n        id\n        amountToDonate\n        donationDate\n        partnerId\n        createdAt\n        updatedAt\n        booking {\n          status\n        }\n        partner {\n          name\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", ""])), UnableToProcessFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc);
/**
 * __useSearchDonationsQuery__
 *
 * To run a query within a React component, call `useSearchDonationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchDonationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchDonationsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchDonationsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(SearchDonationsDocument, options);
}
export function useSearchDonationsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(SearchDonationsDocument, options);
}
export var CreateDonationReceiptDocument = gql(templateObject_49 || (templateObject_49 = __makeTemplateObject(["\n    mutation CreateDonationReceipt($input: CreateDonationReceiptInput!) {\n  createDonationReceipt(input: $input) {\n    ... on DonationReceipt {\n      id\n      amountDonated\n      createdAt\n      updatedAt\n      donations {\n        id\n      }\n      files {\n        storeUrl\n      }\n      partner {\n        name\n        medias {\n          storeUrl\n        }\n      }\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""], ["\n    mutation CreateDonationReceipt($input: CreateDonationReceiptInput!) {\n  createDonationReceipt(input: $input) {\n    ... on DonationReceipt {\n      id\n      amountDonated\n      createdAt\n      updatedAt\n      donations {\n        id\n      }\n      files {\n        storeUrl\n      }\n      partner {\n        name\n        medias {\n          storeUrl\n        }\n      }\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useCreateDonationReceiptMutation__
 *
 * To run a mutation, you first call `useCreateDonationReceiptMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDonationReceiptMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDonationReceiptMutation, { data, loading, error }] = useCreateDonationReceiptMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDonationReceiptMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateDonationReceiptDocument, options);
}
export var SearchDonationReceiptsDocument = gql(templateObject_50 || (templateObject_50 = __makeTemplateObject(["\n    query SearchDonationReceipts($input: SearchDonationReceiptsInput!) {\n  searchDonationReceipts(input: $input) {\n    ... on DonationReceiptsList {\n      donationReceipts {\n        id\n        amountDonated\n        createdAt\n        updatedAt\n        files {\n          storeUrl\n        }\n        partner {\n          name\n          medias {\n            storeUrl\n          }\n        }\n        donations {\n          id\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    query SearchDonationReceipts($input: SearchDonationReceiptsInput!) {\n  searchDonationReceipts(input: $input) {\n    ... on DonationReceiptsList {\n      donationReceipts {\n        id\n        amountDonated\n        createdAt\n        updatedAt\n        files {\n          storeUrl\n        }\n        partner {\n          name\n          medias {\n            storeUrl\n          }\n        }\n        donations {\n          id\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", ""])), UnableToProcessFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc);
/**
 * __useSearchDonationReceiptsQuery__
 *
 * To run a query within a React component, call `useSearchDonationReceiptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchDonationReceiptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchDonationReceiptsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchDonationReceiptsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(SearchDonationReceiptsDocument, options);
}
export function useSearchDonationReceiptsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(SearchDonationReceiptsDocument, options);
}
export var CreateGenderOptionDocument = gql(templateObject_51 || (templateObject_51 = __makeTemplateObject(["\n    mutation CreateGenderOption($input: CreateGenderOptionInput!) {\n  createGenderOption(input: $input) {\n    ... on GenderOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation CreateGenderOption($input: CreateGenderOptionInput!) {\n  createGenderOption(input: $input) {\n    ... on GenderOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useCreateGenderOptionMutation__
 *
 * To run a mutation, you first call `useCreateGenderOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGenderOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGenderOptionMutation, { data, loading, error }] = useCreateGenderOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateGenderOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateGenderOptionDocument, options);
}
export var UpdateGenderOptionDocument = gql(templateObject_52 || (templateObject_52 = __makeTemplateObject(["\n    mutation UpdateGenderOption($id: ID!, $input: UpdateGenderOptionInput!) {\n  updateGenderOption(id: $id, input: $input) {\n    ... on GenderOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation UpdateGenderOption($id: ID!, $input: UpdateGenderOptionInput!) {\n  updateGenderOption(id: $id, input: $input) {\n    ... on GenderOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useUpdateGenderOptionMutation__
 *
 * To run a mutation, you first call `useUpdateGenderOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateGenderOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateGenderOptionMutation, { data, loading, error }] = useUpdateGenderOptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateGenderOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(UpdateGenderOptionDocument, options);
}
export var DeleteGenderOptionDocument = gql(templateObject_53 || (templateObject_53 = __makeTemplateObject(["\n    mutation DeleteGenderOption($id: ID!) {\n  deleteGenderOption(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation DeleteGenderOption($id: ID!) {\n  deleteGenderOption(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useDeleteGenderOptionMutation__
 *
 * To run a mutation, you first call `useDeleteGenderOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteGenderOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteGenderOptionMutation, { data, loading, error }] = useDeleteGenderOptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteGenderOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(DeleteGenderOptionDocument, options);
}
export var GetGendersOptionsDocument = gql(templateObject_54 || (templateObject_54 = __makeTemplateObject(["\n    query GetGendersOptions {\n  gendersOptions {\n    ... on GenderOptionsList {\n      genderOptions {\n        id\n        nameFr\n        nameEn\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""], ["\n    query GetGendersOptions {\n  gendersOptions {\n    ... on GenderOptionsList {\n      genderOptions {\n        id\n        nameFr\n        nameEn\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""])), UnableToProcessFieldsFragmentDoc);
/**
 * __useGetGendersOptionsQuery__
 *
 * To run a query within a React component, call `useGetGendersOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGendersOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGendersOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGendersOptionsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(GetGendersOptionsDocument, options);
}
export function useGetGendersOptionsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(GetGendersOptionsDocument, options);
}
export var CreateHostingOptionDocument = gql(templateObject_55 || (templateObject_55 = __makeTemplateObject(["\n    mutation CreateHostingOption($input: CreateHostingOptionInput!) {\n  createHostingOption(input: $input) {\n    ... on HostingOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation CreateHostingOption($input: CreateHostingOptionInput!) {\n  createHostingOption(input: $input) {\n    ... on HostingOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useCreateHostingOptionMutation__
 *
 * To run a mutation, you first call `useCreateHostingOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHostingOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHostingOptionMutation, { data, loading, error }] = useCreateHostingOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateHostingOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateHostingOptionDocument, options);
}
export var UpdateHostingOptionDocument = gql(templateObject_56 || (templateObject_56 = __makeTemplateObject(["\n    mutation UpdateHostingOption($id: ID!, $input: UpdateHostingOptionInput!) {\n  updateHostingOption(id: $id, input: $input) {\n    ... on HostingOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation UpdateHostingOption($id: ID!, $input: UpdateHostingOptionInput!) {\n  updateHostingOption(id: $id, input: $input) {\n    ... on HostingOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useUpdateHostingOptionMutation__
 *
 * To run a mutation, you first call `useUpdateHostingOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHostingOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHostingOptionMutation, { data, loading, error }] = useUpdateHostingOptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateHostingOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(UpdateHostingOptionDocument, options);
}
export var DeleteHostingOptionDocument = gql(templateObject_57 || (templateObject_57 = __makeTemplateObject(["\n    mutation DeleteHostingOption($id: ID!) {\n  deleteHostingOption(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation DeleteHostingOption($id: ID!) {\n  deleteHostingOption(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useDeleteHostingOptionMutation__
 *
 * To run a mutation, you first call `useDeleteHostingOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHostingOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHostingOptionMutation, { data, loading, error }] = useDeleteHostingOptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteHostingOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(DeleteHostingOptionDocument, options);
}
export var GetHostingsOptionsDocument = gql(templateObject_58 || (templateObject_58 = __makeTemplateObject(["\n    query GetHostingsOptions {\n  hostingsOptions {\n    ... on HostingOptionsList {\n      hostingOptions {\n        id\n        nameFr\n        nameEn\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""], ["\n    query GetHostingsOptions {\n  hostingsOptions {\n    ... on HostingOptionsList {\n      hostingOptions {\n        id\n        nameFr\n        nameEn\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""])), UnableToProcessFieldsFragmentDoc);
/**
 * __useGetHostingsOptionsQuery__
 *
 * To run a query within a React component, call `useGetHostingsOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHostingsOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHostingsOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHostingsOptionsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(GetHostingsOptionsDocument, options);
}
export function useGetHostingsOptionsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(GetHostingsOptionsDocument, options);
}
export var CreateLanguageOptionDocument = gql(templateObject_59 || (templateObject_59 = __makeTemplateObject(["\n    mutation CreateLanguageOption($input: CreateLanguageOptionInput!) {\n  createLanguageOption(input: $input) {\n    ... on LanguageOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation CreateLanguageOption($input: CreateLanguageOptionInput!) {\n  createLanguageOption(input: $input) {\n    ... on LanguageOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useCreateLanguageOptionMutation__
 *
 * To run a mutation, you first call `useCreateLanguageOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLanguageOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLanguageOptionMutation, { data, loading, error }] = useCreateLanguageOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLanguageOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateLanguageOptionDocument, options);
}
export var UpdateLanguageOptionDocument = gql(templateObject_60 || (templateObject_60 = __makeTemplateObject(["\n    mutation UpdateLanguageOption($id: ID!, $input: UpdateLanguageOptionInput!) {\n  updateLanguageOption(id: $id, input: $input) {\n    ... on LanguageOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation UpdateLanguageOption($id: ID!, $input: UpdateLanguageOptionInput!) {\n  updateLanguageOption(id: $id, input: $input) {\n    ... on LanguageOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useUpdateLanguageOptionMutation__
 *
 * To run a mutation, you first call `useUpdateLanguageOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateLanguageOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateLanguageOptionMutation, { data, loading, error }] = useUpdateLanguageOptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateLanguageOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(UpdateLanguageOptionDocument, options);
}
export var DeleteLanguageOptionDocument = gql(templateObject_61 || (templateObject_61 = __makeTemplateObject(["\n    mutation DeleteLanguageOption($id: ID!) {\n  deleteLanguageOption(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation DeleteLanguageOption($id: ID!) {\n  deleteLanguageOption(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useDeleteLanguageOptionMutation__
 *
 * To run a mutation, you first call `useDeleteLanguageOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLanguageOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLanguageOptionMutation, { data, loading, error }] = useDeleteLanguageOptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteLanguageOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(DeleteLanguageOptionDocument, options);
}
export var GetLanguagesOptionsDocument = gql(templateObject_62 || (templateObject_62 = __makeTemplateObject(["\n    query GetLanguagesOptions {\n  languagesOptions {\n    ... on LanguageOptionsList {\n      languageOptions {\n        id\n        nameFr\n        nameEn\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""], ["\n    query GetLanguagesOptions {\n  languagesOptions {\n    ... on LanguageOptionsList {\n      languageOptions {\n        id\n        nameFr\n        nameEn\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""])), UnableToProcessFieldsFragmentDoc);
/**
 * __useGetLanguagesOptionsQuery__
 *
 * To run a query within a React component, call `useGetLanguagesOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLanguagesOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLanguagesOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLanguagesOptionsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(GetLanguagesOptionsDocument, options);
}
export function useGetLanguagesOptionsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(GetLanguagesOptionsDocument, options);
}
export var LocationSearchDocument = gql(templateObject_63 || (templateObject_63 = __makeTemplateObject(["\n    query LocationSearch($query: String!, $locale: String!) {\n  locationSearch(query: $query, locale: $locale) {\n    ... on LocationsList {\n      locations {\n        id\n        formattedLocationString\n        locale_names\n        postcode\n        city\n        country\n        country_code\n        latitude\n        longitude\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    query LocationSearch($query: String!, $locale: String!) {\n  locationSearch(query: $query, locale: $locale) {\n    ... on LocationsList {\n      locations {\n        id\n        formattedLocationString\n        locale_names\n        postcode\n        city\n        country\n        country_code\n        latitude\n        longitude\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n  }\n}\n    ", "\n", ""])), UnableToProcessFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc);
/**
 * __useLocationSearchQuery__
 *
 * To run a query within a React component, call `useLocationSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useLocationSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLocationSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *      locale: // value for 'locale'
 *   },
 * });
 */
export function useLocationSearchQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(LocationSearchDocument, options);
}
export function useLocationSearchLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(LocationSearchDocument, options);
}
export var CreateMediaDocument = gql(templateObject_64 || (templateObject_64 = __makeTemplateObject(["\n    mutation CreateMedia($input: CreateMediaInput!) {\n  createMedia(input: $input) {\n    ... on StorageInfos {\n      signedRequest\n      url\n      mediaId\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation CreateMedia($input: CreateMediaInput!) {\n  createMedia(input: $input) {\n    ... on StorageInfos {\n      signedRequest\n      url\n      mediaId\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc, UserAuthFieldsFragmentDoc);
/**
 * __useCreateMediaMutation__
 *
 * To run a mutation, you first call `useCreateMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMediaMutation, { data, loading, error }] = useCreateMediaMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMediaMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateMediaDocument, options);
}
export var SetMediaAsAvatarDocument = gql(templateObject_65 || (templateObject_65 = __makeTemplateObject(["\n    mutation SetMediaAsAvatar($id: ID!) {\n  setMediaAsAvatar(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", "\n", ""], ["\n    mutation SetMediaAsAvatar($id: ID!) {\n  setMediaAsAvatar(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useSetMediaAsAvatarMutation__
 *
 * To run a mutation, you first call `useSetMediaAsAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetMediaAsAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setMediaAsAvatarMutation, { data, loading, error }] = useSetMediaAsAvatarMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetMediaAsAvatarMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(SetMediaAsAvatarDocument, options);
}
export var DeleteMediaDocument = gql(templateObject_66 || (templateObject_66 = __makeTemplateObject(["\n    mutation DeleteMedia($id: ID!) {\n  deleteMedia(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on IsActiveOperatorWithNoReplacementMediaError {\n      activeOperatorWithNoReplacementMediaError\n    }\n    ... on IsActiveOperatorMainMediaError {\n      activeOperatorMainMediaError\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""], ["\n    mutation DeleteMedia($id: ID!) {\n  deleteMedia(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on IsActiveOperatorWithNoReplacementMediaError {\n      activeOperatorWithNoReplacementMediaError\n    }\n    ... on IsActiveOperatorMainMediaError {\n      activeOperatorMainMediaError\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc, UserAuthFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useDeleteMediaMutation__
 *
 * To run a mutation, you first call `useDeleteMediaMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMediaMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMediaMutation, { data, loading, error }] = useDeleteMediaMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMediaMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(DeleteMediaDocument, options);
}
export var CreateMessageDocument = gql(templateObject_67 || (templateObject_67 = __makeTemplateObject(["\n    mutation CreateMessage($input: CreateMessageInput!) {\n  createMessage(input: $input) {\n    ... on UserBookingMessage {\n      ...MessageFields\n    }\n    ... on OperatorBookingMessage {\n      ...MessageFields\n    }\n    ... on StaffBookingMessage {\n      ...MessageFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""], ["\n    mutation CreateMessage($input: CreateMessageInput!) {\n  createMessage(input: $input) {\n    ... on UserBookingMessage {\n      ...MessageFields\n    }\n    ... on OperatorBookingMessage {\n      ...MessageFields\n    }\n    ... on StaffBookingMessage {\n      ...MessageFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), MessageFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useCreateMessageMutation__
 *
 * To run a mutation, you first call `useCreateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createMessageMutation, { data, loading, error }] = useCreateMessageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateMessageMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateMessageDocument, options);
}
export var UpdateMessageDocument = gql(templateObject_68 || (templateObject_68 = __makeTemplateObject(["\n    mutation UpdateMessage($id: ID!, $input: UpdateMessageInput!) {\n  updateMessage(id: $id, input: $input) {\n    ... on UserBookingMessage {\n      ...MessageFields\n    }\n    ... on OperatorBookingMessage {\n      ...MessageFields\n    }\n    ... on StaffBookingMessage {\n      ...MessageFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", "\n", ""], ["\n    mutation UpdateMessage($id: ID!, $input: UpdateMessageInput!) {\n  updateMessage(id: $id, input: $input) {\n    ... on UserBookingMessage {\n      ...MessageFields\n    }\n    ... on OperatorBookingMessage {\n      ...MessageFields\n    }\n    ... on StaffBookingMessage {\n      ...MessageFields\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", "\n", ""])), MessageFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useUpdateMessageMutation__
 *
 * To run a mutation, you first call `useUpdateMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMessageMutation, { data, loading, error }] = useUpdateMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMessageMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(UpdateMessageDocument, options);
}
export var SetAsReadDocument = gql(templateObject_69 || (templateObject_69 = __makeTemplateObject(["\n    mutation SetAsRead($input: SetMessagesAsReadInput!) {\n  setAsRead(input: $input) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation SetAsRead($input: SetMessagesAsReadInput!) {\n  setAsRead(input: $input) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UserAuthFieldsFragmentDoc);
/**
 * __useSetAsReadMutation__
 *
 * To run a mutation, you first call `useSetAsReadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetAsReadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setAsReadMutation, { data, loading, error }] = useSetAsReadMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSetAsReadMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(SetAsReadDocument, options);
}
export var MessagesByBookingIdDocument = gql(templateObject_70 || (templateObject_70 = __makeTemplateObject(["\n    query MessagesByBookingId($id: ID!) {\n  messagesByBookingId(id: $id) {\n    ... on MessagesList {\n      messages {\n        ...MessageFields\n        content\n      }\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", "\n", ""], ["\n    query MessagesByBookingId($id: ID!) {\n  messagesByBookingId(id: $id) {\n    ... on MessagesList {\n      messages {\n        ...MessageFields\n        content\n      }\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", "\n", ""])), MessageFieldsFragmentDoc, InvalidArgumentsFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useMessagesByBookingIdQuery__
 *
 * To run a query within a React component, call `useMessagesByBookingIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesByBookingIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesByBookingIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMessagesByBookingIdQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(MessagesByBookingIdDocument, options);
}
export function useMessagesByBookingIdLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(MessagesByBookingIdDocument, options);
}
export var CreateIndividualOperatorDocument = gql(templateObject_71 || (templateObject_71 = __makeTemplateObject(["\n    mutation CreateIndividualOperator($input: CreateIndividualOperatorInput!) {\n  createIndividualOperator(input: $input) {\n    ... on IndividualOperator {\n      id\n      description\n      birthDate\n      genderOptionId\n      hostingOptionId\n      languageOptionIds\n      acceptedSpecieOptionsIds\n      ownAnimalsSpecieOptionsIds\n      partnerId\n      partnerPercentage\n      avatar {\n        storeUrl\n      }\n      account {\n        user {\n          firstName\n          lastName\n        }\n      }\n      location {\n        address\n        city\n        country\n        country_code\n        postcode\n        latitude\n        longitude\n      }\n      availabilities {\n        id\n        date\n      }\n      coreServices {\n        serviceOptionId\n        price\n      }\n      extraServices {\n        atHomeExclusivity\n        atHomeExclusivityExtraPrice\n        atHomeContinuously\n        atHomeContinuouslyExtraPrice\n        atHomeOnlyBringPet\n        atHomeOnlyBringPetExtraPrice\n        atHomeComeGetPet\n        atHomeComeGetPetExtraPrice\n        atOwnerHomePlantsCare\n        atOwnerHomePlantsCareExtraPrice\n        atOwnerHomeMail\n        atOwnerHomeMailExtraPrice\n        atOwnerHomeCurtains\n        atOwnerHomeCurtainsExtraPrice\n        acceptShortNotice\n        flexibleCancelation\n        isProfessionalOperator\n        abilityToProvideMedicalCare\n      }\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation CreateIndividualOperator($input: CreateIndividualOperatorInput!) {\n  createIndividualOperator(input: $input) {\n    ... on IndividualOperator {\n      id\n      description\n      birthDate\n      genderOptionId\n      hostingOptionId\n      languageOptionIds\n      acceptedSpecieOptionsIds\n      ownAnimalsSpecieOptionsIds\n      partnerId\n      partnerPercentage\n      avatar {\n        storeUrl\n      }\n      account {\n        user {\n          firstName\n          lastName\n        }\n      }\n      location {\n        address\n        city\n        country\n        country_code\n        postcode\n        latitude\n        longitude\n      }\n      availabilities {\n        id\n        date\n      }\n      coreServices {\n        serviceOptionId\n        price\n      }\n      extraServices {\n        atHomeExclusivity\n        atHomeExclusivityExtraPrice\n        atHomeContinuously\n        atHomeContinuouslyExtraPrice\n        atHomeOnlyBringPet\n        atHomeOnlyBringPetExtraPrice\n        atHomeComeGetPet\n        atHomeComeGetPetExtraPrice\n        atOwnerHomePlantsCare\n        atOwnerHomePlantsCareExtraPrice\n        atOwnerHomeMail\n        atOwnerHomeMailExtraPrice\n        atOwnerHomeCurtains\n        atOwnerHomeCurtainsExtraPrice\n        acceptShortNotice\n        flexibleCancelation\n        isProfessionalOperator\n        abilityToProvideMedicalCare\n      }\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc, UserAuthFieldsFragmentDoc);
/**
 * __useCreateIndividualOperatorMutation__
 *
 * To run a mutation, you first call `useCreateIndividualOperatorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateIndividualOperatorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createIndividualOperatorMutation, { data, loading, error }] = useCreateIndividualOperatorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateIndividualOperatorMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateIndividualOperatorDocument, options);
}
export var UpdateIndividualOperatorDocument = gql(templateObject_72 || (templateObject_72 = __makeTemplateObject(["\n    mutation UpdateIndividualOperator($input: UpdateIndividualOperatorInput!) {\n  updateIndividualOperator(input: $input) {\n    ... on IndividualOperator {\n      id\n      description\n      birthDate\n      genderOptionId\n      hostingOptionId\n      languageOptionIds\n      acceptedSpecieOptionsIds\n      ownAnimalsSpecieOptionsIds\n      partnerId\n      partnerPercentage\n      avatar {\n        storeUrl\n      }\n      account {\n        user {\n          firstName\n          lastName\n        }\n      }\n      location {\n        address\n        city\n        country\n        country_code\n        postcode\n        latitude\n        longitude\n      }\n      availabilities {\n        id\n        date\n      }\n      coreServices {\n        serviceOptionId\n        price\n      }\n      extraServices {\n        atHomeExclusivity\n        atHomeExclusivityExtraPrice\n        atHomeContinuously\n        atHomeContinuouslyExtraPrice\n        atHomeOnlyBringPet\n        atHomeOnlyBringPetExtraPrice\n        atHomeComeGetPet\n        atHomeComeGetPetExtraPrice\n        atOwnerHomePlantsCare\n        atOwnerHomePlantsCareExtraPrice\n        atOwnerHomeMail\n        atOwnerHomeMailExtraPrice\n        atOwnerHomeCurtains\n        atOwnerHomeCurtainsExtraPrice\n        acceptShortNotice\n        flexibleCancelation\n        isProfessionalOperator\n        abilityToProvideMedicalCare\n      }\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", "\n", ""], ["\n    mutation UpdateIndividualOperator($input: UpdateIndividualOperatorInput!) {\n  updateIndividualOperator(input: $input) {\n    ... on IndividualOperator {\n      id\n      description\n      birthDate\n      genderOptionId\n      hostingOptionId\n      languageOptionIds\n      acceptedSpecieOptionsIds\n      ownAnimalsSpecieOptionsIds\n      partnerId\n      partnerPercentage\n      avatar {\n        storeUrl\n      }\n      account {\n        user {\n          firstName\n          lastName\n        }\n      }\n      location {\n        address\n        city\n        country\n        country_code\n        postcode\n        latitude\n        longitude\n      }\n      availabilities {\n        id\n        date\n      }\n      coreServices {\n        serviceOptionId\n        price\n      }\n      extraServices {\n        atHomeExclusivity\n        atHomeExclusivityExtraPrice\n        atHomeContinuously\n        atHomeContinuouslyExtraPrice\n        atHomeOnlyBringPet\n        atHomeOnlyBringPetExtraPrice\n        atHomeComeGetPet\n        atHomeComeGetPetExtraPrice\n        atOwnerHomePlantsCare\n        atOwnerHomePlantsCareExtraPrice\n        atOwnerHomeMail\n        atOwnerHomeMailExtraPrice\n        atOwnerHomeCurtains\n        atOwnerHomeCurtainsExtraPrice\n        acceptShortNotice\n        flexibleCancelation\n        isProfessionalOperator\n        abilityToProvideMedicalCare\n      }\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useUpdateIndividualOperatorMutation__
 *
 * To run a mutation, you first call `useUpdateIndividualOperatorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateIndividualOperatorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateIndividualOperatorMutation, { data, loading, error }] = useUpdateIndividualOperatorMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateIndividualOperatorMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(UpdateIndividualOperatorDocument, options);
}
export var CurrentOperatorDocument = gql(templateObject_73 || (templateObject_73 = __makeTemplateObject(["\n    query CurrentOperator {\n  currentOperator {\n    ... on IndividualOperator {\n      id\n      description\n      birthDate\n      genderOptionId\n      hostingOptionId\n      languageOptionIds\n      acceptedSpecieOptionsIds\n      ownAnimalsSpecieOptionsIds\n      partnerId\n      partnerPercentage\n      avatar {\n        storeUrl\n      }\n      account {\n        user {\n          firstName\n          lastName\n        }\n      }\n      location {\n        address\n        city\n        country\n        country_code\n        postcode\n        latitude\n        longitude\n      }\n      availabilities {\n        id\n        date\n      }\n      coreServices {\n        serviceOptionId\n        price\n      }\n      extraServices {\n        atHomeExclusivity\n        atHomeExclusivityExtraPrice\n        atHomeContinuously\n        atHomeContinuouslyExtraPrice\n        atHomeOnlyBringPet\n        atHomeOnlyBringPetExtraPrice\n        atHomeComeGetPet\n        atHomeComeGetPetExtraPrice\n        atOwnerHomePlantsCare\n        atOwnerHomePlantsCareExtraPrice\n        atOwnerHomeMail\n        atOwnerHomeMailExtraPrice\n        atOwnerHomeCurtains\n        atOwnerHomeCurtainsExtraPrice\n        acceptShortNotice\n        flexibleCancelation\n        isProfessionalOperator\n        abilityToProvideMedicalCare\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    query CurrentOperator {\n  currentOperator {\n    ... on IndividualOperator {\n      id\n      description\n      birthDate\n      genderOptionId\n      hostingOptionId\n      languageOptionIds\n      acceptedSpecieOptionsIds\n      ownAnimalsSpecieOptionsIds\n      partnerId\n      partnerPercentage\n      avatar {\n        storeUrl\n      }\n      account {\n        user {\n          firstName\n          lastName\n        }\n      }\n      location {\n        address\n        city\n        country\n        country_code\n        postcode\n        latitude\n        longitude\n      }\n      availabilities {\n        id\n        date\n      }\n      coreServices {\n        serviceOptionId\n        price\n      }\n      extraServices {\n        atHomeExclusivity\n        atHomeExclusivityExtraPrice\n        atHomeContinuously\n        atHomeContinuouslyExtraPrice\n        atHomeOnlyBringPet\n        atHomeOnlyBringPetExtraPrice\n        atHomeComeGetPet\n        atHomeComeGetPetExtraPrice\n        atOwnerHomePlantsCare\n        atOwnerHomePlantsCareExtraPrice\n        atOwnerHomeMail\n        atOwnerHomeMailExtraPrice\n        atOwnerHomeCurtains\n        atOwnerHomeCurtainsExtraPrice\n        acceptShortNotice\n        flexibleCancelation\n        isProfessionalOperator\n        abilityToProvideMedicalCare\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), NotFoundFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useCurrentOperatorQuery__
 *
 * To run a query within a React component, call `useCurrentOperatorQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentOperatorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentOperatorQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentOperatorQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(CurrentOperatorDocument, options);
}
export function useCurrentOperatorLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(CurrentOperatorDocument, options);
}
export var OperatorByIdDocument = gql(templateObject_74 || (templateObject_74 = __makeTemplateObject(["\n    query OperatorById($id: ID!) {\n  operatorById(id: $id) {\n    ... on IndividualOperator {\n      id\n      description\n      genderOptionId\n      hostingOptionId\n      languageOptionIds\n      acceptedSpecieOptionsIds\n      ownAnimalsSpecieOptionsIds\n      averageScore\n      averageResponseTime\n      partnerId\n      partnerPercentage\n      account {\n        user {\n          firstName\n        }\n      }\n      avatar {\n        storeUrl\n      }\n      medias {\n        storeUrl\n      }\n      location {\n        city\n        country\n        latitude\n        longitude\n      }\n      coreServices {\n        serviceOptionId\n        price\n      }\n      extraServices {\n        atHomeExclusivity\n        atHomeExclusivityExtraPrice\n        atHomeContinuously\n        atHomeContinuouslyExtraPrice\n        atHomeOnlyBringPet\n        atHomeOnlyBringPetExtraPrice\n        atHomeComeGetPet\n        atHomeComeGetPetExtraPrice\n        atOwnerHomePlantsCare\n        atOwnerHomePlantsCareExtraPrice\n        atOwnerHomeMail\n        atOwnerHomeMailExtraPrice\n        atOwnerHomeCurtains\n        atOwnerHomeCurtainsExtraPrice\n        acceptShortNotice\n        flexibleCancelation\n        isProfessionalOperator\n        abilityToProvideMedicalCare\n      }\n      availabilities {\n        id\n        date\n      }\n      reviews {\n        id\n        createdAt\n        score\n        title\n        body\n        ... on UserReview {\n          user {\n            firstName\n            avatar {\n              storeUrl\n            }\n          }\n        }\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", ""], ["\n    query OperatorById($id: ID!) {\n  operatorById(id: $id) {\n    ... on IndividualOperator {\n      id\n      description\n      genderOptionId\n      hostingOptionId\n      languageOptionIds\n      acceptedSpecieOptionsIds\n      ownAnimalsSpecieOptionsIds\n      averageScore\n      averageResponseTime\n      partnerId\n      partnerPercentage\n      account {\n        user {\n          firstName\n        }\n      }\n      avatar {\n        storeUrl\n      }\n      medias {\n        storeUrl\n      }\n      location {\n        city\n        country\n        latitude\n        longitude\n      }\n      coreServices {\n        serviceOptionId\n        price\n      }\n      extraServices {\n        atHomeExclusivity\n        atHomeExclusivityExtraPrice\n        atHomeContinuously\n        atHomeContinuouslyExtraPrice\n        atHomeOnlyBringPet\n        atHomeOnlyBringPetExtraPrice\n        atHomeComeGetPet\n        atHomeComeGetPetExtraPrice\n        atOwnerHomePlantsCare\n        atOwnerHomePlantsCareExtraPrice\n        atOwnerHomeMail\n        atOwnerHomeMailExtraPrice\n        atOwnerHomeCurtains\n        atOwnerHomeCurtainsExtraPrice\n        acceptShortNotice\n        flexibleCancelation\n        isProfessionalOperator\n        abilityToProvideMedicalCare\n      }\n      availabilities {\n        id\n        date\n      }\n      reviews {\n        id\n        createdAt\n        score\n        title\n        body\n        ... on UserReview {\n          user {\n            firstName\n            avatar {\n              storeUrl\n            }\n          }\n        }\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", ""])), NotFoundFieldsFragmentDoc);
/**
 * __useOperatorByIdQuery__
 *
 * To run a query within a React component, call `useOperatorByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useOperatorByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOperatorByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOperatorByIdQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(OperatorByIdDocument, options);
}
export function useOperatorByIdLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(OperatorByIdDocument, options);
}
export var OperatorBookingInfosByIdDocument = gql(templateObject_75 || (templateObject_75 = __makeTemplateObject(["\n    query OperatorBookingInfosById($id: ID!) {\n  operatorById(id: $id) {\n    ... on IndividualOperator {\n      id\n      hostingOptionId\n      averageScore\n      avatar {\n        storeUrl\n      }\n      account {\n        user {\n          firstName\n        }\n      }\n      location {\n        city\n        postcode\n      }\n      availabilities {\n        id\n        date\n      }\n      coreServices {\n        serviceOptionId\n        price\n      }\n      extraServices {\n        atHomeExclusivity\n        atHomeExclusivityExtraPrice\n        atHomeContinuously\n        atHomeContinuouslyExtraPrice\n        atHomeOnlyBringPet\n        atHomeOnlyBringPetExtraPrice\n        atHomeComeGetPet\n        atHomeComeGetPetExtraPrice\n        atOwnerHomePlantsCare\n        atOwnerHomePlantsCareExtraPrice\n        atOwnerHomeMail\n        atOwnerHomeMailExtraPrice\n        atOwnerHomeCurtains\n        atOwnerHomeCurtainsExtraPrice\n        acceptShortNotice\n        flexibleCancelation\n        isProfessionalOperator\n        abilityToProvideMedicalCare\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", ""], ["\n    query OperatorBookingInfosById($id: ID!) {\n  operatorById(id: $id) {\n    ... on IndividualOperator {\n      id\n      hostingOptionId\n      averageScore\n      avatar {\n        storeUrl\n      }\n      account {\n        user {\n          firstName\n        }\n      }\n      location {\n        city\n        postcode\n      }\n      availabilities {\n        id\n        date\n      }\n      coreServices {\n        serviceOptionId\n        price\n      }\n      extraServices {\n        atHomeExclusivity\n        atHomeExclusivityExtraPrice\n        atHomeContinuously\n        atHomeContinuouslyExtraPrice\n        atHomeOnlyBringPet\n        atHomeOnlyBringPetExtraPrice\n        atHomeComeGetPet\n        atHomeComeGetPetExtraPrice\n        atOwnerHomePlantsCare\n        atOwnerHomePlantsCareExtraPrice\n        atOwnerHomeMail\n        atOwnerHomeMailExtraPrice\n        atOwnerHomeCurtains\n        atOwnerHomeCurtainsExtraPrice\n        acceptShortNotice\n        flexibleCancelation\n        isProfessionalOperator\n        abilityToProvideMedicalCare\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", ""])), NotFoundFieldsFragmentDoc);
/**
 * __useOperatorBookingInfosByIdQuery__
 *
 * To run a query within a React component, call `useOperatorBookingInfosByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useOperatorBookingInfosByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOperatorBookingInfosByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOperatorBookingInfosByIdQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(OperatorBookingInfosByIdDocument, options);
}
export function useOperatorBookingInfosByIdLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(OperatorBookingInfosByIdDocument, options);
}
export var CurrentOperatorMediasDocument = gql(templateObject_76 || (templateObject_76 = __makeTemplateObject(["\n    query CurrentOperatorMedias {\n  currentOperator {\n    ... on IndividualOperator {\n      avatar {\n        id\n        storeUrl\n      }\n      medias {\n        id\n        storeUrl\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    query CurrentOperatorMedias {\n  currentOperator {\n    ... on IndividualOperator {\n      avatar {\n        id\n        storeUrl\n      }\n      medias {\n        id\n        storeUrl\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), NotFoundFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useCurrentOperatorMediasQuery__
 *
 * To run a query within a React component, call `useCurrentOperatorMediasQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentOperatorMediasQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentOperatorMediasQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentOperatorMediasQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(CurrentOperatorMediasDocument, options);
}
export function useCurrentOperatorMediasLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(CurrentOperatorMediasDocument, options);
}
export var CurrentOperatorBookingInfosDocument = gql(templateObject_77 || (templateObject_77 = __makeTemplateObject(["\n    query CurrentOperatorBookingInfos {\n  currentOperator {\n    ... on IndividualOperator {\n      acceptedSpecieOptionsIds\n      ownAnimalsSpecieOptionsIds\n      location {\n        latitude\n        longitude\n      }\n      availabilities {\n        id\n        date\n      }\n      coreServices {\n        serviceOptionId\n        price\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    query CurrentOperatorBookingInfos {\n  currentOperator {\n    ... on IndividualOperator {\n      acceptedSpecieOptionsIds\n      ownAnimalsSpecieOptionsIds\n      location {\n        latitude\n        longitude\n      }\n      availabilities {\n        id\n        date\n      }\n      coreServices {\n        serviceOptionId\n        price\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), NotFoundFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useCurrentOperatorBookingInfosQuery__
 *
 * To run a query within a React component, call `useCurrentOperatorBookingInfosQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentOperatorBookingInfosQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentOperatorBookingInfosQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentOperatorBookingInfosQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(CurrentOperatorBookingInfosDocument, options);
}
export function useCurrentOperatorBookingInfosLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(CurrentOperatorBookingInfosDocument, options);
}
export var SearchOperatorsDocument = gql(templateObject_78 || (templateObject_78 = __makeTemplateObject(["\n    query SearchOperators($input: SearchOperatorsInput!) {\n  searchOperators(input: $input) {\n    ... on Operators {\n      operators {\n        id\n        hostingOptionId\n        genderOptionId\n        languageOptionIds\n        averageScore\n        averageResponseTime\n        calendarUpdate\n        partnerId\n        partnerPercentage\n        avatar {\n          storeUrl\n        }\n        location {\n          city\n          postcode\n          latitude\n          longitude\n        }\n        coreServices {\n          serviceOptionId\n          price\n        }\n        extraServices {\n          atHomeExclusivity\n          atHomeExclusivityExtraPrice\n          atHomeContinuously\n          atHomeContinuouslyExtraPrice\n          atHomeOnlyBringPet\n          atHomeOnlyBringPetExtraPrice\n          atHomeComeGetPet\n          atHomeComeGetPetExtraPrice\n          atOwnerHomePlantsCare\n          atOwnerHomePlantsCareExtraPrice\n          atOwnerHomeMail\n          atOwnerHomeMailExtraPrice\n          atOwnerHomeCurtains\n          atOwnerHomeCurtainsExtraPrice\n          acceptShortNotice\n          flexibleCancelation\n          isProfessionalOperator\n          abilityToProvideMedicalCare\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""], ["\n    query SearchOperators($input: SearchOperatorsInput!) {\n  searchOperators(input: $input) {\n    ... on Operators {\n      operators {\n        id\n        hostingOptionId\n        genderOptionId\n        languageOptionIds\n        averageScore\n        averageResponseTime\n        calendarUpdate\n        partnerId\n        partnerPercentage\n        avatar {\n          storeUrl\n        }\n        location {\n          city\n          postcode\n          latitude\n          longitude\n        }\n        coreServices {\n          serviceOptionId\n          price\n        }\n        extraServices {\n          atHomeExclusivity\n          atHomeExclusivityExtraPrice\n          atHomeContinuously\n          atHomeContinuouslyExtraPrice\n          atHomeOnlyBringPet\n          atHomeOnlyBringPetExtraPrice\n          atHomeComeGetPet\n          atHomeComeGetPetExtraPrice\n          atOwnerHomePlantsCare\n          atOwnerHomePlantsCareExtraPrice\n          atOwnerHomeMail\n          atOwnerHomeMailExtraPrice\n          atOwnerHomeCurtains\n          atOwnerHomeCurtainsExtraPrice\n          acceptShortNotice\n          flexibleCancelation\n          isProfessionalOperator\n          abilityToProvideMedicalCare\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""])), UnableToProcessFieldsFragmentDoc);
/**
 * __useSearchOperatorsQuery__
 *
 * To run a query within a React component, call `useSearchOperatorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchOperatorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchOperatorsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchOperatorsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(SearchOperatorsDocument, options);
}
export function useSearchOperatorsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(SearchOperatorsDocument, options);
}
export var AllOperatorsDocument = gql(templateObject_79 || (templateObject_79 = __makeTemplateObject(["\n    query AllOperators {\n  allOperators {\n    ... on Operators {\n      operators {\n        id\n        updatedAt\n      }\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    query AllOperators {\n  allOperators {\n    ... on Operators {\n      operators {\n        id\n        updatedAt\n      }\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useAllOperatorsQuery__
 *
 * To run a query within a React component, call `useAllOperatorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllOperatorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllOperatorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllOperatorsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(AllOperatorsDocument, options);
}
export function useAllOperatorsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(AllOperatorsDocument, options);
}
export var CreatePartnerDocument = gql(templateObject_80 || (templateObject_80 = __makeTemplateObject(["\n    mutation CreatePartner($input: CreatePartnerInput!) {\n  createPartner(input: $input) {\n    ... on Partner {\n      id\n      name\n      description\n      websiteUrl\n      medias {\n        id\n        storeUrl\n      }\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""], ["\n    mutation CreatePartner($input: CreatePartnerInput!) {\n  createPartner(input: $input) {\n    ... on Partner {\n      id\n      name\n      description\n      websiteUrl\n      medias {\n        id\n        storeUrl\n      }\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useCreatePartnerMutation__
 *
 * To run a mutation, you first call `useCreatePartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPartnerMutation, { data, loading, error }] = useCreatePartnerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePartnerMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreatePartnerDocument, options);
}
export var UpdatePartnerDocument = gql(templateObject_81 || (templateObject_81 = __makeTemplateObject(["\n    mutation UpdatePartner($id: ID!, $input: UpdatePartnerInput!) {\n  updatePartner(id: $id, input: $input) {\n    ... on Partner {\n      id\n      name\n      description\n      websiteUrl\n      medias {\n        id\n        storeUrl\n      }\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""], ["\n    mutation UpdatePartner($id: ID!, $input: UpdatePartnerInput!) {\n  updatePartner(id: $id, input: $input) {\n    ... on Partner {\n      id\n      name\n      description\n      websiteUrl\n      medias {\n        id\n        storeUrl\n      }\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useUpdatePartnerMutation__
 *
 * To run a mutation, you first call `useUpdatePartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePartnerMutation, { data, loading, error }] = useUpdatePartnerMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdatePartnerMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(UpdatePartnerDocument, options);
}
export var DeletePartnerDocument = gql(templateObject_82 || (templateObject_82 = __makeTemplateObject(["\n    mutation DeletePartner($id: ID!) {\n  deletePartner(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation DeletePartner($id: ID!) {\n  deletePartner(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", ""])), UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useDeletePartnerMutation__
 *
 * To run a mutation, you first call `useDeletePartnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePartnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePartnerMutation, { data, loading, error }] = useDeletePartnerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePartnerMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(DeletePartnerDocument, options);
}
export var GetPartnersDocument = gql(templateObject_83 || (templateObject_83 = __makeTemplateObject(["\n    query GetPartners {\n  partners {\n    ... on PartnersList {\n      partners {\n        id\n        name\n        description\n        websiteUrl\n        medias {\n          id\n          storeUrl\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""], ["\n    query GetPartners {\n  partners {\n    ... on PartnersList {\n      partners {\n        id\n        name\n        description\n        websiteUrl\n        medias {\n          id\n          storeUrl\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""])), UnableToProcessFieldsFragmentDoc);
/**
 * __useGetPartnersQuery__
 *
 * To run a query within a React component, call `useGetPartnersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPartnersQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(GetPartnersDocument, options);
}
export function useGetPartnersLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(GetPartnersDocument, options);
}
export var GetPartnerByIdDocument = gql(templateObject_84 || (templateObject_84 = __makeTemplateObject(["\n    query GetPartnerById($id: ID!) {\n  partnerById(id: $id) {\n    ... on Partner {\n      id\n      name\n      description\n      websiteUrl\n      receipts {\n        id\n        createdAt\n        amountDonated\n        files {\n          id\n          storeUrl\n        }\n        donations {\n          id\n          createdAt\n          amountToDonate\n          operator {\n            account {\n              user {\n                firstName\n              }\n            }\n            avatar {\n              storeUrl\n            }\n          }\n        }\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", ""], ["\n    query GetPartnerById($id: ID!) {\n  partnerById(id: $id) {\n    ... on Partner {\n      id\n      name\n      description\n      websiteUrl\n      receipts {\n        id\n        createdAt\n        amountDonated\n        files {\n          id\n          storeUrl\n        }\n        donations {\n          id\n          createdAt\n          amountToDonate\n          operator {\n            account {\n              user {\n                firstName\n              }\n            }\n            avatar {\n              storeUrl\n            }\n          }\n        }\n      }\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", ""])), NotFoundFieldsFragmentDoc);
/**
 * __useGetPartnerByIdQuery__
 *
 * To run a query within a React component, call `useGetPartnerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnerByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetPartnerByIdQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(GetPartnerByIdDocument, options);
}
export function useGetPartnerByIdLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(GetPartnerByIdDocument, options);
}
export var GetPartnersIdsDocument = gql(templateObject_85 || (templateObject_85 = __makeTemplateObject(["\n    query GetPartnersIds {\n  partners {\n    ... on PartnersList {\n      partners {\n        id\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""], ["\n    query GetPartnersIds {\n  partners {\n    ... on PartnersList {\n      partners {\n        id\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""])), UnableToProcessFieldsFragmentDoc);
/**
 * __useGetPartnersIdsQuery__
 *
 * To run a query within a React component, call `useGetPartnersIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnersIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnersIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPartnersIdsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(GetPartnersIdsDocument, options);
}
export function useGetPartnersIdsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(GetPartnersIdsDocument, options);
}
export var GetPartnersWithReceiptsDocument = gql(templateObject_86 || (templateObject_86 = __makeTemplateObject(["\n    query GetPartnersWithReceipts {\n  partners {\n    ... on PartnersList {\n      partners {\n        id\n        name\n        description\n        websiteUrl\n        medias {\n          id\n          storeUrl\n        }\n        receipts {\n          id\n          amountDonated\n          donations {\n            id\n          }\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""], ["\n    query GetPartnersWithReceipts {\n  partners {\n    ... on PartnersList {\n      partners {\n        id\n        name\n        description\n        websiteUrl\n        medias {\n          id\n          storeUrl\n        }\n        receipts {\n          id\n          amountDonated\n          donations {\n            id\n          }\n        }\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""])), UnableToProcessFieldsFragmentDoc);
/**
 * __useGetPartnersWithReceiptsQuery__
 *
 * To run a query within a React component, call `useGetPartnersWithReceiptsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnersWithReceiptsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnersWithReceiptsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPartnersWithReceiptsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(GetPartnersWithReceiptsDocument, options);
}
export function useGetPartnersWithReceiptsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(GetPartnersWithReceiptsDocument, options);
}
export var CreateReviewDocument = gql(templateObject_87 || (templateObject_87 = __makeTemplateObject(["\n    mutation CreateReview($input: CreateReviewInput!) {\n  createReview(input: $input) {\n    ... on UserReview {\n      id\n    }\n    ... on OperatorReview {\n      id\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation CreateReview($input: CreateReviewInput!) {\n  createReview(input: $input) {\n    ... on UserReview {\n      id\n    }\n    ... on OperatorReview {\n      id\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UserAuthFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useCreateReviewMutation__
 *
 * To run a mutation, you first call `useCreateReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReviewMutation, { data, loading, error }] = useCreateReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateReviewMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateReviewDocument, options);
}
export var CreateServiceOptionDocument = gql(templateObject_88 || (templateObject_88 = __makeTemplateObject(["\n    mutation CreateServiceOption($input: CreateServiceOptionInput!) {\n  createServiceOption(input: $input) {\n    ... on ServiceOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation CreateServiceOption($input: CreateServiceOptionInput!) {\n  createServiceOption(input: $input) {\n    ... on ServiceOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useCreateServiceOptionMutation__
 *
 * To run a mutation, you first call `useCreateServiceOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceOptionMutation, { data, loading, error }] = useCreateServiceOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateServiceOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateServiceOptionDocument, options);
}
export var UpdateServiceOptionDocument = gql(templateObject_89 || (templateObject_89 = __makeTemplateObject(["\n    mutation UpdateServiceOption($id: ID!, $input: UpdateServiceOptionInput!) {\n  updateServiceOption(id: $id, input: $input) {\n    ... on ServiceOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation UpdateServiceOption($id: ID!, $input: UpdateServiceOptionInput!) {\n  updateServiceOption(id: $id, input: $input) {\n    ... on ServiceOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useUpdateServiceOptionMutation__
 *
 * To run a mutation, you first call `useUpdateServiceOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateServiceOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateServiceOptionMutation, { data, loading, error }] = useUpdateServiceOptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateServiceOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(UpdateServiceOptionDocument, options);
}
export var DeleteServiceOptionDocument = gql(templateObject_90 || (templateObject_90 = __makeTemplateObject(["\n    mutation DeleteServiceOption($id: ID!) {\n  deleteServiceOption(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation DeleteServiceOption($id: ID!) {\n  deleteServiceOption(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useDeleteServiceOptionMutation__
 *
 * To run a mutation, you first call `useDeleteServiceOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteServiceOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteServiceOptionMutation, { data, loading, error }] = useDeleteServiceOptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteServiceOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(DeleteServiceOptionDocument, options);
}
export var GetServiceOptionsDocument = gql(templateObject_91 || (templateObject_91 = __makeTemplateObject(["\n    query GetServiceOptions {\n  servicesOptions {\n    ... on ServiceOptionsList {\n      serviceOptions {\n        id\n        nameFr\n        nameEn\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""], ["\n    query GetServiceOptions {\n  servicesOptions {\n    ... on ServiceOptionsList {\n      serviceOptions {\n        id\n        nameFr\n        nameEn\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""])), UnableToProcessFieldsFragmentDoc);
/**
 * __useGetServiceOptionsQuery__
 *
 * To run a query within a React component, call `useGetServiceOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetServiceOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetServiceOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetServiceOptionsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(GetServiceOptionsDocument, options);
}
export function useGetServiceOptionsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(GetServiceOptionsDocument, options);
}
export var CreateSpecieOptionDocument = gql(templateObject_92 || (templateObject_92 = __makeTemplateObject(["\n    mutation CreateSpecieOption($input: CreateSpecieOptionInput!) {\n  createSpecieOption(input: $input) {\n    ... on SpecieOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation CreateSpecieOption($input: CreateSpecieOptionInput!) {\n  createSpecieOption(input: $input) {\n    ... on SpecieOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc);
/**
 * __useCreateSpecieOptionMutation__
 *
 * To run a mutation, you first call `useCreateSpecieOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSpecieOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSpecieOptionMutation, { data, loading, error }] = useCreateSpecieOptionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSpecieOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(CreateSpecieOptionDocument, options);
}
export var UpdateSpecieOptionDocument = gql(templateObject_93 || (templateObject_93 = __makeTemplateObject(["\n    mutation UpdateSpecieOption($id: ID!, $input: UpdateSpecieOptionInput!) {\n  updateSpecieOption(id: $id, input: $input) {\n    ... on SpecieOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    mutation UpdateSpecieOption($id: ID!, $input: UpdateSpecieOptionInput!) {\n  updateSpecieOption(id: $id, input: $input) {\n    ... on SpecieOption {\n      id\n      nameFr\n      nameEn\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, UnableToProcessFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useUpdateSpecieOptionMutation__
 *
 * To run a mutation, you first call `useUpdateSpecieOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSpecieOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSpecieOptionMutation, { data, loading, error }] = useUpdateSpecieOptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSpecieOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(UpdateSpecieOptionDocument, options);
}
export var DeleteSpecieOptionDocument = gql(templateObject_94 || (templateObject_94 = __makeTemplateObject(["\n    mutation DeleteSpecieOption($id: ID!) {\n  deleteSpecieOption(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation DeleteSpecieOption($id: ID!) {\n  deleteSpecieOption(id: $id) {\n    ... on BooleanResult {\n      success\n    }\n    ... on InvalidArgumentsError {\n      ...InvalidArgumentsFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", ""])), InvalidArgumentsFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useDeleteSpecieOptionMutation__
 *
 * To run a mutation, you first call `useDeleteSpecieOptionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSpecieOptionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSpecieOptionMutation, { data, loading, error }] = useDeleteSpecieOptionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSpecieOptionMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(DeleteSpecieOptionDocument, options);
}
export var GetSpeciesOptionsDocument = gql(templateObject_95 || (templateObject_95 = __makeTemplateObject(["\n    query GetSpeciesOptions {\n  speciesOptions {\n    ... on SpecieOptionsList {\n      specieOptions {\n        id\n        nameFr\n        nameEn\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""], ["\n    query GetSpeciesOptions {\n  speciesOptions {\n    ... on SpecieOptionsList {\n      specieOptions {\n        id\n        nameFr\n        nameEn\n      }\n    }\n    ... on UnableToProcessError {\n      ...UnableToProcessFields\n    }\n  }\n}\n    ", ""])), UnableToProcessFieldsFragmentDoc);
/**
 * __useGetSpeciesOptionsQuery__
 *
 * To run a query within a React component, call `useGetSpeciesOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSpeciesOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSpeciesOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSpeciesOptionsQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(GetSpeciesOptionsDocument, options);
}
export function useGetSpeciesOptionsLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(GetSpeciesOptionsDocument, options);
}
export var StartCronDocument = gql(templateObject_96 || (templateObject_96 = __makeTemplateObject(["\n    mutation StartCron($cronName: String!) {\n  startCron(cronName: $cronName) {\n    ... on BooleanResult {\n      success\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation StartCron($cronName: String!) {\n  startCron(cronName: $cronName) {\n    ... on BooleanResult {\n      success\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", ""])), UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useStartCronMutation__
 *
 * To run a mutation, you first call `useStartCronMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartCronMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startCronMutation, { data, loading, error }] = useStartCronMutation({
 *   variables: {
 *      cronName: // value for 'cronName'
 *   },
 * });
 */
export function useStartCronMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(StartCronDocument, options);
}
export var StopCronDocument = gql(templateObject_97 || (templateObject_97 = __makeTemplateObject(["\n    mutation StopCron($cronName: String!) {\n  stopCron(cronName: $cronName) {\n    ... on BooleanResult {\n      success\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    mutation StopCron($cronName: String!) {\n  stopCron(cronName: $cronName) {\n    ... on BooleanResult {\n      success\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", ""])), UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useStopCronMutation__
 *
 * To run a mutation, you first call `useStopCronMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopCronMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopCronMutation, { data, loading, error }] = useStopCronMutation({
 *   variables: {
 *      cronName: // value for 'cronName'
 *   },
 * });
 */
export function useStopCronMutation(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useMutation(StopCronDocument, options);
}
export var CurrentStaffDocument = gql(templateObject_98 || (templateObject_98 = __makeTemplateObject(["\n    query CurrentStaff {\n  currentStaff {\n    ... on Staff {\n      id\n      email\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", ""], ["\n    query CurrentStaff {\n  currentStaff {\n    ... on Staff {\n      id\n      email\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n    ... on NotFoundError {\n      ...NotFoundFields\n    }\n  }\n}\n    ", "\n", "\n", ""])), UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc, NotFoundFieldsFragmentDoc);
/**
 * __useCurrentStaffQuery__
 *
 * To run a query within a React component, call `useCurrentStaffQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentStaffQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentStaffQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentStaffQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(CurrentStaffDocument, options);
}
export function useCurrentStaffLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(CurrentStaffDocument, options);
}
export var GetCronStatusDocument = gql(templateObject_99 || (templateObject_99 = __makeTemplateObject(["\n    query GetCronStatus($cronName: String!) {\n  getCronStatus(cronName: $cronName) {\n    ... on CronStatus {\n      status\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    query GetCronStatus($cronName: String!) {\n  getCronStatus(cronName: $cronName) {\n    ... on CronStatus {\n      status\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", ""])), UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useGetCronStatusQuery__
 *
 * To run a query within a React component, call `useGetCronStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCronStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCronStatusQuery({
 *   variables: {
 *      cronName: // value for 'cronName'
 *   },
 * });
 */
export function useGetCronStatusQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useQuery(GetCronStatusDocument, options);
}
export function useGetCronStatusLazyQuery(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useLazyQuery(GetCronStatusDocument, options);
}
export var SubscribeToPendingPaymentCronDocument = gql(templateObject_100 || (templateObject_100 = __makeTemplateObject(["\n    subscription SubscribeToPendingPaymentCron {\n  pendingPaymentCronSub {\n    ... on BooleanResult {\n      success\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    subscription SubscribeToPendingPaymentCron {\n  pendingPaymentCronSub {\n    ... on BooleanResult {\n      success\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", ""])), UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useSubscribeToPendingPaymentCronSubscription__
 *
 * To run a query within a React component, call `useSubscribeToPendingPaymentCronSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToPendingPaymentCronSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToPendingPaymentCronSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscribeToPendingPaymentCronSubscription(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useSubscription(SubscribeToPendingPaymentCronDocument, options);
}
export var SubscribeToSetupIntentCronDocument = gql(templateObject_101 || (templateObject_101 = __makeTemplateObject(["\n    subscription SubscribeToSetupIntentCron {\n  setupIntentCronSub {\n    ... on BooleanResult {\n      success\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    subscription SubscribeToSetupIntentCron {\n  setupIntentCronSub {\n    ... on BooleanResult {\n      success\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", ""])), UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useSubscribeToSetupIntentCronSubscription__
 *
 * To run a query within a React component, call `useSubscribeToSetupIntentCronSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToSetupIntentCronSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToSetupIntentCronSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscribeToSetupIntentCronSubscription(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useSubscription(SubscribeToSetupIntentCronDocument, options);
}
export var SubscribeToErrorsEmailCronDocument = gql(templateObject_102 || (templateObject_102 = __makeTemplateObject(["\n    subscription SubscribeToErrorsEmailCron {\n  errorsEmailCronSub {\n    ... on BooleanResult {\n      success\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", ""], ["\n    subscription SubscribeToErrorsEmailCron {\n  errorsEmailCronSub {\n    ... on BooleanResult {\n      success\n    }\n    ... on UserAuthenticationError {\n      ...UserAuthFields\n    }\n    ... on UserForbiddenError {\n      ...UserForbiddenFields\n    }\n  }\n}\n    ", "\n", ""])), UserAuthFieldsFragmentDoc, UserForbiddenFieldsFragmentDoc);
/**
 * __useSubscribeToErrorsEmailCronSubscription__
 *
 * To run a query within a React component, call `useSubscribeToErrorsEmailCronSubscription` and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToErrorsEmailCronSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSubscribeToErrorsEmailCronSubscription({
 *   variables: {
 *   },
 * });
 */
export function useSubscribeToErrorsEmailCronSubscription(baseOptions) {
    var options = __assign(__assign({}, defaultOptions), baseOptions);
    return Apollo.useSubscription(SubscribeToErrorsEmailCronDocument, options);
}
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16, templateObject_17, templateObject_18, templateObject_19, templateObject_20, templateObject_21, templateObject_22, templateObject_23, templateObject_24, templateObject_25, templateObject_26, templateObject_27, templateObject_28, templateObject_29, templateObject_30, templateObject_31, templateObject_32, templateObject_33, templateObject_34, templateObject_35, templateObject_36, templateObject_37, templateObject_38, templateObject_39, templateObject_40, templateObject_41, templateObject_42, templateObject_43, templateObject_44, templateObject_45, templateObject_46, templateObject_47, templateObject_48, templateObject_49, templateObject_50, templateObject_51, templateObject_52, templateObject_53, templateObject_54, templateObject_55, templateObject_56, templateObject_57, templateObject_58, templateObject_59, templateObject_60, templateObject_61, templateObject_62, templateObject_63, templateObject_64, templateObject_65, templateObject_66, templateObject_67, templateObject_68, templateObject_69, templateObject_70, templateObject_71, templateObject_72, templateObject_73, templateObject_74, templateObject_75, templateObject_76, templateObject_77, templateObject_78, templateObject_79, templateObject_80, templateObject_81, templateObject_82, templateObject_83, templateObject_84, templateObject_85, templateObject_86, templateObject_87, templateObject_88, templateObject_89, templateObject_90, templateObject_91, templateObject_92, templateObject_93, templateObject_94, templateObject_95, templateObject_96, templateObject_97, templateObject_98, templateObject_99, templateObject_100, templateObject_101, templateObject_102;
//# sourceMappingURL=index.js.map