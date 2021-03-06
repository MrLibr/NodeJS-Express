function toCurrency( price ) {
  return new Intl.NumberFormat( 'en-IN', {
    currency: 'EUR',
    style: 'currency'
  } ).format( price );
}

function toFormateDate( date ) {
  return new Intl.DateTimeFormat( 'en-IN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  } ).format( new Date( date ) );
}

function createNewCart( cart, csrf ) {
  if ( cart.courses.length ) {
    const html = cart.courses.map( course => {
      return `
    <tr class="position-space-between">
      <td> ${course.title}</td>
      <td>${course.price}</td>
      <td>${course.count}</td>
      <td>
        <button
          class="btn btn-small js-remove"
          data-id="${course._id}"
          data-csrf="${csrf}"
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

document.querySelectorAll( '.date' ).forEach( node => {
  node.textContent = toFormateDate( node.textContent );
} );

const $cart = document.querySelector( '#cart' );

if ( $cart ) {
  $cart.addEventListener( 'click', ( event ) => {
    if ( event.target.classList.contains( 'js-remove' ) ) {
      const id = event.target.dataset.id;
      const csrf = event.target.dataset.csrf;

      fetch( 'cart/remove/' + id, { method: 'delete', headers: { 'X-XSRF-TOKEN': csrf } } )
        .then( response => response.json() )
        .then( cart => createNewCart( cart, csrf ) );
    }
  } );
}

M.Tabs.init( document.querySelectorAll( '.tabs' ) );
