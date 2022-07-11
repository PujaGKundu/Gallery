import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/userContext";

import { Box, Center, Image, Flex, Button, Text } from "@chakra-ui/react";

const Record = (props) => (
  <>
    <Box p="3" maxW="320px" borderWidth="1px" margin={4}>
      <Image
        borderRadius="md"
        src={props.record.image}
        width="250px"
        height="200px"
        objectFit="cover"
      />

      <Text
        mt={2}
        fontSize="xl"
        fontWeight="semibold"
        lineHeight="short"
        align="center"
      >
        {props.record.name}
      </Text>
      <Link to={`/${props.record._id}`}>
        <Button
          colorScheme="blue"
          variant="outline"
          type="submit"
          width="full"
          mt={4}
          mr={4}
        >
          View Details
        </Button>
      </Link>

      {props.isLoggedIn ? (
        <Flex mt={2} align="center">
          <Link to={`/edit/${props.record._id}`}>
            <Button
              colorScheme="green"
              variant="outline"
              type="submit"
              width="full"
              mt={4}
              mr={4}
            >
              Edit
            </Button>
          </Link>
          <Button
            colorScheme="red"
            variant="outline"
            type="submit"
            width="full"
            mt={4}
            ml={4}
            onClick={() => {
              props.deleteRecord(props.record._id);
            }}
          >
            Delete
          </Button>
        </Flex>
      ) : (
        ""
      )}
    </Box>
  </>
);

function Dashboard() {
  let user = useContext(UserContext);
  let { isLoggedIn } = user.data;

  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:8080/record/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:8080/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          isLoggedIn={isLoggedIn}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  return (
    <div className="top-margin">
      {isLoggedIn ? (
        <Link to="/add">
          <Button
            colorScheme="teal"
            variant="solid"
            type="submit"
            width="full"
            mt={6}
          >
            Add New Image
          </Button>
        </Link>
      ) : (
        ""
      )}

      <Center>
        <Text mt={2} fontSize="2xl" fontWeight="bold">
          Gallery Images
        </Text>
      </Center>

      <Flex mt={2} align="center" flexWrap="wrap">
        {recordList()}
      </Flex>
    </div>
  );
}

export default Dashboard;
