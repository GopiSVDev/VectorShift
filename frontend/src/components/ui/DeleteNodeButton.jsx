import { useState, useEffect } from "react";
import { RxCrossCircled } from "react-icons/rx";

function DeleteNodeButton({ id, deleteNode }) {
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    let timeout;
    if (armed) {
      timeout = setTimeout(() => setArmed(false), 3000);
    }
    return () => clearTimeout(timeout);
  }, [armed]);

  const handleClick = () => {
    if (armed) {
      deleteNode(id);
    } else {
      setArmed(true);
    }
  };

  return (
    <RxCrossCircled
      size={28}
      onClick={handleClick}
      className={`cursor-pointer transition-colors ${
        armed ? "text-red-500" : "text-gray-400 hover:text-red-400"
      }`}
      title={armed ? "Click again to delete" : "Delete"}
    />
  );
}

export default DeleteNodeButton;
