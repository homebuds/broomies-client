import { createMaterialTopTabNavigator, MaterialTopTabBarProps, MaterialTopTabBar} from '@react-navigation/material-top-tabs';
import { View, Text, TouchableOpacity } from 'react-native';
import Chores from '../pages/Chores';

const ChoresTab = createMaterialTopTabNavigator();

const CustomTabBar: React.FC<MaterialTopTabBarProps> = (props) => {
  const { state, navigation } = props;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', maxWidth:"100%" }}>
    {/* Render the default tab bar */}
    <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', flex: 1, width: "100%"}}>
      {props.state.routes.map((route, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => props.navigation.navigate(route.name)}
          style={{margin: "auto",  flexGrow: 1, backgroundColor: state.index === index ? '#efefef' : 'transparent', borderRadius: 20}}
        >
          <Text style={{color: "#383838",
fontSize: 20, textAlign: "center",
fontWeight: "700", }}>{route.name}</Text>
        </TouchableOpacity>
      ))}
    </View>

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