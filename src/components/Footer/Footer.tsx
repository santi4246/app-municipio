import { Menu, MenuProps, MenuTheme } from "antd";
import moment from "moment";
import { useState } from "react";

const now = moment();

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [  
  {
    label: (<span dangerouslySetInnerHTML={{__html: `Neuraltech ${now.year()} &#174;`,}}
        />
      ),
    key: 'logo-footer',
    style: { margin: 'auto', opacity: '1', pointerEvents: 'none', color: 'white' },
  },  
];

const Footer = (props: { theme: MenuTheme, setTheme: React.Dispatch<React.SetStateAction<MenuTheme>> }) => {
    const [ current, setCurrent ] = useState('');
    let backgroundColor = props.theme === 'light' ? '#1d1d1d' : undefined
    const onClick: MenuProps['onClick'] = (e) => {
        setCurrent(e.key);        
      };
    return (
        <div>

        <Menu onClick = { onClick } selectedKeys = { [current] } mode = "horizontal" items = { items } theme = { props.theme } style = {{ padding: '13px 0', backgroundColor: backgroundColor }} className = "footer" />        
        </div>
    )
};

export default Footer;