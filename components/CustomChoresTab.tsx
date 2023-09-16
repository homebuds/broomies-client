import { createMaterialTopTabNavigator, MaterialTopTabBarProps, MaterialTopTabBar} from '@react-navigation/material-top-tabs';
import { View, Text, TouchableOpacity } from 'react-native';
import Chores from '../pages/Chores';

const ChoresTab = createMaterialTopTabNavigator();

const CustomTabBar: React.FC<MaterialTopTabBarProps> = (props) => {
  console.log({...props})
  return (
    <>
    <MaterialTopTabBar {...props} />
    <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-between', alignItems:"flex-start" }}>
      {/* Add your custom "+" button */}
      <TouchableOpacity 
        style={{ width: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}
        onPress={() => {
          // Handle the "+" button press here
        }}
      >
        <Text style={{ fontSize: 30 }}>+</Text>
      </TouchableOpacity>
    </View>
    </>
  );
}

const CustomChoresTab = ({user}) => {
  return (
    <ChoresTab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
         <ChoresTab.Screen name="All" component={Chores} />
        <ChoresTab.Screen name="My Chores" children={(props) => <Chores {...props} user={user}/>} />
  </ChoresTab.Navigator>
  );
};

export default CustomChoresTab;