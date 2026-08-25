import React from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { AdminLoginGateway } from './AdminLoginGateway';
import { AdminLayout } from './AdminLayout';

interface ProtectedRouteProps {
  onExitPortal: () => void;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ onExitPortal }) => {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return (
      <AdminLoginGateway
        onLoginSuccess={() => {
          // Handled by context
        }}
        onBackToWebsite={onExitPortal}
      />
    );
  }

  return <AdminLayout onExitPortal={onExitPortal} />;
};
