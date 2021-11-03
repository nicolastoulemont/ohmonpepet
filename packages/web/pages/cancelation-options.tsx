import { Layout } from 'components'
import React from 'react'
import { Flex, Image, Heading, Text } from '@chakra-ui/react'
import cancelationOptionsJSON from 'statics/misc/cancelationOptions.json'
import { useI18n } from 'utils/hooks/useI18n'

export default function CancelationOptions() {
	const { t } = useI18n(cancelationOptionsJSON)

	return (
		<Layout>
			<Flex
				flexDirection='column'
				justify='flex-start'
				width='100%'
				margin='0 auto'
				height='auto'
				boxSizing='border-box'
				textAlign='left'
			>
				<Image
					src='/img/browser-cancelation.svg'
					fallbackSrc='/img/browser-cancelation.svg'
					width={['125px', '200px']}
					height={['125px', '200px']}
					mt={[2, 6]}
					margin='0 auto'
					alt={t('imageAlt')}
				/>
				<Heading as='h1' mb={6} mt={8}>
					{t('title')}
				</Heading>
				<Heading as='h2' size='lg' my={6} textAlign='left' fontWeight={500}>
					Force Majeure
				</Heading>
				<Text my={2}>
					Les politiques d’annulation décrites dans les présentes sont susceptibles de ne
					pas s’appliquer dans certaines situations d’urgence indépendantes de la volonté
					des Prestataires de services et/ou des Propriétaires d’animaux de compagnie qui
					rendent impossible ou peu pratique l’exécution des Réservations convenues,
					telles que les évacuations résultant de tremblements de terre, d’ouragans,
					d’incendies, d’inondations, de guerres, d’émeutes ou d’autres catastrophes
					similaires. Dans de tels cas de figure, OHMONPEPET peut, à sa discrétion
					raisonnable, procéder à des remboursements.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left' fontWeight={500}>
					Remboursements pour défaut d’exécution
				</Heading>
				<Text my={2}>
					Si nous déterminons, à notre discrétion raisonnable, qu’un Prestataire de
					services n’a pas fourni les Services de garde d’animaux de compagnie convenus
					avec le Propriétaire de l’animal de compagnie ou qu’il ne respecte pas les
					présentes Conditions, nous pouvons, à notre discrétion raisonnable, annuler une
					Réservation et/ou rembourser entièrement ou partiellement le Propriétaire
					d’animal de compagnie.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left' fontWeight={500}>
					Conditions générales d’annulation
				</Heading>
				<Text my={2}>
					Si vous souhaitez annuler une Réservation, vous devez suivre la procédure
					disponible sur le Service OHMONPEPET. A cette fin, la date d’annulation est la
					date à laquelle un utilisateur effectue une annulation par l’intermédiaire du
					Service OHMONPEPET, indépendamment de toute communication distincte entre les
					utilisateurs hors du Service OHMONPEPET.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left' fontWeight={500}>
					Litiges relatifs au paiement et Paiement hors du Service OHMONPEPET
				</Heading>
				<Text my={2}>
					OHMONPEPET fera parvenir les paiements aux Prestataires de services 48 heures
					après la fin d’une Réservation. Une fois que ces montants auront été versés,
					tout autre litige relatif au paiement sera réglé entre le Propriétaire de
					l’animal de compagnie et le Prestataire de services, et OHMONPEPET n’est tenu ni
					d’agir à titre de médiateur ni de faciliter toute résolution. De plus,
					OHMONPEPET n’est tenu à aucune responsabilité ou obligation en ce qui concerne
					les pourboires, primes ou autres paiements effectués hors du Service OHMONPEPET.
				</Text>
			</Flex>
		</Layout>
	)
}
