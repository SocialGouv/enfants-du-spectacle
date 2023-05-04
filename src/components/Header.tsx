import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Header as HeaderSDE,
  HeaderBody,
  HeaderOperator,
  Logo,
  NavItem,
  NavSubItem,
  Row,
  Service,
  Tool,
  ToolItem,
  ToolItemGroup,
} from "@dataesr/react-dsfr";
import Image from "next/image";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import type { ReactElement } from "react";
import React from "react";
import { FaHome } from "react-icons/fa";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import styles from "src/components/Header.module.scss";
import logoEds from "src/images/logo.png";

interface BreadcrumbData {
  label: string;
  href?: string;
  icon?: ReactElement;
}

interface Props {
  childrenMiddle?: React.ReactNode;
  childrenBottom?: React.ReactNode;
  breadcrumbs?: BreadcrumbData[];
}

const Header: React.FC<Props> = ({
  childrenMiddle,
  childrenBottom,
  breadcrumbs,
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);

  const calendar_list: { name: string; value: string }[] = [
    {
      name: "Île-de-France (hors 92)",
      value: "calendrier_commission_2023",
    },
    {
      name: "Hauts-de-Seine",
      value: "calendrier_commission_92",
    },
  ];

  return (
    <div>
      <div className={styles.wrapper}>
        <HeaderSDE className={styles.headerSDE}>
          <div>
            <HeaderBody>
              <Logo>Préfet de la région Île-de-France</Logo>
              <HeaderOperator>
                <Image
                  src={logoEds}
                  alt="Enfants du Spectacle"
                  width={629 / 7}
                  height={710 / 7}
                />
              </HeaderOperator>
              <Service title="Enfants du Spectacle" description="" />
              {session && (
                <Tool>
                  <ToolItemGroup>
                    {session.dbUser.role !== "ADMIN" && (
                      <ToolItem>
                        {session.user?.image && (
                          <span
                            style={{
                              backgroundImage: `url(${session.user.image})`,
                            }}
                          />
                        )}
                        <span>
                          <span>Utilisateur </span>
                          <strong>
                            {session.dbUser.prenom || session.dbUser.email}
                          </strong>
                        </span>
                      </ToolItem>
                    )}
                    {session.dbUser.role === "ADMIN" && (
                      <div className={styles.menuUser}>
                        <NavItem
                          title={
                            `Utilisateur ` +
                            `${session.dbUser.prenom || session.dbUser.email}`
                          }
                          className={styles.menuUser}
                        >
                          <NavSubItem
                            title="Commissions"
                            link="/commissions/create"
                          />
                          <NavSubItem
                            title="Utilisateurs"
                            link="/utilisateurs"
                          />
                        </NavItem>
                      </div>
                    )}
                    <ToolItem
                      link="/dossiers"
                      onClick={async () => router.push("/dossiers")}
                    >
                      <FaHome className={styles.icon} />
                    </ToolItem>
                    <ToolItem
                      link="/api/auth/signout"
                      onClick={() => {
                        signOut({
                          callbackUrl:
                            "https://enfants-du-spectacle.fabrique.social.gouv.fr/",
                        }).catch((e) => {
                          console.log(e);
                        });
                      }}
                    >
                      Déconnexion
                    </ToolItem>
                  </ToolItemGroup>
                </Tool>
              )}
            </HeaderBody>
            <div style={{ borderTop: "1px solid #E5E5E5" }} />
            <Container>
              <div className={styles.subNav}>
                <ToolItem link="/">Accueil</ToolItem>
                <ToolItem link="https://formulaire-enfants-du-spectacle.fabrique.social.gouv.fr">
                  Commencer une démarche en ligne
                </ToolItem>
                <div>
                  <ToolItem>
                    <a
                      href={"/"}
                      style={{
                        alignItems: "center",
                        display: "flex",
                      }}
                      onClick={() => {
                        setShowDropdown(!showDropdown);
                      }}
                    >
                      <a href={"/"}>Calendrier des commissions 2023</a>
                      {!showDropdown ? (
                        <TiArrowSortedDown style={{ margin: "4px" }} />
                      ) : (
                        <TiArrowSortedUp style={{ margin: "4px" }} />
                      )}
                    </a>
                  </ToolItem>
                  {showDropdown && (
                    <ul className={styles.calendarDropDown}>
                      {calendar_list.map((calendar, index) => {
                        return (
                          <a
                            href={`./calendar_commission/${calendar.value}.pdf`}
                            key={index}
                            target="blank"
                            onClick={() => {
                              setShowDropdown(false);
                            }}
                          >
                            <li className={styles.calendarItem}>
                              {calendar.name}
                            </li>
                          </a>
                        );
                      })}
                    </ul>
                  )}
                </div>
                <ToolItem link="/faq">FAQ</ToolItem>
              </div>
            </Container>
          </div>
        </HeaderSDE>

        {childrenMiddle && (
          <div className={styles.middle}>
            <Container>
              <Row>{childrenMiddle}</Row>
            </Container>
          </div>
        )}
        {childrenBottom && (
          <div className={styles.bottom}>
            <Container>
              <Row>{childrenBottom}</Row>
            </Container>
          </div>
        )}
      </div>
      {breadcrumbs && (
        <Container>
          <Row>
            <Breadcrumb className={styles.breadcrumbs}>
              {breadcrumbs.map((breadcrumb) => (
                <BreadcrumbItem
                  key={breadcrumb.href}
                  href={breadcrumb.href}
                  className={styles.breadcrumb}
                >
                  {breadcrumb.icon ? breadcrumb.icon : breadcrumb.label}
                </BreadcrumbItem>
              ))}
            </Breadcrumb>
          </Row>
        </Container>
      )}
    </div>
  );
};

export type { BreadcrumbData };
export default Header;
