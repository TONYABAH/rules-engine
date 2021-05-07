// import {debounce} from './index'
// Find the right method, call on correct element
function launchFullScreen ( element ) {
    if ( element.requestFullScreen ) {
        element.requestFullScreen()
    } else if ( element.mozRequestFullScreen ) {
        element.mozRequestFullScreen()
    } else if ( element.webkitRequestFullScreen ) {
        element.webkitRequestFullScreen()
    }
}

// Launch fullscreen for browsers that support it!
// launchFullScreen(document.documentElement); // the whole page
// launchFullScreen(document.getElementById("videoElement")); // any individual element

function visibility () {
    // Adapted slightly from Sam Dutton
    // Set name of hidden property and visibility change event
    // since some browsers only offer vendor-prefixed support
    var hidden, state, visibilityChange
    
    if ( typeof document.hidden !== "undefined" ) {
        hidden = "hidden"
        visibilityChange = "visibilitychange"
        state = "visibilityState"
    } else if ( typeof document.mozHidden !== "undefined" ) {
        hidden = "mozHidden"
        visibilityChange = "mozvisibilitychange"
        state = "mozVisibilityState"
    } else if ( typeof document.msHidden !== "undefined" ) {
        hidden = "msHidden"
        visibilityChange = "msvisibilitychange"
        state = "msVisibilityState"
    } else if ( typeof document.webkitHidden !== "undefined" ) {
        hidden = "webkitHidden"
        visibilityChange = "webkitvisibilitychange"
        state = "webkitVisibilityState"
    }
    console.log ( hidden, state )
    // Add a listener that constantly changes the title
    document.addEventListener( visibilityChange, function ( e ) {
    // Start or stop processing depending on state
        console.log ( e )
    }, false )
    
    // Set the initial value
    document.title = document[state]
}

function media ( errBack ) {
    // Grab elements, create settings, etc.
    var video = document.getElementById( 'video' )

    // Get access to the camera!
    if ( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {
    // Not adding `{ audio: true }` since we only want video now
        navigator.mediaDevices.getUserMedia( { video: true } ).then( function ( stream ) {
            //video.src = window.URL.createObjectURL(stream);
            video.srcObject = stream
            video.play()
        } )
    }

    /* Legacy code below: getUserMedia */
    else if ( navigator.getUserMedia ) { // Standard
        navigator.getUserMedia( { video: true }, function ( stream ) {
            video.src = stream
            video.play()
        }, errBack )
    } else if ( navigator.webkitGetUserMedia ) { // WebKit-prefixed
        navigator.webkitGetUserMedia( { video: true }, function ( stream ){
            video.src = window.webkitURL.createObjectURL( stream )
            video.play()
        }, errBack )
    } else if ( navigator.mozGetUserMedia ) { // Mozilla-prefixed
        navigator.mozGetUserMedia( { video: true }, function ( stream ){
            video.srcObject = stream
            video.play()
        }, errBack )
    }
}
export default {
  visibility,
  media,
  launchFullScreen
}
/* Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');

// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
	context.drawImage(video, 0, 0, 640, 480);
});*/

/** Fetch API
fetch('https://davidwalsh.name/users.json', {
	method: 'POST', 
	mode: 'cors', 
	redirect: 'follow',
	headers: new Headers({
		'Content-Type': 'text/plain'
	})
}).then(function(response) {  
    return response.son() 
}).catch(function(err) {
	// Handle Error 
}); */

/** PURE CSS SLIDER
 * <div class="slider">Some content here....</div>
 * .slider {
	overflow-y: hidden;
	max-height: 500px; /* approximate max height 

	transition-property: all;
	transition-duration: .5s;
	transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    }
    .slider.closed {
	max-height: 0;
} */




