// pages/DashboardPage.tsx
import React from "react";
// import PowerBIEmbed from "../components/PowerBIEmbed";
import PowerBIEmbed from "../components/Power";
import "../css/DashboardPage.css";

const DashboardPage: React.FC = () => {
  const powerBiUrl =
    "https://app.powerbi.com/view?r=eyJrIjoiZTcyMzZiYTQtYzhmOS00YzZiLTgwMzEtMmFkNWJlYTE2YWNhIiwidCI6IjU3NGExZTM2LTYxNDktNGY2Ni05ZTBmLWM3MGIyMDQzNTQyMCJ9&pageName=7cf7511f6cbace1a4c14";

  return (
    <div className="dashboard-container">
      <h1>App Dashboard</h1>
      <center style={{color:"#fff"}}>
        <p>Cultivating Insights, Growing Success</p>
      </center>
      <div className="dashboard-content">
        <PowerBIEmbed title="App Dashboard" src={powerBiUrl} />
      </div>
    </div>
  );
};

export default DashboardPage;
