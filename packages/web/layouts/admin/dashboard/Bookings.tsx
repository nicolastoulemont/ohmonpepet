import React, { useEffect, useRef, useState } from 'react'
import dashboardJSON from 'statics/admin/dashboard.json'
import { useI18n } from 'utils/hooks/useI18n'
import { Heading, Flex, theme } from '@chakra-ui/react'
import { useBookingsQuery } from 'generated/graphql'
import { useDimensions } from 'utils/hooks'
import { roundToTwoDecimals } from 'utils'
import { Loader } from 'components'
import { format } from 'date-fns'
import { XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts'
import { RechartsExtraStyles } from 'layouts/shared/RechartsExtraStyles'

function withFormattedDate<A extends { updatedAt?: string }>(arr: Array<A>) {
	return arr?.map((item) => ({
		...item,
		formattedDate: format(new Date(item.updatedAt), 'MM/dd/yyyy')
	}))
}

export function Bookings() {
	const [chartInfos, setChartInfos] = useState([])
	const { t } = useI18n(dashboardJSON)
	const chartContainer = useRef(null)
	const [width] = useDimensions(chartContainer)
	const { data, loading } = useBookingsQuery()

	useEffect(() => {
		if (!data) return
		const lookup =
			data?.bookings &&
			withFormattedDate(data.bookings.bookings).reduce((acc, item) => {
				if (acc[item.formattedDate]) {
					acc[item.formattedDate] = {
						...acc[item.formattedDate],
						numberOfBookingPerDay: acc[item.formattedDate].numberOfBookingPerDay + 1,
						dailyTotalPrice: roundToTwoDecimals(
							acc[item.formattedDate].dailyTotalPrice + item.priceWithApplicationFee
						),

						averagePrice: roundToTwoDecimals(
							(acc[item.formattedDate].dailyTotalPrice +
								item.priceWithApplicationFee) /
								(acc[item.formattedDate].numberOfBookingPerDay + 1)
						)
					}
				} else {
					acc[item.formattedDate] = {
						...acc[item.formattedDate],
						numberOfBookingPerDay: 1,
						dailyTotalPrice: item.priceWithApplicationFee,
						averagePrice: item.priceWithApplicationFee
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
				{t('bookings')}
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
					<YAxis domain={[0, 100]} padding={{ bottom: 20 }} />
					<Tooltip />
					<Line
						type='natural'
						dataKey='numberOfBookingPerDay'
						stroke={theme.colors.green[500]}
						strokeWidth={2}
					/>
					<Line
						type='natural'
						dataKey='averagePrice'
						stroke={theme.colors.cyan[400]}
						strokeWidth={2}
					/>
				</LineChart>
				<RechartsExtraStyles />
			</Flex>
		</Flex>
	)
}
