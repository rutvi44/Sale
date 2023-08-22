function formGarageSale(){

    let formName = document.getElementById('name').value;
    let formEmail = document.getElementById('email').value;
    let formCreditCard = document.getElementById('creditCard').value;
    let formCreditMonth = document.getElementById('expiryMonth').value;
    let formCreditYear = document.getElementById('expiryDate').value;

    let formBottles = parseInt(document.getElementById('bottles').value) || 0;
    let formCaps = parseInt(document.getElementById('caps').value) || 0;
    let formPens = parseInt(document.getElementById('pens').value) || 0;
    let formCandy = parseInt(document.getElementById('candy').value) || 0;
    let formCakes = parseInt(document.getElementById('cakes').value) || 0;

    var errors = '';

    var reName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var reCreditCard = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    var reCreditMonth = /^[A-Z]{3}$/;
    var reCreditYear = /^\d{4}$/;

    if(!reName.test(formName)){

        errors += "Please enter your name correctly (Firstname and lastname)<br>";
    }

    if (!reEmail.test(formEmail)) {

        errors += "Please enter a valid email address (email@domain.com )<br>";
    }

    if (!reCreditCard.test(formCreditCard)) {

        errors += "Please enter a valid credit card number in the format xxxx-xxxx-xxxx-xxxx <br>";
    }

    if (!reCreditMonth.test(formCreditMonth)) {

        errors += "Please enter a valid credit card expiry month in uppercase (e.g., MMM) <br>";
     }
    else {
        var validMonths = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        if (!validMonths.includes(formCreditMonth)) {
            
          errors += "Please enter a valid credit card expiry month (e.g., JAN, FEB, MAR, etc.) <br>";
        }
    }

    if (!reCreditYear.test(formCreditYear)) {

        errors += "Please enter a valid credit card expiry year in the format yyyy <br>";
    }
    else {
        var currentYear = new Date().getFullYear();
        if (parseInt(formCreditYear) < currentYear) {

          errors += "Please enter a valid credit card expiry year in the future <br>";
        }
    }

    let items= '';

    let bottlesPrice = formBottles * 5;
    let capsPrice = formCaps * 20 ;
    let pensPrice = formPens * 2;
    let candyPrice = formCandy * 20 ;
    let cakesPrice = formCakes * 3 ;

    if(formBottles){
        items += `<tr>
            <td>Water Bottles</td>
            <td>${formBottles}</td>
            <td>$5.00</td>
            <td>$${bottlesPrice.toFixed(2)}</td>
        <tr>`
    }

    if(formCaps){
        items += `<tr>
            <td>Caps</td>
            <td>${formCaps}</td>
            <td>$20.00</td>
            <td>$${capsPrice.toFixed(2)}</td>
        <tr>`
    }

    if(formPens){
        items += `<tr>
            <td>Pens</td>
            <td>${formPens}</td>
            <td>$2.00</td>
            <td>$${pensPrice.toFixed(2)}</td>
        <tr>`
    }

    if(formCandy){
        items += `<tr>
            <td>Candy Bags</td>
            <td>${formCandy}</td>
            <td>$20.00</td>
            <td>$${candyPrice.toFixed(2)}</td>
        <tr>`
    }

    if(formCakes){
        items += `<tr>
            <td>Cup Cakes</td>
            <td>${formCakes}</td>
            <td>$3.00</td>
            <td>$${cakesPrice.toFixed(2)}</td>
        <tr>`
    }
    
    if (formBottles === 0 && formCaps === 0 && formPens === 0 && formCandy === 0 && formCakes === 0) {
    errors += "Please select at least one item to purchase<br>";
    }
  
    if(errors){
        document.getElementById('errors').innerHTML = errors ;       
    }

    else{
        document.getElementById('errors').innerHTML = '';

        const donation = 10.00 ;

        let totalPrice = bottlesPrice + candyPrice + capsPrice + pensPrice + cakesPrice + donation ;

        var cardLastDigit = formCreditCard.substring(formCreditCard.length -4);
        var maskedCard = "xxxx-xxxx-xxxx-" + cardLastDigit ;
        let receipt = `<p>Thank You For the Purchase!! </p><br>
                <table>
                <tr>
                    <td>Name</td>
                    <td>${formName}</td>
                </tr>
                <tr>
                    <td>Email</td>
                    <td>${formEmail}</td>
                </tr>
                <tr>
                    <td>Credit Card</td>
                    <td>${maskedCard}</td>
                </tr>             
                </table>
                <br>

                <table> 
                <tr>
                    <th>Items</th>
                    <th>Quantity</th>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                </tr>

                ${items}

                <tr>
                    <td>Donation</td>
                    <td colspan = "2" >Minimum</td>
                    <td>$${donation.toFixed(2)}</td>
                </tr>                
                
                <tr>
                <td colspan="3">Total</td>
                <td >$${totalPrice.toFixed(2)}</td>
                </tr>

                </table>


            `
        document.getElementById('formResult').innerHTML = receipt ;
    }


    return false;
}