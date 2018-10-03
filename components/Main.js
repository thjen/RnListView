import React,{Component} from "react";
import {View, Text, ListView, Image, RefreshControl} from "react-native";

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2}),
            refreshing: false,
            page: 0,
        }
    }

    loadNewData() {
        this.setState({
            refreshing: true,
        });

        fetch("http://192.168.1.9/ReactNativeEx/ex1.php?page=" + this.state.page)
        .then((response) => response.json()) // converte response => json
        .then((responseJson) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseJson),
                refreshing: false,
                page: this.state.page + 1,
            });
        })
        .catch((error) => {
            console.log(error); 
        });

    }

    render() {
        return (
            <View
                style = {{
                    flex: 1,
                }}>
                <ListView
                    refreshControl = {
                        <RefreshControl
                            refreshing = {this.state.refreshing}
                            onRefresh = {this.loadNewData.bind(this)}
                        />
                    }
                    dataSource = {this.state.dataSource}
                    renderRow = {(row) => 
                        <View
                            style = {{
                                padding: 20,
                                borderWidth: 1,
                            }}>
                            <Image source = {{uri:row.image}}
                                style = {{
                                    width: 70,
                                    height: 100,
                                }}>    
                            </Image>
                            <Text>{row.id}</Text>
                        </View>
                    }>
                </ListView>
            </View>
        );
    }

    componentDidMount() {
        // load data

        fetch("http://192.168.1.9/ReactNativeEx/ex1.php?page=" + this.state.page)
        .then((response) => response.json()) // converte response => json
        .then((responseJson) => {
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(responseJson)
            });
        })
        .catch((error) => {
            console.log(error); 
        });

        /*var array = ["1111", "2222", "3333"];
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(array)
        });*/
    }
}