import { Layout } from 'components'
import React from 'react'
import confidentialityPolicyJSON from 'statics/misc/confidentiality-policy.json'
import { useI18n } from 'utils/hooks/useI18n'
import NextLink from 'next/link'
import {
	Flex,
	Image,
	Heading,
	Text,
	UnorderedList,
	ListItem,
	Link,
	OrderedList
} from '@chakra-ui/react'

export default function ConfidentialityPolicy() {
	const { t } = useI18n(confidentialityPolicyJSON)

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
					src='/img/law.svg'
					width={['125px', '200px']}
					height={['125px', '200px']}
					mt={[2, 6]}
					alt={t('title')}
					margin='0 auto'
				/>
				<Heading as='h1' mb={6} mt={8} textAlign='center'>
					{t('title')}
				</Heading>
				<Text>
					La Politique de confidentialité vous est présentée dans le cadre des exigences
					légales et règlementaires imposées par (ensemble "la Règlementation") :
				</Text>
				<UnorderedList my={2} spacing={2}>
					<ListItem>
						La loi n° 78-17 du 6 janvier 1978 modifiée relative à l’informatique, aux
						fichiers et aux libertés, modifiée, dite "Loi Informatique et Libertés" ;
					</ListItem>
					<ListItem>
						Le Règlement UE 2016/679 relatif à la protection des personnes physiques à
						l’égard du traitement des données à caractère personnel et à la libre
						circulation de ces données du 27 avril 2016, dit "RGPD".
					</ListItem>
				</UnorderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					1. Définitions
				</Heading>
				<Text mb={2}>
					Les termes ci-après définis ont le sens et la portée donnés dans leur définition
					dans le cadre de la conclusion et l’exécution de la présente Politique de
					confidentialité.
				</Text>
				<UnorderedList spacing={2}>
					<ListItem>
						Politique de confidentialité : La présente Politique de confidentialité est
						destinée à rappeler
						<OrderedList spacing={2}>
							<ListItem>
								Les conditions de mise en œuvre du traitement de données à caractère
								personnel au titre de la mise en œuvre du Service
							</ListItem>
							<ListItem>
								Les droits dont dispose l’Utilisateur sur ses données.
							</ListItem>
						</OrderedList>
					</ListItem>
					<ListItem>
						Compte Utilisateur : Le compte créé par l’Utilisateur et permettant
						d’accéder à son espace privé et sécurisé.
					</ListItem>
					<ListItem>
						Utilisateur(s) : Toute personne physique utilisatrice de la Plateforme
						ohmonpepet.com mise à disposition par OHMONPEPET.
					</ListItem>
					<ListItem>
						Plateforme : La plateforme web éditée par la société OHMONPEPET, accessible
						à l’adresse ohmonpepet.com et permettant aux Utilisateurs de solliciter la
						fourniture du Service.
					</ListItem>
					<ListItem>
						Service
						<OrderedList spacing={2}>
							<ListItem>
								Nature du service : Le Service OHMONPEPET se compose d’une
								application Web de bureau et divers autres outils, d’un service
								d’assistance et de services connexes que les Propriétaires d’animaux
								de compagnie ("Propriétaires d’animaux de compagnie") et les
								prestataires de services à destination des animaux de compagnie ("
								Prestataires de services") peuvent utiliser pour entrer en relation,
								communiquer et interagir. Le Service OHMONPEPET comprend nos
								services d’assistance en cas d’urgence. Nous facturons une
								commission à l’égard de certains aspects du Service OHMONPEPET.
							</ListItem>
							<ListItem>
								OHMONPEPET ne fournit pas de Services de garde d’animaux de
								compagnie. OHMONPEPET est une plateforme de mise en relation à
								destination des Prestataires de services et des Propriétaires
								d’animaux de compagnie. OHMONPEPET n’est pas un Prestataire de
								services et, à l’exception de l’assistance téléphonique en cas
								d’urgence et d’autres ressources et services d’assistance
								spécifiquement décrits dans le Service OHMONPEPET, nous ne
								fournissons pas de services de garde d’animaux de compagnie.
							</ListItem>
						</OrderedList>
					</ListItem>
					<ListItem>
						Société : La société OHMONPEPET est :
						<OrderedList spacing={2}>
							<ListItem>
								Editrice au sens de la Loi n° 2004-575 du 21 juin 2004 pour la
								confiance dans l'économie numérique (dite "loi LCEN")
							</ListItem>
							<ListItem>Propriétaire de la Plateforme ohmonpepet.com</ListItem>
							<ListItem>
								Le responsable du traitement de données à caractère personnel mis en
								œuvre au titre de l’utilisation de la Plateforme conformément à{' '}
								<NextLink href='/cgs' passHref>
									<Link fontWeight={600} color='blue.400'>
										la Règlementation
									</Link>
								</NextLink>
								.
							</ListItem>
						</OrderedList>
					</ListItem>
				</UnorderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					2. Lexique
				</Heading>
				<Text mb={2}>
					Conformément à la Règlementation, les termes ci-après ont la signification
					suivante :
				</Text>
				<UnorderedList spacing={2}>
					<ListItem>
						Traitement de données à caractère personnel : L’opération ou un ensemble
						organisé d’opérations effectué sur des données à caractère personnel
						(collecte, structuration, conservation, modification, communication...).
					</ListItem>
					<ListItem>
						Donnée à caractère personnel : Toute information qui permet d’identifier un
						être humain (personne physique), directement (par exemple son nom/prénom),
						ou indirectement (par exemple son numéro de téléphone, son numéro de
						contrat, son pseudo).
					</ListItem>
					<ListItem>
						Personne concernée : Toute personne qui peut être identifiée par les données
						utilisées dans le cadre du traitement de données à caractère personnel.
					</ListItem>
					<ListItem>
						Responsable de traitement : Celui qui décide de la manière dont sera mis en
						œuvre le traitement des données à caractère personnel, notamment en
						déterminant à quoi vont servir les données et quels outils vont être mis en
						œuvre pour les traiter.
					</ListItem>
					<ListItem>
						Sous-traitant : Celui qui effectue des opérations sur les données pour le
						compte du responsable de traitement, il signe un contrat avec le responsable
						de traitement qui lui confie certaines tâches et qui s’assure qu’il dispose
						des garanties techniques et organisationnelles, lui permettant de traiter
						les données à caractère personnel qui lui sont confiées conformément à la
						règlementation.
					</ListItem>
					<ListItem>
						Destinataire : Celui qui reçoit communication autorisée des données à
						caractère personnel.
					</ListItem>
				</UnorderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					3. Le responsable de traitement des données à caractère personnel
				</Heading>
				<Text mb={2}>
					Vous êtes informé qu’au sens de Règlementation, les personnes suivantes sont
					respectivement responsables des traitements de vos données, pour ce qui les
					concerne :
				</Text>
				<UnorderedList spacing={2}>
					<ListItem>OHMONPEPET au titre de la fourniture du Service.</ListItem>
				</UnorderedList>
				<Text my={2}>
					Le traitement de données à caractère personnel mis en œuvre dans le cadre du
					Service a fait l’objet d’une autorisation délivrée par Commission nationale de
					l’Informatique et des Libertés (CNIL) le 6 octobre 2015, sous le numéro 1786189.
				</Text>
				<Text my={2}>
					OHMONPEPET a en outre procédé à l’inscription des traitements qu’elle met en
					œuvre sur le registre de ses activités de traitement en conformité avec les
					nouvelles exigences du RGPD.
				</Text>
				<Text my={2}>
					Les sous-traitants intervenant dans le cadre du traitement de données à
					caractère personnel sont :
				</Text>
				<UnorderedList spacing={2}>
					<ListItem>La société Vercel, en sa qualité d’hébergeur.</ListItem>
					<ListItem>La société DigitalOcean, en sa qualité d’hébergeur.</ListItem>
				</UnorderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					4. Les engagements clés de OHMONPEPET
				</Heading>
				<Text my={2}>
					OHMONPEPET, en tant que responsable de traitement, respecte les principes
					suivants :
				</Text>
				<UnorderedList spacing={3}>
					<ListItem>
						Les données à caractère personnel sont utilisées uniquement pour des
						finalités (objectifs) explicites, légitimes et déterminées en lien avec les
						métiers du responsable de traitement.
					</ListItem>
					<ListItem>
						Seules les données à caractère personnel qui sont strictement utiles sont
						collectées et traitées : la Société applique ainsi le concept de privacy by
						default qui protège les personnes concernées de toute collecte excessive de
						données.
					</ListItem>
					<ListItem>
						Les données ne sont pas conservées au-delà de la durée nécessaire pour les
						opérations pour lesquelles elles ont été collectées et ce en tenant compte
						de la nature des opérations, ou de celles prévues par les normes et
						autorisations de la CNIL ou par la loi (telles que les prescriptions
						légales).
					</ListItem>
					<ListItem>
						Nous ne communiquons pas, ni ne cédons les données à caractère personnel à
						des tiers, mais seulement à des destinataires autorisés dans le cadre strict
						des finalités définies au préalable.
					</ListItem>
					<ListItem>
						Nous confions les données à caractère personnel à des prestataires
						sous-traitants choisis en fonction de garanties techniques et
						organisationnelles appropriées, afin de garantir la protection des données
						qui leur sont confiées sous les instructions de la Société.
					</ListItem>
					<ListItem>
						Les personnes concernées sont informées préalablement et régulièrement, de
						manière claire et transparente, notamment sur la finalité d’utilisation de
						leurs données, le caractère facultatif ou obligatoire de leurs réponses dans
						les formulaires, des droits dont ils disposent en matière de protection des
						données et des modalités d’exercice effectif de ces droits, des
						destinataires.
					</ListItem>
					<ListItem>
						Chaque fois que la Règlementation l’impose, un consentement explicite,
						éclairé, actif et non équivoque de la personne concernée est recueilli au
						titre du traitement de ses données à caractère personnel.
					</ListItem>
					<ListItem>
						Des mesures de sécurité appropriées, sur le plan logique, technique,
						organisationnel et juridique, ont été définies sur la base d’une analyse de
						risques des différents traitements de données à caractère personnel
						concernés, et sont mises en œuvre par la Société et ses sous-traitants
						engagés par contrat, pour assurer la protection des données à caractère
						personnel.
					</ListItem>
					<ListItem>
						Chaque fois que les risques présentés par un traitement le nécessitent, la
						Société a réalisé une analyse d’impacts sur la vie privée et la protection
						des données à caractère personnel des personnes concernées, afin d’adopter
						des mesures concrètes et adaptées à ces risques et de la piloter.
					</ListItem>
					<ListItem>
						La Société et ses sous-traitants se sont engagés à concevoir des outils et
						systèmes embarquant au cœur même de leurs fonctionnalités le respect de la
						Règlementation et la protection de la vie privée des personnes concernées,
						en intégrant le respect de ces règles au stade même de la conception et du
						développement : la Société applique ainsi le concept de privacy by design
						qui permet le développement d’outils et de systèmes responsables.
					</ListItem>
					<ListItem>
						La Société et ses sous-traitants sont engagés à veiller à toute violation
						éventuelle et exceptionnelle de données et à prendre toutes les mesures de
						protection et de correction consécutives à une violation en informant la
						CNIL et le cas échéant, les personnes concernées.
					</ListItem>
				</UnorderedList>
				<Text my={2}>
					Chez OHMONPEPET, tous les salariés et intervenants sont sensibilisés aux
					principes de protection des données, par des formations régulières adaptées à
					leur activité et à leurs responsabilités.
				</Text>
				<Text my={2}>
					Les collaborateurs ont accès uniquement aux informations nécessaires à leur
					activité, les données sensibles font l’objet d’habilitations et de contrôles
					spécifiques.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					5. Le Délégué à la Protection des données, le DPO
				</Heading>
				<Text my={2}>
					OHMONPEPET a désigné un délégué à la protection des données afin veiller au
					respect de la Réglementation et des règles décrites au sein de la présente
					Politique de confidentialité.
				</Text>
				<Text my={2}>Le délégué à la protection des données veille notamment :</Text>
				<UnorderedList spacing={2}>
					<ListItem>
						A établir et tenir à jour un registre des traitements de données à caractère
						personnel mis en œuvre dans l’entreprise.
					</ListItem>
					<ListItem>
						A s’assurer de la conformité des pratiques avec la réglementation et ses
						évolutions.
					</ListItem>
					<ListItem>
						A sensibiliser l’ensemble des équipes aux exigences et bonnes pratiques en
						matière de protection des données à caractère personnel.
					</ListItem>
					<ListItem>
						A l’exercice effectif des droits des personnes concernées . Le délégué à la
						protection des données est Nicolas Toulemont, il est joignable par mail à
						l’adresse suivante :{' '}
						<Text as='span' color='purple.700' fontWeight={600}>
							privacy@ohmonpepet.com
						</Text>
						.
					</ListItem>
				</UnorderedList>

				<Heading as='h2' size='lg' my={6} textAlign='left'>
					6. Finalité du traitement de données à caractère personnel et base légale
				</Heading>
				<Text my={2}>
					Vos données à caractère personnel sont collectées et traitées dans le cadre de
					la Plateforme et sont nécessaires pour la mise en œuvre du Service dans les
					conditions décrites au sein des Conditions Générales de Service.
				</Text>
				<Text my={2}>
					Le traitement de vos données qui a pour finalité la réalisation du Service est
					mis en œuvre sur la base de votre consentement explicite et en exécution des
					Conditions Générales de Services de la Plateforme conformément aux Articles
					6.1.b) et 9.2.a) du RGPD.
				</Text>
				<Text my={2}>
					Vous êtes informé que vos données pourront également être exploitées dans le
					cadre d’études ou d’évaluation auxquelles participerait OHMONPEPET, sauf
					opposition spécifique de votre part au préalable, et après mise en œuvre de
					l’ensemble des formalités requises auprès de la Commission nationale de
					l’Informatique et des libertés (la "CNIL"), lorsqu’elles sont applicables.
				</Text>
				<Text my={2}>
					Sous réserve de ne pas permettre votre identification directe, vos données
					pourront également être exploitées dans l’objectif d’améliorer les performances
					et les fonctionnalités de la Plateforme, et seront susceptibles de faire l’objet
					d’analyses et d’études statistiques dans le respect de votre anonymat.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					7. Destinataires des données et authentification
				</Heading>
				<UnorderedList spacing={2}>
					<ListItem>
						Destinataire des données
						<Text my={2}>Vos données sont uniquement destinées à :</Text>
						<UnorderedList spacing={1}>
							<ListItem>Vous-même pour ce qui concerne vos propres données</ListItem>
							<ListItem>
								Aux membres du personnel de la Société, spécifiquement habilités, à
								des fins de gestion technique et administrative et de votre dossier
								dans la limite de leurs attributions
							</ListItem>
							<ListItem>
								Aux membres du personnel des sous-traitants, prestataires
								techniques, spécifiquement habilités, dans le strict respect de
								leurs missions.
							</ListItem>
						</UnorderedList>
						<Text my={2}>
							OHMONPEPET garantit que vos données à caractère personnel ne seront
							transmises à aucun tiers non autorisé, sans l’accord de la personne
							concernée.
						</Text>
					</ListItem>
					<ListItem>
						Authentification
						<UnorderedList spacing={1}>
							<ListItem>
								Modalités d’accès à votre Compte Utilisateur
								<Text my={2}>
									Vous bénéficiez d'un accès à votre Compte Utilisateur. A ce
									titre, lors de la création d’un Compte Utilisateur, vous devez
									renseigner un login et un mot de passe, uniques et personnels,
									qui vous permettrons d’accéder ultérieurement à votre Compte
									Utilisateur.
								</Text>
								<Text my={2}>
									La connexion au Compte Utilisateur repose sur un système
									d’authentification fiable et sécurisé. Lors de chaque connexion
									au Compte Utilisateur, vous devez vous identifier et vous
									s’authentifier par l’intermédiaire :
								</Text>
								<UnorderedList>
									<ListItem>
										D’un login correspondant à son adresse email
									</ListItem>
									<ListItem>
										D’un mot de passe conforme aux exigences de sécurité
										requises, composé de 8 caractères au minimum et de 32 au
										maximum et comprenant des majuscules, des minuscules, des
										chiffres et des caractères spéciaux
									</ListItem>
								</UnorderedList>
								<Text my={2}>
									Le Compte Utilisateur sera bloqué au bout de 3 tentatives de
									connexion consécutives infructueuses
								</Text>
								<Text my={2}>
									Sachez que votre identification au moyen de votre adresse e-mail
									et, le cas échéant du code utilisateur qui vous est remis
									associé aux modalités d’authentification reposant sur un mot de
									passe, mis en œuvre dans le cadre de votre accès à votre Compte
									Utilisateur, vaut de manière irréfragable imputabilité à
									vous-même des opérations effectuées au moyen de ces identifiant
									et dispositif d’authentification, dans les conditions définies à
									l’article "Convention de preuve" des Conditions Générales de
									Services.
								</Text>
								<Text my={2}>
									Vous reconnaissez que vous êtes seul responsable de l'usage que
									vous faites de vos identifiant et authentifiant. L’Utilisateur
									s'engage, de manière générale, à prendre toutes mesures utiles
									pour assurer la parfaite confidentialité de ses identifiant et
									authentifiant et s'engage à ne pas communiquer, céder ou mettre
									à la disposition, d'un tiers, y compris son mot de passe et ses
									identifiants.
								</Text>
								<Text my={2}>
									En cas de perte ou de vol du mot de passe et/ou de vos
									identifiants, vous vous engagez à en informer sans délai le
									Délégué à la Protection des Données de la Société, par mail à
									l’adresse suivante :{' '}
									<Text as='span' color='purple.700' fontWeight={600}>
										privacy@ohmonpepet.com
									</Text>
									.
								</Text>
								<Text my={2}>
									L'opposition que vous notifiez en cas de perte ou de vol de vos
									identifiants et/ou de vos authentifiant prendra effet
									immédiatement à compter de cette notification. Une procédure de
									réinitialisation est mise à votre disposition et vous serez
									redirigé vers une interface vous permettant de saisir un nouveau
									mot de passe.
								</Text>
								<Text my={2}>
									En outre, vous pourrez, à tout moment, demander à OHMONPEPET, la
									modification de votre mot de passe et ce, plus particulièrement
									si vous suspectez une utilisation par un tiers non autorisé de
									ce dernier. Pour ce faire, vous devrez procéder à une demande
									auprès du Délégué à la Protection des Données de la Société, par
									mail à l’adresse suivante :{' '}
									<Text as='span' color='purple.700' fontWeight={600}>
										privacy@ohmonpepet.com
									</Text>
									. Le mot de passe et les identifiants existant seront désactivés
									et un nouveau mot de passe et identifiants provisoires vous
									seront adressés par la Société, dans les meilleurs délais.
								</Text>
								<Text my={2}>
									Par ailleurs, un dispositif technique vous impose un
									renouvellement de votre mot de passe tous les six mois à partir
									de votre première connexion, conformément aux recommandations de
									la CNIL.
								</Text>
								<Text my={2}>
									Le cas échéant, la Société s’engage à vous notifier la violation
									de votre mot de passe dans un délai n’excédant pas les 72 heures
									conformément aux recommandations de la CNIL. Vous serez alors
									tenu de modifier votre mot de passe dès la connexion suivante.
								</Text>
							</ListItem>
							<ListItem>
								L’Historique de vos données
								<Text my={2}>
									Enfin, chaque accès à vos données est tracé conformément aux
									recommandations de la CNIL. A ce titre, en vous rendant dans la
									rubrique
									<NextLink href='/protection' passHref>
										<Link mx={2} color='blue.400' fontWeight={600}>
											Protection des données
										</Link>
									</NextLink>
									vous pouvez accéder à l’historique des différents accès à vos
									données réalisé par vous-même ou une tierce personne autorisée.
								</Text>
								<Text my={2}>
									A cet effet, si vous identifiez a posteriori un accès anormal à
									vos données personnelles – ou celles de votre patient – en
									consultant l’historique, vous êtes fortement invité à contacter
									le Délégué à la Protection des Données de la Société à l’adresse
									e-mail suivante{' '}
									<Text as='span' color='purple.700' fontWeight={600}>
										privacy@ohmonpepet.com
									</Text>
									.
								</Text>
							</ListItem>
						</UnorderedList>
					</ListItem>
				</UnorderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					8. Mesures de sécurité déployées
				</Heading>
				<Text my={2}>
					La sécurité des données porte sur les mesures prises afin de protéger les
					données des faits suivants :
				</Text>
				<UnorderedList spacing={2}>
					<ListItem>La destruction</ListItem>
					<ListItem>La perte</ListItem>
					<ListItem>L'altération</ListItem>
					<ListItem>
						la divulgation non autorisée de données à caractère personnel transmises,
						conservées ou traitées
					</ListItem>
					<ListItem>
						l'accès non autorisé à de telles données, de manière accidentelle ou
						illicite
					</ListItem>
				</UnorderedList>

				<Text my={2}>
					La Société, en sa qualité de responsable de traitement au sens de la
					Règlementation, met toutes les mesures de sécurité en œuvre afin de garantir la
					protection et la sécurité des données de vos données, en particulier à l’égard
					de l’accès non autorisé d’un tiers.
				</Text>
				<Text my={2}>
					Des dispositifs renforcés en termes de sécurité sont mis en place afin de
					permettre une collecte et un traitement des données personnelles dans les
					conditions garantissant leur confidentialité, leur intégrité et de manière plus
					générale leur sécurité dans le respect de la Réglementation.
				</Text>
				<Text my={2}>
					A ce titre et chaque fois que nécessaire, les mesures suivantes ont été prises :
				</Text>
				<UnorderedList spacing={2}>
					<ListItem>
						La pseudonymisation et le chiffrement des données à caractère personnel
					</ListItem>
					<ListItem>
						Le déploiement de moyens permettant de garantir la confidentialité,
						l'intégrité, la disponibilité et la résilience constantes des systèmes et
						des traitements
					</ListItem>
					<ListItem>
						Le déploiement de moyens permettant de rétablir la disponibilité des données
						à caractère personnel et l'accès à celles-ci dans des délais appropriés en
						cas d'incident physique ou technique
					</ListItem>
					<ListItem>
						La mise en œuvre d’une procédure visant à tester, à analyser et à évaluer
						régulièrement l'efficacité des mesures techniques et organisationnelles pour
						assurer la sécurité des traitements.
					</ListItem>
				</UnorderedList>

				<Heading as='h2' size='lg' my={6} textAlign='left'>
					9. Durée de conservation de vos données
				</Heading>
				<Text my={2}>
					Vos données administratives à caractère personnel collectées à l’occasion de la
					création de votre Compte Utilisateur sont conservées pendant toute la durée de
					vie de ce dernier.
				</Text>
				<Text my={2}>
					Enfin, en toutes hypothèses, vos données, une fois strictement anonymisées et
					agrégées – c’est-à-dire ne permettant plus votre ré-identification par quelque
					moyen que ce soit une fois le procédé d’anonymisation irréversible et
					d’agrégation appliqué – peuvent faire l’objet d’analyses et d’études
					statistiques dans le respect de la Réglementation.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					10. Information et recueil du consentement explicite de l’Utilisateur
				</Heading>
				<Text my={2}>
					Comme indiqué supra, et conformément à la Règlementation, vous êtes informé que
					vos données sont collectées et traitées dans le cadre de votre utilisation de la
					Plateforme et du Service, sur la base de votre consentement explicite et en
					exécution des Conditions Générales de Service.
				</Text>
				<Text my={2}>
					A défaut, vous ne pourrez pas vous créer un Compte Utilisateur sur la Plateforme
					et accéder au Service.
				</Text>
				<Text my={2}>
					Une fois votre consentement explicite donné, sachez que vous avez la possibilité
					de le retirer à tout moment en contactant directement le délégué à la protection
					des données de OHMONPEPET à l’adresse suivante :{' '}
					<Text as='span' color='purple.700' fontWeight={600}>
						privacy@ohmonpepet.com
					</Text>
				</Text>
				<Text my={2}>
					Il sera alors procédé à la clôture de votre Compte Utilisateur et vous ne
					pourrez alors plus accéder à la Plateforme et bénéficier du Service.
				</Text>
				<Text my={2}>
					Votre attention est attirée sur le fait que le retrait de votre consentement ne
					portera pas non plus atteinte à la licéité du traitement de vos données effectué
					avant le retrait de son consentement.
				</Text>
				<Text my={2}>
					Pour rappel, dans le cadre du Service, vous êtes invité à consentir :
				</Text>
				<UnorderedList spacing={2}>
					<ListItem>
						<NextLink href='/cgs' passHref>
							<Link mr={2} color='blue.400' fontWeight={600}>
								Aux Conditions générales de Services de la Plateforme
							</Link>
						</NextLink>
						après en avoir pris connaissance.
					</ListItem>
				</UnorderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					11. Droits sur les données
				</Heading>
				<Text my={2}>
					Conformément à la Réglementation, vous disposez des droits suivants :
				</Text>
				<UnorderedList spacing={2}>
					<ListItem>
						Du droit d’accéder à vos données (droit d’accès) : la personne concernée
						peut demander directement au délégué à la protection des données de
						OHMONPEPET s’il détient des informations sur elle, et demander à ce que lui
						soit communiqué la liste des données
					</ListItem>
					<ListItem>
						De demander leur rectification (droit de rectification) : la personne
						concernée peut demander la rectification des informations inexactes la
						concernant. Le droit de rectification complète le droit d’accès
					</ListItem>
					<ListItem>
						De demander l’effacement de vos données (droit à l’oubli): la personne
						concernée peut demander l’effacement des informations la concernant, pour un
						motif prévu par la Règlementation
					</ListItem>
					<ListItem>
						De demander la limitation du traitement de vos données (droit à la
						limitation) : la personne concernée peut obtenir la limitation du traitement
						de ses données, pour un motif prévu par la Règlementation.
					</ListItem>
					<ListItem>
						De demander la portabilité de vos données (droit à la portabilité): la
						personne concernée peut demander à recevoir les données qu’elle a fourni à
						la Société dans le cadre de son utilisation du Service, ou demander qu’elles
						soient transmises à un autre responsable de traitement pour un motif prévu
						par la Règlementation
					</ListItem>
					<ListItem>
						De définir des directives anticipées relatives au sort de vos données après
						votre décès
					</ListItem>
				</UnorderedList>
				<Text my={2}>
					Vous pouvez également vous opposer, pour des motifs légitimes, à ce que les
					données vous concernant soient traitées, diffusées, transmises, conservées ou
					hébergées.
				</Text>
				<Text my={2}>
					Pour plus d’informations sur la signification des droits,
					<Link
						href='https://www.cnil.fr/fr/comprendre-vos-droits'
						isExternal
						ml={2}
						color='blue.400'
						fontWeight={600}
					>
						la CNIL a créé une rubrique dédiée à la compréhension des droits
					</Link>
				</Text>
				<Text my={2}>
					Pour exercer ces droits, vous pouvez contacter directement, le délégué à la
					protection des données de OHMONPEPET en adressant votre demande par e-mail :
					<Text as='span' color='purple.700' fontWeight={600}>
						privacy@ohmonpepet.com
					</Text>{' '}
					ou à l’adresse postale : OHMONPEPET – c/o PARIS SANTE COCHIN - 29 rue du
					Faubourg Saint-Jacques, 75014 Paris.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					12. Les réclamations auprès de la CNIL
				</Heading>
				<Text my={2}>
					Chaque Utilisateur dispose du droit d’introduire une réclamation auprès d’une
					autorité de contrôle de protection des données. En France, cette autorité est la
					CNIL, voici ses coordonnées :
				</Text>
				<UnorderedList spacing={2}>
					<ListItem>
						Site internet :{' '}
						<Link
							href='https://www.cnil.fr/'
							isExternal
							ml={2}
							fontWeight={600}
							color='blue.400'
						>
							cnil.fr
						</Link>
					</ListItem>
					<ListItem>Téléphone : 01 53 73 22 22</ListItem>
					<ListItem>
						Adresse postale : CNIL - 3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX
						07 16
					</ListItem>
				</UnorderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					13. Les Cookies
				</Heading>
				<OrderedList spacing={2}>
					<ListItem>Qu’est-ce qu’un cookie ?</ListItem>
					<Text my={2}>
						Un cookie est un petit fichier contenant des lettres et des chiffres, stocké
						sur le navigateur ou sur le disque dur de l’ordinateur, du smartphone ou de
						la tablette d’un utilisateur, s’il l’accepte.
					</Text>
					<Text my={2}>
						La Société utilise des cookies au sein de la Plateforme : des fichiers
						stockés temporairement ou définitivement sur l’ordinateur, tablette ou
						smartphone de l’Utilisateur afin de le reconnaître lors de ses visites
						ultérieures.
					</Text>
					<ListItem>Pourquoi les cookies sont-ils utilisés ?</ListItem>
					<Text my={2}>La Société utilise les cookies suivants sur la Plateforme :</Text>
					<UnorderedList>
						<ListItem>Les cookies de navigation</ListItem>
						<ListItem>Les cookies fonctionnels</ListItem>
						<ListItem>Les cookies de performance et de mesure d'audience</ListItem>
					</UnorderedList>
					<Text my={2}>
						Les cookies utilisés dans le cadre de la Plateforme ont pour finalité
						exclusive :
					</Text>
					<UnorderedList>
						<ListItem>
							De fournir de l’information personnalisée aux Utilisateurs sur le
							Service
						</ListItem>
						<ListItem>
							D’établir des statistiques sur les usages du site et ainsi d’améliorer
							la navigation des Utilisateurs
						</ListItem>
						<ListItem>Les cookies de performance et de mesure d'audience</ListItem>
					</UnorderedList>
					<ListItem>Information-consentement</ListItem>
					<Text my={2}>
						Au titre de l’usage de cookies de mesure d’audience, un bandeau
						d’information s’affiche lors de votre connexion, afin de vous informer
						préalablement au dépôt de ces cookies et de recueillir son consentement
						préalable.
					</Text>
					<Text my={2}>
						Vous êtes présumé avoir donné votre consentement en poursuivant sa
						navigation, c'est-à-dire lorsque vous avez cliqué sur un élément de la
						Plateforme (contenu, lien, bouton "rechercher" etc.) ou lorsque vous vous
						êtes rendu sur une autre page de la Plateforme.
					</Text>
					<Text my={2}>Votre accord est valable pour une durée de douze (12) mois.</Text>
					<ListItem>Comment bloquer les cookies ?</ListItem>
					<Text my={2}>
						Vous pouvez bloquer les cookies en activant un filtre sur votre navigateur
						de votre ordinateur ou de votre smartphone ou tablette.
					</Text>
					<Text my={2}>
						L’Utilisateur pourra refuser tous les cookies ou seulement certains d'entre
						eux.
					</Text>
					<Text my={2}>
						Toutefois, si l’Utilisateur choisit de bloquer tous les cookies, certaines
						parties des sites Web pourraient devenir inaccessibles.
					</Text>
				</OrderedList>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					14. Les modifications de la politique de confidentialité
				</Heading>
				<Text my={2}>
					La politique de confidentialité est susceptible d’évoluer. En cas d’évolution
					des éléments mentionnés dans la politique de confidentialité, la Société
					s’engage à la modifier et à en informer les personnes concernées, préalablement
					à la mise en œuvre des modifications qui pourraient impacter les données à
					caractère personnel.
				</Text>
				<Text my={2}>
					La Société s’efforcera d’indiquer quels impacts impliqueront ces modifications.
				</Text>
				<Text my={2}>
					Le présent document a été validé préalablement à sa diffusion par le Délégué à
					la protection des données de OHMONPEPET. Il fait l’objet d’une révision au
					minimum tous les ans.
				</Text>
				<Heading as='h2' size='lg' my={6} textAlign='left'>
					15. Questions
				</Heading>
				<Text my={2}>
					Nous vous remercions d’avoir lu notre politique de protection des données. Si
					vous avez des questions, commentaires et préoccupations s’agissant de cette
					politique, contactez notre délégué à la protection des données, joignable par
					mail à l’adresse suivante :{' '}
					<Text as='span' color='purple.700' fontWeight={600}>
						privacy@ohmonpepet.com
					</Text>
					.
				</Text>
			</Flex>
		</Layout>
	)
}
