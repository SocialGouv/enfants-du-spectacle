import React from "react";
import LayoutHome from "src/components/LayoutHome";
import styles from "src/components/Politique.module.scss";

const Conditions: React.FC = () => {
  return (
    <LayoutHome windowTitle="Conditions générales d’Utilisation">
      <div className={`${styles.container} fr-container`}>
        <div className={styles.contentWrapper}>
          <h1>Déclaration d'accessibilité</h1>
          <p>Établie le 22 septembre 2023.</p>

          <p>
            Fabrique Numérique des Ministères Sociaux s'engage à rendre son
            service accessible, conformément à l'article 47 de la loi n°
            2005-102 du 11 février 2005.
          </p>

          <p>
            À cette fin, nous mettons en œuvre la stratégie et les actions
            suivantes : Le plan d'action est en cours de formalisation.
          </p>

          <p>
            Cette déclaration d'accessibilité s'applique à{" "}
            <a href="https://enfants-du-spectacle.fabrique.social.gouv.fr/">
              Enfants du spectacle
            </a>
            .
          </p>

          <h2>État de conformité</h2>
          <p>
            <strong>Enfants du spectacle</strong> est{" "}
            <strong>non conforme</strong> avec le RGAA. Le site n'a encore pas
            été audité.
          </p>

          <h2>Contenus non accessibles</h2>

          <h2>Amélioration et contact</h2>
          <p>
            Si vous n'arrivez pas à accéder à un contenu ou à un service, vous
            pouvez contacter le responsable de Enfants du spectacle pour être
            orienté vers une alternative accessible ou obtenir le contenu sous
            une autre forme.
          </p>

          <p>
            E-mail :{" "}
            <a href="mailto:enfantsduspectacle@fabrique.social.gouv.fr">
              enfantsduspectacle@fabrique.social.gouv.fr
            </a>
          </p>
          <p>
            Adresse : Fabrique Numérique des Ministères Sociaux, Tour Mirabeau
          </p>
          <p>
            E-mail :{" "}
            <a href="mailto:contact@fabrique.social.gouv.fr">
              contact@fabrique.social.gouv.fr
            </a>
          </p>
          <p>Nous essayons de répondre dans les 3 jours ouvrés.</p>

          <h2>Voie de recours</h2>
          <p>
            Cette procédure est à utiliser dans le cas suivant : vous avez
            signalé au responsable du site internet un défaut d'accessibilité
            qui vous empêche d'accéder à un contenu ou à un des services du
            portail et vous n'avez pas obtenu de réponse satisfaisante.
          </p>

          <p>Vous pouvez :</p>
          <ul>
            <li>Écrire un message au Défenseur des droits</li>
            <li>
              Contacter le délégué du Défenseur des droits dans votre région
            </li>
            <li>
              Envoyer un courrier par la poste (gratuit, ne pas mettre de
              timbre) :
            </li>
          </ul>
          <div>Défenseur des droits</div>
          <div>Libre réponse 71120 75342 Paris CEDEX 07</div>
        </div>
      </div>
    </LayoutHome>
  );
};

export default Conditions;
