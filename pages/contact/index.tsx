import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { ActionIcon, Badge, Group, MediaQuery, Title } from "@mantine/core";
import React, { ReactNode, useState } from "react";
import { ContactFilterMenu, ContactForm } from "@app/types";
import { useContactFormsQuery, useModal, useTheme } from "@app/hooks";
import {
  ContactFormMenu,
  ContactFormTableBody,
  DataTableWrapper,
  Wrapper
} from "@app/components";
import { IconX } from "@tabler/icons";
import { toContactTypeString } from "@app/utils";
import { ContactFormType } from "@app/enums";
import { CONTACT_FORM_HEADER } from "@app/constants";
import { ContactFormDetail } from "@app/modals";

export default withPageAuthRequired(function Contact(): JSX.Element {
  const { isDark } = useTheme();
  const { onClose, onOpen, isOpen } = useModal();

  const [selectedForm, setSelectedForm] = useState<ContactForm | null>(null);
  const [filters, setFilters] = useState<ContactFilterMenu>({
    type: [],
    acceptedTerms: true,
    email: "",
    page: 1
  });

  const { data: forms } = useContactFormsQuery({
    acceptedTerms: filters.acceptedTerms,
    type: filters.type.length > 0 ? filters.type.join("+") : undefined,
    email: filters.email !== "" ? filters.email : undefined,
    page: filters.page,
    pageSize: 10
  });

  const isEmptyFilters =
    filters.type.length === 0 &&
    !filters.acceptedTerms &&
    filters.email.length === 0;

  const handleFilter =
    (prop: keyof ContactFilterMenu) =>
    (value: string[] | string | number | boolean) => {
      setFilters((prev) => ({ ...prev, [prop]: value }));
    };
  const handleRemove =
    (prop: keyof ContactFilterMenu) => (value: string | number) => {
      if (prop === "acceptedTerms") {
        setFilters((prev) => ({ ...prev, [prop]: false }));
      } else if (prop === "email") {
        setFilters((prev) => ({ ...prev, [prop]: "" }));
      } else if (prop === "page") {
        setFilters((prev) => ({ ...prev, [prop]: 1 }));
      } else {
        setFilters((prev) => ({
          ...prev,
          [prop]: prev[prop].filter((item) => item !== value)
        }));
      }
    };
  const handleShowDetails = (id: number): void => {
    setSelectedForm(forms?.contactForms.find((form) => form.id === id) ?? null);
    onOpen();
  };

  const RemoveButton = (onClick: () => void): ReactNode => (
    <ActionIcon
      size={"sm"}
      color={isDark ? "yellow" : "dark"}
      radius={"xl"}
      variant={"transparent"}
      onClick={onClick}
    >
      <IconX size={20} />
    </ActionIcon>
  );

  return (
    <Wrapper>
      <MediaQuery styles={{ display: "none" }} largerThan="sm">
        <Title order={2} mb="sm">
          Kundekontakt
        </Title>
      </MediaQuery>
      <Group position={isEmptyFilters ? "right" : "apart"} mt="md">
        <Group position="left" style={{ gap: 8 }}>
          {!isEmptyFilters &&
            filters.type.map((filter, idx) => (
              <Badge
                variant="outline"
                size="lg"
                key={idx}
                rightSection={RemoveButton(() => handleRemove("type")(filter))}
                color={isDark ? "yellow" : "white"}
              >
                {toContactTypeString(filter as ContactFormType)}
              </Badge>
            ))}
          {filters.acceptedTerms && (
            <Badge
              variant="outline"
              size="lg"
              rightSection={RemoveButton(() =>
                handleFilter("acceptedTerms")(false)
              )}
              color={isDark ? "yellow" : "white"}
            >
              Godkjent vilkår
            </Badge>
          )}
          {filters.email !== "" && (
            <Badge
              variant="outline"
              size="lg"
              rightSection={RemoveButton(() => handleFilter("email")(""))}
              color={isDark ? "yellow" : "white"}
            >
              {filters.email}
            </Badge>
          )}
        </Group>
        <ContactFormMenu filters={filters} handleFilter={handleFilter} />
      </Group>
      <div>
        {forms != null && (
          <>
            <DataTableWrapper
              headers={CONTACT_FORM_HEADER}
              currentPage={filters.page}
              maxPage={forms.lastPage}
              onChangePage={handleFilter("page")}
            >
              <ContactFormTableBody
                data={forms.contactForms}
                handleRowClick={(id: number) => handleShowDetails(id)}
              />
            </DataTableWrapper>
          </>
        )}
      </div>
      {selectedForm != null && (
        <ContactFormDetail
          isOpen={isOpen}
          contactForm={selectedForm}
          onClose={() => {
            onClose();
            setSelectedForm(null);
          }}
        />
      )}
    </Wrapper>
  );
});
