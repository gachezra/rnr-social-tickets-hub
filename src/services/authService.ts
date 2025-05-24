import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, usersCollection, db } from "../utils/firebase";
import { User } from "../types";

export const authenticateUser = async (
  username: string,
  password: string
): Promise<User | null> => {
  try {
    // Find the user document by username
    const usersQuery = query(
      usersCollection,
      where("username", "==", username)
    );

    const snapshot = await getDocs(usersQuery);

    if (snapshot.empty) {
      return null; // User not found
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data() as User;

    // In a real app, you'd use Firebase Authentication with email/password
    // This is a simplified version for demo purposes
    if (userData.password === password) {
      return {
        id: userDoc.id,
        ...userData,
      } as User;
    }

    return null; // Password doesn't match
  } catch (error) {
    console.error("Error authenticating user:", error);
    throw error;
  }
};

// Initialize the admin users if they don't exist
export const initializeAdminUsers = async (): Promise<void> => {
  try {
    const adminQuery = query(usersCollection, where("role", "==", "admin"));

    // const snapshot = await getDocs(adminQuery);

    // if (snapshot.empty) {
    //   // Create default admin users
    //   const defaultUsers = [
    //     {
    //       id: 'usr-001',
    //       username: 'admin',
    //       password: 'rnradmin2023', // This would be hashed in a real application
    //       name: 'Admin User',
    //       role: 'admin' as const,
    //     },
    //     {
    //       id: 'usr-002',
    //       username: 'staff',
    //       password: 'rnrstaff2023', // This would be hashed in a real application
    //       name: 'Staff User',
    //       role: 'staff' as const,
    //     }
    //   ];

    //   for (const user of defaultUsers) {
    //     await setDoc(doc(db, 'users', user.id), user);
    //   }

    //   console.log('Default admin users created');
    // }
  } catch (error) {
    console.error("Error initializing admin users:", error);
  }
};
