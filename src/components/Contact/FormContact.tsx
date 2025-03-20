import "../../App.css";
import type { FormProps } from 'antd';
import { Button, Form, Input, MenuTheme, message, Space, Typography } from 'antd';
import TextArea from "antd/es/input/TextArea";
import { Content } from 'antd/es/layout/layout';
import emailjs from '@emailjs/browser';

interface FormularioProps {
    theme: MenuTheme;
    setTheme: React.Dispatch<React.SetStateAction<MenuTheme>>;
}

type FieldType = {
    Nombre: string;
    Email: string;
    Telefono: string;
    Cuil: string;
    Consulta: string;
};

const FormContact = ({ theme, setTheme }: FormularioProps) => {
    const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
        const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "";
        const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "";
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "";

        // Datos para el call center
        const callCenterParams = {
            nombre: values.Nombre,
            email: values.Email,
            telefono: values.Telefono,
            cuil: values.Cuil,
            consulta: values.Consulta,
            municipio: process.env.REACT_APP_NOMBRE_MUNICIPIO,
            to_email: process.env.REACT_APP_CALLCENTER_EMAIL,
        };

        try {
            // Enviar al call center
            await emailjs.send(serviceID, templateID, callCenterParams, publicKey);
            message.success("Datos enviados correctamente");
        } catch (error) {
            message.error("Hubo un error al enviar tu consulta. Inténtalo de nuevo.");
        }
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const labelColor = theme === 'dark' ? '#ccc' : '#000';
    const inputTextColor = theme === 'dark' ? '#000' : '#000';
    const inputBgColor = theme === 'dark' ? '#ffffff' : '#ffffff';
    const inputBorderColor = theme === 'dark' ? '#555555' : '#d9d9d9';

    return (
        <Content className='content' style={{ backgroundColor: theme === 'dark' ? 'var(--primary-color)' : 'var(--secondary-color)' }}>
            <div style={{ width: '100%', marginBottom: '20px', marginTop: '20px' }} >
                <Typography.Title level={2} style={{ color: labelColor, textAlign: 'center' }} className="title-form">
                    Formulario de Contacto
                </Typography.Title>
            </div>
            <Space className='space'>
                <Form
                    initialValues={{
                        ["Nombre"]: "",
                        ["Email"]: "",
                        ["Telefono"]: "",
                        ["Cuil"]: "",
                        ["Consulta"]: "",
                        remember: true
                    }}
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style={{ width: '100%', maxWidth: '500px', backgroundColor: 'gray', borderRadius: '10px', padding: '5px' }}
                    autoComplete="off"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        rules={[
                            { required: true, message: "Campo requerido" }
                        ]}
                        required
                        name={"Nombre"}
                        label="Ingrese su nombre completo"
                        style={{ color: labelColor, wordWrap: 'break-word', lineHeight: '1.5', width: '85%', fontSize: '0.8rem', justifySelf: 'center' }}
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
                    <Form.Item
                        rules={[
                            { required: true, message: "Campo requerido" }
                        ]}
                        required
                        name={"Email"}
                        label="Ingrese su correo electrónico"
                        style={{ color: labelColor, wordWrap: 'break-word', lineHeight: '1.5', width: '85%', fontSize: '0.8rem', justifySelf: 'center' }}
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
                    <Form.Item
                        rules={[
                            { required: true, message: "Campo requerido" }
                        ]}
                        required
                        name={"Telefono"}
                        label="Ingrese número de teléfono"
                        style={{ color: labelColor, wordWrap: 'break-word', lineHeight: '1.5', width: '85%', fontSize: '0.8rem', justifySelf: 'center' }}
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
                    <Form.Item
                        rules={[
                            { required: true, message: "Campo requerido" }
                        ]}
                        required
                        name={"Cuil"}
                        label="Ingrese su cuil/cuit sin guiones ni espacios"
                        style={{ color: labelColor, wordWrap: 'break-word', lineHeight: '1.5', width: '85%', fontSize: '0.8rem', justifySelf: 'center' }}
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
                    <Form.Item
                        rules={[
                            { required: true, message: "Campo requerido" }
                        ]}
                        required
                        name={"Consulta"}
                        label="Ingrese su consulta"
                        style={{ color: labelColor, wordWrap: 'break-word', lineHeight: '1.5', width: '85%', fontSize: '0.8rem', justifySelf: 'center' }}
                        className='ant-form-item-label'
                    >
                        <TextArea placeholder="Descripción del motivo" rows={3} maxLength={500} style={{ color: inputTextColor, backgroundColor: inputBgColor, borderColor: inputBorderColor }} />
                    </Form.Item>
                    <Form.Item label={null} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '92%' }}>
                        <Button type="primary" htmlType="submit" >Enviar</Button>
                    </Form.Item>
                </Form>
            </Space>
        </Content>
    )
};

export default FormContact;