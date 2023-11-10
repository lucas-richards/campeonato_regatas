import React from "react";

export default function Balance({ params }:{ params: {dni : string}}) {
    console.log(params.dni);
  return (
    <div className="container">
      <h1>Deuda</h1>
      <p>La deuda del DNI es: {params.dni} </p>
    </div>
  )
}