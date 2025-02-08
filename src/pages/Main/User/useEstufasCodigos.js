// useEstufasCodigos.js

import { useState, useEffect } from 'react';
import { auth, db } from '../../../Services/firebaseConfig';
import { collection, query, onSnapshot } from "firebase/firestore";

export function useEstufasCodigos() {
  const [estufasCodigos, setEstufasCodigos] = useState([]);

  useEffect(() => {
    const fetchEstufasCodigos = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("Usuário não autenticado.");
          return;
        }

        const estufasRef = collection(db, 'usuarios', currentUser.uid, 'estufas');
        const q = query(estufasRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const codigos = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data && data.codigo) {
              codigos.push(data.codigo);
            }
          });
          setEstufasCodigos(codigos);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Erro ao buscar os códigos das estufas:", error);
      }
    };

    fetchEstufasCodigos();
  }, []);

  return estufasCodigos;
}
