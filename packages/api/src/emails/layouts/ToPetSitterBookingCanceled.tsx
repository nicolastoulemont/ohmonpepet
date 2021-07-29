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
} from '../components'

export function ToPetSitterBookingCanceled({
	lang = 'fr',
	buttonHref,
}: {
	lang: 'fr' | 'en'
	buttonHref: string
}) {
	const content = {
		title: {
			fr: 'Une de vos réservation a été annulée',
			en: 'One of your booking has been canceled',
		},
		message: {
			fr: "Nous sommes désolés que cette réservation n'ait pu aboutir.",
			en: 'We are sorry that this booking could not be happen.',
		},
		link: {
			fr: 'Retourner sur ohmonpepet',
			en: 'Go back to ohmonpepet',
		},
	}

	return (
		<>
			<Container>
				<BrandHeader />
				<HeroSectionWithImage imageSrc='https://ohmonpepet-dev.s3.eu-west-3.amazonaws.com/email-assets/dog-walking.png'>
					<VeryLargeHeading text={content.title[lang]} />
					<Text text={content.message[lang]} />
				</HeroSectionWithImage>
				<Table>
					<Button href={buttonHref} text={content.link[lang]} />
				</Table>
			</Container>
			<Footer />
		</>
	)
}
