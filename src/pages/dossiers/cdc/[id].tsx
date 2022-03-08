import { Icon, Title } from "@dataesr/react-dsfr";
import { useRouter } from "next/router";
import React from "react";
import { FaHome } from "react-icons/fa";
import CommentairesActionBar from "src/components/CommentairesActionBar";
import EnfantCdc from "src/components/EnfantCdc";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import { useDossier } from "src/lib/api";

const Page: React.FC = () => {
  const router = useRouter();

  const dossierId =
    typeof router.query.id == "string" ? Number(router.query.id) : null;
  const { dossier, ...swrDossier } = useDossier(dossierId);

  const isLoading = swrDossier.isLoading;
  const isError = !isLoading && (swrDossier.isError || !dossierId || !dossier);

  const title = (
    <>
      <Title as="h1">{dossier?.nom ?? <IconLoader />}</Title>
    </>
  );

  return (
    <Layout
      windowTitle={dossier?.nom ?? "Dossier"}
      headerMiddle={title}
      breadcrumbs={[
        { href: "/dossiers", icon: <FaHome />, label: "Dossiers" },
        {
          href: `/dossiers/${String(dossier?.id)}`,
          label: dossier?.nom ?? "Dossier",
        },
        { label: "CdC" },
      ]}
    >
      {isLoading && <IconLoader />}
      <CommentairesActionBar dossierId={dossierId} />
      <div>
        <h5>Pour tous les enfants : </h5>
        <input
          type="text"
          id="cdc"
          name="cdc"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            dossier?.enfants.forEach((enfant) => {
              enfant.cdc = parseInt(event.target.value);
            });
          }}
          value={0}
        />{" "}
        %
      </div>
      {isError && <Icon name="ri-error" />}
      {!isLoading && !isError && dossierId && (
        <div>
          {dossier?.enfants
            .sort(function (a, b) {
              if (a.nom < b.nom) {
                return -1;
              }
              if (a.nom > b.nom) {
                return 1;
              }
              if (a.prenom < b.prenom) {
                return -1;
              }
              if (a.prenom > b.prenom) {
                return 1;
              }
              return 0;
            })
            .map((enfant) => (
              <div key={enfant.id}>
                <EnfantCdc enfant={enfant} />
              </div>
            ))}
        </div>
      )}
    </Layout>
  );
};

Page.auth = true;

export default Page;
