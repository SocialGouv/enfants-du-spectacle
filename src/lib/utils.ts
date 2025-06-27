const generateToken = (pieceId: number, dossierId: number, pieceType: string, pieceLink: string | null, pieceStatus: string | null, createdAt: Date) => {
    // Plus besoin de JWT, on utilise la nouvelle API unifiée avec affichage inline
    return {
        id: pieceId,
        type: pieceType,
        statut: pieceStatus,
        link: `${process.env.URL_SDP}/api/download/pieces/${pieceId}?view=inline`,
        createdAt: createdAt
    }
}

export { generateToken }
