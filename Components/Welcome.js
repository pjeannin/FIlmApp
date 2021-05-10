import React from 'react'
import {StyleSheet, View, Button} from 'react-native'

class Welcome extends React.Component {
    _changeScreen() {
        this.props.navigation.navigate("Search")
    }

    render() {
        return (
            <View style={styles.view}>
                <Button
                    color='black'
                    title='Press to Continue'
                    onPress={() => this._changeScreen()}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        backgroundColor: '#f1a1ff',
        justifyContent: 'center',
        alignItems: 'center'
    },
})

export default Welcome