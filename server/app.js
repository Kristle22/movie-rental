const express = require('express');
const app = express();
const port = 3003;

const cors = require("cors");
app.use(cors());
app.use(express.json({ limit: '10mb' }));
const mysql = require("mysql");

const md5 = require('js-md5');
const uuid = require('uuid');
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "movie_rental",
});

// ///////////////DO AUTH////////////
const doAuth = function (req, res, next) {
  if (0 === req.url.indexOf('/admin')) {
    // admin
    const sql = `
      SELECT
      name, role
      FROM users
      WHERE session = ?
  `;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length || results[0].role !== 'admin') {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login')) {
    next();
  } else {
    // Front
    const sql = `
    SELECT
    name, role
    FROM users
    WHERE session = ?
`;
    con.query(
      sql, [req.headers['authorization'] || ''],
      (err, results) => {
        if (err) throw err;
        if (!results.length) {
          res.status(401).send({});
          req.connection.destroy();
        } else {
          next();
        }
      }
    );
  }
}
app.use(doAuth)

//Auth
app.get("/login-check", (req, res) => {
  let sql;
  let requests;
  if (req.query.role === 'admin') {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ? AND role = ?
      `;
    requests = [req.headers['authorization'] || '', req.query.role];
  } else {
    sql = `
      SELECT
      name
      FROM users
      WHERE session = ?
      `;
    requests = [req.headers['authorization'] || ''];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    if (!result.length) {
      res.send({ msg: 'error' });
    } else {
      res.send({ msg: 'ok' });
    }
  });
});

app.post("/login", (req, res) => {
  const key = uuid.v4();
  const sql = `
  UPDATE users
  SET session = ?
  WHERE name = ? AND pass = ?
`;
  con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
    if (err) throw err;
    if (!result.affectedRows) {
      res.send({ msg: 'error', key: '' });
    } else {
      res.send({ msg: 'ok', key });
    }
  });
});

// ///////////////REQUESTS TO DB////////////////////
// READ & queries FRONT&BACK
app.get('/filmai', (req, res) => {
  let sql;
  let requests;
  if (!req.query['cat-id'] && !req.query['s']) {
    sql = `
    SELECT
    m.id, m.title, m.price, m.cat_id, c.title AS cat,
    rates, rate_sum, rating, GROUP_CONCAT(cm.id) AS coms_id, GROUP_CONCAT(time, '#', com, '-^-^-') AS coms, COUNT(com) AS com_count
    FROM movies AS m 

    LEFT JOIN categories AS c
    ON m.cat_id = c.id

    LEFT JOIN comments AS cm
    ON m.id = cm.film_id
    GROUP BY m.id
    `;
    requests = [];
  } else if (req.query['cat-id']) {
    sql = `
    SELECT
    m.id, m.title, m.price, m.rating, m.cat_id, c.title AS cat,
    rates, rate_sum, rating
    FROM movies AS m 

    LEFT JOIN categories AS c
    ON m.cat_id = c.id
    WHERE m.cat_id = ?
    
  `;
    requests = [req.query['cat-id']];
  } else {
    sql = `
    SELECT
    m.id, m.title, m.price, m.rating, m.cat_id, c.title AS cat,
    rates, rate_sum, rating
    FROM movies AS m 

    LEFT JOIN categories AS c
    ON m.cat_id = c.id
    WHERE m.title LIKE ?
    ORDER BY m.title
    `;
    requests = ['%' + req.query['s'] + '%'];
  }
  con.query(sql, requests, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// Simple READ
app.get('/kategorijos', (req, res) => {
  const sql = `
  SELECT
  c.id, c.title, m.cat_id AS catId 
  FROM categories AS c
  LEFT JOIN movies AS m
  ON c.id = m.cat_id
  GROUP BY c.title
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// CREATE BACK
app.post('/filmai', (req, res) => {
  const sql = `
  INSERT INTO movies
  (title, price, cat_id)
  VALUES (?, ?, ?)
  `;
  con.query(sql, [req.body.title, req.body.price, req.body.cat], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Naujas filmas sekmingai itrauktas', type: 'success' } });
  })
});
// CREATE CAT BACK
app.post('/kategorijos', (req, res) => {
  const sql = `
  INSERT INTO categories
  (title)
  VALUES (?)
  `;
  con.query(sql, [req.body.title], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Nauja kategorija sekmingai itraukta', type: 'success' } });
  })
});

// EDIT BACK
app.put('/filmai/:id', (req, res) => {
  const sql = `
  UPDATE movies 
  SET title = ?, price = ?, cat_id = ?
  WHERE id = ?
  `;
  con.query(sql, [req.body.title, req.body.price, req.body.cat, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Informacija apie filma sekmingai atnaujinta', type: 'info' } });
  });
});

// DELETE BACK
app.delete('/filmai/:id', (req, res) => {
  const sql = `
  DELETE FROM movies
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Filmas istrintas is saraso', type: 'danger' } });
  })
});

// DELETE CAT BACK
app.delete('/kategorijos/:id', (req, res) => {
  const sql = `
  DELETE FROM categories
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Katrgorija istrinta is saraso', type: 'danger' } });
  })
});

// ////////////////////COMMENTS/////////////////////
// CREATE Comments FRONT
app.post('/komentarai', (req, res) => {
  const sql = `
  INSERT INTO comments
  (com, film_id)
  VALUES (?, ?)
  `;
  con.query(sql, [req.body.comment, req.body.filmId], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Jusu komentaras issiustas!', type: 'success' } });
  })
});

// READ Comments BACK
app.get('/komentarai', (req, res) => {
  const sql = `
  SELECT
 GROUP_CONCAT(cm.id) AS coms_id, GROUP_CONCAT(time, '#', com, '-^-^-') AS coms, COUNT(com) AS com_count, film_id, m.title, m.price, m.rating
  FROM comments AS cm
  LEFT JOIN movies AS m
  ON cm.film_id = m.id
  GROUP BY m.id
  `;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

// DELETE comments BACK
app.delete('/komentarai/:id', (req, res) => {
  const sql = `
  DELETE FROM comments
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Komentaras istrintas is saraso', type: 'danger' } });
  })
});

///////DELETE/UPDATE PHOTO/STATUS/RATING////////////
// DELETE PHOTO BACK
app.delete('/nuotrauka/:id', (req, res) => {
  // const sql = `
  // UPDATE garment
  // SET photo = null
  // WHERE id = ?
  // `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Nuotrauka sekimingai istrinta', type: 'info' } });
  })
});

// EDIT STATUS BACK
app.put('/statusas/:id', (req, res) => {
  // const sql = `
  // UPDATE orders 
  // SET status = 1
  // WHERE id = ?
  // `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Uzsakymas patvirtintas', type: 'info' } });
  });
});

// EDIT reitings FRONT
app.put('/reitingai/:id', (req, res) => {
  const sql = `
  UPDATE movies 
  SET rates = rates + 1, rate_sum = rate_sum + ?, rating = rate_sum / rates
      where id = ?
        `;
  con.query(sql, [req.body.rate, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: 'Jusu balsas sekmingai iskaitytas. Aciu uz ivertinima!', type: 'info' } });
  });
});


app.listen(port, () => {
  console.log(`Peleda klauso porto ${port}`)
})