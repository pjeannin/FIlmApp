import React from 'react'
import {StyleSheet, Image, View, Text, TouchableOpacity} from "react-native";
import { getImageFromApi} from "../API/filmAPI";

class FilmItem extends React.Component {
    _displayFilmDetails() {
        this.props.navigation.navigate("FilmDetails", { filmId: this.props.film.id})
    }

    render() {
        const film = this.props.film

        return (
            <TouchableOpacity
                style={style.mainContainer}
                onPress={() => this._displayFilmDetails()}
                >
                <Image style={style.image} source={{uri: getImageFromApi(film.poster_path)}}/>
                <View style={style.descriptionContainer}>
                    <View style={style.titleTextView}>
                        <Text style={style.nameStyle}>{film.title}</Text>
                        <Text style={style.ageStyle} numberOfLines={1}>{film.vote_average.toString()}</Text>
                    </View>
                    <View style={style.descriptionView}>
                        <Text style={style.desciptionStyle} numberOfLines={6}>{film.overview}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const style = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: '#aaabbc',
        margin: 5,
        borderRadius: 5
    },

    image: {
        height: 180,
        width: 120,
        margin: 5,
        backgroundColor: 'grey',
        borderRadius: 5
    },

    descriptionContainer: {
        flex: 1,
        marginTop: 5,
        marginBottom: 5,
        marginRight: 5,
        backgroundColor: '#6c91c2',
        borderRadius: 5
    },

    titleTextView: {
        margin: 4,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },

    descriptionView: {
        margin: 4,
        flex: 3
    },

    nameStyle: {
        fontSize: 17,
        fontWeight: 'bold',
        flex: 5,
    },

    ageStyle: {
        fontSize: 17,
        fontStyle: 'italic',
        textAlign: 'right',
        marginRight: 2,
        flex: 1
    },

    infoStyle: {
        marginTop: 5,
        fontSize: 16
    },

    desciptionStyle: {
        fontStyle: 'italic',
        textAlign:'justify'
    }
})

export default FilmItem