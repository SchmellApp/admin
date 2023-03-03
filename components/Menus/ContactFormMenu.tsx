import { ContactFilterMenu } from "@app/types";
import {
  ActionIcon,
  Menu,
  MultiSelect,
  Title,
  useMantineTheme,
  Text,
  Switch
} from "@mantine/core";
import { IconFilter } from "@tabler/icons";
import React, { FC } from "react";
import { CONTACT_FORM_TYPES } from "@app/constants";

interface ContactFormMenuProps {
  filters: ContactFilterMenu;
  handleFilter: (
    prop: keyof ContactFilterMenu
  ) => (values: string[] | string | boolean) => void;
}

const ContactFormMenu: FC<ContactFormMenuProps> = ({
  handleFilter,
  filters
}): JSX.Element => {
  const theme = useMantineTheme();
  const isDarkScheme = theme.colorScheme === "dark";

  return (
    <Menu shadow="md" position={"left-start"}>
      <Menu.Target>
        <ActionIcon color={isDarkScheme ? "yellow" : "dark"} size="lg">
          <IconFilter size={30} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>
          <Title order={4} color={isDarkScheme ? "white" : "dark"}>
            Filter
          </Title>
        </Menu.Label>
        <Menu.Divider />
        <Menu.Label>
          <Text size="md" color={isDarkScheme ? "white" : "dark"}>
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
          <Switch
            size="md"
            labelPosition="right"
            label="Akseptert vilkår"
            checked={filters.acceptedTerms}
            onChange={(event) =>
              handleFilter("acceptedTerms")(event.currentTarget.checked)
            }
            mb="sm"
            color={isDarkScheme ? "yellow" : "dark"}
          />
        </Menu.Label>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ContactFormMenu;
