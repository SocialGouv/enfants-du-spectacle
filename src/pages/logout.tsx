import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import React from "react";
import IconLoader from "src/components/IconLoader";
import { ButtonLink } from "src/components/uiComponents/button";

const Logout: React.FC = () => {
  const router = useRouter();
  const [showLoader, setShowLoader] = React.useState<boolean>(false);
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
                setShowLoader(true);
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
                setShowLoader(true);
                void router.push("/dossiers");
              }}
            >
              Non
            </ButtonLink>
          </div>
          {showLoader && <IconLoader />}
        </div>
      </div>
    </div>
  );
};

export default Logout;
