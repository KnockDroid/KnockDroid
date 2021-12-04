
define( [], function(){
    /**
     * Model Class
     */
    var Model = function(){
        let self = this;
    }
    /**
     * View Object
     */
    var View = {
        "Layout" : {
            init : [ "Linear", "FillXY,Vertical" ],
            kids : {
                "RouterView" : {
                    //RouterView is also a layout
                    init : ["Linear", "FillXY,Vertical"]
                }
            }
        }
    };
    
    return {
        View : View,
        /* Model should be an object and not a Class */
        Model : new Model(),
        /* Router property defines all the routes and its ViewModel file name */
        Routes : [
            {
                default : true,
                path : "about",
                file : "about"
            },
            {
                path : "contact"
                /**
                 * filename is assumed to be the same as path
                 */
            }
        ]
    }
} );
