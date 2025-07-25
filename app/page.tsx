import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import ProjectToolbar from "../components/ProjectToolbar/ProjectToolbar";

export default function Home() {
  return (
    <>
      <Header />
      <Sidebar>
        <ProjectToolbar />
      </Sidebar>
    </>
  );
}
