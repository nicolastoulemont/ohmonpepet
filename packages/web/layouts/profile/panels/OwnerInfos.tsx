import React from 'react'
import { Heading, Text, List, ListItem } from '@chakra-ui/react'
import profileOwnerJSON from 'statics/profileOwner.json'
import { useI18n } from 'utils/hooks/useI18n'

interface InfosFormProps {
	state: { [key: string]: string }
	setState: React.Dispatch<
		React.SetStateAction<{
			[key: string]: string
		}>
	>
	errors: { [key: string]: string }
	setErrors: React.Dispatch<
		React.SetStateAction<{
			[key: string]: string
		}>
	>
	languagesOptions: any
}

export function OwnerInfos({
	state,
	setState,
	errors,
	setErrors,
	languagesOptions
}: InfosFormProps) {
	const { t } = useI18n(profileOwnerJSON)

	return (
		<div>
			<Heading mt={12} mb={2}>
				{t('title')}
			</Heading>
			<Text color='gray.600' fontSize='lg' mb={0}>
				{t('subTitleOne')}
			</Text>
			<Text color='gray.500' mb={12}>
				{t('subTitleTwo')}
			</Text>
			<Text>Owner pets form: pet picture, specie, race, age ?, description</Text>
			<Text>Owner search preferences</Text>
			<List>
				<ListItem>Pet sitter minimal stars</ListItem>
				<ListItem>Pet sitter general features</ListItem>
				<ListItem>Pet sitter home features</ListItem>
				<ListItem>Pet sitter at owner home features</ListItem>
				<ListItem>Pet sitter environnement</ListItem>
			</List>
		</div>
	)
}
