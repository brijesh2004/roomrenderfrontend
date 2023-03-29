import ReactDOM from "react-dom/client";
import Layout from "./pagess/Layout";
import './index.css';

export default function App() {
  return (
  <>
  <div>
   <Layout/>
   </div>
  </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
