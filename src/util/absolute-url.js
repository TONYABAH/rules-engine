var absoluteUrl = ( function () {
    var a

    return function ( url ) {
        if ( !a ) a = document.createElement( 'a' )
        a.href = url

        return a.href
    }
} )()

export default absoluteUrl 
   
// Usage
//getAbsoluteUrl('/something'); // https://davidwalsh.name/something