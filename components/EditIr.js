import { Dialog, Transition } from '@headlessui/react';
import React, { useEffect, useState, Fragment } from 'react'

const EditIr = ({ irNombre, setResponseIr }) => {

    const IR_API_BASE_URL = "http://localhost:8080/api/v1/irs";
    const [isOpen, setIsOpen] = useState(false);
    const [ir, setIr] = useState({
        nombre: "",
        nomNacim: "",
        ciudadNacim: "",
        fechaNacim: "",
        ciudadFall: "",
        fechaFall: "",
        nacionalNombread: "",
        almaMater: "",
        bio: "",
        foto: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(IR_API_BASE_URL + "/" + irNombre, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const _ir = await response.json();
                setIr(_ir);
                setIsOpen(true);
            } catch (error) {
                console.log(error);
            }
        };
        if (irNombre) {
            fetchData();
        }
    }, [irNombre])


    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const handleChange = (event) => {
        const { name, type, value, files } = event.target;
        if (type === "file") {
            setIr({ ...ir, [name]: files[0] });
        } else {
            setIr({ ...ir, [name]: value });
        }
    };


    const reset = (e) => {
        e.preventDefault();
        setIsOpen(false);
    }

    const updateIr = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const irData = { ...ir };
        delete irData.foto; // Remove 'foto' property from the irData object
        formData.append("ir", JSON.stringify(irData)); // Stringify the irData object and append it as a part named "ir"

        // Append the 'foto' file separately
        if (ir.foto) {
            formData.append("foto", ir.foto);
        }

        // Update the API endpoint URL to include the specific `ir` nombre
        const response = await fetch(`${IR_API_BASE_URL}/${ir.nombre}`, {
            method: "PUT",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Something went wrong");
        }
        const _ir = await response.json();
        setResponseIr(_ir);
        reset(e);
    };



    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}>
                <div className='min-h-screen px-4 text-center'>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo='opacity-100 scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 scale-100'
                        leaveTo='opacity-0 scale-95'>
                        <div className='inline-block w-full max-w-md p-6 my-8 overflow-hNombreden text-left align-mNombredle transition-all transform bg-white shadow-xl rounded-md' >
                            <Dialog.Title
                                as='h3'
                                className="text-lg font-medium leading-6 text-gray-900">
                                Editar usuario
                            </Dialog.Title>
                            <div className='flex max-w-md max-auto'>
                                <div className='py-2'>
                                    <div className='h-14 my-4'>
                                        <label className='blovk text-gray-600 text-sm font-normal'>
                                            Nombre
                                        </label>
                                        <input
                                            type="text"
                                            name='nombre'
                                            value={ir.nombre}
                                            onChange={(e) => handleChange(e)}
                                            className='h-10 w-96 border mt-2 px-2 py-2'>
                                        </input>
                                    </div>
                                    <div className='h-14 my-4'>
                                        <label className='blovk text-gray-600 text-sm font-normal'>
                                            Nombre de nacimiento
                                        </label>
                                        <input
                                            type="text"
                                            name='nomNacim'
                                            value={ir.nomNacim}
                                            onChange={(e) => handleChange(e)}
                                            className='h-10 w-96 border mt-2 px-2 py-2'>
                                        </input>
                                    </div>
                                    <div className='h-14 my-4'>
                                        <label className='blovk text-gray-600 text-sm font-normal'>
                                            Ciudad de nacimiento
                                        </label>
                                        <input
                                            type="text"
                                            name='ciudadNacim'
                                            value={ir.ciudadNacim}
                                            onChange={(e) => handleChange(e)}
                                            className='h-10 w-96 border mt-2 px-2 py-2'></input>
                                    </div>
                                    <div className='h-14 my-4'>
                                        <label className='blovk text-gray-600 text-sm font-normal'>
                                            Fecha de nacimiento
                                        </label>
                                        <input
                                            type="text"
                                            name='fechaNacim'
                                            value={ir.fechaNacim}
                                            onChange={(e) => handleChange(e)}
                                            className='h-10 w-96 border mt-2 px-2 py-2'></input>
                                    </div>
                                    <div className='h-14 my-4'>
                                        <label className='blovk text-gray-600 text-sm font-normal'>
                                            Ciudad de fallecimiento
                                        </label>
                                        <input
                                            type="text"
                                            name='ciudadFall'
                                            value={ir.ciudadFall}
                                            onChange={(e) => handleChange(e)}
                                            className='h-10 w-96 border mt-2 px-2 py-2'></input>
                                    </div>
                                    <div className='h-14 my-4'>
                                        <label className='blovk text-gray-600 text-sm font-normal'>
                                            Fecha de fallecimiento
                                        </label>
                                        <input
                                            type="text"
                                            name='fechaFall'
                                            value={ir.fechaFall}
                                            onChange={(e) => handleChange(e)}
                                            className='h-10 w-96 border mt-2 px-2 py-2'></input>
                                    </div>
                                    <div className='h-14 my-4'>
                                        <label className='blovk text-gray-600 text-sm font-normal'>
                                            Nacionalidad
                                        </label>
                                        <input
                                            type="text"
                                            name='nacionalidad'
                                            value={ir.nacionalidad}
                                            onChange={(e) => handleChange(e)}
                                            className='h-10 w-96 border mt-2 px-2 py-2'></input>
                                    </div>
                                    <div className='h-14 my-4'>
                                        <label className='blovk text-gray-600 text-sm font-normal'>
                                            Alma mater
                                        </label>
                                        <input
                                            type="text"
                                            name='almaMater'
                                            value={ir.almaMater}
                                            onChange={(e) => handleChange(e)}
                                            className='h-10 w-96 border mt-2 px-2 py-2'></input>
                                    </div>
                                    <div className='my-4'>
                                        <label className='block text-gray-600 text-sm font-normal'>
                                            Bio
                                        </label>
                                        <textarea
                                            name='bio'
                                            value={ir.bio}
                                            onChange={(e) => handleChange(e)}
                                            className='w-96 border mt-2 px-2 py-2'
                                            rows='4'>
                                        </textarea>
                                    </div>
                                    <div className='h-14 my-4'>
                                        <label className='blovk text-gray-600 text-sm font-normal'>
                                            Foto
                                        </label>
                                        <input
                                            type="file"
                                            name='foto'
                                            accept="image/*"
                                            onChange={(e) => handleChange(e)}
                                            className='h-10 w-96 border mt-2 px-2 py-2'></input>
                                    </div>
                                    <div className='h-14 my-4 space-x-4 pt-4'>
                                        <button onClick={updateIr} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6'>
                                            Guardar
                                        </button>
                                        <button onClick={reset} className='rounded text-white font-semibold bg-red-400 hover:bg-red-700 py-2 px-6'>
                                            Cancelar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    )
}

export default EditIr