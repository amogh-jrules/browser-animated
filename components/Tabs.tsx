import React, { useState, useRef } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Animated, {Transitioning, Transition, TransitioningView} from "react-native-reanimated";
import Tab from "./Tab";
import { TabsModel, OVERVIEW } from "./Model";
import {useTransition} from "react-native-redash";

const {eq,neq} =Animated;
const { height } = Dimensions.get("window");
const transition = <Transition.Change durationMs = {400} interpolation = "easeInOut" />
interface TabsProps {
  tabs: TabsModel;
}

export default ({ tabs: tabsProps }: TabsProps) => {
  const ref = useRef<TransitioningView>(null);
  const [tabs, setTabs] = useState([...tabsProps]);
  const [selectedTab, setSelectedTab] = useState(OVERVIEW);
  const transitionValue = useTransition(
    selectedTab,
    eq(selectedTab,OVERVIEW),
    neq(selectedTab,OVERVIEW));

  return (
    <View
      style={{
        backgroundColor: "black",
        height: tabsProps.length * height
      }}
    >
      <Transitioning.View style={StyleSheet.absoluteFill} {...{ref, transition}}>
        {tabs.map((tab, index) => (
          <Tab
            transition={transitionValue}
            key={tab.id}
            closeTab={() => {
              if(ref.current){
                ref.current.animateNextTransition();
              }
              setTabs([...tabs.slice(0, index), ...tabs.slice(index + 1)]);
            }}
            selectTab={() => {
              setSelectedTab(selectedTab === index ? OVERVIEW : index);
            }}
            {...{ tab, selectedTab, index }}
          />
        ))}
      </Transitioning.View>
    </View>
  );
};
