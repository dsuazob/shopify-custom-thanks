import { useState } from "react";
import {
  Layout,
  Card,
  TextContainer,
  Banner,
  Scrollable,
} from "@shopify/polaris";
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import CustomThanksInput from "./CustomThanksInput";
import CustomThanksList from "./CustomThanksList";

export function CustomThanksCard({ customThanksKey, setCustomThanksKey }) {
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [toastProps, setToastProps] = useState(emptyToastProps);
  const [textValue, setTextValue] = useState("");
  const [emphasis, setEmphasis] = useState("normal");
  const [selected, setSelected] = useState([]);
  const [activeEdit, setActiveEdit] = useState(false);
  const [editedMsg, setEditedMsg] = useState("");
  const fetch = useAuthenticatedFetch();

  const { data } = useAppQuery({
    url: "/api/custom_thanks",
    reactQueryOptions: {
      onSuccess: () => {
        setIsLoading(false);
      },
    },
  });

  const toastMarkup = toastProps.content && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  const handleCreate = async () => {
    setIsLoading(true);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: textValue,
        emphasis: emphasis,
      }),
    };
    const response = await fetch("/api/custom_thanks", options);

    if (response.ok) {
      setToastProps({ content: "Thank you message created!" });
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

  const handleDelete = async () => {
    setIsLoading(true);

    if (selected && selected >= 0) {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(`/api/custom_thanks/${selected}`, options);

      if (response.ok) {
        setToastProps({ content: "Thank you message deleted!" });
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
    }
  };

  const handleMsgSelection = () => {
    if (data && selected) {
      let item = data.find((x) => x.id === selected);
      if (item) {
        setTextValue(item.message);
        setEmphasis(item.emphasis);
      }
    }
  };

  const handleMsgEdit = () => {
    setActiveEdit(true);
  };

  return (
    <>
      {toastMarkup}
      <Layout>
        <Layout.Section oneHalf>
          <Card
            title="Preview new message"
            sectioned
            primaryFooterAction={{
              content: "New message",
              onAction: handleCreate,
              loading: isLoading,
            }}
          >
            {textValue.length > 0 ? (
              <Banner status="success">
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: emphasis === "bold" ? "bold" : "normal",
                    fontStyle: emphasis === "italic" ? "italic" : "normal",
                  }}
                >
                  {textValue}
                </p>
              </Banner>
            ) : (
              <Banner status="success"></Banner>
            )}
            <TextContainer spacing="loose">
              <div>
                <p>
                  This is a preview of what the message will look like for the
                  customer.
                </p>
              </div>
            </TextContainer>
            <CustomThanksInput
              textValue={textValue}
              setTextValue={setTextValue}
              emphasis={emphasis}
              setEmphasis={setEmphasis}
              setActiveEdit={setActiveEdit}
            />
          </Card>
          <Layout.Section></Layout.Section>
        </Layout.Section>
        <Layout.Section oneThird>
          <Card title="Current message" sectioned>
            {data && data.length > 0 ? (
              <Banner status="success">
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: data[0].emphasis === "bold" ? "bold" : "normal",
                    fontStyle:
                      data[0].emphasis === "italic" ? "italic" : "normal",
                  }}
                >
                  {data[0].message}
                </p>
              </Banner>
            ) : (
              <Banner status="success"></Banner>
            )}
          </Card>
        </Layout.Section>
        <Layout.Section fullWidth>
          {data && data.length > 0 ? (
            <Card
              title="Browse previous messages"
              sectioned
              secondaryFooterActions={[
                {
                  content: "Delete message",
                  onAction: handleDelete,
                  destructive: true,
                },
                { content: "Edit message", onAction: handleMsgEdit },
              ]}
              primaryFooterAction={{
                content: "Select message",
                onAction: handleMsgSelection,
              }}
            >
              <Scrollable shadow style={{ height: "250px" }}>
                <CustomThanksList
                  options={data}
                  selected={selected}
                  setSelected={setSelected}
                  editedMsg={editedMsg}
                  setEditedMsg={setEditedMsg}
                  activeEdit={activeEdit}
                  setActiveEdit={setActiveEdit}
                  setToastProps={setToastProps}
                  setIsLoading={setIsLoading}
                  customThanksKey={customThanksKey}
                  setCustomThanksKey={setCustomThanksKey}
                />
              </Scrollable>
            </Card>
          ) : (
            <Card title="No previous messages" sectioned></Card>
          )}
        </Layout.Section>
      </Layout>
    </>
  );
}
