function once ( fn, context ) { 
    var result

    return function () { 
        if ( fn ) {
            result = fn.apply( context || this, arguments )
            fn = null
        }

        return result
    }
}

export default once

/* Usage
var canOnlyFireOnce = once(function() {
	console.log('Fired!');
});

canOnlyFireOnce(); // "Fired!"
canOnlyFireOnce(); // nada
*/