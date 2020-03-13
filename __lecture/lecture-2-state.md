# 4.3.2 React State

---

## Application state

State is _dynamic data_. Things that change.

---

## Example

```jsx live=true
const Counter = () => {
  const [count, setCount] = React.useState(0);// the 0 is the initial value
// array 1st what we are naming the variable and second is the function
  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  )
}

render(<Counter />)
```

---

# Deconstruction

These snippets are identical:

```jsx
// Using deconstruction:
const [value, setValue] = React.useState(null);
```

```jsx
// Without deconstruction:
const valueState = React.useState(null);
const value = valueState[0];
const setValue = valueState[1];
```

---

# `useState`

** the function will change the state we shouldnt re-declare the variable value.

When theres a change in state it will re-render the whole componant


"useState" is a **React hook**.

Hooks are way of "hooking into" React's abilities, like managing state.

---


# 🙅‍♀️ Mutating state

This snippet won't throw an error, but it also won't work:

```jsx
let [value, setValue] = React.useState(null);

value = 10;
```

---

# Re-rendering

When you call the state setter, it _triggers a re-render_.

This is why the values on the screen change.

---

# Forms in React

import React { useState } from Reack
---

`value` and `onChange`

```jsx live=true
const Name = () => {
  const [name, setName] = React.useState('');
//setName the set parrt is good practice
  return (
    <div style={{ fontSize: 32 }}>
      <input
        type="text"
        value={name}
        onChange={ev => { //ev or e or event 
          setName(ev.target.value);
        }}
        style={{ fontSize: 32 }}
      />
      <p>Your name is {name}</p>
    </div>
  )
}

render(<Name />)
```

<!--
// Extra Information...

- `onChange` takes a function that receives the "event". This is an object that holds data about what just happened.
- One of those pieces of data is the "target", the DOM node that the event was triggered on.
- Input DOM nodes have a `value` property, which holds the newly-set value

By calling `setName` with `ev.target.value`, we ensure that React is kept in sync with the value being put in this text input.
-->

---

# Exercises

What is logged in the following scenarios?

---

The button is clicked **3 times**:

```jsx live=true inline=true
function SomeComponent() {
  const [count, setCount] = React.useState(10);

  console.log(count);

  return (
    <button onClick={() => setCount(count + 1)}>
      One, Two, Three!
    </button>
  )
}
```

---

The user types "!" in the input

```jsx live=true inline=true
function SomeComponent() {
  const [thing, setThing] = React.useState("Hi");

  console.log(thing);

  return (
    <input
      value={thing}
      onChange={(ev) =>
        setThing(ev.target.value)
      }
    />
  )
}
```

---

The user types "123" in the input

```jsx live=true inline=true
function SomeComponent() {
  const [thing, setThing] = React.useState(0);

  console.log(thing);

  return (
    <input
    //placeholder={thing}
      value={thing}
      onChange={(ev) =>
        setThing(
          thing +
          Number(ev.target.value)
        )
      }
    />
  )
}
```

---

The user clicks the checkbox

```jsx live=true inline=true
function SomeComponent() {
  const [agreed, setAgreed] = React.useState(false);

  console.log(agreed);

  return (
    <label>
      <input
        type="checkbox"
        checked={agreed} // false on first loand
        onChange={(ev) =>
          setAgreed(!agreed)
        }
      />
      Yes I want to receive spam
    </label>
  )
}
```
---

# State and Props

---

What happens when you want to share state between components?

---
//we want both to share date

```jsx
const App = () => {
  return (
    <>
      <SearchInput />
      <SearchResults /> //doenst have acces to input at the moment
    </>
  )
}

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = React.useState(''); 

  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(ev) => {
        setSearchTerm(ev.target.value);
      }}
    />
  );
}

const SearchResults = () => {
  // ??
}
```
_______SHOULD BE LIKE FOLLOWS INSTEAD_________

```jsx
const App = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
  return (
    <>
      <SearchInput
      searchTerm={searchTerms}
      setSearchTerm={setSearchTerm}
       />
      <SearchResults />
    </>
  )
}
//can only pass from parent to child and not from siblings
//accepting them here
const SearchInput = ({searchTerm, setSearchTerm}) => {
  // const [searchTerm, setSearchTerm] = React.useState('');
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(ev) => {
        setSearchTerm(ev.target.value);
      }}
    />
  );
}
const SearchResults = () => {
  **?? Doesnt have access to searchTerms. 
}
```








\




---

This is called "lifting state up".

---

# Exercises

Lift state up in the following examples

---

```jsx live=true
const Counter = () => {
  //const [count, setCount] = React.useState(0); //removed

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  )
};

const App = () => { 
  const [count, setCount] = React.useState(0);

  return (
    <>
      The current count is: ???

      <Counter
       count={count}
       setCount={setCount} />
    </>
  )
}

render(<App />)
```

---

```jsx live=true
const FavouriteFood = () => {
 // const [food, setFood] = React.useState(''); // removed and passed to the parent 

  return (
    <>
      <label>
        <input
          type="radio"
          name="food"
          value="pizza"
          //checked={food === 'pizza'} we chouldnt set it outselves
          onChange={() => setFood('pizza')}
        />
        Pizza
      </label>
      <label>
        <input
          type="radio"
          name="food"
          value="broccoli"
          //checked={food === 'broccoli'}
          onChange={() => setFood('broccoli')}
        />
        Broccoli
      </label>
    </>
  )
};

const App = () => {
  const [food, setFood] = React.useState('');
  return (
    <>
      My favourite food is: 
      <FavouriteFood food={food} setFood={setFood}>
      <br /><br />
      <FavouriteFood />
    </>
  )
}

render(<App />)
```

---

### Conditional rendering

---

```jsx live=true inline=true
() => {
  const [showAnswer, setShowAnswer] = React.useState(false);

  return (
    <>
      <h3>What do you call someone with no body and no nose?</h3>

      {showAnswer && (
        <p>Nobody knows!</p>
      )} 
      
      <button onClick={() => setShowAnswer(true)}>
        Show punchline
      </button>
    </>
  )
}

```

---
