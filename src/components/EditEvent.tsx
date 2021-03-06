import { EditIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  VStack,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  Box,
  CloseButton,
  Divider,
  ModalFooter,
  IconButton,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import React from "react";
import { useUpdateEventMutation } from "../generated/graphql";
import { Event } from "../models";
import { parseDate } from "../utils/parseDate";
import { InputField } from "./InputField";
import { TextareaField } from "./TextareaField";

interface Props {
  event: Event;
  // editEvent:
}

const EditEvent: React.FC<Props> = ({ event }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [, updateEvent] = useUpdateEventMutation();

  return (
    <>
      <IconButton
        aria-label="edit event"
        icon={<EditIcon />}
        onClick={onOpen}
      />

      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding={4}
          >
            <Heading fontSize="large">Edit event</Heading>
            <CloseButton onClick={onClose} />
          </Box>
          <Divider />
          <Formik
            initialValues={{
              title: event.title ?? "",
              description: event.title ?? "",
              location: event.location ?? "",
              datetime: parseDate(event.datetime) ?? "",
            }}
            onSubmit={async (values) => {
              console.log(values);
              await updateEvent({
                input: values,
                id: event.id,
              });
              onClose();
            }}
          >
            {(props) => (
              <Form>
                <VStack align="stretch" spacing={4} padding={4}>
                  <InputField
                    name="title"
                    placeholder="what's it called?"
                    label="Title"
                    required
                  />

                  <InputField
                    name="datetime"
                    placeholder="when do I show up?"
                    label="Date &amp; time"
                    required
                    type="datetime-local"
                  />
                  <InputField
                    name="location"
                    placeholder="where's it happening?"
                    label="Location"
                    required
                  />
                  <TextareaField
                    name="description"
                    placeholder="what's going down?"
                    label="Description"
                    required
                  />
                </VStack>

                <ModalFooter>
                  <Button
                    colorScheme="orange"
                    variant="ghost"
                    mr={3}
                    onClick={onClose}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorScheme="orange"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Edit
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </Formik>
        </ModalContent>
      </Modal>
    </>
  );
};

export { EditEvent };
