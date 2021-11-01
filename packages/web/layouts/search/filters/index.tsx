import React, { useRef } from 'react'
import { Box, useColorMode, Flex } from '@chakra-ui/react'
import { shadow } from 'theme/colors'
import { MultiSelect } from 'components'
import { useI18n } from 'utils/hooks/useI18n'
import searchJSON from 'statics/search/search.json'
import { GenericFilters } from './GenericFilters'
import { AtOwnerHomeDayFilters } from './AtOwnerHomeDayFilters'
import { AtHomeDayFilters } from './AtHomeDayFilters'
import { useClickAway } from 'react-use'

export function ExtraFiltersContainer({
	hostingsOptions,
	languagesOptions,
	state,
	setState,
	errors,
	setShowExtraFilters,
	handleCheckBoxes
}) {
	const containerRef = useRef<HTMLDivElement>(null)
	useClickAway(containerRef, () => setShowExtraFilters(false))
	const { colorMode } = useColorMode()
	const { t } = useI18n(searchJSON)

	return (
		<Box
			pos='absolute'
			top={['290px', '290px', '240px']}
			left={[
				'calc((100% - calc(100% - 20px))/2)',
				'calc((100% - calc(100% - 40px))/2)',
				`170px`,
				'170px'
			]}
			backgroundColor='white'
			borderRadius='10px'
			p={6}
			width={['calc(100% - 20px)', 'calc(100% - 40px)', '450px', '620px']}
			height='auto'
			boxShadow={shadow[colorMode]}
			zIndex={100}
			ref={containerRef}
		>
			<Flex
				width='100%'
				align={['flex-start', 'flex-start', 'flex-start', 'flex-end']}
				flexDirection={['column', 'column', 'column', 'row']}
				justify={['center', 'center', 'center', 'space-between']}
				mb={[2, 2, 2, 6]}
			>
				<MultiSelect
					name='hostingId'
					placeholder={t('hostingLabel')}
					options={hostingsOptions}
					state={state['hostingId']}
					setState={setState}
					errors={errors}
					type='text'
					label={t('hostingPlaceholder')}
					containerWidth='220px'
					styles={{
						width: '220px',
						flex: 'none',
						mr: [0, 0, 0, 2],
						mb: [2, 2, 2, 0]
					}}
				/>
				<MultiSelect
					name='languagesIds'
					placeholder={t('languagesLabel')}
					options={languagesOptions}
					state={state['languagesIds']}
					setState={setState}
					errors={errors}
					type='text'
					label={t('languagesLabel')}
					containerWidth='220px'
					styles={{
						witdh: '220px',
						flex: 'none',
						ml: [0, 0, 0, 2],
						mb: [2, 2, 2, 0]
					}}
					withIcon
				/>
			</Flex>
			<Flex width='100%' align='center' justify='space-between' mb={[2, 2, 2, 6]}>
				<GenericFilters state={state} handleCheckBoxes={handleCheckBoxes} />
			</Flex>
			{state['service'] && state['service'].includes('Owner') && (
				<Flex width='100%' align='center' justify='space-between' mb={[2, 2, 2, 6]}>
					<AtOwnerHomeDayFilters state={state} handleCheckBoxes={handleCheckBoxes} />
				</Flex>
			)}
			{state['service'] && !state['service'].includes('Owner') && (
				<Flex width='100%' align='center' justify='space-between' mb={[2, 2, 2, 6]}>
					<AtHomeDayFilters state={state} handleCheckBoxes={handleCheckBoxes} />
				</Flex>
			)}
		</Box>
	)
}
