# How to send requests to the API
Follow these instructions to be able to send requests to the server and perform CRUD operations of the database

## .env Setup
Create an .env file in the backend-breast-cancer-hub folder. It should just be called ".env"

## Database URI Variable
In the .env file DM one of the leads for the connection string to the database, and paste it into the .env file as:
`DATABASE_URL=[connection string]`

## Starting the Server

cd into the backend-breast-cancer-hub folder and type the following into the terminal:
`npm run dev`
This starts the server on your local machine at http://localhost:3000/.

You are now ready to send the API requests!
