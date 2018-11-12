//Nick Collins 22/06/18 adapted from HairCell SC UGen in sc3-plugins


function MMLLHairCell(samplingrate=44100) {
    
    this.samplingrate = samplingrate
    
    this.dt = 1.0/this.samplingrate;
    //gain=0.5;
    this.loss=0.99;
    //loss2=0.9;
    
    this.store = 1.0;
    this.minflow = 0.0; //(1.0/0.01)*dt;	//no spontaneous firing
    this.restoreflow = (1.0/0.001)*this.dt;
    this.feedflow = (this.restoreflow-this.minflow)*2.8284271247462; //2 times root 2, because rectification means effective only half a cycle, and RMS of 1/root2 must be compensated for
    
    //firingdelay= (int) (samplingrate*0.01); //(int) (samplingrate*0.001);
    //countsincelastfired=1;
    
    this.level = 0.0;
    this.outputlevel = 0.0;
    
    
    this.updateminflow = function(minflow=0) {
        if(minflow<0) minflow = 0;
		if(minflow>20000) minflow = 20000;
		
        this.minflow = this.dt*2.8284271247462*minflow; //compensation for half cycle and RMS
    }
    
    this.updatefeedflow = function(feedflow=200) {
        if(feedflow<0) feedflow = 0;
		if(feedflow>20000) feedflow = 20000;
		
        this.feedflow = this.dt*2.8284271247462*feedflow;
    }
    
    this.updaterestoreflow = function(restoreflow=1000) {
        if(restoreflow<0) restoreflow = 0;
		if(restoreflow>20000) restoreflow = 20000;
		
        this.restoreflow = this.dt*restoreflow;
    }
    
    this.updateloss = function(loss=0) {
        if(loss<0) loss = 0;
		if(loss>1) loss = 1;
		
        this.loss = loss;
    }
    
    this.update = function(minflow=0,feedflow=200,restoreflow=1000,loss=0.99) {
		
        this.updateminflow(minflow);
        this.updatefeedflow(feedflow);
        this.updaterestoreflow(restoreflow);
        this.updateloss(loss);
 
    }
    
    this.next = function(input,output,numSamples) {
        
        var i;
        var latest;
        var newflow;
        
        for (i=0; i<numSamples; ++i) {
            
            latest = input[i];
            
            //halfwave rectification and potential nonlinearity
            if(latest<0.0) latest=0.0;
            //else latest= latest; //sqrt(latest); //*latest; //or square root, or whatever
            
            newflow = this.minflow+(this.feedflow*latest);
            
            if(newflow>this.store) newflow = this.store;
            
            //if enough transmitter available
            this.store -= newflow;
            
            if(this.store<0.0) this.store = 0.0;
            
            this.level += newflow;
            
            if(this.level>1.0){
                
                //assuming 100 Hz resting rate
                this.outputlevel = 1.0; //could make peak dependent on how long it took it get there
                
                this.level = 0.0; //hair cell wiped out
                
            }
            
            this.store += this.restoreflow;
            
            output[i] = this.outputlevel;
            
            this.outputlevel *= this.loss;
            
        }
        
        
    }
    
}





