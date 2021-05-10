import React from 'react'
import {StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator} from 'react-native'
import FilmItem from "./FilmItem";
import { getFilmFromAPI } from "../API/filmAPI";
import {isLogBoxErrorMessage} from "react-native/Libraries/LogBox/Data/LogBoxData";

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.inputText = ""
        this.page = 1
        this.totalPages = 0
        this.state = { films: [], isLoading: false}
    }

    _loadFilm() {
        if (this.inputText.length > 0)
            this.state.isLoading = true
        getFilmFromAPI(this.inputText, this.page).then(data => {
            this.setState({
                films: [ ...this.state.films, ...data.results ],
                isLoading: false
            })
            this.page = data.page + 1
            //this.totalPages = data.total_pages
        })
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator/>
                </View>
            )
        }
        return null
    }

    _searchTextInputChanged(text){
        this.inputText = text
    }

    _searchButtonPress() {
        this.page = 1
        this.totalPages = 5
        this.setState({films: []}, this._loadFilm)
    }

    render() {
        return (
            <View style={styles.view}>
                <TextInput onSubmitEditing={() => this._searchButtonPress()}
                           returnKeyType='search'
                           keyboardAppearance='dark'
                           clearButtonMode='while-editing'
                           onChangeText={(text) => this._searchTextInputChanged(text)}
                           style={styles.textInput} placeholder="Entrez le nom d'un film"/>
                <Button title='Rechercher'
                        onPress={() => this._searchButtonPress()}/>
                <FlatList
                    data={this.state.films}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => <FilmItem film={item} navigation={this.props.navigation} />}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        this._loadFilm()
                    }}
                />
                {this._displayLoading()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#c3c9e9'
    },

    textInput: {
        margin: 10,
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        paddingLeft: 5,
        borderRadius: 10
    },

    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search