const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'postgres',
    database: process.env.DB_NAME || 'challenge',
});

app.get('/feed', async (req, res) => {
    const client = await pool.connect();
    try {
        const usersRes = await client.query('SELECT * FROM users');
        const users = usersRes.rows;
        
        const feed = [];

        for (const user of users) {
             const postsRes = await client.query('SELECT * FROM posts WHERE user_id = $1', [user.id]);
             feed.push({ ...user, posts: postsRes.rows });
        }

        res.json({ items: feed.length, feed });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
});

app.listen(port, () => {
    console.log(`Service runing on port ${port}`);
});
