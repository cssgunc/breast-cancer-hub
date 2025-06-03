import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useColors } from "@/components/style/ColorContext";

interface StepIndicatorsProps {
  totalSteps: number;
  currentStep: number;
  onStepPressed: (step: number) => void;
}

const StepIndicators: React.FC<StepIndicatorsProps> = ({
  totalSteps,
  currentStep,
  onStepPressed,
}) => {
  const { colors } = useColors();

  const styles = StyleSheet.create({
    indicatorContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 8,
    },
  });

  return (
    <View style={styles.indicatorContainer}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        //adjusts the comparison so the first step is considered at index 0
        const iconName = index === currentStep ? "circle" : "circle-o";
        return (
          <Pressable key={index} onPress={() => onStepPressed(index)}>
            <FontAwesome
              key={index}
              name={iconName}
              size={24}
              color={colors.darkHighlight}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

export default StepIndicators;
