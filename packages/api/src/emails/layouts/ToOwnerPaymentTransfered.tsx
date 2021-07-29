import React from 'react'
import {
	BrandHeader,
	Container,
	HeroSectionWithImage,
	Table,
	Text,
	VeryLargeHeading,
	Button,
	Footer,
	Row,
} from '../components'

export function ToOwnerPaymentTransfered({
	lang = 'fr',
	buttonHref,
}: {
	lang: 'fr' | 'en'
	buttonHref: string
}) {
	const content = {
		title: {
			fr: 'Le paiement de votre réservation a été transféré !',
			en: 'The payment of your reservation has been transfered!',
		},
		message: {
			fr: 'La réservation est maintenant considérée comme terminée.',
			en: 'The reservation is now considered finished.',
		},
		messageTwo: {
			fr:
				"Nous esperons que tout s'est bien passé au cours de votre réservation et vous revoir bientôt sur ohmonpepet.",
			en:
				'We hope everything went well during your booking and to see you again soon on ohmonpepet.',
		},

		link: {
			fr: 'Retourner sur ohmonpepet',
			en: 'Go back on ohmonpepet',
		},
	}

	return (
		<>
			<Container>
				<BrandHeader />
				<HeroSectionWithImage imageSrc='https://ohmonpepet-dev.s3.eu-west-3.amazonaws.com/email-assets/receipt.png'>
					<VeryLargeHeading text={content.title[lang]} />
					<Text text={content.message[lang]} />
				</HeroSectionWithImage>
				<Table>
					<Row>
						<Text text={content.messageTwo[lang]} />
					</Row>
					<Button href={buttonHref} text={content.link[lang]} />
				</Table>
			</Container>
			<Footer />
		</>
	)
}
