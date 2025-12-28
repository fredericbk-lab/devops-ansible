# DevOps Local Automation with Ansible, Docker & GitHub Actions

## Description du projet

Ce projet est un **mini-projet DevOps complet**, réalisé dans un objectif **pédagogique et pratique**, visant à démontrer la mise en œuvre des **fondamentaux DevOps** sur une **machine physique locale**.

Il combine :

* **Infrastructure as Code (IaC)** avec **Ansible**
* **Déploiement applicatif** en mode **conteneurisé (Docker)** et **physique (systemd)**
* **Intégration Continue / Déploiement Continu (CI/CD)** avec **GitHub Actions**
* **Idempotence** et bonnes pratiques DevOps

Le projet permet de comparer concrètement les différences entre :

* un déploiement **Docker**
* un déploiement **classique sur le système**

---

## Objectifs du projet

* Automatiser l’installation et la configuration d’un environnement local
* Déployer plusieurs applications web de manière reproductible
* Comparer Docker vs déploiement physique
* Mettre en place un pipeline CI/CD fonctionnel
* Garantir l’idempotence des playbooks Ansible

---

## Technologies utilisées

* **Ansible** (automation, IaC)
* **Docker** (conteneurisation)
* **Node.js** (application backend)
* **Flask / Python** (application backend)
* **Nginx** (serveur web)
* **systemd** (services Linux)
* **GitHub Actions** (CI/CD)
* **Ubuntu Linux**

---

## Structure du projet

```text
devops-local-ansible/
├── ansible/
│   ├── inventory.ini
│   ├── site.yml
│   ├── group_vars/
│   │   └── local.yml
│   └── roles/
│       ├── common/
│       ├── docker/
│       ├── nginx_docker/
│       ├── node_docker/
│       ├── node_physical/
│       ├── flask_docker/
│       └── flask_physical/
├── apps/
│   ├── nginx/
│   ├── node/
│   └── flask/
└── .github/
    └── workflows/
        └── ci-cd.yml
```

---

## Services déployés

| Technologie | Mode               | Port |
| ----------- | ------------------ | ---- |
| Nginx       | Docker             | 8080 |
| Node.js     | Docker             | 3000 |
| Node.js     | Physique (systemd) | 3001 |
| Flask       | Docker             | 5000 |
| Flask       | Physique (systemd) | 5001 |

---

## Lancer le projet en local

### Prérequis

* Ubuntu
* Python 3
* Ansible
* Docker
* Accès sudo

### Commande de déploiement

```bash
cd ansible
ansible-playbook -i inventory.ini site.yml --ask-become-pass
```

---

## Vérification des services

```bash
curl http://localhost:8080   # Nginx Docker
curl http://localhost:3000   # Node Docker
curl http://localhost:3001   # Node Physique
curl http://localhost:5000   # Flask Docker
curl http://localhost:5001   # Flask Physique
```

---

## Idempotence (principe DevOps)

Le playbook est **idempotent** :
Une exécution répétée ne provoque **aucune modification inutile**.

Exemple :

```bash
ansible-playbook -i inventory.ini site.yml
```

Résultat attendu :

```
changed=0
failed=0
```

---

## CI/CD avec GitHub Actions

### Fonctionnement

* **CI** : exécuté sur les serveurs GitHub

  * lint YAML
  * ansible-lint
  * syntax-check
* **CD** : exécuté sur la machine locale via un **runner self-hosted**

### Déclenchement

* À chaque `git push` sur la branche `main`

### Pré-requis CD

* Installer un **runner GitHub Actions self-hosted** sur la machine locale
* Configurer sudo sans mot de passe (ou Ansible Vault)

---

## Sécurité (environnement labo)

Pour permettre l’exécution automatique du playbook :

```bash
sudo visudo
```

Ajouter :

```
fred ALL=(ALL) NOPASSWD:ALL
```

> À utiliser uniquement dans un contexte pédagogique ou de test.

---

## Ce que ce projet démontre

* Infrastructure as Code avec Ansible
* Déploiement multi-environnements
* Gestion des conflits de ports
* Automatisation reproductible
* CI/CD local réaliste
* Bonnes pratiques DevOps

---

## Limites & perspectives

### Limites

* Environnement local uniquement
* Pas de secrets chiffrés (Vault non utilisé)

### Évolutions possibles

* Déploiement sur VPS / Cloud
* Ansible Vault
* Monitoring (Prometheus, Grafana)
* Reverse proxy (Nginx)
* Tests automatisés post-déploiement

---

## Auteur

**Frédéric Betukumesu**
Projet pédagogique DevOps – Automation & CI/CD
