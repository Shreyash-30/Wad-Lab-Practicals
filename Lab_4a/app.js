let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name: name, price: price });
    total += price;
    updateCartUI();
    
    // Show custom modern toast
    $("<div class='toast-notification'>🛒 Added " + name + " to Cart</div>")
    .css({ 
        "display": "block", 
        "opacity": 0, 
        "top": "20px", 
        "left": "50%", 
        "transform": "translateX(-50%)", 
        "padding": "16px 25px", 
        "background": "rgba(20, 20, 20, 0.95)",
        "backdrop-filter": "blur(10px)",
        "color": "#fff", 
        "position": "fixed", 
        "z-index": 9999, 
        "border-radius": "12px",
        "font-weight": "500",
        "border": "1px solid rgba(255,255,255,0.1)",
        "box-shadow": "0 20px 40px rgba(0, 0, 0, 0.4)",
        "width": "80%",
        "max-width": "400px",
        "text-align": "center",
        "font-family": "'Outfit', sans-serif",
        "transition": "all 0.3s ease"
    })
    .appendTo( $.mobile.pageContainer )
    .animate({ opacity: 1, top: "40px" }, 300)
    .delay( 2500 )
    .animate({ opacity: 0, top: "20px" }, 300, function() {
        $(this).remove();
    });
}

function updateCartUI() {
    let list = $("#cartList");
    list.empty();
    
    if (cart.length === 0) {
        list.append('<li class="empty-cart"><div class="empty-icon">🛍️</div>Your cart is empty.</li>');
    } else {
        cart.forEach(function(item, index) {
            list.append('<li class="cart-item"><div class="cart-item-name">' + item.name + '</div> <div class="cart-item-price">$' + item.price.toLocaleString('en-US') + '</div></li>');
        });
    }
    
    if(list.hasClass('ui-listview')) {
        list.listview("refresh");
    }
    $("#cartTotal").text("$" + total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}));
}

function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
    } else {
        alert("Order Confirmed! \n\nTotal amount: $" + total.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + "\n\nThank you for shopping with ChronoLux.");
        cart = [];
        total = 0;
        updateCartUI();
        $.mobile.changePage("#home", { transition: "fade", reverse: true });
    }
}
