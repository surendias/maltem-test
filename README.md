# Welcome!

I have completed the assignment as instructed. In order to test this please follow the steps below.

- I have used sqlite with prisma to create the schema and database. You can switch the connection string on backend/schema.prisma file if you want to connect to mysql or any other database.

# Structure

- I have created the app in two parts.

1. Backend - this contains the nodejs express server with the sqlite setup.
2. Frontend - this is the frontend of the application created using create-react-app. Using MiUI as instructed and AG Grid for table. I have used Redux toolkit for ease of implementing redux.

## Setup and Testing Steps

- Step 1 - Checkout the repo
- Step 2 - Make sure you have docker installed and setup.
- Step 3 - Run `docker-compose up --build` command to start the application.
- Step 4 - Go to http://localhost:3000 to test it out.

If you dont have docker installed do the following

- In the backend folder run `npm run seed` to seed the db with test data. (On docker this step is happening automatically)
- CD into backend and run `npm run dev`
- CD into frontend and run `npm run start`
