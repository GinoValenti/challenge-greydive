import React, { useState } from 'react';
import form from "../items.json"
import { useFormik } from 'formik';
import { db } from '../credenciales';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Loading from '../components/Loading/Loading'
import "./form.css"
import {collection,addDoc} from "firebase/firestore"
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 100,
    p: 4,
  };
function Encuesta() {
    const [show, setShow] = useState(false);
    let initialValues = {}
    form.items.map(e => Object.defineProperty(initialValues, e.name, { value: '' }))
    const formik = useFormik({
        initialValues: initialValues,
        validateOnChange: false,
        onSubmit: async (value) => {
            setShow(true)
            try {
                await addDoc(collection(db,"encuestas"),{
                    value
                })
                Swal.fire({
                    title: 'Gracias por completar el formulario!',
                    text: 'Nos estaremos contactando contigo pronto.',
                    footer: '<a href="/respuestas">Aqui podras ver los resultados!</a>'
                  })
                setShow(false)
            
                console.log(value);
              
           ;
           formik.resetForm(initialValues);
                const inputs = Array.from(document.getElementsByClassName('form-field'));
                inputs.forEach(e => e.value = '');
            } catch (error) {
                console.error(error.message)
            }
        }
    })
    const handleClose = () => setShow(false);

    return (
        <>
        {
                show ? 
                <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <Loading/>
                </Box>
              </Modal>
                 : <></>
              }
        
        <div className='cuter-input-container'>
           <div className='bg-next-in'>
            </div>
     
           <form onSubmit={formik.handleSubmit} className='form'>
            <h1>Formulario greydive</h1>
           
            
                {
              
                    form.items.map((x, i) => (
                        (x.type === 'select')
                            ? <div className='form-select' key={i}>
                                <label>{x.label}</label>
                                <select value={formik.values.name} onChange={formik.handleChange} className='form-field' required={x.required} name={x.name}>
                                    <option value=''>Seleccione su pais</option>
                                    {
                                        x.options.map((option, i) => (
                                            <option key={i} value={option.value}>{option.label}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            : <div className={(x.type === 'submit') ? 'form-button' : (x.type === 'checkbox') ? 'form-group' : 'form-group field'} key={i}>
                                <label className='form-label'>{(x.type === 'submit') ? null : x.label}</label>
                                <input
                                    className='form-field'
                                    type={x.type}
                                    required={x.required}
                                    name={x.name}
                                    onChange={formik.handleChange}
                                />
                            </div>
                    ))
                }
        
       
            <p>Developed by <a className='back' target="_blank" href="https://github.com/GinoValenti">Gino Valenti</a></p>
            </form>


        </div>


        </>
    )
}
export default Encuesta