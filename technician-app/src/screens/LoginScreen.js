import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, Dimensions, Animated } from 'react-native';

const { width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const buttonScale = new Animated.Value(1);

    const handlePressIn = () => {
        Animated.spring(buttonScale, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(buttonScale, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const handleLogin = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigation.replace('TechnicianDashboard');
        }, 1200);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardContainer}>

                <View style={styles.headerContainer}>
                    <View style={styles.logoPlaceholder}>
                        <Text style={styles.logoText}>R</Text>
                    </View>
                    <Text style={styles.title}>Repairgo Pro</Text>
                    <Text style={styles.subtitle}>Technician Portal</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="+91 999 999 9999"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Password or OTP</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="••••••••"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                        />
                    </View>

                    <TouchableOpacity style={styles.forgotPassword}>
                        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <Animated.View style={[styles.loginButtonWrapper, { transform: [{ scale: buttonScale }] }]}>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            onPress={handleLogin}
                            activeOpacity={0.9}
                            disabled={loading}
                        >
                            <Text style={styles.loginButtonText}>{loading ? 'Authenticating...' : 'Sign In'}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>Need an account?</Text>
                    <TouchableOpacity>
                        <Text style={styles.footerLink}> Apply to be a Technician</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A', // Slate 900
    },
    keyboardContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 48,
    },
    logoPlaceholder: {
        width: 80,
        height: 80,
        backgroundColor: '#3B82F6', // Blue 500
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 20,
        elevation: 10,
    },
    logoText: {
        color: '#FFFFFF',
        fontSize: 40,
        fontWeight: '900',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#F8FAFC',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#94A3B8', // Slate 400
        fontWeight: '500',
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#1E293B', // Slate 800
        padding: 24,
        borderRadius: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.25,
        shadowRadius: 25,
        elevation: 15,
    },
    inputWrapper: {
        marginBottom: 20,
    },
    inputLabel: {
        color: '#CBD5E1',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#0F172A',
        color: '#F8FAFC',
        height: 56,
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#334155', // Slate 700
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotPasswordText: {
        color: '#3B82F6',
        fontSize: 14,
        fontWeight: '600',
    },
    loginButtonWrapper: {
        width: '100%',
    },
    loginButton: {
        backgroundColor: '#3B82F6',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#3B82F6',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 5,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 40,
    },
    footerText: {
        color: '#94A3B8',
        fontSize: 15,
    },
    footerLink: {
        color: '#3B82F6',
        fontSize: 15,
        fontWeight: 'bold',
    }
});

export default LoginScreen;
