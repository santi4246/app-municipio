import { MenuTheme } from 'antd';
import React, { ReactNode, useState } from 'react';
import NavBar from '../Menu/Navbar';

interface LayoutProps {
  children: (props: { theme: MenuTheme; setTheme: React.Dispatch<React.SetStateAction<MenuTheme>> }) => ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  const [theme, setTheme] = useState<MenuTheme>('dark');

  return (
    <div>
      <NavBar theme={theme} setTheme={setTheme} />      
      { children({ theme, setTheme }) }
    </div>
  );
};

export default MainLayout;