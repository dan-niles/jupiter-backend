# Jupiter HRM

## Background

This application was developed for the group project of CS3043: Database Systems.

### Problem Statement

Jupiter Apparels is a multinational corporation with over 1000 employees. Currently the branches of Jupiter are at Sri Lanka, Bangladesh and Pakistan. Although they use SAP as the ERP to manage key activities of the organization, the management has felt that SAP is too much of an overheard in a management perspective. On one hand it requires specifically trained SAP engineers to do the slightest change while training management employee to use the system is a hassle. Hence, Jupiter has requested our team come up with a easy to use human resource management system as the initial phase.

Read more [here](project-description.pdf).

## The Stack

The application uses MySQL for the database. The frontend is built using React and the backend is made using Node.js and Express.

## Application Development Process

### Setting Up

After cloning the repository,

1. Open the folder and run `npm install`.
2. Open mysql shell in the same folder jupiter-hrm-be (if using vscode use the below terminal) and type

```
mysql> SOURCE hrm_schema.sql
```

3. Define a file named '.env' in the main folder and in that file you need to include following key value pairs.

   1. The hostname, username, password and port number to connect to your internal database

   ```
   MYSQL_HOST=your_host_name
   MYSQL_USERNAME=your_username
   MYSQL_PASSWORD=your_password
   MYSQL_PORT=your_port_number
   ```

   2. Name of the databse

   ```
   DATABASE_NAME=db_name
   ```

   3. Port to run the server (Use port **8080** or **3001** since the frontend runs on port **3000**)

   ```
   PORT=port_number
   ```

4. Type `npm start` in the terminal and start the server.

## Contribution

Group members:

- Kobinath A. (200308F)
- Muaadh M.N.M. (200401J)
- Mushraf M.I.M. (200404V)
- Niles D.A. (200421U)
- Rajeevan Y. (200501P)
