#!/bin/bash

# Script de scheduler pour appeler l'endpoint d'archivage
# Configuré pour être exécuté dans un CronJob Kubernetes toutes les 12 heures

set -e

# URL cible (peut être surchargée par une variable d'environnement)
TARGET_URL=${TARGET_URL:-"https://example.com/api/scheduler"}

echo "$(date): Début de l'exécution du scheduler d'archivage"
echo "$(date): URL cible: $TARGET_URL"

# Appel de l'endpoint avec curl et capture de la réponse
RESPONSE=$(curl -f -s "$TARGET_URL")
HTTP_CODE=$(curl -f -s -o /dev/null -w "%{http_code}" "$TARGET_URL")

if [ "$HTTP_CODE" = "200" ]; then
    echo "$(date): ✅ Appel réussi - Archivage exécuté avec succès"
    echo "$(date): Réponse: $RESPONSE"
    exit 0
else
    echo "$(date): ❌ Échec de l'appel - Code HTTP: $HTTP_CODE"
    echo "$(date): Réponse: $RESPONSE"
    exit 1
fi
