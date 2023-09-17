
import { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { Image } from 'react-native-elements';


interface INotificationCard {
    picture: string | undefined,
    status: string
}

const exampleName = 'Gordon'
const exampleAction = 'has ju'
const exampleChore = 'cleaning toilet'

const getCurrentDate = () => {
    const currentDate = new Date();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const year = currentDate.getFullYear();
  
    const formattedDate = `${month}/${day}/${year}`;
    
    return formattedDate;
  };

const NotificationCard = (props: INotificationCard) => {

    const { picture, status } = props

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={picture ? {uri: picture as string } : {uri: require("../icons/emptyPic.png")}}/>
            <View style={styles.textCol}>
                <View style={styles.textRow}>
                    <Text style={styles.textName}>{exampleName} </Text>
                    <Text style={styles.textAction}>{exampleAction}</Text>
                </View>
                <Text style={styles.textChore}>{exampleChore}</Text>
                <Text style={styles.textDate}>{getCurrentDate()}</Text>
            </View>
                {status == 'complete' && 
                <TouchableOpacity style={styles.reviewButton} onPress={()=>{}}>
                    <Text style={{ color: 'blue'}}>Review</Text>
                </TouchableOpacity>
                }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 70,
        width: 325,
        // backgroundColor: 'pink',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: "relative"
    },
    image: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginRight: 8,
    },
    textName: {
        fontWeight: '900'
    },
    textAction: {

    },
    textChore: {
        fontWeight: "700"
    },
    textRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    textCol: {
        display: 'flex',
        flexDirection: 'column',
    },
    textDate: {
        fontSize: 12
    },
    reviewButton: {
        display: 'flex',
        color: 'blue',
        fontSize: 15,
        position: "absolute",
        top: 5,
        right: 0,
    }
})

export default NotificationCard;

