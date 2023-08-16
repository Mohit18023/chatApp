import { Avatar, Box, Button, Text, Tooltip } from '@chakra-ui/react';
//import React, { useState } from 'react'
import { Icon } from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import { ChatState } from '../../Context/ChatProvider';
import ProfileModal from './ProfileModal';


export default function SideDrawer() {
    // const [search, setSearch] = useState("");
    // const [searcResult, setSearcResult] = useState([])
    // const [loading, useLoading] = useState(false);
    // const [loadingChat, useLoadingChat] = useState();
    
    const { user } = ChatState();
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search Users to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost">
            <Icon as={SearchIcon} boxSize={4} color="black" mr="10px" />
            <Text display={{ base: "none", md: "flex" }} px="4">
              Search User
            </Text>
          </Button>
        </Tooltip>

        <Text fontSize="2xl" fontFamily="work sans">
          {" "}
          ChatApp
        </Text>

        <div>
          <Menu>
            <MenuButton p={1} as={Button} bg="white">
              <Icon as={BellIcon} boxSize={6} color="black" />
            </MenuButton>
            {/* <MenuList>
            </MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg="white">
              <Avatar name={user.name} src={user.pic} size="sm" cursor="pointer" bg="blackAlpha.600"  />
            </MenuButton>
            <MenuList>
                <ProfileModal user={user}>

                <MenuItem>My Profile</MenuItem>
                </ProfileModal>
                <MenuDivider />
                <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    </>
  );
}
