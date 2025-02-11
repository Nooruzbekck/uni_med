import { DashboardInfo } from "../components/Dashboard/DashboardInfo";
import { ScheduleDashboard } from "../components/Dashboard/SheduleDashboard";

const DashboardPage = () => {
  return (
    <div style={{ display: "flex" }}>
      <DashboardInfo />
      <ScheduleDashboard />
    </div>
  );
};

export default DashboardPage;
