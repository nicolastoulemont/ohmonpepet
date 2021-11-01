import React, { useState } from 'react'
import { panelBgColor, color, shadow, borderRadius } from 'theme/colors'
import { MultiSelect, AddressInput, RangeInput } from 'components'
import { Flex, useColorMode, Button } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { useI18n } from 'utils/hooks/useI18n'
import rootJSON from 'statics/root.json'
import { useSearchAndPush } from 'utils/hooks/useSearchAndPush'

interface SearchState {
	address: string
	location: {
		type: string
		coordinates: Array<number>
	}
	startDate: number
	endDate: number
	acceptedAnimalsIds: Array<string>
}

export function Search({ speciesOptions }) {
	const { colorMode } = useColorMode()
	const { t } = useI18n(rootJSON)
	const [errors] = useState<{ [key: string]: string }>({})
	const [firstAvailableResult, setFirstAvailableResult] = useState({
		address: '',
		location: {
			type: 'Point',
			coordinates: []
		}
	})
	const [state, setState] = useState<SearchState>({
		address: '',
		location: {
			type: 'Point',
			coordinates: []
		},
		startDate: Date.now(),
		endDate: Date.now(),
		acceptedAnimalsIds: []
	})

	const { valid, search } = useSearchAndPush(state, firstAvailableResult)

	function handleSearch(e: React.FormEvent) {
		e.preventDefault()
		if (!valid) {
			document?.getElementById('address')?.focus()
		} else {
			search()
		}
	}

	return (
		<Flex
			as='section'
			backgroundColor={panelBgColor[colorMode]}
			color={color[colorMode]}
			boxShadow={shadow[colorMode]}
			borderRadius={borderRadius}
			padding={6}
			direction='column'
			maxWidth='1200px'
			mb={{ base: 6, md: '300px' }}
		>
			<Flex
				as='form'
				align={{ base: 'center', lg: 'flex-end' }}
				justify={{ base: 'center', lg: 'flex-end' }}
				flexDir={{ base: 'column', lg: 'row' }}
				width='100%'
				autoComplete='off'
				onSubmit={handleSearch}
			>
				<Flex width={{ base: '100%', lg: 'auto' }} flex={['0', '0', '0', '1']}>
					<AddressInput
						parentState={state}
						setParentState={setState}
						setFirstAvailableResult={setFirstAvailableResult}
					/>
				</Flex>
				<Flex
					align={{ base: 'center', lg: 'flex-end' }}
					justify={['center']}
					flexDir={{ base: 'column', lg: 'row' }}
					width={{ base: '100%', lg: 'auto' }}
					mt={{ base: 4, lg: 0 }}
				>
					<Flex
						width={{ base: '100%', lg: 'auto' }}
						justify={{ base: 'center', sm: 'space-between', lg: 'center' }}
						flexDir={{ base: 'column', sm: 'row' }}
					>
						<RangeInput
							state={state}
							setState={setState}
							errors={errors}
							label={t('datesFieldLabel')}
							placeholder={t('datesFieldPlaceholder')}
							styles={{
								mr: [0, 2],
								ml: [0, 0, 0, 4],
								width: ['100%', '40%', '40%', 'auto']
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
								mt: [4, 0],
								ml: [0, 2],
								mr: [0, 0, 0, 4],
								maxWidth: ['none', 'none', 'none', '250px'],
								width: ['100%', '40%', '40%', '250px']
							}}
							containerWidth='100%'
						/>
					</Flex>

					<Button
						leftIcon={<SearchIcon />}
						onClick={handleSearch}
						mt={[4, 4, 4, 0]}
						width={['100%', '100%', '50%', 'auto']}
						colorScheme='red'
						fontSize={['lg', 'lg', 'lg', 'md']}
						px={6}
					>
						{t('searchBtn')}
					</Button>
				</Flex>
			</Flex>
		</Flex>
	)
}
