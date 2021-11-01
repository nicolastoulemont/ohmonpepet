import { Box, Flex, Text, Divider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import bookingTotalJSON from 'statics/bookingTotal.json'
import { getPercentage } from 'utils'

const SERVICE_FEE_PERCENTAGE = 8

export function BookingTotal({ total, showDetails = true }) {
	const [state, setState] = useState({ service: 0, calculatedTotal: 0 })
	const { t } = useI18n(bookingTotalJSON)

	useEffect(() => {
		const service =
			Math.round((getPercentage(total, SERVICE_FEE_PERCENTAGE) + Number.EPSILON) * 100) / 100
		const calculatedTotal = Math.round((service + total + Number.EPSILON) * 100) / 100
		setState({ service, calculatedTotal })
	}, [total])

	return (
		<Box width='100%' mt={3}>
			<Divider my={2} />
			{showDetails && (
				<>
					<Flex width='100%' align='center' justify='space-between'>
						<Text fontSize='14px' fontWeight={400} my={0}>
							{t('service')}
						</Text>
						<Text fontSize='14px' fontWeight={400}>
							{state.service}
							{`€`}
						</Text>
					</Flex>
					<Divider my={2} />
				</>
			)}

			<Flex width='100%' align='center' justify='space-between' mt={1}>
				<Text fontSize='17px' fontWeight={600}>
					{t('total')}
				</Text>
				<Text fontSize='17px' fontWeight={600}>
					{state.calculatedTotal}
					{`€`}
				</Text>
			</Flex>
		</Box>
	)
}
