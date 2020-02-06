import React from 'react';
import { 
    StyleSheet, 
    Text, 
    View, 
    StatusBar, 
    TouchableOpacity,
    Dimensions,
    Picker, 
 } from 'react-native';

 const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#07121B',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        borderWidth: 10,
        borderColor: "#89AAFF",
        width: screen.width / 2,
        height: screen.width / 2,
        borderRadius: screen.width / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30
    },
    buttonStop: {
        borderColor: "#FF851B"
    },
    buttonText: {
        fontSize: 45,
        color: "#89AAFF"
    },
    buttonTextStop: {
        color: "#FF851B"
    },
    timerText: {
        color: '#fff',
        fontSize: 90

    },
    picker: {
        width: 50,
    },
    pickerItem: {
        color: "#fff",
        fontSize: 20,
    }
  });

  const formatNumber = number => `0${number}`.slice(-2);

  const getRemaining = time => {
      const minutes = Math.floor(time / 60);
      const seconds = time - minutes * 60;
      return { minutes: formatNumber(minutes), seconds: formatNumber(seconds) };
  };
  
export default class App extends React.Component {
    state = {
        remainingSeconds: 5,
        isRunning: false,
    };

    interval = null;

    componentDidUpdate(prevProp, prevState) {
        if (this.state.remainingSeconds === 0 && prevState.remainingSeconds !== 0) {
            this.stop();
        }
    }

    componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    start = () => {
        this.setState(state => ({
            remainingSeconds: state.remainingSeconds - 1,
            isRunning: true,
        }));
        


    this.interval = setInterval(() => {
        this.setState(state => ({
            remainingSeconds: state.remainingSeconds - 1
        }));
    }, 1000);
    };

    stop = () => {
        clearInterval(this.interval);
        this.interval = null;
        this.setState({ 
            remainingSeconds: 5,
            isRunning: false,
        });
    }

    renderPickers = () => {
        return (
            <View>
                <Picker
                style={styles.picker}
                itemStyle={styles.pickerItem}
                selectedValue="5"
                onValueChange={itemValue => {
                    //update the state
                }}
            >
                <Picker.Item key="1" label="1" value="1" /> 
                <Picker.Item key="2" label="2" value="2" /> 
                <Picker.Item key="3" label="3" value="3" /> 
                <Picker.Item key="4" label="4" value="4" />
                </Picker>
               {/*} <Picker></Picker> */}
            </View>
        );
    }

    render() {
        const { minutes, seconds } = getRemaining(this.state.remainingSeconds);

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content" />
                {this.state.isRunning ? (
                    <Text style={styles.timerText}>{`${minutes}:${seconds}`}</Text>
                ) : ( 
                    this.renderPickers() 
                    )}
                {this.state.isRunning ? (
                    <TouchableOpacity 
                    onPress={this.stop} 
                    style={[styles.button, styles.buttonStop]}>
                    <Text style={[styles.buttonText, styles.buttonTextStop]}>Stop</Text>
                </TouchableOpacity>

                ) : (
                    <TouchableOpacity onPress={this.start} style={styles.button}>
                    <Text style={styles.buttonText}>Start</Text>
                </TouchableOpacity>
                )}
                
            </View>
        );
    }
}
