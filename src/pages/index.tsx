import React from "react";
import { Text, View } from "react-native";
import Button from "ui/components/inputs/Button/Button";

const Index: React.FC = () => {
    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Button mode={"contained"} onPress={() => {}}>
                Encontrar diarista
            </Button>
        </View>
    );
};

export default Index;
