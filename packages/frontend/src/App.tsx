import React from 'react';
import { Layout } from 'antd';
import FormilyForm from './components/FormilyForm';

const { Content } = Layout;

export const App: React.FC = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '50px' }}>
        <div className="site-layout-content">
          <FormilyForm />
        </div>
      </Content>
    </Layout>
  );
};
