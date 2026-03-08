import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps'; // Assume Maps SDK is available

export default function LiveTrackingScreen({ route, navigation }) {
    // const { bookingId } = route.params;
    const [techLocation, setTechLocation] = useState({ latitude: 28.6139, longitude: 77.2090 });
    const [status, setStatus] = useState('En_Route'); // En_Route, Arrived

    useEffect(() => {
        // Here we would implement the Polling or Socket listening
        // e.g., setInterval(() => axios.get(`/api/technicians/live-location/${bookingId}`))
        const interval = setInterval(() => {
            // Simulate tech moving slightly
            setTechLocation(prev => ({
                latitude: prev.latitude + 0.0001,
                longitude: prev.longitude + 0.0001
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.mapContainer}>
                {/* 
                 <MapView>
                   <Marker coordinate={techLocation} title="Technician" image={require('../../assets/scooter.png')} />
                   <Marker coordinate={CUSTOMER_LOCATION} title="You" />
                 </MapView>
                */}
                <Text style={styles.mapText}>Live Tracking Map UI</Text>
                <Text>Tech Location: Lat {techLocation.latitude.toFixed(4)}, Lng {techLocation.longitude.toFixed(4)}</Text>
            </View>

            <View style={styles.bottomSheet}>
                <Text style={styles.statusText}>
                    {status === 'En_Route' ? 'Technician is on the way!' : 'Technician has arrived!'}
                </Text>
                <Text style={styles.etaText}>Arriving in ~8 mins</Text>

                <TouchableOpacity style={styles.callButton} onPress={() => { /* Handle Call */ }}>
                    <Text style={styles.callButtonText}>Call Technician</Text>
                </TouchableOpacity>

                {/* Simulated transition for demo purposes */}
                <TouchableOpacity style={styles.testBtn} onPress={() => navigation.navigate('PaymentScreen')}>
                    <Text style={{ color: 'white' }}>Simulate Repair Complete {'>'} Pay</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    mapContainer: { flex: 1, backgroundColor: '#E8E8E8', justifyContent: 'center', alignItems: 'center' },
    mapText: { fontSize: 18, fontWeight: 'bold', color: '#555', marginBottom: 10 },
    bottomSheet: { padding: 30, backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, shadowColor: '#000', shadowOffset: { width: 0, height: -5 }, shadowOpacity: 0.1, elevation: 10 },
    statusText: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 5 },
    etaText: { fontSize: 16, color: '#666', marginBottom: 20 },
    callButton: { backgroundColor: '#00C853', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
    callButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    testBtn: { backgroundColor: '#333', padding: 10, borderRadius: 8, alignItems: 'center', marginTop: 10 }
});
