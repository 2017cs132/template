let link = document.getElementsByTagName('a');

// loop through it, since its an  HTMLCollection
for (let i = 0; i < link.length; i++) {

  // if link includes our keyword, in this case the word
  // 'hacks'
  if (link[i].href.includes('')) {

     // change the link background color
     link[i].style.backgroundColor = "#1560bd";

     // change the text color
     link[i].style.color = "#ffffff";

     // change the font weight
     link[i].style.fontWeight = "bold";

   }

}