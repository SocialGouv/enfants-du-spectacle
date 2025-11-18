import React from "react";
import LayoutHome from "src/components/Layout";
import styles from "src/components/Politique.module.scss";

const Faq: React.FC = () => {
  return (
    <LayoutHome windowTitle="FAQ">
      <div className={`${styles.container} fr-container`}>
        <div className={styles.contentWrapper}>
          <h1>FAQ</h1>
          <h2>Guide utilisateur</h2>
          <p>
            Sous l’impulsion de la DRIEETS, la démarche de demande
            d’autorisation de travail pour les mineurs de moins de 16 ans a été
            dématérialisée. La plateforme Enfants du Spectacle vous permet
            désormais de faire vos demandes d’autorisations de travail
            directement en ligne.
          </p>
          <p>
            Ce guide a pour vocation de vous accompagner dans la prise en main
            de la plateforme et de répondre à vos questions.{" "}
          </p>
          <h5>
            {`            1) Comment accéder à la plateforme pour faire mes demandes
            d’autorisations de travail pour mineurs de moins de 16 ans en ligne
            ?`}
          </h5>
          <ul>
            <li>
              Cliquez sur le lien suivant :{" "}
              <a
                href="https://formulaire-enfants-du-spectacle.fabrique.social.gouv.fr/"
                target="blank"
              >
                https://formulaire-enfants-du-spectacle.fabrique.social.gouv.fr/
              </a>
            </li>
            <li>Renseignez votre adresse e-mail et cliquez sur “Connexion”</li>
            <li>
              Rendez-vous sur votre adresse e-mail et ouvrez le mail qui vous a
              été envoyé par{" "}
              <a href="mailto:enfantsduspectacle@diffusion.fabrique.social.gouv.fr">
                enfantsduspectacle@diffusion.fabrique.social.gouv.fr
              </a>
            </li>
            <li>
              Cliquez sur le lien présent dans le mail pour accéder à la
              plateforme
            </li>
          </ul>
          <h5>Comment créer un nouveau dossier ?</h5>
          <ul>
            <li>
              Cliquez sur le bouton “Créer un nouveau dossier”. Un dossier est
              constitué de 3 parties : une partie “Demandeur”, une partie
              “Projet” et une partie “Enfants”. Les 3 boutons en haut de la page
              du dossier permettent de naviguer entre ces 3 parties :
            </li>
            <img
              src="/images/create_dossier.png"
              alt="image"
              className={styles.images}
            />
            <li>
              A ce stade, votre dossier est encore au statut de “Brouillon”,
              vous pouvez le voir en haut à gauche de votre page de dossier.
              Cela signifie qu’il n’est pour le moment visible que par vous-même
              et pas encore par les services d’instruction.{" "}
            </li>
            <li>
              Commencez par renseigner les informations sur le demandeur à
              l’initiative de ce nouveau projet.
            </li>
            <img
              src="/images/info-demandeur.png"
              alt="image"
              className={styles.images}
            />
            <li>
              Continuez en cliquant sur le bouton “Projet” et renseignez les
              informations liées au projet (titre catégorie, date, scénario,
              synopsis, etc.). Vous avez également la possibilité de laisser des
              commentaires qui seront visibles par les agents d’instruction de
              la DRIEETS pour expliciter certaines pièces ou certains éléments.
            </li>
            <li>
              Une fois que votre dossier est initié, vous devez cliquer sur le
              bouton “Déposer” afin de le transmettre avant la date limite de
              dépôt aux services d’instruction de la DRIEETS, soit un mois avant
              la commission pour laquelle vous candidatez.{" "}
            </li>
            <div className={styles.imageWrapper}>
              <img
                src="/images/déposer.png"
                alt="image"
                className={styles.images}
              />
            </div>

            <li>
              A partir du moment où vous cliquez sur “Déposer”, votre dossier
              passe au statut “En construction”. Vous pouvez continuer de
              l’alimenter avec des pièces justificatives manquantes ou des
              enfants qui n’étaient pas encore identifiés avant la date limite
              de dépôt.
            </li>
          </ul>
          <ul className={styles.subUl}>
            <li className={styles.subLi}>
              “Votre dossier est automatiquement enregistré” signifie que toutes
              les modifications que vous opérez sont enregistrée de votre côté,
              sur le formulaire afin que vous ne perdiez rien dans le cas où
              vous fermez votre fenêtre par inadvertance ou prématurément.
            </li>
            <li className={styles.subLi}>
              Pour transmettre vos mises à jour aux services d’instruction, il
              est nécessaire de cliquer sur le bouton “Déposer”. Vous pouvez
              cliquer sur le bouton dès que vous chargez une nouvelle pièce
              justificative ou bien après avoir l’ensemble de vos modifications
              de la journée.
            </li>
          </ul>
          <ul>
            <li>
              Une fois que les services d’instruction de la DRIEETS auront
              validé l’ensemble de votre projet, de ces pièces justificatives et
              des pièces justificatives, ils passeront votre dossier en “Prêt”,
              ce qui signifie que le dossier est prêt pour la commission.{" "}
            </li>
          </ul>
          <h5>3) Comment ajouter des enfants ?</h5>
          <div>
            Pour ajouter des enfants, deux possibilités s’offrent à vous :
          </div>
          <ul>
            <li>
              les ajouter unitairement en cliquant sur “Ajouter un enfant”
            </li>
            <li>
              les ajouter en masse en utilisant le template mis à votre
              disposition
            </li>
          </ul>
          <div style={{ fontWeight: "bold" }}>
            Ajouter les enfants unitairement :
          </div>
          <ul>
            <li>
              Continuez en cliquant sur le bouton “Enfants”. Vous trouverez dans
              cette partie le bouton “Ajouter un enfant” qui vous permet de
              créer les enfants pour lesquels vous devez faire une demande
              d’autorisation de travail.{" "}
            </li>
            <img
              src="/images/add_enfant.png"
              alt="image"
              className={styles.images}
            />
            <li>
              Une fois que vous avez ajouté les enfants pour lesquels vous
              souhaitez faire des demandes, il se peut que certains soient
              finalement inaptes, ou indisponible et pour lesquels vous
              souhaitez finalement ne pas faire la demande. Vous pouvez alors
              cliquer sur le bouton “Supprimer cet enfant”
            </li>
            <div className={styles.imageWrapper}>
              <img
                src="/images/delete_enfant.png"
                alt="image"
                className={styles.images}
              />
            </div>
            <li>
              Vous avez déjà ajouté beaucoup d’enfant et vous en avez marre de
              scroller à chaque fois pour remonter en haut de la page ? Vous
              pouvez utiliser le sticky button pour remonter en haut de page :{" "}
            </li>
            <div className={styles.imageWrapper}>
              <img
                src="/images/sticky_up.png"
                alt="image"
                className={styles.images}
              />
            </div>
            <li>
              Vous souhaitez ajouter un enfant avec lequel vous avez déjà
              travaillé ? Si vous tapez son nom et son prénom et attendez une à
              deux secondes, une liste déroulante s’affiche avec les différentes
              informations.
            </li>
          </ul>
          <div style={{ fontWeight: "bold" }}>
            Ajouter les enfants en masse en utilisant le template mis à votre
            disposition :
          </div>
          <ul>
            <li>Cliquez sur le bouton “Télécharger le modèle (csv excel)”</li>
            <img
              src="/images/template_enfant.png"
              alt="image"
              className={styles.images}
            />
            <ul>
              <li>
                Une fois téléchargé, vous devez compléter la feuille{" "}
                <strong>“Enfants”</strong> du template excel avec les
                informations sur les enfants.{" "}
                <strong>
                  Il vous faut impérativement respecter les formats des champs
                  indiqué dans la feuille “Mode d’emploi” et ne surtout pas
                  modifier les intitulés des colonnes dans l’onglet “Enfants”.
                </strong>
              </li>
              <li>
                Une fois que votre fichier est complet, vous pouvez
                l’enregistrer et le fermer.
              </li>
              <li>
                Cliquez ensuite sur le bouton{" "}
                <strong>“Importer le fichier d’enfants”</strong>. Votre
                explorateur windows va s’ouvrir et vous pouvez sélectionner
                votre fichier.
              </li>
              <li>
                Après avoir importer votre fichier, la page de votre projet doit
                se mettre à jour et les fiches des enfants pour lesquels vous
                faites votre demande vont se créer automatiquement. Il se peut
                que vous ayez besoin d’actualiser la page pour que la mise à
                jour se fasse correctement.
              </li>
              <li>
                Il vous reste toutefois à charger les différentes pièces
                justificatives au sein de la plateforme.
              </li>
            </ul>
          </ul>
          <h5>
            4) Comment échanger avec l’agent de la DRIEETS en charge de
            l’instruction de mon dossier
          </h5>
          <ul>
            <li>
              Vous souhaitez apporter des précisions spécifiques sur le projet
              ou sur un enfant : les dates du projet sont incertaines et
              risquent d’évoluer par la suite, vous avez des difficultés à
              récupérer le certificat de scolarité… Vous pouvez utiliser{" "}
              <strong>la fonctionnalité de commentaire</strong> qui se trouve en
              bas de page dans l’onglet “Projet” ainsi qu’en bas de chaque fiche
              enfant. Vous rédigez votre commentaire puis vous cliquez sur
              “Ajouter un commentaire” afin qu’il soit transmis à la DRIEETS.
              Agissant comme un chat, l’agent de la DRIEETS en charge de votre
              dossier pourra vous répondre avec la même fonctionnalité de son
              côté.
            </li>
            <div className={styles.imageWrapper}>
              <img
                src="/images/dossier_comment.png"
                alt="image"
                className={styles.images}
              />
            </div>
          </ul>
          <h5>
            5) Je rencontre un problème sur la plateforme, qui puis-je contacter
            ?
          </h5>
          <ul>
            <li>
              Rémunérations et rémunérations additionnelles : les champs dédiés
              à la rémunérations sont{" "}
              <strong>des champs nombre uniquement.</strong> Cela permet de
              calculer automatiquement la rémunération totale prévue pour
              l’enfant. Il est donc impossible d’y renseigner des éléments
              textuels pour expliciter la rémunération. Pour apporter des
              éléments de précision sur la rémunération, vous pouvez rédiger un
              commentaire.
            </li>
            <li>
              Les pièces jointes qui n’apparaissent pas côté instruction : cela
              peut être dû au format. Bien qu’il est indiqué que la plateforme
              accepte les format pdf, il arrive que certains format pdf ne
              fonctionne pas, notamment lorsque l’extension est en majuscule.{" "}
              <strong>
                Il faut alors convertir à nouveau le fichier pour le mettre au
                bon format pdf.
              </strong>{" "}
              Vous pouvez alors vous rendre sur le convertisseur en ligne que
              vous avez l’habitude d’utiliser pour le convertir et charger à
              nouveau la pièce justificative.
            </li>
            <li>
              Vous n’avez pas trouvé de réponse à votre question dans ce FAQ ?
              Vous pouvez écrire à l’adresse suivante :{" "}
              <a href="mailto:drieets-idf-ud75.eesam@drieets.gouv.fr">
                drieets-idf-ud75.eesam@drieets.gouv.fr
              </a>
            </li>
          </ul>
          <h5>
            6) Comment savoir si l’enfant pour lequel je fais une demande doit
            voir un médecin Thalie Santé ou un médecin généraliste ?
          </h5>
          <ul>
            <li>
              Un enfant doit voir un médecin Thalie Santé si il est dans un des
              cas ci-dessous :
              <ul>
                <li>Rôle 1er choix</li>
                <li>Rôle 2nd choix</li>
                <li>
                  Figurant avec plus de 4 jours d’absences (donc à partir de 5
                  jours d’absences)
                </li>
              </ul>
            </li>
            <li>
              Dans tous les autres cas, l’enfant peut faire sa visite médicale
              chez{" "}
              <strong>
                un médecin généraliste en exercice. Les visites médicales
                réalisées chez des médecin retraités ne seront pas acceptées.
              </strong>
            </li>
            <li>
              Dans le cas où l’enfant réside en région parisienne, Thalie santé
              fera une consultation en physique ou en téléconsultation et
              prendra contact directement avec les parents et vous devez alors
              renseigner les informations de contacts des représentants légaux.
              A l’issue de cette consultation, Thalie santé chargera le
              certificat d’aptitude ou d’inaptitude directement sur la
              plateforme.
            </li>
            <li>
              Dans le cas où Thalie santé réalise un examen sur pièce, Thalie
              santé chargera directement le certificat d’aptitude ou
              d’inaptitude sur la plateforme.
            </li>
            <li>
              Dans le cas où l’enfant réside en région, Thalie santé chargera
              sur la plateforme un bon de prise en charge qui vous permettra de
              prendre rendez-vous dans un centre agréé par Thalie Santé en
              région. Vous trouverez les contacts des centres agréés.
            </li>
            <li>
              Lorsque vous indiquez que l’enfant doit voir un médecin Thalie
              Santé, vous devez renseigner les informations de contacts des afin
              que Thalie Santé puissent entrer en contact directement avec les
              parents et prendre le rendez-vous en autonomie.
            </li>
          </ul>
        </div>
      </div>
    </LayoutHome>
  );
};

export default Faq;
