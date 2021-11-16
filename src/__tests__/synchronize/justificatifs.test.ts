import {
  getJustificatifsDossier,
  getJustificatifsEnfant,
} from "src/synchronize/justificatifs";

test("getJustificatifsDossier works", () => {
  const justificatifs = getJustificatifsDossier({
    date_de_commencement_du_projet: {
      id: "Q2hhbXAtMjAyNzcxMA==",
      label: "Date de commencement du projet",
      stringValue: "02 mai 2022",
    },
    date_de_fin_du_projet: {
      id: "Q2hhbXAtMjAyNzcxMQ==",
      label: "Date de fin du projet",
      stringValue: "22 mai 2022",
    },
    elements_d_information_complementaires: {
      file: null,
      id: "Q2hhbXAtMjExODY5OA==",
      label: "Eléments d'information complémentaires ",
      stringValue: "",
    },
    note_precisant_les_mesures_de_securite: {
      file: {
        byteSize: 288467,
        checksum: "3x6zOPp5YkKQdjfO/Jxtew==",
        contentType: "image/png",
        filename: "Screenshot 2021-12-01 at 10.11.17.png",
        url: "https://static.demarches-simplifiees.fr:443/v1/AUTH_db3cbfc79c914f87b192ff7c6bb176f0/ds_activestorage_backup/20y9fa3scpgx2rr3vj21ipqi40tp?temp_url_sig=5f093238158d7a745c811010322ea55817c40163&temp_url_expires=1638380066&filename=Screenshot%202021-12-01%20at%2010.11.17.png&inline",
      },
      id: "Q2hhbXAtMjAyNzcwNw==",
      label: "Note précisant les mesures de sécurité",
      stringValue: "",
    },
    plan_de_travail: {
      file: null,
      id: "Q2hhbXAtMjAyNzcwOQ==",
      label: "Plan de travail",
      stringValue: "",
    },
    scenario: {
      file: {
        byteSize: 125373,
        checksum: "+c4dkbGxZdgXYjfA/X9hpQ==",
        contentType: "image/png",
        filename: "Screenshot 2021-12-01 at 12.11.40.png",
        url: "https://static.demarches-simplifiees.fr:443/v1/AUTH_db3cbfc79c914f87b192ff7c6bb176f0/ds_activestorage_backup/upyxnoh652yckodte6g9m3s88rsa?temp_url_sig=464bbf61031352fd09fb5295e6d0e794094161a2&temp_url_expires=1638380066&filename=Screenshot%202021-12-01%20at%2012.11.40.png&inline",
      },
      id: "Q2hhbXAtMjAyNzcwOA==",
      label: "Scenario",
      stringValue: "",
    },
    synopsis: {
      file: null,
      id: "Q2hhbXAtMjAyNzcwNg==",
      label: "Synopsis",
      stringValue: "",
    },
  });
  expect(justificatifs).toEqual(["MESURES_SECURITE", "SCENARIO"]);
});

test("getJustificatifsEnfant works", () => {
  const justificatifs = getJustificatifsEnfant({
    autorisation_parentale: {
      file: {
        byteSize: 31457,
        checksum: "oHBQlQ3tA7qt5QpLVGATHg==",
        contentType: "image/png",
        filename: "Screenshot 2021-12-01 at 10.05.47.png",
        url: "https://static.demarches-simplifiees.fr:443/v1/AUTH_db3cbfc79c914f87b192ff7c6bb176f0/ds_activestorage_backup/ecphbhye72u0j7w09gzkjutem19e?temp_url_sig=55e8e4d7c2b0099c1319a0fcb99fb2c847037ef8&temp_url_expires=1638380066&filename=Screenshot%202021-12-01%20at%2010.05.47.png&inline",
      },
      id: "Q2hhbXAtMjExODYxNw==",
      label: "Autorisation parentale",
      stringValue: "",
    },
    avis_medical_d_aptitude: {
      file: {
        byteSize: 540022,
        checksum: "pdCckoowVAWdjJ/X4znHyA==",
        contentType: "image/png",
        filename: "Screenshot 2021-12-01 at 11.29.46.png",
        url: "https://static.demarches-simplifiees.fr:443/v1/AUTH_db3cbfc79c914f87b192ff7c6bb176f0/ds_activestorage_backup/n2nlg92t8gvpm0n4ytehwfaw9imz?temp_url_sig=e30784d1fb493eb59c3b436c7e7d89dc73b605a3&temp_url_expires=1638380066&filename=Screenshot%202021-12-01%20at%2011.29.46.png&inline",
      },
      id: "Q2hhbXAtMjExODY1OQ==",
      label: "Avis médical d'aptitude",
      stringValue: "",
    },
    certificat_de_scolarite_ou_et_avis_pedagogique: {
      file: {
        byteSize: 125373,
        checksum: "+c4dkbGxZdgXYjfA/X9hpQ==",
        contentType: "image/png",
        filename: "Screenshot 2021-12-01 at 12.11.40.png",
        url: "https://static.demarches-simplifiees.fr:443/v1/AUTH_db3cbfc79c914f87b192ff7c6bb176f0/ds_activestorage_backup/ncylnbtk5vhbwpkh1xl04wsirc09?temp_url_sig=b635dd29b5467671f3554330e399747343d15ba0&temp_url_expires=1638380066&filename=Screenshot%202021-12-01%20at%2012.11.40.png&inline",
      },
      id: "Q2hhbXAtMjExODY1NA==",
      label: "Certificat de scolarité ou/et avis pédagogique",
      stringValue: "",
    },
    livret_de_famille: {
      file: {
        byteSize: 125373,
        checksum: "+c4dkbGxZdgXYjfA/X9hpQ==",
        contentType: "image/png",
        filename: "Screenshot 2021-12-01 at 12.11.40.png",
        url: "https://static.demarches-simplifiees.fr:443/v1/AUTH_db3cbfc79c914f87b192ff7c6bb176f0/ds_activestorage_backup/fksiwz88dsvfhh5uf55qlst9rlgr?temp_url_sig=2c889a2d7805df5aa8e26597711e0472375b3e5b&temp_url_expires=1638380066&filename=Screenshot%202021-12-01%20at%2012.11.40.png&inline",
      },
      id: "Q2hhbXAtMjExODYxNg==",
      label: "Livret de famille",
      stringValue: "",
    },
    projet_de_contrat_de_travail: {
      file: {
        byteSize: 540022,
        checksum: "pdCckoowVAWdjJ/X4znHyA==",
        contentType: "image/png",
        filename: "Screenshot 2021-12-01 at 11.29.46.png",
        url: "https://static.demarches-simplifiees.fr:443/v1/AUTH_db3cbfc79c914f87b192ff7c6bb176f0/ds_activestorage_backup/k0bynvawebc7gwamb8y9kvj5m3qi?temp_url_sig=8181aede59c780ca2ffe9b42e864b805f902c893&temp_url_expires=1638380066&filename=Screenshot%202021-12-01%20at%2011.29.46.png&inline",
      },
      id: "Q2hhbXAtMjExODY1Mg==",
      label: "Projet de contrat de travail",
      stringValue: "",
    },
    remuneration_totale: {
      id: "Q2hhbXAtMjExODYxNQ==",
      label: "Rémunération totale",
      stringValue: "800",
    },
    situations_particulieres_relatives_a_l_autorite_parentale: {
      file: null,
      id: "Q2hhbXAtMjExODYxOA==",
      label: "Situations particulières relatives à l'autorité parentale",
      stringValue: "",
    },
  });
  expect(justificatifs).toEqual([
    "AUTORISATION_PARENTALE",
    "AVIS_MEDICAL",
    "CERTIFICAT_SCOLARITE",
    "LIVRET_FAMILLE",
    "CONTRAT",
  ]);
});
