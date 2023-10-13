import { lazy } from "react";
import { Route,Routes } from "react-router-dom";

const ChatHall = lazy(() => import("../Hall"));
const Detail = lazy(() => import("../Detail"));
const Index = () => {
  
  return (
    <>
      <Routes>
        <Route index element={<ChatHall />} />
        <Route path="/detail/*" element={<Detail />} />
      </Routes>
    </>
  );
};

export default Index;
