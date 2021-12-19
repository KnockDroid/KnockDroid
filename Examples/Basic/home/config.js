define( ()=>{
    return {
        view : {
            Layout : {
                init : ["Linear", "FillXY,Vertical"],
                kids : [
                    {
                        ui : "AppBar",
                        id : "main_app_bar",
                        init : ["Home Module"]
                    },
                    {
                        ui : "ButtonRaised",
                        init : ["Get Height"],
                        bind : {
                            event : {
                                SetOnTouch : "check"
                            }
                        }
                    },
                    {
                        ui : "Container",
                        init : ["Absolute", "FillXY"]
                    }
                ]
            }
        },
        model : {
            check : function( ui, model ){
                app.ShowPopup( ui.GetText() );
                app.Alert( model.$kids.main_app_bar.ui.GetHeight() );
            }
        },
        routes : [
            {
                default : true,
                path : "about",
                file : "pages/about"
            },
            {
                path : "explore",
                file : "pages/explore"
            }
        ]
    }
} );