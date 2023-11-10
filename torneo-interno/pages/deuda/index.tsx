import { useState } from "react";
import Balance from "./[dni]";
import { redirect } from "next/dist/server/api-utils";


export default function Page() {

  const [dni, setDni] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault(); // Prevent default submission
    console.log("DNI submitted:", dni);
    try {
      // hit the route api/deuda and pass the dni
      const res = await fetch(`http://localhost:3000/api/deuda/?dni=${dni}`);
      
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = res.json();
      console.log('this is data',data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleChange = (event:any) => {
    setDni(event.target.value);
  }

    return (
      
      <div className="container">
        <h1>Entrar DNI</h1>
        <p>Ingrese su DNI para ver su deuda</p>
        <form
         onSubmit={handleSubmit}>
          <input 
            name="dni"
            type="text" 
            placeholder="DNI"
            onChange={handleChange} />
          <button  >Entrar</button>
        </form>
       
        
        
      </div>
    )
      
  }