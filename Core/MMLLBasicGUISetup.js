//put all the awkward Web Audio API setup code here

function MMLLBasicGUISetup(callback,setup,audioblocksize=256,microphone=true,audiofileload=true) {
 
    var self = this;
    this.audionotrunning = true;
    this.webaudio;
    this.audioblocksize = audioblocksize;
    this.callback = callback;
    this.setup = setup;
    
//    <button onclick="initMic()">Open Microphone</button><br>
//    <button onclick="document.getElementById('file-input').click();">Open Audio File</button>
//    <input id="file-input" type="file" name="name" style="display: none;" /><br><br>
 
//    <canvas id="canvas" width="800" height="400">
//    This text is displayed if your browser does not support HTML5 Canvas.
//        </canvas>
    
//    var canvas = document.getElementById('canvas');
//    var context = canvas.getContext('2d');

    if(microphone) {
        
    this.openmicbutton = document.createElement("BUTTON");        // Create a <button> element
    var t = document.createTextNode("Open Microphone");       // Create a text node
    this.openmicbutton.appendChild(t);                                // Append the text to <button>
    
        this.openmicbutton.onclick = function() {
            
            if(self.audionotrunning) {
                
                self.webaudio = MMLLWebAudioSetup(self.audioblocksize,1,self.callback,self.setup);
                
                self.audionotrunning = false;
            }
            
            
        }
    
    document.body.appendChild(this.openmicbutton);                    // Append <button> to <body>
    
    }
   
    document.body.appendChild(document.createTextNode(' --- '));
    
    if(audiofileload) {
        
        this.inputfile = document.createElement('input');
        this.inputfile.type = "file";
        this.inputfile.style = "display: none;";
        
        this.inputfile.addEventListener("change",function uploadFile()
                                    {
                                    console.log(self.inputfile.files[0],self.inputfile.files[0].name);
                                    
                                    
                                    if(self.audionotrunning) {
                                    
                                    //pass in filename or 1 for audio input
                                    self.webaudio = MMLLWebAudioSetup(self.audioblocksize,self.inputfile.files[0],self.callback,self.setup);
                                    
                                    //webaudio.initSoundFileRead(file_input.files[0]);
                                    
                                    self.audionotrunning = false;
                                    }
                                    
                                    }, false);
        
        document.body.appendChild(this.inputfile);
        
        this.openaudiofilebutton = document.createElement("BUTTON");
        var t = document.createTextNode("Open Audio File");
        this.openaudiofilebutton.appendChild(t);
        
        
        this.openaudiofilebutton.onclick = function() {
        self.inputfile.click();
        };
        
       
        document.body.appendChild(this.openaudiofilebutton);
        
        
    }
    
    
    
//    this.whateverfunction = function(inputarg) {
//        
//        console.log('initialise GUI'); //debug console message
//    
//    };
    
}

