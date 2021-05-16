import React from 'react';
import { View, Text, Button } from 'react-native';

import firebase from 'firebase';

export default function Feed() {

    const onSignOut = () => {
        firebase.auth().signOut();
    }


    return (
        <View>
            <Text>Feed</Text>
            <Button 
                onPress={() => {onSignOut()}}
            />
        </View>
    )
}
