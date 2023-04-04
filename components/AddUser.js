import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react'
import UserList from './UserList';
import ProtectedRoute from "./UserContext";

const AddUser = () => {
    <ProtectedRoute allowedRoles={["ADMIN"]}>
        <AddUser />
    </ProtectedRoute>
    const USER_API_BASE_URL = "http://localhost:8080/api/v1/users";
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        userRole: 'admin',
    });

    const [responseUser, setResponseUser] = useState({
        id: "",
        firstName: "",
        lastName: "",
        emailId: "",
        password: "",
        userRole: '',
    });

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const handleChange = (event) => {
        const value = event.target.value;
        setUser({ ...user, [event.target.name]: value });
    };

    const saveUser = async (e) => {
        e.preventDefault();
        const response = await fetch(USER_API_BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error("Something went wrong")
        }
        const _user = await response.json();
        setResponseUser(_user);
        reset(e);
    };

    const reset = (e) => {
        e.preventDefault();
        setUser({
            id: "",
            firstName: "",
            lastName: "",
            emailId: "",
            password: "",
        });
        setIsOpen(false);
    }

    return (
        <>
            <div className='container mx-auto my-8'>
                <div className='h-12'>
                    <button
                        onClick={openModal}
                        className='rounded bg-slate-600 text-white px-6 py-2 font-semibold'>
                        Añadir usuario
                    </button>
                </div>
            </div>
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
                            <div className='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-md' >
                                <Dialog.Title
                                    as='h3'
                                    className="text-lg font-medium leading-6 text-gray-900">
                                    Añadir nuevo usuario
                                </Dialog.Title>
                                <div className='flex max-w-md max-auto'>
                                    <div className='py-2'>
                                        <div className='h-14 my-4'>
                                            <label className='blovk text-gray-600 text-sm font-normal'>
                                                Nombre
                                            </label>
                                            <input
                                                type="text"
                                                name='firstName'
                                                value={user.firstName}
                                                onChange={(e) => handleChange(e)}
                                                className='h-10 w-96 border mt-2 px-2 py-2'>
                                            </input>
                                        </div>
                                        <div className='h-14 my-4'>
                                            <label className='blovk text-gray-600 text-sm font-normal'>
                                                Apellido
                                            </label>
                                            <input
                                                type="text"
                                                name='lastName'
                                                value={user.lastName}
                                                onChange={(e) => handleChange(e)}
                                                className='h-10 w-96 border mt-2 px-2 py-2'>
                                            </input>
                                        </div>
                                        <div className='h-14 my-4'>
                                            <label className='blovk text-gray-600 text-sm font-normal'>
                                                Contraseña
                                            </label>
                                            <input
                                                type="text"
                                                name='password'
                                                value={user.password}
                                                onChange={(e) => handleChange(e)}
                                                className='h-10 w-96 border mt-2 px-2 py-2'>
                                            </input>
                                        </div>
                                        <div className='h-14 my-4'>
                                            <label className='blovk text-gray-600 text-sm font-normal'>
                                                Email
                                            </label>
                                            <input
                                                type="text"
                                                name='emailId'
                                                value={user.emailId}
                                                onChange={(e) => handleChange(e)}
                                                className='h-10 w-96 border mt-2 px-2 py-2'>
                                            </input>
                                        </div>
                                        <div className='h-14 my-4'>
                                            <label className='block text-gray-600 text-sm font-normal'>
                                                Role
                                            </label>
                                            <select
                                                name='userRole'
                                                value={user.userRole}
                                                onChange={(e) => handleChange(e)}
                                                className='h-10 w-96 border mt-2 px-2 py-2'>
                                                <option value='admin'>Admin</option>
                                                <option value='regular'>Regular</option>
                                            </select>
                                        </div>

                                        <div className='h-14 my-4 space-x-4 pt-4'>
                                            <button onClick={saveUser} className='rounded text-white font-semibold bg-green-400 hover:bg-green-700 py-2 px-6'>
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
            <UserList user={responseUser} />
        </>
    );
};

export default AddUser