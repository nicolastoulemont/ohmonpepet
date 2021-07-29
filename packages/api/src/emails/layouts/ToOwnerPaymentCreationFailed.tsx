import React from 'react'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'
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

interface ToOwnerPaymentCreationFailedParams {
	lang: 'fr' | 'en'
	buttonHref: string
	sitterName: string
	bookingStart: number
	bookingEnd: number
	bookingPrice: string
	bookingAnimalSpecie: string
	paymentCreationDate: number
}

export function ToOwnerPaymentCreationFailed({
	lang = 'fr',
	buttonHref,
}: // sitterName,
// bookingAnimalSpecie,
// bookingEnd,
// bookingStart,
// bookingPrice,
// paymentCreationDate,
ToOwnerPaymentCreationFailedParams) {
	const content = {
		title: {
			fr: "L'autorisation de prélèvement de votre carte a échouée",
			en: 'The debit authorisation for your card has failed.',
		},
		// message: {
		// 	fr: `Dans le cadre de votre garde en cours avec ${sitterName} pour votre ${bookingAnimalSpecie} du ${format(
		// 		new Date(bookingStart),
		// 		'dd LLLL yyyy',
		// 		{ locale: lang === 'fr' ? fr : enUS },
		// 	)} au ${format(new Date(bookingEnd), 'dd LLLL yyyy', {
		// 		locale: lang === 'fr' ? fr : enUS,
		// 	})} vous avez sauvegardé votre carte le ${format(
		// 		new Date(paymentCreationDate),
		// 		'dd LLLL yyyy',
		// 		{ locale: lang === 'fr' ? fr : enUS },
		// 	)} et autorisé son prélèvement futur de ${bookingPrice} euros afin de régler le montant de la garde de votre animal.`,
		// 	en: `As part of your ongoing pet care with ${sitterName} for your ${bookingAnimalSpecie} from ${format(
		// 		new Date(bookingStart),
		// 		'dd LLLL yyyy',
		// 		{ locale: lang === 'fr' ? fr : enUS },
		// 	)} to ${format(new Date(bookingEnd), 'dd LLLL yyyy', {
		// 		locale: lang === 'fr' ? fr : enUS,
		// 	})} you saved your card on ${format(new Date(paymentCreationDate), 'dd LLLL yyyy', {
		// 		locale: lang === 'fr' ? fr : enUS,
		// 	})} and authorised its future withdrawal of ${bookingPrice} euros in order to pay the amount for the care of your pet.`,
		// },
		message: {
			fr: 'Main message',
			en: 'Main message',
		},
		messageTwo: {
			fr: 'Secondary message',
			en: 'Secondary message',
		},
		messageThree: {
			fr: 'Tertionary message',
			en: 'Tertionary message',
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
