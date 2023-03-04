import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutUsScreen";
import ReportScreen from "./screens/ReportScreen";
import AppreciationScreen from "./screens/AppreciationScreen";
import colors from "./assets/color";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export default function App() {
	const DrawerNavigation = () => {
		return (
			<>
				<StatusBar style="dark" backgroundColor="#A4978E" />
				<Drawer.Navigator
					useLegacyImplementation={true}
					initialRouteName="HomeScreen"
					screenOptions={{
						headerStyle: {
							backgroundColor: "#0F0E0E",
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
						backgroundColor: colors.secondary,
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
