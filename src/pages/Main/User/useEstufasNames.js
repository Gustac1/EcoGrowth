import { useState, useEffect } from 'react';
import { auth, db } from '../../../Services/firebaseConfig';
import { collection, query, onSnapshot } from "firebase/firestore";

export function useEstufasNames() {
  const [estufasNames, setEstufasNames] = useState([]);

  useEffect(() => {
    const fetchEstufasNames = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("Usuário não autenticado.");
          return;
        }

        const estufasRef = collection(db, 'usuarios', currentUser.uid, 'estufas');
        const q = query(estufasRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const names = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            if (data && data.nome) {
              names.push(data.nome);
            }
          });
          setEstufasNames(names);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Erro ao buscar os nomes das estufas:", error);
      }
    };

    fetchEstufasNames();
  }, []);

  return estufasNames;
}
