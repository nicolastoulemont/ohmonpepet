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

export function ToOwnerPetSitterRejected({
	lang = 'fr',
	buttonHref,
}: {
	lang: 'fr' | 'en'
	buttonHref: string
}) {
	const content = {
		title: {
			fr: 'Votre pet sitter a refusé votre demande.',
			en: 'Your pet sitter has refused your booking. ',
		},
		message: {
			fr:
				"Ne vous découragez pas ! Nous sommes sûrs que plein d'autres pet sitters seront ravis d'échanger avec vous.",
			en:
				"Don't be discouraged! We are sure that many other pet sitters will be delighted to talk to you.",
		},
		link: {
			fr: "Trouver d'autre pet sitters",
			en: 'Find other petsitters',
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
