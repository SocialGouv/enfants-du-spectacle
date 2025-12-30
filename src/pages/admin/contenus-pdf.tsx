import React, { useState, useEffect } from "react";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import {
  Button,
  Container,
  Row,
  Col,
  Title,
} from "@dataesr/react-dsfr";
import Layout from "src/components/Layout";

// Type pour les sections PDF
type SectionPdf =
  | "TEXTES_LEGAUX"
  | "CONSIDERANTS"
  | "ARTICLE_2"
  | "ARTICLE_3"
  | "ARTICLE_4"
  | "SIGNATURE"
  | "RECOURS";

interface ContenuPdf {
  id: string;
  departement: string;
  section: SectionPdf;
  titre: string;
  contenu: string;
  dateModification: string;
  utilisateurModifier?: {
    prenom?: string;
    nom?: string;
    email: string;
  };
}

const DEPARTEMENTS = [
  { value: "75", label: "Paris (75)" },
  { value: "77", label: "Seine-et-Marne (77)" },
  { value: "78", label: "Yvelines (78)" },
  { value: "91", label: "Essonne (91)" },
  { value: "92", label: "Hauts-de-Seine (92)" },
  { value: "93", label: "Seine-Saint-Denis (93)" },
  { value: "94", label: "Val-de-Marne (94)" },
  { value: "95", label: "Val-d'Oise (95)" },
];

const SECTIONS = [
  { value: "TEXTES_LEGAUX", label: "Textes légaux" },
  { value: "CONSIDERANTS", label: "Considérants" },
  { value: "ARTICLE_2", label: "Article 2" },
  { value: "ARTICLE_3", label: "Article 3" },
  { value: "ARTICLE_4", label: "Article 4" },
  { value: "SIGNATURE", label: "Signature" },
  { value: "RECOURS", label: "Voies et délais de recours" },
];

const ContenusPdfPage: React.FC = () => {
  const [departementSelectionne, setDepartementSelectionne] = useState("75");
  const [sectionActive, setSectionActive] = useState<SectionPdf>(
    "TEXTES_LEGAUX"
  );
  const [contenus, setContenus] = useState<ContenuPdf[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [formData, setFormData] = useState<{
    [key in SectionPdf]?: { titre: string; contenu: string };
  }>({});

  // Chargement initial des contenus
  useEffect(() => {
    if (departementSelectionne) {
      chargerContenus();
    }
  }, [departementSelectionne]);

  const chargerContenus = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/admin/contenus-pdf?departement=${departementSelectionne}`
      );
      const data = await response.json();

      if (response.ok) {
        setContenus(data);
        // Initialiser le formulaire avec les données existantes
        const newFormData: {
          [key in SectionPdf]?: { titre: string; contenu: string };
        } = {};
        data.forEach((contenu: ContenuPdf) => {
          newFormData[contenu.section] = {
            titre: contenu.titre,
            contenu: contenu.contenu,
          };
        });
        setFormData(newFormData);
      } else {
        setMessage({
          type: "error",
          text: data.error || "Erreur lors du chargement",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "Erreur lors du chargement des contenus",
      });
    } finally {
      setLoading(false);
    }
  };

  const sauvegarderContenu = async () => {
    const contenuActuel = formData[sectionActive];

    if (!contenuActuel?.titre || !contenuActuel?.contenu) {
      setMessage({ type: "error", text: "Le titre et le contenu sont requis" });
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/admin/contenus-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          departement: departementSelectionne,
          section: sectionActive,
          titre: contenuActuel.titre,
          contenu: contenuActuel.contenu,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "Contenu sauvegardé avec succès" });
        await chargerContenus(); // Recharger pour avoir les dernières données
      } else {
        setMessage({
          type: "error",
          text: data.error || "Erreur lors de la sauvegarde",
        });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Erreur lors de la sauvegarde" });
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (
    section: SectionPdf,
    field: "titre" | "contenu",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const contenuActuel = contenus.find((c) => c.section === sectionActive);
  const formDataActuel = formData[sectionActive] || { titre: "", contenu: "" };

  return (
    <Layout windowTitle="Gestion des contenus PDF">
      <Container>
        <Row>
          <Col>
            <Title as="h1">Gestion des contenus PDF</Title>
            <p>Modifiez les contenus des décisions d'autorisation par département.</p>

            {message && (
              <div style={{ 
                padding: "12px", 
                marginBottom: "16px", 
                borderRadius: "4px",
                backgroundColor: message.type === "success" ? "#d4edda" : "#f8d7da",
                color: message.type === "success" ? "#155724" : "#721c24",
                border: `1px solid ${message.type === "success" ? "#c3e6cb" : "#f5c6cb"}`
              }}>
                {message.text}
                <button 
                  onClick={() => setMessage(null)}
                  style={{ float: "right", background: "none", border: "none", fontSize: "16px", cursor: "pointer" }}
                >
                  ×
                </button>
              </div>
            )}

            {/* Sélecteur de département */}
            <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
              <Row>
                <Col>
                  <label htmlFor="departement-select" style={{ fontWeight: "bold", marginBottom: "8px", display: "block" }}>
                    Département
                  </label>
                  <select 
                    id="departement-select"
                    value={departementSelectionne}
                    onChange={(e) => setDepartementSelectionne(e.target.value)}
                    style={{ 
                      width: "300px", 
                      padding: "8px", 
                      border: "1px solid #ddd", 
                      borderRadius: "4px",
                      fontSize: "16px"
                    }}
                  >
                    {DEPARTEMENTS.map((dept) => (
                      <option key={dept.value} value={dept.value}>
                        {dept.label}
                      </option>
                    ))}
                  </select>
                </Col>
              </Row>
            </div>

            {/* Navigation par onglets */}
            <div style={{ borderBottom: "2px solid #e9ecef", marginBottom: "20px" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {SECTIONS.map((section) => (
                  <button
                    key={section.value}
                    onClick={() => setSectionActive(section.value as SectionPdf)}
                    style={{
                      padding: "12px 20px",
                      border: "none",
                      borderRadius: "8px 8px 0 0",
                      background: sectionActive === section.value ? "#0078f3" : "#f8f9fa",
                      color: sectionActive === section.value ? "white" : "#495057",
                      cursor: "pointer",
                      fontWeight: sectionActive === section.value ? "bold" : "normal",
                      fontSize: "14px"
                    }}
                  >
                    {section.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contenu de la section active */}
            <div style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
              <Row>
                <Col>
                  <label htmlFor="titre-input" style={{ fontWeight: "bold", marginBottom: "8px", display: "block" }}>
                    Titre de la section
                  </label>
                  <input
                    id="titre-input"
                    type="text"
                    value={formDataActuel.titre}
                    onChange={(e) => updateFormData(sectionActive, "titre", e.target.value)}
                    placeholder={`Titre pour ${SECTIONS.find(s => s.value === sectionActive)?.label}`}
                    style={{
                      width: "100%",
                      padding: "8px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "16px",
                      marginBottom: "16px"
                    }}
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <label htmlFor="contenu-textarea" style={{ fontWeight: "bold", marginBottom: "8px", display: "block" }}>
                    Contenu
                  </label>
                  <textarea
                    id="contenu-textarea"
                    value={formDataActuel.contenu}
                    onChange={(e) => updateFormData(sectionActive, "contenu", e.target.value)}
                    style={{
                      minHeight: "300px",
                      width: "100%",
                      padding: "12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontFamily: "monospace",
                      marginBottom: "16px"
                    }}
                    placeholder={`Contenu pour ${SECTIONS.find(s => s.value === sectionActive)?.label}`}
                  />
                </Col>
              </Row>

              {contenuActuel && (
                <Row>
                  <Col>
                    <p style={{ fontSize: "0.875rem", color: "#666", marginBottom: "16px" }}>
                      Dernière modification : {new Date(contenuActuel.dateModification).toLocaleString("fr-FR")}
                      {contenuActuel.utilisateurModifier && (
                        <> par {contenuActuel.utilisateurModifier.prenom || contenuActuel.utilisateurModifier.email}</>
                      )}
                    </p>
                  </Col>
                </Row>
              )}

              <Row>
                <Col>
                  <Button
                    onClick={sauvegarderContenu}
                    disabled={loading}
                  >
                    {loading ? "Sauvegarde..." : "Sauvegarder"}
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session || session.dbUser.role !== "ADMIN") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default ContenusPdfPage;
