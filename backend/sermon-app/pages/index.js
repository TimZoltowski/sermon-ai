import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [scripture, setScripture] = useState("");
  const [tone, setTone] = useState("expository");
  const [sermon, setSermon] = useState("");

  const generateSermon = async () => {
    const response = await axios.post("http://localhost:5000/generate-sermon", {
      topic,
      scripture,
      tone
    });
    setSermon(response.data.sermon);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">AI Sermon Generator</h1>
      <input className="border p-2 mb-2" placeholder="Sermon Topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
      <input className="border p-2 mb-2" placeholder="Scripture Reference" value={scripture} onChange={(e) => setScripture(e.target.value)} />
      <select className="border p-2 mb-2" value={tone} onChange={(e) => setTone(e.target.value)}>
        <option value="expository">Expository</option>
        <option value="storytelling">Storytelling</option>
        <option value="encouraging">Encouraging</option>
      </select>
      <button className="bg-blue-500 text-white p-2 rounded" onClick={generateSermon}>Generate Sermon</button>
      {sermon && <div className="mt-4 p-4 bg-white shadow rounded w-2/3"><h2 className="text-xl font-bold">Generated Sermon</h2><p>{sermon}</p></div>}
    </div>
  );
}