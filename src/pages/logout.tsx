import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import React from "react";
import { ButtonLink } from "src/components/uiComponents/button";

const Logout: React.FC = () => {
  const router = useRouter();
  return (
    <div>
      <div className="modalOverlay" />
      <div className="modalWrapper">
        <div className="title">Déconnexion</div>
        <div className="modalContent">
          <div>Voulez vous vraiment vous déconnecter ?</div>
          <div className="btnList">
            <ButtonLink
              onClick={() => {
                signOut({
                  callbackUrl:
                    "https://enfants-du-spectacle.fabrique.social.gouv.fr/",
                }).catch((e) => {
                  console.log(e);
                });
              }}
            >
              Oui
            </ButtonLink>
            <ButtonLink
              light={true}
              onClick={() => {
                void router.push("/dossiers");
              }}
            >
              Non
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logout;
