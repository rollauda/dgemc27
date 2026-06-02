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

> **Réglages de version (sinon le build échoue après un `npm install` neuf)** :
> - Tous les paquets `@docusaurus/*` sont épinglés à la **même** version exacte (`3.7.0`, sans `^`). Sinon `theme-mermaid` part en 3.10.x et casse la vérification de version.
> - `package.json` contient `"overrides": { "webpack": "5.95.0" }` : les webpack récents (5.107+) durcissent le schéma de `ProgressPlugin` et font planter `webpackbar@6`.

## Publier une mise à jour

Le déploiement est **automatique** : tout push sur `main` déclenche le workflow `deploy.yml` (build + publication sur GitHub Pages). Il suffit donc de committer et pousser.

```bash
git add -A                       # ou git add <fichiers> pour un commit ciblé
git commit -m "Décris la modif"  # ex. "Publie la leçon L3 + PDF"
git push                         # déclenche le build + déploiement
```

Suivi et vérification :

```bash
gh run watch          # suit le déploiement en cours jusqu'à la fin
gh run list --limit 5 # historique des derniers déploiements
```

Le site est en ligne ~1 à 2 min après la fin du workflow. En cas d'échec, `gh run view --log-failed` montre l'erreur.

> Pense aux **PDF** : un polycopié embarqué doit être présent dans `static/pdf/[CxLy]/` et committé, sinon l'embed sera vide en ligne.

> Première fois sur une nouvelle machine : `git clone https://github.com/rollauda/dgemc27.git` puis `npm install`.

## Statut du déploiement

- ✅ Dépôt `rollauda/dgemc27` (public), `main` poussée, CI `deploy.yml` opérationnelle.
- ✅ GitHub Pages activé depuis la branche `gh-pages`, CNAME `dgemc27.profauda.fr`.
- URL par défaut en attendant le DNS : https://rollauda.github.io/dgemc27/

## Étapes restantes

1. **DNS** : faire pointer `dgemc27.profauda.fr` vers GitHub Pages (CNAME `dgemc27` → `rollauda.github.io`, ou les 4 A records d'apex `185.199.108–111.153`), puis cocher **Enforce HTTPS**. Bascule vers `dgemc.profauda.fr` à la rentrée ; figer `dgemc25`. ⚠️ Le `static/CNAME` portait `dgemc.profauda.fr` (domaine live de dgemc25) — corrigé en `dgemc27.profauda.fr` pour ne pas détourner le site actuel.
2. **Contenu 26-27** : republier les leçons à partir des archives Drive importées dans le vault (`/dgemc-importer` → `/dgemc-publier-lecon`). Le `docs/` actuel est une **copie de l'état publié de dgemc25** (point de départ ; à vider/retravailler selon la nouvelle progression).
3. **Maintenance CI** : les actions du workflow tournent sur Node 20 (déprécié, retrait des runners prévu sept. 2026). Bumper `actions/checkout`, `actions/setup-node` et `peaceiris/actions-gh-pages` quand l'occasion se présente.

> Scaffold créé le 2026-06-02 depuis dgemc25 (sans blog ni clutter howto/scripts), mis en production le même jour.
