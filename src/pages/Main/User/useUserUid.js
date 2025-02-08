import { useState, useEffect } from 'react';
import { auth, db } from '../../../Services/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";

export function useUserUid() {
  const [userUid, setUserUid] = useState(null);

  useEffect(() => {
    const fetchUserUid = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("Usuário não autenticado.");
          return;
        }

        setUserUid(currentUser.uid);
      } catch (error) {
        console.error("Erro ao buscar o UID do usuário:", error);
      }
    };

    fetchUserUid();
  }, []);

  return userUid;
}
