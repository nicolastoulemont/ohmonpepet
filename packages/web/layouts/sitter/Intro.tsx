import React from 'react'
import { Box, Heading, Text, Flex, Image } from '@chakra-ui/react'
import { useI18n } from 'utils/hooks/useI18n'

export function Intro({ profile, languagesLookUp }) {
	const { lang } = useI18n()

	return (
		<>
			<Box mb={6} width='100%'>
				<Heading mb={2}>{profile.firstName}</Heading>
				<Flex align='center' justify='flex-start'>
					<Text color='gray.500'>
						{profile.city}, {profile.postcode}
					</Text>
					<Flex ml={4} align='baseline' justify='flex-start'>
						{profile.languagesIds &&
							profile.languagesIds.map((languageId, index) => (
								<Image
									key={languageId}
									src={
										languagesLookUp[languageId] &&
										languagesLookUp[languageId].iconUrl
									}
									fallbackSrc={
										languagesLookUp[languageId] &&
										languagesLookUp[languageId].iconUrl
									}
									width='20px'
									ml={index !== 0 ? 2 : 0}
									alt={`spoken language : ${
										languagesLookUp[languageId] &&
										languagesLookUp[languageId].name[lang]
									}`}
								/>
							))}
					</Flex>
				</Flex>
			</Box>
		</>
	)
}
