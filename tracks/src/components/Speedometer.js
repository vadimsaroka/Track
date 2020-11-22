import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Spacer from "../components/Spacer";
import Speedometer from "react-native-speedometer-chart";

const win = Dimensions.get("window");

const Chart = ({ speed }) => {
  return (
    <Spacer>
      <Spacer>
        <View
          style={{
            height: win.height / 2,
            justifyContent: "center",
            // backgroundColor: "blue",
            // borderRadius: 200,
          }}
        >
          <Speedometer
            value={speed}
            totalValue={80}
            showIndicator
            size={win.width * 0.97}
            style={{ alignSelf: "center" }}
            // showLabels
            // labelStyle={{ color: "rgb(17, 236, 229)" }}
            innerColor="rgb(29, 38, 54)"
            outerColor="rgb(146, 171, 207)"
            internalColor="rgb(17, 236, 229)"
            showText
            text={speed}
            textStyle={{
              color: "rgb(17, 236, 229)",
              fontSize: 80,
              transform: [{ translateY: 10 }],
            }}
          />
          <Text
            style={{
              color: "rgb(146, 171, 207)",
              alignSelf: "center",
              fontSize: 35,
              transform: [{ translateY: -10 }],
            }}
          >
            mph
          </Text>
        </View>
      </Spacer>
    </Spacer>
  );
};

const styles = StyleSheet.create({
  speed: {
    color: "white",
  },
});

export default Chart;
