function toCurrency( price ) {
  return new Intl.NumberFormat( 'en-IN', {
    currency: 'EUR',
    style: 'currency'
  } ).format( price );
}

function createNewCart( cart ) {
  if ( cart.courses.length ) {
    const html = cart.courses.map( course => {
      return `
    <tr>
      <td> ${course.title}</td>
      <td>${course.price}</td>
      <td>${course.count}</td>
      <td>
        <button
          class="btn btn-small js-remove"
          data-id="${course._id}"
        >Delete</button>
      </td>
    </tr>`;
    } ).join( '' );

    document.querySelector( 'tbody' ).innerHTML = html;
    document.querySelector( '.price' ).textContent = toCurrency( cart.totalPrice );
  } else {
    document.querySelector( '#cart' ).innerHTML = `<p>Now Your Card Is Empty, But You Can Fix It=)</p>`
  }
}

document.querySelectorAll( '.price' ).forEach( node => {
  node.textContent = toCurrency( node.textContent );
} );

const $cart = document.querySelector( '#cart' );

if ( $cart ) {
  $cart.addEventListener( 'click', ( event ) => {
    if ( event.target.classList.contains( 'js-remove' ) ) {
      const id = event.target.dataset.id;

      fetch( 'cart/remove/' + id, { method: 'delete' } )
        .then( response => response.json() )
        .then( createNewCart );
    }
  } );
}
