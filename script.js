    
        var html = '';
        var shopcart = [];
        window.onload = init;
        var prodList = [{
            name: 'Produto 1'
            , details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            , cost: 50000
        }, {
            name: 'Produto 2'
            , details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            , cost: 80000
        }, {
            name: 'Produto 3'
            , details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            , cost: 1000
        }, {
            name: 'Produto 4'
            , details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            , cost: 30000
        }, {
            name: 'Produto 5'
            , details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            , cost: 120000
        }, {
            name: 'Produto 6'
            , details: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.'
            , cost: 20000
        }];

        var cartCount = document.querySelector('.cart-count');
        var counter=0;
        var total = document.querySelector('.cart-total span');
        var cartTotal=0;
        
        
        function init(){
            build();
            var q = document.querySelectorAll('.productItem');
            for (var x = 0; x < q.length; x++) {
                q[x].addEventListener('click', function (e) {
                    e.preventDefault();
                    addToCart();
                })
            }
            outputCart();
        }

        function build(){
            var x = 0;
            prodList.forEach(function (v) {
                html += '<div class="item col-xs-12 col-sm-6 col-md-4"><h4>' + v.name + '</h4><img src="http://placehold.it/350x150" class="img-fluid"><div><p>' + v.details + '</p><span class="price">'+ fMoney(v.cost) + '</span><a href="#" class="productItem" data-name="' + v.name + '" data-s="' + v.details + '"  data-price="' + v.cost + '" data-id="' + x + '" >Add to Cart</a></div></div>';
                x++;
            })
            document.querySelector('#products .row').innerHTML += html;

        }

        function addToCart(){    
            cartCount = document.querySelector('.cart-count');
            counter++;
            cartCount.innerHTML = counter;

            var itemInCart = false;
            var itemInfo = event.target.dataset;
            itemInfo.qty = 1;

            shopcart.forEach(function (v) {
                if (v.id == itemInfo.id) {
                    v.qty = parseInt(v.qty) + parseInt(itemInfo.qty);
                    itemInCart = true;
                    console.log(shopcart);
                }
            });
            
            if(!itemInCart){
                shopcart.push(itemInfo);
            }

            sessionStorage.setItem('sessioncart', JSON.stringify(shopcart));
            outputCart();
            
        }

        function outputCart() {
            var cart = document.querySelector('.cart ul');
            var cartHtml ="";
            total = document.querySelector('.cart-total span');     

            if (sessionStorage.getItem('sessioncart') != null) {
                shopcart = JSON.parse(sessionStorage.getItem('sessioncart'));
            }
            var html = '';
            var total = 0;
            shopcart.forEach(function (v) {
                var stotal = v.qty * v.price;
                total += stotal;
                html += "<li><div><div><h5>"+v.name+"</h5></div><div class='col-xs-5'>"+fMoney(v.price)+"</div><div class='col-xs-5'><input onchange='updateQty()' id='"+v.id+"' type='number' min='1' value='"+v.qty+"'/></div><div class='col-xs-2'><a  class='delete' onclick='removeFromCart("+v.id+")' href='javascript:;'><span class='glyphicon glyphicon-ban-circle' aria-hidden='true'></span></a></div></li>";
            });
            html += '<span class="total-cart">Total ' + fMoney(total) + '<span>';
            document.querySelector('.cart ul').innerHTML = html;
        }


        function fMoney(n) {
            return 'R$ ' + (n / 100).toFixed(2);
        }

        function removeFromCart(id){
            console.log(id);
            for(x=0; x<shopcart.length;x++){    
                console.log(shopcart[x].id);            
                if(shopcart[x].id==id){
                    counter = counter - shopcart[x].qty;
                    
                    cartCount.innerHTML = counter;  

                    shopcart.splice(x,1);
                    sessionStorage.setItem('sessioncart', JSON.stringify(shopcart));
                    outputCart();
                }
            }
        }

        function updateQty(){
        
            for(x=0; x<shopcart.length;x++){                
                if(shopcart[x].id==event.target.id){
                    if(shopcart[x].qty>event.target.value){
                        counter--;
                        shopcart[x].qty = event.target.value;
                       
                    }
                    else{
                        counter++;
                        shopcart[x].qty = event.target.value;

                    }
                }
            }
            sessionStorage.setItem('sessioncart', JSON.stringify(shopcart));
            outputCart();
            cartCount.innerHTML = counter;

        }

    