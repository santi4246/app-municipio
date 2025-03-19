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
    const [infracciones, setInfracciones] = useState<Infraccion[]>([]);
    const [cuil, setCuil] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const labelColor = theme === 'dark' ? '#ccc' : '#000';
    const inputTextColor = theme === 'dark' ? '#000' : '#000';
    const inputBgColor = theme === 'dark' ? '#ffffff' : '#ffffff';
    const inputBorderColor = theme === 'dark' ? '#555555' : '#d9d9d9';
    const tableHeaderColor = theme === 'dark' ? '#000' : '#000';
    const tableCellColor = theme === 'dark' ? '#000' : '#000';

    useEffect(() => {
        api.getToken().then(response => {
            localStorage.setItem("_token", response.data!.value.token);
        }).catch(error => console.log(`Error: ${error}`));
    }, []);    

    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {        
        setLoading(true);
        setTimeout(() => {
            setCuil(true);
        }, 1500);
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
                    style={{ width: '100%', maxWidth: '500px' }}
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
                        label="Ingrese el Cuil/Cuit a consultar sin guiones ni espacioes"
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
                cuil && infracciones.length > 0 ?                
                    <Space className='table'>
                        <div>
                            <Table
                                loading={loading}
                                dataSource={infracciones.map((e: Infraccion) => ({
                                    key: e.NroTramite,
                                    id: e.NroTramite,
                                    fechaCreacion: moment(e.FechaHora).format("DD/MM/YYYY"),
                                    dominio: e.Titular.PatenteVehiculo,
                                    nombreInfractor: e.Titular.NombreCompletoTitular,
                                    cuilCuitInfractor: e.Titular.CuilTitular,
                                    direccionInfractor: e.Titular.DireccionCompletaTitular,
                                    dniInfractor: e.Titular.DocumentoTitular ? e.Titular.DocumentoTitular : "-"
                                }))}                                
                                columns={[
                                    {
                                        title: "Fecha",
                                        dataIndex: "fechaCreacion",
                                        key: "fechaCreacion",
                                        render: (text) => <span style={{ color: tableHeaderColor }}>{text}</span>,
                                        width: 150,                                        
                                        onHeaderCell: () => ({ style: { backgroundColor: "#ccc", color: tableCellColor, textAlign: "center" } })
                                    },
                                    {
                                        title: "Nro. Acta",
                                        dataIndex: "id",
                                        key: "id",
                                        render: (text) => <span style={{ color: tableHeaderColor }}>{text}</span>,
                                        width: 150,
                                        onHeaderCell: () => ({ style: { backgroundColor: "#ccc", color: tableCellColor, textAlign: "center" } })
                                    },
                                    {
                                        title: "Dominio",
                                        dataIndex: "dominio",
                                        key: "dominio",
                                        render: (text) => <span style={{ color: tableHeaderColor }}>{text}</span>,
                                        width: 150,
                                        onHeaderCell: () => ({ style: { backgroundColor: "#ccc", color: tableCellColor, textAlign: "center" } })
                                    },
                                    {
                                        title: "Nombre completo",
                                        dataIndex: "nombreInfractor",
                                        key: "nombreInfractor",
                                        render: (text) => <span style={{ color: tableHeaderColor }}>{text}</span>,
                                        width: 200,
                                        onHeaderCell: () => ({ style: { backgroundColor: "#ccc", color: tableCellColor, textAlign: "center" } })
                                    },
                                    {
                                        title: "Cuil/Cuit",
                                        dataIndex: "cuilCuitInfractor",
                                        key: "cuilCuitInfractor",
                                        render: (text) => <span style={{ color: tableHeaderColor }}>{text}</span>,
                                        width: 150,
                                        onHeaderCell: () => ({ style: { backgroundColor: "#ccc", color: tableCellColor, textAlign: "center" } })
                                    }
                                ]}
                                rowClassName="ant-table-row"
                                size = 'middle'
                                pagination={{ pageSize: 5, position: ['bottomRight'] }}                                                                
                                components={{
                                    body: {
                                      cell: (props) => (
                                        <td
                                          {...props}
                                          style={{
                                            ...props.style,
                                            color: tableCellColor,
                                            wordBreak: "break-word",
                                            textAlign: 'center',                                            
                                          }}
                                        />
                                      ),
                                    }
                                  }}
                            />
                        </div>
                    </Space> : null
            }
            {
                cuil && infracciones.length === 0 ? <p>No hay registros de infracciones para ese Cuil/Cuit</p> : undefined
            }
        </Content>
    )
};

export default Home;