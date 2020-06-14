function PlusMinusEvent(param) {
  var value = parseInt(document.getElementById("People").value)
  if (param < 0 && value == 0) {
    return 0
  } else {
    document.getElementById("People").value = value + param
  }
}

function myfunction() {
  var value = parseInt(document.getElementById("People").value)
  if (isNaN(value)) {
    document.getElementById("People").value = 0
  }
}
