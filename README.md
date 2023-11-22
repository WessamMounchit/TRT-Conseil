# Evaluation d'entraînement back-end en cours de formation : Agence de recrutement TRT Conseil.

Lien vers le site déployé en ligne : https://trt-conseil.netlify.app/
Les livrables : https://pickled-raincoat-f6b.notion.site/Livrables-9a9e223ec7f04cbba3455f966b0ab5af

Le projet TRT Conseil est une initiative d'une agence de recrutement spécialisée dans l'hôtellerie et la restauration, fondée en 2014 en France. En réponse à la crise du coronavirus qui a fortement impacté le secteur, l'entreprise vise à développer un outil pour faciliter le processus de recrutement. L'objectif initial est de créer un produit minimum viable pour tester la demande.

Le système prévu comprendra une interface avec une fonctionnalité d'authentification, permettant à quatre types d'utilisateurs de se connecter :

1. Recruteurs : Entreprises à la recherche d'employés.
2. Candidats : Serveurs, responsables de la restauration, chefs cuisiniers, etc.
3. Consultants : Mandatés par TRT Conseil pour gérer les liaisons entre recruteurs et candidats sur le back-office.
4. Administrateur : Responsable de la maintenance de l'application.

Les principales fonctionnalités souhaitées comprennent :

1. Création de compte : Recruteurs et candidats devront fournir un email valide et un mot de passe sécurisé, nécessitant l'approbation d'un consultant avant l'activation du compte.

2. Connexion : Tous les types d'utilisateurs peuvent se connecter à l'application.

3. Création de consultant : L'administrateur est en charge de créer des comptes consultants.

4. Complétion du profil : Les candidats peuvent ajouter leur nom, prénom, et télécharger leur CV au format PDF. Les recruteurs peuvent spécifier le nom de leur entreprise et une adresse.

5. Publication d'une annonce : Les recruteurs peuvent créer des annonces avec des détails tels que l'intitulé du poste, le lieu de travail, et une description détaillée. Une validation par un consultant est nécessaire avant que l'annonce soit visible pour les candidats. Les recruteurs ont accès à une liste des candidats validés par TRT Conseil qui ont postulé à chaque annonce.

6. Postulation à une annonce : Les candidats peuvent postuler à une offre en appuyant sur un bouton. Une approbation par un consultant est nécessaire. En cas d'approbation, le recruteur concerné reçoit un email avec les détails du candidat et son CV.

Le développement se concentre sur la partie back-end de l'application, et le produit final doit répondre aux exigences spécifiées dans le cahier des charges.

si vous voulez tester l'application en local, suivez les étapes suivantes :

## Déployer l'application en local

Cloner le projet

```bash
    git clone https://github.com/WessamMounchit/TRT-Conseil.git
```

Installer les dépendances pour le côté client

```bash
    cd client
    npm install
```
Créer un fichier .env dans le dossier /client avec ce contenu : 

```bash
    VITE_API_URL = https://trt-conseil-api.onrender.com
```

Installer les dépendances pour le côté server

```bash
    cd server
    npm install
```

Créer un fichier .env dans le dossier /server avec ce contenu : 

```bash
PORT: 8000
CLIENT_URL: http://127.0.0.1:5173
SECRET: TheSecretKey
PG_USER: ycctpfjr
PG_HOST: cornelius.db.elephantsql.com
PG_DATABASE: ycctpfjr
PG_PASSWORD: EgCSvMJostE1ka8owDQdKaOwgJL1J7jD
PG_PORT: 5432
TRT_EMAIL: TRT_Conseil@outlook.com
TRT_PASSWORD: TRTConseilMdp@
```
NB: L'adresse mail qui vous est fourni a été créée uniquement pour ce projet afin de tester la fonctionnalité correspondante,
également, une base de données PostgreSQL hébergée sur https://api.elephantsql.com/ vous est fournie,
en cas de problème avec cette BDD, vous pouvez créer votre propre base de données PostgreSQL,
l'alimenter avec le fichier database.sql (où se touvent toutes les requêtes
nécessaires y compris celle pour créer l'admin) et la connecter à ce serveur,
vous pouvez également modifier la variable "SECRET" et mettre ce que vous voulez à la place.


Démarrer le front :

```bash
    npm run dev
```

Démarrer le back :

```bash
    npm run dev
```

### Vous retrouverez mes livrables ici :

Suivre [ce lien](https://pickled-raincoat-f6b.notion.site/Livrables-9a9e223ec7f04cbba3455f966b0ab5af)

## Auteur

-[@WessamMounchit](https://github.com/WessamMounchit)
