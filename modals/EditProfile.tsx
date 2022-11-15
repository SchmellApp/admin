import { User, EditUserForm } from "@app/types";
import React, { FC } from "react";
import { useForm } from "@mantine/form";
import { editUserInitialValues, editUserValidator } from "@app/lib";
import { ModalBase, SubmitButton } from "@app/components";
import { FileInput, NumberInput, TextInput } from "@mantine/core";
import { useUpdateMutation, useProfilePictureMutation } from "@app/hooks";

interface EditProfileProps {
  user: User;
  isOpen: boolean;
  onClose: () => void;
}

const EditProfile: FC<EditProfileProps> = (props) => {
  const { user, onClose, isOpen } = props;

  const updateUser = useUpdateMutation(String(user.id));
  const updateProfilePicture = useProfilePictureMutation(String(user.id));

  const form = useForm<EditUserForm>({
    initialValues: editUserInitialValues(user),
    validate: editUserValidator
  });

  const handleSubmit = async (values: EditUserForm): Promise<void> => {
    await updateUser.mutateAsync({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber
    });
    if (values.file !== undefined) {
      await updateProfilePicture.mutateAsync(values.file);
    }
    onClose();
  };

  return (
    <ModalBase isOpen={isOpen} onClose={onClose} title={"Rediger profil"}>
      <form
        onSubmit={form.onSubmit((values) => {
          void handleSubmit(values);
        })}
      >
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
          placeholder={user.profilePicture ?? "Last opp profilbilde"}
          my="md"
          {...form.getInputProps("file")}
        />
        <SubmitButton
          label="Oppdater bruker"
          isLoading={updateUser.isLoading || updateProfilePicture.isLoading}
        />
      </form>
    </ModalBase>
  );
};

export default EditProfile;
