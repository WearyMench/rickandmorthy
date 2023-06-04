export const cargarDatos = async (e) => {
  const response = await fetch(`https://rickandmortyapi.com/api/${e}`);
  const data = await response.json();
  return data;
};
