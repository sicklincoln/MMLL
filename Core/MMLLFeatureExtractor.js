//for non-realtime feature extraction with MMLL Listeners
//adapts framework of MMLLWebAudioSetup but without need for Web Audio API

//blocksize will determine how often feature values are stored

//returns an array of features, given a sound file to analyse

//Sample rates for sound files must match that assumed in overall code, no sample rate conversion is carried out

function MMLLFeatureExtractor(featurestoextract, blocksize=1024,sampleRate=44100) {
 
    var self = this;
    
    //self.filenames = filenames;
    
    //Parse and replace any single string by array containing string, so consistent if additional arguments were passed in
    for (var i =0; i< featurestoextract.length; ++i) {
        
        if(!(Array.isArray(featurestoextract[i])) ) {
            
            featurestoextract[i] = [featurestoextract[i]];
            
        }
        
    }
    
   self.featurestoextract = featurestoextract;
    
    self.audioblocksize = blocksize;
    self.inputAudio = new MMLLInputAudio(self.audioblocksize);
  
    self.sampleRate = sampleRate;

    self.numInputChannels = 1;
 
    //context required for sampler's decodeAudioData calls
    
    //can request specific sample rate, but leaving as device's default for now
    //https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext
    try {
        self.audiocontext = new webkitAudioContext();
        
    } catch (e) {
        
        try {
            
            self.audiocontext = new AudioContext();
            
        } catch(e) {
            
            alert("Your browser does not support Web Audio API!");
            return;
        }
        
    }
    
    //ignore sampleRate of audiocontext for now, just running through sound files at rate set by user
    //self.sampleRate = self.audiocontext.sampleRate; //usually 44100.0
    //console.log("AudioContext established with sample rate:",self.sampleRate," and now setting up for input type:",self.inputtype); //print
  
    
    //use async, wait?
    self.analyseAudioFile = function(filename,updatefunction) {
        
       
        var featuredata;
        
        self.sampler = new MMLLSampler();
        
        
        return new Promise(function(resolve, reject) {
        //"/sounds/05_radiohead_killer_cars.wav"
        self.sampler.loadSamples([filename],
                                 function onload() {
                                 
                                 console.log('loaded: ',filename);
                                 
                                 self.sampleplayer = new MMLLSamplePlayer();
                                 self.sampleplayer.reset(self.sampler.buffers[0]);
                                 //self.sampleplayer.numChannels = self.sampler.buffers[0]
                                 
                                 if(self.sampleplayer.numChannels>1) {
                                 //interleaved input
                                 self.numInputChannels = 2;
                                 
                                 self.inputAudio.numChannels = self.numInputChannels;
                                 //self.samplearray = new Float32Array(2*audioblocksize);
                                 
                                 }
                                 
                                 //samplearray depends on number of Channels whether interleaved
                                 
                                 //include last frame, will be zero padded as needed
                                 var numblocks = Math.ceil(self.sampleplayer.lengthinsampleframes/self.audioblocksize);
                                 
                                 
                                 //self.processSoundFile(self.audioblocksize);
                              
                                 var numfeatures = featurestoextract.length;
                                 
                                 featuredata = new Array(featuredata);
                                 
                                 
                                 var j=0, f = 0;
                                 
                                 for (j = 0; j < numblocks; ++j)
                                 featuredata[j] = new Array(numfeatures);
                                 
                                 
                                 var extractors = new Array(numfeatures);
                                 
                                 for (f = 0; f < numfeatures; ++f) {
                                 
                                 var featurestring = new String("new " + featurestoextract[f][0] + "("+self.sampleRate);
                                 
                                 if(featurestoextract[f].length>1) {
                                 
                                 for (j = 1; j < featurestoextract[f].length; ++j)
                                    featurestring += "," + featurestoextract[f][j];
                                 
                                 }
                                 
                                 featurestring += ")";
                                 
                                 //extractors[f] = eval("new " + featurestoextract[f][0] + "("+self.sampleRate+")"); //new featurestoextract[f];
                                 
                                 extractors[f] = eval(featurestring);
                                 
                                 //https://stackoverflow.com/questions/1366127/how-do-i-make-javascript-object-using-a-variable-string-to-define-the-class-name
                                 //var obj = eval("new " + classNameString + "()");
                                 //var obj = (Function('return new ' + classNameString))()h
                                 
                                 
                                 
                                 
                                 }
                                 
                                 console.log('Extracting features for: ',filename); //debug console message
                                 
                                 for (j = 0; j < numblocks; ++j) {
          
                                    updatefunction(j,numblocks);
                                 
                                 //needed since player accumulates to its output
                                    for (var i = 0; i < self.audioblocksize; ++i) self.inputAudio.monoinput[i] = self.inputAudio.inputL[i] = self.inputAudio.inputR[i] = 0.0;
                                 
                                    self.sampleplayer.render(self.inputAudio,self.audioblocksize);
                                 
                                    //extract features over this block
                                    for (f = 0; f < numfeatures; ++f) {
                                      featuredata[j][f] =  extractors[f].next(self.inputAudio.monoinput);
                                    }
                                 
                                 }
                                 
                                 
                                 resolve(featuredata); //return via Promise
                                 
                                 
                                 },self.audiocontext);
                           
                           })
        
        
    };


    
}

