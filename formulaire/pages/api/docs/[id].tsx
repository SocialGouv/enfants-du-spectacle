import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import formidable from "formidable";
import fs from "fs";
import fsp from "fs/promises";
import * as crypto from "crypto";

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
    await post(req, res);
  } else {
    res.status(405).end();
    return;
  }
};

function getId(req: NextApiRequest): number {
  return Number(req.query.id as string);
}

export const uploadFile = (
  req: NextApiRequest,
  saveLocally?: boolean
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const dossierId = getId(req);
  const options: formidable.Options = {};

  if (saveLocally) {
    options.uploadDir = `/mnt/docs-form/${dossierId}`;
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename?.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };
  }

  const form = formidable(options);

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      console.log("files : ", files);
      try {
        const key = process.env.CIPHER_KEY as string;
        const iv = process.env.CIPHER_IV as string;

        const cipher = crypto.createCipheriv("aes-256-cfb", key, iv);

        //@ts-ignore
        const input = fs.createReadStream(files.justificatif.filepath);
        const output = fs.createWriteStream(
          //@ts-ignore
          files.justificatif.filepath + ".encrypted"
        );

        input
          .pipe(cipher)
          .pipe(output)
          .on("error", (error) => {
            throw error;
          })
          .on("finish", () => {
            //@ts-ignore
            fs.unlinkSync(files.justificatif.filepath);
          });
      } catch (err) {
        console.log(err);
      }
      resolve({ fields, files });
    });
  });
};

const post: NextApiHandler = async (req, res) => {
  const dossierId = getId(req);
  try {
    await fsp.readdir(`/mnt/docs-form/${dossierId}`);
  } catch (error) {
    await fsp.mkdir(`/mnt/docs-form/${dossierId}`);
  }
  const upload = await uploadFile(req, true);
  //@ts-ignore
  res
    .status(200)
    //@ts-ignore
    .json({ filePath: upload.files.justificatif.filepath + ".encrypted" });
};

export default withSentry(handler);
