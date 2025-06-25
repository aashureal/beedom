// beedom.js
// A super-easy DOM utility library for plain HTML/CSS/JS

class Beedom {
  constructor(root = document) {
    this.document = root;
    this.body = root.body;
    this.initStyler();
  }

  initStyler() {
    HTMLElement.prototype.styler = function (styles) {
      for (let key in styles) {
        if (key === "drag") {
          const dragArg = styles[key];
          if (dragArg === true) {
            this.enableDrag();
          } else if (typeof dragArg === "string") {
            this.enableDrag(dragArg);
          }
        } else if (key === "resize" && styles[key] === true) {
          this.enableResize();
        } else {
          this.style[key] = styles[key];
        }
      }
      this.enableBringToFront();
    };

    HTMLElement.prototype.enableBringToFront = function () {
      this.addEventListener("mousedown", () => {
        this.style.zIndex = ++Beedom.globalZIndex;
      });
    };

    HTMLElement.prototype.enableDrag = function (selector = null) {
      const el = this;
      el.style.position = "absolute";
      el.style.userSelect = "none";
      el.style.transition = "box-shadow 0.2s ease";

      let offsetX = 0,
        offsetY = 0;
      let dragTarget = selector ? el.querySelector(selector) : el;

      if (!dragTarget)
        return console.warn(
          `Selector ${selector} not found inside element`,
          el
        );

      const onMouseDown = (e) => {
        if (e.target.classList.contains("styler-resize-handle")) return;

        e.preventDefault();
        offsetX = e.clientX - el.getBoundingClientRect().left;
        offsetY = e.clientY - el.getBoundingClientRect().top;

        el.style.zIndex = ++Beedom.globalZIndex;
        el.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.2)";

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      };

      const onMouseMove = (e) => {
        el.style.left = e.clientX - offsetX + "px";
        el.style.top = e.clientY - offsetY + "px";
      };

      const onMouseUp = () => {
        el.style.boxShadow = "none";
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };

      dragTarget.addEventListener("mousedown", onMouseDown);
    };

    HTMLElement.prototype.enableResize = function () {
      const el = this;
      el.style.position = "absolute";

      const handle = document.createElement("div");
      handle.classList.add("styler-resize-handle");
      handle.style.position = "absolute";
      handle.style.width = "10px";
      handle.style.height = "10px";
      handle.style.right = "0";
      handle.style.bottom = "0";
      handle.style.cursor = "nwse-resize";
      handle.style.background = "transparent";
      handle.style.zIndex = "10";

      el.appendChild(handle);

      let startX, startY, startWidth, startHeight;

      handle.addEventListener("mousedown", (e) => {
        e.preventDefault();
        e.stopPropagation();
        startX = e.clientX;
        startY = e.clientY;
        startWidth = parseInt(
          document.defaultView.getComputedStyle(el).width,
          10
        );
        startHeight = parseInt(
          document.defaultView.getComputedStyle(el).height,
          10
        );

        document.addEventListener("mousemove", doDrag);
        document.addEventListener("mouseup", stopDrag);
      });

      const doDrag = (e) => {
        el.style.width = startWidth + (e.clientX - startX) + "px";
        el.style.height = startHeight + (e.clientY - startY) + "px";
      };

      const stopDrag = () => {
        document.removeEventListener("mousemove", doDrag);
        document.removeEventListener("mouseup", stopDrag);
      };
    };
  }

  byId(id) {
    return this.wrap(this.document.getElementById(id));
  }

  query(selector) {
    return this.wrap(this.document.querySelector(selector));
  }

  queryAll(selector) {
    return Array.from(this.document.querySelectorAll(selector)).map((el) =>
      this.wrap(el)
    );
  }

  create(tag) {
    return this.wrap(this.document.createElement(tag));
  }

  textNode(text) {
    return this.document.createTextNode(text);
  }

  clear(selector) {
    const el = this.document.querySelector(selector);
    if (el) el.innerHTML = "";
    return this.wrap(el);
  }

  wrap(element) {
    return new BeedomElement(element);
  }
}

Beedom.globalZIndex = 1000;

class BeedomElement {
  constructor(el) {
    this.el = el;
  }

  text(str) {
    this.el.textContent = str;
    return this;
  }

  html(str) {
    this.el.innerHTML = str;
    return this;
  }

  styles(styleObj) {
    if (typeof this.el.styler === "function") {
      this.el.styler(styleObj);
    } else {
      Object.assign(this.el.style, styleObj);
    }
    return this;
  }

  css(styleObj) {
    return this.styles(styleObj);
  }

  attr(name, value) {
    if (value === undefined) return this.el.getAttribute(name);
    this.el.setAttribute(name, value);
    return this;
  }

  data(key, value) {
    if (value === undefined) return this.el.dataset[key];
    this.el.dataset[key] = value;
    return this;
  }

  addClass(cls) {
    this.el.classList.add(...cls.split(" "));
    return this;
  }

  removeClass(cls) {
    this.el.classList.remove(...cls.split(" "));
    return this;
  }

  toggleClass(cls) {
    this.el.classList.toggle(cls);
    return this;
  }

  append(child) {
    if (child instanceof BeedomElement) this.el.appendChild(child.el);
    else if (child instanceof Node) this.el.appendChild(child);
    return this;
  }

  appendTo(target) {
    const parent =
      target instanceof BeedomElement
        ? target.el
        : typeof target === "string"
        ? document.querySelector(target)
        : target;
    parent.appendChild(this.el);
    return this;
  }

  prependTo(target) {
    const parent =
      target instanceof BeedomElement
        ? target.el
        : typeof target === "string"
        ? document.querySelector(target)
        : target;
    parent.insertBefore(this.el, parent.firstChild);
    return this;
  }

  remove() {
    this.el.remove();
    return this;
  }

  clone(deep = true) {
    return new BeedomElement(this.el.cloneNode(deep));
  }

  clear() {
    this.el.innerHTML = "";
    return this;
  }

  on(event, handler) {
    this.el.addEventListener(event, handler);
    return this;
  }

  off(event, handler) {
    this.el.removeEventListener(event, handler);
    return this;
  }

  find(selector) {
    const found = this.el.querySelector(selector);
    return found ? new BeedomElement(found) : null;
  }

  findAll(selector) {
    return Array.from(this.el.querySelectorAll(selector)).map(
      (el) => new BeedomElement(el)
    );
  }

  parent() {
    return this.el.parentElement
      ? new BeedomElement(this.el.parentElement)
      : null;
  }

  children() {
    return Array.from(this.el.children).map((el) => new BeedomElement(el));
  }

  next() {
    return this.el.nextElementSibling
      ? new BeedomElement(this.el.nextElementSibling)
      : null;
  }

  prev() {
    return this.el.previousElementSibling
      ? new BeedomElement(this.el.previousElementSibling)
      : null;
  }

  insertBefore(target) {
    const t = target instanceof BeedomElement ? target.el : target;
    t.parentNode.insertBefore(this.el, t);
    return this;
  }

  after(target) {
    const t = target instanceof BeedomElement ? target.el : target;
    t.parentNode.insertBefore(this.el, t.nextSibling);
    return this;
  }

  before(target) {
    const t = target instanceof BeedomElement ? target.el : target;
    t.parentNode.insertBefore(this.el, t);
    return this;
  }
}

const DOM = new Beedom();
export default DOM;

// ✅ Global exposure for <script src="..."> usage
if (typeof window !== "undefined") {
  window.DOM = DOM;
}
