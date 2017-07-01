import React from 'react';
import { View } from 'react-native';

const Divider = ({ color }) => (
  <View style={{ height: 1, backgroundColor: color || 'rgba(0,0,0,.1)' }} />
);

export default Divider;
