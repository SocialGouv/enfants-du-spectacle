import { Container, Link } from "@dataesr/react-dsfr";
import { Comments, Dossier } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";
import ShareDossierModal from "src/components/Dossier/ShareDossierModal";
import IconLoader from "src/components/IconLoader";
import { StateProvider } from "src/context/StateContext";
import { getComments } from "src/fetching/commentaires";
import DossierForm from "../../src/components/Dossier/DossierForm";
import HeadingDossier from "../../src/components/Dossier/HeadingDossier";
import Layout from "../../src/components/Layout";
import { getDossier, ResDossier } from "../../src/fetching/dossiers";

const DossierPage: React.FC = () => {
  const router = useRouter();
  const [dossier, setDossier] = React.useState<ResDossier>();
  const [comments, setComments] = React.useState<Comments[]>([]);
  const [loading, setLoading] = React.useState<Boolean>(false);
  const [showDialogue, setShowDialogue] = React.useState<Boolean>(false);
  const [updateCollaboratorList, setUpdateCollaboratorList] = React.useState<
    number[]
  >([]);

  const fetchDossier = async () => {
    if (router.query.id) {
      setLoading(true);
      const res = await getDossier(router.query.id as string);
      setDossier(res);
      const resComments = await getComments(
        parseInt(router.query.id as string)
      );
      setComments(resComments);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchDossier();
  }, [router]);

  return (
    <Layout windowTitle="Mes dossiers">
      {dossier && (
        <>
          <HeadingDossier
            dossier={dossier.dossier}
            setShowDialogue={setShowDialogue}
            updateCollaboratorList={updateCollaboratorList}
          ></HeadingDossier>
          <ShareDossierModal
            dossier={dossier.dossier}
            showDialogue={showDialogue}
            setShowDialogue={setShowDialogue}
            setUpdateCollaboratorList={setUpdateCollaboratorList}
          />
        </>
      )}
      <Container>
        <Link href="/">Retour aux dossiers</Link>
        {dossier && (
          <>
            <StateProvider>
              {!loading && (
                <DossierForm
                  dossier={dossier.dossier}
                  docs={dossier.docs}
                  comments={comments}
                ></DossierForm>
              )}
            </StateProvider>
          </>
        )}
      </Container>
    </Layout>
  );
};

DossierPage.auth = true;

export default DossierPage;
