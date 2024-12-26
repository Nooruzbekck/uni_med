import { Schedule } from "./components/Schedule/CalendarByCabinet";
import { Header } from "./layout/Header";
import { SideBar } from "./layout/SideBar";

// import DashboardPage from "./pages/DashboardPage";

export const App = () => {
  return (
    <div style={{ background: "#F2F2F2" }}>
      <Header />

      <main style={{ display: "flex" }}>
        <SideBar />
        {/* <DashboardPage /> */}
        <Schedule />
      </main>
    </div>
  );
};
