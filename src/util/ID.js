export function getID() {
  return `random ${Date.now()}-${Math.trunc(Math.random() * 5000)}`;
}

export default getID;
