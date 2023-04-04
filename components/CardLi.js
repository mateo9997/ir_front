import React, { useState, useEffect } from 'react';
import Card from './Card';

const IR_API_BASE_URL = 'http://localhost:8080/api/v1/irs';

const CardList = () => {
  const [irs, setIrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterAttribute, setFilterAttribute] = useState('nombre');
  const [order, setOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchData();
  }, [filterAttribute, order]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${IR_API_BASE_URL}?orderBy=${filterAttribute}&order=${order}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      const data = await response.json();
      setIrs(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = async () => {
    setCurrentPage(1); // Reset the current page to 1
    const response = await fetch(`${IR_API_BASE_URL}/search?searchTerm=${searchTerm}`);
    const data = await response.json();
    setIrs(data);
  };

  const handleFilterChange = (event) => {
    setFilterAttribute(event.target.value);
  };

  const toggleOrder = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(irs.length / itemsPerPage);
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 ${currentPage === i ? 'bg-gray-200 dark:bg-gray-800' : ''
            }`}
        >
          {i}
        </button>
      );
    }

    return <div className="flex justify-center mt-8">{pages}</div>;
  };

  const indexOfLastIR = currentPage * itemsPerPage;
  const indexOfFirstIR = indexOfLastIR - itemsPerPage;
  const currentIRs = irs.slice(indexOfFirstIR, indexOfLastIR);

  return (
    <section className="bg-white dark:bg-gray-900">
      <h1 className="text-3xl lg:text-4xl font-semibold capitalize text-gray-800 dark:text-white mb-8">
        Informáticas
      </h1>
      <div className="flex items-center justify-between mb-8">
        <div>
          <label htmlFor="filterAttribute" className="mr-2">
            Filter by:
          </label>
          <div>
            <input
              type="text"
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearchChange}
              className="border rounded-md p-2 mr-2 hover:bg-gray-100 dark:hover:bg-gray-700"
            />
            <button
              className="bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-md text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={handleSearchClick}
            >
              Search
            </button>
          </div>

        </div>
        <div className="flex items-center">
  <label htmlFor="filterAttribute" className="mr-2">
    Filtrar por:
  </label>
  <select
    name="filterAttribute"
    id="filterAttribute"
    value={filterAttribute}
    onChange={handleFilterChange}
    className="border rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-700 mr-2"
  >
    <option value="nombre">Nombre</option>
    <option value="fechaNacim">Fecha de Nacimiento</option>
    <option value="fechaFall">Fecha de Fallecimiento</option>
    <option value="nacionalidad">Nacionalidad</option>
    <option value="almaMater">Alma Mater</option>
  </select>
  <button
    className="hover:bg-gray-100 dark:hover:bg-gray-700 bg-gray-200 dark:bg-gray-800 px-4 py-2 rounded-md text-gray-800 dark:text-gray-200"
    onClick={toggleOrder}
  >
    {order === 'asc' ? 'Ascending' : 'Descending'}
  </button>
</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {currentIRs.map((ir) => (
          <Card key={ir.nombre} ir={ir} />
        ))}
      </div>
      {renderPagination()}
    </section>

  );
};

export default CardList;



