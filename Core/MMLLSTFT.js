//short term Fourier transform
//currently just calculates power spectrum, could modify later for phase spectrum etc

//window types:
// 0 = rectangular, no windowing
// 1 or other value = Hann
// 2 = sine

function MMLLSTFT(fftsize=1024,hopsize=512,windowtype=0,postfftfunction) {
    
    var self = this;
    
    self.fftsize = fftsize;
    self.hopsize = hopsize; //typically halffftsize, but windowing should cope otherwise too
    self.halffftsize = fftsize/2;
    self.windowtype = windowtype;
    self.postfftfunction = postfftfunction;
    
    self.windowing= new MMLLwindowing(self.fftsize,self.hopsize);
    self.mmllfft = new MMLLFFT(); //
    
    //old KissFFT
    //self.fft = new FFTR(fftsize);
    
    self.mmllfft.setupFFT(fftsize);
    
    self.windowdata = new Float32Array(self.fftsize); //begins as zeroes

    if(self.windowtype==2) {
        
        self.sine = new Float32Array(self.fftsize);
        //sine window (first half of a sine function)
        var sineinc = Math.PI/fftsize;
        for(var i=0;i<fftsize;++i)
            self.sine[i]=Math.sin(sineinc*i);
    }
    else if (self.windowtype!=0) {
    
        var ang=(2.0*Math.PI)/self.fftsize;
        
        self.hann = new Float32Array(self.fftsize);
    for(var i=0;i<fftsize;++i)
        self.hann[i]=0.5 - 0.5*Math.cos(ang*i);
    }
   
    //initialised containing zeroes
    self.powers = new Float32Array(self.halffftsize);
    //var freqs = result.subarray(result.length / 2);
    self.reals = new Float32Array(self.fftsize);
    
    self.complex = new Float32Array(self.fftsize+2);
    
    self.imags = new Float32Array(self.fftsize);
    
    //4 =2*2 compensates for half magnitude if only take non-conjugate part, fftsize compensates for 1/N
    self.fftnormmult = 4*self.fftsize; //*fftsize;// /4; //1.0/fftsize;  or 1/(fftsize.sqrt)
    
    self.inversereals = new Float32Array(self.fftsize);
    self.inverseimags = new Float32Array(self.fftsize);
    
    
    self.inverse = function(fftdata) {
        var k;
        
        for (k = 0; k <= self.halffftsize; ++k) {
            var twok = 2*k;
            
            //create conjugate
            self.inversereals[k] = fftdata[twok];
            self.inverseimags[k] = fftdata[twok+1]; //-1*fftdata[twok+1];
            
            //self.inversereals[self.fftsize-1-k] = self.inversereals[k];
            //self.inverseimags[self.fftsize-1-k] = self.inverseimags[k];
            
        }
        
        for (k = 1; k < self.halffftsize; ++k) {
            //var twok = 2*k;
            
            //create conjugate
            //self.inversereals[k] = fftdata[twok];
            //self.inverseimags[k] = fftdata[twok+1]; //-1*fftdata[twok+1];
            
            self.inversereals[self.fftsize-k] = self.inversereals[k];
            self.inverseimags[self.fftsize-k] = -self.inverseimags[k];
            
        }
        
//        for (k = self.halffftsize; k< self.fftsize; ++k) {
//
//            self.inversereals[k] = 0;
//            self.inverseimags[k] = 0;
//
//        }
        
        //https://www.embedded.com/dsp-tricks-computing-inverse-ffts-using-the-forward-fft/
        
        //self.mmllfft.inverseTransform(self.inversereals, self.inverseimags);
        //self.mmllfft.transform(self.inversereals, self.inverseimags);
        
        
        
        self.mmllfft.transform(self.inverseimags,self.inversereals);
        
        
        //return self.inversereals;
    }
    
    
    self.next = function(input) {
        
        //update by audioblocksize samples
        var ready = self.windowing.next(input);
        
        if(ready) {
            
            for (i = 0; i< self.fftsize; ++i)
                self.imags[i] = 0;
            
            
            //no window function (square window)
            if(self.windowtype==0) {
            for (i = 0; i< self.fftsize; ++i) {
                self.reals[i] = self.windowing.store[i];
                //self.imags[i] = 0.0;
                
            }
            } else {
                
                if(self.windowtype==2) {
                    
                    for (i = 0; i< self.fftsize; ++i) {
                        self.reals[i] = self.windowing.store[i]*self.sine[i];
                    }
                }
                    else {
                for (i = 0; i< self.fftsize; ++i) {
                    self.reals[i] = self.windowing.store[i]*self.hann[i];
                    //self.imags[i] = 0.0;
                }
                        
                }
            }
  
           //var output = self.fft.forward(self.reals);
            
            //old KissFFT
            //self.fft.forward(self.reals,self.complex);
            
            //fft library call
            self.mmllfft.transform(self.reals, self.imags);
            
            //could fill in complex data myself now
            
            for (var k = 0; k <= self.halffftsize; ++k) {
                var twok = 2*k;
                
                self.complex[twok] = self.reals[k];
                self.complex[twok+1] = self.imags[k];
                
            }
            
            
            //output format is interleaved k*2, k*2+1 real and imag parts
            //DC and 0 then bin 1 real and imag ... nyquist and 0
            
            //power spectrum not amps, for comparative testing
            for (var k = 0; k < self.halffftsize; ++k) {
                //Math.sqrt(
                
                //NO //self.powers[k] = ((output[twok] * output[twok]) + (output[twok+1] * output[twok+1]) ); // * fftnormmult;
                
                //old KissFFT
                //var twok = 2*k;
                //self.powers[k] = ((self.complex[twok] * self.complex[twok]) + (self.complex[twok+1] * self.complex[twok+1]) );
                
                //var compareme = (self.reals[k]*self.reals[k]) + (self.imags[k]*self.imags[k]);
                self.powers[k] = (self.reals[k]*self.reals[k]) + (self.imags[k]*self.imags[k]);
                
                //will scale later in onset detector itself
                
                //self.powers[k] = ((self.reals[k] * self.reals[k]) + (self.imags[k] * self.imags[k]) ); // * fftnormmult;
                
                //freqs[k - align] = (2 * k / N) * (sample_rate / 2);
            }
            
            //console.log(self.postfftfunction,'undefined');
            
            if(self.postfftfunction !== undefined)
            self.postfftfunction(self.powers,self.complex); //could pass self.complex as second argument to get phase spectrum etc
            
            
        }
        
        return ready;
        
    }
    
   

}

