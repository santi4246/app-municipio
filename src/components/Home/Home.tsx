import { Form, Input, Space } from 'antd';
import { Content } from 'antd/es/layout/layout';
import "../../App.css";

const Home = () => {    
    return (
        <Content className = 'content'>
            <Space className = 'space'>                
                <Form
                initialValues={{
                    ["CuitCuil"]: "",
                }}
                style = {{ width: '100%' }}
                >
                    <Form.Item
                    rules = {[
                        { required: true, message: "Campo requerido" }
                    ]}
                    required
                    name = { "CuitCuil" }
                    label = "Ingrese el Cuit/Cuil a consultar sin guiones ni espacioes"  
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    style = {{ textAlign: 'center' }}
                    >                        
                        <Input />
                    </Form.Item>
                </Form>
            </Space>
        </Content>
    )
};

export default Home;