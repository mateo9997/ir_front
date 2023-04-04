import Link from 'next/link';
import React from 'react';

const Card = ({ ir }) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Link href={`/ir/${encodeURIComponent(ir.nombre)}`}>
        <div className="hover:bg-gray-100 dark:hover:bg-gray-700 flex lg:flex-row items-center lg:items-start">
          <img
            className="object-cover w-20 h-60 rounded-lg lg:w-48"
            src={`data:image/jpeg;base64,${ir.foto}`}
            alt={ir.nombre}
          />
          <div className="flex flex-col pl-4">
            <div className="text-3xl font-semibold text-gray-800 dark:text-white cursor-pointer">
              {ir.nombre}
            </div>

            <span className="text-l text-gray-500 dark:text-gray-300">
              {formatDate(ir.fechaNacim)} - {formatDate(ir.fechaFall)}
            </span>

            <span className="text-l text-gray-500 dark:text-gray-300">
              {ir.nacionalidad}
            </span>

            <span className="text-l text-gray-500 dark:text-gray-300">
              {ir.almaMater}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Card;
