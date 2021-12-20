define( ()=>{
    return {
        view : {
            Layout : {
                init : ["Linear", "FillXY,Vertical"],
                kids : [
                    {
                        ui : "AppBar",
                        id : "home_app_bar",
                        init : ["Web Inspector", "menu", "settings"],
                        bind : {
                            event : {
                                SetOnMenuTouch : "openDrawer"
                            }
                        }
                    },
                    {
                        ui : "Container",
                        init : ["Absolute", "FillXY"],
                        methods : {
                            SetSize : function( model, kids ){
                                let h = kids.home_app_bar.ui.GetHeight();
                                return [1, 1-h];
                            }
                        }
                    }
                ]
            }
        },
        drawer : "drawer",
        model : {
            openDrawer : function(){
                app.OpenDrawer( "Left" );
            }
        },
        routes : [
            {
                default : true,
                path : "dash",
                file : "home_dash",
            },
            {
                path : "about",
                file : "home_about",
            }
        ]
    }
} );