import { Accordion, AccordionItem, Container } from "@dataesr/react-dsfr";
import * as React from "react";
import styles from "src/components/home/Questions.module.scss";

const Questions: React.FC = () => {
  return (
    <section className={styles.questionsSection}>
      <Container>
        <h2>Toutes nos réponses à vos questions</h2>
        <div className={styles.questionsGrid}>
          <div className={styles.rowLeft}>
            <Accordion className={styles.accordion}>
              <AccordionItem title="Qui doit faire la demande ?">
                <p>
                  Toute personne :
                  <ul>
                    <li>
                      souhaitant engager ou produire un enfant âgé de moins de
                      16 ans
                      <ul>
                        <li>
                          pour un spectacle ou une production, dans une
                          entreprise de cinéma, de radio, de télévision ou
                          d&apos;enregistrement sonore,
                        </li>
                        <li>
                          ou dans une entreprise ou association ayant pour objet
                          la participation à des compétitions de jeux vidéo
                        </li>
                      </ul>
                    </li>
                    <li>
                      et dont le siège social de la société est situé en
                      Ile-de-France
                    </li>
                  </ul>
                </p>
              </AccordionItem>
            </Accordion>
            <Accordion className={styles.accordion}>
              <AccordionItem title="Quelles sont les pièces que je dois réunir ?">
                <p>
                  <ul>
                    <li>synopsis</li>
                    <li>
                      scenario ou script (sur lequel les séquences où
                      interviennent les enfants seront clairement identifiées)
                    </li>
                    <li>
                      note précisant les mesures de sécurité (document
                      présentant de manière précise et détaillée la façon dont
                      seront réalisées les scènes susceptibles d&apos;exposer
                      les enfants à un ou plusieurs risques, ainsi que les
                      mesures prises pour les éviter)
                    </li>
                    <li>plan de travail</li>
                  </ul>
                  <br />
                  <b>Pour chaque enfant concerné :</b>
                  <ul>
                    <li>livret de famille à jour</li>
                    <li>projet de contrat de travail</li>
                    <li>
                      certificat de scolarité ou avis pédagogique (à partir de 4
                      jours d’absence scolaire). Pour les dossiers relevant de
                      la commission de Paris, si l’enfant est scolarisé en
                      dehors de l’académie de Paris, l’avis pédagogique doit
                      être accompagné de l’avis du Directeur académique concerné
                    </li>
                    <li>
                      avis médical d’aptitude d&apos;un médecin du travail de
                      Thalie Santé (ex-CMB) ou, a minima, un document justifiant
                      d&apos;une prise de rdv. Pour les figurants et les
                      silhouettes, un avis d&apos;un médecin généraliste (enfant
                      à partir de 3 ans) ou d&apos;un pédiatre (enfant de moins
                      de 3 ans) est accepté
                    </li>
                    <li>autorisation parentale</li>
                    <li>
                      dans le cas d&apos;une situation particulière relative à
                      l&apos;exercice de l&apos;autorité parentale (retrait
                      d&apos;autorité parentale, tutelle, etc.), tout document
                      justifiant de cette situation
                    </li>
                  </ul>
                </p>
              </AccordionItem>
            </Accordion>
            <Accordion className={styles.accordion}>
              <AccordionItem title="Quelles sont les pièces que je dois fournir pour déposer mon dossier ?">
                <p>
                  <ul>
                    <li>
                      scenario ou script (sur lequel les séquences où
                      interviennent les enfants seront clairement identifiées)
                    </li>
                    <li>
                      note précisant les mesures de sécurité (document
                      présentant de manière précise et détaillée la façon dont
                      seront réalisées les scènes susceptibles d&apos;exposer
                      les enfants à un ou plusieurs risques, ainsi que les
                      mesures prises pour les éviter)
                    </li>
                  </ul>
                  <br />
                  <b>Pour chaque enfant concerné :</b>
                  <ul>
                    <li>livret de famille à jour</li>
                    <li>projet de contrat de travail</li>
                    <li>autorisation parentale</li>
                  </ul>
                </p>
              </AccordionItem>
            </Accordion>
            <Accordion className={styles.accordion}>
              <AccordionItem title="Quelles sont les pièces que je dois fournir pour compléter mon dossier ?">
                <p>
                  <ul>
                    <li>synopsis</li>
                    <li>plan de travail</li>
                  </ul>
                  <br />
                  <b>Pour chaque enfant concerné :</b>
                  <ul>
                    <li>
                      certificat de scolarité ou avis pédagogique (à partir de 4
                      jours d’absence scolaire). Si l’enfant est scolarisé en
                      dehors de l’académie de Paris, l’avis pédagogique doit
                      être accompagné de l’avis du Directeur académique concerné
                    </li>
                    <li>
                      avis médical d’aptitude d&apos;un médecin du travail de
                      Thalie Santé (ex-CMB) ou, a minima, un document justifiant
                      d&apos;une prise de rdv. Pour les figurants et les
                      silhouettes, un avis d&apos;un médecin généraliste (enfant
                      à partir de 3 ans) ou d&apos;un pédiatre (enfant de moins
                      de 3 ans) est accepté
                    </li>
                    <li>
                      dans le cas d&apos;une situation particulière relative à
                      l&apos;exercice de l&apos;autorité parentale (retrait
                      d&apos;autorité parentale, tutelle, etc.), tout document
                      justifiant de cette situation
                    </li>
                  </ul>
                </p>
              </AccordionItem>
            </Accordion>
            <Accordion className={styles.accordion}>
              <AccordionItem title="Les pièces doivent-elles répondre à un formalisme particulier ?">
                <p>
                  <ul>
                    <li>
                      <p>
                        <span>
                          L’autorisation parentale doit être remplie à partir du
                          modèle suivant:{" "}
                        </span>
                        <br />
                        <br />
                        <a href="autorisation_parentale.docx" download>
                          Autorisation parentale
                        </a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>
                          Pour les dossiers relevant de la commission de Paris,
                          l’avis pédagogique et, le cas échéant, l’avis du
                          Directeur académique doivent être remplis à partir des
                          modèles suivants:
                        </span>
                        <br />
                        <br />
                        <a href="avis_pedagogique_1D.pdf" download>
                          Avis pédagogique 1er degré
                        </a>
                        <br />
                        <a href="avis_pedagogique_2D.pdf" download>
                          Avis pédagogique 2nd degré
                        </a>
                        <br />
                        <a href="avis_DASEN.docx" download>
                          Avis directeur académique
                        </a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <span>
                          Pour les dossiers relevant des autres commissions
                          départementales, l’avis pédagogique doit être rempli à
                          partir de l’un des modèles suivants:
                        </span>
                        <br />
                        <br />
                        <a
                          href="avis_chef_etablissement_1er_degre.doc"
                          download
                        >
                          Avis chef d&apos;établissement 1er degré
                        </a>
                        <br />
                        <a
                          href="avis_inspecteur_academique_2nd_degre.doc"
                          download
                        >
                          Avis inspecteur académique 2nd degré
                        </a>
                      </p>
                    </li>
                  </ul>
                  <br />
                  Toutes les autres pièces ne sont soumises à aucun formalisme
                  particulier.
                </p>
              </AccordionItem>
            </Accordion>
          </div>
          <div className={styles.rowRight}>
            <Accordion className={styles.accordion}>
              <AccordionItem title="Que dois-je faire si je ne suis pas concerné par certaines pièces ?">
                <p>
                  Si dans mon secteur d’activité artistique, il n’est pas
                  d’usage d’établir un scenario ou script, je dépose un fichier
                  mentionnant que je ne suis pas concerné
                </p>
                <p>
                  Si dans mon secteur d’activité artistique, il n’est pas
                  d’usage d’établir un synopsis, je ne dépose pas de fichier
                </p>
                <p>
                  Si dans mon secteur d’activité artistique, il n’est pas
                  d’usage d’établir un plan de travail, je ne dépose pas de
                  fichier
                </p>
                <p>
                  Si je n’ai identifié aucun risque pour le(s) enfant(s) dans
                  les conditions envisagées de réalisation du projet, je dépose
                  un fichier mentionnant qu’il n’existe aucun risque pour le(s)
                  enfant(s)
                </p>
              </AccordionItem>
            </Accordion>
            <Accordion className={styles.accordion}>
              <AccordionItem title="Quelle est la durée quotidienne du travail à respecter ?">
                <p>La durée quotidienne de travail ne peut excéder :</p>
                <p>
                  Pour les enfants de moins de 3 ans: 1h/jour avec pause
                  obligatoire après 30 minutes de temps de travail.
                </p>
                <p>
                  Pour les enfants de 3 à 5 ans: 2h/jour avec pause obligatoire
                  après 1h00 de temps de travail.
                </p>
                <p>
                  Pour les enfants de 6 à 11 ans :
                  <br />
                  En période scolaire : 3h/jour avec pause obligatoire après
                  1h30 de temps de travail ; En période de vacances scolaires :
                  4h/jour avec pause obligatoire après 2h00 de temps de travail;
                </p>
                <p>
                  Pour les enfants de 12 à 16 ans:
                  <br />
                  En période scolaire: 4h/jour avec pause obligatoire après 2h00
                  de temps de travail En période de vacances scolaires: 6h/jour
                  avec pause obligatoire après 3h00 de temps de travail.
                </p>
              </AccordionItem>
            </Accordion>
            <Accordion className={styles.accordion}>
              <AccordionItem title="Dois-je préciser si les dates et heures de travail prévues sont sur le temps scolaire ?">
                <p>
                  Oui, l’indication de la période (temps scolaire ou vacances
                  scolaires) peut être effectuée dans le champ «Temps et lieu de
                  travail» du formulaire
                </p>
              </AccordionItem>
            </Accordion>
            <Accordion className={styles.accordion}>
              <AccordionItem title="Que dois-je faire si l'enfant est amené à manquer l'école plus de trois jours ?">
                <p>
                  <span>
                    Concernant les dossiers relevant de la commission de Paris:
                  </span>
                  <ul>
                    <li>
                      <p>
                        Pour les enfants de primaire de plus de 3 ans: un avis
                        pédagogique rempli et signé par le directeur d’école et
                        validé par l’inspecteur de l’éducation nationale de
                        circonscription doit être déposé.
                        <br />
                        Si l’enfant est scolarisé en dehors de l’académie de
                        Paris, l’avis du Directeur académique des services de
                        l’éducation nationale (DASEN) de l’académie concernée
                        doit accompagner l’avis pédagogique.
                        <br />
                        <br />
                        <a href="avis_pedagogique_1D.pdf" download>
                          Avis pédagogique 1er degré
                        </a>
                        <br />
                        <a href="avis_DASEN.docx" download>
                          Avis directeur académique
                        </a>
                      </p>
                    </li>
                    <li>
                      <p>
                        Pour les collégiens et les lycéens de moins de 16 ans:
                        un avis pédagogique rempli et signé par le chef
                        d’établissement doit être déposé.
                        <br />
                        Si l’enfant est scolarisé en dehors de l’académie de
                        Paris, l’avis du Directeur académique des services de
                        l’éducation nationale (DASEN) de l’académie concernée
                        doit accompagner l’avis pédagogique.
                        <br />
                        <br />
                        <a href="avis_pedagogique_2D.pdf" download>
                          Avis pédagogique 2nd degré
                        </a>
                        <br />
                        <a href="avis_DASEN.docx" download>
                          Avis directeur académique
                        </a>
                      </p>
                    </li>
                  </ul>
                  <br />
                  <span>
                    Concernant les dossiers relevant des autres commissions
                    départementales:
                  </span>
                  <ul>
                    <li>
                      <p>
                        Pour les enfants de primaire de plus de 3 ans: un avis
                        pédagogique rempli et signé par le directeur d’école
                        doit être déposé.
                        <br />
                        <br />
                        <a
                          href="avis_chef_etablissement_1er_degre.doc"
                          download
                        >
                          Avis chef d&apos;établissement 1er degré
                        </a>
                      </p>
                    </li>
                    <li>
                      <p>
                        Pour les collégiens et les lycéens de moins de 16 ans:
                        un avis pédagogique rempli et signé par l’inspecteur
                        académique doit être déposé.
                        <br />
                        <br />
                        <a
                          href="avis_inspecteur_academique_2nd_degre.doc"
                          download
                        >
                          Avis inspecteur académique 2nd degré
                        </a>
                      </p>
                    </li>
                  </ul>
                </p>
              </AccordionItem>
            </Accordion>
            <Accordion className={styles.accordion}>
              <AccordionItem title="Comment indiquer les cachets supplémentaires éventuels ?">
                <p>
                  En cas de cachets supplémentaires éventuels, je les mentionne
                  dans le champ «rémunérations additionnelles» en précisant,
                  pour chacun d’eux, leur nombre, leur nature et leur montant.
                </p>
                <p>Exemple: 2 cachets de post-synchronisation à 408 euros</p>
                <p>
                  Le champ «rémunération totale» correspondra à la somme de
                  l’ensemble des cachets, de base et supplémentaires.
                </p>
              </AccordionItem>
            </Accordion>
            <Accordion className={styles.accordion}>
              <AccordionItem title="Y a-til d'autres démarches à réaliser ?">
                <p>
                  Un exemplaire papier du scenario ou script doit également être
                  envoyé par voie postale à l’adresse suivante:
                </p>
                <p>
                  DRIEETS IDF – Unité départementale de Paris
                  <br />
                  Mission protection de l’enfance – service ESAM
                  <br />
                  35 rue de la Gare – CS 60003
                  <br />
                  75144 PARIS CEDEX 19
                </p>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <div className={styles.mailtoRow}>
          <a
            className="whiteButton"
            href="mailto:enfantsduspectacle@fabrique.social.gouv.fr?subject=Contact depuis la plateforme Enfants du spectacle"
          >
            Vous ne trouvez pas votre question ?
          </a>
        </div>
      </Container>
    </section>
  );
};

export default Questions;
