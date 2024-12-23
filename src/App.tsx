import { Dashboard } from "./components/Dashboard/DashboardInfo";
import { SideBar } from "./layout/SideBar";

export const App = () => {
  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Dashboard />
      <div style={{ width: "514px" }}>red</div>
    </div>
  );
};
