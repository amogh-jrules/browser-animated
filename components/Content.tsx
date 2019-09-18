import React, { useMemo, useRef } from "react";
import { StyleSheet, View, Dimensions, WebView, Text } from "react-native";
import Constants from "expo-constants";
import { TabModel, OVERVIEW } from "./Model";

const { width } = Dimensions.get("window");
const EXTREMITY = width * 1.1;
const snapPoints = [-EXTREMITY, 0, EXTREMITY];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 25,
    overflow: "hidden"
  },
  title: {
    fontWeight: "bold",
    fontSize: 12,
    textAlign: "center",
    alignSelf: "center"
  },
  webView: { flex: 1 }
});

interface ContentProps {
  tab: TabModel;
  closeTab: () => void;
  selectedTab: number;
}

export default ({ tab: { uri, id: title }, selectedTab }: ContentProps) => {
  const offset = selectedTab === OVERVIEW ? 0 : Constants.statusBarHeight;
  return (
    <View style={styles.container}>
      <View
        style={{
          paddingTop: offset,
          height: 32 + offset,
          backgroundColor: "#fefefe",
          justifyContent: "center"
        }}
      >
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.webView}>
        <WebView source={{ uri }} style={styles.webView} />
        <View style={StyleSheet.absoluteFill} />
      </View>
    </View>
  );
};
