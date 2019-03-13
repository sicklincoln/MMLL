//put all the awkward Web Audio API setup code here

function MMLLBasicGUISetup(callback,setup,audioblocksize=256,microphone=true,audiofileload=true) {
 
    var self = this;
    self.audionotrunning = true;
    self.webaudio;
    self.audioblocksize = audioblocksize;
    self.callback = callback;
    self.setup = setup;
    self.textnode;
    
//    <button onclick="initMic()">Open Microphone</button><br>
//    <button onclick="document.getElementById('file-input').click();">Open Audio File</button>
//    <input id="file-input" type="file" name="name" style="display: none;" /><br><br>
 
//    <canvas id="canvas" width="800" height="400">
//    This text is displayed if your browser does not support HTML5 Canvas.
//        </canvas>
    
//    var canvas = document.getElementById('canvas');
//    var context = canvas.getContext('2d');

    if(microphone) {
        
    self.openmicbutton = document.createElement("BUTTON");        // Create a <button> element
    var t = document.createTextNode("Open Microphone");       // Create a text node
    self.openmicbutton.appendChild(t);                                // Append the text to <button>
    
        self.openmicbutton.onclick = function() {
            
            if(self.audionotrunning) {
                
                self.webaudio = MMLLWebAudioSetup(self.audioblocksize,1,self.callback,self.setup);
                
                self.audionotrunning = false;
            }
            
          
            self.openmicbutton.parentNode.removeChild(self.openmicbutton);
            if(audiofileload)
                self.openaudiofilebutton.parentNode.removeChild(self.openaudiofilebutton);
            document.body.removeChild(textnode);
            
            
        }
    
    document.body.appendChild(self.openmicbutton);                    // Append <button> to <body>
    
    }
   
    self.textnode = document.createTextNode(' --- ');
    document.body.appendChild(textnode);
    
    if(audiofileload) {
        
        self.inputfile = document.createElement('input');
        self.inputfile.type = "file";
        self.inputfile.style = "display: none;";
        
        self.inputfile.addEventListener("change",function uploadFile()
                                    {
                                    console.log(self.inputfile.files[0],self.inputfile.files[0].name);
                                    
                                    
                                    if(self.audionotrunning) {
                                    
                                    //pass in filename or 1 for audio input
                                    self.webaudio = MMLLWebAudioSetup(self.audioblocksize,self.inputfile.files[0],self.callback,self.setup);
                                    
                                    //webaudio.initSoundFileRead(file_input.files[0]);
                                    
                                    self.audionotrunning = false;
                                    }
                                    
                                    }, false);
        
        document.body.appendChild(self.inputfile);
        
        self.openaudiofilebutton = document.createElement("BUTTON");
        var t = document.createTextNode("Open Audio File");
        self.openaudiofilebutton.appendChild(t);
        
        
        self.openaudiofilebutton.onclick = function() {
        self.inputfile.click();
            
        self.openaudiofilebutton.parentNode.removeChild(self.openaudiofilebutton);
            if(microphone)
        self.openmicbutton.parentNode.removeChild(self.openmicbutton);
        document.body.removeChild(textnode);
            
            
        };
        
       
        document.body.appendChild(self.openaudiofilebutton);
        
        
    }
    
    
    
//    self.whateverfunction = function(inputarg) {
//        
//        console.log('initialise GUI'); //debug console message
//    
//    };
    
}

