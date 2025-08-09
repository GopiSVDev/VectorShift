import { useState } from "react";
import BaseNode from "./BaseNode";
import { Position } from "@xyflow/react";

const TranslateNode = ({ id, data }) => {
  const [inputText, setInputText] = useState(data?.text || "");
  const [language, setLanguage] = useState(data?.language || "en");

  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setLanguage(lang);
  };

  const handleTextChange = (e) => {
    const text = e.target.value;
    setInputText(text);
  };

  return (
    <BaseNode
      id={id}
      title="Translate"
      inputs={[{ id: `${id}-value`, position: Position.Left }]}
      outputs={[{ id: `${id}-value`, position: Position.Right }]}
      desc={"Translate text from one language to another."}
      data={data}
    >
      <div>
        <label>
          Text:
          <input
            type="text"
            value={inputText}
            onChange={handleTextChange}
            placeholder="Enter text"
          />
        </label>
      </div>

      <div>
        <label>
          Language:
          <select value={language} onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="jp">Japanese</option>
          </select>
        </label>
      </div>
    </BaseNode>
  );
};

export default TranslateNode;
