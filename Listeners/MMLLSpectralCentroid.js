
//sampleRate
function MMLLSpectralCentroid(sampleRate, fftsize=2048,hopsize=1024) {
    
    var self = this; 
    
    //sampleRate
    self.setup = function(sampleRate, fftsize=2048,hopsize=1024) {
        var i;
        
        //self.m_srate = sampleRate;
        self.fftsize_ = fftsize;
        
        self.nyquistbin_ = fftsize/2;
        
        self.stft = new MMLLSTFT(self.fftsize_,hopsize,1);

        //self.frequencyperbin_ = self.m_srate / self.fftsize_;
        
        self.spectralcentroid_ = 0.1;
        
    }
    
    self.setup(sampleRate, fftsize,hopsize);
    
    //must pass in fft data (power spectrum)
    self.next = function(input) {
        
        var i,j;
        
        var ready = self.stft.next(input);
        
        if(ready) {

            var fftbuf = self.stft.powers;
            
            var frequencyperbin = self.frequencyperbin_;
            
            var sumpower = 1.0; //start at 1 to avoid divide by zero
            var sum = 0.0;
            
            //float totalpeakpower = 0.0f;
            var intensity;
            
            for (j=1; j<self.nyquistbin_; ++j) {

                intensity = fftbuf[j];

                sumpower += intensity;

                sum += j*intensity;

            }
    
            self.spectralcentroid_ = (sum/sumpower)/self.fftsize_;
            
        }
            
            
        return self.spectralcentroid_;
   
    }
    
    
}


