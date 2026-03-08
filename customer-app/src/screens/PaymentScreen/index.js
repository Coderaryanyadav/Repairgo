import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

export default function PaymentScreen({ navigation }) {
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        // Integrate Razorpay Checkout SDK here
        // 1. Call your Node backend: POST /api/payments/create-order -> get orderId
        // 2. Open Razorpay via `RazorpayCheckout.open(options)`
        // 3. Take response `razorpay_payment_id` and send to `POST /api/payments/verify`

        setTimeout(() => {
            setLoading(false);
            // Replace with Review Screen upon success
            navigation.navigate('ReviewScreen');
        }, 2000);
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.header}>Invoice Summary</Text>

                <View style={styles.row}>
                    <Text style={styles.itemText}>Screen Repair (iPhone 13)</Text>
                    <Text style={styles.priceText}>₹4,999</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.itemText}>Visiting Charge</Text>
                    <Text style={styles.priceText}>₹299</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.row}>
                    <Text style={styles.totalText}>Total Amount</Text>
                    <Text style={styles.totalPrice}>₹5,298</Text>
                </View>

                <TouchableOpacity
                    style={styles.payButton}
                    onPress={handlePayment}
                    disabled={loading}
                >
                    {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.payButtonText}>Pay Securely with Razorpay</Text>}
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F4F6F8', padding: 20, justifyContent: 'center' },
    card: { backgroundColor: '#FFF', padding: 25, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 5 },
    header: { fontSize: 24, fontWeight: 'bold', color: '#111', marginBottom: 25, textAlign: 'center' },
    row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
    itemText: { fontSize: 16, color: '#555' },
    priceText: { fontSize: 16, color: '#111', fontWeight: 'bold' },
    divider: { height: 1, backgroundColor: '#EEE', marginVertical: 15 },
    totalText: { fontSize: 18, fontWeight: 'bold', color: '#111' },
    totalPrice: { fontSize: 20, fontWeight: 'bold', color: '#0066cc' },
    payButton: { backgroundColor: '#0066cc', paddingVertical: 18, borderRadius: 12, alignItems: 'center', marginTop: 30 },
    payButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});
