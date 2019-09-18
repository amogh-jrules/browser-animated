import React, { useState } from "react";
import { StyleSheet, Dimensions, View } from "react-native";

import Tab from "./Tab";
import { TabsModel, OVERVIEW } from "./Model";

const { height } = Dimensions.get("window");

interface TabsProps {
  tabs: TabsModel;
}

export default ({ tabs: tabsProps }: TabsProps) => {
  const [tabs, setTabs] = useState([...tabsProps]);
  const [selectedTab, setSelectedTab] = useState(OVERVIEW);

  return (
    <View
      style={{
        backgroundColor: "black",
        height: tabsProps.length * height
      }}
    >
      <View style={StyleSheet.absoluteFill}>
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            closeTab={() => {
              setTabs([...tabs.slice(0, index), ...tabs.slice(index + 1)]);
            }}
            selectTab={() => {
              setSelectedTab(selectedTab === index ? OVERVIEW : index);
            }}
            {...{ tab, selectedTab, index }}
          />
        ))}
      </View>
    </View>
  );
};
