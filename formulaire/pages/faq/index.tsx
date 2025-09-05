import React, { useState } from "react";
import LayoutHome from "src/components/Layout";
import StepGuide from "src/components/StepGuide";
import FaqAccordion from "src/components/FaqAccordion";
import styles from "./faq.module.scss";

const Faq: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const faqItems = [
    {
      category: "Médical",
      title: "Comment savoir si l'enfant doit voir un médecin Thalie Santé ou un médecin généraliste ?",
      content: (
        <div>
          <p>Un enfant doit voir un médecin Thalie Santé si il est dans un des cas ci-dessous :</p>
          <ul>
            <li>Rôle 1er choix</li>
            <li>Rôle 2nd choix</li>
            <li>Figurant avec plus de 4 jours d'absences (donc à partir de 5 jours d'absences)</li>
          </ul>
          <p>Dans tous les autres cas, l'enfant peut faire sa visite médicale chez <strong>un médecin généraliste en exercice. Les visites médicales réalisées chez des médecin retraités ne seront pas acceptées.</strong></p>
          <p>Dans le cas où l'enfant réside en région parisienne, Thalie santé fera une consultation en physique ou en téléconsultation et prendra contact directement avec les parents et vous devez alors renseigner les informations de contacts des représentants légaux.</p>
          <p>Dans le cas où l'enfant réside en région, Thalie santé chargera sur la plateforme un bon de prise en charge qui vous permettra de prendre rendez-vous dans un centre agréé par Thalie Santé en région.</p>
        </div>
      )
    },
    {
      category: "Technique",
      title: "Les pièces jointes n'apparaissent pas côté instruction, que faire ?",
      content: (
        <div>
          <p>Cela peut être dû au format. Bien qu'il est indiqué que la plateforme accepte les format pdf, il arrive que certains format pdf ne fonctionne pas, notamment lorsque l'extension est en majuscule.</p>
          <p><strong>Il faut alors convertir à nouveau le fichier pour le mettre au bon format pdf.</strong> Vous pouvez alors vous rendre sur le convertisseur en ligne que vous avez l'habitude d'utiliser pour le convertir et charger à nouveau la pièce justificative.</p>
        </div>
      )
    },
    {
      category: "Rémunération",
      title: "Comment renseigner les rémunérations et rémunérations additionnelles ?",
      content: (
        <div>
          <p>Les champs dédiés à la rémunérations sont <strong>des champs nombre uniquement.</strong> Cela permet de calculer automatiquement la rémunération totale prévue pour l'enfant.</p>
          <p>Il est donc impossible d'y renseigner des éléments textuels pour expliciter la rémunération. Pour apporter des éléments de précision sur la rémunération, vous pouvez rédiger un commentaire.</p>
        </div>
      )
    },
    {
      category: "Support",
      title: "Je n'ai pas trouvé de réponse à ma question, qui contacter ?",
      content: (
        <div>
          <p>Vous pouvez écrire à l'adresse suivante : <a href="mailto:enfantsduspectacle@fabrique.social.gouv.fr">enfantsduspectacle@fabrique.social.gouv.fr</a></p>
        </div>
      )
    }
  ];

  const filteredFaqItems = faqItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.content.props.children.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <LayoutHome windowTitle="Guide utilisateur et FAQ">
      <div className={`${styles.container} fr-container`}>
        <div className={styles.contentWrapper}>
          <h1>Guide utilisateur et FAQ</h1>
          
          {/* Table des matières */}
          <div className={styles.tableOfContents}>
            <h2>Sommaire</h2>
            <ul>
              <li><a href="#guide-utilisateur">Guide utilisateur</a></li>
              <li><a href="#faq">Questions fréquentes</a></li>
            </ul>
          </div>

          {/* Section Guide utilisateur */}
          <section id="guide-utilisateur" className={styles.section}>
            <h2>Guide utilisateur</h2>
            <p className={styles.sectionDescription}>
              Ce guide vous accompagne pas à pas dans l'utilisation de la plateforme Enfants du Spectacle 
              pour faire vos demandes d'autorisations de travail directement en ligne.
            </p>

            <StepGuide
              stepNumber={1}
              title="Se connecter à la plateforme"
            >
              <ul>
                <li>
                  Cliquez sur le lien suivant :{" "}
                  <a
                    href="https://formulaire-enfants-du-spectacle.fabrique.social.gouv.fr/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://formulaire-enfants-du-spectacle.fabrique.social.gouv.fr/
                  </a>
                </li>
                <li>Renseignez votre adresse e-mail et cliquez sur "Connexion"</li>
                <li>
                  Rendez-vous sur votre adresse e-mail et ouvrez le mail qui vous a été envoyé par{" "}
                  <a href="mailto:enfantsduspectacle@diffusion.fabrique.social.gouv.fr">
                    enfantsduspectacle@diffusion.fabrique.social.gouv.fr
                  </a>
                </li>
                <li>Cliquez sur le lien présent dans le mail pour accéder à la plateforme</li>
              </ul>
            </StepGuide>

            <StepGuide
              stepNumber={2}
              title="Créer un nouveau dossier"
            >
              <p>
                Cliquez sur le bouton "Créer un nouveau dossier". Un dossier est constitué de 3 parties : 
                une partie "Demandeur", une partie "Projet" et une partie "Enfants". Les 3 boutons en haut 
                de la page du dossier permettent de naviguer entre ces 3 parties.
              </p>
              <div className={styles.imageWrapper}>
                <img
                  src="/images/create_dossier.png"
                  alt="Interface de création d'un dossier"
                  className={styles.images}
                />
              </div>
              <p>
                À ce stade, votre dossier est encore au statut de "Brouillon", vous pouvez le voir en haut 
                à gauche de votre page de dossier. Cela signifie qu'il n'est pour le moment visible que par 
                vous-même et pas encore par les services d'instruction.
              </p>
            </StepGuide>

            <StepGuide
              stepNumber={3}
              title="Renseigner les informations demandeur"
            >
              <p>Commencez par renseigner les informations sur le demandeur à l'initiative de ce nouveau projet.</p>
              <div className={styles.imageWrapper}>
                <img
                  src="/images/info-demandeur.png"
                  alt="Formulaire d'informations du demandeur"
                  className={styles.images}
                />
              </div>
            </StepGuide>

            <StepGuide
              stepNumber={4}
              title="Compléter les informations projet"
            >
              <p>
                Continuez en cliquant sur le bouton "Projet" et renseignez les informations liées au projet 
                (titre catégorie, date, scénario, synopsis, etc.). Vous avez également la possibilité de 
                laisser des commentaires qui seront visibles par les agents d'instruction de la DRIEETS 
                pour expliciter certaines pièces ou certains éléments.
              </p>
            </StepGuide>

            <StepGuide
              stepNumber={5}
              title="Ajouter des enfants"
            >
              <p>Pour ajouter des enfants, deux possibilités s'offrent à vous :</p>
              
              <h4>Ajouter les enfants unitairement :</h4>
              <ul>
                <li>
                  Continuez en cliquant sur le bouton "Enfants". Vous trouverez dans cette partie le bouton 
                  "Ajouter un enfant" qui vous permet de créer les enfants pour lesquels vous devez faire 
                  une demande d'autorisation de travail.
                </li>
                <div className={styles.imageWrapper}>
                  <img
                    src="/images/add_enfant.png"
                    alt="Bouton d'ajout d'enfant"
                    className={styles.images}
                  />
                </div>
                <li>
                  Vous souhaitez ajouter un enfant avec lequel vous avez déjà travaillé ? Si vous tapez son nom 
                  et son prénom et attendez une à deux secondes, une liste déroulante s'affiche avec les 
                  différentes informations.
                </li>
              </ul>

              <h4>Ajouter les enfants en masse :</h4>
              <ul>
                <li>Cliquez sur le bouton "Télécharger le modèle (csv excel)"</li>
                <div className={styles.imageWrapper}>
                  <img
                    src="/images/template_enfant.png"
                    alt="Template d'import d'enfants"
                    className={styles.images}
                  />
                </div>
                <li>
                  Une fois téléchargé, vous devez compléter la feuille <strong>"Enfants"</strong> du template excel 
                  avec les informations sur les enfants. <strong>Il vous faut impérativement respecter les formats 
                  des champs indiqué dans la feuille "Mode d'emploi" et ne surtout pas modifier les intitulés des 
                  colonnes dans l'onglet "Enfants".</strong>
                </li>
                <li>
                  Cliquez ensuite sur le bouton <strong>"Importer le fichier d'enfants"</strong>. Votre explorateur 
                  va s'ouvrir et vous pouvez sélectionner votre fichier.
                </li>
              </ul>
            </StepGuide>

            <StepGuide
              stepNumber={6}
              title="Déposer le dossier"
            >
              <p>
                Une fois que votre dossier est initié, vous devez cliquer sur le bouton "Déposer" afin de le 
                transmettre avant la date limite de dépôt aux services d'instruction de la DRIEETS, soit un 
                mois avant la commission pour laquelle vous candidatez.
              </p>
              <div className={styles.imageWrapper}>
                <img
                  src="/images/déposer.png"
                  alt="Bouton de dépôt du dossier"
                  className={styles.images}
                />
              </div>
              <p>
                À partir du moment où vous cliquez sur "Déposer", votre dossier passe au statut "En construction". 
                Vous pouvez continuer de l'alimenter avec des pièces justificatives manquantes ou des enfants qui 
                n'étaient pas encore identifiés avant la date limite de dépôt.
              </p>
              
              <div className={styles.importantNote}>
                <h5>Points importants :</h5>
                <ul>
                  <li>
                    "Votre dossier est automatiquement enregistré" signifie que toutes les modifications que vous 
                    opérez sont enregistrée de votre côté, sur le formulaire afin que vous ne perdiez rien dans le 
                    cas où vous fermez votre fenêtre par inadvertance ou prématurément.
                  </li>
                  <li>
                    Pour transmettre vos mises à jour aux services d'instruction, il est nécessaire de cliquer sur 
                    le bouton "Déposer". Vous pouvez cliquer sur le bouton dès que vous chargez une nouvelle pièce 
                    justificative ou bien après avoir l'ensemble de vos modifications de la journée.
                  </li>
                </ul>
              </div>
            </StepGuide>

            <StepGuide
              stepNumber={7}
              title="Échanger avec l'agent DRIEETS"
            >
              <p>
                Vous souhaitez apporter des précisions spécifiques sur le projet ou sur un enfant : les dates du 
                projet sont incertaines et risquent d'évoluer par la suite, vous avez des difficultés à récupérer 
                le certificat de scolarité… Vous pouvez utiliser <strong>la fonctionnalité de commentaire</strong> qui 
                se trouve en bas de page dans l'onglet "Projet" ainsi qu'en bas de chaque fiche enfant.
              </p>
              <div className={styles.imageWrapper}>
                <img
                  src="/images/dossier_comment.png"
                  alt="Interface de commentaires"
                  className={styles.images}
                />
              </div>
              <p>
                Vous rédigez votre commentaire puis vous cliquez sur "Ajouter un commentaire" afin qu'il soit 
                transmis à la DRIEETS. Agissant comme un chat, l'agent de la DRIEETS en charge de votre dossier 
                pourra vous répondre avec la même fonctionnalité de son côté.
              </p>
            </StepGuide>
          </section>

          {/* Section FAQ */}
          <section id="faq" className={styles.section}>
            <h2>Questions fréquentes</h2>
            <p className={styles.sectionDescription}>
              Retrouvez ici les réponses aux questions les plus courantes sur les aspects métiers et juridiques.
            </p>

            {/* Barre de recherche */}
            <div className={styles.searchWrapper}>
              <input
                type="text"
                placeholder="Rechercher dans la FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            {/* Accordéons FAQ */}
            <div className={styles.faqContainer}>
              {filteredFaqItems.length > 0 ? (
                filteredFaqItems.map((item, index) => (
                  <FaqAccordion
                    key={index}
                    title={item.title}
                    category={item.category}
                  >
                    {item.content}
                  </FaqAccordion>
                ))
              ) : (
                <p className={styles.noResults}>Aucun résultat trouvé pour votre recherche.</p>
              )}
            </div>
          </section>

          {/* Bouton retour en haut */}
          <button
            className={styles.backToTop}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Retour en haut de page"
          >
            ↑
          </button>
        </div>
      </div>
    </LayoutHome>
  );
};

export default Faq;
