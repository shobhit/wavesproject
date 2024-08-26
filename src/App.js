import * as Plot from "@observablehq/plot";
import PlotFigure from "./PlotFigure.js";
import "./index.css";
// import penguins from "./penguins.json";
import timeseries from "./timeseries.json";
import { faker } from '@faker-js/faker';
import chroma from "chroma-js";
const USERS = [];
const output_points = [];

function make_circle_coordinates(top = 300, left = 300, bottom = 300, right = 300, points = 100, visual = true) {
  // e.g. top: 20, left: 20, right: 1900, bottom: 800
  let center = {
      x: (left + right) / 2,
      y: (top + bottom) / 2
  },
  radius = {
      x: right - center.x,
      y: bottom - center.y
  },
  // output_points = [],
  // angles in radians
  angle_step = 2 * Math.PI / points;
  console.log(`Create circle with radius (${radius.x}, ${radius.y}) about point (${center.x}, ${center.y}).`);
  // to do: this lol
  const randColor = get_random(chroma.scale(['red','blue'])
  .mode('lch').colors(10));
  for (let i = 0, angle = 0; i < points; i++, angle += angle_step) {
      let point = {
          x: center.x + Math.sin(angle) * radius.x,
          y: center.y + Math.cos(angle) * radius.y,
          stroke: randColor,
          Symbol: get_random(["AAPL","BAPL"])
      }
      output_points.push(point);
  }
  // if (visual) {
  //     let p = document.createElement("p");
  //     p.classList.add("node");
  //     p.style.backgroundColor = "red";
  //     container.appendChild(p);
  //     p.style.top = center.y + "px";
  //     p.style.left = center.x + "px";
  // }
  console.log(output_points);

  
  return output_points;
}

// function generateCirclePoints(numPoints) {
//   const points = [];

//   for (let i = 0; i < numPoints; i++) {
//     const angle = (i / numPoints) * 2 * Math.PI;
//     const x = Math.cos(angle);
//     const y = Math.sin(angle);
//     points.push({ x, y });
//   }
//   console.log("CIRCLE POINTS",points);
//   return points;
// }

function generateCirclePoints(numPoints, numInnerCircles) {
  const points = [];

  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * 2 * Math.PI;
    const xOuter = Math.cos(angle);
    const yOuter = Math.sin(angle);
    points.push({ x: xOuter, y: yOuter });
    const randColor = get_random(chroma.scale(['red','blue'])
    .mode('lch').colors(10));
    for (let j = 1; j <= numInnerCircles; j++) {
      const radiusRatio = j / (numInnerCircles + 1);
      const xInner = xOuter * radiusRatio;
      const yInner = yOuter * radiusRatio;
      points.push({ x: xInner, y: yInner,stroke: randColor });
    }
  }

  return points;
}


console.log(generateCirclePoints(100));

for (let index = 0; index <1; index++) {
  make_circle_coordinates(0+(index*10),0+(index*10), 300-(index*10), 300-(index*10),  100-(index*6), true);
}
function get_random (list) {
  return list[Math.floor((Math.random()*list.length))];
}

export function createRandomUser() {
  return {
    species: faker.internet.userName(),
    island: faker.name.jobTitle(),
    culmen_length_mm: faker.datatype.number({ min: 10, max: 100, precision: 0.01 }),
    culmen_depth_mm: faker.datatype.number({ min: 10, max: 100, precision: 0.01 }),
    flipper_length_mm: faker.datatype.number({ min: 100, max: 500, precision: 0.01 }),
    body_mass_g: faker.datatype.number({ min: 1000, max: 2000, precision: 0.01 }),
    sex: faker.name.sex(),
  };
}

// const ACC = [{"x":150,"y":300},{"x":196.3525491562421,"y":292.658477444273},{"x":238.16778784387097,"y":271.3525491562421},{"x":271.3525491562421,"y":238.16778784387097},{"x":292.658477444273,"y":196.3525491562421},{"x":300,"y":150},{"x":292.65847744427305,"y":103.6474508437579},{"x":271.3525491562421,"y":61.832212156129046},{"x":238.167787843871,"y":28.647450843757895},{"x":196.35254915624213,"y":7.341522555726982},{"x":150.00000000000003,"y":0},{"x":103.64745084375791,"y":7.341522555726954},{"x":61.832212156129046,"y":28.647450843757866},{"x":28.647450843757895,"y":61.83221215612902},{"x":7.341522555726982,"y":103.64745084375787},{"x":0,"y":149.99999999999997},{"x":7.341522555726954,"y":196.35254915624208},{"x":28.647450843757866,"y":238.16778784387094},{"x":61.832212156129,"y":271.3525491562421},{"x":103.64745084375785,"y":292.658477444273}]

Array.from({ length: 1000 }).forEach(() => {
  USERS.push(createRandomUser());
});

export default function App() {
  
  // var svgData = document.getElementsByClassName("plot-d6a7b5")[0].outerHTML;
  // var svgBlob = new Blob([svgData], {type:"image/svg+xml;charset=utf-8"});
  // var svgUrl = URL.createObjectURL(svgBlob);
  // var downloadLink = document.createElement("a");
  // downloadLink.href = svgUrl;
  // downloadLink.download = "newesttree.svg";
  // document.body.appendChild(downloadLink);
  // downloadLink.click();
  // document.body.removeChild(downloadLink);  

  return (
    <div className="App">
      <h1>Plot + React</h1>
      <h2>Penguins scatterplot</h2>

      <PlotFigure
      
        options={{
          height: 440,
          // marginLeft: 0,
          x: {range: [50, 400]},
          y: {range: [50, 400]},
          marks: [
            Plot.frame(),
            Plot.dot(make_circle_coordinates(), { x: "x", y: "y",stroke: "stroke",r:2,symbol: 'plus',anchor: "top"}),
            // Plot.dotX(make_circle_coordinates().map((d) => d["x"])),
            // Plot.dotY(make_circle_coordinates().map((d) => d["y"]))
          ]
        }}
      />


      <PlotFigure
          options={{

            color: {legend: true},
            // marginLeft: 0,
            x: {range: [50, 400]},
            y: {range: [50, 400]},
            marks: [
              // Plot.frame(),
              // Plot.ruleY([0]),
              // Plot.dot(make_circle_coordinates(), { x: "x", y: "y",stroke: "stroke",r:2,symbol: 'plus',anchor: "top"}),
              Plot.dot(generateCirclePoints(50,7), {x: "x", y: "y",stroke: "stroke"}),
              // Plot.lineX(make_circle_coordinates(0,0, 300, 300,  10, true), {x: "y", y: "x", stroke: "Symbol",dx: -2, dy: -2}),
              // Plot.lineX(make_circle_coordinates(0,0, 300, 300,  20, true), {x: "x", y: "y", stroke: "Symbol"}),
              // Plot.lineY(make_circle_coordinates(0,0, 300, 300,  10, true).map((d) => d["y"])),
            ]
          }}      
      />


      <h2>Time-series bar chart</h2>
      <PlotFigure
        options={{
          x: { tickFormat: "d", interval: 1 },
          marks: [Plot.barY(timeseries, { x: "year", y: "population" })]
        }}
      />
    </div>
  );
}
