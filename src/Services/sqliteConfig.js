import { db } from './firebaseConfig'; // Importa o Firebase
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import * as SQLite from 'expo-sqlite';

const database = SQLite.openDatabaseSync('estufa.db');

// 🔧 Criar tabela no SQLite se não existir
export const setupDatabase = async () => {
    try {
        await database.execAsync(
            `CREATE TABLE IF NOT EXISTS sensores (
                id TEXT PRIMARY KEY,
                tipo TEXT,
                valor REAL,
                timestamp TEXT
            );`
        );
    } catch (error) {
        console.error('❌ Erro ao criar banco:', error);
    }
};

// 🔥 Função para buscar os últimos dados do Firestore e salvar no SQLite
export const fetchTemperatureFromFirestore = async () => {
    try {
        const tempCollection = collection(db, "Dispositivos", "EG001", "Dados", "Temperatura", "Historico");

        // Query para pegar os últimos **50 registros** (ajuste conforme necessário)
        const q = query(tempCollection, orderBy("timestamp", "desc"), limit(50));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            console.log("⚠️ Nenhum dado novo coletado do Firestore.");
            return;
        }

        let novosRegistros = 0; // Contador de novos dados inseridos

        for (const doc of querySnapshot.docs) {
            const data = doc.data();
            const id = doc.id;
            const valor = parseFloat(data.TemperaturaAtual);

            // 🔧 Correção da conversão do timestamp
            let timestamp;
            if (data.timestamp && typeof data.timestamp.toDate === "function") {
                timestamp = data.timestamp.toDate().toISOString();
            } else if (typeof data.timestamp === "string") {
                timestamp = new Date(data.timestamp).toISOString();
            } else {
                continue;
            }

            // Verifica se o dado já existe antes de inserir
            const existingData = await database.getAllAsync("SELECT * FROM sensores WHERE id = ?", [id]);

            if (existingData.length === 0) {
                await database.runAsync(
                    "INSERT INTO sensores (id, tipo, valor, timestamp) VALUES (?, ?, ?, ?)",
                    [id, "temperatura", valor, timestamp]
                );
                novosRegistros++;
            }
        }

        console.log(`✅ Dados coletados com sucesso: ${novosRegistros} novos registros armazenados.`);

    } catch (error) {
        console.error("❌ Erro ao buscar temperatura do Firestore:", error);
    }
};

// 🔎 Função para buscar dados do SQLite e retornar via callback
export const getSensorData = async (callback) => {
    try {
        const result = await database.getAllAsync(
            "SELECT * FROM sensores ORDER BY timestamp ASC;", // Ordena do mais antigo para o mais recente
            []
        );

        if (result.length === 0) {
            console.log("⚠️ Nenhum dado encontrado no banco de dados SQLite.");
        } else {
            console.log(`📊 Total de registros no SQLite: ${result.length}`);
        }

        callback(result);
    } catch (error) {
        console.error("❌ Erro ao buscar dados do SQLite:", error);
    }
};
