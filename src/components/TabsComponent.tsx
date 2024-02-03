"use client";

import { Tab, Tabs } from "@nextui-org/react";

export default function TabsComponent() {
  return (
    <Tabs variant="underlined">
      <Tab key="Home" title="Home">
        Home
      </Tab>
      <Tab key="About" title="About">
        About
      </Tab>
    </Tabs>
  );
}
