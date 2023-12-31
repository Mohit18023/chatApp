import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider"
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import Chatbox from "../components/Chatbox";

const ChatPage = () => {
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
      display="flex"
      justifyContent="space-between"
      width="100%"
      height="91.5vh"
      p="10px"
      >
        {user && <MyChats />}
        {user && <Chatbox />}
      </Box>
    </div>
  );
}

export default ChatPage;