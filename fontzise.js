<script>
  

var body = document.getElementById("body");
var smallButton = document.getElementById("small");
var normalButton = document.getElementById("normal");
var largeButton = document.getElementById("large");
smallButton.onclick = function(e){
body.style.fontSize = "10px";	
}
normalButton.onclick = function(e){
body.style.fontSize = "14px";	
}
largeButton.onclick = function(e){
body.style.fontSize = "20px";	
}


</script>