# Architecture Decisions

## ADR-001 — Choix React Native + Expo

Date : à compléter

Décision :
Utiliser React Native avec Expo pour construire directement une app mobile.

Pourquoi :

- développement rapide ;
- test facile sur téléphone ;
- compatible iOS / Android ;
- écosystème React ;
- Expo Router pour navigation propre.

Alternatives :

- PWA React/Vite ;
- React Native CLI.

Conséquences :

- logique mobile-first dès le départ ;
- besoin de respecter les contraintes Expo ;
- variables d’environnement côté client à gérer prudemment.

---

## ADR-002 — Architecture domain-first

Décision :
Séparer la logique métier dans src/domain.

Pourquoi :

- meilleure maintenabilité ;
- logique testable ;
- future migration plus simple ;
- composants plus simples.

Conséquences :

- plus de discipline ;
- pas de logique métier dans les écrans.
