let console = (
    function(oldconsole){
        return {
            log: function(text){
                oldconsole.log(text);
                let argsArray = Array.from(arguments);
                oldconsole.log(argsArray);
            },
            info: function(text){
                oldconsole.info(text);
            },
            warn: function(text){
                oldconsole.warn(text);
            },
            error: function(err){
                oldconsole.error(err);
                consoleMessages.push({
                    message: `${err.name}: ${err.message}`,
                    class: "log log--error"
                });
            }
        }
    }
)(window.console);