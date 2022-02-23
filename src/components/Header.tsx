import {
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Header as HeaderSDE,
  HeaderBody,
  HeaderOperator,
  Logo,
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
import styles from "src/components/Header.module.scss";
import logoEds from "src/images/logo.png";
import { getDataDS } from "src/lib/queries";

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

  return (
    <div>
      <div className={styles.wrapper}>
        <HeaderSDE className={styles.headerSDE}>
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
                  <ToolItem
                    onClick={() => {
                      getDataDS();
                    }}
                  >
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
                  <ToolItem
                    link="/dossiers"
                    onClick={async () => router.push("/dossiers")}
                  >
                    <FaHome className={styles.icon} />
                  </ToolItem>
                  <ToolItem link="/api/auth/signout" onClick={signOut}>
                    Déconnexion
                  </ToolItem>
                </ToolItemGroup>
              </Tool>
            )}
          </HeaderBody>
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