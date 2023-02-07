
const generateToken = (pieceId: number, dossierId: number, pieceType: string, pieceLink: string | null, pieceStatus: string | null) => {

    var jwt = require('jsonwebtoken');

    let payload = {
        iat: new Date().getTime() / 1000,
        id: pieceId,
        dossierId: dossierId,
        path: pieceLink,
    }

    let tokenSDP = jwt.sign({...payload}, process.env.SECRET_KEY_DOCS, { expiresIn: 60 * 30 });

    return {
        id: pieceId,
        type: pieceType,
        statut: pieceStatus,
        link: `${process.env.NEXTAUTH_URL}/docs?token=${tokenSDP}`
    }

}

export { generateToken }