import { Icon, Title } from "@dataesr/react-dsfr";
import type { Enfant } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import CommentairesActionBar from "src/components/CommentairesActionBar";
import EnfantCdc from "src/components/EnfantCdc";
import styles from "src/components/EnfantCdc.module.scss";
import IconLoader from "src/components/IconLoader";
import Layout from "src/components/Layout";
import { useDossier } from "src/lib/api";
import { updateDossier, updateEnfant, updateEnfants } from "src/lib/queries";
import { useSWRConfig } from "swr";

const Page: React.FC = () => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const dossierId =
    typeof router.query.id == "string" ? Number(router.query.id) : null;
  const { dossier, ...swrDossier } = useDossier(dossierId);
  const [formData, setFormData] = React.useState<Record<string, string>>({
    cdc: "0",
  });
  const [changes, setChanges] = React.useState<boolean>(false);

  useState(() => {
    setFormData({ cdc: dossier?.cdc ? dossier.cdc.toString() : "0" });
  });

  const isLoading = swrDossier.isLoading;
  const isError = !isLoading && (swrDossier.isError || !dossierId || !dossier);

  const title = (
    <>
      <Title as="h1">{dossier?.nom ?? <IconLoader />}</Title>
    </>
  );

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setFormData({
      cdc: value,
    });
    setChanges(true);
  };

  const saveEnfant = (e: React.FormEvent, data: Enfant): void => {
    e.preventDefault();
    data.cdc = parseInt(data.cdc ? data.cdc.toString() : "0");
    updateEnfant(data);
  };

  const saveGlobalCdc = (event: React.FormEvent) => {
    event.preventDefault();
    const cdc = parseInt(formData.cdc ? formData.cdc.toString() : "0");
    if (dossier?.id) updateEnfants(cdc, dossier.id);
    mutate(
      `/api/dossiers/${dossier?.id}`,
      { ...dossier, cdc: cdc },
      false
    ).catch((e) => {
      throw e;
    });
    updateDossier(dossier, { cdc }, () => {
      mutate(`/api/dossiers/${dossier?.id}`).catch((e) => {
        throw e;
      });
    });
    setChanges(false);
    router.reload();
  };

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
      <CommentairesActionBar dossierId={dossierId ?? 0} />
      <div>
        <h5 className={styles.largeTitle}>Pour tous les enfants : </h5>
        <form
          className={styles.formWrapper}
          onSubmit={(e) => {
            e.currentTarget.value = "";
            saveGlobalCdc(e);
          }}
        >
          <div className={styles.inputContainer}>
            <input
              type="text"
              id="cdc"
              name="cdc"
              onClick={() => {
                const input = document.getElementById("cdc");
                input.focus();
                input.select();
              }}
              className={styles.inputText}
              onChange={handleForm}
              value={formData.cdc ? formData.cdc : 0}
            />{" "}
            %
          </div>
          <button
            className={`${styles.postButton} ${styles.postGeneral}`}
            disabled={changes ? false : true}
          >
            Mettre à jour
          </button>
        </form>
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
                <EnfantCdc enfant={enfant} saveEnfant={saveEnfant} />
              </div>
            ))}
        </div>
      )}
    </Layout>
  );
};

Page.auth = true;

export default Page;
