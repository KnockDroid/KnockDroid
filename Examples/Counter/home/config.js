
define( [], function(){
    /**
     * Model Class
     */
    var Model = function(){
        let self = this;
        self.contact = function(){
            kd.navigate( "contact" );
        }
    }
    /**
     * View Object
     */
    var View = {
        "Layout" : {
            init : [ "Linear", "FillXY,Vertical" ],
            kids : {
                "AppBar" : {
                    init : ["Home Page", "", "phone"],
                    bind : {
                        event : {
                            "SetOnControlTouch" : "contact"
                        }
                    }
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
        routes : [
            
        ]
    }
} );
