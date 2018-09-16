import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, CardItem, Input, Button } from 'native-base';

export default class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: undefined
        };
    }
    searchItem(item) {
        fetch('http://10.214.179.63:3000/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item }),
        })
        .then(data => data.json())
        .then(json => {
            // Alert.alert('Results', `Vegan: ${json.vegan}\nNon-vegan: ${json.nonvegan}\nFlagged: ${json.flagged}`);
            this.setState({ result: json.result });
        })
        .catch(err => Alert.alert(`Request Error: ${err}`));
    }
    render() {
        return (
            <View>
                <Card>
                    <CardItem style={{ flexDirection: 'row' }}>
                        <Input placeholder={'SEARCH INDIVIDUAL INGREDIENT'} style={{ flex: 1 }} /> 
                        <Button><Text style={{ paddingLeft: 5, paddingRight: 5 }}>SEARCH</Text></Button>
                    </CardItem>
                </Card>
                {this.state.result && <Card>
                    <CardItem header>
                        <Text>{this.state.result.item}</Text>
                    </CardItem>
                    <CardItem>
                        {this.state.result.isVegan && <Text style={{ color: 'green' }}>VEGAN</Text>}
                        {this.state.result.isNonVegan && <Text style={{ color: 'red' }}>NON-VEGAN</Text>}
                        {this.state.result.isFlagged && <Text style={{ color: 'orange' }}>DEPENDS ON SOURCE</Text>}
                    </CardItem>
                </Card>}
            </View>
        );
    }
}
