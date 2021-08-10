import { DeleteIcon } from "@chakra-ui/icons";
import { Heading, IconButton, Text } from "@chakra-ui/react";
import React from "react";
import { useDeleteEventMutation } from "../generated/graphql";
import { Card } from "./Card";

interface Props {
  id: number;
  title: string;
  description: string;
  location: string;
  hostUsername: string;
  time: string;
  removeEvent: (id: any) => void;
}

const EventCard: React.FC<Props> = ({
  id,
  title,
  description,
  location,
  hostUsername,
  time,
  removeEvent,
}) => {
  const [, deleteEvent] = useDeleteEventMutation();

  return (
    <Card>
      <Heading>{title}</Heading>
      <Text>{description}</Text>
      <Text>{location}</Text>
      <Text>{hostUsername}</Text>
      <Text>{time}</Text>
      <IconButton
        aria-label="delete event"
        icon={<DeleteIcon />}
        onClick={async () => {
          const success = await deleteEvent({ id });
          if (!success) {
            console.log("event doesn't exist");
          } else {
            removeEvent(id);
          }
        }}
      />
    </Card>
  );
};

export { EventCard };
