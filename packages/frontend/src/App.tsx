import React from 'react';
import { Layout, Typography, Button, Space } from 'antd';
import { GithubOutlined } from '@ant-design/icons';
import FormilyForm from './components/FormilyForm';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

export const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header className="header">
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ color: 'white', fontSize: '1.5em' }}>AI Code Transparency Form</div>
          <Space>
            <Button type="link" icon={<GithubOutlined />} href="https://github.com" target="_blank">
              GitHub
            </Button>
          </Space>
        </div>
      </Header>

      <Content style={{ padding: '50px' }}>
        <div className="site-layout-content">
          <FormilyForm />
        </div>
      </Content>

      <Footer style={{ textAlign: 'center' }}>
        AI Code Transparency Form ©{new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};
