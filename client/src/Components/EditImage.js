import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router";
import {
  Flex,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  InputGroup,
  Textarea,
} from "@chakra-ui/react";

function EditImage(props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
  });
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `http://localhost:8080/record/${params.id.toString()}`
      );

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

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedImage = {
      /*name: form.name,
      description: form.description,
      image: form.image,*/
      ...form,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:8080/update/${params.id}`, {
      method: "POST",
      body: JSON.stringify(editedImage),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        props.history.push("/");
      })
      .catch((error) => {
        window.alert(error);
        return;
      });

    setForm({
      name: "",
      description: "",
      image: "",
    });
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <Flex width="full" align="center" justifyContent="center">
      <Box
        p={8}
        maxWidth="700px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        mt={4}
      >
        <Box textAlign="center">
          <Heading>Edit Images</Heading>
        </Box>
        <Box my={4} textAlign="left">
          <form onSubmit={onSubmit}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                id="name"
                value={form.name}
                onChange={(e) => updateForm({ name: e.target.value })}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Image URL</FormLabel>
              <InputGroup>
                <Input
                  type="url"
                  id="image"
                  value={form.image}
                  onChange={(e) => updateForm({ image: e.target.value })}
                />
              </InputGroup>
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Image URL</FormLabel>
              <InputGroup>
                <Textarea
                  id="description"
                  rows="10"
                  value={form.description}
                  onChange={(e) => updateForm({ description: e.target.value })}
                />
              </InputGroup>
            </FormControl>
            <Button
              variantcolor="teal"
              variant="outline"
              type="submit"
              width="full"
              mt={4}
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </Flex>
  );
}

export default withRouter(EditImage);
