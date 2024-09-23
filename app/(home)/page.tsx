import { getClients } from "@/fsd/entities/client";
import '../globals.css'

export default async function HomePage() {
  // const clients = await getClients();
  // const clients = await fetch('https://a889-212-45-6-6.ngrok-free.app/api/v2/echart_graphs/get_clients',{
  //   next:{
  //     revalidate:2
  //   }
  // });

  return (
    <div>
      Главная
      {/*{clients && clients.length === 0 ? (*/}
      {/*  <p>Клиенты не найдены</p>*/}
      {/*) : (*/}

      {/*)}*/}
    </div>
  );
}