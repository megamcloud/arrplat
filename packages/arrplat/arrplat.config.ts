export default {
  name: 'Arrplat',
  host: '0.0.0.0',
  port: 8080,
  db: {
    "type": "mysql",
    "host": "39.106.39.85",
    "port": 3306,
    "username": "arrplat",
    "password": "a123456",
    "database": "arrplat",
    "synchronize": true,
    "autoSchemaSync": false,
    "logging": false,
    "entities": [
      "src/entity/*.ts"
    ]
  }
}
