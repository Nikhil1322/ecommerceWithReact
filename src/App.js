import PublicApp from "./publicapp";
import AdminApp from "./adminapp";

function App() {
  
  if (localStorage.getItem("adminid") !=null ) 
  {
    return (
      <AdminApp />
    )
  } else {
    return (
      <PublicApp />
    )
  }
}

export default App;
