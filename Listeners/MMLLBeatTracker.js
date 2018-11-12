//Nick Collins audio beat tracking algorithm adapted from my SuperCollider BeatTrack code, itself derived from Matthew Davies beat tracker research


function MMLLBeatTracker(sampleRate) {

    this.fftsize = 1024;
    
    var beatTrackModule = BeatTrackModule({});

    this.beattrackfunction = beatTrackModule.cwrap('BeatTrack_next',
                                         'number', // Function return void
                                         // Integers, Floating point numbers and pointers all
                                         // are considered 'number'
                                         ['number','number']
                                         );
    
    this.destructorfunction = beatTrackModule.cwrap('BeatTrack_Dtor',
                                          null, // Function return void
                                          [] //no arguments
                                          );
    
    
    //BeatTrack_samplestonextbeat
    this.samplestonextbeat = beatTrackModule.cwrap('BeatTrack_samplestonextbeat',
                                       'number', // Function return void
                                       [] //no arguments
                                       );
    
    this.tempo = beatTrackModule.cwrap('BeatTrack_tempo',
                                                    'number', // Function return void
                                                    [] //no arguments
                                                    );
    this.phase = beatTrackModule.cwrap('BeatTrack_phase',
                                       'number', // Function return void
                                       [] //no arguments
                                       );
    
    // Allocate array memory (sizeof double = 8) and
    // get a pointer to it
    this.parr = beatTrackModule._malloc(this.fftsize*8);
    
    // Populate the array
    // We create Float64Array in javascript code and map it to
    // the pointer that we received above. We can then populate
    // the array with values we want to pass as input
    this.arr = new Float64Array(beatTrackModule.HEAPF64.buffer, this.parr, this.fftsize);

    //to hold interleaved real and imag fft calculation results
    this.fftoutput = new Float64Array(this.fftsize);
    
    
    //if sample rate is 88200 or 96000, assume taking double size FFT to start with
	if(this.m_srate >= (44100*2)) {
        
        //presume double size function withfft(powers){}
        this.stft = new MMLLSTFT(this.fftsize * 2,this.fftsize,0);
        
        this.m_srate = this.m_srate/2;
    } else {
        
        this.stft = new MMLLSTFT(this.fftsize,this.fftsize /2 ,0); //0 = rectangular (no) window
        
    }
    
    beatTrackModule.ccall('BeatTrack_Ctor',
                 null, // Function return void
                 // Integers, Floating point numbers and pointers all
                 // are considered 'number'
                 ['number','number'],
                 [sampleRate,this.fftsize / 2]
                 );

 
//must pass in fft data (not power spectrum, need actual fft bins here)
this.next = function(input,audioblocksize) {

    var i,j;
 
    var ready = this.stft.next(input);
    
    var beat = 0;
    
    if(ready) {
       
        var fftdata = this.stft.output;

        var fftoutput = this.fftoutput;
        
        //power spectrum not amps, for QMUL complex onset detection algorithm
        for (var k = 0; k < this.fftsize / 2; ++k) {

            var index = 2*k;
            
            fftoutput[index] = fftdata[index];
            fftoutput[index+1] = fftdata[index+1];
            
        }

        this.arr.set(fftoutput);
        
    //this.arr.set(this.stft.output); //can't go direct, output size is 1026 and target needs 1024
    
        //n, fftdata first argument not really used
    beat = this.beattrackfunction(this.fftsize,this.parr);
        
    }
    
    return beat;
    
  }


}


