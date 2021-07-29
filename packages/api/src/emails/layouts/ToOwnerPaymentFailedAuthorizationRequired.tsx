import React from 'react'
import { IBooking } from '../../schema/booking'
import { format } from 'date-fns'
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

export function ToOwnerPaymentFailedAuthorizationRequired({
	lang = 'fr',
	buttonHref,
	booking,
}: {
	lang: 'fr' | 'en'
	buttonHref: string
	booking: IBooking
}) {
	const content = {
		title: {
			fr: `Le paiement de votre réservation du ${format(
				new Date(booking.startDate),
				'dd/MM/yyyy',
			)} au ${format(new Date(booking.endDate), 'dd/MM/yyyy')} a échoué !`,
			en: `The payment of your reservation from ${format(
				new Date(booking.startDate),
				'MM/dd/yyyy',
			)} to ${format(new Date(booking.startDate), 'MM/dd/yyyy')} has failed !`,
		},
		message: {
			fr: `Notre processeur de paiement nous indique que le paiement de votre réservation (${booking.priceWithApplicationFee} euros) a échoué et nécessite votre autorisation. Veuillez cliquer sur le lien ci-dessous pour retourner sur votre réservation et autoriser le paiement.`,
			en: `Our payment processor tells us that the payment of your reservation (${booking.priceWithApplicationFee} euros) has failed and requires your authorization. Please click on the link below to return to your booking and authorize payment.`,
		},
		messageTwo: {
			fr:
				"En cas d'absence d'autorisation du paiement de votre part avant la fin de la réservation, nous serons dans l'obligation de faire intervenir un organisme de recouvrement de paiement afin de permettre le paiement du pet sitter.",
			en:
				'If you do not authorize payment before the end of the reservation, we will be forced to involve a payment collection agency to allow payment for the pet sitter.',
		},
		link: {
			fr: 'Autoriser le paiement de la réservation',
			en: 'Authorize the payment of the reservation',
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
