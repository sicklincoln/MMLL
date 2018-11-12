//Nick Collins first created 8th June 2018

//support mono and stereo
//asynchronous loading, with function to call upon completion passed in

//shared between Sampler and MMLLWebAudioSetup
function MMLLInputAudio(blocksize)
{
	this.monoinput = new Float32Array(blocksize);
	this.inputL = new Float32Array(blocksize);
	this.inputR = new Float32Array(blocksize);
    this.numChannels = 1;
}
function MMLLOutputAudio(blocksize)
{
	this.outputL = new Float32Array(blocksize);
	this.ouputR = new Float32Array(blocksize);
}


//no longer uses interleaved audio if multiple channels
function MMLLBuffer() {
    
    this.dataL = 0;
    this.dataR = 0;
    this.length = 0;
    this.duration = 0;
    this.sampleRate = 44100.0;
    this.numChannels = 1; //unless otherwise

    
}


//contains state for block by block playback of a mono OR stereo buffer object
function MMLLSamplePlayer() {
    
    this.buffer = 0;
    this.playbackposition = 0;
    this.lengthinsampleframes = 0;
    this.numChannels  = 1;
    this.playing = 0;
    this.offset = 0;
    
    //mix settings for pan and amplitude come later? //to a stereo output bus
    //this.amp = 0.4;
    //this.pan = 0.0;
 
    
    this.reset = function(buffer) {
        
        if(buffer!= null) {
            this.buffer = buffer;
            
            this.lengthinsampleframes = buffer.length;
            
            this.numChannels = buffer.numChannels;
        }
        
        this.playbackposition = 0;
        this.playing = 1;
        
    }
    
    //offset code should abstract out to superclass Player
    
    
    //CHECK FOR STEREO COMPATIBILITY
    
    //arrayL, arrayR not stereo rendering
    this.render = function(inputaudio, numSamples) {
        
        var i;
        
        var samplesleft = this.lengthinsampleframes - this.playbackposition; //this.buffer.length;
        
        var datasource,datasource2; // = this.buffer.data;
        
        var offset = this.offset;
        
        var baseindex, sourceinde
        
        //must make copy else changing original reference and messing up rendering for other active events?
        //actually, probably OK, but will keep this way while debugging an issue right now
        var numsamplesnow = numSamples;
        
        numsamplesnow -= offset;
        
        var samplestodo = numsamplesnow;

        if(numsamplesnow>samplesleft) {
            samplestodo = samplesleft;
             this.playing = 0;
        }
        
        var pos = this.playbackposition;
        
        var outputL = inputaudio.inputL;
        var outputR = inputaudio.inputR;
        var monooutput = inputaudio.monoinput;
        
        
        var temp;
        if(offset>0) {
            
            if(this.numChannels ==1) {
            
                datasource = this.buffer.dataL;
                
            for (i = 0; i < samplestodo; ++i) {
                
                temp = datasource[pos+i];
                outputL[offset+i] += temp; //pos will be zero here since only use offset on first block, however keep code as is in case later have playback of sample starting in middle etc
                
                outputR[offset+i] += temp;
                
                monooutput[offset+i] = temp;
            }
                
            } else {
                
                datasource = this.buffer.dataL;
                datasource2 = this.buffer.dataR;
                
                for (i = 0; i < samplestodo; ++i) {
                    temp = offset+i;
                    outputL[temp] += datasource[pos+i];
                    outputR[temp] += datasource2[pos+i];
                    
                    monooutput[offset+i] = (outputL[temp] + outputR[temp])*0.5;
                }
                
//                for (i = 0; i < samplestodo; ++i) {
//                    baseindex = 2*(offset+i);
//                    sourceindex = 2*(pos+i);
//                    
//                    array[baseindex] += datasource[sourceindex];
//                    array[baseindex+1] += datasource[sourceindex+1];
//                    
//                    
//                    //pos will be zero here since only use offset on first block, however keep code as is in case later have playback of sample starting in middle etc
//                }
                
            }
            
            //only active in first block rendered
            this.offset = 0;
            
        } else
        {
            
            if(this.numChannels ==1) {
                
                datasource = this.buffer.dataL;
                
                temp = datasource[pos+i];
                
                for (i = 0; i < samplestodo; ++i) {
                    outputL[i] += temp; //pos will be zero here since only use offset on first block, however keep code as is in case later have playback of sample starting in middle etc
                    
                    outputR[i] += temp;
                    
                    monooutput[i] +=temp;
                }
                
                
                
//            for (i = 0; i < samplestodo; ++i) {
//                array[i] += datasource[pos+i];
//            }
                
            } else {
                
                datasource = this.buffer.dataL;
                datasource2 = this.buffer.dataR;
                
                for (i = 0; i < samplestodo; ++i) {
                    outputL[i] += datasource[pos+i];
                    outputR[i] += datasource2[pos+i];
                    
                    monooutput[i] = (outputL[i] + outputR[i]) * 0.5; 
                }
                
//                for (i = 0; i < samplestodo; ++i) {
//                    baseindex = 2*i;
//                    sourceindex = 2*(pos+i);
//                    
//                    array[baseindex] += datasource[sourceindex];
//                    array[baseindex+1] += datasource[sourceindex+1];
//                
//                }
                
            }
            
            
            
        }
        
        this.playbackposition += samplestodo;
        
       
        
    }
    
    
    
}



function MMLLSampler() {
    
    
    this.loadcounter = 0;
    this.buffers = 0;
    
    this.loadSamples = function(arrayofpaths, onloadfunction) {
        
        this.numbuffers = arrayofpaths.length;
        
        this.buffers = new Array(this.numbuffers);
        
        for(var i=0; i<arrayofpaths.length; ++i) {
            
            var nowtoload = arrayofpaths[i];
            
            console.log(typeof(nowtoload),nowtoload);
            
            if(typeof(nowtoload)==='string') {
            
            this.loadSample(nowtoload,onloadfunction,i);
                
            } else {
                
            this.loadSample2(nowtoload,onloadfunction,i);
                
            }
            
        }
        
    }
    
    
    
 
    
    this.loadSample2 = function(fileobject,onloadfunction,index) {
        
        //https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
        var self = this;
        
        //http://composerprogrammer.com/music/demo1.mp3
        
        
        var reader = new FileReader();
        
        reader.onload = function(e) {
            
            var audioData = reader.result;
            audiocontext.decodeAudioData(audioData, function(buf) {
                                         //assume only playback one channel, raw format probably interleaved sample frames
                                         
                                         var buffernow = new MMLLBuffer();
                                         
                                         //can get interleaved? Or should already split?
                                         //for machine listening will want in mono
                                         
                                         
                                         buffernow.numChannels = buf.numberOfChannels;
                                         
                                         //at most STEREO
                                         if(buffernow.numChannels>2) buffernow.numChannels = 2;
                                         
                                         buffernow.length = buf.length;
                                         buffernow.duration = buf.duration;
                                         buffernow.sampleRate = buf.sampleRate;
                                         
                                         if(buffernow.numChannels==1) {
                                         
                                         buffernow.dataL = buf.getChannelData(0); //assuming mono
                                         //https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
                                         
                                         } else {
                                         
                                         //assumes 2 channels
                                         //get stereo arrays then interleave into one
                                         
                                         buffernow.dataL = buf.getChannelData(0);
                                         buffernow.dataR = buf.getChannelData(1);
                                         
//                                         var channelL = buf.getChannelData(0);
//                                         var channelR = buf.getChannelData(1);
//                                         
//                                         buffernow.data = new Array(buffernow.length*2);
//                                         
//                                         var where;
//                                         
//                                         for(var k = 0; k<buffernow.length; ++k) {
//                                         
//                                         where = 2*k;
//                                         
//                                         buffernow.data[where] = channelL[k];
//                                         buffernow.data[where+1] = channelR[k];
//                                         
                                         
                                         //}
                                         
                                         
                                         }
                                         
                                       
                                         //console.log('buffer loaded test 1',self,this,self.loadcounter,filename,buf.length,buf.duration, buf.sampleRate); //print
                                         
                                         
                                         //console.log('buffer loaded test 2',self.loadcounter,filename,buffernow.length,buffernow.sampleRate,self.buffers); //print
                                         
                                         self.buffers[index] = buffernow;
                                         
                                         //console.log('buffer loaded',self.loadcounter,filename,buffernow.length,buffernow.samplerate); //print
                                         
                                         
                                         ++(self.loadcounter);
                                         
                                         if(self.loadcounter==self.numbuffers) {
                                         
                                         onloadfunction();
                                         }
                                         
                                         
                                         },
                                         function(e){"Error with decoding audio data" + e.err});
        }
        
        reader.readAsArrayBuffer(fileobject);
        
        
        
    }
    
    
    this.loadSample = function(filename,onloadfunction,index) {
        
        var request = new XMLHttpRequest();
 
        //var filename = "loop"+which+".wav";
        
        //https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
        var self = this;
        
        //http://composerprogrammer.com/music/demo1.mp3
        request.open('GET', filename, true); //viper.ogg
        request.responseType = 'arraybuffer';
     
        
        request.onload = function() {
            var audioData = request.response;
            audiocontext.decodeAudioData(audioData, function(buf) {
                                         //assume only playback one channel, raw format probably interleaved sample frames
                                         
                                         var buffernow = new MMLLBuffer();
                                         
                                         
                                         
                                         
                                         
                                         buffernow.numChannels = buf.numberOfChannels;
                                         
                                         //at most STEREO
                                         if(buffernow.numChannels>2) buffernow.numChannels = 2;
                                         
                                         buffernow.length = buf.length;
                                         buffernow.duration = buf.duration;
                                         buffernow.sampleRate = buf.sampleRate;
                                         
                                         if(buffernow.numChannels==1) {
                                         
                                         buffernow.dataL = buf.getChannelData(0); //assuming mono
                                         //https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
                                         
                                         } else {
                                         
                                         //assumes 2 channels
                                         //get stereo arrays then interleave into one
                                         buffernow.dataL = buf.getChannelData(0);
                                         buffernow.dataR = buf.getChannelData(1);
                                         
//                                         var channelL = buf.getChannelData(0);
//                                         var channelR = buf.getChannelData(1);
//                                         
//                                         buffernow.data = new Array(buffernow.length*2);
//                                         
//                                         var where;
//                                         
//                                         for(var k = 0; k<buffernow.length; ++k) {
//                                         
//                                         where = 2*k;
//                                         
//                                         buffernow.data[where] = channelL[k];
//                                         buffernow.data[where+1] = channelR[k];
//                                         
//                                         
//                                         }
                                         
                                         
                                         }
                                         
                                         
                                         
//                                         buffernow.data = buf.getChannelData(0); //left only, o/w assuming mono
//                                         //https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
//                                         buffernow.length = buf.length;
//                                         buffernow.duration = buf.duration;
//                                         buffernow.sampleRate = buf.sampleRate;
//                                         
//                                          //console.log('buffer loaded test 1',self,this,self.loadcounter,filename,buf.length,buf.duration, buf.sampleRate); //print
                                         
                                         
                                         //console.log('buffer loaded test 2',self.loadcounter,filename,buffernow.length,buffernow.sampleRate,self.buffers); //print
                                         
                                         self.buffers[index] = buffernow;
                                         
                                         //console.log('buffer loaded',self.loadcounter,filename,buffernow.length,buffernow.samplerate); //print
                                         
                                         
                                         ++(self.loadcounter);
                                         
                                         if(self.loadcounter==self.numbuffers) {
                                         
                                            onloadfunction();
                                         }
                                         
                                         
                                         },
                                         function(e){"Error with decoding audio data" + e.err});
        }
        request.send();
        
        
        
    }
    

    
}

