import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
} from 'react-native';
import { Card, CardItem, Body } from 'native-base';

export default class ResultsView extends Component {
    render() {
        let { vegan, nonvegan, flagged } = this.props.navigation.getParam('results');
        return (
            <ScrollView style={{ flex: 1 }}>
                <Card>
                    <CardItem header>
                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Vegan Ingredients</Text>
                    </CardItem>
                    {vegan.map(item => (
                        <CardItem key={`vegan_${item}`}>
                            <Text>{item}</Text>
                        </CardItem>
                    ))}
                </Card>
                <Card>
                    <CardItem header>
                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Non-vegan Ingredients</Text>
                    </CardItem>
                    {nonvegan.map(item => (
                        <CardItem key={`nonvegan_${item}`}>
                            <Text>{item}</Text>
                        </CardItem>
                    ))}
                </Card>
                <Card>
                    <CardItem header>
                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>Flagged Ingredients</Text>
                    </CardItem>
                    {flagged.map(item => (
                        <CardItem key={`flag_${item}`}>
                            <Text>{item}</Text>
                        </CardItem>
                    ))}
                </Card>
            </ScrollView>
        );
    }
}
