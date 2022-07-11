import React, { useState } from "react";
import { withRouter } from "react-router-dom";
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

function AddImages(props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
  });

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newImage = { ...form };

    await fetch("http://localhost:8080/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newImage),
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

  return (
    <>
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
            <Heading>Add Images</Heading>
          </Box>
          <Box my={4} textAlign="left">
            <form onSubmit={onSubmit}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  required
                  type="text"
                  id="name"
                  placeholder="Enter your Image Name"
                  value={form.name}
                  onChange={(e) => updateForm({ name: e.target.value })}
                />
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Image URL</FormLabel>
                <InputGroup>
                  <Input
                    required
                    type="url"
                    id="image"
                    placeholder="Enter the image"
                    value={form.image}
                    onChange={(e) => updateForm({ image: e.target.value })}
                  />
                </InputGroup>
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Image URL</FormLabel>
                <InputGroup>
                  <Textarea
                    required
                    id="description"
                    rows="5"
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                      updateForm({ description: e.target.value })
                    }
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
    </>
  );
}

export default withRouter(AddImages);
