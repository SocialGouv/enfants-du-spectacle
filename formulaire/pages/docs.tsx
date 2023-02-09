import { GetServerSideProps } from "next";
import fs from "fs";
import * as crypto from "crypto";

const Docs: React.FC = () => {

  return (
    <></>
  );

};

export const getServerSideProps: GetServerSideProps = async ({query, res}) => {
    const props = { res: {} };
    const key = process.env.CIPHER_KEY as string
    const iv = process.env.CIPHER_IV as string
    try {

      var jwt = require('jsonwebtoken');
      let encrypted = false;
      const token = query.token;
      console.log('token : ', token)

      try {
        var decoded = jwt.verify(token, process.env.SECRET_KEY_DOCS);
        console.log('decoded : ', decoded)

        const mimes = {
            'bmp': 'image/bmp',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'jpe': 'image/jpeg',
            'jpeg':  'image/jpeg',
            'jpg': 'image/jpeg',
            'json':  'application/json',
            'pdf': 'application/pdf',
            'png': 'image/png',
            'svg': 'image/svg+xml',
            'svgz':  'image/svg+xml',
            'txt': 'text/plain',
            'xls' : 'application/vnd.ms-excel'
        };

        const nameFull = decoded.path.substring(decoded.path.lastIndexOf('/') + 1)
        const name = nameFull.replace('.encrypted', '')
        const pathFull = decoded.path
        const path = decoded.path.replace('.encrypted', '')

        if(nameFull !== name) encrypted = true

        let extension: keyof typeof mimes = name.substring(name.lastIndexOf('.') + 1)

        console.log('name : ', name)
        console.log('extension : ', extension)
        console.log('mime : ', mimes[extension])

        const stat = fs.statSync(pathFull);

        const decipher = crypto.createDecipheriv("aes-256-cfb", key, iv);

        res.writeHead(200, {
            "Content-Length": stat.size,
            "Content-Name": name,
            "Content-Type": mimes[extension],
        });

        const input = fs.createReadStream(pathFull);

        if(!encrypted) {
          input.pipe(res);
        } else {
          input
          .pipe(decipher)
          .pipe(res)
        }

      } catch(err) {
        console.log(err)
      }
      return { props };
    } catch (error) {
      return { props };
    }
  };

export default Docs;