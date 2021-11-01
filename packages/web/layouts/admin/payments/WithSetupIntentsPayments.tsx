import { RechartsExtraStyles } from 'layouts/shared/RechartsExtraStyles'
import React, { useEffect, useRef, useState } from 'react'
import dashboardJSON from 'statics/admin/dashboard.json'
import { useI18n } from 'utils/hooks/useI18n'
import { Heading, Flex, theme } from '@chakra-ui/react'
import { Loader } from 'components'
import { format } from 'date-fns'
import { useDimensions } from 'utils/hooks'
import { XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts'
import {
	useSubscribeToSetupIntentCronSubscription,
	useBookingsWithPaymentStatusLazyQuery
} from 'generated/graphql'

function withFormattedDate<A extends { captureDate?: string }>(arr: Array<A>) {
	return arr?.map((item) => ({
		...item,
		formattedDate: format(new Date(item.captureDate), 'MM/dd/yyyy')
	}))
}

export function WithSetupIntentsPayments() {
	const [chartInfos, setChartInfos] = useState([])
	const { t } = useI18n(dashboardJSON)
	const chartContainer = useRef(null)
	const [width] = useDimensions(chartContainer)
	const [
		getBookingsWithPaymentStatus,
		{ data, loading }
	] = useBookingsWithPaymentStatusLazyQuery()
	const { data: setupIntentCron } = useSubscribeToSetupIntentCronSubscription()

	// Refetch on cron change
	useEffect(() => {
		getBookingsWithPaymentStatus()
	}, [setupIntentCron])

	useEffect(() => {
		if (!data) return
		const lookup =
			data?.bookingsWithPaymentStatus &&
			withFormattedDate(data.bookingsWithPaymentStatus.bookings).reduce((acc, item) => {
				if (acc[item.formattedDate]) {
					acc[item.formattedDate] = {
						...acc[item.formattedDate],
						numberOfPaymentsPerDay: acc[item.formattedDate].numberOfPaymentsPerDay + 1,
						SETUP_INTENT_CONFIRMED_REQUIRED_PAYMENT_INTENT_CREATION:
							item.paymentStatus ===
							'SETUP_INTENT_CONFIRMED_REQUIRED_PAYMENT_INTENT_CREATION'
								? acc[item.formattedDate]
										.SETUP_INTENT_CONFIRMED_REQUIRED_PAYMENT_INTENT_CREATION + 1
								: acc[item.formattedDate]
										.SETUP_INTENT_CONFIRMED_REQUIRED_PAYMENT_INTENT_CREATION,
						SETUP_INTENT_PENDING_CONFIRMATION:
							item.paymentStatus === 'SETUP_INTENT_PENDING_CONFIRMATION'
								? acc[item.formattedDate].SETUP_INTENT_PENDING_CONFIRMATION + 1
								: acc[item.formattedDate].SETUP_INTENT_PENDING_CONFIRMATION,
						UNSUCCESSFULL_PAYMENT_INTENT_CREATION_UNKOWN_ERROR:
							item.paymentStatus ===
							'UNSUCCESSFULL_PAYMENT_INTENT_CREATION_UNKOWN_ERROR'
								? acc[item.formattedDate]
										.UNSUCCESSFULL_PAYMENT_INTENT_CREATION_UNKOWN_ERROR + 1
								: acc[item.formattedDate]
										.UNSUCCESSFULL_PAYMENT_INTENT_CREATION_UNKOWN_ERROR,
						UNSUCCESSFULL_PAYMENT_INTENT_CREATION_AUTHENTICATION_REQUIRED:
							item.paymentStatus ===
							'UNSUCCESSFULL_PAYMENT_INTENT_CREATION_AUTHENTICATION_REQUIRED'
								? acc[item.formattedDate]
										.UNSUCCESSFULL_PAYMENT_INTENT_CREATION_AUTHENTICATION_REQUIRED +
								  1
								: acc[item.formattedDate]
										.UNSUCCESSFULL_PAYMENT_INTENT_CREATION_AUTHENTICATION_REQUIRED,
						UNSUCCESSFULL_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS:
							item.paymentStatus ===
							'UNSUCCESSFULL_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS'
								? acc[item.formattedDate]
										.UNSUCCESSFULL_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS +
								  1
								: acc[item.formattedDate]
										.UNSUCCESSFULL_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS
					}
				} else {
					acc[item.formattedDate] = {
						...acc[item.formattedDate],
						numberOfPaymentsPerDay: 1,
						SETUP_INTENT_CONFIRMED_REQUIRED_PAYMENT_INTENT_CREATION:
							item.paymentStatus ===
							'SETUP_INTENT_CONFIRMED_REQUIRED_PAYMENT_INTENT_CREATION'
								? 1
								: 0,
						SETUP_INTENT_PENDING_CONFIRMATION:
							item.paymentStatus === 'SETUP_INTENT_PENDING_CONFIRMATION' ? 1 : 0,
						UNSUCCESSFULL_PAYMENT_INTENT_CREATION_UNKOWN_ERROR:
							item.paymentStatus ===
							'UNSUCCESSFULL_PAYMENT_INTENT_CREATION_UNKOWN_ERROR'
								? 1
								: 0,
						UNSUCCESSFULL_PAYMENT_INTENT_CREATION_AUTHENTICATION_REQUIRED:
							item.paymentStatus ===
							'UNSUCCESSFULL_PAYMENT_INTENT_CREATION_AUTHENTICATION_REQUIRED'
								? 1
								: 0,
						UNSUCCESSFULL_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS:
							item.paymentStatus ===
							'UNSUCCESSFULL_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS'
								? 1
								: 0
					}
				}
				return acc
			}, {})

		// @ts-ignore
		const infos = Object.entries(lookup)
			// @ts-ignore
			.map((item) => ({ date: item[0], ...item[1] }))
			// @ts-ignore
			.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
		setChartInfos(infos)
	}, [data])

	return (
		<Flex
			align='flex-start'
			justify='flex-start'
			flexDir='column'
			height='40vh'
			p={3}
			boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
			borderRadius='10px'
		>
			<Heading as='h2' size='md' mb={2}>
				{t('PaymentsWithErrors')}
			</Heading>

			{loading && !data && <Loader />}
			<Flex
				align='center'
				justify='center'
				width='100%'
				ref={chartContainer}
				height='calc(100% - 30px)'
			>
				<LineChart
					width={width ? width : chartContainer?.current?.clientWidth}
					height={chartContainer?.current?.clientHeight}
					data={chartInfos}
					margin={{ top: 0, right: 0, left: -30, bottom: 0 }}
				>
					<XAxis dataKey='date' />
					<YAxis domain={[0, 5]} padding={{ bottom: 20 }} />
					<Tooltip />
					<Line
						type='natural'
						dataKey='UNSUCCESSFULL_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS'
						stroke={theme.colors.red[500]}
						strokeWidth={2}
					/>
					<Line
						type='natural'
						dataKey='UNSUCCESSFULL_PAYMENT_INTENT_CREATION_AUTHENTICATION_REQUIRED'
						stroke={theme.colors.orange[600]}
						strokeWidth={2}
					/>
					<Line
						type='natural'
						dataKey='UNSUCCESSFULL_PAYMENT_INTENT_CREATION_UNKOWN_ERROR'
						stroke={theme.colors.yellow[700]}
						strokeWidth={2}
					/>
					<Line
						type='natural'
						dataKey='SETUP_INTENT_PENDING_CONFIRMATION'
						stroke={theme.colors.cyan[500]}
						strokeWidth={2}
					/>
					<Line
						type='natural'
						dataKey='SETUP_INTENT_CONFIRMED_REQUIRED_PAYMENT_INTENT_CREATION'
						stroke={theme.colors.blue[500]}
						strokeWidth={2}
					/>
				</LineChart>
				<RechartsExtraStyles />
			</Flex>
		</Flex>
	)
}
