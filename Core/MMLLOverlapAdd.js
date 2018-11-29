//output overlapped windows of samples for a certain window size and hop size (for example, as postlude to short term Fourier transform)

//hopsize is length of cross fade, square or triangular window for now

//assumes hopsize <= windowsize/2

function MMLLOverlapAdd(windowsize=1024,hopsize=512,windowtype=0) {
    
    this.windowsize = windowsize;
    
    if(hopsize>windowsize) hopsize = windowsize;
    
    this.hopsize = hopsize;
    this.overlap = windowsize - hopsize;
    
    this.store = new Array(windowsize);
    
    //start zeroed, will be summing to this buffer
    for (var ii=0; ii<this.windowsize; ++ii)
        this.store[ii] = 0;
        
    //this.outputpointer = 0; //this.overlap;

    //input is windowsize long, output will be hopsize long
    this.next = function(input,output) {
 
        //copy data backwards in store by hopsize
        
        var i;
        
        for (i=0; i<this.overlap; ++i) {
            
            this.store[i] = this.store[this.hopsize+i];
        }
        
        //zero end part
        
        for (i=0; i<this.hopsize; ++i) {
            
            this.store[this.hopsize+i] = 0.0;
        }
        
        //sum in new data, windowed appropriately
        
        if(windowtype==0) {
            
            for (var i=0; i<this.windowsize; ++i)
                this.store[i] += input[i];
            
                } else {
                    
                    //triangular windows for linear cross fade for now...
                    var prop;
                    var mult = 1.0/this.hopsize;
                    var index;
                    
                    for (var i=0; i<this.hopsize; ++i) {
                        
                        prop = i*mult;
                        
                        this.store[i] += input[i]*prop;
                        
                        index = this.windowsize-1-i;
                        
                        this.store[index] += input[index]*prop;
                    }
                    
                    for (var i=this.hopsize; i<this.overlap; ++i)
                        this.store[i] += input[i];
                    
                }
        
       
        for (var i=0; i<this.hopsize; ++i) {
            output[i] = this.store[i];
            
        }
        
        //return result;
        
    }
    
   

}

