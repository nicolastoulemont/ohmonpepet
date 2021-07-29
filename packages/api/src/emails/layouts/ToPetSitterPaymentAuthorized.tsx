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

export function ToPetSitterPaymentAuthorized({
	lang = 'fr',
	buttonHref,
}: {
	lang: 'fr' | 'en'
	buttonHref: string
}) {
	const content = {
		title: {
			fr: 'Le paiement pour une de vos réservation a été autorisé !',
			en: 'Payment for one of your reservations has been authorised!',
		},
		message: {
			fr:
				'La réservation est maintenant considérée comme confirmée. Vous recevrez le paiement dans les 48h suivant le dernier jour de la garde.',
			en:
				'The reservation is now considered confirmed. You will receive payment within 48 hours of the last day of the stay.',
		},
		messageTwo: {
			fr:
				"Pendant ce délai, le propriétaire pourra faire opposition au paiement si la garde n'a pas respectée les termes du service.",
			en:
				'During this period, the owner may object to the payment if the reservation has not respected the terms of the service.',
		},
		messageThree: {
			fr:
				"Dans ce cas, le paiement sera mis en attente avant de faire l'objet d'une résolution de litige avec notre service client.",
			en:
				'In this case, the payment will be put on hold before being the subject of a dispute resolution with our client department.',
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
						<Text text={content.messageThree[lang]} />
					</Row>
					<Button href={buttonHref} text={content.link[lang]} />
				</Table>
			</Container>
			<Footer />
		</>
	)
}
