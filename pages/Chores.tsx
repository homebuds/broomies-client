import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AssignedChore, CompletionStatus } from '../types/backend';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#ECF0EB',
  },
  listItem: {
    padding: 16,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 8,
    borderRadius: 20,
    height: 120,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: 'wrap',
    flex: 1,
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
  listItemTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8
  },
  listItemDescription: {
    fontSize: 12,
    fontWeight: "400",
    flex: 1
  },
  listItemImage: {
    width: 68,
    height: 68,
    borderRadius: 50
  },
  listItemAvatar: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    rowGap: 5,
  },
  listSubOptions: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    columnGap: 5,
    width: '100%'
  },
  redCircle: {
    width: 10,
    height: 10,
    borderRadius: 25,
    backgroundColor: '#FA9A9A',
  },
  greenCircle: {
    width: 10,
    height: 10,
    borderRadius: 25,
    backgroundColor: '#B9EAB3',
  },
  yellowCircle: {
    width: 10,
    height: 10,
    borderRadius: 25,
    backgroundColor: '#EDEA9B',
  },
  listItemComplete: {
    backgroundColor: '#F4FFE5'
  },
  listItemInProgress: {
    backgroundColor: '#FFFDEA'
  },
  flatListContainer: {
    maxHeight: '100%',
    padding: 15
  }
});

interface IChores {
  user?: string;
  refetch: boolean;
  setRefetch: (a: boolean) => void;
}

const Chores = ({ user, refetch, setRefetch }: IChores) => {
  const [isLoading, setLoading] = useState(true);
  const [household, setHousehold] = useState('');
  const [data, setData] = useState<AssignedChore[]>([]);
  console.log(household);

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
          }
        }));
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
        } else {
          console.log('nononon')
        }
      } catch (err) {
        console.log(err);
      }
    }
    getHousehold();
  }, []);

  useEffect(() => {
    if (refetch) {
      getChores();
      setRefetch(false);
    }
  }, [refetch]);

  useEffect(() => {
    if (household) {
      getChores();
    }
  }, [household]);

  const getDate = (dateStr: string) => {
    const timestamp = Date.parse(dateStr);
    const date = new Date(timestamp);

    const day = date.getDate(); // Day of the month (1-31)
    const month = date.getMonth() + 1; // Month (0-11, but adding 1 to get 1-12)
    const year = date.getFullYear(); // Full year
    return `${day}/${month}/${year}`
  }
  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={styles.flatListContainer}
          data={data}
          keyExtractor={({ id }) => id}
          ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
          renderItem={({ item }) => {
            console.log(item)
            return <View key={item.id} style={[styles.listItemShadow, item.isCompleted === CompletionStatus.COMPLETED ? styles.listItemComplete : styles.listItemInProgress, styles.listItem]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.listItemDescription}>{getDate(item.dueDate)}</Text>
                <Text style={styles.listItemTitle}>{item.name}</Text>
                <Text style={styles.listItemDescription}>{item.description}</Text>
                <View style={styles.listSubOptions}>
                  <Text>{`${item.isCompleted === CompletionStatus.COMPLETED ? "Done" : "In Progress"}`}</Text>
                  <View style={item.isCompleted === CompletionStatus.COMPLETED ? styles.greenCircle : styles.yellowCircle}></View>
                </View>
              </View>
              <View style={styles.listItemAvatar}>
                <Image style={styles.listItemImage} source={{ uri: item?.pictureUrl as string }} />
                <Text style={styles.listItemDescription}>{item?.firstName}</Text>
              </View>
            </View>
          }}
        />
      )}
    </View>
  );
};

export default Chores;