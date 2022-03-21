import React, { useMemo, useEffect } from 'react'
import { Box, Flex, Heading, Image, Text, useToast } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import { useRouter } from 'next/router'
import { isMobile } from 'react-device-detect'
import notificationMessageJSON from 'statics/notifications/message.json'
import notificationStatusJSON from 'statics/notifications/status.json'
import newBookingJSON from 'statics/notifications/newBooking.json'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
import {
  useCurrentAccountLazyQuery,
  useGetCurrentUserAndOperatorBookingsLazyQuery,
  useCurrentUserOperatorBookingsLazyQuery,
  useCurrentUserOwnerBookingsLazyQuery,
  useSubscribeToUserBookingsMessagesChangesSubscription,
  useSubscribeToUserBookingsStatusChangesSubscription,
  useSubscribeToNewlyCreatedBookingsAsSitterSubscription,
  SubscribeToUserBookingsStatusChangesSubscription,
  SubscribeToUserBookingsMessagesChangesSubscription,
} from '@ohmonpepet/data'
import { BookingStatus } from 'layouts/shared/BookingStatus'
import Cookies from 'universal-cookie'
import { useOwnerStore, useSitterStore } from 'lib/stores/search'
import { isEither, isType } from 'gql-typeguards'
const cookies = new Cookies()

export function ApplicationWideQueryAndSubscriptions({ children }) {
  const tokenPresence = cookies.get('token-presence')

  const [getCurrentAccount, { data: account }] = useCurrentAccountLazyQuery()
  const [getCurrentAndOperatorBookings, { data }] =
    useGetCurrentUserAndOperatorBookingsLazyQuery({
      fetchPolicy: 'cache-and-network',
    })

  useEffect(() => {
    if (tokenPresence && !data && !account) {
      getCurrentAccount()
      getCurrentAndOperatorBookings()
    }
  }, [])

  const hasBookingsOrIsPetSitter = useMemo(
    () =>
      (isType(data?.currentUserAndOperatorBookings, 'BookingsList') &&
        data.currentUserAndOperatorBookings.bookings.length > 0) ||
      (isType(account.currentAccount, 'Account') &&
        account?.currentAccount?.operator?.isActive),

    [data, account]
  )

  if (
    isType(account.currentAccount, 'Account') &&
    isType(data?.currentUserAndOperatorBookings, 'BookingsList') &&
    hasBookingsOrIsPetSitter
  ) {
    return (
      <ApplicationWideSubscriptions
        bookings={data?.currentUserAndOperatorBookings?.bookings || []}
        account={account.currentAccount}
      >
        {children}
      </ApplicationWideSubscriptions>
    )
  }

  return <>{children}</>
}

export function ApplicationWideSubscriptions({ bookings, account, children }) {
  const { t } = useI18n(notificationMessageJSON)
  const { t: t2, lang } = useI18n(notificationStatusJSON)
  const { t: t3 } = useI18n(newBookingJSON)
  const toast = useToast()
  const toastIdRef = React.useRef(null)
  const { push } = useRouter()
  const ownerStore = useOwnerStore()
  const sitterStore = useSitterStore()

  const [getCurrentUserOwnerBookings] = useCurrentUserOwnerBookingsLazyQuery({
    fetchPolicy: 'cache-and-network',
  })
  const [getCurrentUserOperatorBookings] =
    useCurrentUserOperatorBookingsLazyQuery({
      fetchPolicy: 'cache-and-network',
    })

  const ownerBookingsIds = useMemo(
    () =>
      bookings
        ? bookings
            .filter((booking) => booking.userId === account.user.id)
            .map((booking) => booking.id)
        : [],
    [bookings]
  )

  function redirectTo(bookingId: string, panel: 'details' | 'messages') {
    push({
      pathname: `/bookings/${bookingId}`,
      query: { panel },
    })
    if (toastIdRef.current) {
      toast.close(toastIdRef.current)
    }
  }

  // Newly created bookings
  const { data: sitterNewlyCreatedBookings } =
    useSubscribeToNewlyCreatedBookingsAsSitterSubscription({
      variables: { sitterId: account.operator.id },
      onSubscriptionData: () => handleNewlyCreatedBooking(),
    })

  function handleNewlyCreatedBooking() {
    const { fns, ...searchParams } = sitterStore
    getCurrentUserOperatorBookings({
      variables: {
        input: {
          ...searchParams,
          endDate: new Date(searchParams.endDate),
          startDate: new Date(searchParams.startDate),
        },
      },
    })

    const booking = isType(
      sitterNewlyCreatedBookings?.newlyCreatedBookingsAsSitterSub,
      'Booking'
    )
      ? sitterNewlyCreatedBookings?.newlyCreatedBookingsAsSitterSub
      : null

    if (booking) {
      toastIdRef.current = toast({
        position: 'top-right',
        duration: 9000,
        render: () => (
          <NewBookingCreated
            redirectToBookingDetails={() => redirectTo(booking.id, 'details')}
            message={t3('amount', {
              price: booking.priceWithOutApplicationFee,
            })}
            subTitle={t3('subTitle', {
              start: format(new Date(booking.startDate), 'd LLL', {
                locale: lang === 'fr' ? fr : enUS,
              }),
              end: format(new Date(booking.endDate), 'd LLL', {
                locale: lang === 'fr' ? fr : enUS,
              }),
            })}
          />
        ),
      })
    }
  }

  // Bookings status changes
  const { data: ownerBookingStatusChange } =
    useSubscribeToUserBookingsStatusChangesSubscription({
      variables: {
        bookingsIds: ownerBookingsIds,
      },
      onSubscriptionData: ({ subscriptionData: { data } }) =>
        handleOwnerBookingStatusChange(data),
    })

  function handleOwnerBookingStatusChange(
    data: SubscribeToUserBookingsStatusChangesSubscription
  ) {
    if (isType(data?.userBookingsStatusChangesSub, 'Booking')) {
      const { operator, user } = data.userBookingsStatusChangesSub
      if (user.id === account.user.id) {
        const { fns, ...searchParams } = ownerStore
        getCurrentUserOwnerBookings({
          variables: {
            input: {
              ...searchParams,
              endDate: new Date(searchParams.endDate),
              startDate: new Date(searchParams.startDate),
            },
          },
        })
      } else if (operator.id === account.operator.id) {
        const { fns, ...searchParams } = sitterStore
        getCurrentUserOperatorBookings({
          variables: {
            input: {
              ...searchParams,
              endDate: new Date(searchParams.endDate),
              startDate: new Date(searchParams.startDate),
            },
          },
        })
      }
      const booking = isType(
        ownerBookingStatusChange.userBookingsStatusChangesSub,
        'Booking'
      )
        ? ownerBookingStatusChange?.userBookingsStatusChangesSub
        : null

      const userIsNotOriginOfChange =
        booking?.lastUpdatedBy !== account.operator.id

      if (booking?.id && userIsNotOriginOfChange) {
        // Show toast
        const ownerName = `${booking.user.firstName} ${
          booking.user.lastName ? `${booking.user.lastName}` : ''
        }`
        const sitterName = `${booking.operator.account.user.firstName} ${booking.operator.account.user.lastName}`
        const correctNameToShow =
          account.user.firstName === booking.operator.account.user.firstName
            ? ownerName
            : sitterName

        toastIdRef.current = toast({
          position: 'top-right',
          duration: 9000,
          render: () => (
            <BookingStatusChange
              redirectToBookingDetails={() => redirectTo(booking.id, 'details')}
              booking={booking}
              subTitle={t2('subTitle', {
                name: correctNameToShow,
                start: format(new Date(booking.startDate), 'd LLL', {
                  locale: lang === 'fr' ? fr : enUS,
                }),
                end: format(new Date(booking.endDate), 'd LLL', {
                  locale: lang === 'fr' ? fr : enUS,
                }),
              })}
            />
          ),
        })
      }
    }
  }

  // Bookings messages changes
  const { data: ownerBookingMessagesChange } =
    useSubscribeToUserBookingsMessagesChangesSubscription({
      variables: {
        bookingsIds: ownerBookingsIds,
        authorId: account.user.id,
      },
      onSubscriptionData: ({ subscriptionData: { data } }) =>
        handleOwnerBookingMessagesChange(data),
    })

  function handleOwnerBookingMessagesChange(
    data: SubscribeToUserBookingsMessagesChangesSubscription
  ) {
    if (
      isEither(data?.userBookingsMessagesChangesSub, [
        'OperatorBookingMessage',
        'UserBookingMessage',
      ])
    ) {
      if (
        isType(data?.userBookingsMessagesChangesSub, 'OperatorBookingMessage')
      ) {
        const { operatorId } = data.userBookingsMessagesChangesSub
        if (operatorId === account.operator.id) {
          getCurrentUserOperatorBookings()
        }
      }

      if (isType(data?.userBookingsMessagesChangesSub, 'UserBookingMessage')) {
        const { userId } = data.userBookingsMessagesChangesSub
        if (userId === account.user.id) {
          getCurrentUserOwnerBookings()
        }
      }

      if (
        isEither(ownerBookingMessagesChange.userBookingsMessagesChangesSub, [
          'UserBookingMessage',
          'OperatorBookingMessage',
        ])
      ) {
        const bookingId =
          ownerBookingMessagesChange.userBookingsMessagesChangesSub.bookingId
        const message =
          ownerBookingMessagesChange.userBookingsMessagesChangesSub.content

        const authorName = isType(
          ownerBookingMessagesChange.userBookingsMessagesChangesSub,
          'UserBookingMessage'
        )
          ? ownerBookingMessagesChange.userBookingsMessagesChangesSub.user
              .firstName
          : isType(
              ownerBookingMessagesChange.userBookingsMessagesChangesSub,
              'OperatorBookingMessage'
            )
          ? ownerBookingMessagesChange.userBookingsMessagesChangesSub.operator
              .account.user.firstName
          : undefined

        toastIdRef.current = toast({
          position: 'top-right',
          duration: 9000,
          render: () => (
            <NewMessageToast
              redirectToBookingMessages={() =>
                redirectTo(bookingId, 'messages')
              }
              message={message}
              subTitle={t('subTitle', {
                name: authorName,
              })}
            />
          ),
        })
      }
    }
  }

  return <>{children}</>
}

function NewMessageToast({ redirectToBookingMessages, message, subTitle }) {
  return (
    <Flex
      p={3}
      m={3}
      bg='white'
      boxShadow='rgba(0, 0, 0, 0.2) 0px 3px 8px'
      color='black'
      borderRadius='10px'
      align='center'
      justify='space-between'
      _hover={{ cursor: 'pointer' }}
      as='button'
      onClick={redirectToBookingMessages}
    >
      <Box
        textAlign='left'
        width={message.author.pictureUrl ? 'calc(100% - 60px)' : '100%'}
      >
        <Heading fontSize='12px' mb={1}>
          {subTitle}
        </Heading>

        <Text fontSize='12px'>
          {message.content.length > 50
            ? message.content.substr(0, 50).concat('...')
            : message.content}
        </Text>
      </Box>
      {message.author.pictureUrl && (
        <Image
          width='50px'
          objectFit='cover'
          borderRadius='10px'
          src={message.author.pictureUrl}
          fallbackSrc={message.author.pictureUrl}
        />
      )}
    </Flex>
  )
}
function BookingStatusChange({ redirectToBookingDetails, booking, subTitle }) {
  return (
    <Flex
      p={3}
      m={3}
      bg='white'
      boxShadow='rgba(0, 0, 0, 0.2) 0px 3px 8px'
      color='black'
      borderRadius='10px'
      align='center'
      justify='space-between'
      _hover={{ cursor: 'pointer' }}
      as='button'
      onClick={redirectToBookingDetails}
      maxW={isMobile ? '300px' : '350px'}
    >
      <Box
        textAlign='left'
        width={booking.sitter.pictureUrl ? 'calc(100% - 60px)' : '100%'}
      >
        <Heading fontSize='12px' mb={1}>
          {subTitle}
        </Heading>
        <BookingStatus status={booking.status} />
      </Box>
      {booking.sitter.pictureUrl && (
        <Image
          width='50px'
          objectFit='cover'
          borderRadius='10px'
          src={booking.sitter.pictureUrl}
          fallbackSrc={booking.sitter.pictureUrl}
        />
      )}
    </Flex>
  )
}

function NewBookingCreated({ redirectToBookingDetails, message, subTitle }) {
  return (
    <Flex
      p={3}
      m={3}
      bg='white'
      boxShadow='rgba(0, 0, 0, 0.2) 0px 3px 8px'
      color='black'
      borderRadius='10px'
      align='center'
      justify='space-between'
      _hover={{ cursor: 'pointer' }}
      as='button'
      onClick={redirectToBookingDetails}
      maxW={isMobile ? '300px' : '350px'}
    >
      <Box textAlign='left' width='100%'>
        <Heading fontSize='12px' mb={1}>
          {subTitle}
        </Heading>
        <Text fontSize='12px'>{message}</Text>
      </Box>
    </Flex>
  )
}
