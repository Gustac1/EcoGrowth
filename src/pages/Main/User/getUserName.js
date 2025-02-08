import { useState, useEffect } from 'react';
import { auth, db } from '../../../Services/firebaseConfig';
import { doc, getDoc } from "firebase/firestore";

export function useUserName() {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("Usuário não autenticado.");
          return;
        }

        const userRef = doc(db, 'usuarios', currentUser.uid);
        const userSnapshot = await getDoc(userRef);

        if (!userSnapshot.exists()) {
          console.error("Documento do usuário não encontrado.");
          return;
        }

        setUserName(userSnapshot.data().Nome);
      } catch (error) {
        console.error("Erro ao buscar o nome do usuário:", error);
      }
    };

    fetchUserName();

    return () => {
      console.log("Limpeza de listener ou variáveis do useEffect");
    };
  }, []);

  return userName;
}
