import { createRoot } from "react-dom/client";
import FrameworkList from "./FrameworkList";
import './tailwind.css';
import FrameworkListSearchFilter from "./FrameworkListSearchFilter";

createRoot(document.getElementById("root"))
    .render(
        <div>
     <FrameworkListSearchFilter/>
        </div>
    )