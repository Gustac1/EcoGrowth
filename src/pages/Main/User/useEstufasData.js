import { useState, useEffect } from 'react';
import { auth, db } from '../../../Services/firebaseConfig';
import { collection, query, onSnapshot } from "firebase/firestore";

export function useEstufasData() {
  const [estufasData, setEstufasData] = useState([]);

  useEffect(() => {
    const fetchEstufasData = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          console.error("Usuário não autenticado.");
          return;
        }

        const estufasRef = collection(db, 'usuarios', currentUser.uid, 'estufas');
        const q = query(estufasRef);

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const data = [];
          snapshot.forEach((doc) => {
            const docData = doc.data();
            if (docData && docData.nome && docData.codigo) {
              data.push({ nome: docData.nome, codigo: docData.codigo });
            }
          });
          console.log("Dados das estufas:", data); // Log dos dados das estufas
          setEstufasData(data);
        });

        return () => unsubscribe();
      } catch (error) {
        console.error("Erro ao buscar os dados das estufas:", error);
      }
    };

    fetchEstufasData();
  }, []);

  return estufasData;
}
