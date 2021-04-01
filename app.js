const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const mysql = require("mysql2/promise");
const { raw } = require("express");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(
  cors({
    origin: function (origin, callback) {
      /*if(!origin) 
          return callback(null, true);
        if(allowedOrigins.indexOf(origin) === -1) {
          var msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
          return callback(msg, false);
        }*/
      return callback(null, true);
    },
  })
);

// create the connection to database
mysql
  .createConnection({
    //solo porque esta en mi computadora
    host: "localhost",
    user: "root",
    password: "root",
    database: "color_master",
  })
  .then((connection) => {
    //asincrono es cuando se tarda-------async sirve para no agregar mil then
    app.post("/usuario", async (req, res) => {
      //hacer ese arreglo hace que sea mas facil acceder porque descompone el arreglo de arreglos
      const [rows] = await connection.execute(
        ` 
            SELECT username
            FROM usuario
            WHERE username=?`,
        //me lo manda el front------------NO HACER CONCATENACION porque es vulnerable
        [req.body.username]
      );
      //await hace que se bloquee hasta que reciba los datos
      if (rows.length > 0) {
        return res.status(409).send();
      }

      await connection.execute(
        ` 
        INSERT INTO usuario(correo, username, contrasena)
        VALUES(?,?,?)`,
        //me lo manda el front------------NO HACER CONCATENACION porque es vulnerable
        [req.body.correo, req.body.username, req.body.contrasena]
      );
      const [rows2] = await connection.execute(
        ` 
            SELECT idUsuario
            FROM usuario
            WHERE username=?`,
        //me lo manda el front------------NO HACER CONCATENACION porque es vulnerable
        [req.body.username]
      );
      const usuario = {
        username: req.body.username,
        idUsuario: rows2[0].idUsuario,
      };
      res.status(201).send({ usuario });
    });

    app.post("/login", async (req, res) => {
      //hacer ese arreglo hace que sea mas facil acceder porque descompone el arreglo de arreglos
      const [rows] = await connection.execute(
        ` 
          SELECT *
          FROM usuario
          WHERE username=? and contrasena=?`,
        //me lo manda el front------------NO HACER CONCATENACION porque es vulnerable
        [req.body.username, req.body.contrasena]
      );
      //await hace que se bloquee hasta que reciba los datos
      if (rows.length === 0) {
        return res.status(401).send();
      }

      //variables como en bd
      const usuario = {
        username: rows[0].username,
        idUsuario: rows[0].idUsuario,
      };

      res.status(200).send({ usuario });
    });

    app.post("/paleta", async (req, res) => {
      await connection.execute(
        ` 
      INSERT INTO paleta(nombre, idUsuario)
      VALUES(?,?)`,
        //me lo manda el front------------NO HACER CONCATENACION porque es vulnerable
        [req.body.nombre, req.body.idUsuario]
      );

      const [idPaletas] = await connection.execute(` 
      SELECT idPaleta
      FROM paleta
      ORDER BY idPaleta desc`);

      const idPaleta = idPaletas[0].idPaleta;

      for (let index = 0; index < req.body.colores.length; index++) {
        console.log(idPaleta);
        await connection.execute(
          ` 
        INSERT INTO color(hexadecimal, idPaleta)
        VALUES(?,?)`,
          //me lo manda el front------------NO HACER CONCATENACION porque es vulnerable
          [req.body.colores[index].color, idPaleta]
        );
      }

      for (let index = 0; index < req.body.categorias.length; index++) {
        await connection.execute(
          ` 
        INSERT INTO paletaCategoria(idCategoria, idPaleta)
        VALUES(?,?)`,
          //me lo manda el front------------NO HACER CONCATENACION porque es vulnerable
          [req.body.categorias[index].idCategoria, idPaleta]
        );
      }
      res.send({
        idPaleta: idPaleta,
      });
    });
    app.get("/paleta/:idPaleta", async (req, res) => {
      const [paletas] = await connection.execute(
        ` 
        SELECT *
        FROM paleta
        WHERE idPaleta=?`,
        [req.params.idPaleta]
      );
      if (paletas.length < 1) {
        return res.status(404).send();
      }
      const paleta = paletas[0];

      let [colores] = await connection.execute(
        ` 
        SELECT *
        FROM color
        WHERE idPaleta=?`,
        [req.params.idPaleta]
      );
      colores = colores.map((color) => {
        return {
          color: color.hexadecimal,
          locked: false,
        };
      });
      let [categorias] = await connection.execute(
        ` 
        SELECT *
        FROM paletacategoria 
        INNER JOIN categoria on categoria.idCategoria = paletacategoria.idcategoria
        WHERE idPaleta=?`,
        [req.params.idPaleta]
      );

      res.send({
        nombre: paleta.nombre,
        categorias,
        colores,
      });
    });
    app.put("/paleta", async (req, res) => {
      await connection.execute(
        ` 
      UPDATE paleta set nombre=?
      WHERE idPaleta=?
      `,
        [req.body.nombre, req.body.idPaleta]
      );
      await connection.execute(
        ` 
    DELETE FROM color
    WHERE idPaleta=?
    `,
        [req.body.idPaleta]
      );
      for (let index = 0; index < req.body.colores.length; index++) {
        await connection.execute(
          ` 
      INSERT INTO color(hexadecimal, idPaleta)
      VALUES(?,?)`,
          //me lo manda el front------------NO HACER CONCATENACION porque es vulnerable
          [req.body.colores[index].color, req.body.idPaleta]
        );
      }
      await connection.execute(
        ` 
    DELETE FROM paletacategoria 
    WHERE idPaleta=?
    `,
        [req.body.idPaleta]
      );
      for (let index = 0; index < req.body.categorias.length; index++) {
        await connection.execute(
          ` 
        INSERT INTO paletaCategoria(idCategoria, idPaleta)
        VALUES(?,?)`,
          //me lo manda el front------------NO HACER CONCATENACION porque es vulnerable
          [req.body.categorias[index].idCategoria, req.body.idPaleta]
        );
      }
      res.send()
    });

    app.listen(port, () => {
      console.log(`Color Master app listening at http://localhost:${port}`);
    });
  });
