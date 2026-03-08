import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, SafeAreaView, Animated } from 'react-native';

const LoginScreen = ({ navigation }) => {
    const [phone, setPhone] = useState('');
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
            navigation.replace('HomeScreen');
        }, 1200);
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.keyboardContainer}>

                <View style={styles.headerContainer}>
                    <View style={styles.brandBadge}>
                        <Text style={styles.brandBadgeText}>Repairgo</Text>
                    </View>
                    <Text style={styles.title}>Mobile Repair,</Text>
                    <Text style={styles.titleHighlight}>at your Doorstep.</Text>
                    <Text style={styles.subtitle}>Enter your phone number to get started</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputWrapper}>
                        <Text style={styles.inputLabel}>Mobile Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="+91  • • •   • • •   • • • •"
                            placeholderTextColor="#9CA3AF"
                            keyboardType="phone-pad"
                            value={phone}
                            onChangeText={setPhone}
                        />
                    </View>

                    <Animated.View style={[styles.loginButtonWrapper, { transform: [{ scale: buttonScale }] }]}>
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                            onPress={handleLogin}
                            activeOpacity={0.9}
                            disabled={loading}
                        >
                            <Text style={styles.loginButtonText}>{loading ? 'Verifying...' : 'Continue'}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>

                <View style={styles.footerContainer}>
                    <Text style={styles.footerText}>By continuing, you agree to our</Text>
                    <View style={styles.footerLinks}>
                        <TouchableOpacity><Text style={styles.footerLink}>Terms of Service</Text></TouchableOpacity>
                        <Text style={styles.footerText}> & </Text>
                        <TouchableOpacity><Text style={styles.footerLink}>Privacy Policy</Text></TouchableOpacity>
                    </View>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    keyboardContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
    },
    headerContainer: {
        alignItems: 'flex-start',
        marginTop: 20,
    },
    brandBadge: {
        backgroundColor: '#EFF6FF',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginBottom: 24,
    },
    brandBadgeText: {
        color: '#2563EB',
        fontWeight: '700',
        fontSize: 14,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        color: '#0F172A',
        lineHeight: 44,
        letterSpacing: -1,
    },
    titleHighlight: {
        fontSize: 36,
        fontWeight: '800',
        color: '#2563EB',
        lineHeight: 44,
        marginBottom: 16,
        letterSpacing: -1,
    },
    subtitle: {
        fontSize: 16,
        color: '#64748B',
        fontWeight: '500',
        lineHeight: 24,
    },
    formContainer: {
        width: '100%',
        marginTop: 40,
    },
    inputWrapper: {
        marginBottom: 32,
    },
    inputLabel: {
        color: '#334155',
        fontSize: 14,
        fontWeight: '700',
        marginBottom: 10,
        marginLeft: 4,
    },
    input: {
        backgroundColor: '#F8FAFC',
        color: '#0F172A',
        height: 60,
        borderRadius: 16,
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: '600',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    loginButtonWrapper: {
        width: '100%',
    },
    loginButton: {
        backgroundColor: '#2563EB',
        height: 60,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2563EB',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 15,
        elevation: 5,
    },
    loginButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
    },
    footerContainer: {
        alignItems: 'center',
        marginTop: 'auto',
    },
    footerText: {
        color: '#94A3B8',
        fontSize: 13,
        marginBottom: 4,
    },
    footerLinks: {
        flexDirection: 'row',
    },
    footerLink: {
        color: '#0F172A',
        fontSize: 13,
        fontWeight: '700',
    }
});

export default LoginScreen;
