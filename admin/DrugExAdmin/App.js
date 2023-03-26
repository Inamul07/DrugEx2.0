import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "./screens/ListScreen";
import DetailsScreen from "./screens/DetailsScreen";
import colors from "./assets/colors";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<StatusBar style="light" backgroundColor={colors.header} />
			<Stack.Navigator
				screenOptions={{
					headerTintColor: "#FFF",
					headerStyle: { backgroundColor: colors.header },
				}}
			>
				<Stack.Screen name="List" component={ListScreen} />
				<Stack.Screen name="Details" component={DetailsScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}
