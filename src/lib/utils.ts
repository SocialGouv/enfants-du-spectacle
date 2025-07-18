const generateToken = (pieceId: number, dossierId: number, pieceType: string, pieceLink: string | null, pieceStatus: string | null, createdAt: Date) => {
    // Utilisation de l'endpoint local sécurisé
    return {
        id: pieceId,
        type: pieceType,
        statut: pieceStatus,
        link: `/api/download/pieces/${pieceId}?view=inline`,
        createdAt: createdAt
    }
}

export { generateToken }
