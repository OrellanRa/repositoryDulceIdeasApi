const express = require('express')
const mysqli = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const PORT = 3000

const conexion = mysqli.createConnection({
    host: 'db4free.net',
    database: 'bdappandroid',
    user: 'dulceideas',
    password: 'ellucianoesgay'

}
)

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})

conexion.connect(error=>{
    if(error)throw error
    console.log('Conexion exitosa, podemos seguir');
})

app.get('/', (req, res)=>{
    res.send('Api Conectado, base de datos ok')
}
)


//Tabla Cliente



//Consulta de Tabla
app.get('/Clientes/', (req, res)=>{

    const consulta = "SELECT * FROM bdappandroid.Clientes;"
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        const obj = {}
            
        if(resultado.length> 0) {
            obj.lista = resultado
            res.json(obj)
            
        }
            else {
                res.json('No hay registro de clientes')
            }

    })
})

//Consulta de cliente segun ID
app.get('/Clientes/:id', (req, res)=>{

    const {id} = req.params

    const consulta = `SELECT * FROM bdappandroid.Clientes WHERE Id_Cliente=${id};`
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        
            
        if(resultado.length> 0) {
            console.log("Individuo encontrado")
            res.json(resultado)
            
        }
            else {
                res.json('No hay registro de clientes')
            }
        
        
    
    })
})

//Agregar
//En clientes el id tendria que ser autoincrementable

app.post('/Clientes/agregar/', (req, res)=> {
    const clientes = {
        Id_Cliente:req.body.Id_Cliente,
        Nombre: req.body.Nombre,
        Correo: req.body.Correo


    }

    const consulta =`INSERT INTO bdappandroid.Clientes (Id_Cliente, Nombre,Correo) VALUES (?,?,?)`

    conexion.query(consulta,[
        clientes.Id_Cliente,
        clientes.Nombre,
        clientes.Correo],
        (error)=>{
            if(error) return console.error(error.message)
            res.json('Cliente se agrego a lista')
        }
    )
})
//Update
app.put('/clientesUpdate/:id',(req, res)=>{
    
    const{id}=req.params

    const {Nombre,Correo}=req.body
    const query = `UPDATE bdappandroid.Clientes SET Nombre='${Nombre}' ,Correo='${Correo}' WHERE Id_Cliente='${id}';`


    conexion.query(query,(error)=>{
      if(error) return console.error(error)
        res.json(`cliente Actualizado`)  
    })

})
//Delete
app.delete('/Clientes/delete/:id', (req, res)=>{

    const {id} = req.params

    const query = `DELETE FROM bdappandroid.Clientes WHERE Id_Cliente = ${id}`

    conexion.query(query,(error)=>{
        if(error) return console.error(error.message)
            
            res.json(`Se elimino correctamente el El cliente`)
    })

})






//Tabla VentaProducto



//Consulta de Tabla
app.get('/VentaProducto/', (req, res)=>{

    const consulta = "SELECT * FROM bdappandroid.VentaProducto;"
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        const obj = {}
            
        if(resultado.length> 0) {
            obj.lista = resultado
            res.json(obj)
            
        }
            else {
                res.json('No hay registro de clientes')
            }

    })
})

//Consulta de cliente segun ID
app.get('/VentaProducto/:id', (req, res)=>{

    const {id} = req.params

    const consulta = `SELECT * FROM bdappandroid.VentaProducto WHERE Id_Venta=${id};`
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        
            
        if(resultado.length> 0) {
            console.log("Individuo encontrado")
            res.json(resultado)
            
        }
            else {
                res.json('No hay registro de clientes')
            }
        
        
    
    })
})

//Agregar
    app.post('/VentaProducto/agregar/', (req, res)=> {
        const ventaProducto = {
            //Id_Venta: req.body.Id_Venta,
            Id_Producto: req.body.Id_Producto,
            Fecha : req.body.Fecha,
            Cantidad : req.body.Cantidad,
            Total: req.body.Total,
            TipoDePago: req.body.TipoDePago,
            Id_Usuario: req.body.Id_Usuario,
            Id_Cliente: req.body.Id_Cliente
        }

        const consulta =`INSERT INTO bdappandroid.VentaProducto (Id_Producto,Fecha, Cantidad, Total, TipoDePago, Id_Usuario, Id_Cliente) VALUES (?,?,?,?,?,?,?)`

        conexion.query(consulta,[
            //ventaProducto.Id_Venta,
            ventaProducto.Id_Producto,
            ventaProducto.Fecha,
            ventaProducto.Cantidad,
            ventaProducto.Total,
            ventaProducto.TipoDePago,
            ventaProducto.Id_Usuario,
            ventaProducto.Id_Cliente
        ],
            (error)=>{
                if(error) return console.error(error.message)
                res.json('La venta se realizo')
            }
        )
    })
//Update
app.put('/VentaProductoUpdate/:id',(req, res)=>{
    
    const{id}=req.params

    const {Id_Producto, Fecha,Cantidad,Total,TipoDePago,Id_Usuario,Id_Cliente}=req.body
    const query = `UPDATE bdappandroid.VentaProducto SET Id_Producto='${Id_Producto}', Fecha='${Fecha}', Cantidad='${Cantidad}', Total='${Total}',TipoDePago='${TipoDePago}', Id_Usuario='${Id_Usuario}', Id_Cliente='${Id_Cliente}' WHERE Id_Venta='${id}';`


    conexion.query(query,(error)=>{
      if(error) return console.error(error)
        res.json(`Venta Actualizada`)  
    })

})
//Delete
app.delete('/VentaProducto/delete/:id', (req, res)=>{

    const {id} = req.params

    const query = `DELETE FROM bdappandroid.VentaProducto WHERE Id_Venta = ${id}`

    conexion.query(query,(error)=>{
        if(error) return console.error(error.message)
            
            res.json(`Se elimino correctamente el usuario`)
    })

})




//Tabla Usuarios



//Consulta de Tabla
app.get('/Usuarios/', (req, res)=>{

    const consulta = `SELECT * FROM bdappandroid.Usuarios;`
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        const obj = {}
            
        if(resultado.length> 0) {
            obj.lista = resultado
            res.json(obj)
            
            
        }
            else {
                res.json('No hay registro de usuarios')
            }

    })
})

//Consulta de Usuario segun ID
app.get('/Usuarios/:id', (req, res)=>{

    const {id} = req.params

    const consulta = `SELECT * FROM bdappandroid.Usuarios WHERE Id_Usuario=${id};`
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        
            
        if(resultado.length> 0) {
            console.log("Usuario encontrado")
            res.json(resultado)
            
        }
            else {
                res.json('No hay registro de usuario')
            }
        
        
    
    })
})

//Agregar
app.post('/Usuarios/agregar/', (req, res)=> {
    const usuarios = {
        Nombre: req.body.Nombre,
        Rut: req.body.Rut,
        DigVerificador: req.body.DigVerificador,
        TipoUsuario: req.body.TipoUsuario


    }

    const consulta =`INSERT INTO bdappandroid.Usuarios (Nombre, Rut, DigVerificador, TipoUsuario) VALUES (?,?,?,?)`

    conexion.query(consulta,[
        usuarios.Nombre,
        usuarios.Rut,
        usuarios.DigVerificador,
        usuarios.TipoUsuario    
    ],
        (error)=>{
            if(error) return console.error(error.message)
            res.json('Usuario se agrego a lista')
        }
    )
})
//Update
app.put('/UsuariosUpdate/:id',(req, res)=>{
    
    const{id}=req.params

    const {Nombre, Rut, DigVerificador, TipoUsuario}=req.body
    const query = `UPDATE bdappandroid.Usuarios SET Nombre='${Nombre}', Rut='${Rut}', DigVerificador='${DigVerificador}', TipoUsuario='${TipoUsuario}' WHERE Id_Usuario='${id}'`


    conexion.query(query,(error)=>{
      if(error) return console.error(error)
        res.json(`Usuario Actualizado`)  
    })

})
//Delete
app.delete('/Usuarios/delete/:id', (req, res)=>{

    const {id} = req.params

    const query = `DELETE FROM bdappandroid.Usuarios WHERE Id_Usuario = ${id}`

    conexion.query(query,(error)=>{
        if(error) return console.error(error.message)
            
            res.json(`Se elimino correctamente el usuario`)
    })

})


//Subtabla de usuarios --  TablaDeCredenciales

//Consulta de Tabla
app.get('/TablaDeCredenciales/', (req, res)=>{

    const consulta = "SELECT * FROM bdappandroid.TablaDeCredenciales;"
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        const obj = {}
            
        if(resultado.length> 0) {
            obj.lista = resultado
            
            res.json(obj)
            
        }
            else {
                res.json('No hay registro de credenciales')
            }

    })
})

//Consulta de Usuario segun ID
app.get('/TablaDeCredenciales/:id', (req, res)=>{

    const {id} = req.params

    const consulta = `SELECT * FROM bdappandroid.TablaDeCredenciales WHERE Id_Usuario=${id};`
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        
            
        if(resultado.length> 0) {
            console.log("Credencial encontrada")
            res.json(resultado)
            
        }
            else {
                res.json('No hay registro de credencial')
            }
        
        
    
    })
})

//Agregar
app.post('/TablaDeCredenciales/agregar/', (req, res)=> {
    const credenciales = {
        Id_Usuario: req.body.Id_Usuario,
        Clave: req.body.Clave

    }

    const consulta =`INSERT INTO bdappandroid.TablaDeCredenciales (Id_Usuario,Clave) VALUES (?,?)`

    conexion.query(consulta,[

        credenciales.Id_Usuario,
        credenciales.Clave
  
    ],
        (error)=>{
            if(error) return console.error(error.message)
            res.json('Credencial se agrego a lista')
        }
    )
})
//Update
app.put('/TablaDeCredencialesUpdate/:id',(req, res)=>{
    
    const{id}=req.params

    const {Clave}=req.body
    const query = `UPDATE bdappandroid.TablaDeCredenciales SET Id_Usuario='${id}';`


    conexion.query(query,(error)=>{
      if(error) return console.error(error)
        res.json(`Credencia actualizada`)  
    })

})
//Delete
app.delete('/TablaDeCredenciales/delete/:id', (req, res)=>{

    const {id} = req.params

    const query = `DELETE FROM bdappandroid.TablaDeCredenciales WHERE Id_Usuario=${id};`

    conexion.query(query,(error)=>{
        if(error) return console.error(error.message)
            
            res.json(`Se elimino correctamente la credencial`)
    })

})


//Subtabla de usuarios --  TipoUsuarios

//Consulta de Tabla
app.get('/TipoUsuarios/', (req, res)=>{

    const consulta = "SELECT * FROM bdappandroid.TipoUsuarios;"
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        const obj = {}
            
        if(resultado.length> 0) {
            obj.lista = resultado
            res.json(obj)
            
        }
            else {
                res.json('No hay registro de tipos de usuarios')
            }

    })
})

//Consulta de Usuario segun ID
app.get('/TipoUsuarios/:id', (req, res)=>{

    const {id} = req.params

    const consulta = `SELECT * FROM bdappandroid.TipoUsuarios WHERE Id_TipoUsuario=${id};`
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        
            
        if(resultado.length> 0) {
            console.log("Tipo de usuario encontrado")
            res.json(resultado)
            
        }
            else {
                res.json('No hay registro del tipo de usuario')
            }
        
        
    
    })
})

//Agregar
app.post('/TipoUsuarios/agregar/', (req, res)=> {
    const tipoUsuario = {
        
        Id_TipoUsuario:req.body.Id_TipoUsuario,
        Descripcion: req.body.Descripcion


    }
    if (!tipoUsuario.Id_TipoUsuario) {
        return res.status(400).json({ error: "El campo 'Id_TipoUsuario' es obligatorio." });
    }
    const consulta =`INSERT INTO bdappandroid.TipoUsuarios (Id_TipoUsuario,Descripcion) VALUES (?,?)`

    conexion.query(consulta,[

        tipoUsuario.Id_TipoUsuario,
        tipoUsuario.Descripcion
  
    ],
        (error)=>{
            if(error) return console.error(error.message)
            res.json('El tipo de usuario se agrego a lista')
        }
    )
})
//Update
app.put('/TipoUsuariosUpdate/:id',(req, res)=>{
    
    const{id}=req.params

    const {Descripcion}=req.body
    const query = `UPDATE bdappandroid.TipoUsuarios SET Descripcion='${Descripcion}' WHERE Id_TipoUsuario='${id}';`


    conexion.query(query,(error)=>{
      if(error) return console.error(error)
        res.json(`Tipo de usuario actualizado`)  
    })

})
//Delete
app.delete('/TipoUsuarios/delete/:id', (req, res)=>{

    const {id} = req.params

    const query = `DELETE FROM bdappandroid.TipoUsuarios  WHERE Id_TipoUsuario='${id}'`

    conexion.query(query,(error)=>{
        if(error) return console.error(error.message)
            
            res.json(`Se elimino correctamente el tipo de usuario`)
    })

})



//Tabla de ProductosElaborados

//Consulta de Tabla
app.get('/ProductosElaborados/', (req, res)=>{

    const consulta = "SELECT * FROM bdappandroid.ProductosElaborados;"
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        const obj = {}
            
        if(resultado.length> 0) {
            obj.lista = resultado
            res.json(obj)
            
        }
            else {
                res.json('No hay registro de productos elaborados')
            }

    })
})

//Consulta de Usuario segun ID
app.get('/ProductosElaborados/:id', (req, res)=>{

    const {id} = req.params

    const consulta = `SELECT * FROM bdappandroid.ProductosElaborados WHERE Id_Producto='${id}';`
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        
            
        if(resultado.length> 0) {
            console.log("Producto encontrado")
            res.json(resultado)
            
        }
            else {
                res.json('No hay registro del tipo de usuario')
            }
        
        
    
    })
})

//Agregar
app.post('/ProductosElaborados/agregar/', (req, res)=> {
    const productos = {
        Id_Producto: req.body.Id_Producto,
        NombreProducto: req.body.NombreProducto,
        Receta:req.body.Receta,
        Precio:req.body.Precio

    }

    const consulta =`INSERT INTO bdappandroid.ProductosElaborados (Id_Producto,NombreProducto, Receta, Precio) VALUES (?,?,?, ?)`

    conexion.query(consulta,[

        productos.Id_Producto,
        productos.NombreProducto,
        productos.Receta,
        productos.Precio
  
    ],
        (error)=>{
            if(error) return console.error(error.message)
            res.json('El producto se agrega a la lista')
        }
    )
})
//Update
app.put('/ProductosElaboradosUpdate/:id',(req, res)=>{
    
    const{id}=req.params

    const {NombreProducto,Receta, Precio}=req.body
    const query = `UPDATE bdappandroid.ProductosElaborados SET NombreProducto='${NombreProducto}', Receta='${Receta}', Precio='${Precio}' WHERE Id_Producto='${id}';`


    conexion.query(query,(error)=>{
      if(error) return console.error(error)
        res.json(`Producto actualizado`)  
    })

})
//Delete
app.delete('/ProductosElaborados/delete/:id', (req, res)=>{

    const {id} = req.params

    const query = `DELETE FROM bdappandroid.ProductosElaborados  WHERE Id_Producto='${id}';`

    conexion.query(query,(error)=>{
        if(error) return console.error(error.message)
            
            res.json(`Se elimino correctamente el productoo`)
    })

})

//Tabla de Recetas

//Consulta de Tabla
app.get('/Recetas/', (req, res)=>{

    const consulta = "SELECT * FROM bdappandroid.Recetas;"
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        const obj = {}
            
        if(resultado.length> 0) {
            obj.lista = resultado
            res.json(obj)
            
        }
            else {
                res.json('No hay registro de recetas')
            }

    })
})

//Consulta de Usuario segun ID
app.get('/Recetas/:id', (req, res)=>{

    const {id} = req.params

    const consulta = `SELECT * FROM bdappandroid.Recetas WHERE Id_Receta=${id};`
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        
            
        if(resultado.length> 0) {
            console.log("Receta encontrado")
            res.json(resultado)
            
        }
            else {
                res.json('No hay registro de la receta')
            }
        
        
    
    })
})

//Agregar
app.post('/Recetas/agregar/', (req, res)=> {
    const recetas = {
        NombreReceta: req.body.NombreReceta

    }

    const consulta =`INSERT INTO bdappandroid.Recetas (NombreReceta) VALUES (?)`

    conexion.query(consulta,[


        recetas.NombreReceta
  
    ],
        (error)=>{
            if(error) return console.error(error.message)
            res.json('Receta se agrego a la lista')
        }
    )
})
//Update
app.put('/RecetasUpdate/:id',(req, res)=>{
    
    const{id}=req.params

    const {NombreReceta}=req.body
    const query = `UPDATE bdappandroid.Recetas SET NombreReceta='${NombreReceta}' WHERE Id_Receta='${id}';`


    conexion.query(query,(error)=>{
      if(error) return console.error(error)
        res.json(`Receta actualizado`)  
    })

})
//Delete
app.delete('/Recetas/delete/:id', (req, res)=>{

    const {id} = req.params

    const query = `DELETE FROM bdappandroid.Recetas  WHERE Id_Receta='${id}';`

    conexion.query(query,(error)=>{
        if(error) return console.error(error.message)
            
            res.json(`Se elimino correctamente la receta`)
    })

})



//Tabla de Cantidades

//Consulta de Tabla
app.get('/Cantidades/', (req, res)=>{

    const consulta = "SELECT * FROM bdappandroid.Cantidades;"
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        const obj = {}
            
        if(resultado.length> 0) {
            obj.lista = resultado
            res.json(obj)
            
        }
            else {
                res.json('No hay registro de cantidades')
            }

    })
})

//Consulta de Usuario segun ID
app.get('/Cantidades/:id', (req, res)=>{

    const {id} = req.params

    const consulta = `SELECT * FROM bdappandroid.Cantidades WHERE Id_Cantidades=${id};`
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        
            
        if(resultado.length> 0) {
            console.log("Cantidades encontradas")
            res.json(resultado)
            
        }
            else {
                res.json('No hay registro de las cantidades')
            }
        
        
    
    })
})

//Agregar
app.post('/Cantidades/agregar/', (req, res)=> {
    const cantidades = {
        Receta: req.body.Receta,
        IngredienteBodega: req.body.IngredienteBodega,
        Cantidad: req.body.Cantidad,
        CodigoUnidad: req.body.CodigoUnidad

    }

    const consulta =`INSERT INTO bdappandroid.Cantidades (Receta,IngredienteBodega,Cantidad, CodigoUnidad) VALUES (?,?,?,?)`

    conexion.query(consulta,[
        cantidades.Receta,
        cantidades.IngredienteBodega,
        cantidades.Cantidad,
        cantidades.CodigoUnidad

  
    ],
        (error)=>{
            if(error) return console.error(error.message)
            res.json('Se agregaron las cantidades a la lista')
        }
    )
})
//Update
app.put('/CantidadesUpdate/:id',(req, res)=>{
    
    const{id}=req.params

    const {Receta, IngredienteBodega, Cantidad, CodigoUnidad}=req.body
    const query = `UPDATE bdappandroid.Cantidades SET Receta='${Receta}', IngredienteBodega='${IngredienteBodega}', Cantidad='${Cantidad}', CodigoUnidad='${CodigoUnidad}'  WHERE Id_Cantidades='${id}';`


    conexion.query(query,(error)=>{
      if(error) return console.error(error)
        res.json(`Cantidad actualizado`)  
    })

})
//Delete
app.delete('/Cantidades/delete/:id', (req, res)=>{

    const {id} = req.params

    const query = `DELETE FROM bdappandroid.Cantidades  WHERE Id_Cantidades='${id}';`

    conexion.query(query,(error)=>{
        if(error) return console.error(error.message)
            
            res.json(`Se elimino correctamente las cantidades`)
    })

})



//Tabla de Materias Primas

//Consulta de Tabla
app.get('/MateriasPrimas/', (req, res)=>{

    const consulta = "SELECT * FROM bdappandroid.MateriasPrimas;"
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        const obj = {}
            
        if(resultado.length> 0) {
            obj.lista = resultado
            res.json(obj)
            
        }
            else {
                res.json('No hay registro de Materias Primas')
            }

    })
})

//Consulta de Usuario segun ID
app.get('/MateriasPrimas/:id', (req, res)=>{

    const {id} = req.params

    const consulta = `SELECT * FROM bdappandroid.MateriasPrimas WHERE Id_IngredienteBodega=${id};`
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        
            
        if(resultado.length> 0) {
            console.log("Materia prima encontrada")
            res.json(resultado)
            
        }
            else {
                res.json('No hay registro de la materia prima')
            }
        
        
    
    })
})

//Agregar
app.post('/MateriasPrimas/agregar/', (req, res)=> {
    const materiasPrimas = {
        NombreIngredienteBodega: req.body.NombreIngredienteBodega,
        Existencia: req.body.Existencia,
        CodigoUnidad: req.body.CodigoUnidad
    }

    const consulta =`INSERT INTO bdappandroid.MateriasPrimas (NombreIngredienteBodega, Existencia,CodigoUnidad) VALUES (?,?,?)`

    conexion.query(consulta,[
        materiasPrimas.NombreIngredienteBodega,
        materiasPrimas.Existencia,
        materiasPrimas.CodigoUnidad

  
    ],
        (error)=>{
            if(error) return console.error(error.message)
            res.json('Se agregaron las materias primas a la lista')
        }
    )
})
//Update
app.put('/MateriasPrimasUpdate/:id',(req, res)=>{
    
    const{id}=req.params

    const {NombreIngredienteBodega, Existencia, CodigoUnidad}=req.body
    const query = `UPDATE bdappandroid.MateriasPrimas SET NombreIngredienteBodega='${NombreIngredienteBodega}', Existencia='${Existencia}', CodigoUnidad='${CodigoUnidad}'  WHERE Id_IngredienteBodega='${id}'`


    conexion.query(query,(error)=>{
      if(error) return console.error(error)
        res.json(`Materia Prima actualizada`)  
    })

})
//Delete
app.delete('/MateriasPrimas/delete/:id', (req, res)=>{

    const {id} = req.params

    const query = `DELETE FROM bdappandroid.MateriasPrimas  WHERE Id_IngredienteBodega='${id}';`

    conexion.query(query,(error)=>{
        if(error) return console.error(error.message)
            
            res.json(`Se elimino correctamente la materia prima`)
    })

})

//Tabla de CodigoUnidades

//Consulta de Tabla
app.get('/CodigoUnidades/', (req, res)=>{

    const consulta = "SELECT * FROM bdappandroid.CodigoUnidades;"
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        const obj = {}
            
        if(resultado.length> 0) {
            obj.lista = resultado
            res.json(obj)
            
        }
            else {
                res.json('No hay registro de Codigos de unidades')
            }

    })
})

//Consulta de Usuario segun ID
app.get('/CodigoUnidades/:id', (req, res)=>{

    const {id} = req.params

    const consulta = `SELECT * FROM bdappandroid.CodigoUnidades WHERE Id_Codigo=${id};`
    conexion.query(consulta,(error,resultado)=>{
        if(error) {return console.error(error.message)}
        
            
        if(resultado.length> 0) {
            console.log("Codigo encontrado")
            res.json(resultado)
            
        }
            else {
                res.json('No hay registro del codigo')
            }
        
        
    
    })
})

//Agregar
app.post('/CodigoUnidades/agregar/', (req, res)=> {
    const codigoUnidades = {
        Id_Codigo:req.body.Id_Codigo,
        NombreUnidad: req.body.NombreUnidad
    }

    const consulta =`INSERT INTO bdappandroid.CodigoUnidades (Id_Codigo, NombreUnidad) VALUES (?,?)`

    conexion.query(consulta,[
        codigoUnidades.Id_Codigo,
        codigoUnidades.NombreUnidad

  
    ],
        (error)=>{
            if(error) return console.error(error.message)
            res.json('Se agrego el codigo de unidad a la lista')
        }
    )
})
//Update
app.put('/CodigoUnidadesUpdate/:id',(req, res)=>{
    
    const{id}=req.params

    const {NombreUnidad}=req.body
    const query = `UPDATE bdappandroid.CodigoUnidades SET NombreUnidad='${NombreUnidad}'  WHERE Id_Codigo='${id}';`


    conexion.query(query,(error)=>{
      if(error) return console.error(error)
        res.json(`Unidad actualizada`)  
    })

})
//Delete
app.delete('/CodigoUnidades/delete/:id', (req, res)=>{

    const {id} = req.params

    const query = `DELETE FROM bdappandroid.CodigoUnidades  WHERE Id_Codigo='${id}';`

    conexion.query(query,(error)=>{
        if(error) return console.error(error.message)
            
            res.json(`Se elimino correctamente el codigo de unidad`)
    })

})