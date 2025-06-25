# 🐝 Beedom

> A lightweight, beginner-friendly DOM utility library to simplify element creation, manipulation, styling, and event handling in pure HTML/CSS/JS — **no dependencies**, **no build step**.

---

## 📦 Installation

### Use directly in HTML:

```html
<script type="module" src="./beedom.js"></script>
```

### Or import as an ES module:

```js
import DOM from "./beedom.js";
```

---

## 🚀 Quick Start

### 1. **Create element** and **append to container:**

```js
DOM.create("div")
  .text("Hello from Beedom!")
  .styles({
    padding: "16px",
    backgroundColor: "#f0f0f0",
    borderRadius: "4px",
  })
  .on("click", () => alert("Clicked!"))
  .appendTo(DOM.byId("app").el);
```

### 2. **Query existing elements:**

```js
const items = DOM.queryAll(".item");
items.forEach((item) => item.addClass("highlight"));
```

### 3. **Work with attributes, data, and classes:**

```js
const button = DOM.byId("submit-btn");
button.attr("disabled", false).data("action", "save").addClass("active");
```

---

## 📚 API Reference

### Document-Level Methods

| Method                   | Description                          | Returns        |
| ------------------------ | ------------------------------------ | -------------- |
| `DOM.byId(id)`           | Get element by `id`                  | `BeeElement`   |
| `DOM.query(selector)`    | First match via selector             | `BeeElement`   |
| `DOM.queryAll(selector)` | All matching elements                | `BeeElement[]` |
| `DOM.create(tag)`        | Create new HTML element              | `BeeElement`   |
| `DOM.textNode(text)`     | Create new text node                 | `TextNode`     |
| `DOM.clear(selector)`    | Clear innerHTML of matching selector | `BeeElement`   |

### Element-Level Methods (`BeeElement`)

#### Content

| Method       | Description              |
| ------------ | ------------------------ |
| `.text(str)` | Set or get `textContent` |
| `.html(str)` | Set inner HTML content   |

#### Styling & Attributes

| Method                       | Description                                    |
| ---------------------------- | ---------------------------------------------- |
| `.styles(obj)` / `.css(obj)` | Apply inline styles (with drag/resize support) |
| `.attr(name, value?)`        | Get or set HTML attribute                      |
| `.data(key, value?)`         | Get or set `data-*` attribute                  |

#### Class Manipulation

| Method               | Description             |
| -------------------- | ----------------------- |
| `.addClass(name)`    | Add one or more classes |
| `.removeClass(name)` | Remove class(es)        |
| `.toggleClass(name)` | Toggle class            |

#### Insertion & Removal

| Method               | Description                             |
| -------------------- | --------------------------------------- |
| `.append(child)`     | Append a child element                  |
| `.appendTo(target)`  | Append self to another element/selector |
| `.prependTo(target)` | Prepend self to target                  |
| `.remove()`          | Remove element from DOM                 |
| `.clone(deep)`       | Clone the element                       |
| `.clear()`           | Clear element’s innerHTML               |

#### Events

| Method            | Description           |
| ----------------- | --------------------- |
| `.on(event, fn)`  | Attach event listener |
| `.off(event, fn)` | Remove event listener |

#### Traversal & Relations

| Method                  | Description                             |
| ----------------------- | --------------------------------------- |
| `.find(selector)`       | Find first descendant matching selector |
| `.findAll(selector)`    | Find all matching descendants           |
| `.parent()`             | Get parent element                      |
| `.children()`           | Get child elements                      |
| `.next()`               | Get next sibling                        |
| `.prev()`               | Get previous sibling                    |
| `.insertBefore(target)` | Insert before target element            |
| `.after(target)`        | Insert after target element             |
| `.before(target)`       | Insert before target                    |

---

## 🧪 Examples

### Dynamic List Creation

```js
const list = DOM.byId("list");
["One", "Two", "Three"].forEach((text) => {
  DOM.create("li").text(text).addClass("list-item").appendTo(list.el);
});
```

### Toggle Visibility

```js
const panel = DOM.byId("panel");
DOM.byId("toggle").on("click", () => {
  panel.toggleClass("hidden");
});
```

---

## 🔁 Native DOM vs Beedom

| Native DOM                               | Beedom Equivalent           |
| ---------------------------------------- | --------------------------- |
| `document.getElementById('id')`          | `DOM.byId('id')`            |
| `document.querySelector(sel)`            | `DOM.query(sel)`            |
| `document.querySelectorAll(sel)`         | `DOM.queryAll(sel)`         |
| `document.createElement('div')`          | `DOM.create('div')`         |
| `element.textContent = 'Hi'`             | `.text('Hi')`               |
| `element.innerHTML = '<b>Hello</b>'`     | `.html('<b>Hello</b>')`     |
| `element.style.color = 'red'`            | `.styles({ color: 'red' })` |
| `element.classList.add('active')`        | `.addClass('active')`       |
| `element.setAttribute('disabled', true)` | `.attr('disabled', true)`   |
| `element.dataset.key = 'value'`          | `.data('key', 'value')`     |
| `element.appendChild(child)`             | `.append(child)`            |
| `element.remove()`                       | `.remove()`                 |
| `element.addEventListener('click', cb)`  | `.on('click', cb)`          |
| `element.querySelectorAll('li')`         | `.findAll('li')`            |

---

## 🌈 Unique Advantages of Beedom

- ✅ Beginner-friendly fluent API
- ✅ Built-in drag & resize support (via `.styles()`)
- ✅ Chainable methods throughout
- ✅ Works directly in HTML/CSS without tools
- ✅ Optional `.css()` alias for styling
- ✅ Great for prototyping, demos, learning

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes
4. Push and open a PR

---

## 📄 License

MIT © BigMouse

---

### ✅ Ready to use — just drop `beedom.js` into your project and simplify your DOM workflow!
