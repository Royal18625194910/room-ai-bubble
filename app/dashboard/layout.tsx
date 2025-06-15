import DashboardHeader from "@/containers/DashboardHeader/DashboardHeader";
import React from "react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <DashboardHeader />
      <div className="pt-20 px-10 md:px-20 lg:px-40 xl:px-60">{children}</div>
    </div>
  );
};

export default DashboardLayout;
