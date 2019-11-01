const randomNum = () => [1, 2, 3][Math.round(Math.random() * 2)];
const randomDeg = () =>
  ["45deg", "135deg", "225deg", "315deg"][Math.round(Math.random() * 3)];

const createMaze = (selector, gridSize = 20) => {
  // select element
  let grid = document.querySelector(`#${selector}`);
  let fragment = document.createDocumentFragment();
  // get width && height
  const gridWidth = grid.clientWidth;
  const gridHeight = grid.clientHeight;

  // setStyle
  grid.style.setProperty("--x-portion", Math.floor(gridWidth / gridSize));
  grid.style.setProperty("--y-portion", Math.floor(gridHeight / gridSize));
  grid.style["display"] = "grid";
  grid.style["gridTemplateColumns"] = "repeat(var(--x-portion), 1fr)";
  grid.style["gridTemplateRows"] = "repeat(var(--y-portion), 1fr)";
  grid.style["overflow"] = "hidden";
  grid.style["gridAutoFlow"] = "row dense";
  let size = ((gridWidth / gridSize) * (gridHeight / gridSize)) / 9;
  let cells = [];
  while (size > 0) {
    let cell = document.createElement("div");
    cell.className = "maze-generator-cell";
    cell.style.position = "relative";
    cell.style.setProperty("--deg", randomDeg());
    cell.style.setProperty("--second", `${Math.random() * 0.5}s`);
    cells.push(cell);

    fragment.appendChild(cell);
    size--;
  }
  grid.appendChild(fragment);
  let style = document.createElement("style");
  style.innerText = `.maze-generator-cell{grid-column-start:span 3;grid-row-start:span 3}.maze-generator-cell::before {transform:scale(1.41) rotate(var(--deg)); content: "";display:block;width: 1px;background-color: black;margin: 0 auto;height: 100%;transition: all var(--second); will-change: transform;cursor: pointer;}`;
  document.body.appendChild(style);
  grid.onclick = () => {
    cells.forEach(el => {
      el.style.setProperty("--deg", randomDeg());
    });
  };
};

export { createMaze };
