import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, googleAuthProvider, testFirestoreConnection } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestoreErrors';
import { UserProfile } from '../types';

interface UserProfileContextType {
  profile: UserProfile;
  hasCustomProfile: boolean;
  isLoaded: boolean;
  isProfileModalOpen: boolean;
  currentUser: User | null;
  isAuthenticating: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  saveProfile: (newProfile: Partial<UserProfile>) => Promise<void>;
  clearProfile: () => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
}

const STORAGE_KEY = 'vedic_astro_user_profile_v1';

export const DEFAULT_PROFILE: UserProfile = {
  fullName: 'Vikram Sharma',
  dob: '1995-07-15',
  tob: '10:30',
  pob: 'Delhi, India',
  gender: 'male',
  phone: '',
  email: '',
  gotra: '',
  savedAt: undefined,
};

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(DEFAULT_PROFILE);
  const [hasCustomProfile, setHasCustomProfile] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  // Initial connection test & Auth listener
  useEffect(() => {
    testFirestoreConnection();

    // 1. Initial Local Storage Load as fast local cache
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object' && parsed.fullName && parsed.dob) {
          setProfile({ ...DEFAULT_PROFILE, ...parsed });
          setHasCustomProfile(true);
        }
      }
    } catch (err) {
      console.warn('Could not read user profile from localStorage:', err);
    } finally {
      setIsLoaded(true);
    }

    // 2. Firebase Auth Listener
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch or create profile from Firestore
        const userRef = doc(db, 'users', user.uid);
        try {
          const snap = await getDoc(userRef);
          if (snap.exists()) {
            const data = snap.data();
            setProfile((prev) => ({
              ...prev,
              fullName: data.fullName || prev.fullName || user.displayName || 'Vedic Native',
              dob: data.dob || prev.dob,
              tob: data.tob || prev.tob,
              pob: data.pob || prev.pob,
              gender: data.gender || prev.gender,
              phone: data.phone || prev.phone,
              email: data.email || user.email || prev.email,
              gotra: data.gotra || prev.gotra,
              savedAt: data.updatedAt || prev.savedAt,
            }));
            setHasCustomProfile(true);
          } else {
            // First time login - initialize Firestore record
            const initialData = {
              userId: user.uid,
              fullName: user.displayName || profile.fullName || 'Vedic Seeker',
              email: user.email || profile.email || '',
              dob: profile.dob || '1995-07-15',
              tob: profile.tob || '10:30',
              pob: profile.pob || 'Delhi, India',
              gender: profile.gender || 'male',
              phone: profile.phone || '',
              gotra: profile.gotra || '',
              updatedAt: new Date().toISOString(),
            };
            await setDoc(userRef, initialData);
          }
        } catch (err: any) {
          console.error('Failed to sync profile with Firestore:', err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    setIsAuthenticating(true);
    try {
      await signInWithPopup(auth, googleAuthProvider);
    } catch (error: any) {
      console.error('Google Sign-In failed:', error);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error: any) {
      console.error('Sign-Out failed:', error);
    }
  };

  const saveProfile = async (newProfile: Partial<UserProfile>) => {
    const updated: UserProfile = {
      ...profile,
      ...newProfile,
      savedAt: new Date().toISOString(),
    };
    setProfile(updated);
    setHasCustomProfile(true);

    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to save profile to localStorage:', err);
    }

    // Save to Firestore if authenticated
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      const payload = {
        userId: auth.currentUser.uid,
        fullName: updated.fullName.trim().slice(0, 100) || 'Vedic Native',
        dob: updated.dob ? updated.dob.slice(0, 20) : '',
        tob: updated.tob ? updated.tob.slice(0, 10) : '',
        pob: updated.pob ? updated.pob.slice(0, 120) : '',
        gender: updated.gender || 'male',
        phone: updated.phone ? updated.phone.slice(0, 25) : '',
        email: updated.email ? updated.email.slice(0, 150) : (auth.currentUser.email || ''),
        gotra: updated.gotra ? updated.gotra.slice(0, 80) : '',
        updatedAt: new Date().toISOString(),
      };

      try {
        await setDoc(userRef, payload, { merge: true });
      } catch (err: any) {
        handleFirestoreError(err, OperationType.WRITE, `users/${auth.currentUser.uid}`);
      }
    }
  };

  const clearProfile = () => {
    setProfile(DEFAULT_PROFILE);
    setHasCustomProfile(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('Failed to clear profile from localStorage:', err);
    }
  };

  const openProfileModal = () => setIsProfileModalOpen(true);
  const closeProfileModal = () => setIsProfileModalOpen(false);

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        hasCustomProfile,
        isLoaded,
        isProfileModalOpen,
        currentUser,
        isAuthenticating,
        signInWithGoogle,
        signOutUser,
        saveProfile,
        clearProfile,
        openProfileModal,
        closeProfileModal,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = (): UserProfileContextType => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
};
