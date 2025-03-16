import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import Home from './pages/Home';
import CompanyData from './pages/Company';
import ExternalData from './pages/External';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/company-data" element={<CompanyData />} />
          <Route path="/external-data" element={<ExternalData />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
};
