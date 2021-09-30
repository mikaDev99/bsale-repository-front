$(function(){
   
    $('document').ready( function() {
        $.ajax({
            url: 'http://localhost:4000/api/product/list',
            success: function (products) {
                let card = $('.listProducts');


                card.html('');
                Object.values(products.products).forEach( product => {
                    card.append(`
                    <div class="card" style="width: 18rem;">
                    <img src="${product.url_image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">${product.price}</p>
                    </div>
                    `)
                });
            }
        });
    });


    $('#productForm').on('submit', function(e){
        e.preventDefault();
        let valueSearch = $('#valueSearch');
        console.log(valueSearch.val());

        $.ajax({
            url: 'http://localhost:4000/api/product/search',
            type: 'POST',
            data: {
                name: valueSearch.val()
            },
            success: function (data, response) {
                let card = $('.listProducts');


                card.html('');
                Object.values(data.products).forEach( product => {
                    card.append(`
                    <div class="card" style="width: 18rem;">
                    <img src="${product.url_image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">${product.price}</p>
                    </div>
                    `)
                });
            }
        })
    })

});
