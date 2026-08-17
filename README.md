Demande de mix - Base pour GitHub Pages

But: fournir une page simple pour que les coachs scannent un QR et soumettent une demande de mix. Les réponses peuvent être envoyées par email via Formspree (ou par fallback mailto si non configuré).

Fichiers créés:
- index.html
- styles.css
- script.js

Images attendues (placer dans assets/images/):
- banner.png  -> image de bannière (utiliser l'image "Designer.png" fournie)
- bg.png      -> image de fond (utiliser l'autre image fournie)
- logo.png    -> (optionnel)

Déploiement sur GitHub Pages (rapide):
1. Créez un nouveau dépôt sur GitHub (ex: `mix-request`).
2. Poussez ces fichiers dans la racine du dépôt (index.html, styles.css, script.js, assets/images/...).
3. Dans les paramètres du dépôt, activez GitHub Pages depuis la branche `main` (ou `gh-pages`) et le dossier `/ (root)`.
4. L'URL sera `https://<votre-utilisateur>.github.io/<repo>/` — remplacer {PAGE_URL} dans index.html si vous voulez un QR fixe.

Configurer l'envoi par email (Formspree) :
1. Aller sur https://formspree.io et créer un formulaire (gratuit pour usages basiques).
2. Formspree fournit un endpoint du type `https://formspree.io/f/<id>`.
3. Remplacer l'attribut action du formulaire dans `index.html` par ce endpoint (remplacer `{your_form_id}`).
4. Tester la soumission : Formspree enverra les entrées à l'email que vous aurez validé dans leur console.

Fallback (si Formspree non configuré) :
- Le formulaire ouvrira le client mail installé avec un email pré-rempli envoyé à `votre-email@example.com`. Remplacer ce placeholder dans `script.js`.

Prochaines étapes (à définir ensemble) :
- Déterminer les questions exactes à demander (si d'autres champs sont nécessaires).
- Automatiser l'envoi via un service (EmailJS, Netlify Forms, ou un petit serverless) si vous préférez ne pas passer par Formspree.
- Générer automatiquement le QR vers l'URL finale du site après déploiement.
- Ajouter validation, confirmation visuelle et sauvegarde des demandes dans Google Sheets via Zapier/Make (optionnel).

Si vous voulez, je peux :
- Personnaliser le formulaire (ajouter/supprimer champs, rendre certains obligatoires).
- Préparer un dépôt GitHub prêt à déployer (si vous me donnez le nom du dépôt et la permission d'accès — sinon fournir les commandes pour le faire).
- Intégrer EmailJS pour envoi direct sans serveur (nécessite création de compte EmailJS pour obtenir IDs).

Dites-moi la prochaine action souhaitée : ajouter/retirer des champs, configurer l'envoi immédiat par Formspree/EmailJS, ou préparation du repo GitHub pour déploiement.