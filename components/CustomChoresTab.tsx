import { createMaterialTopTabNavigator, MaterialTopTabBarProps, MaterialTopTabBar } from '@react-navigation/material-top-tabs';
import { View, Text, TouchableOpacity } from 'react-native';
import Chores from '../pages/Chores';

const ChoresTab = createMaterialTopTabNavigator();

const CustomTabBar: React.FC<MaterialTopTabBarProps> = (props) => {
  const { state, navigation } = props;
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', maxWidth: "100%", paddingLeft: 25, paddingRight: 25 }}>
      {/* Render the default tab bar */}
      <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', flex: 1, width: "100%" }}>
        {props.state.routes.map((route, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => props.navigation.navigate(route.name)}
            style={{ margin: "auto", flexGrow: 1, borderBottomWidth: state.index === index ? 1 : 0, borderColor: "black", borderRadius: 20, padding: 10 }}
          >
            <Text style={{
              color: "#383838",
              fontSize: 20, textAlign: "center",
              fontWeight: "700",
            }}>{route.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Add your custom "+" button */}
      <TouchableOpacity
        style={{ width: 35, height: 35, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 50, backgroundColor: "#ffffff" }}
        onPress={() => {
          // Handle the "+" button press here
        }}
      >
        <Text style={{ fontSize: 25 }}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

interface ICustomerChoresTab {
  user: string;
}

const CustomChoresTab = ({ user }: ICustomerChoresTab) => {
  return (
    <ChoresTab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
      <ChoresTab.Screen name="All" component={Chores} />
      <ChoresTab.Screen name="My Chores" children={(props) => <Chores {...props} user={user} />} />
    </ChoresTab.Navigator>
  );
};

export default CustomChoresTab;