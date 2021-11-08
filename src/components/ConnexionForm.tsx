import React from "react";
import styles from "src/components/ConnexionForm.module.scss";

interface Props {
  csrfToken: string | undefined;
  signinRequired: boolean;
}

const Layout: React.FC<Props> = ({ csrfToken, signinRequired }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.formWrapper}>
        <form method="post" action="/api/auth/signin/email">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <input
            name="callbackUrl"
            type="hidden"
            defaultValue={`http://localhost:3000/dossiers`}
          />
          <label>
            <div>Adresse Email:</div>
            <div>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="jean.marc@drieets.gouv.fr"
                className={styles.emailInput}
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
      {signinRequired && (
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

export default Layout;
