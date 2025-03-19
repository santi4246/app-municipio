import { Menu, MenuTheme, Switch, type MenuProps } from 'antd';
import { CarOutlined, MenuOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: '',
    key: 'menu-sidebar',
    icon: <MenuOutlined style={{ marginLeft: '6px' }} />,
    style: { width: '30%', display: 'flex', alignSelf: 'center', justifyContent: 'center' }
  },
  {
    label: `Municipio de ${process.env.REACT_APP_NOMBRE_MUNICIPIO}`,
    key: 'logo',
    style: { marginRight: 'auto', opacity: '0.5', pointerEvents: 'none', color: 'white' },
  },
  {
    label: (<Link to={'/'}>Infracciones</Link>),
    key: 'infracciones',
    icon: <CarOutlined />,    
  },
  {
    label: (<Link to={'/contact'}>Contacto</Link>),
    key: 'contact',
    icon: <WhatsAppOutlined />,    
  }
];

const NavBar = (props: { theme: MenuTheme, setTheme: React.Dispatch<React.SetStateAction<MenuTheme>> }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [current, setCurrent] = useState('');
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation();
  let backgroundColor = props.theme === 'light' ? '#1d1d1d' : undefined
  const labelColor = props.theme === 'dark' ? 'var(--label-color-light)' : 'var(--label-color-dark)';

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    location.pathname === '/' ? setCurrent('infracciones') : setCurrent('contact');
  }, []);

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    if (e.key === 'menu-sidebar') {
      setCollapsed(!collapsed);
    }
  };

  const changeTheme = (value: boolean) => {
    props.setTheme(value ? 'dark' : 'light');
  };

  return (
    <div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items.filter(e => e?.key !== 'menu-sidebar')} theme={props.theme} style={{ display: screenWidth <= 750 ? 'none' : 'flex', padding: '10px 0', backgroundColor: backgroundColor }} />
      <Menu
        defaultSelectedKeys={[current]}
        defaultOpenKeys={[current]}
        mode="inline"
        theme={props.theme}
        inlineCollapsed={collapsed}
        items={items.filter(e => e?.key !== 'logo')}
        style={{ color: labelColor, marginLeft: 'auto', display: screenWidth <= 750 ? 'flex' : 'none', flexDirection: 'column', width: collapsed ? '15%' : '30%', position: 'absolute', top: 0, left: 0, zIndex: 1000, height: '20vh', boxShadow: 'none', border: 'none', backgroundColor: 'rgba(0, 21, 41, 0.3)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(20px)', transition: 'all 0.3s ease' }}
        onClick={onClick}
      />
      <Switch
          checked={props.theme === 'dark'}
          onChange={changeTheme}
          checkedChildren="Dark"
          unCheckedChildren="Light"
          style={{ display: 'flex', marginRight: 'auto', position: 'fixed', top: screenWidth <= 400 ? '15px' : '100px', right: screenWidth <= 400 ? '5px' : '20px', zIndex: 10 }}          
        />
    </div>
  )
};

export default NavBar;