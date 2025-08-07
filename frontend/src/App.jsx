import { ReactFlowProvider } from "@xyflow/react";
import PipelineToolbar from "./components/PipelineToolbar";
import { PipelineUI } from "./components/PipelineUI";
import SubmitButton from "./components/SubmitButton";

import "@xyflow/react/dist/style.css";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <PipelineToolbar />

      <ReactFlowProvider>
        <PipelineUI />
      </ReactFlowProvider>
    </>
  );
}

export default App;
