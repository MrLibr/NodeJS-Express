document.querySelectorAll( '.price' ).forEach( node => {
  node.textContent = new Intl.NumberFormat( 'en-IN', {
    currency: 'EUR',
    style: 'currency'
  } ).format( node.textContent )
} )
