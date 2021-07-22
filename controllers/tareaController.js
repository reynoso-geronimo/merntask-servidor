const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const { validationResult } = require("express-validator");

//crea una nueva tarea

exports.crearTarea = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }
  //extraer el proyecto y comprobar si existe
  //extraer el proyecto

  try {
    const { proyecto } = req.body;
    const exsiteProyecto = await Proyecto.findById(proyecto);
    if (!exsiteProyecto) {
      return res.status(404).json({ msg: "proyecto no encontrado" });
    }
    //revisar si el proyecto actual pertenece al usuario autenticado

    if (exsiteProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json("no autorizado");
    }

    //creamos la tarea
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
//obtiene las tareas por proyecto

exports.obtenerTareas = async (req, res) => {
  try {
    const { proyecto } = req.query;
    const exsiteProyecto = await Proyecto.findById(proyecto);
    if (!exsiteProyecto) {
      return res.status(404).json({ msg: "proyecto no encontrado" });
    }
    //revisar si el proyecto actual pertenece al usuario autenticado

    if (exsiteProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json("no autorizado");
    }
    //obtener las tareas por proyecto
    const tareas = await Tarea.find({ proyecto }).sort({creado:-1});
    res.json({ tareas });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
exports.actualizarTarea = async (req, res) => {
  try {
    const { proyecto, nombre, estado } = req.body;

    //revisar si la tarea existe

    let tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ msg: "no existe esta tarea" });
    }

    const exsisteProyecto = await Proyecto.findById(proyecto);

    //revisar si el proyecto actual pertenece al usuario autenticado

    if (exsisteProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json("no autorizado");
    }

    //crear un objeto con la nueva info
    const nuevaTarea = {};
    
      nuevaTarea.nombre = nombre;
      nuevaTarea.estado = estado;
    
    tarea = await Tarea.findOneAndUpdate({ _id: req.params.id }, nuevaTarea, {
      new: true,
    });
    res.json({ tarea });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};


//elimina una trea
exports.eliminarTarea = async (req, res) => {
  try {
    const { proyecto} = req.query;

    //revisar si la tarea existe

    let tarea = await Tarea.findById(req.params.id);
    if (!tarea) {
      return res.status(404).json({ msg: "no existe esta tarea" });
    }
    //extraer proyecto
    const exsisteProyecto = await Proyecto.findById(proyecto);

    //revisar si el proyecto actual pertenece al usuario autenticado

    if (exsisteProyecto.creador.toString() !== req.usuario.id) {
      return res.status(401).json("no autorizado");
    }
    //eliminar la tarea
    await Tarea.findOneAndRemove({_id: req.params.id})
    res.json({msg:"Tarea Eliminada"})
   
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};
