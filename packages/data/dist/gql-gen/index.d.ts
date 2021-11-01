import * as Apollo from '@apollo/client';
export declare type Maybe<T> = T | null;
export declare type Exact<T extends {
    [key: string]: unknown;
}> = {
    [K in keyof T]: T[K];
};
export declare type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export declare type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    /** A date string, such as 2007-12-03, compliant with the `full-date` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    Date: Date;
    /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
    DateTime: Date;
    /** A field whose value conforms to the standard internet email address format as specified in RFC822: https://www.w3.org/Protocols/rfc822/. */
    EmailAddress: string;
    /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
    JSON: string;
    /** A field whose value is a JSON Web Token (JWT): https://jwt.io/introduction. */
    JWT: string;
    /** A field whose value is a valid decimal degrees latitude number (53.471): https://en.wikipedia.org/wiki/Latitude */
    Latitude: number;
    /** A field whose value is a valid decimal degrees longitude number (53.471): https://en.wikipedia.org/wiki/Longitude */
    Longitude: any;
    /** Floats that will have a value greater than 0. */
    PositiveFloat: number;
    /** A field whose value must be either: user, operator, staff */
    SaveAsValue: string;
    /** A field whose value must be either: USER, OPERATOR */
    SourceValue: string;
    /** A field whose value conforms to the standard URL format as specified in RFC3986: https://www.ietf.org/rfc/rfc3986.txt. */
    URL: string;
};
export declare type Account = Node & {
    __typename: 'Account';
    createdAt?: Maybe<Scalars['DateTime']>;
    email?: Maybe<Scalars['EmailAddress']>;
    /** GUID for a resource */
    id: Scalars['String'];
    operator?: Maybe<IndividualOperator>;
    staff?: Maybe<Staff>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    user?: Maybe<User>;
    verifiedAt?: Maybe<Scalars['DateTime']>;
};
/** The result of the accountById query */
export declare type AccountByIdResult = Account | InvalidArgumentsError | NotFoundError | UserAuthenticationError | UserForbiddenError;
/** Return an account or account related errors */
export declare type AccountResult = Account | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
/** List of accounts */
export declare type AccountsList = {
    __typename: 'AccountsList';
    accounts?: Maybe<Array<Maybe<Account>>>;
};
/** Represent the minimal fields required for any actors */
export declare type Actor = {
    accountId?: Maybe<Scalars['ID']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type AdByIdResult = BookingAd | InvalidArgumentsError | NotFoundError;
/** The result of the accounts query */
export declare type AllAccountsResult = AccountsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type AllOperatorsResult = Operators | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
/** The result of the allStaffs query */
export declare type AllStaffsResult = StaffsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
/** The result of the allUsers query */
export declare type AllUsersResult = UnableToProcessError | UserAuthenticationError | UserForbiddenError | UsersList;
export declare type AuthorizePaymentResult = AuthorizedPayment | InvalidOperatorError | NotFoundError | OperatorCannotProcessPaymentsError | UnableToProcessError | UserAuthenticationError;
export declare type AuthorizedPayment = {
    __typename: 'AuthorizedPayment';
    clientSecret?: Maybe<Scalars['String']>;
    hadRef?: Maybe<Scalars['Boolean']>;
    stripeTargetApi?: Maybe<Scalars['String']>;
};
export declare type BidForBookingAdResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type Booking = Node & {
    __typename: 'Booking';
    animals?: Maybe<Array<Maybe<BookingAnimal>>>;
    animalsIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
    applicationFeeAmount?: Maybe<Scalars['PositiveFloat']>;
    canceled?: Maybe<Scalars['Boolean']>;
    canceledBy?: Maybe<Scalars['String']>;
    canceledReason?: Maybe<Scalars['String']>;
    claims?: Maybe<Array<Maybe<Claim>>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    endDate?: Maybe<Scalars['Date']>;
    /** GUID for a resource */
    id: Scalars['String'];
    messages?: Maybe<Array<Maybe<BookingMessage>>>;
    operator?: Maybe<IndividualOperator>;
    operatorConfirmationDate?: Maybe<Scalars['DateTime']>;
    ownerConfirmationDate?: Maybe<Scalars['DateTime']>;
    paid?: Maybe<Scalars['Boolean']>;
    payment?: Maybe<StripePayment>;
    priceWithOutApplicationFee?: Maybe<Scalars['PositiveFloat']>;
    reviews?: Maybe<Array<Maybe<Review>>>;
    selectedOptions?: Maybe<Scalars['JSON']>;
    service?: Maybe<ServiceOption>;
    startDate?: Maybe<Scalars['Date']>;
    status?: Maybe<BookingStatus>;
    underReview?: Maybe<Scalars['Boolean']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    user?: Maybe<User>;
};
export declare type BookingAd = Node & {
    __typename: 'BookingAd';
    animals?: Maybe<Array<Maybe<SpecieOption>>>;
    animalsSpeciesIds: Array<Scalars['String']>;
    bidders?: Maybe<Array<Maybe<IndividualOperator>>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    description?: Maybe<Scalars['String']>;
    endDate?: Maybe<Scalars['Date']>;
    /** GUID for a resource */
    id: Scalars['String'];
    location?: Maybe<Location>;
    service?: Maybe<ServiceOption>;
    serviceMaxPrice?: Maybe<Scalars['Float']>;
    serviceOptionId: Scalars['String'];
    startDate?: Maybe<Scalars['Date']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    user?: Maybe<User>;
};
export declare type BookingAdBid = Node & {
    __typename: 'BookingAdBid';
    bookingAd?: Maybe<BookingAd>;
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    operator?: Maybe<Operator>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type BookingAdBids = {
    __typename: 'BookingAdBids';
    bids?: Maybe<Array<Maybe<BookingAdBid>>>;
};
export declare type BookingAds = {
    __typename: 'BookingAds';
    bookingAds?: Maybe<Array<Maybe<BookingAd>>>;
};
export declare type BookingAnimal = Node & {
    __typename: 'BookingAnimal';
    bookingId: Scalars['ID'];
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    specie?: Maybe<SpecieOption>;
    specieOptionId: Scalars['ID'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type BookingByIdResult = Booking | InvalidArgumentsError | NotFoundError;
export declare type BookingMessage = {
    booking?: Maybe<Booking>;
    bookingId: Scalars['ID'];
    content: Scalars['String'];
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    medias?: Maybe<Array<Maybe<Media>>>;
    readAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
/** The result of the bookingMessageById query */
export declare type BookingMessageByIdResult = InvalidArgumentsError | NotFoundError | OperatorBookingMessage | UserAuthenticationError | UserBookingMessage | UserForbiddenError;
export declare type BookingMessageSubscriptionResult = OperatorBookingMessage | UserAuthenticationError | UserBookingMessage | UserForbiddenError;
export declare type BookingPayment = StripePayment;
/** The booking different possible status */
export declare enum BookingStatus {
    BothConfirmed = "BOTH_CONFIRMED",
    Canceled = "CANCELED",
    NoneConfirmed = "NONE_CONFIRMED",
    Paid = "PAID",
    PaymentAuthorized = "PAYMENT_AUTHORIZED",
    PendingOwnerValidation = "PENDING_OWNER_VALIDATION",
    PendingSitterValidation = "PENDING_SITTER_VALIDATION",
    UnderReview = "UNDER_REVIEW"
}
export declare type BookingSubscriptionResult = Booking | UserAuthenticationError | UserForbiddenError;
export declare type BookingWithPaymentStatusInput = {
    paymentStatus?: Maybe<Scalars['String']>;
    underReview?: Maybe<Scalars['Boolean']>;
};
export declare type BookingWithPaymentStatusResult = BookingsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
/** List of bookings */
export declare type BookingsList = {
    __typename: 'BookingsList';
    bookings?: Maybe<Array<Maybe<Booking>>>;
};
export declare type BookingsResult = BookingsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type BooleanResult = {
    __typename: 'BooleanResult';
    success?: Maybe<Scalars['Boolean']>;
};
export declare type CancelBookingInput = {
    canceledReason?: Maybe<Scalars['String']>;
    id: Scalars['ID'];
    source: Scalars['SourceValue'];
};
export declare type CancelBookingResult = Booking | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;
export declare type CancelOnGoingBookingInput = {
    canceledReason: Scalars['String'];
    id: Scalars['ID'];
    source: Scalars['SourceValue'];
};
export declare type CancelOnGoingBookingResult = Booking | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;
export declare type CannotBookHimSelfError = {
    __typename: 'CannotBookHimSelfError';
    cannotBookHimSelfError?: Maybe<Scalars['String']>;
};
export declare type ChargesNotEnabledProcessorAccountError = {
    __typename: 'ChargesNotEnabledProcessorAccountError';
    chargesNotEnabledProcessorAccountError?: Maybe<Scalars['String']>;
};
export declare type Claim = Node & {
    __typename: 'Claim';
    booking?: Maybe<Booking>;
    bookingId: Scalars['ID'];
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    operator?: Maybe<IndividualOperator>;
    reason: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    user?: Maybe<User>;
};
export declare type ClaimByIdResult = Claim | NotFoundError | UserAuthenticationError | UserForbiddenError;
/** List of booking messages */
export declare type ClaimsList = {
    __typename: 'ClaimsList';
    claims?: Maybe<Array<Maybe<Claim>>>;
};
/** The result of the bookingMessages query */
export declare type ClaimsResult = ClaimsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type ConfirmBookingInput = {
    id: Scalars['ID'];
    source: Scalars['SourceValue'];
};
export declare type ConfirmBookingResult = Booking | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;
export declare type ConnectOperatorToProccessorResult = {
    __typename: 'ConnectOperatorToProccessorResult';
    redirectUrl?: Maybe<Scalars['String']>;
};
export declare type CreateAccountInput = {
    email: Scalars['EmailAddress'];
    firstName: Scalars['String'];
    originUrl?: Maybe<Scalars['String']>;
    password: Scalars['String'];
};
/** The result of the createAccount mutation */
export declare type CreateAccountResult = Account | InvalidArgumentsError | UnableToProcessError;
export declare type CreateBookingAdInput = {
    animalsSpeciesIds: Array<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    endDate: Scalars['String'];
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
    serviceMaxPrice?: Maybe<Scalars['Float']>;
    serviceOptionId: Scalars['String'];
    startDate: Scalars['String'];
};
export declare type CreateBookingAdResult = BookingAd | InvalidArgumentsError | PreExistingUserAdError | UnableToProcessError | UserAuthenticationError;
export declare type CreateBookingClaimInput = {
    bookingId: Scalars['String'];
    operatorId: Scalars['ID'];
    reason: Scalars['String'];
    userId: Scalars['ID'];
};
export declare type CreateBookingClaimResult = Claim | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError;
export declare type CreateBookingInput = {
    animalsIds: Array<Scalars['String']>;
    endDate: Scalars['String'];
    message?: Maybe<Scalars['String']>;
    operatorId: Scalars['ID'];
    selectedOptions?: Maybe<Array<Maybe<Scalars['JSON']>>>;
    serviceOptionId: Scalars['ID'];
    startDate: Scalars['String'];
};
export declare type CreateBookingResult = Booking | CannotBookHimSelfError | ExistingBookingError | InvalidArgumentsError | NotFoundError | NotSupportedExtraServiceError | UnableToProcessError | UserAuthenticationError;
export declare type CreateDonationReceiptInput = {
    amountDonated: Scalars['Float'];
    donationsIds: Array<Maybe<Scalars['ID']>>;
    filesUrls: Array<Maybe<Scalars['URL']>>;
    partnerId: Scalars['ID'];
};
export declare type CreateDonationReceiptResult = DonationReceipt | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type CreateGenderOptionInput = {
    nameEn: Scalars['String'];
    nameFr: Scalars['String'];
};
export declare type CreateGenderOptionResult = GenderOption | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type CreateHostingOptionInput = {
    nameEn: Scalars['String'];
    nameFr: Scalars['String'];
};
export declare type CreateHostingOptionResult = HostingOption | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type CreateIndividualOperatorInput = {
    acceptedSpecieOptionsIds: Array<Scalars['ID']>;
    avatarMediaId?: Maybe<Scalars['ID']>;
    birthDate?: Maybe<Scalars['Date']>;
    description?: Maybe<Scalars['String']>;
    genderOptionId?: Maybe<Scalars['String']>;
    hostingOptionId?: Maybe<Scalars['String']>;
    languageOptionIds: Array<Scalars['ID']>;
    ownAnimalsSpecieOptionsIds: Array<Scalars['ID']>;
    partnerId?: Maybe<Scalars['String']>;
    partnerPercentage?: Maybe<Scalars['Int']>;
    stripeAccountId?: Maybe<Scalars['ID']>;
};
/** The result of the createIndividualOperator mutation */
export declare type CreateIndividualOperatorResult = IndividualOperator | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError;
export declare type CreateInvidualOperatorCoreServicesInput = {
    price: Scalars['Int'];
    serviceOptionId: Scalars['ID'];
};
export declare type CreateInvidualOperatorCoreServicesResult = BooleanResult | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError;
export declare type CreateInvidualOperatorExtraServicesResult = BooleanResult | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError;
export declare type CreateLanguageOptionInput = {
    mediaId: Scalars['String'];
    nameEn: Scalars['String'];
    nameFr: Scalars['String'];
};
export declare type CreateLanguageOptionResult = InvalidArgumentsError | LanguageOption | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type CreateMediaInput = {
    fileName: Scalars['String'];
    fileType: Scalars['String'];
    saveAs: Scalars['String'];
};
export declare type CreateMediaResult = InvalidArgumentsError | StorageInfos | UnableToProcessError | UserAuthenticationError;
export declare type CreateMessageInput = {
    bookingId: Scalars['String'];
    content: Scalars['String'];
    saveAs: Scalars['SaveAsValue'];
};
export declare type CreateMessageResult = InvalidArgumentsError | OperatorBookingMessage | StaffBookingMessage | UnableToProcessError | UserAuthenticationError | UserBookingMessage;
export declare type CreateOperatorAvailabilityInput = {
    dates: Array<Scalars['Date']>;
};
export declare type CreateOperatorAvailabilityResult = BooleanResult | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError;
export declare type CreatePartnerInput = {
    description: Scalars['String'];
    name: Scalars['String'];
    storeUrls: Array<Scalars['String']>;
    websiteUrl: Scalars['String'];
};
export declare type CreatePartnerResult = InvalidArgumentsError | Partner | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type CreateReviewInput = {
    body?: Maybe<Scalars['String']>;
    bookingId: Scalars['String'];
    saveAs: Scalars['String'];
    score: Scalars['PositiveFloat'];
    title: Scalars['String'];
};
export declare type CreateReviewResult = InvalidArgumentsError | OperatorReview | UnableToProcessError | UserAuthenticationError | UserReview;
export declare type CreateServiceOptionInput = {
    nameEn: Scalars['String'];
    nameFr: Scalars['String'];
};
export declare type CreateServiceOptionResult = InvalidArgumentsError | ServiceOption | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type CreateSpecieOptionInput = {
    nameEn: Scalars['String'];
    nameFr: Scalars['String'];
};
export declare type CreateSpecieOptionResult = InvalidArgumentsError | SpecieOption | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type CreateStaffAccountInput = {
    email: Scalars['EmailAddress'];
    password: Scalars['String'];
    phoneNumber: Scalars['String'];
};
/** The result of the createStaffAccount mutation */
export declare type CreateStaffAccountResult = Account | InvalidArgumentsError | UnableToProcessError;
export declare type CronStatus = {
    __typename: 'CronStatus';
    status?: Maybe<Scalars['String']>;
};
export declare type CronSubscriptionsResult = BooleanResult | UserAuthenticationError | UserForbiddenError;
/** The result of the currentAccount query */
export declare type CurrentAccountResult = Account | NotFoundError | UserAuthenticationError;
export declare type CurrentOperatorDonationsResult = DonationsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
/** The result of the currentOperatorMedia query */
export declare type CurrentOperatorMediaResult = NotFoundError | OperatorMedia | SharedMedia | UserAuthenticationError | UserForbiddenError;
export declare type CurrentOperatorResult = IndividualOperator | NotFoundError | UserAuthenticationError | UserForbiddenError;
export declare type CurrentStaffResult = NotFoundError | Staff | UserAuthenticationError | UserForbiddenError;
export declare type CurrentUserAdsResult = BookingAds | UnableToProcessError;
export declare type CurrentUserAndOperatorBookingsResult = BookingsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type CurrentUserBidsResult = BookingAdBids | UnableToProcessError;
export declare type CurrentUserBookingFilterInput = {
    endDate?: Maybe<Scalars['Date']>;
    includeFinished?: Maybe<Scalars['Boolean']>;
    serviceOptionId?: Maybe<Scalars['ID']>;
    sortKey?: Maybe<Scalars['String']>;
    sortValue?: Maybe<Scalars['String']>;
    startDate?: Maybe<Scalars['Date']>;
};
export declare type CurrentUserBookingsResult = BookingsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
/** The result of the currentUserMedia query */
export declare type CurrentUserMediaResult = NotFoundError | SharedMedia | UserAuthenticationError | UserForbiddenError | UserMedia;
/** The result of the deleteAccount mutation */
export declare type DeleteAccountResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;
export declare type DeleteBookingAdResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
/** The result of the deleteClaim mutation */
export declare type DeleteClaimResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;
export declare type DeleteDonationReceiptResult = BooleanResult | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type DeleteGenderOptionResult = BooleanResult | InvalidArgumentsError | NotFoundError | UserAuthenticationError | UserForbiddenError;
export declare type DeleteHostingOptionResult = BooleanResult | InvalidArgumentsError | NotFoundError | UserAuthenticationError | UserForbiddenError;
export declare type DeleteInvidualOperatorCoreServicesResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;
export declare type DeleteInvidualOperatorExtraServicesResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;
export declare type DeleteLanguageOptionResult = BooleanResult | InvalidArgumentsError | NotFoundError | UserAuthenticationError | UserForbiddenError;
/** The result of the deleteMedia mutation */
export declare type DeleteMediaResult = BooleanResult | InvalidArgumentsError | IsActiveOperatorMainMediaError | IsActiveOperatorWithNoReplacementMediaError | NotFoundError | UnableToProcessError | UserAuthenticationError;
/** The result of the deleteMessage mutation */
export declare type DeleteMessageResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;
export declare type DeleteOperatorAvailabilityResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;
export declare type DeletePartnerResult = BooleanResult | UserAuthenticationError | UserForbiddenError;
/** The result of the deleteReview mutation */
export declare type DeleteReviewResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;
export declare type DeleteServiceOptionResult = BooleanResult | InvalidArgumentsError | NotFoundError | UserAuthenticationError | UserForbiddenError;
export declare type DeleteSpecieOptionResult = BooleanResult | InvalidArgumentsError | NotFoundError | UserAuthenticationError | UserForbiddenError;
export declare type DetailsNotSubmittedProcessorAccountError = {
    __typename: 'DetailsNotSubmittedProcessorAccountError';
    detailsNotSubmittedProcessorAccountError?: Maybe<Scalars['String']>;
};
export declare type Donation = Node & {
    __typename: 'Donation';
    amountToDonate?: Maybe<Scalars['PositiveFloat']>;
    booking?: Maybe<Booking>;
    createdAt?: Maybe<Scalars['DateTime']>;
    donationDate?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    operator?: Maybe<IndividualOperator>;
    partner?: Maybe<Partner>;
    partnerId: Scalars['ID'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type DonationByIdResult = Donation | InvalidArgumentsError | NotFoundError;
export declare type DonationReceipt = Node & {
    __typename: 'DonationReceipt';
    amountDonated?: Maybe<Scalars['PositiveFloat']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    donations?: Maybe<Array<Maybe<Donation>>>;
    files?: Maybe<Array<Maybe<Media>>>;
    /** GUID for a resource */
    id: Scalars['String'];
    partner?: Maybe<Partner>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type DonationReceiptByIdResult = DonationReceipt | InvalidArgumentsError | NotFoundError;
export declare type DonationReceiptMedia = Media & Node & {
    __typename: 'DonationReceiptMedia';
    createdAt?: Maybe<Scalars['DateTime']>;
    donationReceipt?: Maybe<DonationReceipt>;
    donationReceiptId?: Maybe<Scalars['ID']>;
    /** GUID for a resource */
    id: Scalars['String'];
    mediaType?: Maybe<MediaType>;
    storeUrl: Scalars['URL'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
/** List of DonationReceipts */
export declare type DonationReceiptsList = {
    __typename: 'DonationReceiptsList';
    donationReceipts?: Maybe<Array<Maybe<DonationReceipt>>>;
};
/** The result of the gendersOptions query */
export declare type DonationReceiptsResult = DonationReceiptsList | UnableToProcessError;
/** List of donations */
export declare type DonationsList = {
    __typename: 'DonationsList';
    donations?: Maybe<Array<Maybe<Donation>>>;
};
/** The result of the donations query */
export declare type DonationsResult = DonationsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type EmailAndPasswordInput = {
    email: Scalars['EmailAddress'];
    password: Scalars['String'];
};
/** The differents error codes the api will return if needed */
export declare enum ErrorCode {
    BadRequest = "BAD_REQUEST",
    Forbidden = "FORBIDDEN",
    NotFound = "NOT_FOUND",
    UnableToProcess = "UNABLE_TO_PROCESS",
    Unauthorized = "UNAUTHORIZED"
}
/** The differents error message the api will return if needed */
export declare enum ErrorMessage {
    ForbiddenYouDoNotHaveAccessToThisResource = "FORBIDDEN_YOU_DO_NOT_HAVE_ACCESS_TO_THIS_RESOURCE",
    ResourceNotFound = "RESOURCE_NOT_FOUND",
    UnableToProcessRequestDueToClientError = "UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR",
    UnableToProcessRequestDueToServerError = "UNABLE_TO_PROCESS_REQUEST_DUE_TO_SERVER_ERROR",
    UnauthenticatedPleaseLogin = "UNAUTHENTICATED_PLEASE_LOGIN"
}
export declare type ExistingBookingError = {
    __typename: 'ExistingBookingError';
    existingBookingError?: Maybe<Scalars['String']>;
};
export declare type GenderOption = Node & {
    __typename: 'GenderOption';
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    nameEn: Scalars['String'];
    nameFr: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
/** The result of the genderOptionById query */
export declare type GenderOptionByIdResult = GenderOption | InvalidArgumentsError | NotFoundError;
/** List of genderOptions */
export declare type GenderOptionsList = {
    __typename: 'GenderOptionsList';
    genderOptions?: Maybe<Array<Maybe<GenderOption>>>;
};
/** The result of the gendersOptions query */
export declare type GenderOptionsResult = GenderOptionsList | UnableToProcessError;
export declare type GetCronStatusResult = CronStatus | UserAuthenticationError | UserForbiddenError;
export declare type HostingOption = Node & {
    __typename: 'HostingOption';
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    nameEn: Scalars['String'];
    nameFr: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
/** The result of the hostingOptionById query */
export declare type HostingOptionByIdResult = Account | InvalidArgumentsError | NotFoundError;
/** List of HostingOptions */
export declare type HostingOptionsList = {
    __typename: 'HostingOptionsList';
    hostingOptions?: Maybe<Array<Maybe<HostingOption>>>;
};
/** The result of the hostingsOptions query */
export declare type HostingOptionsResult = HostingOptionsList | UnableToProcessError;
export declare type IndividualOperator = Actor & Node & Operator & {
    __typename: 'IndividualOperator';
    acceptedSpecieOptionsIds?: Maybe<Array<Maybe<Scalars['String']>>>;
    account?: Maybe<Account>;
    accountId?: Maybe<Scalars['ID']>;
    availabilities?: Maybe<Array<Maybe<OperatorAvailability>>>;
    avatar?: Maybe<Media>;
    avatarMediaId?: Maybe<Scalars['String']>;
    averageResponseTime?: Maybe<Scalars['DateTime']>;
    averageScore?: Maybe<Scalars['Float']>;
    bids?: Maybe<Array<Maybe<BookingAdBid>>>;
    birthDate?: Maybe<Scalars['Date']>;
    calendarUpdate?: Maybe<Scalars['DateTime']>;
    coreServices?: Maybe<Array<Maybe<IndividualOperatorCoreService>>>;
    createdAt?: Maybe<Scalars['DateTime']>;
    description?: Maybe<Scalars['String']>;
    donations?: Maybe<Array<Maybe<Donation>>>;
    extraServices?: Maybe<IndividualOperatorExtraService>;
    gender?: Maybe<GenderOption>;
    genderOptionId?: Maybe<Scalars['ID']>;
    hosting?: Maybe<HostingOption>;
    hostingOptionId?: Maybe<Scalars['String']>;
    /** GUID for a resource */
    id: Scalars['String'];
    isActive?: Maybe<Scalars['Boolean']>;
    languageOptionIds?: Maybe<Array<Maybe<Scalars['String']>>>;
    location?: Maybe<Location>;
    medias?: Maybe<Array<Maybe<Media>>>;
    ownAnimalsSpecieOptionsIds?: Maybe<Array<Maybe<Scalars['String']>>>;
    partner?: Maybe<Partner>;
    partnerId?: Maybe<Scalars['String']>;
    partnerPercentage?: Maybe<Scalars['Int']>;
    reviews?: Maybe<Array<Maybe<Review>>>;
    stripeAccountId?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type IndividualOperatorCoreService = Node & {
    __typename: 'IndividualOperatorCoreService';
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    operator?: Maybe<IndividualOperator>;
    price: Scalars['Int'];
    service?: Maybe<ServiceOption>;
    serviceOptionId: Scalars['ID'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type IndividualOperatorExtraService = Node & {
    __typename: 'IndividualOperatorExtraService';
    abilityToProvideMedicalCare?: Maybe<Scalars['Boolean']>;
    acceptShortNotice?: Maybe<Scalars['Boolean']>;
    atHomeComeGetPet?: Maybe<Scalars['Boolean']>;
    atHomeComeGetPetExtraPrice?: Maybe<Scalars['Int']>;
    atHomeContinuously?: Maybe<Scalars['Boolean']>;
    atHomeContinuouslyExtraPrice?: Maybe<Scalars['Int']>;
    atHomeExclusivity?: Maybe<Scalars['Boolean']>;
    atHomeExclusivityExtraPrice?: Maybe<Scalars['Int']>;
    atHomeOnlyBringPet?: Maybe<Scalars['Boolean']>;
    atHomeOnlyBringPetExtraPrice?: Maybe<Scalars['Int']>;
    atOwnerHomeCurtains?: Maybe<Scalars['Boolean']>;
    atOwnerHomeCurtainsExtraPrice?: Maybe<Scalars['Int']>;
    atOwnerHomeMail?: Maybe<Scalars['Boolean']>;
    atOwnerHomeMailExtraPrice?: Maybe<Scalars['Int']>;
    atOwnerHomePlantsCare?: Maybe<Scalars['Boolean']>;
    atOwnerHomePlantsCareExtraPrice?: Maybe<Scalars['Int']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    flexibleCancelation?: Maybe<Scalars['Boolean']>;
    /** GUID for a resource */
    id: Scalars['String'];
    isProfessionalOperator?: Maybe<Scalars['Boolean']>;
    operator?: Maybe<IndividualOperator>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type InvalidArgument = {
    __typename: 'InvalidArgument';
    key: Scalars['String'];
    message: Scalars['String'];
};
export declare type InvalidArgumentsError = {
    __typename: 'InvalidArgumentsError';
    code: ErrorCode;
    invalidArguments: Array<Maybe<InvalidArgument>>;
    message: ErrorMessage;
};
export declare type InvalidOperatorError = {
    __typename: 'InvalidOperatorError';
    invalidOperatorError?: Maybe<Scalars['String']>;
};
export declare type InvidualOperatorExtraServicesInput = {
    abilityToProvideMedicalCare?: Maybe<Scalars['Boolean']>;
    acceptShortNotice?: Maybe<Scalars['Boolean']>;
    atHomeComeGetPet?: Maybe<Scalars['Boolean']>;
    atHomeComeGetPetExtraPrice?: Maybe<Scalars['Int']>;
    atHomeContinuously?: Maybe<Scalars['Boolean']>;
    atHomeContinuouslyExtraPrice?: Maybe<Scalars['Int']>;
    atHomeExclusivity?: Maybe<Scalars['Boolean']>;
    atHomeExclusivityExtraPrice?: Maybe<Scalars['Int']>;
    atHomeOnlyBringPet?: Maybe<Scalars['Boolean']>;
    atHomeOnlyBringPetExtraPrice?: Maybe<Scalars['Int']>;
    atOwnerHomeCurtains?: Maybe<Scalars['Boolean']>;
    atOwnerHomeCurtainsExtraPrice?: Maybe<Scalars['Int']>;
    atOwnerHomeMail?: Maybe<Scalars['Boolean']>;
    atOwnerHomeMailExtraPrice?: Maybe<Scalars['Int']>;
    atOwnerHomePlantsCare?: Maybe<Scalars['Boolean']>;
    atOwnerHomePlantsCareExtraPrice?: Maybe<Scalars['Int']>;
    flexibleCancelation?: Maybe<Scalars['Boolean']>;
    isProfessionalOperator?: Maybe<Scalars['Boolean']>;
};
export declare type IsActiveOperatorMainMediaError = {
    __typename: 'IsActiveOperatorMainMediaError';
    activeOperatorMainMediaError: Scalars['String'];
};
export declare type IsActiveOperatorWithNoReplacementMediaError = {
    __typename: 'IsActiveOperatorWithNoReplacementMediaError';
    activeOperatorWithNoReplacementMediaError: Scalars['String'];
};
export declare type LanguageOption = Node & {
    __typename: 'LanguageOption';
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    media?: Maybe<Media>;
    nameEn: Scalars['String'];
    nameFr: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
/** The result of the languageOptionById query */
export declare type LanguageOptionByIdResult = InvalidArgumentsError | LanguageOption | NotFoundError;
export declare type LanguageOptionMedia = Media & Node & {
    __typename: 'LanguageOptionMedia';
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    language?: Maybe<LanguageOption>;
    languageOptionId?: Maybe<Scalars['ID']>;
    mediaType?: Maybe<MediaType>;
    storeUrl: Scalars['URL'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
/** List of languageOptions */
export declare type LanguageOptionsList = {
    __typename: 'LanguageOptionsList';
    languageOptions?: Maybe<Array<Maybe<LanguageOption>>>;
};
/** The result of the languagesOptions query */
export declare type LanguageOptionsResult = LanguageOptionsList | UnableToProcessError;
export declare type Location = Node & {
    __typename: 'Location';
    address?: Maybe<Scalars['String']>;
    bookingAd?: Maybe<BookingAd>;
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    country_code?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
    operator?: Maybe<Operator>;
    postcode?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type LocationSearchInfos = {
    __typename: 'LocationSearchInfos';
    city?: Maybe<Scalars['String']>;
    country?: Maybe<Scalars['String']>;
    country_code?: Maybe<Scalars['String']>;
    formattedLocationString?: Maybe<Scalars['String']>;
    id?: Maybe<Scalars['String']>;
    latitude?: Maybe<Scalars['Latitude']>;
    locale_names?: Maybe<Scalars['String']>;
    longitude?: Maybe<Scalars['Longitude']>;
    postcode?: Maybe<Scalars['String']>;
};
export declare type LocationSearchResult = InvalidArgumentsError | LocationsList | UnableToProcessError;
export declare type LocationsList = {
    __typename: 'LocationsList';
    locations?: Maybe<Array<Maybe<LocationSearchInfos>>>;
};
/** The result of the lostPassword mutation */
export declare type LostPasswordResult = BooleanResult | NotFoundError;
/** The minimum required fields for media types */
export declare type Media = {
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    mediaType?: Maybe<MediaType>;
    storeUrl: Scalars['URL'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
/** The result of the mediaById query */
export declare type MediaByIdResult = InvalidArgumentsError | NotFoundError | OperatorMedia | SharedMedia | UserAuthenticationError | UserForbiddenError | UserMedia;
/** Type of media accepted */
export declare enum MediaType {
    Image = "IMAGE",
    Video = "VIDEO"
}
/** List of medias */
export declare type MediasList = {
    __typename: 'MediasList';
    medias?: Maybe<Array<Maybe<Media>>>;
};
/** The result of the medias query */
export declare type MediasResult = MediasList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
/** The minimum required fields for message types */
export declare type Message = {
    content: Scalars['String'];
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    medias?: Maybe<Array<Maybe<Media>>>;
    readAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type MessageMedia = Media & Node & {
    __typename: 'MessageMedia';
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    mediaType?: Maybe<MediaType>;
    message?: Maybe<Message>;
    messageId?: Maybe<Scalars['ID']>;
    storeUrl: Scalars['URL'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
/** The result of the bookingMessages query */
export declare type MessagesByBookingIdResult = InvalidArgumentsError | MessagesList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
/** List of booking messages */
export declare type MessagesList = {
    __typename: 'MessagesList';
    messages?: Maybe<Array<Maybe<Message>>>;
};
/** The result of the bookingMessages query */
export declare type MessagesResult = MessagesList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type MissingProcessorAccountError = {
    __typename: 'MissingProcessorAccountError';
    missingProcessorAccountError?: Maybe<Scalars['String']>;
};
/** The result of the modifyEmail mutation */
export declare type ModifyEmailResult = Account | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;
/** The result of the modifyPassword mutation */
export declare type ModifyPasswordResult = Account | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;
export declare type Mutation = {
    __typename: 'Mutation';
    authorizePayment?: Maybe<AuthorizePaymentResult>;
    bidForBookingAd?: Maybe<BidForBookingAdResult>;
    cancelBooking?: Maybe<CancelBookingResult>;
    cancelOnGoingBooking?: Maybe<CancelOnGoingBookingResult>;
    confirmBooking?: Maybe<ConfirmBookingResult>;
    connectUserToProcessor?: Maybe<ConnectOperatorToProccessorResult>;
    createAccount?: Maybe<CreateAccountResult>;
    createBooking?: Maybe<CreateBookingResult>;
    createBookingAd?: Maybe<CreateBookingAdResult>;
    createBookingClaim?: Maybe<CreateBookingClaimResult>;
    createDonationReceipt?: Maybe<CreateDonationReceiptResult>;
    createGenderOption?: Maybe<CreateGenderOptionResult>;
    createHostingOption?: Maybe<CreateHostingOptionResult>;
    createIndividualOperator?: Maybe<CreateIndividualOperatorResult>;
    createInvidualOperatorCoreServices?: Maybe<CreateInvidualOperatorCoreServicesResult>;
    createInvidualOperatorExtraServices?: Maybe<CreateInvidualOperatorExtraServicesResult>;
    createLanguageOption?: Maybe<CreateLanguageOptionResult>;
    createMedia?: Maybe<CreateMediaResult>;
    createMessage?: Maybe<CreateMessageResult>;
    createOperatorAvailability?: Maybe<CreateOperatorAvailabilityResult>;
    createPartner?: Maybe<CreatePartnerResult>;
    createReview?: Maybe<CreateReviewResult>;
    createServiceOption?: Maybe<CreateServiceOptionResult>;
    createSpecieOption?: Maybe<CreateSpecieOptionResult>;
    createStaffAccount?: Maybe<CreateStaffAccountResult>;
    /** Access restricted to logged in user */
    deleteAccount?: Maybe<DeleteAccountResult>;
    deleteBookingAd?: Maybe<DeleteBookingAdResult>;
    deleteClaim?: Maybe<DeleteClaimResult>;
    deleteCoreIndividualOperatorService?: Maybe<DeleteInvidualOperatorCoreServicesResult>;
    deleteDonationReceipt?: Maybe<DeleteDonationReceiptResult>;
    deleteExtraIndividualOperatorService?: Maybe<DeleteInvidualOperatorExtraServicesResult>;
    deleteGenderOption?: Maybe<DeleteGenderOptionResult>;
    deleteHostingOption?: Maybe<DeleteHostingOptionResult>;
    deleteLanguageOption?: Maybe<DeleteLanguageOptionResult>;
    deleteMedia?: Maybe<DeleteMediaResult>;
    deleteMessage?: Maybe<DeleteMessageResult>;
    deleteOperatorAvailability?: Maybe<DeleteOperatorAvailabilityResult>;
    deletePartner?: Maybe<DeletePartnerResult>;
    deleteReview?: Maybe<DeleteReviewResult>;
    deleteServiceOption?: Maybe<DeleteServiceOptionResult>;
    deleteSpecieOption?: Maybe<DeleteSpecieOptionResult>;
    lostPassword?: Maybe<LostPasswordResult>;
    /** Access restricted to logged in user */
    modifyEmail?: Maybe<ModifyEmailResult>;
    /** Access restricted to logged in user */
    modifyPassword?: Maybe<ModifyPasswordResult>;
    removeBidForBookingAd?: Maybe<RemoveBidForBookingAdResult>;
    resetPassword?: Maybe<ResetPasswordResult>;
    sendVerificationEmail?: Maybe<SendVerificationEmailResult>;
    setAsRead?: Maybe<SetMessagesAsReadResult>;
    setMediaAsAvatar?: Maybe<SetMediaAsAvatarResult>;
    signIn?: Maybe<SignInResult>;
    /** Access restricted to logged in user */
    signOut?: Maybe<SignOutResult>;
    startCron?: Maybe<StartCronResult>;
    stopCron?: Maybe<StopCronResult>;
    updateBookingAd?: Maybe<UpdateBookingAdResult>;
    updateBookingPaymentStatus?: Maybe<UpdateBookingPaymentStatusResult>;
    updateDonationReceipt?: Maybe<UpdateDonationReceiptResult>;
    updateGenderOption?: Maybe<UpdateGenderOptionResult>;
    updateHostingOption?: Maybe<UpdateHostingOptionResult>;
    updateIndividualOperator?: Maybe<UpdateIndividualOperatorResult>;
    updateInvidualOperatorCoreServices?: Maybe<UpdateInvidualOperatorCoreServicesResult>;
    updateInvidualOperatorExtraServices?: Maybe<UpdateInvidualOperatorExtraServicesResult>;
    updateLanguageOption?: Maybe<UpdateLanguageOptionResult>;
    updateMessage?: Maybe<UpdateMessageResult>;
    updatePartner?: Maybe<UpdatePartnerResult>;
    updateReview?: Maybe<UpdateReviewResult>;
    updateServiceOption?: Maybe<UpdateServiceOptionResult>;
    updateSpecieOption?: Maybe<UpdateSpecieOptionResult>;
    verifyUser?: Maybe<VerifyUserResult>;
    verifyUserProcessorConnectionCompletion?: Maybe<VerifyUserProcessorConnectionCompletionResult>;
};
export declare type MutationAuthorizePaymentArgs = {
    id: Scalars['ID'];
};
export declare type MutationBidForBookingAdArgs = {
    id: Scalars['ID'];
};
export declare type MutationCancelBookingArgs = {
    input: CancelBookingInput;
};
export declare type MutationCancelOnGoingBookingArgs = {
    input: CancelOnGoingBookingInput;
};
export declare type MutationConfirmBookingArgs = {
    input: ConfirmBookingInput;
};
export declare type MutationCreateAccountArgs = {
    input: CreateAccountInput;
};
export declare type MutationCreateBookingArgs = {
    input: CreateBookingInput;
};
export declare type MutationCreateBookingAdArgs = {
    input: CreateBookingAdInput;
};
export declare type MutationCreateBookingClaimArgs = {
    input: CreateBookingClaimInput;
};
export declare type MutationCreateDonationReceiptArgs = {
    input: CreateDonationReceiptInput;
};
export declare type MutationCreateGenderOptionArgs = {
    input: CreateGenderOptionInput;
};
export declare type MutationCreateHostingOptionArgs = {
    input: CreateHostingOptionInput;
};
export declare type MutationCreateIndividualOperatorArgs = {
    input: CreateIndividualOperatorInput;
};
export declare type MutationCreateInvidualOperatorCoreServicesArgs = {
    input: CreateInvidualOperatorCoreServicesInput;
};
export declare type MutationCreateInvidualOperatorExtraServicesArgs = {
    input: InvidualOperatorExtraServicesInput;
};
export declare type MutationCreateLanguageOptionArgs = {
    input: CreateLanguageOptionInput;
};
export declare type MutationCreateMediaArgs = {
    input: CreateMediaInput;
};
export declare type MutationCreateMessageArgs = {
    input: CreateMessageInput;
};
export declare type MutationCreateOperatorAvailabilityArgs = {
    input: CreateOperatorAvailabilityInput;
};
export declare type MutationCreatePartnerArgs = {
    input: CreatePartnerInput;
};
export declare type MutationCreateReviewArgs = {
    input: CreateReviewInput;
};
export declare type MutationCreateServiceOptionArgs = {
    input: CreateServiceOptionInput;
};
export declare type MutationCreateSpecieOptionArgs = {
    input: CreateSpecieOptionInput;
};
export declare type MutationCreateStaffAccountArgs = {
    input: CreateStaffAccountInput;
};
export declare type MutationDeleteAccountArgs = {
    confirmPassword: Scalars['String'];
};
export declare type MutationDeleteBookingAdArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteClaimArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteCoreIndividualOperatorServiceArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteDonationReceiptArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteExtraIndividualOperatorServiceArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteGenderOptionArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteHostingOptionArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteLanguageOptionArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteMediaArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteMessageArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteOperatorAvailabilityArgs = {
    ids: Array<Scalars['ID']>;
};
export declare type MutationDeletePartnerArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteReviewArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteServiceOptionArgs = {
    id: Scalars['ID'];
};
export declare type MutationDeleteSpecieOptionArgs = {
    id: Scalars['ID'];
};
export declare type MutationLostPasswordArgs = {
    email: Scalars['String'];
};
export declare type MutationModifyEmailArgs = {
    email: Scalars['String'];
};
export declare type MutationModifyPasswordArgs = {
    newPassword: Scalars['String'];
    password: Scalars['String'];
};
export declare type MutationRemoveBidForBookingAdArgs = {
    id: Scalars['ID'];
};
export declare type MutationResetPasswordArgs = {
    input: ResetPasswordInput;
};
export declare type MutationSendVerificationEmailArgs = {
    email: Scalars['String'];
};
export declare type MutationSetAsReadArgs = {
    input: SetMessagesAsReadInput;
};
export declare type MutationSetMediaAsAvatarArgs = {
    id: Scalars['ID'];
};
export declare type MutationSignInArgs = {
    input: EmailAndPasswordInput;
};
export declare type MutationStartCronArgs = {
    cronName: Scalars['String'];
};
export declare type MutationStopCronArgs = {
    cronName: Scalars['String'];
};
export declare type MutationUpdateBookingAdArgs = {
    id: Scalars['ID'];
    input: UpdateBookingAdInput;
};
export declare type MutationUpdateBookingPaymentStatusArgs = {
    input: UpdateBookingPaymentStatusInput;
};
export declare type MutationUpdateDonationReceiptArgs = {
    input: UpdateDonationReceiptInput;
};
export declare type MutationUpdateGenderOptionArgs = {
    id: Scalars['ID'];
    input: UpdateGenderOptionInput;
};
export declare type MutationUpdateHostingOptionArgs = {
    id: Scalars['ID'];
    input: UpdateHostingOptionInput;
};
export declare type MutationUpdateIndividualOperatorArgs = {
    input: UpdateIndividualOperatorInput;
};
export declare type MutationUpdateInvidualOperatorCoreServicesArgs = {
    input: UpdateInvidualOperatorCoreServicesInput;
};
export declare type MutationUpdateInvidualOperatorExtraServicesArgs = {
    id: Scalars['ID'];
    input: InvidualOperatorExtraServicesInput;
};
export declare type MutationUpdateLanguageOptionArgs = {
    id: Scalars['ID'];
    input: UpdateLanguageOptionInput;
};
export declare type MutationUpdateMessageArgs = {
    id: Scalars['ID'];
    input: UpdateMessageInput;
};
export declare type MutationUpdatePartnerArgs = {
    id: Scalars['ID'];
    input: UpdatePartnerInput;
};
export declare type MutationUpdateReviewArgs = {
    id: Scalars['ID'];
    input: UpdateReviewInput;
    saveAs: Scalars['String'];
};
export declare type MutationUpdateServiceOptionArgs = {
    id: Scalars['ID'];
    input: UpdateServiceOptionInput;
};
export declare type MutationUpdateSpecieOptionArgs = {
    id: Scalars['ID'];
    input: UpdateSpecieOptionInput;
};
export declare type MutationVerifyUserArgs = {
    input: VerifyUserInput;
};
export declare type Node = {
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type NotFoundError = {
    __typename: 'NotFoundError';
    code: ErrorCode;
    message: ErrorMessage;
};
export declare type NotSupportedExtraServiceError = {
    __typename: 'NotSupportedExtraServiceError';
    notSupportedExtraServiceError?: Maybe<Scalars['String']>;
};
/** Represent the required fields of commercial operators on the plateform. */
export declare type Operator = {
    acceptedSpecieOptionsIds?: Maybe<Array<Maybe<Scalars['String']>>>;
    accountId?: Maybe<Scalars['ID']>;
    avatarMediaId?: Maybe<Scalars['String']>;
    calendarUpdate?: Maybe<Scalars['DateTime']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    description?: Maybe<Scalars['String']>;
    hostingOptionId?: Maybe<Scalars['String']>;
    /** GUID for a resource */
    id: Scalars['String'];
    isActive?: Maybe<Scalars['Boolean']>;
    languageOptionIds?: Maybe<Array<Maybe<Scalars['String']>>>;
    ownAnimalsSpecieOptionsIds?: Maybe<Array<Maybe<Scalars['String']>>>;
    partnerId?: Maybe<Scalars['String']>;
    partnerPercentage?: Maybe<Scalars['Int']>;
    stripeAccountId?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type OperatorAvailability = Node & {
    __typename: 'OperatorAvailability';
    createdAt?: Maybe<Scalars['DateTime']>;
    date?: Maybe<Scalars['Date']>;
    /** GUID for a resource */
    id: Scalars['String'];
    operator?: Maybe<IndividualOperator>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type OperatorBookingMessage = BookingMessage & Message & Node & {
    __typename: 'OperatorBookingMessage';
    booking?: Maybe<Booking>;
    bookingId: Scalars['ID'];
    content: Scalars['String'];
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    medias?: Maybe<Array<Maybe<Media>>>;
    operator?: Maybe<IndividualOperator>;
    operatorId: Scalars['ID'];
    readAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type OperatorByIdResult = IndividualOperator | NotFoundError;
export declare type OperatorCannotProcessPaymentsError = {
    __typename: 'OperatorCannotProcessPaymentsError';
    operatorCannotProcessPaymentsError?: Maybe<Scalars['String']>;
};
export declare type OperatorMedia = Media & Node & {
    __typename: 'OperatorMedia';
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    mediaType?: Maybe<MediaType>;
    operator?: Maybe<Operator>;
    operatorId?: Maybe<Scalars['ID']>;
    storeUrl: Scalars['URL'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type OperatorReview = Node & Review & {
    __typename: 'OperatorReview';
    body?: Maybe<Scalars['String']>;
    booking?: Maybe<Booking>;
    bookingId?: Maybe<Scalars['ID']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    operator?: Maybe<Operator>;
    operatorId?: Maybe<Scalars['ID']>;
    score: Scalars['Float'];
    title: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type Operators = {
    __typename: 'Operators';
    operators?: Maybe<Array<Maybe<IndividualOperator>>>;
};
export declare type Partner = Node & {
    __typename: 'Partner';
    createdAt?: Maybe<Scalars['DateTime']>;
    creator?: Maybe<Staff>;
    description: Scalars['String'];
    donations?: Maybe<Array<Maybe<Donation>>>;
    /** GUID for a resource */
    id: Scalars['String'];
    /** Contains the partner logo */
    medias?: Maybe<Array<Maybe<Media>>>;
    name: Scalars['String'];
    receipts?: Maybe<Array<Maybe<DonationReceipt>>>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    websiteUrl: Scalars['String'];
};
export declare type PartnerByIdResult = NotFoundError | Partner;
export declare type PartnerMedia = Media & Node & {
    __typename: 'PartnerMedia';
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    mediaType?: Maybe<MediaType>;
    partner?: Maybe<Partner>;
    partnerId?: Maybe<Scalars['ID']>;
    storeUrl: Scalars['URL'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
/** List of partners */
export declare type PartnersList = {
    __typename: 'PartnersList';
    partners?: Maybe<Array<Maybe<Partner>>>;
};
/** The result of the partners query */
export declare type PartnersResult = PartnersList | UnableToProcessError;
export declare type Payment = {
    bookingId?: Maybe<Scalars['ID']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    status: PaymentStatus;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type PaymentProcessorError = {
    __typename: 'PaymentProcessorError';
    paymentProcessorError?: Maybe<Scalars['String']>;
};
/** All possible payment status */
export declare enum PaymentStatus {
    AuthorizedButCancelled = "AUTHORIZED_BUT_CANCELLED",
    AuthorizedRequireCapture = "AUTHORIZED_REQUIRE_CAPTURE",
    CapturedAndPaid = "CAPTURED_AND_PAID",
    ErrorSendingAuthRequiredMail = "ERROR_SENDING_AUTH_REQUIRED_MAIL",
    ErrorSendingInsufficientFundsMail = "ERROR_SENDING_INSUFFICIENT_FUNDS_MAIL",
    ErrorSendingUnkownErrorMail = "ERROR_SENDING_UNKOWN_ERROR_MAIL",
    FailedCapture = "FAILED_CAPTURE",
    FailedPaymentIntentCreationAuthRequired = "FAILED_PAYMENT_INTENT_CREATION_AUTH_REQUIRED",
    FailedPaymentIntentCreationAuthRequiredMailSent = "FAILED_PAYMENT_INTENT_CREATION_AUTH_REQUIRED_MAIL_SENT",
    FailedPaymentIntentCreationInsufficientFunds = "FAILED_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS",
    FailedPaymentIntentCreationInsufficientFundsMailSent = "FAILED_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS_MAIL_SENT",
    FailedPaymentIntentCreationUnkownError = "FAILED_PAYMENT_INTENT_CREATION_UNKOWN_ERROR",
    FailedPaymentIntentCreationUnkownErrorMailSent = "FAILED_PAYMENT_INTENT_CREATION_UNKOWN_ERROR_MAIL_SENT",
    PendingAuthorization = "PENDING_AUTHORIZATION",
    SetupIntentConfirmedRequiredPaymentIntentCreation = "SETUP_INTENT_CONFIRMED_REQUIRED_PAYMENT_INTENT_CREATION",
    SetupIntentPendingConfirmation = "SETUP_INTENT_PENDING_CONFIRMATION"
}
export declare type PreExistingOperatorBidError = {
    __typename: 'PreExistingOperatorBidError';
    preExistingOperatorBidError?: Maybe<Scalars['String']>;
};
export declare type PreExistingUserAdError = {
    __typename: 'PreExistingUserAdError';
    preExistingUserAdError?: Maybe<Scalars['String']>;
};
export declare type Query = {
    __typename: 'Query';
    /** Access restricted to admin users */
    accountById?: Maybe<AccountByIdResult>;
    adById?: Maybe<AdByIdResult>;
    /** Access restricted to admin users */
    allAccounts?: Maybe<AllAccountsResult>;
    allOperators?: Maybe<AllOperatorsResult>;
    /** Access restricted to Staff Staffs */
    allStaffs?: Maybe<AllStaffsResult>;
    /** Access restricted to admin users */
    allUsers?: Maybe<AllUsersResult>;
    bookingById?: Maybe<BookingByIdResult>;
    /** Access restricted to admin users */
    bookingMessageById?: Maybe<BookingMessageByIdResult>;
    bookings?: Maybe<BookingsResult>;
    bookingsWithPaymentStatus?: Maybe<BookingWithPaymentStatusResult>;
    claimById?: Maybe<ClaimByIdResult>;
    /** Access restricted to admin users */
    claims?: Maybe<ClaimsResult>;
    /** Access restricted to logged in user */
    currentAccount?: Maybe<CurrentAccountResult>;
    currentOperator?: Maybe<CurrentOperatorResult>;
    currentOperatorBids?: Maybe<CurrentUserBidsResult>;
    currentOperatorDonations?: Maybe<CurrentOperatorDonationsResult>;
    /** Access restricted to logged in user */
    currentOperatorMedia?: Maybe<CurrentOperatorMediaResult>;
    currentStaff?: Maybe<CurrentStaffResult>;
    currentUserAds?: Maybe<CurrentUserAdsResult>;
    currentUserAndOperatorBookings?: Maybe<CurrentUserAndOperatorBookingsResult>;
    /** Access restricted to logged in user */
    currentUserMedia?: Maybe<CurrentUserMediaResult>;
    currentUserOperatorBookings?: Maybe<CurrentUserBookingsResult>;
    currentUserOwnerBookings?: Maybe<CurrentUserBookingsResult>;
    donationById?: Maybe<DonationByIdResult>;
    donationReceipts?: Maybe<DonationReceiptsResult>;
    donations?: Maybe<DonationsResult>;
    genderOptionById?: Maybe<GenderOptionByIdResult>;
    gendersOptions?: Maybe<GenderOptionsResult>;
    getCronStatus?: Maybe<GetCronStatusResult>;
    hostingOptionById?: Maybe<HostingOptionByIdResult>;
    hostingsOptions?: Maybe<HostingOptionsResult>;
    languageOptionById?: Maybe<LanguageOptionByIdResult>;
    languagesOptions?: Maybe<LanguageOptionsResult>;
    locationSearch?: Maybe<LocationSearchResult>;
    /** Access restricted to admin users */
    mediaById?: Maybe<MediaByIdResult>;
    /** Access restricted to admin users */
    medias?: Maybe<MediasResult>;
    /** Access restricted to admin users */
    messages?: Maybe<MessagesResult>;
    messagesByBookingId?: Maybe<MessagesByBookingIdResult>;
    operatorById?: Maybe<OperatorByIdResult>;
    partnerById?: Maybe<PartnerByIdResult>;
    partners?: Maybe<PartnersResult>;
    receiptById?: Maybe<DonationReceiptByIdResult>;
    /** Access restricted to admin users */
    reviewById?: Maybe<ReviewByIdResult>;
    /** Access restricted to admin users */
    reviews?: Maybe<ReviewsResult>;
    searchAds?: Maybe<SearchAdsResult>;
    searchDonationReceipts?: Maybe<SearchDonationReceiptsResult>;
    searchDonations?: Maybe<SearchDonationsResult>;
    searchOperators?: Maybe<SearchOperatorsResult>;
    searchPartners?: Maybe<SearchPartnersResult>;
    /** Access restricted to admin users */
    serviceOptionById?: Maybe<ServiceOptionByIdResult>;
    servicesOptions?: Maybe<ServiceOptionsResult>;
    /** Access restricted to admin users */
    specieOptionById?: Maybe<SpecieOptionByIdResult>;
    speciesOptions?: Maybe<SpecieOptionsResult>;
    /** Access restricted to Staff Staffs */
    staffById?: Maybe<StaffByIdResult>;
    /** Access restricted to admin users */
    userById?: Maybe<UserByIdResult>;
};
export declare type QueryAccountByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryAdByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryBookingByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryBookingMessageByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryBookingsWithPaymentStatusArgs = {
    input: BookingWithPaymentStatusInput;
};
export declare type QueryClaimByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryCurrentUserOperatorBookingsArgs = {
    input: CurrentUserBookingFilterInput;
};
export declare type QueryCurrentUserOwnerBookingsArgs = {
    input: CurrentUserBookingFilterInput;
};
export declare type QueryDonationByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryGenderOptionByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryGetCronStatusArgs = {
    cronName: Scalars['String'];
};
export declare type QueryHostingOptionByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryLanguageOptionByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryLocationSearchArgs = {
    locale: Scalars['String'];
    query: Scalars['String'];
};
export declare type QueryMediaByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryMessagesByBookingIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryOperatorByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryPartnerByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryReceiptByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryReviewByIdArgs = {
    id: Scalars['ID'];
};
export declare type QuerySearchAdsArgs = {
    input: SearchAdsInput;
};
export declare type QuerySearchDonationReceiptsArgs = {
    input: SearchDonationReceiptsInput;
};
export declare type QuerySearchDonationsArgs = {
    input: SearchDonationsInput;
};
export declare type QuerySearchOperatorsArgs = {
    input: SearchOperatorsInput;
};
export declare type QuerySearchPartnersArgs = {
    input: SearchPartnersInput;
};
export declare type QueryServiceOptionByIdArgs = {
    id: Scalars['ID'];
};
export declare type QuerySpecieOptionByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryStaffByIdArgs = {
    id: Scalars['ID'];
};
export declare type QueryUserByIdArgs = {
    id: Scalars['ID'];
};
export declare type RemoveBidForBookingAdResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type ResetPasswordInput = {
    newPassword: Scalars['String'];
    token: Scalars['JWT'];
};
/** The result of the resetPassword mutation */
export declare type ResetPasswordResult = BooleanResult | InvalidArgumentsError | UnableToProcessError;
export declare type Review = {
    body?: Maybe<Scalars['String']>;
    booking?: Maybe<Booking>;
    bookingId?: Maybe<Scalars['ID']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    score: Scalars['Float'];
    title: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
/** The result of the reviewById query */
export declare type ReviewByIdResult = InvalidArgumentsError | NotFoundError | OperatorReview | UserAuthenticationError | UserForbiddenError | UserReview;
/** List of reviews */
export declare type ReviewsList = {
    __typename: 'ReviewsList';
    reviews?: Maybe<Array<Maybe<Review>>>;
};
/** The result of the reviews query */
export declare type ReviewsResult = ReviewsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type SearchAdsInput = {
    acceptedAnimalsIds: Array<Scalars['ID']>;
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
    maxDistanceInKms?: Maybe<Scalars['Float']>;
    serviceOptionIds?: Maybe<Array<Scalars['String']>>;
};
export declare type SearchAdsResult = BookingAds | UnableToProcessError;
export declare type SearchDonationReceiptsInput = {
    endDate?: Maybe<Scalars['Date']>;
    partnerId?: Maybe<Scalars['String']>;
    startDate?: Maybe<Scalars['Date']>;
};
export declare type SearchDonationReceiptsResult = DonationReceiptsList | InvalidArgumentsError | UnableToProcessError;
export declare type SearchDonationsInput = {
    donated?: Maybe<Scalars['Boolean']>;
    endDate?: Maybe<Scalars['Date']>;
    partnerId?: Maybe<Scalars['String']>;
    startDate?: Maybe<Scalars['Date']>;
};
export declare type SearchDonationsResult = DonationsList | InvalidArgumentsError | UnableToProcessError;
export declare type SearchOperatorsInput = {
    abilityToProvideMedicalCare?: Maybe<Scalars['Boolean']>;
    acceptShortNotice?: Maybe<Scalars['Boolean']>;
    acceptedSpecieOptionsIds?: Maybe<Array<Scalars['ID']>>;
    atHomeComeGetPet?: Maybe<Scalars['Boolean']>;
    atHomeContinuously?: Maybe<Scalars['Boolean']>;
    atHomeExclusivity?: Maybe<Scalars['Boolean']>;
    atHomeOnlyBringPet?: Maybe<Scalars['Boolean']>;
    atOwnerHomeCurtains?: Maybe<Scalars['Boolean']>;
    atOwnerHomeMail?: Maybe<Scalars['Boolean']>;
    atOwnerHomePlantsCare?: Maybe<Scalars['Boolean']>;
    endDate: Scalars['Date'];
    flexibleCancelation?: Maybe<Scalars['Boolean']>;
    genderOptionId?: Maybe<Array<Scalars['String']>>;
    hostingOptionId?: Maybe<Array<Scalars['String']>>;
    isProfessionalOperator?: Maybe<Scalars['Boolean']>;
    languageOptionIds?: Maybe<Array<Scalars['ID']>>;
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
    maxDistanceInKms?: Maybe<Scalars['Float']>;
    ownAnimalsSpecieOptionsIds?: Maybe<Array<Scalars['ID']>>;
    score?: Maybe<Scalars['Float']>;
    serviceMaxPrice?: Maybe<Scalars['Float']>;
    serviceOptionId?: Maybe<Scalars['String']>;
    startDate: Scalars['Date'];
};
export declare type SearchOperatorsResult = Operators | UnableToProcessError;
export declare type SearchPartnersInput = {
    query: Scalars['String'];
};
export declare type SearchPartnersResult = PartnersList | UnableToProcessError;
/** The result of the sendVerificationEmail mutation */
export declare type SendVerificationEmailResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError;
export declare type ServiceOption = Node & {
    __typename: 'ServiceOption';
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    nameEn: Scalars['String'];
    nameFr: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
/** The result of the serviceOptionById query */
export declare type ServiceOptionByIdResult = InvalidArgumentsError | NotFoundError | ServiceOption | UserAuthenticationError | UserForbiddenError;
/** List of serviceOptions */
export declare type ServiceOptionsList = {
    __typename: 'ServiceOptionsList';
    serviceOptions?: Maybe<Array<Maybe<ServiceOption>>>;
};
/** The result of the servicesOptions query */
export declare type ServiceOptionsResult = ServiceOptionsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type SetMediaAsAvatarResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type SetMessagesAsReadInput = {
    ids: Array<Scalars['ID']>;
    readAt?: Maybe<Scalars['Date']>;
};
/** The result of the setMessageAsRead mutation */
export declare type SetMessagesAsReadResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;
export declare type SharedMedia = Media & Node & {
    __typename: 'SharedMedia';
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    mediaType?: Maybe<MediaType>;
    operator?: Maybe<Operator>;
    operatorId?: Maybe<Scalars['ID']>;
    storeUrl: Scalars['URL'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    user?: Maybe<User>;
    userId?: Maybe<Scalars['ID']>;
};
/** The result of the signIn mutation */
export declare type SignInResult = Account | InvalidArgumentsError | NotFoundError | UnableToProcessError;
/** The result of the signOut mutation */
export declare type SignOutResult = BooleanResult | UnableToProcessError | UserAuthenticationError;
export declare type SpecieOption = Node & {
    __typename: 'SpecieOption';
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    nameEn: Scalars['String'];
    nameFr: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
/** The result of the specieOptionById query */
export declare type SpecieOptionByIdResult = InvalidArgumentsError | NotFoundError | SpecieOption | UserAuthenticationError | UserForbiddenError;
/** List of specieOptions */
export declare type SpecieOptionsList = {
    __typename: 'SpecieOptionsList';
    specieOptions?: Maybe<Array<Maybe<SpecieOption>>>;
};
/** The result of the speciesOptions query */
export declare type SpecieOptionsResult = SpecieOptionsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type Staff = Node & {
    __typename: 'Staff';
    createdAt?: Maybe<Scalars['DateTime']>;
    email?: Maybe<Scalars['String']>;
    /** GUID for a resource */
    id: Scalars['String'];
    phoneNumber?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type StaffBookingMessage = BookingMessage & Message & Node & {
    __typename: 'StaffBookingMessage';
    booking?: Maybe<Booking>;
    bookingId: Scalars['ID'];
    content: Scalars['String'];
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    medias?: Maybe<Array<Maybe<Media>>>;
    readAt?: Maybe<Scalars['DateTime']>;
    staff?: Maybe<Staff>;
    staffId: Scalars['ID'];
    updatedAt?: Maybe<Scalars['DateTime']>;
};
/** The result of the StaffById query */
export declare type StaffByIdResult = InvalidArgumentsError | NotFoundError | Staff | UserAuthenticationError | UserForbiddenError;
/** List of Staffs */
export declare type StaffsList = {
    __typename: 'StaffsList';
    staffs?: Maybe<Array<Maybe<Staff>>>;
};
export declare type StartCronResult = BooleanResult | UserAuthenticationError | UserForbiddenError;
export declare type StopCronResult = BooleanResult | UserAuthenticationError | UserForbiddenError;
export declare type StorageInfos = {
    __typename: 'StorageInfos';
    mediaId: Scalars['ID'];
    signedRequest?: Maybe<Scalars['String']>;
    url?: Maybe<Scalars['String']>;
};
export declare type StripePayment = Node & Payment & {
    __typename: 'StripePayment';
    booking?: Maybe<Booking>;
    bookingId?: Maybe<Scalars['ID']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    errorCode?: Maybe<Scalars['String']>;
    expectedPaymentIntentCaptureDate?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    status: PaymentStatus;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type Subscription = {
    __typename: 'Subscription';
    bookingByIdChatSub?: Maybe<BookingMessageSubscriptionResult>;
    errorsEmailCronSub?: Maybe<CronSubscriptionsResult>;
    newlyCreatedBookingsAsSitterSub?: Maybe<BookingSubscriptionResult>;
    pendingPaymentCronSub?: Maybe<CronSubscriptionsResult>;
    setupIntentCronSub?: Maybe<CronSubscriptionsResult>;
    userBookingsMessagesChangesSub?: Maybe<BookingMessageSubscriptionResult>;
    userBookingsStatusChangesSub?: Maybe<BookingSubscriptionResult>;
};
export declare type SubscriptionBookingByIdChatSubArgs = {
    bookingId: Scalars['ID'];
};
export declare type SubscriptionNewlyCreatedBookingsAsSitterSubArgs = {
    sitterId?: Maybe<Scalars['ID']>;
};
export declare type SubscriptionUserBookingsMessagesChangesSubArgs = {
    authorId?: Maybe<Scalars['ID']>;
    bookingIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type SubscriptionUserBookingsStatusChangesSubArgs = {
    bookingIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};
export declare type UnableToProcessError = {
    __typename: 'UnableToProcessError';
    code: ErrorCode;
    message: ErrorMessage;
};
export declare type UpdateBookingAdInput = {
    animalsSpeciesIds: Array<Scalars['String']>;
    description?: Maybe<Scalars['String']>;
    endDate: Scalars['String'];
    latitude: Scalars['Latitude'];
    longitude: Scalars['Longitude'];
    serviceMaxPrice?: Maybe<Scalars['Float']>;
    serviceOptionId: Scalars['String'];
    startDate: Scalars['String'];
};
export declare type UpdateBookingAdResult = BookingAd | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;
export declare type UpdateBookingPaymentStatusInput = {
    id: Scalars['ID'];
    paymentMethodId?: Maybe<Scalars['String']>;
};
export declare type UpdateBookingPaymentStatusResult = BooleanResult | InvalidArgumentsError | NotFoundError | PaymentProcessorError | UnableToProcessError | UserAuthenticationError;
export declare type UpdateDonationReceiptInput = {
    amountDonated: Scalars['Float'];
    donationsIds: Array<Maybe<Scalars['ID']>>;
    filesUrls: Array<Maybe<Scalars['URL']>>;
    id: Scalars['ID'];
    partnerId: Scalars['ID'];
};
export declare type UpdateDonationReceiptResult = DonationReceipt | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type UpdateGenderOptionInput = {
    nameEn?: Maybe<Scalars['String']>;
    nameFr?: Maybe<Scalars['String']>;
};
export declare type UpdateGenderOptionResult = GenderOption | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type UpdateHostingOptionInput = {
    nameEn?: Maybe<Scalars['String']>;
    nameFr?: Maybe<Scalars['String']>;
};
export declare type UpdateHostingOptionResult = HostingOption | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type UpdateIndividualOperatorInput = {
    acceptedSpecieOptionsIds: Array<Scalars['ID']>;
    avatarMediaId?: Maybe<Scalars['ID']>;
    birthDate?: Maybe<Scalars['Date']>;
    description?: Maybe<Scalars['String']>;
    genderOptionId?: Maybe<Scalars['String']>;
    hostingOptionId?: Maybe<Scalars['String']>;
    languageOptionIds: Array<Scalars['ID']>;
    ownAnimalsSpecieOptionsIds: Array<Scalars['ID']>;
    partnerId?: Maybe<Scalars['String']>;
    partnerPercentage?: Maybe<Scalars['Int']>;
    stripeAccountId?: Maybe<Scalars['ID']>;
};
/** The result of the updateIndividualOperator mutation */
export declare type UpdateIndividualOperatorResult = IndividualOperator | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type UpdateInvidualOperatorCoreServicesInput = {
    coreOperatorServiceId: Scalars['ID'];
    price: Scalars['Int'];
    serviceOptionId: Scalars['ID'];
};
export declare type UpdateInvidualOperatorCoreServicesResult = BooleanResult | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError;
export declare type UpdateInvidualOperatorExtraServicesResult = BooleanResult | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError;
export declare type UpdateLanguageOptionInput = {
    mediaId?: Maybe<Scalars['ID']>;
    nameEn?: Maybe<Scalars['String']>;
    nameFr?: Maybe<Scalars['String']>;
};
export declare type UpdateLanguageOptionResult = InvalidArgumentsError | LanguageOption | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type UpdateMessageInput = {
    content: Scalars['String'];
    readAt?: Maybe<Scalars['Date']>;
    saveAs?: Maybe<Scalars['SaveAsValue']>;
};
export declare type UpdateMessageResult = InvalidArgumentsError | NotFoundError | OperatorBookingMessage | StaffBookingMessage | UnableToProcessError | UserAuthenticationError | UserBookingMessage;
export declare type UpdatePartnerInput = {
    description: Scalars['String'];
    name: Scalars['String'];
    storeUrls: Array<Scalars['String']>;
    websiteUrl: Scalars['String'];
};
export declare type UpdatePartnerResult = InvalidArgumentsError | Partner | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type UpdateReviewInput = {
    body?: Maybe<Scalars['String']>;
    score: Scalars['PositiveFloat'];
    title: Scalars['String'];
};
export declare type UpdateReviewResult = InvalidArgumentsError | NotFoundError | OperatorReview | UnableToProcessError | UserAuthenticationError | UserReview;
export declare type UpdateServiceOptionInput = {
    nameEn?: Maybe<Scalars['String']>;
    nameFr?: Maybe<Scalars['String']>;
};
export declare type UpdateServiceOptionResult = InvalidArgumentsError | NotFoundError | ServiceOption | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type UpdateSpecieOptionInput = {
    nameEn?: Maybe<Scalars['String']>;
    nameFr?: Maybe<Scalars['String']>;
};
export declare type UpdateSpecieOptionResult = InvalidArgumentsError | NotFoundError | SpecieOption | UnableToProcessError | UserAuthenticationError | UserForbiddenError;
export declare type User = Actor & Node & {
    __typename: 'User';
    account?: Maybe<Account>;
    accountId?: Maybe<Scalars['ID']>;
    avatar?: Maybe<Media>;
    avatarMediaId?: Maybe<Scalars['String']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    firstName: Scalars['String'];
    /** GUID for a resource */
    id: Scalars['String'];
    lastName?: Maybe<Scalars['String']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
};
export declare type UserAuthenticationError = {
    __typename: 'UserAuthenticationError';
    code: ErrorCode;
    message: ErrorMessage;
};
export declare type UserBookingMessage = BookingMessage & Message & Node & {
    __typename: 'UserBookingMessage';
    booking?: Maybe<Booking>;
    bookingId: Scalars['ID'];
    content: Scalars['String'];
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    medias?: Maybe<Array<Maybe<Media>>>;
    readAt?: Maybe<Scalars['DateTime']>;
    updatedAt?: Maybe<Scalars['DateTime']>;
    user?: Maybe<User>;
    userId: Scalars['ID'];
};
/** The result of the userById query */
export declare type UserByIdResult = InvalidArgumentsError | NotFoundError | User | UserAuthenticationError | UserForbiddenError;
export declare type UserForbiddenError = {
    __typename: 'UserForbiddenError';
    code: ErrorCode;
    message: ErrorMessage;
};
export declare type UserMedia = Media & Node & {
    __typename: 'UserMedia';
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    mediaType?: Maybe<MediaType>;
    storeUrl: Scalars['URL'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    user?: Maybe<User>;
    userId?: Maybe<Scalars['ID']>;
};
export declare type UserReview = Node & Review & {
    __typename: 'UserReview';
    body?: Maybe<Scalars['String']>;
    booking?: Maybe<Booking>;
    bookingId?: Maybe<Scalars['ID']>;
    createdAt?: Maybe<Scalars['DateTime']>;
    /** GUID for a resource */
    id: Scalars['String'];
    score: Scalars['Float'];
    title: Scalars['String'];
    updatedAt?: Maybe<Scalars['DateTime']>;
    user?: Maybe<User>;
    userId?: Maybe<Scalars['ID']>;
};
/** List of users */
export declare type UsersList = {
    __typename: 'UsersList';
    users?: Maybe<Array<Maybe<User>>>;
};
export declare type VerifyUserInput = {
    token: Scalars['JWT'];
};
export declare type VerifyUserProcessorConnectionCompletionResult = BooleanResult | ChargesNotEnabledProcessorAccountError | DetailsNotSubmittedProcessorAccountError | MissingProcessorAccountError | NotFoundError | UnableToProcessError;
/** The result of the verifyUser mutation */
export declare type VerifyUserResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError;
export declare type CreateAccountMutationVariables = Exact<{
    input: CreateAccountInput;
}>;
export declare type CreateAccountMutation = {
    __typename: 'Mutation';
    createAccount?: Maybe<{
        __typename: 'Account';
        id: string;
        email?: Maybe<string>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SignInMutationVariables = Exact<{
    input: EmailAndPasswordInput;
}>;
export declare type SignInMutation = {
    __typename: 'Mutation';
    signIn?: Maybe<{
        __typename: 'Account';
        id: string;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SignOutMutationVariables = Exact<{
    [key: string]: never;
}>;
export declare type SignOutMutation = {
    __typename: 'Mutation';
    signOut?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SendVerificationEmailMutationVariables = Exact<{
    email: Scalars['String'];
}>;
export declare type SendVerificationEmailMutation = {
    __typename: 'Mutation';
    sendVerificationEmail?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type VerifyUserMutationVariables = Exact<{
    input: VerifyUserInput;
}>;
export declare type VerifyUserMutation = {
    __typename: 'Mutation';
    verifyUser?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type DeleteAccountMutationVariables = Exact<{
    confirmPassword: Scalars['String'];
}>;
export declare type DeleteAccountMutation = {
    __typename: 'Mutation';
    deleteAccount?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    }>;
};
export declare type LostPasswordMutationVariables = Exact<{
    email: Scalars['String'];
}>;
export declare type LostPasswordMutation = {
    __typename: 'Mutation';
    lostPassword?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type ResetPasswordMutationVariables = Exact<{
    input: ResetPasswordInput;
}>;
export declare type ResetPasswordMutation = {
    __typename: 'Mutation';
    resetPassword?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type ModifyPasswordMutationVariables = Exact<{
    password: Scalars['String'];
    newPassword: Scalars['String'];
}>;
export declare type ModifyPasswordMutation = {
    __typename: 'Mutation';
    modifyPassword?: Maybe<{
        __typename: 'Account';
        id: string;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type ModifyEmailMutationVariables = Exact<{
    email: Scalars['String'];
}>;
export declare type ModifyEmailMutation = {
    __typename: 'Mutation';
    modifyEmail?: Maybe<{
        __typename: 'Account';
        id: string;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CurrentAccountQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CurrentAccountQuery = {
    __typename: 'Query';
    currentAccount?: Maybe<{
        __typename: 'Account';
        id: string;
        email?: Maybe<string>;
        verifiedAt?: Maybe<Date>;
        user?: Maybe<{
            __typename: 'User';
            firstName: string;
        }>;
        operator?: Maybe<{
            __typename: 'IndividualOperator';
            id: string;
            isActive?: Maybe<boolean>;
        }>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type AllAccountsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type AllAccountsQuery = {
    __typename: 'Query';
    allAccounts?: Maybe<{
        __typename: 'AccountsList';
        accounts?: Maybe<Array<Maybe<{
            __typename: 'Account';
            id: string;
            verifiedAt?: Maybe<Date>;
            updatedAt?: Maybe<Date>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CreateBookingAdMutationVariables = Exact<{
    input: CreateBookingAdInput;
}>;
export declare type CreateBookingAdMutation = {
    __typename: 'Mutation';
    createBookingAd?: Maybe<{
        __typename: 'BookingAd';
        id: string;
        createdAt?: Maybe<Date>;
        updatedAt?: Maybe<Date>;
        animalsSpeciesIds: Array<string>;
        startDate?: Maybe<Date>;
        endDate?: Maybe<Date>;
        serviceOptionId: string;
        description?: Maybe<string>;
        location?: Maybe<{
            __typename: 'Location';
            latitude: number;
            longitude: any;
        }>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'PreExistingUserAdError';
        preExistingUserAdError?: Maybe<string>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    }>;
};
export declare type UpdateBookingAdMutationVariables = Exact<{
    id: Scalars['ID'];
    input: UpdateBookingAdInput;
}>;
export declare type UpdateBookingAdMutation = {
    __typename: 'Mutation';
    updateBookingAd?: Maybe<{
        __typename: 'BookingAd';
        id: string;
        createdAt?: Maybe<Date>;
        updatedAt?: Maybe<Date>;
        animalsSpeciesIds: Array<string>;
        startDate?: Maybe<Date>;
        endDate?: Maybe<Date>;
        serviceOptionId: string;
        description?: Maybe<string>;
        location?: Maybe<{
            __typename: 'Location';
            latitude: number;
            longitude: any;
        }>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    }>;
};
export declare type DeleteBookingAdMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteBookingAdMutation = {
    __typename: 'Mutation';
    deleteBookingAd?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type BidForBookingAdMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type BidForBookingAdMutation = {
    __typename: 'Mutation';
    bidForBookingAd?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type RemoveBidForBookingAdMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type RemoveBidForBookingAdMutation = {
    __typename: 'Mutation';
    removeBidForBookingAd?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type CurrentUserAdsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CurrentUserAdsQuery = {
    __typename: 'Query';
    currentUserAds?: Maybe<{
        __typename: 'BookingAds';
        bookingAds?: Maybe<Array<Maybe<{
            __typename: 'BookingAd';
            id: string;
            createdAt?: Maybe<Date>;
            updatedAt?: Maybe<Date>;
            animalsSpeciesIds: Array<string>;
            startDate?: Maybe<Date>;
            endDate?: Maybe<Date>;
            serviceOptionId: string;
            serviceMaxPrice?: Maybe<number>;
            description?: Maybe<string>;
            bidders?: Maybe<Array<Maybe<{
                __typename: 'IndividualOperator';
                id: string;
                bids?: Maybe<Array<Maybe<{
                    __typename: 'BookingAdBid';
                    id: string;
                }>>>;
            }>>>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type AdByIdQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type AdByIdQuery = {
    __typename: 'Query';
    adById?: Maybe<{
        __typename: 'BookingAd';
        id: string;
        updatedAt?: Maybe<Date>;
        animalsSpeciesIds: Array<string>;
        startDate?: Maybe<Date>;
        endDate?: Maybe<Date>;
        serviceOptionId: string;
        description?: Maybe<string>;
        serviceMaxPrice?: Maybe<number>;
        location?: Maybe<{
            __typename: 'Location';
            latitude: number;
            longitude: any;
        }>;
        bidders?: Maybe<Array<Maybe<{
            __typename: 'IndividualOperator';
            id: string;
            averageScore?: Maybe<number>;
            account?: Maybe<{
                __typename: 'Account';
                user?: Maybe<{
                    __typename: 'User';
                    firstName: string;
                }>;
            }>;
            avatar?: Maybe<{
                __typename: 'DonationReceiptMedia';
                storeUrl: string;
            } | {
                __typename: 'LanguageOptionMedia';
                storeUrl: string;
            } | {
                __typename: 'MessageMedia';
                storeUrl: string;
            } | {
                __typename: 'OperatorMedia';
                storeUrl: string;
            } | {
                __typename: 'PartnerMedia';
                storeUrl: string;
            } | {
                __typename: 'SharedMedia';
                storeUrl: string;
            } | {
                __typename: 'UserMedia';
                storeUrl: string;
            }>;
            location?: Maybe<{
                __typename: 'Location';
                latitude: number;
                longitude: any;
            }>;
            coreServices?: Maybe<Array<Maybe<{
                __typename: 'IndividualOperatorCoreService';
                id: string;
                price: number;
            }>>>;
            extraServices?: Maybe<{
                __typename: 'IndividualOperatorExtraService';
                atHomeExclusivity?: Maybe<boolean>;
                atHomeExclusivityExtraPrice?: Maybe<number>;
                atHomeContinuously?: Maybe<boolean>;
                atHomeContinuouslyExtraPrice?: Maybe<number>;
                atHomeOnlyBringPet?: Maybe<boolean>;
                atHomeOnlyBringPetExtraPrice?: Maybe<number>;
                atHomeComeGetPet?: Maybe<boolean>;
                atHomeComeGetPetExtraPrice?: Maybe<number>;
                atOwnerHomePlantsCare?: Maybe<boolean>;
                atOwnerHomePlantsCareExtraPrice?: Maybe<number>;
                atOwnerHomeMail?: Maybe<boolean>;
                atOwnerHomeMailExtraPrice?: Maybe<number>;
                atOwnerHomeCurtains?: Maybe<boolean>;
                atOwnerHomeCurtainsExtraPrice?: Maybe<number>;
                acceptShortNotice?: Maybe<boolean>;
                flexibleCancelation?: Maybe<boolean>;
                isProfessionalOperator?: Maybe<boolean>;
                abilityToProvideMedicalCare?: Maybe<boolean>;
            }>;
        }>>>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SearchAdsQueryVariables = Exact<{
    input: SearchAdsInput;
}>;
export declare type SearchAdsQuery = {
    __typename: 'Query';
    searchAds?: Maybe<{
        __typename: 'BookingAds';
        bookingAds?: Maybe<Array<Maybe<{
            __typename: 'BookingAd';
            id: string;
            updatedAt?: Maybe<Date>;
            animalsSpeciesIds: Array<string>;
            startDate?: Maybe<Date>;
            endDate?: Maybe<Date>;
            serviceOptionId: string;
            description?: Maybe<string>;
            location?: Maybe<{
                __typename: 'Location';
                latitude: number;
                longitude: any;
            }>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CurrentOperatorBidsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CurrentOperatorBidsQuery = {
    __typename: 'Query';
    currentOperatorBids?: Maybe<{
        __typename: 'BookingAdBids';
        bids?: Maybe<Array<Maybe<{
            __typename: 'BookingAdBid';
            bookingAd?: Maybe<{
                __typename: 'BookingAd';
                id: string;
                updatedAt?: Maybe<Date>;
                animalsSpeciesIds: Array<string>;
                startDate?: Maybe<Date>;
                endDate?: Maybe<Date>;
                serviceOptionId: string;
                description?: Maybe<string>;
                location?: Maybe<{
                    __typename: 'Location';
                    latitude: number;
                    longitude: any;
                }>;
            }>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CreateBookingMutationVariables = Exact<{
    input: CreateBookingInput;
}>;
export declare type CreateBookingMutation = {
    __typename: 'Mutation';
    createBooking?: Maybe<{
        __typename: 'Booking';
        id: string;
        startDate?: Maybe<Date>;
        endDate?: Maybe<Date>;
        status?: Maybe<BookingStatus>;
        ownerConfirmationDate?: Maybe<Date>;
        operatorConfirmationDate?: Maybe<Date>;
        selectedOptions?: Maybe<string>;
        animals?: Maybe<Array<Maybe<{
            __typename: 'BookingAnimal';
            specieOptionId: string;
        }>>>;
        messages?: Maybe<Array<Maybe<{
            __typename: 'OperatorBookingMessage';
        } | {
            __typename: 'StaffBookingMessage';
        } | {
            __typename: 'UserBookingMessage';
            id: string;
        }>>>;
    } | {
        __typename: 'CannotBookHimSelfError';
        cannotBookHimSelfError?: Maybe<string>;
    } | {
        __typename: 'ExistingBookingError';
        existingBookingError?: Maybe<string>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'NotSupportedExtraServiceError';
        notSupportedExtraServiceError?: Maybe<string>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type ConfirmBookingMutationVariables = Exact<{
    input: ConfirmBookingInput;
}>;
export declare type ConfirmBookingMutation = {
    __typename: 'Mutation';
    confirmBooking?: Maybe<{
        __typename: 'Booking';
        id: string;
        ownerConfirmationDate?: Maybe<Date>;
        operatorConfirmationDate?: Maybe<Date>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CancelBookingMutationVariables = Exact<{
    input: CancelBookingInput;
}>;
export declare type CancelBookingMutation = {
    __typename: 'Mutation';
    cancelBooking?: Maybe<{
        __typename: 'Booking';
        id: string;
        ownerConfirmationDate?: Maybe<Date>;
        operatorConfirmationDate?: Maybe<Date>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CancelOnGoingBookingMutationVariables = Exact<{
    input: CancelOnGoingBookingInput;
}>;
export declare type CancelOnGoingBookingMutation = {
    __typename: 'Mutation';
    cancelOnGoingBooking?: Maybe<{
        __typename: 'Booking';
        id: string;
        ownerConfirmationDate?: Maybe<Date>;
        operatorConfirmationDate?: Maybe<Date>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type AuthorizePaymentMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type AuthorizePaymentMutation = {
    __typename: 'Mutation';
    authorizePayment?: Maybe<{
        __typename: 'AuthorizedPayment';
        clientSecret?: Maybe<string>;
        stripeTargetApi?: Maybe<string>;
        hadRef?: Maybe<boolean>;
    } | {
        __typename: 'InvalidOperatorError';
        invalidOperatorError?: Maybe<string>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'OperatorCannotProcessPaymentsError';
        operatorCannotProcessPaymentsError?: Maybe<string>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type UpdateBookingPaymentStatusMutationVariables = Exact<{
    input: UpdateBookingPaymentStatusInput;
}>;
export declare type UpdateBookingPaymentStatusMutation = {
    __typename: 'Mutation';
    updateBookingPaymentStatus?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'PaymentProcessorError';
        paymentProcessorError?: Maybe<string>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type GetCurrentUserAndOperatorBookingsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetCurrentUserAndOperatorBookingsQuery = {
    __typename: 'Query';
    currentUserAndOperatorBookings?: Maybe<{
        __typename: 'BookingsList';
        bookings?: Maybe<Array<Maybe<{
            __typename: 'Booking';
            id: string;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type BookingByIdQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type BookingByIdQuery = {
    __typename: 'Query';
    bookingById?: Maybe<{
        __typename: 'Booking';
        id: string;
        updatedAt?: Maybe<Date>;
        status?: Maybe<BookingStatus>;
        startDate?: Maybe<Date>;
        endDate?: Maybe<Date>;
        priceWithOutApplicationFee?: Maybe<number>;
        applicationFeeAmount?: Maybe<number>;
        selectedOptions?: Maybe<string>;
        ownerConfirmationDate?: Maybe<Date>;
        operatorConfirmationDate?: Maybe<Date>;
        canceled?: Maybe<boolean>;
        canceledBy?: Maybe<string>;
        underReview?: Maybe<boolean>;
        service?: Maybe<{
            __typename: 'ServiceOption';
            nameFr: string;
            nameEn: string;
        }>;
        operator?: Maybe<{
            __typename: 'IndividualOperator';
            id: string;
            averageScore?: Maybe<number>;
            averageResponseTime?: Maybe<Date>;
            partnerId?: Maybe<string>;
            partnerPercentage?: Maybe<number>;
            account?: Maybe<{
                __typename: 'Account';
                user?: Maybe<{
                    __typename: 'User';
                    firstName: string;
                }>;
            }>;
            avatar?: Maybe<{
                __typename: 'DonationReceiptMedia';
                storeUrl: string;
            } | {
                __typename: 'LanguageOptionMedia';
                storeUrl: string;
            } | {
                __typename: 'MessageMedia';
                storeUrl: string;
            } | {
                __typename: 'OperatorMedia';
                storeUrl: string;
            } | {
                __typename: 'PartnerMedia';
                storeUrl: string;
            } | {
                __typename: 'SharedMedia';
                storeUrl: string;
            } | {
                __typename: 'UserMedia';
                storeUrl: string;
            }>;
            location?: Maybe<{
                __typename: 'Location';
                city?: Maybe<string>;
            }>;
            coreServices?: Maybe<Array<Maybe<{
                __typename: 'IndividualOperatorCoreService';
                price: number;
                serviceOptionId: string;
            }>>>;
            extraServices?: Maybe<{
                __typename: 'IndividualOperatorExtraService';
                atHomeExclusivity?: Maybe<boolean>;
                atHomeExclusivityExtraPrice?: Maybe<number>;
                atHomeContinuously?: Maybe<boolean>;
                atHomeContinuouslyExtraPrice?: Maybe<number>;
                atHomeOnlyBringPet?: Maybe<boolean>;
                atHomeOnlyBringPetExtraPrice?: Maybe<number>;
                atHomeComeGetPet?: Maybe<boolean>;
                atHomeComeGetPetExtraPrice?: Maybe<number>;
                atOwnerHomePlantsCare?: Maybe<boolean>;
                atOwnerHomePlantsCareExtraPrice?: Maybe<number>;
                atOwnerHomeMail?: Maybe<boolean>;
                atOwnerHomeMailExtraPrice?: Maybe<number>;
                atOwnerHomeCurtains?: Maybe<boolean>;
                atOwnerHomeCurtainsExtraPrice?: Maybe<number>;
            }>;
        }>;
        user?: Maybe<{
            __typename: 'User';
            id: string;
            firstName: string;
            avatar?: Maybe<{
                __typename: 'DonationReceiptMedia';
                storeUrl: string;
            } | {
                __typename: 'LanguageOptionMedia';
                storeUrl: string;
            } | {
                __typename: 'MessageMedia';
                storeUrl: string;
            } | {
                __typename: 'OperatorMedia';
                storeUrl: string;
            } | {
                __typename: 'PartnerMedia';
                storeUrl: string;
            } | {
                __typename: 'SharedMedia';
                storeUrl: string;
            } | {
                __typename: 'UserMedia';
                storeUrl: string;
            }>;
        }>;
        reviews?: Maybe<Array<Maybe<{
            __typename: 'OperatorReview';
            id: string;
            score: number;
            title: string;
            body?: Maybe<string>;
        } | {
            __typename: 'UserReview';
            id: string;
            score: number;
            title: string;
            body?: Maybe<string>;
        }>>>;
        animals?: Maybe<Array<Maybe<{
            __typename: 'BookingAnimal';
            specie?: Maybe<{
                __typename: 'SpecieOption';
                nameFr: string;
                nameEn: string;
            }>;
        }>>>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CurrentUserOwnerBookingsQueryVariables = Exact<{
    input: CurrentUserBookingFilterInput;
}>;
export declare type CurrentUserOwnerBookingsQuery = {
    __typename: 'Query';
    currentUserOwnerBookings?: Maybe<{
        __typename: 'BookingsList';
        bookings?: Maybe<Array<Maybe<{
            __typename: 'Booking';
            id: string;
            updatedAt?: Maybe<Date>;
            status?: Maybe<BookingStatus>;
            startDate?: Maybe<Date>;
            endDate?: Maybe<Date>;
            priceWithOutApplicationFee?: Maybe<number>;
            applicationFeeAmount?: Maybe<number>;
            selectedOptions?: Maybe<string>;
            service?: Maybe<{
                __typename: 'ServiceOption';
                nameFr: string;
                nameEn: string;
            }>;
            messages?: Maybe<Array<Maybe<{
                __typename: 'OperatorBookingMessage';
                operatorId: string;
                readAt?: Maybe<Date>;
            } | {
                __typename: 'StaffBookingMessage';
            } | {
                __typename: 'UserBookingMessage';
                userId: string;
                readAt?: Maybe<Date>;
            }>>>;
            operator?: Maybe<{
                __typename: 'IndividualOperator';
                id: string;
                partnerId?: Maybe<string>;
                partnerPercentage?: Maybe<number>;
                averageScore?: Maybe<number>;
                account?: Maybe<{
                    __typename: 'Account';
                    user?: Maybe<{
                        __typename: 'User';
                        firstName: string;
                    }>;
                }>;
                avatar?: Maybe<{
                    __typename: 'DonationReceiptMedia';
                    storeUrl: string;
                } | {
                    __typename: 'LanguageOptionMedia';
                    storeUrl: string;
                } | {
                    __typename: 'MessageMedia';
                    storeUrl: string;
                } | {
                    __typename: 'OperatorMedia';
                    storeUrl: string;
                } | {
                    __typename: 'PartnerMedia';
                    storeUrl: string;
                } | {
                    __typename: 'SharedMedia';
                    storeUrl: string;
                } | {
                    __typename: 'UserMedia';
                    storeUrl: string;
                }>;
                location?: Maybe<{
                    __typename: 'Location';
                    city?: Maybe<string>;
                }>;
                coreServices?: Maybe<Array<Maybe<{
                    __typename: 'IndividualOperatorCoreService';
                    serviceOptionId: string;
                    price: number;
                }>>>;
                extraServices?: Maybe<{
                    __typename: 'IndividualOperatorExtraService';
                    atHomeExclusivity?: Maybe<boolean>;
                    atHomeExclusivityExtraPrice?: Maybe<number>;
                    atHomeContinuously?: Maybe<boolean>;
                    atHomeContinuouslyExtraPrice?: Maybe<number>;
                    atHomeOnlyBringPet?: Maybe<boolean>;
                    atHomeOnlyBringPetExtraPrice?: Maybe<number>;
                    atHomeComeGetPet?: Maybe<boolean>;
                    atHomeComeGetPetExtraPrice?: Maybe<number>;
                    atOwnerHomePlantsCare?: Maybe<boolean>;
                    atOwnerHomePlantsCareExtraPrice?: Maybe<number>;
                    atOwnerHomeMail?: Maybe<boolean>;
                    atOwnerHomeMailExtraPrice?: Maybe<number>;
                    atOwnerHomeCurtains?: Maybe<boolean>;
                    atOwnerHomeCurtainsExtraPrice?: Maybe<number>;
                }>;
            }>;
            animals?: Maybe<Array<Maybe<{
                __typename: 'BookingAnimal';
                specie?: Maybe<{
                    __typename: 'SpecieOption';
                    nameFr: string;
                    nameEn: string;
                }>;
            }>>>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type CurrentUserOperatorBookingsQueryVariables = Exact<{
    input: CurrentUserBookingFilterInput;
}>;
export declare type CurrentUserOperatorBookingsQuery = {
    __typename: 'Query';
    currentUserOperatorBookings?: Maybe<{
        __typename: 'BookingsList';
        bookings?: Maybe<Array<Maybe<{
            __typename: 'Booking';
            id: string;
            updatedAt?: Maybe<Date>;
            status?: Maybe<BookingStatus>;
            startDate?: Maybe<Date>;
            endDate?: Maybe<Date>;
            priceWithOutApplicationFee?: Maybe<number>;
            applicationFeeAmount?: Maybe<number>;
            selectedOptions?: Maybe<string>;
            service?: Maybe<{
                __typename: 'ServiceOption';
                nameFr: string;
                nameEn: string;
            }>;
            messages?: Maybe<Array<Maybe<{
                __typename: 'OperatorBookingMessage';
                operatorId: string;
                readAt?: Maybe<Date>;
            } | {
                __typename: 'StaffBookingMessage';
            } | {
                __typename: 'UserBookingMessage';
                userId: string;
                readAt?: Maybe<Date>;
            }>>>;
            user?: Maybe<{
                __typename: 'User';
                id: string;
                firstName: string;
                avatar?: Maybe<{
                    __typename: 'DonationReceiptMedia';
                    storeUrl: string;
                } | {
                    __typename: 'LanguageOptionMedia';
                    storeUrl: string;
                } | {
                    __typename: 'MessageMedia';
                    storeUrl: string;
                } | {
                    __typename: 'OperatorMedia';
                    storeUrl: string;
                } | {
                    __typename: 'PartnerMedia';
                    storeUrl: string;
                } | {
                    __typename: 'SharedMedia';
                    storeUrl: string;
                } | {
                    __typename: 'UserMedia';
                    storeUrl: string;
                }>;
            }>;
            operator?: Maybe<{
                __typename: 'IndividualOperator';
                id: string;
                partnerId?: Maybe<string>;
                partnerPercentage?: Maybe<number>;
                coreServices?: Maybe<Array<Maybe<{
                    __typename: 'IndividualOperatorCoreService';
                    price: number;
                    serviceOptionId: string;
                }>>>;
                extraServices?: Maybe<{
                    __typename: 'IndividualOperatorExtraService';
                    atHomeExclusivity?: Maybe<boolean>;
                    atHomeExclusivityExtraPrice?: Maybe<number>;
                    atHomeContinuously?: Maybe<boolean>;
                    atHomeContinuouslyExtraPrice?: Maybe<number>;
                    atHomeOnlyBringPet?: Maybe<boolean>;
                    atHomeOnlyBringPetExtraPrice?: Maybe<number>;
                    atHomeComeGetPet?: Maybe<boolean>;
                    atHomeComeGetPetExtraPrice?: Maybe<number>;
                    atOwnerHomePlantsCare?: Maybe<boolean>;
                    atOwnerHomePlantsCareExtraPrice?: Maybe<number>;
                    atOwnerHomeMail?: Maybe<boolean>;
                    atOwnerHomeMailExtraPrice?: Maybe<number>;
                    atOwnerHomeCurtains?: Maybe<boolean>;
                    atOwnerHomeCurtainsExtraPrice?: Maybe<number>;
                }>;
            }>;
            animals?: Maybe<Array<Maybe<{
                __typename: 'BookingAnimal';
                specie?: Maybe<{
                    __typename: 'SpecieOption';
                    nameFr: string;
                    nameEn: string;
                }>;
            }>>>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type BookingsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type BookingsQuery = {
    __typename: 'Query';
    bookings?: Maybe<{
        __typename: 'BookingsList';
        bookings?: Maybe<Array<Maybe<{
            __typename: 'Booking';
            id: string;
            updatedAt?: Maybe<Date>;
            status?: Maybe<BookingStatus>;
            priceWithOutApplicationFee?: Maybe<number>;
            applicationFeeAmount?: Maybe<number>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type BookingsWithPaymentStatusQueryVariables = Exact<{
    input: BookingWithPaymentStatusInput;
}>;
export declare type BookingsWithPaymentStatusQuery = {
    __typename: 'Query';
    bookingsWithPaymentStatus?: Maybe<{
        __typename: 'BookingsList';
        bookings?: Maybe<Array<Maybe<{
            __typename: 'Booking';
            id: string;
            updatedAt?: Maybe<Date>;
            priceWithOutApplicationFee?: Maybe<number>;
            applicationFeeAmount?: Maybe<number>;
            underReview?: Maybe<boolean>;
            payment?: Maybe<{
                __typename: 'StripePayment';
                status: PaymentStatus;
                expectedPaymentIntentCaptureDate?: Maybe<Date>;
            }>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SubscribeToBookingMessagesSubscriptionVariables = Exact<{
    bookingId: Scalars['ID'];
}>;
export declare type SubscribeToBookingMessagesSubscription = {
    __typename: 'Subscription';
    bookingByIdChatSub?: Maybe<{
        __typename: 'OperatorBookingMessage';
        id: string;
        operatorId: string;
        readAt?: Maybe<Date>;
        content: string;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserBookingMessage';
        id: string;
        userId: string;
        readAt?: Maybe<Date>;
        content: string;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SubscribeToUserBookingsMessagesChangesSubscriptionVariables = Exact<{
    bookingsIds?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
    authorId?: Maybe<Scalars['ID']>;
}>;
export declare type SubscribeToUserBookingsMessagesChangesSubscription = {
    __typename: 'Subscription';
    userBookingsMessagesChangesSub?: Maybe<{
        __typename: 'OperatorBookingMessage';
        id: string;
        bookingId: string;
        operatorId: string;
        readAt?: Maybe<Date>;
        content: string;
        operator?: Maybe<{
            __typename: 'IndividualOperator';
            avatar?: Maybe<{
                __typename: 'DonationReceiptMedia';
                storeUrl: string;
            } | {
                __typename: 'LanguageOptionMedia';
                storeUrl: string;
            } | {
                __typename: 'MessageMedia';
                storeUrl: string;
            } | {
                __typename: 'OperatorMedia';
                storeUrl: string;
            } | {
                __typename: 'PartnerMedia';
                storeUrl: string;
            } | {
                __typename: 'SharedMedia';
                storeUrl: string;
            } | {
                __typename: 'UserMedia';
                storeUrl: string;
            }>;
            account?: Maybe<{
                __typename: 'Account';
                user?: Maybe<{
                    __typename: 'User';
                    firstName: string;
                    lastName?: Maybe<string>;
                }>;
            }>;
        }>;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserBookingMessage';
        id: string;
        bookingId: string;
        userId: string;
        readAt?: Maybe<Date>;
        content: string;
        user?: Maybe<{
            __typename: 'User';
            firstName: string;
            avatar?: Maybe<{
                __typename: 'DonationReceiptMedia';
                storeUrl: string;
            } | {
                __typename: 'LanguageOptionMedia';
                storeUrl: string;
            } | {
                __typename: 'MessageMedia';
                storeUrl: string;
            } | {
                __typename: 'OperatorMedia';
                storeUrl: string;
            } | {
                __typename: 'PartnerMedia';
                storeUrl: string;
            } | {
                __typename: 'SharedMedia';
                storeUrl: string;
            } | {
                __typename: 'UserMedia';
                storeUrl: string;
            }>;
        }>;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SubscribeToUserBookingsStatusChangesSubscriptionVariables = Exact<{
    bookingsIds?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;
export declare type SubscribeToUserBookingsStatusChangesSubscription = {
    __typename: 'Subscription';
    userBookingsStatusChangesSub?: Maybe<{
        __typename: 'Booking';
        id: string;
        status?: Maybe<BookingStatus>;
        startDate?: Maybe<Date>;
        endDate?: Maybe<Date>;
        user?: Maybe<{
            __typename: 'User';
            id: string;
            firstName: string;
            lastName?: Maybe<string>;
        }>;
        operator?: Maybe<{
            __typename: 'IndividualOperator';
            id: string;
            account?: Maybe<{
                __typename: 'Account';
                user?: Maybe<{
                    __typename: 'User';
                    firstName: string;
                    lastName?: Maybe<string>;
                }>;
            }>;
            avatar?: Maybe<{
                __typename: 'DonationReceiptMedia';
                storeUrl: string;
            } | {
                __typename: 'LanguageOptionMedia';
                storeUrl: string;
            } | {
                __typename: 'MessageMedia';
                storeUrl: string;
            } | {
                __typename: 'OperatorMedia';
                storeUrl: string;
            } | {
                __typename: 'PartnerMedia';
                storeUrl: string;
            } | {
                __typename: 'SharedMedia';
                storeUrl: string;
            } | {
                __typename: 'UserMedia';
                storeUrl: string;
            }>;
        }>;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SubscribeToNewlyCreatedBookingsAsSitterSubscriptionVariables = Exact<{
    sitterId?: Maybe<Scalars['ID']>;
}>;
export declare type SubscribeToNewlyCreatedBookingsAsSitterSubscription = {
    __typename: 'Subscription';
    newlyCreatedBookingsAsSitterSub?: Maybe<{
        __typename: 'Booking';
        id: string;
        startDate?: Maybe<Date>;
        endDate?: Maybe<Date>;
        priceWithOutApplicationFee?: Maybe<number>;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CreateBookingClaimMutationVariables = Exact<{
    input: CreateBookingClaimInput;
}>;
export declare type CreateBookingClaimMutation = {
    __typename: 'Mutation';
    createBookingClaim?: Maybe<{
        __typename: 'Claim';
        id: string;
        reason: string;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type GetBookingClaimsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetBookingClaimsQuery = {
    __typename: 'Query';
    claims?: Maybe<{
        __typename: 'ClaimsList';
        claims?: Maybe<Array<Maybe<{
            __typename: 'Claim';
            id: string;
            reason: string;
            user?: Maybe<{
                __typename: 'User';
                firstName: string;
                lastName?: Maybe<string>;
                account?: Maybe<{
                    __typename: 'Account';
                    email?: Maybe<string>;
                }>;
                avatar?: Maybe<{
                    __typename: 'DonationReceiptMedia';
                    storeUrl: string;
                } | {
                    __typename: 'LanguageOptionMedia';
                    storeUrl: string;
                } | {
                    __typename: 'MessageMedia';
                    storeUrl: string;
                } | {
                    __typename: 'OperatorMedia';
                    storeUrl: string;
                } | {
                    __typename: 'PartnerMedia';
                    storeUrl: string;
                } | {
                    __typename: 'SharedMedia';
                    storeUrl: string;
                } | {
                    __typename: 'UserMedia';
                    storeUrl: string;
                }>;
            }>;
            operator?: Maybe<{
                __typename: 'IndividualOperator';
                averageScore?: Maybe<number>;
                location?: Maybe<{
                    __typename: 'Location';
                    address?: Maybe<string>;
                    city?: Maybe<string>;
                }>;
                avatar?: Maybe<{
                    __typename: 'DonationReceiptMedia';
                    storeUrl: string;
                } | {
                    __typename: 'LanguageOptionMedia';
                    storeUrl: string;
                } | {
                    __typename: 'MessageMedia';
                    storeUrl: string;
                } | {
                    __typename: 'OperatorMedia';
                    storeUrl: string;
                } | {
                    __typename: 'PartnerMedia';
                    storeUrl: string;
                } | {
                    __typename: 'SharedMedia';
                    storeUrl: string;
                } | {
                    __typename: 'UserMedia';
                    storeUrl: string;
                }>;
                account?: Maybe<{
                    __typename: 'Account';
                    email?: Maybe<string>;
                    user?: Maybe<{
                        __typename: 'User';
                        firstName: string;
                        lastName?: Maybe<string>;
                    }>;
                }>;
            }>;
            booking?: Maybe<{
                __typename: 'Booking';
                id: string;
                startDate?: Maybe<Date>;
                endDate?: Maybe<Date>;
                animalsIds?: Maybe<Array<Maybe<string>>>;
                priceWithOutApplicationFee?: Maybe<number>;
                applicationFeeAmount?: Maybe<number>;
                service?: Maybe<{
                    __typename: 'ServiceOption';
                    nameFr: string;
                    nameEn: string;
                }>;
            }>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type GetBookingClaimByIdQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetBookingClaimByIdQuery = {
    __typename: 'Query';
    claimById?: Maybe<{
        __typename: 'Claim';
        id: string;
        reason: string;
        user?: Maybe<{
            __typename: 'User';
            firstName: string;
            lastName?: Maybe<string>;
            account?: Maybe<{
                __typename: 'Account';
                email?: Maybe<string>;
            }>;
            avatar?: Maybe<{
                __typename: 'DonationReceiptMedia';
                storeUrl: string;
            } | {
                __typename: 'LanguageOptionMedia';
                storeUrl: string;
            } | {
                __typename: 'MessageMedia';
                storeUrl: string;
            } | {
                __typename: 'OperatorMedia';
                storeUrl: string;
            } | {
                __typename: 'PartnerMedia';
                storeUrl: string;
            } | {
                __typename: 'SharedMedia';
                storeUrl: string;
            } | {
                __typename: 'UserMedia';
                storeUrl: string;
            }>;
        }>;
        operator?: Maybe<{
            __typename: 'IndividualOperator';
            averageScore?: Maybe<number>;
            location?: Maybe<{
                __typename: 'Location';
                address?: Maybe<string>;
                city?: Maybe<string>;
            }>;
            avatar?: Maybe<{
                __typename: 'DonationReceiptMedia';
                storeUrl: string;
            } | {
                __typename: 'LanguageOptionMedia';
                storeUrl: string;
            } | {
                __typename: 'MessageMedia';
                storeUrl: string;
            } | {
                __typename: 'OperatorMedia';
                storeUrl: string;
            } | {
                __typename: 'PartnerMedia';
                storeUrl: string;
            } | {
                __typename: 'SharedMedia';
                storeUrl: string;
            } | {
                __typename: 'UserMedia';
                storeUrl: string;
            }>;
            account?: Maybe<{
                __typename: 'Account';
                email?: Maybe<string>;
                user?: Maybe<{
                    __typename: 'User';
                    firstName: string;
                    lastName?: Maybe<string>;
                }>;
            }>;
        }>;
        booking?: Maybe<{
            __typename: 'Booking';
            id: string;
            startDate?: Maybe<Date>;
            endDate?: Maybe<Date>;
            animalsIds?: Maybe<Array<Maybe<string>>>;
            priceWithOutApplicationFee?: Maybe<number>;
            applicationFeeAmount?: Maybe<number>;
            service?: Maybe<{
                __typename: 'ServiceOption';
                nameFr: string;
                nameEn: string;
            }>;
            messages?: Maybe<Array<Maybe<{
                __typename: 'OperatorBookingMessage';
                operatorId: string;
                id: string;
                content: string;
                readAt?: Maybe<Date>;
            } | {
                __typename: 'StaffBookingMessage';
                id: string;
                content: string;
                readAt?: Maybe<Date>;
            } | {
                __typename: 'UserBookingMessage';
                userId: string;
                id: string;
                content: string;
                readAt?: Maybe<Date>;
            }>>>;
        }>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CurrentOperatorDonationsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CurrentOperatorDonationsQuery = {
    __typename: 'Query';
    currentOperatorDonations?: Maybe<{
        __typename: 'DonationsList';
        donations?: Maybe<Array<Maybe<{
            __typename: 'Donation';
            id: string;
            amountToDonate?: Maybe<number>;
            donationDate?: Maybe<Date>;
            partnerId: string;
            booking?: Maybe<{
                __typename: 'Booking';
                status?: Maybe<BookingStatus>;
            }>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SearchDonationsQueryVariables = Exact<{
    input: SearchDonationsInput;
}>;
export declare type SearchDonationsQuery = {
    __typename: 'Query';
    searchDonations?: Maybe<{
        __typename: 'DonationsList';
        donations?: Maybe<Array<Maybe<{
            __typename: 'Donation';
            id: string;
            amountToDonate?: Maybe<number>;
            donationDate?: Maybe<Date>;
            partnerId: string;
            createdAt?: Maybe<Date>;
            updatedAt?: Maybe<Date>;
            booking?: Maybe<{
                __typename: 'Booking';
                status?: Maybe<BookingStatus>;
            }>;
            partner?: Maybe<{
                __typename: 'Partner';
                name: string;
            }>;
        }>>>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CreateDonationReceiptMutationVariables = Exact<{
    input: CreateDonationReceiptInput;
}>;
export declare type CreateDonationReceiptMutation = {
    __typename: 'Mutation';
    createDonationReceipt?: Maybe<{
        __typename: 'DonationReceipt';
        id: string;
        amountDonated?: Maybe<number>;
        createdAt?: Maybe<Date>;
        updatedAt?: Maybe<Date>;
        donations?: Maybe<Array<Maybe<{
            __typename: 'Donation';
            id: string;
        }>>>;
        files?: Maybe<Array<Maybe<{
            __typename: 'DonationReceiptMedia';
            storeUrl: string;
        } | {
            __typename: 'LanguageOptionMedia';
            storeUrl: string;
        } | {
            __typename: 'MessageMedia';
            storeUrl: string;
        } | {
            __typename: 'OperatorMedia';
            storeUrl: string;
        } | {
            __typename: 'PartnerMedia';
            storeUrl: string;
        } | {
            __typename: 'SharedMedia';
            storeUrl: string;
        } | {
            __typename: 'UserMedia';
            storeUrl: string;
        }>>>;
        partner?: Maybe<{
            __typename: 'Partner';
            name: string;
            medias?: Maybe<Array<Maybe<{
                __typename: 'DonationReceiptMedia';
                storeUrl: string;
            } | {
                __typename: 'LanguageOptionMedia';
                storeUrl: string;
            } | {
                __typename: 'MessageMedia';
                storeUrl: string;
            } | {
                __typename: 'OperatorMedia';
                storeUrl: string;
            } | {
                __typename: 'PartnerMedia';
                storeUrl: string;
            } | {
                __typename: 'SharedMedia';
                storeUrl: string;
            } | {
                __typename: 'UserMedia';
                storeUrl: string;
            }>>>;
        }>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SearchDonationReceiptsQueryVariables = Exact<{
    input: SearchDonationReceiptsInput;
}>;
export declare type SearchDonationReceiptsQuery = {
    __typename: 'Query';
    searchDonationReceipts?: Maybe<{
        __typename: 'DonationReceiptsList';
        donationReceipts?: Maybe<Array<Maybe<{
            __typename: 'DonationReceipt';
            id: string;
            amountDonated?: Maybe<number>;
            createdAt?: Maybe<Date>;
            updatedAt?: Maybe<Date>;
            files?: Maybe<Array<Maybe<{
                __typename: 'DonationReceiptMedia';
                storeUrl: string;
            } | {
                __typename: 'LanguageOptionMedia';
                storeUrl: string;
            } | {
                __typename: 'MessageMedia';
                storeUrl: string;
            } | {
                __typename: 'OperatorMedia';
                storeUrl: string;
            } | {
                __typename: 'PartnerMedia';
                storeUrl: string;
            } | {
                __typename: 'SharedMedia';
                storeUrl: string;
            } | {
                __typename: 'UserMedia';
                storeUrl: string;
            }>>>;
            partner?: Maybe<{
                __typename: 'Partner';
                name: string;
                medias?: Maybe<Array<Maybe<{
                    __typename: 'DonationReceiptMedia';
                    storeUrl: string;
                } | {
                    __typename: 'LanguageOptionMedia';
                    storeUrl: string;
                } | {
                    __typename: 'MessageMedia';
                    storeUrl: string;
                } | {
                    __typename: 'OperatorMedia';
                    storeUrl: string;
                } | {
                    __typename: 'PartnerMedia';
                    storeUrl: string;
                } | {
                    __typename: 'SharedMedia';
                    storeUrl: string;
                } | {
                    __typename: 'UserMedia';
                    storeUrl: string;
                }>>>;
            }>;
            donations?: Maybe<Array<Maybe<{
                __typename: 'Donation';
                id: string;
            }>>>;
        }>>>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type InvalidArgumentsFieldsFragment = {
    __typename: 'InvalidArgumentsError';
    invalidArguments: Array<Maybe<{
        __typename: 'InvalidArgument';
        key: string;
        message: string;
    }>>;
};
export declare type NotFoundFieldsFragment = {
    __typename: 'NotFoundError';
    code: ErrorCode;
    message: ErrorMessage;
};
export declare type UnableToProcessFieldsFragment = {
    __typename: 'UnableToProcessError';
    code: ErrorCode;
    message: ErrorMessage;
};
export declare type UserAuthFieldsFragment = {
    __typename: 'UserAuthenticationError';
    code: ErrorCode;
    message: ErrorMessage;
};
export declare type UserForbiddenFieldsFragment = {
    __typename: 'UserForbiddenError';
    code: ErrorCode;
    message: ErrorMessage;
};
export declare type CreateGenderOptionMutationVariables = Exact<{
    input: CreateGenderOptionInput;
}>;
export declare type CreateGenderOptionMutation = {
    __typename: 'Mutation';
    createGenderOption?: Maybe<{
        __typename: 'GenderOption';
        id: string;
        nameFr: string;
        nameEn: string;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type UpdateGenderOptionMutationVariables = Exact<{
    id: Scalars['ID'];
    input: UpdateGenderOptionInput;
}>;
export declare type UpdateGenderOptionMutation = {
    __typename: 'Mutation';
    updateGenderOption?: Maybe<{
        __typename: 'GenderOption';
        id: string;
        nameFr: string;
        nameEn: string;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type DeleteGenderOptionMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteGenderOptionMutation = {
    __typename: 'Mutation';
    deleteGenderOption?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type GetGendersOptionsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetGendersOptionsQuery = {
    __typename: 'Query';
    gendersOptions?: Maybe<{
        __typename: 'GenderOptionsList';
        genderOptions?: Maybe<Array<Maybe<{
            __typename: 'GenderOption';
            id: string;
            nameFr: string;
            nameEn: string;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CreateHostingOptionMutationVariables = Exact<{
    input: CreateHostingOptionInput;
}>;
export declare type CreateHostingOptionMutation = {
    __typename: 'Mutation';
    createHostingOption?: Maybe<{
        __typename: 'HostingOption';
        id: string;
        nameFr: string;
        nameEn: string;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type UpdateHostingOptionMutationVariables = Exact<{
    id: Scalars['ID'];
    input: UpdateHostingOptionInput;
}>;
export declare type UpdateHostingOptionMutation = {
    __typename: 'Mutation';
    updateHostingOption?: Maybe<{
        __typename: 'HostingOption';
        id: string;
        nameFr: string;
        nameEn: string;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type DeleteHostingOptionMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteHostingOptionMutation = {
    __typename: 'Mutation';
    deleteHostingOption?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type GetHostingsOptionsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetHostingsOptionsQuery = {
    __typename: 'Query';
    hostingsOptions?: Maybe<{
        __typename: 'HostingOptionsList';
        hostingOptions?: Maybe<Array<Maybe<{
            __typename: 'HostingOption';
            id: string;
            nameFr: string;
            nameEn: string;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CreateLanguageOptionMutationVariables = Exact<{
    input: CreateLanguageOptionInput;
}>;
export declare type CreateLanguageOptionMutation = {
    __typename: 'Mutation';
    createLanguageOption?: Maybe<{
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'LanguageOption';
        id: string;
        nameFr: string;
        nameEn: string;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type UpdateLanguageOptionMutationVariables = Exact<{
    id: Scalars['ID'];
    input: UpdateLanguageOptionInput;
}>;
export declare type UpdateLanguageOptionMutation = {
    __typename: 'Mutation';
    updateLanguageOption?: Maybe<{
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'LanguageOption';
        id: string;
        nameFr: string;
        nameEn: string;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type DeleteLanguageOptionMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteLanguageOptionMutation = {
    __typename: 'Mutation';
    deleteLanguageOption?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type GetLanguagesOptionsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetLanguagesOptionsQuery = {
    __typename: 'Query';
    languagesOptions?: Maybe<{
        __typename: 'LanguageOptionsList';
        languageOptions?: Maybe<Array<Maybe<{
            __typename: 'LanguageOption';
            id: string;
            nameFr: string;
            nameEn: string;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type LocationSearchQueryVariables = Exact<{
    query: Scalars['String'];
    locale: Scalars['String'];
}>;
export declare type LocationSearchQuery = {
    __typename: 'Query';
    locationSearch?: Maybe<{
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'LocationsList';
        locations?: Maybe<Array<Maybe<{
            __typename: 'LocationSearchInfos';
            id?: Maybe<string>;
            formattedLocationString?: Maybe<string>;
            locale_names?: Maybe<string>;
            postcode?: Maybe<string>;
            city?: Maybe<string>;
            country?: Maybe<string>;
            country_code?: Maybe<string>;
            latitude?: Maybe<number>;
            longitude?: Maybe<any>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CreateMediaMutationVariables = Exact<{
    input: CreateMediaInput;
}>;
export declare type CreateMediaMutation = {
    __typename: 'Mutation';
    createMedia?: Maybe<{
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'StorageInfos';
        signedRequest?: Maybe<string>;
        url?: Maybe<string>;
        mediaId: string;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SetMediaAsAvatarMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type SetMediaAsAvatarMutation = {
    __typename: 'Mutation';
    setMediaAsAvatar?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type DeleteMediaMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteMediaMutation = {
    __typename: 'Mutation';
    deleteMedia?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'IsActiveOperatorMainMediaError';
        activeOperatorMainMediaError: string;
    } | {
        __typename: 'IsActiveOperatorWithNoReplacementMediaError';
        activeOperatorWithNoReplacementMediaError: string;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
declare type MessageFields_OperatorBookingMessage_Fragment = {
    __typename: 'OperatorBookingMessage';
    id: string;
    updatedAt?: Maybe<Date>;
    readAt?: Maybe<Date>;
};
declare type MessageFields_StaffBookingMessage_Fragment = {
    __typename: 'StaffBookingMessage';
    id: string;
    updatedAt?: Maybe<Date>;
    readAt?: Maybe<Date>;
};
declare type MessageFields_UserBookingMessage_Fragment = {
    __typename: 'UserBookingMessage';
    id: string;
    updatedAt?: Maybe<Date>;
    readAt?: Maybe<Date>;
};
export declare type MessageFieldsFragment = MessageFields_OperatorBookingMessage_Fragment | MessageFields_StaffBookingMessage_Fragment | MessageFields_UserBookingMessage_Fragment;
export declare type CreateMessageMutationVariables = Exact<{
    input: CreateMessageInput;
}>;
export declare type CreateMessageMutation = {
    __typename: 'Mutation';
    createMessage?: Maybe<{
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'OperatorBookingMessage';
        id: string;
        updatedAt?: Maybe<Date>;
        readAt?: Maybe<Date>;
    } | {
        __typename: 'StaffBookingMessage';
        id: string;
        updatedAt?: Maybe<Date>;
        readAt?: Maybe<Date>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserBookingMessage';
        id: string;
        updatedAt?: Maybe<Date>;
        readAt?: Maybe<Date>;
    }>;
};
export declare type UpdateMessageMutationVariables = Exact<{
    id: Scalars['ID'];
    input: UpdateMessageInput;
}>;
export declare type UpdateMessageMutation = {
    __typename: 'Mutation';
    updateMessage?: Maybe<{
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'OperatorBookingMessage';
        id: string;
        updatedAt?: Maybe<Date>;
        readAt?: Maybe<Date>;
    } | {
        __typename: 'StaffBookingMessage';
        id: string;
        updatedAt?: Maybe<Date>;
        readAt?: Maybe<Date>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserBookingMessage';
        id: string;
        updatedAt?: Maybe<Date>;
        readAt?: Maybe<Date>;
    }>;
};
export declare type SetAsReadMutationVariables = Exact<{
    input: SetMessagesAsReadInput;
}>;
export declare type SetAsReadMutation = {
    __typename: 'Mutation';
    setAsRead?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
    } | {
        __typename: 'UnableToProcessError';
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type MessagesByBookingIdQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type MessagesByBookingIdQuery = {
    __typename: 'Query';
    messagesByBookingId?: Maybe<{
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'MessagesList';
        messages?: Maybe<Array<Maybe<{
            __typename: 'OperatorBookingMessage';
            content: string;
            id: string;
            updatedAt?: Maybe<Date>;
            readAt?: Maybe<Date>;
        } | {
            __typename: 'StaffBookingMessage';
            content: string;
            id: string;
            updatedAt?: Maybe<Date>;
            readAt?: Maybe<Date>;
        } | {
            __typename: 'UserBookingMessage';
            content: string;
            id: string;
            updatedAt?: Maybe<Date>;
            readAt?: Maybe<Date>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CreateIndividualOperatorMutationVariables = Exact<{
    input: CreateIndividualOperatorInput;
}>;
export declare type CreateIndividualOperatorMutation = {
    __typename: 'Mutation';
    createIndividualOperator?: Maybe<{
        __typename: 'IndividualOperator';
        id: string;
        description?: Maybe<string>;
        birthDate?: Maybe<Date>;
        genderOptionId?: Maybe<string>;
        hostingOptionId?: Maybe<string>;
        languageOptionIds?: Maybe<Array<Maybe<string>>>;
        acceptedSpecieOptionsIds?: Maybe<Array<Maybe<string>>>;
        ownAnimalsSpecieOptionsIds?: Maybe<Array<Maybe<string>>>;
        partnerId?: Maybe<string>;
        partnerPercentage?: Maybe<number>;
        avatar?: Maybe<{
            __typename: 'DonationReceiptMedia';
            storeUrl: string;
        } | {
            __typename: 'LanguageOptionMedia';
            storeUrl: string;
        } | {
            __typename: 'MessageMedia';
            storeUrl: string;
        } | {
            __typename: 'OperatorMedia';
            storeUrl: string;
        } | {
            __typename: 'PartnerMedia';
            storeUrl: string;
        } | {
            __typename: 'SharedMedia';
            storeUrl: string;
        } | {
            __typename: 'UserMedia';
            storeUrl: string;
        }>;
        account?: Maybe<{
            __typename: 'Account';
            user?: Maybe<{
                __typename: 'User';
                firstName: string;
                lastName?: Maybe<string>;
            }>;
        }>;
        location?: Maybe<{
            __typename: 'Location';
            address?: Maybe<string>;
            city?: Maybe<string>;
            country?: Maybe<string>;
            country_code?: Maybe<string>;
            postcode?: Maybe<string>;
            latitude: number;
            longitude: any;
        }>;
        availabilities?: Maybe<Array<Maybe<{
            __typename: 'OperatorAvailability';
            id: string;
            date?: Maybe<Date>;
        }>>>;
        coreServices?: Maybe<Array<Maybe<{
            __typename: 'IndividualOperatorCoreService';
            serviceOptionId: string;
            price: number;
        }>>>;
        extraServices?: Maybe<{
            __typename: 'IndividualOperatorExtraService';
            atHomeExclusivity?: Maybe<boolean>;
            atHomeExclusivityExtraPrice?: Maybe<number>;
            atHomeContinuously?: Maybe<boolean>;
            atHomeContinuouslyExtraPrice?: Maybe<number>;
            atHomeOnlyBringPet?: Maybe<boolean>;
            atHomeOnlyBringPetExtraPrice?: Maybe<number>;
            atHomeComeGetPet?: Maybe<boolean>;
            atHomeComeGetPetExtraPrice?: Maybe<number>;
            atOwnerHomePlantsCare?: Maybe<boolean>;
            atOwnerHomePlantsCareExtraPrice?: Maybe<number>;
            atOwnerHomeMail?: Maybe<boolean>;
            atOwnerHomeMailExtraPrice?: Maybe<number>;
            atOwnerHomeCurtains?: Maybe<boolean>;
            atOwnerHomeCurtainsExtraPrice?: Maybe<number>;
            acceptShortNotice?: Maybe<boolean>;
            flexibleCancelation?: Maybe<boolean>;
            isProfessionalOperator?: Maybe<boolean>;
            abilityToProvideMedicalCare?: Maybe<boolean>;
        }>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type UpdateIndividualOperatorMutationVariables = Exact<{
    input: UpdateIndividualOperatorInput;
}>;
export declare type UpdateIndividualOperatorMutation = {
    __typename: 'Mutation';
    updateIndividualOperator?: Maybe<{
        __typename: 'IndividualOperator';
        id: string;
        description?: Maybe<string>;
        birthDate?: Maybe<Date>;
        genderOptionId?: Maybe<string>;
        hostingOptionId?: Maybe<string>;
        languageOptionIds?: Maybe<Array<Maybe<string>>>;
        acceptedSpecieOptionsIds?: Maybe<Array<Maybe<string>>>;
        ownAnimalsSpecieOptionsIds?: Maybe<Array<Maybe<string>>>;
        partnerId?: Maybe<string>;
        partnerPercentage?: Maybe<number>;
        avatar?: Maybe<{
            __typename: 'DonationReceiptMedia';
            storeUrl: string;
        } | {
            __typename: 'LanguageOptionMedia';
            storeUrl: string;
        } | {
            __typename: 'MessageMedia';
            storeUrl: string;
        } | {
            __typename: 'OperatorMedia';
            storeUrl: string;
        } | {
            __typename: 'PartnerMedia';
            storeUrl: string;
        } | {
            __typename: 'SharedMedia';
            storeUrl: string;
        } | {
            __typename: 'UserMedia';
            storeUrl: string;
        }>;
        account?: Maybe<{
            __typename: 'Account';
            user?: Maybe<{
                __typename: 'User';
                firstName: string;
                lastName?: Maybe<string>;
            }>;
        }>;
        location?: Maybe<{
            __typename: 'Location';
            address?: Maybe<string>;
            city?: Maybe<string>;
            country?: Maybe<string>;
            country_code?: Maybe<string>;
            postcode?: Maybe<string>;
            latitude: number;
            longitude: any;
        }>;
        availabilities?: Maybe<Array<Maybe<{
            __typename: 'OperatorAvailability';
            id: string;
            date?: Maybe<Date>;
        }>>>;
        coreServices?: Maybe<Array<Maybe<{
            __typename: 'IndividualOperatorCoreService';
            serviceOptionId: string;
            price: number;
        }>>>;
        extraServices?: Maybe<{
            __typename: 'IndividualOperatorExtraService';
            atHomeExclusivity?: Maybe<boolean>;
            atHomeExclusivityExtraPrice?: Maybe<number>;
            atHomeContinuously?: Maybe<boolean>;
            atHomeContinuouslyExtraPrice?: Maybe<number>;
            atHomeOnlyBringPet?: Maybe<boolean>;
            atHomeOnlyBringPetExtraPrice?: Maybe<number>;
            atHomeComeGetPet?: Maybe<boolean>;
            atHomeComeGetPetExtraPrice?: Maybe<number>;
            atOwnerHomePlantsCare?: Maybe<boolean>;
            atOwnerHomePlantsCareExtraPrice?: Maybe<number>;
            atOwnerHomeMail?: Maybe<boolean>;
            atOwnerHomeMailExtraPrice?: Maybe<number>;
            atOwnerHomeCurtains?: Maybe<boolean>;
            atOwnerHomeCurtainsExtraPrice?: Maybe<number>;
            acceptShortNotice?: Maybe<boolean>;
            flexibleCancelation?: Maybe<boolean>;
            isProfessionalOperator?: Maybe<boolean>;
            abilityToProvideMedicalCare?: Maybe<boolean>;
        }>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CurrentOperatorQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CurrentOperatorQuery = {
    __typename: 'Query';
    currentOperator?: Maybe<{
        __typename: 'IndividualOperator';
        id: string;
        description?: Maybe<string>;
        birthDate?: Maybe<Date>;
        genderOptionId?: Maybe<string>;
        hostingOptionId?: Maybe<string>;
        languageOptionIds?: Maybe<Array<Maybe<string>>>;
        acceptedSpecieOptionsIds?: Maybe<Array<Maybe<string>>>;
        ownAnimalsSpecieOptionsIds?: Maybe<Array<Maybe<string>>>;
        partnerId?: Maybe<string>;
        partnerPercentage?: Maybe<number>;
        avatar?: Maybe<{
            __typename: 'DonationReceiptMedia';
            storeUrl: string;
        } | {
            __typename: 'LanguageOptionMedia';
            storeUrl: string;
        } | {
            __typename: 'MessageMedia';
            storeUrl: string;
        } | {
            __typename: 'OperatorMedia';
            storeUrl: string;
        } | {
            __typename: 'PartnerMedia';
            storeUrl: string;
        } | {
            __typename: 'SharedMedia';
            storeUrl: string;
        } | {
            __typename: 'UserMedia';
            storeUrl: string;
        }>;
        account?: Maybe<{
            __typename: 'Account';
            user?: Maybe<{
                __typename: 'User';
                firstName: string;
                lastName?: Maybe<string>;
            }>;
        }>;
        location?: Maybe<{
            __typename: 'Location';
            address?: Maybe<string>;
            city?: Maybe<string>;
            country?: Maybe<string>;
            country_code?: Maybe<string>;
            postcode?: Maybe<string>;
            latitude: number;
            longitude: any;
        }>;
        availabilities?: Maybe<Array<Maybe<{
            __typename: 'OperatorAvailability';
            id: string;
            date?: Maybe<Date>;
        }>>>;
        coreServices?: Maybe<Array<Maybe<{
            __typename: 'IndividualOperatorCoreService';
            serviceOptionId: string;
            price: number;
        }>>>;
        extraServices?: Maybe<{
            __typename: 'IndividualOperatorExtraService';
            atHomeExclusivity?: Maybe<boolean>;
            atHomeExclusivityExtraPrice?: Maybe<number>;
            atHomeContinuously?: Maybe<boolean>;
            atHomeContinuouslyExtraPrice?: Maybe<number>;
            atHomeOnlyBringPet?: Maybe<boolean>;
            atHomeOnlyBringPetExtraPrice?: Maybe<number>;
            atHomeComeGetPet?: Maybe<boolean>;
            atHomeComeGetPetExtraPrice?: Maybe<number>;
            atOwnerHomePlantsCare?: Maybe<boolean>;
            atOwnerHomePlantsCareExtraPrice?: Maybe<number>;
            atOwnerHomeMail?: Maybe<boolean>;
            atOwnerHomeMailExtraPrice?: Maybe<number>;
            atOwnerHomeCurtains?: Maybe<boolean>;
            atOwnerHomeCurtainsExtraPrice?: Maybe<number>;
            acceptShortNotice?: Maybe<boolean>;
            flexibleCancelation?: Maybe<boolean>;
            isProfessionalOperator?: Maybe<boolean>;
            abilityToProvideMedicalCare?: Maybe<boolean>;
        }>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type OperatorByIdQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type OperatorByIdQuery = {
    __typename: 'Query';
    operatorById?: Maybe<{
        __typename: 'IndividualOperator';
        id: string;
        description?: Maybe<string>;
        genderOptionId?: Maybe<string>;
        hostingOptionId?: Maybe<string>;
        languageOptionIds?: Maybe<Array<Maybe<string>>>;
        acceptedSpecieOptionsIds?: Maybe<Array<Maybe<string>>>;
        ownAnimalsSpecieOptionsIds?: Maybe<Array<Maybe<string>>>;
        averageScore?: Maybe<number>;
        averageResponseTime?: Maybe<Date>;
        partnerId?: Maybe<string>;
        partnerPercentage?: Maybe<number>;
        account?: Maybe<{
            __typename: 'Account';
            user?: Maybe<{
                __typename: 'User';
                firstName: string;
            }>;
        }>;
        avatar?: Maybe<{
            __typename: 'DonationReceiptMedia';
            storeUrl: string;
        } | {
            __typename: 'LanguageOptionMedia';
            storeUrl: string;
        } | {
            __typename: 'MessageMedia';
            storeUrl: string;
        } | {
            __typename: 'OperatorMedia';
            storeUrl: string;
        } | {
            __typename: 'PartnerMedia';
            storeUrl: string;
        } | {
            __typename: 'SharedMedia';
            storeUrl: string;
        } | {
            __typename: 'UserMedia';
            storeUrl: string;
        }>;
        medias?: Maybe<Array<Maybe<{
            __typename: 'DonationReceiptMedia';
            storeUrl: string;
        } | {
            __typename: 'LanguageOptionMedia';
            storeUrl: string;
        } | {
            __typename: 'MessageMedia';
            storeUrl: string;
        } | {
            __typename: 'OperatorMedia';
            storeUrl: string;
        } | {
            __typename: 'PartnerMedia';
            storeUrl: string;
        } | {
            __typename: 'SharedMedia';
            storeUrl: string;
        } | {
            __typename: 'UserMedia';
            storeUrl: string;
        }>>>;
        location?: Maybe<{
            __typename: 'Location';
            city?: Maybe<string>;
            country?: Maybe<string>;
            latitude: number;
            longitude: any;
        }>;
        coreServices?: Maybe<Array<Maybe<{
            __typename: 'IndividualOperatorCoreService';
            serviceOptionId: string;
            price: number;
        }>>>;
        extraServices?: Maybe<{
            __typename: 'IndividualOperatorExtraService';
            atHomeExclusivity?: Maybe<boolean>;
            atHomeExclusivityExtraPrice?: Maybe<number>;
            atHomeContinuously?: Maybe<boolean>;
            atHomeContinuouslyExtraPrice?: Maybe<number>;
            atHomeOnlyBringPet?: Maybe<boolean>;
            atHomeOnlyBringPetExtraPrice?: Maybe<number>;
            atHomeComeGetPet?: Maybe<boolean>;
            atHomeComeGetPetExtraPrice?: Maybe<number>;
            atOwnerHomePlantsCare?: Maybe<boolean>;
            atOwnerHomePlantsCareExtraPrice?: Maybe<number>;
            atOwnerHomeMail?: Maybe<boolean>;
            atOwnerHomeMailExtraPrice?: Maybe<number>;
            atOwnerHomeCurtains?: Maybe<boolean>;
            atOwnerHomeCurtainsExtraPrice?: Maybe<number>;
            acceptShortNotice?: Maybe<boolean>;
            flexibleCancelation?: Maybe<boolean>;
            isProfessionalOperator?: Maybe<boolean>;
            abilityToProvideMedicalCare?: Maybe<boolean>;
        }>;
        availabilities?: Maybe<Array<Maybe<{
            __typename: 'OperatorAvailability';
            id: string;
            date?: Maybe<Date>;
        }>>>;
        reviews?: Maybe<Array<Maybe<{
            __typename: 'OperatorReview';
            id: string;
            createdAt?: Maybe<Date>;
            score: number;
            title: string;
            body?: Maybe<string>;
        } | {
            __typename: 'UserReview';
            id: string;
            createdAt?: Maybe<Date>;
            score: number;
            title: string;
            body?: Maybe<string>;
            user?: Maybe<{
                __typename: 'User';
                firstName: string;
                avatar?: Maybe<{
                    __typename: 'DonationReceiptMedia';
                    storeUrl: string;
                } | {
                    __typename: 'LanguageOptionMedia';
                    storeUrl: string;
                } | {
                    __typename: 'MessageMedia';
                    storeUrl: string;
                } | {
                    __typename: 'OperatorMedia';
                    storeUrl: string;
                } | {
                    __typename: 'PartnerMedia';
                    storeUrl: string;
                } | {
                    __typename: 'SharedMedia';
                    storeUrl: string;
                } | {
                    __typename: 'UserMedia';
                    storeUrl: string;
                }>;
            }>;
        }>>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type OperatorBookingInfosByIdQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type OperatorBookingInfosByIdQuery = {
    __typename: 'Query';
    operatorById?: Maybe<{
        __typename: 'IndividualOperator';
        id: string;
        hostingOptionId?: Maybe<string>;
        averageScore?: Maybe<number>;
        avatar?: Maybe<{
            __typename: 'DonationReceiptMedia';
            storeUrl: string;
        } | {
            __typename: 'LanguageOptionMedia';
            storeUrl: string;
        } | {
            __typename: 'MessageMedia';
            storeUrl: string;
        } | {
            __typename: 'OperatorMedia';
            storeUrl: string;
        } | {
            __typename: 'PartnerMedia';
            storeUrl: string;
        } | {
            __typename: 'SharedMedia';
            storeUrl: string;
        } | {
            __typename: 'UserMedia';
            storeUrl: string;
        }>;
        account?: Maybe<{
            __typename: 'Account';
            user?: Maybe<{
                __typename: 'User';
                firstName: string;
            }>;
        }>;
        location?: Maybe<{
            __typename: 'Location';
            city?: Maybe<string>;
            postcode?: Maybe<string>;
        }>;
        availabilities?: Maybe<Array<Maybe<{
            __typename: 'OperatorAvailability';
            id: string;
            date?: Maybe<Date>;
        }>>>;
        coreServices?: Maybe<Array<Maybe<{
            __typename: 'IndividualOperatorCoreService';
            serviceOptionId: string;
            price: number;
        }>>>;
        extraServices?: Maybe<{
            __typename: 'IndividualOperatorExtraService';
            atHomeExclusivity?: Maybe<boolean>;
            atHomeExclusivityExtraPrice?: Maybe<number>;
            atHomeContinuously?: Maybe<boolean>;
            atHomeContinuouslyExtraPrice?: Maybe<number>;
            atHomeOnlyBringPet?: Maybe<boolean>;
            atHomeOnlyBringPetExtraPrice?: Maybe<number>;
            atHomeComeGetPet?: Maybe<boolean>;
            atHomeComeGetPetExtraPrice?: Maybe<number>;
            atOwnerHomePlantsCare?: Maybe<boolean>;
            atOwnerHomePlantsCareExtraPrice?: Maybe<number>;
            atOwnerHomeMail?: Maybe<boolean>;
            atOwnerHomeMailExtraPrice?: Maybe<number>;
            atOwnerHomeCurtains?: Maybe<boolean>;
            atOwnerHomeCurtainsExtraPrice?: Maybe<number>;
            acceptShortNotice?: Maybe<boolean>;
            flexibleCancelation?: Maybe<boolean>;
            isProfessionalOperator?: Maybe<boolean>;
            abilityToProvideMedicalCare?: Maybe<boolean>;
        }>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CurrentOperatorMediasQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CurrentOperatorMediasQuery = {
    __typename: 'Query';
    currentOperator?: Maybe<{
        __typename: 'IndividualOperator';
        avatar?: Maybe<{
            __typename: 'DonationReceiptMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'LanguageOptionMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'MessageMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'OperatorMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'PartnerMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'SharedMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'UserMedia';
            id: string;
            storeUrl: string;
        }>;
        medias?: Maybe<Array<Maybe<{
            __typename: 'DonationReceiptMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'LanguageOptionMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'MessageMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'OperatorMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'PartnerMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'SharedMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'UserMedia';
            id: string;
            storeUrl: string;
        }>>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CurrentOperatorBookingInfosQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CurrentOperatorBookingInfosQuery = {
    __typename: 'Query';
    currentOperator?: Maybe<{
        __typename: 'IndividualOperator';
        acceptedSpecieOptionsIds?: Maybe<Array<Maybe<string>>>;
        ownAnimalsSpecieOptionsIds?: Maybe<Array<Maybe<string>>>;
        location?: Maybe<{
            __typename: 'Location';
            latitude: number;
            longitude: any;
        }>;
        availabilities?: Maybe<Array<Maybe<{
            __typename: 'OperatorAvailability';
            id: string;
            date?: Maybe<Date>;
        }>>>;
        coreServices?: Maybe<Array<Maybe<{
            __typename: 'IndividualOperatorCoreService';
            serviceOptionId: string;
            price: number;
        }>>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SearchOperatorsQueryVariables = Exact<{
    input: SearchOperatorsInput;
}>;
export declare type SearchOperatorsQuery = {
    __typename: 'Query';
    searchOperators?: Maybe<{
        __typename: 'Operators';
        operators?: Maybe<Array<Maybe<{
            __typename: 'IndividualOperator';
            id: string;
            hostingOptionId?: Maybe<string>;
            genderOptionId?: Maybe<string>;
            languageOptionIds?: Maybe<Array<Maybe<string>>>;
            averageScore?: Maybe<number>;
            averageResponseTime?: Maybe<Date>;
            calendarUpdate?: Maybe<Date>;
            partnerId?: Maybe<string>;
            partnerPercentage?: Maybe<number>;
            avatar?: Maybe<{
                __typename: 'DonationReceiptMedia';
                storeUrl: string;
            } | {
                __typename: 'LanguageOptionMedia';
                storeUrl: string;
            } | {
                __typename: 'MessageMedia';
                storeUrl: string;
            } | {
                __typename: 'OperatorMedia';
                storeUrl: string;
            } | {
                __typename: 'PartnerMedia';
                storeUrl: string;
            } | {
                __typename: 'SharedMedia';
                storeUrl: string;
            } | {
                __typename: 'UserMedia';
                storeUrl: string;
            }>;
            location?: Maybe<{
                __typename: 'Location';
                city?: Maybe<string>;
                postcode?: Maybe<string>;
                latitude: number;
                longitude: any;
            }>;
            coreServices?: Maybe<Array<Maybe<{
                __typename: 'IndividualOperatorCoreService';
                serviceOptionId: string;
                price: number;
            }>>>;
            extraServices?: Maybe<{
                __typename: 'IndividualOperatorExtraService';
                atHomeExclusivity?: Maybe<boolean>;
                atHomeExclusivityExtraPrice?: Maybe<number>;
                atHomeContinuously?: Maybe<boolean>;
                atHomeContinuouslyExtraPrice?: Maybe<number>;
                atHomeOnlyBringPet?: Maybe<boolean>;
                atHomeOnlyBringPetExtraPrice?: Maybe<number>;
                atHomeComeGetPet?: Maybe<boolean>;
                atHomeComeGetPetExtraPrice?: Maybe<number>;
                atOwnerHomePlantsCare?: Maybe<boolean>;
                atOwnerHomePlantsCareExtraPrice?: Maybe<number>;
                atOwnerHomeMail?: Maybe<boolean>;
                atOwnerHomeMailExtraPrice?: Maybe<number>;
                atOwnerHomeCurtains?: Maybe<boolean>;
                atOwnerHomeCurtainsExtraPrice?: Maybe<number>;
                acceptShortNotice?: Maybe<boolean>;
                flexibleCancelation?: Maybe<boolean>;
                isProfessionalOperator?: Maybe<boolean>;
                abilityToProvideMedicalCare?: Maybe<boolean>;
            }>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type AllOperatorsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type AllOperatorsQuery = {
    __typename: 'Query';
    allOperators?: Maybe<{
        __typename: 'Operators';
        operators?: Maybe<Array<Maybe<{
            __typename: 'IndividualOperator';
            id: string;
            updatedAt?: Maybe<Date>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CreatePartnerMutationVariables = Exact<{
    input: CreatePartnerInput;
}>;
export declare type CreatePartnerMutation = {
    __typename: 'Mutation';
    createPartner?: Maybe<{
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'Partner';
        id: string;
        name: string;
        description: string;
        websiteUrl: string;
        medias?: Maybe<Array<Maybe<{
            __typename: 'DonationReceiptMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'LanguageOptionMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'MessageMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'OperatorMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'PartnerMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'SharedMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'UserMedia';
            id: string;
            storeUrl: string;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type UpdatePartnerMutationVariables = Exact<{
    id: Scalars['ID'];
    input: UpdatePartnerInput;
}>;
export declare type UpdatePartnerMutation = {
    __typename: 'Mutation';
    updatePartner?: Maybe<{
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'Partner';
        id: string;
        name: string;
        description: string;
        websiteUrl: string;
        medias?: Maybe<Array<Maybe<{
            __typename: 'DonationReceiptMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'LanguageOptionMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'MessageMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'OperatorMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'PartnerMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'SharedMedia';
            id: string;
            storeUrl: string;
        } | {
            __typename: 'UserMedia';
            id: string;
            storeUrl: string;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type DeletePartnerMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeletePartnerMutation = {
    __typename: 'Mutation';
    deletePartner?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type GetPartnersQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetPartnersQuery = {
    __typename: 'Query';
    partners?: Maybe<{
        __typename: 'PartnersList';
        partners?: Maybe<Array<Maybe<{
            __typename: 'Partner';
            id: string;
            name: string;
            description: string;
            websiteUrl: string;
            medias?: Maybe<Array<Maybe<{
                __typename: 'DonationReceiptMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'LanguageOptionMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'MessageMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'OperatorMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'PartnerMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'SharedMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'UserMedia';
                id: string;
                storeUrl: string;
            }>>>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type GetPartnerByIdQueryVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type GetPartnerByIdQuery = {
    __typename: 'Query';
    partnerById?: Maybe<{
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'Partner';
        id: string;
        name: string;
        description: string;
        websiteUrl: string;
        receipts?: Maybe<Array<Maybe<{
            __typename: 'DonationReceipt';
            id: string;
            createdAt?: Maybe<Date>;
            amountDonated?: Maybe<number>;
            files?: Maybe<Array<Maybe<{
                __typename: 'DonationReceiptMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'LanguageOptionMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'MessageMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'OperatorMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'PartnerMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'SharedMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'UserMedia';
                id: string;
                storeUrl: string;
            }>>>;
            donations?: Maybe<Array<Maybe<{
                __typename: 'Donation';
                id: string;
                createdAt?: Maybe<Date>;
                amountToDonate?: Maybe<number>;
                operator?: Maybe<{
                    __typename: 'IndividualOperator';
                    account?: Maybe<{
                        __typename: 'Account';
                        user?: Maybe<{
                            __typename: 'User';
                            firstName: string;
                        }>;
                    }>;
                    avatar?: Maybe<{
                        __typename: 'DonationReceiptMedia';
                        storeUrl: string;
                    } | {
                        __typename: 'LanguageOptionMedia';
                        storeUrl: string;
                    } | {
                        __typename: 'MessageMedia';
                        storeUrl: string;
                    } | {
                        __typename: 'OperatorMedia';
                        storeUrl: string;
                    } | {
                        __typename: 'PartnerMedia';
                        storeUrl: string;
                    } | {
                        __typename: 'SharedMedia';
                        storeUrl: string;
                    } | {
                        __typename: 'UserMedia';
                        storeUrl: string;
                    }>;
                }>;
            }>>>;
        }>>>;
    }>;
};
export declare type GetPartnersIdsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetPartnersIdsQuery = {
    __typename: 'Query';
    partners?: Maybe<{
        __typename: 'PartnersList';
        partners?: Maybe<Array<Maybe<{
            __typename: 'Partner';
            id: string;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type GetPartnersWithReceiptsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetPartnersWithReceiptsQuery = {
    __typename: 'Query';
    partners?: Maybe<{
        __typename: 'PartnersList';
        partners?: Maybe<Array<Maybe<{
            __typename: 'Partner';
            id: string;
            name: string;
            description: string;
            websiteUrl: string;
            medias?: Maybe<Array<Maybe<{
                __typename: 'DonationReceiptMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'LanguageOptionMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'MessageMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'OperatorMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'PartnerMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'SharedMedia';
                id: string;
                storeUrl: string;
            } | {
                __typename: 'UserMedia';
                id: string;
                storeUrl: string;
            }>>>;
            receipts?: Maybe<Array<Maybe<{
                __typename: 'DonationReceipt';
                id: string;
                amountDonated?: Maybe<number>;
                donations?: Maybe<Array<Maybe<{
                    __typename: 'Donation';
                    id: string;
                }>>>;
            }>>>;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CreateReviewMutationVariables = Exact<{
    input: CreateReviewInput;
}>;
export declare type CreateReviewMutation = {
    __typename: 'Mutation';
    createReview?: Maybe<{
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'OperatorReview';
        id: string;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserReview';
        id: string;
    }>;
};
export declare type CreateServiceOptionMutationVariables = Exact<{
    input: CreateServiceOptionInput;
}>;
export declare type CreateServiceOptionMutation = {
    __typename: 'Mutation';
    createServiceOption?: Maybe<{
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'ServiceOption';
        id: string;
        nameFr: string;
        nameEn: string;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type UpdateServiceOptionMutationVariables = Exact<{
    id: Scalars['ID'];
    input: UpdateServiceOptionInput;
}>;
export declare type UpdateServiceOptionMutation = {
    __typename: 'Mutation';
    updateServiceOption?: Maybe<{
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'ServiceOption';
        id: string;
        nameFr: string;
        nameEn: string;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type DeleteServiceOptionMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteServiceOptionMutation = {
    __typename: 'Mutation';
    deleteServiceOption?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type GetServiceOptionsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetServiceOptionsQuery = {
    __typename: 'Query';
    servicesOptions?: Maybe<{
        __typename: 'ServiceOptionsList';
        serviceOptions?: Maybe<Array<Maybe<{
            __typename: 'ServiceOption';
            id: string;
            nameFr: string;
            nameEn: string;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type CreateSpecieOptionMutationVariables = Exact<{
    input: CreateSpecieOptionInput;
}>;
export declare type CreateSpecieOptionMutation = {
    __typename: 'Mutation';
    createSpecieOption?: Maybe<{
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'SpecieOption';
        id: string;
        nameFr: string;
        nameEn: string;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type UpdateSpecieOptionMutationVariables = Exact<{
    id: Scalars['ID'];
    input: UpdateSpecieOptionInput;
}>;
export declare type UpdateSpecieOptionMutation = {
    __typename: 'Mutation';
    updateSpecieOption?: Maybe<{
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'SpecieOption';
        id: string;
        nameFr: string;
        nameEn: string;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type DeleteSpecieOptionMutationVariables = Exact<{
    id: Scalars['ID'];
}>;
export declare type DeleteSpecieOptionMutation = {
    __typename: 'Mutation';
    deleteSpecieOption?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'InvalidArgumentsError';
        invalidArguments: Array<Maybe<{
            __typename: 'InvalidArgument';
            key: string;
            message: string;
        }>>;
    } | {
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type GetSpeciesOptionsQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type GetSpeciesOptionsQuery = {
    __typename: 'Query';
    speciesOptions?: Maybe<{
        __typename: 'SpecieOptionsList';
        specieOptions?: Maybe<Array<Maybe<{
            __typename: 'SpecieOption';
            id: string;
            nameFr: string;
            nameEn: string;
        }>>>;
    } | {
        __typename: 'UnableToProcessError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserAuthenticationError';
    } | {
        __typename: 'UserForbiddenError';
    }>;
};
export declare type StartCronMutationVariables = Exact<{
    cronName: Scalars['String'];
}>;
export declare type StartCronMutation = {
    __typename: 'Mutation';
    startCron?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type StopCronMutationVariables = Exact<{
    cronName: Scalars['String'];
}>;
export declare type StopCronMutation = {
    __typename: 'Mutation';
    stopCron?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type CurrentStaffQueryVariables = Exact<{
    [key: string]: never;
}>;
export declare type CurrentStaffQuery = {
    __typename: 'Query';
    currentStaff?: Maybe<{
        __typename: 'NotFoundError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'Staff';
        id: string;
        email?: Maybe<string>;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type GetCronStatusQueryVariables = Exact<{
    cronName: Scalars['String'];
}>;
export declare type GetCronStatusQuery = {
    __typename: 'Query';
    getCronStatus?: Maybe<{
        __typename: 'CronStatus';
        status?: Maybe<string>;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SubscribeToPendingPaymentCronSubscriptionVariables = Exact<{
    [key: string]: never;
}>;
export declare type SubscribeToPendingPaymentCronSubscription = {
    __typename: 'Subscription';
    pendingPaymentCronSub?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SubscribeToSetupIntentCronSubscriptionVariables = Exact<{
    [key: string]: never;
}>;
export declare type SubscribeToSetupIntentCronSubscription = {
    __typename: 'Subscription';
    setupIntentCronSub?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare type SubscribeToErrorsEmailCronSubscriptionVariables = Exact<{
    [key: string]: never;
}>;
export declare type SubscribeToErrorsEmailCronSubscription = {
    __typename: 'Subscription';
    errorsEmailCronSub?: Maybe<{
        __typename: 'BooleanResult';
        success?: Maybe<boolean>;
    } | {
        __typename: 'UserAuthenticationError';
        code: ErrorCode;
        message: ErrorMessage;
    } | {
        __typename: 'UserForbiddenError';
        code: ErrorCode;
        message: ErrorMessage;
    }>;
};
export declare const InvalidArgumentsFieldsFragmentDoc: Apollo.DocumentNode;
export declare const NotFoundFieldsFragmentDoc: Apollo.DocumentNode;
export declare const UnableToProcessFieldsFragmentDoc: Apollo.DocumentNode;
export declare const UserAuthFieldsFragmentDoc: Apollo.DocumentNode;
export declare const UserForbiddenFieldsFragmentDoc: Apollo.DocumentNode;
export declare const MessageFieldsFragmentDoc: Apollo.DocumentNode;
export declare const CreateAccountDocument: Apollo.DocumentNode;
export declare type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;
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
export declare function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>): Apollo.MutationTuple<CreateAccountMutation, Exact<{
    input: CreateAccountInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export declare type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export declare type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export declare const SignInDocument: Apollo.DocumentNode;
export declare type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;
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
export declare function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>): Apollo.MutationTuple<SignInMutation, Exact<{
    input: EmailAndPasswordInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export declare type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export declare type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export declare const SignOutDocument: Apollo.DocumentNode;
export declare type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;
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
export declare function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>): Apollo.MutationTuple<SignOutMutation, Exact<{
    [key: string]: never;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export declare type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export declare type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export declare const SendVerificationEmailDocument: Apollo.DocumentNode;
export declare type SendVerificationEmailMutationFn = Apollo.MutationFunction<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>;
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
export declare function useSendVerificationEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>): Apollo.MutationTuple<SendVerificationEmailMutation, Exact<{
    email: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type SendVerificationEmailMutationHookResult = ReturnType<typeof useSendVerificationEmailMutation>;
export declare type SendVerificationEmailMutationResult = Apollo.MutationResult<SendVerificationEmailMutation>;
export declare type SendVerificationEmailMutationOptions = Apollo.BaseMutationOptions<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>;
export declare const VerifyUserDocument: Apollo.DocumentNode;
export declare type VerifyUserMutationFn = Apollo.MutationFunction<VerifyUserMutation, VerifyUserMutationVariables>;
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
export declare function useVerifyUserMutation(baseOptions?: Apollo.MutationHookOptions<VerifyUserMutation, VerifyUserMutationVariables>): Apollo.MutationTuple<VerifyUserMutation, Exact<{
    input: VerifyUserInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type VerifyUserMutationHookResult = ReturnType<typeof useVerifyUserMutation>;
export declare type VerifyUserMutationResult = Apollo.MutationResult<VerifyUserMutation>;
export declare type VerifyUserMutationOptions = Apollo.BaseMutationOptions<VerifyUserMutation, VerifyUserMutationVariables>;
export declare const DeleteAccountDocument: Apollo.DocumentNode;
export declare type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;
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
export declare function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>): Apollo.MutationTuple<DeleteAccountMutation, Exact<{
    confirmPassword: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export declare type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export declare type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export declare const LostPasswordDocument: Apollo.DocumentNode;
export declare type LostPasswordMutationFn = Apollo.MutationFunction<LostPasswordMutation, LostPasswordMutationVariables>;
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
export declare function useLostPasswordMutation(baseOptions?: Apollo.MutationHookOptions<LostPasswordMutation, LostPasswordMutationVariables>): Apollo.MutationTuple<LostPasswordMutation, Exact<{
    email: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type LostPasswordMutationHookResult = ReturnType<typeof useLostPasswordMutation>;
export declare type LostPasswordMutationResult = Apollo.MutationResult<LostPasswordMutation>;
export declare type LostPasswordMutationOptions = Apollo.BaseMutationOptions<LostPasswordMutation, LostPasswordMutationVariables>;
export declare const ResetPasswordDocument: Apollo.DocumentNode;
export declare type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;
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
export declare function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>): Apollo.MutationTuple<ResetPasswordMutation, Exact<{
    input: ResetPasswordInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export declare type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export declare type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export declare const ModifyPasswordDocument: Apollo.DocumentNode;
export declare type ModifyPasswordMutationFn = Apollo.MutationFunction<ModifyPasswordMutation, ModifyPasswordMutationVariables>;
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
export declare function useModifyPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ModifyPasswordMutation, ModifyPasswordMutationVariables>): Apollo.MutationTuple<ModifyPasswordMutation, Exact<{
    password: string;
    newPassword: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type ModifyPasswordMutationHookResult = ReturnType<typeof useModifyPasswordMutation>;
export declare type ModifyPasswordMutationResult = Apollo.MutationResult<ModifyPasswordMutation>;
export declare type ModifyPasswordMutationOptions = Apollo.BaseMutationOptions<ModifyPasswordMutation, ModifyPasswordMutationVariables>;
export declare const ModifyEmailDocument: Apollo.DocumentNode;
export declare type ModifyEmailMutationFn = Apollo.MutationFunction<ModifyEmailMutation, ModifyEmailMutationVariables>;
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
export declare function useModifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<ModifyEmailMutation, ModifyEmailMutationVariables>): Apollo.MutationTuple<ModifyEmailMutation, Exact<{
    email: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type ModifyEmailMutationHookResult = ReturnType<typeof useModifyEmailMutation>;
export declare type ModifyEmailMutationResult = Apollo.MutationResult<ModifyEmailMutation>;
export declare type ModifyEmailMutationOptions = Apollo.BaseMutationOptions<ModifyEmailMutation, ModifyEmailMutationVariables>;
export declare const CurrentAccountDocument: Apollo.DocumentNode;
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
export declare function useCurrentAccountQuery(baseOptions?: Apollo.QueryHookOptions<CurrentAccountQuery, CurrentAccountQueryVariables>): Apollo.QueryResult<CurrentAccountQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useCurrentAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentAccountQuery, CurrentAccountQueryVariables>): Apollo.QueryTuple<CurrentAccountQuery, Exact<{
    [key: string]: never;
}>>;
export declare type CurrentAccountQueryHookResult = ReturnType<typeof useCurrentAccountQuery>;
export declare type CurrentAccountLazyQueryHookResult = ReturnType<typeof useCurrentAccountLazyQuery>;
export declare type CurrentAccountQueryResult = Apollo.QueryResult<CurrentAccountQuery, CurrentAccountQueryVariables>;
export declare const AllAccountsDocument: Apollo.DocumentNode;
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
export declare function useAllAccountsQuery(baseOptions?: Apollo.QueryHookOptions<AllAccountsQuery, AllAccountsQueryVariables>): Apollo.QueryResult<AllAccountsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useAllAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllAccountsQuery, AllAccountsQueryVariables>): Apollo.QueryTuple<AllAccountsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type AllAccountsQueryHookResult = ReturnType<typeof useAllAccountsQuery>;
export declare type AllAccountsLazyQueryHookResult = ReturnType<typeof useAllAccountsLazyQuery>;
export declare type AllAccountsQueryResult = Apollo.QueryResult<AllAccountsQuery, AllAccountsQueryVariables>;
export declare const CreateBookingAdDocument: Apollo.DocumentNode;
export declare type CreateBookingAdMutationFn = Apollo.MutationFunction<CreateBookingAdMutation, CreateBookingAdMutationVariables>;
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
export declare function useCreateBookingAdMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingAdMutation, CreateBookingAdMutationVariables>): Apollo.MutationTuple<CreateBookingAdMutation, Exact<{
    input: CreateBookingAdInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateBookingAdMutationHookResult = ReturnType<typeof useCreateBookingAdMutation>;
export declare type CreateBookingAdMutationResult = Apollo.MutationResult<CreateBookingAdMutation>;
export declare type CreateBookingAdMutationOptions = Apollo.BaseMutationOptions<CreateBookingAdMutation, CreateBookingAdMutationVariables>;
export declare const UpdateBookingAdDocument: Apollo.DocumentNode;
export declare type UpdateBookingAdMutationFn = Apollo.MutationFunction<UpdateBookingAdMutation, UpdateBookingAdMutationVariables>;
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
export declare function useUpdateBookingAdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookingAdMutation, UpdateBookingAdMutationVariables>): Apollo.MutationTuple<UpdateBookingAdMutation, Exact<{
    id: string;
    input: UpdateBookingAdInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type UpdateBookingAdMutationHookResult = ReturnType<typeof useUpdateBookingAdMutation>;
export declare type UpdateBookingAdMutationResult = Apollo.MutationResult<UpdateBookingAdMutation>;
export declare type UpdateBookingAdMutationOptions = Apollo.BaseMutationOptions<UpdateBookingAdMutation, UpdateBookingAdMutationVariables>;
export declare const DeleteBookingAdDocument: Apollo.DocumentNode;
export declare type DeleteBookingAdMutationFn = Apollo.MutationFunction<DeleteBookingAdMutation, DeleteBookingAdMutationVariables>;
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
export declare function useDeleteBookingAdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookingAdMutation, DeleteBookingAdMutationVariables>): Apollo.MutationTuple<DeleteBookingAdMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteBookingAdMutationHookResult = ReturnType<typeof useDeleteBookingAdMutation>;
export declare type DeleteBookingAdMutationResult = Apollo.MutationResult<DeleteBookingAdMutation>;
export declare type DeleteBookingAdMutationOptions = Apollo.BaseMutationOptions<DeleteBookingAdMutation, DeleteBookingAdMutationVariables>;
export declare const BidForBookingAdDocument: Apollo.DocumentNode;
export declare type BidForBookingAdMutationFn = Apollo.MutationFunction<BidForBookingAdMutation, BidForBookingAdMutationVariables>;
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
export declare function useBidForBookingAdMutation(baseOptions?: Apollo.MutationHookOptions<BidForBookingAdMutation, BidForBookingAdMutationVariables>): Apollo.MutationTuple<BidForBookingAdMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type BidForBookingAdMutationHookResult = ReturnType<typeof useBidForBookingAdMutation>;
export declare type BidForBookingAdMutationResult = Apollo.MutationResult<BidForBookingAdMutation>;
export declare type BidForBookingAdMutationOptions = Apollo.BaseMutationOptions<BidForBookingAdMutation, BidForBookingAdMutationVariables>;
export declare const RemoveBidForBookingAdDocument: Apollo.DocumentNode;
export declare type RemoveBidForBookingAdMutationFn = Apollo.MutationFunction<RemoveBidForBookingAdMutation, RemoveBidForBookingAdMutationVariables>;
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
export declare function useRemoveBidForBookingAdMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBidForBookingAdMutation, RemoveBidForBookingAdMutationVariables>): Apollo.MutationTuple<RemoveBidForBookingAdMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type RemoveBidForBookingAdMutationHookResult = ReturnType<typeof useRemoveBidForBookingAdMutation>;
export declare type RemoveBidForBookingAdMutationResult = Apollo.MutationResult<RemoveBidForBookingAdMutation>;
export declare type RemoveBidForBookingAdMutationOptions = Apollo.BaseMutationOptions<RemoveBidForBookingAdMutation, RemoveBidForBookingAdMutationVariables>;
export declare const CurrentUserAdsDocument: Apollo.DocumentNode;
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
export declare function useCurrentUserAdsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserAdsQuery, CurrentUserAdsQueryVariables>): Apollo.QueryResult<CurrentUserAdsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useCurrentUserAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserAdsQuery, CurrentUserAdsQueryVariables>): Apollo.QueryTuple<CurrentUserAdsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type CurrentUserAdsQueryHookResult = ReturnType<typeof useCurrentUserAdsQuery>;
export declare type CurrentUserAdsLazyQueryHookResult = ReturnType<typeof useCurrentUserAdsLazyQuery>;
export declare type CurrentUserAdsQueryResult = Apollo.QueryResult<CurrentUserAdsQuery, CurrentUserAdsQueryVariables>;
export declare const AdByIdDocument: Apollo.DocumentNode;
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
export declare function useAdByIdQuery(baseOptions: Apollo.QueryHookOptions<AdByIdQuery, AdByIdQueryVariables>): Apollo.QueryResult<AdByIdQuery, Exact<{
    id: string;
}>>;
export declare function useAdByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdByIdQuery, AdByIdQueryVariables>): Apollo.QueryTuple<AdByIdQuery, Exact<{
    id: string;
}>>;
export declare type AdByIdQueryHookResult = ReturnType<typeof useAdByIdQuery>;
export declare type AdByIdLazyQueryHookResult = ReturnType<typeof useAdByIdLazyQuery>;
export declare type AdByIdQueryResult = Apollo.QueryResult<AdByIdQuery, AdByIdQueryVariables>;
export declare const SearchAdsDocument: Apollo.DocumentNode;
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
export declare function useSearchAdsQuery(baseOptions: Apollo.QueryHookOptions<SearchAdsQuery, SearchAdsQueryVariables>): Apollo.QueryResult<SearchAdsQuery, Exact<{
    input: SearchAdsInput;
}>>;
export declare function useSearchAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchAdsQuery, SearchAdsQueryVariables>): Apollo.QueryTuple<SearchAdsQuery, Exact<{
    input: SearchAdsInput;
}>>;
export declare type SearchAdsQueryHookResult = ReturnType<typeof useSearchAdsQuery>;
export declare type SearchAdsLazyQueryHookResult = ReturnType<typeof useSearchAdsLazyQuery>;
export declare type SearchAdsQueryResult = Apollo.QueryResult<SearchAdsQuery, SearchAdsQueryVariables>;
export declare const CurrentOperatorBidsDocument: Apollo.DocumentNode;
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
export declare function useCurrentOperatorBidsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentOperatorBidsQuery, CurrentOperatorBidsQueryVariables>): Apollo.QueryResult<CurrentOperatorBidsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useCurrentOperatorBidsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentOperatorBidsQuery, CurrentOperatorBidsQueryVariables>): Apollo.QueryTuple<CurrentOperatorBidsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type CurrentOperatorBidsQueryHookResult = ReturnType<typeof useCurrentOperatorBidsQuery>;
export declare type CurrentOperatorBidsLazyQueryHookResult = ReturnType<typeof useCurrentOperatorBidsLazyQuery>;
export declare type CurrentOperatorBidsQueryResult = Apollo.QueryResult<CurrentOperatorBidsQuery, CurrentOperatorBidsQueryVariables>;
export declare const CreateBookingDocument: Apollo.DocumentNode;
export declare type CreateBookingMutationFn = Apollo.MutationFunction<CreateBookingMutation, CreateBookingMutationVariables>;
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
export declare function useCreateBookingMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingMutation, CreateBookingMutationVariables>): Apollo.MutationTuple<CreateBookingMutation, Exact<{
    input: CreateBookingInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export declare type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutation>;
export declare type CreateBookingMutationOptions = Apollo.BaseMutationOptions<CreateBookingMutation, CreateBookingMutationVariables>;
export declare const ConfirmBookingDocument: Apollo.DocumentNode;
export declare type ConfirmBookingMutationFn = Apollo.MutationFunction<ConfirmBookingMutation, ConfirmBookingMutationVariables>;
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
export declare function useConfirmBookingMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmBookingMutation, ConfirmBookingMutationVariables>): Apollo.MutationTuple<ConfirmBookingMutation, Exact<{
    input: ConfirmBookingInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type ConfirmBookingMutationHookResult = ReturnType<typeof useConfirmBookingMutation>;
export declare type ConfirmBookingMutationResult = Apollo.MutationResult<ConfirmBookingMutation>;
export declare type ConfirmBookingMutationOptions = Apollo.BaseMutationOptions<ConfirmBookingMutation, ConfirmBookingMutationVariables>;
export declare const CancelBookingDocument: Apollo.DocumentNode;
export declare type CancelBookingMutationFn = Apollo.MutationFunction<CancelBookingMutation, CancelBookingMutationVariables>;
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
export declare function useCancelBookingMutation(baseOptions?: Apollo.MutationHookOptions<CancelBookingMutation, CancelBookingMutationVariables>): Apollo.MutationTuple<CancelBookingMutation, Exact<{
    input: CancelBookingInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CancelBookingMutationHookResult = ReturnType<typeof useCancelBookingMutation>;
export declare type CancelBookingMutationResult = Apollo.MutationResult<CancelBookingMutation>;
export declare type CancelBookingMutationOptions = Apollo.BaseMutationOptions<CancelBookingMutation, CancelBookingMutationVariables>;
export declare const CancelOnGoingBookingDocument: Apollo.DocumentNode;
export declare type CancelOnGoingBookingMutationFn = Apollo.MutationFunction<CancelOnGoingBookingMutation, CancelOnGoingBookingMutationVariables>;
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
export declare function useCancelOnGoingBookingMutation(baseOptions?: Apollo.MutationHookOptions<CancelOnGoingBookingMutation, CancelOnGoingBookingMutationVariables>): Apollo.MutationTuple<CancelOnGoingBookingMutation, Exact<{
    input: CancelOnGoingBookingInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CancelOnGoingBookingMutationHookResult = ReturnType<typeof useCancelOnGoingBookingMutation>;
export declare type CancelOnGoingBookingMutationResult = Apollo.MutationResult<CancelOnGoingBookingMutation>;
export declare type CancelOnGoingBookingMutationOptions = Apollo.BaseMutationOptions<CancelOnGoingBookingMutation, CancelOnGoingBookingMutationVariables>;
export declare const AuthorizePaymentDocument: Apollo.DocumentNode;
export declare type AuthorizePaymentMutationFn = Apollo.MutationFunction<AuthorizePaymentMutation, AuthorizePaymentMutationVariables>;
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
export declare function useAuthorizePaymentMutation(baseOptions?: Apollo.MutationHookOptions<AuthorizePaymentMutation, AuthorizePaymentMutationVariables>): Apollo.MutationTuple<AuthorizePaymentMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type AuthorizePaymentMutationHookResult = ReturnType<typeof useAuthorizePaymentMutation>;
export declare type AuthorizePaymentMutationResult = Apollo.MutationResult<AuthorizePaymentMutation>;
export declare type AuthorizePaymentMutationOptions = Apollo.BaseMutationOptions<AuthorizePaymentMutation, AuthorizePaymentMutationVariables>;
export declare const UpdateBookingPaymentStatusDocument: Apollo.DocumentNode;
export declare type UpdateBookingPaymentStatusMutationFn = Apollo.MutationFunction<UpdateBookingPaymentStatusMutation, UpdateBookingPaymentStatusMutationVariables>;
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
export declare function useUpdateBookingPaymentStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookingPaymentStatusMutation, UpdateBookingPaymentStatusMutationVariables>): Apollo.MutationTuple<UpdateBookingPaymentStatusMutation, Exact<{
    input: UpdateBookingPaymentStatusInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type UpdateBookingPaymentStatusMutationHookResult = ReturnType<typeof useUpdateBookingPaymentStatusMutation>;
export declare type UpdateBookingPaymentStatusMutationResult = Apollo.MutationResult<UpdateBookingPaymentStatusMutation>;
export declare type UpdateBookingPaymentStatusMutationOptions = Apollo.BaseMutationOptions<UpdateBookingPaymentStatusMutation, UpdateBookingPaymentStatusMutationVariables>;
export declare const GetCurrentUserAndOperatorBookingsDocument: Apollo.DocumentNode;
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
export declare function useGetCurrentUserAndOperatorBookingsQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserAndOperatorBookingsQuery, GetCurrentUserAndOperatorBookingsQueryVariables>): Apollo.QueryResult<GetCurrentUserAndOperatorBookingsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetCurrentUserAndOperatorBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserAndOperatorBookingsQuery, GetCurrentUserAndOperatorBookingsQueryVariables>): Apollo.QueryTuple<GetCurrentUserAndOperatorBookingsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetCurrentUserAndOperatorBookingsQueryHookResult = ReturnType<typeof useGetCurrentUserAndOperatorBookingsQuery>;
export declare type GetCurrentUserAndOperatorBookingsLazyQueryHookResult = ReturnType<typeof useGetCurrentUserAndOperatorBookingsLazyQuery>;
export declare type GetCurrentUserAndOperatorBookingsQueryResult = Apollo.QueryResult<GetCurrentUserAndOperatorBookingsQuery, GetCurrentUserAndOperatorBookingsQueryVariables>;
export declare const BookingByIdDocument: Apollo.DocumentNode;
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
export declare function useBookingByIdQuery(baseOptions: Apollo.QueryHookOptions<BookingByIdQuery, BookingByIdQueryVariables>): Apollo.QueryResult<BookingByIdQuery, Exact<{
    id: string;
}>>;
export declare function useBookingByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookingByIdQuery, BookingByIdQueryVariables>): Apollo.QueryTuple<BookingByIdQuery, Exact<{
    id: string;
}>>;
export declare type BookingByIdQueryHookResult = ReturnType<typeof useBookingByIdQuery>;
export declare type BookingByIdLazyQueryHookResult = ReturnType<typeof useBookingByIdLazyQuery>;
export declare type BookingByIdQueryResult = Apollo.QueryResult<BookingByIdQuery, BookingByIdQueryVariables>;
export declare const CurrentUserOwnerBookingsDocument: Apollo.DocumentNode;
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
export declare function useCurrentUserOwnerBookingsQuery(baseOptions: Apollo.QueryHookOptions<CurrentUserOwnerBookingsQuery, CurrentUserOwnerBookingsQueryVariables>): Apollo.QueryResult<CurrentUserOwnerBookingsQuery, Exact<{
    input: CurrentUserBookingFilterInput;
}>>;
export declare function useCurrentUserOwnerBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserOwnerBookingsQuery, CurrentUserOwnerBookingsQueryVariables>): Apollo.QueryTuple<CurrentUserOwnerBookingsQuery, Exact<{
    input: CurrentUserBookingFilterInput;
}>>;
export declare type CurrentUserOwnerBookingsQueryHookResult = ReturnType<typeof useCurrentUserOwnerBookingsQuery>;
export declare type CurrentUserOwnerBookingsLazyQueryHookResult = ReturnType<typeof useCurrentUserOwnerBookingsLazyQuery>;
export declare type CurrentUserOwnerBookingsQueryResult = Apollo.QueryResult<CurrentUserOwnerBookingsQuery, CurrentUserOwnerBookingsQueryVariables>;
export declare const CurrentUserOperatorBookingsDocument: Apollo.DocumentNode;
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
export declare function useCurrentUserOperatorBookingsQuery(baseOptions: Apollo.QueryHookOptions<CurrentUserOperatorBookingsQuery, CurrentUserOperatorBookingsQueryVariables>): Apollo.QueryResult<CurrentUserOperatorBookingsQuery, Exact<{
    input: CurrentUserBookingFilterInput;
}>>;
export declare function useCurrentUserOperatorBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserOperatorBookingsQuery, CurrentUserOperatorBookingsQueryVariables>): Apollo.QueryTuple<CurrentUserOperatorBookingsQuery, Exact<{
    input: CurrentUserBookingFilterInput;
}>>;
export declare type CurrentUserOperatorBookingsQueryHookResult = ReturnType<typeof useCurrentUserOperatorBookingsQuery>;
export declare type CurrentUserOperatorBookingsLazyQueryHookResult = ReturnType<typeof useCurrentUserOperatorBookingsLazyQuery>;
export declare type CurrentUserOperatorBookingsQueryResult = Apollo.QueryResult<CurrentUserOperatorBookingsQuery, CurrentUserOperatorBookingsQueryVariables>;
export declare const BookingsDocument: Apollo.DocumentNode;
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
export declare function useBookingsQuery(baseOptions?: Apollo.QueryHookOptions<BookingsQuery, BookingsQueryVariables>): Apollo.QueryResult<BookingsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookingsQuery, BookingsQueryVariables>): Apollo.QueryTuple<BookingsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type BookingsQueryHookResult = ReturnType<typeof useBookingsQuery>;
export declare type BookingsLazyQueryHookResult = ReturnType<typeof useBookingsLazyQuery>;
export declare type BookingsQueryResult = Apollo.QueryResult<BookingsQuery, BookingsQueryVariables>;
export declare const BookingsWithPaymentStatusDocument: Apollo.DocumentNode;
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
export declare function useBookingsWithPaymentStatusQuery(baseOptions: Apollo.QueryHookOptions<BookingsWithPaymentStatusQuery, BookingsWithPaymentStatusQueryVariables>): Apollo.QueryResult<BookingsWithPaymentStatusQuery, Exact<{
    input: BookingWithPaymentStatusInput;
}>>;
export declare function useBookingsWithPaymentStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookingsWithPaymentStatusQuery, BookingsWithPaymentStatusQueryVariables>): Apollo.QueryTuple<BookingsWithPaymentStatusQuery, Exact<{
    input: BookingWithPaymentStatusInput;
}>>;
export declare type BookingsWithPaymentStatusQueryHookResult = ReturnType<typeof useBookingsWithPaymentStatusQuery>;
export declare type BookingsWithPaymentStatusLazyQueryHookResult = ReturnType<typeof useBookingsWithPaymentStatusLazyQuery>;
export declare type BookingsWithPaymentStatusQueryResult = Apollo.QueryResult<BookingsWithPaymentStatusQuery, BookingsWithPaymentStatusQueryVariables>;
export declare const SubscribeToBookingMessagesDocument: Apollo.DocumentNode;
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
export declare function useSubscribeToBookingMessagesSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeToBookingMessagesSubscription, SubscribeToBookingMessagesSubscriptionVariables>): {
    variables: Exact<{
        bookingId: string;
    }>;
    loading: boolean;
    data?: SubscribeToBookingMessagesSubscription;
    error?: Apollo.ApolloError;
};
export declare type SubscribeToBookingMessagesSubscriptionHookResult = ReturnType<typeof useSubscribeToBookingMessagesSubscription>;
export declare type SubscribeToBookingMessagesSubscriptionResult = Apollo.SubscriptionResult<SubscribeToBookingMessagesSubscription>;
export declare const SubscribeToUserBookingsMessagesChangesDocument: Apollo.DocumentNode;
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
export declare function useSubscribeToUserBookingsMessagesChangesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeToUserBookingsMessagesChangesSubscription, SubscribeToUserBookingsMessagesChangesSubscriptionVariables>): {
    variables: Exact<{
        bookingsIds?: string | string[];
        authorId?: string;
    }>;
    loading: boolean;
    data?: SubscribeToUserBookingsMessagesChangesSubscription;
    error?: Apollo.ApolloError;
};
export declare type SubscribeToUserBookingsMessagesChangesSubscriptionHookResult = ReturnType<typeof useSubscribeToUserBookingsMessagesChangesSubscription>;
export declare type SubscribeToUserBookingsMessagesChangesSubscriptionResult = Apollo.SubscriptionResult<SubscribeToUserBookingsMessagesChangesSubscription>;
export declare const SubscribeToUserBookingsStatusChangesDocument: Apollo.DocumentNode;
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
export declare function useSubscribeToUserBookingsStatusChangesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeToUserBookingsStatusChangesSubscription, SubscribeToUserBookingsStatusChangesSubscriptionVariables>): {
    variables: Exact<{
        bookingsIds?: string | string[];
    }>;
    loading: boolean;
    data?: SubscribeToUserBookingsStatusChangesSubscription;
    error?: Apollo.ApolloError;
};
export declare type SubscribeToUserBookingsStatusChangesSubscriptionHookResult = ReturnType<typeof useSubscribeToUserBookingsStatusChangesSubscription>;
export declare type SubscribeToUserBookingsStatusChangesSubscriptionResult = Apollo.SubscriptionResult<SubscribeToUserBookingsStatusChangesSubscription>;
export declare const SubscribeToNewlyCreatedBookingsAsSitterDocument: Apollo.DocumentNode;
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
export declare function useSubscribeToNewlyCreatedBookingsAsSitterSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeToNewlyCreatedBookingsAsSitterSubscription, SubscribeToNewlyCreatedBookingsAsSitterSubscriptionVariables>): {
    variables: Exact<{
        sitterId?: string;
    }>;
    loading: boolean;
    data?: SubscribeToNewlyCreatedBookingsAsSitterSubscription;
    error?: Apollo.ApolloError;
};
export declare type SubscribeToNewlyCreatedBookingsAsSitterSubscriptionHookResult = ReturnType<typeof useSubscribeToNewlyCreatedBookingsAsSitterSubscription>;
export declare type SubscribeToNewlyCreatedBookingsAsSitterSubscriptionResult = Apollo.SubscriptionResult<SubscribeToNewlyCreatedBookingsAsSitterSubscription>;
export declare const CreateBookingClaimDocument: Apollo.DocumentNode;
export declare type CreateBookingClaimMutationFn = Apollo.MutationFunction<CreateBookingClaimMutation, CreateBookingClaimMutationVariables>;
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
export declare function useCreateBookingClaimMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingClaimMutation, CreateBookingClaimMutationVariables>): Apollo.MutationTuple<CreateBookingClaimMutation, Exact<{
    input: CreateBookingClaimInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateBookingClaimMutationHookResult = ReturnType<typeof useCreateBookingClaimMutation>;
export declare type CreateBookingClaimMutationResult = Apollo.MutationResult<CreateBookingClaimMutation>;
export declare type CreateBookingClaimMutationOptions = Apollo.BaseMutationOptions<CreateBookingClaimMutation, CreateBookingClaimMutationVariables>;
export declare const GetBookingClaimsDocument: Apollo.DocumentNode;
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
export declare function useGetBookingClaimsQuery(baseOptions?: Apollo.QueryHookOptions<GetBookingClaimsQuery, GetBookingClaimsQueryVariables>): Apollo.QueryResult<GetBookingClaimsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetBookingClaimsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingClaimsQuery, GetBookingClaimsQueryVariables>): Apollo.QueryTuple<GetBookingClaimsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetBookingClaimsQueryHookResult = ReturnType<typeof useGetBookingClaimsQuery>;
export declare type GetBookingClaimsLazyQueryHookResult = ReturnType<typeof useGetBookingClaimsLazyQuery>;
export declare type GetBookingClaimsQueryResult = Apollo.QueryResult<GetBookingClaimsQuery, GetBookingClaimsQueryVariables>;
export declare const GetBookingClaimByIdDocument: Apollo.DocumentNode;
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
export declare function useGetBookingClaimByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBookingClaimByIdQuery, GetBookingClaimByIdQueryVariables>): Apollo.QueryResult<GetBookingClaimByIdQuery, Exact<{
    id: string;
}>>;
export declare function useGetBookingClaimByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingClaimByIdQuery, GetBookingClaimByIdQueryVariables>): Apollo.QueryTuple<GetBookingClaimByIdQuery, Exact<{
    id: string;
}>>;
export declare type GetBookingClaimByIdQueryHookResult = ReturnType<typeof useGetBookingClaimByIdQuery>;
export declare type GetBookingClaimByIdLazyQueryHookResult = ReturnType<typeof useGetBookingClaimByIdLazyQuery>;
export declare type GetBookingClaimByIdQueryResult = Apollo.QueryResult<GetBookingClaimByIdQuery, GetBookingClaimByIdQueryVariables>;
export declare const CurrentOperatorDonationsDocument: Apollo.DocumentNode;
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
export declare function useCurrentOperatorDonationsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentOperatorDonationsQuery, CurrentOperatorDonationsQueryVariables>): Apollo.QueryResult<CurrentOperatorDonationsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useCurrentOperatorDonationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentOperatorDonationsQuery, CurrentOperatorDonationsQueryVariables>): Apollo.QueryTuple<CurrentOperatorDonationsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type CurrentOperatorDonationsQueryHookResult = ReturnType<typeof useCurrentOperatorDonationsQuery>;
export declare type CurrentOperatorDonationsLazyQueryHookResult = ReturnType<typeof useCurrentOperatorDonationsLazyQuery>;
export declare type CurrentOperatorDonationsQueryResult = Apollo.QueryResult<CurrentOperatorDonationsQuery, CurrentOperatorDonationsQueryVariables>;
export declare const SearchDonationsDocument: Apollo.DocumentNode;
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
export declare function useSearchDonationsQuery(baseOptions: Apollo.QueryHookOptions<SearchDonationsQuery, SearchDonationsQueryVariables>): Apollo.QueryResult<SearchDonationsQuery, Exact<{
    input: SearchDonationsInput;
}>>;
export declare function useSearchDonationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchDonationsQuery, SearchDonationsQueryVariables>): Apollo.QueryTuple<SearchDonationsQuery, Exact<{
    input: SearchDonationsInput;
}>>;
export declare type SearchDonationsQueryHookResult = ReturnType<typeof useSearchDonationsQuery>;
export declare type SearchDonationsLazyQueryHookResult = ReturnType<typeof useSearchDonationsLazyQuery>;
export declare type SearchDonationsQueryResult = Apollo.QueryResult<SearchDonationsQuery, SearchDonationsQueryVariables>;
export declare const CreateDonationReceiptDocument: Apollo.DocumentNode;
export declare type CreateDonationReceiptMutationFn = Apollo.MutationFunction<CreateDonationReceiptMutation, CreateDonationReceiptMutationVariables>;
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
export declare function useCreateDonationReceiptMutation(baseOptions?: Apollo.MutationHookOptions<CreateDonationReceiptMutation, CreateDonationReceiptMutationVariables>): Apollo.MutationTuple<CreateDonationReceiptMutation, Exact<{
    input: CreateDonationReceiptInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateDonationReceiptMutationHookResult = ReturnType<typeof useCreateDonationReceiptMutation>;
export declare type CreateDonationReceiptMutationResult = Apollo.MutationResult<CreateDonationReceiptMutation>;
export declare type CreateDonationReceiptMutationOptions = Apollo.BaseMutationOptions<CreateDonationReceiptMutation, CreateDonationReceiptMutationVariables>;
export declare const SearchDonationReceiptsDocument: Apollo.DocumentNode;
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
export declare function useSearchDonationReceiptsQuery(baseOptions: Apollo.QueryHookOptions<SearchDonationReceiptsQuery, SearchDonationReceiptsQueryVariables>): Apollo.QueryResult<SearchDonationReceiptsQuery, Exact<{
    input: SearchDonationReceiptsInput;
}>>;
export declare function useSearchDonationReceiptsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchDonationReceiptsQuery, SearchDonationReceiptsQueryVariables>): Apollo.QueryTuple<SearchDonationReceiptsQuery, Exact<{
    input: SearchDonationReceiptsInput;
}>>;
export declare type SearchDonationReceiptsQueryHookResult = ReturnType<typeof useSearchDonationReceiptsQuery>;
export declare type SearchDonationReceiptsLazyQueryHookResult = ReturnType<typeof useSearchDonationReceiptsLazyQuery>;
export declare type SearchDonationReceiptsQueryResult = Apollo.QueryResult<SearchDonationReceiptsQuery, SearchDonationReceiptsQueryVariables>;
export declare const CreateGenderOptionDocument: Apollo.DocumentNode;
export declare type CreateGenderOptionMutationFn = Apollo.MutationFunction<CreateGenderOptionMutation, CreateGenderOptionMutationVariables>;
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
export declare function useCreateGenderOptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateGenderOptionMutation, CreateGenderOptionMutationVariables>): Apollo.MutationTuple<CreateGenderOptionMutation, Exact<{
    input: CreateGenderOptionInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateGenderOptionMutationHookResult = ReturnType<typeof useCreateGenderOptionMutation>;
export declare type CreateGenderOptionMutationResult = Apollo.MutationResult<CreateGenderOptionMutation>;
export declare type CreateGenderOptionMutationOptions = Apollo.BaseMutationOptions<CreateGenderOptionMutation, CreateGenderOptionMutationVariables>;
export declare const UpdateGenderOptionDocument: Apollo.DocumentNode;
export declare type UpdateGenderOptionMutationFn = Apollo.MutationFunction<UpdateGenderOptionMutation, UpdateGenderOptionMutationVariables>;
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
export declare function useUpdateGenderOptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGenderOptionMutation, UpdateGenderOptionMutationVariables>): Apollo.MutationTuple<UpdateGenderOptionMutation, Exact<{
    id: string;
    input: UpdateGenderOptionInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type UpdateGenderOptionMutationHookResult = ReturnType<typeof useUpdateGenderOptionMutation>;
export declare type UpdateGenderOptionMutationResult = Apollo.MutationResult<UpdateGenderOptionMutation>;
export declare type UpdateGenderOptionMutationOptions = Apollo.BaseMutationOptions<UpdateGenderOptionMutation, UpdateGenderOptionMutationVariables>;
export declare const DeleteGenderOptionDocument: Apollo.DocumentNode;
export declare type DeleteGenderOptionMutationFn = Apollo.MutationFunction<DeleteGenderOptionMutation, DeleteGenderOptionMutationVariables>;
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
export declare function useDeleteGenderOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGenderOptionMutation, DeleteGenderOptionMutationVariables>): Apollo.MutationTuple<DeleteGenderOptionMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteGenderOptionMutationHookResult = ReturnType<typeof useDeleteGenderOptionMutation>;
export declare type DeleteGenderOptionMutationResult = Apollo.MutationResult<DeleteGenderOptionMutation>;
export declare type DeleteGenderOptionMutationOptions = Apollo.BaseMutationOptions<DeleteGenderOptionMutation, DeleteGenderOptionMutationVariables>;
export declare const GetGendersOptionsDocument: Apollo.DocumentNode;
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
export declare function useGetGendersOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetGendersOptionsQuery, GetGendersOptionsQueryVariables>): Apollo.QueryResult<GetGendersOptionsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetGendersOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGendersOptionsQuery, GetGendersOptionsQueryVariables>): Apollo.QueryTuple<GetGendersOptionsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetGendersOptionsQueryHookResult = ReturnType<typeof useGetGendersOptionsQuery>;
export declare type GetGendersOptionsLazyQueryHookResult = ReturnType<typeof useGetGendersOptionsLazyQuery>;
export declare type GetGendersOptionsQueryResult = Apollo.QueryResult<GetGendersOptionsQuery, GetGendersOptionsQueryVariables>;
export declare const CreateHostingOptionDocument: Apollo.DocumentNode;
export declare type CreateHostingOptionMutationFn = Apollo.MutationFunction<CreateHostingOptionMutation, CreateHostingOptionMutationVariables>;
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
export declare function useCreateHostingOptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateHostingOptionMutation, CreateHostingOptionMutationVariables>): Apollo.MutationTuple<CreateHostingOptionMutation, Exact<{
    input: CreateHostingOptionInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateHostingOptionMutationHookResult = ReturnType<typeof useCreateHostingOptionMutation>;
export declare type CreateHostingOptionMutationResult = Apollo.MutationResult<CreateHostingOptionMutation>;
export declare type CreateHostingOptionMutationOptions = Apollo.BaseMutationOptions<CreateHostingOptionMutation, CreateHostingOptionMutationVariables>;
export declare const UpdateHostingOptionDocument: Apollo.DocumentNode;
export declare type UpdateHostingOptionMutationFn = Apollo.MutationFunction<UpdateHostingOptionMutation, UpdateHostingOptionMutationVariables>;
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
export declare function useUpdateHostingOptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHostingOptionMutation, UpdateHostingOptionMutationVariables>): Apollo.MutationTuple<UpdateHostingOptionMutation, Exact<{
    id: string;
    input: UpdateHostingOptionInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type UpdateHostingOptionMutationHookResult = ReturnType<typeof useUpdateHostingOptionMutation>;
export declare type UpdateHostingOptionMutationResult = Apollo.MutationResult<UpdateHostingOptionMutation>;
export declare type UpdateHostingOptionMutationOptions = Apollo.BaseMutationOptions<UpdateHostingOptionMutation, UpdateHostingOptionMutationVariables>;
export declare const DeleteHostingOptionDocument: Apollo.DocumentNode;
export declare type DeleteHostingOptionMutationFn = Apollo.MutationFunction<DeleteHostingOptionMutation, DeleteHostingOptionMutationVariables>;
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
export declare function useDeleteHostingOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHostingOptionMutation, DeleteHostingOptionMutationVariables>): Apollo.MutationTuple<DeleteHostingOptionMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteHostingOptionMutationHookResult = ReturnType<typeof useDeleteHostingOptionMutation>;
export declare type DeleteHostingOptionMutationResult = Apollo.MutationResult<DeleteHostingOptionMutation>;
export declare type DeleteHostingOptionMutationOptions = Apollo.BaseMutationOptions<DeleteHostingOptionMutation, DeleteHostingOptionMutationVariables>;
export declare const GetHostingsOptionsDocument: Apollo.DocumentNode;
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
export declare function useGetHostingsOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetHostingsOptionsQuery, GetHostingsOptionsQueryVariables>): Apollo.QueryResult<GetHostingsOptionsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetHostingsOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHostingsOptionsQuery, GetHostingsOptionsQueryVariables>): Apollo.QueryTuple<GetHostingsOptionsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetHostingsOptionsQueryHookResult = ReturnType<typeof useGetHostingsOptionsQuery>;
export declare type GetHostingsOptionsLazyQueryHookResult = ReturnType<typeof useGetHostingsOptionsLazyQuery>;
export declare type GetHostingsOptionsQueryResult = Apollo.QueryResult<GetHostingsOptionsQuery, GetHostingsOptionsQueryVariables>;
export declare const CreateLanguageOptionDocument: Apollo.DocumentNode;
export declare type CreateLanguageOptionMutationFn = Apollo.MutationFunction<CreateLanguageOptionMutation, CreateLanguageOptionMutationVariables>;
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
export declare function useCreateLanguageOptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateLanguageOptionMutation, CreateLanguageOptionMutationVariables>): Apollo.MutationTuple<CreateLanguageOptionMutation, Exact<{
    input: CreateLanguageOptionInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateLanguageOptionMutationHookResult = ReturnType<typeof useCreateLanguageOptionMutation>;
export declare type CreateLanguageOptionMutationResult = Apollo.MutationResult<CreateLanguageOptionMutation>;
export declare type CreateLanguageOptionMutationOptions = Apollo.BaseMutationOptions<CreateLanguageOptionMutation, CreateLanguageOptionMutationVariables>;
export declare const UpdateLanguageOptionDocument: Apollo.DocumentNode;
export declare type UpdateLanguageOptionMutationFn = Apollo.MutationFunction<UpdateLanguageOptionMutation, UpdateLanguageOptionMutationVariables>;
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
export declare function useUpdateLanguageOptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLanguageOptionMutation, UpdateLanguageOptionMutationVariables>): Apollo.MutationTuple<UpdateLanguageOptionMutation, Exact<{
    id: string;
    input: UpdateLanguageOptionInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type UpdateLanguageOptionMutationHookResult = ReturnType<typeof useUpdateLanguageOptionMutation>;
export declare type UpdateLanguageOptionMutationResult = Apollo.MutationResult<UpdateLanguageOptionMutation>;
export declare type UpdateLanguageOptionMutationOptions = Apollo.BaseMutationOptions<UpdateLanguageOptionMutation, UpdateLanguageOptionMutationVariables>;
export declare const DeleteLanguageOptionDocument: Apollo.DocumentNode;
export declare type DeleteLanguageOptionMutationFn = Apollo.MutationFunction<DeleteLanguageOptionMutation, DeleteLanguageOptionMutationVariables>;
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
export declare function useDeleteLanguageOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLanguageOptionMutation, DeleteLanguageOptionMutationVariables>): Apollo.MutationTuple<DeleteLanguageOptionMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteLanguageOptionMutationHookResult = ReturnType<typeof useDeleteLanguageOptionMutation>;
export declare type DeleteLanguageOptionMutationResult = Apollo.MutationResult<DeleteLanguageOptionMutation>;
export declare type DeleteLanguageOptionMutationOptions = Apollo.BaseMutationOptions<DeleteLanguageOptionMutation, DeleteLanguageOptionMutationVariables>;
export declare const GetLanguagesOptionsDocument: Apollo.DocumentNode;
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
export declare function useGetLanguagesOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetLanguagesOptionsQuery, GetLanguagesOptionsQueryVariables>): Apollo.QueryResult<GetLanguagesOptionsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetLanguagesOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLanguagesOptionsQuery, GetLanguagesOptionsQueryVariables>): Apollo.QueryTuple<GetLanguagesOptionsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetLanguagesOptionsQueryHookResult = ReturnType<typeof useGetLanguagesOptionsQuery>;
export declare type GetLanguagesOptionsLazyQueryHookResult = ReturnType<typeof useGetLanguagesOptionsLazyQuery>;
export declare type GetLanguagesOptionsQueryResult = Apollo.QueryResult<GetLanguagesOptionsQuery, GetLanguagesOptionsQueryVariables>;
export declare const LocationSearchDocument: Apollo.DocumentNode;
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
export declare function useLocationSearchQuery(baseOptions: Apollo.QueryHookOptions<LocationSearchQuery, LocationSearchQueryVariables>): Apollo.QueryResult<LocationSearchQuery, Exact<{
    query: string;
    locale: string;
}>>;
export declare function useLocationSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LocationSearchQuery, LocationSearchQueryVariables>): Apollo.QueryTuple<LocationSearchQuery, Exact<{
    query: string;
    locale: string;
}>>;
export declare type LocationSearchQueryHookResult = ReturnType<typeof useLocationSearchQuery>;
export declare type LocationSearchLazyQueryHookResult = ReturnType<typeof useLocationSearchLazyQuery>;
export declare type LocationSearchQueryResult = Apollo.QueryResult<LocationSearchQuery, LocationSearchQueryVariables>;
export declare const CreateMediaDocument: Apollo.DocumentNode;
export declare type CreateMediaMutationFn = Apollo.MutationFunction<CreateMediaMutation, CreateMediaMutationVariables>;
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
export declare function useCreateMediaMutation(baseOptions?: Apollo.MutationHookOptions<CreateMediaMutation, CreateMediaMutationVariables>): Apollo.MutationTuple<CreateMediaMutation, Exact<{
    input: CreateMediaInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateMediaMutationHookResult = ReturnType<typeof useCreateMediaMutation>;
export declare type CreateMediaMutationResult = Apollo.MutationResult<CreateMediaMutation>;
export declare type CreateMediaMutationOptions = Apollo.BaseMutationOptions<CreateMediaMutation, CreateMediaMutationVariables>;
export declare const SetMediaAsAvatarDocument: Apollo.DocumentNode;
export declare type SetMediaAsAvatarMutationFn = Apollo.MutationFunction<SetMediaAsAvatarMutation, SetMediaAsAvatarMutationVariables>;
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
export declare function useSetMediaAsAvatarMutation(baseOptions?: Apollo.MutationHookOptions<SetMediaAsAvatarMutation, SetMediaAsAvatarMutationVariables>): Apollo.MutationTuple<SetMediaAsAvatarMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type SetMediaAsAvatarMutationHookResult = ReturnType<typeof useSetMediaAsAvatarMutation>;
export declare type SetMediaAsAvatarMutationResult = Apollo.MutationResult<SetMediaAsAvatarMutation>;
export declare type SetMediaAsAvatarMutationOptions = Apollo.BaseMutationOptions<SetMediaAsAvatarMutation, SetMediaAsAvatarMutationVariables>;
export declare const DeleteMediaDocument: Apollo.DocumentNode;
export declare type DeleteMediaMutationFn = Apollo.MutationFunction<DeleteMediaMutation, DeleteMediaMutationVariables>;
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
export declare function useDeleteMediaMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMediaMutation, DeleteMediaMutationVariables>): Apollo.MutationTuple<DeleteMediaMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteMediaMutationHookResult = ReturnType<typeof useDeleteMediaMutation>;
export declare type DeleteMediaMutationResult = Apollo.MutationResult<DeleteMediaMutation>;
export declare type DeleteMediaMutationOptions = Apollo.BaseMutationOptions<DeleteMediaMutation, DeleteMediaMutationVariables>;
export declare const CreateMessageDocument: Apollo.DocumentNode;
export declare type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;
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
export declare function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>): Apollo.MutationTuple<CreateMessageMutation, Exact<{
    input: CreateMessageInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export declare type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export declare type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export declare const UpdateMessageDocument: Apollo.DocumentNode;
export declare type UpdateMessageMutationFn = Apollo.MutationFunction<UpdateMessageMutation, UpdateMessageMutationVariables>;
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
export declare function useUpdateMessageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMessageMutation, UpdateMessageMutationVariables>): Apollo.MutationTuple<UpdateMessageMutation, Exact<{
    id: string;
    input: UpdateMessageInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type UpdateMessageMutationHookResult = ReturnType<typeof useUpdateMessageMutation>;
export declare type UpdateMessageMutationResult = Apollo.MutationResult<UpdateMessageMutation>;
export declare type UpdateMessageMutationOptions = Apollo.BaseMutationOptions<UpdateMessageMutation, UpdateMessageMutationVariables>;
export declare const SetAsReadDocument: Apollo.DocumentNode;
export declare type SetAsReadMutationFn = Apollo.MutationFunction<SetAsReadMutation, SetAsReadMutationVariables>;
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
export declare function useSetAsReadMutation(baseOptions?: Apollo.MutationHookOptions<SetAsReadMutation, SetAsReadMutationVariables>): Apollo.MutationTuple<SetAsReadMutation, Exact<{
    input: SetMessagesAsReadInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type SetAsReadMutationHookResult = ReturnType<typeof useSetAsReadMutation>;
export declare type SetAsReadMutationResult = Apollo.MutationResult<SetAsReadMutation>;
export declare type SetAsReadMutationOptions = Apollo.BaseMutationOptions<SetAsReadMutation, SetAsReadMutationVariables>;
export declare const MessagesByBookingIdDocument: Apollo.DocumentNode;
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
export declare function useMessagesByBookingIdQuery(baseOptions: Apollo.QueryHookOptions<MessagesByBookingIdQuery, MessagesByBookingIdQueryVariables>): Apollo.QueryResult<MessagesByBookingIdQuery, Exact<{
    id: string;
}>>;
export declare function useMessagesByBookingIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesByBookingIdQuery, MessagesByBookingIdQueryVariables>): Apollo.QueryTuple<MessagesByBookingIdQuery, Exact<{
    id: string;
}>>;
export declare type MessagesByBookingIdQueryHookResult = ReturnType<typeof useMessagesByBookingIdQuery>;
export declare type MessagesByBookingIdLazyQueryHookResult = ReturnType<typeof useMessagesByBookingIdLazyQuery>;
export declare type MessagesByBookingIdQueryResult = Apollo.QueryResult<MessagesByBookingIdQuery, MessagesByBookingIdQueryVariables>;
export declare const CreateIndividualOperatorDocument: Apollo.DocumentNode;
export declare type CreateIndividualOperatorMutationFn = Apollo.MutationFunction<CreateIndividualOperatorMutation, CreateIndividualOperatorMutationVariables>;
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
export declare function useCreateIndividualOperatorMutation(baseOptions?: Apollo.MutationHookOptions<CreateIndividualOperatorMutation, CreateIndividualOperatorMutationVariables>): Apollo.MutationTuple<CreateIndividualOperatorMutation, Exact<{
    input: CreateIndividualOperatorInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateIndividualOperatorMutationHookResult = ReturnType<typeof useCreateIndividualOperatorMutation>;
export declare type CreateIndividualOperatorMutationResult = Apollo.MutationResult<CreateIndividualOperatorMutation>;
export declare type CreateIndividualOperatorMutationOptions = Apollo.BaseMutationOptions<CreateIndividualOperatorMutation, CreateIndividualOperatorMutationVariables>;
export declare const UpdateIndividualOperatorDocument: Apollo.DocumentNode;
export declare type UpdateIndividualOperatorMutationFn = Apollo.MutationFunction<UpdateIndividualOperatorMutation, UpdateIndividualOperatorMutationVariables>;
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
export declare function useUpdateIndividualOperatorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIndividualOperatorMutation, UpdateIndividualOperatorMutationVariables>): Apollo.MutationTuple<UpdateIndividualOperatorMutation, Exact<{
    input: UpdateIndividualOperatorInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type UpdateIndividualOperatorMutationHookResult = ReturnType<typeof useUpdateIndividualOperatorMutation>;
export declare type UpdateIndividualOperatorMutationResult = Apollo.MutationResult<UpdateIndividualOperatorMutation>;
export declare type UpdateIndividualOperatorMutationOptions = Apollo.BaseMutationOptions<UpdateIndividualOperatorMutation, UpdateIndividualOperatorMutationVariables>;
export declare const CurrentOperatorDocument: Apollo.DocumentNode;
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
export declare function useCurrentOperatorQuery(baseOptions?: Apollo.QueryHookOptions<CurrentOperatorQuery, CurrentOperatorQueryVariables>): Apollo.QueryResult<CurrentOperatorQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useCurrentOperatorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentOperatorQuery, CurrentOperatorQueryVariables>): Apollo.QueryTuple<CurrentOperatorQuery, Exact<{
    [key: string]: never;
}>>;
export declare type CurrentOperatorQueryHookResult = ReturnType<typeof useCurrentOperatorQuery>;
export declare type CurrentOperatorLazyQueryHookResult = ReturnType<typeof useCurrentOperatorLazyQuery>;
export declare type CurrentOperatorQueryResult = Apollo.QueryResult<CurrentOperatorQuery, CurrentOperatorQueryVariables>;
export declare const OperatorByIdDocument: Apollo.DocumentNode;
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
export declare function useOperatorByIdQuery(baseOptions: Apollo.QueryHookOptions<OperatorByIdQuery, OperatorByIdQueryVariables>): Apollo.QueryResult<OperatorByIdQuery, Exact<{
    id: string;
}>>;
export declare function useOperatorByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OperatorByIdQuery, OperatorByIdQueryVariables>): Apollo.QueryTuple<OperatorByIdQuery, Exact<{
    id: string;
}>>;
export declare type OperatorByIdQueryHookResult = ReturnType<typeof useOperatorByIdQuery>;
export declare type OperatorByIdLazyQueryHookResult = ReturnType<typeof useOperatorByIdLazyQuery>;
export declare type OperatorByIdQueryResult = Apollo.QueryResult<OperatorByIdQuery, OperatorByIdQueryVariables>;
export declare const OperatorBookingInfosByIdDocument: Apollo.DocumentNode;
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
export declare function useOperatorBookingInfosByIdQuery(baseOptions: Apollo.QueryHookOptions<OperatorBookingInfosByIdQuery, OperatorBookingInfosByIdQueryVariables>): Apollo.QueryResult<OperatorBookingInfosByIdQuery, Exact<{
    id: string;
}>>;
export declare function useOperatorBookingInfosByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OperatorBookingInfosByIdQuery, OperatorBookingInfosByIdQueryVariables>): Apollo.QueryTuple<OperatorBookingInfosByIdQuery, Exact<{
    id: string;
}>>;
export declare type OperatorBookingInfosByIdQueryHookResult = ReturnType<typeof useOperatorBookingInfosByIdQuery>;
export declare type OperatorBookingInfosByIdLazyQueryHookResult = ReturnType<typeof useOperatorBookingInfosByIdLazyQuery>;
export declare type OperatorBookingInfosByIdQueryResult = Apollo.QueryResult<OperatorBookingInfosByIdQuery, OperatorBookingInfosByIdQueryVariables>;
export declare const CurrentOperatorMediasDocument: Apollo.DocumentNode;
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
export declare function useCurrentOperatorMediasQuery(baseOptions?: Apollo.QueryHookOptions<CurrentOperatorMediasQuery, CurrentOperatorMediasQueryVariables>): Apollo.QueryResult<CurrentOperatorMediasQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useCurrentOperatorMediasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentOperatorMediasQuery, CurrentOperatorMediasQueryVariables>): Apollo.QueryTuple<CurrentOperatorMediasQuery, Exact<{
    [key: string]: never;
}>>;
export declare type CurrentOperatorMediasQueryHookResult = ReturnType<typeof useCurrentOperatorMediasQuery>;
export declare type CurrentOperatorMediasLazyQueryHookResult = ReturnType<typeof useCurrentOperatorMediasLazyQuery>;
export declare type CurrentOperatorMediasQueryResult = Apollo.QueryResult<CurrentOperatorMediasQuery, CurrentOperatorMediasQueryVariables>;
export declare const CurrentOperatorBookingInfosDocument: Apollo.DocumentNode;
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
export declare function useCurrentOperatorBookingInfosQuery(baseOptions?: Apollo.QueryHookOptions<CurrentOperatorBookingInfosQuery, CurrentOperatorBookingInfosQueryVariables>): Apollo.QueryResult<CurrentOperatorBookingInfosQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useCurrentOperatorBookingInfosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentOperatorBookingInfosQuery, CurrentOperatorBookingInfosQueryVariables>): Apollo.QueryTuple<CurrentOperatorBookingInfosQuery, Exact<{
    [key: string]: never;
}>>;
export declare type CurrentOperatorBookingInfosQueryHookResult = ReturnType<typeof useCurrentOperatorBookingInfosQuery>;
export declare type CurrentOperatorBookingInfosLazyQueryHookResult = ReturnType<typeof useCurrentOperatorBookingInfosLazyQuery>;
export declare type CurrentOperatorBookingInfosQueryResult = Apollo.QueryResult<CurrentOperatorBookingInfosQuery, CurrentOperatorBookingInfosQueryVariables>;
export declare const SearchOperatorsDocument: Apollo.DocumentNode;
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
export declare function useSearchOperatorsQuery(baseOptions: Apollo.QueryHookOptions<SearchOperatorsQuery, SearchOperatorsQueryVariables>): Apollo.QueryResult<SearchOperatorsQuery, Exact<{
    input: SearchOperatorsInput;
}>>;
export declare function useSearchOperatorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchOperatorsQuery, SearchOperatorsQueryVariables>): Apollo.QueryTuple<SearchOperatorsQuery, Exact<{
    input: SearchOperatorsInput;
}>>;
export declare type SearchOperatorsQueryHookResult = ReturnType<typeof useSearchOperatorsQuery>;
export declare type SearchOperatorsLazyQueryHookResult = ReturnType<typeof useSearchOperatorsLazyQuery>;
export declare type SearchOperatorsQueryResult = Apollo.QueryResult<SearchOperatorsQuery, SearchOperatorsQueryVariables>;
export declare const AllOperatorsDocument: Apollo.DocumentNode;
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
export declare function useAllOperatorsQuery(baseOptions?: Apollo.QueryHookOptions<AllOperatorsQuery, AllOperatorsQueryVariables>): Apollo.QueryResult<AllOperatorsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useAllOperatorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllOperatorsQuery, AllOperatorsQueryVariables>): Apollo.QueryTuple<AllOperatorsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type AllOperatorsQueryHookResult = ReturnType<typeof useAllOperatorsQuery>;
export declare type AllOperatorsLazyQueryHookResult = ReturnType<typeof useAllOperatorsLazyQuery>;
export declare type AllOperatorsQueryResult = Apollo.QueryResult<AllOperatorsQuery, AllOperatorsQueryVariables>;
export declare const CreatePartnerDocument: Apollo.DocumentNode;
export declare type CreatePartnerMutationFn = Apollo.MutationFunction<CreatePartnerMutation, CreatePartnerMutationVariables>;
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
export declare function useCreatePartnerMutation(baseOptions?: Apollo.MutationHookOptions<CreatePartnerMutation, CreatePartnerMutationVariables>): Apollo.MutationTuple<CreatePartnerMutation, Exact<{
    input: CreatePartnerInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreatePartnerMutationHookResult = ReturnType<typeof useCreatePartnerMutation>;
export declare type CreatePartnerMutationResult = Apollo.MutationResult<CreatePartnerMutation>;
export declare type CreatePartnerMutationOptions = Apollo.BaseMutationOptions<CreatePartnerMutation, CreatePartnerMutationVariables>;
export declare const UpdatePartnerDocument: Apollo.DocumentNode;
export declare type UpdatePartnerMutationFn = Apollo.MutationFunction<UpdatePartnerMutation, UpdatePartnerMutationVariables>;
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
export declare function useUpdatePartnerMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePartnerMutation, UpdatePartnerMutationVariables>): Apollo.MutationTuple<UpdatePartnerMutation, Exact<{
    id: string;
    input: UpdatePartnerInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type UpdatePartnerMutationHookResult = ReturnType<typeof useUpdatePartnerMutation>;
export declare type UpdatePartnerMutationResult = Apollo.MutationResult<UpdatePartnerMutation>;
export declare type UpdatePartnerMutationOptions = Apollo.BaseMutationOptions<UpdatePartnerMutation, UpdatePartnerMutationVariables>;
export declare const DeletePartnerDocument: Apollo.DocumentNode;
export declare type DeletePartnerMutationFn = Apollo.MutationFunction<DeletePartnerMutation, DeletePartnerMutationVariables>;
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
export declare function useDeletePartnerMutation(baseOptions?: Apollo.MutationHookOptions<DeletePartnerMutation, DeletePartnerMutationVariables>): Apollo.MutationTuple<DeletePartnerMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeletePartnerMutationHookResult = ReturnType<typeof useDeletePartnerMutation>;
export declare type DeletePartnerMutationResult = Apollo.MutationResult<DeletePartnerMutation>;
export declare type DeletePartnerMutationOptions = Apollo.BaseMutationOptions<DeletePartnerMutation, DeletePartnerMutationVariables>;
export declare const GetPartnersDocument: Apollo.DocumentNode;
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
export declare function useGetPartnersQuery(baseOptions?: Apollo.QueryHookOptions<GetPartnersQuery, GetPartnersQueryVariables>): Apollo.QueryResult<GetPartnersQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetPartnersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnersQuery, GetPartnersQueryVariables>): Apollo.QueryTuple<GetPartnersQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetPartnersQueryHookResult = ReturnType<typeof useGetPartnersQuery>;
export declare type GetPartnersLazyQueryHookResult = ReturnType<typeof useGetPartnersLazyQuery>;
export declare type GetPartnersQueryResult = Apollo.QueryResult<GetPartnersQuery, GetPartnersQueryVariables>;
export declare const GetPartnerByIdDocument: Apollo.DocumentNode;
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
export declare function useGetPartnerByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPartnerByIdQuery, GetPartnerByIdQueryVariables>): Apollo.QueryResult<GetPartnerByIdQuery, Exact<{
    id: string;
}>>;
export declare function useGetPartnerByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnerByIdQuery, GetPartnerByIdQueryVariables>): Apollo.QueryTuple<GetPartnerByIdQuery, Exact<{
    id: string;
}>>;
export declare type GetPartnerByIdQueryHookResult = ReturnType<typeof useGetPartnerByIdQuery>;
export declare type GetPartnerByIdLazyQueryHookResult = ReturnType<typeof useGetPartnerByIdLazyQuery>;
export declare type GetPartnerByIdQueryResult = Apollo.QueryResult<GetPartnerByIdQuery, GetPartnerByIdQueryVariables>;
export declare const GetPartnersIdsDocument: Apollo.DocumentNode;
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
export declare function useGetPartnersIdsQuery(baseOptions?: Apollo.QueryHookOptions<GetPartnersIdsQuery, GetPartnersIdsQueryVariables>): Apollo.QueryResult<GetPartnersIdsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetPartnersIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnersIdsQuery, GetPartnersIdsQueryVariables>): Apollo.QueryTuple<GetPartnersIdsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetPartnersIdsQueryHookResult = ReturnType<typeof useGetPartnersIdsQuery>;
export declare type GetPartnersIdsLazyQueryHookResult = ReturnType<typeof useGetPartnersIdsLazyQuery>;
export declare type GetPartnersIdsQueryResult = Apollo.QueryResult<GetPartnersIdsQuery, GetPartnersIdsQueryVariables>;
export declare const GetPartnersWithReceiptsDocument: Apollo.DocumentNode;
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
export declare function useGetPartnersWithReceiptsQuery(baseOptions?: Apollo.QueryHookOptions<GetPartnersWithReceiptsQuery, GetPartnersWithReceiptsQueryVariables>): Apollo.QueryResult<GetPartnersWithReceiptsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetPartnersWithReceiptsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnersWithReceiptsQuery, GetPartnersWithReceiptsQueryVariables>): Apollo.QueryTuple<GetPartnersWithReceiptsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetPartnersWithReceiptsQueryHookResult = ReturnType<typeof useGetPartnersWithReceiptsQuery>;
export declare type GetPartnersWithReceiptsLazyQueryHookResult = ReturnType<typeof useGetPartnersWithReceiptsLazyQuery>;
export declare type GetPartnersWithReceiptsQueryResult = Apollo.QueryResult<GetPartnersWithReceiptsQuery, GetPartnersWithReceiptsQueryVariables>;
export declare const CreateReviewDocument: Apollo.DocumentNode;
export declare type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;
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
export declare function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>): Apollo.MutationTuple<CreateReviewMutation, Exact<{
    input: CreateReviewInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export declare type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export declare type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export declare const CreateServiceOptionDocument: Apollo.DocumentNode;
export declare type CreateServiceOptionMutationFn = Apollo.MutationFunction<CreateServiceOptionMutation, CreateServiceOptionMutationVariables>;
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
export declare function useCreateServiceOptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateServiceOptionMutation, CreateServiceOptionMutationVariables>): Apollo.MutationTuple<CreateServiceOptionMutation, Exact<{
    input: CreateServiceOptionInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateServiceOptionMutationHookResult = ReturnType<typeof useCreateServiceOptionMutation>;
export declare type CreateServiceOptionMutationResult = Apollo.MutationResult<CreateServiceOptionMutation>;
export declare type CreateServiceOptionMutationOptions = Apollo.BaseMutationOptions<CreateServiceOptionMutation, CreateServiceOptionMutationVariables>;
export declare const UpdateServiceOptionDocument: Apollo.DocumentNode;
export declare type UpdateServiceOptionMutationFn = Apollo.MutationFunction<UpdateServiceOptionMutation, UpdateServiceOptionMutationVariables>;
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
export declare function useUpdateServiceOptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServiceOptionMutation, UpdateServiceOptionMutationVariables>): Apollo.MutationTuple<UpdateServiceOptionMutation, Exact<{
    id: string;
    input: UpdateServiceOptionInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type UpdateServiceOptionMutationHookResult = ReturnType<typeof useUpdateServiceOptionMutation>;
export declare type UpdateServiceOptionMutationResult = Apollo.MutationResult<UpdateServiceOptionMutation>;
export declare type UpdateServiceOptionMutationOptions = Apollo.BaseMutationOptions<UpdateServiceOptionMutation, UpdateServiceOptionMutationVariables>;
export declare const DeleteServiceOptionDocument: Apollo.DocumentNode;
export declare type DeleteServiceOptionMutationFn = Apollo.MutationFunction<DeleteServiceOptionMutation, DeleteServiceOptionMutationVariables>;
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
export declare function useDeleteServiceOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServiceOptionMutation, DeleteServiceOptionMutationVariables>): Apollo.MutationTuple<DeleteServiceOptionMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteServiceOptionMutationHookResult = ReturnType<typeof useDeleteServiceOptionMutation>;
export declare type DeleteServiceOptionMutationResult = Apollo.MutationResult<DeleteServiceOptionMutation>;
export declare type DeleteServiceOptionMutationOptions = Apollo.BaseMutationOptions<DeleteServiceOptionMutation, DeleteServiceOptionMutationVariables>;
export declare const GetServiceOptionsDocument: Apollo.DocumentNode;
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
export declare function useGetServiceOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetServiceOptionsQuery, GetServiceOptionsQueryVariables>): Apollo.QueryResult<GetServiceOptionsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetServiceOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceOptionsQuery, GetServiceOptionsQueryVariables>): Apollo.QueryTuple<GetServiceOptionsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetServiceOptionsQueryHookResult = ReturnType<typeof useGetServiceOptionsQuery>;
export declare type GetServiceOptionsLazyQueryHookResult = ReturnType<typeof useGetServiceOptionsLazyQuery>;
export declare type GetServiceOptionsQueryResult = Apollo.QueryResult<GetServiceOptionsQuery, GetServiceOptionsQueryVariables>;
export declare const CreateSpecieOptionDocument: Apollo.DocumentNode;
export declare type CreateSpecieOptionMutationFn = Apollo.MutationFunction<CreateSpecieOptionMutation, CreateSpecieOptionMutationVariables>;
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
export declare function useCreateSpecieOptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSpecieOptionMutation, CreateSpecieOptionMutationVariables>): Apollo.MutationTuple<CreateSpecieOptionMutation, Exact<{
    input: CreateSpecieOptionInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type CreateSpecieOptionMutationHookResult = ReturnType<typeof useCreateSpecieOptionMutation>;
export declare type CreateSpecieOptionMutationResult = Apollo.MutationResult<CreateSpecieOptionMutation>;
export declare type CreateSpecieOptionMutationOptions = Apollo.BaseMutationOptions<CreateSpecieOptionMutation, CreateSpecieOptionMutationVariables>;
export declare const UpdateSpecieOptionDocument: Apollo.DocumentNode;
export declare type UpdateSpecieOptionMutationFn = Apollo.MutationFunction<UpdateSpecieOptionMutation, UpdateSpecieOptionMutationVariables>;
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
export declare function useUpdateSpecieOptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSpecieOptionMutation, UpdateSpecieOptionMutationVariables>): Apollo.MutationTuple<UpdateSpecieOptionMutation, Exact<{
    id: string;
    input: UpdateSpecieOptionInput;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type UpdateSpecieOptionMutationHookResult = ReturnType<typeof useUpdateSpecieOptionMutation>;
export declare type UpdateSpecieOptionMutationResult = Apollo.MutationResult<UpdateSpecieOptionMutation>;
export declare type UpdateSpecieOptionMutationOptions = Apollo.BaseMutationOptions<UpdateSpecieOptionMutation, UpdateSpecieOptionMutationVariables>;
export declare const DeleteSpecieOptionDocument: Apollo.DocumentNode;
export declare type DeleteSpecieOptionMutationFn = Apollo.MutationFunction<DeleteSpecieOptionMutation, DeleteSpecieOptionMutationVariables>;
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
export declare function useDeleteSpecieOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSpecieOptionMutation, DeleteSpecieOptionMutationVariables>): Apollo.MutationTuple<DeleteSpecieOptionMutation, Exact<{
    id: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type DeleteSpecieOptionMutationHookResult = ReturnType<typeof useDeleteSpecieOptionMutation>;
export declare type DeleteSpecieOptionMutationResult = Apollo.MutationResult<DeleteSpecieOptionMutation>;
export declare type DeleteSpecieOptionMutationOptions = Apollo.BaseMutationOptions<DeleteSpecieOptionMutation, DeleteSpecieOptionMutationVariables>;
export declare const GetSpeciesOptionsDocument: Apollo.DocumentNode;
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
export declare function useGetSpeciesOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetSpeciesOptionsQuery, GetSpeciesOptionsQueryVariables>): Apollo.QueryResult<GetSpeciesOptionsQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useGetSpeciesOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpeciesOptionsQuery, GetSpeciesOptionsQueryVariables>): Apollo.QueryTuple<GetSpeciesOptionsQuery, Exact<{
    [key: string]: never;
}>>;
export declare type GetSpeciesOptionsQueryHookResult = ReturnType<typeof useGetSpeciesOptionsQuery>;
export declare type GetSpeciesOptionsLazyQueryHookResult = ReturnType<typeof useGetSpeciesOptionsLazyQuery>;
export declare type GetSpeciesOptionsQueryResult = Apollo.QueryResult<GetSpeciesOptionsQuery, GetSpeciesOptionsQueryVariables>;
export declare const StartCronDocument: Apollo.DocumentNode;
export declare type StartCronMutationFn = Apollo.MutationFunction<StartCronMutation, StartCronMutationVariables>;
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
export declare function useStartCronMutation(baseOptions?: Apollo.MutationHookOptions<StartCronMutation, StartCronMutationVariables>): Apollo.MutationTuple<StartCronMutation, Exact<{
    cronName: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type StartCronMutationHookResult = ReturnType<typeof useStartCronMutation>;
export declare type StartCronMutationResult = Apollo.MutationResult<StartCronMutation>;
export declare type StartCronMutationOptions = Apollo.BaseMutationOptions<StartCronMutation, StartCronMutationVariables>;
export declare const StopCronDocument: Apollo.DocumentNode;
export declare type StopCronMutationFn = Apollo.MutationFunction<StopCronMutation, StopCronMutationVariables>;
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
export declare function useStopCronMutation(baseOptions?: Apollo.MutationHookOptions<StopCronMutation, StopCronMutationVariables>): Apollo.MutationTuple<StopCronMutation, Exact<{
    cronName: string;
}>, Apollo.DefaultContext, Apollo.ApolloCache<any>>;
export declare type StopCronMutationHookResult = ReturnType<typeof useStopCronMutation>;
export declare type StopCronMutationResult = Apollo.MutationResult<StopCronMutation>;
export declare type StopCronMutationOptions = Apollo.BaseMutationOptions<StopCronMutation, StopCronMutationVariables>;
export declare const CurrentStaffDocument: Apollo.DocumentNode;
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
export declare function useCurrentStaffQuery(baseOptions?: Apollo.QueryHookOptions<CurrentStaffQuery, CurrentStaffQueryVariables>): Apollo.QueryResult<CurrentStaffQuery, Exact<{
    [key: string]: never;
}>>;
export declare function useCurrentStaffLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentStaffQuery, CurrentStaffQueryVariables>): Apollo.QueryTuple<CurrentStaffQuery, Exact<{
    [key: string]: never;
}>>;
export declare type CurrentStaffQueryHookResult = ReturnType<typeof useCurrentStaffQuery>;
export declare type CurrentStaffLazyQueryHookResult = ReturnType<typeof useCurrentStaffLazyQuery>;
export declare type CurrentStaffQueryResult = Apollo.QueryResult<CurrentStaffQuery, CurrentStaffQueryVariables>;
export declare const GetCronStatusDocument: Apollo.DocumentNode;
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
export declare function useGetCronStatusQuery(baseOptions: Apollo.QueryHookOptions<GetCronStatusQuery, GetCronStatusQueryVariables>): Apollo.QueryResult<GetCronStatusQuery, Exact<{
    cronName: string;
}>>;
export declare function useGetCronStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCronStatusQuery, GetCronStatusQueryVariables>): Apollo.QueryTuple<GetCronStatusQuery, Exact<{
    cronName: string;
}>>;
export declare type GetCronStatusQueryHookResult = ReturnType<typeof useGetCronStatusQuery>;
export declare type GetCronStatusLazyQueryHookResult = ReturnType<typeof useGetCronStatusLazyQuery>;
export declare type GetCronStatusQueryResult = Apollo.QueryResult<GetCronStatusQuery, GetCronStatusQueryVariables>;
export declare const SubscribeToPendingPaymentCronDocument: Apollo.DocumentNode;
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
export declare function useSubscribeToPendingPaymentCronSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeToPendingPaymentCronSubscription, SubscribeToPendingPaymentCronSubscriptionVariables>): {
    variables: Exact<{
        [key: string]: never;
    }>;
    loading: boolean;
    data?: SubscribeToPendingPaymentCronSubscription;
    error?: Apollo.ApolloError;
};
export declare type SubscribeToPendingPaymentCronSubscriptionHookResult = ReturnType<typeof useSubscribeToPendingPaymentCronSubscription>;
export declare type SubscribeToPendingPaymentCronSubscriptionResult = Apollo.SubscriptionResult<SubscribeToPendingPaymentCronSubscription>;
export declare const SubscribeToSetupIntentCronDocument: Apollo.DocumentNode;
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
export declare function useSubscribeToSetupIntentCronSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeToSetupIntentCronSubscription, SubscribeToSetupIntentCronSubscriptionVariables>): {
    variables: Exact<{
        [key: string]: never;
    }>;
    loading: boolean;
    data?: SubscribeToSetupIntentCronSubscription;
    error?: Apollo.ApolloError;
};
export declare type SubscribeToSetupIntentCronSubscriptionHookResult = ReturnType<typeof useSubscribeToSetupIntentCronSubscription>;
export declare type SubscribeToSetupIntentCronSubscriptionResult = Apollo.SubscriptionResult<SubscribeToSetupIntentCronSubscription>;
export declare const SubscribeToErrorsEmailCronDocument: Apollo.DocumentNode;
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
export declare function useSubscribeToErrorsEmailCronSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeToErrorsEmailCronSubscription, SubscribeToErrorsEmailCronSubscriptionVariables>): {
    variables: Exact<{
        [key: string]: never;
    }>;
    loading: boolean;
    data?: SubscribeToErrorsEmailCronSubscription;
    error?: Apollo.ApolloError;
};
export declare type SubscribeToErrorsEmailCronSubscriptionHookResult = ReturnType<typeof useSubscribeToErrorsEmailCronSubscription>;
export declare type SubscribeToErrorsEmailCronSubscriptionResult = Apollo.SubscriptionResult<SubscribeToErrorsEmailCronSubscription>;
export {};
//# sourceMappingURL=index.d.ts.map