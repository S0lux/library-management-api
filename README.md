
# Library Management API

A simple API built using NextJS
## API Reference

#### Login

```http
  POST /api/login
```
| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | **Required**. The employee's username |
| `password` | `string` | **Required**. The employee's password |

#### Get a book [UNFINISHED]

```http
  GET /api/book
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Token from `/api/login` |



## Run Locally

Clone the project

```bash
  git clone https://github.com/S0lux/library-management-api
```

Go to the project directory

```bash
  cd library-management-api
```

Install dependencies

```bash
  npm install
```

Edit `.env.example` file and rename it to `.env`
```bash
  DATABASE_URL="POSTGRESQL CONNECTION STRING GOES HERE"
  JWT_SECRET="JWT SECRET GOES HERE"
```

Start the server

```bash
  npm run dev
```

