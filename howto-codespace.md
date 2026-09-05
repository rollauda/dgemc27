# Mémo — publier le site DGEMC

⚠️ **Le cours n'est pas en markdown.** Une leçon, ici, ce sont des documents : le polycopié en `<embed>` PDF, et depuis la rentrée 2026 des diaporamas Marp en iframe. La conséquence est dans la section suivante, et c'est la chose à retenir de ce mémo.

## Publier : trois commandes

```bash
npm run build                          # 1. vérifier que le site se construit
git add -A && git commit -m "update"   # 2. tout enregistrer
git push                               # 3. envoyer — le site est en ligne 1 à 2 min après
```

**Le `push` suffit.** GitHub Actions construit le site et le met en ligne tout seul. Il n'y a rien d'autre à lancer.

Une leçon publiée, ce sont **trois endroits** — la page, son polycopié, ses diaporamas :

```bash
docs/L2/                             ← rang d'affichage dans le menu
static/pdf/C1L2/                     ← code pédagogique
static/slides/C1L2-sources-du-droit/ ← code + slug
```

⚠️ **Les deux nomenclatures ne se mélangent pas.** `L[n]` est le rang dans le menu et ne vit **que** dans `docs/`. Partout ailleurs — PDF et diaporamas — c'est le code pédagogique `CxLy` qui indexe. La correspondance est tenue dans `00-Programme/mapping-chapitres.md` du coffre.

## Le piège n° 1, propre à ce site

**Un document non commité donne une page blanche aux élèves.** L'embed ou l'iframe s'affiche parfaitement en local, parce que le fichier est sur votre machine ; en ligne, il n'existe pas. Sur un site où la page ne fait que présenter des documents, il ne reste alors **rien à lire**.

Le réflexe, avant chaque push :

```bash
git status static/     # PDF et diaporamas sont-ils bien pris ?
```

Pour un diaporama, penser aussi à son dossier `assets/` : les images vivent à côté de l'`index.html`, et une image oubliée sort en cadre vide sans que rien ne le signale.

Vérifier ensuite **l'URL réelle** après déploiement, pas seulement l'aperçu local.

## Avant de pousser : les vérifications qui comptent

0. **Regarder `git status`.** `git add -A` prend tout ce qui a changé, à l'instant où vous le lancez. Les dossiers lourds (`.venv/`, `node_modules/`, `build/`) sont ignorés, il n'y a donc rien à craindre de ce côté — mais si une publication est en cours depuis le coffre, vous commiteriez un état à moitié écrit. Un coup d'œil suffit à l'éviter.
1. **`npm run build` passe.** Un lien mort fait échouer la construction, et le site reste alors sur sa version précédente.
2. **Le polycopié et les diaporamas sont commités**, avec leurs images. Voir ci-dessus.
3. **La correspondance `CxLy ↔ L[n]` est à jour** dans `prepa-dgemc/00-Programme/mapping-chapitres.md` du coffre. `CxLy` est l'identifiant pédagogique, `L[n]` la position dans le menu du site : toute leçon nouvelle doit y être ajoutée.
4. **Rien de personnel.** Ce dépôt est **public** : pas de corrigé réservé, pas de nom d'élève, pas de document sous droits qu'on ne veut pas diffuser.

## À ne pas faire

**`npm run deploy`** — la commande existe, mais elle pousse un site construit sur votre machine directement sur `gh-pages`, en court-circuitant GitHub Actions. Le résultat peut différer de ce que la CI aurait produit, et l'écraser. Le `git push` suffit, toujours.

**`npm install @docusaurus/core@latest`** — les versions sont **épinglées exprès** (`3.10.2`, sans `^`). Les monter casse la construction, et jamais au bon moment. Une montée de version se prépare, elle ne s'improvise pas la veille d'un cours.

**`rm -rf package-lock.json`** — ce fichier est ce qui garantit que la CI installe exactement les mêmes versions que vous. Le supprimer les laisse repartir vers les dernières publiées, avec les mêmes conséquences que ci-dessus. Supprimer `node_modules/` seul est en revanche sans danger.

**`npm install --force`** — passe outre les incompatibilités au lieu de les régler. Elles reviennent plus tard, et moins clairement.

**Modifier les pages de `docs/L[n]/` ici** — elles sont **générées** depuis le coffre par `/dgemc-publier-lecon`. Une correction faite dans ce dépôt sera écrasée à la prochaine publication.

## Travailler en local

```bash
npm install       # à la première ouverture du dépôt seulement
npm run start     # aperçu sur http://localhost:3000, se recharge à chaque sauvegarde
npm run build     # construction réelle : c'est elle qui détecte les liens morts
```

`npm run start` est indulgent, `npm run build` ne l'est pas. Un lien cassé ne se voit souvent qu'à la construction. **Mais ni l'un ni l'autre ne détecte un document manquant** — l'embed et l'iframe restent silencieux. Seule la vérification de l'URL réelle, après déploiement, le montre.

## Suivre le déploiement

```bash
gh run watch              # suit le déploiement en cours
gh run list --limit 5     # les derniers
gh run view --log-failed  # en cas d'échec
```

**Deux workflows s'enchaînent** : `Deploy to GitHub Pages` construit, puis `pages-build-deployment` met en ligne. Tant que le second tourne, les pages répondent 404 — c'est normal, ce n'est pas un échec. Attendre la fin des deux avant de conclure.

## Quand quelque chose ne va pas

```bash
npm run build            # les erreurs de liens y sont détaillées
npm run clear            # vide le cache Docusaurus
rm -rf node_modules && npm install   # sans toucher au package-lock.json
```

## Codespaces

Utile depuis une machine sans l'environnement installé — un poste du lycée, une tablette. Depuis GitHub : **Code › Codespaces › Create codespace**. Le dépôt s'ouvre dans VS Code en ligne, le port 3000 est exposé automatiquement.

Le compte GitHub Education donne 180 heures par mois — trois fois l'usage courant. L'arrêt automatique se fait après 30 minutes d'inactivité.

Pour une correction d'une ligne, **github.dev** suffit et ne consomme aucune heure : appuyer sur `.` dans le dépôt sur GitHub.

Les commandes de publication sont **les mêmes** que ci-dessus.

## Adresse

Le site est servi sur **dgemc.profauda.fr** depuis le 2026-09-02. Le site 2025-26 est archivé sur **dgemc26.profauda.fr**, où il reste consultable avec tous ses documents.

⚠️ L'ancienne adresse `dgemc27.profauda.fr` **n'est plus servie** et renvoie une 404 sèche : GitHub Pages ne permet aucune redirection. Si vous l'avez diffusée, elle ne mène plus nulle part.
