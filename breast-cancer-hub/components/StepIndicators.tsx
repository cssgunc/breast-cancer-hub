import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "./StyleSheet";

interface StepIndicatorsProps {
  totalSteps: number;
  currentStep: number;
}

const StepIndicators: React.FC<StepIndicatorsProps> = ({ totalSteps, currentStep }) => {
    return (
      <View style={styles.indicatorContainer}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          //adjusts the comparison so the first step is considered at index 0
          const iconName = index == currentStep ? "circle" : "circle-o";
          return (
            <FontAwesome
              key={index}
              name={iconName}
              size={24}
              color={colors.darkPink}
              style={styles.indicator}
            />
          );
        })}
      </View>
    );
  };

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  indicator: {
    marginHorizontal: 5,
  },
});

export default StepIndicators;
