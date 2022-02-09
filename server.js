
const express = require('express');
const app = express();
const pg = require("pg"); 


const client = new pg.Client('postgres://localhost/familyInfo'); // could also just pass in line 49 itself w/o variable 

app.get('/', async (req, res, next) => {
    try { 
        const data = await client.query(`SELECT * FROM family`);
        const relatives = data.rows;
        res.send(`
        <html>
            <body>
                <h1> Family Info </h1>
                <ul> 
                    ${relatives.map(relative => `
                    <li> 
                        <a href='/relatives/${relative.id}'>
                        ${relative.relationship} 
                        </a>
                    </li>
                    `).join('')} 
                </ul>
            </body>
        </html>
        `);
    } 
    catch (error) {
        console.log(error);
        await client.end();
    }
});

app.get('/relatives/:id', async (req, res, next) => {
    try{
       const data = await client.query(`SELECT * FROM family WHERE id = $1;`, [req.params.id]);
       const relatives = data.rows;
        res.send(`
        <html>
            <body>
                <h1> Who is it? </h1>
                <div> 
                     ${relatives.map(relative => `${relative.name}`)} 
                </div>
                <p><a href='/'> Return To Family Info </a></p>
            </body>
        </html>
        `) 
    }
    catch (error){
        console.log(error);
    }
});

const port = 3000;

const connector = async () => {
    try {
       await client.connect();
       console.log('Successfully connected!')
       const data = await client.query(`SELECT * FROM family;`) // we can use SQL directly in the server file instead of writing psql in the terminal!
       console.log(data.rows); 
       app.listen(port, () => console.log(`listening on port ${port}`))
    }
    catch (error) {
        console.log(error);
        await client.end();
    }
}

connector();


