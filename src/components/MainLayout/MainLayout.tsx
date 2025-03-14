import { MenuTheme } from "antd";
import { ReactNode, useState } from "react";
import NavBar from "../Menu/Navbar";

interface LayoutProps {
    children: ReactNode;
  }

const MainLayout = ({ children }: LayoutProps) => {
    const [ theme, setTheme ] = useState<MenuTheme>('dark');
    return (
        <div>          
          <NavBar theme = { theme } setTheme = { setTheme } />
          {/* Aquí se renderizan las rutas específicas */}
          <main>{children}</main>
        </div>
      );
};

export default MainLayout;