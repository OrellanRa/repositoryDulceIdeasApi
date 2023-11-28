const express = require('express')
const mysqli = require('mysql')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

const PORT = 3000

const conexion = mysqli.createConnection({
    host: 'db4free.net',
    database: 'bdandroid_2023',
    user: 'pablo_2023',
    password: 'notebook89'

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
app.get('/listaClientes/', (req, res)=>{

    const consulta = "SELECT * FROM bdandroid_2023.listaClientes;"
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
app.get('/listaClientes/:id', (req, res)=>{

    const {id} = req.params

    const consulta = `SELECT * FROM bdandroid_2023.listaClientes WHERE id=${id};`
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
app.post('/Clientes/agregar/', (req, res)=> {
    const clientes = {
        //id: req.params.id,
        rut: req.body.rut,
        nombreapellido: req.body.nombreapellido,
        correo: req.body.correo,
        clave: req.body.clave

    }

    const consulta =`INSERT INTO bdandroid_2023.listaClientes (rut,nombreapellido,correo,clave) VALUES (?,?,?,?)`

    conexion.query(consulta,[
        clientes.rut,
        clientes.nombreapellido,
        clientes.correo,
        clientes.clave], (error)=>{
            if(error) return console.error(error.message)
            res.json('Cliente se agrego a lista')
        }
    )
})
app.put('/clientesUpdate/:id',(req, res)=>{
    
    const{id}=req.params

    const {rut,nombreapellido,correo,clave}=req.body
    const query = `UPDATE bdandroid_2023.listaClientes SET rut='${rut}', nombreapellido='${nombreapellido}' ,correo='${correo}',clave='${clave}' WHERE id=${id};`


    conexion.query(query,(error)=>{
      if(error) return console.error(error)
        res.json(`cliente Actualizado`)  
    })

})

app.delete('/clientes/delete/:id', (req, res)=>{

    const {id} = req.params

    const query = `DELETE FROM bdandroid_2023.listaClientes WHERE id = ${id}`

    conexion.query(query,(error)=>{
        if(error) return console.error(error.message)
            
            res.json(`Se elimino correctamente el usuario`)
    })

})