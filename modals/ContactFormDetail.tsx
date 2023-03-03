import React from "react";
import { ContactForm } from "@app/types";
import { Anchor, Button, Group, Text, useMantineTheme } from "@mantine/core";
import { useContactFormDelete } from "@app/hooks";
import { ModalBase } from "@app/components";
import { toContactTypeString, toDateString } from "@app/utils";

interface ContactFormDetailProps {
  isOpen: boolean;
  contactForm: ContactForm;
  onClose: () => void;
}

const ContactFormDetail = ({
  isOpen,
  contactForm,
  onClose
}: ContactFormDetailProps): JSX.Element => {
  const isDarkScheme = useMantineTheme().colorScheme === "dark";

  const deleteContactForm = useContactFormDelete();

  const handleDelete = async (): Promise<void> => {
    await deleteContactForm.mutateAsync(contactForm.id);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title="Kontaktskjema">
      <Group mt="sm">
        <Text size="md" weight={500}>
          Type:
        </Text>
        <Text size="md">{toContactTypeString(contactForm.type)}</Text>
      </Group>
      <Group mt="sm">
        <Text size="md" weight={500}>
          Opprettet:
        </Text>
        <Text size="md">{toDateString(new Date(contactForm.createdDate))}</Text>
      </Group>
      {contactForm.email != null && (
        <Group mt="sm">
          <Text size="md" weight={500}>
            E-post:
          </Text>
          <Anchor
            href={`mailto:${contactForm.email}`}
            color={isDarkScheme ? "yellow" : "blue"}
          >
            {contactForm.email}
          </Anchor>
        </Group>
      )}
      <Group mt="sm">
        <Text size="md" weight={500}>
          Akseptert vilkår:
        </Text>
        <Text size="md">{contactForm.acceptedTerms ? "Ja" : "Nei"}</Text>
      </Group>
      <Group mt="sm">
        <Text size="md" weight={500}>
          Melding:
        </Text>
        <Text size="md">{contactForm.message}</Text>
      </Group>
      <Group position="right" mt="md">
        <Button
          color="red"
          onClick={() => {
            void handleDelete();
          }}
          variant="outline"
        >
          Slett skjema
        </Button>
      </Group>
    </ModalBase>
  );
};

export default ContactFormDetail;
