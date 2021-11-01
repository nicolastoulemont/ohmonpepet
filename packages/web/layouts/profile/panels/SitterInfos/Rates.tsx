import React from 'react'
import { useI18n } from 'utils/hooks/useI18n'
import profileJson from 'statics/profile.json'
import {
	Heading,
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	Checkbox
} from '@chakra-ui/react'

export default function Rates({ state, handleCheckBoxes, handleChange, errors }) {
	const { t } = useI18n(profileJson)
	return (
		<>
			<Heading mb={6} size='md'>
				{t('services')}
			</Heading>
			<Flex mb={[6, 6, 6, 12]} width='100%' flexDir={['column', 'column', 'column', 'row']}>
				<Box flex='1' mr={[0, 0, 0, 6]}>
					<Heading mb={6} size='sm' as='h4'>
						{t('atHome')}
					</Heading>
					<FormControl flex='1' mb={6} isRequired>
						<FormLabel htmlFor='atHomeDay'>{t('atHomeDay')}</FormLabel>
						<Input
							type='number'
							id='atHomeDay'
							step='0.01'
							name='atHomeDay'
							value={state['atHomeDay'] || ''}
							aria-describedby='atHomeDay'
							variant='outline'
							onChange={handleChange}
							isInvalid={!!errors['atHomeDay']}
						/>
						<FormHelperText>{t('mandatorySitterField')}</FormHelperText>
					</FormControl>
					<FormControl flex='1' mb={6}>
						<FormLabel htmlFor='atHomeHour'>{t('atHomeHour')}</FormLabel>
						<Input
							type='number'
							step='0.01'
							id='atHomeHour'
							name='atHomeHour'
							value={state['atHomeHour'] || ''}
							aria-describedby='atHomeHour'
							variant='outline'
							onChange={handleChange}
							isInvalid={!!errors['atHomeHour']}
						/>
					</FormControl>
					<Flex flexDir='column'>
						<Checkbox
							my={1}
							isChecked={state['atHomeExclusivity'] || false}
							onChange={(e) =>
								handleCheckBoxes('atHomeExclusivity', e.target.checked)
							}
						>
							{t('atHomeExclusivity')}
						</Checkbox>
						{state['atHomeExclusivity'] && (
							<FormControl mb={1} maxWidth='220px'>
								<FormLabel htmlFor='atHomeExclusivityExtraPrice' fontSize='14px'>
									{t('extraPrice')}
								</FormLabel>
								<Input
									type='number'
									step='0.01'
									id='atHomeExclusivityExtraPrice'
									name='atHomeExclusivityExtraPrice'
									value={state['atHomeExclusivityExtraPrice'] || ''}
									aria-describedby='atHomeExclusivityExtraPrice'
									variant='outline'
									onChange={handleChange}
									isInvalid={!!errors['atHomeExclusivityExtraPrice']}
									size='sm'
								/>
							</FormControl>
						)}
						<Checkbox
							my={1}
							isChecked={state['atHomeContinuously'] || false}
							onChange={(e) =>
								handleCheckBoxes('atHomeContinuously', e.target.checked)
							}
						>
							{t('atHomeContinuously')}
						</Checkbox>
						{state['atHomeContinuously'] && (
							<FormControl mb={1} maxWidth='220px'>
								<FormLabel htmlFor='atHomeContinuouslyExtraPrice' fontSize='14px'>
									{t('extraPrice')}
								</FormLabel>
								<Input
									type='number'
									step='0.01'
									id='atHomeContinuouslyExtraPrice'
									name='atHomeContinuouslyExtraPrice'
									value={state['atHomeContinuouslyExtraPrice'] || ''}
									aria-describedby='atHomeContinuouslyExtraPrice'
									variant='outline'
									onChange={handleChange}
									isInvalid={!!errors['atHomeContinuouslyExtraPrice']}
									size='sm'
								/>
							</FormControl>
						)}
						<Checkbox
							my={1}
							isChecked={state['atHomeOnlyBringPet'] || false}
							onChange={(e) =>
								handleCheckBoxes('atHomeOnlyBringPet', e.target.checked)
							}
						>
							{t('atHomeOnlyBringPet')}
						</Checkbox>
						{state['atHomeOnlyBringPet'] && (
							<FormControl mb={1} maxWidth='220px'>
								<FormLabel htmlFor='atHomeOnlyBringPetExtraPrice' fontSize='14px'>
									{t('extraPrice')}
								</FormLabel>
								<Input
									type='number'
									step='0.01'
									id='atHomeOnlyBringPetExtraPrice'
									name='atHomeOnlyBringPetExtraPrice'
									value={state['atHomeOnlyBringPetExtraPrice'] || ''}
									aria-describedby='atHomeOnlyBringPetExtraPrice'
									variant='outline'
									onChange={handleChange}
									isInvalid={!!errors['atHomeOnlyBringPetExtraPrice']}
									size='sm'
								/>
							</FormControl>
						)}
						<Checkbox
							my={1}
							isChecked={state['atHomeComeGetPet'] || false}
							onChange={(e) => handleCheckBoxes('atHomeComeGetPet', e.target.checked)}
						>
							{t('atHomeComeGetPet')}
						</Checkbox>
						{state['atHomeComeGetPet'] && (
							<FormControl mb={1} maxWidth='220px'>
								<FormLabel htmlFor='atHomeComeGetPetExtraPrice' fontSize='14px'>
									{t('extraPrice')}
								</FormLabel>
								<Input
									type='number'
									step='0.01'
									id='atHomeComeGetPetExtraPrice'
									name='atHomeComeGetPetExtraPrice'
									value={state['atHomeComeGetPetExtraPrice'] || ''}
									aria-describedby='atHomeComeGetPetExtraPrice'
									variant='outline'
									onChange={handleChange}
									isInvalid={!!errors['atHomeComeGetPetExtraPrice']}
									size='sm'
								/>
							</FormControl>
						)}
					</Flex>
				</Box>
				<Box flex='1' ml={[0, 0, 0, 6]} mt={[6, 6, 6, 0]}>
					<Heading mb={6} size='sm' as='h4'>
						{t('petWalkLabel')}
					</Heading>
					<FormControl flex='1' mb={6}>
						<FormLabel htmlFor='petWalk'>{t('petWalk')}</FormLabel>
						<Input
							type='number'
							id='petWalk'
							step='0.01'
							name='petWalk'
							value={state['petWalk'] || ''}
							aria-describedby='petWalk'
							variant='outline'
							onChange={handleChange}
							isInvalid={!!errors['petWalk']}
						/>
					</FormControl>
					<Heading mb={6} size='sm' as='h4'>
						{t('atOwnerHome')}
					</Heading>
					<FormControl flex='1' mb={6}>
						<FormLabel htmlFor='atOwnerHomeDay'>{t('atOwnerHomeDay')}</FormLabel>
						<Input
							type='number'
							step='0.01'
							id='atOwnerHomeDay'
							name='atOwnerHomeDay'
							value={state['atOwnerHomeDay'] || ''}
							aria-describedby='atOwnerHomeDay'
							variant='outline'
							onChange={handleChange}
							isInvalid={!!errors['atOwnerHomeDay']}
						/>
					</FormControl>
					<FormControl flex='1' mb={6}>
						<FormLabel htmlFor='atOwnerHomeHour'>{t('atOwnerHomeHour')}</FormLabel>
						<Input
							type='number'
							step='0.01'
							id='atOwnerHomeHour'
							name='atOwnerHomeHour'
							value={state['atOwnerHomeHour'] || ''}
							aria-describedby='atOwnerHomeHour'
							variant='outline'
							onChange={handleChange}
							isInvalid={!!errors['atOwnerHomeHour']}
						/>
					</FormControl>
					<Flex flexDir='column'>
						<Checkbox
							my={1}
							isChecked={state['atOwnerHomePlantsCare'] || false}
							onChange={(e) =>
								handleCheckBoxes('atOwnerHomePlantsCare', e.target.checked)
							}
						>
							{t('atOwnerHomePlantsCare')}
						</Checkbox>
						{state['atOwnerHomePlantsCare'] && (
							<FormControl mb={1} maxWidth='220px'>
								<FormLabel
									htmlFor='atOwnerHomePlantsCareExtraPrice'
									fontSize='14px'
								>
									{t('extraPrice')}
								</FormLabel>
								<Input
									type='number'
									step='0.01'
									id='atOwnerHomePlantsCareExtraPrice'
									name='atOwnerHomePlantsCareExtraPrice'
									value={state['atOwnerHomePlantsCareExtraPrice'] || ''}
									aria-describedby='atOwnerHomePlantsCareExtraPrice'
									variant='outline'
									onChange={handleChange}
									isInvalid={!!errors['atOwnerHomePlantsCareExtraPrice']}
									size='sm'
								/>
							</FormControl>
						)}

						<Checkbox
							my={1}
							isChecked={state['atOwnerHomeMail'] || false}
							onChange={(e) => handleCheckBoxes('atOwnerHomeMail', e.target.checked)}
						>
							{t('atOwnerHomeMail')}
						</Checkbox>
						{state['atOwnerHomeMail'] && (
							<FormControl mb={1} maxWidth='220px'>
								<FormLabel htmlFor='atOwnerHomeMailExtraPrice' fontSize='14px'>
									{t('extraPrice')}
								</FormLabel>
								<Input
									type='number'
									step='0.01'
									id='atOwnerHomeMailExtraPrice'
									name='atOwnerHomeMailExtraPrice'
									value={state['atOwnerHomeMailExtraPrice'] || ''}
									aria-describedby='atOwnerHomeMailExtraPrice'
									variant='outline'
									onChange={handleChange}
									isInvalid={!!errors['atOwnerHomeMailExtraPrice']}
									size='sm'
								/>
							</FormControl>
						)}
						<Checkbox
							my={1}
							isChecked={state['atOwnerHomeCurtains'] || false}
							onChange={(e) =>
								handleCheckBoxes('atOwnerHomeCurtains', e.target.checked)
							}
						>
							{t('atOwnerHomeCurtains')}
						</Checkbox>
						{state['atOwnerHomeCurtains'] && (
							<FormControl mb={1} maxWidth='220px'>
								<FormLabel htmlFor='atOwnerHomeCurtainsExtraPrice' fontSize='14px'>
									{t('extraPrice')}
								</FormLabel>
								<Input
									type='number'
									step='0.01'
									id='atOwnerHomeCurtainsExtraPrice'
									name='atOwnerHomeCurtainsExtraPrice'
									value={state['atOwnerHomeCurtainsExtraPrice'] || ''}
									aria-describedby='atOwnerHomeCurtainsExtraPrice'
									variant='outline'
									onChange={handleChange}
									isInvalid={!!errors['atOwnerHomeCurtainsExtraPrice']}
									size='sm'
								/>
							</FormControl>
						)}
					</Flex>
				</Box>
			</Flex>
		</>
	)
}
