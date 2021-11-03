import { Layout } from 'components'
import React from 'react'
import { Flex, Image, Heading, Text, OrderedList, ListItem, UnorderedList } from '@chakra-ui/react'
import cgsJSON from 'statics/misc/cgs.json'
import { useI18n } from 'utils/hooks/useI18n'
import { format } from 'date-fns'
import { fr, enUS } from 'date-fns/locale'

export default function Cgs() {
	const { t, lang } = useI18n(cgsJSON)

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
					src='/img/law-book.svg'
					width={['125px', '200px']}
					height={['125px', '200px']}
					mt={[2, 6]}
					margin='0 auto'
					alt={t('title')}
				/>
				<Heading as='h1' mb={6} mt={8}>
					{t('title')}
				</Heading>
				<Text my={2}>
					Entre en vigueur à compter du{' '}
					{format(new Date(), 'd LLLL yyyy', {
						locale: lang === 'fr' ? fr : enUS
					})}
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					1. Acceptation des conditions et Modifications.
				</Heading>
				<Text my={2}>
					Les présentes Conditions d’utilisation du Service (les « Conditions »)
					constituent un accord juridique contraignant entre vous et A Place for
					OHMONPEPET, Inc., une société constituée en vertu des lois du Delaware et dont
					le siège social est sis 711 Capitol Way S., Suite 204, Olympia, WA 98501, USA («
					OHMONPEPET », « nous » et « nos »). Les présentes Conditions régissent votre
					utilisation de nos applications logicielles, ressources et services afin que les
					propriétaires d’animaux de compagnie et les prestataires de services à
					destination des animaux de compagnie puissent entrer en relation, communiquer et
					organiser la prestation de services de garde de leur animal de compagnie
					(collectivement, notre « Service OHMONPEPET »). Les Conditions régissent toute
					utilisation du Service OHMONPEPET, que vous y accédiez depuis notre site
					Internet à l’adresse https://ohmonpepet.com (ou toute version localisée) (le «
					Site »), nos applications mobiles et sites Internet mobiles, notre application
					Facebook, nos offres d'assistance en ligne ou téléphonique, ou tout autre point
					d’accès que nous mettons à votre disposition. Nos Conditions de Garantie
					OHMONPEPET, notre Politique de Protection de réservation et toutes les autres
					Politiques applicables à votre utilisation du Service OHMONPEPET sont intégrées
					par référence dans les présentes Conditions d’utilisation. EN ACCEPTANT LES
					PRÉSENTES CONDITIONS LORS DE LA CRÉATION D’UN COMPTE OU EN ACCÉDANT OU EN
					UTILISANT LE SERVICE OHMONPEPET SANS POSSÉDER DE COMPTE, VOUS ACCEPTEZ LES
					PRÉSENTES CONDITIONS. SI VOUS N’ÊTES PAS D’ACCORD AVEC LES PRÉSENTES CONDITIONS,
					VOUS NE DEVEZ PAS LES ACCEPTER, AUQUEL CAS VOUS N’AVEZ PAS LE DROIT D’UTILISER
					LE SERVICE OHMONPEPET Vous comprenez et acceptez que nous sommes susceptibles de
					modifier les Conditions de temps à autre, et que ces modifications seront
					effectives (sauf indication contraire prévue à l’Article 17.10 ci-dessous)
					lorsque nous publierons la nouvelle version de ces Conditions sur le Service
					OHMONPEPET, à moins que la loi applicable n’en dispose autrement. Votre accès et
					votre utilisation continus du Service OHMONPEPET après la publication de la
					nouvelle version des Conditions valent acceptation de ces Conditions telles que
					modifiées.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					2. Service OHMONPEPET.
				</Heading>
				<OrderedList spacing={2}>
					<ListItem>Nature du Service OHMONPEPET.</ListItem>
					<Text my={2}>
						Le Service OHMONPEPET se compose d’une application Web de bureau,
						d’applications mobiles et divers autres outils, d’un service d’assistance et
						de services connexes que les Propriétaires d’animaux de compagnie («
						Propriétaires d’animaux de compagnie ») et les prestataires de services à
						destination des animaux de compagnie (« Prestataires de services ») peuvent
						utiliser pour entrer en relation, communiquer et interagir. Le Service
						OHMONPEPET comprend nos services d’assistance en cas d’urgence, des
						documents pédagogiques pour les Prestataires de services ainsi que d’autres
						services. Nous facturons une commission à l’égard de certains aspects du
						Service OHMONPEPET, tel que décrit ci-dessous à l’Article 9.
					</Text>
					<ListItem>
						OHMONPEPET ne fournit pas de Services de garde d’animaux de compagnie
					</ListItem>
					<Text my={2}>
						OHMONPEPET est une plateforme de mise en relation à destination des
						Prestataires de services et des Propriétaires d’animaux de compagnie.
						OHMONPEPET n’est pas un Prestataire de services et, à l’exception de
						l’assistance téléphonique en cas d’urgence et d’autres ressources et
						services d’assistance spécifiquement décrits dans le Service OHMONPEPET,
						nous ne fournissons pas de services de garde d’animaux de compagnie. Nous ne
						faisons aucune déclaration et ne fournissons aucune garantie quant à la
						qualité de l’hébergement pour chien, de la garde de jour des animaux de
						compagnie, de la promenade des chiens, de la garde à domicile ou d’autres
						services fournis par les Prestataires de services (« Services de garde
						d’animaux de compagnie »), ni concernant vos interactions et relations avec
						les utilisateurs. Les Prestataires de services inscrits sur OHMONPEPET ne
						sont pas sous la direction ou le contrôle de OHMONPEPET, et les Prestataires
						de services déterminent, à leur propre discrétion, de quelle manière ils
						fournissent les Services de garde d’animaux de compagnie. Bien que, sur
						notre Site, nous fournissions des conseils généraux à destination des
						Prestataires de services concernant la sécurité et la garde d’animaux de
						compagnie et des Propriétaires d’animaux de compagnie concernant le choix et
						la sélection des Prestataires de services, OHMONPEPET n’emploie pas, ne
						recommande pas et ne se porte pas garant des Prestataires de services ou des
						Propriétaires d’animaux de compagnie et, dans la mesure maximale autorisée
						par la loi applicable, ne saurait être tenu responsable de l’exécution des
						obligations ou du comportement des Prestataires de services ou des
						Propriétaires d’animaux de compagnie, en ligne ou horsligne. Une agence
						tierce effectue un examen initial du profil des Prestataires de services et
						procède à la vérification des antécédents ou à la vérification de leur
						identité (tel que décrit à l’Article 10, ci-dessous), mais, sauf indication
						contraire explicite dans le Service OHMONPEPET (et seulement dans la mesure
						précisée), nous n’effectuons pas d’autres vérifications à l’égard des
						Prestataires de services ou des Propriétaires d’animaux de compagnie. Vous
						devez faire preuve de vigilance et exercer votre jugement en toute
						indépendance avant de sélectionner un Prestataire de services, de fournir
						des Services de garde d’animaux de compagnie ou d’interagir avec les
						utilisateurs par l’intermédiaire du Service OHMONPEPET. Les Propriétaires
						d’animaux de compagnie et les Prestataires de services sont seuls
						responsables des décisions prises dans leur meilleur intérêt et dans celui
						de leurs animaux de compagnie. Par exemple, chaque utilisateur du Service
						OHMONPEPET est responsable de la mise à jour des vaccins de son propre
						animal de compagnie, et nous ne saurons être tenus responsables si la
						vaccination d’un animal de compagnie n’est pas à jour.
					</Text>
					<ListItem>Décharge.</ListItem>
					<Text my={2}>
						Sous réserve de l’Article 16 ci-dessous, OHMONPEPET décline toute
						responsabilité à l’égard des réclamations, blessures, pertes, préjudices
						et/ou dommages découlant de et/ou se rapportant de quelque façon que ce soit
						à vos interactions ou transactions avec d’autres utilisateurs et aux actes
						et/ou omissions des Prestataires de services et des Propriétaires d’animaux
						de compagnie, en ligne ou hors ligne. Vous reconnaissez et acceptez que,
						dans la mesure maximale permise par la loi applicable, VOTRE UTILISATION
						ET/OU LA PRESTATION DE SERVICES DE GARDE D’ANIMAUX DE COMPAGNIE SE FAIT À
						VOS PROPRES RISQUES (les obligations financières que OHMONPEPET peut avoir
						envers ses utilisateurs en rapport avec le comportement de ces derniers sont
						limitées aux obligations de remboursement énoncées dans la Garantie
						OHMONPEPET).
					</Text>
					<ListItem>
						Les transactions se font entre les Propriétaires d’animaux de compagnie et
						les Prestataires de services.
					</ListItem>
					<Text my={2}>
						Le Service OHMONPEPET peut être utilisé pour bénéficier et fournir des
						Services de garde d’animaux de compagnie et pour faciliter le règlement,
						mais toutes les transactions effectuées par l’intermédiaire du Service
						OHMONPEPET se font entre les Propriétaires d’animaux de compagnie et les
						Prestataires de services. À l’exception des remboursements limités et de la
						« Protection de réservation » mentionnés à l’Article 9.6 et dans la Garantie
						OHMONPEPET, vous acceptez que OHMONPEPET n'assume aucune responsabilité
						quant aux dommages associés aux Services de garde d’animaux de compagnie
						(qui peuvent inclure des blessures corporelles ou le décès d’un animal) ou
						résultant de toute autre transaction entre les utilisateurs du Service
						OHMONPEPET.
					</Text>
					<ListItem>Réservations.</ListItem>
					<Text my={2}>
						Les Propriétaires d’animaux de compagnie et les Prestataires de services
						concluent une transaction entre eux sur le Service OHMONPEPET lorsqu’ils
						s’entendent tous les deux sur une « réservation » qui précise le coût, la
						durée, la politique d’annulation et les autres conditions relatives au
						Service de garde d’animaux de compagnie par l’entremise du mécanisme de
						réservation proposé par le Service OHMONPEPET (une « Réservation »). Une
						demande de Réservation peut être faite par un Prestataire de services ou un
						Propriétaire d’animal de compagnie en sélectionnant le(s) type(s) de
						Services de garde d’animaux de compagnie à fournir et en suivant les
						instructions qui s'affichent à l’écran. Si vous êtes Propriétaire d’un
						animal de compagnie et si vous faites une demande de Réservation, vous
						acceptez de vous acquitter des frais de Services de garde d’animaux de
						compagnie décrits dans la Réservation lorsque vous cliquez sur « Demander et
						payer ». Si vous êtes Propriétaire d’un animal de compagnie et si un
						Prestataire de services fait une demande de Réservation, vous acceptez de
						vous acquitter des frais de Services de garde d’animaux de compagnie décrits
						dans la Réservation lorsque vous cliquez sur « Payer maintenant ». Toutes
						les demandes sont soumises à l’acceptation de la partie destinataire. La
						partie destinataire n’est pas tenue d’accepter votre demande (ou toute
						demande quelle qu'elle soit) et peut, à sa discrétion, la décliner pour
						quelque raison que ce soit. Vous reconnaissez qu’après avoir finalisé une
						Réservation, vous acceptez de vous acquitter des frais et de vous conformer
						à toutes les autres conditions de cette Réservation, comme indiqué dans la
						confirmation de Réservation.
					</Text>
					<ListItem>
						Les Propriétaires d’animaux de compagnie sont seuls responsables de
						l’évaluation des Prestataires de services.
					</ListItem>
					<Text my={2}>
						Les Propriétaires d’animaux de compagnie sont seuls responsables de la
						détermination de l'adéquation du Prestataire de services à la fourniture des
						services qu’ils proposent. Veuillez consulter le Centre d’aide afin
						d’obtenir des conseils sur la prise de décisions éclairées concernant la
						sélection d’un Prestataire de services. Bien que OHMONPEPET demande à une
						agence tierce d’effectuer un examen limité des profils des Prestataires de
						services et de procéder à la vérification des antécédents ou à la
						vérification de leur identité, ces vérifications sont limitées et OHMONPEPET
						ne garantit pas qu'elles sont exactes, complètes, indiscutables ou à jour.
						De même, OHMONPEPET ne se porte pas garant des évaluations des Prestataires
						de services effectuées par d’autres Propriétaires d’animaux de compagnie qui
						peuvent être consultées sur le Service OHMONPEPET, et OHMONPEPET ne garantit
						pas l’exactitude ou la légitimité de ces évaluations.
					</Text>
					<ListItem>Animaux abandonnés et hébergement des animaux abandonnés.</ListItem>
					<Text my={2}>
						Les Propriétaires d’animauxde compagnie qui ont recours aux Services de
						garde d’animaux de compagnie et qui omettent de récupérer leur animal de
						compagnie après la durée du service indiquée dans une Réservation
						conviennent que OHMONPEPET (ou le Prestataire de services) peut, à sa seule
						discrétion, placer l’animal en foyer d’accueil, transférer sa garde au
						service de protection des animaux ou à d’autres autorités policières, ou
						trouver un système de garde alternatif. Le Propriétaire d’animal de
						compagnie accepte de rembourser à OHMONPEPET et/ou au Prestataire de
						services l'ensemble des frais et dépenses associés à de telles mesures. De
						plus, OHMONPEPET se réserve expressément le droit, à sa seule discrétion, de
						retirer un animal d’un Propriétaire d’animal de compagnie de la garde d'un
						Prestataire de services si OHMONPEPET le juge nécessaire pour la sécurité de
						l’animal, du Prestataire de services ou de toute personne vivant avec lui.
						Avant de retirer un animal de compagnie de la garde d'un Prestataire de
						services, OHMONPEPET fera des efforts raisonnables pendant ses heures
						d’ouverture normales pour contacter le Propriétaire d’animal de compagnie
						et/ou le proche du Propriétaire de l’animal de compagnie à contacter en cas
						d’urgence (le cas échéant) pour trouver un système de garde alternatif. Si
						OHMONPEPET n’est pas en mesure de contacter le Propriétaire de l’animal ou
						la personne à contacter en cas d’urgence, OHMONPEPET fera preuve de
						discernement pour trouver un système de garde alternatif jusqu’à ce que le
						Propriétaire de l’animal de compagnie soit en mesure de le récupérer. Si
						vous êtes Propriétaire d’un animal de compagnie, vous autorisez le(s)
						vétérinaire(s) de votre animal de compagnie à communiquer son dossier
						vétérinaire à OHMONPEPET dans le cadre du transfert ou de l’hébergement de
						l’animal abandonné. En outre, vous êtes responsable et acceptez de payer
						l'ensemble des frais et des dépenses engagés par OHMONPEPET dans le cadre
						d’un tel transfert.
					</Text>
					<ListItem>Urgences.</ListItem>
					<Text my={2}>
						Nous recommandons aux Propriétaires d’animaux de compagnie de fournir aux
						Prestataires de services concernés les coordonnées d’une personne qu’ils
						peuvent joindre dans l’éventualité où il serait nécessaire de prodiguer des
						soins médicaux à l’animal. Les Prestataires de services s’engagent à
						contacter immédiatement les Propriétaires d’animaux de compagnie au cas où
						de tels soins s’avéreraient nécessaires ou, si le Propriétaire de l’animal
						de compagnie n’est pas joignable, à contacter OHMONPEPET au numéro de
						téléphone ou à l’adresse électronique indiqués dans le tableau situé à la
						fin des présentes Conditions. Si vous êtes un Propriétaire d’animal de
						compagnie, vous autorisez par les présentes votre Prestataire de services et
						OHMONPEPET à avoir recours et à autoriser la fourniture de soins
						vétérinaires sur votre animal de compagnie s’il est impossible de vous
						joindre pour obtenir votre autorisation d’administrer des soins en cas
						d’urgence. Dans ce cas, vous autorisez également le(s) vétérinaire(s) de
						votre animal de compagnie à communiquer son dossier vétérinaire à
						OHMONPEPET. Si votre Prestataire de services vous contacte afin d’obtenir
						l’autorisation d’administrer des soins médicaux à votre animal de compagnie
						et si vous refusez, vous exonérez le Prestataire de services et OHMONPEPET
						de toute responsabilité en cas de blessure ou de dommage découlant du défaut
						de rechercher un traitement, y compris à l’égard du remboursement qui aurait
						autrement été possible en vertu de la Garantie OHMONPEPET. Les Propriétaires
						d’animaux de compagnie sont tenus de s’acquitter des coûts de
						l'administration d’un tel traitement médical à l’animal de compagnie et, si
						vous êtes un Propriétaire d’animal de compagnie, vous autorisez par les
						présentes OHMONPEPET à débiter votre carte bancaire ou autre moyen de
						paiement du montant de ces coûts. Dans certaines circonstances, un
						Propriétaire d’animal de compagnie peut bénéficier d’un remboursement au
						titre de la Garantie OHMONPEPET. OHMONPEPET recommande à tous les
						utilisateurs de souscrire une assurance adéquate pour son animal de
						compagnie afin de couvrir les frais liés aux soins vétérinaires.
					</Text>
					<ListItem>Services de consultation.</ListItem>
					<Text my={2}>
						OHMONPEPET peut proposer aux Propriétaires d’animaux de compagnie et aux
						Prestataires de services des services de consultation vétérinaire par
						téléphone, chat ou courriel, dispensés par une tierce partie afin de fournir
						une ressource pédagogique concernant les décisions que vous prenez au sujet
						de vos propres animaux de compagnie ou des animaux dont vous avez la garde.
						Ces services de consultation sont fournis par une tierce partie et ne font
						pas partie du Service OHMONPEPET. Si vous avez recours à ces services de
						consultation fournis par une tierce partie, vous ne devrez en faire usage
						qu’en complément des soins vétérinaires professionnels et ils ne devront pas
						se substituer à ceux-ci. Vous acceptez de recourir uniquement au service de
						consultation d’une tierce partie applicable en cas de réclamations découlant
						de leurs services.
					</Text>
				</OrderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					3. Attestation de respect de la loi applicable.
				</Heading>
				<Text my={2}>
					En accédant au Service OHMONPEPET et en l’utilisant, vous certifiez que vous :
					(1) avez au moins 18 ans ou êtes majeur dans votre juridiction, l'âge le plus
					grand étant retenu, et (2) vous conformez à l'ensemble des lois et règlements
					applicables aux activités que vous menez via, ou en relation avec, le Service
					OHMONPEPET.
				</Text>
				<UnorderedList spacing={2}>
					<ListItem>
						Pour les Propriétaires d’animaux de compagnie, cela signifie, entre autres,
						que vous vous assurerez que vos animaux de compagnie sont vaccinés,
						enregistrés, tatoués et/ou munis d’une puce conformément aux lois ou
						règlements locaux ; que vous avez souscrit et maintiendrez en vigueur toute
						police d’assurance obligatoire concernant les animaux dont vous confiez la
						garde aux Prestataires de services (et que ces polices seront utiles aux
						tiers, dont les Prestataires de services, ainsi qu’à vous).
					</ListItem>
					<ListItem>
						Pour les Prestataires de services, cela signifie, entre autres, que vous
						certifiez être légalement autorisé à fournir des Services de garde d’animaux
						de compagnie dans la juridiction où vous fournissez de tels Services de
						garde ; que vous avez respecté et respecterez l'ensemble des lois et
						règlements qui vous sont applicables ; que vous avez obtenu l'ensemble des
						autorisations, des enregistrements fiscaux et des permis nécessaires pour
						fournir légalement des Services de garde d’animaux de compagnie ; et que,
						lorsque vous fournissez des Services de garde d’animaux de compagnie, vous
						respecterez les lois applicables à la tenue en laisse, à la collecte des
						déchets animaux et autres.
					</ListItem>
				</UnorderedList>
				<Text my={2}>
					Vous reconnaissez que OHMONPEPET peut se fier à vos certifications, qu’il n’est
					pas tenu de s’assurer que tous les utilisateurs respectent les lois et
					règlements applicables, et qu’il ne sera pas responsable en cas de manquement
					d’un utilisateur à ces obligations.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					4. Utilisation du Service OHMONPEPET et Suspension.
				</Heading>

				<Text my={2}>
					1. Votre comportement dans le cadre du Service OHMONPEPET. Lorsque vous utilisez
					le Service OHMONPEPET, vous acceptez de :
				</Text>

				<UnorderedList spacing={2}>
					<ListItem>
						N’utiliser le Service OHMONPEPET que dans le respect de la loi et uniquement
						aux fins prévues.
					</ListItem>
					<ListItem>
						Ne pas utiliser le Service OHMONPEPET pour faire garder : (a) des animaux de
						compagnie exotiques ou intrinsèquement dangereux tels que des serpents
						venimeux ou constricteurs, des primates, des loups ou des hybrides de loups,
						des chats non domestiqués, des alligators, des chevaux ou tout autre bétail
						; (b) tout animal dont la loi applicable interdit la possession ou la garde
						par un tiers ; ou (c) tout animal qui a des antécédents d'attaque sur des
						animaux de compagnie ou des êtres humains ou qui a été dressé à cet effet.
					</ListItem>
					<ListItem>
						Ne pas faire circuler de virus ou autre code malveillant sur ou par
						l’intermédiaire du Service OHMONPEPET.
					</ListItem>
					<ListItem>
						Ne pas utiliser le Service OHMONPEPET, ou collaborer avec d’autres
						utilisateurs du Service OHMONPEPET, à des fins contraires à la loi.
					</ListItem>
					<ListItem>
						Ne pas utiliser le Service OHMONPEPET pour organiser la prestation et
						l’achat de services avec un autre utilisateur, et revendre ces services hors
						du Service OHMONPEPET.
					</ListItem>
					<ListItem>
						Ne pas utiliser le Service OHMONPEPET dans le but de concurrencer OHMONPEPET
						ou de promouvoir d’autres produits ou services.
					</ListItem>
					<ListItem>
						Ne pas publier de commentaires sur les Prestataires de services qui ne sont
						pas basés sur votre expérience personnelle, qui sont intentionnellement
						inexacts ou trompeurs, ou qui violent les présentes Conditions.
					</ListItem>
					<ListItem>
						Ne pas afficher de contenu ou de matériel pornographique, menaçant,
						constitutif de harcèlement, abusif ou diffamatoire, ou qui contient des
						scènes de nudité ou de violence explicite, incite à la violence, viole les
						droits de propriété intellectuelle ou viole la loi ou les droits légaux (par
						exemple, le droit au respect de la vie privée) d’autrui.
					</ListItem>
					<ListItem>
						Ne pas envoyer de « spams » ou d’autres communications commerciales non
						autorisées.
					</ListItem>
					<ListItem>
						Utiliser le Service OHMONPEPET uniquement pour vos propres besoins, et non
						pour vous faire passer pour une autre personne.
					</ListItem>
					<ListItem>
						Ne pas transférer à toute autre personne ou autoriser l’utilisation de votre
						compte OHMONPEPET par celle-ci, ou effectuer des transactions frauduleuses.
					</ListItem>
					<ListItem>
						Ne pas fournir de fausses informations sur votre profil sur le Service
						OHMONPEPET, ou lors de votre enregistrement, ou pour créer des comptes
						multiples ou en double.
					</ListItem>
					<ListItem>
						Ne pas interférer avec la fourniture du Service OHMONPEPET, ou l’utilisation
						que tout autre utilisateur en fait.
					</ListItem>
					<ListItem>
						Ne pas demander le nom d’utilisateur et le mot de passe d’un autre
						utilisateur du Service OHMONPEPET ou toute autre information personnelle
						sensible, y compris les coordonnées bancaires.
					</ListItem>
				</UnorderedList>

				<Text my={2}>2. Suspension et résiliation.</Text>
				<Text my={2}>
					Vous comprenez et acceptez que nous ne pouvons pas être tenus de fournir le
					Service OHMONPEPET dans un endroit ou un territoire spécifique, ou de continuer
					à le fournir après avoir commencé. Nous nous réservons le droit de suspendre ou
					de résilier votre accès au Service OHMONPEPET : (1) si nous jugeons, à notre
					discrétion, que votre comportement sur le Site ou le Service OHMONPEPET est
					inapproprié, dangereux, malhonnête ou contraire aux présentes dispositions ; ou
					(2) si nécessaire, à notre discrétion, afin de protéger OHMONPEPET, ses
					utilisateurs, les animaux de compagnie ou le public. Vous pouvez suspendre ou
					mettre fin à votre utilisation du Service OHMONPEPET à tout moment et pour
					quelque motif que ce soit. Si vous souhaitez désactiver votre compte, veuillez
					contacter OHMONPEPET. Sachez que si vous avez des obligations de paiement non
					acquittées, celles-ci resteront de plein effet malgré la suspension ou la
					résiliation de votre compte.
				</Text>

				<Heading as='h2' size='lg' my={6} textAlign='left'>
					5. Inscription et Sécurité du compte.
				</Heading>
				<Text my={2}>
					Afin d’utiliser certains aspects du Service OHMONPEPET, vous devrez créer un nom
					d’utilisateur, un mot de passe et un profil utilisateur. Si vous choisissez
					d’utiliser le Service OHMONPEPET, vous acceptez de fournir des informations
					personnelles exactes et de les maintenir à jour. Vous acceptez de ne pas vous
					faire passer pour quelqu’un d’autre et de ne pas détenir plusieurs comptes (ou,
					si OHMONPEPET suspend ou résilie votre compte, de ne pas créer de comptes
					supplémentaires). Vous êtes responsable du maintien de la confidentialité de
					votre nom d’utilisateur et de votre mot de passe pour le Service OHMONPEPET, et
					vous êtes responsable de toutes les activités effectuées sur votre compte. Vous
					acceptez de nous informer rapidement de toute utilisation non autorisée de votre
					compte.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					6. Vie privée.
				</Heading>
				<Text my={2}>
					La collecte de vos informations personnelles et l’utilisation que nous en
					faisons sur le Service OHMONPEPET sont décrites dans notre Déclaration de
					Confidentialité. En accédant ou en utilisant le Service OHMONPEPET, vous
					reconnaissez avoir lu et compris la Déclaration de Confidentialité.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					7. Votre contenu.
				</Heading>
				<OrderedList spacing={2}>
					<ListItem>
						Votre contenu.
						<Text my={2}>
							Nous pouvons vous demander ou vous autoriser (ou autoriser un tiers en
							votre nom) à envoyer ou à télécharger du texte, des photographies, des
							images, des vidéos, des commentaires, des informations et des documents
							sur votre profil sur le Service OHMONPEPET ou de quelque manière que ce
							soit dans le cadre de l’utilisation du Service OHMONPEPET et/ou à
							participer aux campagnes promotionnelles que nous organisons sur le Site
							(collectivement, « Votre Contenu »). À titre d’exemple, nous invitons
							les Prestataires de services à créer un profil avec une photo et
							d’autres informations et à envoyer des photos des chiens qu’ils gardent
							aux Propriétaires d’animaux de compagnie, tandis que les Propriétaires
							d’animaux de compagnie peuvent rédiger des commentaires sur les
							Prestataires de services.
						</Text>
					</ListItem>
					<ListItem>
						Permis de conduire.
						<Text my={2}>
							À l’exception des limitations concernant l’utilisation et la divulgation
							des informations personnelles décrites dans notre Déclaration de
							Confidentialité, dans la mesure et la durée maximales autorisées par
							toute loi applicable, vous accordez à OHMONPEPET une licence mondiale
							irrévocable, perpétuelle, non exclusive et entièrement payée afin
							d'utiliser, copier, exécuter, afficher publiquement, reproduire,
							adapter, modifier, transmettre, diffuser, préparer des œuvres dérivées
							et/ou distribuer Votre Contenu en rapport avec la prestation et/ou la
							promotion du Service OHMONPEPET, et pour octroyer ces droits en
							sous-licence à des tiers.
						</Text>
					</ListItem>
					<ListItem>
						Décharge.
						<Text my={2}>
							Si votre nom, votre voix, votre image, votre personne, votre portrait ou
							vos prestations figurent dans Votre Contenu, vous renoncez par les
							présentes à toute réclamation ou tout motif d'action, connu(e) ou à
							venir, contre OHMONPEPET et ses utilisateurs, pour diffamation, atteinte
							aux droits d’auteur, atteinte au droit au respect de la vie privée, à
							l'image ou à la personnalité ou toute réclamation similaire résultant de
							l’utilisation de Votre Contenu conformément à l’Article 7.2 et autres
							dispositions des présentes Conditions.
						</Text>
					</ListItem>
					<ListItem>
						Vos déclarations et garanties concernant Votre Contenu.
						<Text my={2}>
							Vous déclarez et garantissez que (1) vous êtes le propriétaire ou le
							concédant de licence de Votre Contenu, et que vous disposez de
							l'ensemble des droits, consentements et permissions nécessaires pour
							accorder la licence mentionnée à l’Article 7.2 et produire la décharge
							visée à l’Article 7.3 concernant Votre Contenu, (2) vous disposez de
							l'ensemble des consentements et décharges nécessaires des individus qui
							apparaissent ou dont les animaux de compagnie apparaissent dans Votre
							Contenu ; et (3) votre contenu ne viole ni la loi ni les présentes
							Conditions.
						</Text>
					</ListItem>
					<ListItem>
						Droit de supprimer ou de filtrer Votre Contenu.
						<Text my={2}>
							Bien que nous n’y soyons pas tenus, nous nous réservons le droit de
							surveiller, filtrer, éditer et/ou supprimer Votre Contenu sur le Service
							OHMONPEPET. L’application des présentes Conditions relativement à Votre
							Contenu se fait à notre discrétion, et le défaut de faire appliquer les
							Conditions dans une situation ne constitue pas une renonciation à notre
							droit de les faire appliquer dans une autre situation. Nous ne sommes
							pas tenus de conserver ou de vous fournir des copies de Votre Contenu,
							et nous n’aurons aucune responsabilité envers vous en cas de
							suppression, de divulgation, de perte ou de modification de Votre
							Contenu. Il est de votre seule responsabilité de conserver des copies de
							sauvegarde de Votre Contenu.
						</Text>
					</ListItem>
					<ListItem>
						Avis.
						<Text my={2}>
							Le Service OHMONPEPET peut vous permettre de rédiger des commentaires
							publics et/ou privés sur les utilisateurs ou leurs animaux de compagnie.
							Vous reconnaissez que même les commentaires privés peuvent être partagés
							avec des tiers conformément à la loi applicable et à notre Déclaration
							de Confidentialité et que OHMONPEPET n’est pas tenu de préserver ou de
							conserver indéfiniment les commentaires. Si vous êtes un Prestataire de
							services, nous ne sommes pas tenus de vous communiquer le contenu de
							tout commentaire à votre sujet soumis par d’autres utilisateurs du
							Service OHMONPEPET, que ce soit avant ou après la résiliation de votre
							compte OHMONPEPET. Nous ne saurons être tenus responsables envers vous à
							l’égard de toute suppression, divulgation, perte ou modification de ces
							commentaires. Nous nous réservons le droit de filtrer, d’éditer ou de
							supprimer ces commentaires sur le Service OHMONPEPET à tout moment.
						</Text>
					</ListItem>
				</OrderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					8. Téléphone, SMS et Communications mobiles.
				</Heading>
				<OrderedList spacing={2}>
					<ListItem>
						Consentement à la réception de messages texte composés automatiquement
						<Text my={2}>
							Le présent Article 8.1 ne s’applique qu’aux utilisateurs situés aux
							États-Unis. Vous consentez à ce que OHMONPEPET vous contacte au sujet du
							Service OHMONPEPET par SMS, message texte, courriel et autres moyens de
							communication électroniques, y compris les messages texte composés
							automatiquement contenant des informations sur le service et/ou des
							messages commerciaux, même si votre numéro de téléphone figure sur une
							liste d’exclusion. La messagerie, les données et tous les autres tarifs
							et frais habituels de votre opérateur s’appliqueront à ces
							communications. Vous n'êtes pas dans l'obligation de consentir à la
							réception de messages commerciaux pour pouvoir faire des transactions ou
							utiliser le Service OHMONPEPET, et vous pouvez refuser de les recevoir à
							tout moment comme indiqué dans notre Déclaration de Confidentialité
							(vous pouvez toutefois continuer à recevoir des messages pendant le
							délai nécessaire au traitement de votre demande par OHMONPEPET).
						</Text>
					</ListItem>
					<ListItem>
						Changements de numéros de téléphone.
						<Text my={2}>
							Si vous désactivez un numéro de téléphone mobile qui nous a été fourni,
							vous acceptez de mettre à jour rapidement les informations figurant sur
							votre compte OHMONPEPET afin de vous assurer que les messages ne seront
							pas envoyés à la personne à qui votre ancien numéro a été attribué.
						</Text>
					</ListItem>
				</OrderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					9. Frais et Paiement.
				</Heading>
				<OrderedList spacing={2}>
					<ListItem>
						Devise.
						<Text my={2}>
							Les frais, montants déductibles et autres paiements indiqués sur le
							Service OHMONPEPET ou facturés par l'intermédiaire de celui-ci sont
							indiqués et payables dans la devise locale.
						</Text>
					</ListItem>
					<ListItem>
						Frais applicables aux Propriétaires d’animaux de compagnie.
						<Text my={2}>
							Les Propriétaires d’animaux de compagnie peuvent acheter des Services de
							garde d’animaux de compagnie auprès d’un Prestataire de services en
							remplissant un formulaire de Réservation comme indiqué à l’Article 2.5.
							Si vous êtes Propriétaire d’un animal de compagnie, vous vous engagez
							auprès du Prestataire de services lorsque vous acceptez une Réservation,
							et vous acceptez de vous acquitter de la totalité des frais indiqués
							dans la Réservation. Comme indiqué dans les Articles 9.3 et 9.4, le
							montant total facturé aux Propriétaires d’animaux de compagnie au titre
							d'une Réservation peut également inclure une commission payable à
							OHMONPEPET. Lorsque la loi l’exige, le montant facturé comprendra
							également les taxes applicables. Le Prestataire de services, et non
							OHMONPEPET, est responsable de l’exécution des Services de garde
							d’animaux de compagnie.
						</Text>
					</ListItem>
					<ListItem>
						Frais applicables aux Prestataires de services.
						<Text my={2}>
							Les Prestataires de services peuvent accepter de fournir des Services de
							garde d’animaux de compagnie à un Propriétaire d’animal de compagnie en
							acceptant une Réservation comme indiqué à l’Article 2.5. Si vous êtes un
							Prestataire de services, vous devez confirmer la Réservation avant
							l'expiration d'un délai. À défaut, le Propriétaire de l’animal de
							compagnie ne sera pas tenu d’effectuer la transaction. Une fois la
							Réservation validée par les deux parties, vous acceptez de vous
							acquitter du prix indiqué dans votre Réservation. L’achat de Services de
							garde d’animaux de compagnie est une transaction entre le Propriétaire
							de l’animal de compagnie et le Prestataire de services. Le rôle de
							OHMONPEPET est de faciliter la transaction. Nous percevrons (directement
							ou indirectement par l’intermédiaire d’un tiers autorisé) le paiement
							émanant du Propriétaire de l’animal de compagnie au moment de la
							Réservation et (sauf en cas de retenue de paiement conformément à
							l’Article 9.7) procéderons au paiement sur le compte du Prestataire de
							services 48 heures après la fin de la période de fourniture du service
							indiquée dans la Réservation. Les Prestataires de services doivent
							s’acquitter d'une commission, telle que décrite à l’Article 9.4. Lorsque
							la loi l’exige, le montant facturé comprendra également les taxes
							applicables.
						</Text>
					</ListItem>
					<ListItem>
						Commission.
						<Text my={2}>
							Nous facturons une commission à l’égard de certains aspects du Service
							OHMONPEPET. Si vous êtes un Prestataire de services, sauf indication
							contraire mentionnée sur le Service OHMONPEPET, notre commission est
							calculée sous forme de pourcentage des frais qu’un Propriétaire d’animal
							de compagnie accepte de vous régler lors d’une Réservation et est
							prélevée sur chaque Réservation. Notre commission est décrite ici. Nos
							frais de services sont décrits ici.
						</Text>
					</ListItem>
					<ListItem>
						Frais de retard et Frais supplémentaires.
						<Text my={2}>
							Si vous êtes Propriétaire d’un animal de compagnie, vous reconnaissez et
							acceptez que, si vous ne récupérez pas votre animal de compagnie à la
							fin de la période de fourniture du service convenue dans une
							Réservation, le temps de service supplémentaire (au prorata de chaque
							demi-journée de retard) vous sera facturé au tarif quotidien fixé dans
							la Réservation. En outre, vous acceptez d’indemniser OHMONPEPET, et
							acceptez que nous puissions débiter votre carte bancaire ou tout autre
							moyen de paiement, à l’égard de l'ensemble des coûts et dépenses
							supplémentaires que nous, ou le Prestataire de services, encourons en
							raison de votre incapacité à récupérer votre animal à la fin de la
							période de fourniture du service convenue dans la Réservation.
						</Text>
					</ListItem>
					<ListItem>
						Annulations et Remboursements.
						<UnorderedList spacing={2}>
							<ListItem>
								Protection de réservation. Comme décrit plus en détail à la page
								Protection de réservation de OHMONPEPET, OHMONPEPET peut vous aider
								à trouver un Prestataire de services de remplacement si le
								Prestataire de services original annule une Réservation peu avant la
								date de début de la période de fourniture du service indiquée dans
								la Réservation. La mise en œuvre de la Protection des Réservations
								dépend du moment de l’annulation et du type de Services de garde
								fournis. Veuillez consulter la page Protection de Réservation pour
								en savoir plus.
							</ListItem>
							<ListItem>
								Annulations par le Prestataire de services. Si un Prestataire de
								services annule une Réservation avant ou pendant la période de
								fourniture du service indiquée dans la Réservation, nous
								rembourserons les frais payés par le Propriétaire de l’animal de
								compagnie au titre des Services de garde d’animaux de compagnie non
								fournis, ainsi que la commission versée à OHMONPEPET. Si vous êtes
								un Prestataire de services, vous pouvez nommer un Prestataire de
								services remplaçant (comme convenu avec le Propriétaire de l’animal
								de compagnie et à condition que le remplaçant possède un compte
								OHMONPEPET actif et ait convenu par écrit d’accepter une
								Réservation) en contactant OHMONPEPET afin de modifier la
								Réservation. Si vous ne trouvez pas de remplaçant et annulez à
								plusieurs reprises les Réservations acceptées sans justification,
								OHMONPEPET se réserve le droit de résilier votre compte.
							</ListItem>
							<ListItem>
								Annulations par le Propriétaire de l’animal de compagnie. Si un
								Propriétaire d’animal de compagnie annule une Réservation avant ou
								pendant la période de fourniture du service indiquée dans la
								Réservation, nous rembourserons les frais conformément à la
								politique d’annulation choisie par le Prestataire de services sur le
								Service OHMONPEPET. Tous les Prestataires de services sont tenus de
								choisir une politique d’annulation avant d’effectuer une Réservation
								afin que les Propriétaires d’animaux de compagnie soient informés de
								la teneur de la politique d’annulation avant de faire une
								Réservation. Pour en savoir plus sur les politiques d’annulation,
								veuillez consulter le Centre d’aide.
							</ListItem>
							<ListItem>
								Force Majeure. Les politiques d’annulation décrites dans les
								présentes sont susceptibles de ne pas s’appliquer dans certaines
								situations d’urgence indépendantes de la volonté des Prestataires de
								services et/ou des Propriétaires d’animaux de compagnie qui rendent
								impossible ou peu pratique l’exécution des Réservations convenues,
								telles que les évacuations résultant de tremblements de terre,
								d’ouragans, d’incendies, d’inondations, de guerres, d’émeutes ou
								d’autres catastrophes similaires. Dans de tels cas de figure,
								OHMONPEPET peut, à sa discrétion raisonnable, procéder à des
								remboursements selon des conditions qui diffèrent de la politique
								d’annulation choisie par le Prestataire de services.
							</ListItem>
							<ListItem>
								Remboursements pour défaut d’exécution. Si nous déterminons, à notre
								discrétion raisonnable, qu’un Prestataire de services n’a pas fourni
								les Services de garde d’animaux de compagnie convenus avec le
								Propriétaire de l’animal de compagnie ou qu’il ne respecte pas les
								présentes Conditions, nous pouvons, à notre discrétion raisonnable,
								annuler une Réservation et/ou rembourser entièrement ou
								partiellement le Propriétaire d’animal de compagnie.
							</ListItem>
							<ListItem>
								Conditions générales d’annulation. Si vous souhaitez annuler une
								Réservation, vous devez suivre la procédure disponible sur le
								Service OHMONPEPET. Aux fins des politiques et conditions du présent
								Article 9.6, la date d’annulation est la date à laquelle un
								utilisateur effectue une annulation par l’intermédiaire du Service
								OHMONPEPET, indépendamment de toute communication distincte entre
								les utilisateurs hors du Service OHMONPEPET.
							</ListItem>
							<ListItem>
								Litiges relatifs au paiement et Paiement hors du Service OHMONPEPET.
								OHMONPEPET fera parvenir les paiements aux Prestataires de services
								48 heures après la fin d’une Réservation. Une fois que ces montants
								auront été versés, tout autre litige relatif au paiement sera réglé
								entre le Propriétaire de l’animal de compagnie et le Prestataire de
								services, et OHMONPEPET n’est tenu ni d’agir à titre de médiateur ni
								de faciliter toute résolution. De plus, OHMONPEPET n’est tenu à
								aucune responsabilité ou obligation en ce qui concerne les
								pourboires, primes ou autres paiements effectués hors du Service
								OHMONPEPET.
							</ListItem>
						</UnorderedList>
					</ListItem>
					<ListItem>
						Retenue de paiement.
						<Text my={2}>
							Si vous êtes un Prestataire de services, OHMONPEPET se réserve le droit
							de procéder à une retenue des montants qui vous seraient autrement dus
							conformément à l’Article 9.3 en cas de suspicion raisonnable d’activité
							frauduleuse impliquant votre ou vos compte(s) ou pour toute autre raison
							impérieuse similaire impliquant la protection de OHMONPEPET, de la
							communauté OHMONPEPET ou des droits de tiers. Nous pouvons également
							inviter des prestataires de services de paiement tiers à restreindre
							votre accès aux fonds présents sur votre compte dans les mêmes
							circonstances.
						</Text>
					</ListItem>
					<ListItem>
						Autorisation de débit.
						<Text my={2}>
							Lorsque vous payez les Services de garde d’animaux de compagnie ou
							d’autres services via le Service OHMONPEPET, vous devrez renseigner une
							carte bancaire en cours de validité et à jour ou d’autres informations
							de paiement, et conserver ces informations de paiement (ou tout moyen de
							paiement alternatif acceptable) dans les informations de votre compte
							tant que vous avez des Réservations confirmées et en cours. Le rôle de
							OHMONPEPET consiste à permettre les paiements des Propriétaires d’un
							animal de compagnie à des Prestataires de services en qualité d’agent
							payeur pour le Prestataire de services. Vous nous autorisez à débiter
							votre carte bancaire ou tout autre moyen de paiement du montant des
							frais que vous engagez sur le Service OHMONPEPET à mesure qu’ils sont
							exigibles et payables, et à débiter l’un de vos autres moyens de
							paiement enregistrés par OHMONPEPET si votre moyen de paiement principal
							a expiré, est invalide ou n’est de quelque manière que ce soit pas en
							mesure d’être débité. Vous êtes responsable de la mise à jour de vos
							informations de paiement. Si nous ne pouvons pas vous débiter des frais
							à l’échéance parce que vos informations de paiement ne sont plus
							valides, ou si nous ne recevons pas votre paiement à l’échéance, vous
							convenez que ni OHMONPEPET ni le Prestataire de services ne seront
							responsables de tout défaut de fourniture des services associés à ces
							frais. Sauf disposition expresse dans les présentes Conditions, tous les
							frais payés par l’intermédiaire du Service OHMONPEPET ne sont pas
							remboursables une fois payés.
						</Text>
					</ListItem>
					<ListItem>
						Impôts et taxes.
						<Text my={2}>
							À l’exception des taxes sur les bénéfices et les recettes brutes de
							OHMONPEPET ou lorsque OHMONPEPET est tenu de percevoir des taxes, vous
							reconnaissez que vous êtes seul responsable du paiement de toute taxe
							applicable résultant de l’achat, de la fourniture ou de l’utilisation
							des Services de garde d’animaux de compagnie par le biais du Service
							OHMONPEPET. Ceci inclut, sans limitation, toute forme de taxe sur les
							ventes, de TVA, ou d’impôt sur le revenu relative aux frais que vous
							avez payés ou perçus par l’intermédiaire du Service OHMONPEPET.
						</Text>
					</ListItem>
					<ListItem>
						Traitement des paiements.
						<Text my={2}>
							Les services de traitement des paiements sont fournis par Stripe et sont
							soumis au Contrat de Prestation de Services de Stripe (disponible sur
							https://stripe.com/fr/legal), et, si vous recevez des paiements via le
							Service OHMONPEPET, l’Accord de Compte Connexe de Stripe (disponible sur
							https://stripe.com/fr/connect-account/legal) (collectivement, les «
							Conditions de Stripe »). Si vous utilisez le Service OHMONPEPET pour
							percevoir un paiement, il vous sera demandé d’ouvrir un compte Stripe et
							d’accepter les Conditions de Stripe. Vous autorisez OHMONPEPET à obtenir
							tout accès nécessaire à votre Compte Connexe Stripe et à effectuer
							toutes les activités nécessaires (y compris les demandes de
							remboursement, le cas échéant) pour faciliter le paiement des montants
							liés aux Services de garde d’animaux de compagnie que vous achetez ou
							fournissez. De plus, vous acceptez de fournir des informations exactes
							et complètes sur vous et votre activité, et autorisez OHMONPEPET à les
							partager avec Stripe ainsi que des informations sur les transactions
							afin de faciliter les services de traitement des paiements fournis par
							Stripe. OHMONPEPET se réserve le droit de changer de prestataire de
							traitement des paiements ou de faire appel à d’autres prestataires ou
							des prestataires de remplacement à sa discrétion.
						</Text>
					</ListItem>
				</OrderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					10. Vérifications des antécédents et de l’identité.
				</Heading>
				<Text my={2}>
					OHMONPEPET peut permettre aux Prestataires de services de faire appel à des
					agences de renseignements sur la consommation tierces qui effectuent, entre
					autres, des vérifications d’identité personnelle (« Vérification de l’identité
					») ou des vérifications de casiers judiciaires, des vérifications du registre
					des délinquants sexuels, des vérifications du registre des véhicules à moteur
					et/ou des vérifications d’identité (collectivement, « Vérifications des
					antécédents »). En dehors des États-Unis et du Canada, ces services se limitent
					à la Vérification de l’identité. Nous ne fournissons pas les Vérifications des
					antécédents ou les Vérifications de l’identité et nous n’assumons aucune
					responsabilité à cet égard, et nous ne faisons aucune déclaration ni ne donnons
					aucune garantie quant à leur fiabilité ni quant à l’exactitude, à l’actualité ou
					à l’exhaustivité de toute information contenue dans ces Vérifications des
					antécédents ou Vérifications de l’identité.
				</Text>
				<Text my={2}>
					Nous ne vérifions pas de façon indépendante les informations contenues dans les
					Vérifications des antécédents ou les Vérifications de l’identité. Si vous faites
					l’objet d’une Vérification des antécédents ou d’une Vérification de l’identité
					par l’entremise du Service OHMONPEPET, vous consentez par les présentes à la
					collecte, à l’utilisation et à la divulgation des informations contenues dans la
					Vérification des antécédents ou la Vérification de l'identité, et vous acceptez
					de fournir des informations complètes et exactes afin de procéder à la
					Vérification de vos Antécédents ou Vérification de votre identité. Vous
					comprenez et acceptez que OHMONPEPET peut, à sa seule discrétion, examiner les
					informations contenues dans la Vérification des antécédents ou la Vérification
					de l’identité et s'y fier afin de décider s’il y a lieu de suspendre ou de
					mettre fin à une plainte concernant un Prestataire de services, ou de se
					renseigner à son sujet, et vous comprenez et acceptez également que nous ne
					sommes pas tenus de le faire et ne saurons en aucune façon être tenus
					responsables si les informations contenues dans toute Vérification d’antécédents
					ou Vérification de l’identité ne sont pas précises, opportunes ou complètes. Si
					vous faites l’objet d’une Vérification des antécédents ou d’une Vérification de
					l’identité, vous pouvez contacter l’agence de renseignements sur la consommation
					tierce compétente pour contester la précision, l’exactitude ou l’exhaustivité de
					ces informations. Vous convenez que les droits et obligations de OHMONPEPET en
					vertu de la Convention d’Arbitrage s’appliqueront au profit de l’agence de
					renseignements sur la consommation qui a procédé à la Vérification des
					antécédents ou à la Vérification de l’identité dans le cadre de toute
					réclamation qui serait soumise à la Convention d’Arbitrage si elle venait à être
					portée contre nous. OHMONPEPET se réserve le droit de suspendre ou de résilier
					votre accès au Service OHMONPEPET sur la base des informations contenues dans la
					Vérification des antécédents ou Vérification de l’identité ou pour toute autre
					raison, ou sans aucune raison, à notre seule discrétion.
				</Text>
				<Text my={2}>
					Les Propriétaires d’animaux de compagnie demeurent entièrement responsables de
					l'évaluation ou de la prise d'informations sur leurs Prestataires de services.
					Veuillez noter que les limites suivantes s’appliqueront lors de la réalisation
					des Vérifications des antécédents : sauf disposition expresse contraire dans les
					présentes Conditions ou par le biais du Service, OHMONPEPET n’effectue pas
					automatiquement de Vérifications des antécédents sur les utilisateurs. Le type,
					l’étendue et le niveau des Vérifications des antécédents peuvent varier. Les
					dossiers qui ne sont pas accessibles aux agences tierces de Vérification des
					antécédents ne seront pas inclus dans les résultats. Les registres des
					arrestations et les casiers judiciaires, les dossiers de condamnation et des
					peines, les registres des délinquants sexuels et les registres des véhicules à
					moteur ne sont pas tous disponibles dans toutes les juridictions. Dans de
					nombreuses juridictions, un délai s'applique avant que les registres des
					arrestations et les casiers judiciaires, les dossiers de condamnation et des
					peines, les registres des délinquants sexuels et les registres des véhicules à
					moteur ne soient inclus dans les Vérifications des antécédents. Les casiers
					judiciaires des mineurs et les infractions commises par des mineurs sont
					susceptibles de ne pas figurer dans les archives publiques et n'apparaîtront
					donc pas dans les résultats. Les affaires classées sans suite, les arrestations
					n’ayant pas abouti à des condamnations, les arrestations ou les condamnations à
					l’étranger et tout non-lieu (abandons des poursuites) sont susceptibles de ne
					pas être signalées. Les infractions au Code de la route ne sont pas incluses à
					moins qu’une juridiction ne les qualifie d’infractions pénales. Dans les
					juridictions où les infractions au Code de la route sont qualifiées
					d’infractions pénales, ces infractions peuvent apparaître dans les résultats en
					qualité de délits ou de crimes.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					11. Services de tiers et liens.
				</Heading>
				<Text my={2}>
					Le Service OHMONPEPET peut contenir des liens vers des sites Internet ou des
					ressources de tiers. Vous reconnaissez et acceptez que nous ne sommes pas
					responsables :
				</Text>
				<UnorderedList spacing={2}>
					<ListItem>
						De la disponibilité ou de l’exactitude de ces sites Internet ou ressources
					</ListItem>
					<ListItem>
						du contenu, des produits ou des services disponibles sur ou à partir de ces
						sites Internet ou ressources.
					</ListItem>
				</UnorderedList>
				<Text my={2}>
					Vous assumez l’entière responsabilité et l'intégralité des risques découlant de
					votre utilisation de ces sites Internet ou ressources.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					12. Indemnisation
				</Heading>
				<Text my={2}>
					Dans la mesure maximale permise par toute loi applicable et sauf disposition
					contraire de celle-ci vous acceptez de défendre, d’indemniser et d'exonérer
					ohmonpepet de toute responsabilité en cas de réclamation, demande, cause
					d’action, perte, dépense, dommage et/ou responsabilité, y compris les honoraires
					raisonnables d’avocat et les frais judiciaires, qui sont liés de quelque façon :
				</Text>
				<OrderedList spacing={2}>
					<ListItem>
						Aux transactions et interactions, en ligne ou hors ligne, avec d’autres
						utilisateurs du service ohmonpept
					</ListItem>
					<ListItem>A la violation des présentes conditions</ListItem>
					<ListItem>
						Aux litiges vous opposant à d’autres utilisateurs du service ohmonpept
					</ListItem>
					<ListItem>
						Aux dommages matériels ou corporels causés à des tiers par votre animal ou
						par les animaux sous votre garde
					</ListItem>
					<ListItem>A votre contenu</ListItem>
					<ListItem>
						A votre utilisation des informations contenues dans toute vérification des
						antécédents ou vérification de l’identité en violation de toute loi
						applicable. vous convenez en outre que vous coopérerez avec nous lors de la
						défense face à de telles réclamations.
					</ListItem>
				</OrderedList>
				<Text my={2}>
					Nous nous réservons le droit d’assumer la défense et le contrôle exclusifs de
					toute question faisant l’objet d’une indemnisation en vertu du présent article,
					et vous ne réglerez pas une telle réclamation ou question sans notre
					consentement écrit préalable.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					13. Propriété Intellectuelle.
				</Heading>
				<OrderedList spacing={2}>
					<ListItem>
						Service OHMONPEPET.
						<Text my={2}>
							OHMONPEPET et ses concédants de licence conservent l'ensemble des
							droits, titres et intérêts relatifs au Service OHMONPEPET, à la
							technologie et aux logiciels utilisés pour fournir ladite technologie, à
							la documentation et au contenu électroniques disponibles par le biais du
							Service OHMONPEPET (autres que Votre Contenu), et à tous les droits de
							propriété intellectuelle et de propriété relatifs au Service OHMONPEPET
							et à cette technologie, ces logiciels, cette documentation et ce
							contenu. À l’exception de vos droits d’accès et d’utilisation du Service
							OHMONPEPET énoncés dans les présentes Conditions, aucune disposition
							contenue dans les présentes n’autorise ni ne transfère nos droits de
							propriété intellectuelle ou de propriété à quiconque, y compris vous.
							Vous acceptez que nous détenions un droit perpétuel d’utilisation et
							d’incorporation dans le Service OHMONPEPET de tout commentaire ou toute
							suggestion d’amélioration du Service OHMONPEPET que vous nous
							transmettez, sans que nous ne soyons obligés de vous verser une
							indemnisation.
						</Text>
					</ListItem>
					<ListItem>
						Marques de commerce de OHMONPEPET.
						<Text my={2}>
							OHMONPEPET détient tous les droits relatifs à ses marques de commerce,
							marques de service, noms de marque et logos (les « Marques OHMONPEPET
							»). Si vous êtes un Prestataire de services, tant que vous vous
							conformez aux règles du Service OHMONPEPET, OHMONPEPET vous accorde une
							licence limitée, révocable, non exclusive et non transférable pour
							utiliser les Marques OHMONPEPET uniquement :
						</Text>
						<OrderedList spacing={2}>
							<ListItem>
								Sous la forme associée aux marchandises, y compris la documentation
								commerciale personnalisable (cartes promotionnelles, affiches,
								etc.), mise en vente par l’intermédiaire de la Boutique OHMONPEPET
								et/ou
							</ListItem>
							<ListItem>
								De toute autre manière spécifiquement autorisée par écrit par le
								Service OHMONPEPET. Pour pouvoir exercer une telle licence, vous
								acceptez que :
								<UnorderedList spacing={2}>
									<ListItem>
										Toute survaleur associée à votre utilisation des Marques
										OHMONPEPET profite uniquement à OHMONPEPET, et
									</ListItem>
									<ListItem>
										Cette licence soit immédiatement résiliée dès lors que vous
										cessez d’être un Prestataire de services en règle, soit de
										votre fait, soit parce que OHMONPEPET suspend ou résilie vos
										droits à utiliser le Service OHMONPEPET.
									</ListItem>
								</UnorderedList>
							</ListItem>
						</OrderedList>
					</ListItem>
				</OrderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					14. Exclusion de garantie pour le Service OHMONPEPET.
				</Heading>
				<Text my={2}>
					Les informations et les documents présents sur le Service OHMONPEPET, y compris
					le texte, les graphiques, les informations, les liens ou d’autres éléments, sont
					fournis « en l'état » et « sous réserve de disponibilité ». Les commentaires,
					profils, conseils, opinions, déclarations, offres ou autres informations ou
					contenus mis à disposition par le biais du Service OHMONPEPET, mais pas
					directement par OHMONPEPET, sont ceux de leurs auteurs respectifs, qui en sont
					les seuls responsables. Dans toute la mesure permise par la loi applicable,
					ohmonpepet:
				</Text>
				<OrderedList spacing={2}>
					<ListItem>
						Ne garantit pas l’exactitude, l’adéquation ou l’exhaustivité des
						informations et des documents présents sur le service Ohmonpepet ;
					</ListItem>
					<ListItem>
						Ne prend, n’endosse, ni n’assume une quelconque responsabilité à l’égard de
						l’exactitude ou de la fiabilité des opinions, conseils ou déclarations
						formulés par toute partie autre que Ohmonpepet
					</ListItem>
					<ListItem>
						Ne garantit pas que votre utilisation des services sera sécurisée, exempte
						de virus informatiques, ininterrompue, toujours disponible, sans erreur ou
						qu’elle satisfera vos exigences, ou que tout défaut du service Ohmonpepet
						sera corrigé. Dans la mesure permise par la loi applicable, Ohmonpepet
						décline expressément toute garantie, qu’elle soit explicite, implicite ou
						légale, en ce qui concerne le service Ohmonpepet, et décline expressément
						toute garantie implicite de qualité marchande, d’adaptation à un usage
						particulier, de non-contrefaçon et d’exactitude. En outre et sans limiter ce
						qui précède, nous ne faisons aucune déclaration et ne donnons aucune
						garantie, expresse ou implicite, quant à la pertinence d’un prestataire de
						services qui propose des services de garde d’animaux de compagnie par
						l’entremise du service Ohmonpepet.
					</ListItem>
				</OrderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					15. Limitation de responsabilité.
				</Heading>

				<OrderedList spacing={2}>
					<ListItem>
						Exclusion de certains types de dommages.
						<Text my={2}>
							Dans toute la mesure permise par la loi applicable, OHMONPEPET
							n’assumera aucune responsabilité envers vous à l’égard de tout dommage
							indirect, spécial, accessoire ou consécutif, ou de toute perte
							commerciale ou perte de profit, de revenus, de contrats, de données, de
							clientèle ou autres pertes ou dépenses similaires qui découlent de
							l’utilisation ou de l’incapacité à utiliser le Service OHMONPEPET, y
							compris, sans limitation, les dommages liés à toute information reçue
							par le Service OHMONPEPET, à la suppression de vos informations de
							profil ou commentaires (ou autre contenu) du Service OHMONPEPET, à toute
							suspension ou résiliation de votre accès au Service OHMONPEPET, ou à
							toute défaillance, erreur, omission, interruption, défaut, retard dans
							le fonctionnement ou la transmission du Service OHMONPEPET, même si nous
							sommes conscients de la possibilité de dommages, pertes ou dépenses de
							ce type. Certaines juridictions n’autorisent pas l’exclusion ou la
							limitation de responsabilité pour les dommages indirects ou accessoires,
							de sorte que la limitation susmentionnée peut ne pas s’appliquer à votre
							cas.
						</Text>
					</ListItem>
					<ListItem>
						Limite de notre responsabilité envers vous.
						<Text my={2}>
							Sauf si la loi applicable l’interdit, la responsabilité globale de
							Ohmonpepet envers vous ou un tiers à l’égard de toute question découlant
							du service Ohmonpepet ou liée à celui-ci ou aux présentes conditions ne
							dépassera en aucun cas les montants que vous avez payés à Ohmonpepet (à
							l’exclusion des montants payés aux prestataires de services) au cours
							des douze (12) mois précédant l’événement ayant donné lieu à la
							responsabilité ou, si vous n’avez versé aucun montant à Ohmonpepet au
							titre de l’utilisation de tout service, un montant de 100 usd (ou
							l’équivalent dans la devise locale) (les obligations financières que
							Ohmonpepet peut avoir envers ses utilisateurs en rapport avec le
							comportement de ces derniers sont limitées aux obligations de
							remboursement énoncées dans la garantie Ohmonpepet).
						</Text>
					</ListItem>
					<ListItem>
						Absence de responsabilité pour les actes autres que ceux commis par
						OHMONPEPET.
						<Text my={2}>
							Dans toute la mesure permise par la loi applicable, Ohmonpepet ne sera
							en aucun cas responsable de quelque dommage que ce soit, qu’il soit
							direct, indirect, général, spécial, compensatoire et/ou consécutif,
							découlant de ou lié à votre comportement ou à celui d'un tiers en
							relation avec le service Ohmonpepet, y compris, sans limitation, les
							dommages matériels, le vol, les blessures corporelles, le décès, les
							troubles émotionnels et/ou tout autre dommage résultant de la confiance
							accordée aux informations ou contenus affichés sur le service
							Ohmonpepet, ou transmis par son entremise, ou de toute interaction avec
							les autres utilisateurs du service Ohmonpepet, en ligne ou hors ligne.
							cela inclut les réclamations, pertes ou dommages découlant du
							comportement des utilisateurs qui tentent de frauder ou de vous nuire.
							Si un litige vous oppose à un prestataire de services ou un propriétaire
							d’animal de compagnie, vous acceptez d'exonérer Ohmonpepet de toute
							responsabilité au regard des réclamations, demandes et dommages de toute
							nature, connus et à venir, découlant de ou liés de quelque façon que ce
							soit à de tels litiges, sauf tel que spécifiquement énoncé dans la
							garantie Ohmonpepet. En aucun cas Ohmonpepet ne sera responsable des
							conséquences directes ou indirectes du comportement d’un propriétaire
							d’animal de compagnie ou d’un prestataire de services ne respectant pas
							les lois et règlements applicables.
						</Text>
					</ListItem>
				</OrderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					16. Loi applicable et Compétence.
				</Heading>
				<OrderedList spacing={2}>
					<ListItem>
						Pour les utilisateurs situés aux États-Unis et au Canada, les présentes
						Conditions et tout litige survenant entre vous et OHMONPEPET seront régis
						par les lois de l’État de Washington, sans égard aux principes de conflit de
						lois, mais la loi fédérale sur l’arbitrage (Federal Arbitration Act) régira
						l’interprétation et l’application de l’Article 17 (la Convention
						d’Arbitrage). Sauf si vous et nous en convenons autrement, ou sauf si la loi
						applicable l’interdit, dans le cas où la Convention d’Arbitrage ne
						s’applique pas à vous ou à une réclamation ou un litige particulier, vous
						acceptez que toute réclamation ou litige survenant entre vous et OHMONPEPET
						soit résolu exclusivement par un tribunal fédéral ou d’État situé dans
						l’État de Washington. Vous et OHMONPEPET acceptez de vous soumettre à la
						compétence personnelle des tribunaux de Seattle, dans l’État de Washington,
						pour le règlement de ces réclamations ou litiges.
					</ListItem>
					<ListItem>
						Pour les utilisateurs situés dans l’EEE (et du Royaume-Uni si celui-ci ne
						fait plus partie de l’EEE), les lois de l’Angleterre régiront les présentes
						conditions, sauf si vous résidez dans un pays situé en dehors de
						l’Angleterre mais tout de même dans l’EEE, certaines lois impératives
						applicables dans votre pays s’appliqueront en votre faveur et pour votre
						protection en plus ou à la place de certaines dispositions du droit anglais.
						Tout différend qui vous oppose à OHMONPEPET doit être résolu par les
						tribunaux anglais ou les tribunaux de votre pays si vous résidez dans l’EEE
						mais en dehors de l’Angleterre.
					</ListItem>
					<ListItem>
						Si vous êtes un consommateur de l’Espace économique européen, la plateforme
						européenne de règlement des litiges en ligne
						http://ec.europa.eu/consumers/odr fournit des informations sur les modes
						alternatifs de résolution des litiges, que vous pouvez utiliser si un litige
						entre vous et la partie concernée ne peut être résolu.
					</ListItem>
				</OrderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					17. Dispositions diverses.
				</Heading>
				<Text my={2}>
					Aucune disposition des présentes ne saurait être interprétée comme faisant de
					l’une ou l’autre des parties l’associé, le coentrepreneur, le mandataire, le
					représentant légal, l’employeur, le travailleur, l’entrepreneur ou l’employé de
					l’autre. Aucune partie n’aura, ou ne se présentera à un tiers comme ayant, le
					pouvoir de formuler des déclarations, des représentations ou des engagements de
					quelque nature que ce soit, ou de prendre des mesures opposables à l’autre
					partie, sauf dans les cas prévus aux présentes ou autorisés par écrit par la
					partie qui sera liée. Les présentes Conditions ne sont pas exclusives et
					n’interdisent pas aux Prestataires de services de proposer des services de garde
					d’animaux de compagnie par d’autres moyens ou des tierces parties. L’invalidité,
					l’illégalité ou l’inopposabilité de toute condition ou disposition des présentes
					Conditions n’affectera en aucune façon la validité, la légalité ou
					l’opposabilité de toute autre condition ou disposition des présentes Conditions.
					Si une condition ou disposition est jugée invalide ou inapplicable, les parties
					conviennent de la remplacer par une condition ou disposition valide et
					exécutoire et qui exprime le mieux l’intention d’origine de la condition ou
					disposition invalide ou inapplicable, et ces Conditions seront exécutoires
					telles que modifiées. Dans toute la mesure du possible en vertu de la
					législation locale applicable, la présente Convention liera les représentants
					légaux, les ayants cause et les ayants droit des parties aux présentes et
					s’applique à leur bénéfice.
				</Text>
			</Flex>
		</Layout>
	)
}
