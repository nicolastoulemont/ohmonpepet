import { Layout, Loader } from 'components'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Box, Flex, Heading } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'
import onBoardingStartJSON from 'statics/onboarding/start.json'
import { useProfileByCurrentUserIdQuery } from 'generated/graphql'
import { NotConnected } from 'layouts/onboarding/NotConnected'
import { hostingNeededfields, personalNeededFields } from 'layouts/onboarding/shared'
import { SignInForm } from 'layouts/shared/SignInForm'
import { SignUpForm } from 'layouts/shared/SignUpForm'
import { isEmpty } from 'utils/errors'

export default function OnBoardingStart() {
	const [form, setForm] = useState('none')
	const { t } = useI18n(onBoardingStartJSON)
	const { data, loading } = useProfileByCurrentUserIdQuery()
	const { query, push } = useRouter()

	const isMissingField = (fields: Array<string>, data: { [key: string]: any }) =>
		fields.reduce((acc, field) => {
			if (isEmpty(data[field])) {
				acc = true
			}
			return acc
		}, false)

	useEffect(() => {
		if (query.panel !== 'signin') {
			if (data?.profileByCurrentUserId.errors && form !== 'none') {
				setForm('none')
			} else if (data?.profileByCurrentUserId.profile) {
				if (isMissingField(personalNeededFields, data.profileByCurrentUserId.profile)) {
					push('/onboarding/personal')
				} else if (
					isMissingField(hostingNeededfields, data.profileByCurrentUserId.profile)
				) {
					push('/onboarding/hosting')
				} else if (data.profileByCurrentUserId.profile.availability.length === 0) {
					push('/onboarding/availabilty')
				} else {
					push('/onboarding/complete')
				}
			}
		}
	}, [data])

	useEffect(() => {
		if (query && query.panel) {
			setForm(query.panel as string)
		} else if (!query?.panel && form !== 'none') {
			setForm('none')
		}
	}, [query])

	if (loading || data?.profileByCurrentUserId.profile) {
		return (
			<Layout>
				<Box width='100%' height={['auto', 'auto', 'calc(100vh - 98px)']}>
					<Loader />
				</Box>
			</Layout>
		)
	}

	return (
		<Layout>
			<Box width='100%' height={['auto', 'auto', 'calc(100vh - 98px)']}>
				<Heading as='h1' textAlign='center' my={6}>
					{t('title')}
				</Heading>
				{form === 'none' && <NotConnected />}
				{form === 'signin' && (
					<Flex width='100%' height='100%' align='flex-start' justify='center'>
						<SignInForm />
					</Flex>
				)}
				{form === 'signup' && (
					<Flex width='100%' height='100%' align='flex-start' justify='center'>
						<SignUpForm originUrl='src=onboarding&panel=signin' />
					</Flex>
				)}
			</Box>
		</Layout>
	)
}
