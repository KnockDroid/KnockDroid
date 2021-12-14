
define( [], function(){
    /**
     * Model Class
     */
    var Model = function(){
        let self = this;
        self.contact = function(){
            kd.navigateRoute( "contact" );
        }
    }
    /**
     * View Object
     */
    var View = {
        "Layout" : {
            init : [ "Linear", "FillXY,Vertical" ],
            kids : [
                {
                    ui : "AppBar",
                    init : ["Home Module", "", "phone"],
                    bind : {
                        event : {
                            "SetOnControlTouch" : "contact"
                        }
                    }
                },
                {
                    ui : "Container",
                    //Container is an alias for layout
                    init : ["Absolute", "FillXY,Vertical"]
                }
            ]
        }
    };
    
    return {
        view : View,
        /* Model should be an object and not a Class */
        model : new Model(),
        routes : [
            {
                default : true,
                path : "about",
                file : "pages/about"
            },
            {
                path : "contact",
                file : "pages/contact"
            }
        ]
    }
} );
