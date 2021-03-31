export default class CasesHoverMove {
  constructor(container, movableElementSelector) {
    this._container = container;
    this._movableElement = this._container.querySelector(movableElementSelector);

    this._setEndPosition = this._setEndPosition.bind(this);
  }

  init() {
    this._containerMouseEnterHandler(this._container, this._movableElement);
    this._containerMouseLeaveHandler(this._container, this._movableElement);
  }

  _getSide(event) {
    const elemBounding = this._container.getBoundingClientRect();
    const elementLeftEdge = elemBounding.left;
    const elementTopEdge = elemBounding.top;
    const elementRightEdge = elemBounding.right;
    const elementBottomEdge = elemBounding.bottom;

    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const topEdgeDist = Math.abs(elementTopEdge - mouseY);
    const bottomEdgeDist = Math.abs(elementBottomEdge - mouseY);
    const leftEdgeDist = Math.abs(elementLeftEdge - mouseX);
    const rightEdgeDist = Math.abs(elementRightEdge - mouseX);

    const min = Math.min(topEdgeDist, bottomEdgeDist, leftEdgeDist, rightEdgeDist);

    switch (min) {
      case topEdgeDist:
        return `top`;
      case leftEdgeDist:
        return `left`;
      case rightEdgeDist:
        return `right`;
      case bottomEdgeDist:
        return `bottom`;
    }
  }

  _setStartPosition(side) {
    switch (side) {
      case `top`:
        this._movableElement.style.left = `0`;
        this._movableElement.style.top = `-100%`;
        return;
      case `bottom`:
        this._movableElement.style.left = `0`;
        this._movableElement.style.top = `100%`;
        return;
      case `left`:
        this._movableElement.style.left = `-100%`;
        this._movableElement.style.top = `0`;
        return;
      case `right`:
        this._movableElement.style.left = `100%`;
        this._movableElement.style.top = `0`;
        return;
    }
  }

  _setEndPosition() {
    this._movableElement.style.transition = `0.3s ease`;
    if (parseInt(this._movableElement.style.left, 10) !== 0) {
      this._movableElement.style.left = `0`;
    } else if (parseInt(this._movableElement.style.top, 10) !== 0) {
      this._movableElement.style.top = `0`;
    }
  }

  _containerMouseEnterHandler() {
    this._container.addEventListener(`mouseenter`, (event) => {
      this._setStartPosition(this._getSide(event));

      setTimeout(this._setEndPosition, 5);
    });
  }

  _containerMouseLeaveHandler() {
    this._container.addEventListener(`mouseleave`, (event) => {
      this._setStartPosition(this._getSide(event));

      setTimeout(() => {
        this._movableElement.style.transition = `0s ease`;
      }, 300);
    });
  }
}
