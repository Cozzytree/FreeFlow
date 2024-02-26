import { useContext, createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalContextProvider = ({ children }) => {
   const [video, setVideo] = useState("");
   const [isNav, setIsNav] = useState(false);

   function handleNav() {
      setIsNav((op) => !op);
   }
   function handleCloseNav() {
      setIsNav(false);
   }

   function setVideoUrl(video) {
      setVideo(video);
   }

   function removeVideo() {
      setVideo("");
   }
   return (
      <GlobalContext.Provider
         value={{
            setVideoUrl,
            video,
            removeVideo,
            isNav,
            handleCloseNav,
            handleNav,
         }}
      >
         {children}
      </GlobalContext.Provider>
   );
};

const useGlobalContext = () => {
   const context = useContext(GlobalContext);
   return context;
};

export { GlobalContextProvider, useGlobalContext };
