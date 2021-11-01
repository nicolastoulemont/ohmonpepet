import React, { useMemo, useState, useEffect } from 'react'
import donationsJSON from 'statics/admin/donations.json'
import { useI18n } from 'utils/hooks/useI18n'
import { RangeInput, DocumentInput } from 'components'
import { SEARCH_DONATIONS } from 'graphql/donation/query'
import { SEARCH_RECEIPTS } from 'graphql/receipt/query'
import { stringToTyped } from 'utils'
import { getFirstDayOfLastMonth, getLastDayOfLastMonth } from 'utils/dates'
import axios from 'axios'
import {
	Heading,
	Flex,
	FormControl,
	FormLabel,
	Button,
	Select,
	Text,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	useToast
} from '@chakra-ui/react'
import {
	useSaveToStorageMutation,
	useSearchDonationsQuery,
	useCreateReceiptMutation
} from 'generated/graphql'

const initialQueryState = {
	donated: false,
	startDate: getFirstDayOfLastMonth(),
	endDate: getLastDayOfLastMonth()
}

export function AddDonationReceipt({ partnersOptions }) {
	const [isLoading, setIsLoading] = useState(false)
	const { t } = useI18n(donationsJSON)
	const [files, setFiles] = useState<Array<File>>([])
	const [errors, setErrors] = useState({})
	const [amountDonated, setAmountDonated] = useState('0')
	const toast = useToast()
	const [query, setQuery] = useState(initialQueryState)
	const { data } = useSearchDonationsQuery({
		variables: { input: query },
		fetchPolicy: 'network-only'
	})

	function handleChange(e: React.ChangeEvent<any>) {
		const { name, value } = stringToTyped(e)
		setQuery({ ...query, [name]: value })
	}

	const amountToDonate = useMemo(() => {
		if (!data) return 0
		return data?.searchDonations?.donations?.reduce(
			(acc, donation) => acc + donation.amountToDonate,
			0
		)
	}, [data])

	useEffect(() => {
		if (errors['amountToDonate']) {
			setErrors((currentErrors) => ({ ...currentErrors, amountToDonate: undefined }))
		}
		if (errors['filesUrls'] && files.length > 0) {
			setErrors((currentErrors) => ({ ...currentErrors, filesUrls: undefined }))
		}
	}, [amountToDonate, files])

	const donationsIds = useMemo(
		() =>
			data?.searchDonations?.donations
				? data.searchDonations.donations.map((donation) => donation.id)
				: [],

		[data]
	)

	const [saveToStorage] = useSaveToStorageMutation()

	async function saveAndReturnFilesNames() {
		const uploads = files.map(async (file) => {
			const { data } = await saveToStorage({
				variables: { fileName: `receipts/${file.name}`, fileType: file.type }
			})

			if (data.saveToStorage.signedRequest && data.saveToStorage.url) {
				const { signedRequest, url } = data.saveToStorage
				await axios.put(signedRequest, file, { headers: { 'Content-Type': file.type } })
				return url
			}
		})
		const urls = await Promise.all(uploads)
		return urls
	}

	const [createReceipt] = useCreateReceiptMutation()
	async function handleSubmit(
		event: React.FormEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>
	) {
		event.preventDefault()
		setIsLoading(true)
		if (files.length === 0) {
			setErrors((currentErrors) => ({ ...currentErrors, filesUrls: 'error' }))
		} else if (amountDonated === '0' || amountDonated === '') {
			setErrors((currentErrors) => ({ ...currentErrors, amountDonated: 'error' }))
		} else if (amountToDonate === 0) {
			setErrors((currentErrors) => ({ ...currentErrors, amountToDonate: 'error' }))
		} else if (donationsIds.length === 0) {
			setErrors((currentErrors) => ({ ...currentErrors, amountToDonate: 'error' }))
		} else if (!query['partnerId']) {
			setErrors((currentErrors) => ({ ...currentErrors, partnerId: 'error' }))
		} else {
			// Adapt the files urls to handle multiple files
			const filesUrls = await saveAndReturnFilesNames()
			const { data: receipt } = await createReceipt({
				variables: {
					input: {
						filesUrls,
						donationsIds,
						amountDonated: parseFloat(amountDonated),
						partnerId: query['partnerId'] as string
					}
				},
				refetchQueries: [
					{ query: SEARCH_DONATIONS, variables: { input: {} } },
					{ query: SEARCH_RECEIPTS, variables: { input: {} } }
				]
			})
			if (receipt?.createReceipt?.receipt.id) {
				toast({
					position: 'top',
					title: t('receiptSuccess'),

					status: 'success',
					duration: 9000,
					isClosable: true
				})
			} else if (receipt.createReceipt.errors) {
				toast({
					position: 'top',
					title: t('receiptError'),
					status: 'error',
					duration: 9000,
					isClosable: true
				})
			}
			setFiles([])
			setAmountDonated('0')
			setQuery(initialQueryState)
			setErrors({})
			setIsLoading(false)
		}
	}

	return (
		<Flex
			align='flex-start'
			justify='flex-start'
			flexDir='column'
			minHeight='30vh'
			p={6}
			boxShadow='rgba(0, 0, 0, 0.12) 0px 3px 8px'
			borderRadius='10px'
			as='form'
			onSubmit={handleSubmit}
		>
			<Heading as='h2' size='md' mb={2}>
				{t('addDonationReceipt')}
			</Heading>
			<Flex
				width='100%'
				justify='flex-start'
				align={{ base: 'center', sm: 'flex-end' }}
				flexDir={{ base: 'column', sm: 'row' }}
				mb={3}
			>
				<FormControl width={{ base: '100%', sm: '50%' }}>
					<FormLabel htmlFor='partnerId'>{t('partnerListLabel')}</FormLabel>
					<Select
						id='partnerId'
						name='partnerId'
						value={query['partnerId'] || ''}
						aria-describedby='association partner id'
						variant='outline'
						isInvalid={!!errors['partnerId']}
						onChange={handleChange}
						placeholder={t('partnerListPlaceholder')}
					>
						{partnersOptions.map((partner) => (
							<option key={partner.key} value={partner.value}>
								{partner.text}
							</option>
						))}
					</Select>
				</FormControl>
				<RangeInput
					state={query}
					setState={setQuery}
					errors={{}}
					label={t('datesFieldLabel')}
					placeholder={t('datesFieldPlaceholder')}
					styles={{
						mt: { base: 3, sm: 0 },
						ml: { base: 0, sm: 4 },
						width: { base: '100%', sm: '50%' }
					}}
				/>
			</Flex>

			<Text color={!!errors['amountToDonate'] ? 'red.500' : 'black'}>
				{t('amountToDonate')} {amountToDonate} €
			</Text>
			<FormControl isRequired my={3}>
				<FormLabel htmlFor='amountDonated'>{t('amountDonated')}</FormLabel>
				<NumberInput
					id='amountDonated'
					min={0}
					defaultValue={amountDonated}
					value={amountDonated}
					isInvalid={!!errors['amountDonated']}
					onChange={(value) => setAmountDonated(value)}
				>
					<NumberInputField />
					<NumberInputStepper>
						<NumberIncrementStepper />
						<NumberDecrementStepper />
					</NumberInputStepper>
				</NumberInput>
			</FormControl>

			<DocumentInput
				setFiles={setFiles}
				files={files}
				isInvalid={files.length === 0 && !!errors['filesUrls']}
			/>

			<Button mt={3} onClick={handleSubmit} isLoading={isLoading}>
				{t('addDonationReceiptBtn')}
			</Button>
		</Flex>
	)
}
