import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import LayoutHome from "src/components/Layout";

const Home: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const loading = status === "loading";

  useEffect(() => {
    if (!loading && session)
      router.push("/dossiers").catch((e) => {
        throw e;
      });
  }, [session, loading]);

  return (
    <LayoutHome windowTitle="">
      <h2>Mentions légales</h2>
      <h3>Éditeur</h3>
      <p>
        Ce site est édité par la Direction régionale et interdépartementale de
        l’économie, de l’emploi, du travail et des solidarités d’Île-de-France
        (DRIEETS IDF).
        <br />
        19 Rue Madeleine Vionnet,
        <br />
        93300,
        <br />
        Aubervilliers
      </p>
      <h3>Directeur de la publication</h3>
      <p>Monsieur Gaëtan RUDANT, Directeur régional et interdépartemental</p>
      <h3>Hébergement du site</h3>
      <p>
        Ce site est hébergé par <br />
        Microsoft Azure, <br />
        37 Quai du Président Roosevelt <br />
        92130 ISSY-LES-MOULINEAUX
      </p>
      <h3>Accessibilité</h3>
      <p>
        La conformité aux normes d’accessibilité numérique est un objectif
        ultérieur mais nous tâchons de rendre ce site accessible à toutes et à
        tous.
      </p>
      <h3>Signaler un dysfonctionnement</h3>
      <p>
        Si vous rencontrez un défaut d’accessibilité vous empêchant d’accéder à
        un contenu ou une fonctionnalité du site, merci de nous en faire part.{" "}
        <br />
        Si vous n’obtenez pas de réponse rapide de notre part, vous êtes en
        droit de faire parvenir vos doléances ou une demande de saisine au
        Défenseur des droits. <br />
        <br />
        En savoir plus : <br />
        Pour en savoir plus sur la politique d’accessibilité numérique de l’État
        :
        <a href="http://references.modernisation.gouv.fr/accessibilite-numerique">
          http://references.modernisation.gouv.fr/accessibilite-numerique
        </a>
      </p>
      <h3>Sécurité</h3>
      <p>
        Le site est protégé par un certificat électronique, matérialisé pour la
        grande majorité des navigateurs par un cadenas. Cette protection
        participe à la confidentialité des échanges.
        <br />
        En aucun cas les services associés à la plateforme ne seront à l’origine
        d’envoi de courriels pour demander la saisie d’informations
        personnelles.
      </p>
    </LayoutHome>
  );
};

export default Home;
