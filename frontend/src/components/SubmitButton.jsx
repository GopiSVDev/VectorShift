import { FaPlay } from "react-icons/fa";
import { useStore } from "../store/store";

const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/pipelines/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      const data = await res.json();

      alert(
        `Pipeline Info:\nNodes: ${data.num_nodes}\nEdges: ${data.num_edges}\nIs DAG: ${data.is_dag}`
      );
    } catch (err) {
      console.error("Error submitting pipeline:", err);
    }
  };

  return (
    <button
      onClick={handleSubmit}
      type="button"
      className="flex items-center justify-center rounded-md py-2 border text-xs hover:cursor-pointer pl-3 pr-4 bg-green-100 hover:bg-green-200 active:bg-green-300 border-green-500 text-green-800"
    >
      <div className="flex flex-row items-center gap-2">
        <FaPlay />
        <div>Run</div>
      </div>
    </button>
  );
};

export default SubmitButton;
