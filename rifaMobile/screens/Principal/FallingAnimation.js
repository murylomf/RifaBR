import React, { Component } from 'react';
import { Dimensions, View, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';

import littleGreen from '../../img/little-green-animation.png';
import littleYellow from '../../img/little-yellow-animation.png';
const count = 50;
const duration = 1400;

const LITTLE_DIMENSIONS = { width: 20, height: 32 };
const SCREEN_DIMENSIONS = Dimensions.get('window');
const WIGGLE_ROOM = 50;

const binaryRandom = () => Math.floor((Math.random() * 1) + 0.5);
const randomize = max => Math.random() * max;
const r = () => randomize(SCREEN_DIMENSIONS.width - LITTLE_DIMENSIONS.width) - WIGGLE_ROOM;

const as = [];

const range = count => {
  const array = [];
  for (let i = 0; i < count; i++) {
    array.push(i);
  }
  return array;
};


range(count).forEach(() => as.push({ left: r(), type: binaryRandom() }));

const Falling = ({ duration, delay, style, children }) => (
  <Animatable.View
    animation={{
      from: { translateY: -LITTLE_DIMENSIONS.height - WIGGLE_ROOM },
      to: { translateY: SCREEN_DIMENSIONS.height + WIGGLE_ROOM },
    }}
    duration={duration}
    delay={delay}
    easing={t => Math.pow(t, 1.7)}
    iterationCount="infinite"
    useNativeDriver
    style={style}>
    {children}
  </Animatable.View>
);

export default () => range(count)
      .map((flipDelay, i) => {
        const a = as[i];
        return <Falling
          key={i}
          duration={duration}
          delay={i * (duration / count)}
          style={{
            position: 'absolute',
            paddingHorizontal: WIGGLE_ROOM,
            left: a.left,
          }}>
          <Image source={a.type ? littleGreen : littleYellow} />
        </Falling>
      })