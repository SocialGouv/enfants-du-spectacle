import React from "react";
import LayoutHome from "src/components/Layout";
import styles from "src/components/Politique.module.scss";

const Politic: React.FC = () => {
  return (
    <LayoutHome windowTitle="politique de confidentialité">
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <section>
            <h1>Politique de Confidentialité</h1>
            <h2>Enfants du spectacle</h2> 
          </section>
          <section>
              <h3>Qui est responsable de la plateforme Enfants du spectacle ?</h3>
              <p>La plateforme dénommée « Enfants du spectacle » est portée par la Direction régionale et interdépartementale de l’économie de l’emploi du travail et des solidarités d’Île-de-France (DRIEETS IDF) avec la participation de la Direction du numérique (DNUM) des ministères sociaux.</p>
          </section>
          <section>
              <h3>Pourquoi manipulons-nous ces données ?</h3>
              <p>La plateforme constitue le téléservice visant à dématérialiser la procédure de demandes individuelles de travail pour les mineurs de moins de 16 ans dans le cadre d’un spectacle vivant d’un tournage ou d’un doublage dans les conditions prévues aux articles L 7124-1 et R. 7124-1 du code du travail.</p>
              <p>Enfants du spectacle manipule des données à caractère personnel pour les raisons suivantes :</p>
              <ul>
                  <li>Assurer la transmission des demandes d’autorisation individuelle de travail</li>
                  <li>Centraliser l’ensemble des documents relatifs à ladite procédure</li>
                  <li>Rendre possible l’accès des documents à l’ensemble des acteurs concernés (agent de la DRIEETS médecins demandeurs)</li>
                  <li>Permettre le suivi de la demande</li>
                  <li>Mettre en place un service unique d’instruction des dossiers</li>
              </ul>
          </section>
          <section>
              <h3>Quelles sont les données que nous manipulons ?</h3>
              <p>Enfants du spectacle manipule les données personnelles suivantes :</p>
              <ul>
                  <li>Pour les enfants : nom et prénom, âge, certificat médical (critère discriminant permettant la réalisation du service), leur adresse complète, livret de famille, certificat de scolarité, et avis pédagogique en cas d’absence, autorisation écrite des enfants entre 13 ans et 16 ans, avis médical d’aptitude du médecin du travail, numéro de sécurité sociale</li>
                  <li>Pour les représentants légaux : noms et prénoms, leur adresse complète (identique à celle de l’enfant), autorisation écrite accompagnée de la liste des emplois précédemment ou actuellement occupée, note de situation particulière par rapport à l’autorité parentale (ex : document relatif à une tutelle)</li>
                  <li>Pour les personnes en charge du dépôt de dossier : prénom et nom, fonction, adresse e-mail, téléphone</li>
                  <li>Pour le dossier : contrat de travail, rôle, personnage, jours travaillés, temps et lieu de travail, période de travail, et travail de nuit, rémunération</li>
                  <li>Pour l’instruction de la demande : données relatives aux avis de la commission, données relatives aux autorisations préfectorales</li>
                  <li>Pour les données relatives aux agents de la DRIEETS, les membres de la commission, les médecins : prénom, nom, adresse e-mail</li>
              </ul>
          </section>
          <section>
              <h3>Qu’est-ce qui nous autorise à manipuler ces données ?</h3>
              <p>Enfants du spectacle manipule des données personnelles en se basant sur :</p>
              <ul><li>L’exécution d’une mission d’intérêt public ou relevant de l’exercice de l’autorité publique dont est investi le responsable de traitement au sens de l’article 6-e du RPGD.</li></ul>
              <p>La mission d’intérêt public est fondée sur les articles R. 7124-1 et suivants du Code du travail, en particulier les articles R.7124-3 et 7124-5 du code du travail.</p>
              <p>Le numéro de sécurité sociale est traité sur le fondement de l’article 30 de la loi n°78-17 du 6 janvier 1978 modifiée.</p>
          </section>
          <section>
              <h3>Pendant combien de temps conservons-nous ces données ?</h3>
              <p>La durée de conservation des données est fixée à vingt-quatre mois en base active dans un objectif de protection maximale des données des enfants. A l’issue de ce délai, les données sont archivées et conservées jusqu’à la majorité des enfants.</p>
          </section>
          <section>
              <h3>Droit des personnes concernées</h3>
              <p>Vous disposez :</p>
              <ul>
                  <li>d’un droit d’information et d’un droit d’accès à vos données</li>
                  <li>d’un droit à la limitation au traitement des données</li>
                  <li>d’un droit d’opposition des données</li>
                  <li>d’un droit de rectification et le cas échéant de suppression des données</li>
              </ul>
              <p>Pour les exercer, contactez-nous à : enfantsduspectacle@fabrique.social.gouv.fr</p>
              <p>Puisque ce sont des droits personnels, nous ne traiterons votre demande que si nous sommes en mesure de vous identifier : ainsi, en cas de doute, nous pourrons être amenés à vous demander la communication d’une preuve d’identité.</p>
              <p>Pour vous aider dans votre démarche, vous trouverez ici <a href="https://www.cnil.fr/fr/modele/courrier/exercer-son-droit-dacces">un modèle de courrier élaboré par la CNIL</a>.</p>
              <p>Nous nous engageons à vous répondre dans un délai raisonnable qui ne saurait dépasser 1 mois à compter de la réception de votre demande.</p>
          </section>
          <section>
              <h3>Qui va avoir accès à ces données ?</h3>
              <p>Le responsable de traitement s'engage à ce que les données à caractères personnels soient traitées par les seules personnes autorisées, c’est-à-dire :</p>
              <ul>
                  <li>les agents habilités de la DRIEETS</li>
                  <li>les membres de la commission</li>
                  <li>les médecins et assistantes médicales habilités de la société Thalie</li>
              </ul>
          </section>
          <section>
              <h3>Quelles mesures de sécurité mettons-nous en place ?</h3>
              <p>Nous mettons en place plusieurs mesures pour sécuriser les données :</p>
              <ul>
                  <li>Stockage des données en base de données</li>
                  <li>Stockage des mots de passe en base avec fonctionnalité de hachage</li>
                  <li>Cloisonnement des données</li>
                  <li>Mesures de traçabilité</li>
                  <li>Surveillance</li>
                  <li>Protection contre les virus, malwares et logiciels espions</li>
                  <li>Protection des réseaux</li>
                  <li>Sauvegarde</li>
                  <li>Mesures restrictives limitant l’accès physique aux données à caractère personnel</li>
              </ul>
          </section>
          <section>
              <h3>Qui nous aide à manipuler les données ?</h3>
              <p>Certaines des données sont envoyées à d’autres acteurs appelés “sous-traitants de données” pour qu’ils nous aident à les manipuler. Nous nous assurons qu’ils respectent strictement le RGPD et qu’ils apportent des garanties suffisantes en matière de sécurité.</p>
              <table>
                  <thead>
                      <tr>
                          <th>Partenaire</th>
                          <th>Traitement</th>
                          <th>Pays destinataire</th>
                          <th>Garanties</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>OVH</td>
                          <td>Hébergement</td>
                          <td>France</td>
                          <td><a href="https://doc.demarches-simplifiees.fr/mentions-legales">https://doc.demarches-simplifiees.fr/mentions-legales</a></td>
                      </tr>
                  </tbody>
              </table>
          </section>
          <section>
              <h3>Pourquoi la plateforme Enfants du spectacle utilise des cookies ?</h3>
              <p>La plateforme Enfants du spectacle dépose différents cookies. Certains cookies impliquent un traitement de vos données personnelles au titre de la mission d’intérêt public qui nous incombe. Cela afin de faciliter votre navigation.</p>
              <p>La plateforme Enfants du spectacle utilise des cookies de mesure d’audience anonymisée. Conformément aux dispositions de l’article 5 de la délibération CNIL numéro 2020-091 du 17 septembre 2020, l’usage de ces cookies de mesure d’audience est dispensé du recueil de votre consentement.</p>
          </section>
          <section>
              <h3>Quels sont les cookies déposés sur la plateforme Enfants du spectacle ?</h3>
              <p>Nous vous informons que la plateforme Enfants du spectacle utilise des cookies de mesure d’audience anonymisée par le biais de MATOMO et ce pendant 13 mois. Vous avez la possibilité de vous y opposer. Ces cookies sont limités à la mesure d’audience et n’effectuent pas de suivi global de l’utilisateur. L’objectif de cette mesure d’audience est de produire des statistiques anonymes sans recouper les données.</p>
              <p>Cookies déposés sur la plateforme Enfants du Spectacle : </p>
              <table>
                  <thead>
                      <tr>
                          <th>Éditeur</th>
                          <th>Nom du cookie</th>
                          <th>Durée de vie du cookie</th>
                          <th>Finalités</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>MATOMO</td>
                          <td>_pk_id.85.7734</td>
                          <td>13 mois</td>
                          <td>Mesure d’audience</td>
                      </tr>
                      <tr>
                          <td>MATOMO</td>
                          <td>_pk_ses.85.7734</td>
                          <td>30 minutes</td>
                          <td>Mesure d’audience</td>
                      </tr>
                  </tbody>
              </table>
              <p>Pour mieux comprendre, l’outil MATOMO est un outil de mesure d’audience web libre, hébergé par les services de la Fabrique numérique des ministères sociaux et paramétré pour être en conformité avec la recommandation « Cookies » de la CNIL. Cela signifie donc que votre adresse IP, par exemple, est anonymisée avant d’être enregistrée. Il est impossible pour la plateforme Enfants du spectacle d’associer vos visites sur la plateforme à votre personne.</p>
              <p>Pour aller plus loin, vous avez la possibilité de consulter les fiches proposées par la CNIL grâce aux liens suivants :</p>
              <ul>
                <li><a href="https://www.cnil.fr/fr/cookies-et-traceurs-que-dit-la-loi">Cookies & traceurs : que dit la loi ?</a></li>
                <li><a href="https://www.cnil.fr/fr/les-conseils-de-la-cnil-pour-maitriser-votre-navigateur">Cookies : les outils pour les maîtriser</a></li>
              </ul>
          </section>
        </div>
      </div>
    </LayoutHome>
  );
};

export default Politic;
