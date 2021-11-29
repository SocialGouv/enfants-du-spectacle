import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import type { FormEventHandler } from "react";
import React, { useState } from "react";
import styles from "src/components/ConnexionForm.module.scss";
import IconLoader from "src/components/IconLoader";

const ERROR_MESSAGES = {
  AccessDenied:
    "Vous devez utiliser une adresse mail en @drieets.gouv.fr pour vous connecter",
  Verification:
    "Le lien de connexion est invalide. Il a peut-être déjà été utilisé ou bien a expiré. Veuillez ré-essayer avec un nouveau lien.",
  default: "Erreur lors de la connexion",
};
type ErrorName = keyof typeof ERROR_MESSAGES;

const ConnexionForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { signinRequired: signinRequiredRaw, error: errorRaw } = router.query;
  const signinRequired = signinRequiredRaw === "true";
  const error = errorRaw as string;

  const submitSigninForm: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    setLoading(true);
    signIn("email", {
      callbackUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/dossiers`,
      email,
    }).catch((err) => {
      setLoading(false);
      window.alert("Une erreur est survenue lors de votre connexion");
      throw err;
    });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <form method="post" action="#" onSubmit={submitSigninForm}>
          <label>
            <div>Adresse Email:</div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="jean.marc@drieets.gouv.fr"
                className={styles.emailInput}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
          </label>
          <div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={loading}
            >
              Connexion
              {loading && <IconLoader className={styles.iconLoader} />}
            </button>
          </div>
        </form>
      </div>
      {error && (
        <div className={styles.requiredWrapper}>
          <span role="img" aria-label="avertissement">
            ❌
          </span>
          <span>
            {Object.keys(ERROR_MESSAGES).includes(error)
              ? ERROR_MESSAGES[error as ErrorName]
              : ERROR_MESSAGES.default}
          </span>
        </div>
      )}
      {!error && signinRequired && (
        <div className={styles.requiredWrapper}>
          <span role="img" aria-label="avertissement">
            ⚠️
          </span>
          <span>Veuillez vous connecter</span>
        </div>
      )}
    </div>
  );
};

export default ConnexionForm;
