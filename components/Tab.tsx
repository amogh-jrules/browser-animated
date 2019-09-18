import React from "react";
import {
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
  View
} from "react-native";

import Content from "./Content";
import { TabModel, OVERVIEW } from "./Model";

const perspective = 1000;
const { height } = Dimensions.get("window");

interface TabProps {
  tab: TabModel;
  selectedTab: number;
  index: number;
  closeTab: () => void;
  selectTab: () => void;
}

export default ({
  tab,
  selectedTab,
  index,
  selectTab: onPress,
  closeTab
}: TabProps) => {
  const H = -height / 2;
  const position = index > selectedTab ? height : 0;
  const top = selectedTab === OVERVIEW ? index * 150 : position;
  const rotateX = selectedTab === OVERVIEW ? -Math.PI / 6 : 0;
  const z = H * Math.sin(Math.abs(rotateX));
  const transform = [
    { perspective },
    { rotateX: `${rotateX}rad` },
    { scale: perspective / (perspective - z) }
  ];
  return (
    <TouchableWithoutFeedback {...{ onPress }}>
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          height,
          top,
          transform
        }}
      >
        <Content {...{ closeTab, tab, selectedTab }} />
      </View>
    </TouchableWithoutFeedback>
  );
};
