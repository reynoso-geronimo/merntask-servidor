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
// Habilitar express.json
app.use( express.json({ extended: true }));
 
//PUERTO DE LA APP
const PORT = process.env.PORT || 4000;
 




//import rutas

app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyectos'))
app.use('/api/tareas', require('./routes/tareas'))
//definir la pagina principal
//ARRANCAR EL SERV.

app.listen(PORT,()=>{
  console.log(`El servidor esta funcionando en el puerto ${PORT}`)
})

