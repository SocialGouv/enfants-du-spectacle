import {
  Footer as FooterDSE,
  FooterBody,
  FooterBottom,
  FooterLink,
  Logo,
} from "@dataesr/react-dsfr";
import type { ReactElement } from "react";
import React from "react";
import styles from "../components/ConnexionForm.module.scss";

export default function Footer(): ReactElement {
  return (
    <FooterDSE className={styles.footer}>
      <FooterBody description="Simplifier la démarche de demande d’autorisation d’emplois d’enfants du spectacle tout en garantissant une plus grande protection des mineurs de moins de 16 ans travaillant dans ce secteur">
        <Logo>Préfet de la région Île-de-France</Logo>
      </FooterBody>
      <div className={styles.contactText}>
        En cas de problème avec la plateforme, merci d’envoyer un email à{" "}
        <span>
          {" "}
          <a
            href="mailto:enfantsduspectacle@fabrique.social.gouv.fr"
            style={{ marginLeft: "4px" }}
          >
            enfantsduspectacle@fabrique.social.gouv.fr
          </a>
        </span>
      </div>
      <FooterBottom>
        <FooterLink href="/mentions">Mentions légales</FooterLink>
        <FooterLink href="/conditions-generales">
          Conditions générales d'utilisation
        </FooterLink>
        <FooterLink href="/politique">Politique de confidentialité</FooterLink>
        <FooterLink href="https://metabase-eds.fabrique.social.gouv.fr/public/dashboard/70ae0640-d606-419a-83c9-fe6b0069049d">
          Statistique
        </FooterLink>
        <FooterLink href="#">Accessibilité : non conforme</FooterLink>
      </FooterBottom>
    </FooterDSE>
  );
}
