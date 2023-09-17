import { View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import HomeIcon from '../icons/home.svg'
import HomeDarkIcon from '../icons/homedark.svg'
import BroomIcon from '../icons/broom.svg'
import MoneyIcon from '../icons/money.svg'
import SignOutIcon from '../icons/signout.svg'

const Footer: React.FC<BottomTabBarProps> = (props) => {
    const { state, navigation } = props;
    return (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: "100%",
            padding: 10,
            paddingLeft: 30,
            paddingRight: 30,
            backgroundColor: '#f9f9f9',
            shadowColor: '#212121',
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 0.2,
            shadowRadius: 11,
            borderTopLeftRadius: 20,
            borderTopEndRadius: 20,
        }}>
            {/* Render the default tab bar */}
            <View style={{ display: "flex", flexDirection: 'row', alignItems: 'center', flex: 1, width: "100%" }}>
                {props.state.routes.map((route, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => props.navigation.navigate(route.name)}
                        style={{
                            margin: "auto", flexGrow: 1, borderBottomWidth: state.index === index ? 5 : 0, borderColor: "black", padding: 10,
                            // paddingLeft: 25,
                            // paddingRight: 25,
                            display: "flex", alignItems: 'center', alignContent: "center",
                        }}
                    >
                        {route.name === "Home" ?
                            <HomeIcon /> :
                            route.name === "Chores" ?
                                <BroomIcon /> :
                                route.name === "Bills" ?
                                    <MoneyIcon /> : <SignOutIcon />}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

export default Footer;