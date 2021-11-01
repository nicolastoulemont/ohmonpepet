import React, { useEffect, useRef, useState } from 'react'
import dashboardJSON from 'statics/admin/dashboard.json'
import { useI18n } from 'utils/hooks/useI18n'
import { Heading, Flex, theme } from '@chakra-ui/react'
import { useUsersQuery } from 'generated/graphql'
import { Loader } from 'components'
import { format } from 'date-fns'
import { XAxis, YAxis, Tooltip, LineChart, Line } from 'recharts'
import { useDimensions } from 'utils/hooks'
import { RechartsExtraStyles } from 'layouts/shared/RechartsExtraStyles'

function withFormattedDate<A extends { updatedAt?: string }>(arr: Array<A>) {
	return arr?.map((item) => ({
		...item,
		formattedDate: format(new Date(item.updatedAt), 'MM/dd/yyyy')
	}))
}

export function Users() {
	const [chartInfos, setChartInfos] = useState([])
	const { t } = useI18n(dashboardJSON)
	const chartContainer = useRef(null)
	const [width] = useDimensions(chartContainer)

	const { data, loading } = useUsersQuery()

	useEffect(() => {
		if (!data) return
		const lookup =
			data?.users &&
			withFormattedDate(data?.users?.users).reduce((acc, item) => {
				if (acc[item.formattedDate]) {
					acc[item.formattedDate] = acc[item.formattedDate] + 1
				} else {
					acc[item.formattedDate] = 1
				}
				return acc
			}, {})

		// @ts-ignore
		const infos = Object.entries(lookup)
			.map((item) => ({ date: item[0], number: item[1] }))
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
				{t('users')}
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
					<YAxis domain={[0, 10]} padding={{ bottom: 20 }} />
					<Tooltip />
					<Line
						type='natural'
						dataKey='number'
						stroke={theme.colors.purple[600]}
						strokeWidth={2}
					/>
				</LineChart>
				<RechartsExtraStyles />
			</Flex>
		</Flex>
	)
}
