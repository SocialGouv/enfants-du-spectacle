import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import styles from "src/components/ConnexionForm.module.scss";

const ConnexionForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const { signinRequired: signinRequiredRaw, error: errorRaw } = router.query;
  const signinRequired = signinRequiredRaw === "true";
  const error = errorRaw as string;

  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <form
          method="post"
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
            signIn("email", {
              callbackUrl: `${process.env.NEXT_PUBLIC_APP_BASE_URL}/dossiers`,
              email,
            }).catch((err) => {
              throw err;
            });
          }}
        >
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
            <button type="submit" className={styles.submitButton}>
              Connexion
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
            {error === "AccessDenied" &&
              "Vous devez utiliser une adresse mail en @drieets.gouv.fr pour vous connecter"}
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
