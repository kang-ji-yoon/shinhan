var cnt = 1

$(document).ready(function() {
  document.getElementsByClassName("queryNumber")[0].innerHTML = `1/5`
  document.getElementsByClassName("SubBlock")[0].innerHTML = list[0];
})

var p = {
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0
}

var list = [
  "꾸준한 소득이 있으신가요?",
  "기존계좌를 전환하실건가요?",
  "비과세상품을 원하시나요?",
  "정기적으로 저축이 가능하신가요?",
  "주식거래용 계좌를 원하시나요?",
  "완료"
]

function query(param) {
  p[`${cnt-1}`] = param;
  cnt++;
  document.getElementsByClassName("queryNumber")[0].innerHTML = `${cnt}/5`
  document.getElementsByClassName("SubBlock")[0].innerHTML = list[cnt-1];
  if (cnt > 5) {
    var form = document.createElement("form")
    form.setAttribute("charset", "UTF-8")
    form.setAttribute("method", "post")
    form.setAttribute("action", "http://www.solarproject.xyz/yourselfout")

    var input = document.createElement("input")
    input.type = "hidden"
    input.name = "object"
    input.value = JSON.stringify(p)
    form.appendChild(input)
    document.body.appendChild(form);
    form.submit();
  }
}
