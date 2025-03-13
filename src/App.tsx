import './App.css';
import { Menu, MenuTheme, Switch, type MenuProps } from 'antd';
import { MenuOutlined, WhatsAppOutlined } from '@ant-design/icons';
import { useState } from 'react';

type MenuItem = Required<MenuProps>['items'][number];

const showSideBar = () => {
  console.log("Show Menu");
  /* const sidebar = document.querySelector('.sidebar');
  sidebar.style.display = 'flex'; */
}

const items: MenuItem[] = [
  {
    label: `Municipio de ${process.env.REACT_APP_NOMBRE_MUNICIPIO}`,
    key: 'logo',
    style: { marginRight: 'auto', opacity: '0.5', pointerEvents: 'none' },
  },
  {
    label: 'Infracciones',
    key: 'infracciones',    
  },
  {
    label: 'Contacto',
    key: 'contacto',
    icon: <WhatsAppOutlined />,
  },
  {
    label: '',
    key: 'menu',
    icon: <MenuOutlined />,
    style: { opacity: '1', paddingRight: '5px' },    
    onClick: () => showSideBar
  },
];

function App() {
  const [current, setCurrent] = useState('');
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const [hovered, setHovered] = useState(false);
  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  return (
    <div>
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style = {{}} theme = { theme }/>
      <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} className = 'sidebar' theme = { theme }/>
      <div style = {{ margin: '15px 15px' }}>
      <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
        style = {{ display: 'flex', marginLeft: 'auto' }} 
      />
      </div>
    </div>    
  )
}

export default App;