## Bonnes pratiques 
- on utilise les "double quotes" pour les noms des tables et des champs.
- on utilise les 'simple quotes' pour les chaines de charactères.
- on oublie pas le point virgule;

### toutes les promos, dans l'ordre alphabétique

```sql
SELECT * FROM "promo" ORDER BY "name" ASC;
```

### tous les étudiants, dans l'ordre alphabétique des noms de famille

```sql
SELECT * FROM "student" ORDER BY "last_name" ASC;
```

### Les noms et prénoms de tous les étudiants, sans doublons

```sql
SELECT DISTINCT first_name, last_name FROM "student" ORDER BY "last_name" ASC;
```

### tous les étudiants de la promo 135

```sql
SELECT * FROM "student" WHERE "promo_id" = 135;
```

### les étudiants dont le nom ou le prénom ressemble à "max"

```sql
SELECT * FROM "student" WHERE ("first_name" LIKE '%max%') OR ("last_name" LIKE '%max%');
```

```sql
INSERT INTO "student" ("id", "first_name","last_name","github_username", "promo_id") VALUES
(113,"Roberto","Ramon","null",5);
```

```sql
INSERT INTO promo ("id", "name", "github_organization") VALUES
(4, "Moulaga", "https://github.com/O-clock-Moulaga");
```

```sql
UPDATE student
SET ("first_name") = "Pedro"
WHERE "first_name"= "Ramon";
```

```sql
DELETE FROM "student"
WHERE "id"=4;
```