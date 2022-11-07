import { User } from "@/types/user";
import React, { FC } from "react";
import { useForm } from "@mantine/form";
import { EditUserForm } from "@/types/forms/user";
import { editUserInitialValues } from "@/lib/forms/initialValues/user";
import { editUserValidator } from "@/lib/forms/validators/user";
import { ModalBase } from "@/components/Wrappers";
import { FileInput, NumberInput, TextInput } from "@mantine/core";
import { SubmitButton } from "@/components/Buttons";

interface EditProfileProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const EditProfile: FC<EditProfileProps> = (props) => {
  const { user, onClose, isOpen } = props;

  const form = useForm<EditUserForm>({
    initialValues: editUserInitialValues(user),
    validate: editUserValidator
  });

  const handleSubmit = (values: typeof form.values): void => {
    console.log("TODO", values);
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={"Rediger profil"}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk={form.values.firstName.length === 0}
          label="Fornavn"
          placeholder="Ola"
          my="md"
          {...form.getInputProps("firstName")}
        />
        <TextInput
          withAsterisk={form.values.lastName.length === 0}
          label="Etternavn"
          placeholder="Nordmann"
          my="md"
          {...form.getInputProps("lastName")}
        />
        <TextInput
          withAsterisk={form.values.email.length === 0}
          label="E-post"
          placeholder="hei@schmell.no"
          my="md"
          {...form.getInputProps("email")}
        />
        <NumberInput
          withAsterisk={
            form.values.phoneNumber === 0 ||
            form.values.phoneNumber === undefined
          }
          label="Telefonnummer"
          placeholder="12345678"
          my="md"
          {...form.getInputProps("phoneNumber")}
        />
        <FileInput
          label="Profilbilde"
          placeholder="Last opp profilbilde"
          my="md"
          {...form.getInputProps("profilePicture")}
        />
        <SubmitButton label="Oppdater bruker" />
      </form>
    </ModalBase>
  );
};

export default EditProfile;
