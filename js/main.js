var productsarray = [];
var database = firebase.database();
var productsRef = database.ref("/products")
var dbContent;
var products_number = 0;

console.log(dbContent);


productsRef.on("value", (snapshot)=>{
    console.log(snapshot.val());  
    dbContent = snapshot.val()
    fill_catalog()
})

const fill_catalog = () =>{
   
    $("#products-wrapper").empty()
    $.each(dbContent, (key, value)=>{
       
        $("#products-wrapper").append(
            `  <div class="col-12 col-md-6 col-lg-4 my-2">
              <div class="card sombra" style="width: 18rem;">
                  <img width="200px" height="200px" src="${value.photo}" class="card-img-top" alt="Random img">
                  <div class="card-body">
                    <h5 class="card-title">${value.Name}</h5>
                    <p class="card-text">${value.Description}</p>
                  </div>
                  <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Precio: </strong>${value.Price}</li>
                    <li class="list-group-item"><strong>Ciudad: </strong>${value.City}</li>
                    <li class="list-group-item"><strong>Categoria: </strong>${value.Category}</li>
                  </ul>
                  <div class="card-body">
                      <button type="button" class="btn btn-primary btn-block">Comprar</button>
                  </div>
                </div>
          </div>`
          )
          products_number++;
    })

}

const addproduct = () =>{
   
    let Name = $("#product-name").val()
    let City = $("#City").val()
    let Price = $("#price").val()
    let Description = $("#description").val()
    let Category = $("#category").val()
    let Product_id = products_number
    let photo = $("#photo")
    
    let productObject = {Name, City, Price, Description, Category, Product_id, photo}

    productsRef.push(productObject)

    $("form").addClass("d-none")
    $("#alerta").removeClass("d-none")
}

const load_content = (link_html) =>{
    $("#content-wrapper").load(link_html,()=>{
        if(link_html == "products.html"){
            fill_catalog()
        }
    })
}

const active_link = (element) =>{
    $(".nav-item").removeClass("active")
    $(element).closest(".nav-item").addClass("active")
    if(element=="p") $("#p").closest(".nav-item").addClass("active")
}

load_content("products.html")


