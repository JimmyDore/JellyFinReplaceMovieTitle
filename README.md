# JellyFilm Titre Modifieur

Une extension Chrome qui remplace aléatoirement des mots dans les titres sur Jellyfin et Google Search.

## Fonctionnalités

### Sur Jellyfin
- Remplace le dernier mot de chaque partie du titre (avant et après les `:`)
- Si le titre se termine par un nombre, ajoute un mot aléatoire à la fin
- Évite les doublons dans les remplacements

### Sur Google Search
- Remplace 2 à 3 mots aléatoires dans :
  - Les titres des résultats de recherche
  - Les descriptions
  - Les sous-titres

## Installation

1. Clonez ce repository ou téléchargez les fichiers
2. Ouvrez Chrome et allez dans `chrome://extensions/`
3. Activez le "Mode développeur" en haut à droite
4. Cliquez sur "Charger l'extension non empaquetée"
5. Sélectionnez le dossier contenant les fichiers de l'extension

## Utilisation

- L'extension fonctionne automatiquement sur Jellyfin et Google Search
- Cliquez sur l'icône de l'extension pour voir les options
- Les modifications sont appliquées à chaque chargement de page

## Sites supportés

- Jellyfin (*.eclipse.usbx.me/*)
- Google Search (*.google.fr/*, *.google.com/*)

## Contribution

N'hésitez pas à contribuer au projet en soumettant des pull requests ou en signalant des bugs.

## Licence

[Votre licence ici]