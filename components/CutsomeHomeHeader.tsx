import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { assignedChores, accounts, chores } from '../testdata';

interface HeaderProps {
  title: string;
  user?: string;
}



const HomeHeader: React.FC<HeaderProps> = ({ title, user }) => {

    const [userData, setUserData] = useState({photo: '', name: ''});

    const getMovies = async () => {
        try {
            let tempChores = assignedChores.map(aChore => {
                const account = accounts.find(account => account.accountId === aChore.accountId);

                setUserData({
                    photo: account?.photo ?? '',
                    name: account?.firstName ?? ''
                })
            });
        } catch (error) {
            console.error(error);
        };
    }
    
    useEffect(() => {
        getMovies();
    }, []);

    return (
    <View style={styles.header}>
        <View style={styles.headerUserInfo} >
            <Image style={styles.headerImage} source={{ uri: userData.photo as string }} />

            <View>
                <Text style={styles.headerMessage}>Welcome back!👋</Text>
                <Text style={styles.headerName}>{userData.name}</Text>
            </View>
        </View>
        <View>
            <Image style={styles.headerImage} source={require('../icons/Notification.png')} />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center', // Vertically align text
    width: '100%',
    marginTop: 26
  },
  headerUserInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: 'auto'
  },
  headerMessage: {
    color: 'black', // Text color
    marginRight: 'auto',
    fontSize: 12,
    marginTop: 6
  },
  headerName: {
    fontSize: 15,
    color: 'black', // Text color
    marginRight: 'auto',
  },
  headerImage: {
    width: 41,
    height: 41,
    borderRadius: 50,
    marginRight: 4
  },

});

export default HomeHeader;
