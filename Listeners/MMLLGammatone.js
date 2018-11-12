//Nick Collins 22/06/18 adapted from SC UGen in sc3-plugins
//based on V Hohmann Frequency analysis and synthesis using a Gammatone filterbank Acta Acustica vol 88 (2002): 433--442
//converted to straight struct form for SuperCollider from my own GammatoneComplexBandpass class code

function MMLLGammatone(samplingrate=44100) {
    
    //double precision where possible, use Float64

    this.samplingrate = samplingrate
    this.samplingperiod = 1.0/samplingrate;
	this.nyquist = samplingrate*0.5;
	
 
this.setup = function(centrefrequency,bandwidth) {
	var i,j;
    
	if (centrefrequency< 20.0) centrefrequency = 20.0;
	if (centrefrequency>this.nyquist) centrefrequency = this.nyquist;
	
	if ((centrefrequency-(0.5*bandwidth))<1.0) bandwidth = 2.0*(centrefrequency-1.0);

	if (bandwidth>this.nyquist) bandwidth = this.nyquist; //assuming there is even room!
 
	this.centrefrequency = centrefrequency;
	
	//actually need to convert ERBs to 3dB bandwidth
	bandwidth = 0.887*bandwidth; //converting to 3dB bandwith in Hz, 	//PH96 pg 3
	
	this.bandwidth = bandwidth;
	
	// filter coefficients to calculate, p.435 hohmann paper
	
	var beta = 6.2831853071796*this.centrefrequency*this.samplingperiod;
	var phi = 3.1415926535898*this.bandwidth*this.samplingperiod;
	var p =  (1.6827902832904*Math.cos(phi) -2)*6.3049771007832;
	var lambda = (p*(-0.5))-(Math.sqrt(p*p*0.25-1.0));
	
	this.reala = lambda*Math.cos(beta);
	this.imaga = lambda*Math.sin(beta);
	
	//avoid b= 0 or Nyquist, otherise must remove factor of 2.0 here
	this.normalisation= 2.0*(Math.pow(1-Math.abs(lambda),4));
	
	this.oldreal = [0,0,0,0]; //[4];
	this.oldimag = [0,0,0,0]; //[4];

}




    
//adapting zapgremlins from SC_InlineUnaryOp.h for denormal prevention
//see also similar algorithm in https://www.boost.org/doc/libs/1_51_0/boost/math/special_functions/fpclassify.hpp (used by CheckBadValues in SC)
this.next = function(input,output,numSamples) {

    var i,j;
    
    var newreal, newimag;
	
	var reala = this.reala;
	var imaga = this.imaga;
	var normalisation = this.normalisation;
	
    var absx;
    
	for (i=0; i<numSamples; ++i) {
		
		newreal = input[i]; //real input
		newimag = 0.0;
		
		for (j=0; j<4; ++j) {
			
			newreal = newreal + (reala*this.oldreal[j])-(imaga*this.oldimag[j]);
			newimag = newimag + (reala*this.oldimag[j])+(imaga*this.oldreal[j]);
			
			this.oldreal[j] = newreal; //zapgremlins(newreal); //trying to avoid denormals which mess up processing via underflow
			this.oldimag[j] = newimag; //zapgremlins(newimag);
            
            absx = Math.abs(newreal);
            
            //return (absx > (float32)1e-15 && absx < (float32)1e15) ? x : (float32)0.;
            this.oldreal[j] = (absx > 1e-15 && absx < 1e15) ? newreal : 0.;
            
            absx = Math.abs(newimag);
            
            this.oldimag[j] = (absx > 1e-15 && absx < 1e15) ? newimag : 0.;
            
            
		}
		
		output[i] = newreal*normalisation;
		
		//imaginary output too could be useful
		
	}

    
}

}





