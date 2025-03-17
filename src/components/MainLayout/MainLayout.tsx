import { MenuTheme } from 'antd';
import React, { ReactNode, useState } from 'react';
import NavBar from '../Menu/Navbar';
import Footer from '../Footer/Footer';
import { ConfigProvider } from 'antd';


interface LayoutProps {
  children: (props: { theme: MenuTheme; setTheme: React.Dispatch<React.SetStateAction<MenuTheme>> }) => ReactNode;
}

const MainLayout = ({ children }: LayoutProps) => {
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const themeConfig = {
    token: {        
        colorTextBase: theme === 'dark' ? '#fff' : '#000',
        colorLabel: theme === 'dark' ? '#ccc' : '#000',
    }
};

  return (
    <div className = 'App'>
      <ConfigProvider theme = { themeConfig }>
        <NavBar theme={theme} setTheme={setTheme} />
        {children({ theme, setTheme })}
        <Footer theme={theme} setTheme={setTheme} />
      </ConfigProvider>
    </div>    
  );
};

export default MainLayout;