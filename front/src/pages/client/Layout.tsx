import React, { ReactElement, ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }): ReactElement => {
  return (
    <div className="w-screen h-screen bg-red-100 flex flex-col px-20">
      <section className="h-1/6 w-full flex items-center  justify-center ">
        <img className="" src="https://www.cihbank.ma/sites/all/themes/cih/logo.png" alt=""  />
      </section>
      <section className="h-5/6 w-full">{children}</section>
    </div>
  );
};
