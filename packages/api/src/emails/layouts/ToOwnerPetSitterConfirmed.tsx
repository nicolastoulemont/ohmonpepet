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

export function ToOwnerPetSitterConfirmed({
	lang = 'fr',
	buttonHref,
}: {
	lang: 'fr' | 'en'
	buttonHref: string
}) {
	const content = {
		title: {
			fr: 'Votre pet sitter a accepté votre demande !',
			en: 'Your pet sitter has accepted your request !',
		},
		message: {
			fr:
				'Vous pouvez maintenant procéder au paiement et ainsi finaliser la réservation ou échanger un peu plus avec le pet sitter.',
			en:
				'You can now proceed to the payment and thus finalize the reservation or exchange a little more with the pet sitter.',
		},
		link: {
			fr: 'Voir votre réservation',
			en: 'See your reservation',
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
