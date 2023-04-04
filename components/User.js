import React from 'react';

const User = ({ user, deleteUser, editUser }) => {
    return (
        <tr key={user.id}>
            <td className='text-left px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>{user.firstName}</div>
            </td>
            <td className='text-left px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>{user.lastName}</div>
            </td>
            <td className='text-left px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>{user.password}</div>
            </td>
            <td className='text-left px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>{user.emailId}</div>
            </td>
            <td className='text-left px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-500'>{user.userRole}</div>
            </td>
            <td className='text-right px-6 py-4 whitespace-nowrap font-medium text-sm'>
                <a 
                    onClick={(e, id) => editUser(e, user.id)}  
                    className='text-indigo-600 hover:text-indigo-800 hover:curser-pointer px-4'>
                    Editar</a>
                <a 
                    onClick={(e, id) => deleteUser(e, user.id)} 
                    className='text-indigo-600 hover:text-indigo-800 hover:curser-pointer'>
                    Borrar</a>
            </td>
        </tr>
    )
}

export default User