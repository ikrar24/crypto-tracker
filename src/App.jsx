import React, { useState } from "react";
import Crypto from "./Componets/Crypto/Crypto"
import Navbar from "./Componets/Navbar/Navbar"

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <>
<div className="desktopSize">
  <div className="mobileSize">
  <Navbar onSearch={(val) => setSearchTerm(val)} />
      <Crypto searchTerm={searchTerm} />
  </div>
</div>
    </>
  )
}

export default App