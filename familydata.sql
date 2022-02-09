/*

Here's what I do: (screenshot at 19:17 in GH demo video)
1. I create my database using #psql in the terminal:

    - In terminal (in demo folder), type createdb (database name here) (I used demo_database)
    - then run command psql to open that up in the terminal (will see # after that)
    - type \c demo_database to connect to the database that I have just created.

2. Once I have created my db, I run this sql file to create the specific table inside 
    of it (but dropping it IF it exists). 

    - (from the terminal) execute this file (demo-data.sql) and place it inside of the database 
    - run \i (sql file path), this imports the data in this file into the database that we created with psql. 
        resulting in a table of data. 

3. Then the specific data will be inserted into the table. 

4. run TABLE "tablename"; to see table in the terminal. 
*/


DROP TABLE IF EXISTS family;

CREATE TABLE family (
    id SERIAL PRIMARY KEY,
    name character varying(100) NOT NULL,
    relationship character varying(100) NOT NULL
);

INSERT INTO family (name, relationship) VALUES
('Adrienne', 'Mom'),
('Kamal', 'Dad'),
('Annie Rose', 'Maternal Grandmother'),
('Howard', 'Maternal Grandfather'),
('Alice', 'Paternal Grandmother'),
('Fred', 'Paternal Grandfather'),
('Shante', 'Sister'),
('Jannah', 'Sister'),
('Daniyah', 'Sister'),
('AbdurRahman', 'Brother');

