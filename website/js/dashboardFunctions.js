
// DropdownMenu Function

function dropdownFucntion() {
    document.getElementById("dropdownmenu").style.visibility='visible';
    document.getElementById('dropdownbtn').style.color = "rgb(0, 136, 200)"

    window.onclick = function(event) {
      if (!event.target.matches('#dropdownbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var dropdownsbutton = document.getElementById('dropdownbtn')
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.style.visibility = "visible") {
            openDropdown.style.visibility="hidden";
            dropdownsbutton.style.color = "white";
            
          }
        }
      }
    }
  
  }


// Date Function

 const data = Date.now().format('D MMM, YYYY')
 document.getElementById("date").value = data;



