# Rattrapage — Debug d'un Pokédex React

## Contexte

Vous reprenez la maintenance de `pokedex-app`, une petite application React qui
consomme la [PokéAPI](https://pokeapi.co) pour afficher, filtrer et mettre en
favori des Pokémon. Le développeur précédent est parti sans documentation et
l'application accumule les tickets de bug.

**L'application contient plusieurs bugs.** Ils sont tous dans le dossier
`src/`. Aucun bug n'est caché dans `index.html`, `vite.config.js` ou les
dépendances.

Votre mission : diagnostiquer, expliquer, corriger.

---

## Mise en route

```bash
npm install
npm run dev        # http://localhost:5173
```

Aucune clé d'API n'est nécessaire : la PokéAPI est publique et gratuite.

### Ce qui est déjà en place

- Une grille paginée de Pokémon avec bouton « Charger plus »
- Un filtre par type et une recherche par nom
- Un panneau de détail (stats, types) sur la droite
- Un système de favoris persisté en `localStorage`, avec un onglet dédié

### Point important avant de commencer

**`<StrictMode>` double certains effets en développement.** Vous verrez
parfois une requête partir deux fois dans l'onglet Réseau au chargement :
c'est un comportement volontaire de React pour débusquer les effets mal
écrits, pas un bug à corriger.

**Certains bugs en masquent d'autres.** Traitez les tickets dans l'ordre :
tant que le ticket #1 n'est pas corrigé, les tickets #2 et #6 ne sont pas
vraiment observables.

---

## Travail attendu

1. Créez une branche depuis `main` :
   ```bash
   git checkout -b fix/rattrapage-<votre-nom>
   ```
2. **Un commit par bug corrigé**, format imposé :
   ```
   <NOM_DE_BRANCHE> <GITMOJI> <description courte>
   ```
   exemple : `fix/rattrapage-dupont 🐛 corrige la mutation en place dans usePokemonList`
3. Créez un fichier `ANALYSE.md` à la racine. Pour **chacun des bugs** :
   - le numéro du ticket ;
   - le fichier et la ligne concernés ;
   - **la cause réelle** (pas le symptôme : _pourquoi_ le code produit ce
     comportement) ;
   - la correction apportée et pourquoi elle est correcte ;
   - comment vous avez vérifié que c'est corrigé (les étapes de reproduction
     du ticket, rejouées après correction).
4. Poussez la branche et ouvrez une Pull Request vers `main`.

### Règles

- Corrigez **au minimum** : pas de réécriture de l'architecture, pas de
  changement de librairie, pas de passage à Redux/Zustand. Chaque correctif
  doit tenir en quelques lignes.
- L'interface publique ne change pas : mêmes composants, mêmes props.
- Les commentaires et la structure des fichiers restent en place.
- Aucun bug ne se corrige en supprimant une fonctionnalité.

### Évaluation

| Critère                                                             | Points |
| ------------------------------------------------------------------- | ------ |
| Bugs corrigés et fonctionnels                                       | 8      |
| Qualité de l'analyse dans `ANALYSE.md` (cause réelle, pas symptôme) | 8      |
| Hygiène git (branche, 1 commit par bug, messages conformes)         | 2      |
| Correctifs minimaux et propres                                      | 2      |
| **Total**                                                           | **20** |

Un bug corrigé mais mal expliqué ne vaut que la moitié des points. Un bug
« corrigé » par un contournement (try/catch qui avale l'erreur, valeur codée
en dur, `key={Math.random()}`, etc.) ne vaut aucun point.

---

## Les tickets

> Les tickets décrivent des **symptômes** observés dans l'application. Ils ne
> disent pas où est le bug : c'est votre travail.

### Ticket #1 — « La grille reste vide » (critique)

L'onglet Réseau montre une réponse `200` avec les données des Pokémon, la
console ne signale aucune erreur, mais rien ne s'affiche jamais à l'écran.

```
1. npm run dev, ouvrir l'app
2. Ouvrir les DevTools → onglet Réseau
3. Observer les requêtes vers pokeapi.co/api/v2/pokemon/... : statut 200
```

Attendu : les 20 premiers Pokémon s'affichent dans la grille.
Observé : la grille reste vide indéfiniment, malgré des requêtes réussies.

---

### Ticket #2 — « Le panneau de détail n'affiche jamais le bon Pokémon »

_(reproductible une fois le ticket #1 corrigé)_

Cliquez sur un Pokémon de la grille (différent de Bulbizarre, affiché par
défaut). Puis cliquez sur un second Pokémon, différent du premier.

Attendu : le panneau de droite affiche les statistiques du Pokémon cliqué.
Observé : le panneau affiche toujours Bulbizarre (#001), quel que soit le
Pokémon cliqué.

---

### Ticket #3 — « Les favoris disparaissent au rechargement de la page »

Ajoutez 2 ou 3 Pokémon aux favoris (icône étoile sur la carte), vérifiez
l'onglet « Favoris », puis rechargez la page (F5).

Attendu : les favoris sont toujours présents après rechargement.
Observé : la liste de favoris est vide après rechargement. En inspectant
DevTools → Application → Local Storage → `pokedex-favorites` **avant même de
recharger**, la valeur stockée ne correspond déjà pas à ce qui est affiché à
l'écran.

---

### Ticket #4 — « Retirer un favori supprime le mauvais Pokémon »

Ajoutez au moins 3 Pokémon dont les noms ne sont pas déjà en ordre
alphabétique (par exemple : Pikachu, Bulbizarre, Dracaufeu). Dans l'onglet
Favoris, cliquez sur « Retirer » sur le premier élément **affiché**.

Attendu : le Pokémon sur lequel vous avez cliqué « Retirer » disparaît.
Observé : un autre Pokémon que celui affiché disparaît de la liste.

---

### Ticket #5 — « L'app reste bloquée sur "Chargement..." si le réseau est coupé » (critique)

Dans les DevTools → onglet Réseau, passez le mode réseau sur « Offline »
(hors ligne), puis cliquez sur « Charger plus ».

Attendu : un message d'erreur explicite s'affiche, le reste de l'application
reste utilisable.
Observé : le bouton reste bloqué sur « Chargement... » indéfiniment, sans
message ni moyen de réessayer autrement qu'en rechargeant la page.

---

### Ticket #6 — « Le bouton "Charger plus" recharge toujours les 20 premiers Pokémon »

_(reproductible une fois le ticket #1 corrigé)_

Une fois la grille visible, cliquez plusieurs fois de suite sur « Charger
plus ».

Attendu : de nouveaux Pokémon s'ajoutent à chaque clic (21 à 40, puis 41 à
60...).
Observé : les 20 mêmes Pokémon (les 20 premiers) sont rechargés à chaque
clic.

---

## Rendu

- Branche poussée : `fix/rattrapage-<votre-nom>`
- 6 commits, un par bug, messages au format imposé
- `ANALYSE.md` complet à la racine
- Pull Request ouverte vers `main`
