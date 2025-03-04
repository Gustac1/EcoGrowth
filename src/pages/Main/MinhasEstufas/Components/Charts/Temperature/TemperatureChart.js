import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getSensorData, fetchTemperatureFromFirestore } from '../../../../../../Services/sqliteConfig'; 

const TemperatureChart = () => {
    const [chartData, setChartData] = useState({
        labels: ["00:00"], 
        datasets: [{ data: [0] }],
    });

    const [timeRange, setTimeRange] = useState('24h'); // Alterna entre '24h' e '1h'

    useEffect(() => {
        const loadTemperatureData = async () => {
            await fetchTemperatureFromFirestore(); // Busca os dados do Firestore antes de ler o SQLite

            getSensorData((data) => {
                if (!data || data.length === 0) {
                    setChartData({ labels: ["00:00"], datasets: [{ data: [0] }] });
                    return;
                }

                const filteredData = data
                    .map(item => ({
                        timestamp: new Date(item.timestamp),
                        valor: parseFloat(item.valor),
                    }))
                    .filter(item => !isNaN(item.valor) && isFinite(item.valor));

                if (filteredData.length === 0) {
                    setChartData({ labels: ["00:00"], datasets: [{ data: [0] }] });
                    return;
                }

                // 🔥 Agrupa os dados para manter organização e evitar poluição
                const dataFiltered = groupDataByTime(
                    filteredData, 
                    timeRange === '24h' ? 2 : 5 / 60,  // Intervalo: 2h para 24h, 5min para 1h
                    12  // Máximo de 12 pontos
                );

                const labels = dataFiltered.map(item =>
                    `${String(item.timestamp.getHours()).padStart(2, '0')}:${String(item.timestamp.getMinutes()).padStart(2, '0')}`
                );

                const values = dataFiltered.map(item => item.valor);

                setChartData({
                    labels: labels.length > 0 ? labels : ["00:00"],
                    datasets: [{ data: values.length > 0 ? values : [0] }],
                });
            });
        };

        loadTemperatureData();
    }, [timeRange]); // Atualiza sempre que o usuário mudar o filtro

    // 🔥 Função para agrupar os dados por tempo e evitar poluição no gráfico
    const groupDataByTime = (data, intervalHours, limit) => {
        const now = new Date();
        const groupedData = [];
    
        for (let i = limit - 1; i >= 0; i--) {
            const start = new Date(now - i * intervalHours * 60 * 60 * 1000);
            const end = new Date(start.getTime() + intervalHours * 60 * 60 * 1000);
            
            // Filtra os dados dentro do intervalo
            const values = data.filter(item => {
                const itemTime = new Date(item.timestamp);
                return itemTime >= start && itemTime < end;
            }).map(item => item.valor);
    
            if (values.length > 0) {
                const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
                groupedData.push({
                    timestamp: start, 
                    valor: avg
                });
            } else {
                // Se não houver dados no intervalo, mantém o último valor ou define 0
                const lastValue = groupedData.length > 0 ? groupedData[groupedData.length - 1].valor : 0;
                groupedData.push({
                    timestamp: start,
                    valor: lastValue
                });
            }
        }
    
        return groupedData;
    };

    return (
        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Tendência de Temperatura</Text>

            {/* Botões de alternância entre 24h e 1h */}
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[styles.toggleButton, timeRange === '24h' && styles.selectedButton]}
                    onPress={() => setTimeRange('24h')}
                >
                    <Text style={styles.toggleText}>Últimas 24h</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.toggleButton, timeRange === '1h' && styles.selectedButton]}
                    onPress={() => setTimeRange('1h')}
                >
                    <Text style={styles.toggleText}>Última 1h</Text>
                </TouchableOpacity>
            </View>

            {/* Gráfico de Temperatura */}
            <LineChart
                data={chartData}
                width={350}
                height={220}
                yAxisSuffix="°C"
                fromZero={true}
                xLabelsOffset={-10} // Ajusta a posição das labels do eixo X
                verticalLabelRotation={45} // 🔥 Inclina as labels do eixo X em 45°
                chartConfig={{
                    backgroundColor: '#FFF',
                    backgroundGradientFrom: '#FFF',
                    backgroundGradientTo: '#FFF',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: { borderRadius: 16 },
                    propsForDots: {
                        r: '4',
                        strokeWidth: '1',
                        stroke: '#000',
                    },
                }}
                bezier
                style={{ marginVertical: 8, borderRadius: 16 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    chartContainer: {
        marginBottom: 20,
    },
    chartTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    toggleButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginHorizontal: 5,
        borderRadius: 8,
        backgroundColor: '#ddd',
    },
    selectedButton: {
        backgroundColor: '#007bff',
    },
    toggleText: {
        color: '#000',
        fontWeight: 'bold',
    },
});

export default TemperatureChart;
