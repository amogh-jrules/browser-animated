import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  View
} from "react-native";
import Animated from "react-native-reanimated";
import Content from "./Content";
import { TabModel, OVERVIEW } from "./Model";
import { bInterpolate } from "react-native-redash";

const {multiply, sin, abs,divide,sub} = Animated;
const perspective = 1000;
const { height } = Dimensions.get("window");

interface TabProps {
  tab: TabModel;
  selectedTab: number;
  index: number;
  closeTab: () => void;
  selectTab: () => void;
  transition : Animated.Node<number>;
}

export default ({
  transition,
  tab,
  selectedTab,
  index,
  selectTab: onPress,
  closeTab
}: TabProps) => {
  const H = -height / 2;
  const position = index > selectedTab ? height : 0;
  const top = selectedTab === OVERVIEW ? index * 150 : position;
  const rotateX = bInterpolate(transition, -Math.PI / 6,0);
  const z = multiply(H,sin(abs(rotateX)));
  const transform = [
    { perspective },
    { rotateX },
    { scale: divide(perspective, sub(perspective, z)) }
  ];
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          height,
          top,
          transform
        }}
      >
        <Content {...{ closeTab, tab, selectedTab }} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};
