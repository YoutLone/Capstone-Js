const itemCounter = async (id) => {
  const count = id;
  let result;
  let total;
  const counterItem = document.getElementById('counter-item');

  for (let i = 1; i <= count; i = +1) {
    /* eslint-disable no-await-in-loop */
    total = await fetch(`https://api.tvmaze.com/people/${i}`);
    result = await total.json();
    counterItem.textContent = `(${result.id})`;
  }
};
export default itemCounter;
