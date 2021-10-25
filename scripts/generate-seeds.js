const faker = require("faker")
const jsonToCsv = require("csv-stringify/lib/sync")
const fs = require("fs")

faker.locale = "fr"

enfants = Array.from(Array(2000)).map(() => (
  {
    prenom: faker.name.firstName(),
    nom: faker.name.firstName()
  }
))

agents = Array.from(Array(10)).map(() => {
  const a = {
    prenom: faker.name.firstName(),
    nom: faker.name.firstName(),
  }
  return {
    email: faker.internet.email(a["prenom"], a["dnom"], "drieets.gouv.fr")
  }
})

demandeurs = Array.from(Array(100)).map(() => {
  const d = {
    prenom: faker.name.firstName(),
    nom: faker.name.firstName(),
  }
  d["email"] = faker.internet.email(d["prenom"], d["dnom"])
  return d
})

fs.writeFile("./prisma/seeds/agents.csv", jsonToCsv(agents, { header: true }), (e) => { if (e) throw e; })
fs.writeFile("./prisma/seeds/enfants.csv", jsonToCsv(enfants, { header: true }), (e) => { if (e) throw e; })
fs.writeFile("./prisma/seeds/demandeurs.csv", jsonToCsv(demandeurs, { header: true }), (e) => { if (e) throw e; })
