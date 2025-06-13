const generateToken = (pieceId: number, dossierId: number, pieceType: string, pieceLink: string | null, pieceStatus: string | null, createdAt: Date) => {

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
        link: `${process.env.URL_SDP}/docs?token=${tokenSDP}`,
        createdAt: createdAt
    }

}

export { generateToken }