# Express TS Starter

Simple express TS starter!

## How to use?

```
$ npm install
$ npm run dev # run development!
```

## Scripts

```
$ npm run build # build typescript project
$ npm start # run in development mode
```

# Rent Car Management (API)

Rent car management API documentation

## Car Database Schema

<img src="https://github.com/DwikiCahyo/car_rent_management/assets/70952085/017be637-a71d-41c0-bdee-83572890d4bd" width="800" height ="500"/>


## API Reference

#### Accounnt for auth

| email               | passsword |
| :------------------ | :-------- |
| superadmin@mail.com | super123  |
| admin@mail.com      | admin123  |

#### Get all users (auth as superadmin or admin)

```http
  GET /users
```

#### Login

```http
  POST /login
```

| Body         | Description (example value) |
| :----------- | :-------------------------- |
| `email`      | email (admin@mail.com)      |
| `passsword ` | password (admin123)         |

#### Register

```http
  POST /register
```

| Body         | Description (example value) |
| :----------- | :-------------------------- |
| `email`      | email (admin@mail.com)      |
| `passsword ` | password (admin123)         |

#### Update role (auth as superadmin)

```http
  PATCH /users/${id}
```

| Parameter | Description (example value)     |
| :-------- | :------------------------------ |
| `id`      | user id you want to change (14) |

| Body      | Description (example value) |
| :-------- | :-------------------------- |
| `role_id` | account role id (2)         |

#### Get all cars

```http
  GET /cars
```

| Query Parameter | Description (example value)   |
| :-------------- | :---------------------------- |
| `available`     | Car Available (true or false) |
| `capacity `     | Car Capacity (4)              |
| `date`          | available date (2023-11-11)   |
| `time`          | available time (10:00)        |

#### Get car by id

```http
  GET /cars/${id}
```

| Parameter | Type   | Description              |
| :-------- | :----- | :----------------------- |
| `id`      | `uuid` | use id to get car detail |

#### Create or add new car (Auth as superadmin or admin)

```http
  POST /cars
```

| Body           | Type       | Description (example value)                                 |
| :------------- | :--------- | :---------------------------------------------------------- |
| `plate`        | `string`   | plate car (LL-001) **Required**                             |
| `manufacture`  | `string`   | car manufacture (BMW) **Required**                          |
| `image`        | `text `    | car url ( /image/01) (upload image) **Required**            |
| `model`        | `string`   | car model (F16) **Required**                                |
| `type`         | `string`   | car type (sedan) **Required**                               |
| `description`  | `string`   | car description (bla bla) **Required**                      |
| `transmission` | `string`   | car transmission mode (manual) **Required**                 |
| `capacity`     | `string`   | car capacity (4) (sedan) **Required**                       |
| `rentPerDay`   | `integer`  | car rental cost per day (100000) **Required**               |
| `availableAt`  | `datetime` | car availablty date (2023-11-09T10:49:14.388Z) **Required** |
| `available`    | `boolean`  | car availablty (true or false) **Required**                 |
| `year`         | `integer`  | car production year (2023) **Required**                     |
| `options`      | `jsonb`    | car options ([bla, bla, bla]) **Required**                  |
| `specs`        | `jsonb`    | car specifications ([bla, bla, bla]) **Required**           |

#### Update existing car (Auth as superadmin or admin)

```http
  PATCH /cars/${id}
```

| Parameter | Type   | Description              |
| :-------- | :----- | :----------------------- |
| `id`      | `uuid` | use id to get car detail |

| Body           | Type       | Description (example value)                    |
| :------------- | :--------- | :--------------------------------------------- |
| `plate`        | `string`   | plate car (LL-001)                             |
| `manufacture`  | `string`   | car manufacture (BMW)                          |
| `image`        | `text `    | car url ( /image/01) (upload image)            |
| `model`        | `string`   | car model (F16)                                |
| `type`         | `string`   | car type (sedan)                               |
| `description`  | `string`   | car description (bla bla)                      |
| `transmission` | `string`   | car transmission mode (manual)                 |
| `capacity`     | `string`   | car capacity (4) (sedan)                       |
| `rentPerDay`   | `integer`  | car rental cost per day (100000)               |
| `availableAt`  | `datetime` | car availablty date (2023-11-09T10:49:14.388Z) |
| `available`    | `boolean`  | car availablty (true of false)                 |
| `year`         | `integer`  | car production year (2023)                     |
| `options`      | `jsonb`    | car options ([bla, bla, bla])                  |
| `specs`        | `jsonb`    | car specifications ([bla, bla, bla])           |

#### Delete existing car by car id (Auth as superadmin or admin)

```http
  DELETE /cars/${id}
```

| Parameter | Type   | Description              |
| :-------- | :----- | :----------------------- |
| `id`      | `uuid` | use id to get car detail |
