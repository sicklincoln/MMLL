//short term Fourier transform
//currently just calculates power spectrum, could modify later for phase spectrum etc

function MMLLSTFT(fftsize=1024,hopsize=512,windowtype=0,postfftfunction) {
    
    this.fftsize = fftsize;
    this.halffftsize = fftsize/2;
    this.windowtype = windowtype;
    this.postfftfunction = postfftfunction;
    
    this.windowing= new MMLLwindowing(this.fftsize,this.halffftsize);
    //this.fft = new MMLLFFT(); //
    this.fft = new FFTR(fftsize);
    
    //this.fft.setupFFT(fftsize);
    
    this.windowdata = new Float32Array(this.fftsize); //begins as zeroes
    this.hanning = new Float32Array(this.fftsize);
    
    var ang=(2.0*Math.PI)/this.fftsize;
    
    for(var i=0;i<fftsize;++i)
        this.hanning[i]=0.5 - 0.5*Math.cos(ang*i);
    
    //initialised containing zeroes
    this.powers = new Float32Array(this.halffftsize);
    //var freqs = result.subarray(result.length / 2);
    this.reals = new Float32Array(this.fftsize);
    
    this.complex = new Float32Array(this.fftsize+2);
    
    //this.imags = new Float32Array(this.fftsize);
    
    //4 =2*2 compensates for half magnitude if only take non-conjugate part, fftsize compensates for 1/N
    this.fftnormmult = 4*this.fftsize; //*fftsize;// /4; //1.0/fftsize;  or 1/(fftsize.sqrt)
    
    this.next = function(input) {
        
        //update by audioblocksize samples
        var ready = this.windowing.next(input);
        
        if(ready) {
            
            //no window function (square window)
            if(this.windowtype==0) {
            for (i = 0; i< this.fftsize; ++i) {
                this.reals[i] = this.windowing.store[i]; //*hanning[i];
                //this.imags[i] = 0.0;
                
            }
            } else {
                for (i = 0; i< this.fftsize; ++i) {
                    this.reals[i] = this.windowing.store[i]*this.hanning[i];
                    //this.imags[i] = 0.0;
                    
                }
            }
  
            //fft library call
            //this.fft.transform(this.reals, this.imags);
            //var output = this.fft.forward(this.reals);
            
            this.fft.forward(this.reals,this.complex);
            
            //output format is interleaved k*2, k*2+1 real and imag parts
            //DC and 0 then bin 1 real and imag ... nyquist and 0
            
            //power spectrum not amps, for comparative testing
            for (var k = 0; k < this.halffftsize; ++k) {
                //Math.sqrt(
                var twok = 2*k;
                //this.powers[k] = ((output[twok] * output[twok]) + (output[twok+1] * output[twok+1]) ); // * fftnormmult;
                
                this.powers[k] = ((this.complex[twok] * this.complex[twok]) + (this.complex[twok+1] * this.complex[twok+1]) );
                
                //will scale later in onset detector itself
                
                //this.powers[k] = ((this.reals[k] * this.reals[k]) + (this.imags[k] * this.imags[k]) ); // * fftnormmult;
                
                //freqs[k - align] = (2 * k / N) * (sample_rate / 2);
            }
            
            //console.log(this.postfftfunction,'undefined');
            
            if(this.postfftfunction !== undefined)
            this.postfftfunction(this.powers,this.complex); //could pass this.complex as second argument to get phase spectrum etc
            
            
        }
        
        return ready;
        
    }
    
   

}

