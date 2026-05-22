Espace de travail étudiant avec minuterie Pomodoro et suivi de tâches Présentation du projet

FocusRoom est une application web de productivité destinée aux étudiants et aux personnes souhaitant mieux organiser leur travail.

Le site permet de :

gérer des tâches quotidiennes ; utiliser un minuteur Pomodoro ; suivre le temps de travail réalisé ; recevoir des citations motivantes depuis une API externe ; utiliser un mode sombre ; sauvegarder les données localement dans le navigateur.

Le projet a été développé en utilisant uniquement :

HTML CSS JavaScript

sans framework externe.

🎯 Objectifs du projet

Ce projet a été réalisé afin de pratiquer :

la manipulation du DOM ; la gestion des événements JavaScript ; l’utilisation du localStorage et sessionStorage ; la programmation asynchrone avec fetch() et async/await ; l’organisation du code JavaScript ; l’utilisation des API REST ; la validation des données utilisateur. 🧠 Concept de l’application

FocusRoom fonctionne comme un espace personnel de concentration.

L’utilisateur peut :

créer des tâches ; suivre sa progression ; lancer une session Pomodoro ; rester motivé grâce aux citations affichées automatiquement.

Le site simule également un système simple :

d’inscription ; de connexion ; de protection de page. 📂 Structure du projet focusroom/ │ ├── index.html ├── about.html ├── contact.html ├── login.html ├── register.html ├── app.html │ ├── style.css ├── script.js │ └── alarm.mp3 🖥️ Description des pages 🏠 index.html

Page d’accueil du site.

Contient :

présentation du projet ; navigation ; accès aux autres pages. ℹ️ about.html

Page décrivant le concept de FocusRoom.

Contient :

image illustrative ; description détaillée de l’application. ✉️ contact.html

Formulaire de contact simple.

Permet de pratiquer :

les formulaires HTML ; le style CSS. 🔐 register.html

Page d’inscription.

Fonctionnalités :

saisie utilisateur ; validation ; sauvegarde dans localStorage. 🔓 login.html

Page de connexion.

Fonctionnalités :

vérification des identifiants ; authentification simulée ; redirection vers app.html. 🎯 app.html

Page principale de l’application.

Fonctionnalités :

gestion des tâches ; timer Pomodoro ; citations motivantes ; mode sombre ; statistiques de travail. ⚙️ Fonctionnalités principales ✅ Gestion des tâches

L’utilisateur peut :

ajouter une tâche ; cocher une tâche terminée ; sauvegarder automatiquement ses tâches.

Les tâches sont stockées dans :

localStorage ⏱️ Minuteur Pomodoro

Le minuteur fonctionne avec :

Démarrer ; Pause ; Réinitialiser.

Quand le timer démarre :

l’écran passe en mode plein écran.

Quand il est mis en pause ou terminé :

l’affichage revient à la normale. 📊 Temps travaillé

Le système calcule :

le temps total travaillé par jour.

Les données sont sauvegardées dans :

localStorage

avec une clé basée sur la date du jour.

🌙 Mode sombre

Le site possède :

un thème clair ; un thème sombre.

Le choix de l’utilisateur est sauvegardé automatiquement.

🔔 Alarme sonore

Quand le Pomodoro se termine :

un son est joué automatiquement. 🌐 API REST et fetch()

Le projet utilise une API externe afin de récupérer des citations motivantes.

Exemple :

fetch("https://dummyjson.com/quotes/random")

Les données sont récupérées avec :

async / await

Puis affichées dynamiquement dans le DOM.

🧩 Concepts JavaScript utilisés ✔️ Manipulation du DOM

Utilisation de :

document.getElementById() document.createElement() appendChild() classList.toggle() ✔️ Gestion des événements

Exemples :

onclick addEventListener() onsubmit beforeunload ✔️ Structures de données

Utilisation :

des tableaux ; des objets JavaScript ; du format JSON.

Exemple :

{ text: "Réviser JavaScript", done: false } ✔️ Web Storage localStorage

Utilisé pour :

tâches ; thème ; utilisateur ; temps travaillé. sessionStorage

Utilisé pour :

durée de la session active. ✔️ Programmation asynchrone

Le projet utilise :

Promise fetch() async/await

pour communiquer avec les API REST.

🚀 Comment utiliser le projet 1️⃣ Télécharger les fichiers

Placer tous les fichiers dans un même dossier :

focusroom/ 2️⃣ Ajouter le son

Ajouter un fichier :

alarm.mp3

dans le dossier du projet.

3️⃣ Ouvrir le site

Ouvrir :

index.html

dans un navigateur.

4️⃣ Créer un compte

Aller sur :

register.html

puis créer un utilisateur.

5️⃣ Se connecter

Aller sur :

login.html

et saisir les identifiants.

6️⃣ Utiliser FocusRoom

Dans app.html :

ajouter des tâches ; lancer le timer ; activer le mode sombre ; suivre son temps de travail. 🔒 Limites du projet

Le système d’authentification est simulé avec localStorage.

Il ne s’agit pas :

d’une vraie base de données ; d’un vrai système sécurisé côté serveur.

Le projet est destiné à un apprentissage front-end JavaScript.

🛠️ Technologies utilisées HTML5 CSS3 JavaScript ES6 Fetch API LocalStorage SessionStorage 👨‍💻 Auteur

Projet réalisé dans le cadre d’un mini-projet JavaScript/Web Front-End.
