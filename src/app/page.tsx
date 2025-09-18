import React from "react";
import ChatPage from "./components/chat";
import UploadPage from "./components/upload-page";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* <UploadPage/> */}
      <ChatPage />
      </div>
    </div>
  );
};

export default Home;
