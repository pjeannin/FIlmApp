import React from "react";
import {ActivityIndicator, Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {getImageFromApi} from "../API/filmAPI";
import {getOneFilmFromApi} from "../API/filmAPI";
import moment from "moment/moment";
import numeral from 'numeral/numeral'

class FilmDetails extends React.Component {
    constructor(props) {
        super(props)
        this.setState({
            film: undefined,
            isLoading: true
        })
    }

    componentDidMount() {
        getOneFilmFromApi(this.props.navigation.state.params.filmId).then(data => {
            this.setState({
                film: data,
                isLoading: false
            })
        })
    }

    _displayLoading() {
        return (
            <View style={styles.loading_container}>
                <ActivityIndicator size='small' />
            </View>
        )
    }

    _displayFilm() {
        const film = this.state.film

        console.log(film)

        return (
            <ScrollView style={styles.mainContainer}>
                <Image style={styles.image}
                       source={{uri: getImageFromApi(film.backdrop_path)}}/>
                <Text style={styles.title}>{film.title}</Text>
                <Text style={styles.originalTitle}>{"Titre Original : " + film.original_title}</Text>
                <View style={styles.resumeContainer}>
                    <Text style={styles.overview}>{"Résumé : " + film.overview}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Image style={styles.poster}
                           source={{uri: getImageFromApi(film.poster_path)}}/>
                    <View style={styles.textDetailsContainer}>
                        <Text style={styles.details}>{"Date de sortie : " + moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                        <Text style={styles.details}>{"Durée : " + Math.trunc(film.runtime / 60).toString() + "h" + (film.runtime - Math.trunc(film.runtime / 60) * 60) + "min"}</Text>
                        <Text style={styles.details}>{"Note moyenne : " + film.vote_average + " (" + film.vote_count + " votes)"}</Text>
                        <Text style={styles.details}>{"Langue originale : " + film.original_language}</Text>
                        <Text style={styles.details}>{"Budget : " + (film.budget ? numeral(film.budget).format('0,0[.]00 $') : "(Inconnu)")}</Text>
                        <Text style={styles.details}>{"Genres : " + film.genres.map(function(genre){
                                return genre.name;
                            }).join(" / ")}</Text>
                        <Text style={styles.details}>{"Production : " + film.production_companies.map(function(company){
                            return company.name;
                        }).join(" / ")}</Text>
                    </View>
                </View>
            </ScrollView>
        )
    }

    render() {
        if (this.state == null)
            return (this._displayLoading())
        else if (this.state.isLoading)
            return (this._displayLoading())
        else {
            return (this._displayFilm())
        }
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#373f47'
    },

    title: {
        marginTop: 5,
        fontSize: 25,
        textAlign: 'center',
        color: 'white'
    },

    originalTitle: {
        textAlign: 'center',
        color: 'white',
        fontStyle: 'italic'
    },

    image: {
        height: 180,
        backgroundColor: 'grey'
    },

    overview: {
        margin: 5,
        textAlign:'justify',
        color: 'white',
        fontSize: 17,
        fontStyle: 'italic'
    },

    poster: {
        margin:5,
        width: 120,
        height: 180,
        borderRadius: 5
    },

    detailsContainer: {
        flexDirection: 'row',
        backgroundColor: '#AAABBC',
        borderRadius: 5,
        margin: 10,
        marginTop: 0
    },

    textDetailsContainer: {
        margin: 5,
        flex: 1
    },

    details: {
        color: 'white',
        margin: 5,
    },

    resumeContainer: {
        backgroundColor: '#AAABBC',
        borderRadius: 5,
        margin: 10,
        marginTop: 15
    },

    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default FilmDetails