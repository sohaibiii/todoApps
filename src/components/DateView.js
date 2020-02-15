import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import moment from 'moment';
import styles from './styles/DateViewStyles';
import DateTimePicker from '@react-native-community/datetimepicker';

export default class DateView extends Component {
  constructor(props) {
    super(props);
    this.day = moment().format('ddd');
    this.date = moment().format('D');
    this.month = moment().format('MMMM');
    this.state = {
      show: false,
      dateC: new Date(1598051730000),
    };
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate;

    this.setState(
      {
        dateC: currentDate,
        show: false,
      },
      () => {
        console.log('my current date is here', this.state.dateC);
        this.props.getTime(this.state.dateC);
      },
    );
  };

  render() {
    let {show, dateC} = this.state;
    return (
      <>
        <TouchableOpacity
          onPress={() => this.setState({show: !this.state.show})}>
          <View style={styles.container}>
            <Text style={styles.day}>{this.day.toUpperCase()}</Text>
            <Text style={styles.date}>{this.date}</Text>
            <Text style={styles.month}>{this.month.toUpperCase()}</Text>
          </View>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            mode="time"
            value={dateC}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
          />
        )}
      </>
    );
  }
}
