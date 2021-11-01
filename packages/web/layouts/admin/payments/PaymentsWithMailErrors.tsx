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
	useSubscribeToErrorsEmailCronSubscription,
	useBookingsWithPaymentStatusLazyQuery
} from 'generated/graphql'

function withFormattedDate<A extends { captureDate?: string }>(arr: Array<A>) {
	return arr?.map((item) => ({
		...item,
		formattedDate: format(new Date(item.captureDate), 'MM/dd/yyyy')
	}))
}

export function PaymentsWithMailErrors() {
	const [chartInfos, setChartInfos] = useState([])
	const { t } = useI18n(dashboardJSON)
	const chartContainer = useRef(null)
	const [width] = useDimensions(chartContainer)
	const [
		getBookingsWithPaymentStatus,
		{ data, loading }
	] = useBookingsWithPaymentStatusLazyQuery()
	const { data: errorsEmail } = useSubscribeToErrorsEmailCronSubscription()

	// Refetch on cron change
	useEffect(() => {
		getBookingsWithPaymentStatus()
	}, [errorsEmail])

	useEffect(() => {
		if (!data) return
		const lookup =
			data?.bookingsWithPaymentStatus &&
			withFormattedDate(data.bookingsWithPaymentStatus.bookings).reduce((acc, item) => {
				if (acc[item.formattedDate]) {
					acc[item.formattedDate] = {
						...acc[item.formattedDate],
						numberOfPaymentsPerDay: acc[item.formattedDate].numberOfPaymentsPerDay + 1,
						ERROR_SENDING_UNKOWN_ERROR_MAIL:
							item.paymentStatus === 'ERROR_SENDING_UNKOWN_ERROR_MAIL'
								? acc[item.formattedDate].ERROR_SENDING_UNKOWN_ERROR_MAIL + 1
								: acc[item.formattedDate].ERROR_SENDING_UNKOWN_ERROR_MAIL,
						ERROR_SENDING_INSUFFICIENT_FUNDS_MAIL:
							item.paymentStatus === 'ERROR_SENDING_INSUFFICIENT_FUNDS_MAIL'
								? acc[item.formattedDate].ERROR_SENDING_INSUFFICIENT_FUNDS_MAIL + 1
								: acc[item.formattedDate].ERROR_SENDING_INSUFFICIENT_FUNDS_MAIL,
						ERROR_SENDING_AUTHENTICATION_REQUIRED_MAIL:
							item.paymentStatus === 'ERROR_SENDING_AUTHENTICATION_REQUIRED_MAIL'
								? acc[item.formattedDate]
										.ERROR_SENDING_AUTHENTICATION_REQUIRED_MAIL + 1
								: acc[item.formattedDate]
										.ERROR_SENDING_AUTHENTICATION_REQUIRED_MAIL,
						UNSUCCESSFULL_PAYMENT_INTENT_CREATION_UNKOWN_ERROR_MAIL_SENT:
							item.paymentStatus ===
							'UNSUCCESSFULL_PAYMENT_INTENT_CREATION_UNKOWN_ERROR_MAIL_SENT'
								? acc[item.formattedDate]
										.UNSUCCESSFULL_PAYMENT_INTENT_CREATION_UNKOWN_ERROR_MAIL_SENT +
								  1
								: acc[item.formattedDate]
										.UNSUCCESSFULL_PAYMENT_INTENT_CREATION_UNKOWN_ERROR_MAIL_SENT,
						UNSUCCESSFULL_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS_MAIL_SENT:
							item.paymentStatus ===
							'UNSUCCESSFULL_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS_MAIL_SENT'
								? acc[item.formattedDate]
										.UNSUCCESSFULL_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS_MAIL_SENT +
								  1
								: acc[item.formattedDate]
										.UNSUCCESSFULL_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS_MAIL_SENT,
						UNSUCCESSFULL_PAYMENT_INTENT_CREATION_AUTHENTICATION_REQUIRED_MAIL_SENT:
							item.paymentStatus ===
							'UNSUCCESSFULL_PAYMENT_INTENT_CREATION_AUTHENTICATION_REQUIRED_MAIL_SENT'
								? acc[item.formattedDate]
										.UNSUCCESSFULL_PAYMENT_INTENT_CREATION_AUTHENTICATION_REQUIRED_MAIL_SENT +
								  1
								: acc[item.formattedDate]
										.UNSUCCESSFULL_PAYMENT_INTENT_CREATION_AUTHENTICATION_REQUIRED_MAIL_SENT
					}
				} else {
					acc[item.formattedDate] = {
						...acc[item.formattedDate],
						numberOfPaymentsPerDay: 1,
						ERROR_SENDING_UNKOWN_ERROR_MAIL:
							item.paymentStatus === 'ERROR_SENDING_UNKOWN_ERROR_MAIL' ? 1 : 0,
						ERROR_SENDING_INSUFFICIENT_FUNDS_MAIL:
							item.paymentStatus === 'ERROR_SENDING_INSUFFICIENT_FUNDS_MAIL' ? 1 : 0,
						ERROR_SENDING_AUTHENTICATION_REQUIRED_MAIL:
							item.paymentStatus === 'ERROR_SENDING_AUTHENTICATION_REQUIRED_MAIL'
								? 1
								: 0,
						UNSUCCESSFULL_PAYMENT_INTENT_CREATION_UNKOWN_ERROR_MAIL_SENT:
							item.paymentStatus ===
							'UNSUCCESSFULL_PAYMENT_INTENT_CREATION_UNKOWN_ERROR_MAIL_SENT'
								? 1
								: 0,
						UNSUCCESSFULL_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS_MAIL_SENT:
							item.paymentStatus ===
							'UNSUCCESSFULL_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS_MAIL_SENT'
								? 1
								: 0,
						UNSUCCESSFULL_PAYMENT_INTENT_CREATION_AUTHENTICATION_REQUIRED_MAIL_SENT:
							item.paymentStatus ===
							'UNSUCCESSFULL_PAYMENT_INTENT_CREATION_AUTHENTICATION_REQUIRED_MAIL_SENT'
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
				{t('PaymentsWithEmailErrors')}
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
						dataKey='UNSUCCESSFULL_PAYMENT_INTENT_CREATION_AUTHENTICATION_REQUIRED_MAIL_SENT'
						stroke={theme.colors.black[500]}
						strokeWidth={2}
					/>
					<Line
						type='natural'
						dataKey='UNSUCCESSFULL_PAYMENT_INTENT_CREATION_INSUFFICIENT_FUNDS_MAIL_SENT'
						stroke={theme.colors.yellow[500]}
						strokeWidth={2}
					/>
					<Line
						type='natural'
						dataKey='UNSUCCESSFULL_PAYMENT_INTENT_CREATION_UNKOWN_ERROR_MAIL_SENT'
						stroke={theme.colors.orange[500]}
						strokeWidth={2}
					/>
					<Line
						type='natural'
						dataKey='ERROR_SENDING_AUTHENTICATION_REQUIRED_MAIL'
						stroke={theme.colors.red[500]}
						strokeWidth={2}
					/>
					<Line
						type='natural'
						dataKey='ERROR_SENDING_INSUFFICIENT_FUNDS_MAIL'
						stroke={theme.colors.purple[500]}
						strokeWidth={2}
					/>
					<Line
						type='natural'
						dataKey='ERROR_SENDING_UNKOWN_ERROR_MAIL'
						stroke={theme.colors.pink[500]}
						strokeWidth={2}
					/>
				</LineChart>
				<RechartsExtraStyles />
			</Flex>
		</Flex>
	)
}
