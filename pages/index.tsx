import { useUserContext } from "../components/UserContext";
import dynamic from 'next/dynamic';


import CardLi from "../components/CardLi";
import Navigation from "../components/Navigation";
import Carousel from "../components/Carousel";

export default function Home() {
  const { user } = useUserContext();
  const DynamicWorldMap = dynamic(() => import('../components/WorldMap'), {
    ssr: false,
  });
  return (
    <>
      <Navigation />
      <main>
      <Carousel />
      <DynamicWorldMap />
        <CardLi />
        
      </main>
    </>
  );
}

