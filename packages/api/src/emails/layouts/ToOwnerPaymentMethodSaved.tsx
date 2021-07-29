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

export function ToOwnerPaymentMethodSaved({
	lang = 'fr',
	buttonHref,
}: {
	lang: 'fr' | 'en'
	buttonHref: string
}) {
	const content = {
		title: {
			fr: 'Votre carte a bien été enregistrée',
			en: 'Your card has been saved',
		},
		message: {
			fr:
				"La réservation est maintenant considérée comme confirmée. Nous demanderons à votre banque l'autorisation de prélèvement du montant dû 2 jours avant la fin de la réservation.",
			en:
				'The reservation is now considered confirmed. We will ask your bank for authorisation to debit the amount 2 days before the end of the reservation.',
		},
		messageTwo: {
			fr:
				"En cas de refus de votre banque d'autoriser le paiement, vous recevrez un email vous informant de ce refus et vous enjoignant à vous connecter afin d'autoriser vous même le paiement.",
			en:
				'If your bank refuses to authorise the payment, you will receive an email informing you of this refusal and instructing you to log in in order to authorise the payment yourself.',
		},
		messageThree: {
			fr:
				"Si vous n'autorisez pas le paiement de votre réservation avant la fin de la réservation, nous serons dans l'obligation d'avoir recours à organisme de recouvrement afin de permettre le paiment du petsitter.",
			en:
				'If you do not authorise the payment of your reservation before the end of the booking, we will be obliged to use a collection agency in order to allow the payment of the petsitter.',
		},
		messageFour: {
			fr:
				"Votre paiement sera prélevé dans les 48h suivant le dernier jours de la garde. Pendant ce délai, vous pourrez faire opposition au transfert si la garde n'a pas respectée les termes du service.",
			en:
				'Your payment will be debited within 48 hours of the last day of custody. During this period, you may object to the transfer if the custodian has not complied with the terms of the service.',
		},
		messageFive: {
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
						<Text text={content.messageFour[lang]} />
						<Text text={content.messageFive[lang]} />
					</Row>
					<Button href={buttonHref} text={content.link[lang]} />
				</Table>
			</Container>
			<Footer />
		</>
	)
}
