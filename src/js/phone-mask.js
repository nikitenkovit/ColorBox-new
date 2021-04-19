export const phoneMask = () => {
  const telNumber = document.getElementById("number");

  window.addEventListener("DOMContentLoaded", () => {

    const setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        const range = elem.createTextRange();
        range.collapse(true);
        range.moveEnd("character", pos);
        range.moveStart("character", pos);
        range.select();
      }
    }

    function mask() {

      const matrix = "+7 (___) ___ ____";
      let count = 0;
      let def = matrix.replace(/\D/g, "");
      let val = this.value.replace(/\D/g, "");
      if (def.length >= val.length) val = def;
      this.value = matrix.replace(/./g, (a) => {
        return /[_\d]/.test(a) && count < val.length ? val.charAt(count++) : count >= val.length ? "" : a
      });
      if (event.type == "blur") {
        if (this.value.length === 2) this.value = ""
      } else setCursorPosition(this.value.length, this)
    }

    if (telNumber) {
      telNumber.addEventListener("input", mask, false);
      telNumber.addEventListener("focus", mask, false);
      telNumber.addEventListener("blur", mask, false);
    }
  });
};