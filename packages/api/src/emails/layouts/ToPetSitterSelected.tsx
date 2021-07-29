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

export function ToPetSitterSelected({
	lang = 'fr',
	buttonHref,
}: {
	lang: 'fr' | 'en'
	buttonHref: string
}) {
	const content = {
		title: {
			fr: 'Vous avez été sélectionné !',
			en: 'You have been selected by a pet owner !',
		},
		message: {
			fr:
				"Confimez rapidement la demande de réservation pour permettre au propriétaire d'effectuer le paiment.",
			en: 'Confirm the reservation request quickly to allow the owner to make the payment.',
		},
		link: {
			fr: 'Confirmer la demande de réservation',
			en: 'Confirm the reservation request',
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
