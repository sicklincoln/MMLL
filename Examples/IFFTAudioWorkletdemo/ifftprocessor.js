
class IFFTProcessor extends AudioWorkletProcessor {
    
    //not allowed in a class, an only declare variables within constructor
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
    //var self = this;
    
    
    // Custom AudioParams can be defined with this static getter.
    static get parameterDescriptors() {
        return [{ name: 'gain', defaultValue: 1 },
                { name: 'numholes', defaultValue: 0 },
                { name: 'lpcutoff', defaultValue: 1024 }];
        
//        [{
//         name: 'customGain',
//         defaultValue: 1,
//         minValue: 0,
//         maxValue: 1,
//         automationRate: 'a-rate'
//         }]
    }
    
    //https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor/AudioWorkletProcessor
    //how to pass own argument to constructor
    
    constructor(options) {
        // The super constructor call is required.
        super();
        
        //console.log(options.numberOfInputs);
        
        //console.log(options.processorOptions.someUsefulVariable);
        
        //this.featureextractor =  new MMLLSensoryDissonance(sampleRate);
        //options.processorOptions.someUsefulVariable;
        
        this.fftsize = 1024;
        this.hopsize = 512;
        
        this.scalefactor = 1.0/this.fftsize;
        
        this.numholes = 0;
        this.lpcutoff = 1024;
        
        this.ifftoutput = new Float32Array(this.fftsize);
        this.oaoutput = new Float32Array(this.hopsize);
        this.oaoutputoffset = 0;
        
        this.stft = new MMLLSTFT(this.fftsize,this.hopsize,0); //no windowing
        
        
        this.overlapadd = new MMLLOverlapAdd(this.fftsize,this.hopsize,1); //triangle windows
        
        this.port.onmessage = (event) => {
            // Handling data from the node.
            console.log('IFFTProcessor',event.data);
        };
        
        //this.port.postMessage('Hi!');
    }
    
    
    //every 128 samples https://developer.mozilla.org/en-US/docs/Web/API/AudioWorkletProcessor
    process(inputs, outputs, parameters) {
        const input = inputs[0][0];
        const output = outputs[0];
        
        //not stereo, just operate on mono for now (otherwise duplicate code in parallel for left and right streams)
        var ready = this.stft.next(input);
        
        if(ready) {
            
            var i;
            
            var fftdata = this.stft.complex;
            
            
            const holes = parameters['numholes'];
            var holesnow = holes[0];
            
            //zero random values
            for(i=0; i<holesnow; ++i) {
                var where = Math.floor(Math.random()* this.fftsize);
                
                fftdata[where] = 0.0;
            }
            
            const lpcutoff = parameters['lpcutoff'];
            var lpcutoffnow = lpcutoff[0];
            
            //low pass
            //<= to account for Nyquist bin at the top
            for(i=(2*lpcutoffnow); i<=this.fftsize; ++i) {
                fftdata[i] = 0.0;
            }
            
            this.stft.inverse(fftdata);
            
            for(i=0; i<this.fftsize; ++i)
                this.ifftoutput[i] = this.stft.inversereals[i] * this.scalefactor;
            
            this.overlapadd.next(this.ifftoutput,this.oaoutput);
            
            this.oaoutputoffset = 0;
            
        }
        
        //copy from oaoutput to actual sample output
    
        var offset = this.oaoutputoffset;
        
        const gain = parameters['gain'];
        var gainnow = gain[0];
        
        for (let channel = 0; channel < inputs[0].length; ++channel) {
            //const inputChannel = input[channel];
            const outputChannel = output[channel];
            
            for (i = 0; i < input.length; ++i) {
                
                var valnow = this.oaoutput[offset+i];
                
                outputChannel[i] = valnow * gainnow;
                
            }
            
        }
        
        this.oaoutputoffset =  (this.oaoutputoffset + 128)%512;
        
        
        //assumes input mono array of float samples
        //var dissonance = this.featureextractor.next(input[0]);
        
        //this.port.postMessage(dissonance);
       
        return true;
    }
}

registerProcessor('ifft-processor', IFFTProcessor);
