const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;
const mysql = require("mysql2/promise");
const { raw } = require("express");
const bcrypt = require("bcrypt");

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
      const hash = await bcrypt.hash(req.body.contrasena, 10);

      await connection.execute(
        ` 
        INSERT INTO usuario(correo, username, contrasena)
        VALUES(?,?,?)`,
        //me lo manda el front------------NO HACER CONCATENACION porque es vulnerable
        [req.body.correo, req.body.username, hash]
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
          WHERE username=? `,
        //me lo manda el front------------NO HACER CONCATENACION porque es vulnerable
        [req.body.username]
      );
      //await hace que se bloquee hasta que reciba los datos

      if (rows.length === 0) {
        return res.status(401).send();
      }

      const result = await bcrypt.compare(
        req.body.contrasena,
        rows[0].contrasena
      );

      console.log(result);

      if (rows.length === 0 || !result) {
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
      res.send();
    });

    //ruta para mis paletas
    app.get("/paleta/usuario/:idUsuario", async (req, res) => {
      const [allPaletas] = await connection.execute(
        ` 
        SELECT *
        FROM paleta
        WHERE idUsuario=?`,
        [req.params.idUsuario]
      );
      const paletasFinales = [];
      console.log(allPaletas);
      for (let index = 0; index < allPaletas.length; index++) {
        const { idPaleta } = allPaletas[index];

        const [paletas] = await connection.execute(
          ` 
          SELECT *
          FROM paleta
          WHERE idPaleta=?`,
          [idPaleta]
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
          [idPaleta]
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
          //se obtiene de cada iteración del loop
          [idPaleta]
        );
        paleta.categorias = categorias;
        paleta.colores = colores;
        paletasFinales.push(paleta);
      }
      //se mandan todas las paletas al front
      res.send(paletasFinales);
    });

    //me traigo todas la paletas esta se usa en explorar
    app.get("/paleta/explorar/:idUsuario", async (req, res) => {
      const [allPaletas] = await connection.execute(
        ` 
        SELECT *
        FROM paleta`
      );
      const paletasFinales = [];

      for (let index = 0; index < allPaletas.length; index++) {
        const { idPaleta } = allPaletas[index];

        const [paletas] = await connection.execute(
          ` 
          SELECT *
          FROM paleta
          WHERE idPaleta=?`,
          [idPaleta]
        );
        if (paletas.length < 1) {
          return res.status(404).send();
        }
        const paleta = paletas[0];

        const [favoritos] = await connection.execute(
          ` 
          SELECT *
          FROM favorito
          WHERE idPaleta=? AND idUsuario=?`,
          [idPaleta, req.params.idUsuario]
        );
        if (favoritos.length < 1) {
          paleta.favorito = false;
        } else {
          paleta.favorito = true;
        }
        let [colores] = await connection.execute(
          ` 
          SELECT *
          FROM color
          WHERE idPaleta=?`,
          [idPaleta]
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
          //se obtiene de cada iteración del loop
          [idPaleta]
        );
        paleta.categorias = categorias;
        paleta.colores = colores;
        paletasFinales.push(paleta);
      }
      //se mandan todas las paletas al front
      res.send(paletasFinales);
    });

    //borra las paletas de colores indica desde del front
    //los delet NO tiene body tienen params
    app.delete("/paleta/:idPaleta", async (req, res) => {
      await connection.execute(
        ` 
    DELETE FROM color
    WHERE idPaleta=?
    `,
        [req.params.idPaleta]
      );

      await connection.execute(
        ` 
    DELETE FROM paletacategoria
    WHERE idPaleta=?
    `,
        [req.params.idPaleta]
      );

      await connection.execute(
        ` 
  DELETE FROM paleta
  WHERE idPaleta=?
  `,
        [req.params.idPaleta]
      );

      res.send();
    });

    app.put("/paleta/favorito/", async (req, res) => {
      if (req.body.favorito) {
        await connection.execute(
          ` 
        INSERT INTO favorito(idPaleta,idUsuario)
        VALUES(?,?)`,
          //me lo manda el front------------NO HACER CONCATENACION porque es vulnerable
          [req.body.idPaleta, req.body.idUsuario]
        );
      } else {
        await connection.execute(
          ` 
    DELETE FROM favorito
    WHERE idPaleta=? AND idUsuario=?
    `,
          [req.body.idPaleta, req.body.idUsuario]
        );
      }
      res.send();
    });

    //me traigo las paletas favs
    app.get("/paleta/favoritos/:idUsuario", async (req, res) => {
      const [allPaletas] = await connection.execute(
        ` 
        SELECT *
        FROM favorito
        WHERE idUsuario=?`,
        [req.params.idUsuario]
      );
      const paletasFinales = [];

      for (let index = 0; index < allPaletas.length; index++) {
        const { idPaleta } = allPaletas[index];

        const [paletas] = await connection.execute(
          ` 
          SELECT *
          FROM paleta
          WHERE idPaleta=?`,
          [idPaleta]
        );
        if (paletas.length < 1) {
          return res.status(404).send();
        }
        const paleta = paletas[0];

        const [favoritos] = await connection.execute(
          ` 
          SELECT *
          FROM favorito
          WHERE idPaleta=? AND idUsuario=?`,
          [idPaleta, req.params.idUsuario]
        );
        if (favoritos.length < 1) {
          paleta.favorito = false;
        } else {
          paleta.favorito = true;
        }
        let [colores] = await connection.execute(
          ` 
          SELECT *
          FROM color
          WHERE idPaleta=?`,
          [idPaleta]
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
          //se obtiene de cada iteración del loop
          [idPaleta]
        );
        paleta.categorias = categorias;
        paleta.colores = colores;
        paletasFinales.push(paleta);
      }
      //se mandan todas las paletas al front
      res.send(paletasFinales);
    });

    app.listen(port, () => {
      console.log(`Color Master app listening at http://localhost:${port}`);
    });
  });
