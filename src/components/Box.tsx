import { useState } from "react";
import Button from "./Button";

const Box = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div className="box">
      <Button isOpen={isOpen} getIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
};

export default Box;
