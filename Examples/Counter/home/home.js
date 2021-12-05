
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
                "AppBar" : {
                    init : ["Home Page", "", "phone"]
                },
                "ButtonElegant" : {
                    init : ["Go to Contact", 0.38],
                    methods : {
                        "SetMargins" : [0.0, 0.02, 0.0, 0.0]
                    },
                    bind : {
                        href : {
                            ev : "SetOnTouch",
                            path : "contact"
                        }
                    }
                },
                "kidsView" : {
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
        /* Router property defines all the routes and its ViewModel file name
        Routes : [
            {
                default : true,
                path : "landing",
                file : "pages/landing"
            },
            {
                path : "contact",
                file : "pages/contact"
            }
        ] */
    }
} );
