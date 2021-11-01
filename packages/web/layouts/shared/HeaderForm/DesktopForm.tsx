import { useColorMode } from '@chakra-ui/color-mode'
import { Flex } from '@chakra-ui/layout'
import React from 'react'
import { shadow } from 'theme/colors'
import { useI18n } from 'utils/hooks/useI18n'
import headerSearchJSON from 'statics/headerSearch.json'
import { AddressInput, RangeInput, MultiSelect } from 'components'
import { Button } from '@chakra-ui/button'
import { SearchIcon } from '@chakra-ui/icons'

export function DesktopForm({
	showBtn,
	handleSearch,
	state,
	setState,
	setFirstAvailableResult,
	errors,
	speciesOptions
}) {
	const { colorMode } = useColorMode()
	const { t } = useI18n(headerSearchJSON)

	return (
		<Flex
			as='form'
			autoComplete='off'
			position='absolute'
			boxShadow={shadow[colorMode]}
			backgroundColor='white'
			borderRadius='10px'
			p={6}
			zIndex={3}
			top={['60px', '65px']}
			left={[
				`calc(calc(100vw - 310px) / 2)`,
				`calc(calc(100vw - 500px) / 2)`,
				`calc(calc(100vw - 600px) / 2)`,
				`calc(calc(100vw - 600px) / 2)`,
				showBtn ? `25px` : `calc(calc(100vw - 900px) / 2)`
			]}
			width={
				showBtn
					? ['310px', '500px', '600px', '600px', '1200px']
					: ['310px', '500px', '600px', '600px', '900px']
			}
			height={
				showBtn
					? ['340px', '240px', '240px', '240px', '120px']
					: ['300px', '200px', '200px', '200px', '120px']
			}
			flexDir={['column', 'column', 'column', 'column', 'row']}
			align={'center'}
			justify='center'
			onSubmit={() => handleSearch && handleSearch()}
		>
			<Flex width={['100%', '100%', '100%', '100%', '80%']} mb={[4, 4, 4, 4, 0]}>
				<AddressInput
					parentState={state}
					setParentState={setState}
					address={state['address']}
					location={state['location']}
					giveOnlyPointData
					setFirstAvailableResult={setFirstAvailableResult}
				/>
			</Flex>

			<Flex
				width='100%'
				justify={[
					'space-between',
					'space-between',
					'space-between',
					'space-between',
					'center'
				]}
				flexDir={['column', 'row']}
				mb={[4, 4, 4, 4, 0]}
			>
				<RangeInput
					state={state}
					setState={setState}
					errors={errors}
					label={t('datesFieldLabel')}
					placeholder={t('datesFieldPlaceholder')}
					styles={{
						display: 'block',
						ml: [0, 0, 0, 0, 2],
						mr: [0, 2, 2, 2, 0],
						mb: [2, 0],
						maxWidth: ['100%', '50%']
					}}
				/>
				<MultiSelect
					name='acceptedAnimalsIds'
					placeholder={t('animalsFieldPlaceholder')}
					options={speciesOptions}
					state={state['acceptedAnimalsIds']}
					setState={setState}
					errors={errors}
					label={t('animalsField')}
					type='text'
					styles={{
						ml: [0, 2, 2, 2, 2],
						maxWidth: '250px'
					}}
					containerWidth='100%'
				/>
			</Flex>
			{showBtn && handleSearch && (
				<Flex
					align={['center', 'flex-end']}
					justify={['center', 'flex-end']}
					height={['68px']}
					width={['100%', '100%', '100%', '100%', 'auto']}
				>
					<Button
						width={['100%', 'auto']}
						leftIcon={<SearchIcon />}
						onClick={handleSearch}
						colorScheme='red'
					>
						{t('searchBtn')}
					</Button>
				</Flex>
			)}
		</Flex>
	)
}
