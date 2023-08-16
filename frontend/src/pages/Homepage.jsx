import React, { useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Box, Container, Text } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
export default function Homepage() {
    const history = useHistory();

    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("userInfo"));

      if (user) history.push("/chats");
    }, [history]);
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        w="100%"
        p={3}
        bg={"white"}
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
        justifyContent="center"
        alignItems="center" // Center vertically
        textAlign="center" // Center horizontally
      >
        <Text fontSize="4xl" fontFamily="work sans" color="blue.400">
          ChatApp
        </Text>
      </Box>

      <Box
        bg="white"
        w="100%"
        borderRadius="lg"
        borderWidth="1px"
        color="black"
      >
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList mb="1em" ml="10px" mr="10px" mt="20px">
            <Tab w="50%">Log in</Tab>
            <Tab w="50%">Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
