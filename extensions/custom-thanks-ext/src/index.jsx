import { useState, useEffect } from "react";
import {
  useExtensionApi,
  render,
  Banner,
  Text,
  TextBlock,
  Button,
  useSettings,
  useSessionToken,
  useStorage,
  useShop,
  useMetafields,
  useExtensionData,
} from "@shopify/checkout-ui-extensions-react";

render("Checkout::Dynamic::Render", () => <App />);

function App() {
  const extensionData = useExtensionData();
  const rootPath = extensionData.scriptUrl.split("/extensions")[0];
  const [message, setMessage] = useState();
  const [emphasis, setEmphasis] = useState();
  useEffect(() => {
    const url = `${rootPath}/api/custom_thanks.json`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data && data.length > 0) {
          setMessage(data[0].message);
          setEmphasis(data[0].emphasis);
        }
      });
  }, []);

  return (
    <>
      {message && message.length > 0 && (
        <Banner status="success">
          <TextBlock variation="code" emphasis={emphasis}>
            {message}
          </TextBlock>
        </Banner>
      )}
    </>
  );
}
