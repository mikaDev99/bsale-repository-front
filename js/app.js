$(function(){

    // Loads data when page starts
    $('document').ready( function() {
        $.ajax({
            url: 'https://bsale-back-end.herokuapp.com/api/product/list/',
            success: function (products) {
                let card = $('.listProducts');
                card.html('');
                Object.values(products.products).forEach( product => {

                    // we validate if there is an image
                    if (product.url_image == null || product.url_image == '') {
                        card.append(`
                        <div class="card">
                            <img src="img/not-found.png" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                            </div>
                            <div class="card-footer">
                                <p class="card-text">$ ${product.price}</p>
                                <a href="#"><i class="fas fa-shopping-cart"></i></a>
                            </div>
                        </div>
                        `)
                    }else{
                        card.append(`
                        <div class="card">
                            <img src="${product.url_image}" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${product.name}</h5>
                            </div>
                            <div class="card-footer">
                                <p class="card-text">$ ${product.price}</p>
                                <a href="#"><i class="fas fa-shopping-cart"></i></a>
                            </div>
                        </div>
                        `)
                    }

                });
            },
            error: function(status){
                let card = $('.listProducts');
                
                card.html('');
                card.append(`
                <h4>No se encontraron productos :(</h4>
                    `)
            }
        });
    });
        
        // Send search parameters and display data
        $('#productForm').on('submit', function(e){
            e.preventDefault();
            let valueSearch = $('#valueSearch');
            console.log(valueSearch.val());
            
            $.ajax({
                url: 'https://bsale-back-end.herokuapp.com/api/product/search/',
                type: 'POST',
                data: {
                    name: valueSearch.val()
                },
                success: function (data, response) {
                    let card = $('.listProducts');
                    card.html('');
                    
                    Object.values(data.products).forEach( product => {

                        // we validate if there is an image
                        if (product.url_image == null || product.url_image == '') {
                            card.append(`
                            <div class="card">
                                <img src="img/not-found.png" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${product.name}</h5>
                                </div>
                                <div class="card-footer">
                                    <p class="card-text">$ ${product.price}</p>
                                    <a href="#"><i class="fas fa-shopping-cart"></i></a>
                                </div>
                            </div>
                            `)
                        }else{
                            card.append(`
                            <div class="card">
                                <img src="${product.url_image}" class="card-img-top" alt="...">
                                <div class="card-body">
                                    <h5 class="card-title">${product.name}</h5>
                                </div>
                                <div class="card-footer">
                                    <p class="card-text">$ ${product.price}</p>
                                    <a href="#"><i class="fas fa-shopping-cart"></i></a>
                                </div>
                            </div>
                            `)
                        }
                    });
                },
                error: function(status){
                    let card = $('.listProducts');
                    card.html('');
                    card.append(`
                        <h4>No se encontraron productos :(</h4>
                            `)
                }
            });
        });
});
