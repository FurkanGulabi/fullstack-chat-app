import Sidebar from "../components/sidebar/Sidebar.jsx";
import MessageContainer from "../components/messages/MessageContainer.jsx";

const Home = () => {
  return (
    <>
      <div className="flex sm:h-[450px] md:h-[700px] rounded-lg border border-white overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <Sidebar />
        <MessageContainer />
      </div>
    </>
  );
};

export default Home;
