#!/bin/bash

# Script de scheduler pour appeler l'endpoint healthz
# Configuré pour être exécuté dans un CronJob Kubernetes

set -e

# URL cible (peut être surchargée par une variable d'environnement)
TARGET_URL=${TARGET_URL:-"https://example.com/api/healthz"}

echo "$(date): Début de l'exécution du scheduler"
echo "$(date): URL cible: $TARGET_URL"

# Appel de l'endpoint avec curl
if curl -f -s -o /dev/null -w "%{http_code}" "$TARGET_URL" | grep -q "200"; then
    echo "$(date): ✅ Appel réussi - Endpoint healthz répond correctement"
    exit 0
else
    echo "$(date): ❌ Échec de l'appel - Endpoint healthz ne répond pas correctement"
    exit 1
fi
