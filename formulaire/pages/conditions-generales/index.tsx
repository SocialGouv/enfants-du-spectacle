import React from "react";
import LayoutHome from "src/components/Layout";
import styles from "src/components/Politique.module.scss";

const Conditions: React.FC = () => {
  return (
    <LayoutHome windowTitle="Conditions générales d’Utilisation">
      <div className={`${styles.container} fr-container`}>
        <div className={styles.contentWrapper}>
          <h1>Conditions générales d’utilisation</h1>
          <h2>Enfants du Spectacle - CGU Public</h2>
          <p>
            Les présentes conditions générales d’utilisation (dites « CGU »)
            fixent le cadre juridique de la plateforme Enfants du spectacle
            (ci-après « la plateforme ») et définissent les conditions d’accès
            et d’utilisation des services par le public.
          </p>
          <h5>Article 1 – Champ d’application</h5>
          <div>La plateforme est ouverte :</div>
          <ul>
            <li>
              aux demandeurs souhaitant réaliser une demande d’autorisation
              individuelle de travail pour des mineurs de moins de 16 ans dans
              le cadre d’un spectacle vivant, d’un tournage ou d’un doublage,
              dans les conditions prévues aux articles L 7124-1 et R. 7124-1 du
              code du travail ;
            </li>
            <li>aux agents des DRIEETS après la création de leur compte ;</li>
            <li>
              aux membres des commissions telles que définies à l’article
              R.7124-20 du code du travail ;
            </li>
            <li>
              aux médecins chargés de réaliser l’examen médical et les personnes
              habilitées agissant pour son compte ;
            </li>
            <li>
              à l’équipe de la Direction du numérique (DNUM) des ministères
              sociaux en charge de la plateforme.
            </li>
          </ul>
          <h5>Article 2 – Objet</h5>
          <div>La plateforme permet :</div>
          <ul>
            <li>
              la formalisation de la demande (dossier sur le projet et les
              enfants) ;
            </li>
            <li>le suivi de la demande ;</li>
            <li>
              la centralisation et la sécurisation des dossiers des enfants ;
            </li>
            <li>
              l’information concernant la prise de rendez-vous dans le cadre de
              l’examen médical ;
            </li>
            <li>
              faciliter l’articulation entre les différents acteurs de la
              procédure pour fluidifier l’instruction des données.
            </li>
          </ul>
          <h5>Article 3 – Définitions</h5>
          <div>
            « L’Instructeur » désigne un agent public de la DRIEETS chargé
            d’instruire les demandes d’autorisations de travail pour des mineurs
            de moins de 16 ans déposés par les Demandeurs (définit ci-dessous).
          </div>
          <div>
            « Les Membres d’une commission » désignent les membres d’une
            commission dont la composition est définie à l’article R.7124-20 du
            code du travail.
          </div>
          <div>
            « Le Médecin » désigne la personne en charge de l’examen médical
            réalisé dans les conditions prévues par l’arrêté du 14 avril 2009
            relatif au contenu de l’examen médical préalable à l’emploi d’un
            enfant de moins de 16 ans dans le spectacle, les professions
            ambulantes, la publicité et la mode ; ainsi que les personnes
            agissant pour son compte, à savoir les assistantes médicales chargés
            de prendre rendez-vous avec les enfants.
          </div>
          <div>« L’Enfant » est l’enfant concerné par la demande.</div>
          <div>
            « Le Demandeur », désigne toute personne effectuant, pour le compte
            d’une société de production, une demande d’autorisation de travail
            pour un enfant de moins de 16 ans sur la plateforme.
          </div>
          <div>
            Les « Services » sont les fonctionnalités offertes par la plateforme
            pour répondre à ces besoins.
          </div>
          <h5>Article 4 – Fonctionnalités</h5>
          <h5>Article 4.1. Fonctionnalités ouvertes aux Demandeurs</h5>
          <div>Les Services permettent aux Demandeurs de :</div>
          <ul>
            <li>
              créer un dossier de demande d’autorisation en complétant le
              formulaire ;
            </li>
            <li>
              référencer les informations nécessaires ainsi que les pièces
              justificatives ;
            </li>
            <li>avoir une visibilité sur le suivi de la procédure ;</li>
            <li>recevoir l’avis de la commission ;</li>
            <li>recevoir l’autorisation individuelle de travail.</li>
          </ul>
          <h5>
            Article 4.2. Fonctionnalités ouvertes aux Membres d’une commission
          </h5>
          <div>
            Les Services permettent aux Membres de la commission de consulter
            les pièces justificatives en ligne en amont d’une commission.
          </div>
          <h5>Article 4.3 Fonctionnalités ouvertes aux Médecins</h5>
          <div>Les Services permettent aux Médecins :</div>
          <ul>
            <li>
              identifier les Enfants pour lesquels un examen médical est
              nécessaire ;
            </li>
            <li>
              renseigner si l’examen médical se fera sur pièce, en physique (ou
              téléconsultation), ou sur bon de prise en charge ;
            </li>
            <li>renseigner la date du rendez-vous ;</li>
            <li>déposer l’avis médical ;</li>
            <li>avoir une visibilité sur le suivi de la procédure.</li>
          </ul>
          <h5>Article 5. Responsabilités</h5>
          <h5>Article 5.1. L’éditeur de la plateforme Enfants du spectacle</h5>
          <div>
            Les sources des informations diffusées sur le site sont réputées
            fiables mais le site ne garantit pas qu’il soit exempt de défauts,
            d’erreurs ou d’omissions.
          </div>
          <div>
            {`Tout événement dû à un cas de force majeure ayant pour conséquence
          un dysfonctionnement du site et sous réserve de toute interruption
          ou modification en cas de maintenance, n'engage pas la
          responsabilité d’Enfants du spectacle.`}
          </div>
          <div>
            {`L’éditeur s’autorise à suspendre ou révoquer n'importe quel compte
          et toutes les actions réalisées par ce biais, s’il estime que
          l’usage réalisé du service porte préjudice à son image ou ne
          correspond pas aux exigences de sécurité.`}
          </div>
          <div>
            L’éditeur s’engage à la sécurisation de la plateforme, notamment en
            prenant toutes les mesures nécessaires permettant de garantir la
            sécurité et la confidentialité des informations fournies.
          </div>
          <div>
            L’éditeur fournit les moyens nécessaires et raisonnables pour
            assurer un accès continu, sans contrepartie financière au site. Il
            se réserve la liberté de faire évoluer, de modifier ou de suspendre,
            sans préavis, la plateforme pour des raisons de maintenance ou pour
            tout autre motif jugé nécessaire.
          </div>
          <h5>Article 5.2. Les Demandeurs</h5>
          <div>
            Les Demandeurs s’engagent à ne pas commercialiser les données reçues
            et à ne pas les communiquer à des tiers en dehors des cas prévus par
            la loi.
          </div>
          <div>
            Toute information transmise par lui est de sa seule responsabilité.
            Il est rappelé que toute personne procédant à une fausse déclaration
            pour elle-même ou pour autrui s’expose, notamment, aux sanctions
            prévues à l’article 441-1 du code pénal, prévoyant des peines
            pouvant aller jusqu’à trois ans d’emprisonnement et 45 000 euros
            d’amende.
          </div>
          <div>
            {`Les Demandeurs s'engagent à ne pas mettre en ligne de contenus ou informations contraires aux dispositions légales et réglementaires en vigueur.`}
          </div>
          <h5>Article 5.3. Les Membres d’une commission</h5>
          <div>
            Les Membres d’une commission s’engagent à ne pas commercialiser les
            données reçues et à ne pas les communiquer à des tiers en dehors des
            cas prévus par la loi.
          </div>
          <div>
            Toute information transmise par lui est de sa seule responsabilité.
            Il est rappelé que toute personne procédant à une fausse déclaration
            pour elle-même ou pour autrui s’expose, notamment, aux sanctions
            prévues à l’article 441-1 du code pénal, prévoyant des peines
            pouvant aller jusqu’à trois ans d’emprisonnement et 45 000 euros
            d’amende.
          </div>
          <div>
            Les Membres d’une commission s'engagent à ne pas mettre en ligne de
            contenus ou informations contraires aux dispositions légales et
            réglementaires en vigueur.
          </div>
          <h5>Article 5.4. Les Médecins</h5>
          <div>
            Les Médecins s’engagent à ne pas commercialiser les données reçues
            et à ne pas les communiquer à des tiers en dehors des cas prévus par
            la loi.
          </div>
          <div>
            Toute information transmise par lui est de sa seule responsabilité.
            Il est rappelé que toute personne procédant à une fausse déclaration
            pour elle-même ou pour autrui s’expose, notamment, aux sanctions
            prévues à l’article 441-1 du code pénal, prévoyant des peines
            pouvant aller jusqu’à trois ans d’emprisonnement et 45 000 euros
            d’amende.
          </div>
          <div>
            Les Médecins s'engagent à ne pas mettre en ligne de contenus ou
            informations contraires aux dispositions légales et réglementaires
            en vigueur.
          </div>
          <h5>Article 6. Mise à jour des conditions d’utilisation</h5>
          <div>
            Les termes des CGU doivent être acceptés au moment de la connexion.
            Toute modification des CGU réalisée en fonction des modifications
            apportées au site, de l’évolution de la législation ou pour tout
            autre motif jugé nécessaire, nécessite votre consentement.
          </div>
        </div>
      </div>
    </LayoutHome>
  );
};

export default Conditions;
