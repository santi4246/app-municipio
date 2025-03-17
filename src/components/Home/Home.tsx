import type { FormProps } from 'antd';
import { Button, Form, Input, MenuTheme, Space, Table, } from 'antd';
import '@ant-design/v5-patch-for-react-19';
import { Content } from 'antd/es/layout/layout';
import "../../App.css";
import { useEffect, useState } from 'react';
import useInfraccionApi, { Infraccion } from '../../hooks/useInfraccionApi';
import moment from 'moment';


interface HomeProps {
    theme: MenuTheme;
    setTheme: React.Dispatch<React.SetStateAction<MenuTheme>>;
}

type FieldType = {
    CuitCuil?: string;
};

const Home = ({ theme, setTheme }: HomeProps) => {
    const api = useInfraccionApi();
    const [ infracciones, setInfracciones ] = useState<Infraccion[]>([]);
    const [ cuilt, setCuil ] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const labelColor = theme === 'dark' ? '#ccc' : '#000';
    const inputTextColor = theme === 'dark' ? '#000' : '#000';
    const inputBgColor = theme === 'dark' ? '#ffffff' : '#ffffff';
    const inputBorderColor = theme === 'dark' ? '#555555' : '#d9d9d9';

    useEffect(() => {
        api.getToken().then(response => {
            localStorage.setItem("_token", response.data!.value.token);
        }).catch(error => console.log(`Error: ${error}`));
    }, []);

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        console.log('Success:', values.CuitCuil);
        setLoading(true);
        setCuil(true);
        const response = await api.list(values.CuitCuil!, localStorage.getItem("_token")!);
        setInfracciones(response.data!.value);
        setLoading(false);
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        setCuil(false);        
    }, []);

    useEffect(() => {
        console.log(infracciones.map(e => e));
    }, [infracciones]);

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
            {
                cuilt && infracciones.length > 0 ?
                    <Table loading={loading} style={{ marginTop: 20 }} dataSource={infracciones.map((infraccion: Infraccion) => ({
                        id: infraccion.NroTramite,
                        key: infraccion.Id,
                        fecha: moment(infraccion.FechaHora).format("DD/MM/YYYY"),
                        motivo: infraccion.CodigoInfraccion?.Abreviatura
                    }))} columns={[
                        {
                            title: "Nro. Acta",
                            dataIndex: "id",
                            key: "id"
                        },                       
                    ]} />
                    : undefined
            }
            {
                cuilt && infracciones.length === 0 ? <p>No hay registros de infracciones para ese Cuil/Cuit</p> : undefined
            }
        </Content>
    )
};

export default Home;