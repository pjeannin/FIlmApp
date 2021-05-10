import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack"
import Welcome from "../Components/Welcome";
import Search from "../Components/Search";
import FilmDetails from "../Components/FilmDetails";

const WelcomeStackNavigator = createStackNavigator({
    Welcome: {
        screen: Welcome
    },

    Search: {
        screen: Search,
        navigationOptions: {
            title: 'Rerchercher'
        }
    },

    FilmDetails: {
        screen: FilmDetails,
        navigationOptions: {
            title: 'Détails'
        }
    }
})

export default createAppContainer(WelcomeStackNavigator)