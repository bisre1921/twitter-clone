import SideBar from "@/component/SideBar";
import "./globals.css";
import Feed from "@/component/Feed";
import Widgets from "@/component/Widgets";

export default function Home() {
  return (
    <div className="flex min-h-screen max-w-7xl mx-auto">
      <SideBar />
      <Feed />
      <Widgets />
    </div>
  );
}
