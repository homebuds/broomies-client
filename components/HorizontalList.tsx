import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet } from 'react-native';
import { AssignedChore } from '../types/backend';
const styles = StyleSheet.create({
    container: {
        alignSelf: "flex-end",
        paddingTop: 20,
        paddingBottom: 20,
        display: "flex",
        height: 350,
        borderTopLeftRadius: 20,
        borderTopEndRadius: 20,
        backgroundColor: '#ffffff',
        boxShadow: "3px 4px 15px 2px rgba(0,0,0,0.66)",
    },
    listItem: {
        padding: 16,
        backgroundColor: '#ffffff',
        marginBottom: 8,
        borderRadius: 20,
        height: "100%",
        width: 160,
        boxShadow: "1px 4px 15px 2px rgba(0,0,0,0.66)"
    },
    listItemShadow: {
        shadowColor: '#212121',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.2,
        shadowRadius: 11,
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
        maxHeight: "80%",
        display: "flex",
        columnGap: 100,
        padding: 20
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        margin: 20,
        marginTop: 8
    }
});

interface IHorizontalList {
    items: AssignedChore[];
}

const HorizontalList = ({ items }: IHorizontalList) => {


    return (
        <View style={[styles.container, styles.listItemShadow]}>
            <Text style={styles.title}>My Chores</Text>
            <FlatList
                style={styles.flatListContainer}
                data={items}
                horizontal={true}
                keyExtractor={({ id }) => id}
                ItemSeparatorComponent={() => <View style={{ width: 25 }} />}
                renderItem={({ item }) => (
                    <View style={[styles.listItem, styles.listItemShadow]}>
                        <Text>{item.choreName}</Text>
                        <View style={styles.listSubOptions}>
                            <Text>{item.firstName} {item.lastName}</Text>
                            {item.isCompleted ? (
                                <View style={styles.greenCircle}></View>
                            ) : (
                                <View style={styles.redCircle}></View>
                            )}
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

export default HorizontalList;