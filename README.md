# Attention

## Si le CSS ne marche pas rempalcer tout le css de meteo-TLR.css par celui de meteo-TLR-silautremarchepas.css
## Si le token de l'API ne marche pas utiliser :
```
bc60193a0ca43b08b77bcfc9d7d01e71
```


---


# meteo-TLR 🌦️

**meteo-TLR** est un plugin WordPress qui affiche des informations météorologiques en fonction de la localisation de l'utilisateur. Il utilise l'API OpenWeather pour les données météorologiques et Leaflet.js pour afficher une carte interactive.

---

## 📋 Table des matières

1. [À propos](#-à-propos)
2. [Fonctionnalités](#-fonctionnalités)
3. [Installation](#-installation)
4. [Utilisation](#-utilisation)
5. [Technologies utilisées](#-technologies-utilisées)
6. [Contributeurs](#️-contributeurs)
7. [Licence](#-licence)
8. [Contact](#-contact)

---

## 🌟 À propos

Ce plugin a été développé par **Tom Monty**, **Loann Duval** et **Ryan Sellier**.

**meteo-TLR** offre une interface intuitive et moderne permettant d'afficher :
- Une carte interactive montrant la position actuelle de l'utilisateur.
- Les données météorologiques, notamment la température actuelle, maximale et minimale.
- Un bouton permettant de revenir facilement à la localisation initiale.

---

## ✨ Fonctionnalités

- **Carte interactive** : Utilisation de Leaflet.js pour afficher une carte basée sur OpenStreetMap.
- **Météo en temps réel** : Requêtes dynamiques à l'API OpenWeather pour afficher des données précises.
- **Détection automatique** : Géolocalisation de l'utilisateur pour récupérer sa position.
- **Responsive Design** : Compatible avec les écrans desktop et mobiles.
- **Design moderne** : Bordures en gradient, transitions fluides, et affichage intuitif.

---

## ⚙️ Installation

### Prérequis

- **WordPress** version 5.0 ou supérieure
- **PHP** version 7.2 ou supérieure
- **Clé API OpenWeather valide**

### Étapes

1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/TomMonty/meteo-TLR.git
   ```

2. **Coller le token de votre clé API OpenWeather dans les deux endroits situé dans meteo-TLR :**

   Les emplacements sont indiqués par un ligne : ----------------------------------------------------------------

3. **Placer le plugin dans le dossier WordPress :**

   Copiez le dossier **meteo-TLR** dans le répertoire suivant :
   ```
   /wp-content/plugins/
   ```

4. **Activer le plugin :**

   - Connectez-vous à votre tableau de bord WordPress.
   - Allez dans l'onglet **Extensions** et activez **meteo-TLR**.

---

## 🚀 Utilisation

### Ajouter le shortcode

Ajoutez le shortcode suivant à n'importe quelle page ou article WordPress :
```shortcode
[meteo_tlr]
```

Une fois ajouté, le plugin affichera automatiquement la carte et les données météo.

---

## 🛠️ Technologies utilisées

- **WordPress** : Système de gestion de contenu utilisé comme plateforme principale.
- **Leaflet.js** : Librairie JavaScript pour la carte interactive.
- **OpenWeather API** : Fournisseur des données météorologiques.
- **HTML/CSS/JavaScript** : Conception et interactivité.
- **PHP** : Langage backend pour l'intégration dans WordPress.

---

## 🧑‍💻 Contributeurs

- **Tom Monty** : Développeur principal, intégration API et géolocalisation.
- **Loann Duval** : Design, animations et intégration Leaflet.js.
- **Ryan Sellier** : Optimisation des performances et structure dynamique.

---

## 📜 Licence

Ce projet est sous licence MIT. Consultez le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 📧 Contact

Pour toute question ou suggestion, vous pouvez nous contacter via GitHub :
- **Tom Monty**
- **Loann Duval**
- **Ryan Sellier**

Lien du dépôt GitHub : [meteo-TLR](https://github.com/<votre-utilisateur>/meteo-TLR)



## Projet CMS HETIC H2 :

[HETIC ( Hautes Études des Technologies de l'Information et de la Communication )](https://www.hetic.net/)


## Screenshot ( Exemple de fonctionnement ) :

![Image sans interactions](https://github.com/user-attachments/assets/16ba09e7-ae45-41e4-a810-750ff4c55dfa)

![Image avec interactions](https://github.com/user-attachments/assets/19f418e5-41de-4b58-b67a-15cca02d982e)

