import React, { useEffect, useState } from 'react';
import { db } from '../../credenciales';
import { collection, getDocs ,doc} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import "./respuestas.css"
export function Respuestas() {
    const [respuesta, setRespuesta] = useState([]);
    useEffect(()=>{
        const getRespuestas = async()=>{
            try {
                const querySnapshot = await getDocs(collection(db, "encuestas"))
                const docs = []
                querySnapshot.forEach((doc)=>{
                    docs.push({...doc.data(),id:doc.id})
                })
                setRespuesta(docs)
            } catch (error) {
                console.log(error);
            }
        }
        getRespuestas()
   },[])
   return(
    <> <Link className='back' to={"/"}>← Volver al formulario</Link>
    {(respuesta.length < 1)?<h4>Cargando...</h4>:
   
        <h1>Encuestados: {respuesta.length}</h1>}
      
    <div className='container'>
{
    respuesta.map(x=>(
        <>
    <div className='card' key={x.id}>
<p className='text'>
  Nombre:  {x.value.full_name}
</p>
<p className='text'>
  Pais:  {x.value.country_of_origin}
</p>
<p className='text'>Fecha de cumpleaños: <br/>{x.value.birth_date} </p>
<p className='text'>Email: <br/>{x.value.email} </p>
    </div>
    </>
   )) 
}
    </div>
    </>
     
   )
}
