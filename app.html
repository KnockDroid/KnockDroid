<html>
<head>
    <meta name="viewport" content="width=device-width">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/3.5.1/knockout-latest.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.6/require.min.js"></script>
    <script src="http://192.168.1.4:8080/KnockDroid.js"></script>
    <script src='file:///android_asset/app.js'></script>
    <script src='file:///android_asset/mui.js'></script>
</head>
	
<script>
    cfg.MUI, cfg.Light
    
    config = {
        host : "http://192.168.1.4:8080/Examples/Basic/"
    }
    function OnStart()
    {
        app.EnableBackKey( false );
        kd = new KnockDroid();

        kd.configure(
            /*
             * Modules Configuration
             */
    	    "modules",
    	    /**
    	     * host (optional)
    	     * if all your views, models, services are in remote host
    	     */
            config.host
        ).then( function(){
            kd.start();
        });
    }
    
    
    function OnBack(){
        /**
        * You can modify it as per your need
        * but you don't need to
        */
        if( kd.defaults.route==kd.active.route ){
            var yesNo = app.CreateYesNoDialog( "Exit App?" );
            yesNo.SetOnTouch( result=>{
                if( result=="Yes" ) app.Exit()
            });
            yesNo.Show();
        }else{
            history.back();
        }
    }
</script>

<body onload="app.Start()"></body>
</html>