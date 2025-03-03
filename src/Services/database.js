import * as SQLite from "expo-sqlite";

// Abre ou cria o banco de dados local
const db = SQLite.openDatabase("estufa.db");

// Função para criar a tabela se não existir
export const setupDatabase = () => {
    db.transaction(tx => {
        tx.executeSql(
            `CREATE TABLE IF NOT EXISTS sensor_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sensor TEXT,
                timestamp TEXT,
                valor REAL
            );`,
            [],
            () => console.log("✅ Banco de dados configurado!"),
            (_, error) => console.error("❌ Erro ao criar a tabela:", error)
        );
    });
};

// Função para inserir novos dados no banco
export const insertSensorData = (sensor, timestamp, valor) => {
    db.transaction(tx => {
        tx.executeSql(
            `INSERT INTO sensor_data (sensor, timestamp, valor) VALUES (?, ?, ?);`,
            [sensor, timestamp, valor],
            () => console.log("✅ Dados inseridos:", { sensor, timestamp, valor }),
            (_, error) => console.error("❌ Erro ao inserir dados:", error)
        );
    });
};

// Função para buscar os últimos 20 registros de um sensor
export const getSensorData = (sensor, callback) => {
    db.transaction(tx => {
        tx.executeSql(
            "SELECT timestamp, valor FROM sensor_data WHERE sensor = ? ORDER BY timestamp DESC LIMIT 20;",
            [sensor],
            (_, { rows }) => callback(rows._array),
            (_, error) => console.error("❌ Erro ao buscar dados:", error)
        );
    });
};

export default db;
