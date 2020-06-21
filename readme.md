# Pet4You API

## How to setup

Start docker-compose
```
docker-compose up -d
```

Dump database to MySQL
```
docker-compose exec mysql bash -c 'mysql -u root -p < /opencart.sql'
```

Fix root access error
```
docker-compose exec mysql bash -c 'mysql -u root -p < /setup.sql'
```

Start api service
```
yarn
yarn start:dev
```