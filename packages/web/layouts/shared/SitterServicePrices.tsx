import { useI18n } from 'utils/hooks/useI18n'
import profileCardJSON from 'statics/search/profileCard.json'
import { Flex, Text } from '@chakra-ui/react'

export function SitterServicePrices({ state, profile, requiredDaysNumber, showTotal = true }) {
	const { t } = useI18n(profileCardJSON)
	return (
		<Flex flexDirection='column' alignItems='flex-end' justify='flex-end'>
			{(!state['service'] || state['service'] === '' || state['service'] === 'atHomeDay') && (
				<Text fontWeight={600}>
					{profile.atHomeDay}
					{' € '}
					<Text as='span' fontWeight='400' fontSize='14px'>
						{t('day')}
					</Text>
				</Text>
			)}
			{state['service'] === 'atOwnerHomeDay' && (
				<Text fontWeight={600}>
					{profile.atOwnerHomeDay}
					{' € '}
					<Text as='span' fontWeight='400' fontSize='14px'>
						{t('day')}
					</Text>
				</Text>
			)}
			{state['service'] === 'atHomeHour' && (
				<Text fontWeight={600}>
					{profile.atHomeHour}
					{' € '}
					<Text as='span' fontWeight='400' fontSize='14px'>
						{t('hour')}
					</Text>
				</Text>
			)}
			{state['service'] === 'atOwnerHomeHour' && (
				<Text fontWeight={600}>
					{profile.atOwnerHomeHour}
					{' € '}
					<Text as='span' fontWeight='400' fontSize='14px'>
						{t('hour')}
					</Text>
				</Text>
			)}
			{state['service'] === 'petWalk' && (
				<Text fontWeight={600}>
					{profile.petWalk}
					{' € '}
					<Text as='span' fontWeight='400' fontSize='14px'>
						{t('hour')}
					</Text>
				</Text>
			)}
			{requiredDaysNumber > 1 && showTotal && (
				<Text fontWeight={400} fontSize='12px' color='gray.700'>
					{!state['service']
						? profile.atHomeDay * requiredDaysNumber
						: profile[state['service']] * requiredDaysNumber}
					{' € au total'}
				</Text>
			)}
		</Flex>
	)
}
