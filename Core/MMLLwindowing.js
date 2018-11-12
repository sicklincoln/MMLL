//gather data for a certain window size and hop size (for example, as prelude to short term Fourier transform)

//MMLL = Musical Machine Listening Library MMLL.js
function MMLLwindowing(windowsize=1024,hopsize=512) {
    
    this.windowsize = windowsize;
    
    if(hopsize>windowsize) hopsize = windowsize;
    
    this.hopsize = hopsize;
    this.overlap = windowsize - hopsize;
    
    this.store = new Array(windowsize);
    
    //only zero old data
    for (var ii=0; ii<this.overlap; ++ii)
        this.store[ii] = 0;
        
    this.storepointer = this.overlap;

    this.next = function(input) {
        
        var n = input.length; //code assumes n divides hopsize
        
        var result = false;
        
        
        //if just output a window of data
        //copy and update storepointer position
        if(this.storepointer>=this.windowsize) {
            
            for (var i=0; i<this.overlap; ++i)
                this.store[i] = this.store[this.hopsize+i];
                
                this.storepointer = this.overlap;
           
            
            
        }
        
        if((this.storepointer+n)>=this.windowsize) {
            n = this.windowsize - this.storepointer;
            //just in case doesn't fit exactly, don't bother if really going to wrap around since unresolvable issue if  overwrite buffer or multiple wraps in one go anyway
            
            result = true;
            
        }
        for (var i=0; i<n; ++i) {
            this.store[this.storepointer+i] = input[i];
            
        }
        
        
        this.storepointer = (this.storepointer + n); //%(this.windowsize);
     
        
//        if(this.storepointer ==0) {
//         
//            console.log("back to zero index");
//        }
 
        return result;
        
    }
    
   

}

