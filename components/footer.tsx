import {
  Footer as FooterDSE,
  FooterBody,
  FooterPartners,
  FooterPartnersLogo,
  FooterPartnersTitle,
  Logo,
} from "@dataesr/react-dsfr";
import type { ReactElement } from "react";
import React from "react";

import styles from "./Footer.module.css";

export default function Footer(): ReactElement {
  return (
    <FooterDSE className={styles.footer}>
      <FooterBody description="Simplifier la démarche de demande d’autorisation d’emplois d’enfants du spectacle tout en garantissant une plus grande protection des mineurs de moins de 16 ans travaillant dans ce secteur">
        <Logo>Préfet de la région Île-de-France</Logo>
        {/* <FooterBodyItem>
          <a href="https://next-auth.js.org">Documentation</a>
        </FooterBodyItem> */}
      </FooterBody>
      <FooterPartners>
        <FooterPartnersTitle>Partenaires</FooterPartnersTitle>
        <FooterPartnersLogo
          isMain
          href="#"
          imageSrc="/logo-beta-gouv.png"
          imageAlt="beta.gouv.fr"
        />
      </FooterPartners>
    </FooterDSE>
  );
}
