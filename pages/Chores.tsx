import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AssignedChore, CompletionStatus } from '../types/backend';
import { Button } from 'react-native-paper';
import axios from 'axios';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddinrg: 12,
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
  const [data, setData] = useState<{ [key: string]: AssignedChore[] }>({});

  const getChores = async () => {
    const fetchChores = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://c682-2620-101-f000-704-00-12.ngrok-free.app/api/assigned-chore/list/${household}`);
        let tempChores = res.data;
        if (user) {
          tempChores = tempChores.filter(chore => chore.accountId === user)
        }
        setData(groupChoresByDay(tempChores.map(chore => {
          return {
            ...chore.chore,
            ...chore.account,
            dueDate: chore?.dueDate,
            id: chore.id,
            accountId: chore.accountId,
            completed: chore?.completed
          }
        }).sort((a, b) => Date.parse(a.dueDate) - Date.parse(b.dueDate))));
      } catch (e) {
        console.log(e)
      }
      setLoading(false);
    }
    fetchChores();
  };

  const groupChoresByDay = (chores: AssignedChore[]) => {
    const choresByDay: { [key: string]: AssignedChore[] } = {};

    chores.forEach((chore) => {
      const date = new Date(chore.dueDate);
      const day = date.toLocaleString('default', { weekday: 'long' }); // Gives "Monday", "Tuesday", etc.

      if (!choresByDay[day]) {
        choresByDay[day] = [];
      }

      choresByDay[day].push(chore);
    });

    return choresByDay;
  };

  const completeTask = async (id: string) => {
    const res = await axios.patch(`https://c682-2620-101-f000-704-00-12.ngrok-free.app/api/assigned-chore/${id}/complete`);
    if (res) {
      setRefetch(true);
    }
  }

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
          data={Object.keys(data)}
          keyExtractor={(day) => day}
          ItemSeparatorComponent={() => <View style={{ height: 25 }} />}
          renderItem={({ item: day }) => {
            return (<View>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>{day.split(', ')[0]}, {day.split(', ')[1]}</Text>
              {data[day].map((item) => (
                <View key={item.id} style={[styles.listItemShadow, item.completed ? styles.listItemComplete : styles.listItemInProgress, styles.listItem]}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.listItemDescription}>{getDate(item.dueDate)}</Text>
                    <Text style={styles.listItemTitle}>{item.name}</Text>
                    <Text style={styles.listItemDescription}>{item.description}</Text>
                    <View style={styles.listSubOptions}>
                      <Text>{`${item.completed ? "Complete" : "In Progress"}`}</Text>
                      <View style={item.completed ? styles.greenCircle : styles.yellowCircle}></View>
                    </View>
                  </View>
                  {user === item.accountId ? <View style={styles.listItemAvatar}>
                    <TouchableOpacity disabled={item.completed} style={styles.listItemImage} onPress={() => completeTask(item.id)}>
                      {<Image style={styles.listItemImage} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/1024px-Eo_circle_green_checkmark.svg.png' }} />
                      }
                    </TouchableOpacity>
                    <Text style={styles.listItemDescription}>Mark as Completed</Text>
                  </View> :
                    <View style={styles.listItemAvatar}>
                      <Image style={styles.listItemImage} source={{ uri: item?.pictureUrl as string }} />
                      <Text style={styles.listItemDescription}>{item?.firstName}</Text>
                    </View>
                  }
                </View>))}
            </View>)
          }}
        />
      )}
    </View>
  );
};

export default Chores;