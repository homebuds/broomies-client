import React, { useEffect, useState } from 'react';
import { Alert, Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import ArrowDownIcon from '../icons/arrowdown.svg'
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { Summary } from '../types/backend';

interface IBills {
    user?: string;
    household?: string;
}

const Bills = ({ user, household }: IBills) => {
    const [title, setTitle] = useState("");
    const [cost, setCost] = useState("");
    const [summary, setSummary] = useState<Summary>();
    const [showDropdown, setShowDropdown] = useState(false);

    const createTransaction = async () => {
        const res = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/api/financial-transaction`, {
            amount: Number.parseFloat(cost),
            description: "",
            name: title,
            accountId: user,
            householdId: household
        })
        if (res.status == 200) {
            setTitle("");
            setCost("");
            Alert.alert("successfully added transaction!")
        }
    }
    const handleAmountChange = (text: string) => {
        let cleanedText = text.replace(/[^0-9]/g, '');

        // Convert cleaned text to a number and back to a string
        let cleanedNumber = parseFloat(cleanedText);

        // Handle invalid inputs
        if (isNaN(cleanedNumber)) {
            setCost('0.00');
            return;
        }

        // Divide by 100 to get currency format
        let formattedText = (cleanedNumber / 100).toFixed(2);

        setCost(formattedText);
    };

    useEffect(() => {
        const getSummary = async () => {
            const res = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/api/spend-information/household/${household}/account/${user}`)
            if (res.data) {
                setSummary(res.data)
            }
        }
        getSummary();
    }, [])

    return (<View style={styles.container}>
        <Text style={styles.title}>Since you've last settled...</Text>
        {summary && <View style={[styles.sumContainer, styles.sumContainerShadow]}>
            <LinearGradient
                // Background Linear Gradient
                colors={['rgba(192, 247, 255, 0.30)', ' rgba(192, 255, 195, 0.30)']}
                style={styles.gradient}
            >
                <Text style={styles.sumContainerTitle}>Running Sum</Text>
                <Text style={styles.sumContainerTotal}>${summary?.totalSpent.toFixed(2)}</Text>
                <Text style={styles.sumContainerText}>{summary?.amountOwed < 0 ? "You owe your roomies: " : "Your Roomies owe you: "}<Text style={styles.bold}>${Math.abs(summary?.amountOwed || 0).toFixed(2)}</Text></Text>
                <Text style={styles.sumContainerText}>Performance savings: <Text style={styles.bold}>${summary?.roommatePointsAmount.toFixed(2)}</Text></Text>
            </LinearGradient>
        </View>}
        <View style={styles.optionsContainer}>
            <Text style={styles.transactionTitle}>Transactions</Text>
            <TouchableOpacity onPress={() => setShowDropdown(prev => !prev)}><ArrowDownIcon style={showDropdown ? styles.dropdownIconUp : styles.dropdownIconDown} /></TouchableOpacity>
        </View>
        {showDropdown && <View style={styles.dropdownContent}>
            <View style={styles.inputContainer}>
                <Input
                    style={styles.input}
                    onChangeText={(text) => setTitle(text)}
                    value={title}
                    label="Description"
                    labelStyle={{ color: "black", fontWeight: "400" }}
                    inputContainerStyle={{ alignSelf: "flex-end", borderBottomWidth: 0, marginBottom: 0 }}
                />
            </View>
            <View style={styles.inputContainer}>
                <Input
                    style={styles.input}
                    placeholderTextColor="black"
                    placeholder="$0.00"
                    onChangeText={handleAmountChange}
                    value={cost}
                    keyboardType="decimal-pad"
                    label="Cost"
                    labelStyle={{ color: "black", fontWeight: "400", marginTop: -15 }}
                    inputContainerStyle={{ borderBottomWidth: 0, marginBottom: 0 }}
                />
            </View>
            <Button
                style={styles.addButton}
                title="+ Add new"
                onPress={() => {
                    createTransaction();
                }}
            /></View>}
    </View>
    );
};


const styles = StyleSheet.create({
    container: {
        padding: 30
    },
    sumContainer: {
        borderRadius: 20,
        marginBottom: 18,
    },
    sumContainerShadow: {
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,
    },
    title: {
        marginBottom: 8
    },
    dropdownContent: {
        marginTop: 17,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    input: {
        fontSize: 15,
        display: "flex",
        flex: 1,
        height: 25,
        borderRadius: 8,
        borderWidth: 2,
        borderColor: "#ccc",
        alignSelf: 'center'
    },
    dropdownIconDown: {
        transform: [{ rotate: '90deg' }]
    },
    dropdownIconUp: {
        transform: [{ rotate: '-90deg' }]
    },
    inputContainer: {
        display: "flex",
        flexDirection: "row",
        columnGap: 18,
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    gradient: {
        padding: 25,
        borderRadius: 20,
    },
    optionsContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    bold: {
        fontWeight: "600"
    },
    sumContainerTitle: {
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 12,
    },
    transactionTitle: {
        fontSize: 20,
        fontWeight: "600"
    },
    sumContainerTotal: {
        fontSize: 35,
        fontWeight: "600",
        marginBottom: 22,
    },
    sumContainerText: {
        fontSize: 15,
        fontWeight: "400",
        marginBottom: 2
    },
    addButton: {
        width: 165,
        alignSelf: "center",
        borderRadius: 20,
        overflow: "hidden",
        fontSize: 20,
        fontWeight: 700
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});

export default Bills;