import { GetServerSideProps } from "next";
import { Container, Row, Col, Button } from "@dataesr/react-dsfr";
import { useState } from "react";
import Head from "next/head";
import Layout from "../src/components/Layout";

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
}

interface Props {
  documents: DocumentPublic[];
}

const CATEGORIES = {
  CALENDRIER_COMMISSION_92: "Calendrier des commissions 92",
  CALENDRIER_COMMISSION_HORS_92: "Calendrier des commissions Hors 92",
  MODELE_AUTORISATION: "Modèle d'autorisation",
  MODELE_DASEN: "Modèle DASEN",
  GUIDE_ENFANT_SPECTACLE: "Guide enfant du spectacle",
  CIRCULAIRE: "Circulaire",
};

const DocumentsPublics: React.FC<Props> = ({ documents }) => {
  const [downloading, setDownloading] = useState<{[key: number]: boolean}>({});

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDownload = async (documentId: number, fileName: string) => {
    setDownloading(prev => ({ ...prev, [documentId]: true }));
    
    try {
      const response = await fetch(`/api/documents-publics/${documentId}/download`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      } else {
        alert("Erreur lors du téléchargement du document");
      }
    } catch (error) {
      console.error("Erreur téléchargement:", error);
      alert("Erreur lors du téléchargement");
    } finally {
      setDownloading(prev => ({ ...prev, [documentId]: false }));
    }
  };

  const getDocumentsByCategory = () => {
    const documentsByCategory: {[key: string]: DocumentPublic[]} = {};
    
    // Initialiser toutes les catégories
    Object.keys(CATEGORIES).forEach(category => {
      documentsByCategory[category] = [];
    });
    
    // Regrouper les documents par catégorie
    documents.forEach(doc => {
      if (documentsByCategory[doc.categorie]) {
        documentsByCategory[doc.categorie].push(doc);
      }
    });
    
    return documentsByCategory;
  };

  const documentsByCategory = getDocumentsByCategory();

  return (
    <>
      <Head>
        <title>Documents importants - Enfants du spectacle</title>
      </Head>
      <Layout windowTitle="Documents importants">
        <Container>
          <Row>
            <Col n="12">
              <h1 style={{marginTop: "2rem"}}>Documents importants</h1>
              <p>
                Retrouvez ici les documents officiels utiles pour vos démarches 
                relatives aux enfants du spectacle.
              </p>

              <div style={{ marginBottom: "3rem" }}>
                {Object.entries(CATEGORIES).map(([categoryKey, categoryLabel]) => {
                  const categoryDocuments = documentsByCategory[categoryKey] || [];
                  
                  return (
                    <div key={categoryKey} style={{ marginBottom: "2rem" }}>
                      <h2 style={{ 
                        color: "#0047AB", 
                        borderBottom: "2px solid #0047AB", 
                        paddingBottom: "0.5rem",
                        marginBottom: "1rem"
                      }}>
                        {categoryLabel}
                      </h2>
                      
                      {categoryDocuments.length === 0 ? (
                        <div style={{ 
                          padding: "2rem", 
                          backgroundColor: "#f8f9fa", 
                          border: "1px dashed #dee2e6",
                          borderRadius: "8px",
                          textAlign: "center",
                          color: "#6c757d"
                        }}>
                          Aucun document disponible dans cette catégorie
                        </div>
                      ) : (
                        <div style={{ display: "grid", gap: "1rem" }}>
                          {categoryDocuments.map((document) => (
                            <div 
                              key={document.id} 
                              style={{ 
                                padding: "1.5rem",
                                border: "1px solid #dee2e6",
                                borderRadius: "8px",
                                backgroundColor: "#fff",
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)"
                              }}
                            >
                              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                <div style={{ flex: 1 }}>
                                  <h3 style={{ 
                                    marginBottom: "0.5rem", 
                                    marginTop: 0,
                                    color: "#0056b3",
                                    fontSize: "1.25rem",
                                    fontWeight: "bold"
                                  }}>
                                    {document.nom}
                                  </h3>
                                  {document.description && (
                                    <p style={{ 
                                      marginBottom: "1rem", 
                                      marginTop: 0,
                                      color: "#6c757d"
                                    }}>
                                      {document.description}
                                    </p>
                                  )}
                                  <div style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                                    <div>Fichier: {document.originalName}</div>
                                    <div>Taille: {formatFileSize(document.size)}</div>
                                    <div>
                                      Mis à jour le {new Date(document.createdAt).toLocaleDateString("fr-FR")}
                                    </div>
                                  </div>
                                </div>
                                <div style={{ marginLeft: "1rem" }}>
                                  <Button
                                    onClick={() => handleDownload(document.id, document.originalName)}
                                    disabled={downloading[document.id]}
                                  >
                                    {downloading[document.id] ? "Téléchargement..." : "Télécharger"}
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
        </Container>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const response = await fetch(
      `${process.env.NEXTAUTH_URL || "http://localhost:3001"}/api/documents-publics`,
      {
        headers: {
          cookie: req.headers.cookie || "",
        },
      }
    );

    const documents = response.ok ? await response.json() : [];

    return {
      props: {
        documents,
      },
    };
  } catch (error) {
    console.error("Erreur lors du chargement des documents:", error);
    return {
      props: {
        documents: [],
      },
    };
  }
};

export default DocumentsPublics;
