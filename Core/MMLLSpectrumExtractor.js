//for non-realtime extraction of the spectrum

//returns an array of complex spectral data frames, given a MONO sound file to analyse

//Sample rates for sound files must match that assumed in overall code, no sample rate conversion is carried out

function MMLLSpectrumExtractor(blocksize=512,sampleRate=44100,fftsize=1024,hopsize=512,windowtype=0) {
 
    var self = this;
    
    self.audioblocksize = blocksize;
    self.inputAudio = new MMLLInputAudio(self.audioblocksize);
  
    self.sampleRate = sampleRate;

    self.numInputChannels = 1;

    self.fftsize = fftsize;
    self.hopsize = hopsize;
    self.windowtype = windowtype;
    
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
        
       
        var spectraldata;
        
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
                                 //fresh STFT object
                                 var stft = new MMLLSTFT(self.fftsize,self.hopsize,self.windowtype);
                                 
                                 
                                 //samplearray depends on number of Channels whether interleaved
                                 
                                 //include last frame, will be zero padded as needed
                                 var numblocks = Math.floor(self.sampleplayer.lengthinsampleframes/self.audioblocksize);
                                 
                                 
                                 //starts with fftsize-hopsize in the bank
                                 var numspectralframes = Math.floor(((numblocks*self.audioblocksize) - self.hopsize)/self.hopsize) + 1;
                                 
                                 //self.processSoundFile(self.audioblocksize);
                              
                                 
                                 spectraldata = new Array(numspectralframes);
                                 
                                 
                                 var j=0, i = 0;
                                 
                                 //complex data not in packed form, but dc and nyquist real values as complex numbers at 0 and fftsize indices
                                 for (j = 0; j < numspectralframes; ++j)
                                 spectraldata[j] = new Array(self.fftsize+2);
                                 
                                 console.log('Extracting spectrum for: ',filename); //debug console message
                                 
                                 var spectralframecount = 0;
                                 
                                 for (j = 0; j < numblocks; ++j) {
          
                                    updatefunction(j,numblocks);
                                 
                                 //needed since player accumulates to its output
                                    for (i = 0; i < self.audioblocksize; ++i) self.inputAudio.monoinput[i] = self.inputAudio.inputL[i] = self.inputAudio.inputR[i] = 0.0;
                                 
                                    self.sampleplayer.render(self.inputAudio,self.audioblocksize);
                                 
                                    var newframe = stft.next(self.inputAudio.monoinput);
                                 
                                 if(newframe) {
                                 
                                 if(spectralframecount>=numspectralframes) {
                                 
                                 console.log("what the spectrum?",numblocks,numspectralframes,spectralframecount,self.hopsize,self.fftsize);
                                 }
                                 
                                 
                                 // var fftdata = stft.complex;
                                 
                                  for (i = 0; i < (self.fftsize+2); ++i)
                                    spectraldata[spectralframecount][i] = stft.complex[i];
                                 
                                    ++spectralframecount;
                                 }
                                 
                                
                                 
                                 }
                                 
                                 
                                 resolve(spectraldata); //return via Promise
                                 
                                 
                                 },self.audiocontext);
                           
                           })
        
        
    };


    
}

