import React, { useState } from 'react';
import { createMaterialTopTabNavigator, MaterialTopTabBarProps, MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import { View, Text, TouchableOpacity } from 'react-native';
import Chores from '../pages/Chores';
import AddChores from '../pages/AddChores';

const ChoresTab = createMaterialTopTabNavigator();

const CustomTabBar: React.FC<MaterialTopTabBarProps> = (props) => {
  const { state, navigation } = props;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', minWidth: "100%", paddingLeft: 25, paddingRight: 25 }}>
      {props.state.routes.map((route, index) => <View key={index}>{
        route.name === "Add" ? <TouchableOpacity
          style={{ width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: "#ffffff" }}
          onPress={() => props.navigation.navigate(route.name)}
        >
          <Text style={{ fontSize: 25 }}>+</Text>
        </TouchableOpacity> :
          <TouchableOpacity
            key={index}
            onPress={() => props.navigation.navigate(route.name)}
            style={{
              flex: 1,
              height: "100%",
              width: 165,
              flexGrow: 1,
              borderBottomWidth: state.index === index ? 1 : 0,
              borderColor: "black", borderRadius: 20,
              paddingLeft: 10,
              paddingRight: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{
              color: "#383838",
              fontSize: 20, textAlign: "center",
              fontWeight: "700",
            }}>{route.name}</Text>
          </TouchableOpacity>
      }
      </View>)}
    </View>
  );
}

interface ICustomerChoresTab {
  user: string;
}

const CustomChoresTab = ({ user }: ICustomerChoresTab) => {
  const [refetch, setRefetch] = useState(true)
  return (
    <ChoresTab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <ChoresTab.Screen name="All" children={(props) => <Chores {...props} refetch={refetch} setRefetch={setRefetch} />} />
      <ChoresTab.Screen name="My Chores" children={(props) => <Chores {...props} user={user} refetch={refetch} setRefetch={setRefetch} />} />
      <ChoresTab.Screen name="Add" children={(props) => <AddChores {...props} refetch={() => setRefetch(true)} />} />
    </ChoresTab.Navigator>
  );
};

export default CustomChoresTab;