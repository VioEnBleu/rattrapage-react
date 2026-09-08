Ticket 1. Grille vide. Le problème se trouvait dans src/hooks/usePokemonList.js ligne 14. L'appel API aboutissait bien mais il manquait l'instruction setPokemons pour mettre à jour l'état React. J'ai ajouté l'instruction et les données s'affichent désormais correctement au lancement de l'application.

Ticket 2. Panneau de détail figé. Fichier src/components/PokemonDetail.jsx ligne 9. Le hook useEffect de récupération des données avait un tableau de dépendances vide, ce qui bloquait toute mise à jour après le montage initial. J'ai ajouté la variable id en dépendance. Le composant se met bien à jour au clic sur un nouveau Pokemon.

Ticket 3. Perte des favoris. Fichier src/hooks/useFavorites.js lignes 11 a 13. Le useEffect gérant le localStorage avait également un tableau de dépendances vide, empêchant la sauvegarde après toute modification de la liste. J'ai ajouté la variable favorites aux dépendances. Le rechargement de la page conserve bien les favoris ajoutés.

Ticket 4. Mauvaise suppression de favori. Fichiers FavoritesView.jsx ligne 14 et useFavorites.js lignes 20 a 23. La vue passait l'index visuel du tableau trié pour la suppression, mais le hook appliquait un splice avec cet index sur le tableau d'origine qui n'était pas trié. J'ai modifié la logique pour utiliser l'identifiant unique du Pokemon avec la méthode filter au lieu de splice. La suppression cible le bon élément.

Ticket 5. Blocage hors ligne. Fichier src/hooks/usePokemonList.js lignes 13 a 17. La promesse de requete ne possedait pas de bloc catch. En cas de coupure reseau, la variable loading restait bloquée sur la valeur true indéfiniment sans avertissement. J'ai rajouté un catch avec une alerte utilisateur et une reinitialisation de l'état de chargement. Le bouton se débloque correctement lors d'un test sans réseau.

Ticket 6. Pagination bloquée. Fichier src/hooks/usePokemonList.js lignes 11 a 18. Le hook useCallback de chargement créait une stale closure à cause d'un tableau de dépendances vide, figeant la variable offset à la valeur 0. J'ai ajouté les variables offset et pokemons dans les dépendances pour rafraîchir le contexte. La suite de la liste se charge sans problème lors du clic.

//https://c.tenor.com/ja7EabjajrYAAAAd/tenor.gif