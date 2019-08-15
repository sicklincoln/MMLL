//Based on an informal juxtaposition of perceptual coding, and a Zwicker and Glasberg/Moore/Stone loudness model.
//ported from SC UGen Loudness created 8 Nov 2007
//requires sine windowing for correct calibration

function MMLLLoudness(sampleRate,fftsize=1024,hopsize=512,smask=0.25,tmask=1) {
    
    var self = this;

    //[43]
    self.eqlbandbins = [1,2,3,4,5,6,7,8,9,11,13,15,17,19,22,25,28,32,36,41,46,52,58,65,73,82,92,103,116,129,144,161,180,201,225,251,280,312,348,388,433,483,513];
    //[42]
    //last entry was 30, corrected to 29 to avoid grabbing nyquist value, only half fftsize bins actually calculated for power
    //safe anyway since only 40 ERB bands used
    self.eqlbandsizes = [1,1,1,1,1,1,1,1,2,2,2,2,2,3,3,3,4,4,5,5,6,6,7,8,9,10,11,13,13,15,17,19,21,24,26,29,32,36,40,45,50,29];
    
    //[42][11]
    self.contours = [[ 47.88, 59.68, 68.55, 75.48, 81.71, 87.54, 93.24, 98.84,104.44,109.94,115.31],[ 29.04, 41.78, 51.98, 60.18, 67.51, 74.54, 81.34, 87.97, 94.61,101.21,107.74],[ 20.72, 32.83, 43.44, 52.18, 60.24, 67.89, 75.34, 82.70, 89.97, 97.23,104.49],[ 15.87, 27.14, 37.84, 46.94, 55.44, 63.57, 71.51, 79.34, 87.14, 94.97,102.37],[ 12.64, 23.24, 33.91, 43.27, 52.07, 60.57, 68.87, 77.10, 85.24, 93.44,100.90],[ 10.31, 20.43, 31.03, 40.54, 49.59, 58.33, 66.89, 75.43, 83.89, 92.34,100.80],[  8.51, 18.23, 28.83, 38.41, 47.65, 56.59, 65.42, 74.16, 82.89, 91.61,100.33],[  7.14, 16.55, 27.11, 36.79, 46.16, 55.27, 64.29, 73.24, 82.15, 91.06, 99.97],[  5.52, 14.58, 25.07, 34.88, 44.40, 53.73, 62.95, 72.18, 81.31, 90.44, 99.57],[  3.98, 12.69, 23.10, 32.99, 42.69, 52.27, 61.66, 71.15, 80.54, 89.93, 99.31],[  2.99, 11.43, 21.76, 31.73, 41.49, 51.22, 60.88, 70.51, 80.11, 89.70, 99.30],[  2.35, 10.58, 20.83, 30.86, 40.68, 50.51, 60.33, 70.08, 79.83, 89.58, 99.32],[  2.05, 10.12, 20.27, 30.35, 40.22, 50.10, 59.97, 69.82, 79.67, 89.52, 99.38],[  2.00,  9.93, 20.00, 30.07, 40.00, 49.93, 59.87, 69.80, 79.73, 89.67, 99.60],[  2.19, 10.00, 20.00, 30.00, 40.00, 50.00, 59.99, 69.99, 79.98, 89.98, 99.97],[  2.71, 10.56, 20.61, 30.71, 40.76, 50.81, 60.86, 70.96, 81.01, 91.06,101.17],[  3.11, 11.05, 21.19, 31.41, 41.53, 51.64, 61.75, 71.95, 82.05, 92.15,102.33],[  2.39, 10.69, 21.14, 31.52, 41.73, 51.95, 62.11, 72.31, 82.46, 92.56,102.59],[  1.50, 10.11, 20.82, 31.32, 41.62, 51.92, 62.12, 72.32, 82.52, 92.63,102.56],[ -0.17,  8.50, 19.27, 29.77, 40.07, 50.37, 60.57, 70.77, 80.97, 91.13,101.23],[ -1.80,  6.96, 17.77, 28.29, 38.61, 48.91, 59.13, 69.33, 79.53, 89.71, 99.86],[ -3.42,  5.49, 16.36, 26.94, 37.31, 47.61, 57.88, 68.08, 78.28, 88.41, 98.39],[ -4.73,  4.38, 15.34, 25.99, 36.39, 46.71, 57.01, 67.21, 77.41, 87.51, 97.41],[ -5.73,  3.63, 14.74, 25.48, 35.88, 46.26, 56.56, 66.76, 76.96, 87.06, 96.96],[ -6.24,  3.33, 14.59, 25.39, 35.84, 46.22, 56.52, 66.72, 76.92, 87.04, 97.00],[ -6.09,  3.62, 15.03, 25.83, 36.37, 46.70, 57.00, 67.20, 77.40, 87.57, 97.68],[ -5.32,  4.44, 15.90, 26.70, 37.28, 47.60, 57.90, 68.10, 78.30, 88.52, 98.78],[ -3.49,  6.17, 17.52, 28.32, 38.85, 49.22, 59.52, 69.72, 79.92, 90.20,100.61],[ -0.81,  8.58, 19.73, 30.44, 40.90, 51.24, 61.52, 71.69, 81.87, 92.15,102.63],[  2.91, 11.82, 22.64, 33.17, 43.53, 53.73, 63.96, 74.09, 84.22, 94.45,104.89],[  6.68, 15.19, 25.71, 36.03, 46.25, 56.31, 66.45, 76.49, 86.54, 96.72,107.15],[ 10.43, 18.65, 28.94, 39.02, 49.01, 58.98, 68.93, 78.78, 88.69, 98.83,109.36],[ 13.56, 21.65, 31.78, 41.68, 51.45, 61.31, 71.07, 80.73, 90.48,100.51,111.01],[ 14.36, 22.91, 33.19, 43.09, 52.71, 62.37, 71.92, 81.38, 90.88,100.56,110.56],[ 15.06, 23.90, 34.23, 44.05, 53.48, 62.90, 72.21, 81.43, 90.65, 99.93,109.34],[ 15.36, 23.90, 33.89, 43.31, 52.40, 61.42, 70.29, 79.18, 88.00, 96.69,105.17],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70]];
    //[11]
    self.phons = [2,10,20,30,40,50,60,70,80,90,100];
    
    //fftsize=1024,hopsize=512,
    self.setup = function(sampleRate,smask=0.25,tmask=1) {
        var i;
        
        self.m_srate = sampleRate;
        
        if(sampleRate < (44100*2)) {
            
            self.stft = new MMLLSTFT(1024,512,2); // 2 = sine window
            
        } else {
            
            self.stft = new MMLLSTFT(2048,1024,2);
        }
        
        
        self.m_numbands= 42;
        
        self.m_ERBbands = new Array(self.m_numbands);
        
        for (var k=0; k<self.m_numbands; ++k)
            self.m_ERBbands[k] = 0; 
            
        
        //self.fftsize_ = fftsize;
        //self.hopsize_ = hopsize;
        //self.stft = new MMLLSTFT(self.fftsize_,self.hopsize_,2); //sine windowing
        self.smask = smask;
        self.tmask = tmask;
       
       
        self.loudness_ = 0;
        
    }
    
    //fftsize,hopsize,
    self.setup(sampleRate,smask,tmask);
    
    //must pass in fft data (power spectrum)
    self.next = function(input) {
        
        //var i,j;
        var h,j,k;
        
        var ready = self.stft.next(input);
        
        if(ready) {
            
            var bandstart, bandsize, bandend, bsum;
            
            var db, prop;
            
            var power, lastpower, temp;
            
            var fftbuf = self.stft.powers;
            
            var loudsum = 0;
            
            for (k=0; k<self.m_numbands; ++k){
                
                bandstart = self.eqlbandbins[k];
                //int bandend=eqlbandbins[k+1];
                bandsize = self.eqlbandsizes[k];
                bandend = bandstart+bandsize;
                
                bsum = 0;
                
                lastpower = 0;
                
                for (h=bandstart; h<bandend;++h) {
           
                    power = fftbuf[h];
                    
                    //would involve spectral masking here
                    temp = lastpower*smask;
                    //sideways spectral masking with leaky integration
                    if(temp>power) power = temp;
                    
                    lastpower = power;
                    
                    //psychophysical sensation; within critical band, sum using a p metric, (sum m^p)^(1/p)
                    //compresses the gain
                    
                    //power of three combination
                    //bsum= bsum+(power*power*power);
                    
                    //won't sum up power very well
                    //if(power>bsum) bsum=power;
                    
                    bsum = bsum+power;
                    
                }
                
                //store recips of bandsizes?
                //why average? surely just take max or sum is better!
                //bsum= bsum/bandsize;
                
                //into dB, avoid log of 0
                //float db= 10*log10((bsum*10000000)+0.001);
                //float db= 10*log10((bsum*32382)+0.001);
                //empricially derived 32382*2.348
                
                db = 10*Math.log10((bsum*76032.936)+0.001); //correct multipler until you get loudness output of 1!
                
                //correcting for power of three combination
                //bsum=bsum+0.001;
                //4.8810017610244 = log10(76032.936)
                //float db= 10*((0.33334*log10(bsum)) + 4.8810017610244); //correct multipler until you get loudness output of 1!
                
                
                //printf("bsum %f db %f \n",bsum,db);
                
                //convert via contour
                if(db<self.contours[k][0]) db=0;
                else if (db>self.contours[k][10]) db=self.phons[10];
                else {
                    
                    prop=0.0;
                    
                    for (j=1; j<11; ++j) {
                        if(db<self.contours[k][j]) {
                            prop= (db-self.contours[k][j-1])/(self.contours[k][j]-self.contours[k][j-1]);
                            break;
                        }
                        
                        if ( j == 10 ) {
                            prop = 1.0;
                            break; // avoid j becoming 11 to avoid out-of-bounds access in db calculation
                        }
                    }
                    
                    
                    db = ((1-prop)*self.phons[j-1])+ (prop*self.phons[j]);
                    //printf("prop %f db %f j %d\n",prop,db,j);
                }
                
                //spectralmasking, 6dB drop per frame?
                //try also with just take db
                
                temp = (self.m_ERBbands[k]) - tmask;
                
                if(db>temp) temp = db;
                
                self.m_ERBbands[k] = temp;
                
                //printf("db %f erbband %f \n",db, unit->m_ERBbands[k]);
                
                //must sum as intensities, not dbs once corrected, pow used to be other way around
                //loudsum+= ((pow(10, 0.1*unit->m_ERBbands[k])-0.001)*0.0000308813538386); //
                
                loudsum += Math.pow(10, 0.1*self.m_ERBbands[k])-0.001; //multiplier not needed since invert below; can trust no overflow?
            }
            
            
            
            //total excitation, correct back to dB scale in phons
            //float phontotal= 10*log10((loudsum*32382)+0.001);
            var phontotal= 10*Math.log10((loudsum)+0.001); //didn't use divisor above, so no need to restore here
            
            //unit->m_phontotal= phontotal;
            //now to sones:
            /* from Praat: Excitation.c  Sones = 2 ** ((Phones - 40) / 10)  */
            self.loudness_ = Math.pow(2, (phontotal - 40) / 10);

          
        }
        
        
        //ZOUT0(i) = self.dissonance_;
        return self.loudness_;
        
        //return ready;
        
    }
    
    
}


