import { useState } from "react";
import {
  Card,
  ButtonGroup,
  Tooltip,
  Button,
  Stack,
  RadioButton,
  TextField,
  Badge,
} from "@shopify/polaris";

export default function CustomThanksList({
  options,
  selected,
  setSelected,
  editedMsg,
  setEditedMsg,
  activeEdit,
  setActiveEdit,
  setToastProps,
  customThanksKey,
  setCustomThanksKey,
  setIsLoading,
}) {
  const [editEmphasis, setEditEmphasis] = useState("normal");
  const handleSelection = (id) => {
    setSelected(id);
    setEditedMsg("");
    setActiveEdit(false);
    let item = options.find((x) => x.id === id);
    if (item) {
      setEditEmphasis(item.emphasis);
    }
  };
  const handleEdit = async () => {
    setIsLoading(true);

    const fOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: editedMsg,
        emphasis: editEmphasis,
      }),
    };
    const response = await fetch(`/api/custom_thanks/${selected}`, fOptions);

    if (response.ok) {
      setToastProps({ content: "Thank you message edited!" });
      setCustomThanksKey(customThanksKey + 1);
    } else {
      response.json().then((errorData) => {
        errorData.message.forEach((err) => {
          setToastProps({
            content: "Message " + err,
            error: true,
          });
        });
      });
      setIsLoading(false);
    }
  };

  const assignEditEmphasis = (value) => {
    if (editEmphasis === "normal") {
      setEditEmphasis(value);
    } else {
      if (editEmphasis === value) {
        setEditEmphasis("normal");
      } else {
        setEditEmphasis(value);
      }
    }
  };

  return (
    <Card>
      <Stack vertical>
        {" "}
        {options &&
          options.length > 0 &&
          options.map((option, index) => (
            <div key={option.id}>
              <ButtonGroup>
                <RadioButton
                  label={option.message}
                  value={option.id}
                  checked={selected === option.id}
                  onChange={() => handleSelection(option.id)}
                />
                {selected === option.id && activeEdit ? (
                  <>
                    {editEmphasis === "bold" ? (
                      <Button size="slim" primary disabled>
                        B
                      </Button>
                    ) : (
                      <Button size="slim" outline disabled>
                        B
                      </Button>
                    )}
                    {editEmphasis === "italic" ? (
                      <Button size="slim" primary disabled>
                        I
                      </Button>
                    ) : (
                      <Button size="slim" outline disabled>
                        I
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    {option.emphasis === "bold" ? (
                      <Button size="slim" primary disabled>
                        B
                      </Button>
                    ) : (
                      <Button size="slim" outline disabled>
                        B
                      </Button>
                    )}
                    {option.emphasis === "italic" ? (
                      <Button size="slim" primary disabled>
                        I
                      </Button>
                    ) : (
                      <Button size="slim" outline disabled>
                        I
                      </Button>
                    )}
                  </>
                )}

                {index === 0 && (
                  <>
                    <Badge status="success">Current</Badge>
                  </>
                )}
              </ButtonGroup>
              {selected === option.id && activeEdit && (
                <>
                  <TextField
                    labelHidden
                    onChange={setEditedMsg}
                    value={editedMsg}
                    autoComplete="off"
                  />
                  <ButtonGroup segmented>
                    <Button onClick={() => handleEdit()}>Edit message</Button>

                    <Tooltip content="Bold" dismissOnMouseOut>
                      <Button onClick={() => assignEditEmphasis("bold")}>
                        B
                      </Button>
                    </Tooltip>
                    <Tooltip content="Italic" dismissOnMouseOut>
                      <Button onClick={() => assignEditEmphasis("italic")}>
                        I
                      </Button>
                    </Tooltip>
                  </ButtonGroup>
                </>
              )}
            </div>
          ))}
      </Stack>
    </Card>
  );
}
