// Pjesa e meposhtme eshte per te degjuar per ngjarjen qe ndodh kur faqja eshte plotesisht ngarkuar
document.addEventListener("DOMContentLoaded", () => {
  // Krijimi i nje lidhjeje me serverin WebSocket
  var socket = io();

  // Pjesa e meposhtme eshte per te degjuar per mesazhet qe jane derguar nga serveri
  socket.on("message", function (msg) {
    // Krijimi i nje elementi liste per çdo mesazh te pranuar
    var li = document.createElement("li");
    // Shtimi i tekstit te mesazhit si permbajtje te elementit liste
    li.appendChild(document.createTextNode(msg));
    // Shtimi i elementit liste ne listen e mesazheve per t'i shfaqur ato ne faqe
    document.getElementById("messages").appendChild(li);
  });

  // Pjesa e meposhtme eshte per te derguar nje mesazh tek serveri kur perdoruesi klikon butonin "Send"
  window.sendMessage = function () {
    // Marrja e tekstit te mesazhit nga kutia e hyrjes
    var msg = document.getElementById("message").value;
    // Dergimi i mesazhit tek serveri
    socket.send(msg);
    // Pastroja e kutise se hyrjes pasi mesazhi eshte derguar
    document.getElementById("message").value = "";
  };
});
