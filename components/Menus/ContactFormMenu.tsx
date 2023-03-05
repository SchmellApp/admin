import { ContactFilterMenu } from "@app/types";
import {
  ActionIcon,
  Menu,
  MultiSelect,
  Title,
  Text,
  Switch,
  TextInput
} from "@mantine/core";
import { IconFilter } from "@tabler/icons";
import React from "react";
import { CONTACT_FORM_TYPES } from "@app/constants";
import { useTheme } from "@app/hooks";

interface ContactFormMenuProps {
  filters: ContactFilterMenu;
  handleFilter: (
    prop: keyof ContactFilterMenu
  ) => (values: string[] | string | boolean) => void;
}

const ContactFormMenu = ({
  handleFilter,
  filters
}: ContactFormMenuProps): JSX.Element => {
  const { isDark } = useTheme();

  return (
    <Menu shadow="md" position={"left-start"}>
      <Menu.Target>
        <ActionIcon color={isDark ? "yellow" : "dark"} size="lg">
          <IconFilter size={30} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          <Title order={4} color={isDark ? "white" : "dark"}>
            Filter
          </Title>
        </Menu.Label>
        <Menu.Divider />
        <Menu.Label>
          <Text size="md" color={isDark ? "white" : "dark"}>
            Type
          </Text>
          <MultiSelect
            value={filters.type}
            onChange={(value) => handleFilter("type")(value)}
            data={CONTACT_FORM_TYPES}
            searchable
            placeholder="Velg type"
            mt="sm"
          />
        </Menu.Label>
        <Menu.Divider />
        <Menu.Label>
          <Text size="md" color={isDark ? "white" : "dark"}>
            E-post
          </Text>
          <TextInput
            value={filters.email}
            onChange={(event) =>
              handleFilter("email")(event.currentTarget.value)
            }
            placeholder="Søk etter e-post"
            mt="sm"
          />
        </Menu.Label>
        <Menu.Divider />
        <Menu.Label>
          <Switch
            size="md"
            labelPosition="left"
            label="Akseptert vilkår"
            checked={filters.acceptedTerms}
            onChange={(event) =>
              handleFilter("acceptedTerms")(event.currentTarget.checked)
            }
            mb="sm"
            color={isDark ? "yellow" : "dark"}
          />
        </Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ContactFormMenu;
