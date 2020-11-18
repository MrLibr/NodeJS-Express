function toCurrency( price ) {
  return new Intl.NumberFormat( 'en-IN', {
    currency: 'EUR',
    style: 'currency'
  } ).format( price );
}

function createNewCard( card ) {
  if ( card.courses.length ) {
    const html = card.courses.map( course => {
      return `
    <tr>
      <td> ${course.title}</td>
      <td>${course.price}</td>
      <td>${course.count}</td>
      <td>
        <button
          class="btn btn-small js-remove"
          data-id="${course.id}"
        >Delete</button>
      </td>
    </tr>`;
    } ).join( '' );

    document.querySelector( 'tbody' ).innerHTML = html;
    document.querySelector( '.price' ).textContent = toCurrency( card.price );
  } else {
    document.querySelector( '#card' ).innerHTML = `<p>Now Your Card Is Empty, But You Can Fix It=)</p>`
  }
}

document.querySelectorAll( '.price' ).forEach( node => {
  node.textContent = toCurrency( node.textContent );
} );

const $card = document.querySelector( '#card' );

if ( $card ) {
  $card.addEventListener( 'click', ( event ) => {
    if ( event.target.classList.contains( 'js-remove' ) ) {
      const id = event.target.dataset.id;

      fetch( 'card/remove/' + id, { method: 'delete' } )
        .then( response => response.json() )
        .then( createNewCard );
    }
  } );
}
