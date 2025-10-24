# Tavli

Tavli est une application web de jeu (backgammon / jeu de tables) construite avec **HTML, CSS et JavaScript**.  
Ce dépôt contient le frontend (UI) ainsi que la logique du jeu côté client.

---

## 🤖 Origine du projet

L’intégralité de ce projet a été **générée par des modèles de langage (LLM)**, dans une démarche exploratoire visant à démontrer la capacité des intelligences artificielles à produire un jeu complet et fonctionnel, depuis la conception jusqu’à la mise en œuvre.

Le projet Tavli illustre :
- la génération de code client léger (HTML / CSS / JS) sans framework,
- la création d’interfaces interactives,
- la mise en place d’une logique de jeu complexe basée sur des règles traditionnelles.

---

## 🎯 Objectif

Proposer une expérience de jeu de Tavli / backgammon dans le navigateur, avec :

- une interface utilisateur (plateau, déplacements, dés, captures, etc.)
- la logique de jeu conforme aux règles classiques
- un socle technique simple, accessible et entièrement généré par IA

---

## 📦 Structure du projet

```
/
├── index.html
├── app.js
├── styles.css
├── service-worker.js
├── manifest.webmanifest
└── icons/               # icônes pour PWA / favicon
```

- `index.html` : point d’entrée du jeu  
- `app.js` : code JavaScript de la logique et de l’interaction  
- `styles.css` : styles visuels  
- `service-worker.js` + `manifest.webmanifest` : pour transformer l’application en PWA  
- `icons/` : icônes pour différentes résolutions

---

## 🚀 Installation et exécution locale

1. Clone le dépôt :
   ```bash
   git clone https://github.com/gmoulard/Tavli.git
   cd Tavli
   ```

2. Ouvre `index.html` dans ton navigateur préféré.

3. (Optionnel) Pour un serveur local avec hot reload :
   ```bash
   npm install -g live-server
   live-server .
   ```

---

## 🧩 Fonctionnalités

### Déjà implémentées
- Plateau de jeu complet  
- Déplacement des pions selon les dés  
- Règles de base du Tavli / backgammon  
- Mode PWA (peut être installé et joué hors ligne)

### À venir
- Mode multijoueur (local ou en ligne)  
- IA pour jouer contre l’ordinateur  
- Interface responsive mobile  
- Sauvegarde / reprise de partie  

---

## 🛠️ Technologies & conception

- **HTML5** pour la structure  
- **CSS3** pour le style et la mise en page  
- **JavaScript pur** (sans dépendances externes) pour la logique  
- **Service Worker** + **Manifest PWA** pour l’expérience hors ligne  
- **Génération complète via LLM**, sans intervention manuelle sur le code source initial

---

## ✅ Tests & qualité

Aucun test automatisé n’est encore inclus.  
Propositions futures :
- Tests unitaires (Jest, Mocha)
- Tests E2E (Cypress)
- Validation des règles et des déplacements

---

## 📁 Contribution

Les contributions humaines sont les bienvenues 😉  
Pour contribuer :

1. **Forke** le dépôt  
2. Crée une **branche** : `feature/nom-de-ta-feature`  
3. **Code / modifie**  
4. Crée une **pull request**

Merci de documenter clairement les changements apportés pour faciliter le suivi humain/IA.

---

## 📜 Licence

Ce projet n’a pas encore de licence spécifiée.  
Tu peux en ajouter une (MIT, Apache 2.0, GPL, etc.) si nécessaire.

---

## 📞 Contact

- Auteur / Repository : **gmoulard / Tavli**  
- Lien : [https://github.com/gmoulard/Tavli](https://github.com/gmoulard/Tavli)  
- Issues & feedback : via l’onglet *Issues* du dépôt GitHub  

---

> 🧠 *Ce projet est une expérimentation IA : 100 % du code, de la structure et du contenu ont été produits par des modèles de langage (LLM), sans écriture humaine directe.*
