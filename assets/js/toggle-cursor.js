// a class for saving the toggle state for the cursor
class CursorToggler {
    constructor() {
        this.cursorValue = "default";
    }

    cursorValue() {
        return this.cursorValue;
    }

    cursorValue(newCursorValue) {
        this.cursorValue = newCursorValue;
    }
}

//an instance of the toggle class
let toggler = new CursorToggler();

// setting onClick event listener for the toggle link
document.getElementById("toggle-cursor").addEventListener("click", function(){
    // if the cursor is default set the animated one
    // else (the cursor is animated) set the default one
    if(toggler.cursorValue == "default")
    {
        toggler.cursorValue="animated";

        addScript('assets/js/animate-small-dot-cursor.js', 'animateSmallDotCursor'); //for animating the small dot cursor
        addScript('assets/js/set-cursor-on-canvas.js', 'setCursorOnCanvas'); //for setting the cursor on the canvas
        addScript('assets/js/handle-hover-state.js', 'handleHoverState'); //for handling the hover state
    }
    else
    {
        removeScript('animateSmallDotCursor');
        removeScript('setCursorOnCanvas');
        removeScript('handleHoverState');
        location.reload();

        toggler.cursorValue("default");
    }
});

function addScript( src, id ) {
    var s = document.createElement( 'script' );
    s.setAttribute( 'src', src );
    s.setAttribute( 'id', id );
    document.body.appendChild( s );
    document.body.style.cursor = "none";
}

function removeScript( id ) {
    var scriptToBeRemoved = document.getElementById( id );
    scriptParent = scriptToBeRemoved.parentNode;
    scriptParent.removeChild(scriptToBeRemoved);
    document.body.style.cursor = "default";
}
