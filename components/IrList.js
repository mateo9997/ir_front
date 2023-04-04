import {React, useState, useEffect} from 'react'
import EditIr from './EditIr';
import Ir from './Ir';

const IrList = ({ir}) => {

    const IR_API_BASE_URL = "http://localhost:8080/api/v1/irs";
    const [irs, setIrs] = useState(null);
    const [loading, setLoading] = useState(true);
    const [irNombre, setIrNombre] = useState(null);
    const [responseIr, setResponseIr] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(IR_API_BASE_URL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const irs = await response.json();
            setIrs(irs);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
      };
      fetchData();
    },[ir, responseIr]);
    
    const deleteIr = (e, nombre) => {
        e.preventDefault();
        fetch(IR_API_BASE_URL + "/" + nombre, {
            method: "DELETE",
        }).then((res) => {
            if(irs) {
                setIrs((prevElement) => {
                    return prevElement.filter((ir) => ir.nombre !== nombre);
                });
            }
        });
    };

    const editIr = (e, nombre) => {
        e.preventDefault();
        setIrNombre(nombre);
    }


    return (
      <>
      <div className='container mx-auto my-8'>
          <div className='flex shadow border-b'>
              <table className='min-w-full'>
                  <thead className='bg-gray-50'>
                      <tr>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Nombre</th>
                        {/* <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>nomNacim</th>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>ciudadNacim</th>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>fechaNacim</th>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>ciudadFall</th>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>fechaFall</th> */}
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>nacionalidad</th>
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>almaMater</th>
                        {/* <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>bio</th> */}
                        <th className='text-left font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>foto</th>
                        <th className='text-right font-medium text-gray-500 uppercase tracking-wider py-3 px-6'>Action</th>
                      </tr>
                  </thead>
                  {!loading && (
                  <tbody className='bg-white'>
                      {irs?.map((ir) => (
                      <Ir 
                          ir={ir} 
                          key={ir.nombre} 
                          deleteIr={deleteIr} 
                          editIr={editIr}/>
                      ))}
                  </tbody>
                  )}
              </table>
          </div>
      </div>
      <EditIr irNombre={irNombre} setResponseIr={setResponseIr}/>
      </>
    )
};

export default IrList