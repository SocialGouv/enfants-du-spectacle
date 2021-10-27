import {
  Header as HeaderSDE,
  HeaderBody,
  HeaderOperator,
  Logo,
  Service,
  Tool,
  ToolItem,
  ToolItemGroup,
} from "@dataesr/react-dsfr";
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

import logoEds from "../public/logo.png";
import styles from "./Header.module.scss";

interface Props {
  childrenMiddle?: React.ReactNode;
  childrenBottom?: React.ReactNode;
}

const Header: React.FC<Props> = ({ childrenMiddle, childrenBottom }) => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <HeaderSDE>
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
        <Tool>
          <ToolItemGroup>
            {!session && (
              <ToolItem link="/api/auth/signin" onClick={signIn}>
                Connexion
              </ToolItem>
            )}
            {session && (
              <>
                <ToolItem>
                  {session.user?.image && (
                    <span
                      style={{ backgroundImage: `url(${session.user.image})` }}
                    />
                  )}
                  <span>
                    <span>Connecté en tant que </span>
                    <strong>
                      {session.user?.email?.split("@")?.at(0) ??
                        session.user?.name}
                    </strong>
                  </span>
                </ToolItem>
                <ToolItem
                  link="/commissions"
                  onClick={async () => router.push("/commissions")}
                >
                  Dossiers
                </ToolItem>
                <ToolItem link="/api/auth/signout" onClick={signOut}>
                  Déconnexion
                </ToolItem>
              </>
            )}
          </ToolItemGroup>
        </Tool>
      </HeaderBody>
      {childrenMiddle && (
        <div className={styles.headerMiddle}>{childrenMiddle}</div>
      )}
      {childrenBottom && (
        <div className={styles.headerBottom}>{childrenBottom}</div>
      )}
    </HeaderSDE>
  );
};

export default Header;
