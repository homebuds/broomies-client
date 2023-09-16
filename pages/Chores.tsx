import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet} from 'react-native';
import { assignedChores, accounts, chores } from '../testdata';
import { AssignedChore } from '../types/backend';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '#ffffff',
  },
  listItem: {
    padding: 16,
    backgroundColor: '#ffffff',
    marginBottom: 8,
    borderRadius: 20,
    height: 115,
    width: "100%"
  },
  listItemShadow: {   shadowColor: '#212121',
  shadowOffset: {
    width: 0,
    height: 0,
  },
  shadowOpacity: 0.2,
  shadowRadius: 11,},
  listItemTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8
  },
  listItemDescription: {
    fontSize: 12,
    fontWeight: "500"
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
    maxHeight: '100%',
    padding: 15
  }
});

interface IChores {
    user?: string;
}

const Chores = ({user} : IChores) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<AssignedChore[]>([]);

  const getMovies = async () => {
    try {
      let tempChores = assignedChores.map(aChore => {
        const chore = chores.find(chore => aChore.choreId === chore.id)
        const account = accounts.find(account => account.accountId === aChore.accountId);
          return {
            ...aChore,
            choreDescription: chore?.choreDescription,
            choreName: chore?.choreName,
            firstName: account?.firstName,
            lastName: account?.lastName
          }
      });
      if (user) {
        tempChores = tempChores.filter(chore => chore.accountId === user)
      }
      setData(tempChores);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
        style={styles.flatListContainer}
          data={data}
          keyExtractor={({id}) => id}
          ItemSeparatorComponent={() => <View style={{height: 25}} />}
          renderItem={({item}) => (
            <View style={[styles.listItem, styles.listItemShadow]}>
              <Text style={styles.listItemTitle}>{item.choreName}</Text>
              <Text style={styles.listItemDescription}>{item.choreDescription}</Text>
              {/* <View style={styles.listSubOptions}>
                <Text>{item.firstName} {item.lastName}</Text>
                {item.isCompleted ? (
        <View style={styles.greenCircle}></View>
      ) : (
        <View style={styles.redCircle}></View>
      )}
              </View> */}
            </View>
          )}
        />
      )}
    </View>
  );
};

export default Chores;