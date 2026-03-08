import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, ActivityIndicator } from 'react-native';

const Stack = createStackNavigator();

const PlaceholderScreen = ({ name }) => {
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setTimeout(() => { setLoading(false); }, 1500);
    }, []);

    if (loading) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" /></View>;

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24 }}>{name}</Text>
        </View>
    );
};

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="TechnicianLoginScreen">
                <Stack.Screen name="TechnicianLoginScreen" component={() => <PlaceholderScreen name="Technician Login" />} />
                <Stack.Screen name="TechnicianDashboard" component={() => <PlaceholderScreen name="Technician Dashboard (Accept Jobs, Location Update)" />} />
                <Stack.Screen name="IncomingJobRequestScreen" component={() => <PlaceholderScreen name="Incoming Job Request" />} />
                <Stack.Screen name="JobDetailsScreen" component={() => <PlaceholderScreen name="Job Details" />} />
                <Stack.Screen name="NavigationScreen" component={() => <PlaceholderScreen name="Navigation to Customer" />} />
                <Stack.Screen name="RepairStatusScreen" component={() => <PlaceholderScreen name="Update Repair Status" />} />
                <Stack.Screen name="JobCompletionScreen" component={() => <PlaceholderScreen name="Mark Job Completed" />} />
                <Stack.Screen name="EarningsDashboard" component={() => <PlaceholderScreen name="Earnings" />} />
                <Stack.Screen name="JobHistoryScreen" component={() => <PlaceholderScreen name="Job History" />} />
                <Stack.Screen name="ProfileScreen" component={() => <PlaceholderScreen name="Profile Settings" />} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
