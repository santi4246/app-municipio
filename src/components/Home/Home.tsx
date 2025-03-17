import type { FormProps } from 'antd';
import { Button, Form, Input, MenuTheme, Space, } from 'antd';
import { Content } from 'antd/es/layout/layout';
import "../../App.css";
import { useEffect } from 'react';


interface HomeProps {
    theme: MenuTheme;
    setTheme: React.Dispatch<React.SetStateAction<MenuTheme>>;
}

type FieldType = {
    CuitCuil?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values.CuitCuil);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

const Home = ({ theme, setTheme }: HomeProps) => {
    const labelColor = theme === 'dark' ? '#ccc' : '#000';
    const inputTextColor = theme === 'dark' ? '#000' : '#000';  // Mantener el texto negro para ambos modos
    const inputBgColor = theme === 'dark' ? '#ffffff' : '#ffffff';  // Fondo blanco para los inputs en ambos modos
    const inputBorderColor = theme === 'dark' ? '#555555' : '#d9d9d9'; // Ajustar borde según el tema

    useEffect(() => {
        console.log("Tema: ", theme);
    }, []);
    return (
        <Content className='content' style={{ backgroundColor: theme === 'dark' ? 'var(--primary-color)' : 'var(--secondary-color)' }}>
            <Space className='space'>
                <Form
                    initialValues={{
                        ["CuitCuil"]: "",
                        remember: true
                    }}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ width: '100%' }}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        rules={[
                            { required: true, message: "Campo requerido" }
                        ]}
                        required
                        name={"CuitCuil"}
                        label="Ingrese el Cuit/Cuil a consultar sin guiones ni espacioes"
                        style={{ color: labelColor, wordWrap: 'break-word', lineHeight: '1.5', width: '100%', fontSize: '0.8rem' }}
                        className='ant-form-item-label'
                    >
                        <Input 
                        style={{
                            color: inputTextColor,
                            backgroundColor: inputBgColor,
                            borderColor: inputBorderColor
                          }}
                        />
                    </Form.Item>
                    <Form.Item label={null} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <Button type="primary" htmlType="submit" >Consultar</Button>
                    </Form.Item>
                </Form>
            </Space>
        </Content>
    )
};

export default Home;