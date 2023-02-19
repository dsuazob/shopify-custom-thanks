import { useCallback } from "react";
import {
  Page,
  Layout,
  ButtonGroup,
  Tooltip,
  Button,
  FormLayout,
  TextField,
} from "@shopify/polaris";

export default function CustomThanksInput({
  textValue,
  setTextValue,
  setActiveEdit,
  emphasis,
  setEmphasis,
}) {
  const handleTextChange = useCallback((newValue) => {
    setTextValue(newValue), [];
    setActiveEdit(false);
  });

  const assignEmphasis = (value) => {
    if (emphasis === "normal") {
      setEmphasis(value);
    } else {
      if (emphasis === value) {
        setEmphasis("normal");
      } else {
        setEmphasis(value);
      }
    }
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <FormLayout>
            <div style={{ width: "100px" }}>
              <ButtonGroup segmented fullWidth>
                <Tooltip content="Bold" dismissOnMouseOut>
                  <Button onClick={() => assignEmphasis("bold")}>B</Button>
                </Tooltip>
                <Tooltip content="Italic" dismissOnMouseOut>
                  <Button onClick={() => assignEmphasis("italic")}>I</Button>
                </Tooltip>
              </ButtonGroup>
            </div>
            <TextField
              label="Enter new message below"
              value={textValue}
              onChange={handleTextChange}
              placeholder="Thanks for the purchase!"
              selectTextOnFocus
            />
          </FormLayout>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
