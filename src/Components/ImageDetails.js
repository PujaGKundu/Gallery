import React, { useEffect, useState } from "react";
import { Box, Center, Image, Text } from "@chakra-ui/react";
import { useParams } from "react-router";

export default function ImageDetails() {
  const [record, setRecords] = useState([]);
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:8080/record/${id}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);

        return;
      }

      setRecords(record);
    }

    fetchData();

    return;
  }, [params.id]);

  return (
    <>
      <Center>
        <Box p="3" maxW="720px" margin={4}>
          <Center>
            <Image
              borderRadius="md"
              src={record.image}
              width="250px"
              height="200px"
              objectFit="cover"
            />
          </Center>

          <Text
            mt={2}
            fontSize="2xl"
            fontWeight="bold"
            align="center"
            color="gray"
          >
            {record.name}
          </Text>

          <Text
            mt={2}
            fontSize="xl"
            fontWeight="semibold"
            lineHeight="short"
            align="center"
          >
            {record.description}
          </Text>
        </Box>
      </Center>
    </>
  );
}
