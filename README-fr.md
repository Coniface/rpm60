# Exercice

Vous devez requêter une api qui autorise 60 requêtes MAX par MINUTES.
On doit effectuer la requête suivante avec un paramètre de la requête précédente.

Dans le script que vous devez développer, vous ne savez pas combien de requêtes vous allez devoir faire car il se peut que vous deviez faire qu’une seule requête comme 1500 (ex: récupérer une liste via une pagination).

Chaque requête peut prendre entre 300ms et 2s (simulation d’une vraie requête). Le script doit lancer la première requête au démarrage et ne doit pas s’éteindre avant d’avoir effectué la dernière requête !
