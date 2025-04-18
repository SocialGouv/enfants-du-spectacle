import {
  Footer as FooterDSE,
  FooterBody,
  FooterBottom,
  FooterBodyItem,
  FooterLink,
  Link,
  Logo,
} from "@dataesr/react-dsfr";
import type { ReactElement } from "react";
import React from "react";
import styles from "../components/ConnexionForm.module.scss";

export default function Footer(): ReactElement {
  return (
    <FooterDSE className={styles.footer}>
      <FooterBody description="Simplifier la démarche de demande d’autorisation d’emplois d’enfants du spectacle tout en garantissant une plus grande protection des mineurs de moins de 16 ans travaillant dans ce secteur">
        <Logo>MINISTÈRE DU TRAVAIL ET DE L'EMPLOI</Logo>
        <FooterBodyItem>
            <Link href="https://info.gouv.fr" target="_blank">
              info.gouv.fr
            </Link>
          </FooterBodyItem>
          <FooterBodyItem>
            <Link href="https://service-public.fr" target="_blank">
              service-public.fr
            </Link>
          </FooterBodyItem>
          <FooterBodyItem>
            <Link href="https://legifrance.gouv.fr" target="_blank">
              legifrance.gouv.fr
            </Link>
          </FooterBodyItem>
          <FooterBodyItem>
            <Link href="https://data.gouv.fr" target="_blank">
              data.gouv.fr
            </Link>
          </FooterBodyItem>
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
        <FooterLink href="https://metabase-enfants-du-spectacle.fabrique.social.gouv.fr/public/dashboard/70ae0640-d606-419a-83c9-fe6b0069049d">
          Statistique
        </FooterLink>
        <FooterLink href="/accessibilite">
          Accessibilité : non conforme
        </FooterLink>
      </FooterBottom>
    </FooterDSE>
  );
}
