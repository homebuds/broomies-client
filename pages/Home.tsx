import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { AssignedChore } from '../types/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HorizontalList from '../components/HorizontalList';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listItem: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 8,
        borderRadius: 8,
        height: "100%",
        width: 180
    },
    listSubOptions: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    redCircle: {
        width: 10,
        height: 10,
        borderRadius: 25,
        backgroundColor: 'red',
    },
    greenCircle: {
        width: 10,
        height: 10,
        borderRadius: 25,
        backgroundColor: 'green',
    },
    flatListContainer: {
        maxHeight: "30%"
    }
});

interface IHome {
    user?: string;
}

const Home = ({ user }: IHome) => {
    const [household, setHousehold] = useState('');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const getChores = async () => {
        const fetchChores = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`https://c682-2620-101-f000-704-00-12.ngrok-free.app/api/assigned-chore/list/${household}`);
                let tempChores = res.data;
                if (user) {
                    tempChores = tempChores.filter(chore => chore.accountId === user)
                }
                setData(tempChores.map(chore => {
                    return {
                        ...chore.chore,
                        ...chore.account,
                        dueDate: chore?.dueDate,
                        id: chore.id,
                        accountId: chore.accountId,
                        completed: chore?.completed
                    }
                }).sort((a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate)));
            } catch (e) {
                console.log(e)
            }
            setLoading(false);
        }
        fetchChores()
    };

    useEffect(() => {
        const getHousehold = async () => {
            try {
                const householdId = await AsyncStorage.getItem('household');
                if (householdId) {
                    setHousehold(householdId)
                }
            } catch (err) {
                console.log(err);
            }
        }
        getHousehold();
    }, []);

    useEffect(() => {
        if (household) {
            getChores();
        }
    }, [household]);

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <>
                    <View style={{ flex: 1 }}></View>
                    <HorizontalList items={data} />
                </>
            )}
        </View>
    );
};

export default Home;