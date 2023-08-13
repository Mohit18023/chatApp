import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useHistory } from 'react-router-dom'; 


const Signup = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [showconfirm, setShowconfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useHistory();


  const handleClick = (pics) => {
    setShow(!show);
  };
  const handleConfirmClick = (pics) => {
    setShowconfirm(!showconfirm);
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select and Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatApp");
      data.append("cloud_name", "mohit1054");
      fetch("https://api.cloudinary.com/v1_1/mohit1054/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: "Please fill all the required fields",
        status: "warning",
        duration: 5000,
        isClosable: "true",
        position: "bottom",
      });

      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Doesn't match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );

      toast({
        title: "Registration successful",
        duration: 5000,
        status:"success",
        isClosable: true,
        position: "top"
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
    }
  };

  return (
    <VStack spacing="5px" color="black">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          bg={name ? "gray.50" : "white"}
          color="black"
          _hover={{ borderColor: "black" }}
          borderColor="black"
          onChange={(event) => {
            setName(event.target.value);
          }}
          value={name}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          bg={email ? "gray.50" : "white"}
          _hover={{ borderColor: "black" }}
          borderColor="black"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          value={email}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            bg={password ? "gray.50" : "white"}
            placeholder="Enter your password"
            _hover={{ borderColor: "black" }}
            borderColor="black"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
          <InputRightElement w="4.5em">
            <Button h="1.75em" size="sm" onClick={handleClick} color="black">
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={showconfirm ? "text" : "password"}
            bg={confirmpassword ? "gray.50" : "white"}
            placeholder="re-enter your password"
            _hover={{ borderColor: "black" }}
            borderColor="black"
            onChange={(event) => {
              setConfirmpassword(event.target.value);
            }}
            value={confirmpassword}
          />
          <InputRightElement w="4.5em">
            <Button
              h="1.75em"
              size="sm"
              onClick={handleConfirmClick}
              color="black"
            >
              {showconfirm ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="green"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        {" "}
        Sign Up
      </Button>
    </VStack>
  );
};

export default Signup;
