$(document).ready(function() {
    // Load categories and items when page loads
    loadCategories();
    loadItems();

    // Load all categories
    function loadCategories() {
        $.ajax({
            url: 'get_categories.php',
            type: 'GET',
            success: function(response) {
                $('#categoryList').html(response);
            }
        });
    }

    // Load all items or by category
    function loadItems(category = null) {
        let data = {};
        if (category) {
            data = { category: category };
        }

        $.ajax({
            url: 'get_items.php',
            type: 'GET',
            data: data,
            success: function(response) {
                $('#itemList').html(response);
            }
        });
    }

    // Event handler for category click
    $('#categoryList').on('click', 'li', function() {
        let selectedCategory = $(this).text();
        loadItems(selectedCategory);
    });

    // Event handler for item card click
    $('#itemList').on('click', '.itemCard', function() {
        let itemName = $(this).find('.itemName').text();
        let itemPrice = $(this).find('.itemPrice').text();

        addItemToBill(itemName, parseFloat(itemPrice));
    });

    // Function to add items to the bill
    function addItemToBill(name, price) {
        let billTable = $('#billTable tbody');
        let existingRow = billTable.find('tr:contains(' + name + ')');

        if (existingRow.length > 0) {
            let qtyCell = existingRow.find('.quantity');
            let totalCell = existingRow.find('.total');
            let quantity = parseInt(qtyCell.text()) + 1;
            let total = (price * quantity).toFixed(2);

            qtyCell.text(quantity);
            totalCell.text(total);
        } else {
            let row = `<tr>
                <td>${name}</td>
                <td>${price}</td>
                <td class="quantity">1</td>
                <td class="total">${price.toFixed(2)}</td>
            </tr>`;
            billTable.append(row);
        }

        updateTotal();
    }

    // Update total price in the bill
    function updateTotal() {
        let total = 0;
        $('#billTable tbody tr').each(function() {
            total += parseFloat($(this).find('.total').text());
        });
        $('#totalPrice').text(total.toFixed(2));
    }
    // Event handler for Checkout button
$('#checkoutBtn').click(function() {
    printReceipt();
});

// Function to print the receipt
function printReceipt() {
    let receiptContent = `<h3>Receipt</h3><table><thead>
        <tr><th>Item</th><th>Price</th><th>Quantity</th><th>Total</th></tr></thead><tbody>`;

    $('#billTable tbody tr').each(function() {
        let item = $(this).find('td:nth-child(1)').text();
        let price = $(this).find('td:nth-child(2)').text();
        let quantity = $(this).find('td:nth-child(3)').text();
        let total = $(this).find('td:nth-child(4)').text();

        receiptContent += `<tr><td>${item}</td><td>${price}</td><td>${quantity}</td><td>${total}</td></tr>`;
    });

    receiptContent += `</tbody></table><br><strong>Total: ${$('#totalPrice').text()}</strong>`;
    
    let newWindow = window.open('', '_blank');
    newWindow.document.write(receiptContent);
    newWindow.document.close();
    newWindow.print();
}
});
