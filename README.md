# Jupiter HRM

## Background

This application was developed for the group project of CS3043: Database Systems.

### Problem Statement

Jupiter Apparels is a multinational corporation with over 1000 employees. Currently the branches of Jupiter are at Sri Lanka, Bangladesh and Pakistan. Although they use SAP as the ERP to manage key activities of the organization, the management has felt that SAP is too much of an overheard in a management perspective. On one hand it requires specifically trained SAP engineers to do the slightest change while training management employee to use the system is a hassle. Hence, Jupiter has requested our team come up with a easy to use human resource management system as the initial phase.

Read more [here](project-description.pdf).

## The Stack

The application uses MySQL for the database. The frontend is built using React and the backend is made using Node.js and Express.

## Contribution

Group 10 members:

- Kobinath A. (200308F)
- Muaadh M.N.M. (200401J)
- Mushraf M.I.M. (200404V)
- Niles D.A. (200421U)
- Rajeevan Y. (200501P)

# Application Development Process

## Setting Up

After cloning the

1. open the folder and run `npm install`.
2. Open mysql shell in the same folder jupiter-hrm-be (if using vscode use the below terminal) and type

```
mysql> SOURCE hr_system_schema.sql
```

3. define a file named '.env' in the main folder and in that file you need to include following three key value pairs.

   1. connection string of your internal database.

   ```
   MYSQL_CONNECTION_URI=mysql://username:password@localhost:3306/database_name
   ```

   2. name of the databse

   ```
   DATABASE_NAME=db_name
   ```

   3. port to run the server. (since react uses 3000 as the default port number i recommend to use any other port number)

   ```
   PORT=port_number
   ```

4. type `npm start` in the terminal and start the server.
