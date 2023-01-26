import { GetServerSideProps } from "next";
import fs from "fs";

const Docs: React.FC = () => {

  return (
    <></>
  );
};

export const getServerSideProps: GetServerSideProps = async ({query, res}) => {
    const props = { res: {} };
    try {

      var jwt = require('jsonwebtoken');
      const token = query.token;
      console.log('token : ', token)

      try {
        var decoded = jwt.verify(token, process.env.SECRET_KEY_DOCS);

        const mimes = {
            'bmp':           'image/bmp',
            'jpe':           'image/jpeg',
            'jpeg':          'image/jpeg',
            'jpg':           'image/jpeg',
            'json':          'application/json',
            'pdf':           'application/pdf',
            'png':           'image/png',
            'svg':           'image/svg+xml',
            'svgz':          'image/svg+xml',
            'txt':           'text/plain',
        };

        const name = decoded.path.substring(decoded.path.lastIndexOf('/') + 1)
        const extension: keyof typeof mimes = decoded.path.substring(decoded.path.lastIndexOf('.') + 1)

        console.log('name : ', name)
        console.log('extension : ', extension)
        console.log('mime : ', mimes[extension])

        const filePath = decoded.path;
        const stat = fs.statSync(filePath);

        res.writeHead(200, {
            "Content-Length": stat.size,
            "Content-Name": name,
            "Content-Type": mimes[extension],
        });

        const downloadStream = fs.createReadStream(filePath, {});

        await new Promise(function (resolve) {
            downloadStream.pipe(res);
            downloadStream.on("end", resolve);
        });

      } catch(err) {
        console.log(err)
      }
      return { props };
    } catch (error) {
      return { props };
    }
  };

export default Docs;