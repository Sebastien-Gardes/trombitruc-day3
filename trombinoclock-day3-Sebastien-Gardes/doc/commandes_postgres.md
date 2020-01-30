## Se connecter au système en tant que postgres

`sudo -i -u postgres`

## Se connecter au serveur postgres (en tant que postgres)

`psql`

## quelques commandes postgres

- `\l` pour lister les bases de données du serveur
- `\dt` pour lister les tables de la base sélectionnée
- `\du` pour lister les utilisateurs (et leurs permissions)
- `\q` pour quitter (ou ctrl+D)
- `\d nomDeLaTable` pour afficher la structure d'une table

## Premières opérations (à refaire pour chaque nouveau projet)

- créer un nouvel utilisateur: `CREATE USER login WITH PASSWORD 'motdepasse' LOGIN;`
> La commande générique , c'est `CREATE USER <nom> WITH <serie de droits>;`

- créer une nouvelle base de données, en déclarant son propriétaire: `CREATE DATABASE nomDeLaBase OWNER nomDuUser;`

- Note : "propriétaire" veut dire que l'utilisateur en question aura tous les droits sur la base en question (donc créer des tables, supprimer des tables, insérer des données, etc...)

## Pour executer les instruction d'un fichier sql

`psql -U username -f chemin/vers/le/fichier.sql`
