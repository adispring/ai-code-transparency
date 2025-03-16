import React from 'react';
import { Layout, Tabs } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

const { Content } = Layout;

const routes = [
  { key: '/', label: '首页' },
  { key: '/company-data', label: '公司数据' },
  { key: '/external-data', label: '外部数据' },
];

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleTabChange = (key: string) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content>
        <Tabs
          items={routes.map(({ key, label }) => ({ key, label }))}
          activeKey={location.pathname === '/' ? '/' : location.pathname}
          centered
          onChange={handleTabChange}
        />
        <div style={{ padding: '24px' }}>{children}</div>
      </Content>
    </Layout>
  );
};

export default MainLayout;
