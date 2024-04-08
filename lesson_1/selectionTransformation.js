function selectFruit(produceObject) {
  const entries = Object.entries(produceObject);
  const output = {};
  for (let i = 0; i < entries.length; i++) {
    const [item, category] = entries[i];
    if (category === 'Fruit') {
      output[item] = category;
    }
  }
  return output;
}

let produce = {
  apple: 'Fruit',
  carrot: 'Vegetable',
  pear: 'Fruit',
  broccoli: 'Vegetable'
};

console.log(selectFruit(produce)); // => { apple: 'Fruit', pear: 'Fruit' }