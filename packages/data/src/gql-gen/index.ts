import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
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

export type Account = Node & {
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
export type AccountByIdResult = Account | InvalidArgumentsError | NotFoundError | UserAuthenticationError | UserForbiddenError;

/** Return an account or account related errors */
export type AccountResult = Account | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

/** List of accounts */
export type AccountsList = {
  __typename: 'AccountsList';
  accounts?: Maybe<Array<Maybe<Account>>>;
};

/** Represent the minimal fields required for any actors */
export type Actor = {
  accountId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** GUID for a resource */
  id: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type AdByIdResult = BookingAd | InvalidArgumentsError | NotFoundError;

/** The result of the accounts query */
export type AllAccountsResult = AccountsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type AllOperatorsResult = Operators | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

/** The result of the allStaffs query */
export type AllStaffsResult = StaffsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

/** The result of the allUsers query */
export type AllUsersResult = UnableToProcessError | UserAuthenticationError | UserForbiddenError | UsersList;

export type AuthorizePaymentResult = AuthorizedPayment | InvalidOperatorError | NotFoundError | OperatorCannotProcessPaymentsError | UnableToProcessError | UserAuthenticationError;

export type AuthorizedPayment = {
  __typename: 'AuthorizedPayment';
  clientSecret?: Maybe<Scalars['String']>;
  hadRef?: Maybe<Scalars['Boolean']>;
  stripeTargetApi?: Maybe<Scalars['String']>;
};

export type BidForBookingAdResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type Booking = Node & {
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

export type BookingAd = Node & {
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

export type BookingAdBid = Node & {
  __typename: 'BookingAdBid';
  bookingAd?: Maybe<BookingAd>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** GUID for a resource */
  id: Scalars['String'];
  operator?: Maybe<Operator>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BookingAdBids = {
  __typename: 'BookingAdBids';
  bids?: Maybe<Array<Maybe<BookingAdBid>>>;
};

export type BookingAds = {
  __typename: 'BookingAds';
  bookingAds?: Maybe<Array<Maybe<BookingAd>>>;
};

export type BookingAnimal = Node & {
  __typename: 'BookingAnimal';
  bookingId: Scalars['ID'];
  createdAt?: Maybe<Scalars['DateTime']>;
  /** GUID for a resource */
  id: Scalars['String'];
  specie?: Maybe<SpecieOption>;
  specieOptionId: Scalars['ID'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type BookingByIdResult = Booking | InvalidArgumentsError | NotFoundError;

export type BookingMessage = {
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
export type BookingMessageByIdResult = InvalidArgumentsError | NotFoundError | OperatorBookingMessage | UserAuthenticationError | UserBookingMessage | UserForbiddenError;

export type BookingMessageSubscriptionResult = OperatorBookingMessage | UserAuthenticationError | UserBookingMessage | UserForbiddenError;

export type BookingPayment = StripePayment;

/** The booking different possible status */
export enum BookingStatus {
  BothConfirmed = 'BOTH_CONFIRMED',
  Canceled = 'CANCELED',
  NoneConfirmed = 'NONE_CONFIRMED',
  Paid = 'PAID',
  PaymentAuthorized = 'PAYMENT_AUTHORIZED',
  PendingOwnerValidation = 'PENDING_OWNER_VALIDATION',
  PendingSitterValidation = 'PENDING_SITTER_VALIDATION',
  UnderReview = 'UNDER_REVIEW'
}

export type BookingSubscriptionResult = Booking | UserAuthenticationError | UserForbiddenError;

export type BookingWithPaymentStatusInput = {
  paymentStatus?: Maybe<Scalars['String']>;
  underReview?: Maybe<Scalars['Boolean']>;
};

export type BookingWithPaymentStatusResult = BookingsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

/** List of bookings */
export type BookingsList = {
  __typename: 'BookingsList';
  bookings?: Maybe<Array<Maybe<Booking>>>;
};

export type BookingsResult = BookingsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type BooleanResult = {
  __typename: 'BooleanResult';
  success?: Maybe<Scalars['Boolean']>;
};

export type CancelBookingInput = {
  canceledReason?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  source: Scalars['SourceValue'];
};

export type CancelBookingResult = Booking | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;

export type CancelOnGoingBookingInput = {
  canceledReason: Scalars['String'];
  id: Scalars['ID'];
  source: Scalars['SourceValue'];
};

export type CancelOnGoingBookingResult = Booking | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;

export type CannotBookHimSelfError = {
  __typename: 'CannotBookHimSelfError';
  cannotBookHimSelfError?: Maybe<Scalars['String']>;
};

export type ChargesNotEnabledProcessorAccountError = {
  __typename: 'ChargesNotEnabledProcessorAccountError';
  chargesNotEnabledProcessorAccountError?: Maybe<Scalars['String']>;
};

export type Claim = Node & {
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

export type ClaimByIdResult = Claim | NotFoundError | UserAuthenticationError | UserForbiddenError;

/** List of booking messages */
export type ClaimsList = {
  __typename: 'ClaimsList';
  claims?: Maybe<Array<Maybe<Claim>>>;
};

/** The result of the bookingMessages query */
export type ClaimsResult = ClaimsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type ConfirmBookingInput = {
  id: Scalars['ID'];
  source: Scalars['SourceValue'];
};

export type ConfirmBookingResult = Booking | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;

export type ConnectOperatorToProccessorResult = {
  __typename: 'ConnectOperatorToProccessorResult';
  redirectUrl?: Maybe<Scalars['String']>;
};

export type CreateAccountInput = {
  email: Scalars['EmailAddress'];
  firstName: Scalars['String'];
  originUrl?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

/** The result of the createAccount mutation */
export type CreateAccountResult = Account | InvalidArgumentsError | UnableToProcessError;

export type CreateBookingAdInput = {
  animalsSpeciesIds: Array<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  endDate: Scalars['String'];
  latitude: Scalars['Latitude'];
  longitude: Scalars['Longitude'];
  serviceMaxPrice?: Maybe<Scalars['Float']>;
  serviceOptionId: Scalars['String'];
  startDate: Scalars['String'];
};

export type CreateBookingAdResult = BookingAd | InvalidArgumentsError | PreExistingUserAdError | UnableToProcessError | UserAuthenticationError;

export type CreateBookingClaimInput = {
  bookingId: Scalars['String'];
  operatorId: Scalars['ID'];
  reason: Scalars['String'];
  userId: Scalars['ID'];
};

export type CreateBookingClaimResult = Claim | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError;

export type CreateBookingInput = {
  animalsIds: Array<Scalars['String']>;
  endDate: Scalars['String'];
  message?: Maybe<Scalars['String']>;
  operatorId: Scalars['ID'];
  selectedOptions?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  serviceOptionId: Scalars['ID'];
  startDate: Scalars['String'];
};

export type CreateBookingResult = Booking | CannotBookHimSelfError | ExistingBookingError | InvalidArgumentsError | NotFoundError | NotSupportedExtraServiceError | UnableToProcessError | UserAuthenticationError;

export type CreateDonationReceiptInput = {
  amountDonated: Scalars['Float'];
  donationsIds: Array<Maybe<Scalars['ID']>>;
  filesUrls: Array<Maybe<Scalars['URL']>>;
  partnerId: Scalars['ID'];
};

export type CreateDonationReceiptResult = DonationReceipt | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type CreateGenderOptionInput = {
  nameEn: Scalars['String'];
  nameFr: Scalars['String'];
};

export type CreateGenderOptionResult = GenderOption | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type CreateHostingOptionInput = {
  nameEn: Scalars['String'];
  nameFr: Scalars['String'];
};

export type CreateHostingOptionResult = HostingOption | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type CreateIndividualOperatorInput = {
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
export type CreateIndividualOperatorResult = IndividualOperator | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError;

export type CreateInvidualOperatorCoreServicesInput = {
  price: Scalars['Int'];
  serviceOptionId: Scalars['ID'];
};

export type CreateInvidualOperatorCoreServicesResult = BooleanResult | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError;

export type CreateInvidualOperatorExtraServicesResult = BooleanResult | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError;

export type CreateLanguageOptionInput = {
  mediaId: Scalars['String'];
  nameEn: Scalars['String'];
  nameFr: Scalars['String'];
};

export type CreateLanguageOptionResult = InvalidArgumentsError | LanguageOption | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type CreateMediaInput = {
  fileName: Scalars['String'];
  fileType: Scalars['String'];
  saveAs: Scalars['String'];
};

export type CreateMediaResult = InvalidArgumentsError | StorageInfos | UnableToProcessError | UserAuthenticationError;

export type CreateMessageInput = {
  bookingId: Scalars['String'];
  content: Scalars['String'];
  saveAs: Scalars['SaveAsValue'];
};

export type CreateMessageResult = InvalidArgumentsError | OperatorBookingMessage | StaffBookingMessage | UnableToProcessError | UserAuthenticationError | UserBookingMessage;

export type CreateOperatorAvailabilityInput = {
  dates: Array<Scalars['Date']>;
};

export type CreateOperatorAvailabilityResult = BooleanResult | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError;

export type CreatePartnerInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  storeUrls: Array<Scalars['String']>;
  websiteUrl: Scalars['String'];
};

export type CreatePartnerResult = InvalidArgumentsError | Partner | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type CreateReviewInput = {
  body?: Maybe<Scalars['String']>;
  bookingId: Scalars['String'];
  saveAs: Scalars['String'];
  score: Scalars['PositiveFloat'];
  title: Scalars['String'];
};

export type CreateReviewResult = InvalidArgumentsError | OperatorReview | UnableToProcessError | UserAuthenticationError | UserReview;

export type CreateServiceOptionInput = {
  nameEn: Scalars['String'];
  nameFr: Scalars['String'];
};

export type CreateServiceOptionResult = InvalidArgumentsError | ServiceOption | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type CreateSpecieOptionInput = {
  nameEn: Scalars['String'];
  nameFr: Scalars['String'];
};

export type CreateSpecieOptionResult = InvalidArgumentsError | SpecieOption | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type CreateStaffAccountInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};

/** The result of the createStaffAccount mutation */
export type CreateStaffAccountResult = Account | InvalidArgumentsError | UnableToProcessError;

export type CronStatus = {
  __typename: 'CronStatus';
  status?: Maybe<Scalars['String']>;
};

export type CronSubscriptionsResult = BooleanResult | UserAuthenticationError | UserForbiddenError;

/** The result of the currentAccount query */
export type CurrentAccountResult = Account | NotFoundError | UserAuthenticationError;

export type CurrentOperatorDonationsResult = DonationsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

/** The result of the currentOperatorMedia query */
export type CurrentOperatorMediaResult = NotFoundError | OperatorMedia | SharedMedia | UserAuthenticationError | UserForbiddenError;

export type CurrentOperatorResult = IndividualOperator | NotFoundError | UserAuthenticationError | UserForbiddenError;

export type CurrentStaffResult = NotFoundError | Staff | UserAuthenticationError | UserForbiddenError;

export type CurrentUserAdsResult = BookingAds | UnableToProcessError;

export type CurrentUserAndOperatorBookingsResult = BookingsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type CurrentUserBidsResult = BookingAdBids | UnableToProcessError;

export type CurrentUserBookingFilterInput = {
  endDate?: Maybe<Scalars['Date']>;
  includeFinished?: Maybe<Scalars['Boolean']>;
  serviceOptionId?: Maybe<Scalars['ID']>;
  sortKey?: Maybe<Scalars['String']>;
  sortValue?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
};

export type CurrentUserBookingsResult = BookingsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

/** The result of the currentUserMedia query */
export type CurrentUserMediaResult = NotFoundError | SharedMedia | UserAuthenticationError | UserForbiddenError | UserMedia;



/** The result of the deleteAccount mutation */
export type DeleteAccountResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;

export type DeleteBookingAdResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

/** The result of the deleteClaim mutation */
export type DeleteClaimResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;

export type DeleteDonationReceiptResult = BooleanResult | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type DeleteGenderOptionResult = BooleanResult | InvalidArgumentsError | NotFoundError | UserAuthenticationError | UserForbiddenError;

export type DeleteHostingOptionResult = BooleanResult | InvalidArgumentsError | NotFoundError | UserAuthenticationError | UserForbiddenError;

export type DeleteInvidualOperatorCoreServicesResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;

export type DeleteInvidualOperatorExtraServicesResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;

export type DeleteLanguageOptionResult = BooleanResult | InvalidArgumentsError | NotFoundError | UserAuthenticationError | UserForbiddenError;

/** The result of the deleteMedia mutation */
export type DeleteMediaResult = BooleanResult | InvalidArgumentsError | IsActiveOperatorMainMediaError | IsActiveOperatorWithNoReplacementMediaError | NotFoundError | UnableToProcessError | UserAuthenticationError;

/** The result of the deleteMessage mutation */
export type DeleteMessageResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;

export type DeleteOperatorAvailabilityResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;

export type DeletePartnerResult = BooleanResult | UserAuthenticationError | UserForbiddenError;

/** The result of the deleteReview mutation */
export type DeleteReviewResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;

export type DeleteServiceOptionResult = BooleanResult | InvalidArgumentsError | NotFoundError | UserAuthenticationError | UserForbiddenError;

export type DeleteSpecieOptionResult = BooleanResult | InvalidArgumentsError | NotFoundError | UserAuthenticationError | UserForbiddenError;

export type DetailsNotSubmittedProcessorAccountError = {
  __typename: 'DetailsNotSubmittedProcessorAccountError';
  detailsNotSubmittedProcessorAccountError?: Maybe<Scalars['String']>;
};

export type Donation = Node & {
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

export type DonationByIdResult = Donation | InvalidArgumentsError | NotFoundError;

export type DonationReceipt = Node & {
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

export type DonationReceiptByIdResult = DonationReceipt | InvalidArgumentsError | NotFoundError;

export type DonationReceiptMedia = Media & Node & {
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
export type DonationReceiptsList = {
  __typename: 'DonationReceiptsList';
  donationReceipts?: Maybe<Array<Maybe<DonationReceipt>>>;
};

/** The result of the gendersOptions query */
export type DonationReceiptsResult = DonationReceiptsList | UnableToProcessError;

/** List of donations */
export type DonationsList = {
  __typename: 'DonationsList';
  donations?: Maybe<Array<Maybe<Donation>>>;
};

/** The result of the donations query */
export type DonationsResult = DonationsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;


export type EmailAndPasswordInput = {
  email: Scalars['EmailAddress'];
  password: Scalars['String'];
};

/** The differents error codes the api will return if needed */
export enum ErrorCode {
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  NotFound = 'NOT_FOUND',
  UnableToProcess = 'UNABLE_TO_PROCESS',
  Unauthorized = 'UNAUTHORIZED'
}

/** The differents error message the api will return if needed */
export enum ErrorMessage {
  ForbiddenYouDoNotHaveAccessToThisResource = 'FORBIDDEN_YOU_DO_NOT_HAVE_ACCESS_TO_THIS_RESOURCE',
  ResourceNotFound = 'RESOURCE_NOT_FOUND',
  UnableToProcessRequestDueToClientError = 'UNABLE_TO_PROCESS_REQUEST_DUE_TO_CLIENT_ERROR',
  UnableToProcessRequestDueToServerError = 'UNABLE_TO_PROCESS_REQUEST_DUE_TO_SERVER_ERROR',
  UnauthenticatedPleaseLogin = 'UNAUTHENTICATED_PLEASE_LOGIN'
}

export type ExistingBookingError = {
  __typename: 'ExistingBookingError';
  existingBookingError?: Maybe<Scalars['String']>;
};

export type GenderOption = Node & {
  __typename: 'GenderOption';
  createdAt?: Maybe<Scalars['DateTime']>;
  /** GUID for a resource */
  id: Scalars['String'];
  nameEn: Scalars['String'];
  nameFr: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** The result of the genderOptionById query */
export type GenderOptionByIdResult = GenderOption | InvalidArgumentsError | NotFoundError;

/** List of genderOptions */
export type GenderOptionsList = {
  __typename: 'GenderOptionsList';
  genderOptions?: Maybe<Array<Maybe<GenderOption>>>;
};

/** The result of the gendersOptions query */
export type GenderOptionsResult = GenderOptionsList | UnableToProcessError;

export type GetCronStatusResult = CronStatus | UserAuthenticationError | UserForbiddenError;

export type HostingOption = Node & {
  __typename: 'HostingOption';
  createdAt?: Maybe<Scalars['DateTime']>;
  /** GUID for a resource */
  id: Scalars['String'];
  nameEn: Scalars['String'];
  nameFr: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** The result of the hostingOptionById query */
export type HostingOptionByIdResult = Account | InvalidArgumentsError | NotFoundError;

/** List of HostingOptions */
export type HostingOptionsList = {
  __typename: 'HostingOptionsList';
  hostingOptions?: Maybe<Array<Maybe<HostingOption>>>;
};

/** The result of the hostingsOptions query */
export type HostingOptionsResult = HostingOptionsList | UnableToProcessError;

export type IndividualOperator = Actor & Node & Operator & {
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

export type IndividualOperatorCoreService = Node & {
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

export type IndividualOperatorExtraService = Node & {
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

export type InvalidArgument = {
  __typename: 'InvalidArgument';
  key: Scalars['String'];
  message: Scalars['String'];
};

export type InvalidArgumentsError = {
  __typename: 'InvalidArgumentsError';
  code: ErrorCode;
  invalidArguments: Array<Maybe<InvalidArgument>>;
  message: ErrorMessage;
};

export type InvalidOperatorError = {
  __typename: 'InvalidOperatorError';
  invalidOperatorError?: Maybe<Scalars['String']>;
};

export type InvidualOperatorExtraServicesInput = {
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

export type IsActiveOperatorMainMediaError = {
  __typename: 'IsActiveOperatorMainMediaError';
  activeOperatorMainMediaError: Scalars['String'];
};

export type IsActiveOperatorWithNoReplacementMediaError = {
  __typename: 'IsActiveOperatorWithNoReplacementMediaError';
  activeOperatorWithNoReplacementMediaError: Scalars['String'];
};



export type LanguageOption = Node & {
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
export type LanguageOptionByIdResult = InvalidArgumentsError | LanguageOption | NotFoundError;

export type LanguageOptionMedia = Media & Node & {
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
export type LanguageOptionsList = {
  __typename: 'LanguageOptionsList';
  languageOptions?: Maybe<Array<Maybe<LanguageOption>>>;
};

/** The result of the languagesOptions query */
export type LanguageOptionsResult = LanguageOptionsList | UnableToProcessError;


export type Location = Node & {
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

export type LocationSearchInfos = {
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

export type LocationSearchResult = InvalidArgumentsError | LocationsList | UnableToProcessError;

export type LocationsList = {
  __typename: 'LocationsList';
  locations?: Maybe<Array<Maybe<LocationSearchInfos>>>;
};


/** The result of the lostPassword mutation */
export type LostPasswordResult = BooleanResult | NotFoundError;

/** The minimum required fields for media types */
export type Media = {
  createdAt?: Maybe<Scalars['DateTime']>;
  /** GUID for a resource */
  id: Scalars['String'];
  mediaType?: Maybe<MediaType>;
  storeUrl: Scalars['URL'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** The result of the mediaById query */
export type MediaByIdResult = InvalidArgumentsError | NotFoundError | OperatorMedia | SharedMedia | UserAuthenticationError | UserForbiddenError | UserMedia;

/** Type of media accepted */
export enum MediaType {
  Image = 'IMAGE',
  Video = 'VIDEO'
}

/** List of medias */
export type MediasList = {
  __typename: 'MediasList';
  medias?: Maybe<Array<Maybe<Media>>>;
};

/** The result of the medias query */
export type MediasResult = MediasList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

/** The minimum required fields for message types */
export type Message = {
  content: Scalars['String'];
  createdAt?: Maybe<Scalars['DateTime']>;
  /** GUID for a resource */
  id: Scalars['String'];
  medias?: Maybe<Array<Maybe<Media>>>;
  readAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type MessageMedia = Media & Node & {
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
export type MessagesByBookingIdResult = InvalidArgumentsError | MessagesList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

/** List of booking messages */
export type MessagesList = {
  __typename: 'MessagesList';
  messages?: Maybe<Array<Maybe<Message>>>;
};

/** The result of the bookingMessages query */
export type MessagesResult = MessagesList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type MissingProcessorAccountError = {
  __typename: 'MissingProcessorAccountError';
  missingProcessorAccountError?: Maybe<Scalars['String']>;
};

/** The result of the modifyEmail mutation */
export type ModifyEmailResult = Account | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;

/** The result of the modifyPassword mutation */
export type ModifyPasswordResult = Account | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;

export type Mutation = {
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


export type MutationAuthorizePaymentArgs = {
  id: Scalars['ID'];
};


export type MutationBidForBookingAdArgs = {
  id: Scalars['ID'];
};


export type MutationCancelBookingArgs = {
  input: CancelBookingInput;
};


export type MutationCancelOnGoingBookingArgs = {
  input: CancelOnGoingBookingInput;
};


export type MutationConfirmBookingArgs = {
  input: ConfirmBookingInput;
};


export type MutationCreateAccountArgs = {
  input: CreateAccountInput;
};


export type MutationCreateBookingArgs = {
  input: CreateBookingInput;
};


export type MutationCreateBookingAdArgs = {
  input: CreateBookingAdInput;
};


export type MutationCreateBookingClaimArgs = {
  input: CreateBookingClaimInput;
};


export type MutationCreateDonationReceiptArgs = {
  input: CreateDonationReceiptInput;
};


export type MutationCreateGenderOptionArgs = {
  input: CreateGenderOptionInput;
};


export type MutationCreateHostingOptionArgs = {
  input: CreateHostingOptionInput;
};


export type MutationCreateIndividualOperatorArgs = {
  input: CreateIndividualOperatorInput;
};


export type MutationCreateInvidualOperatorCoreServicesArgs = {
  input: CreateInvidualOperatorCoreServicesInput;
};


export type MutationCreateInvidualOperatorExtraServicesArgs = {
  input: InvidualOperatorExtraServicesInput;
};


export type MutationCreateLanguageOptionArgs = {
  input: CreateLanguageOptionInput;
};


export type MutationCreateMediaArgs = {
  input: CreateMediaInput;
};


export type MutationCreateMessageArgs = {
  input: CreateMessageInput;
};


export type MutationCreateOperatorAvailabilityArgs = {
  input: CreateOperatorAvailabilityInput;
};


export type MutationCreatePartnerArgs = {
  input: CreatePartnerInput;
};


export type MutationCreateReviewArgs = {
  input: CreateReviewInput;
};


export type MutationCreateServiceOptionArgs = {
  input: CreateServiceOptionInput;
};


export type MutationCreateSpecieOptionArgs = {
  input: CreateSpecieOptionInput;
};


export type MutationCreateStaffAccountArgs = {
  input: CreateStaffAccountInput;
};


export type MutationDeleteAccountArgs = {
  confirmPassword: Scalars['String'];
};


export type MutationDeleteBookingAdArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteClaimArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteCoreIndividualOperatorServiceArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteDonationReceiptArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteExtraIndividualOperatorServiceArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteGenderOptionArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteHostingOptionArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteLanguageOptionArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMediaArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteOperatorAvailabilityArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationDeletePartnerArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteServiceOptionArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteSpecieOptionArgs = {
  id: Scalars['ID'];
};


export type MutationLostPasswordArgs = {
  email: Scalars['String'];
};


export type MutationModifyEmailArgs = {
  email: Scalars['String'];
};


export type MutationModifyPasswordArgs = {
  newPassword: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveBidForBookingAdArgs = {
  id: Scalars['ID'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};


export type MutationSendVerificationEmailArgs = {
  email: Scalars['String'];
};


export type MutationSetAsReadArgs = {
  input: SetMessagesAsReadInput;
};


export type MutationSetMediaAsAvatarArgs = {
  id: Scalars['ID'];
};


export type MutationSignInArgs = {
  input: EmailAndPasswordInput;
};


export type MutationStartCronArgs = {
  cronName: Scalars['String'];
};


export type MutationStopCronArgs = {
  cronName: Scalars['String'];
};


export type MutationUpdateBookingAdArgs = {
  id: Scalars['ID'];
  input: UpdateBookingAdInput;
};


export type MutationUpdateBookingPaymentStatusArgs = {
  input: UpdateBookingPaymentStatusInput;
};


export type MutationUpdateDonationReceiptArgs = {
  input: UpdateDonationReceiptInput;
};


export type MutationUpdateGenderOptionArgs = {
  id: Scalars['ID'];
  input: UpdateGenderOptionInput;
};


export type MutationUpdateHostingOptionArgs = {
  id: Scalars['ID'];
  input: UpdateHostingOptionInput;
};


export type MutationUpdateIndividualOperatorArgs = {
  input: UpdateIndividualOperatorInput;
};


export type MutationUpdateInvidualOperatorCoreServicesArgs = {
  input: UpdateInvidualOperatorCoreServicesInput;
};


export type MutationUpdateInvidualOperatorExtraServicesArgs = {
  id: Scalars['ID'];
  input: InvidualOperatorExtraServicesInput;
};


export type MutationUpdateLanguageOptionArgs = {
  id: Scalars['ID'];
  input: UpdateLanguageOptionInput;
};


export type MutationUpdateMessageArgs = {
  id: Scalars['ID'];
  input: UpdateMessageInput;
};


export type MutationUpdatePartnerArgs = {
  id: Scalars['ID'];
  input: UpdatePartnerInput;
};


export type MutationUpdateReviewArgs = {
  id: Scalars['ID'];
  input: UpdateReviewInput;
  saveAs: Scalars['String'];
};


export type MutationUpdateServiceOptionArgs = {
  id: Scalars['ID'];
  input: UpdateServiceOptionInput;
};


export type MutationUpdateSpecieOptionArgs = {
  id: Scalars['ID'];
  input: UpdateSpecieOptionInput;
};


export type MutationVerifyUserArgs = {
  input: VerifyUserInput;
};

export type Node = {
  createdAt?: Maybe<Scalars['DateTime']>;
  /** GUID for a resource */
  id: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type NotFoundError = {
  __typename: 'NotFoundError';
  code: ErrorCode;
  message: ErrorMessage;
};

export type NotSupportedExtraServiceError = {
  __typename: 'NotSupportedExtraServiceError';
  notSupportedExtraServiceError?: Maybe<Scalars['String']>;
};

/** Represent the required fields of commercial operators on the plateform. */
export type Operator = {
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

export type OperatorAvailability = Node & {
  __typename: 'OperatorAvailability';
  createdAt?: Maybe<Scalars['DateTime']>;
  date?: Maybe<Scalars['Date']>;
  /** GUID for a resource */
  id: Scalars['String'];
  operator?: Maybe<IndividualOperator>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OperatorBookingMessage = BookingMessage & Message & Node & {
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

export type OperatorByIdResult = IndividualOperator | NotFoundError;

export type OperatorCannotProcessPaymentsError = {
  __typename: 'OperatorCannotProcessPaymentsError';
  operatorCannotProcessPaymentsError?: Maybe<Scalars['String']>;
};

export type OperatorMedia = Media & Node & {
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

export type OperatorReview = Node & Review & {
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

export type Operators = {
  __typename: 'Operators';
  operators?: Maybe<Array<Maybe<IndividualOperator>>>;
};

export type Partner = Node & {
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

export type PartnerByIdResult = NotFoundError | Partner;

export type PartnerMedia = Media & Node & {
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
export type PartnersList = {
  __typename: 'PartnersList';
  partners?: Maybe<Array<Maybe<Partner>>>;
};

/** The result of the partners query */
export type PartnersResult = PartnersList | UnableToProcessError;

export type Payment = {
  bookingId?: Maybe<Scalars['ID']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  /** GUID for a resource */
  id: Scalars['String'];
  status: PaymentStatus;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type PaymentProcessorError = {
  __typename: 'PaymentProcessorError';
  paymentProcessorError?: Maybe<Scalars['String']>;
};

/** All possible payment status */
export enum PaymentStatus {
  AuthorizedButCancelled = 'AUTHORIZED_BUT_CANCELLED',
  AuthorizedRequireCapture = 'AUTHORIZED_REQUIRE_CAPTURE',
  CapturedAndPaid = 'CAPTURED_AND_PAID',
  ErrorSendingAuthRequiredMail = 'ERROR_SENDING_AUTH_REQUIRED_MAIL',
  ErrorSendingInsufficientFundsMail = 'ERROR_SENDING_INSUFFICIENT_FUNDS_MAIL',
  ErrorSendingUnkownErrorMail = 'ERROR_SENDING_UNKOWN_ERROR_MAIL',
  FailedCapture = 'FAILED_CAPTURE',
  FailedPaymentIntentCreationAuthRequired = 'FAILED_PAYMENT_INTENT_CREATION_AUTH_REQUIRED',
  FailedPaymentIntentCreationAuthRequiredMailSent = 'FAILED_PAYMENT_INTENT_CREATION_AUTH_REQUIRED_MAIL_SENT',
  FailedPaymentIntentCreationInsufficientFunds = 'FAILED_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS',
  FailedPaymentIntentCreationInsufficientFundsMailSent = 'FAILED_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS_MAIL_SENT',
  FailedPaymentIntentCreationUnkownError = 'FAILED_PAYMENT_INTENT_CREATION_UNKOWN_ERROR',
  FailedPaymentIntentCreationUnkownErrorMailSent = 'FAILED_PAYMENT_INTENT_CREATION_UNKOWN_ERROR_MAIL_SENT',
  PendingAuthorization = 'PENDING_AUTHORIZATION',
  SetupIntentConfirmedRequiredPaymentIntentCreation = 'SETUP_INTENT_CONFIRMED_REQUIRED_PAYMENT_INTENT_CREATION',
  SetupIntentPendingConfirmation = 'SETUP_INTENT_PENDING_CONFIRMATION'
}


export type PreExistingOperatorBidError = {
  __typename: 'PreExistingOperatorBidError';
  preExistingOperatorBidError?: Maybe<Scalars['String']>;
};

export type PreExistingUserAdError = {
  __typename: 'PreExistingUserAdError';
  preExistingUserAdError?: Maybe<Scalars['String']>;
};

export type Query = {
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


export type QueryAccountByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAdByIdArgs = {
  id: Scalars['ID'];
};


export type QueryBookingByIdArgs = {
  id: Scalars['ID'];
};


export type QueryBookingMessageByIdArgs = {
  id: Scalars['ID'];
};


export type QueryBookingsWithPaymentStatusArgs = {
  input: BookingWithPaymentStatusInput;
};


export type QueryClaimByIdArgs = {
  id: Scalars['ID'];
};


export type QueryCurrentUserOperatorBookingsArgs = {
  input: CurrentUserBookingFilterInput;
};


export type QueryCurrentUserOwnerBookingsArgs = {
  input: CurrentUserBookingFilterInput;
};


export type QueryDonationByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGenderOptionByIdArgs = {
  id: Scalars['ID'];
};


export type QueryGetCronStatusArgs = {
  cronName: Scalars['String'];
};


export type QueryHostingOptionByIdArgs = {
  id: Scalars['ID'];
};


export type QueryLanguageOptionByIdArgs = {
  id: Scalars['ID'];
};


export type QueryLocationSearchArgs = {
  locale: Scalars['String'];
  query: Scalars['String'];
};


export type QueryMediaByIdArgs = {
  id: Scalars['ID'];
};


export type QueryMessagesByBookingIdArgs = {
  id: Scalars['ID'];
};


export type QueryOperatorByIdArgs = {
  id: Scalars['ID'];
};


export type QueryPartnerByIdArgs = {
  id: Scalars['ID'];
};


export type QueryReceiptByIdArgs = {
  id: Scalars['ID'];
};


export type QueryReviewByIdArgs = {
  id: Scalars['ID'];
};


export type QuerySearchAdsArgs = {
  input: SearchAdsInput;
};


export type QuerySearchDonationReceiptsArgs = {
  input: SearchDonationReceiptsInput;
};


export type QuerySearchDonationsArgs = {
  input: SearchDonationsInput;
};


export type QuerySearchOperatorsArgs = {
  input: SearchOperatorsInput;
};


export type QuerySearchPartnersArgs = {
  input: SearchPartnersInput;
};


export type QueryServiceOptionByIdArgs = {
  id: Scalars['ID'];
};


export type QuerySpecieOptionByIdArgs = {
  id: Scalars['ID'];
};


export type QueryStaffByIdArgs = {
  id: Scalars['ID'];
};


export type QueryUserByIdArgs = {
  id: Scalars['ID'];
};

export type RemoveBidForBookingAdResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type ResetPasswordInput = {
  newPassword: Scalars['String'];
  token: Scalars['JWT'];
};

/** The result of the resetPassword mutation */
export type ResetPasswordResult = BooleanResult | InvalidArgumentsError | UnableToProcessError;

export type Review = {
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
export type ReviewByIdResult = InvalidArgumentsError | NotFoundError | OperatorReview | UserAuthenticationError | UserForbiddenError | UserReview;

/** List of reviews */
export type ReviewsList = {
  __typename: 'ReviewsList';
  reviews?: Maybe<Array<Maybe<Review>>>;
};

/** The result of the reviews query */
export type ReviewsResult = ReviewsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;


export type SearchAdsInput = {
  acceptedAnimalsIds: Array<Scalars['ID']>;
  latitude: Scalars['Latitude'];
  longitude: Scalars['Longitude'];
  maxDistanceInKms?: Maybe<Scalars['Float']>;
  serviceOptionIds?: Maybe<Array<Scalars['String']>>;
};

export type SearchAdsResult = BookingAds | UnableToProcessError;

export type SearchDonationReceiptsInput = {
  endDate?: Maybe<Scalars['Date']>;
  partnerId?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
};

export type SearchDonationReceiptsResult = DonationReceiptsList | InvalidArgumentsError | UnableToProcessError;

export type SearchDonationsInput = {
  donated?: Maybe<Scalars['Boolean']>;
  endDate?: Maybe<Scalars['Date']>;
  partnerId?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
};

export type SearchDonationsResult = DonationsList | InvalidArgumentsError | UnableToProcessError;

export type SearchOperatorsInput = {
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

export type SearchOperatorsResult = Operators | UnableToProcessError;

export type SearchPartnersInput = {
  query: Scalars['String'];
};

export type SearchPartnersResult = PartnersList | UnableToProcessError;

/** The result of the sendVerificationEmail mutation */
export type SendVerificationEmailResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError;

export type ServiceOption = Node & {
  __typename: 'ServiceOption';
  createdAt?: Maybe<Scalars['DateTime']>;
  /** GUID for a resource */
  id: Scalars['String'];
  nameEn: Scalars['String'];
  nameFr: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** The result of the serviceOptionById query */
export type ServiceOptionByIdResult = InvalidArgumentsError | NotFoundError | ServiceOption | UserAuthenticationError | UserForbiddenError;

/** List of serviceOptions */
export type ServiceOptionsList = {
  __typename: 'ServiceOptionsList';
  serviceOptions?: Maybe<Array<Maybe<ServiceOption>>>;
};

/** The result of the servicesOptions query */
export type ServiceOptionsResult = ServiceOptionsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type SetMediaAsAvatarResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type SetMessagesAsReadInput = {
  ids: Array<Scalars['ID']>;
  readAt?: Maybe<Scalars['Date']>;
};

/** The result of the setMessageAsRead mutation */
export type SetMessagesAsReadResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;

export type SharedMedia = Media & Node & {
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
export type SignInResult = Account | InvalidArgumentsError | NotFoundError | UnableToProcessError;

/** The result of the signOut mutation */
export type SignOutResult = BooleanResult | UnableToProcessError | UserAuthenticationError;


export type SpecieOption = Node & {
  __typename: 'SpecieOption';
  createdAt?: Maybe<Scalars['DateTime']>;
  /** GUID for a resource */
  id: Scalars['String'];
  nameEn: Scalars['String'];
  nameFr: Scalars['String'];
  updatedAt?: Maybe<Scalars['DateTime']>;
};

/** The result of the specieOptionById query */
export type SpecieOptionByIdResult = InvalidArgumentsError | NotFoundError | SpecieOption | UserAuthenticationError | UserForbiddenError;

/** List of specieOptions */
export type SpecieOptionsList = {
  __typename: 'SpecieOptionsList';
  specieOptions?: Maybe<Array<Maybe<SpecieOption>>>;
};

/** The result of the speciesOptions query */
export type SpecieOptionsResult = SpecieOptionsList | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type Staff = Node & {
  __typename: 'Staff';
  createdAt?: Maybe<Scalars['DateTime']>;
  email?: Maybe<Scalars['String']>;
  /** GUID for a resource */
  id: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type StaffBookingMessage = BookingMessage & Message & Node & {
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
export type StaffByIdResult = InvalidArgumentsError | NotFoundError | Staff | UserAuthenticationError | UserForbiddenError;

/** List of Staffs */
export type StaffsList = {
  __typename: 'StaffsList';
  staffs?: Maybe<Array<Maybe<Staff>>>;
};

export type StartCronResult = BooleanResult | UserAuthenticationError | UserForbiddenError;

export type StopCronResult = BooleanResult | UserAuthenticationError | UserForbiddenError;

export type StorageInfos = {
  __typename: 'StorageInfos';
  mediaId: Scalars['ID'];
  signedRequest?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
};

export type StripePayment = Node & Payment & {
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

export type Subscription = {
  __typename: 'Subscription';
  bookingByIdChatSub?: Maybe<BookingMessageSubscriptionResult>;
  errorsEmailCronSub?: Maybe<CronSubscriptionsResult>;
  newlyCreatedBookingsAsSitterSub?: Maybe<BookingSubscriptionResult>;
  pendingPaymentCronSub?: Maybe<CronSubscriptionsResult>;
  setupIntentCronSub?: Maybe<CronSubscriptionsResult>;
  userBookingsMessagesChangesSub?: Maybe<BookingMessageSubscriptionResult>;
  userBookingsStatusChangesSub?: Maybe<BookingSubscriptionResult>;
};


export type SubscriptionBookingByIdChatSubArgs = {
  bookingId: Scalars['ID'];
};


export type SubscriptionNewlyCreatedBookingsAsSitterSubArgs = {
  sitterId?: Maybe<Scalars['ID']>;
};


export type SubscriptionUserBookingsMessagesChangesSubArgs = {
  authorId?: Maybe<Scalars['ID']>;
  bookingIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


export type SubscriptionUserBookingsStatusChangesSubArgs = {
  bookingIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};


export type UnableToProcessError = {
  __typename: 'UnableToProcessError';
  code: ErrorCode;
  message: ErrorMessage;
};

export type UpdateBookingAdInput = {
  animalsSpeciesIds: Array<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  endDate: Scalars['String'];
  latitude: Scalars['Latitude'];
  longitude: Scalars['Longitude'];
  serviceMaxPrice?: Maybe<Scalars['Float']>;
  serviceOptionId: Scalars['String'];
  startDate: Scalars['String'];
};

export type UpdateBookingAdResult = BookingAd | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError;

export type UpdateBookingPaymentStatusInput = {
  id: Scalars['ID'];
  paymentMethodId?: Maybe<Scalars['String']>;
};

export type UpdateBookingPaymentStatusResult = BooleanResult | InvalidArgumentsError | NotFoundError | PaymentProcessorError | UnableToProcessError | UserAuthenticationError;

export type UpdateDonationReceiptInput = {
  amountDonated: Scalars['Float'];
  donationsIds: Array<Maybe<Scalars['ID']>>;
  filesUrls: Array<Maybe<Scalars['URL']>>;
  id: Scalars['ID'];
  partnerId: Scalars['ID'];
};

export type UpdateDonationReceiptResult = DonationReceipt | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type UpdateGenderOptionInput = {
  nameEn?: Maybe<Scalars['String']>;
  nameFr?: Maybe<Scalars['String']>;
};

export type UpdateGenderOptionResult = GenderOption | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type UpdateHostingOptionInput = {
  nameEn?: Maybe<Scalars['String']>;
  nameFr?: Maybe<Scalars['String']>;
};

export type UpdateHostingOptionResult = HostingOption | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type UpdateIndividualOperatorInput = {
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
export type UpdateIndividualOperatorResult = IndividualOperator | InvalidArgumentsError | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type UpdateInvidualOperatorCoreServicesInput = {
  coreOperatorServiceId: Scalars['ID'];
  price: Scalars['Int'];
  serviceOptionId: Scalars['ID'];
};

export type UpdateInvidualOperatorCoreServicesResult = BooleanResult | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError;

export type UpdateInvidualOperatorExtraServicesResult = BooleanResult | InvalidArgumentsError | UnableToProcessError | UserAuthenticationError;

export type UpdateLanguageOptionInput = {
  mediaId?: Maybe<Scalars['ID']>;
  nameEn?: Maybe<Scalars['String']>;
  nameFr?: Maybe<Scalars['String']>;
};

export type UpdateLanguageOptionResult = InvalidArgumentsError | LanguageOption | NotFoundError | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type UpdateMessageInput = {
  content: Scalars['String'];
  readAt?: Maybe<Scalars['Date']>;
  saveAs?: Maybe<Scalars['SaveAsValue']>;
};

export type UpdateMessageResult = InvalidArgumentsError | NotFoundError | OperatorBookingMessage | StaffBookingMessage | UnableToProcessError | UserAuthenticationError | UserBookingMessage;

export type UpdatePartnerInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  storeUrls: Array<Scalars['String']>;
  websiteUrl: Scalars['String'];
};

export type UpdatePartnerResult = InvalidArgumentsError | Partner | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type UpdateReviewInput = {
  body?: Maybe<Scalars['String']>;
  score: Scalars['PositiveFloat'];
  title: Scalars['String'];
};

export type UpdateReviewResult = InvalidArgumentsError | NotFoundError | OperatorReview | UnableToProcessError | UserAuthenticationError | UserReview;

export type UpdateServiceOptionInput = {
  nameEn?: Maybe<Scalars['String']>;
  nameFr?: Maybe<Scalars['String']>;
};

export type UpdateServiceOptionResult = InvalidArgumentsError | NotFoundError | ServiceOption | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type UpdateSpecieOptionInput = {
  nameEn?: Maybe<Scalars['String']>;
  nameFr?: Maybe<Scalars['String']>;
};

export type UpdateSpecieOptionResult = InvalidArgumentsError | NotFoundError | SpecieOption | UnableToProcessError | UserAuthenticationError | UserForbiddenError;

export type User = Actor & Node & {
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

export type UserAuthenticationError = {
  __typename: 'UserAuthenticationError';
  code: ErrorCode;
  message: ErrorMessage;
};

export type UserBookingMessage = BookingMessage & Message & Node & {
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
export type UserByIdResult = InvalidArgumentsError | NotFoundError | User | UserAuthenticationError | UserForbiddenError;

export type UserForbiddenError = {
  __typename: 'UserForbiddenError';
  code: ErrorCode;
  message: ErrorMessage;
};

export type UserMedia = Media & Node & {
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

export type UserReview = Node & Review & {
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
export type UsersList = {
  __typename: 'UsersList';
  users?: Maybe<Array<Maybe<User>>>;
};

export type VerifyUserInput = {
  token: Scalars['JWT'];
};

export type VerifyUserProcessorConnectionCompletionResult = BooleanResult | ChargesNotEnabledProcessorAccountError | DetailsNotSubmittedProcessorAccountError | MissingProcessorAccountError | NotFoundError | UnableToProcessError;

/** The result of the verifyUser mutation */
export type VerifyUserResult = BooleanResult | InvalidArgumentsError | NotFoundError | UnableToProcessError;

export type CreateAccountMutationVariables = Exact<{
  input: CreateAccountInput;
}>;


export type CreateAccountMutation = { __typename: 'Mutation', createAccount?: Maybe<{ __typename: 'Account', id: string, email?: Maybe<string> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type SignInMutationVariables = Exact<{
  input: EmailAndPasswordInput;
}>;


export type SignInMutation = { __typename: 'Mutation', signIn?: Maybe<{ __typename: 'Account', id: string } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type SignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type SignOutMutation = { __typename: 'Mutation', signOut?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

export type SendVerificationEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendVerificationEmailMutation = { __typename: 'Mutation', sendVerificationEmail?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type VerifyUserMutationVariables = Exact<{
  input: VerifyUserInput;
}>;


export type VerifyUserMutation = { __typename: 'Mutation', verifyUser?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type DeleteAccountMutationVariables = Exact<{
  confirmPassword: Scalars['String'];
}>;


export type DeleteAccountMutation = { __typename: 'Mutation', deleteAccount?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' }> };

export type LostPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type LostPasswordMutation = { __typename: 'Mutation', lostPassword?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage }> };

export type ResetPasswordMutationVariables = Exact<{
  input: ResetPasswordInput;
}>;


export type ResetPasswordMutation = { __typename: 'Mutation', resetPassword?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type ModifyPasswordMutationVariables = Exact<{
  password: Scalars['String'];
  newPassword: Scalars['String'];
}>;


export type ModifyPasswordMutation = { __typename: 'Mutation', modifyPassword?: Maybe<{ __typename: 'Account', id: string } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

export type ModifyEmailMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ModifyEmailMutation = { __typename: 'Mutation', modifyEmail?: Maybe<{ __typename: 'Account', id: string } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

export type CurrentAccountQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentAccountQuery = { __typename: 'Query', currentAccount?: Maybe<{ __typename: 'Account', id: string, email?: Maybe<string>, verifiedAt?: Maybe<Date>, user?: Maybe<{ __typename: 'User', firstName: string }>, operator?: Maybe<{ __typename: 'IndividualOperator', id: string, isActive?: Maybe<boolean> }> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

export type AllAccountsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAccountsQuery = { __typename: 'Query', allAccounts?: Maybe<{ __typename: 'AccountsList', accounts?: Maybe<Array<Maybe<{ __typename: 'Account', id: string, verifiedAt?: Maybe<Date>, updatedAt?: Maybe<Date> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type CreateBookingAdMutationVariables = Exact<{
  input: CreateBookingAdInput;
}>;


export type CreateBookingAdMutation = { __typename: 'Mutation', createBookingAd?: Maybe<{ __typename: 'BookingAd', id: string, createdAt?: Maybe<Date>, updatedAt?: Maybe<Date>, animalsSpeciesIds: Array<string>, startDate?: Maybe<Date>, endDate?: Maybe<Date>, serviceOptionId: string, description?: Maybe<string>, location?: Maybe<{ __typename: 'Location', latitude: number, longitude: any }> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'PreExistingUserAdError', preExistingUserAdError?: Maybe<string> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' }> };

export type UpdateBookingAdMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateBookingAdInput;
}>;


export type UpdateBookingAdMutation = { __typename: 'Mutation', updateBookingAd?: Maybe<{ __typename: 'BookingAd', id: string, createdAt?: Maybe<Date>, updatedAt?: Maybe<Date>, animalsSpeciesIds: Array<string>, startDate?: Maybe<Date>, endDate?: Maybe<Date>, serviceOptionId: string, description?: Maybe<string>, location?: Maybe<{ __typename: 'Location', latitude: number, longitude: any }> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' }> };

export type DeleteBookingAdMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteBookingAdMutation = { __typename: 'Mutation', deleteBookingAd?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type BidForBookingAdMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BidForBookingAdMutation = { __typename: 'Mutation', bidForBookingAd?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type RemoveBidForBookingAdMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type RemoveBidForBookingAdMutation = { __typename: 'Mutation', removeBidForBookingAd?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type CurrentUserAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserAdsQuery = { __typename: 'Query', currentUserAds?: Maybe<{ __typename: 'BookingAds', bookingAds?: Maybe<Array<Maybe<{ __typename: 'BookingAd', id: string, createdAt?: Maybe<Date>, updatedAt?: Maybe<Date>, animalsSpeciesIds: Array<string>, startDate?: Maybe<Date>, endDate?: Maybe<Date>, serviceOptionId: string, serviceMaxPrice?: Maybe<number>, description?: Maybe<string>, bidders?: Maybe<Array<Maybe<{ __typename: 'IndividualOperator', id: string, bids?: Maybe<Array<Maybe<{ __typename: 'BookingAdBid', id: string }>>> }>>> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type AdByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AdByIdQuery = { __typename: 'Query', adById?: Maybe<{ __typename: 'BookingAd', id: string, updatedAt?: Maybe<Date>, animalsSpeciesIds: Array<string>, startDate?: Maybe<Date>, endDate?: Maybe<Date>, serviceOptionId: string, description?: Maybe<string>, serviceMaxPrice?: Maybe<number>, location?: Maybe<{ __typename: 'Location', latitude: number, longitude: any }>, bidders?: Maybe<Array<Maybe<{ __typename: 'IndividualOperator', id: string, averageScore?: Maybe<number>, account?: Maybe<{ __typename: 'Account', user?: Maybe<{ __typename: 'User', firstName: string }> }>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>, location?: Maybe<{ __typename: 'Location', latitude: number, longitude: any }>, coreServices?: Maybe<Array<Maybe<{ __typename: 'IndividualOperatorCoreService', id: string, price: number }>>>, extraServices?: Maybe<{ __typename: 'IndividualOperatorExtraService', atHomeExclusivity?: Maybe<boolean>, atHomeExclusivityExtraPrice?: Maybe<number>, atHomeContinuously?: Maybe<boolean>, atHomeContinuouslyExtraPrice?: Maybe<number>, atHomeOnlyBringPet?: Maybe<boolean>, atHomeOnlyBringPetExtraPrice?: Maybe<number>, atHomeComeGetPet?: Maybe<boolean>, atHomeComeGetPetExtraPrice?: Maybe<number>, atOwnerHomePlantsCare?: Maybe<boolean>, atOwnerHomePlantsCareExtraPrice?: Maybe<number>, atOwnerHomeMail?: Maybe<boolean>, atOwnerHomeMailExtraPrice?: Maybe<number>, atOwnerHomeCurtains?: Maybe<boolean>, atOwnerHomeCurtainsExtraPrice?: Maybe<number>, acceptShortNotice?: Maybe<boolean>, flexibleCancelation?: Maybe<boolean>, isProfessionalOperator?: Maybe<boolean>, abilityToProvideMedicalCare?: Maybe<boolean> }> }>>> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage }> };

export type SearchAdsQueryVariables = Exact<{
  input: SearchAdsInput;
}>;


export type SearchAdsQuery = { __typename: 'Query', searchAds?: Maybe<{ __typename: 'BookingAds', bookingAds?: Maybe<Array<Maybe<{ __typename: 'BookingAd', id: string, updatedAt?: Maybe<Date>, animalsSpeciesIds: Array<string>, startDate?: Maybe<Date>, endDate?: Maybe<Date>, serviceOptionId: string, description?: Maybe<string>, location?: Maybe<{ __typename: 'Location', latitude: number, longitude: any }> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type CurrentOperatorBidsQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentOperatorBidsQuery = { __typename: 'Query', currentOperatorBids?: Maybe<{ __typename: 'BookingAdBids', bids?: Maybe<Array<Maybe<{ __typename: 'BookingAdBid', bookingAd?: Maybe<{ __typename: 'BookingAd', id: string, updatedAt?: Maybe<Date>, animalsSpeciesIds: Array<string>, startDate?: Maybe<Date>, endDate?: Maybe<Date>, serviceOptionId: string, description?: Maybe<string>, location?: Maybe<{ __typename: 'Location', latitude: number, longitude: any }> }> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type CreateBookingMutationVariables = Exact<{
  input: CreateBookingInput;
}>;


export type CreateBookingMutation = { __typename: 'Mutation', createBooking?: Maybe<{ __typename: 'Booking', id: string, startDate?: Maybe<Date>, endDate?: Maybe<Date>, status?: Maybe<BookingStatus>, ownerConfirmationDate?: Maybe<Date>, operatorConfirmationDate?: Maybe<Date>, selectedOptions?: Maybe<string>, animals?: Maybe<Array<Maybe<{ __typename: 'BookingAnimal', specieOptionId: string }>>>, messages?: Maybe<Array<Maybe<{ __typename: 'OperatorBookingMessage' } | { __typename: 'StaffBookingMessage' } | { __typename: 'UserBookingMessage', id: string }>>> } | { __typename: 'CannotBookHimSelfError', cannotBookHimSelfError?: Maybe<string> } | { __typename: 'ExistingBookingError', existingBookingError?: Maybe<string> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'NotSupportedExtraServiceError', notSupportedExtraServiceError?: Maybe<string> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

export type ConfirmBookingMutationVariables = Exact<{
  input: ConfirmBookingInput;
}>;


export type ConfirmBookingMutation = { __typename: 'Mutation', confirmBooking?: Maybe<{ __typename: 'Booking', id: string, ownerConfirmationDate?: Maybe<Date>, operatorConfirmationDate?: Maybe<Date> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

export type CancelBookingMutationVariables = Exact<{
  input: CancelBookingInput;
}>;


export type CancelBookingMutation = { __typename: 'Mutation', cancelBooking?: Maybe<{ __typename: 'Booking', id: string, ownerConfirmationDate?: Maybe<Date>, operatorConfirmationDate?: Maybe<Date> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

export type CancelOnGoingBookingMutationVariables = Exact<{
  input: CancelOnGoingBookingInput;
}>;


export type CancelOnGoingBookingMutation = { __typename: 'Mutation', cancelOnGoingBooking?: Maybe<{ __typename: 'Booking', id: string, ownerConfirmationDate?: Maybe<Date>, operatorConfirmationDate?: Maybe<Date> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

export type AuthorizePaymentMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type AuthorizePaymentMutation = { __typename: 'Mutation', authorizePayment?: Maybe<{ __typename: 'AuthorizedPayment', clientSecret?: Maybe<string>, stripeTargetApi?: Maybe<string>, hadRef?: Maybe<boolean> } | { __typename: 'InvalidOperatorError', invalidOperatorError?: Maybe<string> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'OperatorCannotProcessPaymentsError', operatorCannotProcessPaymentsError?: Maybe<string> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

export type UpdateBookingPaymentStatusMutationVariables = Exact<{
  input: UpdateBookingPaymentStatusInput;
}>;


export type UpdateBookingPaymentStatusMutation = { __typename: 'Mutation', updateBookingPaymentStatus?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'PaymentProcessorError', paymentProcessorError?: Maybe<string> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

export type GetCurrentUserAndOperatorBookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCurrentUserAndOperatorBookingsQuery = { __typename: 'Query', currentUserAndOperatorBookings?: Maybe<{ __typename: 'BookingsList', bookings?: Maybe<Array<Maybe<{ __typename: 'Booking', id: string }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type BookingByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type BookingByIdQuery = { __typename: 'Query', bookingById?: Maybe<{ __typename: 'Booking', id: string, updatedAt?: Maybe<Date>, status?: Maybe<BookingStatus>, startDate?: Maybe<Date>, endDate?: Maybe<Date>, priceWithOutApplicationFee?: Maybe<number>, applicationFeeAmount?: Maybe<number>, selectedOptions?: Maybe<string>, ownerConfirmationDate?: Maybe<Date>, operatorConfirmationDate?: Maybe<Date>, canceled?: Maybe<boolean>, canceledBy?: Maybe<string>, underReview?: Maybe<boolean>, service?: Maybe<{ __typename: 'ServiceOption', nameFr: string, nameEn: string }>, operator?: Maybe<{ __typename: 'IndividualOperator', id: string, averageScore?: Maybe<number>, averageResponseTime?: Maybe<Date>, partnerId?: Maybe<string>, partnerPercentage?: Maybe<number>, account?: Maybe<{ __typename: 'Account', user?: Maybe<{ __typename: 'User', firstName: string }> }>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>, location?: Maybe<{ __typename: 'Location', city?: Maybe<string> }>, coreServices?: Maybe<Array<Maybe<{ __typename: 'IndividualOperatorCoreService', price: number, serviceOptionId: string }>>>, extraServices?: Maybe<{ __typename: 'IndividualOperatorExtraService', atHomeExclusivity?: Maybe<boolean>, atHomeExclusivityExtraPrice?: Maybe<number>, atHomeContinuously?: Maybe<boolean>, atHomeContinuouslyExtraPrice?: Maybe<number>, atHomeOnlyBringPet?: Maybe<boolean>, atHomeOnlyBringPetExtraPrice?: Maybe<number>, atHomeComeGetPet?: Maybe<boolean>, atHomeComeGetPetExtraPrice?: Maybe<number>, atOwnerHomePlantsCare?: Maybe<boolean>, atOwnerHomePlantsCareExtraPrice?: Maybe<number>, atOwnerHomeMail?: Maybe<boolean>, atOwnerHomeMailExtraPrice?: Maybe<number>, atOwnerHomeCurtains?: Maybe<boolean>, atOwnerHomeCurtainsExtraPrice?: Maybe<number> }> }>, user?: Maybe<{ __typename: 'User', id: string, firstName: string, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }> }>, reviews?: Maybe<Array<Maybe<{ __typename: 'OperatorReview', id: string, score: number, title: string, body?: Maybe<string> } | { __typename: 'UserReview', id: string, score: number, title: string, body?: Maybe<string> }>>>, animals?: Maybe<Array<Maybe<{ __typename: 'BookingAnimal', specie?: Maybe<{ __typename: 'SpecieOption', nameFr: string, nameEn: string }> }>>> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage }> };

export type CurrentUserOwnerBookingsQueryVariables = Exact<{
  input: CurrentUserBookingFilterInput;
}>;


export type CurrentUserOwnerBookingsQuery = { __typename: 'Query', currentUserOwnerBookings?: Maybe<{ __typename: 'BookingsList', bookings?: Maybe<Array<Maybe<{ __typename: 'Booking', id: string, updatedAt?: Maybe<Date>, status?: Maybe<BookingStatus>, startDate?: Maybe<Date>, endDate?: Maybe<Date>, priceWithOutApplicationFee?: Maybe<number>, applicationFeeAmount?: Maybe<number>, selectedOptions?: Maybe<string>, service?: Maybe<{ __typename: 'ServiceOption', nameFr: string, nameEn: string }>, messages?: Maybe<Array<Maybe<{ __typename: 'OperatorBookingMessage', operatorId: string, readAt?: Maybe<Date> } | { __typename: 'StaffBookingMessage' } | { __typename: 'UserBookingMessage', userId: string, readAt?: Maybe<Date> }>>>, operator?: Maybe<{ __typename: 'IndividualOperator', id: string, partnerId?: Maybe<string>, partnerPercentage?: Maybe<number>, averageScore?: Maybe<number>, account?: Maybe<{ __typename: 'Account', user?: Maybe<{ __typename: 'User', firstName: string }> }>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>, location?: Maybe<{ __typename: 'Location', city?: Maybe<string> }>, coreServices?: Maybe<Array<Maybe<{ __typename: 'IndividualOperatorCoreService', serviceOptionId: string, price: number }>>>, extraServices?: Maybe<{ __typename: 'IndividualOperatorExtraService', atHomeExclusivity?: Maybe<boolean>, atHomeExclusivityExtraPrice?: Maybe<number>, atHomeContinuously?: Maybe<boolean>, atHomeContinuouslyExtraPrice?: Maybe<number>, atHomeOnlyBringPet?: Maybe<boolean>, atHomeOnlyBringPetExtraPrice?: Maybe<number>, atHomeComeGetPet?: Maybe<boolean>, atHomeComeGetPetExtraPrice?: Maybe<number>, atOwnerHomePlantsCare?: Maybe<boolean>, atOwnerHomePlantsCareExtraPrice?: Maybe<number>, atOwnerHomeMail?: Maybe<boolean>, atOwnerHomeMailExtraPrice?: Maybe<number>, atOwnerHomeCurtains?: Maybe<boolean>, atOwnerHomeCurtainsExtraPrice?: Maybe<number> }> }>, animals?: Maybe<Array<Maybe<{ __typename: 'BookingAnimal', specie?: Maybe<{ __typename: 'SpecieOption', nameFr: string, nameEn: string }> }>>> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError' }> };

export type CurrentUserOperatorBookingsQueryVariables = Exact<{
  input: CurrentUserBookingFilterInput;
}>;


export type CurrentUserOperatorBookingsQuery = { __typename: 'Query', currentUserOperatorBookings?: Maybe<{ __typename: 'BookingsList', bookings?: Maybe<Array<Maybe<{ __typename: 'Booking', id: string, updatedAt?: Maybe<Date>, status?: Maybe<BookingStatus>, startDate?: Maybe<Date>, endDate?: Maybe<Date>, priceWithOutApplicationFee?: Maybe<number>, applicationFeeAmount?: Maybe<number>, selectedOptions?: Maybe<string>, service?: Maybe<{ __typename: 'ServiceOption', nameFr: string, nameEn: string }>, messages?: Maybe<Array<Maybe<{ __typename: 'OperatorBookingMessage', operatorId: string, readAt?: Maybe<Date> } | { __typename: 'StaffBookingMessage' } | { __typename: 'UserBookingMessage', userId: string, readAt?: Maybe<Date> }>>>, user?: Maybe<{ __typename: 'User', id: string, firstName: string, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }> }>, operator?: Maybe<{ __typename: 'IndividualOperator', id: string, partnerId?: Maybe<string>, partnerPercentage?: Maybe<number>, coreServices?: Maybe<Array<Maybe<{ __typename: 'IndividualOperatorCoreService', price: number, serviceOptionId: string }>>>, extraServices?: Maybe<{ __typename: 'IndividualOperatorExtraService', atHomeExclusivity?: Maybe<boolean>, atHomeExclusivityExtraPrice?: Maybe<number>, atHomeContinuously?: Maybe<boolean>, atHomeContinuouslyExtraPrice?: Maybe<number>, atHomeOnlyBringPet?: Maybe<boolean>, atHomeOnlyBringPetExtraPrice?: Maybe<number>, atHomeComeGetPet?: Maybe<boolean>, atHomeComeGetPetExtraPrice?: Maybe<number>, atOwnerHomePlantsCare?: Maybe<boolean>, atOwnerHomePlantsCareExtraPrice?: Maybe<number>, atOwnerHomeMail?: Maybe<boolean>, atOwnerHomeMailExtraPrice?: Maybe<number>, atOwnerHomeCurtains?: Maybe<boolean>, atOwnerHomeCurtainsExtraPrice?: Maybe<number> }> }>, animals?: Maybe<Array<Maybe<{ __typename: 'BookingAnimal', specie?: Maybe<{ __typename: 'SpecieOption', nameFr: string, nameEn: string }> }>>> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type BookingsQueryVariables = Exact<{ [key: string]: never; }>;


export type BookingsQuery = { __typename: 'Query', bookings?: Maybe<{ __typename: 'BookingsList', bookings?: Maybe<Array<Maybe<{ __typename: 'Booking', id: string, updatedAt?: Maybe<Date>, status?: Maybe<BookingStatus>, priceWithOutApplicationFee?: Maybe<number>, applicationFeeAmount?: Maybe<number> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type BookingsWithPaymentStatusQueryVariables = Exact<{
  input: BookingWithPaymentStatusInput;
}>;


export type BookingsWithPaymentStatusQuery = { __typename: 'Query', bookingsWithPaymentStatus?: Maybe<{ __typename: 'BookingsList', bookings?: Maybe<Array<Maybe<{ __typename: 'Booking', id: string, updatedAt?: Maybe<Date>, priceWithOutApplicationFee?: Maybe<number>, applicationFeeAmount?: Maybe<number>, underReview?: Maybe<boolean>, payment?: Maybe<{ __typename: 'StripePayment', status: PaymentStatus, expectedPaymentIntentCaptureDate?: Maybe<Date> }> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type SubscribeToBookingMessagesSubscriptionVariables = Exact<{
  bookingId: Scalars['ID'];
}>;


export type SubscribeToBookingMessagesSubscription = { __typename: 'Subscription', bookingByIdChatSub?: Maybe<{ __typename: 'OperatorBookingMessage', id: string, operatorId: string, readAt?: Maybe<Date>, content: string } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserBookingMessage', id: string, userId: string, readAt?: Maybe<Date>, content: string } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type SubscribeToUserBookingsMessagesChangesSubscriptionVariables = Exact<{
  bookingsIds?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
  authorId?: Maybe<Scalars['ID']>;
}>;


export type SubscribeToUserBookingsMessagesChangesSubscription = { __typename: 'Subscription', userBookingsMessagesChangesSub?: Maybe<{ __typename: 'OperatorBookingMessage', id: string, bookingId: string, operatorId: string, readAt?: Maybe<Date>, content: string, operator?: Maybe<{ __typename: 'IndividualOperator', avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>, account?: Maybe<{ __typename: 'Account', user?: Maybe<{ __typename: 'User', firstName: string, lastName?: Maybe<string> }> }> }> } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserBookingMessage', id: string, bookingId: string, userId: string, readAt?: Maybe<Date>, content: string, user?: Maybe<{ __typename: 'User', firstName: string, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }> }> } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type SubscribeToUserBookingsStatusChangesSubscriptionVariables = Exact<{
  bookingsIds?: Maybe<Array<Scalars['ID']> | Scalars['ID']>;
}>;


export type SubscribeToUserBookingsStatusChangesSubscription = { __typename: 'Subscription', userBookingsStatusChangesSub?: Maybe<{ __typename: 'Booking', id: string, status?: Maybe<BookingStatus>, startDate?: Maybe<Date>, endDate?: Maybe<Date>, user?: Maybe<{ __typename: 'User', id: string, firstName: string, lastName?: Maybe<string> }>, operator?: Maybe<{ __typename: 'IndividualOperator', id: string, account?: Maybe<{ __typename: 'Account', user?: Maybe<{ __typename: 'User', firstName: string, lastName?: Maybe<string> }> }>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }> }> } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type SubscribeToNewlyCreatedBookingsAsSitterSubscriptionVariables = Exact<{
  sitterId?: Maybe<Scalars['ID']>;
}>;


export type SubscribeToNewlyCreatedBookingsAsSitterSubscription = { __typename: 'Subscription', newlyCreatedBookingsAsSitterSub?: Maybe<{ __typename: 'Booking', id: string, startDate?: Maybe<Date>, endDate?: Maybe<Date>, priceWithOutApplicationFee?: Maybe<number> } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type CreateBookingClaimMutationVariables = Exact<{
  input: CreateBookingClaimInput;
}>;


export type CreateBookingClaimMutation = { __typename: 'Mutation', createBookingClaim?: Maybe<{ __typename: 'Claim', id: string, reason: string } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

export type GetBookingClaimsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBookingClaimsQuery = { __typename: 'Query', claims?: Maybe<{ __typename: 'ClaimsList', claims?: Maybe<Array<Maybe<{ __typename: 'Claim', id: string, reason: string, user?: Maybe<{ __typename: 'User', firstName: string, lastName?: Maybe<string>, account?: Maybe<{ __typename: 'Account', email?: Maybe<string> }>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }> }>, operator?: Maybe<{ __typename: 'IndividualOperator', averageScore?: Maybe<number>, location?: Maybe<{ __typename: 'Location', address?: Maybe<string>, city?: Maybe<string> }>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>, account?: Maybe<{ __typename: 'Account', email?: Maybe<string>, user?: Maybe<{ __typename: 'User', firstName: string, lastName?: Maybe<string> }> }> }>, booking?: Maybe<{ __typename: 'Booking', id: string, startDate?: Maybe<Date>, endDate?: Maybe<Date>, animalsIds?: Maybe<Array<Maybe<string>>>, priceWithOutApplicationFee?: Maybe<number>, applicationFeeAmount?: Maybe<number>, service?: Maybe<{ __typename: 'ServiceOption', nameFr: string, nameEn: string }> }> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type GetBookingClaimByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetBookingClaimByIdQuery = { __typename: 'Query', claimById?: Maybe<{ __typename: 'Claim', id: string, reason: string, user?: Maybe<{ __typename: 'User', firstName: string, lastName?: Maybe<string>, account?: Maybe<{ __typename: 'Account', email?: Maybe<string> }>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }> }>, operator?: Maybe<{ __typename: 'IndividualOperator', averageScore?: Maybe<number>, location?: Maybe<{ __typename: 'Location', address?: Maybe<string>, city?: Maybe<string> }>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>, account?: Maybe<{ __typename: 'Account', email?: Maybe<string>, user?: Maybe<{ __typename: 'User', firstName: string, lastName?: Maybe<string> }> }> }>, booking?: Maybe<{ __typename: 'Booking', id: string, startDate?: Maybe<Date>, endDate?: Maybe<Date>, animalsIds?: Maybe<Array<Maybe<string>>>, priceWithOutApplicationFee?: Maybe<number>, applicationFeeAmount?: Maybe<number>, service?: Maybe<{ __typename: 'ServiceOption', nameFr: string, nameEn: string }>, messages?: Maybe<Array<Maybe<{ __typename: 'OperatorBookingMessage', operatorId: string, id: string, content: string, readAt?: Maybe<Date> } | { __typename: 'StaffBookingMessage', id: string, content: string, readAt?: Maybe<Date> } | { __typename: 'UserBookingMessage', userId: string, id: string, content: string, readAt?: Maybe<Date> }>>> }> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type CurrentOperatorDonationsQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentOperatorDonationsQuery = { __typename: 'Query', currentOperatorDonations?: Maybe<{ __typename: 'DonationsList', donations?: Maybe<Array<Maybe<{ __typename: 'Donation', id: string, amountToDonate?: Maybe<number>, donationDate?: Maybe<Date>, partnerId: string, booking?: Maybe<{ __typename: 'Booking', status?: Maybe<BookingStatus> }> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type SearchDonationsQueryVariables = Exact<{
  input: SearchDonationsInput;
}>;


export type SearchDonationsQuery = { __typename: 'Query', searchDonations?: Maybe<{ __typename: 'DonationsList', donations?: Maybe<Array<Maybe<{ __typename: 'Donation', id: string, amountToDonate?: Maybe<number>, donationDate?: Maybe<Date>, partnerId: string, createdAt?: Maybe<Date>, updatedAt?: Maybe<Date>, booking?: Maybe<{ __typename: 'Booking', status?: Maybe<BookingStatus> }>, partner?: Maybe<{ __typename: 'Partner', name: string }> }>>> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type CreateDonationReceiptMutationVariables = Exact<{
  input: CreateDonationReceiptInput;
}>;


export type CreateDonationReceiptMutation = { __typename: 'Mutation', createDonationReceipt?: Maybe<{ __typename: 'DonationReceipt', id: string, amountDonated?: Maybe<number>, createdAt?: Maybe<Date>, updatedAt?: Maybe<Date>, donations?: Maybe<Array<Maybe<{ __typename: 'Donation', id: string }>>>, files?: Maybe<Array<Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>>>, partner?: Maybe<{ __typename: 'Partner', name: string, medias?: Maybe<Array<Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>>> }> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type SearchDonationReceiptsQueryVariables = Exact<{
  input: SearchDonationReceiptsInput;
}>;


export type SearchDonationReceiptsQuery = { __typename: 'Query', searchDonationReceipts?: Maybe<{ __typename: 'DonationReceiptsList', donationReceipts?: Maybe<Array<Maybe<{ __typename: 'DonationReceipt', id: string, amountDonated?: Maybe<number>, createdAt?: Maybe<Date>, updatedAt?: Maybe<Date>, files?: Maybe<Array<Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>>>, partner?: Maybe<{ __typename: 'Partner', name: string, medias?: Maybe<Array<Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>>> }>, donations?: Maybe<Array<Maybe<{ __typename: 'Donation', id: string }>>> }>>> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type InvalidArgumentsFieldsFragment = { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> };

export type NotFoundFieldsFragment = { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage };

export type UnableToProcessFieldsFragment = { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage };

export type UserAuthFieldsFragment = { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage };

export type UserForbiddenFieldsFragment = { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage };

export type CreateGenderOptionMutationVariables = Exact<{
  input: CreateGenderOptionInput;
}>;


export type CreateGenderOptionMutation = { __typename: 'Mutation', createGenderOption?: Maybe<{ __typename: 'GenderOption', id: string, nameFr: string, nameEn: string } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type UpdateGenderOptionMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateGenderOptionInput;
}>;


export type UpdateGenderOptionMutation = { __typename: 'Mutation', updateGenderOption?: Maybe<{ __typename: 'GenderOption', id: string, nameFr: string, nameEn: string } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type DeleteGenderOptionMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteGenderOptionMutation = { __typename: 'Mutation', deleteGenderOption?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type GetGendersOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGendersOptionsQuery = { __typename: 'Query', gendersOptions?: Maybe<{ __typename: 'GenderOptionsList', genderOptions?: Maybe<Array<Maybe<{ __typename: 'GenderOption', id: string, nameFr: string, nameEn: string }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type CreateHostingOptionMutationVariables = Exact<{
  input: CreateHostingOptionInput;
}>;


export type CreateHostingOptionMutation = { __typename: 'Mutation', createHostingOption?: Maybe<{ __typename: 'HostingOption', id: string, nameFr: string, nameEn: string } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type UpdateHostingOptionMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateHostingOptionInput;
}>;


export type UpdateHostingOptionMutation = { __typename: 'Mutation', updateHostingOption?: Maybe<{ __typename: 'HostingOption', id: string, nameFr: string, nameEn: string } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type DeleteHostingOptionMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteHostingOptionMutation = { __typename: 'Mutation', deleteHostingOption?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type GetHostingsOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHostingsOptionsQuery = { __typename: 'Query', hostingsOptions?: Maybe<{ __typename: 'HostingOptionsList', hostingOptions?: Maybe<Array<Maybe<{ __typename: 'HostingOption', id: string, nameFr: string, nameEn: string }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type CreateLanguageOptionMutationVariables = Exact<{
  input: CreateLanguageOptionInput;
}>;


export type CreateLanguageOptionMutation = { __typename: 'Mutation', createLanguageOption?: Maybe<{ __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'LanguageOption', id: string, nameFr: string, nameEn: string } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type UpdateLanguageOptionMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateLanguageOptionInput;
}>;


export type UpdateLanguageOptionMutation = { __typename: 'Mutation', updateLanguageOption?: Maybe<{ __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'LanguageOption', id: string, nameFr: string, nameEn: string } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type DeleteLanguageOptionMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteLanguageOptionMutation = { __typename: 'Mutation', deleteLanguageOption?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type GetLanguagesOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLanguagesOptionsQuery = { __typename: 'Query', languagesOptions?: Maybe<{ __typename: 'LanguageOptionsList', languageOptions?: Maybe<Array<Maybe<{ __typename: 'LanguageOption', id: string, nameFr: string, nameEn: string }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type LocationSearchQueryVariables = Exact<{
  query: Scalars['String'];
  locale: Scalars['String'];
}>;


export type LocationSearchQuery = { __typename: 'Query', locationSearch?: Maybe<{ __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'LocationsList', locations?: Maybe<Array<Maybe<{ __typename: 'LocationSearchInfos', id?: Maybe<string>, formattedLocationString?: Maybe<string>, locale_names?: Maybe<string>, postcode?: Maybe<string>, city?: Maybe<string>, country?: Maybe<string>, country_code?: Maybe<string>, latitude?: Maybe<number>, longitude?: Maybe<any> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type CreateMediaMutationVariables = Exact<{
  input: CreateMediaInput;
}>;


export type CreateMediaMutation = { __typename: 'Mutation', createMedia?: Maybe<{ __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'StorageInfos', signedRequest?: Maybe<string>, url?: Maybe<string>, mediaId: string } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

export type SetMediaAsAvatarMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type SetMediaAsAvatarMutation = { __typename: 'Mutation', setMediaAsAvatar?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type DeleteMediaMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteMediaMutation = { __typename: 'Mutation', deleteMedia?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'IsActiveOperatorMainMediaError', activeOperatorMainMediaError: string } | { __typename: 'IsActiveOperatorWithNoReplacementMediaError', activeOperatorWithNoReplacementMediaError: string } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

type MessageFields_OperatorBookingMessage_Fragment = { __typename: 'OperatorBookingMessage', id: string, updatedAt?: Maybe<Date>, readAt?: Maybe<Date> };

type MessageFields_StaffBookingMessage_Fragment = { __typename: 'StaffBookingMessage', id: string, updatedAt?: Maybe<Date>, readAt?: Maybe<Date> };

type MessageFields_UserBookingMessage_Fragment = { __typename: 'UserBookingMessage', id: string, updatedAt?: Maybe<Date>, readAt?: Maybe<Date> };

export type MessageFieldsFragment = MessageFields_OperatorBookingMessage_Fragment | MessageFields_StaffBookingMessage_Fragment | MessageFields_UserBookingMessage_Fragment;

export type CreateMessageMutationVariables = Exact<{
  input: CreateMessageInput;
}>;


export type CreateMessageMutation = { __typename: 'Mutation', createMessage?: Maybe<{ __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'OperatorBookingMessage', id: string, updatedAt?: Maybe<Date>, readAt?: Maybe<Date> } | { __typename: 'StaffBookingMessage', id: string, updatedAt?: Maybe<Date>, readAt?: Maybe<Date> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserBookingMessage', id: string, updatedAt?: Maybe<Date>, readAt?: Maybe<Date> }> };

export type UpdateMessageMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateMessageInput;
}>;


export type UpdateMessageMutation = { __typename: 'Mutation', updateMessage?: Maybe<{ __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'OperatorBookingMessage', id: string, updatedAt?: Maybe<Date>, readAt?: Maybe<Date> } | { __typename: 'StaffBookingMessage', id: string, updatedAt?: Maybe<Date>, readAt?: Maybe<Date> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserBookingMessage', id: string, updatedAt?: Maybe<Date>, readAt?: Maybe<Date> }> };

export type SetAsReadMutationVariables = Exact<{
  input: SetMessagesAsReadInput;
}>;


export type SetAsReadMutation = { __typename: 'Mutation', setAsRead?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError' } | { __typename: 'UnableToProcessError' } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

export type MessagesByBookingIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type MessagesByBookingIdQuery = { __typename: 'Query', messagesByBookingId?: Maybe<{ __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'MessagesList', messages?: Maybe<Array<Maybe<{ __typename: 'OperatorBookingMessage', content: string, id: string, updatedAt?: Maybe<Date>, readAt?: Maybe<Date> } | { __typename: 'StaffBookingMessage', content: string, id: string, updatedAt?: Maybe<Date>, readAt?: Maybe<Date> } | { __typename: 'UserBookingMessage', content: string, id: string, updatedAt?: Maybe<Date>, readAt?: Maybe<Date> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type CreateIndividualOperatorMutationVariables = Exact<{
  input: CreateIndividualOperatorInput;
}>;


export type CreateIndividualOperatorMutation = { __typename: 'Mutation', createIndividualOperator?: Maybe<{ __typename: 'IndividualOperator', id: string, description?: Maybe<string>, birthDate?: Maybe<Date>, genderOptionId?: Maybe<string>, hostingOptionId?: Maybe<string>, languageOptionIds?: Maybe<Array<Maybe<string>>>, acceptedSpecieOptionsIds?: Maybe<Array<Maybe<string>>>, ownAnimalsSpecieOptionsIds?: Maybe<Array<Maybe<string>>>, partnerId?: Maybe<string>, partnerPercentage?: Maybe<number>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>, account?: Maybe<{ __typename: 'Account', user?: Maybe<{ __typename: 'User', firstName: string, lastName?: Maybe<string> }> }>, location?: Maybe<{ __typename: 'Location', address?: Maybe<string>, city?: Maybe<string>, country?: Maybe<string>, country_code?: Maybe<string>, postcode?: Maybe<string>, latitude: number, longitude: any }>, availabilities?: Maybe<Array<Maybe<{ __typename: 'OperatorAvailability', id: string, date?: Maybe<Date> }>>>, coreServices?: Maybe<Array<Maybe<{ __typename: 'IndividualOperatorCoreService', serviceOptionId: string, price: number }>>>, extraServices?: Maybe<{ __typename: 'IndividualOperatorExtraService', atHomeExclusivity?: Maybe<boolean>, atHomeExclusivityExtraPrice?: Maybe<number>, atHomeContinuously?: Maybe<boolean>, atHomeContinuouslyExtraPrice?: Maybe<number>, atHomeOnlyBringPet?: Maybe<boolean>, atHomeOnlyBringPetExtraPrice?: Maybe<number>, atHomeComeGetPet?: Maybe<boolean>, atHomeComeGetPetExtraPrice?: Maybe<number>, atOwnerHomePlantsCare?: Maybe<boolean>, atOwnerHomePlantsCareExtraPrice?: Maybe<number>, atOwnerHomeMail?: Maybe<boolean>, atOwnerHomeMailExtraPrice?: Maybe<number>, atOwnerHomeCurtains?: Maybe<boolean>, atOwnerHomeCurtainsExtraPrice?: Maybe<number>, acceptShortNotice?: Maybe<boolean>, flexibleCancelation?: Maybe<boolean>, isProfessionalOperator?: Maybe<boolean>, abilityToProvideMedicalCare?: Maybe<boolean> }> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage }> };

export type UpdateIndividualOperatorMutationVariables = Exact<{
  input: UpdateIndividualOperatorInput;
}>;


export type UpdateIndividualOperatorMutation = { __typename: 'Mutation', updateIndividualOperator?: Maybe<{ __typename: 'IndividualOperator', id: string, description?: Maybe<string>, birthDate?: Maybe<Date>, genderOptionId?: Maybe<string>, hostingOptionId?: Maybe<string>, languageOptionIds?: Maybe<Array<Maybe<string>>>, acceptedSpecieOptionsIds?: Maybe<Array<Maybe<string>>>, ownAnimalsSpecieOptionsIds?: Maybe<Array<Maybe<string>>>, partnerId?: Maybe<string>, partnerPercentage?: Maybe<number>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>, account?: Maybe<{ __typename: 'Account', user?: Maybe<{ __typename: 'User', firstName: string, lastName?: Maybe<string> }> }>, location?: Maybe<{ __typename: 'Location', address?: Maybe<string>, city?: Maybe<string>, country?: Maybe<string>, country_code?: Maybe<string>, postcode?: Maybe<string>, latitude: number, longitude: any }>, availabilities?: Maybe<Array<Maybe<{ __typename: 'OperatorAvailability', id: string, date?: Maybe<Date> }>>>, coreServices?: Maybe<Array<Maybe<{ __typename: 'IndividualOperatorCoreService', serviceOptionId: string, price: number }>>>, extraServices?: Maybe<{ __typename: 'IndividualOperatorExtraService', atHomeExclusivity?: Maybe<boolean>, atHomeExclusivityExtraPrice?: Maybe<number>, atHomeContinuously?: Maybe<boolean>, atHomeContinuouslyExtraPrice?: Maybe<number>, atHomeOnlyBringPet?: Maybe<boolean>, atHomeOnlyBringPetExtraPrice?: Maybe<number>, atHomeComeGetPet?: Maybe<boolean>, atHomeComeGetPetExtraPrice?: Maybe<number>, atOwnerHomePlantsCare?: Maybe<boolean>, atOwnerHomePlantsCareExtraPrice?: Maybe<number>, atOwnerHomeMail?: Maybe<boolean>, atOwnerHomeMailExtraPrice?: Maybe<number>, atOwnerHomeCurtains?: Maybe<boolean>, atOwnerHomeCurtainsExtraPrice?: Maybe<number>, acceptShortNotice?: Maybe<boolean>, flexibleCancelation?: Maybe<boolean>, isProfessionalOperator?: Maybe<boolean>, abilityToProvideMedicalCare?: Maybe<boolean> }> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type CurrentOperatorQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentOperatorQuery = { __typename: 'Query', currentOperator?: Maybe<{ __typename: 'IndividualOperator', id: string, description?: Maybe<string>, birthDate?: Maybe<Date>, genderOptionId?: Maybe<string>, hostingOptionId?: Maybe<string>, languageOptionIds?: Maybe<Array<Maybe<string>>>, acceptedSpecieOptionsIds?: Maybe<Array<Maybe<string>>>, ownAnimalsSpecieOptionsIds?: Maybe<Array<Maybe<string>>>, partnerId?: Maybe<string>, partnerPercentage?: Maybe<number>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>, account?: Maybe<{ __typename: 'Account', user?: Maybe<{ __typename: 'User', firstName: string, lastName?: Maybe<string> }> }>, location?: Maybe<{ __typename: 'Location', address?: Maybe<string>, city?: Maybe<string>, country?: Maybe<string>, country_code?: Maybe<string>, postcode?: Maybe<string>, latitude: number, longitude: any }>, availabilities?: Maybe<Array<Maybe<{ __typename: 'OperatorAvailability', id: string, date?: Maybe<Date> }>>>, coreServices?: Maybe<Array<Maybe<{ __typename: 'IndividualOperatorCoreService', serviceOptionId: string, price: number }>>>, extraServices?: Maybe<{ __typename: 'IndividualOperatorExtraService', atHomeExclusivity?: Maybe<boolean>, atHomeExclusivityExtraPrice?: Maybe<number>, atHomeContinuously?: Maybe<boolean>, atHomeContinuouslyExtraPrice?: Maybe<number>, atHomeOnlyBringPet?: Maybe<boolean>, atHomeOnlyBringPetExtraPrice?: Maybe<number>, atHomeComeGetPet?: Maybe<boolean>, atHomeComeGetPetExtraPrice?: Maybe<number>, atOwnerHomePlantsCare?: Maybe<boolean>, atOwnerHomePlantsCareExtraPrice?: Maybe<number>, atOwnerHomeMail?: Maybe<boolean>, atOwnerHomeMailExtraPrice?: Maybe<number>, atOwnerHomeCurtains?: Maybe<boolean>, atOwnerHomeCurtainsExtraPrice?: Maybe<number>, acceptShortNotice?: Maybe<boolean>, flexibleCancelation?: Maybe<boolean>, isProfessionalOperator?: Maybe<boolean>, abilityToProvideMedicalCare?: Maybe<boolean> }> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type OperatorByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OperatorByIdQuery = { __typename: 'Query', operatorById?: Maybe<{ __typename: 'IndividualOperator', id: string, description?: Maybe<string>, genderOptionId?: Maybe<string>, hostingOptionId?: Maybe<string>, languageOptionIds?: Maybe<Array<Maybe<string>>>, acceptedSpecieOptionsIds?: Maybe<Array<Maybe<string>>>, ownAnimalsSpecieOptionsIds?: Maybe<Array<Maybe<string>>>, averageScore?: Maybe<number>, averageResponseTime?: Maybe<Date>, partnerId?: Maybe<string>, partnerPercentage?: Maybe<number>, account?: Maybe<{ __typename: 'Account', user?: Maybe<{ __typename: 'User', firstName: string }> }>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>, medias?: Maybe<Array<Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>>>, location?: Maybe<{ __typename: 'Location', city?: Maybe<string>, country?: Maybe<string>, latitude: number, longitude: any }>, coreServices?: Maybe<Array<Maybe<{ __typename: 'IndividualOperatorCoreService', serviceOptionId: string, price: number }>>>, extraServices?: Maybe<{ __typename: 'IndividualOperatorExtraService', atHomeExclusivity?: Maybe<boolean>, atHomeExclusivityExtraPrice?: Maybe<number>, atHomeContinuously?: Maybe<boolean>, atHomeContinuouslyExtraPrice?: Maybe<number>, atHomeOnlyBringPet?: Maybe<boolean>, atHomeOnlyBringPetExtraPrice?: Maybe<number>, atHomeComeGetPet?: Maybe<boolean>, atHomeComeGetPetExtraPrice?: Maybe<number>, atOwnerHomePlantsCare?: Maybe<boolean>, atOwnerHomePlantsCareExtraPrice?: Maybe<number>, atOwnerHomeMail?: Maybe<boolean>, atOwnerHomeMailExtraPrice?: Maybe<number>, atOwnerHomeCurtains?: Maybe<boolean>, atOwnerHomeCurtainsExtraPrice?: Maybe<number>, acceptShortNotice?: Maybe<boolean>, flexibleCancelation?: Maybe<boolean>, isProfessionalOperator?: Maybe<boolean>, abilityToProvideMedicalCare?: Maybe<boolean> }>, availabilities?: Maybe<Array<Maybe<{ __typename: 'OperatorAvailability', id: string, date?: Maybe<Date> }>>>, reviews?: Maybe<Array<Maybe<{ __typename: 'OperatorReview', id: string, createdAt?: Maybe<Date>, score: number, title: string, body?: Maybe<string> } | { __typename: 'UserReview', id: string, createdAt?: Maybe<Date>, score: number, title: string, body?: Maybe<string>, user?: Maybe<{ __typename: 'User', firstName: string, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }> }> }>>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage }> };

export type OperatorBookingInfosByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type OperatorBookingInfosByIdQuery = { __typename: 'Query', operatorById?: Maybe<{ __typename: 'IndividualOperator', id: string, hostingOptionId?: Maybe<string>, averageScore?: Maybe<number>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>, account?: Maybe<{ __typename: 'Account', user?: Maybe<{ __typename: 'User', firstName: string }> }>, location?: Maybe<{ __typename: 'Location', city?: Maybe<string>, postcode?: Maybe<string> }>, availabilities?: Maybe<Array<Maybe<{ __typename: 'OperatorAvailability', id: string, date?: Maybe<Date> }>>>, coreServices?: Maybe<Array<Maybe<{ __typename: 'IndividualOperatorCoreService', serviceOptionId: string, price: number }>>>, extraServices?: Maybe<{ __typename: 'IndividualOperatorExtraService', atHomeExclusivity?: Maybe<boolean>, atHomeExclusivityExtraPrice?: Maybe<number>, atHomeContinuously?: Maybe<boolean>, atHomeContinuouslyExtraPrice?: Maybe<number>, atHomeOnlyBringPet?: Maybe<boolean>, atHomeOnlyBringPetExtraPrice?: Maybe<number>, atHomeComeGetPet?: Maybe<boolean>, atHomeComeGetPetExtraPrice?: Maybe<number>, atOwnerHomePlantsCare?: Maybe<boolean>, atOwnerHomePlantsCareExtraPrice?: Maybe<number>, atOwnerHomeMail?: Maybe<boolean>, atOwnerHomeMailExtraPrice?: Maybe<number>, atOwnerHomeCurtains?: Maybe<boolean>, atOwnerHomeCurtainsExtraPrice?: Maybe<number>, acceptShortNotice?: Maybe<boolean>, flexibleCancelation?: Maybe<boolean>, isProfessionalOperator?: Maybe<boolean>, abilityToProvideMedicalCare?: Maybe<boolean> }> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage }> };

export type CurrentOperatorMediasQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentOperatorMediasQuery = { __typename: 'Query', currentOperator?: Maybe<{ __typename: 'IndividualOperator', avatar?: Maybe<{ __typename: 'DonationReceiptMedia', id: string, storeUrl: string } | { __typename: 'LanguageOptionMedia', id: string, storeUrl: string } | { __typename: 'MessageMedia', id: string, storeUrl: string } | { __typename: 'OperatorMedia', id: string, storeUrl: string } | { __typename: 'PartnerMedia', id: string, storeUrl: string } | { __typename: 'SharedMedia', id: string, storeUrl: string } | { __typename: 'UserMedia', id: string, storeUrl: string }>, medias?: Maybe<Array<Maybe<{ __typename: 'DonationReceiptMedia', id: string, storeUrl: string } | { __typename: 'LanguageOptionMedia', id: string, storeUrl: string } | { __typename: 'MessageMedia', id: string, storeUrl: string } | { __typename: 'OperatorMedia', id: string, storeUrl: string } | { __typename: 'PartnerMedia', id: string, storeUrl: string } | { __typename: 'SharedMedia', id: string, storeUrl: string } | { __typename: 'UserMedia', id: string, storeUrl: string }>>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type CurrentOperatorBookingInfosQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentOperatorBookingInfosQuery = { __typename: 'Query', currentOperator?: Maybe<{ __typename: 'IndividualOperator', acceptedSpecieOptionsIds?: Maybe<Array<Maybe<string>>>, ownAnimalsSpecieOptionsIds?: Maybe<Array<Maybe<string>>>, location?: Maybe<{ __typename: 'Location', latitude: number, longitude: any }>, availabilities?: Maybe<Array<Maybe<{ __typename: 'OperatorAvailability', id: string, date?: Maybe<Date> }>>>, coreServices?: Maybe<Array<Maybe<{ __typename: 'IndividualOperatorCoreService', serviceOptionId: string, price: number }>>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type SearchOperatorsQueryVariables = Exact<{
  input: SearchOperatorsInput;
}>;


export type SearchOperatorsQuery = { __typename: 'Query', searchOperators?: Maybe<{ __typename: 'Operators', operators?: Maybe<Array<Maybe<{ __typename: 'IndividualOperator', id: string, hostingOptionId?: Maybe<string>, genderOptionId?: Maybe<string>, languageOptionIds?: Maybe<Array<Maybe<string>>>, averageScore?: Maybe<number>, averageResponseTime?: Maybe<Date>, calendarUpdate?: Maybe<Date>, partnerId?: Maybe<string>, partnerPercentage?: Maybe<number>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }>, location?: Maybe<{ __typename: 'Location', city?: Maybe<string>, postcode?: Maybe<string>, latitude: number, longitude: any }>, coreServices?: Maybe<Array<Maybe<{ __typename: 'IndividualOperatorCoreService', serviceOptionId: string, price: number }>>>, extraServices?: Maybe<{ __typename: 'IndividualOperatorExtraService', atHomeExclusivity?: Maybe<boolean>, atHomeExclusivityExtraPrice?: Maybe<number>, atHomeContinuously?: Maybe<boolean>, atHomeContinuouslyExtraPrice?: Maybe<number>, atHomeOnlyBringPet?: Maybe<boolean>, atHomeOnlyBringPetExtraPrice?: Maybe<number>, atHomeComeGetPet?: Maybe<boolean>, atHomeComeGetPetExtraPrice?: Maybe<number>, atOwnerHomePlantsCare?: Maybe<boolean>, atOwnerHomePlantsCareExtraPrice?: Maybe<number>, atOwnerHomeMail?: Maybe<boolean>, atOwnerHomeMailExtraPrice?: Maybe<number>, atOwnerHomeCurtains?: Maybe<boolean>, atOwnerHomeCurtainsExtraPrice?: Maybe<number>, acceptShortNotice?: Maybe<boolean>, flexibleCancelation?: Maybe<boolean>, isProfessionalOperator?: Maybe<boolean>, abilityToProvideMedicalCare?: Maybe<boolean> }> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type AllOperatorsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllOperatorsQuery = { __typename: 'Query', allOperators?: Maybe<{ __typename: 'Operators', operators?: Maybe<Array<Maybe<{ __typename: 'IndividualOperator', id: string, updatedAt?: Maybe<Date> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type CreatePartnerMutationVariables = Exact<{
  input: CreatePartnerInput;
}>;


export type CreatePartnerMutation = { __typename: 'Mutation', createPartner?: Maybe<{ __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'Partner', id: string, name: string, description: string, websiteUrl: string, medias?: Maybe<Array<Maybe<{ __typename: 'DonationReceiptMedia', id: string, storeUrl: string } | { __typename: 'LanguageOptionMedia', id: string, storeUrl: string } | { __typename: 'MessageMedia', id: string, storeUrl: string } | { __typename: 'OperatorMedia', id: string, storeUrl: string } | { __typename: 'PartnerMedia', id: string, storeUrl: string } | { __typename: 'SharedMedia', id: string, storeUrl: string } | { __typename: 'UserMedia', id: string, storeUrl: string }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type UpdatePartnerMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdatePartnerInput;
}>;


export type UpdatePartnerMutation = { __typename: 'Mutation', updatePartner?: Maybe<{ __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'Partner', id: string, name: string, description: string, websiteUrl: string, medias?: Maybe<Array<Maybe<{ __typename: 'DonationReceiptMedia', id: string, storeUrl: string } | { __typename: 'LanguageOptionMedia', id: string, storeUrl: string } | { __typename: 'MessageMedia', id: string, storeUrl: string } | { __typename: 'OperatorMedia', id: string, storeUrl: string } | { __typename: 'PartnerMedia', id: string, storeUrl: string } | { __typename: 'SharedMedia', id: string, storeUrl: string } | { __typename: 'UserMedia', id: string, storeUrl: string }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type DeletePartnerMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeletePartnerMutation = { __typename: 'Mutation', deletePartner?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type GetPartnersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPartnersQuery = { __typename: 'Query', partners?: Maybe<{ __typename: 'PartnersList', partners?: Maybe<Array<Maybe<{ __typename: 'Partner', id: string, name: string, description: string, websiteUrl: string, medias?: Maybe<Array<Maybe<{ __typename: 'DonationReceiptMedia', id: string, storeUrl: string } | { __typename: 'LanguageOptionMedia', id: string, storeUrl: string } | { __typename: 'MessageMedia', id: string, storeUrl: string } | { __typename: 'OperatorMedia', id: string, storeUrl: string } | { __typename: 'PartnerMedia', id: string, storeUrl: string } | { __typename: 'SharedMedia', id: string, storeUrl: string } | { __typename: 'UserMedia', id: string, storeUrl: string }>>> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type GetPartnerByIdQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetPartnerByIdQuery = { __typename: 'Query', partnerById?: Maybe<{ __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'Partner', id: string, name: string, description: string, websiteUrl: string, receipts?: Maybe<Array<Maybe<{ __typename: 'DonationReceipt', id: string, createdAt?: Maybe<Date>, amountDonated?: Maybe<number>, files?: Maybe<Array<Maybe<{ __typename: 'DonationReceiptMedia', id: string, storeUrl: string } | { __typename: 'LanguageOptionMedia', id: string, storeUrl: string } | { __typename: 'MessageMedia', id: string, storeUrl: string } | { __typename: 'OperatorMedia', id: string, storeUrl: string } | { __typename: 'PartnerMedia', id: string, storeUrl: string } | { __typename: 'SharedMedia', id: string, storeUrl: string } | { __typename: 'UserMedia', id: string, storeUrl: string }>>>, donations?: Maybe<Array<Maybe<{ __typename: 'Donation', id: string, createdAt?: Maybe<Date>, amountToDonate?: Maybe<number>, operator?: Maybe<{ __typename: 'IndividualOperator', account?: Maybe<{ __typename: 'Account', user?: Maybe<{ __typename: 'User', firstName: string }> }>, avatar?: Maybe<{ __typename: 'DonationReceiptMedia', storeUrl: string } | { __typename: 'LanguageOptionMedia', storeUrl: string } | { __typename: 'MessageMedia', storeUrl: string } | { __typename: 'OperatorMedia', storeUrl: string } | { __typename: 'PartnerMedia', storeUrl: string } | { __typename: 'SharedMedia', storeUrl: string } | { __typename: 'UserMedia', storeUrl: string }> }> }>>> }>>> }> };

export type GetPartnersIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPartnersIdsQuery = { __typename: 'Query', partners?: Maybe<{ __typename: 'PartnersList', partners?: Maybe<Array<Maybe<{ __typename: 'Partner', id: string }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type GetPartnersWithReceiptsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPartnersWithReceiptsQuery = { __typename: 'Query', partners?: Maybe<{ __typename: 'PartnersList', partners?: Maybe<Array<Maybe<{ __typename: 'Partner', id: string, name: string, description: string, websiteUrl: string, medias?: Maybe<Array<Maybe<{ __typename: 'DonationReceiptMedia', id: string, storeUrl: string } | { __typename: 'LanguageOptionMedia', id: string, storeUrl: string } | { __typename: 'MessageMedia', id: string, storeUrl: string } | { __typename: 'OperatorMedia', id: string, storeUrl: string } | { __typename: 'PartnerMedia', id: string, storeUrl: string } | { __typename: 'SharedMedia', id: string, storeUrl: string } | { __typename: 'UserMedia', id: string, storeUrl: string }>>>, receipts?: Maybe<Array<Maybe<{ __typename: 'DonationReceipt', id: string, amountDonated?: Maybe<number>, donations?: Maybe<Array<Maybe<{ __typename: 'Donation', id: string }>>> }>>> }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage }> };

export type CreateReviewMutationVariables = Exact<{
  input: CreateReviewInput;
}>;


export type CreateReviewMutation = { __typename: 'Mutation', createReview?: Maybe<{ __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'OperatorReview', id: string } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserReview', id: string }> };

export type CreateServiceOptionMutationVariables = Exact<{
  input: CreateServiceOptionInput;
}>;


export type CreateServiceOptionMutation = { __typename: 'Mutation', createServiceOption?: Maybe<{ __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'ServiceOption', id: string, nameFr: string, nameEn: string } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type UpdateServiceOptionMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateServiceOptionInput;
}>;


export type UpdateServiceOptionMutation = { __typename: 'Mutation', updateServiceOption?: Maybe<{ __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'ServiceOption', id: string, nameFr: string, nameEn: string } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type DeleteServiceOptionMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteServiceOptionMutation = { __typename: 'Mutation', deleteServiceOption?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type GetServiceOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetServiceOptionsQuery = { __typename: 'Query', servicesOptions?: Maybe<{ __typename: 'ServiceOptionsList', serviceOptions?: Maybe<Array<Maybe<{ __typename: 'ServiceOption', id: string, nameFr: string, nameEn: string }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type CreateSpecieOptionMutationVariables = Exact<{
  input: CreateSpecieOptionInput;
}>;


export type CreateSpecieOptionMutation = { __typename: 'Mutation', createSpecieOption?: Maybe<{ __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'SpecieOption', id: string, nameFr: string, nameEn: string } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type UpdateSpecieOptionMutationVariables = Exact<{
  id: Scalars['ID'];
  input: UpdateSpecieOptionInput;
}>;


export type UpdateSpecieOptionMutation = { __typename: 'Mutation', updateSpecieOption?: Maybe<{ __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'SpecieOption', id: string, nameFr: string, nameEn: string } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type DeleteSpecieOptionMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type DeleteSpecieOptionMutation = { __typename: 'Mutation', deleteSpecieOption?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'InvalidArgumentsError', invalidArguments: Array<Maybe<{ __typename: 'InvalidArgument', key: string, message: string }>> } | { __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type GetSpeciesOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSpeciesOptionsQuery = { __typename: 'Query', speciesOptions?: Maybe<{ __typename: 'SpecieOptionsList', specieOptions?: Maybe<Array<Maybe<{ __typename: 'SpecieOption', id: string, nameFr: string, nameEn: string }>>> } | { __typename: 'UnableToProcessError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserAuthenticationError' } | { __typename: 'UserForbiddenError' }> };

export type StartCronMutationVariables = Exact<{
  cronName: Scalars['String'];
}>;


export type StartCronMutation = { __typename: 'Mutation', startCron?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type StopCronMutationVariables = Exact<{
  cronName: Scalars['String'];
}>;


export type StopCronMutation = { __typename: 'Mutation', stopCron?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type CurrentStaffQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentStaffQuery = { __typename: 'Query', currentStaff?: Maybe<{ __typename: 'NotFoundError', code: ErrorCode, message: ErrorMessage } | { __typename: 'Staff', id: string, email?: Maybe<string> } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type GetCronStatusQueryVariables = Exact<{
  cronName: Scalars['String'];
}>;


export type GetCronStatusQuery = { __typename: 'Query', getCronStatus?: Maybe<{ __typename: 'CronStatus', status?: Maybe<string> } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type SubscribeToPendingPaymentCronSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscribeToPendingPaymentCronSubscription = { __typename: 'Subscription', pendingPaymentCronSub?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type SubscribeToSetupIntentCronSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscribeToSetupIntentCronSubscription = { __typename: 'Subscription', setupIntentCronSub?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export type SubscribeToErrorsEmailCronSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type SubscribeToErrorsEmailCronSubscription = { __typename: 'Subscription', errorsEmailCronSub?: Maybe<{ __typename: 'BooleanResult', success?: Maybe<boolean> } | { __typename: 'UserAuthenticationError', code: ErrorCode, message: ErrorMessage } | { __typename: 'UserForbiddenError', code: ErrorCode, message: ErrorMessage }> };

export const InvalidArgumentsFieldsFragmentDoc = gql`
    fragment InvalidArgumentsFields on InvalidArgumentsError {
  invalidArguments {
    key
    message
  }
}
    `;
export const NotFoundFieldsFragmentDoc = gql`
    fragment NotFoundFields on NotFoundError {
  code
  message
}
    `;
export const UnableToProcessFieldsFragmentDoc = gql`
    fragment UnableToProcessFields on UnableToProcessError {
  code
  message
}
    `;
export const UserAuthFieldsFragmentDoc = gql`
    fragment UserAuthFields on UserAuthenticationError {
  code
  message
}
    `;
export const UserForbiddenFieldsFragmentDoc = gql`
    fragment UserForbiddenFields on UserForbiddenError {
  code
  message
}
    `;
export const MessageFieldsFragmentDoc = gql`
    fragment MessageFields on Message {
  id
  updatedAt
  readAt
}
    `;
export const CreateAccountDocument = gql`
    mutation CreateAccount($input: CreateAccountInput!) {
  createAccount(input: $input) {
    ... on Account {
      id
      email
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

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
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($input: EmailAndPasswordInput!) {
  signIn(input: $input) {
    ... on Account {
      id
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

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
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignOutDocument = gql`
    mutation SignOut {
  signOut {
    ... on BooleanResult {
      success
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UserAuthFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type SignOutMutationFn = Apollo.MutationFunction<SignOutMutation, SignOutMutationVariables>;

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
export function useSignOutMutation(baseOptions?: Apollo.MutationHookOptions<SignOutMutation, SignOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(SignOutDocument, options);
      }
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<SignOutMutation, SignOutMutationVariables>;
export const SendVerificationEmailDocument = gql`
    mutation SendVerificationEmail($email: String!) {
  sendVerificationEmail(email: $email) {
    ... on BooleanResult {
      success
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type SendVerificationEmailMutationFn = Apollo.MutationFunction<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>;

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
export function useSendVerificationEmailMutation(baseOptions?: Apollo.MutationHookOptions<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>(SendVerificationEmailDocument, options);
      }
export type SendVerificationEmailMutationHookResult = ReturnType<typeof useSendVerificationEmailMutation>;
export type SendVerificationEmailMutationResult = Apollo.MutationResult<SendVerificationEmailMutation>;
export type SendVerificationEmailMutationOptions = Apollo.BaseMutationOptions<SendVerificationEmailMutation, SendVerificationEmailMutationVariables>;
export const VerifyUserDocument = gql`
    mutation VerifyUser($input: VerifyUserInput!) {
  verifyUser(input: $input) {
    ... on BooleanResult {
      success
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type VerifyUserMutationFn = Apollo.MutationFunction<VerifyUserMutation, VerifyUserMutationVariables>;

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
export function useVerifyUserMutation(baseOptions?: Apollo.MutationHookOptions<VerifyUserMutation, VerifyUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyUserMutation, VerifyUserMutationVariables>(VerifyUserDocument, options);
      }
export type VerifyUserMutationHookResult = ReturnType<typeof useVerifyUserMutation>;
export type VerifyUserMutationResult = Apollo.MutationResult<VerifyUserMutation>;
export type VerifyUserMutationOptions = Apollo.BaseMutationOptions<VerifyUserMutation, VerifyUserMutationVariables>;
export const DeleteAccountDocument = gql`
    mutation DeleteAccount($confirmPassword: String!) {
  deleteAccount(confirmPassword: $confirmPassword) {
    ... on BooleanResult {
      success
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type DeleteAccountMutationFn = Apollo.MutationFunction<DeleteAccountMutation, DeleteAccountMutationVariables>;

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
export function useDeleteAccountMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccountMutation, DeleteAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteAccountMutation, DeleteAccountMutationVariables>(DeleteAccountDocument, options);
      }
export type DeleteAccountMutationHookResult = ReturnType<typeof useDeleteAccountMutation>;
export type DeleteAccountMutationResult = Apollo.MutationResult<DeleteAccountMutation>;
export type DeleteAccountMutationOptions = Apollo.BaseMutationOptions<DeleteAccountMutation, DeleteAccountMutationVariables>;
export const LostPasswordDocument = gql`
    mutation LostPassword($email: String!) {
  lostPassword(email: $email) {
    ... on BooleanResult {
      success
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}`;
export type LostPasswordMutationFn = Apollo.MutationFunction<LostPasswordMutation, LostPasswordMutationVariables>;

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
export function useLostPasswordMutation(baseOptions?: Apollo.MutationHookOptions<LostPasswordMutation, LostPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LostPasswordMutation, LostPasswordMutationVariables>(LostPasswordDocument, options);
      }
export type LostPasswordMutationHookResult = ReturnType<typeof useLostPasswordMutation>;
export type LostPasswordMutationResult = Apollo.MutationResult<LostPasswordMutation>;
export type LostPasswordMutationOptions = Apollo.BaseMutationOptions<LostPasswordMutation, LostPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($input: ResetPasswordInput!) {
  resetPassword(input: $input) {
    ... on BooleanResult {
      success
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}`;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

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
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const ModifyPasswordDocument = gql`
    mutation ModifyPassword($password: String!, $newPassword: String!) {
  modifyPassword(password: $password, newPassword: $newPassword) {
    ... on Account {
      id
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type ModifyPasswordMutationFn = Apollo.MutationFunction<ModifyPasswordMutation, ModifyPasswordMutationVariables>;

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
export function useModifyPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ModifyPasswordMutation, ModifyPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyPasswordMutation, ModifyPasswordMutationVariables>(ModifyPasswordDocument, options);
      }
export type ModifyPasswordMutationHookResult = ReturnType<typeof useModifyPasswordMutation>;
export type ModifyPasswordMutationResult = Apollo.MutationResult<ModifyPasswordMutation>;
export type ModifyPasswordMutationOptions = Apollo.BaseMutationOptions<ModifyPasswordMutation, ModifyPasswordMutationVariables>;
export const ModifyEmailDocument = gql`
    mutation ModifyEmail($email: String!) {
  modifyEmail(email: $email) {
    ... on Account {
      id
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type ModifyEmailMutationFn = Apollo.MutationFunction<ModifyEmailMutation, ModifyEmailMutationVariables>;

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
export function useModifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<ModifyEmailMutation, ModifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ModifyEmailMutation, ModifyEmailMutationVariables>(ModifyEmailDocument, options);
      }
export type ModifyEmailMutationHookResult = ReturnType<typeof useModifyEmailMutation>;
export type ModifyEmailMutationResult = Apollo.MutationResult<ModifyEmailMutation>;
export type ModifyEmailMutationOptions = Apollo.BaseMutationOptions<ModifyEmailMutation, ModifyEmailMutationVariables>;
export const CurrentAccountDocument = gql`
    query CurrentAccount {
  currentAccount {
    ... on Account {
      id
      email
      verifiedAt
      user {
        firstName
      }
      operator {
        id
        isActive
      }
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${UserAuthFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;

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
export function useCurrentAccountQuery(baseOptions?: Apollo.QueryHookOptions<CurrentAccountQuery, CurrentAccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentAccountQuery, CurrentAccountQueryVariables>(CurrentAccountDocument, options);
      }
export function useCurrentAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentAccountQuery, CurrentAccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentAccountQuery, CurrentAccountQueryVariables>(CurrentAccountDocument, options);
        }
export type CurrentAccountQueryHookResult = ReturnType<typeof useCurrentAccountQuery>;
export type CurrentAccountLazyQueryHookResult = ReturnType<typeof useCurrentAccountLazyQuery>;
export type CurrentAccountQueryResult = Apollo.QueryResult<CurrentAccountQuery, CurrentAccountQueryVariables>;
export const AllAccountsDocument = gql`
    query AllAccounts {
  allAccounts {
    ... on AccountsList {
      accounts {
        id
        verifiedAt
        updatedAt
      }
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;

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
export function useAllAccountsQuery(baseOptions?: Apollo.QueryHookOptions<AllAccountsQuery, AllAccountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllAccountsQuery, AllAccountsQueryVariables>(AllAccountsDocument, options);
      }
export function useAllAccountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllAccountsQuery, AllAccountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllAccountsQuery, AllAccountsQueryVariables>(AllAccountsDocument, options);
        }
export type AllAccountsQueryHookResult = ReturnType<typeof useAllAccountsQuery>;
export type AllAccountsLazyQueryHookResult = ReturnType<typeof useAllAccountsLazyQuery>;
export type AllAccountsQueryResult = Apollo.QueryResult<AllAccountsQuery, AllAccountsQueryVariables>;
export const CreateBookingAdDocument = gql`
    mutation CreateBookingAd($input: CreateBookingAdInput!) {
  createBookingAd(input: $input) {
    ... on BookingAd {
      id
      createdAt
      updatedAt
      animalsSpeciesIds
      startDate
      endDate
      serviceOptionId
      description
      location {
        latitude
        longitude
      }
    }
    ... on PreExistingUserAdError {
      preExistingUserAdError
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type CreateBookingAdMutationFn = Apollo.MutationFunction<CreateBookingAdMutation, CreateBookingAdMutationVariables>;

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
export function useCreateBookingAdMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingAdMutation, CreateBookingAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookingAdMutation, CreateBookingAdMutationVariables>(CreateBookingAdDocument, options);
      }
export type CreateBookingAdMutationHookResult = ReturnType<typeof useCreateBookingAdMutation>;
export type CreateBookingAdMutationResult = Apollo.MutationResult<CreateBookingAdMutation>;
export type CreateBookingAdMutationOptions = Apollo.BaseMutationOptions<CreateBookingAdMutation, CreateBookingAdMutationVariables>;
export const UpdateBookingAdDocument = gql`
    mutation UpdateBookingAd($id: ID!, $input: UpdateBookingAdInput!) {
  updateBookingAd(id: $id, input: $input) {
    ... on BookingAd {
      id
      createdAt
      updatedAt
      animalsSpeciesIds
      startDate
      endDate
      serviceOptionId
      description
      location {
        latitude
        longitude
      }
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type UpdateBookingAdMutationFn = Apollo.MutationFunction<UpdateBookingAdMutation, UpdateBookingAdMutationVariables>;

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
export function useUpdateBookingAdMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookingAdMutation, UpdateBookingAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBookingAdMutation, UpdateBookingAdMutationVariables>(UpdateBookingAdDocument, options);
      }
export type UpdateBookingAdMutationHookResult = ReturnType<typeof useUpdateBookingAdMutation>;
export type UpdateBookingAdMutationResult = Apollo.MutationResult<UpdateBookingAdMutation>;
export type UpdateBookingAdMutationOptions = Apollo.BaseMutationOptions<UpdateBookingAdMutation, UpdateBookingAdMutationVariables>;
export const DeleteBookingAdDocument = gql`
    mutation DeleteBookingAd($id: ID!) {
  deleteBookingAd(id: $id) {
    ... on BooleanResult {
      success
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type DeleteBookingAdMutationFn = Apollo.MutationFunction<DeleteBookingAdMutation, DeleteBookingAdMutationVariables>;

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
export function useDeleteBookingAdMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBookingAdMutation, DeleteBookingAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBookingAdMutation, DeleteBookingAdMutationVariables>(DeleteBookingAdDocument, options);
      }
export type DeleteBookingAdMutationHookResult = ReturnType<typeof useDeleteBookingAdMutation>;
export type DeleteBookingAdMutationResult = Apollo.MutationResult<DeleteBookingAdMutation>;
export type DeleteBookingAdMutationOptions = Apollo.BaseMutationOptions<DeleteBookingAdMutation, DeleteBookingAdMutationVariables>;
export const BidForBookingAdDocument = gql`
    mutation BidForBookingAd($id: ID!) {
  bidForBookingAd(id: $id) {
    ... on BooleanResult {
      success
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type BidForBookingAdMutationFn = Apollo.MutationFunction<BidForBookingAdMutation, BidForBookingAdMutationVariables>;

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
export function useBidForBookingAdMutation(baseOptions?: Apollo.MutationHookOptions<BidForBookingAdMutation, BidForBookingAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<BidForBookingAdMutation, BidForBookingAdMutationVariables>(BidForBookingAdDocument, options);
      }
export type BidForBookingAdMutationHookResult = ReturnType<typeof useBidForBookingAdMutation>;
export type BidForBookingAdMutationResult = Apollo.MutationResult<BidForBookingAdMutation>;
export type BidForBookingAdMutationOptions = Apollo.BaseMutationOptions<BidForBookingAdMutation, BidForBookingAdMutationVariables>;
export const RemoveBidForBookingAdDocument = gql`
    mutation RemoveBidForBookingAd($id: ID!) {
  removeBidForBookingAd(id: $id) {
    ... on BooleanResult {
      success
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type RemoveBidForBookingAdMutationFn = Apollo.MutationFunction<RemoveBidForBookingAdMutation, RemoveBidForBookingAdMutationVariables>;

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
export function useRemoveBidForBookingAdMutation(baseOptions?: Apollo.MutationHookOptions<RemoveBidForBookingAdMutation, RemoveBidForBookingAdMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveBidForBookingAdMutation, RemoveBidForBookingAdMutationVariables>(RemoveBidForBookingAdDocument, options);
      }
export type RemoveBidForBookingAdMutationHookResult = ReturnType<typeof useRemoveBidForBookingAdMutation>;
export type RemoveBidForBookingAdMutationResult = Apollo.MutationResult<RemoveBidForBookingAdMutation>;
export type RemoveBidForBookingAdMutationOptions = Apollo.BaseMutationOptions<RemoveBidForBookingAdMutation, RemoveBidForBookingAdMutationVariables>;
export const CurrentUserAdsDocument = gql`
    query CurrentUserAds {
  currentUserAds {
    ... on BookingAds {
      bookingAds {
        id
        createdAt
        updatedAt
        animalsSpeciesIds
        startDate
        endDate
        serviceOptionId
        serviceMaxPrice
        description
        bidders {
          id
          bids {
            id
          }
        }
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}`;

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
export function useCurrentUserAdsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserAdsQuery, CurrentUserAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserAdsQuery, CurrentUserAdsQueryVariables>(CurrentUserAdsDocument, options);
      }
export function useCurrentUserAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserAdsQuery, CurrentUserAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserAdsQuery, CurrentUserAdsQueryVariables>(CurrentUserAdsDocument, options);
        }
export type CurrentUserAdsQueryHookResult = ReturnType<typeof useCurrentUserAdsQuery>;
export type CurrentUserAdsLazyQueryHookResult = ReturnType<typeof useCurrentUserAdsLazyQuery>;
export type CurrentUserAdsQueryResult = Apollo.QueryResult<CurrentUserAdsQuery, CurrentUserAdsQueryVariables>;
export const AdByIdDocument = gql`
    query AdById($id: ID!) {
  adById(id: $id) {
    ... on BookingAd {
      id
      updatedAt
      animalsSpeciesIds
      startDate
      endDate
      serviceOptionId
      description
      serviceMaxPrice
      location {
        latitude
        longitude
      }
      bidders {
        id
        account {
          user {
            firstName
          }
        }
        avatar {
          storeUrl
        }
        averageScore
        location {
          latitude
          longitude
        }
        coreServices {
          id
          price
        }
        extraServices {
          atHomeExclusivity
          atHomeExclusivityExtraPrice
          atHomeContinuously
          atHomeContinuouslyExtraPrice
          atHomeOnlyBringPet
          atHomeOnlyBringPetExtraPrice
          atHomeComeGetPet
          atHomeComeGetPetExtraPrice
          atOwnerHomePlantsCare
          atOwnerHomePlantsCareExtraPrice
          atOwnerHomeMail
          atOwnerHomeMailExtraPrice
          atOwnerHomeCurtains
          atOwnerHomeCurtainsExtraPrice
          acceptShortNotice
          flexibleCancelation
          isProfessionalOperator
          abilityToProvideMedicalCare
        }
      }
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;

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
export function useAdByIdQuery(baseOptions: Apollo.QueryHookOptions<AdByIdQuery, AdByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AdByIdQuery, AdByIdQueryVariables>(AdByIdDocument, options);
      }
export function useAdByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AdByIdQuery, AdByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AdByIdQuery, AdByIdQueryVariables>(AdByIdDocument, options);
        }
export type AdByIdQueryHookResult = ReturnType<typeof useAdByIdQuery>;
export type AdByIdLazyQueryHookResult = ReturnType<typeof useAdByIdLazyQuery>;
export type AdByIdQueryResult = Apollo.QueryResult<AdByIdQuery, AdByIdQueryVariables>;
export const SearchAdsDocument = gql`
    query SearchAds($input: SearchAdsInput!) {
  searchAds(input: $input) {
    ... on BookingAds {
      bookingAds {
        id
        updatedAt
        animalsSpeciesIds
        startDate
        endDate
        serviceOptionId
        description
        location {
          latitude
          longitude
        }
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}`;

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
export function useSearchAdsQuery(baseOptions: Apollo.QueryHookOptions<SearchAdsQuery, SearchAdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchAdsQuery, SearchAdsQueryVariables>(SearchAdsDocument, options);
      }
export function useSearchAdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchAdsQuery, SearchAdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchAdsQuery, SearchAdsQueryVariables>(SearchAdsDocument, options);
        }
export type SearchAdsQueryHookResult = ReturnType<typeof useSearchAdsQuery>;
export type SearchAdsLazyQueryHookResult = ReturnType<typeof useSearchAdsLazyQuery>;
export type SearchAdsQueryResult = Apollo.QueryResult<SearchAdsQuery, SearchAdsQueryVariables>;
export const CurrentOperatorBidsDocument = gql`
    query CurrentOperatorBids {
  currentOperatorBids {
    ... on BookingAdBids {
      bids {
        bookingAd {
          id
          updatedAt
          animalsSpeciesIds
          startDate
          endDate
          serviceOptionId
          description
          location {
            latitude
            longitude
          }
        }
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}`;

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
export function useCurrentOperatorBidsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentOperatorBidsQuery, CurrentOperatorBidsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentOperatorBidsQuery, CurrentOperatorBidsQueryVariables>(CurrentOperatorBidsDocument, options);
      }
export function useCurrentOperatorBidsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentOperatorBidsQuery, CurrentOperatorBidsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentOperatorBidsQuery, CurrentOperatorBidsQueryVariables>(CurrentOperatorBidsDocument, options);
        }
export type CurrentOperatorBidsQueryHookResult = ReturnType<typeof useCurrentOperatorBidsQuery>;
export type CurrentOperatorBidsLazyQueryHookResult = ReturnType<typeof useCurrentOperatorBidsLazyQuery>;
export type CurrentOperatorBidsQueryResult = Apollo.QueryResult<CurrentOperatorBidsQuery, CurrentOperatorBidsQueryVariables>;
export const CreateBookingDocument = gql`
    mutation CreateBooking($input: CreateBookingInput!) {
  createBooking(input: $input) {
    ... on Booking {
      id
      startDate
      endDate
      status
      ownerConfirmationDate
      operatorConfirmationDate
      selectedOptions
      animals {
        specieOptionId
      }
      messages {
        ... on UserBookingMessage {
          id
        }
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on CannotBookHimSelfError {
      cannotBookHimSelfError
    }
    ... on ExistingBookingError {
      existingBookingError
    }
    ... on NotSupportedExtraServiceError {
      notSupportedExtraServiceError
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}`;
export type CreateBookingMutationFn = Apollo.MutationFunction<CreateBookingMutation, CreateBookingMutationVariables>;

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
export function useCreateBookingMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingMutation, CreateBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookingMutation, CreateBookingMutationVariables>(CreateBookingDocument, options);
      }
export type CreateBookingMutationHookResult = ReturnType<typeof useCreateBookingMutation>;
export type CreateBookingMutationResult = Apollo.MutationResult<CreateBookingMutation>;
export type CreateBookingMutationOptions = Apollo.BaseMutationOptions<CreateBookingMutation, CreateBookingMutationVariables>;
export const ConfirmBookingDocument = gql`
    mutation ConfirmBooking($input: ConfirmBookingInput!) {
  confirmBooking(input: $input) {
    ... on Booking {
      id
      ownerConfirmationDate
      operatorConfirmationDate
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}`;
export type ConfirmBookingMutationFn = Apollo.MutationFunction<ConfirmBookingMutation, ConfirmBookingMutationVariables>;

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
export function useConfirmBookingMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmBookingMutation, ConfirmBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmBookingMutation, ConfirmBookingMutationVariables>(ConfirmBookingDocument, options);
      }
export type ConfirmBookingMutationHookResult = ReturnType<typeof useConfirmBookingMutation>;
export type ConfirmBookingMutationResult = Apollo.MutationResult<ConfirmBookingMutation>;
export type ConfirmBookingMutationOptions = Apollo.BaseMutationOptions<ConfirmBookingMutation, ConfirmBookingMutationVariables>;
export const CancelBookingDocument = gql`
    mutation CancelBooking($input: CancelBookingInput!) {
  cancelBooking(input: $input) {
    ... on Booking {
      id
      ownerConfirmationDate
      operatorConfirmationDate
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}`;
export type CancelBookingMutationFn = Apollo.MutationFunction<CancelBookingMutation, CancelBookingMutationVariables>;

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
export function useCancelBookingMutation(baseOptions?: Apollo.MutationHookOptions<CancelBookingMutation, CancelBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelBookingMutation, CancelBookingMutationVariables>(CancelBookingDocument, options);
      }
export type CancelBookingMutationHookResult = ReturnType<typeof useCancelBookingMutation>;
export type CancelBookingMutationResult = Apollo.MutationResult<CancelBookingMutation>;
export type CancelBookingMutationOptions = Apollo.BaseMutationOptions<CancelBookingMutation, CancelBookingMutationVariables>;
export const CancelOnGoingBookingDocument = gql`
    mutation CancelOnGoingBooking($input: CancelOnGoingBookingInput!) {
  cancelOnGoingBooking(input: $input) {
    ... on Booking {
      id
      ownerConfirmationDate
      operatorConfirmationDate
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}`;
export type CancelOnGoingBookingMutationFn = Apollo.MutationFunction<CancelOnGoingBookingMutation, CancelOnGoingBookingMutationVariables>;

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
export function useCancelOnGoingBookingMutation(baseOptions?: Apollo.MutationHookOptions<CancelOnGoingBookingMutation, CancelOnGoingBookingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelOnGoingBookingMutation, CancelOnGoingBookingMutationVariables>(CancelOnGoingBookingDocument, options);
      }
export type CancelOnGoingBookingMutationHookResult = ReturnType<typeof useCancelOnGoingBookingMutation>;
export type CancelOnGoingBookingMutationResult = Apollo.MutationResult<CancelOnGoingBookingMutation>;
export type CancelOnGoingBookingMutationOptions = Apollo.BaseMutationOptions<CancelOnGoingBookingMutation, CancelOnGoingBookingMutationVariables>;
export const AuthorizePaymentDocument = gql`
    mutation AuthorizePayment($id: ID!) {
  authorizePayment(id: $id) {
    ... on AuthorizedPayment {
      clientSecret
      stripeTargetApi
      hadRef
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on InvalidOperatorError {
      invalidOperatorError
    }
    ... on OperatorCannotProcessPaymentsError {
      operatorCannotProcessPaymentsError
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}`;
export type AuthorizePaymentMutationFn = Apollo.MutationFunction<AuthorizePaymentMutation, AuthorizePaymentMutationVariables>;

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
export function useAuthorizePaymentMutation(baseOptions?: Apollo.MutationHookOptions<AuthorizePaymentMutation, AuthorizePaymentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthorizePaymentMutation, AuthorizePaymentMutationVariables>(AuthorizePaymentDocument, options);
      }
export type AuthorizePaymentMutationHookResult = ReturnType<typeof useAuthorizePaymentMutation>;
export type AuthorizePaymentMutationResult = Apollo.MutationResult<AuthorizePaymentMutation>;
export type AuthorizePaymentMutationOptions = Apollo.BaseMutationOptions<AuthorizePaymentMutation, AuthorizePaymentMutationVariables>;
export const UpdateBookingPaymentStatusDocument = gql`
    mutation UpdateBookingPaymentStatus($input: UpdateBookingPaymentStatusInput!) {
  updateBookingPaymentStatus(input: $input) {
    ... on BooleanResult {
      success
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on PaymentProcessorError {
      paymentProcessorError
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}`;
export type UpdateBookingPaymentStatusMutationFn = Apollo.MutationFunction<UpdateBookingPaymentStatusMutation, UpdateBookingPaymentStatusMutationVariables>;

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
export function useUpdateBookingPaymentStatusMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBookingPaymentStatusMutation, UpdateBookingPaymentStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBookingPaymentStatusMutation, UpdateBookingPaymentStatusMutationVariables>(UpdateBookingPaymentStatusDocument, options);
      }
export type UpdateBookingPaymentStatusMutationHookResult = ReturnType<typeof useUpdateBookingPaymentStatusMutation>;
export type UpdateBookingPaymentStatusMutationResult = Apollo.MutationResult<UpdateBookingPaymentStatusMutation>;
export type UpdateBookingPaymentStatusMutationOptions = Apollo.BaseMutationOptions<UpdateBookingPaymentStatusMutation, UpdateBookingPaymentStatusMutationVariables>;
export const GetCurrentUserAndOperatorBookingsDocument = gql`
    query GetCurrentUserAndOperatorBookings {
  currentUserAndOperatorBookings {
    ... on BookingsList {
      bookings {
        id
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}`;

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
export function useGetCurrentUserAndOperatorBookingsQuery(baseOptions?: Apollo.QueryHookOptions<GetCurrentUserAndOperatorBookingsQuery, GetCurrentUserAndOperatorBookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCurrentUserAndOperatorBookingsQuery, GetCurrentUserAndOperatorBookingsQueryVariables>(GetCurrentUserAndOperatorBookingsDocument, options);
      }
export function useGetCurrentUserAndOperatorBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCurrentUserAndOperatorBookingsQuery, GetCurrentUserAndOperatorBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCurrentUserAndOperatorBookingsQuery, GetCurrentUserAndOperatorBookingsQueryVariables>(GetCurrentUserAndOperatorBookingsDocument, options);
        }
export type GetCurrentUserAndOperatorBookingsQueryHookResult = ReturnType<typeof useGetCurrentUserAndOperatorBookingsQuery>;
export type GetCurrentUserAndOperatorBookingsLazyQueryHookResult = ReturnType<typeof useGetCurrentUserAndOperatorBookingsLazyQuery>;
export type GetCurrentUserAndOperatorBookingsQueryResult = Apollo.QueryResult<GetCurrentUserAndOperatorBookingsQuery, GetCurrentUserAndOperatorBookingsQueryVariables>;
export const BookingByIdDocument = gql`
    query BookingById($id: ID!) {
  bookingById(id: $id) {
    ... on Booking {
      id
      updatedAt
      status
      startDate
      endDate
      service {
        nameFr
        nameEn
      }
      priceWithOutApplicationFee
      applicationFeeAmount
      selectedOptions
      ownerConfirmationDate
      operatorConfirmationDate
      canceled
      canceledBy
      underReview
      operator {
        id
        averageScore
        averageResponseTime
        partnerId
        partnerPercentage
        account {
          user {
            firstName
          }
        }
        avatar {
          storeUrl
        }
        location {
          city
        }
        coreServices {
          price
          serviceOptionId
        }
        extraServices {
          atHomeExclusivity
          atHomeExclusivityExtraPrice
          atHomeContinuously
          atHomeContinuouslyExtraPrice
          atHomeOnlyBringPet
          atHomeOnlyBringPetExtraPrice
          atHomeComeGetPet
          atHomeComeGetPetExtraPrice
          atOwnerHomePlantsCare
          atOwnerHomePlantsCareExtraPrice
          atOwnerHomeMail
          atOwnerHomeMailExtraPrice
          atOwnerHomeCurtains
          atOwnerHomeCurtainsExtraPrice
        }
      }
      user {
        id
        firstName
        avatar {
          storeUrl
        }
      }
      reviews {
        id
        score
        title
        body
      }
      animals {
        specie {
          nameFr
          nameEn
        }
      }
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}`;

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
export function useBookingByIdQuery(baseOptions: Apollo.QueryHookOptions<BookingByIdQuery, BookingByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookingByIdQuery, BookingByIdQueryVariables>(BookingByIdDocument, options);
      }
export function useBookingByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookingByIdQuery, BookingByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookingByIdQuery, BookingByIdQueryVariables>(BookingByIdDocument, options);
        }
export type BookingByIdQueryHookResult = ReturnType<typeof useBookingByIdQuery>;
export type BookingByIdLazyQueryHookResult = ReturnType<typeof useBookingByIdLazyQuery>;
export type BookingByIdQueryResult = Apollo.QueryResult<BookingByIdQuery, BookingByIdQueryVariables>;
export const CurrentUserOwnerBookingsDocument = gql`
    query CurrentUserOwnerBookings($input: CurrentUserBookingFilterInput!) {
  currentUserOwnerBookings(input: $input) {
    ... on BookingsList {
      bookings {
        id
        updatedAt
        status
        startDate
        endDate
        service {
          nameFr
          nameEn
        }
        priceWithOutApplicationFee
        applicationFeeAmount
        selectedOptions
        messages {
          ... on UserBookingMessage {
            userId
            readAt
          }
          ... on OperatorBookingMessage {
            operatorId
            readAt
          }
        }
        operator {
          id
          account {
            user {
              firstName
            }
          }
          partnerId
          partnerPercentage
          averageScore
          avatar {
            storeUrl
          }
          location {
            city
          }
          coreServices {
            serviceOptionId
            price
          }
          extraServices {
            atHomeExclusivity
            atHomeExclusivityExtraPrice
            atHomeContinuously
            atHomeContinuouslyExtraPrice
            atHomeOnlyBringPet
            atHomeOnlyBringPetExtraPrice
            atHomeComeGetPet
            atHomeComeGetPetExtraPrice
            atOwnerHomePlantsCare
            atOwnerHomePlantsCareExtraPrice
            atOwnerHomeMail
            atOwnerHomeMailExtraPrice
            atOwnerHomeCurtains
            atOwnerHomeCurtainsExtraPrice
          }
        }
        animals {
          specie {
            nameFr
            nameEn
          }
        }
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}`;

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
export function useCurrentUserOwnerBookingsQuery(baseOptions: Apollo.QueryHookOptions<CurrentUserOwnerBookingsQuery, CurrentUserOwnerBookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserOwnerBookingsQuery, CurrentUserOwnerBookingsQueryVariables>(CurrentUserOwnerBookingsDocument, options);
      }
export function useCurrentUserOwnerBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserOwnerBookingsQuery, CurrentUserOwnerBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserOwnerBookingsQuery, CurrentUserOwnerBookingsQueryVariables>(CurrentUserOwnerBookingsDocument, options);
        }
export type CurrentUserOwnerBookingsQueryHookResult = ReturnType<typeof useCurrentUserOwnerBookingsQuery>;
export type CurrentUserOwnerBookingsLazyQueryHookResult = ReturnType<typeof useCurrentUserOwnerBookingsLazyQuery>;
export type CurrentUserOwnerBookingsQueryResult = Apollo.QueryResult<CurrentUserOwnerBookingsQuery, CurrentUserOwnerBookingsQueryVariables>;
export const CurrentUserOperatorBookingsDocument = gql`
    query CurrentUserOperatorBookings($input: CurrentUserBookingFilterInput!) {
  currentUserOperatorBookings(input: $input) {
    ... on BookingsList {
      bookings {
        id
        updatedAt
        status
        startDate
        endDate
        service {
          nameFr
          nameEn
        }
        priceWithOutApplicationFee
        applicationFeeAmount
        selectedOptions
        messages {
          ... on UserBookingMessage {
            userId
            readAt
          }
          ... on OperatorBookingMessage {
            operatorId
            readAt
          }
        }
        user {
          id
          firstName
          avatar {
            storeUrl
          }
        }
        operator {
          id
          partnerId
          partnerPercentage
          coreServices {
            price
            serviceOptionId
          }
          extraServices {
            atHomeExclusivity
            atHomeExclusivityExtraPrice
            atHomeContinuously
            atHomeContinuouslyExtraPrice
            atHomeOnlyBringPet
            atHomeOnlyBringPetExtraPrice
            atHomeComeGetPet
            atHomeComeGetPetExtraPrice
            atOwnerHomePlantsCare
            atOwnerHomePlantsCareExtraPrice
            atOwnerHomeMail
            atOwnerHomeMailExtraPrice
            atOwnerHomeCurtains
            atOwnerHomeCurtainsExtraPrice
          }
        }
        animals {
          specie {
            nameFr
            nameEn
          }
        }
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;

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
export function useCurrentUserOperatorBookingsQuery(baseOptions: Apollo.QueryHookOptions<CurrentUserOperatorBookingsQuery, CurrentUserOperatorBookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserOperatorBookingsQuery, CurrentUserOperatorBookingsQueryVariables>(CurrentUserOperatorBookingsDocument, options);
      }
export function useCurrentUserOperatorBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserOperatorBookingsQuery, CurrentUserOperatorBookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserOperatorBookingsQuery, CurrentUserOperatorBookingsQueryVariables>(CurrentUserOperatorBookingsDocument, options);
        }
export type CurrentUserOperatorBookingsQueryHookResult = ReturnType<typeof useCurrentUserOperatorBookingsQuery>;
export type CurrentUserOperatorBookingsLazyQueryHookResult = ReturnType<typeof useCurrentUserOperatorBookingsLazyQuery>;
export type CurrentUserOperatorBookingsQueryResult = Apollo.QueryResult<CurrentUserOperatorBookingsQuery, CurrentUserOperatorBookingsQueryVariables>;
export const BookingsDocument = gql`
    query Bookings {
  bookings {
    ... on BookingsList {
      bookings {
        id
        updatedAt
        status
        priceWithOutApplicationFee
        applicationFeeAmount
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;

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
export function useBookingsQuery(baseOptions?: Apollo.QueryHookOptions<BookingsQuery, BookingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookingsQuery, BookingsQueryVariables>(BookingsDocument, options);
      }
export function useBookingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookingsQuery, BookingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookingsQuery, BookingsQueryVariables>(BookingsDocument, options);
        }
export type BookingsQueryHookResult = ReturnType<typeof useBookingsQuery>;
export type BookingsLazyQueryHookResult = ReturnType<typeof useBookingsLazyQuery>;
export type BookingsQueryResult = Apollo.QueryResult<BookingsQuery, BookingsQueryVariables>;
export const BookingsWithPaymentStatusDocument = gql`
    query BookingsWithPaymentStatus($input: BookingWithPaymentStatusInput!) {
  bookingsWithPaymentStatus(input: $input) {
    ... on BookingsList {
      bookings {
        id
        updatedAt
        priceWithOutApplicationFee
        applicationFeeAmount
        underReview
        payment {
          status
          expectedPaymentIntentCaptureDate
        }
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;

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
export function useBookingsWithPaymentStatusQuery(baseOptions: Apollo.QueryHookOptions<BookingsWithPaymentStatusQuery, BookingsWithPaymentStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BookingsWithPaymentStatusQuery, BookingsWithPaymentStatusQueryVariables>(BookingsWithPaymentStatusDocument, options);
      }
export function useBookingsWithPaymentStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BookingsWithPaymentStatusQuery, BookingsWithPaymentStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BookingsWithPaymentStatusQuery, BookingsWithPaymentStatusQueryVariables>(BookingsWithPaymentStatusDocument, options);
        }
export type BookingsWithPaymentStatusQueryHookResult = ReturnType<typeof useBookingsWithPaymentStatusQuery>;
export type BookingsWithPaymentStatusLazyQueryHookResult = ReturnType<typeof useBookingsWithPaymentStatusLazyQuery>;
export type BookingsWithPaymentStatusQueryResult = Apollo.QueryResult<BookingsWithPaymentStatusQuery, BookingsWithPaymentStatusQueryVariables>;
export const SubscribeToBookingMessagesDocument = gql`
    subscription SubscribeToBookingMessages($bookingId: ID!) {
  bookingByIdChatSub(bookingId: $bookingId) {
    ... on UserBookingMessage {
      id
      userId
      readAt
      content
    }
    ... on OperatorBookingMessage {
      id
      operatorId
      readAt
      content
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
  }
}
    ${UserForbiddenFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}`;

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
export function useSubscribeToBookingMessagesSubscription(baseOptions: Apollo.SubscriptionHookOptions<SubscribeToBookingMessagesSubscription, SubscribeToBookingMessagesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeToBookingMessagesSubscription, SubscribeToBookingMessagesSubscriptionVariables>(SubscribeToBookingMessagesDocument, options);
      }
export type SubscribeToBookingMessagesSubscriptionHookResult = ReturnType<typeof useSubscribeToBookingMessagesSubscription>;
export type SubscribeToBookingMessagesSubscriptionResult = Apollo.SubscriptionResult<SubscribeToBookingMessagesSubscription>;
export const SubscribeToUserBookingsMessagesChangesDocument = gql`
    subscription SubscribeToUserBookingsMessagesChanges($bookingsIds: [ID!], $authorId: ID) {
  userBookingsMessagesChangesSub(bookingIds: $bookingsIds, authorId: $authorId) {
    ... on UserBookingMessage {
      id
      bookingId
      userId
      readAt
      content
      user {
        firstName
        avatar {
          storeUrl
        }
      }
    }
    ... on OperatorBookingMessage {
      id
      bookingId
      operatorId
      readAt
      content
      operator {
        avatar {
          storeUrl
        }
        account {
          user {
            firstName
            lastName
          }
        }
      }
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
  }
}
    ${UserForbiddenFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}`;

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
export function useSubscribeToUserBookingsMessagesChangesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeToUserBookingsMessagesChangesSubscription, SubscribeToUserBookingsMessagesChangesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeToUserBookingsMessagesChangesSubscription, SubscribeToUserBookingsMessagesChangesSubscriptionVariables>(SubscribeToUserBookingsMessagesChangesDocument, options);
      }
export type SubscribeToUserBookingsMessagesChangesSubscriptionHookResult = ReturnType<typeof useSubscribeToUserBookingsMessagesChangesSubscription>;
export type SubscribeToUserBookingsMessagesChangesSubscriptionResult = Apollo.SubscriptionResult<SubscribeToUserBookingsMessagesChangesSubscription>;
export const SubscribeToUserBookingsStatusChangesDocument = gql`
    subscription SubscribeToUserBookingsStatusChanges($bookingsIds: [ID!]) {
  userBookingsStatusChangesSub(bookingIds: $bookingsIds) {
    ... on Booking {
      id
      status
      startDate
      endDate
      user {
        id
        firstName
        lastName
      }
      operator {
        id
        account {
          user {
            firstName
            lastName
          }
        }
        avatar {
          storeUrl
        }
      }
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
  }
}
    ${UserForbiddenFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}`;

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
export function useSubscribeToUserBookingsStatusChangesSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeToUserBookingsStatusChangesSubscription, SubscribeToUserBookingsStatusChangesSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeToUserBookingsStatusChangesSubscription, SubscribeToUserBookingsStatusChangesSubscriptionVariables>(SubscribeToUserBookingsStatusChangesDocument, options);
      }
export type SubscribeToUserBookingsStatusChangesSubscriptionHookResult = ReturnType<typeof useSubscribeToUserBookingsStatusChangesSubscription>;
export type SubscribeToUserBookingsStatusChangesSubscriptionResult = Apollo.SubscriptionResult<SubscribeToUserBookingsStatusChangesSubscription>;
export const SubscribeToNewlyCreatedBookingsAsSitterDocument = gql`
    subscription SubscribeToNewlyCreatedBookingsAsSitter($sitterId: ID) {
  newlyCreatedBookingsAsSitterSub(sitterId: $sitterId) {
    ... on Booking {
      id
      startDate
      endDate
      priceWithOutApplicationFee
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
  }
}
    ${UserForbiddenFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}`;

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
export function useSubscribeToNewlyCreatedBookingsAsSitterSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeToNewlyCreatedBookingsAsSitterSubscription, SubscribeToNewlyCreatedBookingsAsSitterSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeToNewlyCreatedBookingsAsSitterSubscription, SubscribeToNewlyCreatedBookingsAsSitterSubscriptionVariables>(SubscribeToNewlyCreatedBookingsAsSitterDocument, options);
      }
export type SubscribeToNewlyCreatedBookingsAsSitterSubscriptionHookResult = ReturnType<typeof useSubscribeToNewlyCreatedBookingsAsSitterSubscription>;
export type SubscribeToNewlyCreatedBookingsAsSitterSubscriptionResult = Apollo.SubscriptionResult<SubscribeToNewlyCreatedBookingsAsSitterSubscription>;
export const CreateBookingClaimDocument = gql`
    mutation CreateBookingClaim($input: CreateBookingClaimInput!) {
  createBookingClaim(input: $input) {
    ... on Claim {
      id
      reason
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}`;
export type CreateBookingClaimMutationFn = Apollo.MutationFunction<CreateBookingClaimMutation, CreateBookingClaimMutationVariables>;

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
export function useCreateBookingClaimMutation(baseOptions?: Apollo.MutationHookOptions<CreateBookingClaimMutation, CreateBookingClaimMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBookingClaimMutation, CreateBookingClaimMutationVariables>(CreateBookingClaimDocument, options);
      }
export type CreateBookingClaimMutationHookResult = ReturnType<typeof useCreateBookingClaimMutation>;
export type CreateBookingClaimMutationResult = Apollo.MutationResult<CreateBookingClaimMutation>;
export type CreateBookingClaimMutationOptions = Apollo.BaseMutationOptions<CreateBookingClaimMutation, CreateBookingClaimMutationVariables>;
export const GetBookingClaimsDocument = gql`
    query GetBookingClaims {
  claims {
    ... on ClaimsList {
      claims {
        id
        reason
        user {
          firstName
          lastName
          account {
            email
          }
          avatar {
            storeUrl
          }
        }
        operator {
          averageScore
          location {
            address
            city
          }
          avatar {
            storeUrl
          }
          account {
            email
            user {
              firstName
              lastName
            }
          }
        }
        booking {
          id
          startDate
          endDate
          animalsIds
          priceWithOutApplicationFee
          applicationFeeAmount
          service {
            nameFr
            nameEn
          }
        }
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;

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
export function useGetBookingClaimsQuery(baseOptions?: Apollo.QueryHookOptions<GetBookingClaimsQuery, GetBookingClaimsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingClaimsQuery, GetBookingClaimsQueryVariables>(GetBookingClaimsDocument, options);
      }
export function useGetBookingClaimsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingClaimsQuery, GetBookingClaimsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingClaimsQuery, GetBookingClaimsQueryVariables>(GetBookingClaimsDocument, options);
        }
export type GetBookingClaimsQueryHookResult = ReturnType<typeof useGetBookingClaimsQuery>;
export type GetBookingClaimsLazyQueryHookResult = ReturnType<typeof useGetBookingClaimsLazyQuery>;
export type GetBookingClaimsQueryResult = Apollo.QueryResult<GetBookingClaimsQuery, GetBookingClaimsQueryVariables>;
export const GetBookingClaimByIdDocument = gql`
    query GetBookingClaimById($id: ID!) {
  claimById(id: $id) {
    ... on Claim {
      id
      reason
      user {
        firstName
        lastName
        account {
          email
        }
        avatar {
          storeUrl
        }
      }
      operator {
        averageScore
        location {
          address
          city
        }
        avatar {
          storeUrl
        }
        account {
          email
          user {
            firstName
            lastName
          }
        }
      }
      booking {
        id
        startDate
        endDate
        animalsIds
        priceWithOutApplicationFee
        applicationFeeAmount
        service {
          nameFr
          nameEn
        }
        messages {
          id
          content
          readAt
          ... on UserBookingMessage {
            userId
          }
          ... on OperatorBookingMessage {
            operatorId
          }
        }
      }
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;

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
export function useGetBookingClaimByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBookingClaimByIdQuery, GetBookingClaimByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBookingClaimByIdQuery, GetBookingClaimByIdQueryVariables>(GetBookingClaimByIdDocument, options);
      }
export function useGetBookingClaimByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBookingClaimByIdQuery, GetBookingClaimByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBookingClaimByIdQuery, GetBookingClaimByIdQueryVariables>(GetBookingClaimByIdDocument, options);
        }
export type GetBookingClaimByIdQueryHookResult = ReturnType<typeof useGetBookingClaimByIdQuery>;
export type GetBookingClaimByIdLazyQueryHookResult = ReturnType<typeof useGetBookingClaimByIdLazyQuery>;
export type GetBookingClaimByIdQueryResult = Apollo.QueryResult<GetBookingClaimByIdQuery, GetBookingClaimByIdQueryVariables>;
export const CurrentOperatorDonationsDocument = gql`
    query CurrentOperatorDonations {
  currentOperatorDonations {
    ... on DonationsList {
      donations {
        id
        amountToDonate
        donationDate
        partnerId
        booking {
          status
        }
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;

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
export function useCurrentOperatorDonationsQuery(baseOptions?: Apollo.QueryHookOptions<CurrentOperatorDonationsQuery, CurrentOperatorDonationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentOperatorDonationsQuery, CurrentOperatorDonationsQueryVariables>(CurrentOperatorDonationsDocument, options);
      }
export function useCurrentOperatorDonationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentOperatorDonationsQuery, CurrentOperatorDonationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentOperatorDonationsQuery, CurrentOperatorDonationsQueryVariables>(CurrentOperatorDonationsDocument, options);
        }
export type CurrentOperatorDonationsQueryHookResult = ReturnType<typeof useCurrentOperatorDonationsQuery>;
export type CurrentOperatorDonationsLazyQueryHookResult = ReturnType<typeof useCurrentOperatorDonationsLazyQuery>;
export type CurrentOperatorDonationsQueryResult = Apollo.QueryResult<CurrentOperatorDonationsQuery, CurrentOperatorDonationsQueryVariables>;
export const SearchDonationsDocument = gql`
    query SearchDonations($input: SearchDonationsInput!) {
  searchDonations(input: $input) {
    ... on DonationsList {
      donations {
        id
        amountToDonate
        donationDate
        partnerId
        createdAt
        updatedAt
        booking {
          status
        }
        partner {
          name
        }
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}`;

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
export function useSearchDonationsQuery(baseOptions: Apollo.QueryHookOptions<SearchDonationsQuery, SearchDonationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchDonationsQuery, SearchDonationsQueryVariables>(SearchDonationsDocument, options);
      }
export function useSearchDonationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchDonationsQuery, SearchDonationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchDonationsQuery, SearchDonationsQueryVariables>(SearchDonationsDocument, options);
        }
export type SearchDonationsQueryHookResult = ReturnType<typeof useSearchDonationsQuery>;
export type SearchDonationsLazyQueryHookResult = ReturnType<typeof useSearchDonationsLazyQuery>;
export type SearchDonationsQueryResult = Apollo.QueryResult<SearchDonationsQuery, SearchDonationsQueryVariables>;
export const CreateDonationReceiptDocument = gql`
    mutation CreateDonationReceipt($input: CreateDonationReceiptInput!) {
  createDonationReceipt(input: $input) {
    ... on DonationReceipt {
      id
      amountDonated
      createdAt
      updatedAt
      donations {
        id
      }
      files {
        storeUrl
      }
      partner {
        name
        medias {
          storeUrl
        }
      }
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type CreateDonationReceiptMutationFn = Apollo.MutationFunction<CreateDonationReceiptMutation, CreateDonationReceiptMutationVariables>;

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
export function useCreateDonationReceiptMutation(baseOptions?: Apollo.MutationHookOptions<CreateDonationReceiptMutation, CreateDonationReceiptMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDonationReceiptMutation, CreateDonationReceiptMutationVariables>(CreateDonationReceiptDocument, options);
      }
export type CreateDonationReceiptMutationHookResult = ReturnType<typeof useCreateDonationReceiptMutation>;
export type CreateDonationReceiptMutationResult = Apollo.MutationResult<CreateDonationReceiptMutation>;
export type CreateDonationReceiptMutationOptions = Apollo.BaseMutationOptions<CreateDonationReceiptMutation, CreateDonationReceiptMutationVariables>;
export const SearchDonationReceiptsDocument = gql`
    query SearchDonationReceipts($input: SearchDonationReceiptsInput!) {
  searchDonationReceipts(input: $input) {
    ... on DonationReceiptsList {
      donationReceipts {
        id
        amountDonated
        createdAt
        updatedAt
        files {
          storeUrl
        }
        partner {
          name
          medias {
            storeUrl
          }
        }
        donations {
          id
        }
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}`;

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
export function useSearchDonationReceiptsQuery(baseOptions: Apollo.QueryHookOptions<SearchDonationReceiptsQuery, SearchDonationReceiptsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchDonationReceiptsQuery, SearchDonationReceiptsQueryVariables>(SearchDonationReceiptsDocument, options);
      }
export function useSearchDonationReceiptsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchDonationReceiptsQuery, SearchDonationReceiptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchDonationReceiptsQuery, SearchDonationReceiptsQueryVariables>(SearchDonationReceiptsDocument, options);
        }
export type SearchDonationReceiptsQueryHookResult = ReturnType<typeof useSearchDonationReceiptsQuery>;
export type SearchDonationReceiptsLazyQueryHookResult = ReturnType<typeof useSearchDonationReceiptsLazyQuery>;
export type SearchDonationReceiptsQueryResult = Apollo.QueryResult<SearchDonationReceiptsQuery, SearchDonationReceiptsQueryVariables>;
export const CreateGenderOptionDocument = gql`
    mutation CreateGenderOption($input: CreateGenderOptionInput!) {
  createGenderOption(input: $input) {
    ... on GenderOption {
      id
      nameFr
      nameEn
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type CreateGenderOptionMutationFn = Apollo.MutationFunction<CreateGenderOptionMutation, CreateGenderOptionMutationVariables>;

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
export function useCreateGenderOptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateGenderOptionMutation, CreateGenderOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGenderOptionMutation, CreateGenderOptionMutationVariables>(CreateGenderOptionDocument, options);
      }
export type CreateGenderOptionMutationHookResult = ReturnType<typeof useCreateGenderOptionMutation>;
export type CreateGenderOptionMutationResult = Apollo.MutationResult<CreateGenderOptionMutation>;
export type CreateGenderOptionMutationOptions = Apollo.BaseMutationOptions<CreateGenderOptionMutation, CreateGenderOptionMutationVariables>;
export const UpdateGenderOptionDocument = gql`
    mutation UpdateGenderOption($id: ID!, $input: UpdateGenderOptionInput!) {
  updateGenderOption(id: $id, input: $input) {
    ... on GenderOption {
      id
      nameFr
      nameEn
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;
export type UpdateGenderOptionMutationFn = Apollo.MutationFunction<UpdateGenderOptionMutation, UpdateGenderOptionMutationVariables>;

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
export function useUpdateGenderOptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateGenderOptionMutation, UpdateGenderOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateGenderOptionMutation, UpdateGenderOptionMutationVariables>(UpdateGenderOptionDocument, options);
      }
export type UpdateGenderOptionMutationHookResult = ReturnType<typeof useUpdateGenderOptionMutation>;
export type UpdateGenderOptionMutationResult = Apollo.MutationResult<UpdateGenderOptionMutation>;
export type UpdateGenderOptionMutationOptions = Apollo.BaseMutationOptions<UpdateGenderOptionMutation, UpdateGenderOptionMutationVariables>;
export const DeleteGenderOptionDocument = gql`
    mutation DeleteGenderOption($id: ID!) {
  deleteGenderOption(id: $id) {
    ... on BooleanResult {
      success
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;
export type DeleteGenderOptionMutationFn = Apollo.MutationFunction<DeleteGenderOptionMutation, DeleteGenderOptionMutationVariables>;

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
export function useDeleteGenderOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteGenderOptionMutation, DeleteGenderOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteGenderOptionMutation, DeleteGenderOptionMutationVariables>(DeleteGenderOptionDocument, options);
      }
export type DeleteGenderOptionMutationHookResult = ReturnType<typeof useDeleteGenderOptionMutation>;
export type DeleteGenderOptionMutationResult = Apollo.MutationResult<DeleteGenderOptionMutation>;
export type DeleteGenderOptionMutationOptions = Apollo.BaseMutationOptions<DeleteGenderOptionMutation, DeleteGenderOptionMutationVariables>;
export const GetGendersOptionsDocument = gql`
    query GetGendersOptions {
  gendersOptions {
    ... on GenderOptionsList {
      genderOptions {
        id
        nameFr
        nameEn
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}`;

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
export function useGetGendersOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetGendersOptionsQuery, GetGendersOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGendersOptionsQuery, GetGendersOptionsQueryVariables>(GetGendersOptionsDocument, options);
      }
export function useGetGendersOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGendersOptionsQuery, GetGendersOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGendersOptionsQuery, GetGendersOptionsQueryVariables>(GetGendersOptionsDocument, options);
        }
export type GetGendersOptionsQueryHookResult = ReturnType<typeof useGetGendersOptionsQuery>;
export type GetGendersOptionsLazyQueryHookResult = ReturnType<typeof useGetGendersOptionsLazyQuery>;
export type GetGendersOptionsQueryResult = Apollo.QueryResult<GetGendersOptionsQuery, GetGendersOptionsQueryVariables>;
export const CreateHostingOptionDocument = gql`
    mutation CreateHostingOption($input: CreateHostingOptionInput!) {
  createHostingOption(input: $input) {
    ... on HostingOption {
      id
      nameFr
      nameEn
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type CreateHostingOptionMutationFn = Apollo.MutationFunction<CreateHostingOptionMutation, CreateHostingOptionMutationVariables>;

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
export function useCreateHostingOptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateHostingOptionMutation, CreateHostingOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHostingOptionMutation, CreateHostingOptionMutationVariables>(CreateHostingOptionDocument, options);
      }
export type CreateHostingOptionMutationHookResult = ReturnType<typeof useCreateHostingOptionMutation>;
export type CreateHostingOptionMutationResult = Apollo.MutationResult<CreateHostingOptionMutation>;
export type CreateHostingOptionMutationOptions = Apollo.BaseMutationOptions<CreateHostingOptionMutation, CreateHostingOptionMutationVariables>;
export const UpdateHostingOptionDocument = gql`
    mutation UpdateHostingOption($id: ID!, $input: UpdateHostingOptionInput!) {
  updateHostingOption(id: $id, input: $input) {
    ... on HostingOption {
      id
      nameFr
      nameEn
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;
export type UpdateHostingOptionMutationFn = Apollo.MutationFunction<UpdateHostingOptionMutation, UpdateHostingOptionMutationVariables>;

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
export function useUpdateHostingOptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHostingOptionMutation, UpdateHostingOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHostingOptionMutation, UpdateHostingOptionMutationVariables>(UpdateHostingOptionDocument, options);
      }
export type UpdateHostingOptionMutationHookResult = ReturnType<typeof useUpdateHostingOptionMutation>;
export type UpdateHostingOptionMutationResult = Apollo.MutationResult<UpdateHostingOptionMutation>;
export type UpdateHostingOptionMutationOptions = Apollo.BaseMutationOptions<UpdateHostingOptionMutation, UpdateHostingOptionMutationVariables>;
export const DeleteHostingOptionDocument = gql`
    mutation DeleteHostingOption($id: ID!) {
  deleteHostingOption(id: $id) {
    ... on BooleanResult {
      success
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;
export type DeleteHostingOptionMutationFn = Apollo.MutationFunction<DeleteHostingOptionMutation, DeleteHostingOptionMutationVariables>;

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
export function useDeleteHostingOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHostingOptionMutation, DeleteHostingOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteHostingOptionMutation, DeleteHostingOptionMutationVariables>(DeleteHostingOptionDocument, options);
      }
export type DeleteHostingOptionMutationHookResult = ReturnType<typeof useDeleteHostingOptionMutation>;
export type DeleteHostingOptionMutationResult = Apollo.MutationResult<DeleteHostingOptionMutation>;
export type DeleteHostingOptionMutationOptions = Apollo.BaseMutationOptions<DeleteHostingOptionMutation, DeleteHostingOptionMutationVariables>;
export const GetHostingsOptionsDocument = gql`
    query GetHostingsOptions {
  hostingsOptions {
    ... on HostingOptionsList {
      hostingOptions {
        id
        nameFr
        nameEn
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}`;

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
export function useGetHostingsOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetHostingsOptionsQuery, GetHostingsOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHostingsOptionsQuery, GetHostingsOptionsQueryVariables>(GetHostingsOptionsDocument, options);
      }
export function useGetHostingsOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHostingsOptionsQuery, GetHostingsOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHostingsOptionsQuery, GetHostingsOptionsQueryVariables>(GetHostingsOptionsDocument, options);
        }
export type GetHostingsOptionsQueryHookResult = ReturnType<typeof useGetHostingsOptionsQuery>;
export type GetHostingsOptionsLazyQueryHookResult = ReturnType<typeof useGetHostingsOptionsLazyQuery>;
export type GetHostingsOptionsQueryResult = Apollo.QueryResult<GetHostingsOptionsQuery, GetHostingsOptionsQueryVariables>;
export const CreateLanguageOptionDocument = gql`
    mutation CreateLanguageOption($input: CreateLanguageOptionInput!) {
  createLanguageOption(input: $input) {
    ... on LanguageOption {
      id
      nameFr
      nameEn
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type CreateLanguageOptionMutationFn = Apollo.MutationFunction<CreateLanguageOptionMutation, CreateLanguageOptionMutationVariables>;

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
export function useCreateLanguageOptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateLanguageOptionMutation, CreateLanguageOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateLanguageOptionMutation, CreateLanguageOptionMutationVariables>(CreateLanguageOptionDocument, options);
      }
export type CreateLanguageOptionMutationHookResult = ReturnType<typeof useCreateLanguageOptionMutation>;
export type CreateLanguageOptionMutationResult = Apollo.MutationResult<CreateLanguageOptionMutation>;
export type CreateLanguageOptionMutationOptions = Apollo.BaseMutationOptions<CreateLanguageOptionMutation, CreateLanguageOptionMutationVariables>;
export const UpdateLanguageOptionDocument = gql`
    mutation UpdateLanguageOption($id: ID!, $input: UpdateLanguageOptionInput!) {
  updateLanguageOption(id: $id, input: $input) {
    ... on LanguageOption {
      id
      nameFr
      nameEn
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;
export type UpdateLanguageOptionMutationFn = Apollo.MutationFunction<UpdateLanguageOptionMutation, UpdateLanguageOptionMutationVariables>;

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
export function useUpdateLanguageOptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateLanguageOptionMutation, UpdateLanguageOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateLanguageOptionMutation, UpdateLanguageOptionMutationVariables>(UpdateLanguageOptionDocument, options);
      }
export type UpdateLanguageOptionMutationHookResult = ReturnType<typeof useUpdateLanguageOptionMutation>;
export type UpdateLanguageOptionMutationResult = Apollo.MutationResult<UpdateLanguageOptionMutation>;
export type UpdateLanguageOptionMutationOptions = Apollo.BaseMutationOptions<UpdateLanguageOptionMutation, UpdateLanguageOptionMutationVariables>;
export const DeleteLanguageOptionDocument = gql`
    mutation DeleteLanguageOption($id: ID!) {
  deleteLanguageOption(id: $id) {
    ... on BooleanResult {
      success
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;
export type DeleteLanguageOptionMutationFn = Apollo.MutationFunction<DeleteLanguageOptionMutation, DeleteLanguageOptionMutationVariables>;

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
export function useDeleteLanguageOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLanguageOptionMutation, DeleteLanguageOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLanguageOptionMutation, DeleteLanguageOptionMutationVariables>(DeleteLanguageOptionDocument, options);
      }
export type DeleteLanguageOptionMutationHookResult = ReturnType<typeof useDeleteLanguageOptionMutation>;
export type DeleteLanguageOptionMutationResult = Apollo.MutationResult<DeleteLanguageOptionMutation>;
export type DeleteLanguageOptionMutationOptions = Apollo.BaseMutationOptions<DeleteLanguageOptionMutation, DeleteLanguageOptionMutationVariables>;
export const GetLanguagesOptionsDocument = gql`
    query GetLanguagesOptions {
  languagesOptions {
    ... on LanguageOptionsList {
      languageOptions {
        id
        nameFr
        nameEn
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}`;

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
export function useGetLanguagesOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetLanguagesOptionsQuery, GetLanguagesOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLanguagesOptionsQuery, GetLanguagesOptionsQueryVariables>(GetLanguagesOptionsDocument, options);
      }
export function useGetLanguagesOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLanguagesOptionsQuery, GetLanguagesOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLanguagesOptionsQuery, GetLanguagesOptionsQueryVariables>(GetLanguagesOptionsDocument, options);
        }
export type GetLanguagesOptionsQueryHookResult = ReturnType<typeof useGetLanguagesOptionsQuery>;
export type GetLanguagesOptionsLazyQueryHookResult = ReturnType<typeof useGetLanguagesOptionsLazyQuery>;
export type GetLanguagesOptionsQueryResult = Apollo.QueryResult<GetLanguagesOptionsQuery, GetLanguagesOptionsQueryVariables>;
export const LocationSearchDocument = gql`
    query LocationSearch($query: String!, $locale: String!) {
  locationSearch(query: $query, locale: $locale) {
    ... on LocationsList {
      locations {
        id
        formattedLocationString
        locale_names
        postcode
        city
        country
        country_code
        latitude
        longitude
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}`;

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
export function useLocationSearchQuery(baseOptions: Apollo.QueryHookOptions<LocationSearchQuery, LocationSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LocationSearchQuery, LocationSearchQueryVariables>(LocationSearchDocument, options);
      }
export function useLocationSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LocationSearchQuery, LocationSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LocationSearchQuery, LocationSearchQueryVariables>(LocationSearchDocument, options);
        }
export type LocationSearchQueryHookResult = ReturnType<typeof useLocationSearchQuery>;
export type LocationSearchLazyQueryHookResult = ReturnType<typeof useLocationSearchLazyQuery>;
export type LocationSearchQueryResult = Apollo.QueryResult<LocationSearchQuery, LocationSearchQueryVariables>;
export const CreateMediaDocument = gql`
    mutation CreateMedia($input: CreateMediaInput!) {
  createMedia(input: $input) {
    ... on StorageInfos {
      signedRequest
      url
      mediaId
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}`;
export type CreateMediaMutationFn = Apollo.MutationFunction<CreateMediaMutation, CreateMediaMutationVariables>;

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
export function useCreateMediaMutation(baseOptions?: Apollo.MutationHookOptions<CreateMediaMutation, CreateMediaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMediaMutation, CreateMediaMutationVariables>(CreateMediaDocument, options);
      }
export type CreateMediaMutationHookResult = ReturnType<typeof useCreateMediaMutation>;
export type CreateMediaMutationResult = Apollo.MutationResult<CreateMediaMutation>;
export type CreateMediaMutationOptions = Apollo.BaseMutationOptions<CreateMediaMutation, CreateMediaMutationVariables>;
export const SetMediaAsAvatarDocument = gql`
    mutation SetMediaAsAvatar($id: ID!) {
  setMediaAsAvatar(id: $id) {
    ... on BooleanResult {
      success
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;
export type SetMediaAsAvatarMutationFn = Apollo.MutationFunction<SetMediaAsAvatarMutation, SetMediaAsAvatarMutationVariables>;

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
export function useSetMediaAsAvatarMutation(baseOptions?: Apollo.MutationHookOptions<SetMediaAsAvatarMutation, SetMediaAsAvatarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetMediaAsAvatarMutation, SetMediaAsAvatarMutationVariables>(SetMediaAsAvatarDocument, options);
      }
export type SetMediaAsAvatarMutationHookResult = ReturnType<typeof useSetMediaAsAvatarMutation>;
export type SetMediaAsAvatarMutationResult = Apollo.MutationResult<SetMediaAsAvatarMutation>;
export type SetMediaAsAvatarMutationOptions = Apollo.BaseMutationOptions<SetMediaAsAvatarMutation, SetMediaAsAvatarMutationVariables>;
export const DeleteMediaDocument = gql`
    mutation DeleteMedia($id: ID!) {
  deleteMedia(id: $id) {
    ... on BooleanResult {
      success
    }
    ... on IsActiveOperatorWithNoReplacementMediaError {
      activeOperatorWithNoReplacementMediaError
    }
    ... on IsActiveOperatorMainMediaError {
      activeOperatorMainMediaError
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;
export type DeleteMediaMutationFn = Apollo.MutationFunction<DeleteMediaMutation, DeleteMediaMutationVariables>;

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
export function useDeleteMediaMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMediaMutation, DeleteMediaMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteMediaMutation, DeleteMediaMutationVariables>(DeleteMediaDocument, options);
      }
export type DeleteMediaMutationHookResult = ReturnType<typeof useDeleteMediaMutation>;
export type DeleteMediaMutationResult = Apollo.MutationResult<DeleteMediaMutation>;
export type DeleteMediaMutationOptions = Apollo.BaseMutationOptions<DeleteMediaMutation, DeleteMediaMutationVariables>;
export const CreateMessageDocument = gql`
    mutation CreateMessage($input: CreateMessageInput!) {
  createMessage(input: $input) {
    ... on UserBookingMessage {
      ...MessageFields
    }
    ... on OperatorBookingMessage {
      ...MessageFields
    }
    ... on StaffBookingMessage {
      ...MessageFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${MessageFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type CreateMessageMutationFn = Apollo.MutationFunction<CreateMessageMutation, CreateMessageMutationVariables>;

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
export function useCreateMessageMutation(baseOptions?: Apollo.MutationHookOptions<CreateMessageMutation, CreateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateMessageMutation, CreateMessageMutationVariables>(CreateMessageDocument, options);
      }
export type CreateMessageMutationHookResult = ReturnType<typeof useCreateMessageMutation>;
export type CreateMessageMutationResult = Apollo.MutationResult<CreateMessageMutation>;
export type CreateMessageMutationOptions = Apollo.BaseMutationOptions<CreateMessageMutation, CreateMessageMutationVariables>;
export const UpdateMessageDocument = gql`
    mutation UpdateMessage($id: ID!, $input: UpdateMessageInput!) {
  updateMessage(id: $id, input: $input) {
    ... on UserBookingMessage {
      ...MessageFields
    }
    ... on OperatorBookingMessage {
      ...MessageFields
    }
    ... on StaffBookingMessage {
      ...MessageFields
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${MessageFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;
export type UpdateMessageMutationFn = Apollo.MutationFunction<UpdateMessageMutation, UpdateMessageMutationVariables>;

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
export function useUpdateMessageMutation(baseOptions?: Apollo.MutationHookOptions<UpdateMessageMutation, UpdateMessageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateMessageMutation, UpdateMessageMutationVariables>(UpdateMessageDocument, options);
      }
export type UpdateMessageMutationHookResult = ReturnType<typeof useUpdateMessageMutation>;
export type UpdateMessageMutationResult = Apollo.MutationResult<UpdateMessageMutation>;
export type UpdateMessageMutationOptions = Apollo.BaseMutationOptions<UpdateMessageMutation, UpdateMessageMutationVariables>;
export const SetAsReadDocument = gql`
    mutation SetAsRead($input: SetMessagesAsReadInput!) {
  setAsRead(input: $input) {
    ... on BooleanResult {
      success
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}`;
export type SetAsReadMutationFn = Apollo.MutationFunction<SetAsReadMutation, SetAsReadMutationVariables>;

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
export function useSetAsReadMutation(baseOptions?: Apollo.MutationHookOptions<SetAsReadMutation, SetAsReadMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetAsReadMutation, SetAsReadMutationVariables>(SetAsReadDocument, options);
      }
export type SetAsReadMutationHookResult = ReturnType<typeof useSetAsReadMutation>;
export type SetAsReadMutationResult = Apollo.MutationResult<SetAsReadMutation>;
export type SetAsReadMutationOptions = Apollo.BaseMutationOptions<SetAsReadMutation, SetAsReadMutationVariables>;
export const MessagesByBookingIdDocument = gql`
    query MessagesByBookingId($id: ID!) {
  messagesByBookingId(id: $id) {
    ... on MessagesList {
      messages {
        ...MessageFields
        content
      }
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${MessageFieldsFragmentDoc}
${InvalidArgumentsFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;

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
export function useMessagesByBookingIdQuery(baseOptions: Apollo.QueryHookOptions<MessagesByBookingIdQuery, MessagesByBookingIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesByBookingIdQuery, MessagesByBookingIdQueryVariables>(MessagesByBookingIdDocument, options);
      }
export function useMessagesByBookingIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesByBookingIdQuery, MessagesByBookingIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesByBookingIdQuery, MessagesByBookingIdQueryVariables>(MessagesByBookingIdDocument, options);
        }
export type MessagesByBookingIdQueryHookResult = ReturnType<typeof useMessagesByBookingIdQuery>;
export type MessagesByBookingIdLazyQueryHookResult = ReturnType<typeof useMessagesByBookingIdLazyQuery>;
export type MessagesByBookingIdQueryResult = Apollo.QueryResult<MessagesByBookingIdQuery, MessagesByBookingIdQueryVariables>;
export const CreateIndividualOperatorDocument = gql`
    mutation CreateIndividualOperator($input: CreateIndividualOperatorInput!) {
  createIndividualOperator(input: $input) {
    ... on IndividualOperator {
      id
      description
      birthDate
      genderOptionId
      hostingOptionId
      languageOptionIds
      acceptedSpecieOptionsIds
      ownAnimalsSpecieOptionsIds
      partnerId
      partnerPercentage
      avatar {
        storeUrl
      }
      account {
        user {
          firstName
          lastName
        }
      }
      location {
        address
        city
        country
        country_code
        postcode
        latitude
        longitude
      }
      availabilities {
        id
        date
      }
      coreServices {
        serviceOptionId
        price
      }
      extraServices {
        atHomeExclusivity
        atHomeExclusivityExtraPrice
        atHomeContinuously
        atHomeContinuouslyExtraPrice
        atHomeOnlyBringPet
        atHomeOnlyBringPetExtraPrice
        atHomeComeGetPet
        atHomeComeGetPetExtraPrice
        atOwnerHomePlantsCare
        atOwnerHomePlantsCareExtraPrice
        atOwnerHomeMail
        atOwnerHomeMailExtraPrice
        atOwnerHomeCurtains
        atOwnerHomeCurtainsExtraPrice
        acceptShortNotice
        flexibleCancelation
        isProfessionalOperator
        abilityToProvideMedicalCare
      }
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}`;
export type CreateIndividualOperatorMutationFn = Apollo.MutationFunction<CreateIndividualOperatorMutation, CreateIndividualOperatorMutationVariables>;

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
export function useCreateIndividualOperatorMutation(baseOptions?: Apollo.MutationHookOptions<CreateIndividualOperatorMutation, CreateIndividualOperatorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateIndividualOperatorMutation, CreateIndividualOperatorMutationVariables>(CreateIndividualOperatorDocument, options);
      }
export type CreateIndividualOperatorMutationHookResult = ReturnType<typeof useCreateIndividualOperatorMutation>;
export type CreateIndividualOperatorMutationResult = Apollo.MutationResult<CreateIndividualOperatorMutation>;
export type CreateIndividualOperatorMutationOptions = Apollo.BaseMutationOptions<CreateIndividualOperatorMutation, CreateIndividualOperatorMutationVariables>;
export const UpdateIndividualOperatorDocument = gql`
    mutation UpdateIndividualOperator($input: UpdateIndividualOperatorInput!) {
  updateIndividualOperator(input: $input) {
    ... on IndividualOperator {
      id
      description
      birthDate
      genderOptionId
      hostingOptionId
      languageOptionIds
      acceptedSpecieOptionsIds
      ownAnimalsSpecieOptionsIds
      partnerId
      partnerPercentage
      avatar {
        storeUrl
      }
      account {
        user {
          firstName
          lastName
        }
      }
      location {
        address
        city
        country
        country_code
        postcode
        latitude
        longitude
      }
      availabilities {
        id
        date
      }
      coreServices {
        serviceOptionId
        price
      }
      extraServices {
        atHomeExclusivity
        atHomeExclusivityExtraPrice
        atHomeContinuously
        atHomeContinuouslyExtraPrice
        atHomeOnlyBringPet
        atHomeOnlyBringPetExtraPrice
        atHomeComeGetPet
        atHomeComeGetPetExtraPrice
        atOwnerHomePlantsCare
        atOwnerHomePlantsCareExtraPrice
        atOwnerHomeMail
        atOwnerHomeMailExtraPrice
        atOwnerHomeCurtains
        atOwnerHomeCurtainsExtraPrice
        acceptShortNotice
        flexibleCancelation
        isProfessionalOperator
        abilityToProvideMedicalCare
      }
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;
export type UpdateIndividualOperatorMutationFn = Apollo.MutationFunction<UpdateIndividualOperatorMutation, UpdateIndividualOperatorMutationVariables>;

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
export function useUpdateIndividualOperatorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateIndividualOperatorMutation, UpdateIndividualOperatorMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateIndividualOperatorMutation, UpdateIndividualOperatorMutationVariables>(UpdateIndividualOperatorDocument, options);
      }
export type UpdateIndividualOperatorMutationHookResult = ReturnType<typeof useUpdateIndividualOperatorMutation>;
export type UpdateIndividualOperatorMutationResult = Apollo.MutationResult<UpdateIndividualOperatorMutation>;
export type UpdateIndividualOperatorMutationOptions = Apollo.BaseMutationOptions<UpdateIndividualOperatorMutation, UpdateIndividualOperatorMutationVariables>;
export const CurrentOperatorDocument = gql`
    query CurrentOperator {
  currentOperator {
    ... on IndividualOperator {
      id
      description
      birthDate
      genderOptionId
      hostingOptionId
      languageOptionIds
      acceptedSpecieOptionsIds
      ownAnimalsSpecieOptionsIds
      partnerId
      partnerPercentage
      avatar {
        storeUrl
      }
      account {
        user {
          firstName
          lastName
        }
      }
      location {
        address
        city
        country
        country_code
        postcode
        latitude
        longitude
      }
      availabilities {
        id
        date
      }
      coreServices {
        serviceOptionId
        price
      }
      extraServices {
        atHomeExclusivity
        atHomeExclusivityExtraPrice
        atHomeContinuously
        atHomeContinuouslyExtraPrice
        atHomeOnlyBringPet
        atHomeOnlyBringPetExtraPrice
        atHomeComeGetPet
        atHomeComeGetPetExtraPrice
        atOwnerHomePlantsCare
        atOwnerHomePlantsCareExtraPrice
        atOwnerHomeMail
        atOwnerHomeMailExtraPrice
        atOwnerHomeCurtains
        atOwnerHomeCurtainsExtraPrice
        acceptShortNotice
        flexibleCancelation
        isProfessionalOperator
        abilityToProvideMedicalCare
      }
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;

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
export function useCurrentOperatorQuery(baseOptions?: Apollo.QueryHookOptions<CurrentOperatorQuery, CurrentOperatorQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentOperatorQuery, CurrentOperatorQueryVariables>(CurrentOperatorDocument, options);
      }
export function useCurrentOperatorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentOperatorQuery, CurrentOperatorQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentOperatorQuery, CurrentOperatorQueryVariables>(CurrentOperatorDocument, options);
        }
export type CurrentOperatorQueryHookResult = ReturnType<typeof useCurrentOperatorQuery>;
export type CurrentOperatorLazyQueryHookResult = ReturnType<typeof useCurrentOperatorLazyQuery>;
export type CurrentOperatorQueryResult = Apollo.QueryResult<CurrentOperatorQuery, CurrentOperatorQueryVariables>;
export const OperatorByIdDocument = gql`
    query OperatorById($id: ID!) {
  operatorById(id: $id) {
    ... on IndividualOperator {
      id
      description
      genderOptionId
      hostingOptionId
      languageOptionIds
      acceptedSpecieOptionsIds
      ownAnimalsSpecieOptionsIds
      averageScore
      averageResponseTime
      partnerId
      partnerPercentage
      account {
        user {
          firstName
        }
      }
      avatar {
        storeUrl
      }
      medias {
        storeUrl
      }
      location {
        city
        country
        latitude
        longitude
      }
      coreServices {
        serviceOptionId
        price
      }
      extraServices {
        atHomeExclusivity
        atHomeExclusivityExtraPrice
        atHomeContinuously
        atHomeContinuouslyExtraPrice
        atHomeOnlyBringPet
        atHomeOnlyBringPetExtraPrice
        atHomeComeGetPet
        atHomeComeGetPetExtraPrice
        atOwnerHomePlantsCare
        atOwnerHomePlantsCareExtraPrice
        atOwnerHomeMail
        atOwnerHomeMailExtraPrice
        atOwnerHomeCurtains
        atOwnerHomeCurtainsExtraPrice
        acceptShortNotice
        flexibleCancelation
        isProfessionalOperator
        abilityToProvideMedicalCare
      }
      availabilities {
        id
        date
      }
      reviews {
        id
        createdAt
        score
        title
        body
        ... on UserReview {
          user {
            firstName
            avatar {
              storeUrl
            }
          }
        }
      }
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}`;

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
export function useOperatorByIdQuery(baseOptions: Apollo.QueryHookOptions<OperatorByIdQuery, OperatorByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OperatorByIdQuery, OperatorByIdQueryVariables>(OperatorByIdDocument, options);
      }
export function useOperatorByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OperatorByIdQuery, OperatorByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OperatorByIdQuery, OperatorByIdQueryVariables>(OperatorByIdDocument, options);
        }
export type OperatorByIdQueryHookResult = ReturnType<typeof useOperatorByIdQuery>;
export type OperatorByIdLazyQueryHookResult = ReturnType<typeof useOperatorByIdLazyQuery>;
export type OperatorByIdQueryResult = Apollo.QueryResult<OperatorByIdQuery, OperatorByIdQueryVariables>;
export const OperatorBookingInfosByIdDocument = gql`
    query OperatorBookingInfosById($id: ID!) {
  operatorById(id: $id) {
    ... on IndividualOperator {
      id
      hostingOptionId
      averageScore
      avatar {
        storeUrl
      }
      account {
        user {
          firstName
        }
      }
      location {
        city
        postcode
      }
      availabilities {
        id
        date
      }
      coreServices {
        serviceOptionId
        price
      }
      extraServices {
        atHomeExclusivity
        atHomeExclusivityExtraPrice
        atHomeContinuously
        atHomeContinuouslyExtraPrice
        atHomeOnlyBringPet
        atHomeOnlyBringPetExtraPrice
        atHomeComeGetPet
        atHomeComeGetPetExtraPrice
        atOwnerHomePlantsCare
        atOwnerHomePlantsCareExtraPrice
        atOwnerHomeMail
        atOwnerHomeMailExtraPrice
        atOwnerHomeCurtains
        atOwnerHomeCurtainsExtraPrice
        acceptShortNotice
        flexibleCancelation
        isProfessionalOperator
        abilityToProvideMedicalCare
      }
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}`;

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
export function useOperatorBookingInfosByIdQuery(baseOptions: Apollo.QueryHookOptions<OperatorBookingInfosByIdQuery, OperatorBookingInfosByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OperatorBookingInfosByIdQuery, OperatorBookingInfosByIdQueryVariables>(OperatorBookingInfosByIdDocument, options);
      }
export function useOperatorBookingInfosByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OperatorBookingInfosByIdQuery, OperatorBookingInfosByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OperatorBookingInfosByIdQuery, OperatorBookingInfosByIdQueryVariables>(OperatorBookingInfosByIdDocument, options);
        }
export type OperatorBookingInfosByIdQueryHookResult = ReturnType<typeof useOperatorBookingInfosByIdQuery>;
export type OperatorBookingInfosByIdLazyQueryHookResult = ReturnType<typeof useOperatorBookingInfosByIdLazyQuery>;
export type OperatorBookingInfosByIdQueryResult = Apollo.QueryResult<OperatorBookingInfosByIdQuery, OperatorBookingInfosByIdQueryVariables>;
export const CurrentOperatorMediasDocument = gql`
    query CurrentOperatorMedias {
  currentOperator {
    ... on IndividualOperator {
      avatar {
        id
        storeUrl
      }
      medias {
        id
        storeUrl
      }
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;

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
export function useCurrentOperatorMediasQuery(baseOptions?: Apollo.QueryHookOptions<CurrentOperatorMediasQuery, CurrentOperatorMediasQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentOperatorMediasQuery, CurrentOperatorMediasQueryVariables>(CurrentOperatorMediasDocument, options);
      }
export function useCurrentOperatorMediasLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentOperatorMediasQuery, CurrentOperatorMediasQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentOperatorMediasQuery, CurrentOperatorMediasQueryVariables>(CurrentOperatorMediasDocument, options);
        }
export type CurrentOperatorMediasQueryHookResult = ReturnType<typeof useCurrentOperatorMediasQuery>;
export type CurrentOperatorMediasLazyQueryHookResult = ReturnType<typeof useCurrentOperatorMediasLazyQuery>;
export type CurrentOperatorMediasQueryResult = Apollo.QueryResult<CurrentOperatorMediasQuery, CurrentOperatorMediasQueryVariables>;
export const CurrentOperatorBookingInfosDocument = gql`
    query CurrentOperatorBookingInfos {
  currentOperator {
    ... on IndividualOperator {
      acceptedSpecieOptionsIds
      ownAnimalsSpecieOptionsIds
      location {
        latitude
        longitude
      }
      availabilities {
        id
        date
      }
      coreServices {
        serviceOptionId
        price
      }
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;

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
export function useCurrentOperatorBookingInfosQuery(baseOptions?: Apollo.QueryHookOptions<CurrentOperatorBookingInfosQuery, CurrentOperatorBookingInfosQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentOperatorBookingInfosQuery, CurrentOperatorBookingInfosQueryVariables>(CurrentOperatorBookingInfosDocument, options);
      }
export function useCurrentOperatorBookingInfosLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentOperatorBookingInfosQuery, CurrentOperatorBookingInfosQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentOperatorBookingInfosQuery, CurrentOperatorBookingInfosQueryVariables>(CurrentOperatorBookingInfosDocument, options);
        }
export type CurrentOperatorBookingInfosQueryHookResult = ReturnType<typeof useCurrentOperatorBookingInfosQuery>;
export type CurrentOperatorBookingInfosLazyQueryHookResult = ReturnType<typeof useCurrentOperatorBookingInfosLazyQuery>;
export type CurrentOperatorBookingInfosQueryResult = Apollo.QueryResult<CurrentOperatorBookingInfosQuery, CurrentOperatorBookingInfosQueryVariables>;
export const SearchOperatorsDocument = gql`
    query SearchOperators($input: SearchOperatorsInput!) {
  searchOperators(input: $input) {
    ... on Operators {
      operators {
        id
        hostingOptionId
        genderOptionId
        languageOptionIds
        averageScore
        averageResponseTime
        calendarUpdate
        partnerId
        partnerPercentage
        avatar {
          storeUrl
        }
        location {
          city
          postcode
          latitude
          longitude
        }
        coreServices {
          serviceOptionId
          price
        }
        extraServices {
          atHomeExclusivity
          atHomeExclusivityExtraPrice
          atHomeContinuously
          atHomeContinuouslyExtraPrice
          atHomeOnlyBringPet
          atHomeOnlyBringPetExtraPrice
          atHomeComeGetPet
          atHomeComeGetPetExtraPrice
          atOwnerHomePlantsCare
          atOwnerHomePlantsCareExtraPrice
          atOwnerHomeMail
          atOwnerHomeMailExtraPrice
          atOwnerHomeCurtains
          atOwnerHomeCurtainsExtraPrice
          acceptShortNotice
          flexibleCancelation
          isProfessionalOperator
          abilityToProvideMedicalCare
        }
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}`;

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
export function useSearchOperatorsQuery(baseOptions: Apollo.QueryHookOptions<SearchOperatorsQuery, SearchOperatorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchOperatorsQuery, SearchOperatorsQueryVariables>(SearchOperatorsDocument, options);
      }
export function useSearchOperatorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchOperatorsQuery, SearchOperatorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchOperatorsQuery, SearchOperatorsQueryVariables>(SearchOperatorsDocument, options);
        }
export type SearchOperatorsQueryHookResult = ReturnType<typeof useSearchOperatorsQuery>;
export type SearchOperatorsLazyQueryHookResult = ReturnType<typeof useSearchOperatorsLazyQuery>;
export type SearchOperatorsQueryResult = Apollo.QueryResult<SearchOperatorsQuery, SearchOperatorsQueryVariables>;
export const AllOperatorsDocument = gql`
    query AllOperators {
  allOperators {
    ... on Operators {
      operators {
        id
        updatedAt
      }
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;

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
export function useAllOperatorsQuery(baseOptions?: Apollo.QueryHookOptions<AllOperatorsQuery, AllOperatorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllOperatorsQuery, AllOperatorsQueryVariables>(AllOperatorsDocument, options);
      }
export function useAllOperatorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllOperatorsQuery, AllOperatorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllOperatorsQuery, AllOperatorsQueryVariables>(AllOperatorsDocument, options);
        }
export type AllOperatorsQueryHookResult = ReturnType<typeof useAllOperatorsQuery>;
export type AllOperatorsLazyQueryHookResult = ReturnType<typeof useAllOperatorsLazyQuery>;
export type AllOperatorsQueryResult = Apollo.QueryResult<AllOperatorsQuery, AllOperatorsQueryVariables>;
export const CreatePartnerDocument = gql`
    mutation CreatePartner($input: CreatePartnerInput!) {
  createPartner(input: $input) {
    ... on Partner {
      id
      name
      description
      websiteUrl
      medias {
        id
        storeUrl
      }
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type CreatePartnerMutationFn = Apollo.MutationFunction<CreatePartnerMutation, CreatePartnerMutationVariables>;

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
export function useCreatePartnerMutation(baseOptions?: Apollo.MutationHookOptions<CreatePartnerMutation, CreatePartnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePartnerMutation, CreatePartnerMutationVariables>(CreatePartnerDocument, options);
      }
export type CreatePartnerMutationHookResult = ReturnType<typeof useCreatePartnerMutation>;
export type CreatePartnerMutationResult = Apollo.MutationResult<CreatePartnerMutation>;
export type CreatePartnerMutationOptions = Apollo.BaseMutationOptions<CreatePartnerMutation, CreatePartnerMutationVariables>;
export const UpdatePartnerDocument = gql`
    mutation UpdatePartner($id: ID!, $input: UpdatePartnerInput!) {
  updatePartner(id: $id, input: $input) {
    ... on Partner {
      id
      name
      description
      websiteUrl
      medias {
        id
        storeUrl
      }
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type UpdatePartnerMutationFn = Apollo.MutationFunction<UpdatePartnerMutation, UpdatePartnerMutationVariables>;

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
export function useUpdatePartnerMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePartnerMutation, UpdatePartnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePartnerMutation, UpdatePartnerMutationVariables>(UpdatePartnerDocument, options);
      }
export type UpdatePartnerMutationHookResult = ReturnType<typeof useUpdatePartnerMutation>;
export type UpdatePartnerMutationResult = Apollo.MutationResult<UpdatePartnerMutation>;
export type UpdatePartnerMutationOptions = Apollo.BaseMutationOptions<UpdatePartnerMutation, UpdatePartnerMutationVariables>;
export const DeletePartnerDocument = gql`
    mutation DeletePartner($id: ID!) {
  deletePartner(id: $id) {
    ... on BooleanResult {
      success
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;
export type DeletePartnerMutationFn = Apollo.MutationFunction<DeletePartnerMutation, DeletePartnerMutationVariables>;

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
export function useDeletePartnerMutation(baseOptions?: Apollo.MutationHookOptions<DeletePartnerMutation, DeletePartnerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePartnerMutation, DeletePartnerMutationVariables>(DeletePartnerDocument, options);
      }
export type DeletePartnerMutationHookResult = ReturnType<typeof useDeletePartnerMutation>;
export type DeletePartnerMutationResult = Apollo.MutationResult<DeletePartnerMutation>;
export type DeletePartnerMutationOptions = Apollo.BaseMutationOptions<DeletePartnerMutation, DeletePartnerMutationVariables>;
export const GetPartnersDocument = gql`
    query GetPartners {
  partners {
    ... on PartnersList {
      partners {
        id
        name
        description
        websiteUrl
        medias {
          id
          storeUrl
        }
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}`;

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
export function useGetPartnersQuery(baseOptions?: Apollo.QueryHookOptions<GetPartnersQuery, GetPartnersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartnersQuery, GetPartnersQueryVariables>(GetPartnersDocument, options);
      }
export function useGetPartnersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnersQuery, GetPartnersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartnersQuery, GetPartnersQueryVariables>(GetPartnersDocument, options);
        }
export type GetPartnersQueryHookResult = ReturnType<typeof useGetPartnersQuery>;
export type GetPartnersLazyQueryHookResult = ReturnType<typeof useGetPartnersLazyQuery>;
export type GetPartnersQueryResult = Apollo.QueryResult<GetPartnersQuery, GetPartnersQueryVariables>;
export const GetPartnerByIdDocument = gql`
    query GetPartnerById($id: ID!) {
  partnerById(id: $id) {
    ... on Partner {
      id
      name
      description
      websiteUrl
      receipts {
        id
        createdAt
        amountDonated
        files {
          id
          storeUrl
        }
        donations {
          id
          createdAt
          amountToDonate
          operator {
            account {
              user {
                firstName
              }
            }
            avatar {
              storeUrl
            }
          }
        }
      }
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${NotFoundFieldsFragmentDoc}`;

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
export function useGetPartnerByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPartnerByIdQuery, GetPartnerByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartnerByIdQuery, GetPartnerByIdQueryVariables>(GetPartnerByIdDocument, options);
      }
export function useGetPartnerByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnerByIdQuery, GetPartnerByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartnerByIdQuery, GetPartnerByIdQueryVariables>(GetPartnerByIdDocument, options);
        }
export type GetPartnerByIdQueryHookResult = ReturnType<typeof useGetPartnerByIdQuery>;
export type GetPartnerByIdLazyQueryHookResult = ReturnType<typeof useGetPartnerByIdLazyQuery>;
export type GetPartnerByIdQueryResult = Apollo.QueryResult<GetPartnerByIdQuery, GetPartnerByIdQueryVariables>;
export const GetPartnersIdsDocument = gql`
    query GetPartnersIds {
  partners {
    ... on PartnersList {
      partners {
        id
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}`;

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
export function useGetPartnersIdsQuery(baseOptions?: Apollo.QueryHookOptions<GetPartnersIdsQuery, GetPartnersIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartnersIdsQuery, GetPartnersIdsQueryVariables>(GetPartnersIdsDocument, options);
      }
export function useGetPartnersIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnersIdsQuery, GetPartnersIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartnersIdsQuery, GetPartnersIdsQueryVariables>(GetPartnersIdsDocument, options);
        }
export type GetPartnersIdsQueryHookResult = ReturnType<typeof useGetPartnersIdsQuery>;
export type GetPartnersIdsLazyQueryHookResult = ReturnType<typeof useGetPartnersIdsLazyQuery>;
export type GetPartnersIdsQueryResult = Apollo.QueryResult<GetPartnersIdsQuery, GetPartnersIdsQueryVariables>;
export const GetPartnersWithReceiptsDocument = gql`
    query GetPartnersWithReceipts {
  partners {
    ... on PartnersList {
      partners {
        id
        name
        description
        websiteUrl
        medias {
          id
          storeUrl
        }
        receipts {
          id
          amountDonated
          donations {
            id
          }
        }
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}`;

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
export function useGetPartnersWithReceiptsQuery(baseOptions?: Apollo.QueryHookOptions<GetPartnersWithReceiptsQuery, GetPartnersWithReceiptsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartnersWithReceiptsQuery, GetPartnersWithReceiptsQueryVariables>(GetPartnersWithReceiptsDocument, options);
      }
export function useGetPartnersWithReceiptsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnersWithReceiptsQuery, GetPartnersWithReceiptsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartnersWithReceiptsQuery, GetPartnersWithReceiptsQueryVariables>(GetPartnersWithReceiptsDocument, options);
        }
export type GetPartnersWithReceiptsQueryHookResult = ReturnType<typeof useGetPartnersWithReceiptsQuery>;
export type GetPartnersWithReceiptsLazyQueryHookResult = ReturnType<typeof useGetPartnersWithReceiptsLazyQuery>;
export type GetPartnersWithReceiptsQueryResult = Apollo.QueryResult<GetPartnersWithReceiptsQuery, GetPartnersWithReceiptsQueryVariables>;
export const CreateReviewDocument = gql`
    mutation CreateReview($input: CreateReviewInput!) {
  createReview(input: $input) {
    ... on UserReview {
      id
    }
    ... on OperatorReview {
      id
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UserAuthFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type CreateReviewMutationFn = Apollo.MutationFunction<CreateReviewMutation, CreateReviewMutationVariables>;

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
export function useCreateReviewMutation(baseOptions?: Apollo.MutationHookOptions<CreateReviewMutation, CreateReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReviewMutation, CreateReviewMutationVariables>(CreateReviewDocument, options);
      }
export type CreateReviewMutationHookResult = ReturnType<typeof useCreateReviewMutation>;
export type CreateReviewMutationResult = Apollo.MutationResult<CreateReviewMutation>;
export type CreateReviewMutationOptions = Apollo.BaseMutationOptions<CreateReviewMutation, CreateReviewMutationVariables>;
export const CreateServiceOptionDocument = gql`
    mutation CreateServiceOption($input: CreateServiceOptionInput!) {
  createServiceOption(input: $input) {
    ... on ServiceOption {
      id
      nameFr
      nameEn
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type CreateServiceOptionMutationFn = Apollo.MutationFunction<CreateServiceOptionMutation, CreateServiceOptionMutationVariables>;

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
export function useCreateServiceOptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateServiceOptionMutation, CreateServiceOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServiceOptionMutation, CreateServiceOptionMutationVariables>(CreateServiceOptionDocument, options);
      }
export type CreateServiceOptionMutationHookResult = ReturnType<typeof useCreateServiceOptionMutation>;
export type CreateServiceOptionMutationResult = Apollo.MutationResult<CreateServiceOptionMutation>;
export type CreateServiceOptionMutationOptions = Apollo.BaseMutationOptions<CreateServiceOptionMutation, CreateServiceOptionMutationVariables>;
export const UpdateServiceOptionDocument = gql`
    mutation UpdateServiceOption($id: ID!, $input: UpdateServiceOptionInput!) {
  updateServiceOption(id: $id, input: $input) {
    ... on ServiceOption {
      id
      nameFr
      nameEn
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;
export type UpdateServiceOptionMutationFn = Apollo.MutationFunction<UpdateServiceOptionMutation, UpdateServiceOptionMutationVariables>;

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
export function useUpdateServiceOptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateServiceOptionMutation, UpdateServiceOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateServiceOptionMutation, UpdateServiceOptionMutationVariables>(UpdateServiceOptionDocument, options);
      }
export type UpdateServiceOptionMutationHookResult = ReturnType<typeof useUpdateServiceOptionMutation>;
export type UpdateServiceOptionMutationResult = Apollo.MutationResult<UpdateServiceOptionMutation>;
export type UpdateServiceOptionMutationOptions = Apollo.BaseMutationOptions<UpdateServiceOptionMutation, UpdateServiceOptionMutationVariables>;
export const DeleteServiceOptionDocument = gql`
    mutation DeleteServiceOption($id: ID!) {
  deleteServiceOption(id: $id) {
    ... on BooleanResult {
      success
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;
export type DeleteServiceOptionMutationFn = Apollo.MutationFunction<DeleteServiceOptionMutation, DeleteServiceOptionMutationVariables>;

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
export function useDeleteServiceOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteServiceOptionMutation, DeleteServiceOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteServiceOptionMutation, DeleteServiceOptionMutationVariables>(DeleteServiceOptionDocument, options);
      }
export type DeleteServiceOptionMutationHookResult = ReturnType<typeof useDeleteServiceOptionMutation>;
export type DeleteServiceOptionMutationResult = Apollo.MutationResult<DeleteServiceOptionMutation>;
export type DeleteServiceOptionMutationOptions = Apollo.BaseMutationOptions<DeleteServiceOptionMutation, DeleteServiceOptionMutationVariables>;
export const GetServiceOptionsDocument = gql`
    query GetServiceOptions {
  servicesOptions {
    ... on ServiceOptionsList {
      serviceOptions {
        id
        nameFr
        nameEn
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}`;

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
export function useGetServiceOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetServiceOptionsQuery, GetServiceOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetServiceOptionsQuery, GetServiceOptionsQueryVariables>(GetServiceOptionsDocument, options);
      }
export function useGetServiceOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetServiceOptionsQuery, GetServiceOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetServiceOptionsQuery, GetServiceOptionsQueryVariables>(GetServiceOptionsDocument, options);
        }
export type GetServiceOptionsQueryHookResult = ReturnType<typeof useGetServiceOptionsQuery>;
export type GetServiceOptionsLazyQueryHookResult = ReturnType<typeof useGetServiceOptionsLazyQuery>;
export type GetServiceOptionsQueryResult = Apollo.QueryResult<GetServiceOptionsQuery, GetServiceOptionsQueryVariables>;
export const CreateSpecieOptionDocument = gql`
    mutation CreateSpecieOption($input: CreateSpecieOptionInput!) {
  createSpecieOption(input: $input) {
    ... on SpecieOption {
      id
      nameFr
      nameEn
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}`;
export type CreateSpecieOptionMutationFn = Apollo.MutationFunction<CreateSpecieOptionMutation, CreateSpecieOptionMutationVariables>;

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
export function useCreateSpecieOptionMutation(baseOptions?: Apollo.MutationHookOptions<CreateSpecieOptionMutation, CreateSpecieOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSpecieOptionMutation, CreateSpecieOptionMutationVariables>(CreateSpecieOptionDocument, options);
      }
export type CreateSpecieOptionMutationHookResult = ReturnType<typeof useCreateSpecieOptionMutation>;
export type CreateSpecieOptionMutationResult = Apollo.MutationResult<CreateSpecieOptionMutation>;
export type CreateSpecieOptionMutationOptions = Apollo.BaseMutationOptions<CreateSpecieOptionMutation, CreateSpecieOptionMutationVariables>;
export const UpdateSpecieOptionDocument = gql`
    mutation UpdateSpecieOption($id: ID!, $input: UpdateSpecieOptionInput!) {
  updateSpecieOption(id: $id, input: $input) {
    ... on SpecieOption {
      id
      nameFr
      nameEn
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${UnableToProcessFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;
export type UpdateSpecieOptionMutationFn = Apollo.MutationFunction<UpdateSpecieOptionMutation, UpdateSpecieOptionMutationVariables>;

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
export function useUpdateSpecieOptionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateSpecieOptionMutation, UpdateSpecieOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateSpecieOptionMutation, UpdateSpecieOptionMutationVariables>(UpdateSpecieOptionDocument, options);
      }
export type UpdateSpecieOptionMutationHookResult = ReturnType<typeof useUpdateSpecieOptionMutation>;
export type UpdateSpecieOptionMutationResult = Apollo.MutationResult<UpdateSpecieOptionMutation>;
export type UpdateSpecieOptionMutationOptions = Apollo.BaseMutationOptions<UpdateSpecieOptionMutation, UpdateSpecieOptionMutationVariables>;
export const DeleteSpecieOptionDocument = gql`
    mutation DeleteSpecieOption($id: ID!) {
  deleteSpecieOption(id: $id) {
    ... on BooleanResult {
      success
    }
    ... on InvalidArgumentsError {
      ...InvalidArgumentsFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${InvalidArgumentsFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;
export type DeleteSpecieOptionMutationFn = Apollo.MutationFunction<DeleteSpecieOptionMutation, DeleteSpecieOptionMutationVariables>;

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
export function useDeleteSpecieOptionMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSpecieOptionMutation, DeleteSpecieOptionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSpecieOptionMutation, DeleteSpecieOptionMutationVariables>(DeleteSpecieOptionDocument, options);
      }
export type DeleteSpecieOptionMutationHookResult = ReturnType<typeof useDeleteSpecieOptionMutation>;
export type DeleteSpecieOptionMutationResult = Apollo.MutationResult<DeleteSpecieOptionMutation>;
export type DeleteSpecieOptionMutationOptions = Apollo.BaseMutationOptions<DeleteSpecieOptionMutation, DeleteSpecieOptionMutationVariables>;
export const GetSpeciesOptionsDocument = gql`
    query GetSpeciesOptions {
  speciesOptions {
    ... on SpecieOptionsList {
      specieOptions {
        id
        nameFr
        nameEn
      }
    }
    ... on UnableToProcessError {
      ...UnableToProcessFields
    }
  }
}
    ${UnableToProcessFieldsFragmentDoc}`;

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
export function useGetSpeciesOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GetSpeciesOptionsQuery, GetSpeciesOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSpeciesOptionsQuery, GetSpeciesOptionsQueryVariables>(GetSpeciesOptionsDocument, options);
      }
export function useGetSpeciesOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSpeciesOptionsQuery, GetSpeciesOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSpeciesOptionsQuery, GetSpeciesOptionsQueryVariables>(GetSpeciesOptionsDocument, options);
        }
export type GetSpeciesOptionsQueryHookResult = ReturnType<typeof useGetSpeciesOptionsQuery>;
export type GetSpeciesOptionsLazyQueryHookResult = ReturnType<typeof useGetSpeciesOptionsLazyQuery>;
export type GetSpeciesOptionsQueryResult = Apollo.QueryResult<GetSpeciesOptionsQuery, GetSpeciesOptionsQueryVariables>;
export const StartCronDocument = gql`
    mutation StartCron($cronName: String!) {
  startCron(cronName: $cronName) {
    ... on BooleanResult {
      success
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;
export type StartCronMutationFn = Apollo.MutationFunction<StartCronMutation, StartCronMutationVariables>;

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
export function useStartCronMutation(baseOptions?: Apollo.MutationHookOptions<StartCronMutation, StartCronMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartCronMutation, StartCronMutationVariables>(StartCronDocument, options);
      }
export type StartCronMutationHookResult = ReturnType<typeof useStartCronMutation>;
export type StartCronMutationResult = Apollo.MutationResult<StartCronMutation>;
export type StartCronMutationOptions = Apollo.BaseMutationOptions<StartCronMutation, StartCronMutationVariables>;
export const StopCronDocument = gql`
    mutation StopCron($cronName: String!) {
  stopCron(cronName: $cronName) {
    ... on BooleanResult {
      success
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;
export type StopCronMutationFn = Apollo.MutationFunction<StopCronMutation, StopCronMutationVariables>;

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
export function useStopCronMutation(baseOptions?: Apollo.MutationHookOptions<StopCronMutation, StopCronMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StopCronMutation, StopCronMutationVariables>(StopCronDocument, options);
      }
export type StopCronMutationHookResult = ReturnType<typeof useStopCronMutation>;
export type StopCronMutationResult = Apollo.MutationResult<StopCronMutation>;
export type StopCronMutationOptions = Apollo.BaseMutationOptions<StopCronMutation, StopCronMutationVariables>;
export const CurrentStaffDocument = gql`
    query CurrentStaff {
  currentStaff {
    ... on Staff {
      id
      email
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
    ... on NotFoundError {
      ...NotFoundFields
    }
  }
}
    ${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}
${NotFoundFieldsFragmentDoc}`;

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
export function useCurrentStaffQuery(baseOptions?: Apollo.QueryHookOptions<CurrentStaffQuery, CurrentStaffQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentStaffQuery, CurrentStaffQueryVariables>(CurrentStaffDocument, options);
      }
export function useCurrentStaffLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentStaffQuery, CurrentStaffQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentStaffQuery, CurrentStaffQueryVariables>(CurrentStaffDocument, options);
        }
export type CurrentStaffQueryHookResult = ReturnType<typeof useCurrentStaffQuery>;
export type CurrentStaffLazyQueryHookResult = ReturnType<typeof useCurrentStaffLazyQuery>;
export type CurrentStaffQueryResult = Apollo.QueryResult<CurrentStaffQuery, CurrentStaffQueryVariables>;
export const GetCronStatusDocument = gql`
    query GetCronStatus($cronName: String!) {
  getCronStatus(cronName: $cronName) {
    ... on CronStatus {
      status
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;

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
export function useGetCronStatusQuery(baseOptions: Apollo.QueryHookOptions<GetCronStatusQuery, GetCronStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCronStatusQuery, GetCronStatusQueryVariables>(GetCronStatusDocument, options);
      }
export function useGetCronStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCronStatusQuery, GetCronStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCronStatusQuery, GetCronStatusQueryVariables>(GetCronStatusDocument, options);
        }
export type GetCronStatusQueryHookResult = ReturnType<typeof useGetCronStatusQuery>;
export type GetCronStatusLazyQueryHookResult = ReturnType<typeof useGetCronStatusLazyQuery>;
export type GetCronStatusQueryResult = Apollo.QueryResult<GetCronStatusQuery, GetCronStatusQueryVariables>;
export const SubscribeToPendingPaymentCronDocument = gql`
    subscription SubscribeToPendingPaymentCron {
  pendingPaymentCronSub {
    ... on BooleanResult {
      success
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;

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
export function useSubscribeToPendingPaymentCronSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeToPendingPaymentCronSubscription, SubscribeToPendingPaymentCronSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeToPendingPaymentCronSubscription, SubscribeToPendingPaymentCronSubscriptionVariables>(SubscribeToPendingPaymentCronDocument, options);
      }
export type SubscribeToPendingPaymentCronSubscriptionHookResult = ReturnType<typeof useSubscribeToPendingPaymentCronSubscription>;
export type SubscribeToPendingPaymentCronSubscriptionResult = Apollo.SubscriptionResult<SubscribeToPendingPaymentCronSubscription>;
export const SubscribeToSetupIntentCronDocument = gql`
    subscription SubscribeToSetupIntentCron {
  setupIntentCronSub {
    ... on BooleanResult {
      success
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;

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
export function useSubscribeToSetupIntentCronSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeToSetupIntentCronSubscription, SubscribeToSetupIntentCronSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeToSetupIntentCronSubscription, SubscribeToSetupIntentCronSubscriptionVariables>(SubscribeToSetupIntentCronDocument, options);
      }
export type SubscribeToSetupIntentCronSubscriptionHookResult = ReturnType<typeof useSubscribeToSetupIntentCronSubscription>;
export type SubscribeToSetupIntentCronSubscriptionResult = Apollo.SubscriptionResult<SubscribeToSetupIntentCronSubscription>;
export const SubscribeToErrorsEmailCronDocument = gql`
    subscription SubscribeToErrorsEmailCron {
  errorsEmailCronSub {
    ... on BooleanResult {
      success
    }
    ... on UserAuthenticationError {
      ...UserAuthFields
    }
    ... on UserForbiddenError {
      ...UserForbiddenFields
    }
  }
}
    ${UserAuthFieldsFragmentDoc}
${UserForbiddenFieldsFragmentDoc}`;

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
export function useSubscribeToErrorsEmailCronSubscription(baseOptions?: Apollo.SubscriptionHookOptions<SubscribeToErrorsEmailCronSubscription, SubscribeToErrorsEmailCronSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<SubscribeToErrorsEmailCronSubscription, SubscribeToErrorsEmailCronSubscriptionVariables>(SubscribeToErrorsEmailCronDocument, options);
      }
export type SubscribeToErrorsEmailCronSubscriptionHookResult = ReturnType<typeof useSubscribeToErrorsEmailCronSubscription>;
export type SubscribeToErrorsEmailCronSubscriptionResult = Apollo.SubscriptionResult<SubscribeToErrorsEmailCronSubscription>;