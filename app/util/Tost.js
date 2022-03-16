import React from 'react';
import { ToastAndroid } from 'react-native';

export const Tost = (msg) => {
  ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
}