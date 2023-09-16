import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Image } from 'react-native';
import { AssignedChore } from '../types/backend';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HorizontalList from '../components/HorizontalList';
import LeaderboardBarChart from '../components/Leaderboard';
import VerticalBarChart from '../components/Leaderboard';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: "auto",
        height: '100%'
    },
    listItem: {
        padding: 16,
        backgroundColor: '#f9f9f9',
        marginBottom: 8,
        borderRadius: 8,
        height: "100%",
        width: 180
    },
    listItemImage: {
        width: 65,
        height: 65,
        borderRadius: 50
    },
    listSubOptions: {
        display: 'flex',
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    listItemCrown: {
        fontSize: 45
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
                    console.log("filter")
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

    const placements = [
        { id: "1", firstName: 'Dennis', points: 2300, pictureUrl: "https://marketplace.canva.com/EAFewoMXU-4/1/0/1600w/canva-purple-pink-gradient-man-3d-avatar-0o0qE2T_kr8.jpg" },
        { id: "2", firstName: 'Rus', points: 1900, pictureUrl: "https://blush-design.imgix.net/collections/rChdrB8vX8xQJunpDPp8/v16/Master/Avataaar/cropped/Default.svg?w=500&auto=compress&cs=srgb" },
        { id: "3", firstName: 'Isaac', points: 1500, pictureUrl: "https://people.com/thmb/84W5-9FnCb0XLaqaoYwHasY5GwI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(216x0:218x2)/robert-pattinson-435-2-3f3472a03106439abee37574a6b8cef7.jpg" },
        { id: "4", firstName: "Gordon", pictureUrl: "https://www.nj.com/resizer/zovGSasCaR41h_yUGYHXbVTQW2A=/1280x0/smart/cloudfront-us-east-1.images.arcpublishing.com/advancelocal/SJGKVE5UNVESVCW7BBOHKQCZVE.jpg", points: 1300 }
    ];

    const colors = [
        "#C0F1C9",
        "#DBD2FB",
        "#FED8A3",
        "#C2EAFC"
    ]

    const max = placements.reduce(function (prev, current) {
        return (prev && prev.points > current.points) ? prev : current
    }) //returns object
    console.log(max);

    // Render the vertical bar chart
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
                    <Text>January</Text>
                    <View style={{ bottom: -10, paddingEnd: 0, height: 600, flex: 1, flexDirection: "row", alignItems: "flex-end", columnGap: 20, flexWrap: "wrap", justifyContent: "center" }}>
                        {
                            placements.map((placement, index) =>
                                <View key={index} style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "center", rowGap: 5, marginBottom: -25, maxWidth: 70 }}>
                                    {placement.id === max.id && <Text style={styles.listItemCrown}>👑</Text>}
                                    <Image style={styles.listItemImage} source={{ uri: placement?.pictureUrl as string }} />
                                    <Text style={{
                                        fontSize: 20,
                                        fontWeight: "600"
                                    }}>{placement.points}</Text>
                                    <View style={{ width: "100%", height: `${(placement.points / max.points) * 50}%`, backgroundColor: colors[index], borderTopLeftRadius: 20, borderTopEndRadius: 20 }} />
                                </View>
                            )
                        }
                    </View>
                    <HorizontalList items={data} />
                </>
            )}
        </View>
    );
};

export default Home;