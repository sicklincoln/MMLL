
function MMLLSpectralPercentile(sampleRate, percentile=0.8,fftsize=2048,hopsize=1024) {
    
    var self = this; 
    
    self.percentile = percentile;
    
    self.setup = function(sampleRate, fftsize=2048,hopsize=1024) {
        var i;
        
        //self.m_srate = sampleRate;
        self.fftsize_ = fftsize;
        
        self.nyquistbin_ = fftsize/2;

        self.stft = new MMLLSTFT(self.fftsize_,hopsize,1);
        
        self.spectralpercentile_ = 0.1;
        
    }
    
    self.setup(sampleRate, fftsize,hopsize);
    
    //must pass in fft data (power spectrum)
    self.next = function(input) {
        
        var i,j;
        
        var ready = self.stft.next(input);
        
        if(ready) {

            var fftbuf = self.stft.powers;
            
            var frequencyperbin = self.frequencyperbin_;
            
            var sumpower = 0.0; //start at 1 to avoid divide by zero
            var targetpower;
            
            //float totalpeakpower = 0.0f;
            var intensity;
            
            for (j=0; j<self.nyquistbin_; ++j) {
                
                intensity = fftbuf[j];
                
                sumpower += intensity;
            }
    
            targetpower = self.percentile * sumpower;
            
            var whichbin = 0;
            
            sumpower = 0.0;
            
            for (j=0; j<self.nyquistbin_; ++j) {
                
                intensity = fftbuf[j];
                
                sumpower += intensity;
                
                if(sumpower>=targetpower) {
                    
                    whichbin = j;
                    
                    break;
                }
            }

            self.spectralpercentile_ =  whichbin/self.nyquistbin_;
            
        }
        
        return self.spectralpercentile_;
   
    }
    
    
}


