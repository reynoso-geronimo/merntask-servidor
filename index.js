const express =require('express');
const conectarDB= require('./config/db');
const cors = require('cors')
// crear el servidor
const app =express();

//conectar a la base de datos
conectarDB()

//habilitar cors
app.use(cors({ credentials: true, origin: true }));
app.options("*", cors());
 
//PUERTO DE LA APP
const port = process.env.PORT || 4000;
 
//ARRANCAR EL SERV.
app.listen(port, () => {
  console.log(`serv. corriendo en el puerto ${port} `);
});
//

//import rutas

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))
//definir la pagina principal


