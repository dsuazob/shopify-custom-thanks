import { useState } from "react";
import { TitleBar } from "@shopify/app-bridge-react";
import { Page } from "@shopify/polaris";
import { CustomThanksCard } from "../components";

export default function HomePage() {
  const [customThanksKey, setCustomThanksKey] = useState(0);
  return (
    <Page fullWidth>
      <TitleBar title="Thank you messages" />
      <CustomThanksCard
        key={customThanksKey}
        customThanksKey={customThanksKey}
        setCustomThanksKey={setCustomThanksKey}
      />
    </Page>
  );
}
