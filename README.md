# 🌤️ Moodi — Assistant Météo IA

**Moodi** est une application météo intelligente développée en React, connectée à l'API WeatherAPI. Elle fournit des informations météorologiques en temps réel, des recommandations personnalisées (vêtements, activités, déplacements) et une interface esthétique et animée.

---

## 🚀 Fonctionnalités

- 🔍 **Recherche météo** par ville
- 📍 Affichage des données actuelles : température, condition, UV, vent, humidité, lever/coucher du soleil
- 🤖 **Recommandations IA** contextuelles (vêtements, activités, trajet)
- 🎨 **Personnalisation** du thème (chaud / froid)
- 🌈 **Arrière-plan animé** selon la météo
- 📅 **Prévisions sur 7 jours**
- 📱 **Design mobile-first** et accessible

---

## 🛠️ Stack technique

- ⚛️ **React** (Vite)
- 🎨 **CSS personnalisé** + **Lucide Icons**
- 🔗 **Axios** pour les appels API
- 📡 **WeatherAPI** (https://www.weatherapi.com/)
- 🔐 Stockage des clés API côté back (si utilisé avec Rails)

---

## 📦 Installation

### Prérequis

- Node.js 18+
- Une clé WeatherAPI gratuite : https://www.weatherapi.com/signup.aspx

### Étapes

```bash
# Clone le repo
git clone https://github.com/ton-compte/moodi.git
cd moodi

# Installe les dépendances
npm install

# Crée un fichier .env.local
touch .env.local

📚 Dépendances à installer
bash

npm install axios react-router-dom lucide-react

✅ À faire
Connexion API Rails pour recommandations IA

Authentification utilisateur

Multi-thèmes / accessibilité

👩‍💻 Auteur
Morgane Bourdillon
