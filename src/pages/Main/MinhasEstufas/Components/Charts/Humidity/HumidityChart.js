import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const HumidityChart = () => {
    // Aqui você pode implementar a lógica para obter os dados do gráfico de umidade
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            data: [60, 61, 62, 63, 64, 90], // Dados de exemplo para umidade
        }],
    };

    return (
        <View style={styles.chartContainer}>
            <Text style={styles.chartTitle}>Tendência de Umidade</Text>
            <LineChart
                data={data}
                width={350}
                height={220}
                chartConfig={{
                    backgroundColor: '#FFF',
                    backgroundGradientFrom: '#FFF',
                    backgroundGradientTo: '#FFF',
                    decimalPlaces: 1, // Número de casas decimais
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Cor da linha do gráfico
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Cor do texto
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: '6',
                        strokeWidth: '2',
                        stroke: '#000',
                    },
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
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
});

export default HumidityChart;
