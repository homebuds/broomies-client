import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet} from 'react-native';
import { AssignedChore } from '../types/backend';
import HorizontalList from '../components/HorizontalList';
import { assignedChores, accounts, chores } from '../testdata';
import LeaderboardBarChart from '../components/Leaderboard';
import VerticalBarChart from '../components/Leaderboard';

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

const Home = ({user} : IHome) => {
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

  const dat = [
    { label: 'Category 1', value: 30 },
    { label: 'Category 2', value: 50 },
    { label: 'Category 3', value: 20 },
  ];
  
  // Render the vertical bar chart
  

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
        <View style={{flex: 1}}></View>
        <View>
          <VerticalBarChart data={dat} />
        </View>
        <HorizontalList items={data} />
        </>
      )}
    </View>
  );
};

export default Home;