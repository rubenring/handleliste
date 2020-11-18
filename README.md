# handleliste

Handleliste app

## Database

### Set ut database locally

Pull recent image of mongodb

```
docker pull mongo
```

Create docker image

```
docker run -p -d 27017-27019:27017-27019 --name <container-name> mongo:<version>
```

Connect to the container and open bash

```
docker exec -it <container-name> bash
```

Launch mongodb shell client inside container

```
mongo
```

show and add new database in container

```
show dbs
use <databasename>
```

OPTIONAL:
Create admin user in shell

```
use <databasename>

db.createUser(
  {
    user: "<user>",
    pwd: "<password>",
    roles: [ { role: "userAdminAnyDatabase", db: "<databasename>" } ]
  }
)
```

This will create a database with the following variables:

- url: mongodb://localhost:27018/"databasename"
- Username:"user"
- Password:"password"

## Api

## Client
