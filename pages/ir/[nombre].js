import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Navigation from '../../components/Navigation';
import Link from "next/link";

const IR_API_BASE_URL = 'http://localhost:8080/api/v1/irs';

const IrDetail = ({ ir }) => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <Navigation />
      <div className="container px-6 py-10 mx-auto">
        <Link href="/index">
          <div className="inline-block px-3 py-1 mb-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
            Volver
          </div>
        </Link>

        <h1 className="text-4xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
          {ir.nombre}
        </h1>
        <img
          className="object-cover w-max h-max mt-4 rounded-lg"
          src={`data:image/jpeg;base64,${ir.foto}`}
          alt={ir.nombre}
        />
        <div className="mt-4 text-gray-600 dark:text-gray-400">
          <p>Nombre de nacimiento: {ir.nomNacim}</p>
          <p>Ciudad de nacimiento: {ir.ciudadNacim}</p>
          <p>Fecha de nacimiento: {ir.fechaNacim}</p>
          <p>Ciudad de fallecimiento: {ir.ciudadFall}</p>
          <p>Fecha de fallecimiento: {ir.fechaFall}</p>
          <p>Nacionalidad: {ir.nacionalidad}</p>
          <p>Alma mater: {ir.almaMater}</p>
          <p>Biografía: {ir.bio}</p>
        </div>
      </div>
    </div>
  );
};

const IrPage = () => {
  const router = useRouter();
  const { nombre } = router.query;

  const [ir, setIr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (nombre) {
        setLoading(true);
        try {
          const response = await fetch(`${IR_API_BASE_URL}/${encodeURIComponent(nombre)}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          setIr(data);
        } catch (error) {
          console.log(error);
        }
        setLoading(false);
      }
    };
    fetchData();
  }, [nombre]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!ir) {
    return (
      <div className="bg-white dark:bg-gray-900">
        <Navigation />
        <div className="container px-6 py-10 mx-auto">
          <h1 className="text-3xl font-semibold text-gray-800 capitalize lg:text-4xl dark:text-white">
            IR not found.
          </h1>
        </div>
      </div>
    );
  }

  return <IrDetail ir={ir} />;
};

export default IrPage;



