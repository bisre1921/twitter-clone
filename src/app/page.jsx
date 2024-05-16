import SideBar from "@/component/SideBar";
import "./globals.css";
import Feed from "@/component/Feed";
import Widgets from "@/component/Widgets";
 
export default async function Home() {
  const newsResults = await fetch("https://saurav.tech/NewsAPI/everything/cnn.json").then((res) => res.json());

  return (
    <div className="flex min-h-screen mx-auto">
      <SideBar />
      <Feed />
      <Widgets newsResults={newsResults.articles} />
    </div>
  );
}

// https://saurav.tech/NewsAPI/everything/cnn.json

// https://saurav.tech/NewsAPI/top-headlines/category/business/us.json

// export async function getServerSideProps() {
//   const newsResults = await fetch("https://saurav.tech/NewsAPI/everything/cnn.json").then((res) => res.json());
//   return{
//     props: {
//       newsResults ,
//     } ,
//   }
 
// }
