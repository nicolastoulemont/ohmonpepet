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

export function ToOwnerPaymentAuthorized({
	lang = 'fr',
	buttonHref,
}: {
	lang: 'fr' | 'en'
	buttonHref: string
}) {
	const content = {
		title: {
			fr: 'Le paiement de votre réservation a été autorisé !',
			en: 'The payment of your reservation has been authorized!',
		},
		message: {
			fr:
				'La réservation est maintenant considérée comme confirmée. Votre paiement sera prélevé dans les 48h suivant le dernier jours de la garde.',
			en:
				'The reservation is now considered confirmed. Your payment will be debited within 48 hours of the last day of your stay.',
		},
		messageTwo: {
			fr:
				"Pendant ce délai, vous pourrez faire opposition au transfert si la garde n'a pas respectée les termes du service.",
			en:
				'During this period, you may object to the transfer if the custodian has not complied with the terms of the service.',
		},
		messageThree: {
			fr:
				"Dans ce cas, le transfert sera mis en attente avant de faire l'objet d'une résolution de litige avec notre service client.",
			en:
				'In this case, the transfer will be put on hold before being the subject of a dispute resolution with our customer service department.',
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
