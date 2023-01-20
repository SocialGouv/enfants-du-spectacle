import { withSentry } from "@sentry/nextjs";
import type { NextApiHandler, NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import formidable from 'formidable'
import fs from 'fs/promises'

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

const uploadFile = (req: NextApiRequest, saveLocally?: boolean):Promise<{fields: formidable.Fields; files: formidable.Files}> => {
  const dossierId = getId(req)
  const options: formidable.Options = {};
  if(saveLocally){
    options.uploadDir = `/mnt/docs`;
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename;
    }
  }

  const form = formidable(options)
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if(err) reject(err)
      resolve({fields, files})
    })
  })
}

const post: NextApiHandler = async (req, res) => {
    const dossierId = getId(req)
    console.log('dossier id : ', dossierId)
    const upload = await uploadFile(req, true)
    console.log('upload', upload)
    res.status(200).json({filePath: upload.files.justificatif.filepath})
};

export default withSentry(handler);