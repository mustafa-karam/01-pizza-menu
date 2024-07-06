import { render } from "@testing-library/react";
import React from "react";
import ReactDom from "react-dom/client";
import "./index.css";
import "./firstChallenge.css";
const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
    // <Profile />
  );
}

function Header() {
  return (
    <header className="header">
      <h1 style={{ color: "red" }}>Fatayer Kemo el deeeeeeep</h1>
    </header>
  );
}
function Menu() {
  // we want to do some conditional rendering based on the pizza list of data
  const myPizza = pizzaData;
  //   const myPizza = []; // this will render the components even if the array is empty ,because an empty array is not a falsy value
  // so instead of checking if the list is empty or not we check the length of it
  const pizzaCount = myPizza.length; // but we will then have another problem, react renders the zero in short circuiting but does not render boolean values
  return (
    <main className="menu">
      <h2>Garab Mat2olish</h2>
      {/* the concept in the next line is conditional rendering using short circuiting by the "&" operator*/}
      {pizzaCount > 0 ? ( //  here we have to make our condition based on boolean values instead of falsy values like "zero"
        <>
          {/*here we wrapped the paragraph and the ul in this fragment because JSX will not allow both of them to be
         trendered as parent element so we put them in this fragment in oreder to be treated as parents without having to put them inside a div 
        because in this case the div will be rendered in th html tree but the fragment won't */}
          <p>
            Authentic Italian cuisine. 6 creative dishes to choose from. All
            from our stone oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {pizzaData.map((pizza) => (
              <Pizza pizzaObject={pizza} key={pizza.name} />
            ))}
          </ul>
        </>
      ) : (
        <p>we are still working on the menu , come back later :)</p>
      )}

      {/* <Pizza
        name="spinaci pizza"
        ingredients="Tomato, mozarella, spinach, and ricotta cheese"
        photoName="pizzas/spinaci.jpg"
        price={10} // we write it in js mode to be treated as an int
      />
      <Pizza
        name="Focaccia"
        ingredients="Bread with italian olive oil and rosemary"
        photoName="pizzas/funghi.jpg"
        price={15} // we write it in js mode to be treated as an int
      /> */}
    </main>
  );
}
function Pizza({ pizzaObject }) {
  // if (pizzaObject.soldOut) return null; // instead of not rendering the component at all we will render it with different style (see line 115)
  //   if (props.pizzaObject.soldOut) return <Header />; // this just for example and clarifying that we use this approach when we want to make an early return with a component;
  return (
    <li className={`pizza ${pizzaObject.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObject.photoName} alt={pizzaObject.name} />
      <div>
        <h3>{pizzaObject.name}</h3>
        <p>{pizzaObject.ingredients}</p>

        {/* <span>SOLD OUT</span>:
    {pizzaObject.soldOut?
    <span>{pizzaObject.price}</span>} */}
        {/*instead of doing conditional rendering on the span element (in the previous three lines)
    we can simply do condition of what text to display inside the span(in the next lines) as we are already using the span 
    element */}

        <span>
          {pizzaObject.soldOut ? "KHLSANA YA AKHOUA" : pizzaObject.price}
        </span>
      </div>
    </li>
  );
}

function Footer() {
  const currentTime = new Date().getHours();
  //   console.log(currentTime);
  const openHour = 9;
  const closeHour = 21;
  const isOpen = currentTime >= openHour && currentTime <= closeHour;
  //   console.log(isOpen);
  //   if (!isOpen) {
  //     return <p>WE ARE CLOSED MY FRND</p>;
  //   }
  return (
    <footer className="footer">
      {/* {new Date().toLocaleTimeString()}. "We are currently open!" */}
      {isOpen ? (
        <Order closing={closeHour} /> // in order to use the var closeHour here in the footer component in another component we have to pass it as props
      ) : (
        <div>
          <p>
            {new Date().toLocaleTimeString()}. "We are currently closed! <br />
            You can come back in {Math.abs(openHour - currentTime)} hours
          </p>
        </div>
      )}
    </footer>
  );
}

function Order({ closing }) {
  // here we use props to recieve the data "closeHour from the parent component (footer)"
  // we are no longer using props after we learned about props destructuring
  return (
    <div className="order">
      <p>
        {new Date().toLocaleTimeString()}. "We are currently open! <br />
        we close at {closing}
      </p>
      <button className="btn">Order Now</button>
    </div>
  );
}

const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>// the strictMode renders the app twice for some bug discovery and whatever so i am gonna disable it for now
);

// concepts   video 18
// we have three ways for conditional rendering
// 1-short cicuiting by the AND operator
// 2-Using ternaries " ?  : "
// 3-using multiple returns : we can use if else statements outside the JSX just after declaring our
//function while we still in js mode and if the condition is true we return our jsx code
// but in this case we will copy the same code with slight differences

// ******************** CHANLLENGE #1 *************************

function Profile() {
  return (
    <div className="profile">
      <Avatar />
      <Intro />
      <Skills />
    </div>
  );
}
function Avatar() {
  return (
    <div className="avatar">
      <img src="pizzas/profile2.jpeg" alt="sorty" />
    </div>
  );
}
function Intro() {
  return (
    <div className="intro">
      <h1>MOSTAFA KARAM</h1>
      <p>
        Full-stack web developer and teacher at Udemy. When not coding or
        preparing a course, I like to play board games, to cook (and eat), or to
        just enjoy the Portuguese sun at the beach.
      </p>
    </div>
  );
}

const mySkills = [
  { skillName: "HTML", level: "Advanced", color: "crimson" },
  { skillName: "CSS", level: "Advanced", color: "silver" },
  { skillName: "React", level: "Beginner", color: "darkkhaki" },
  { skillName: "BootStrap", level: "Intermediate", color: "dodgerblue" },
];
function Skills() {
  const skills = mySkills;
  const skillsNum = skills.length;
  console.log(skills);

  return (
    <div className="skill">
      {skillsNum > 0 ? (
        skills.map((skill) => (
          <Skill skillObject={skill} key={skill.skillName} />
        ))
      ) : (
        <h2>7drtk ana Fresh</h2>
      )}
    </div>
  );
}

const myLevel = [
  {
    Beginner: "😜",
    Intermediate: "👍",
    Advanced: "👽",
  },
];

function Skill({ skillObject }) {
  // const skillStyle = {}
  // console.log();
  const leo = myLevel[0][skillObject.level]; // a3dt sa3a fl 7ta el 3bita di 3shan kont katb kda(const leo = myLevel.skillObject.level)
  // w kan mmkn a3ml 7aga abst w a3ml destructuring ll object w khlas bs da hikhliny atl3 fo2 ab3t el props one by one msh object mra wa7da
  // console.log(leo);
  return (
    <span style={{ backgroundColor: skillObject.color }}>
      {skillObject.skillName}
      {leo}
    </span>
  );
}

//*********************************************** */
//   return (
//     // da bs tdrib 3la el conditional rendering using the short circuiting bs el tri2a bta3ty el fol agmd w more organized
//     <>
//       <span style={{ backgroundColor: skillObject.color }}>
//         {skillObject.skillName}
//         {skillObject.level === "Beginner" && "😜"}
//         {skillObject.level === "Intermediate" && "👍"}
//         {skillObject.level === "Advanced" && "👽"}
//       </span>

//     </>
//   );
