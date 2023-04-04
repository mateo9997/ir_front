import React from 'react'

const Ir = ({ ir, deleteIr, editIr }) => {
  return (
    <tr key={ir.nombre}>
      <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>
          {ir.nombre}
        </div>
      </td>
      {/* <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>
          {ir.nomNacim}
        </div>
      </td>
      <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>
          {ir.ciudadNacim}
        </div>
      </td>
      <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>
          {ir.fechaNacim}
        </div>
      </td>
      <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>
          {ir.ciudadFall}
        </div>
      </td>
      <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>
          {ir.fechaFall}
        </div>
      </td> */}
      <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>
          {ir.nacionalidad}
        </div>
      </td>
      <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>
          {ir.almaMater}
        </div>
      </td>
      {/* <td className='text-left px-6 py-4 whitespace-nowrap'>
        <div className='text-sm text-gray-500'>
          {ir.bio}
        </div>
      </td> */}
      <td className='py-3 px-6'>
        {ir.foto && (
          <img
          className="object-cover w-20 h-20 rounded-lg lg:w-48" // Adjust the size here, e.g., h-32 and lg:w-48
          src={`data:image/jpeg;base64,${ir.foto}`}
          alt={ir.nombre}
        />
        )}
      </td>
      <td className='text-right px-6 py-4 whitespace-nowrap font-medium text-sm'>
        <a
          onClick={(e, nombre) => editIr(e, ir.nombre)}
          className='text-indigo-600 hover:text-indigo-800 px-4 hover:cursor-pointer'>
          Editar
        </a>
        <a
          onClick={(e, nombre) => deleteIr(e, ir.nombre)}
          className='text-indigo-600 hover:text-indigo-800 hover:cursor-pointer'>
          Borrar
        </a>
      </td>
    </tr>
  )
}

export default Ir