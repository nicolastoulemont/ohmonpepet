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
	useSubscribeToPendingPaymentCronSubscription,
	useBookingsWithPaymentStatusLazyQuery
} from 'generated/graphql'

function withFormattedDate<A extends { captureDate?: string }>(arr: Array<A>) {
	return arr?.map((item) => ({
		...item,
		formattedDate: format(new Date(item.captureDate), 'MM/dd/yyyy')
	}))
}

export function WithPaymentIntentsBookings() {
	const [chartInfos, setChartInfos] = useState([])
	const { t } = useI18n(dashboardJSON)
	const chartContainer = useRef(null)
	const [width] = useDimensions(chartContainer)
	const [
		getBookingsWithPaymentStatus,
		{ data, loading }
	] = useBookingsWithPaymentStatusLazyQuery()
	const { data: pendingPaymentCron } = useSubscribeToPendingPaymentCronSubscription()

	// Refetch on cron change
	useEffect(() => {
		getBookingsWithPaymentStatus()
	}, [pendingPaymentCron])
	useEffect(() => {
		if (!data) return
		const lookup =
			data?.bookingsWithPaymentStatus &&
			withFormattedDate(data.bookingsWithPaymentStatus.bookings).reduce((acc, item) => {
				if (acc[item.formattedDate]) {
					acc[item.formattedDate] = {
						...acc[item.formattedDate],
						numberOfPaymentsPerDay: acc[item.formattedDate].numberOfPaymentsPerDay + 1,
						UNSUCCESSFULL_CAPTURE:
							item.paymentStatus === 'UNSUCCESSFULL_CAPTURE'
								? acc[item.formattedDate].UNSUCCESSFULL_CAPTURE + 1
								: acc[item.formattedDate].UNSUCCESSFULL_CAPTURE,
						CAPTURED_AND_PAID:
							item.paymentStatus === 'CAPTURED_AND_PAID'
								? acc[item.formattedDate].CAPTURED_AND_PAID + 1
								: acc[item.formattedDate].CAPTURED_AND_PAID,
						AUTHORIZED_REQUIRE_CAPTURE:
							item.paymentStatus === 'AUTHORIZED_REQUIRE_CAPTURE'
								? acc[item.formattedDate].AUTHORIZED_REQUIRE_CAPTURE + 1
								: acc[item.formattedDate].AUTHORIZED_REQUIRE_CAPTURE,

						PENDING_AUTHORIZATION:
							item.paymentStatus === 'PENDING_AUTHORIZATION'
								? acc[item.formattedDate].PENDING_AUTHORIZATION + 1
								: acc[item.formattedDate].PENDING_AUTHORIZATION
					}
				} else {
					acc[item.formattedDate] = {
						...acc[item.formattedDate],
						numberOfPaymentsPerDay: 1,
						UNSUCCESSFULL_CAPTURE:
							item.paymentStatus === 'UNSUCCESSFULL_CAPTURE' ? 1 : 0,
						CAPTURED_AND_PAID: item.paymentStatus === 'CAPTURED_AND_PAID' ? 1 : 0,
						AUTHORIZED_REQUIRE_CAPTURE:
							item.paymentStatus === 'AUTHORIZED_REQUIRE_CAPTURE' ? 1 : 0,

						PENDING_AUTHORIZATION:
							item.paymentStatus === 'PENDING_AUTHORIZATION' ? 1 : 0
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
				{t('onTrackPayments')}
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
						dataKey='PENDING_AUTHORIZATION'
						stroke={theme.colors.teal[500]}
						strokeWidth={2}
					/>
					<Line
						type='natural'
						dataKey='AUTHORIZED_REQUIRE_CAPTURE'
						stroke={theme.colors.yellow[500]}
						strokeWidth={2}
					/>
					<Line
						type='natural'
						dataKey='CAPTURED_AND_PAID'
						stroke={theme.colors.green[500]}
						strokeWidth={2}
					/>
					<Line
						type='natural'
						dataKey='UNSUCCESSFULL_CAPTURE'
						stroke={theme.colors.purple[800]}
						strokeWidth={2}
					/>
				</LineChart>
				<RechartsExtraStyles />
			</Flex>
		</Flex>
	)
}
