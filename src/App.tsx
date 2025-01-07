// import { Schedule } from "./components/Schedule/CalendarByCabinet";
// import { CalendarByDay } from "./components/Schedule/CalendarByDay";
// import { CalendarByWeek } from "./components/Schedule/CalendarByWeek";
// import { CalendarMonth } from "./components/Schedule/CalendarMonth";
import { Header } from "./layout/Header";
import { SideBar } from "./layout/SideBar";

import DashboardPage from "./pages/DashboardPage";

export const App = () => {
  return (
    <div style={{ background: "#F2F2F2" }}>
      <Header />

      <main style={{ display: "flex" }}>
        <SideBar />
        <DashboardPage />
        {/* <Schedule /> */}
        {/* <CalendarMonth /> */}
        {/* <CalendarByDay /> */}
        {/* <CalendarByWeek /> */}
      </main>
    </div>
  );
};
