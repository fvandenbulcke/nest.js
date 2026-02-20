# Architecture Hexagonale - Multi Web & DB

## 📋 Description

Ce projet démontre l'implémentation d'une **architecture hexagonale** (ou Ports & Adapters) avec TypeScript et NestJS. L'objectif principal est d'illustrer comment cette architecture permet de **découpler le domaine métier** des frameworks web et des technologies de persistance, rendant possible le changement de technologies par simple configuration.

### 🎯 Objectifs du projet

L'architecture hexagonale offre une **flexibilité exceptionnelle** pour :

1. **Changer de framework web** sans modifier la logique métier
   - Express.js (implémentation par défaut)
   - Fastify (adaptateur alternatif)

2. **Changer de technologie de stockage** sans impacter le domaine
   - En mémoire (implémentation par défaut)
   - PostgreSQL (adaptateur alternatif)
   - MongoDB (adaptateur alternatif)

### 💡 Avantages de l'architecture hexagonale

- **Indépendance du domaine** : La logique métier ne dépend d'aucun framework
- **Testabilité** : Tests unitaires sans dépendance externe
- **Flexibilité** : Changement facile d'infrastructure technique
- **Maintenabilité** : Séparation claire des responsabilités
- **Évolutivité** : Ajout de nouveaux adaptateurs sans modifier le cœur

### 🏗️ Structure du projet en 3 couches

1. **Domain** (centre) : Logique métier pure, sans dépendances externes
2. **Application** : Adaptateurs entrants (web, CLI, events...)
3. **Infrastructure** : Adaptateurs sortants (DB, APIs externes, files...)

### 📝​ Approche en contract first

L'implémentation de l'API suit la démarche **contract first** qui consiste à générer son contrat à partir d'une spécification OpenApi dans le fichier [super-heroes.api.spec.yaml](specs/super-heroes.api.spec.yaml).

La commande suivante permet de générer le contrat de l'API grâce à la librairie [nest-openapi-code-generator](https://github.com/ganesanarun/nest-openapi-code-generator) :

```bash
$ yarn run generate:api
```

La documentation est disponible via l'url `http://localhost:3000/swagger`.

## � Configuration dynamique par profils

L'activation du choix de **framework web** et **couche de persistance** se fait via une simple variable d'environnement `profiles` passer en ligne de commande.

Les profils disponibles sont:

| profil   | couche       | activation            |
|----------|--------------| --------------------- |
| express  | web          | express.js            |
| fastify  | web          | fastify               |
| memory   | persistance  | en mémoire            |
| mongodb  | persistance  | avec une DB mongoDB   |
| postgres | persistance  | avec un DB postgreSQL |

Ils sont utilisés dans le fichier [beans.ts](src/application/configuration/beans.ts) pour sélectionner automatiquement les implémentations voulues.

## 🚀 Installation et démarrage

### Installation des dépendances

```bash
$ yarn install
```

### Configuration de l'environnement

Copiez le fichier [.env.example](.env.example) en `.env` et renseignez les configurations attendues :

```bash
# Copier le fichier d'exemple
$ cp .env.example .env
```

### Lancement de l'application

```bash
# Configuration par défaut (Express + Memory)
$ yarn run start

# Mode watch avec profils personnalisés
$ profiles=fastify,postgresql yarn run start:dev

# Mode watch avec profils personnalisés pour windows
$ set profiles=fastify,postgresql && yarn run start:dev

# Mode production avec profils
$ profiles=express,mongodb yarn run start:prod

# Mode production avec profils pour windows
$ set profiles=express,mongodb && yarn run start:prod
```

## 🧪 Tests

```bash
# Tests unitaires
$ yarn run test

# Tests e2e
$ yarn run test:e2e

# Couverture de tests
$ yarn run test:cov
```

L'architecture hexagonale facilite les tests :
- **Tests unitaires du domaine** : Sans dépendances externes
- **Tests avec mocks** : Facile de mocker les ports
- **Tests d'intégration** : Par adaptateur spécifique

## 📚 Concepts clés

### Ports & Adapters

- **Port entrant (in)** : Interface exposée par le domaine (use cases)
- **Port sortant (out)** : Interface requise par le domaine (repository)
- **Adaptateur entrant** : Implémentation qui appelle le domaine (controller)
- **Adaptateur sortant** : Implémentation d'un port sortant (repository impl)

### Dépendances

```
Application → Domain ← Infrastructure
```

Le domaine ne dépend de rien. Les autres couches dépendent du domaine via les ports.

### Injection de dépendances

La configuration (module NestJS) câble les adaptateurs aux ports :

```typescript
{
  provide: 'GetSuperheroUseCasePort',
  useValue: getSuperheroUseCase, // Facilement remplaçable !
}
```

## 📝 Licence

Ce projet est sous licence MIT.
