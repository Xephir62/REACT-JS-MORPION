import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import "@fortawesome/fontawesome-free/css/all.css";
function App() {
return (
<>
<div>
<input type="checkbox" checked />
<p>Nom de tâche 1</p>
<i class="fa-solid fa-pen"></i>
        <i class="fa-solid fa-trash"></i>
<button className="btn btn-primary">X</button>
</div>
</>
)
}
export default App;