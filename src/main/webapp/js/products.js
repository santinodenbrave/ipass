function initPage() {
	loadProducts();
	//addProduct();
	wijzigProduct();
}

function checkLogin() {	
	console.log('godverdomme');
	var data = sessionStorage.getItem('myJWT');
	if (data != null) {
		var list = document.querySelectorAll(".visibleforguest");
		for (var i = list.length; i--;) {
		    list[i].className = list[i].className + ' hide';
		}
		
		var list2 = document.querySelectorAll(".visibleforlogin");
		for (var i = list2.length; i--;) {
		    list2[i].className = list2[i].className + ' show';
		}
		
	} else {
		var list = document.querySelectorAll(".visibleforguest");
		for (var i = list.length; i--;) {
		    list[i].className = list[i].className + ' show';
		}
		
		var list2 = document.querySelectorAll(".visibleforlogin");
		for (var i = list2.length; i--;) {
		    list2[i].className = list2[i].className + ' hide';
		}
	}
}

function loadProducts() {
	var uri = "http://localhost:8080/gitaarshop/restservices/products";
	fetch(uri)
		.then(response => response.json())
		.then(function(myJson){
			for(const product of myJson){
				var id = product.product_id;
				var name = product.name;
				var description= product.description;
				var image = product.image;
				var price = product.price;
				
				var div = document.createElement("div");
				div.className = "col-lg-4 col-sm-6 productcard";
	
				var div2 = document.createElement("div");
				div2.className = "service-box mt-5 mx-auto";
				
				var imageElement = document.createElement("img");
				imageElement.className = "imgsizel";
				imageElement.src = "img/" + image;
				
				div2.appendChild(imageElement);
				
				var div3 = document.createElement("div");
				div3.className = "card-body";
				
				var pid = document.createElement("p");
				pid.className = "productid hide";
				pid.innerHTML = id;
				
				var titel = document.createElement("h3");
				titel.className = "mb-3 producttitel";
				titel.innerHTML = name;
				
				var text = document.createElement("p");
				text.className = "mb-0 productdescription";
				text.innerHTML = description;
				
				var prijs = document.createElement("p");
				prijs.className = "mb-0 productprice";
				prijs.innerHTML = "€ " + price;
				
				div3.appendChild(pid);
				div3.appendChild(titel);
				div3.appendChild(text);
				div3.appendChild(prijs);
				
				var div4 = document.createElement("div");
				div4.className = "card-footer";
				
				var button = document.createElement("button");
				button.className = "btn btn btn-success";
				button.setAttribute("data-toggle", "modal");
				button.setAttribute("data-target", "#myModal");
				button.innerHTML = "Wijzigen";
				
				div4.appendChild(button);
				div2.appendChild(div3);
				div2.appendChild(div4);
				div.appendChild(div2);
				
				var row = document.querySelector("#producten");
				row.appendChild(div);

				button.addEventListener('click', function(e){
					
					document.querySelector("#productid").value = product.product_id;
					document.querySelector("#editname").value = product.name;
					document.querySelector("#editdescription").value = product.description;
					document.querySelector("#editprice").value = product.price;
					document.querySelector("#editimage").value = product.image;
				});
				
			}

		})
}

function addProduct(){
	 var button = document.getElementById("add");
	    button.addEventListener('click', function(){

	    	var formData = new FormData(document.querySelector("#addProduct"))
	        var encData = new URLSearchParams(formData.entries());
	    	console.log(encData + " encData");

	    	  fetch("http://localhost:8080/gitaarshop/restservices/products", { method: 'POST', body: encData})
	          .then(function (response) {
	        	  console.log(response + " response");
	              if (response.ok){
	                  console.log("Product toegevoegd."); 
	                  return response.ok();
	              }
	              else throw "Kan niet worden toegevoegd.";
	          })
	      });
}

function wijzigProduct(){
	var button = document.getElementById("edit");
	console.log("blabla");
    button.addEventListener('click', function(){
    	console.log("wijzig knop");
        var formData = new FormData(document.querySelector("#editProduct"))
        var encData = new URLSearchParams(formData.entries());
        
	    fetch("http://localhost:8080/gitaarshop/restservices/products", { method: 'PUT', body: encData})
    	.then(function (response) {
    		console.log("response " + response);
		    if (response.ok){
		        console.log("Product gewijzigd"); 
		        return response.json();
		    }
		    else throw "Kan niet worden gewijzigd";
    	})
	}); 
}

function deleteProduct(){
	document.querySelector(".delproduct").addEventListener('click', function(event){
		var naam = document.querySelector("#artikelheader").innerHTML;
		var url = "http://localhost:8080/gitaarshop/restservices/producten";
		fetch(url + naam, { method: 'DELETE'})
		.then(function (response) {
	        if (response.ok){
	            console.log("Product verwijderd"); 
	        }
	        else throw "Kan niet worden verwijderd.";
	    })
	});
}
	    
function refreshPage(){
    window.location.reload();
} 

function logout() {
	sessionStorage.removeItem('myJWT');
	window.location.href = 'http://localhost:8080/gitaarshop/';

}