import { useI18n } from 'utils/hooks/useI18n'
import profileCardJSON from 'statics/search/profileCard.json'
import { Flex, Text } from '@chakra-ui/react'

export function SitterServicePricesMobileHorizontal({ state, profile }) {
	const { t } = useI18n(profileCardJSON)
	return (
		<Flex flexDirection='row' alignItems='center' justify='flex-start'>
			{(!state['service'] || state['service'] === '' || state['service'] === 'atHomeDay') && (
				<Text fontWeight={600} fontSize='14px'>
					{profile.atHomeDay}
					{' € '}
					<Text as='span' fontWeight='400' fontSize='12px'>
						{t('day')}
					</Text>
				</Text>
			)}
			{state['service'] === 'atOwnerHomeDay' && (
				<Text fontWeight={600} fontSize='14px'>
					{profile.atOwnerHomeDay}
					{' € '}
					<Text as='span' fontWeight='400' fontSize='12px'>
						{t('day')}
					</Text>
				</Text>
			)}
			{state['service'] === 'atHomeHour' && (
				<Text fontWeight={600} fontSize='14px'>
					{profile.atHomeHour}
					{' € '}
					<Text as='span' fontWeight='400' fontSize='12px'>
						{t('hour')}
					</Text>
				</Text>
			)}
			{state['service'] === 'atOwnerHomeHour' && (
				<Text fontWeight={600} fontSize='14px'>
					{profile.atOwnerHomeHour}
					{' € '}
					<Text as='span' fontWeight='400' fontSize='12px'>
						{t('hour')}
					</Text>
				</Text>
			)}
			{state['service'] === 'petWalk' && (
				<Text fontWeight={600} fontSize='14px'>
					{profile.petWalk}
					{' € '}
					<Text as='span' fontWeight='400' fontSize='12px'>
						{t('hour')}
					</Text>
				</Text>
			)}
		</Flex>
	)
}
