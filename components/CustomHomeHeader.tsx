import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import NotificationsModal from './NotificationModal';
import { Account } from '../types/backend';

interface HeaderProps {
  title: string;
  user?: string;
}

const HomeHeader: React.FC<HeaderProps> = ({ title, user }) => {

  const [data, setData] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    // Define the API endpoint
    const apiUrl = `${process.env.EXPO_PUBLIC_API_URL}/api/account/${user}`;

    // Make a GET request to the API
    axios.get(apiUrl)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [user]);

  return (
    <View style={styles.header}>
      <View style={styles.headerUserInfo} >
        <Image style={styles.headerImage} source={loading ? require("../icons/emptyPic.png") : { uri: data?.pictureUrl as string }} />
        <View>
          <Text style={styles.headerMessage}>Welcome back!👋</Text>
          <Text style={styles.headerName}>{loading ? '' : data?.firstName}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => setIsModalOpen(true)}>
          <Image style={styles.headerImage} source={require('../icons/Notification.png')} />
        </TouchableOpacity>
      </View>
      <NotificationsModal pictureUrl={data?.pictureUrl} title={"hihi"} notifications={[]} isVisible={isModalOpen} onClose={() => setIsModalOpen(false)} />
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
    color: 'black',
    marginRight: 'auto',
    fontWeight: "bold",
  },
  headerImage: {
    width: 41,
    height: 41,
    borderRadius: 50,
    marginRight: 4
  },

});

export default HomeHeader;
