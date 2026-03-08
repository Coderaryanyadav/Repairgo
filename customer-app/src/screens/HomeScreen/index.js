import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
// import MapView, { Marker } from 'react-native-maps'; // Assume Maps SDK is available

export default function HomeScreen({ navigation }) {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock fetching services from API
        setTimeout(() => {
            setServices([
                { id: '1', name: 'Screen Repair', price: '₹1499' },
                { id: '2', name: 'Battery Replacement', price: '₹999' },
                { id: '3', name: 'Water Damage', price: '₹1999' },
                { id: '4', name: 'Charging Port', price: '₹799' }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const renderServiceCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('DeviceSelectionScreen', { service: item })}
        >
            <Text style={styles.cardTitle}>{item.name}</Text>
            <Text style={styles.cardPrice}>Starts from {item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Map Header Area Placeholder */}
            <View style={styles.mapContainer}>
                {/* <MapView style={StyleSheet.absoluteFillObject} ... /> */}
                <Text style={styles.mapText}>Live Map: Find Technicians near you</Text>
            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.headerTitle}>Select a Service</Text>

                {loading ? (
                    <ActivityIndicator size="large" color="#0066cc" />
                ) : (
                    <FlatList
                        data={services}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        renderItem={renderServiceCard}
                        contentContainerStyle={styles.listContainer}
                    />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8F9FA' },
    mapContainer: { height: '35%', backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' },
    mapText: { color: '#666', fontWeight: 'bold' },
    contentContainer: { flex: 1, padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: '#FFF', marginTop: -20 },
    headerTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    listContainer: { justifyContent: 'space-between' },
    card: { flex: 1, backgroundColor: '#F1F3F5', padding: 20, margin: 8, borderRadius: 15, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1 },
    cardTitle: { fontSize: 16, fontWeight: '600', color: '#333', textAlign: 'center', marginBottom: 8 },
    cardPrice: { fontSize: 14, color: '#0066cc', fontWeight: 'bold' }
});
