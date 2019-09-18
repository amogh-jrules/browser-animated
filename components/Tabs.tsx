import React, { useState, useRef,useMemo } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import Animated, {Transitioning, Transition, TransitioningView} from "react-native-reanimated";
import Tab from "./Tab";
import { TabsModel, OVERVIEW } from "./Model";
import {decay,
  bInterpolate,
  useTransition,
  onGestureEvent} from "react-native-redash";
import { PanGestureHandler,State } from "react-native-gesture-handler";

const { Value, eq, neq, diffClamp } = Animated;
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
    neq(selectedTab,OVERVIEW)
  );
  const { gestureEvent, translateY } = useMemo( ()=> {
const translationY = new Value(0);
const velocityY = new Value(0);
const state = new Value(State.UNDETERMINED);
    return {
      translateY : decay(translationY,state,velocityY),
      gestureEvent: onGestureEvent({
        state,
        translationY,
        velocityY,

      })
    };
  }, [tabsProps.length,transitionValue]);

  return (
    <View
      style={{
        backgroundColor: "black",
        height: tabsProps.length * height
      }}
    >
      <PanGestureHandler {...gestureEvent}>
        <Animated.View style={{flex:1,transform : [{translateY}]}}>
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
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};
