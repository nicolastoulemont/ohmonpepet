import React from 'react'
import NextLink from 'next/link'
import { useI18n } from 'utils/hooks/useI18n'
import profileJson from 'statics/profile.json'

import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Link
} from '@chakra-ui/react'

export function ToOnBoardingModal() {
	const { t } = useI18n(profileJson)
	return (
		<Modal isOpen={true} closeOnOverlayClick={false} onClose={() => {}} isCentered size='xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader textAlign='center'>{t('toOnBoardingModalTitle')}</ModalHeader>
				<ModalBody textAlign='center'>{t('toOnBoardingModalContent')}</ModalBody>
				<ModalFooter>
					<NextLink href='/onboarding' passHref>
						<Link
							backgroundColor='red.500'
							color='white'
							px={4}
							py={2}
							borderRadius='4px'
							fontWeight={600}
						>
							{t('toOnBoardingModalForwardLink')}
						</Link>
					</NextLink>
					<NextLink href='/profile' passHref>
						<Link
							backgroundColor='gray.100'
							color='black'
							px={4}
							py={2}
							ml={2}
							borderRadius='4px'
							fontWeight={600}
						>
							{t('toOnBoardingModalGoBackLink')}
						</Link>
					</NextLink>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
