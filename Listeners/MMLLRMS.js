
function MMLLRMS(sampleRate, windowsize=2048,hopsize=1024) {
    
    var self = this; 
   
    self.setup = function(sampleRate, windowsize=2048,hopsize=1024) {
   
        //self.m_srate = sampleRate;
        self.windowsize_ = windowsize;
    
        self.windowing_ = new MMLLwindowing(windowsize,hopsize);
        
        self.rms_ = 0.0;
        
    }
    
    self.setup(sampleRate,windowsize,hopsize);
    
    self.next = function(input) {
        
        var i,j;
        
        var ready = self.windowing_.next(input);
        
        if(ready) {

            var store = self.windowing_.store;
            
            var temp;
            
            var sum = 0;
            
            for (j=0; j<self.windowsize_; ++j) {
                
                temp = store[j];
                
                sum += temp*temp;
            }
  
            self.rms_ =  Math.sqrt(sum/self.windowsize_);
            
        }
        
        return self.rms_;
   
    }
    
    
}


