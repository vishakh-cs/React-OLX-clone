import { createContext, useContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { Auth, db } from '../Services/firebase';
import { doc, setDoc } from 'firebase/firestore';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(Auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function SignUp(email, password) {
    try {
      const userCredential = await createUserWithEmailAndPassword(Auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', email), {
        favShows: [],
      });

      console.log('User created:', user);
      return userCredential.user;
    } catch (error) {
      console.error('Error creating user:', error.message);
      
    }
  }

  function Login(email, password) {
    signInWithEmailAndPassword(Auth, email, password);
}

  async function logout() {
    try {
      await signOut(Auth);
    } catch (error) {
      console.error('Error logging out:', error.message);
      
    }
  }

  return (
    <AuthContext.Provider value={{ user, SignUp, Login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function userAuth() {
  const context = useContext(AuthContext);
  return  context || { user: null };
}
