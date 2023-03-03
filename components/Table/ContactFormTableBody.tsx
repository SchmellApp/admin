import React from "react";
import { ContactForm } from "@app/types";
import { Group, Text } from "@mantine/core";
import { toContactTypeString, toDateString } from "@app/utils";

interface ContactFormTableBodyProps {
  data: ContactForm[];
  handleRowClick: (id: number) => Promise<void> | void;
}

const ContactFormTableBody = ({
  data,
  handleRowClick
}: ContactFormTableBodyProps): JSX.Element => (
  <tbody>
    {data.map((form) => (
      <tr
        style={{
          cursor: "pointer"
        }}
        key={form.id}
        onClick={() => {
          void handleRowClick(form.id);
        }}
      >
        <td>
          <Group position="left">
            <div>
              <Text size="md">{toContactTypeString(form.type)}</Text>
              <Text size="xs" color="dimmed">
                {toDateString(new Date(form.createdDate))}
              </Text>
            </div>
          </Group>
        </td>
        <td>
          <Text size="md">{form.acceptedTerms ? "Ja" : "Nei"}</Text>
        </td>
        <td>
          <Text size="md">{form.email}</Text>
        </td>
      </tr>
    ))}
  </tbody>
);

export default ContactFormTableBody;
