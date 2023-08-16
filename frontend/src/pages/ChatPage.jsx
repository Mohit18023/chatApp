import { ChatState } from "../Context/ChatProvider"
import SideDrawer from "../components/miscellaneous/SideDrawer";

const ChatPage = () => {
  const { user } = ChatState();

  return <div style={{ width: "100%" }}>
      { user && <SideDrawer />}
  </div>
}

export default ChatPage;