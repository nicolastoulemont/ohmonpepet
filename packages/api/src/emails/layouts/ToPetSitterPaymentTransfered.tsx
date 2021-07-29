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

export function ToPetSitterPaymentTransfered({
	lang = 'fr',
	buttonHref,
}: {
	lang: 'fr' | 'en'
	buttonHref: string
}) {
	const content = {
		title: {
			fr: 'Le paiement pour une de vos réservation a été transféré !',
			en: 'Payment for one of your reservations has been transferred!',
		},
		message: {
			fr:
				'La réservation est maintenant considérée comme terminée. Vous recevrez le montant dû dans les prochains jours (variables selon votre banque)',
			en:
				'The reservation is now considered complete. You will receive the amount due within the next few days (varies according to your bank).',
		},
		messageTwo: {
			fr:
				"Nous somme ravis d'avoir pu vous aider dans la mise en place de cette réservation.",
			en: 'We are delighted to have been able to help you with this booking.',
		},
		link: {
			fr: 'Voir la réservation',
			en: 'See the reservation',
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
