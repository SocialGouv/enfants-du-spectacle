import React from "react";
import LayoutHome from "src/components/Layout";

const Home: React.FC = () => {
  return (
    <LayoutHome windowTitle="Mentions légales">
      <h2>Mentions légales</h2>
      <h3>Éditeur</h3>
      <p>
        La plateforme "Enfants du spectacle" est éditée par la{" "}
        Direction régionale et interdépartementale de l’économie, de l’emploi,
        du travail et des solidarités d’Île-de-France (DRIEETS IDF), située : 
        <br />
        19 Rue Madeleine Vionnet
        <br />
        93300 AUBERVILLIERS
        <br />
        France
      </p>
      <h3>Directeur de la publication</h3>
      <p>Monsieur Gaëtan RUDANT, Directeur régional et interdépartemental</p>
      <h3>Hébergement du site</h3>
      <p>
        OVH SAS <br />
        2 rue Kellermann <br />
        59100 Roubaix <br />
        France
      </p>
      <h3>Accessibilité</h3>
      <p>
        La conformité aux normes d’accessibilité numérique est un objectif
        ultérieur mais nous tâchons de rendre ce site accessible à toutes et à
        tous.
      </p>
      <h3>En savoir plus</h3>
      <p>
        Pour en savoir plus sur la politique d'accessibilité numérique de l'État {" "}
        <a href="https://accessibilite.numerique.gouv.fr/">
          https://accessibilite.numerique.gouv.fr/
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
