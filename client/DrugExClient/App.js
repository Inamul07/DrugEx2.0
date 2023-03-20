import { StatusBar } from "expo-status-bar";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutUsScreen";
import ReportScreen from "./screens/ReportScreen";
import AppreciationScreen from "./screens/AppreciationScreen";
import colors from "./assets/color";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
	const [location, setLocation] = useState(null);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				setErrorMessage("Permission to access location was denied");
				return;
			}

			try {
				let location = await Location.getCurrentPositionAsync({});
				setLocation(location);
			} catch (err) {
				console.log(err);
			}
		})();
	}, []);

	const DrawerNavigation = () => {
		return (
			<>
				<StatusBar style="light" backgroundColor={colors.header} />
				<Drawer.Navigator
					useLegacyImplementation={true}
					initialRouteName="HomeScreen"
					screenOptions={{
						headerStyle: {
							backgroundColor: colors.header,
						},
						headerTintColor: "#fff",
						headerTitle: "DrugEx",
					}}
				>
					<Drawer.Screen name="Home" component={HomeScreen} />
					<Drawer.Screen name="AboutScreen" component={AboutScreen} />
				</Drawer.Navigator>
			</>
		);
	};

	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerStyle: {
						backgroundColor: colors.header,
					},
					headerTintColor: "#fff",
					headerTitle: "DrugEx",
				}}
			>
				<Stack.Screen
					name="HomeScreen"
					component={DrawerNavigation}
					options={{ headerShown: false }}
				/>
				<Stack.Screen name="ReportScreen" component={ReportScreen} />
				<Stack.Screen
					name="AppreciationScreen"
					component={AppreciationScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
