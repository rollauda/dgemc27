# dgemc27 — site DGEMC saison 2026-27

Site Docusaurus du **DGEMC** (Droit et Grands Enjeux du Monde Contemporain, option Terminale), saison 2026-27. **Reprend le format de dgemc25** (lecteur de PDF : embed via `useBaseUrl`, plugins `docs/` + `activites/`) — ce n'est PAS une refonte type phil27. Prendra la suite de `dgemc25` / `dgemc.profauda.fr`.

## Structure

| Section | URL | Source |
|---|---|---|
| Leçons | `/docs/L[n]/` | `docs/` (accueil.mdx + sections + embed PDF) |
| Activités | `/activites/` | `activites/` (simulation procès, conférence, jeu de l'île) |
| PDF | — | `static/pdf/[CxLy]/` |

Nomenclature et correspondance `CxLy ↔ L[n]` : voir `1 PROJETS/Lycee/prepa-dgemc/00-Programme/mapping-chapitres.md`. Publication via `/dgemc-publier-lecon` depuis le coffre IPCRA.

## Développement

```bash
npm install
npm start
npm run build
```

## Étapes restantes (scaffold local — à finaliser par Rolland)

1. **`npm install`** + **`npm run build`** pour valider (non testé à la création ; `blog` désactivé, à la différence de dgemc25).
2. **Créer le dépôt GitHub** `rollauda/dgemc27` et `git push` (déploiement déjà câblé dans `.github/workflows/`).
3. **DNS** : `dgemc27.profauda.fr` (placeholder) puis bascule `dgemc.profauda.fr` à la rentrée ; figer `dgemc25`.
4. **Contenu 26-27** : republier les leçons à partir des archives Drive importées dans le vault (`/dgemc-importer` → `/dgemc-publier-lecon`). Le `docs/` actuel est une **copie de l'état publié de dgemc25** (point de départ ; à vider/retravailler selon la nouvelle progression).

> Créé le 2026-06-02 par scaffold local depuis dgemc25 (sans blog ni clutter howto/scripts). **Aucun dépôt distant créé ni push** (en attente de Rolland).
