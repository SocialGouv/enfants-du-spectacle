import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler } from "next";
import { getSession } from "next-auth/react";
import formidable from "formidable";
import FormData from "form-data";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
};

const handler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).end();
    return;
  }
  if (req.method == "POST") {
    await sendDoc(req, res);
  }
  if (req.method == "DELETE") {
    await deleteDoc(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

const deleteDoc: NextApiHandler = async (req, res) => {
  const docId = req.query.id;
  const url = `${process.env.API_URL_SDP}/inc/docs?id=${docId}&token=${process.env.API_KEY_SDP}`;
  const fetching = await fetch(url, {
    method: "DELETE",
  }).then(async (r) => {
    if (!r.ok) {
      throw Error(`got status ${r.status}`);
    }
    return r.json();
  });
  res.status(200).json(fetching);
};

const sendDoc: NextApiHandler = async (req, res) => {
  const options: formidable.Options = {};

  const data = await new Promise((resolve, reject) => {
    const form = formidable(options);

    form.parse(req, (err, fields, files) => {
      if (err) reject({ err });
      resolve({ err, fields, files });
    });
  });

  console.log("data : ", data);

  try {
    const fileData = new FormData();
    fileData.append(
      "justificatif",
      fs.createReadStream(data.files.justificatif.filepath),
      data.files.justificatif.originalFilename
    );

    console.log("fileData : ", fileData);

    const url = `${process.env.API_URL_SDP}/inc/upload?id=${req.query.dossierId}&api_key=${process.env.API_KEY_SDP}&typeJustif=${req.query.typeJustif}&enfantId=${req.query.enfantId}`;
    const fetching = await fetch(url, {
      body: fileData,
      method: "POST",
    }).then(async (r) => {
      if (!r.ok) {
        res.status(500).json({ error: `Something went wrong : ${r.status}` });
      }
      return r.json();
    });
    console.log("fetching : ", fetching);
    res.status(200).json({ message: "ok" });
  } catch (e) {
    console.log(e);
  }
};

export default withSentry(handler);
