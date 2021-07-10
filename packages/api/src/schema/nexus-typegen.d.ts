/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { ApiContext } from "./../config/context"
import type { FieldValidationResolver, FieldAuthorizationResolver } from "./plugins"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Date";
    /**
     * A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.
     */
    email<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "EmailAddress";
    /**
     * A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction.
     */
    jwt<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "JWT";
    /**
     * A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude
     */
    latitude<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Latitude";
    /**
     * A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude
     */
    longitude<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "Longitude";
    /**
     * A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.
     */
    url<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "URL";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    datetime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
    /**
     * A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Date";
    /**
     * A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/.
     */
    email<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "EmailAddress";
    /**
     * A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction.
     */
    jwt<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "JWT";
    /**
     * A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude
     */
    latitude<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Latitude";
    /**
     * A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude
     */
    longitude<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "Longitude";
    /**
     * A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt.
     */
    url<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "URL";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateAccountInput: { // input type
    email: NexusGenScalars['EmailAddress']; // EmailAddress!
    firstName: string; // String!
    password: string; // String!
  }
  CreateIndividualOperatorInput: { // input type
    acceptedSpecieOptionsIds: string[]; // [ID!]!
    birthDate: NexusGenScalars['Date']; // Date!
    description: string; // String!
    genderOptionId: string; // String!
    hostingOptionId: string; // String!
    languageOptionIds: string[]; // [ID!]!
    mainMediaId: string; // ID!
    ownAnimalsSpecieOptionsIds: string[]; // [ID!]!
    partnerId?: string | null; // String
    partnerPercentage?: number | null; // Int
    stripeAccountId?: string | null; // ID
  }
  CreateMediaInput: { // input type
    fileName: string; // String!
    fileType: string; // String!
    saveAs: string; // String!
  }
  EmailAndPasswordInput: { // input type
    email: NexusGenScalars['EmailAddress']; // EmailAddress!
    password: string; // String!
  }
  ResetPasswordInput: { // input type
    newPassword: string; // String!
    token: NexusGenScalars['JWT']; // JWT!
  }
  UpdateIndividualOperatorInput: { // input type
    acceptedSpecieOptionsIds?: Array<string | null> | null; // [ID]
    birthDate?: NexusGenScalars['Date'] | null; // Date
    description?: string | null; // String
    genderOptionId?: string | null; // String
    hostingOptionId?: string | null; // String
    languageOptionIds?: Array<string | null> | null; // [ID]
    mainMediaId?: string | null; // ID
    ownAnimalsSpecieOptionsIds?: Array<string | null> | null; // [ID]
    partnerId?: string | null; // String
    partnerPercentage?: number | null; // Int
    stripeAccountId?: string | null; // ID
  }
  VerifyUserInput: { // input type
    token: NexusGenScalars['JWT']; // JWT!
  }
}

export interface NexusGenEnums {
  ErrorCode: "BAD_REQUEST" | "FORBIDDEN" | "NOT_FOUND" | "UNABLE_TO_PROCESS" | "UNAUTHORIZED"
  ErrorMessage: "FORBIDDEN_YOU_DO_NOT_HAVE_ACCESS_TO_THIS_RESOURCE" | "RESOURCE_NOT_FOUND" | "UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR" | "UNABLE_TO_PROCESS_REQUEST_DUE_TO_SERVER_ERROR" | "UNAUTHENTICATED_PLEASE_LOGIN"
  MediaType: "IMAGE" | "VIDEO"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  Date: any
  DateTime: any
  EmailAddress: any
  JWT: any
  Latitude: any
  Longitude: any
  URL: any
}

export interface NexusGenObjects {
  Account: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    email?: NexusGenScalars['EmailAddress'] | null; // EmailAddress
    id: string; // String!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    verifiedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  AccountsList: { // root type
    accounts?: Array<NexusGenRootTypes['Account'] | null> | null; // [Account]
  }
  BooleanResult: { // root type
    success?: boolean | null; // Boolean
  }
  IndividualOperator: { // root type
    acceptedSpecieOptionsIds?: Array<string | null> | null; // [String]
    accountId?: string | null; // ID
    birthDate?: NexusGenScalars['Date'] | null; // Date
    calendarUpdate?: NexusGenScalars['DateTime'] | null; // DateTime
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    description?: string | null; // String
    genderOptionId?: string | null; // String
    hostingOptionId?: string | null; // String
    id: string; // String!
    languageOptionIds?: Array<string | null> | null; // [String]
    mainMediaId?: string | null; // String
    ownAnimalsSpecieOptionsIds?: Array<string | null> | null; // [String]
    partnerId?: string | null; // String
    partnerPercentage?: number | null; // Int
    stripeAccountId?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  InvalidArgument: { // root type
    key: string; // String!
    message: string; // String!
  }
  InvalidArgumentsError: { // root type
    invalidArguments: Array<NexusGenRootTypes['InvalidArgument'] | null>; // [InvalidArgument]!
  }
  IsActiveOperatorMainMediaError: { // root type
    activeOperatorMainMediaError: string; // String!
  }
  IsActiveOperatorWithNoReplacementMediaError: { // root type
    activeOperatorWithNoReplacementMediaError: string; // String!
  }
  MediasList: { // root type
    medias?: Array<NexusGenRootTypes['Media'] | null> | null; // [Media]
  }
  Mutation: {};
  NotFoundError: {};
  OperatorMedia: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    mediaType?: NexusGenEnums['MediaType'] | null; // MediaType
    operatorId?: string | null; // ID
    storeUrl: NexusGenScalars['URL']; // URL!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Query: {};
  SharedMedia: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    mediaType?: NexusGenEnums['MediaType'] | null; // MediaType
    operatorId?: string | null; // ID
    storeUrl: NexusGenScalars['URL']; // URL!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    userId?: string | null; // ID
  }
  StorageInfos: { // root type
    signedRequest?: string | null; // String
    url?: string | null; // String
  }
  UnableToProcessError: {};
  User: { // root type
    accountId?: string | null; // ID
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    firstName: string; // String!
    id: string; // String!
    lastName?: string | null; // String
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
  }
  UserAuthenticationError: {};
  UserForbiddenError: {};
  UserMedia: { // root type
    createdAt?: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    mediaType?: NexusGenEnums['MediaType'] | null; // MediaType
    storeUrl: NexusGenScalars['URL']; // URL!
    updatedAt?: NexusGenScalars['DateTime'] | null; // DateTime
    userId?: string | null; // ID
  }
  UsersList: { // root type
    users?: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
}

export interface NexusGenInterfaces {
  Actor: NexusGenRootTypes['IndividualOperator'] | NexusGenRootTypes['User'];
  Media: NexusGenRootTypes['OperatorMedia'] | NexusGenRootTypes['SharedMedia'] | NexusGenRootTypes['UserMedia'];
  Node: NexusGenRootTypes['Account'] | NexusGenRootTypes['IndividualOperator'] | NexusGenRootTypes['OperatorMedia'] | NexusGenRootTypes['SharedMedia'] | NexusGenRootTypes['User'] | NexusGenRootTypes['UserMedia'];
  Operator: NexusGenRootTypes['IndividualOperator'];
}

export interface NexusGenUnions {
  AccountByIdResult: NexusGenRootTypes['Account'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['UserAuthenticationError'] | NexusGenRootTypes['UserForbiddenError'];
  AccountResult: NexusGenRootTypes['Account'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['UnableToProcessError'] | NexusGenRootTypes['UserAuthenticationError'] | NexusGenRootTypes['UserForbiddenError'];
  AllAccountsResult: NexusGenRootTypes['AccountsList'] | NexusGenRootTypes['UnableToProcessError'] | NexusGenRootTypes['UserAuthenticationError'] | NexusGenRootTypes['UserForbiddenError'];
  AllUsersResult: NexusGenRootTypes['UnableToProcessError'] | NexusGenRootTypes['UserAuthenticationError'] | NexusGenRootTypes['UserForbiddenError'] | NexusGenRootTypes['UsersList'];
  CreateAccountResult: NexusGenRootTypes['Account'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['UnableToProcessError'];
  CreateIndividualOperatorResult: NexusGenRootTypes['IndividualOperator'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['UnableToProcessError'];
  CreateMediaResult: NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['StorageInfos'] | NexusGenRootTypes['UnableToProcessError'] | NexusGenRootTypes['UserAuthenticationError'];
  CurrentAccountResult: NexusGenRootTypes['Account'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['UserAuthenticationError'] | NexusGenRootTypes['UserForbiddenError'];
  CurrentOperatorMediaResult: NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['OperatorMedia'] | NexusGenRootTypes['SharedMedia'] | NexusGenRootTypes['UserAuthenticationError'] | NexusGenRootTypes['UserForbiddenError'];
  CurrentUserMediaResult: NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['SharedMedia'] | NexusGenRootTypes['UserAuthenticationError'] | NexusGenRootTypes['UserForbiddenError'] | NexusGenRootTypes['UserMedia'];
  DeleteAccountResult: NexusGenRootTypes['BooleanResult'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['UserAuthenticationError'];
  DeleteMediaResult: NexusGenRootTypes['BooleanResult'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['IsActiveOperatorMainMediaError'] | NexusGenRootTypes['IsActiveOperatorWithNoReplacementMediaError'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['UnableToProcessError'] | NexusGenRootTypes['UserAuthenticationError'];
  IndividualOperatorResult: NexusGenRootTypes['IndividualOperator'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['UnableToProcessError'] | NexusGenRootTypes['UserAuthenticationError'] | NexusGenRootTypes['UserForbiddenError'];
  LostPasswordResult: NexusGenRootTypes['BooleanResult'] | NexusGenRootTypes['NotFoundError'];
  MediaByIdResult: NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['OperatorMedia'] | NexusGenRootTypes['SharedMedia'] | NexusGenRootTypes['UserAuthenticationError'] | NexusGenRootTypes['UserForbiddenError'] | NexusGenRootTypes['UserMedia'];
  MediasResult: NexusGenRootTypes['MediasList'] | NexusGenRootTypes['UnableToProcessError'] | NexusGenRootTypes['UserAuthenticationError'] | NexusGenRootTypes['UserForbiddenError'];
  ModifyEmailResult: NexusGenRootTypes['Account'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['UnableToProcessError'] | NexusGenRootTypes['UserAuthenticationError'];
  ModifyPasswordResult: NexusGenRootTypes['Account'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['UserAuthenticationError'];
  ResetPasswordResult: NexusGenRootTypes['BooleanResult'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['UnableToProcessError'];
  SendVerificationEmailResult: NexusGenRootTypes['BooleanResult'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['UnableToProcessError'];
  SignInResult: NexusGenRootTypes['Account'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['UnableToProcessError'];
  SignOutResult: NexusGenRootTypes['BooleanResult'] | NexusGenRootTypes['UserAuthenticationError'];
  UpdateIndividualOperatorResult: NexusGenRootTypes['IndividualOperator'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['UnableToProcessError'];
  UserByIdResult: NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['User'] | NexusGenRootTypes['UserAuthenticationError'] | NexusGenRootTypes['UserForbiddenError'];
  VerifyUserResult: NexusGenRootTypes['BooleanResult'] | NexusGenRootTypes['InvalidArgumentsError'] | NexusGenRootTypes['NotFoundError'] | NexusGenRootTypes['UnableToProcessError'];
}

export type NexusGenRootTypes = NexusGenInterfaces & NexusGenObjects & NexusGenUnions

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Account: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    email: NexusGenScalars['EmailAddress'] | null; // EmailAddress
    id: string; // String!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    user: NexusGenRootTypes['User'] | null; // User
    verifiedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  AccountsList: { // field return type
    accounts: Array<NexusGenRootTypes['Account'] | null> | null; // [Account]
  }
  BooleanResult: { // field return type
    success: boolean | null; // Boolean
  }
  IndividualOperator: { // field return type
    acceptedSpecieOptionsIds: Array<string | null> | null; // [String]
    account: NexusGenRootTypes['Account'] | null; // Account
    accountId: string | null; // ID
    birthDate: NexusGenScalars['Date'] | null; // Date
    calendarUpdate: NexusGenScalars['DateTime'] | null; // DateTime
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    description: string | null; // String
    genderOptionId: string | null; // String
    hostingOptionId: string | null; // String
    id: string; // String!
    languageOptionIds: Array<string | null> | null; // [String]
    mainMediaId: string | null; // String
    medias: Array<NexusGenRootTypes['Media'] | null> | null; // [Media]
    ownAnimalsSpecieOptionsIds: Array<string | null> | null; // [String]
    partnerId: string | null; // String
    partnerPercentage: number | null; // Int
    stripeAccountId: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  InvalidArgument: { // field return type
    key: string; // String!
    message: string; // String!
  }
  InvalidArgumentsError: { // field return type
    code: NexusGenEnums['ErrorCode']; // ErrorCode!
    invalidArguments: Array<NexusGenRootTypes['InvalidArgument'] | null>; // [InvalidArgument]!
    message: NexusGenEnums['ErrorMessage']; // ErrorMessage!
  }
  IsActiveOperatorMainMediaError: { // field return type
    activeOperatorMainMediaError: string; // String!
  }
  IsActiveOperatorWithNoReplacementMediaError: { // field return type
    activeOperatorWithNoReplacementMediaError: string; // String!
  }
  MediasList: { // field return type
    medias: Array<NexusGenRootTypes['Media'] | null> | null; // [Media]
  }
  Mutation: { // field return type
    createAccount: NexusGenRootTypes['CreateAccountResult'] | null; // CreateAccountResult
    createIndividualOperator: NexusGenRootTypes['CreateIndividualOperatorResult'] | null; // CreateIndividualOperatorResult
    createMedia: NexusGenRootTypes['CreateMediaResult'] | null; // CreateMediaResult
    deleteAccount: NexusGenRootTypes['DeleteAccountResult'] | null; // DeleteAccountResult
    deleteMedia: NexusGenRootTypes['DeleteMediaResult'] | null; // DeleteMediaResult
    lostPassword: NexusGenRootTypes['LostPasswordResult'] | null; // LostPasswordResult
    modifyEmail: NexusGenRootTypes['ModifyEmailResult'] | null; // ModifyEmailResult
    modifyPassword: NexusGenRootTypes['ModifyPasswordResult'] | null; // ModifyPasswordResult
    resetPassword: NexusGenRootTypes['ResetPasswordResult'] | null; // ResetPasswordResult
    sendVerificationEmail: NexusGenRootTypes['SendVerificationEmailResult'] | null; // SendVerificationEmailResult
    signIn: NexusGenRootTypes['SignInResult'] | null; // SignInResult
    signOut: NexusGenRootTypes['SignOutResult'] | null; // SignOutResult
    updateIndividualOperator: NexusGenRootTypes['IndividualOperatorResult'] | null; // IndividualOperatorResult
    verifyUser: NexusGenRootTypes['VerifyUserResult'] | null; // VerifyUserResult
  }
  NotFoundError: { // field return type
    code: NexusGenEnums['ErrorCode']; // ErrorCode!
    message: NexusGenEnums['ErrorMessage']; // ErrorMessage!
  }
  OperatorMedia: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    mediaType: NexusGenEnums['MediaType'] | null; // MediaType
    operator: NexusGenRootTypes['Operator'] | null; // Operator
    operatorId: string | null; // ID
    storeUrl: NexusGenScalars['URL']; // URL!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Query: { // field return type
    accountById: NexusGenRootTypes['AccountByIdResult'] | null; // AccountByIdResult
    allAccounts: NexusGenRootTypes['AllAccountsResult'] | null; // AllAccountsResult
    allUsers: NexusGenRootTypes['AllUsersResult'] | null; // AllUsersResult
    currentAccount: NexusGenRootTypes['CurrentAccountResult'] | null; // CurrentAccountResult
    currentOperatorMedia: NexusGenRootTypes['CurrentOperatorMediaResult'] | null; // CurrentOperatorMediaResult
    currentUserMedia: NexusGenRootTypes['CurrentUserMediaResult'] | null; // CurrentUserMediaResult
    mediaById: NexusGenRootTypes['MediaByIdResult'] | null; // MediaByIdResult
    medias: NexusGenRootTypes['MediasResult'] | null; // MediasResult
    userById: NexusGenRootTypes['UserByIdResult'] | null; // UserByIdResult
  }
  SharedMedia: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    mediaType: NexusGenEnums['MediaType'] | null; // MediaType
    operator: NexusGenRootTypes['Operator'] | null; // Operator
    operatorId: string | null; // ID
    storeUrl: NexusGenScalars['URL']; // URL!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    user: NexusGenRootTypes['User'] | null; // User
    userId: string | null; // ID
  }
  StorageInfos: { // field return type
    signedRequest: string | null; // String
    url: string | null; // String
  }
  UnableToProcessError: { // field return type
    code: NexusGenEnums['ErrorCode']; // ErrorCode!
    message: NexusGenEnums['ErrorMessage']; // ErrorMessage!
  }
  User: { // field return type
    accountId: string | null; // ID
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    firstName: string; // String!
    id: string; // String!
    lastName: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  UserAuthenticationError: { // field return type
    code: NexusGenEnums['ErrorCode']; // ErrorCode!
    message: NexusGenEnums['ErrorMessage']; // ErrorMessage!
  }
  UserForbiddenError: { // field return type
    code: NexusGenEnums['ErrorCode']; // ErrorCode!
    message: NexusGenEnums['ErrorMessage']; // ErrorMessage!
  }
  UserMedia: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    mediaType: NexusGenEnums['MediaType'] | null; // MediaType
    storeUrl: NexusGenScalars['URL']; // URL!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
    user: NexusGenRootTypes['User'] | null; // User
    userId: string | null; // ID
  }
  UsersList: { // field return type
    users: Array<NexusGenRootTypes['User'] | null> | null; // [User]
  }
  Actor: { // field return type
    accountId: string | null; // ID
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Media: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    mediaType: NexusGenEnums['MediaType'] | null; // MediaType
    storeUrl: NexusGenScalars['URL']; // URL!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Node: { // field return type
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    id: string; // String!
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
  Operator: { // field return type
    acceptedSpecieOptionsIds: Array<string | null> | null; // [String]
    accountId: string | null; // ID
    calendarUpdate: NexusGenScalars['DateTime'] | null; // DateTime
    createdAt: NexusGenScalars['DateTime'] | null; // DateTime
    description: string | null; // String
    hostingOptionId: string | null; // String
    id: string; // String!
    languageOptionIds: Array<string | null> | null; // [String]
    mainMediaId: string | null; // String
    ownAnimalsSpecieOptionsIds: Array<string | null> | null; // [String]
    partnerId: string | null; // String
    partnerPercentage: number | null; // Int
    stripeAccountId: string | null; // String
    updatedAt: NexusGenScalars['DateTime'] | null; // DateTime
  }
}

export interface NexusGenFieldTypeNames {
  Account: { // field return type name
    createdAt: 'DateTime'
    email: 'EmailAddress'
    id: 'String'
    updatedAt: 'DateTime'
    user: 'User'
    verifiedAt: 'DateTime'
  }
  AccountsList: { // field return type name
    accounts: 'Account'
  }
  BooleanResult: { // field return type name
    success: 'Boolean'
  }
  IndividualOperator: { // field return type name
    acceptedSpecieOptionsIds: 'String'
    account: 'Account'
    accountId: 'ID'
    birthDate: 'Date'
    calendarUpdate: 'DateTime'
    createdAt: 'DateTime'
    description: 'String'
    genderOptionId: 'String'
    hostingOptionId: 'String'
    id: 'String'
    languageOptionIds: 'String'
    mainMediaId: 'String'
    medias: 'Media'
    ownAnimalsSpecieOptionsIds: 'String'
    partnerId: 'String'
    partnerPercentage: 'Int'
    stripeAccountId: 'String'
    updatedAt: 'DateTime'
  }
  InvalidArgument: { // field return type name
    key: 'String'
    message: 'String'
  }
  InvalidArgumentsError: { // field return type name
    code: 'ErrorCode'
    invalidArguments: 'InvalidArgument'
    message: 'ErrorMessage'
  }
  IsActiveOperatorMainMediaError: { // field return type name
    activeOperatorMainMediaError: 'String'
  }
  IsActiveOperatorWithNoReplacementMediaError: { // field return type name
    activeOperatorWithNoReplacementMediaError: 'String'
  }
  MediasList: { // field return type name
    medias: 'Media'
  }
  Mutation: { // field return type name
    createAccount: 'CreateAccountResult'
    createIndividualOperator: 'CreateIndividualOperatorResult'
    createMedia: 'CreateMediaResult'
    deleteAccount: 'DeleteAccountResult'
    deleteMedia: 'DeleteMediaResult'
    lostPassword: 'LostPasswordResult'
    modifyEmail: 'ModifyEmailResult'
    modifyPassword: 'ModifyPasswordResult'
    resetPassword: 'ResetPasswordResult'
    sendVerificationEmail: 'SendVerificationEmailResult'
    signIn: 'SignInResult'
    signOut: 'SignOutResult'
    updateIndividualOperator: 'IndividualOperatorResult'
    verifyUser: 'VerifyUserResult'
  }
  NotFoundError: { // field return type name
    code: 'ErrorCode'
    message: 'ErrorMessage'
  }
  OperatorMedia: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    mediaType: 'MediaType'
    operator: 'Operator'
    operatorId: 'ID'
    storeUrl: 'URL'
    updatedAt: 'DateTime'
  }
  Query: { // field return type name
    accountById: 'AccountByIdResult'
    allAccounts: 'AllAccountsResult'
    allUsers: 'AllUsersResult'
    currentAccount: 'CurrentAccountResult'
    currentOperatorMedia: 'CurrentOperatorMediaResult'
    currentUserMedia: 'CurrentUserMediaResult'
    mediaById: 'MediaByIdResult'
    medias: 'MediasResult'
    userById: 'UserByIdResult'
  }
  SharedMedia: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    mediaType: 'MediaType'
    operator: 'Operator'
    operatorId: 'ID'
    storeUrl: 'URL'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'ID'
  }
  StorageInfos: { // field return type name
    signedRequest: 'String'
    url: 'String'
  }
  UnableToProcessError: { // field return type name
    code: 'ErrorCode'
    message: 'ErrorMessage'
  }
  User: { // field return type name
    accountId: 'ID'
    createdAt: 'DateTime'
    firstName: 'String'
    id: 'String'
    lastName: 'String'
    updatedAt: 'DateTime'
  }
  UserAuthenticationError: { // field return type name
    code: 'ErrorCode'
    message: 'ErrorMessage'
  }
  UserForbiddenError: { // field return type name
    code: 'ErrorCode'
    message: 'ErrorMessage'
  }
  UserMedia: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    mediaType: 'MediaType'
    storeUrl: 'URL'
    updatedAt: 'DateTime'
    user: 'User'
    userId: 'ID'
  }
  UsersList: { // field return type name
    users: 'User'
  }
  Actor: { // field return type name
    accountId: 'ID'
    createdAt: 'DateTime'
    id: 'String'
    updatedAt: 'DateTime'
  }
  Media: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    mediaType: 'MediaType'
    storeUrl: 'URL'
    updatedAt: 'DateTime'
  }
  Node: { // field return type name
    createdAt: 'DateTime'
    id: 'String'
    updatedAt: 'DateTime'
  }
  Operator: { // field return type name
    acceptedSpecieOptionsIds: 'String'
    accountId: 'ID'
    calendarUpdate: 'DateTime'
    createdAt: 'DateTime'
    description: 'String'
    hostingOptionId: 'String'
    id: 'String'
    languageOptionIds: 'String'
    mainMediaId: 'String'
    ownAnimalsSpecieOptionsIds: 'String'
    partnerId: 'String'
    partnerPercentage: 'Int'
    stripeAccountId: 'String'
    updatedAt: 'DateTime'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createAccount: { // args
      input: NexusGenInputs['CreateAccountInput']; // CreateAccountInput!
    }
    createIndividualOperator: { // args
      input: NexusGenInputs['CreateIndividualOperatorInput']; // CreateIndividualOperatorInput!
    }
    createMedia: { // args
      input: NexusGenInputs['CreateMediaInput']; // CreateMediaInput!
    }
    deleteAccount: { // args
      confirmPassword: string; // String!
    }
    deleteMedia: { // args
      mediaId: string; // ID!
    }
    lostPassword: { // args
      email: string; // String!
    }
    modifyEmail: { // args
      email: string; // String!
    }
    modifyPassword: { // args
      newPassword: string; // String!
      password: string; // String!
    }
    resetPassword: { // args
      input: NexusGenInputs['ResetPasswordInput']; // ResetPasswordInput!
    }
    sendVerificationEmail: { // args
      email: string; // String!
    }
    signIn: { // args
      input: NexusGenInputs['EmailAndPasswordInput']; // EmailAndPasswordInput!
    }
    updateIndividualOperator: { // args
      input: NexusGenInputs['CreateIndividualOperatorInput']; // CreateIndividualOperatorInput!
    }
    verifyUser: { // args
      input: NexusGenInputs['VerifyUserInput']; // VerifyUserInput!
    }
  }
  Query: {
    accountById: { // args
      id: string; // ID!
    }
    mediaById: { // args
      id: string; // ID!
    }
    userById: { // args
      id: string; // ID!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
  AccountByIdResult: "Account" | "InvalidArgumentsError" | "NotFoundError" | "UserAuthenticationError" | "UserForbiddenError"
  AccountResult: "Account" | "InvalidArgumentsError" | "NotFoundError" | "UnableToProcessError" | "UserAuthenticationError" | "UserForbiddenError"
  AllAccountsResult: "AccountsList" | "UnableToProcessError" | "UserAuthenticationError" | "UserForbiddenError"
  AllUsersResult: "UnableToProcessError" | "UserAuthenticationError" | "UserForbiddenError" | "UsersList"
  CreateAccountResult: "Account" | "InvalidArgumentsError" | "UnableToProcessError"
  CreateIndividualOperatorResult: "IndividualOperator" | "InvalidArgumentsError" | "UnableToProcessError"
  CreateMediaResult: "InvalidArgumentsError" | "StorageInfos" | "UnableToProcessError" | "UserAuthenticationError"
  CurrentAccountResult: "Account" | "NotFoundError" | "UserAuthenticationError" | "UserForbiddenError"
  CurrentOperatorMediaResult: "NotFoundError" | "OperatorMedia" | "SharedMedia" | "UserAuthenticationError" | "UserForbiddenError"
  CurrentUserMediaResult: "NotFoundError" | "SharedMedia" | "UserAuthenticationError" | "UserForbiddenError" | "UserMedia"
  DeleteAccountResult: "BooleanResult" | "InvalidArgumentsError" | "NotFoundError" | "UserAuthenticationError"
  DeleteMediaResult: "BooleanResult" | "InvalidArgumentsError" | "IsActiveOperatorMainMediaError" | "IsActiveOperatorWithNoReplacementMediaError" | "NotFoundError" | "UnableToProcessError" | "UserAuthenticationError"
  IndividualOperatorResult: "IndividualOperator" | "InvalidArgumentsError" | "NotFoundError" | "UnableToProcessError" | "UserAuthenticationError" | "UserForbiddenError"
  LostPasswordResult: "BooleanResult" | "NotFoundError"
  MediaByIdResult: "InvalidArgumentsError" | "NotFoundError" | "OperatorMedia" | "SharedMedia" | "UserAuthenticationError" | "UserForbiddenError" | "UserMedia"
  MediasResult: "MediasList" | "UnableToProcessError" | "UserAuthenticationError" | "UserForbiddenError"
  ModifyEmailResult: "Account" | "InvalidArgumentsError" | "UnableToProcessError" | "UserAuthenticationError"
  ModifyPasswordResult: "Account" | "InvalidArgumentsError" | "NotFoundError" | "UserAuthenticationError"
  ResetPasswordResult: "BooleanResult" | "InvalidArgumentsError" | "UnableToProcessError"
  SendVerificationEmailResult: "BooleanResult" | "InvalidArgumentsError" | "NotFoundError" | "UnableToProcessError"
  SignInResult: "Account" | "InvalidArgumentsError" | "NotFoundError" | "UnableToProcessError"
  SignOutResult: "BooleanResult" | "UserAuthenticationError"
  UpdateIndividualOperatorResult: "IndividualOperator" | "InvalidArgumentsError" | "NotFoundError" | "UnableToProcessError"
  UserByIdResult: "InvalidArgumentsError" | "NotFoundError" | "User" | "UserAuthenticationError" | "UserForbiddenError"
  VerifyUserResult: "BooleanResult" | "InvalidArgumentsError" | "NotFoundError" | "UnableToProcessError"
  Actor: "IndividualOperator" | "User"
  Media: "OperatorMedia" | "SharedMedia" | "UserMedia"
  Node: "Account" | "IndividualOperator" | "OperatorMedia" | "SharedMedia" | "User" | "UserMedia"
  Operator: "IndividualOperator"
}

export interface NexusGenTypeInterfaces {
  Account: "Node"
  IndividualOperator: "Actor" | "Node" | "Operator"
  OperatorMedia: "Media" | "Node"
  SharedMedia: "Media" | "Node"
  User: "Actor" | "Node"
  UserMedia: "Media" | "Node"
  Actor: "Node"
  Media: "Node"
  Operator: "Actor" | "Node"
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = keyof NexusGenInterfaces;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = keyof NexusGenUnions;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = "Account" | "AccountsList" | "BooleanResult" | "IndividualOperator" | "InvalidArgumentsError" | "IsActiveOperatorMainMediaError" | "IsActiveOperatorWithNoReplacementMediaError" | "MediasList" | "NotFoundError" | "OperatorMedia" | "SharedMedia" | "StorageInfos" | "UnableToProcessError" | "User" | "UserAuthenticationError" | "UserForbiddenError" | "UserMedia" | "UsersList";

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: true
    __typename: false
    resolveType: false
  }
}

export interface NexusGenTypes {
  context: ApiContext;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Validation for an individual field. Returning "undefined"
     * or "Promise<undefined>" means the field can be accessed.
     * Returning InvalidArgumentsError or "Promise<InvalidArgumentsError>" will prevent the resolver from executing.
     */
    validation?: FieldValidationResolver<TypeName, FieldName>
    /**
     * Authorization for an individual field. Returning "undefined"
     * or "Promise<undefined>" means the field can be accessed.
     * Returning "UserAuthenticationError" will prevent the resolver from executing.
     */
    authorization?: FieldAuthorizationResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}