import { DashboardInfo } from "../components/Dashboard/DashboardInfo";
import { ScheduleDashboard } from "../components/Dashboard/SheduleDashboard";
import { SideBar } from "../layout/SideBar";

const DashboardPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <DashboardInfo />
      <ScheduleDashboard />
    </div>
  );
};

export default DashboardPage;
