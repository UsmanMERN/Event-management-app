import { Link, Tabs } from "expo-router";
import React from "react";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
  style?: React.ComponentProps<typeof Ionicons>["style"];
}) {
  return (
    <Ionicons
      size={28}
      style={[{ marginBottom: -3 }, props.style]}
      {...props}
    />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#9a9a9a",
        tabBarStyle: {
          backgroundColor: "#000",
          borderTopWidth: 0,
          elevation: 0,
          height: 64,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          paddingBottom: 4,
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="musical-notes" color={color} />
          ),
          tabBarLabel: () => null,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <TabBarIcon
                    name="information-circle"
                    color={theme.text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ color }) => <TabBarIcon name="person" color={color} />,
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
