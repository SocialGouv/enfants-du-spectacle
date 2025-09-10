import { Container, Row, Col, Button, Table } from "@dataesr/react-dsfr";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import Head from "next/head";
import Layout from "src/components/Layout";
import type { BreadcrumbData } from "src/components/Header";

interface DocumentPublic {
  id: number;
  nom: string;
  description?: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  categorie: string;
  createdAt: string;
  user: {
    prenom?: string;
    nom?: string;
    email: string;
  };
}

interface Props {}

const CATEGORIES = {
  CALENDRIER_COMMISSION_92: "Calendrier des commissions 92",
  CALENDRIER_COMMISSION_HORS_92: "Calendrier des commissions Hors 92",
  MODELE_AUTORISATION: "Modèle d'autorisation",
  MODELE_DASEN: "Lettre type avis DASEN",
  AVIS_1ER_DEGRE: "Avis pédagogique 1er degré",
  AVIS_2EME_DEGRE: "Avis pédagogique 2ème degré",
  GUIDE_ENFANT_SPECTACLE: "Guide enfant du spectacle",
  CIRCULAIRE: "Circulaire",
};

const DocumentsAdmin: React.FC<Props> = () => {
  const [documents, setDocuments] = useState<DocumentPublic[]>([]);
  const [uploading, setUploading] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState<{
    [key: string]: { nom: string; description: string };
  }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const breadcrumbs: BreadcrumbData[] = [
    { label: "Accueil", href: "/dossiers" },
    { label: "Administration", href: "/admin" },
    { label: "Documents importants" },
  ];

  // Charger les documents côté client
  useEffect(() => {
    const loadDocuments = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/admin/documents");

        if (response.ok) {
          const docs = await response.json();
          setDocuments(docs);
        } else {
          setError("Erreur lors du chargement des documents");
        }
      } catch (error) {
        console.error("Erreur chargement documents:", error);
        setError("Erreur lors du chargement des documents");
      } finally {
        setLoading(false);
      }
    };

    loadDocuments();
  }, []);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    categorie: string
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const currentFormData = formData[categorie];
    if (!currentFormData?.nom) {
      alert("Veuillez saisir un nom pour le document");
      return;
    }

    setUploading((prev) => ({ ...prev, [categorie]: true }));

    const uploadFormData = new FormData();
    uploadFormData.append("file", file);
    uploadFormData.append("nom", currentFormData.nom);
    uploadFormData.append("description", currentFormData.description || "");
    uploadFormData.append("categorie", categorie);

    try {
      const response = await fetch("/api/admin/documents", {
        method: "POST",
        body: uploadFormData,
      });

      if (response.ok) {
        const newDocument = await response.json();

        // Remove existing document for this category and add the new one
        setDocuments((prev) => [
          newDocument,
          ...prev.filter((doc) => doc.categorie !== categorie),
        ]);

        alert("Document uploadé avec succès !");

        // Reset form data for this category
        setFormData((prev) => ({
          ...prev,
          [categorie]: { nom: "", description: "" },
        }));

        // Reset file input
        const input = event.target;
        input.value = "";
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error}`);
      }
    } catch (error) {
      console.error("Erreur upload:", error);
      alert("Erreur lors de l'upload");
    } finally {
      setUploading((prev) => ({ ...prev, [categorie]: false }));
    }
  };

  const updateFormData = (
    categorie: string,
    field: "nom" | "description",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [categorie]: {
        ...prev[categorie],
        [field]: value,
      },
    }));
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce document ?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/documents?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDocuments(documents.filter((doc) => doc.id !== id));
        alert("Document supprimé avec succès");
      } else {
        const error = await response.json();
        alert(`Erreur: ${error.error}`);
      }
    } catch (error) {
      console.error("Erreur suppression:", error);
      alert("Erreur lors de la suppression");
    }
  };

  const getDocumentForCategory = (categoryKey: string) => {
    return documents.find((doc) => doc.categorie === categoryKey);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  if (loading) {
    return (
      <Layout
        breadcrumbs={breadcrumbs}
        windowTitle="Gestion des documents importants"
      >
        <Container>
          <Row>
            <Col n="12">
              <h1>Gestion des documents importants</h1>
              <p>Chargement des documents...</p>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout
        breadcrumbs={breadcrumbs}
        windowTitle="Gestion des documents importants"
      >
        <Container>
          <Row>
            <Col n="12">
              <h1>Gestion des documents importants</h1>
              <div
                style={{
                  backgroundColor: "#ffeaa7",
                  border: "1px solid #fdcb6e",
                  borderRadius: "4px",
                  padding: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <p style={{ margin: 0, color: "#e17055" }}>
                  {error}. Vérifiez votre connexion et réessayez.
                </p>
              </div>
              <Button onClick={() => window.location.reload()}>
                Réessayer
              </Button>
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout
      breadcrumbs={breadcrumbs}
      windowTitle="Gestion des documents importants"
    >
      <Container>
        <Row>
          <Col n="12">
            <h1>Gestion des documents importants</h1>
            <p>
              Ces documents seront accessibles depuis l'application formulaire
              pour les sociétés de production.
            </p>

            <div style={{ marginBottom: "3rem" }}>
              {Object.entries(CATEGORIES).map(
                ([categoryKey, categoryLabel]) => {
                  const existingDocument = getDocumentForCategory(categoryKey);

                  return (
                    <div
                      key={categoryKey}
                      style={{
                        border: "1px solid #ddd",
                        borderRadius: "8px",
                        padding: "1.5rem",
                        marginBottom: "1.5rem",
                        backgroundColor: "#f8f9fa",
                      }}
                    >
                      <h3
                        style={{
                          marginTop: 0,
                          marginBottom: "1rem",
                          color: "#0047AB",
                        }}
                      >
                        {categoryLabel}
                      </h3>

                      {existingDocument && (
                        <div
                          style={{
                            backgroundColor: "#e7f3ff",
                            border: "1px solid #b3d9ff",
                            borderRadius: "4px",
                            padding: "1rem",
                            marginBottom: "1rem",
                          }}
                        >
                          <h4
                            style={{
                              margin: 0,
                              marginBottom: "0.5rem",
                              color: "#0056b3",
                            }}
                          >
                            Document actuel
                          </h4>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                            }}
                          >
                            <div style={{ flex: 1 }}>
                              <p style={{ margin: 0, fontWeight: "bold" }}>
                                {existingDocument.nom}
                              </p>
                              {existingDocument.description && (
                                <p
                                  style={{
                                    margin: "0.25rem 0",
                                    fontSize: "0.9em",
                                    color: "#666",
                                  }}
                                >
                                  {existingDocument.description}
                                </p>
                              )}
                              <p
                                style={{
                                  margin: "0.25rem 0",
                                  fontSize: "0.85em",
                                  color: "#888",
                                }}
                              >
                                Fichier: {existingDocument.originalName} (
                                {formatFileSize(existingDocument.size)})
                              </p>
                              <p
                                style={{
                                  margin: "0.25rem 0",
                                  fontSize: "0.85em",
                                  color: "#888",
                                }}
                              >
                                Uploadé le{" "}
                                {new Date(
                                  existingDocument.createdAt
                                ).toLocaleDateString("fr-FR")}{" "}
                                par{" "}
                                {existingDocument.user.prenom ||
                                existingDocument.user.nom
                                  ? `${existingDocument.user.prenom || ""} ${
                                      existingDocument.user.nom || ""
                                    }`
                                  : existingDocument.user.email}
                              </p>
                            </div>
                            <Button
                              size="small"
                              onClick={() => handleDelete(existingDocument.id)}
                              style={{
                                backgroundColor: "#dc3545",
                                borderColor: "#dc3545",
                                marginLeft: "1rem",
                              }}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      )}

                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "1rem",
                        }}
                      >
                        <div>
                          <label
                            htmlFor={`nom-${categoryKey}`}
                            style={{
                              display: "block",
                              marginBottom: "0.5rem",
                              fontWeight: "bold",
                            }}
                          >
                            {existingDocument
                              ? "Remplacer par un nouveau document"
                              : "Nom du document *"}
                          </label>
                          <input
                            id={`nom-${categoryKey}`}
                            type="text"
                            value={formData[categoryKey]?.nom || ""}
                            onChange={(e) =>
                              updateFormData(categoryKey, "nom", e.target.value)
                            }
                            placeholder="Nom à afficher pour ce document"
                            style={{
                              width: "100%",
                              padding: "0.5rem",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              fontSize: "1rem",
                            }}
                          />
                        </div>

                        <div>
                          <label
                            htmlFor={`description-${categoryKey}`}
                            style={{
                              display: "block",
                              marginBottom: "0.5rem",
                              fontWeight: "bold",
                            }}
                          >
                            Description (optionnelle)
                          </label>
                          <textarea
                            id={`description-${categoryKey}`}
                            value={formData[categoryKey]?.description || ""}
                            onChange={(e) =>
                              updateFormData(
                                categoryKey,
                                "description",
                                e.target.value
                              )
                            }
                            placeholder="Description du document"
                            rows={2}
                            style={{
                              width: "100%",
                              padding: "0.5rem",
                              border: "1px solid #ccc",
                              borderRadius: "4px",
                              fontSize: "1rem",
                              resize: "vertical",
                            }}
                          />
                        </div>

                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                          }}
                        >
                          <input
                            type="file"
                            accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                            onChange={(e) => handleFileUpload(e, categoryKey)}
                            disabled={uploading[categoryKey]}
                            style={{ flex: 1 }}
                          />
                          {uploading[categoryKey] && (
                            <span
                              style={{ color: "#0047AB", fontWeight: "bold" }}
                            >
                              Upload en cours...
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session?.dbUser || session.dbUser.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // Plus d'appel côté serveur - le chargement se fait côté client
  return {
    props: {},
  };
};

export default DocumentsAdmin;
