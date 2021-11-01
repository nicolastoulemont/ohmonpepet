import React from 'react'
import profileBookingListJSON from 'statics/profileBookingList.json'
import { useI18n } from 'utils/hooks/useI18n'
import { Tag, TagRightIcon, TagLabel } from '@chakra-ui/react'
import { CloseIcon, CheckIcon, TimeIcon } from '@chakra-ui/icons'

export function BookingStatus({ status }) {
	const { t } = useI18n(profileBookingListJSON)
	switch (status) {
		case 'UNDER_REVIEW':
			return (
				<Tag colorScheme='blue' size='sm'>
					<TagLabel>{t('underReview')}</TagLabel>
					<TagRightIcon boxSize='12px' as={TimeIcon as any} />
				</Tag>
			)
		case 'PAID':
			return (
				<Tag colorScheme='green' size='sm'>
					<TagLabel>{t('paid')}</TagLabel>
					<TagRightIcon boxSize='12px' as={CheckIcon as any} />
				</Tag>
			)
		case 'PAYMENT_AUTHORIZED':
			return (
				<Tag colorScheme='pink' size='sm'>
					<TagLabel>{t('authorized')}</TagLabel>
					<TagRightIcon boxSize='12px' as={CheckIcon as any} />
				</Tag>
			)
		case 'CANCELED':
			return (
				<Tag colorScheme='red' size='sm'>
					<TagLabel>{t('canceled')}</TagLabel>
					<TagRightIcon boxSize='12px' as={CloseIcon as any} />
				</Tag>
			)
		case 'BOTH_CONFIRMED':
			return (
				<Tag colorScheme='purple' size='sm'>
					<TagLabel>{t('waitingForPayment')}</TagLabel>
					<TagRightIcon boxSize='12px' as={CheckIcon as any} />
				</Tag>
			)
		case 'PENDING_SITTER_VALIDATION':
			return (
				<Tag colorScheme='orange' size='sm'>
					<TagLabel>{t('pendingSitterValidation')}</TagLabel>
					<TagRightIcon boxSize='12px' as={TimeIcon as any} />
				</Tag>
			)
		case 'PENDING_OWNER_VALIDATION':
			return (
				<Tag colorScheme='blue' size='sm'>
					<TagLabel>{t('pendingOwnerValidation')}</TagLabel>
					<TagRightIcon boxSize='12px' as={TimeIcon as any} />
				</Tag>
			)
		case 'NONE_CONFIRMED':
			return (
				<Tag colorScheme='gray' size='sm'>
					<TagLabel>{t('pendingAllValidation')}</TagLabel>
					<TagRightIcon boxSize='12px' as={TimeIcon as any} />
				</Tag>
			)
		default:
			return null
	}
}
