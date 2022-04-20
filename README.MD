# Exercice de codage

  * [Get started](#get-started)
  * [A propos du back](#a-propos-du-back)
    + [Gestion des villes en base de données](#gestion-des-villes-en-base-de-donn-es)
    + [URL et endpoints du back](#url-et-endpoints-du-back)
    + [variables d'environement](#variables-d-environement)
  * [A propos du front](#a-propos-du-front)
  * [Test automatisés](#test-automatis-s)
  * [Déploiement](#d-ploiement)
  * [A propos de moi](#a-propos-de-moi)

## Get started
Pour lancer l'application, exécutez la commande ci-dessous à la racine du projet
```
docker-compose up back_dev front_dev
```

L'application peut nécessiter plusieurs secondes à 1 minutes lors de son lancement. 
*Ce délais est dû à la population automatique de la base de données (depuis la liste des villes sur le site data.gouv)*

Une fois l'application lancée, vous pouvez y accéder à l'adresse  **[http://localhost:3008](http://localhost:3008)**

---

## A propos du back

Le répertoire `back` contient un projet `NestJS` qui délivre une API REST contenant 2 endpoints.

Elle utilise une base de données PostgreSQL pour stocker la liste des villes localement. La librairie `TypeORM` est utilisée pour la communication avec cette base.

La librairie `axios` est utilisée pour contacter des services extérieurs. Ici, elle est utilisée pour récupérer la liste des villes sur le site data.gouv.

### Gestion des villes en base de données
Lors du lancement de l'application via la commande `docker-compose` proposée plus haut, la base de donnée est automatiquement créée. La liste des villes est automatiquement téléchargée depuis le site data.gouv.

Ce comportement est développé grâce à la fonction de gestion des migrations de `TypeORM` (pour la création automatique des tables en base de données).
Un script, présent dans le fichier `back/src/scripts/sync-cities.ts` permet, en exécutant la commande `npm run sync`, de télécharger automatiquement les villes sur le site data.gouv et de les insérer en base de données.

### URL et endpoints du back
Par défaut, cette API est accessible depuis l'adresse `http://localhost:3007/`. Le numéro de port peut être modifier directement sur le service `back_dev` dans le fichier `docker-compose.yml` à la racine du projet.
La racine de cette API retourne une erreur 404. Seuls les endpoints décrits ci-dessous délivrent une réponse

#### `/city`
Créé à des fins de test, le endpoint `http://localhost:3007/city` retourne la liste des 10 premières villes en base de données.

#### `/city/search?q={searchTerm}`
Endpoint utilisé par le front pour rechercher les villes en fonction du paramètre `searchTerm`.
Il retourne la liste des 100 premières villes correspondant au terme recherché.

### variables d'environement
#### `PORT`
Le port sur lequel écoute le serveur NestJS.
préconfiguration  : `3007`

#### `JSON_DATASET_URL`
URL du fichier/endpoint JSON sur lequel récupérer les villes à insérer en base de données.
Préconfiguration : `https://www.data.gouv.fr/fr/datasets/r/34d4364c-22eb-4ac0-b179-7a1845ac033a`

#### `DB_USER`
Nom d'utilisateur à utiliser pour se connecter à la base de données
Préconfiguration : `postgres`
      
#### `DB_PASSWORD`
Mot de passe à utiliser pour se connecter à la base de données
Préconfiguration : `postgres`
      
#### `DB_DATABASE`
nom de la base de données à laquelle se connecter
Préconfiguration : `postgres`
      
#### `DB_HOST`
Nom d'hote du serveur de base de données auquel se connecter
Préconfiguration : `database_dev`

#### `DB_PORT`
port du serveur de base de données auquel se connecter
Préconfiguration : `5432`

---

## A propos du front
Le front est réalisé avec `ReactJS` (version 18). La librairie `redux-toolkit` est utilisée pour emettre les requêtes vers le back et stocker les résultats en cache.

Par défaut, le front est accessible à l'adresse [http://localhost:3008](http://localhost:3008) si l'application est lancée avec docker-compose. Le numéro de port peut être modifié dans le fichier `docker-compose.yml` sur le service `front_dev`

## Test automatisés
Pour lancer les tests automatisés du back, lancez la commande ci-dessous
```
docker-compose up back_test
```
Seul le back est testé dans cette version.

## Déploiement
Pour simplifier le déploiement et la maintenance de l'application, un worflow CI a été mis en place via `github action`. 

Ces workflow se terminant par le build d'images Docker, ils peuvent facilement être complétés pour y inclure une dimension CD en ajoutant des étapes de déploiement vers le service de notre choix à la suite des étapes CI.

## A propos de moi
**Fabien LEGE**
Responsable du pôle web & mobiles au sein de l'Agence ho5 depuis 2012.
- [fabienlege@gmail.com](mailto:fabienlege@gmail.com)
- 06.72.37.45.22

