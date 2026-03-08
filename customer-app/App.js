import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ActivityIndicator } from 'react-native';

import { HomeScreen, LiveTrackingScreen, PaymentScreen } from './src/screens';

const Stack = createStackNavigator();

// Screen Placeholders enforcing Error Handling, Loaders & Integration
const PlaceholderScreen = ({ name }) => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);

    React.useEffect(() => {
        // Simulated API call with loading and error states handling
        setTimeout(() => { setLoading(false); }, 1500);
    }, []);

    if (loading) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" /></View>;
    if (error) return <View><Text>Error loading {name}: {error.message}</Text></View>;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24 }}>{name}</Text>
        </View>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen name="SplashScreen" component={() => <PlaceholderScreen name="SplashScreen" />} />
                <Stack.Screen name="LoginScreen" component={() => <PlaceholderScreen name="LoginScreen" />} />
                <Stack.Screen name="HomeScreen" component={() => <PlaceholderScreen name="HomeScreen" />} />
                <Stack.Screen name="ServiceSelectionScreen" component={() => <PlaceholderScreen name="ServiceSelectionScreen" />} />
                <Stack.Screen name="DeviceSelectionScreen" component={() => <PlaceholderScreen name="DeviceSelectionScreen" />} />
                <Stack.Screen name="BookingConfirmationScreen" component={() => <PlaceholderScreen name="BookingConfirmationScreen" />} />
                <Stack.Screen name="TechnicianMatchingScreen" component={() => <PlaceholderScreen name="TechnicianMatchingScreen" />} />
                <Stack.Screen name="LiveTrackingScreen" component={() => <PlaceholderScreen name="LiveTrackingScreen" />} />
                <Stack.Screen name="PaymentScreen" component={() => <PlaceholderScreen name="PaymentScreen" />} />
                <Stack.Screen name="RepairHistoryScreen" component={() => <PlaceholderScreen name="RepairHistoryScreen" />} />
                <Stack.Screen name="ReviewScreen" component={() => <PlaceholderScreen name="ReviewScreen" />} />
                <Stack.Screen name="ProfileScreen" component={() => <PlaceholderScreen name="ProfileScreen" />} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
