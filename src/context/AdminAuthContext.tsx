import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { AdminUser, AdminSession, AdminRole } from '../types';
import { adminService } from '../services/adminService';
import { useToast } from './ToastContext';

interface AdminAuthContextValue {
  adminUser: AdminUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: AdminRole | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: (reason?: string) => void;
  sessionExpiresAt: number | null;
  timeRemainingMinutes: number;
  lastActiveTime: number;
  refreshActivity: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextValue | undefined>(undefined);

const INACTIVITY_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes idle timeout

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [sessionExpiresAt, setSessionExpiresAt] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastActiveTime, setLastActiveTime] = useState<number>(Date.now());
  const [timeRemainingMinutes, setTimeRemainingMinutes] = useState<number>(30);
  const { showWarning, showSuccess, showError } = useToast();

  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const logout = useCallback((reason?: string) => {
    adminService.logout();
    setAdminUser(null);
    setSessionExpiresAt(null);
    if (reason) {
      showWarning('Session Terminated', reason);
    } else {
      showSuccess('Logged Out', 'You have been securely signed out of the Admin Portal.');
    }
  }, [showWarning, showSuccess]);

  // Check existing session on mount
  useEffect(() => {
    try {
      const activeSession = adminService.getCurrentSession();
      if (activeSession && activeSession.user) {
        setAdminUser(activeSession.user);
        setSessionExpiresAt(activeSession.expiresAt);
        setLastActiveTime(Date.now());
      }
    } catch {
      adminService.logout();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshActivity = useCallback(() => {
    setLastActiveTime(Date.now());
  }, []);

  // Inactivity tracking listener
  useEffect(() => {
    if (!adminUser) return;

    const handleUserActivity = () => {
      setLastActiveTime(Date.now());
    };

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'mousemove'];
    events.forEach((evt) => window.addEventListener(evt, handleUserActivity, { passive: true }));

    // Periodic check interval
    const interval = setInterval(() => {
      const now = Date.now();
      const idleTime = now - lastActiveTime;
      const remainingMs = Math.max(0, INACTIVITY_TIMEOUT_MS - idleTime);
      const remainingMins = Math.ceil(remainingMs / (60 * 1000));
      setTimeRemainingMinutes(remainingMins);

      if (idleTime >= INACTIVITY_TIMEOUT_MS) {
        logout('Your administrative session timed out after 30 minutes of inactivity for security.');
      }
    }, 15000);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, handleUserActivity));
      clearInterval(interval);
    };
  }, [adminUser, lastActiveTime, logout]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const session = await adminService.login(email, password);
      setAdminUser(session.user);
      setSessionExpiresAt(session.expiresAt);
      setLastActiveTime(Date.now());
      setTimeRemainingMinutes(30);
      showSuccess(
        `Welcome, ${session.user.name}`,
        `Authenticated as ${session.user.role === 'superadmin' ? 'Superadmin' : 'Clinic Manager'}.`
      );
      return true;
    } catch (err: any) {
      showError('Authentication Failed', err.message || 'Invalid administrator credentials.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        isAuthenticated: !!adminUser,
        isLoading,
        role: adminUser ? adminUser.role : null,
        login,
        logout,
        sessionExpiresAt,
        timeRemainingMinutes,
        lastActiveTime,
        refreshActivity
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = (): AdminAuthContextValue => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
