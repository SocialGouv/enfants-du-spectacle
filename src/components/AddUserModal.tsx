import { Select } from "@dataesr/react-dsfr";
import type { User } from "@prisma/client";
import _ from "lodash";
import * as React from "react";
import { MultiSelect } from "react-multi-select-component";
import styles from "src/components/AddUserModal.module.scss";
import {
  ALL_DEPARTEMENTS,
  frenchDepartementName,
  ROLES_USERS,
} from "src/lib/helpers";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Partial<User>) => void;
}

const AddUserModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = React.useState<Partial<User>>({
    nom: "",
    prenom: "",
    email: "",
    role: null,
    departement: "",
    departements: [],
    telephone: "",
    fonction: "",
  });

  const [selected, setSelected] = React.useState<
    Array<{ key: string; label: string; value: string }>
  >([]);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      departements: _.map(selected, "key"),
    }));
  }, [selected]);

  const handleForm = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
    setError("");
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value || null,
    }));
    setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nom) {
      setError("Le nom est obligatoire");
      return;
    }

    if (!formData.prenom) {
      setError("Le prénom est obligatoire");
      return;
    }

    if (!formData.email) {
      setError("L'email est obligatoire");
      return;
    }

    // Validation simple de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Veuillez entrer un email valide");
      return;
    }

    if (!formData.role) {
      setError("Le rôle est obligatoire");
      return;
    }

    onSubmit(formData);

    // Reset form
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      role: null,
      departement: "",
      departements: [],
      telephone: "",
      fonction: "",
    });
    setSelected([]);
    setError("");
    onClose();
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={handleClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2>Ajouter un utilisateur</h2>
          <button className={styles.closeButton} onClick={handleClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formField}>
            <label htmlFor="nom" className="mb-2 italic">
              Nom *
            </label>
            <input
              onChange={handleForm}
              type="text"
              id="nom"
              name="nom"
              value={formData.nom || ""}
              className="inputText"
              required
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="prenom" className="mb-2 italic">
              Prénom *
            </label>
            <input
              onChange={handleForm}
              type="text"
              id="prenom"
              name="prenom"
              value={formData.prenom || ""}
              className="inputText"
              required
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="email" className="mb-2 italic">
              Email *
            </label>
            <input
              onChange={handleForm}
              type="email"
              id="email"
              name="email"
              value={formData.email || ""}
              className="inputText"
              required
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="role" className="mb-2 italic">
              Rôle *
            </label>
            <div className="selectDpt">
              <Select
                id="role"
                name="role"
                selected={formData.role || ""}
                options={[{ label: "Choisir", value: "" }].concat(
                  ROLES_USERS.map((u) => ({
                    label: u.label,
                    value: String(u.value),
                  }))
                )}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleSelectChange(event);
                }}
              />
            </div>
          </div>

          <div className={styles.formField}>
            <label htmlFor="departement" className="mb-2 italic">
              Département(s)
            </label>
            <div className="selectDpt">
              <MultiSelect
                options={ALL_DEPARTEMENTS.map((u) => ({
                  key: u,
                  label: frenchDepartementName(u),
                  value: u,
                }))}
                value={selected}
                hasSelectAll={false}
                onChange={(
                  value: { key: string; label: string; value: string }[]
                ) => {
                  setSelected(value);
                }}
                labelledBy="Département(s)"
              />
            </div>
          </div>

          <div className={styles.formField}>
            <label htmlFor="telephone" className="mb-2 italic">
              Téléphone
            </label>
            <input
              onChange={handleForm}
              type="tel"
              id="telephone"
              name="telephone"
              value={formData.telephone || ""}
              className="inputText"
            />
          </div>

          <div className={styles.formField}>
            <label htmlFor="fonction" className="mb-2 italic">
              Fonction
            </label>
            <input
              onChange={handleForm}
              type="text"
              id="fonction"
              name="fonction"
              value={formData.fonction || ""}
              className="inputText"
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.modalFooter}>
            <button type="submit" className="postButton">
              Ajouter l'utilisateur
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
