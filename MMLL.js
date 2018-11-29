var KissFFTModule = function(KissFFTModule) {
  KissFFTModule = KissFFTModule || {};
  var Module = KissFFTModule;

var Module;if(!Module)Module=(typeof KissFFTModule!=="undefined"?KissFFTModule:null)||{};var moduleOverrides={};for(var key in Module){if(Module.hasOwnProperty(key)){moduleOverrides[key]=Module[key]}}var ENVIRONMENT_IS_WEB=false;var ENVIRONMENT_IS_WORKER=false;var ENVIRONMENT_IS_NODE=false;var ENVIRONMENT_IS_SHELL=false;if(Module["ENVIRONMENT"]){if(Module["ENVIRONMENT"]==="WEB"){ENVIRONMENT_IS_WEB=true}else if(Module["ENVIRONMENT"]==="WORKER"){ENVIRONMENT_IS_WORKER=true}else if(Module["ENVIRONMENT"]==="NODE"){ENVIRONMENT_IS_NODE=true}else if(Module["ENVIRONMENT"]==="SHELL"){ENVIRONMENT_IS_SHELL=true}else{throw new Error("The provided Module['ENVIRONMENT'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.")}}else{ENVIRONMENT_IS_WEB=typeof window==="object";ENVIRONMENT_IS_WORKER=typeof importScripts==="function";ENVIRONMENT_IS_NODE=typeof process==="object"&&typeof require==="function"&&!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_WORKER;ENVIRONMENT_IS_SHELL=!ENVIRONMENT_IS_WEB&&!ENVIRONMENT_IS_NODE&&!ENVIRONMENT_IS_WORKER}if(ENVIRONMENT_IS_NODE){if(!Module["print"])Module["print"]=console.log;if(!Module["printErr"])Module["printErr"]=console.warn;var nodeFS;var nodePath;Module["read"]=function shell_read(filename,binary){if(!nodeFS)nodeFS=require("fs");if(!nodePath)nodePath=require("path");filename=nodePath["normalize"](filename);var ret=nodeFS["readFileSync"](filename);return binary?ret:ret.toString()};Module["readBinary"]=function readBinary(filename){var ret=Module["read"](filename,true);if(!ret.buffer){ret=new Uint8Array(ret)}assert(ret.buffer);return ret};Module["load"]=function load(f){globalEval(read(f))};if(!Module["thisProgram"]){if(process["argv"].length>1){Module["thisProgram"]=process["argv"][1].replace(/\\/g,"/")}else{Module["thisProgram"]="unknown-program"}}Module["arguments"]=process["argv"].slice(2);process["on"]("uncaughtException",(function(ex){if(!(ex instanceof ExitStatus)){throw ex}}));Module["inspect"]=(function(){return"[Emscripten Module object]"})}else if(ENVIRONMENT_IS_SHELL){if(!Module["print"])Module["print"]=print;if(typeof printErr!="undefined")Module["printErr"]=printErr;if(typeof read!="undefined"){Module["read"]=read}else{Module["read"]=function shell_read(){throw"no read() available"}}Module["readBinary"]=function readBinary(f){if(typeof readbuffer==="function"){return new Uint8Array(readbuffer(f))}var data=read(f,"binary");assert(typeof data==="object");return data};if(typeof scriptArgs!="undefined"){Module["arguments"]=scriptArgs}else if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof quit==="function"){Module["quit"]=(function(status,toThrow){quit(status)})}}else if(ENVIRONMENT_IS_WEB||ENVIRONMENT_IS_WORKER){Module["read"]=function shell_read(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.send(null);return xhr.responseText};if(ENVIRONMENT_IS_WORKER){Module["readBinary"]=function readBinary(url){var xhr=new XMLHttpRequest;xhr.open("GET",url,false);xhr.responseType="arraybuffer";xhr.send(null);return new Uint8Array(xhr.response)}}Module["readAsync"]=function readAsync(url,onload,onerror){var xhr=new XMLHttpRequest;xhr.open("GET",url,true);xhr.responseType="arraybuffer";xhr.onload=function xhr_onload(){if(xhr.status==200||xhr.status==0&&xhr.response){onload(xhr.response)}else{onerror()}};xhr.onerror=onerror;xhr.send(null)};if(typeof arguments!="undefined"){Module["arguments"]=arguments}if(typeof console!=="undefined"){if(!Module["print"])Module["print"]=function shell_print(x){console.log(x)};if(!Module["printErr"])Module["printErr"]=function shell_printErr(x){console.warn(x)}}else{var TRY_USE_DUMP=false;if(!Module["print"])Module["print"]=TRY_USE_DUMP&&typeof dump!=="undefined"?(function(x){dump(x)}):(function(x){})}if(ENVIRONMENT_IS_WORKER){Module["load"]=importScripts}if(typeof Module["setWindowTitle"]==="undefined"){Module["setWindowTitle"]=(function(title){document.title=title})}}else{throw"Unknown runtime environment. Where are we?"}function globalEval(x){eval.call(null,x)}if(!Module["load"]&&Module["read"]){Module["load"]=function load(f){globalEval(Module["read"](f))}}if(!Module["print"]){Module["print"]=(function(){})}if(!Module["printErr"]){Module["printErr"]=Module["print"]}if(!Module["arguments"]){Module["arguments"]=[]}if(!Module["thisProgram"]){Module["thisProgram"]="./this.program"}if(!Module["quit"]){Module["quit"]=(function(status,toThrow){throw toThrow})}Module.print=Module["print"];Module.printErr=Module["printErr"];Module["preRun"]=[];Module["postRun"]=[];for(var key in moduleOverrides){if(moduleOverrides.hasOwnProperty(key)){Module[key]=moduleOverrides[key]}}moduleOverrides=undefined;var Runtime={setTempRet0:(function(value){tempRet0=value;return value}),getTempRet0:(function(){return tempRet0}),stackSave:(function(){return STACKTOP}),stackRestore:(function(stackTop){STACKTOP=stackTop}),getNativeTypeSize:(function(type){switch(type){case"i1":case"i8":return 1;case"i16":return 2;case"i32":return 4;case"i64":return 8;case"float":return 4;case"double":return 8;default:{if(type[type.length-1]==="*"){return Runtime.QUANTUM_SIZE}else if(type[0]==="i"){var bits=parseInt(type.substr(1));assert(bits%8===0);return bits/8}else{return 0}}}}),getNativeFieldSize:(function(type){return Math.max(Runtime.getNativeTypeSize(type),Runtime.QUANTUM_SIZE)}),STACK_ALIGN:16,prepVararg:(function(ptr,type){if(type==="double"||type==="i64"){if(ptr&7){assert((ptr&7)===4);ptr+=4}}else{assert((ptr&3)===0)}return ptr}),getAlignSize:(function(type,size,vararg){if(!vararg&&(type=="i64"||type=="double"))return 8;if(!type)return Math.min(size,8);return Math.min(size||(type?Runtime.getNativeFieldSize(type):0),Runtime.QUANTUM_SIZE)}),dynCall:(function(sig,ptr,args){if(args&&args.length){return Module["dynCall_"+sig].apply(null,[ptr].concat(args))}else{return Module["dynCall_"+sig].call(null,ptr)}}),functionPointers:[],addFunction:(function(func){for(var i=0;i<Runtime.functionPointers.length;i++){if(!Runtime.functionPointers[i]){Runtime.functionPointers[i]=func;return 2*(1+i)}}throw"Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS."}),removeFunction:(function(index){Runtime.functionPointers[(index-2)/2]=null}),warnOnce:(function(text){if(!Runtime.warnOnce.shown)Runtime.warnOnce.shown={};if(!Runtime.warnOnce.shown[text]){Runtime.warnOnce.shown[text]=1;Module.printErr(text)}}),funcWrappers:{},getFuncWrapper:(function(func,sig){if(!func)return;assert(sig);if(!Runtime.funcWrappers[sig]){Runtime.funcWrappers[sig]={}}var sigCache=Runtime.funcWrappers[sig];if(!sigCache[func]){if(sig.length===1){sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func)}}else if(sig.length===2){sigCache[func]=function dynCall_wrapper(arg){return Runtime.dynCall(sig,func,[arg])}}else{sigCache[func]=function dynCall_wrapper(){return Runtime.dynCall(sig,func,Array.prototype.slice.call(arguments))}}}return sigCache[func]}),getCompilerSetting:(function(name){throw"You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work"}),stackAlloc:(function(size){var ret=STACKTOP;STACKTOP=STACKTOP+size|0;STACKTOP=STACKTOP+15&-16;return ret}),staticAlloc:(function(size){var ret=STATICTOP;STATICTOP=STATICTOP+size|0;STATICTOP=STATICTOP+15&-16;return ret}),dynamicAlloc:(function(size){var ret=HEAP32[DYNAMICTOP_PTR>>2];var end=(ret+size+15|0)&-16;HEAP32[DYNAMICTOP_PTR>>2]=end;if(end>=TOTAL_MEMORY){var success=enlargeMemory();if(!success){HEAP32[DYNAMICTOP_PTR>>2]=ret;return 0}}return ret}),alignMemory:(function(size,quantum){var ret=size=Math.ceil(size/(quantum?quantum:16))*(quantum?quantum:16);return ret}),makeBigInt:(function(low,high,unsigned){var ret=unsigned?+(low>>>0)+ +(high>>>0)*+4294967296:+(low>>>0)+ +(high|0)*+4294967296;return ret}),GLOBAL_BASE:8,QUANTUM_SIZE:4,__dummy__:0};Module["Runtime"]=Runtime;var ABORT=0;var EXITSTATUS=0;function assert(condition,text){if(!condition){abort("Assertion failed: "+text)}}function getCFunc(ident){var func=Module["_"+ident];if(!func){try{func=eval("_"+ident)}catch(e){}}assert(func,"Cannot call unknown function "+ident+" (perhaps LLVM optimizations or closure removed it?)");return func}var cwrap,ccall;((function(){var JSfuncs={"stackSave":(function(){Runtime.stackSave()}),"stackRestore":(function(){Runtime.stackRestore()}),"arrayToC":(function(arr){var ret=Runtime.stackAlloc(arr.length);writeArrayToMemory(arr,ret);return ret}),"stringToC":(function(str){var ret=0;if(str!==null&&str!==undefined&&str!==0){var len=(str.length<<2)+1;ret=Runtime.stackAlloc(len);stringToUTF8(str,ret,len)}return ret})};var toC={"string":JSfuncs["stringToC"],"array":JSfuncs["arrayToC"]};ccall=function ccallFunc(ident,returnType,argTypes,args,opts){var func=getCFunc(ident);var cArgs=[];var stack=0;if(args){for(var i=0;i<args.length;i++){var converter=toC[argTypes[i]];if(converter){if(stack===0)stack=Runtime.stackSave();cArgs[i]=converter(args[i])}else{cArgs[i]=args[i]}}}var ret=func.apply(null,cArgs);if(returnType==="string")ret=Pointer_stringify(ret);if(stack!==0){if(opts&&opts.async){EmterpreterAsync.asyncFinalizers.push((function(){Runtime.stackRestore(stack)}));return}Runtime.stackRestore(stack)}return ret};var sourceRegex=/^function\s*[a-zA-Z$_0-9]*\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;function parseJSFunc(jsfunc){var parsed=jsfunc.toString().match(sourceRegex).slice(1);return{arguments:parsed[0],body:parsed[1],returnValue:parsed[2]}}var JSsource=null;function ensureJSsource(){if(!JSsource){JSsource={};for(var fun in JSfuncs){if(JSfuncs.hasOwnProperty(fun)){JSsource[fun]=parseJSFunc(JSfuncs[fun])}}}}cwrap=function cwrap(ident,returnType,argTypes){argTypes=argTypes||[];var cfunc=getCFunc(ident);var numericArgs=argTypes.every((function(type){return type==="number"}));var numericRet=returnType!=="string";if(numericRet&&numericArgs){return cfunc}var argNames=argTypes.map((function(x,i){return"$"+i}));var funcstr="(function("+argNames.join(",")+") {";var nargs=argTypes.length;if(!numericArgs){ensureJSsource();funcstr+="var stack = "+JSsource["stackSave"].body+";";for(var i=0;i<nargs;i++){var arg=argNames[i],type=argTypes[i];if(type==="number")continue;var convertCode=JSsource[type+"ToC"];funcstr+="var "+convertCode.arguments+" = "+arg+";";funcstr+=convertCode.body+";";funcstr+=arg+"=("+convertCode.returnValue+");"}}var cfuncname=parseJSFunc((function(){return cfunc})).returnValue;funcstr+="var ret = "+cfuncname+"("+argNames.join(",")+");";if(!numericRet){var strgfy=parseJSFunc((function(){return Pointer_stringify})).returnValue;funcstr+="ret = "+strgfy+"(ret);"}if(!numericArgs){ensureJSsource();funcstr+=JSsource["stackRestore"].body.replace("()","(stack)")+";"}funcstr+="return ret})";return eval(funcstr)}}))();Module["ccall"]=ccall;Module["cwrap"]=cwrap;function setValue(ptr,value,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":HEAP8[ptr>>0]=value;break;case"i8":HEAP8[ptr>>0]=value;break;case"i16":HEAP16[ptr>>1]=value;break;case"i32":HEAP32[ptr>>2]=value;break;case"i64":tempI64=[value>>>0,(tempDouble=value,+Math_abs(tempDouble)>=+1?tempDouble>+0?(Math_min(+Math_floor(tempDouble/+4294967296),+4294967295)|0)>>>0:~~+Math_ceil((tempDouble- +(~~tempDouble>>>0))/+4294967296)>>>0:0)],HEAP32[ptr>>2]=tempI64[0],HEAP32[ptr+4>>2]=tempI64[1];break;case"float":HEAPF32[ptr>>2]=value;break;case"double":HEAPF64[ptr>>3]=value;break;default:abort("invalid type for setValue: "+type)}}Module["setValue"]=setValue;function getValue(ptr,type,noSafe){type=type||"i8";if(type.charAt(type.length-1)==="*")type="i32";switch(type){case"i1":return HEAP8[ptr>>0];case"i8":return HEAP8[ptr>>0];case"i16":return HEAP16[ptr>>1];case"i32":return HEAP32[ptr>>2];case"i64":return HEAP32[ptr>>2];case"float":return HEAPF32[ptr>>2];case"double":return HEAPF64[ptr>>3];default:abort("invalid type for setValue: "+type)}return null}Module["getValue"]=getValue;var ALLOC_NORMAL=0;var ALLOC_STACK=1;var ALLOC_STATIC=2;var ALLOC_DYNAMIC=3;var ALLOC_NONE=4;Module["ALLOC_NORMAL"]=ALLOC_NORMAL;Module["ALLOC_STACK"]=ALLOC_STACK;Module["ALLOC_STATIC"]=ALLOC_STATIC;Module["ALLOC_DYNAMIC"]=ALLOC_DYNAMIC;Module["ALLOC_NONE"]=ALLOC_NONE;function allocate(slab,types,allocator,ptr){var zeroinit,size;if(typeof slab==="number"){zeroinit=true;size=slab}else{zeroinit=false;size=slab.length}var singleType=typeof types==="string"?types:null;var ret;if(allocator==ALLOC_NONE){ret=ptr}else{ret=[typeof _malloc==="function"?_malloc:Runtime.staticAlloc,Runtime.stackAlloc,Runtime.staticAlloc,Runtime.dynamicAlloc][allocator===undefined?ALLOC_STATIC:allocator](Math.max(size,singleType?1:types.length))}if(zeroinit){var ptr=ret,stop;assert((ret&3)==0);stop=ret+(size&~3);for(;ptr<stop;ptr+=4){HEAP32[ptr>>2]=0}stop=ret+size;while(ptr<stop){HEAP8[ptr++>>0]=0}return ret}if(singleType==="i8"){if(slab.subarray||slab.slice){HEAPU8.set(slab,ret)}else{HEAPU8.set(new Uint8Array(slab),ret)}return ret}var i=0,type,typeSize,previousType;while(i<size){var curr=slab[i];if(typeof curr==="function"){curr=Runtime.getFunctionIndex(curr)}type=singleType||types[i];if(type===0){i++;continue}if(type=="i64")type="i32";setValue(ret+i,curr,type);if(previousType!==type){typeSize=Runtime.getNativeTypeSize(type);previousType=type}i+=typeSize}return ret}Module["allocate"]=allocate;function getMemory(size){if(!staticSealed)return Runtime.staticAlloc(size);if(!runtimeInitialized)return Runtime.dynamicAlloc(size);return _malloc(size)}Module["getMemory"]=getMemory;function Pointer_stringify(ptr,length){if(length===0||!ptr)return"";var hasUtf=0;var t;var i=0;while(1){t=HEAPU8[ptr+i>>0];hasUtf|=t;if(t==0&&!length)break;i++;if(length&&i==length)break}if(!length)length=i;var ret="";if(hasUtf<128){var MAX_CHUNK=1024;var curr;while(length>0){curr=String.fromCharCode.apply(String,HEAPU8.subarray(ptr,ptr+Math.min(length,MAX_CHUNK)));ret=ret?ret+curr:curr;ptr+=MAX_CHUNK;length-=MAX_CHUNK}return ret}return Module["UTF8ToString"](ptr)}Module["Pointer_stringify"]=Pointer_stringify;function AsciiToString(ptr){var str="";while(1){var ch=HEAP8[ptr++>>0];if(!ch)return str;str+=String.fromCharCode(ch)}}Module["AsciiToString"]=AsciiToString;function stringToAscii(str,outPtr){return writeAsciiToMemory(str,outPtr,false)}Module["stringToAscii"]=stringToAscii;var UTF8Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf8"):undefined;function UTF8ArrayToString(u8Array,idx){var endPtr=idx;while(u8Array[endPtr])++endPtr;if(endPtr-idx>16&&u8Array.subarray&&UTF8Decoder){return UTF8Decoder.decode(u8Array.subarray(idx,endPtr))}else{var u0,u1,u2,u3,u4,u5;var str="";while(1){u0=u8Array[idx++];if(!u0)return str;if(!(u0&128)){str+=String.fromCharCode(u0);continue}u1=u8Array[idx++]&63;if((u0&224)==192){str+=String.fromCharCode((u0&31)<<6|u1);continue}u2=u8Array[idx++]&63;if((u0&240)==224){u0=(u0&15)<<12|u1<<6|u2}else{u3=u8Array[idx++]&63;if((u0&248)==240){u0=(u0&7)<<18|u1<<12|u2<<6|u3}else{u4=u8Array[idx++]&63;if((u0&252)==248){u0=(u0&3)<<24|u1<<18|u2<<12|u3<<6|u4}else{u5=u8Array[idx++]&63;u0=(u0&1)<<30|u1<<24|u2<<18|u3<<12|u4<<6|u5}}}if(u0<65536){str+=String.fromCharCode(u0)}else{var ch=u0-65536;str+=String.fromCharCode(55296|ch>>10,56320|ch&1023)}}}}Module["UTF8ArrayToString"]=UTF8ArrayToString;function UTF8ToString(ptr){return UTF8ArrayToString(HEAPU8,ptr)}Module["UTF8ToString"]=UTF8ToString;function stringToUTF8Array(str,outU8Array,outIdx,maxBytesToWrite){if(!(maxBytesToWrite>0))return 0;var startIdx=outIdx;var endIdx=outIdx+maxBytesToWrite-1;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){if(outIdx>=endIdx)break;outU8Array[outIdx++]=u}else if(u<=2047){if(outIdx+1>=endIdx)break;outU8Array[outIdx++]=192|u>>6;outU8Array[outIdx++]=128|u&63}else if(u<=65535){if(outIdx+2>=endIdx)break;outU8Array[outIdx++]=224|u>>12;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=2097151){if(outIdx+3>=endIdx)break;outU8Array[outIdx++]=240|u>>18;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else if(u<=67108863){if(outIdx+4>=endIdx)break;outU8Array[outIdx++]=248|u>>24;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}else{if(outIdx+5>=endIdx)break;outU8Array[outIdx++]=252|u>>30;outU8Array[outIdx++]=128|u>>24&63;outU8Array[outIdx++]=128|u>>18&63;outU8Array[outIdx++]=128|u>>12&63;outU8Array[outIdx++]=128|u>>6&63;outU8Array[outIdx++]=128|u&63}}outU8Array[outIdx]=0;return outIdx-startIdx}Module["stringToUTF8Array"]=stringToUTF8Array;function stringToUTF8(str,outPtr,maxBytesToWrite){return stringToUTF8Array(str,HEAPU8,outPtr,maxBytesToWrite)}Module["stringToUTF8"]=stringToUTF8;function lengthBytesUTF8(str){var len=0;for(var i=0;i<str.length;++i){var u=str.charCodeAt(i);if(u>=55296&&u<=57343)u=65536+((u&1023)<<10)|str.charCodeAt(++i)&1023;if(u<=127){++len}else if(u<=2047){len+=2}else if(u<=65535){len+=3}else if(u<=2097151){len+=4}else if(u<=67108863){len+=5}else{len+=6}}return len}Module["lengthBytesUTF8"]=lengthBytesUTF8;var UTF16Decoder=typeof TextDecoder!=="undefined"?new TextDecoder("utf-16le"):undefined;function demangle(func){var __cxa_demangle_func=Module["___cxa_demangle"]||Module["__cxa_demangle"];if(__cxa_demangle_func){try{var s=func.substr(1);var len=lengthBytesUTF8(s)+1;var buf=_malloc(len);stringToUTF8(s,buf,len);var status=_malloc(4);var ret=__cxa_demangle_func(buf,0,0,status);if(getValue(status,"i32")===0&&ret){return Pointer_stringify(ret)}}catch(e){}finally{if(buf)_free(buf);if(status)_free(status);if(ret)_free(ret)}return func}Runtime.warnOnce("warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling");return func}function demangleAll(text){var regex=/__Z[\w\d_]+/g;return text.replace(regex,(function(x){var y=demangle(x);return x===y?x:x+" ["+y+"]"}))}function jsStackTrace(){var err=new Error;if(!err.stack){try{throw new Error(0)}catch(e){err=e}if(!err.stack){return"(no stack trace available)"}}return err.stack.toString()}function stackTrace(){var js=jsStackTrace();if(Module["extraStackTrace"])js+="\n"+Module["extraStackTrace"]();return demangleAll(js)}Module["stackTrace"]=stackTrace;var HEAP,buffer,HEAP8,HEAPU8,HEAP16,HEAPU16,HEAP32,HEAPU32,HEAPF32,HEAPF64;function updateGlobalBufferViews(){Module["HEAP8"]=HEAP8=new Int8Array(buffer);Module["HEAP16"]=HEAP16=new Int16Array(buffer);Module["HEAP32"]=HEAP32=new Int32Array(buffer);Module["HEAPU8"]=HEAPU8=new Uint8Array(buffer);Module["HEAPU16"]=HEAPU16=new Uint16Array(buffer);Module["HEAPU32"]=HEAPU32=new Uint32Array(buffer);Module["HEAPF32"]=HEAPF32=new Float32Array(buffer);Module["HEAPF64"]=HEAPF64=new Float64Array(buffer)}var STATIC_BASE,STATICTOP,staticSealed;var STACK_BASE,STACKTOP,STACK_MAX;var DYNAMIC_BASE,DYNAMICTOP_PTR;STATIC_BASE=STATICTOP=STACK_BASE=STACKTOP=STACK_MAX=DYNAMIC_BASE=DYNAMICTOP_PTR=0;staticSealed=false;function abortOnCannotGrowMemory(){abort("Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value "+TOTAL_MEMORY+", (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ")}function enlargeMemory(){abortOnCannotGrowMemory()}var TOTAL_STACK=Module["TOTAL_STACK"]||5242880;var TOTAL_MEMORY=Module["TOTAL_MEMORY"]||16777216;if(TOTAL_MEMORY<TOTAL_STACK)Module.printErr("TOTAL_MEMORY should be larger than TOTAL_STACK, was "+TOTAL_MEMORY+"! (TOTAL_STACK="+TOTAL_STACK+")");if(Module["buffer"]){buffer=Module["buffer"]}else{{buffer=new ArrayBuffer(TOTAL_MEMORY)}}updateGlobalBufferViews();function getTotalMemory(){return TOTAL_MEMORY}HEAP32[0]=1668509029;HEAP16[1]=25459;if(HEAPU8[2]!==115||HEAPU8[3]!==99)throw"Runtime error: expected the system to be little-endian!";Module["HEAP"]=HEAP;Module["buffer"]=buffer;Module["HEAP8"]=HEAP8;Module["HEAP16"]=HEAP16;Module["HEAP32"]=HEAP32;Module["HEAPU8"]=HEAPU8;Module["HEAPU16"]=HEAPU16;Module["HEAPU32"]=HEAPU32;Module["HEAPF32"]=HEAPF32;Module["HEAPF64"]=HEAPF64;function callRuntimeCallbacks(callbacks){while(callbacks.length>0){var callback=callbacks.shift();if(typeof callback=="function"){callback();continue}var func=callback.func;if(typeof func==="number"){if(callback.arg===undefined){Module["dynCall_v"](func)}else{Module["dynCall_vi"](func,callback.arg)}}else{func(callback.arg===undefined?null:callback.arg)}}}var __ATPRERUN__=[];var __ATINIT__=[];var __ATMAIN__=[];var __ATEXIT__=[];var __ATPOSTRUN__=[];var runtimeInitialized=false;var runtimeExited=false;function preRun(){if(Module["preRun"]){if(typeof Module["preRun"]=="function")Module["preRun"]=[Module["preRun"]];while(Module["preRun"].length){addOnPreRun(Module["preRun"].shift())}}callRuntimeCallbacks(__ATPRERUN__)}function ensureInitRuntime(){if(runtimeInitialized)return;runtimeInitialized=true;callRuntimeCallbacks(__ATINIT__)}function preMain(){callRuntimeCallbacks(__ATMAIN__)}function exitRuntime(){callRuntimeCallbacks(__ATEXIT__);runtimeExited=true}function postRun(){if(Module["postRun"]){if(typeof Module["postRun"]=="function")Module["postRun"]=[Module["postRun"]];while(Module["postRun"].length){addOnPostRun(Module["postRun"].shift())}}callRuntimeCallbacks(__ATPOSTRUN__)}function addOnPreRun(cb){__ATPRERUN__.unshift(cb)}Module["addOnPreRun"]=addOnPreRun;function addOnInit(cb){__ATINIT__.unshift(cb)}Module["addOnInit"]=addOnInit;function addOnPreMain(cb){__ATMAIN__.unshift(cb)}Module["addOnPreMain"]=addOnPreMain;function addOnExit(cb){__ATEXIT__.unshift(cb)}Module["addOnExit"]=addOnExit;function addOnPostRun(cb){__ATPOSTRUN__.unshift(cb)}Module["addOnPostRun"]=addOnPostRun;function intArrayFromString(stringy,dontAddNull,length){var len=length>0?length:lengthBytesUTF8(stringy)+1;var u8array=new Array(len);var numBytesWritten=stringToUTF8Array(stringy,u8array,0,u8array.length);if(dontAddNull)u8array.length=numBytesWritten;return u8array}Module["intArrayFromString"]=intArrayFromString;function intArrayToString(array){var ret=[];for(var i=0;i<array.length;i++){var chr=array[i];if(chr>255){chr&=255}ret.push(String.fromCharCode(chr))}return ret.join("")}Module["intArrayToString"]=intArrayToString;function writeStringToMemory(string,buffer,dontAddNull){Runtime.warnOnce("writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!");var lastChar,end;if(dontAddNull){end=buffer+lengthBytesUTF8(string);lastChar=HEAP8[end]}stringToUTF8(string,buffer,Infinity);if(dontAddNull)HEAP8[end]=lastChar}Module["writeStringToMemory"]=writeStringToMemory;function writeArrayToMemory(array,buffer){HEAP8.set(array,buffer)}Module["writeArrayToMemory"]=writeArrayToMemory;function writeAsciiToMemory(str,buffer,dontAddNull){for(var i=0;i<str.length;++i){HEAP8[buffer++>>0]=str.charCodeAt(i)}if(!dontAddNull)HEAP8[buffer>>0]=0}Module["writeAsciiToMemory"]=writeAsciiToMemory;if(!Math["imul"]||Math["imul"](4294967295,5)!==-5)Math["imul"]=function imul(a,b){var ah=a>>>16;var al=a&65535;var bh=b>>>16;var bl=b&65535;return al*bl+(ah*bl+al*bh<<16)|0};Math.imul=Math["imul"];if(!Math["fround"]){var froundBuffer=new Float32Array(1);Math["fround"]=(function(x){froundBuffer[0]=x;return froundBuffer[0]})}Math.fround=Math["fround"];if(!Math["clz32"])Math["clz32"]=(function(x){x=x>>>0;for(var i=0;i<32;i++){if(x&1<<31-i)return i}return 32});Math.clz32=Math["clz32"];if(!Math["trunc"])Math["trunc"]=(function(x){return x<0?Math.ceil(x):Math.floor(x)});Math.trunc=Math["trunc"];var Math_abs=Math.abs;var Math_cos=Math.cos;var Math_sin=Math.sin;var Math_tan=Math.tan;var Math_acos=Math.acos;var Math_asin=Math.asin;var Math_atan=Math.atan;var Math_atan2=Math.atan2;var Math_exp=Math.exp;var Math_log=Math.log;var Math_sqrt=Math.sqrt;var Math_ceil=Math.ceil;var Math_floor=Math.floor;var Math_pow=Math.pow;var Math_imul=Math.imul;var Math_fround=Math.fround;var Math_round=Math.round;var Math_min=Math.min;var Math_clz32=Math.clz32;var Math_trunc=Math.trunc;var runDependencies=0;var runDependencyWatcher=null;var dependenciesFulfilled=null;function addRunDependency(id){runDependencies++;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}}Module["addRunDependency"]=addRunDependency;function removeRunDependency(id){runDependencies--;if(Module["monitorRunDependencies"]){Module["monitorRunDependencies"](runDependencies)}if(runDependencies==0){if(runDependencyWatcher!==null){clearInterval(runDependencyWatcher);runDependencyWatcher=null}if(dependenciesFulfilled){var callback=dependenciesFulfilled;dependenciesFulfilled=null;callback()}}}Module["removeRunDependency"]=removeRunDependency;Module["preloadedImages"]={};Module["preloadedAudios"]={};var ASM_CONSTS=[];STATIC_BASE=Runtime.GLOBAL_BASE;STATICTOP=STATIC_BASE+1024;__ATINIT__.push();allocate([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,224,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,5,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,82,101,97,108,32,70,70,84,32,111,112,116,105,109,105,122,97,116,105,111,110,32,109,117,115,116,32,98,101,32,101,118,101,110,46,10,0,107,105,115,115,32,102,102,116,32,117,115,97,103,101,32,101,114,114,111,114,58,32,105,109,112,114,111,112,101,114,32,97,108,108,111,99,10,0],"i8",ALLOC_NONE,Runtime.GLOBAL_BASE);var tempDoublePtr=STATICTOP;STATICTOP+=16;function ___setErrNo(value){if(Module["___errno_location"])HEAP32[Module["___errno_location"]()>>2]=value;return value}function __exit(status){Module["exit"](status)}function _exit(status){__exit(status)}var SYSCALLS={varargs:0,get:(function(varargs){SYSCALLS.varargs+=4;var ret=HEAP32[SYSCALLS.varargs-4>>2];return ret}),getStr:(function(){var ret=Pointer_stringify(SYSCALLS.get());return ret}),get64:(function(){var low=SYSCALLS.get(),high=SYSCALLS.get();if(low>=0)assert(high===0);else assert(high===-1);return low}),getZero:(function(){assert(SYSCALLS.get()===0)})};function ___syscall140(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD(),offset_high=SYSCALLS.get(),offset_low=SYSCALLS.get(),result=SYSCALLS.get(),whence=SYSCALLS.get();var offset=offset_low;FS.llseek(stream,offset,whence);HEAP32[result>>2]=stream.position;if(stream.getdents&&offset===0&&whence===0)stream.getdents=null;return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function ___syscall146(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.get(),iov=SYSCALLS.get(),iovcnt=SYSCALLS.get();var ret=0;if(!___syscall146.buffer){___syscall146.buffers=[null,[],[]];___syscall146.printChar=(function(stream,curr){var buffer=___syscall146.buffers[stream];assert(buffer);if(curr===0||curr===10){(stream===1?Module["print"]:Module["printErr"])(UTF8ArrayToString(buffer,0));buffer.length=0}else{buffer.push(curr)}})}for(var i=0;i<iovcnt;i++){var ptr=HEAP32[iov+i*8>>2];var len=HEAP32[iov+(i*8+4)>>2];for(var j=0;j<len;j++){___syscall146.printChar(stream,HEAPU8[ptr+j])}ret+=len}return ret}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}function _emscripten_memcpy_big(dest,src,num){HEAPU8.set(HEAPU8.subarray(src,src+num),dest);return dest}function ___syscall6(which,varargs){SYSCALLS.varargs=varargs;try{var stream=SYSCALLS.getStreamFromFD();FS.close(stream);return 0}catch(e){if(typeof FS==="undefined"||!(e instanceof FS.ErrnoError))abort(e);return-e.errno}}__ATEXIT__.push((function(){var fflush=Module["_fflush"];if(fflush)fflush(0);var printChar=___syscall146.printChar;if(!printChar)return;var buffers=___syscall146.buffers;if(buffers[1].length)printChar(1,10);if(buffers[2].length)printChar(2,10)}));DYNAMICTOP_PTR=allocate(1,"i32",ALLOC_STATIC);STACK_BASE=STACKTOP=Runtime.alignMemory(STATICTOP);STACK_MAX=STACK_BASE+TOTAL_STACK;DYNAMIC_BASE=Runtime.alignMemory(STACK_MAX);HEAP32[DYNAMICTOP_PTR>>2]=DYNAMIC_BASE;staticSealed=true;function invoke_ii(index,a1){try{return Module["dynCall_ii"](index,a1)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}function invoke_iiii(index,a1,a2,a3){try{return Module["dynCall_iiii"](index,a1,a2,a3)}catch(e){if(typeof e!=="number"&&e!=="longjmp")throw e;Module["setThrew"](1,0)}}Module.asmGlobalArg={"Math":Math,"Int8Array":Int8Array,"Int16Array":Int16Array,"Int32Array":Int32Array,"Uint8Array":Uint8Array,"Uint16Array":Uint16Array,"Uint32Array":Uint32Array,"Float32Array":Float32Array,"Float64Array":Float64Array,"NaN":NaN,"Infinity":Infinity};Module.asmLibraryArg={"abort":abort,"assert":assert,"enlargeMemory":enlargeMemory,"getTotalMemory":getTotalMemory,"abortOnCannotGrowMemory":abortOnCannotGrowMemory,"invoke_ii":invoke_ii,"invoke_iiii":invoke_iiii,"___syscall6":___syscall6,"___setErrNo":___setErrNo,"_emscripten_memcpy_big":_emscripten_memcpy_big,"___syscall140":___syscall140,"_exit":_exit,"__exit":__exit,"___syscall146":___syscall146,"DYNAMICTOP_PTR":DYNAMICTOP_PTR,"tempDoublePtr":tempDoublePtr,"ABORT":ABORT,"STACKTOP":STACKTOP,"STACK_MAX":STACK_MAX};// EMSCRIPTEN_START_ASM
var asm=(function(global,env,buffer) {
"use asm";var a=new global.Int8Array(buffer);var b=new global.Int16Array(buffer);var c=new global.Int32Array(buffer);var d=new global.Uint8Array(buffer);var e=new global.Uint16Array(buffer);var f=new global.Uint32Array(buffer);var g=new global.Float32Array(buffer);var h=new global.Float64Array(buffer);var i=env.DYNAMICTOP_PTR|0;var j=env.tempDoublePtr|0;var k=env.ABORT|0;var l=env.STACKTOP|0;var m=env.STACK_MAX|0;var n=0;var o=0;var p=0;var q=0;var r=global.NaN,s=global.Infinity;var t=0,u=0,v=0,w=0,x=0.0;var y=0;var z=global.Math.floor;var A=global.Math.abs;var B=global.Math.sqrt;var C=global.Math.pow;var D=global.Math.cos;var E=global.Math.sin;var F=global.Math.tan;var G=global.Math.acos;var H=global.Math.asin;var I=global.Math.atan;var J=global.Math.atan2;var K=global.Math.exp;var L=global.Math.log;var M=global.Math.ceil;var N=global.Math.imul;var O=global.Math.min;var P=global.Math.max;var Q=global.Math.clz32;var R=global.Math.fround;var S=env.abort;var T=env.assert;var U=env.enlargeMemory;var V=env.getTotalMemory;var W=env.abortOnCannotGrowMemory;var X=env.invoke_ii;var Y=env.invoke_iiii;var Z=env.___syscall6;var _=env.___setErrNo;var $=env._emscripten_memcpy_big;var aa=env.___syscall140;var ba=env._exit;var ca=env.__exit;var da=env.___syscall146;var ea=R(0);const fa=R(0);
// EMSCRIPTEN_START_FUNCS
function ia(a){a=a|0;var b=0;b=l;l=l+a|0;l=l+15&-16;return b|0}function ja(){return l|0}function ka(a){a=a|0;l=a}function la(a,b){a=a|0;b=b|0;l=a;m=b}function ma(a,b){a=a|0;b=b|0;if(!n){n=a;o=b}}function na(a){a=a|0;y=a}function oa(){return y|0}function pa(a){a=a|0;ya(a);return}function qa(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,h=0.0,i=0.0;f=(a<<3)+264|0;if(!e)f=xa(f)|0;else{if(!d)d=0;else d=(c[e>>2]|0)>>>0<f>>>0?0:d;c[e>>2]=f;f=d}if(!f)return f|0;c[f>>2]=a;e=f+4|0;c[e>>2]=b;h=+(a|0);a:do if((a|0)>0){d=0;while(1){i=+(d|0)*-6.283185307179586/h;i=(b|0)==0?i:-i;g[f+264+(d<<3)>>2]=R(+D(+i));g[f+264+(d<<3)+4>>2]=R(+E(+i));d=d+1|0;if((d|0)==(a|0))break a;b=c[e>>2]|0}}while(0);h=+z(+(+B(+h)));b=a;d=4;e=f+8|0;while(1){b:do if((b|0)%(d|0)|0)while(1){switch(d|0){case 4:{d=2;break}case 2:{d=3;break}default:d=d+2|0}d=+(d|0)>h?b:d;if(!((b|0)%(d|0)|0))break b}while(0);b=(b|0)/(d|0)|0;c[e>>2]=d;c[e+4>>2]=b;if((b|0)<=1)break;else e=e+8|0}return f|0}function ra(a,b,d,e,f,h){a=a|0;b=b|0;d=d|0;e=e|0;f=f|0;h=h|0;var i=0,k=0,l=0,m=fa,n=0,o=fa,p=fa,q=fa,r=0,s=0,t=0,u=0,v=0,w=0,x=0,y=fa,z=fa,A=fa,B=fa,C=0,D=fa,E=fa,F=fa,G=fa,H=fa,I=fa,J=fa,K=fa,L=fa,M=fa;w=c[f>>2]|0;n=f+8|0;x=c[f+4>>2]|0;r=a+((N(x,w)|0)<<3)|0;if((x|0)==1){k=N(e,d)|0;i=a;f=b;while(1){t=f;u=c[t+4>>2]|0;v=i;c[v>>2]=c[t>>2];c[v+4>>2]=u;i=i+8|0;if((i|0)==(r|0))break;else f=f+(k<<3)|0}}else{k=N(w,d)|0;l=N(e,d)|0;i=a;f=b;while(1){ra(i,f,k,e,n,h);i=i+(x<<3)|0;if((i|0)==(r|0))break;else f=f+(l<<3)|0}}switch(w|0){case 2:{k=a;l=x;i=h+264|0;f=a+(x<<3)|0;while(1){o=R(g[f>>2]);y=R(g[i>>2]);p=R(o*y);a=f+4|0;m=R(g[a>>2]);q=R(g[i+4>>2]);p=R(p-R(m*q));q=R(R(y*m)+R(o*q));g[f>>2]=R(R(g[k>>2])-p);x=k+4|0;g[a>>2]=R(R(g[x>>2])-q);g[k>>2]=R(p+R(g[k>>2]));g[x>>2]=R(q+R(g[x>>2]));l=l+-1|0;if(!l)break;else{k=k+8|0;i=i+(d<<3)|0;f=f+8|0}}return}case 3:{n=x<<1;m=R(g[h+264+((N(x,d)|0)<<3)+4>>2]);l=h+264|0;e=d<<1;f=a;i=x;k=l;while(1){h=f+(x<<3)|0;o=R(g[h>>2]);y=R(g[k>>2]);A=R(o*y);a=f+(x<<3)+4|0;B=R(g[a>>2]);z=R(g[k+4>>2]);A=R(A-R(B*z));z=R(R(y*B)+R(o*z));v=f+(n<<3)|0;o=R(g[v>>2]);B=R(g[l>>2]);y=R(o*B);w=f+(n<<3)+4|0;p=R(g[w>>2]);q=R(g[l+4>>2]);y=R(y-R(p*q));q=R(R(B*p)+R(o*q));o=R(A+y);p=R(z+q);y=R(A-y);q=R(z-q);g[h>>2]=R(+R(g[f>>2])-+o*.5);u=f+4|0;g[a>>2]=R(+R(g[u>>2])-+p*.5);y=R(m*y);q=R(m*q);g[f>>2]=R(o+R(g[f>>2]));g[u>>2]=R(p+R(g[u>>2]));g[v>>2]=R(q+R(g[h>>2]));g[w>>2]=R(R(g[a>>2])-y);g[h>>2]=R(R(g[h>>2])-q);g[a>>2]=R(y+R(g[a>>2]));i=i+-1|0;if(!i)break;else{f=f+8|0;k=k+(d<<3)|0;l=l+(e<<3)|0}}return}case 4:{n=x<<1;b=x*3|0;f=h+264|0;r=d<<1;s=d*3|0;if(!(c[h+4>>2]|0)){i=a;k=f;l=x;e=f;while(1){v=i+(x<<3)|0;m=R(g[v>>2]);B=R(g[k>>2]);E=R(m*B);w=i+(x<<3)+4|0;z=R(g[w>>2]);D=R(g[k+4>>2]);E=R(E-R(z*D));D=R(R(B*z)+R(m*D));C=i+(n<<3)|0;m=R(g[C>>2]);z=R(g[e>>2]);B=R(m*z);t=i+(n<<3)+4|0;o=R(g[t>>2]);p=R(g[e+4>>2]);B=R(B-R(o*p));p=R(R(z*o)+R(m*p));h=i+(b<<3)|0;m=R(g[h>>2]);o=R(g[f>>2]);z=R(m*o);a=i+(b<<3)+4|0;q=R(g[a>>2]);y=R(g[f+4>>2]);z=R(z-R(q*y));y=R(R(o*q)+R(m*y));m=R(g[i>>2]);q=R(m-B);u=i+4|0;o=R(g[u>>2]);A=R(o-p);m=R(B+m);g[i>>2]=m;o=R(p+o);g[u>>2]=o;p=R(E+z);B=R(D+y);z=R(E-z);y=R(D-y);g[C>>2]=R(m-p);g[t>>2]=R(o-B);g[i>>2]=R(p+R(g[i>>2]));g[u>>2]=R(B+R(g[u>>2]));B=R(A+z);z=R(A-z);A=R(q-y);g[v>>2]=R(q+y);g[w>>2]=z;g[h>>2]=A;g[a>>2]=B;l=l+-1|0;if(!l)break;else{i=i+8|0;k=k+(d<<3)|0;e=e+(r<<3)|0;f=f+(s<<3)|0}}return}else{i=a;k=f;l=x;e=f;while(1){w=i+(x<<3)|0;p=R(g[w>>2]);B=R(g[k>>2]);m=R(p*B);h=i+(x<<3)+4|0;E=R(g[h>>2]);o=R(g[k+4>>2]);m=R(m-R(E*o));o=R(R(B*E)+R(p*o));t=i+(n<<3)|0;p=R(g[t>>2]);E=R(g[e>>2]);B=R(p*E);u=i+(n<<3)+4|0;q=R(g[u>>2]);y=R(g[e+4>>2]);B=R(B-R(q*y));y=R(R(E*q)+R(p*y));a=i+(b<<3)|0;p=R(g[a>>2]);q=R(g[f>>2]);E=R(p*q);C=i+(b<<3)+4|0;z=R(g[C>>2]);A=R(g[f+4>>2]);E=R(E-R(z*A));A=R(R(q*z)+R(p*A));p=R(g[i>>2]);z=R(p-B);v=i+4|0;q=R(g[v>>2]);D=R(q-y);p=R(B+p);g[i>>2]=p;q=R(y+q);g[v>>2]=q;y=R(m+E);B=R(o+A);E=R(m-E);A=R(o-A);g[t>>2]=R(p-y);g[u>>2]=R(q-B);g[i>>2]=R(y+R(g[i>>2]));g[v>>2]=R(B+R(g[v>>2]));B=R(D+E);E=R(D-E);D=R(z+A);g[w>>2]=R(z-A);g[h>>2]=B;g[a>>2]=D;g[C>>2]=E;l=l+-1|0;if(!l)break;else{i=i+8|0;k=k+(d<<3)|0;e=e+(r<<3)|0;f=f+(s<<3)|0}}return}}case 5:{C=N(x,d)|0;o=R(g[h+264+(C<<3)>>2]);q=R(g[h+264+(C<<3)+4>>2]);C=N(x,d<<1)|0;m=R(g[h+264+(C<<3)>>2]);p=R(g[h+264+(C<<3)+4>>2]);if((x|0)<=0)return;b=d*3|0;i=a+(x<<3)|0;k=a+(x<<1<<3)|0;l=a+(x*3<<3)|0;e=a+(x<<2<<3)|0;n=0;f=a;while(1){H=R(g[f>>2]);u=f+4|0;F=R(g[u>>2]);A=R(g[i>>2]);t=N(n,d)|0;J=R(g[h+264+(t<<3)>>2]);G=R(A*J);v=i+4|0;E=R(g[v>>2]);I=R(g[h+264+(t<<3)+4>>2]);G=R(G-R(E*I));I=R(R(J*E)+R(A*I));A=R(g[k>>2]);t=N(n<<1,d)|0;E=R(g[h+264+(t<<3)>>2]);J=R(A*E);a=k+4|0;z=R(g[a>>2]);L=R(g[h+264+(t<<3)+4>>2]);J=R(J-R(z*L));L=R(R(E*z)+R(A*L));A=R(g[l>>2]);t=N(b,n)|0;z=R(g[h+264+(t<<3)>>2]);E=R(A*z);C=l+4|0;M=R(g[C>>2]);y=R(g[h+264+(t<<3)+4>>2]);E=R(E-R(M*y));y=R(R(z*M)+R(A*y));A=R(g[e>>2]);t=N(n<<2,d)|0;M=R(g[h+264+(t<<3)>>2]);z=R(A*M);w=e+4|0;D=R(g[w>>2]);B=R(g[h+264+(t<<3)+4>>2]);z=R(z-R(D*B));B=R(R(M*D)+R(A*B));A=R(G+z);D=R(I+B);z=R(G-z);B=R(I-B);I=R(J+E);G=R(L+y);E=R(J-E);y=R(L-y);g[f>>2]=R(H+R(I+A));g[u>>2]=R(F+R(G+D));L=R(R(m*I)+R(H+R(o*A)));J=R(R(m*G)+R(F+R(o*D)));M=R(R(p*y)+R(q*B));K=R(R(-R(q*z))-R(p*E));g[i>>2]=R(L-M);g[v>>2]=R(J-K);g[e>>2]=R(M+L);g[w>>2]=R(K+J);A=R(R(o*I)+R(H+R(m*A)));D=R(R(o*G)+R(F+R(m*D)));B=R(R(q*y)-R(p*B));E=R(R(p*z)-R(q*E));g[k>>2]=R(B+A);g[a>>2]=R(E+D);g[l>>2]=R(A-B);g[C>>2]=R(D-E);n=n+1|0;if((n|0)==(x|0))break;else{i=i+8|0;k=k+8|0;l=l+8|0;e=e+8|0;f=f+8|0}}return}default:{u=c[h>>2]|0;v=xa(w<<3)|0;do if((x|0)>0?(w|0)>0:0){if((w|0)==1){f=0;do{k=a+(f<<3)|0;i=c[k>>2]|0;k=c[k+4>>2]|0;C=a+(f<<3)|0;c[C>>2]=i;c[C+4>>2]=k;f=f+1|0}while((f|0)!=(x|0));C=v;c[C>>2]=i;c[C+4>>2]=k;break}else t=0;do{f=t;i=0;while(1){r=a+(f<<3)|0;s=c[r+4>>2]|0;C=v+(i<<3)|0;c[C>>2]=c[r>>2];c[C+4>>2]=s;i=i+1|0;if((i|0)==(w|0))break;else f=f+x|0}n=v;e=c[n>>2]|0;n=c[n+4>>2]|0;m=(c[j>>2]=e,R(g[j>>2]));k=t;l=0;while(1){b=a+(k<<3)|0;r=b;c[r>>2]=e;c[r+4>>2]=n;r=N(k,d)|0;s=a+(k<<3)+4|0;f=1;i=0;o=m;p=R(g[s>>2]);do{C=i+r|0;i=C-((C|0)<(u|0)?0:u)|0;M=R(g[v+(f<<3)>>2]);I=R(g[h+264+(i<<3)>>2]);J=R(M*I);K=R(g[v+(f<<3)+4>>2]);L=R(g[h+264+(i<<3)+4>>2]);M=R(R(I*K)+R(M*L));o=R(o+R(J-R(K*L)));g[b>>2]=o;p=R(p+M);g[s>>2]=p;f=f+1|0}while((f|0)!=(w|0));l=l+1|0;if((l|0)==(w|0))break;else k=k+x|0}t=t+1|0}while((t|0)!=(x|0))}while(0);ya(v);return}}}function sa(a,b,d){a=a|0;b=b|0;d=d|0;if((b|0)==(d|0)){d=xa(c[a>>2]<<3)|0;ra(d,b,1,1,a+8|0,a);Qa(b|0,d|0,c[a>>2]<<3|0)|0;ya(d);return}else{ra(d,b,1,1,a+8|0,a);return}}function ta(a){a=a|0;ya(a);return}function ua(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0.0,h=0,i=0,j=0,k=0,m=0,n=0.0;k=l;l=l+16|0;i=k;if(a&1|0){Ma(380,36,1,c[63]|0)|0;b=0;l=k;return b|0}j=a>>1;qa(j,b,0,i)|0;h=c[i>>2]|0;a=(((j*3|0)/2|0)<<3)+12+h|0;if(e){m=(c[e>>2]|0)>>>0<a>>>0;c[e>>2]=a;if(m){m=0;l=k;return m|0}}else d=xa(a)|0;if(!d){m=0;l=k;return m|0}m=d+12|0;c[d>>2]=m;h=m+h|0;c[d+4>>2]=h;a=d+8|0;c[a>>2]=h+(j<<3);qa(j,b,m,i)|0;h=(j|0)/2|0;if((j|0)<=1){m=d;l=k;return m|0}f=+(j|0);e=c[a>>2]|0;if(!b){a=0;do{m=a;a=a+1|0;n=(+(a|0)/f+.5)*-3.141592653589793;g[e+(m<<3)>>2]=R(+D(+n));g[e+(m<<3)+4>>2]=R(+E(+n))}while((a|0)<(h|0));l=k;return d|0}else{a=0;do{m=a;a=a+1|0;n=(+(a|0)/f+.5)*-3.141592653589793;g[e+(m<<3)>>2]=R(+D(+n));g[e+(m<<3)+4>>2]=R(+E(+-n))}while((a|0)<(h|0));l=k;return d|0}return 0}function va(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,i=0,j=fa,k=fa,l=fa,m=fa,n=fa,o=fa,p=fa,q=0;e=c[a>>2]|0;if(c[e+4>>2]|0){Ma(417,37,1,c[63]|0)|0;ba(1)}i=c[e>>2]|0;f=a+4|0;sa(e,b,c[f>>2]|0);f=c[f>>2]|0;k=R(g[f>>2]);j=R(g[f+4>>2]);g[d>>2]=R(k+j);g[d+(i<<3)>>2]=R(k-j);g[d+4>>2]=R(0.0);g[d+(i<<3)+4>>2]=R(0.0);h=(i|0)/2|0;if((i|0)<2)return;e=c[a+8>>2]|0;b=1;while(1){l=R(g[f+(b<<3)>>2]);o=R(g[f+(b<<3)+4>>2]);a=i-b|0;n=R(g[f+(a<<3)>>2]);p=R(g[f+(a<<3)+4>>2]);m=R(l+n);k=R(o-p);n=R(l-n);p=R(o+p);q=b+-1|0;o=R(g[e+(q<<3)>>2]);l=R(n*o);j=R(g[e+(q<<3)+4>>2]);l=R(l-R(p*j));j=R(R(p*o)+R(n*j));g[d+(b<<3)>>2]=R(R(m+l)*R(.5));g[d+(b<<3)+4>>2]=R(R(k+j)*R(.5));g[d+(a<<3)>>2]=R(R(m-l)*R(.5));g[d+(a<<3)+4>>2]=R(R(j-k)*R(.5));if((b|0)<(h|0))b=b+1|0;else break}return}function wa(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,h=0,i=0,j=0,k=fa,l=0,m=fa,n=fa,o=fa,p=fa,q=fa,r=fa,s=0;i=c[a>>2]|0;if(!(c[i+4>>2]|0)){Ma(417,37,1,c[63]|0)|0;ba(1)}j=c[i>>2]|0;k=R(g[b>>2]);h=b+(j<<3)|0;k=R(k+R(g[h>>2]));f=c[a+4>>2]|0;g[f>>2]=k;k=R(g[b>>2]);g[f+4>>2]=R(k-R(g[h>>2]));h=(j|0)/2|0;if((j|0)<2){sa(i,f,d);return}e=c[a+8>>2]|0;a=1;while(1){n=R(g[b+(a<<3)>>2]);q=R(g[b+(a<<3)+4>>2]);l=j-a|0;p=R(g[b+(l<<3)>>2]);r=R(g[b+(l<<3)+4>>2]);o=R(n+p);m=R(q-r);p=R(n-p);r=R(q+r);s=a+-1|0;q=R(g[e+(s<<3)>>2]);n=R(p*q);k=R(g[e+(s<<3)+4>>2]);n=R(n-R(r*k));k=R(R(r*q)+R(p*k));g[f+(a<<3)>>2]=R(o+n);g[f+(a<<3)+4>>2]=R(m+k);g[f+(l<<3)>>2]=R(o-n);g[f+(l<<3)+4>>2]=R(-R(m-k));if((a|0)<(h|0))a=a+1|0;else break}sa(i,f,d);return}function xa(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0,q=0,r=0,s=0,t=0,u=0,v=0,w=0,x=0;x=l;l=l+16|0;o=x;do if(a>>>0<245){k=a>>>0<11?16:a+11&-8;a=k>>>3;n=c[114]|0;d=n>>>a;if(d&3|0){b=(d&1^1)+a|0;a=496+(b<<1<<2)|0;d=a+8|0;e=c[d>>2]|0;f=e+8|0;g=c[f>>2]|0;if((a|0)==(g|0))c[114]=n&~(1<<b);else{c[g+12>>2]=a;c[d>>2]=g}w=b<<3;c[e+4>>2]=w|3;w=e+w+4|0;c[w>>2]=c[w>>2]|1;w=f;l=x;return w|0}m=c[116]|0;if(k>>>0>m>>>0){if(d|0){b=2<<a;b=d<<a&(b|0-b);b=(b&0-b)+-1|0;h=b>>>12&16;b=b>>>h;d=b>>>5&8;b=b>>>d;f=b>>>2&4;b=b>>>f;a=b>>>1&2;b=b>>>a;e=b>>>1&1;e=(d|h|f|a|e)+(b>>>e)|0;b=496+(e<<1<<2)|0;a=b+8|0;f=c[a>>2]|0;h=f+8|0;d=c[h>>2]|0;if((b|0)==(d|0)){a=n&~(1<<e);c[114]=a}else{c[d+12>>2]=b;c[a>>2]=d;a=n}g=(e<<3)-k|0;c[f+4>>2]=k|3;e=f+k|0;c[e+4>>2]=g|1;c[e+g>>2]=g;if(m|0){f=c[119]|0;b=m>>>3;d=496+(b<<1<<2)|0;b=1<<b;if(!(a&b)){c[114]=a|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=f;c[b+12>>2]=f;c[f+8>>2]=b;c[f+12>>2]=d}c[116]=g;c[119]=e;w=h;l=x;return w|0}i=c[115]|0;if(i){d=(i&0-i)+-1|0;h=d>>>12&16;d=d>>>h;g=d>>>5&8;d=d>>>g;j=d>>>2&4;d=d>>>j;e=d>>>1&2;d=d>>>e;a=d>>>1&1;a=c[760+((g|h|j|e|a)+(d>>>a)<<2)>>2]|0;d=(c[a+4>>2]&-8)-k|0;e=c[a+16+(((c[a+16>>2]|0)==0&1)<<2)>>2]|0;if(!e){j=a;g=d}else{do{h=(c[e+4>>2]&-8)-k|0;j=h>>>0<d>>>0;d=j?h:d;a=j?e:a;e=c[e+16+(((c[e+16>>2]|0)==0&1)<<2)>>2]|0}while((e|0)!=0);j=a;g=d}h=j+k|0;if(j>>>0<h>>>0){f=c[j+24>>2]|0;b=c[j+12>>2]|0;do if((b|0)==(j|0)){a=j+20|0;b=c[a>>2]|0;if(!b){a=j+16|0;b=c[a>>2]|0;if(!b){d=0;break}}while(1){d=b+20|0;e=c[d>>2]|0;if(e|0){b=e;a=d;continue}d=b+16|0;e=c[d>>2]|0;if(!e)break;else{b=e;a=d}}c[a>>2]=0;d=b}else{d=c[j+8>>2]|0;c[d+12>>2]=b;c[b+8>>2]=d;d=b}while(0);do if(f|0){b=c[j+28>>2]|0;a=760+(b<<2)|0;if((j|0)==(c[a>>2]|0)){c[a>>2]=d;if(!d){c[115]=i&~(1<<b);break}}else{c[f+16+(((c[f+16>>2]|0)!=(j|0)&1)<<2)>>2]=d;if(!d)break}c[d+24>>2]=f;b=c[j+16>>2]|0;if(b|0){c[d+16>>2]=b;c[b+24>>2]=d}b=c[j+20>>2]|0;if(b|0){c[d+20>>2]=b;c[b+24>>2]=d}}while(0);if(g>>>0<16){w=g+k|0;c[j+4>>2]=w|3;w=j+w+4|0;c[w>>2]=c[w>>2]|1}else{c[j+4>>2]=k|3;c[h+4>>2]=g|1;c[h+g>>2]=g;if(m|0){e=c[119]|0;b=m>>>3;d=496+(b<<1<<2)|0;b=1<<b;if(!(n&b)){c[114]=n|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=e;c[b+12>>2]=e;c[e+8>>2]=b;c[e+12>>2]=d}c[116]=g;c[119]=h}w=j+8|0;l=x;return w|0}else n=k}else n=k}else n=k}else if(a>>>0<=4294967231){a=a+11|0;k=a&-8;j=c[115]|0;if(j){e=0-k|0;a=a>>>8;if(a)if(k>>>0>16777215)i=31;else{n=(a+1048320|0)>>>16&8;v=a<<n;m=(v+520192|0)>>>16&4;v=v<<m;i=(v+245760|0)>>>16&2;i=14-(m|n|i)+(v<<i>>>15)|0;i=k>>>(i+7|0)&1|i<<1}else i=0;d=c[760+(i<<2)>>2]|0;a:do if(!d){d=0;a=0;v=57}else{a=0;h=k<<((i|0)==31?0:25-(i>>>1)|0);g=0;while(1){f=(c[d+4>>2]&-8)-k|0;if(f>>>0<e>>>0)if(!f){a=d;e=0;f=d;v=61;break a}else{a=d;e=f}f=c[d+20>>2]|0;d=c[d+16+(h>>>31<<2)>>2]|0;g=(f|0)==0|(f|0)==(d|0)?g:f;f=(d|0)==0;if(f){d=g;v=57;break}else h=h<<((f^1)&1)}}while(0);if((v|0)==57){if((d|0)==0&(a|0)==0){a=2<<i;a=j&(a|0-a);if(!a){n=k;break}n=(a&0-a)+-1|0;h=n>>>12&16;n=n>>>h;g=n>>>5&8;n=n>>>g;i=n>>>2&4;n=n>>>i;m=n>>>1&2;n=n>>>m;d=n>>>1&1;a=0;d=c[760+((g|h|i|m|d)+(n>>>d)<<2)>>2]|0}if(!d){i=a;h=e}else{f=d;v=61}}if((v|0)==61)while(1){v=0;d=(c[f+4>>2]&-8)-k|0;n=d>>>0<e>>>0;d=n?d:e;a=n?f:a;f=c[f+16+(((c[f+16>>2]|0)==0&1)<<2)>>2]|0;if(!f){i=a;h=d;break}else{e=d;v=61}}if((i|0)!=0?h>>>0<((c[116]|0)-k|0)>>>0:0){g=i+k|0;if(i>>>0>=g>>>0){w=0;l=x;return w|0}f=c[i+24>>2]|0;b=c[i+12>>2]|0;do if((b|0)==(i|0)){a=i+20|0;b=c[a>>2]|0;if(!b){a=i+16|0;b=c[a>>2]|0;if(!b){b=0;break}}while(1){d=b+20|0;e=c[d>>2]|0;if(e|0){b=e;a=d;continue}d=b+16|0;e=c[d>>2]|0;if(!e)break;else{b=e;a=d}}c[a>>2]=0}else{w=c[i+8>>2]|0;c[w+12>>2]=b;c[b+8>>2]=w}while(0);do if(f){a=c[i+28>>2]|0;d=760+(a<<2)|0;if((i|0)==(c[d>>2]|0)){c[d>>2]=b;if(!b){e=j&~(1<<a);c[115]=e;break}}else{c[f+16+(((c[f+16>>2]|0)!=(i|0)&1)<<2)>>2]=b;if(!b){e=j;break}}c[b+24>>2]=f;a=c[i+16>>2]|0;if(a|0){c[b+16>>2]=a;c[a+24>>2]=b}a=c[i+20>>2]|0;if(a){c[b+20>>2]=a;c[a+24>>2]=b;e=j}else e=j}else e=j;while(0);do if(h>>>0>=16){c[i+4>>2]=k|3;c[g+4>>2]=h|1;c[g+h>>2]=h;b=h>>>3;if(h>>>0<256){d=496+(b<<1<<2)|0;a=c[114]|0;b=1<<b;if(!(a&b)){c[114]=a|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=g;c[b+12>>2]=g;c[g+8>>2]=b;c[g+12>>2]=d;break}b=h>>>8;if(b)if(h>>>0>16777215)b=31;else{v=(b+1048320|0)>>>16&8;w=b<<v;u=(w+520192|0)>>>16&4;w=w<<u;b=(w+245760|0)>>>16&2;b=14-(u|v|b)+(w<<b>>>15)|0;b=h>>>(b+7|0)&1|b<<1}else b=0;d=760+(b<<2)|0;c[g+28>>2]=b;a=g+16|0;c[a+4>>2]=0;c[a>>2]=0;a=1<<b;if(!(e&a)){c[115]=e|a;c[d>>2]=g;c[g+24>>2]=d;c[g+12>>2]=g;c[g+8>>2]=g;break}a=h<<((b|0)==31?0:25-(b>>>1)|0);d=c[d>>2]|0;while(1){if((c[d+4>>2]&-8|0)==(h|0)){v=97;break}e=d+16+(a>>>31<<2)|0;b=c[e>>2]|0;if(!b){v=96;break}else{a=a<<1;d=b}}if((v|0)==96){c[e>>2]=g;c[g+24>>2]=d;c[g+12>>2]=g;c[g+8>>2]=g;break}else if((v|0)==97){v=d+8|0;w=c[v>>2]|0;c[w+12>>2]=g;c[v>>2]=g;c[g+8>>2]=w;c[g+12>>2]=d;c[g+24>>2]=0;break}}else{w=h+k|0;c[i+4>>2]=w|3;w=i+w+4|0;c[w>>2]=c[w>>2]|1}while(0);w=i+8|0;l=x;return w|0}else n=k}else n=k}else n=-1;while(0);d=c[116]|0;if(d>>>0>=n>>>0){b=d-n|0;a=c[119]|0;if(b>>>0>15){w=a+n|0;c[119]=w;c[116]=b;c[w+4>>2]=b|1;c[w+b>>2]=b;c[a+4>>2]=n|3}else{c[116]=0;c[119]=0;c[a+4>>2]=d|3;w=a+d+4|0;c[w>>2]=c[w>>2]|1}w=a+8|0;l=x;return w|0}h=c[117]|0;if(h>>>0>n>>>0){u=h-n|0;c[117]=u;w=c[120]|0;v=w+n|0;c[120]=v;c[v+4>>2]=u|1;c[w+4>>2]=n|3;w=w+8|0;l=x;return w|0}if(!(c[232]|0)){c[234]=4096;c[233]=4096;c[235]=-1;c[236]=-1;c[237]=0;c[225]=0;a=o&-16^1431655768;c[o>>2]=a;c[232]=a;a=4096}else a=c[234]|0;i=n+48|0;j=n+47|0;g=a+j|0;f=0-a|0;k=g&f;if(k>>>0<=n>>>0){w=0;l=x;return w|0}a=c[224]|0;if(a|0?(m=c[222]|0,o=m+k|0,o>>>0<=m>>>0|o>>>0>a>>>0):0){w=0;l=x;return w|0}b:do if(!(c[225]&4)){d=c[120]|0;c:do if(d){e=904;while(1){a=c[e>>2]|0;if(a>>>0<=d>>>0?(r=e+4|0,(a+(c[r>>2]|0)|0)>>>0>d>>>0):0)break;a=c[e+8>>2]|0;if(!a){v=118;break c}else e=a}b=g-h&f;if(b>>>0<2147483647){a=Oa(b|0)|0;if((a|0)==((c[e>>2]|0)+(c[r>>2]|0)|0)){if((a|0)!=(-1|0)){h=b;g=a;v=135;break b}}else{e=a;v=126}}else b=0}else v=118;while(0);do if((v|0)==118){d=Oa(0)|0;if((d|0)!=(-1|0)?(b=d,p=c[233]|0,q=p+-1|0,b=((q&b|0)==0?0:(q+b&0-p)-b|0)+k|0,p=c[222]|0,q=b+p|0,b>>>0>n>>>0&b>>>0<2147483647):0){r=c[224]|0;if(r|0?q>>>0<=p>>>0|q>>>0>r>>>0:0){b=0;break}a=Oa(b|0)|0;if((a|0)==(d|0)){h=b;g=d;v=135;break b}else{e=a;v=126}}else b=0}while(0);do if((v|0)==126){d=0-b|0;if(!(i>>>0>b>>>0&(b>>>0<2147483647&(e|0)!=(-1|0))))if((e|0)==(-1|0)){b=0;break}else{h=b;g=e;v=135;break b}a=c[234]|0;a=j-b+a&0-a;if(a>>>0>=2147483647){h=b;g=e;v=135;break b}if((Oa(a|0)|0)==(-1|0)){Oa(d|0)|0;b=0;break}else{h=a+b|0;g=e;v=135;break b}}while(0);c[225]=c[225]|4;v=133}else{b=0;v=133}while(0);if(((v|0)==133?k>>>0<2147483647:0)?(u=Oa(k|0)|0,r=Oa(0)|0,s=r-u|0,t=s>>>0>(n+40|0)>>>0,!((u|0)==(-1|0)|t^1|u>>>0<r>>>0&((u|0)!=(-1|0)&(r|0)!=(-1|0))^1)):0){h=t?s:b;g=u;v=135}if((v|0)==135){b=(c[222]|0)+h|0;c[222]=b;if(b>>>0>(c[223]|0)>>>0)c[223]=b;j=c[120]|0;do if(j){b=904;while(1){a=c[b>>2]|0;d=b+4|0;e=c[d>>2]|0;if((g|0)==(a+e|0)){v=145;break}f=c[b+8>>2]|0;if(!f)break;else b=f}if(((v|0)==145?(c[b+12>>2]&8|0)==0:0)?j>>>0<g>>>0&j>>>0>=a>>>0:0){c[d>>2]=e+h;w=j+8|0;w=(w&7|0)==0?0:0-w&7;v=j+w|0;w=(c[117]|0)+(h-w)|0;c[120]=v;c[117]=w;c[v+4>>2]=w|1;c[v+w+4>>2]=40;c[121]=c[236];break}if(g>>>0<(c[118]|0)>>>0)c[118]=g;d=g+h|0;b=904;while(1){if((c[b>>2]|0)==(d|0)){v=153;break}a=c[b+8>>2]|0;if(!a)break;else b=a}if((v|0)==153?(c[b+12>>2]&8|0)==0:0){c[b>>2]=g;m=b+4|0;c[m>>2]=(c[m>>2]|0)+h;m=g+8|0;m=g+((m&7|0)==0?0:0-m&7)|0;b=d+8|0;b=d+((b&7|0)==0?0:0-b&7)|0;k=m+n|0;i=b-m-n|0;c[m+4>>2]=n|3;do if((b|0)!=(j|0)){if((b|0)==(c[119]|0)){w=(c[116]|0)+i|0;c[116]=w;c[119]=k;c[k+4>>2]=w|1;c[k+w>>2]=w;break}a=c[b+4>>2]|0;if((a&3|0)==1){h=a&-8;e=a>>>3;d:do if(a>>>0<256){a=c[b+8>>2]|0;d=c[b+12>>2]|0;if((d|0)==(a|0)){c[114]=c[114]&~(1<<e);break}else{c[a+12>>2]=d;c[d+8>>2]=a;break}}else{g=c[b+24>>2]|0;a=c[b+12>>2]|0;do if((a|0)==(b|0)){e=b+16|0;d=e+4|0;a=c[d>>2]|0;if(!a){a=c[e>>2]|0;if(!a){a=0;break}else d=e}while(1){e=a+20|0;f=c[e>>2]|0;if(f|0){a=f;d=e;continue}e=a+16|0;f=c[e>>2]|0;if(!f)break;else{a=f;d=e}}c[d>>2]=0}else{w=c[b+8>>2]|0;c[w+12>>2]=a;c[a+8>>2]=w}while(0);if(!g)break;d=c[b+28>>2]|0;e=760+(d<<2)|0;do if((b|0)!=(c[e>>2]|0)){c[g+16+(((c[g+16>>2]|0)!=(b|0)&1)<<2)>>2]=a;if(!a)break d}else{c[e>>2]=a;if(a|0)break;c[115]=c[115]&~(1<<d);break d}while(0);c[a+24>>2]=g;d=b+16|0;e=c[d>>2]|0;if(e|0){c[a+16>>2]=e;c[e+24>>2]=a}d=c[d+4>>2]|0;if(!d)break;c[a+20>>2]=d;c[d+24>>2]=a}while(0);b=b+h|0;f=h+i|0}else f=i;b=b+4|0;c[b>>2]=c[b>>2]&-2;c[k+4>>2]=f|1;c[k+f>>2]=f;b=f>>>3;if(f>>>0<256){d=496+(b<<1<<2)|0;a=c[114]|0;b=1<<b;if(!(a&b)){c[114]=a|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=k;c[b+12>>2]=k;c[k+8>>2]=b;c[k+12>>2]=d;break}b=f>>>8;do if(!b)b=0;else{if(f>>>0>16777215){b=31;break}v=(b+1048320|0)>>>16&8;w=b<<v;u=(w+520192|0)>>>16&4;w=w<<u;b=(w+245760|0)>>>16&2;b=14-(u|v|b)+(w<<b>>>15)|0;b=f>>>(b+7|0)&1|b<<1}while(0);e=760+(b<<2)|0;c[k+28>>2]=b;a=k+16|0;c[a+4>>2]=0;c[a>>2]=0;a=c[115]|0;d=1<<b;if(!(a&d)){c[115]=a|d;c[e>>2]=k;c[k+24>>2]=e;c[k+12>>2]=k;c[k+8>>2]=k;break}a=f<<((b|0)==31?0:25-(b>>>1)|0);d=c[e>>2]|0;while(1){if((c[d+4>>2]&-8|0)==(f|0)){v=194;break}e=d+16+(a>>>31<<2)|0;b=c[e>>2]|0;if(!b){v=193;break}else{a=a<<1;d=b}}if((v|0)==193){c[e>>2]=k;c[k+24>>2]=d;c[k+12>>2]=k;c[k+8>>2]=k;break}else if((v|0)==194){v=d+8|0;w=c[v>>2]|0;c[w+12>>2]=k;c[v>>2]=k;c[k+8>>2]=w;c[k+12>>2]=d;c[k+24>>2]=0;break}}else{w=(c[117]|0)+i|0;c[117]=w;c[120]=k;c[k+4>>2]=w|1}while(0);w=m+8|0;l=x;return w|0}b=904;while(1){a=c[b>>2]|0;if(a>>>0<=j>>>0?(w=a+(c[b+4>>2]|0)|0,w>>>0>j>>>0):0)break;b=c[b+8>>2]|0}f=w+-47|0;a=f+8|0;a=f+((a&7|0)==0?0:0-a&7)|0;f=j+16|0;a=a>>>0<f>>>0?j:a;b=a+8|0;d=g+8|0;d=(d&7|0)==0?0:0-d&7;v=g+d|0;d=h+-40-d|0;c[120]=v;c[117]=d;c[v+4>>2]=d|1;c[v+d+4>>2]=40;c[121]=c[236];d=a+4|0;c[d>>2]=27;c[b>>2]=c[226];c[b+4>>2]=c[227];c[b+8>>2]=c[228];c[b+12>>2]=c[229];c[226]=g;c[227]=h;c[229]=0;c[228]=b;b=a+24|0;do{v=b;b=b+4|0;c[b>>2]=7}while((v+8|0)>>>0<w>>>0);if((a|0)!=(j|0)){g=a-j|0;c[d>>2]=c[d>>2]&-2;c[j+4>>2]=g|1;c[a>>2]=g;b=g>>>3;if(g>>>0<256){d=496+(b<<1<<2)|0;a=c[114]|0;b=1<<b;if(!(a&b)){c[114]=a|b;b=d;a=d+8|0}else{a=d+8|0;b=c[a>>2]|0}c[a>>2]=j;c[b+12>>2]=j;c[j+8>>2]=b;c[j+12>>2]=d;break}b=g>>>8;if(b)if(g>>>0>16777215)d=31;else{v=(b+1048320|0)>>>16&8;w=b<<v;u=(w+520192|0)>>>16&4;w=w<<u;d=(w+245760|0)>>>16&2;d=14-(u|v|d)+(w<<d>>>15)|0;d=g>>>(d+7|0)&1|d<<1}else d=0;e=760+(d<<2)|0;c[j+28>>2]=d;c[j+20>>2]=0;c[f>>2]=0;b=c[115]|0;a=1<<d;if(!(b&a)){c[115]=b|a;c[e>>2]=j;c[j+24>>2]=e;c[j+12>>2]=j;c[j+8>>2]=j;break}a=g<<((d|0)==31?0:25-(d>>>1)|0);d=c[e>>2]|0;while(1){if((c[d+4>>2]&-8|0)==(g|0)){v=216;break}e=d+16+(a>>>31<<2)|0;b=c[e>>2]|0;if(!b){v=215;break}else{a=a<<1;d=b}}if((v|0)==215){c[e>>2]=j;c[j+24>>2]=d;c[j+12>>2]=j;c[j+8>>2]=j;break}else if((v|0)==216){v=d+8|0;w=c[v>>2]|0;c[w+12>>2]=j;c[v>>2]=j;c[j+8>>2]=w;c[j+12>>2]=d;c[j+24>>2]=0;break}}}else{w=c[118]|0;if((w|0)==0|g>>>0<w>>>0)c[118]=g;c[226]=g;c[227]=h;c[229]=0;c[123]=c[232];c[122]=-1;b=0;do{w=496+(b<<1<<2)|0;c[w+12>>2]=w;c[w+8>>2]=w;b=b+1|0}while((b|0)!=32);w=g+8|0;w=(w&7|0)==0?0:0-w&7;v=g+w|0;w=h+-40-w|0;c[120]=v;c[117]=w;c[v+4>>2]=w|1;c[v+w+4>>2]=40;c[121]=c[236]}while(0);b=c[117]|0;if(b>>>0>n>>>0){u=b-n|0;c[117]=u;w=c[120]|0;v=w+n|0;c[120]=v;c[v+4>>2]=u|1;c[w+4>>2]=n|3;w=w+8|0;l=x;return w|0}}c[(Ca()|0)>>2]=12;w=0;l=x;return w|0}function ya(a){a=a|0;var b=0,d=0,e=0,f=0,g=0,h=0,i=0,j=0;if(!a)return;d=a+-8|0;f=c[118]|0;a=c[a+-4>>2]|0;b=a&-8;j=d+b|0;do if(!(a&1)){e=c[d>>2]|0;if(!(a&3))return;h=d+(0-e)|0;g=e+b|0;if(h>>>0<f>>>0)return;if((h|0)==(c[119]|0)){a=j+4|0;b=c[a>>2]|0;if((b&3|0)!=3){i=h;b=g;break}c[116]=g;c[a>>2]=b&-2;c[h+4>>2]=g|1;c[h+g>>2]=g;return}d=e>>>3;if(e>>>0<256){a=c[h+8>>2]|0;b=c[h+12>>2]|0;if((b|0)==(a|0)){c[114]=c[114]&~(1<<d);i=h;b=g;break}else{c[a+12>>2]=b;c[b+8>>2]=a;i=h;b=g;break}}f=c[h+24>>2]|0;a=c[h+12>>2]|0;do if((a|0)==(h|0)){d=h+16|0;b=d+4|0;a=c[b>>2]|0;if(!a){a=c[d>>2]|0;if(!a){a=0;break}else b=d}while(1){d=a+20|0;e=c[d>>2]|0;if(e|0){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}c[b>>2]=0}else{i=c[h+8>>2]|0;c[i+12>>2]=a;c[a+8>>2]=i}while(0);if(f){b=c[h+28>>2]|0;d=760+(b<<2)|0;if((h|0)==(c[d>>2]|0)){c[d>>2]=a;if(!a){c[115]=c[115]&~(1<<b);i=h;b=g;break}}else{c[f+16+(((c[f+16>>2]|0)!=(h|0)&1)<<2)>>2]=a;if(!a){i=h;b=g;break}}c[a+24>>2]=f;b=h+16|0;d=c[b>>2]|0;if(d|0){c[a+16>>2]=d;c[d+24>>2]=a}b=c[b+4>>2]|0;if(b){c[a+20>>2]=b;c[b+24>>2]=a;i=h;b=g}else{i=h;b=g}}else{i=h;b=g}}else{i=d;h=d}while(0);if(h>>>0>=j>>>0)return;a=j+4|0;e=c[a>>2]|0;if(!(e&1))return;if(!(e&2)){a=c[119]|0;if((j|0)==(c[120]|0)){j=(c[117]|0)+b|0;c[117]=j;c[120]=i;c[i+4>>2]=j|1;if((i|0)!=(a|0))return;c[119]=0;c[116]=0;return}if((j|0)==(a|0)){j=(c[116]|0)+b|0;c[116]=j;c[119]=h;c[i+4>>2]=j|1;c[h+j>>2]=j;return}f=(e&-8)+b|0;d=e>>>3;do if(e>>>0<256){b=c[j+8>>2]|0;a=c[j+12>>2]|0;if((a|0)==(b|0)){c[114]=c[114]&~(1<<d);break}else{c[b+12>>2]=a;c[a+8>>2]=b;break}}else{g=c[j+24>>2]|0;a=c[j+12>>2]|0;do if((a|0)==(j|0)){d=j+16|0;b=d+4|0;a=c[b>>2]|0;if(!a){a=c[d>>2]|0;if(!a){d=0;break}else b=d}while(1){d=a+20|0;e=c[d>>2]|0;if(e|0){a=e;b=d;continue}d=a+16|0;e=c[d>>2]|0;if(!e)break;else{a=e;b=d}}c[b>>2]=0;d=a}else{d=c[j+8>>2]|0;c[d+12>>2]=a;c[a+8>>2]=d;d=a}while(0);if(g|0){a=c[j+28>>2]|0;b=760+(a<<2)|0;if((j|0)==(c[b>>2]|0)){c[b>>2]=d;if(!d){c[115]=c[115]&~(1<<a);break}}else{c[g+16+(((c[g+16>>2]|0)!=(j|0)&1)<<2)>>2]=d;if(!d)break}c[d+24>>2]=g;a=j+16|0;b=c[a>>2]|0;if(b|0){c[d+16>>2]=b;c[b+24>>2]=d}a=c[a+4>>2]|0;if(a|0){c[d+20>>2]=a;c[a+24>>2]=d}}}while(0);c[i+4>>2]=f|1;c[h+f>>2]=f;if((i|0)==(c[119]|0)){c[116]=f;return}}else{c[a>>2]=e&-2;c[i+4>>2]=b|1;c[h+b>>2]=b;f=b}a=f>>>3;if(f>>>0<256){d=496+(a<<1<<2)|0;b=c[114]|0;a=1<<a;if(!(b&a)){c[114]=b|a;a=d;b=d+8|0}else{b=d+8|0;a=c[b>>2]|0}c[b>>2]=i;c[a+12>>2]=i;c[i+8>>2]=a;c[i+12>>2]=d;return}a=f>>>8;if(a)if(f>>>0>16777215)a=31;else{h=(a+1048320|0)>>>16&8;j=a<<h;g=(j+520192|0)>>>16&4;j=j<<g;a=(j+245760|0)>>>16&2;a=14-(g|h|a)+(j<<a>>>15)|0;a=f>>>(a+7|0)&1|a<<1}else a=0;e=760+(a<<2)|0;c[i+28>>2]=a;c[i+20>>2]=0;c[i+16>>2]=0;b=c[115]|0;d=1<<a;do if(b&d){b=f<<((a|0)==31?0:25-(a>>>1)|0);d=c[e>>2]|0;while(1){if((c[d+4>>2]&-8|0)==(f|0)){a=73;break}e=d+16+(b>>>31<<2)|0;a=c[e>>2]|0;if(!a){a=72;break}else{b=b<<1;d=a}}if((a|0)==72){c[e>>2]=i;c[i+24>>2]=d;c[i+12>>2]=i;c[i+8>>2]=i;break}else if((a|0)==73){h=d+8|0;j=c[h>>2]|0;c[j+12>>2]=i;c[h>>2]=i;c[i+8>>2]=j;c[i+12>>2]=d;c[i+24>>2]=0;break}}else{c[115]=b|d;c[e>>2]=i;c[i+24>>2]=e;c[i+12>>2]=i;c[i+8>>2]=i}while(0);j=(c[122]|0)+-1|0;c[122]=j;if(!j)a=912;else return;while(1){a=c[a>>2]|0;if(!a)break;else a=a+8|0}c[122]=-1;return}function za(a){a=a|0;var b=0,d=0;b=l;l=l+16|0;d=b;c[d>>2]=Fa(c[a+60>>2]|0)|0;a=Ba(Z(6,d|0)|0)|0;l=b;return a|0}function Aa(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0;f=l;l=l+32|0;g=f;e=f+20|0;c[g>>2]=c[a+60>>2];c[g+4>>2]=0;c[g+8>>2]=b;c[g+12>>2]=e;c[g+16>>2]=d;if((Ba(aa(140,g|0)|0)|0)<0){c[e>>2]=-1;a=-1}else a=c[e>>2]|0;l=f;return a|0}function Ba(a){a=a|0;if(a>>>0>4294963200){c[(Ca()|0)>>2]=0-a;a=-1}return a|0}function Ca(){return (Da()|0)+64|0}function Da(){return Ea()|0}function Ea(){return 8}function Fa(a){a=a|0;return a|0}function Ga(a,b,d){a=a|0;b=b|0;d=d|0;var e=0,f=0,g=0,h=0,i=0,j=0,k=0,m=0,n=0,o=0,p=0;n=l;l=l+48|0;k=n+16|0;g=n;f=n+32|0;i=a+28|0;e=c[i>>2]|0;c[f>>2]=e;j=a+20|0;e=(c[j>>2]|0)-e|0;c[f+4>>2]=e;c[f+8>>2]=b;c[f+12>>2]=d;e=e+d|0;h=a+60|0;c[g>>2]=c[h>>2];c[g+4>>2]=f;c[g+8>>2]=2;g=Ba(da(146,g|0)|0)|0;a:do if((e|0)!=(g|0)){b=2;while(1){if((g|0)<0)break;e=e-g|0;p=c[f+4>>2]|0;o=g>>>0>p>>>0;f=o?f+8|0:f;b=(o<<31>>31)+b|0;p=g-(o?p:0)|0;c[f>>2]=(c[f>>2]|0)+p;o=f+4|0;c[o>>2]=(c[o>>2]|0)-p;c[k>>2]=c[h>>2];c[k+4>>2]=f;c[k+8>>2]=b;g=Ba(da(146,k|0)|0)|0;if((e|0)==(g|0)){m=3;break a}}c[a+16>>2]=0;c[i>>2]=0;c[j>>2]=0;c[a>>2]=c[a>>2]|32;if((b|0)==2)d=0;else d=d-(c[f+4>>2]|0)|0}else m=3;while(0);if((m|0)==3){p=c[a+44>>2]|0;c[a+16>>2]=p+(c[a+48>>2]|0);c[i>>2]=p;c[j>>2]=p}l=n;return d|0}function Ha(){return 952}function Ia(a){a=a|0;return 0}function Ja(a){a=a|0;return}function Ka(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0,j=0;f=e+16|0;g=c[f>>2]|0;if(!g)if(!(La(e)|0)){g=c[f>>2]|0;h=5}else f=0;else h=5;a:do if((h|0)==5){j=e+20|0;i=c[j>>2]|0;f=i;if((g-i|0)>>>0<d>>>0){f=ha[c[e+36>>2]&3](e,b,d)|0;break}b:do if((a[e+75>>0]|0)>-1){i=d;while(1){if(!i){h=0;g=b;break b}g=i+-1|0;if((a[b+g>>0]|0)==10)break;else i=g}f=ha[c[e+36>>2]&3](e,b,i)|0;if(f>>>0<i>>>0)break a;h=i;g=b+i|0;d=d-i|0;f=c[j>>2]|0}else{h=0;g=b}while(0);Qa(f|0,g|0,d|0)|0;c[j>>2]=(c[j>>2]|0)+d;f=h+d|0}while(0);return f|0}function La(b){b=b|0;var d=0,e=0;d=b+74|0;e=a[d>>0]|0;a[d>>0]=e+255|e;d=c[b>>2]|0;if(!(d&8)){c[b+8>>2]=0;c[b+4>>2]=0;e=c[b+44>>2]|0;c[b+28>>2]=e;c[b+20>>2]=e;c[b+16>>2]=e+(c[b+48>>2]|0);b=0}else{c[b>>2]=d|32;b=-1}return b|0}function Ma(a,b,d,e){a=a|0;b=b|0;d=d|0;e=e|0;var f=0,g=0;f=N(d,b)|0;d=(b|0)==0?0:d;if((c[e+76>>2]|0)>-1){g=(Ia(e)|0)==0;a=Ka(a,f,e)|0;if(!g)Ja(e)}else a=Ka(a,f,e)|0;if((a|0)!=(f|0))d=(a>>>0)/(b>>>0)|0;return d|0}function Na(){}function Oa(a){a=a|0;var b=0,d=0;d=a+15&-16|0;b=c[i>>2]|0;a=b+d|0;if((d|0)>0&(a|0)<(b|0)|(a|0)<0){W()|0;_(12);return -1}c[i>>2]=a;if((a|0)>(V()|0)?(U()|0)==0:0){c[i>>2]=b;_(12);return -1}return b|0}function Pa(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0,i=0;h=b+e|0;d=d&255;if((e|0)>=67){while(b&3){a[b>>0]=d;b=b+1|0}f=h&-4|0;g=f-64|0;i=d|d<<8|d<<16|d<<24;while((b|0)<=(g|0)){c[b>>2]=i;c[b+4>>2]=i;c[b+8>>2]=i;c[b+12>>2]=i;c[b+16>>2]=i;c[b+20>>2]=i;c[b+24>>2]=i;c[b+28>>2]=i;c[b+32>>2]=i;c[b+36>>2]=i;c[b+40>>2]=i;c[b+44>>2]=i;c[b+48>>2]=i;c[b+52>>2]=i;c[b+56>>2]=i;c[b+60>>2]=i;b=b+64|0}while((b|0)<(f|0)){c[b>>2]=i;b=b+4|0}}while((b|0)<(h|0)){a[b>>0]=d;b=b+1|0}return h-e|0}function Qa(b,d,e){b=b|0;d=d|0;e=e|0;var f=0,g=0,h=0;if((e|0)>=8192)return $(b|0,d|0,e|0)|0;h=b|0;g=b+e|0;if((b&3)==(d&3)){while(b&3){if(!e)return h|0;a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0;e=e-1|0}e=g&-4|0;f=e-64|0;while((b|0)<=(f|0)){c[b>>2]=c[d>>2];c[b+4>>2]=c[d+4>>2];c[b+8>>2]=c[d+8>>2];c[b+12>>2]=c[d+12>>2];c[b+16>>2]=c[d+16>>2];c[b+20>>2]=c[d+20>>2];c[b+24>>2]=c[d+24>>2];c[b+28>>2]=c[d+28>>2];c[b+32>>2]=c[d+32>>2];c[b+36>>2]=c[d+36>>2];c[b+40>>2]=c[d+40>>2];c[b+44>>2]=c[d+44>>2];c[b+48>>2]=c[d+48>>2];c[b+52>>2]=c[d+52>>2];c[b+56>>2]=c[d+56>>2];c[b+60>>2]=c[d+60>>2];b=b+64|0;d=d+64|0}while((b|0)<(e|0)){c[b>>2]=c[d>>2];b=b+4|0;d=d+4|0}}else{e=g-4|0;while((b|0)<(e|0)){a[b>>0]=a[d>>0]|0;a[b+1>>0]=a[d+1>>0]|0;a[b+2>>0]=a[d+2>>0]|0;a[b+3>>0]=a[d+3>>0]|0;b=b+4|0;d=d+4|0}}while((b|0)<(g|0)){a[b>>0]=a[d>>0]|0;b=b+1|0;d=d+1|0}return h|0}function Ra(a,b){a=a|0;b=b|0;return ga[a&1](b|0)|0}function Sa(a,b,c,d){a=a|0;b=b|0;c=c|0;d=d|0;return ha[a&3](b|0,c|0,d|0)|0}function Ta(a){a=a|0;S(0);return 0}function Ua(a,b,c){a=a|0;b=b|0;c=c|0;S(1);return 0}

// EMSCRIPTEN_END_FUNCS
var ga=[Ta,za];var ha=[Ua,Ga,Aa,Ua];return{_kiss_fftr_alloc:ua,_kiss_fftri:wa,_memset:Pa,setThrew:ma,_kiss_fftr:va,_kiss_fft_alloc:qa,_sbrk:Oa,_memcpy:Qa,stackAlloc:ia,getTempRet0:oa,setTempRet0:na,_kiss_fftr_free:ta,dynCall_iiii:Sa,_kiss_fft:sa,_emscripten_get_global_libc:Ha,dynCall_ii:Ra,stackSave:ja,_free:ya,runPostSets:Na,establishStackSpace:la,stackRestore:ka,_malloc:xa,_kiss_fft_free:pa}})


// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg,Module.asmLibraryArg,buffer);var _kiss_fftr=Module["_kiss_fftr"]=asm["_kiss_fftr"];var getTempRet0=Module["getTempRet0"]=asm["getTempRet0"];var _free=Module["_free"]=asm["_free"];var runPostSets=Module["runPostSets"]=asm["runPostSets"];var setTempRet0=Module["setTempRet0"]=asm["setTempRet0"];var _kiss_fftr_alloc=Module["_kiss_fftr_alloc"]=asm["_kiss_fftr_alloc"];var _kiss_fftr_free=Module["_kiss_fftr_free"]=asm["_kiss_fftr_free"];var _kiss_fft_free=Module["_kiss_fft_free"]=asm["_kiss_fft_free"];var _kiss_fftri=Module["_kiss_fftri"]=asm["_kiss_fftri"];var _kiss_fft_alloc=Module["_kiss_fft_alloc"]=asm["_kiss_fft_alloc"];var _memset=Module["_memset"]=asm["_memset"];var _malloc=Module["_malloc"]=asm["_malloc"];var _kiss_fft=Module["_kiss_fft"]=asm["_kiss_fft"];var _emscripten_get_global_libc=Module["_emscripten_get_global_libc"]=asm["_emscripten_get_global_libc"];var _memcpy=Module["_memcpy"]=asm["_memcpy"];var stackAlloc=Module["stackAlloc"]=asm["stackAlloc"];var setThrew=Module["setThrew"]=asm["setThrew"];var _sbrk=Module["_sbrk"]=asm["_sbrk"];var stackRestore=Module["stackRestore"]=asm["stackRestore"];var establishStackSpace=Module["establishStackSpace"]=asm["establishStackSpace"];var stackSave=Module["stackSave"]=asm["stackSave"];var dynCall_ii=Module["dynCall_ii"]=asm["dynCall_ii"];var dynCall_iiii=Module["dynCall_iiii"]=asm["dynCall_iiii"];Runtime.stackAlloc=Module["stackAlloc"];Runtime.stackSave=Module["stackSave"];Runtime.stackRestore=Module["stackRestore"];Runtime.establishStackSpace=Module["establishStackSpace"];Runtime.setTempRet0=Module["setTempRet0"];Runtime.getTempRet0=Module["getTempRet0"];Module["asm"]=asm;Module["then"]=(function(func){if(Module["calledRun"]){func(Module)}else{var old=Module["onRuntimeInitialized"];Module["onRuntimeInitialized"]=(function(){if(old)old();func(Module)})}return Module});function ExitStatus(status){this.name="ExitStatus";this.message="Program terminated with exit("+status+")";this.status=status}ExitStatus.prototype=new Error;ExitStatus.prototype.constructor=ExitStatus;var initialStackTop;var preloadStartTime=null;var calledMain=false;dependenciesFulfilled=function runCaller(){if(!Module["calledRun"])run();if(!Module["calledRun"])dependenciesFulfilled=runCaller};Module["callMain"]=Module.callMain=function callMain(args){args=args||[];ensureInitRuntime();var argc=args.length+1;function pad(){for(var i=0;i<4-1;i++){argv.push(0)}}var argv=[allocate(intArrayFromString(Module["thisProgram"]),"i8",ALLOC_NORMAL)];pad();for(var i=0;i<argc-1;i=i+1){argv.push(allocate(intArrayFromString(args[i]),"i8",ALLOC_NORMAL));pad()}argv.push(0);argv=allocate(argv,"i32",ALLOC_NORMAL);try{var ret=Module["_main"](argc,argv,0);exit(ret,true)}catch(e){if(e instanceof ExitStatus){return}else if(e=="SimulateInfiniteLoop"){Module["noExitRuntime"]=true;return}else{var toLog=e;if(e&&typeof e==="object"&&e.stack){toLog=[e,e.stack]}Module.printErr("exception thrown: "+toLog);Module["quit"](1,e)}}finally{calledMain=true}};function run(args){args=args||Module["arguments"];if(preloadStartTime===null)preloadStartTime=Date.now();if(runDependencies>0){return}preRun();if(runDependencies>0)return;if(Module["calledRun"])return;function doRun(){if(Module["calledRun"])return;Module["calledRun"]=true;if(ABORT)return;ensureInitRuntime();preMain();if(Module["onRuntimeInitialized"])Module["onRuntimeInitialized"]();if(Module["_main"]&&shouldRunNow)Module["callMain"](args);postRun()}if(Module["setStatus"]){Module["setStatus"]("Running...");setTimeout((function(){setTimeout((function(){Module["setStatus"]("")}),1);doRun()}),1)}else{doRun()}}Module["run"]=Module.run=run;function exit(status,implicit){if(implicit&&Module["noExitRuntime"]){return}if(Module["noExitRuntime"]){}else{ABORT=true;EXITSTATUS=status;STACKTOP=initialStackTop;exitRuntime();if(Module["onExit"])Module["onExit"](status)}if(ENVIRONMENT_IS_NODE){process["exit"](status)}Module["quit"](status,new ExitStatus(status))}Module["exit"]=Module.exit=exit;var abortDecorators=[];function abort(what){if(Module["onAbort"]){Module["onAbort"](what)}if(what!==undefined){Module.print(what);Module.printErr(what);what=JSON.stringify(what)}else{what=""}ABORT=true;EXITSTATUS=1;var extra="\nIf this abort() is unexpected, build with -s ASSERTIONS=1 which can give more information.";var output="abort("+what+") at "+stackTrace()+extra;if(abortDecorators){abortDecorators.forEach((function(decorator){output=decorator(output,what)}))}throw output}Module["abort"]=Module.abort=abort;if(Module["preInit"]){if(typeof Module["preInit"]=="function")Module["preInit"]=[Module["preInit"]];while(Module["preInit"].length>0){Module["preInit"].pop()()}}var shouldRunNow=true;if(Module["noInitialRun"]){shouldRunNow=false}run()





  return KissFFTModule;
};
if (typeof module === "object" && module.exports) {
  module['exports'] = KissFFTModule;
};

var kissFFTModule = KissFFTModule({});

var kiss_fftr_alloc = kissFFTModule.cwrap(
    'kiss_fftr_alloc', 'number', ['number', 'number', 'number', 'number' ]
);

var kiss_fftr = kissFFTModule.cwrap(
    'kiss_fftr', 'void', ['number', 'number', 'number' ]
);

var kiss_fftri = kissFFTModule.cwrap(
    'kiss_fftri', 'void', ['number', 'number', 'number' ]
);

var kiss_fftr_free = kissFFTModule.cwrap(
    'kiss_fftr_free', 'void', ['number']
);

var kiss_fft_alloc = kissFFTModule.cwrap(
    'kiss_fft_alloc', 'number', ['number', 'number', 'number', 'number' ]
);

var kiss_fft = kissFFTModule.cwrap(
    'kiss_fft', 'void', ['number', 'number', 'number' ]
);

var kiss_fft_free = kissFFTModule.cwrap(
    'kiss_fft_free', 'void', ['number']
);

var FFT = function (size) {

    this.size = size;
    this.fcfg = kiss_fft_alloc(size, false);
    this.icfg = kiss_fft_alloc(size, true);
    
    this.inptr = kissFFTModule._malloc(size*8 + size*8);
    this.outptr = this.inptr + size*8;
    
    this.cin = new Float32Array(kissFFTModule.HEAPU8.buffer, this.inptr, size*2);
    this.cout = new Float32Array(kissFFTModule.HEAPU8.buffer, this.outptr, size*2);
    
    this.forward = function(cin) {
	this.cin.set(cin);
	kiss_fft(this.fcfg, this.inptr, this.outptr);
	return new Float32Array(kissFFTModule.HEAPU8.buffer,
				this.outptr, this.size * 2);
    };
    
    this.inverse = function(cin) {
	this.cin.set(cpx);
	kiss_fft(this.icfg, this.inptr, this.outptr);
	return new Float32Array(kissFFTModule.HEAPU8.buffer,
				this.outptr, this.size * 2);
    };
    
    this.dispose = function() {
	kissFFTModule._free(this.inptr);
	kiss_fft_free(this.fcfg);
	kiss_fft_free(this.icfg);
    }
};

var FFTR = function (size) {

    this.size = size;
    this.fcfg = kiss_fftr_alloc(size, false);
    this.icfg = kiss_fftr_alloc(size, true);
    
    this.rptr = kissFFTModule._malloc(size*4 + (size+2)*4);
    this.cptr = this.rptr + size*4;
    
    this.ri = new Float32Array(kissFFTModule.HEAPU8.buffer, this.rptr, size);
    this.ci = new Float32Array(kissFFTModule.HEAPU8.buffer, this.cptr, size+2);
    
//    this.outputptr = kissFFTModule._malloc((size+2)*4);
//    this.output = new Float32Array(kissFFTModule.HEAPU8.buffer,
//                               this.outputptr, this.size + 2);
//    
    this.forward = function(real,output) {
	this.ri.set(real);
	kiss_fftr(this.fcfg, this.rptr, this.cptr);
        
        
    //can replace with fixed buffer rather than new each time? Is there danger if returned from this function that memory never freed and eventually runs out?
	//return new Float32Array(kissFFTModule.HEAPU8.buffer, this.cptr, this.size + 2);
        
        output.set(this.ci);
      
        //calling code musn't destroy this?
        //return this.output;
        
    };
    
    this.inverse = function(cpx,output) {
	this.ci.set(cpx);
	kiss_fftri(this.icfg, this.cptr, this.rptr);
	//return new Float32Array(kissFFTModule.HEAPU8.buffer,
				//this.rptr, this.size);
      
        output.set(this.ri);
        
    };
    
    this.dispose = function() {
	kissFFTModule._free(this.rptr);
	kiss_fftr_free(this.fcfg);
	kiss_fftr_free(this.icfg);
    }
};

//module.exports = {
//    FFT: FFT,
//    FFTR: FFTR
//};
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


//adapted from:
/* 
 * Free FFT and convolution (JavaScript)
 * 
 * Copyright (c) 2017 Project Nayuki. (MIT License)
 * https://www.nayuki.io/page/free-small-fft-in-multiple-languages
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 * - The above copyright notice and this permission notice shall be included in
 *   all copies or substantial portions of the Software.
 * - The Software is provided "as is", without warranty of any kind, express or
 *   implied, including but not limited to the warranties of merchantability,
 *   fitness for a particular purpose and noninfringement. In no event shall the
 *   authors or copyright holders be liable for any claim, damages or other
 *   liability, whether in an action of contract, tort or otherwise, arising from,
 *   out of or in connection with the Software or the use or other dealings in the
 *   Software.
 */
 
 //added initialisation of cosine tables to avoid recalculation with each frame
 //commented out some currently unneeded functions for now
 


function MMLLFFT() {
    
    this.cosTable = 0;
    this.sinTable = 0;

    
    this.setupFFT = function(n) {
        
        
            //pre calculate
            // Trigonometric tables
            
            
            //if ((n & (n - 1)) == 0)  // Is power of 2, e.g. no overlap of bit pattern since n as 2^k introduces new bit over 2^k-1
            //{
                
                this.cosTable = new Array(n / 2);
                this.sinTable = new Array(n / 2);
                
                for (var i = 0; i < n / 2; i++) {
                    this.cosTable[i] = Math.cos(2 * Math.PI * i / n);
                    this.sinTable[i] = Math.sin(2 * Math.PI * i / n);
                }
                
//            }
//            else  // More complicated algorithm for arbitrary sizes
//            {
//                
//                // Trignometric tables
//                this.cosTable = new Array(n);
//                this.sinTable = new Array(n);
//                for (var i = 0; i < n; i++) {
//                    var j = i * i % (n * 2);  // This is more accurate than j = i * i
//                    this.cosTable[i] = Math.cos(Math.PI * j / n);
//                    this.sinTable[i] = Math.sin(Math.PI * j / n);
//                }
//                
//            }
        
        }

    







/* 
 * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
 * The vector's length must be a power of 2. Uses the Cooley-Tukey decimation-in-time radix-2 algorithm.
 */
    //transformRadix2
this.transform = function (real, imag) {
	// Length variables
	var n = real.length;
	if (n != imag.length)
		throw "Mismatched lengths";
	if (n == 1)  // Trivial transform
		return;
	var levels = -1;
	for (var i = 0; i < 32; i++) {
		if (1 << i == n)
			levels = i;  // Equal to log2(n)
	}
	if (levels == -1)
		throw "Length is not a power of 2";
	

	
	// Bit-reversed addressing permutation
	for (var i = 0; i < n; i++) {
		var j = reverseBits(i, levels);
		if (j > i) {
			var temp = real[i];
			real[i] = real[j];
			real[j] = temp;
			temp = imag[i];
			imag[i] = imag[j];
			imag[j] = temp;
		}
	}

	// Cooley-Tukey decimation-in-time radix-2 FFT
	for (var size = 2; size <= n; size *= 2) {
		var halfsize = size / 2;
		var tablestep = n / size;
		for (var i = 0; i < n; i += size) {
			for (var j = i, k = 0; j < i + halfsize; j++, k += tablestep) {
				var l = j + halfsize;
				var tpre =  real[l] * this.cosTable[k] + imag[l] * this.sinTable[k];
				var tpim = -real[l] * this.sinTable[k] + imag[l] * this.cosTable[k];
				real[l] = real[j] - tpre;
				imag[l] = imag[j] - tpim;
				real[j] += tpre;
				imag[j] += tpim;
			}
		}
	}
	
	// Returns the integer whose value is the reverse of the lowest 'bits' bits of the integer 'x'.
	function reverseBits(x, bits) {
		var y = 0;
		for (var i = 0; i < bits; i++) {
			y = (y << 1) | (x & 1);
			x >>>= 1;
		}
		return y;
	}
}

    
    /*
     * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
     * The vector can have any length. This is a wrapper function.
     */
//    this.transform = function(real,imag) {
//        
//        //console.log('check', cosTable.length,sinTable.length, real.length);
//        
//        var n = real.length;
//        if (n != imag.length)
//            throw "Mismatched lengths";
//        if (n == 0)
//            return;
//        else if ((n & (n - 1)) == 0)  // Is power of 2
//            this.transformRadix2(real, imag);
//        else  // More complicated algorithm for arbitrary sizes
//            transformBluestein(real, imag);
//    }

//
///* 
// * Computes the circular convolution of the given real vectors. Each vector's length must be the same.
// */
//function convolveReal(x, y, out) {
//	var n = x.length;
//	if (n != y.length || n != out.length)
//		throw "Mismatched lengths";
//	convolveComplex(x, newArrayOfZeros(n), y, newArrayOfZeros(n), out, newArrayOfZeros(n));
//}
//
//
///* 
// * Computes the circular convolution of the given complex vectors. Each vector's length must be the same.
// */
//function convolveComplex(xreal, ximag, yreal, yimag, outreal, outimag) {
//	var n = xreal.length;
//	if (n != ximag.length || n != yreal.length || n != yimag.length
//			|| n != outreal.length || n != outimag.length)
//		throw "Mismatched lengths";
//	
//	xreal = xreal.slice();
//	ximag = ximag.slice();
//	yreal = yreal.slice();
//	yimag = yimag.slice();
//	transform(xreal, ximag);
//	transform(yreal, yimag);
//	
//	for (var i = 0; i < n; i++) {
//		var temp = xreal[i] * yreal[i] - ximag[i] * yimag[i];
//		ximag[i] = ximag[i] * yreal[i] + xreal[i] * yimag[i];
//		xreal[i] = temp;
//	}
//	inverseTransform(xreal, ximag);
//	
//	for (var i = 0; i < n; i++) {  // Scaling (because this FFT implementation omits it)
//		outreal[i] = xreal[i] / n;
//		outimag[i] = ximag[i] / n;
//	}
//}
//
//
//function newArrayOfZeros(n) {
//	var result = [];
//	for (var i = 0; i < n; i++)
//		result.push(0);
//	return result;
//}
//    
// 
//    
//    /*
//     * Computes the discrete Fourier transform (DFT) of the given complex vector, storing the result back into the vector.
//     * The vector can have any length. This requires the convolution function, which in turn requires the radix-2 FFT function.
//     * Uses Bluestein's chirp z-transform algorithm.
//     */
//    function transformBluestein(real, imag) {
//        // Find a power-of-2 convolution length m such that m >= n * 2 + 1
//        var n = real.length;
//        if (n != imag.length)
//            throw "Mismatched lengths";
//        var m = 1;
//        while (m < n * 2 + 1)
//            m *= 2;
//        
//        
//        // Temporary vectors and preprocessing
//        var areal = newArrayOfZeros(m);
//        var aimag = newArrayOfZeros(m);
//        for (var i = 0; i < n; i++) {
//            areal[i] =  real[i] * cosTable[i] + imag[i] * sinTable[i];
//            aimag[i] = -real[i] * sinTable[i] + imag[i] * cosTable[i];
//        }
//        var breal = newArrayOfZeros(m);
//        var bimag = newArrayOfZeros(m);
//        breal[0] = cosTable[0];
//        bimag[0] = sinTable[0];
//        for (var i = 1; i < n; i++) {
//            breal[i] = breal[m - i] = cosTable[i];
//            bimag[i] = bimag[m - i] = sinTable[i];
//        }
//        
//        // Convolution
//        var creal = new Array(m);
//        var cimag = new Array(m);
//        convolveComplex(areal, aimag, breal, bimag, creal, cimag);
//        
//        // Postprocessing
//        for (var i = 0; i < n; i++) {
//            real[i] =  creal[i] * cosTable[i] + cimag[i] * sinTable[i];
//            imag[i] = -creal[i] * sinTable[i] + cimag[i] * cosTable[i];
//        }
//    }
//    
//
//    /*
//     * Computes the inverse discrete Fourier transform (IDFT) of the given complex vector, storing the result back into the vector.
//     * The vector can have any length. This is a wrapper function. This transform does not perform scaling, so the inverse is not a true inverse.
//     */
//    function inverseTransform(real, imag) {
//        transform(imag, real);
//    }


}

//short term Fourier transform
//currently just calculates power spectrum, could modify later for phase spectrum etc

function MMLLSTFT(fftsize=1024,hopsize=512,windowtype=0,postfftfunction) {
    
    this.fftsize = fftsize;
    this.halffftsize = fftsize/2;
    this.windowtype = windowtype;
    this.postfftfunction = postfftfunction;
    
    this.windowing= new MMLLwindowing(this.fftsize,this.halffftsize);
    //this.fft = new MMLLFFT(); //
    this.fft = new FFTR(fftsize);
    
    //this.fft.setupFFT(fftsize);
    
    this.windowdata = new Float32Array(this.fftsize); //begins as zeroes
    this.hanning = new Float32Array(this.fftsize);
    
    var ang=(2.0*Math.PI)/this.fftsize;
    
    for(var i=0;i<fftsize;++i)
        this.hanning[i]=0.5 - 0.5*Math.cos(ang*i);
    
    //initialised containing zeroes
    this.powers = new Float32Array(this.halffftsize);
    //var freqs = result.subarray(result.length / 2);
    this.reals = new Float32Array(this.fftsize);
    
    this.complex = new Float32Array(this.fftsize+2);
    
    //this.imags = new Float32Array(this.fftsize);
    
    //4 =2*2 compensates for half magnitude if only take non-conjugate part, fftsize compensates for 1/N
    this.fftnormmult = 4*this.fftsize; //*fftsize;// /4; //1.0/fftsize;  or 1/(fftsize.sqrt)
    
    this.next = function(input) {
        
        //update by audioblocksize samples
        var ready = this.windowing.next(input);
        
        if(ready) {
            
            //no window function (square window)
            if(this.windowtype==0) {
            for (i = 0; i< this.fftsize; ++i) {
                this.reals[i] = this.windowing.store[i]; //*hanning[i];
                //this.imags[i] = 0.0;
                
            }
            } else {
                for (i = 0; i< this.fftsize; ++i) {
                    this.reals[i] = this.windowing.store[i]*this.hanning[i];
                    //this.imags[i] = 0.0;
                    
                }
            }
  
            //fft library call
            //this.fft.transform(this.reals, this.imags);
            //var output = this.fft.forward(this.reals);
            
            this.fft.forward(this.reals,this.complex);
            
            //output format is interleaved k*2, k*2+1 real and imag parts
            //DC and 0 then bin 1 real and imag ... nyquist and 0
            
            //power spectrum not amps, for comparative testing
            for (var k = 0; k < this.halffftsize; ++k) {
                //Math.sqrt(
                var twok = 2*k;
                //this.powers[k] = ((output[twok] * output[twok]) + (output[twok+1] * output[twok+1]) ); // * fftnormmult;
                
                this.powers[k] = ((this.complex[twok] * this.complex[twok]) + (this.complex[twok+1] * this.complex[twok+1]) );
                
                //will scale later in onset detector itself
                
                //this.powers[k] = ((this.reals[k] * this.reals[k]) + (this.imags[k] * this.imags[k]) ); // * fftnormmult;
                
                //freqs[k - align] = (2 * k / N) * (sample_rate / 2);
            }
            
            //console.log(this.postfftfunction,'undefined');
            
            if(this.postfftfunction !== undefined)
            this.postfftfunction(this.powers,this.complex); //could pass this.complex as second argument to get phase spectrum etc
            
            
        }
        
        return ready;
        
    }
    
   

}

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

//Nick Collins chord detection algorithm adapted from my SuperCollider KeyTrack code, with addition of MeanSeperation step for vertical vs horizontal, e.g., only use FFT information where tonal predominates over percussive, following:
//Derry FitzGerald (2010) "Harmonic/Percussive Separation using Median Filtering" International Conference on Digital Audio Effects (DAFx)


function MMLLChordDetector(sampleRate, keydecay=2, chromaleak=0.5) {
    
    
    
    //helpful constants
    //#define N 4096
   
    //weighting parameters
    
    //4096 FFT at 44100 SR
    //[720]
    this.g_weights44100 = [ 0.89160997732426, 0.10839002267574, 0.39160997732426, 0.10839002267574, 0.2249433106576, 0.10839002267574, 0.14160997732426, 0.10839002267574, 0.091609977324263, 0.10839002267574, 0.05827664399093, 0.10839002267574, 0.58784929938181, 0.41215070061819, 0.087849299381813, 0.41215070061819, 0.25451596604848, 0.078817367284855, 0.087849299381813, 0.16215070061819, 0.18784929938181, 0.012150700618187, 0.087849299381812, 0.078817367284855, 0.26602607158423, 0.73397392841577, 0.26602607158423, 0.23397392841577, 0.26602607158423, 0.067307261749107, 0.016026071584227, 0.23397392841577, 0.066026071584226, 0.13397392841577, 0.099359404917559, 0.067307261749107, 0.9250662388251, 0.074933761174898, 0.4250662388251, 0.074933761174898, 0.25839957215844, 0.074933761174898, 0.1750662388251, 0.074933761174898, 0.1250662388251, 0.074933761174898, 0.091732905491768, 0.074933761174898, 0.56383187935789, 0.43616812064211, 0.063831879357891, 0.43616812064211, 0.23049854602456, 0.10283478730877, 0.063831879357891, 0.18616812064211, 0.16383187935789, 0.03616812064211, 0.063831879357892, 0.10283478730877, 0.18111740708786, 0.81888259291214, 0.18111740708786, 0.31888259291214, 0.18111740708786, 0.15221592624547, 0.18111740708786, 0.068882592912141, 0.18111740708786, 0.018882592912141, 0.014450740421193, 0.15221592624547, 0.77564554804057, 0.22435445195943, 0.27564554804057, 0.22435445195943, 0.1089788813739, 0.22435445195943, 0.02564554804057, 0.22435445195943, 0.17564554804057, 0.024354451959429, 0.1089788813739, 0.057687785292764, 0.34606307757871, 0.65393692242129, 0.34606307757871, 0.15393692242129, 0.012729744245378, 0.32060358908796, 0.096063077578711, 0.15393692242129, 0.14606307757871, 0.053936922421289, 0.012729744245378, 0.15393692242129, 0.89093630414068, 0.10906369585932, 0.39093630414068, 0.10906369585932, 0.22426963747401, 0.10906369585932, 0.14093630414068, 0.10906369585932, 0.090936304140679, 0.10906369585932, 0.057602970807346, 0.10906369585932, 0.40874628442826, 0.59125371557174, 0.40874628442826, 0.091253715571737, 0.075412951094929, 0.2579203822384, 0.15874628442826, 0.091253715571737, 0.0087462844282626, 0.19125371557174, 0.075412951094929, 0.091253715571738, 0.89788375407457, 0.10211624592543, 0.39788375407457, 0.10211624592543, 0.23121708740791, 0.10211624592543, 0.14788375407457, 0.10211624592543, 0.097883754074573, 0.10211624592543, 0.06455042074124, 0.10211624592543, 0.35664375687383, 0.64335624312617, 0.35664375687383, 0.14335624312617, 0.023310423540502, 0.31002290979283, 0.10664375687383, 0.14335624312617, 0.15664375687384, 0.043356243126163, 0.023310423540502, 0.14335624312616, 0.78321995464853, 0.21678004535147, 0.28321995464853, 0.21678004535147, 0.11655328798186, 0.21678004535147, 0.033219954648526, 0.21678004535147, 0.18321995464853, 0.016780045351474, 0.11655328798186, 0.050113378684807, 0.17569859876363, 0.82430140123637, 0.17569859876363, 0.32430140123637, 0.17569859876362, 0.15763473456971, 0.17569859876363, 0.074301401236374, 0.17569859876363, 0.024301401236373, 0.0090319320969575, 0.15763473456971, 0.53205214316846, 0.46794785683154, 0.032052143168455, 0.46794785683154, 0.19871880983512, 0.13461452349821, 0.032052143168455, 0.21794785683154, 0.13205214316846, 0.067947856831543, 0.032052143168454, 0.13461452349821, 0.8501324776502, 0.1498675223498, 0.3501324776502, 0.1498675223498, 0.18346581098354, 0.1498675223498, 0.1001324776502, 0.1498675223498, 0.050132477650203, 0.1498675223498, 0.01679914431687, 0.1498675223498, 0.12766375871578, 0.87233624128422, 0.12766375871578, 0.37233624128422, 0.12766375871578, 0.20566957461755, 0.12766375871578, 0.12233624128422, 0.12766375871578, 0.072336241284219, 0.12766375871578, 0.039002907950883, 0.36223481417572, 0.63776518582428, 0.36223481417572, 0.13776518582428, 0.028901480842386, 0.30443185249095, 0.11223481417572, 0.13776518582428, 0.16223481417572, 0.037765185824279, 0.028901480842386, 0.13776518582428, 0.55129109608114, 0.44870890391886, 0.05129109608114, 0.44870890391886, 0.21795776274781, 0.11537557058553, 0.05129109608114, 0.19870890391886, 0.15129109608114, 0.048708903918859, 0.051291096081139, 0.11537557058553, 0.69212615515742, 0.30787384484258, 0.19212615515742, 0.30787384484258, 0.025459488490756, 0.30787384484258, 0.19212615515742, 0.057873844842579, 0.092126155157422, 0.10787384484258, 0.025459488490756, 0.14120717817591, 0.78187260828136, 0.21812739171864, 0.28187260828136, 0.21812739171864, 0.11520594161469, 0.21812739171864, 0.031872608281361, 0.21812739171864, 0.18187260828136, 0.018127391718639, 0.11520594161469, 0.051460725051972, 0.81749256885653, 0.18250743114347, 0.31749256885653, 0.18250743114347, 0.15082590218986, 0.18250743114348, 0.067492568856526, 0.18250743114347, 0.017492568856525, 0.18250743114347, 0.15082590218986, 0.015840764476809, 0.79576750814915, 0.20423249185085, 0.29576750814915, 0.20423249185085, 0.12910084148248, 0.20423249185085, 0.045767508149147, 0.20423249185085, 0.19576750814915, 0.0042324918508541, 0.12910084148248, 0.037565825184186, 0.71328751374767, 0.28671248625233, 0.21328751374767, 0.28671248625233, 0.046620847081009, 0.28671248625232, 0.21328751374767, 0.036712486252327, 0.11328751374767, 0.086712486252327, 0.046620847081009, 0.12004581958566, 0.56643990929705, 0.43356009070295, 0.066439909297053, 0.43356009070295, 0.23310657596372, 0.10022675736961, 0.066439909297053, 0.18356009070295, 0.16643990929705, 0.033560090702949, 0.066439909297053, 0.10022675736961, 0.35139719752725, 0.64860280247275, 0.35139719752725, 0.14860280247275, 0.018063864193915, 0.31526946913942, 0.10139719752725, 0.14860280247275, 0.15139719752725, 0.048602802472746, 0.018063864193915, 0.14860280247275, 0.06410428633691, 0.93589571366309, 0.06410428633691, 0.43589571366309, 0.064104286336909, 0.26922904699642, 0.06410428633691, 0.18589571366309, 0.064104286336914, 0.13589571366309, 0.064104286336909, 0.10256238032976, 0.70026495530041, 0.29973504469959, 0.20026495530041, 0.29973504469959, 0.03359828863374, 0.29973504469959, 0.20026495530041, 0.049735044699592, 0.10026495530041, 0.099735044699594, 0.03359828863374, 0.13306837803293, 0.25532751743156, 0.74467248256844, 0.25532751743156, 0.24467248256844, 0.25532751743157, 0.078005815901766, 0.0053275174315637, 0.24467248256844, 0.055327517431562, 0.14467248256844, 0.088660850764901, 0.078005815901766, 0.72446962835144, 0.27553037164856, 0.22446962835144, 0.27553037164856, 0.057802961684772, 0.27553037164856, 0.22446962835144, 0.025530371648557, 0.12446962835144, 0.075530371648557, 0.057802961684772, 0.1088637049819, 0.10258219216228, 0.89741780783772, 0.10258219216228, 0.39741780783772, 0.10258219216228, 0.23075114117105, 0.10258219216228, 0.14741780783772, 0.10258219216228, 0.097417807837718, 0.10258219216228, 0.064084474504388, 0.38425231031485, 0.61574768968515, 0.38425231031485, 0.11574768968515, 0.050918976981516, 0.28241435635182, 0.13425231031485, 0.11574768968515, 0.18425231031485, 0.015747689685151, 0.050918976981516, 0.11574768968515, 0.56374521656272, 0.43625478343728, 0.063745216562722, 0.43625478343728, 0.23041188322939, 0.10292145010394, 0.063745216562722, 0.18625478343728, 0.16374521656272, 0.036254783437278, 0.063745216562722, 0.10292145010394, 0.63498513771305, 0.36501486228695, 0.13498513771305, 0.36501486228695, 0.30165180437972, 0.031681528953617, 0.13498513771305, 0.11501486228695, 0.034985137713051, 0.16501486228695, 0.13498513771305, 0.031681528953617, 0.5915350162983, 0.4084649837017, 0.091535016298302, 0.4084649837017, 0.25820168296497, 0.075131650368367, 0.091535016298302, 0.1584649837017, 0.1915350162983, 0.0084649837017025, 0.091535016298299, 0.075131650368367, 0.42657502749535, 0.57342497250465, 0.42657502749535, 0.073424972504654, 0.093241694162018, 0.24009163917132, 0.17657502749535, 0.073424972504654, 0.026575027495346, 0.17342497250465, 0.093241694162018, 0.073424972504649, 0.13287981859411, 0.86712018140589, 0.13287981859411, 0.36712018140589, 0.13287981859411, 0.20045351473923, 0.13287981859411, 0.11712018140589, 0.1328798185941, 0.067120181405897, 0.13287981859411, 0.033786848072561, 0.7027943950545, 0.2972056049455, 0.2027943950545, 0.2972056049455, 0.03612772838783, 0.2972056049455, 0.2027943950545, 0.047205604945496, 0.10279439505451, 0.097205604945492, 0.03612772838783, 0.13053893827884, 0.12820857267382, 0.87179142732618, 0.12820857267382, 0.37179142732618, 0.12820857267382, 0.20512476065952, 0.12820857267382, 0.12179142732618, 0.12820857267383, 0.071791427326173, 0.12820857267382, 0.038458093992849, 0.40052991060082, 0.59947008939918, 0.40052991060082, 0.099470089399183, 0.067196577267481, 0.26613675606585, 0.15052991060082, 0.099470089399183, 0.0005299106008124, 0.19947008939919, 0.067196577267481, 0.099470089399186, 0.51065503486313, 0.48934496513687, 0.010655034863127, 0.48934496513687, 0.1773217015298, 0.15601163180353, 0.010655034863127, 0.23934496513687, 0.11065503486312, 0.089344965136877, 0.010655034863134, 0.15601163180353, 0.44893925670289, 0.55106074329711, 0.44893925670289, 0.051060743297114, 0.11560592336954, 0.21772740996379, 0.19893925670289, 0.051060743297114, 0.048939256702886, 0.15106074329711, 0.11560592336954, 0.051060743297124, 0.20516438432456, 0.79483561567544, 0.20516438432456, 0.29483561567544, 0.20516438432456, 0.12816894900878, 0.20516438432456, 0.044835615675439, 0.0051643843245643, 0.19483561567544, 0.03849771765789, 0.12816894900878, 0.7685046206297, 0.2314953793703, 0.2685046206297, 0.2314953793703, 0.10183795396303, 0.2314953793703, 0.018504620629699, 0.2314953793703, 0.1685046206297, 0.031495379370301, 0.10183795396303, 0.064828712703635, 0.12749043312544, 0.87250956687456, 0.12749043312544, 0.37250956687456, 0.12749043312544, 0.20584290020789, 0.12749043312544, 0.12250956687456, 0.12749043312544, 0.072509566874555, 0.12749043312544, 0.039176233541222, 0.2699702754261, 0.7300297245739, 0.2699702754261, 0.2300297245739, 0.2699702754261, 0.063363057907234, 0.019970275426104, 0.2300297245739, 0.069970275426101, 0.1300297245739, 0.10330360875943, 0.063363057907234, 0.1830700325966, 0.8169299674034, 0.1830700325966, 0.3169299674034, 0.1830700325966, 0.15026330073673, 0.1830700325966, 0.066929967403397, 0.18307003259659, 0.016929967403405, 0.016403365929932, 0.15026330073673, 0.85315005499069, 0.14684994500931, 0.35315005499069, 0.14684994500931, 0.18648338832404, 0.1468499450093, 0.10315005499069, 0.14684994500931, 0.053150054990692, 0.14684994500931, 0.019816721657368, 0.1468499450093, 0.26575963718821, 0.73424036281179, 0.26575963718821, 0.23424036281179, 0.26575963718821, 0.067573696145123, 0.015759637188211, 0.23424036281179, 0.065759637188205, 0.13424036281179, 0.099092970521544, 0.067573696145123, 0.40558879010901, 0.59441120989099, 0.40558879010901, 0.094411209890993, 0.07225545677566, 0.26107787655767, 0.15558879010901, 0.094411209890993, 0.0055887901090159, 0.19441120989098, 0.07225545677566, 0.094411209891007, 0.25641714534767, 0.74358285465233, 0.25641714534767, 0.24358285465233, 0.25641714534767, 0.07691618798566, 0.0064171453476689, 0.24358285465233, 0.056417145347666, 0.14358285465233, 0.089750478681007, 0.07691618798566, 0.80105982120163, 0.19894017879837, 0.30105982120163, 0.19894017879837, 0.13439315453496, 0.19894017879837, 0.051059821201633, 0.19894017879837, 0.0010598212016248, 0.19894017879838, 0.13439315453496, 0.032273512131705, 0.021310069726255, 0.97868993027375, 0.021310069726255, 0.47868993027375, 0.021310069726269, 0.31202326360706, 0.021310069726255, 0.22868993027375, 0.021310069726246, 0.17868993027375, 0.021310069726269, 0.1453565969404, 0.89787851340579, 0.10212148659421, 0.39787851340579, 0.10212148659421, 0.23121184673912, 0.10212148659421, 0.14787851340579, 0.10212148659421, 0.097878513405794, 0.10212148659421, 0.064545180072457, 0.10212148659421, 0.41032876864912, 0.58967123135088, 0.41032876864912, 0.089671231350877, 0.07699543531578, 0.25633789801755, 0.16032876864912, 0.089671231350877, 0.010328768649129, 0.18967123135087, 0.07699543531578, 0.089671231350887, 0.5370092412594, 0.4629907587406, 0.037009241259398, 0.4629907587406, 0.20367590792606, 0.12965742540727, 0.037009241259398, 0.2129907587406, 0.1370092412594, 0.062990758740602, 0.037009241259398, 0.12965742540727, 0.25498086625089, 0.74501913374911, 0.25498086625089, 0.24501913374911, 0.25498086625089, 0.078352467082444, 0.0049808662508894, 0.24501913374911, 0.054980866250889, 0.14501913374911, 0.088314199584223, 0.078352467082444, 0.53994055085221, 0.46005944914779, 0.039940550852208, 0.46005944914779, 0.20660721751887, 0.12672611581447, 0.039940550852208, 0.21005944914779, 0.1399405508522, 0.060059449147798, 0.039940550852198, 0.12672611581447, 0.36614006519321, 0.63385993480679, 0.36614006519321, 0.13385993480679, 0.032806731859864, 0.30052660147347, 0.11614006519321, 0.13385993480679, 0.16614006519319, 0.03385993480681, 0.032806731859864, 0.1338599348068, 0.70630010998138, 0.29369989001862, 0.20630010998138, 0.29369989001862, 0.039633443314737, 0.2936998900186, 0.20630010998138, 0.043699890018615, 0.10630010998138, 0.093699890018615, 0.039633443314737, 0.12703322335193 ];
    //720
    this.g_bins44100 = [ 5, 6, 10, 11, 15, 16, 20, 21, 25, 26, 30, 31, 5, 6, 10, 11, 16, 17, 21, 22, 27, 28, 32, 33, 5, 6, 11, 12, 17, 18, 22, 23, 28, 29, 34, 35, 6, 7, 12, 13, 18, 19, 24, 25, 30, 31, 36, 37, 6, 7, 12, 13, 19, 20, 25, 26, 32, 33, 38, 39, 6, 7, 13, 14, 20, 21, 27, 28, 34, 35, 40, 41, 7, 8, 14, 15, 21, 22, 28, 29, 36, 37, 43, 44, 7, 8, 15, 16, 22, 23, 30, 31, 38, 39, 45, 46, 8, 9, 16, 17, 24, 25, 32, 33, 40, 41, 48, 49, 8, 9, 17, 18, 25, 26, 34, 35, 42, 43, 51, 52, 9, 10, 18, 19, 27, 28, 36, 37, 45, 46, 54, 55, 9, 10, 19, 20, 28, 29, 38, 39, 48, 49, 57, 58, 10, 11, 20, 21, 30, 31, 40, 41, 51, 52, 61, 62, 10, 11, 21, 22, 32, 33, 43, 44, 54, 55, 64, 65, 11, 12, 22, 23, 34, 35, 45, 46, 57, 58, 68, 69, 12, 13, 24, 25, 36, 37, 48, 49, 60, 61, 72, 73, 12, 13, 25, 26, 38, 39, 51, 52, 64, 65, 77, 78, 13, 14, 27, 28, 40, 41, 54, 55, 68, 69, 81, 82, 14, 15, 28, 29, 43, 44, 57, 58, 72, 73, 86, 87, 15, 16, 30, 31, 45, 46, 61, 62, 76, 77, 91, 92, 16, 17, 32, 33, 48, 49, 64, 65, 81, 82, 97, 98, 17, 18, 34, 35, 51, 52, 68, 69, 85, 86, 103, 104, 18, 19, 36, 37, 54, 55, 72, 73, 91, 92, 109, 110, 19, 20, 38, 39, 57, 58, 77, 78, 96, 97, 115, 116, 20, 21, 40, 41, 61, 62, 81, 82, 102, 103, 122, 123, 21, 22, 43, 44, 64, 65, 86, 87, 108, 109, 129, 130, 22, 23, 45, 46, 68, 69, 91, 92, 114, 115, 137, 138, 24, 25, 48, 49, 72, 73, 97, 98, 121, 122, 145, 146, 25, 26, 51, 52, 77, 78, 102, 103, 128, 129, 154, 155, 27, 28, 54, 55, 81, 82, 109, 110, 136, 137, 163, 164, 28, 29, 57, 58, 86, 87, 115, 116, 144, 145, 173, 174, 30, 31, 61, 62, 91, 92, 122, 123, 153, 154, 183, 184, 32, 33, 64, 65, 97, 98, 129, 130, 162, 163, 194, 195, 34, 35, 68, 69, 103, 104, 137, 138, 171, 172, 206, 207, 36, 37, 72, 73, 109, 110, 145, 146, 182, 183, 218, 219, 38, 39, 77, 78, 115, 116, 154, 155, 192, 193, 231, 232, 40, 41, 81, 82, 122, 123, 163, 164, 204, 205, 245, 246, 43, 44, 86, 87, 129, 130, 173, 174, 216, 217, 259, 260, 45, 46, 91, 92, 137, 138, 183, 184, 229, 230, 275, 276, 48, 49, 97, 98, 145, 146, 194, 195, 242, 243, 291, 292, 51, 52, 102, 103, 154, 155, 205, 206, 257, 258, 308, 309, 54, 55, 109, 110, 163, 164, 218, 219, 272, 273, 327, 328, 57, 58, 115, 116, 173, 174, 231, 232, 288, 289, 346, 347, 61, 62, 122, 123, 183, 184, 244, 245, 306, 307, 367, 368, 64, 65, 129, 130, 194, 195, 259, 260, 324, 325, 389, 390, 68, 69, 137, 138, 206, 207, 274, 275, 343, 344, 412, 413, 72, 73, 145, 146, 218, 219, 291, 292, 364, 365, 436, 437, 77, 78, 154, 155, 231, 232, 308, 309, 385, 386, 462, 463, 81, 82, 163, 164, 245, 246, 326, 327, 408, 409, 490, 491, 86, 87, 173, 174, 259, 260, 346, 347, 432, 433, 519, 520, 91, 92, 183, 184, 275, 276, 366, 367, 458, 459, 550, 551, 97, 98, 194, 195, 291, 292, 388, 389, 485, 486, 583, 584, 102, 103, 205, 206, 308, 309, 411, 412, 514, 515, 617, 618, 109, 110, 218, 219, 327, 328, 436, 437, 545, 546, 654, 655, 115, 116, 231, 232, 346, 347, 462, 463, 577, 578, 693, 694, 122, 123, 244, 245, 367, 368, 489, 490, 612, 613, 734, 735, 129, 130, 259, 260, 389, 390, 518, 519, 648, 649, 778, 779, 137, 138, 274, 275, 412, 413, 549, 550, 687, 688, 824, 825, 145, 146, 291, 292, 436, 437, 582, 583, 728, 729, 873, 874, 154, 155, 308, 309, 462, 463, 617, 618, 771, 772, 925, 926 ];
    
    //4096 FFT at 48000 SR
    //[720]
    this.g_weights48000 = [ 0.30666666666667, 0.69333333333333, 0.30666666666667, 0.19333333333333, 0.30666666666667, 0.026666666666667, 0.056666666666667, 0.19333333333333, 0.10666666666667, 0.093333333333333, 0.14, 0.026666666666667, 0.027586543807041, 0.97241345619296, 0.027586543807041, 0.47241345619296, 0.02758654380704, 0.30574678952629, 0.027586543807041, 0.22241345619296, 0.027586543807041, 0.17241345619296, 0.02758654380704, 0.13908012285963, 0.73191145326801, 0.26808854673199, 0.23191145326801, 0.26808854673199, 0.065244786601342, 0.26808854673199, 0.23191145326801, 0.018088546731992, 0.13191145326801, 0.068088546731992, 0.065244786601342, 0.10142188006533, 0.41865460692056, 0.58134539307944, 0.41865460692056, 0.081345393079437, 0.08532127358723, 0.2480120597461, 0.16865460692056, 0.081345393079437, 0.018654606920562, 0.18134539307944, 0.08532127358723, 0.081345393079437, 0.086770539160062, 0.91322946083994, 0.086770539160062, 0.41322946083994, 0.086770539160063, 0.24656279417327, 0.086770539160062, 0.16322946083994, 0.086770539160062, 0.11322946083994, 0.086770539160063, 0.079896127506604, 0.73515161776197, 0.26484838223803, 0.23515161776197, 0.26484838223803, 0.068484951095304, 0.26484838223803, 0.23515161776197, 0.014848382238029, 0.13515161776197, 0.064848382238029, 0.068484951095304, 0.098181715571363, 0.36262434726227, 0.63737565273773, 0.36262434726227, 0.13737565273773, 0.02929101392894, 0.30404231940439, 0.11262434726227, 0.13737565273773, 0.16262434726227, 0.037375652737727, 0.02929101392894, 0.13737565273773, 0.96794545252544, 0.032054547474559, 0.46794545252544, 0.032054547474559, 0.30127878585877, 0.03205454747456, 0.21794545252544, 0.032054547474559, 0.16794545252544, 0.03205454747456, 0.13461211919211, 0.03205454747456, 0.54979772942925, 0.45020227057075, 0.049797729429249, 0.45020227057075, 0.21646439609592, 0.11686893723742, 0.049797729429249, 0.20020227057075, 0.14979772942925, 0.05020227057075, 0.049797729429249, 0.11686893723742, 0.10678564881847, 0.89321435118153, 0.10678564881847, 0.39321435118153, 0.10678564881847, 0.22654768451487, 0.10678564881847, 0.14321435118153, 0.10678564881847, 0.093214351181534, 0.10678564881847, 0.059881017848201, 0.63743069905602, 0.36256930094398, 0.13743069905602, 0.36256930094398, 0.30409736572268, 0.029235967610653, 0.13743069905602, 0.11256930094398, 0.037430699056014, 0.16256930094399, 0.13743069905601, 0.029235967610653, 0.14016645162784, 0.85983354837216, 0.14016645162784, 0.35983354837216, 0.14016645162784, 0.1931668817055, 0.14016645162784, 0.10983354837216, 0.14016645162784, 0.059833548372163, 0.14016645162784, 0.02650021503883, 0.61333333333333, 0.38666666666667, 0.11333333333333, 0.38666666666667, 0.28, 0.053333333333333, 0.11333333333333, 0.13666666666667, 0.013333333333334, 0.18666666666667, 0.11333333333333, 0.053333333333333, 0.055173087614081, 0.94482691238592, 0.055173087614081, 0.44482691238592, 0.055173087614081, 0.27816024571925, 0.055173087614081, 0.19482691238592, 0.055173087614082, 0.14482691238592, 0.055173087614081, 0.11149357905259, 0.46382290653602, 0.53617709346398, 0.46382290653602, 0.036177093463982, 0.13048957320268, 0.20284376013065, 0.21382290653602, 0.036177093463982, 0.063822906536019, 0.13617709346398, 0.13048957320268, 0.036177093463982, 0.83730921384113, 0.16269078615887, 0.33730921384113, 0.16269078615887, 0.17064254717446, 0.16269078615887, 0.087309213841126, 0.16269078615887, 0.037309213841124, 0.16269078615888, 0.0039758805077928, 0.16269078615887, 0.17354107832012, 0.82645892167988, 0.17354107832012, 0.32645892167988, 0.17354107832013, 0.15979225501321, 0.17354107832012, 0.076458921679876, 0.17354107832012, 0.026458921679875, 0.0068744116534584, 0.15979225501321, 0.47030323552394, 0.52969676447606, 0.47030323552394, 0.029696764476057, 0.13696990219061, 0.19636343114272, 0.22030323552394, 0.029696764476057, 0.070303235523944, 0.12969676447606, 0.13696990219061, 0.029696764476057, 0.72524869452455, 0.27475130547545, 0.22524869452455, 0.27475130547545, 0.058582027857881, 0.27475130547545, 0.22524869452455, 0.024751305475453, 0.12524869452455, 0.074751305475453, 0.058582027857881, 0.10808463880879, 0.93589090505088, 0.064109094949119, 0.43589090505088, 0.064109094949119, 0.26922423838421, 0.06410909494912, 0.18589090505088, 0.064109094949119, 0.13589090505088, 0.06410909494912, 0.10255757171755, 0.06410909494912, 0.0995954588585, 0.9004045411415, 0.0995954588585, 0.4004045411415, 0.0995954588585, 0.23373787447483, 0.0995954588585, 0.1504045411415, 0.099595458858502, 0.1004045411415, 0.0995954588585, 0.067071207808167, 0.21357129763693, 0.78642870236307, 0.21357129763693, 0.28642870236307, 0.21357129763693, 0.1197620356964, 0.21357129763693, 0.036428702363068, 0.013571297636932, 0.18642870236307, 0.046904630970265, 0.1197620356964, 0.27486139811203, 0.72513860188797, 0.27486139811203, 0.22513860188797, 0.27486139811203, 0.058471935221306, 0.02486139811203, 0.22513860188797, 0.074861398112029, 0.12513860188797, 0.10819473144536, 0.058471935221306, 0.28033290325568, 0.71966709674432, 0.28033290325568, 0.21966709674432, 0.28033290325568, 0.053000430077657, 0.030332903255676, 0.21966709674432, 0.080332903255675, 0.11966709674433, 0.11366623658901, 0.053000430077657, 0.22666666666667, 0.77333333333333, 0.22666666666667, 0.27333333333333, 0.22666666666667, 0.10666666666667, 0.22666666666667, 0.023333333333333, 0.026666666666668, 0.17333333333333, 0.06, 0.10666666666667, 0.11034617522816, 0.88965382477184, 0.11034617522816, 0.38965382477184, 0.11034617522816, 0.22298715810517, 0.11034617522816, 0.13965382477184, 0.11034617522816, 0.089653824771835, 0.11034617522816, 0.056320491438505, 0.92764581307204, 0.072354186927964, 0.42764581307204, 0.072354186927964, 0.26097914640537, 0.072354186927965, 0.17764581307204, 0.072354186927964, 0.12764581307204, 0.072354186927961, 0.094312479738702, 0.072354186927965, 0.67461842768225, 0.32538157231775, 0.17461842768225, 0.32538157231775, 0.0079517610155856, 0.32538157231775, 0.17461842768225, 0.075381572317749, 0.074618427682248, 0.12538157231775, 0.0079517610155856, 0.15871490565108, 0.34708215664025, 0.65291784335975, 0.34708215664025, 0.15291784335975, 0.013748823306917, 0.31958451002642, 0.097082156640248, 0.15291784335975, 0.14708215664025, 0.052917843359751, 0.013748823306917, 0.15291784335975, 0.94060647104789, 0.059393528952114, 0.44060647104789, 0.059393528952114, 0.27393980438122, 0.059393528952114, 0.19060647104789, 0.059393528952114, 0.14060647104789, 0.059393528952111, 0.10727313771455, 0.059393528952114, 0.45049738904909, 0.54950261095091, 0.45049738904909, 0.049502610950906, 0.11716405571576, 0.21616927761757, 0.20049738904909, 0.049502610950906, 0.050497389049093, 0.14950261095091, 0.11716405571576, 0.049502610950905, 0.87178181010177, 0.12821818989823, 0.37178181010177, 0.12821818989823, 0.2051151434351, 0.12821818989823, 0.12178181010177, 0.12821818989823, 0.071781810101766, 0.12821818989823, 0.038448476768437, 0.12821818989823, 0.199190917717, 0.800809082283, 0.199190917717, 0.300809082283, 0.199190917717, 0.13414241561633, 0.199190917717, 0.050809082282999, 0.199190917717, 0.00080908228299563, 0.032524251050333, 0.13414241561633, 0.42714259527386, 0.57285740472614, 0.42714259527386, 0.072857404726136, 0.093809261940531, 0.2395240713928, 0.17714259527386, 0.072857404726136, 0.027142595273864, 0.17285740472614, 0.093809261940531, 0.072857404726136, 0.54972279622406, 0.45027720377594, 0.04972279622406, 0.45027720377594, 0.21638946289073, 0.1169438704426, 0.04972279622406, 0.20027720377594, 0.14972279622406, 0.050277203775937, 0.049722796224065, 0.1169438704426, 0.56066580651135, 0.43933419348865, 0.060665806511352, 0.43933419348865, 0.22733247317802, 0.10600086015531, 0.060665806511352, 0.18933419348865, 0.16066580651135, 0.039334193488651, 0.060665806511352, 0.10600086015531, 0.45333333333333, 0.54666666666667, 0.45333333333333, 0.046666666666667, 0.12, 0.21333333333333, 0.20333333333333, 0.046666666666667, 0.053333333333336, 0.14666666666666, 0.12, 0.046666666666667, 0.22069235045632, 0.77930764954368, 0.22069235045632, 0.27930764954368, 0.22069235045632, 0.11264098287701, 0.22069235045632, 0.029307649543675, 0.020692350456329, 0.17930764954367, 0.054025683789656, 0.11264098287701, 0.85529162614407, 0.14470837385593, 0.35529162614407, 0.14470837385593, 0.1886249594774, 0.14470837385593, 0.10529162614407, 0.14470837385593, 0.055291626144077, 0.14470837385592, 0.021958292810737, 0.14470837385593, 0.3492368553645, 0.6507631446355, 0.3492368553645, 0.1507631446355, 0.015903522031171, 0.31742981130216, 0.099236855364502, 0.1507631446355, 0.1492368553645, 0.050763144635505, 0.015903522031171, 0.1507631446355, 0.6941643132805, 0.3058356867195, 0.1941643132805, 0.3058356867195, 0.027497646613834, 0.3058356867195, 0.1941643132805, 0.055835686719504, 0.094164313280498, 0.1058356867195, 0.027497646613834, 0.13916902005283, 0.88121294209577, 0.11878705790423, 0.38121294209577, 0.11878705790423, 0.21454627542911, 0.11878705790423, 0.13121294209577, 0.11878705790423, 0.081212942095777, 0.11878705790422, 0.047879608762438, 0.11878705790423, 0.90099477809819, 0.099005221901812, 0.40099477809819, 0.099005221901812, 0.23432811143152, 0.09900522190181, 0.15099477809819, 0.099005221901812, 0.10099477809819, 0.099005221901814, 0.067661444764857, 0.09900522190181, 0.74356362020353, 0.25643637979647, 0.24356362020353, 0.25643637979647, 0.076896953536874, 0.25643637979646, 0.24356362020353, 0.0064363797964688, 0.14356362020353, 0.056436379796469, 0.076896953536874, 0.089769713129793, 0.398381835434, 0.601618164566, 0.398381835434, 0.101618164566, 0.065048502100666, 0.26828483123267, 0.148381835434, 0.101618164566, 0.19838183543401, 0.0016181645659913, 0.065048502100666, 0.101618164566, 0.85428519054773, 0.14571480945227, 0.35428519054773, 0.14571480945227, 0.18761852388106, 0.14571480945227, 0.10428519054773, 0.14571480945227, 0.054285190547728, 0.14571480945227, 0.020951857214394, 0.14571480945227, 0.09944559244812, 0.90055440755188, 0.09944559244812, 0.40055440755188, 0.09944559244813, 0.2338877408852, 0.09944559244812, 0.15055440755188, 0.099445592448126, 0.10055440755187, 0.09944559244813, 0.067221074218537, 0.1213316130227, 0.8786683869773, 0.1213316130227, 0.3786683869773, 0.1213316130227, 0.21200172031063, 0.1213316130227, 0.1286683869773, 0.1213316130227, 0.078668386977301, 0.1213316130227, 0.045335053643962, 0.90666666666667, 0.093333333333334, 0.40666666666667, 0.093333333333334, 0.24, 0.093333333333334, 0.15666666666667, 0.093333333333334, 0.10666666666667, 0.093333333333328, 0.073333333333333, 0.093333333333334, 0.44138470091265, 0.55861529908735, 0.44138470091265, 0.05861529908735, 0.10805136757931, 0.22528196575402, 0.19138470091265, 0.05861529908735, 0.041384700912658, 0.15861529908734, 0.10805136757931, 0.058615299087355, 0.71058325228817, 0.28941674771183, 0.21058325228817, 0.28941674771183, 0.043916585621503, 0.28941674771183, 0.21058325228817, 0.039416747711826, 0.11058325228817, 0.089416747711834, 0.043916585621503, 0.12275008104516, 0.698473710729, 0.301526289271, 0.198473710729, 0.301526289271, 0.031807044062343, 0.30152628927099, 0.198473710729, 0.051526289270996, 0.09847371072899, 0.10152628927101, 0.031807044062343, 0.13485962260432, 0.38832862656099, 0.61167137343901, 0.38832862656099, 0.11167137343901, 0.054995293227667, 0.27833804010567, 0.13832862656099, 0.11167137343901, 0.188328626561, 0.011671373439003, 0.054995293227667, 0.111671373439, 0.76242588419157, 0.23757411580843, 0.26242588419157, 0.23757411580843, 0.095759217524896, 0.23757411580844, 0.012425884191572, 0.23757411580843, 0.16242588419157, 0.037574115808434, 0.095759217524896, 0.070907449141771, 0.80198955619638, 0.19801044380362, 0.30198955619638, 0.19801044380362, 0.13532288952971, 0.19801044380362, 0.051989556196375, 0.19801044380362, 0.0019895561963722, 0.19801044380363, 0.13532288952971, 0.031343777136954, 0.48712724040706, 0.51287275959294, 0.48712724040706, 0.012872759592938, 0.15379390707375, 0.17953942625959, 0.23712724040706, 0.012872759592938, 0.087127240407062, 0.11287275959294, 0.15379390707375, 0.012872759592919, 0.796763670868, 0.203236329132, 0.296763670868, 0.203236329132, 0.13009700420133, 0.203236329132, 0.046763670868003, 0.203236329132, 0.19676367086802, 0.0032363291319825, 0.13009700420133, 0.036569662465335, 0.70857038109546, 0.29142961890454, 0.20857038109546, 0.29142961890454, 0.041903714428789, 0.29142961890454, 0.20857038109546, 0.041429618904544, 0.10857038109546, 0.091429618904544, 0.041903714428789, 0.12476295223788, 0.19889118489624, 0.80110881510376, 0.19889118489624, 0.30110881510376, 0.19889118489626, 0.13444214843707, 0.19889118489624, 0.05110881510376, 0.19889118489625, 0.0011088151037484, 0.032224518229593, 0.13444214843707, 0.24266322604541, 0.75733677395459, 0.24266322604541, 0.25733677395459, 0.24266322604541, 0.090670107287925, 0.24266322604541, 0.0073367739545915, 0.042663226045397, 0.1573367739546, 0.075996559378742, 0.090670107287925 ];
    //[720]
    this.g_bins48000 = [ 4, 5, 9, 10, 14, 15, 18, 19, 23, 24, 28, 29, 4, 5, 9, 10, 14, 15, 19, 20, 24, 25, 29, 30, 5, 6, 10, 11, 15, 16, 21, 22, 26, 27, 31, 32, 5, 6, 11, 12, 16, 17, 22, 23, 27, 28, 33, 34, 5, 6, 11, 12, 17, 18, 23, 24, 29, 30, 35, 36, 6, 7, 12, 13, 18, 19, 25, 26, 31, 32, 37, 38, 6, 7, 13, 14, 19, 20, 26, 27, 33, 34, 39, 40, 7, 8, 14, 15, 21, 22, 28, 29, 35, 36, 42, 43, 7, 8, 14, 15, 22, 23, 29, 30, 37, 38, 44, 45, 7, 8, 15, 16, 23, 24, 31, 32, 39, 40, 47, 48, 8, 9, 16, 17, 25, 26, 33, 34, 41, 42, 50, 51, 8, 9, 17, 18, 26, 27, 35, 36, 44, 45, 53, 54, 9, 10, 18, 19, 28, 29, 37, 38, 46, 47, 56, 57, 9, 10, 19, 20, 29, 30, 39, 40, 49, 50, 59, 60, 10, 11, 21, 22, 31, 32, 42, 43, 52, 53, 63, 64, 11, 12, 22, 23, 33, 34, 44, 45, 55, 56, 66, 67, 11, 12, 23, 24, 35, 36, 47, 48, 59, 60, 70, 71, 12, 13, 25, 26, 37, 38, 50, 51, 62, 63, 75, 76, 13, 14, 26, 27, 39, 40, 53, 54, 66, 67, 79, 80, 14, 15, 28, 29, 42, 43, 56, 57, 70, 71, 84, 85, 14, 15, 29, 30, 44, 45, 59, 60, 74, 75, 89, 90, 15, 16, 31, 32, 47, 48, 63, 64, 78, 79, 94, 95, 16, 17, 33, 34, 50, 51, 66, 67, 83, 84, 100, 101, 17, 18, 35, 36, 53, 54, 70, 71, 88, 89, 106, 107, 18, 19, 37, 38, 56, 57, 75, 76, 93, 94, 112, 113, 19, 20, 39, 40, 59, 60, 79, 80, 99, 100, 119, 120, 21, 22, 42, 43, 63, 64, 84, 85, 105, 106, 126, 127, 22, 23, 44, 45, 66, 67, 89, 90, 111, 112, 133, 134, 23, 24, 47, 48, 70, 71, 94, 95, 118, 119, 141, 142, 25, 26, 50, 51, 75, 76, 100, 101, 125, 126, 150, 151, 26, 27, 53, 54, 79, 80, 106, 107, 132, 133, 159, 160, 28, 29, 56, 57, 84, 85, 112, 113, 140, 141, 168, 169, 29, 30, 59, 60, 89, 90, 119, 120, 149, 150, 178, 179, 31, 32, 63, 64, 94, 95, 126, 127, 157, 158, 189, 190, 33, 34, 66, 67, 100, 101, 133, 134, 167, 168, 200, 201, 35, 36, 70, 71, 106, 107, 141, 142, 177, 178, 212, 213, 37, 38, 75, 76, 112, 113, 150, 151, 187, 188, 225, 226, 39, 40, 79, 80, 119, 120, 159, 160, 198, 199, 238, 239, 42, 43, 84, 85, 126, 127, 168, 169, 210, 211, 252, 253, 44, 45, 89, 90, 133, 134, 178, 179, 223, 224, 267, 268, 47, 48, 94, 95, 141, 142, 189, 190, 236, 237, 283, 284, 50, 51, 100, 101, 150, 151, 200, 201, 250, 251, 300, 301, 53, 54, 106, 107, 159, 160, 212, 213, 265, 266, 318, 319, 56, 57, 112, 113, 168, 169, 225, 226, 281, 282, 337, 338, 59, 60, 119, 120, 178, 179, 238, 239, 298, 299, 357, 358, 63, 64, 126, 127, 189, 190, 252, 253, 315, 316, 378, 379, 66, 67, 133, 134, 200, 201, 267, 268, 334, 335, 401, 402, 70, 71, 141, 142, 212, 213, 283, 284, 354, 355, 425, 426, 75, 76, 150, 151, 225, 226, 300, 301, 375, 376, 450, 451, 79, 80, 159, 160, 238, 239, 318, 319, 397, 398, 477, 478, 84, 85, 168, 169, 252, 253, 337, 338, 421, 422, 505, 506, 89, 90, 178, 179, 267, 268, 357, 358, 446, 447, 535, 536, 94, 95, 189, 190, 283, 284, 378, 379, 473, 474, 567, 568, 100, 101, 200, 201, 300, 301, 400, 401, 501, 502, 601, 602, 106, 107, 212, 213, 318, 319, 424, 425, 530, 531, 637, 638, 112, 113, 225, 226, 337, 338, 450, 451, 562, 563, 675, 676, 119, 120, 238, 239, 357, 358, 476, 477, 596, 597, 715, 716, 126, 127, 252, 253, 378, 379, 505, 506, 631, 632, 757, 758, 133, 134, 267, 268, 401, 402, 535, 536, 669, 670, 802, 803, 141, 142, 283, 284, 425, 426, 567, 568, 708, 709, 850, 851 ];
   
    //major chord, minor chord, not worrying about 7ths, 9ths, sus 4, sus 2 et al
    this.g_diatonicmajor = [ 10.0, 0.0, 0.0, 0.0,  9, 0.0, 0.0, 8,  0.0, 0.0, 0.0, 0.0];
    this.g_diatonicminor = [ 10.0, 0.0, 0.0, 9,  0.0, 0.0, 0.0, 8,  0, 0.0, 0.0, 0.0];
    
    //[3] //[7]
    this.g_minor = [0,3,7]; //[0,2,3,5,7,8,11];
    this.g_major = [0,4,7]; //[0,2,4,5,7,9,11];
   

this.setup = function(sampleRate) {
	var i;
    
    this.m_srate = sampleRate;
    
	//if sample rate is 88200 or 96000, assume taking double size FFT to start with
	if(this.m_srate >= (44100*2)) {
        
        //presume double size function withfft(powers){}
        this.stft = new MMLLSTFT(8192,4096,0);
        
        this.m_srate = this.m_srate/2;
    } else {
        
        this.stft = new MMLLSTFT(4096,2048,0);
        
    }
    
    
	if(this.m_srate==44100)
	{
		this.m_weights = this.g_weights44100;
		this.m_bins = this.g_bins44100;
		this.m_frameperiod = 0.046439909297052;
	}
	else  //else 48000; potentially dangerous if it isn't! Fortunately, shouldn't write any data to unknown memory
	{
		this.m_weights = this.g_weights48000;
		this.m_bins = this.g_bins48000;
		this.m_frameperiod = 0.042666666666667;
	}
    
    
    this.numpreviousframes = 10;
    this.halfnumpreviousframes = Math.floor(this.numpreviousframes/2);
    
    this.lower = Math.floor(this.numpreviousframes/2);
    this.upper = Math.floor(this.numpreviousframes/2);
    
    //even
    if(this.numpreviousframes%2==0) {
        
        this.upper = this.upper-1;
        
    }
    
    this.previousfftdata = new Array(1024*this.numpreviousframes);
    this.previousfftdatapointer = 0;
    
    for(i=0; i<(1024*this.numpreviousframes); ++i)
        this.previousfftdata[i] = 0;
    
    
    this.chroma = new Array(12);
    this.m_key = new Array(24);
    this.m_histogram = new Array(24);
    
	//zero chroma
    for(i=0; i<12; ++i)
        this.chroma[i] = 0;
    
    for(i=0; i<24; ++i) {
        this.m_key[i] = 0;
        this.m_histogram[i] = 0;
    }
    
	this.chord = -1; //starts with unknown chord

    this.keydecay = keydecay;
    this.chromaleak = chromaleak;
    
}

    this.setup(sampleRate);

//must pass in fft data (power spectrum)
this.next = function(input) {

    var i,j;
 
    var ready = this.stft.next(input);
    
    if(ready) {
    
	var sum;
	var indexbase, index;
	//experimental; added leaky integration on each note; also, only add to sum if harmonic, i.e., not a transient
    
	var weights = this.m_weights;
	var bins = this.m_bins;
        
    var fftbuf = this.stft.powers;
    
    //update fftbuf based on tonal vs percussive, zero out bin energy of percussive (e.g. more vertical)
    //bins only dealt with below 1024 anyway, so no need to go higher in checks
 
    var previousfftdataoffset = this.previousfftdatapointer * 1024;
    
    var vertical = 0;
    var horizontal = 0;
    
    for (i=this.halfnumpreviousframes; i<1024; ++i) {
        
        this.previousfftdata[previousfftdataoffset+i] = fftbuf[i];
    
        horizontal = 0;
        
        for (j=0; j<this.numpreviousframes; ++j) {
            
            horizontal += this.previousfftdata[j*1024+i];
            
        }
        
        vertical = 0;
        
        for (j=(i-this.lower); j<=(i+this.upper); ++j) {
            
            vertical += fftbuf[j];
            
        }
        
        if(vertical>horizontal) {
            
            fftbuf[i] = 0;
            
        }
        
    }
    
    this.previousfftdatapointer = (this.previousfftdatapointer+1)%this.numpreviousframes;

	//update for new round; leaky integration
	for (i=0;i<12;++i)
		this.chroma[i] *= this.chromaleak;
    
	for (i=0;i<60;++i) {
		var chromaindex = (i+9)%12; //starts at A1 up to G#6
        
		sum = 0.0;
        
		indexbase = 12*i; //6 partials, 2 of each
        
		for(j=0;j<12;++j) { //12 if 144 data points
            
			index=indexbase+j;
            
			sum+= (weights[index])* (fftbuf[bins[index]]);
		}
        
        this.chroma[chromaindex]+= sum;
	}
    
	var key = this.m_key;
    
	//major
	for (i=0;i<12;++i) {
        
		sum = 0.0;
        
		for (j=0;j<3;++j) {
			indexbase = this.g_major[j];
            
			index = (i+indexbase)%12;
			//sum+=(chroma[index]*g_kkmajor[indexbase]);
            
			sum += this.chroma[index] * this.g_diatonicmajor[indexbase];
            
		}
        
		key[i] = sum; //10*log10(sum+1);
	}
    
	//minor
	for (i=0;i<12;++i) {
        
		sum = 0.0;
        
		for (j=0;j<3;++j) {
			
            indexbase = this.g_minor[j];
            
			index = (i+indexbase)%12;
			//sum+=(chroma[index]*g_kkminor[indexbase]);
            
			sum += this.chroma[index]*this.g_diatonicminor[indexbase];
            
		}
        
		key[12+i] = sum;
	}
 
	//keyleak in seconds, convert to drop time in FFT hop frames (FRAMEPERIOD)
    var testmax = this.keydecay/this.m_frameperiod;
	
    var keyleak = testmax>0.001 ? testmax : 0.001; //FRAMEPERIOD;
    
	//now number of frames, actual leak param is decay exponent to reach 0.01 in x seconds, ie 0.01 = leakparam ** (x/ffthopsize)
	//0.01 is -40dB
	keyleak = Math.pow(0.01,(1/keyleak));
    
	var histogram = this.m_histogram;
    
	var bestchord = 0;
	var bestscore = 0;
    
	for (i=0;i<24;++i) {
		histogram[i] = (keyleak*histogram[i])+key[i];
        
		if(histogram[i]>bestscore) {
			bestscore = histogram[i];
			bestchord = i;
		}
        
        //printf("%f ",histogram[i]);
	}
    
	//should find secondbest and only swap if win by a margin
    
	//printf(" best %d \n\n",bestkey);
	//what is winning currently? find max in histogram
    
	this.chord = bestchord;
    
    //return this.m_currentKey;
    
    }
    
    return this.chord;
    
  }


}


//Nick Collins 13/6/05 onset detection MIREX algorithm (adapted from SC3 UGen for stream based calculation)
//C code version Nick Collins 20 May 2005
//js version 2018
//trying to implement the best onset detection algo from AES118 paper, with event analysis data to be written to a buffer
//for potential NRT and RT use
//stores up to a second of audio, assumes that events are not longer than that minus a few FFT frames
//assumes 44100 SR and FFT of 1024, 512 overlap



//assumes sampling rate 44.1kHz
//assumes blocksizes itself?
//function OnsetDetector(N,SR)


function MMLLOnsetDetector(sampleRate,threshold=0.34) {
    
    //helpful constants

    //assumes fixed sampling rate
    //FFT data
    this.N = 1024
    this.NOVER2 = 512
//    this.OVERLAP = 512
//    this.OVERLAPINDEX = 512
//    this.HOPSIZE = 512
//    this.FS = 44100
//    this.FRAMESR = 172.2656
//    this.FRAMEPERIOD = 0.00581
//    
    this.NUMERBBANDS = 40;
    this.PASTERBBANDS = 3;
    //3 usually, but time resolution improved if made 1?
    
    //in FFT frames
    //this.MAXEVENTDUR 80;
    this.MINEVENTDUR = 3;
    //4 or maybe 2
    
    //7 frames is about 40 mS
    //peak picker will use 3 back, 3 forward
    this.DFFRAMESSTORED = 7;
    
//    this.MAXBLOCKSIZE = 64;
//    this.MAXBLOCKS = 700;


    
	//time positions
	//var m_frame;
	//var m_lastdetect;
	
	//loudness measure
	this.m_loudbands = new Array(this.NUMERBBANDS); //[NUMERBBANDS][PASTERBBANDS]; //stores previous loudness bands
	//var m_pasterbbandcounter;
    this.m_df = new Float64Array(this.DFFRAMESSTORED);
	//this.m_dfcounter;
	
	//recording state
	//this.m_onsetdetected;

//[43]
this.eqlbandbins = [1,2,3,4,5,6,7,8,9,11,13,15,17,19,22,25,28,32,36,41,46,52,58,65,73,82,92,103,116,129,144,161,180,201,225,251,280,312,348,388,433,483,513];
//[42]
    //last entry was 30, corrected to 29 to avoid grabbing nyquist value, only half fftsize bins actually calculated for power
    //safe anyway since only 40 ERB bands used
this.eqlbandsizes = [1,1,1,1,1,1,1,1,2,2,2,2,2,3,3,3,4,4,5,5,6,6,7,8,9,10,11,13,13,15,17,19,21,24,26,29,32,36,40,45,50,29];

//[42][11]
this.contours = [[ 47.88, 59.68, 68.55, 75.48, 81.71, 87.54, 93.24, 98.84,104.44,109.94,115.31],[ 29.04, 41.78, 51.98, 60.18, 67.51, 74.54, 81.34, 87.97, 94.61,101.21,107.74],[ 20.72, 32.83, 43.44, 52.18, 60.24, 67.89, 75.34, 82.70, 89.97, 97.23,104.49],[ 15.87, 27.14, 37.84, 46.94, 55.44, 63.57, 71.51, 79.34, 87.14, 94.97,102.37],[ 12.64, 23.24, 33.91, 43.27, 52.07, 60.57, 68.87, 77.10, 85.24, 93.44,100.90],[ 10.31, 20.43, 31.03, 40.54, 49.59, 58.33, 66.89, 75.43, 83.89, 92.34,100.80],[  8.51, 18.23, 28.83, 38.41, 47.65, 56.59, 65.42, 74.16, 82.89, 91.61,100.33],[  7.14, 16.55, 27.11, 36.79, 46.16, 55.27, 64.29, 73.24, 82.15, 91.06, 99.97],[  5.52, 14.58, 25.07, 34.88, 44.40, 53.73, 62.95, 72.18, 81.31, 90.44, 99.57],[  3.98, 12.69, 23.10, 32.99, 42.69, 52.27, 61.66, 71.15, 80.54, 89.93, 99.31],[  2.99, 11.43, 21.76, 31.73, 41.49, 51.22, 60.88, 70.51, 80.11, 89.70, 99.30],[  2.35, 10.58, 20.83, 30.86, 40.68, 50.51, 60.33, 70.08, 79.83, 89.58, 99.32],[  2.05, 10.12, 20.27, 30.35, 40.22, 50.10, 59.97, 69.82, 79.67, 89.52, 99.38],[  2.00,  9.93, 20.00, 30.07, 40.00, 49.93, 59.87, 69.80, 79.73, 89.67, 99.60],[  2.19, 10.00, 20.00, 30.00, 40.00, 50.00, 59.99, 69.99, 79.98, 89.98, 99.97],[  2.71, 10.56, 20.61, 30.71, 40.76, 50.81, 60.86, 70.96, 81.01, 91.06,101.17],[  3.11, 11.05, 21.19, 31.41, 41.53, 51.64, 61.75, 71.95, 82.05, 92.15,102.33],[  2.39, 10.69, 21.14, 31.52, 41.73, 51.95, 62.11, 72.31, 82.46, 92.56,102.59],[  1.50, 10.11, 20.82, 31.32, 41.62, 51.92, 62.12, 72.32, 82.52, 92.63,102.56],[ -0.17,  8.50, 19.27, 29.77, 40.07, 50.37, 60.57, 70.77, 80.97, 91.13,101.23],[ -1.80,  6.96, 17.77, 28.29, 38.61, 48.91, 59.13, 69.33, 79.53, 89.71, 99.86],[ -3.42,  5.49, 16.36, 26.94, 37.31, 47.61, 57.88, 68.08, 78.28, 88.41, 98.39],[ -4.73,  4.38, 15.34, 25.99, 36.39, 46.71, 57.01, 67.21, 77.41, 87.51, 97.41],[ -5.73,  3.63, 14.74, 25.48, 35.88, 46.26, 56.56, 66.76, 76.96, 87.06, 96.96],[ -6.24,  3.33, 14.59, 25.39, 35.84, 46.22, 56.52, 66.72, 76.92, 87.04, 97.00],[ -6.09,  3.62, 15.03, 25.83, 36.37, 46.70, 57.00, 67.20, 77.40, 87.57, 97.68],[ -5.32,  4.44, 15.90, 26.70, 37.28, 47.60, 57.90, 68.10, 78.30, 88.52, 98.78],[ -3.49,  6.17, 17.52, 28.32, 38.85, 49.22, 59.52, 69.72, 79.92, 90.20,100.61],[ -0.81,  8.58, 19.73, 30.44, 40.90, 51.24, 61.52, 71.69, 81.87, 92.15,102.63],[  2.91, 11.82, 22.64, 33.17, 43.53, 53.73, 63.96, 74.09, 84.22, 94.45,104.89],[  6.68, 15.19, 25.71, 36.03, 46.25, 56.31, 66.45, 76.49, 86.54, 96.72,107.15],[ 10.43, 18.65, 28.94, 39.02, 49.01, 58.98, 68.93, 78.78, 88.69, 98.83,109.36],[ 13.56, 21.65, 31.78, 41.68, 51.45, 61.31, 71.07, 80.73, 90.48,100.51,111.01],[ 14.36, 22.91, 33.19, 43.09, 52.71, 62.37, 71.92, 81.38, 90.88,100.56,110.56],[ 15.06, 23.90, 34.23, 44.05, 53.48, 62.90, 72.21, 81.43, 90.65, 99.93,109.34],[ 15.36, 23.90, 33.89, 43.31, 52.40, 61.42, 70.29, 79.18, 88.00, 96.69,105.17],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70]];
//[11]
this.phons = [2,10,20,30,40,50,60,70,80,90,100];

//empirically determined default value
this.threshold = threshold;

    



this.setup = function(sampleRate) {
	var i,j;
	
	
	////////time positions//////////
    //frames were in 64 sample blocks... no longer, now 512/64 = 8
	this.m_frame=0;
	this.m_lastdetect=-100;
	
    
    
    if(sampleRate >= (44100*2)) {
        
        this.stft = new MMLLSTFT(this.N * 2,this.NOVER2 * 2,1); // 1 = Hanning window
        
    } else {
        
        this.stft = new MMLLSTFT(this.N,this.NOVER2,1);
    }
    
	
	/////////loudness measure////////
	this.m_dfcounter=this.DFFRAMESSTORED-1;
	//zero loudness store 
	for(j=0;j<this.DFFRAMESSTORED;++j) {
		this.m_df[j]=0.0;
	}
	
    //this.m_loudbands = new Array(this.DFFRAMESSTORED); //[NUMERBBANDS][PASTERBBANDS];
    
	//zero previous specific loudness in Bark bands
	
    
    for(j=0;j<this.NUMERBBANDS;++j) {
        
        this.m_loudbands[j] = new Float64Array(this.PASTERBBANDS);
    
        for(i=0;i<this.PASTERBBANDS; ++i)
		{
			this.m_loudbands[j][i] = 0.0;
		}
    }
			
    this.m_pasterbbandcounter=0;
	
	this.m_onsetdetected=0;

	this.m_now=0;
	
}

    
    this.setup(sampleRate);

//must pass in fft data
this.next = function(input) {

    this.m_onsetdetected=0;
    
    var ready = this.stft.next(input);
    
    if(ready) {
        
    //FFT result analysis
    var fftbuf = this.stft.powers;
    
    //HAVE BEEN PASSED FFT POWERS RESULT
    this.m_frame = this.m_frame+1;
    
	//calculate loudness detection function
	this.calculatedf(fftbuf);
	
	//use detection function
	this.peakpickdf();
    
    }
    
    //1 if onset detected this cycle
    return this.m_onsetdetected;
    
//	if(this.m_onsetdetected) {
//		
//        //DO SOMETHING! how communicated back? By return value
//        
//		//printf("onset detected %d \n",(this.m_onsetdetected));
//		
//		//if(this.m_triggerid) SendTrigger(&this.mParent->mNode, this.m_triggerid, this.m_loudness);
//		
//		this.m_onsetdetected=0;
//		
//	}
}


	
//    // Look at the real signal as an interleaved complex vector by casting it.
//    // Then call the transformation function ctoz to get a split complex vector,
//    // which for a real signal, divides into an even-odd configuration.
//    vDSP_ctoz ((COMPLEX *) fftbuf, 2, &this.m_vA, 1, NOVER2);
//	
//    // Carry out a Forward FFT transform
//    vDSP_fft_zrip(this.m_vsetup, &this.m_vA, 1, this.m_vlog2n, FFT_FORWARD);
//	
//    // The output signal is now in a split real form.  Use the function
//    // ztoc to get a split real vector.
//    vDSP_ztoc ( &this.m_vA, 1, (COMPLEX *) fftbuf, 2, NOVER2);
//	
//	// Squared Absolute so get power
//	for (i=0; i<N; i+=2)
//		//i>>1 is i/2 
//		fftbuf[i>>1] = (fftbuf[i] * fftbuf[i]) + (fftbuf[i+1] * fftbuf[i+1]);
//	

    
//should take fft data
this.calculatedf = function(fftbuf) {
	
	var h, j,k;
	
    //TO SORT
	//float * fftbuf= this.m_FFTBuf;
	
	var dfsum=0.0;
	
	var pastband = this.m_pasterbbandcounter;
	
    var bandstart, bandsize, bsum;
    
    var db, prop, lastloud, diff;
    
	for (k=0; k<this.NUMERBBANDS; ++k){
		
		bandstart = this.eqlbandbins[k];
		//int bandend=eqlbandbins[k+1];
		bandsize = this.eqlbandsizes[k];
		
		bsum = 0.0;
		
		for (h=0; h<bandsize;++h) {
			bsum = bsum+fftbuf[h+bandstart];  //SORT
		}
		
		//store recips of bandsizes?
		bsum = bsum/bandsize;
		
		//into dB, avoid log of 0
		//float db= 10*log10((bsum*10 000 000)+0.001);
		//db = 10*Math.log10((bsum*32382)+0.001);
        
        //empirically determined. If FFT max magnitudes around 512 (half 1024) say (though rarely would see anything max out at all, might see 5 in a band!)
        
        //(10**11)/(512**2)
        db = 10*Math.log10((bsum*381469.7265625)+0.001);
        
        
        
        //near halfway ERB
//        if(k==20) {
//            console.log("db", db, "bsum", bsum, "fftval",fftbuf[bandstart]);
//            
//        }
		
		//printf("bsum %f db %f \n",bsum,db);
		
		//convert via contour
		if(db<this.contours[k][0]) db=0;
        else if (db>this.contours[k][10]) db=this.phons[10];
        else {
            
            prop = 0.0;
			
            for (j=1; j<11; ++j) {
                if(db<this.contours[k][j]) {
                    prop = (db-this.contours[k][j-1])/(this.contours[k][j]-this.contours[k][j-1]);
                    break;
				}
				
				if(j==10) 
					prop = 1.0;
            }
			
            db = (1.0-prop)*this.phons[j-1]+ prop*this.phons[j];
			//printf("prop %f db %f j %d\n",prop,db,j);
			
		}
		
		//float lastloud=this.m_loudbands[k];
        lastloud = 0.0;
		
		for(j=0;j<this.PASTERBBANDS; ++j)
			lastloud += this.m_loudbands[k][j];
		
		lastloud /= this.PASTERBBANDS;
		
        diff = db-lastloud;
        
        if(diff<0.0) diff = 0.0;
        
        //sc_max(db-lastloud,0.0);
		
		dfsum = dfsum+diff; //(bweights[k]*diff);
		
		this.m_loudbands[k][pastband] = db;
	}
	
	this.m_pasterbbandcounter = (pastband+1)%this.PASTERBBANDS;
	
	//increment first so this frame is this.m_dfcounter
	this.m_dfcounter = (this.m_dfcounter+1)%this.DFFRAMESSTORED;
	
	this.m_df[this.m_dfcounter] = dfsum*0.025; //divide by num of bands to get a dB answer
	
	//printf("loudness %f %f \n",this.loudness[this.loudnesscounter], lsum);

}


//score rating peak picker
this.peakpickdf = function() {
	var i;
	
	//smoothed already with df looking at average of previous values
	var dfnow = this.m_dfcounter+this.DFFRAMESSTORED;
	
	//rate the peak in the central position
	
	var dfassess = ((dfnow-3)%this.DFFRAMESSTORED)+this.DFFRAMESSTORED;
	
	//look at three either side
	
	var pos;
	var val;
	
	var centreval = this.m_df[dfassess%this.DFFRAMESSTORED];
	
	//must normalise 
	//printf("centreval %f \n",centreval);
	
	var score = 0.0;
	
    
    //console.log("centreval",centreval, dfnow, dfassess);
    
    
	for (i=(-3); i<4; ++i) {
		pos = (dfassess+i)%this.DFFRAMESSTORED;
		
		val = centreval-(this.m_df[pos]);
		
		if(val<0) val*=10; //exacerbate negative evidence
		
		score = score+val;
	}
	
    //MIREX detector
	//normalise such that df max assumed at 50, 0.02
	
    //SC UGen
	//normalise such that df max assumed at 200, 0.005, was 50, 0.02

    
	score *= 0.02; 
	
	//if enough time since last detection
	if((this.m_frame-this.m_lastdetect)>=this.MINEVENTDUR) {
		
		//SIMPLE THRESHOLDING PEAKPICKER
		//var threshold = 0.34; //ZIN0(2); //0.34 best in trials
		
		//printf("threshold %f score %f \n",threshold, score);
		
        //console.log("peakpick",score,this.threshold);
        
		if(score>=this.threshold) {
			this.m_lastdetect = this.m_frame;
			
			this.m_onsetdetected = 1;
		
			
		}
	}
}

}



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





var BeatTrackModule = function(BeatTrackModule) {
    BeatTrackModule = BeatTrackModule || {};
    var Module = BeatTrackModule;


// The Module object: Our interface to the outside world. We import
// and export values on it, and do the work to get that through
// closure compiler if necessary. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to do an eval in order to handle the closure compiler
// case, where this code here is minified but Module was defined
// elsewhere (e.g. case 4 above). We also need to check if Module
// already exists (e.g. case 3 above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module;
if (!Module) Module = (typeof BeatTrackModule !== 'undefined' ? BeatTrackModule : null) || {};

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
for (var key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

// The environment setup code below is customized to use Module.
// *** Environment setup code ***
var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;

// Three configurations we can be running in:
// 1) We could be the application main() thread running in the main JS UI thread. (ENVIRONMENT_IS_WORKER == false and ENVIRONMENT_IS_PTHREAD == false)
// 2) We could be the application main() thread proxied to worker. (with Emscripten -s PROXY_TO_WORKER=1) (ENVIRONMENT_IS_WORKER == true, ENVIRONMENT_IS_PTHREAD == false)
// 3) We could be an application pthread running in a worker. (ENVIRONMENT_IS_WORKER == true and ENVIRONMENT_IS_PTHREAD == true)

if (Module['ENVIRONMENT']) {
  if (Module['ENVIRONMENT'] === 'WEB') {
    ENVIRONMENT_IS_WEB = true;
  } else if (Module['ENVIRONMENT'] === 'WORKER') {
    ENVIRONMENT_IS_WORKER = true;
  } else if (Module['ENVIRONMENT'] === 'NODE') {
    ENVIRONMENT_IS_NODE = true;
  } else if (Module['ENVIRONMENT'] === 'SHELL') {
    ENVIRONMENT_IS_SHELL = true;
  } else {
    throw new Error('The provided Module[\'ENVIRONMENT\'] value is not valid. It must be one of: WEB|WORKER|NODE|SHELL.');
  }
} else {
  ENVIRONMENT_IS_WEB = typeof window === 'object';
  ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
  ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof require === 'function' && !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_WORKER;
  ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;
}


if (ENVIRONMENT_IS_NODE) {
  // Expose functionality in the same simple way that the shells work
  // Note that we pollute the global namespace here, otherwise we break in node
  if (!Module['print']) Module['print'] = console.log;
  if (!Module['printErr']) Module['printErr'] = console.warn;

  var nodeFS;
  var nodePath;

  Module['read'] = function shell_read(filename, binary) {
    if (!nodeFS) nodeFS = require('fs');
    if (!nodePath) nodePath = require('path');
    filename = nodePath['normalize'](filename);
    var ret = nodeFS['readFileSync'](filename);
    return binary ? ret : ret.toString();
  };

  Module['readBinary'] = function readBinary(filename) {
    var ret = Module['read'](filename, true);
    if (!ret.buffer) {
      ret = new Uint8Array(ret);
    }
    assert(ret.buffer);
    return ret;
  };

  Module['load'] = function load(f) {
    globalEval(read(f));
  };

  if (!Module['thisProgram']) {
    if (process['argv'].length > 1) {
      Module['thisProgram'] = process['argv'][1].replace(/\\/g, '/');
    } else {
      Module['thisProgram'] = 'unknown-program';
    }
  }

  Module['arguments'] = process['argv'].slice(2);

  if (typeof module !== 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });

  Module['inspect'] = function () { return '[Emscripten Module object]'; };
}
else if (ENVIRONMENT_IS_SHELL) {
  if (!Module['print']) Module['print'] = print;
  if (typeof printErr != 'undefined') Module['printErr'] = printErr; // not present in v8 or older sm

  if (typeof read != 'undefined') {
    Module['read'] = read;
  } else {
    Module['read'] = function shell_read() { throw 'no read() available' };
  }

  Module['readBinary'] = function readBinary(f) {
    if (typeof readbuffer === 'function') {
      return new Uint8Array(readbuffer(f));
    }
    var data = read(f, 'binary');
    assert(typeof data === 'object');
    return data;
  };

  if (typeof scriptArgs != 'undefined') {
    Module['arguments'] = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof quit === 'function') {
    Module['quit'] = function(status, toThrow) {
      quit(status);
    }
  }

}
else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  Module['read'] = function shell_read(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send(null);
    return xhr.responseText;
  };

  if (ENVIRONMENT_IS_WORKER) {
    Module['readBinary'] = function readBinary(url) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.responseType = 'arraybuffer';
      xhr.send(null);
      return new Uint8Array(xhr.response);
    };
  }

  Module['readAsync'] = function readAsync(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function xhr_onload() {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
      } else {
        onerror();
      }
    };
    xhr.onerror = onerror;
    xhr.send(null);
  };

  if (typeof arguments != 'undefined') {
    Module['arguments'] = arguments;
  }

  if (typeof console !== 'undefined') {
    if (!Module['print']) Module['print'] = function shell_print(x) {
      console.log(x);
    };
    if (!Module['printErr']) Module['printErr'] = function shell_printErr(x) {
      console.warn(x);
    };
  } else {
    // Probably a worker, and without console.log. We can do very little here...
    var TRY_USE_DUMP = false;
    if (!Module['print']) Module['print'] = (TRY_USE_DUMP && (typeof(dump) !== "undefined") ? (function(x) {
      dump(x);
    }) : (function(x) {
      // self.postMessage(x); // enable this if you want stdout to be sent as messages
    }));
  }

  if (ENVIRONMENT_IS_WORKER) {
    Module['load'] = importScripts;
  }

  if (typeof Module['setWindowTitle'] === 'undefined') {
    Module['setWindowTitle'] = function(title) { document.title = title };
  }
}
else {
  // Unreachable because SHELL is dependant on the others
  throw 'Unknown runtime environment. Where are we?';
}

function globalEval(x) {
  eval.call(null, x);
}
if (!Module['load'] && Module['read']) {
  Module['load'] = function load(f) {
    globalEval(Module['read'](f));
  };
}
if (!Module['print']) {
  Module['print'] = function(){};
}
if (!Module['printErr']) {
  Module['printErr'] = Module['print'];
}
if (!Module['arguments']) {
  Module['arguments'] = [];
}
if (!Module['thisProgram']) {
  Module['thisProgram'] = './this.program';
}
if (!Module['quit']) {
  Module['quit'] = function(status, toThrow) {
    throw toThrow;
  }
}

// *** Environment setup code ***

// Closure helpers
Module.print = Module['print'];
Module.printErr = Module['printErr'];

// Callbacks
Module['preRun'] = [];
Module['postRun'] = [];

// Merge back in the overrides
for (var key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = undefined;



// {{PREAMBLE_ADDITIONS}}

// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

//========================================
// Runtime code shared with compiler
//========================================

var Runtime = {
  setTempRet0: function (value) {
    tempRet0 = value;
    return value;
  },
  getTempRet0: function () {
    return tempRet0;
  },
  stackSave: function () {
    return STACKTOP;
  },
  stackRestore: function (stackTop) {
    STACKTOP = stackTop;
  },
  getNativeTypeSize: function (type) {
    switch (type) {
      case 'i1': case 'i8': return 1;
      case 'i16': return 2;
      case 'i32': return 4;
      case 'i64': return 8;
      case 'float': return 4;
      case 'double': return 8;
      default: {
        if (type[type.length-1] === '*') {
          return Runtime.QUANTUM_SIZE; // A pointer
        } else if (type[0] === 'i') {
          var bits = parseInt(type.substr(1));
          assert(bits % 8 === 0);
          return bits/8;
        } else {
          return 0;
        }
      }
    }
  },
  getNativeFieldSize: function (type) {
    return Math.max(Runtime.getNativeTypeSize(type), Runtime.QUANTUM_SIZE);
  },
  STACK_ALIGN: 16,
  prepVararg: function (ptr, type) {
    if (type === 'double' || type === 'i64') {
      // move so the load is aligned
      if (ptr & 7) {
        assert((ptr & 7) === 4);
        ptr += 4;
      }
    } else {
      assert((ptr & 3) === 0);
    }
    return ptr;
  },
  getAlignSize: function (type, size, vararg) {
    // we align i64s and doubles on 64-bit boundaries, unlike x86
    if (!vararg && (type == 'i64' || type == 'double')) return 8;
    if (!type) return Math.min(size, 8); // align structures internally to 64 bits
    return Math.min(size || (type ? Runtime.getNativeFieldSize(type) : 0), Runtime.QUANTUM_SIZE);
  },
  dynCall: function (sig, ptr, args) {
    if (args && args.length) {
      assert(args.length == sig.length-1);
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
      return Module['dynCall_' + sig].apply(null, [ptr].concat(args));
    } else {
      assert(sig.length == 1);
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
      return Module['dynCall_' + sig].call(null, ptr);
    }
  },
  functionPointers: [],
  addFunction: function (func) {
    for (var i = 0; i < Runtime.functionPointers.length; i++) {
      if (!Runtime.functionPointers[i]) {
        Runtime.functionPointers[i] = func;
        return 2*(1 + i);
      }
    }
    throw 'Finished up all reserved function pointers. Use a higher value for RESERVED_FUNCTION_POINTERS.';
  },
  removeFunction: function (index) {
    Runtime.functionPointers[(index-2)/2] = null;
  },
  warnOnce: function (text) {
    if (!Runtime.warnOnce.shown) Runtime.warnOnce.shown = {};
    if (!Runtime.warnOnce.shown[text]) {
      Runtime.warnOnce.shown[text] = 1;
      Module.printErr(text);
    }
  },
  funcWrappers: {},
  getFuncWrapper: function (func, sig) {
    assert(sig);
    if (!Runtime.funcWrappers[sig]) {
      Runtime.funcWrappers[sig] = {};
    }
    var sigCache = Runtime.funcWrappers[sig];
    if (!sigCache[func]) {
      // optimize away arguments usage in common cases
      if (sig.length === 1) {
        sigCache[func] = function dynCall_wrapper() {
          return Runtime.dynCall(sig, func);
        };
      } else if (sig.length === 2) {
        sigCache[func] = function dynCall_wrapper(arg) {
          return Runtime.dynCall(sig, func, [arg]);
        };
      } else {
        // general case
        sigCache[func] = function dynCall_wrapper() {
          return Runtime.dynCall(sig, func, Array.prototype.slice.call(arguments));
        };
      }
    }
    return sigCache[func];
  },
  getCompilerSetting: function (name) {
    throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for Runtime.getCompilerSetting or emscripten_get_compiler_setting to work';
  },
  stackAlloc: function (size) { var ret = STACKTOP;STACKTOP = (STACKTOP + size)|0;STACKTOP = (((STACKTOP)+15)&-16);(assert((((STACKTOP|0) < (STACK_MAX|0))|0))|0); return ret; },
  staticAlloc: function (size) { var ret = STATICTOP;STATICTOP = (STATICTOP + (assert(!staticSealed),size))|0;STATICTOP = (((STATICTOP)+15)&-16); return ret; },
  dynamicAlloc: function (size) { assert(DYNAMICTOP_PTR);var ret = HEAP32[DYNAMICTOP_PTR>>2];var end = (((ret + size + 15)|0) & -16);HEAP32[DYNAMICTOP_PTR>>2] = end;if (end >= TOTAL_MEMORY) {var success = enlargeMemory();if (!success) {HEAP32[DYNAMICTOP_PTR>>2] = ret;return 0;}}return ret;},
  alignMemory: function (size,quantum) { var ret = size = Math.ceil((size)/(quantum ? quantum : 16))*(quantum ? quantum : 16); return ret; },
  makeBigInt: function (low,high,unsigned) { var ret = (unsigned ? ((+((low>>>0)))+((+((high>>>0)))*4294967296.0)) : ((+((low>>>0)))+((+((high|0)))*4294967296.0))); return ret; },
  GLOBAL_BASE: 8,
  QUANTUM_SIZE: 4,
  __dummy__: 0
}



Module["Runtime"] = Runtime;



//========================================
// Runtime essentials
//========================================

var ABORT = 0; // whether we are quitting the application. no code should run after this. set in exit() and abort()
var EXITSTATUS = 0;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

var globalScope = this;

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  if (!func) {
    try { func = eval('_' + ident); } catch(e) {}
  }
  assert(func, 'Cannot call unknown function ' + ident + ' (perhaps LLVM optimizations or closure removed it?)');
  return func;
}

var cwrap, ccall;
(function(){
  var JSfuncs = {
    // Helpers for cwrap -- it can't refer to Runtime directly because it might
    // be renamed by closure, instead it calls JSfuncs['stackSave'].body to find
    // out what the minified function name is.
    'stackSave': function() {
      Runtime.stackSave()
    },
    'stackRestore': function() {
      Runtime.stackRestore()
    },
    // type conversion from js to c
    'arrayToC' : function(arr) {
      var ret = Runtime.stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    },
    'stringToC' : function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        var len = (str.length << 2) + 1;
        ret = Runtime.stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    }
  };
  // For fast lookup of conversion functions
  var toC = {'string' : JSfuncs['stringToC'], 'array' : JSfuncs['arrayToC']};

  // C calling interface.
  ccall = function ccallFunc(ident, returnType, argTypes, args, opts) {
    var func = getCFunc(ident);
    var cArgs = [];
    var stack = 0;
    assert(returnType !== 'array', 'Return type should not be "array".');
    if (args) {
      for (var i = 0; i < args.length; i++) {
        var converter = toC[argTypes[i]];
        if (converter) {
          if (stack === 0) stack = Runtime.stackSave();
          cArgs[i] = converter(args[i]);
        } else {
          cArgs[i] = args[i];
        }
      }
    }
    var ret = func.apply(null, cArgs);
    if ((!opts || !opts.async) && typeof EmterpreterAsync === 'object') {
      assert(!EmterpreterAsync.state, 'cannot start async op with normal JS calling ccall');
    }
    if (opts && opts.async) assert(!returnType, 'async ccalls cannot return values');
    if (returnType === 'string') ret = Pointer_stringify(ret);
    if (stack !== 0) {
      if (opts && opts.async) {
        EmterpreterAsync.asyncFinalizers.push(function() {
          Runtime.stackRestore(stack);
        });
        return;
      }
      Runtime.stackRestore(stack);
    }
    return ret;
  }

  var sourceRegex = /^function\s*[a-zA-Z$_0-9]*\s*\(([^)]*)\)\s*{\s*([^*]*?)[\s;]*(?:return\s*(.*?)[;\s]*)?}$/;
  function parseJSFunc(jsfunc) {
    // Match the body and the return value of a javascript function source
    var parsed = jsfunc.toString().match(sourceRegex).slice(1);
    return {arguments : parsed[0], body : parsed[1], returnValue: parsed[2]}
  }

  // sources of useful functions. we create this lazily as it can trigger a source decompression on this entire file
  var JSsource = null;
  function ensureJSsource() {
    if (!JSsource) {
      JSsource = {};
      for (var fun in JSfuncs) {
        if (JSfuncs.hasOwnProperty(fun)) {
          // Elements of toCsource are arrays of three items:
          // the code, and the return value
          JSsource[fun] = parseJSFunc(JSfuncs[fun]);
        }
      }
    }
  }

  cwrap = function cwrap(ident, returnType, argTypes) {
    argTypes = argTypes || [];
    var cfunc = getCFunc(ident);
    // When the function takes numbers and returns a number, we can just return
    // the original function
    var numericArgs = argTypes.every(function(type){ return type === 'number'});
    var numericRet = (returnType !== 'string');
    if ( numericRet && numericArgs) {
      return cfunc;
    }
    // Creation of the arguments list (["$1","$2",...,"$nargs"])
    var argNames = argTypes.map(function(x,i){return '$'+i});
    var funcstr = "(function(" + argNames.join(',') + ") {";
    var nargs = argTypes.length;
    if (!numericArgs) {
      // Generate the code needed to convert the arguments from javascript
      // values to pointers
      ensureJSsource();
      funcstr += 'var stack = ' + JSsource['stackSave'].body + ';';
      for (var i = 0; i < nargs; i++) {
        var arg = argNames[i], type = argTypes[i];
        if (type === 'number') continue;
        var convertCode = JSsource[type + 'ToC']; // [code, return]
        funcstr += 'var ' + convertCode.arguments + ' = ' + arg + ';';
        funcstr += convertCode.body + ';';
        funcstr += arg + '=(' + convertCode.returnValue + ');';
      }
    }

    // When the code is compressed, the name of cfunc is not literally 'cfunc' anymore
    var cfuncname = parseJSFunc(function(){return cfunc}).returnValue;
    // Call the function
    funcstr += 'var ret = ' + cfuncname + '(' + argNames.join(',') + ');';
    if (!numericRet) { // Return type can only by 'string' or 'number'
      // Convert the result to a string
      var strgfy = parseJSFunc(function(){return Pointer_stringify}).returnValue;
      funcstr += 'ret = ' + strgfy + '(ret);';
    }
    funcstr += "if (typeof EmterpreterAsync === 'object') { assert(!EmterpreterAsync.state, 'cannot start async op with normal JS calling cwrap') }";
    if (!numericArgs) {
      // If we had a stack, restore it
      ensureJSsource();
      funcstr += JSsource['stackRestore'].body.replace('()', '(stack)') + ';';
    }
    funcstr += 'return ret})';
    return eval(funcstr);
  };
})();
Module["ccall"] = ccall;
Module["cwrap"] = cwrap;

/** @type {function(number, number, string, boolean=)} */
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': HEAP8[((ptr)>>0)]=value; break;
      case 'i8': HEAP8[((ptr)>>0)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
}
Module["setValue"] = setValue;

/** @type {function(number, string, boolean=)} */
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
    switch(type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for setValue: ' + type);
    }
  return null;
}
Module["getValue"] = getValue;

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_STATIC = 2; // Cannot be freed
var ALLOC_DYNAMIC = 3; // Cannot be freed except through sbrk
var ALLOC_NONE = 4; // Do not allocate
Module["ALLOC_NORMAL"] = ALLOC_NORMAL;
Module["ALLOC_STACK"] = ALLOC_STACK;
Module["ALLOC_STATIC"] = ALLOC_STATIC;
Module["ALLOC_DYNAMIC"] = ALLOC_DYNAMIC;
Module["ALLOC_NONE"] = ALLOC_NONE;

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
/** @type {function((TypedArray|Array<number>|number), string, number, number=)} */
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [typeof _malloc === 'function' ? _malloc : Runtime.staticAlloc, Runtime.stackAlloc, Runtime.staticAlloc, Runtime.dynamicAlloc][allocator === undefined ? ALLOC_STATIC : allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var ptr = ret, stop;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)>>0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(/** @type {!Uint8Array} */ (slab), ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    if (typeof curr === 'function') {
      curr = Runtime.getFunctionIndex(curr);
    }

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    assert(type, 'Must know what type to store in allocate!');

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = Runtime.getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}
Module["allocate"] = allocate;

// Allocate memory during any stage of startup - static memory early on, dynamic memory later, malloc when ready
function getMemory(size) {
  if (!staticSealed) return Runtime.staticAlloc(size);
  if (!runtimeInitialized) return Runtime.dynamicAlloc(size);
  return _malloc(size);
}
Module["getMemory"] = getMemory;

/** @type {function(number, number=)} */
function Pointer_stringify(ptr, length) {
  if (length === 0 || !ptr) return '';
  // TODO: use TextDecoder
  // Find the length, and check for UTF while doing so
  var hasUtf = 0;
  var t;
  var i = 0;
  while (1) {
    assert(ptr + i < TOTAL_MEMORY);
    t = HEAPU8[(((ptr)+(i))>>0)];
    hasUtf |= t;
    if (t == 0 && !length) break;
    i++;
    if (length && i == length) break;
  }
  if (!length) length = i;

  var ret = '';

  if (hasUtf < 128) {
    var MAX_CHUNK = 1024; // split up into chunks, because .apply on a huge string can overflow the stack
    var curr;
    while (length > 0) {
      curr = String.fromCharCode.apply(String, HEAPU8.subarray(ptr, ptr + Math.min(length, MAX_CHUNK)));
      ret = ret ? ret + curr : curr;
      ptr += MAX_CHUNK;
      length -= MAX_CHUNK;
    }
    return ret;
  }
  return Module['UTF8ToString'](ptr);
}
Module["Pointer_stringify"] = Pointer_stringify;

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = HEAP8[((ptr++)>>0)];
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}
Module["AsciiToString"] = AsciiToString;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}
Module["stringToAscii"] = stringToAscii;

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;
function UTF8ArrayToString(u8Array, idx) {
  var endPtr = idx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  while (u8Array[endPtr]) ++endPtr;

  if (endPtr - idx > 16 && u8Array.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(u8Array.subarray(idx, endPtr));
  } else {
    var u0, u1, u2, u3, u4, u5;

    var str = '';
    while (1) {
      // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
      u0 = u8Array[idx++];
      if (!u0) return str;
      if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
      u1 = u8Array[idx++] & 63;
      if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
      u2 = u8Array[idx++] & 63;
      if ((u0 & 0xF0) == 0xE0) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        u3 = u8Array[idx++] & 63;
        if ((u0 & 0xF8) == 0xF0) {
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | u3;
        } else {
          u4 = u8Array[idx++] & 63;
          if ((u0 & 0xFC) == 0xF8) {
            u0 = ((u0 & 3) << 24) | (u1 << 18) | (u2 << 12) | (u3 << 6) | u4;
          } else {
            u5 = u8Array[idx++] & 63;
            u0 = ((u0 & 1) << 30) | (u1 << 24) | (u2 << 18) | (u3 << 12) | (u4 << 6) | u5;
          }
        }
      }
      if (u0 < 0x10000) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 0x10000;
        str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
      }
    }
  }
}
Module["UTF8ArrayToString"] = UTF8ArrayToString;

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function UTF8ToString(ptr) {
  return UTF8ArrayToString(HEAPU8,ptr);
}
Module["UTF8ToString"] = UTF8ToString;

// Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outU8Array: the array to copy to. Each index in this array is assumed to be one 8-byte element.
//   outIdx: The starting offset in the array to begin the copying.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
//                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8Array(str, outU8Array, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
    return 0;

  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) {
      if (outIdx >= endIdx) break;
      outU8Array[outIdx++] = u;
    } else if (u <= 0x7FF) {
      if (outIdx + 1 >= endIdx) break;
      outU8Array[outIdx++] = 0xC0 | (u >> 6);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0xFFFF) {
      if (outIdx + 2 >= endIdx) break;
      outU8Array[outIdx++] = 0xE0 | (u >> 12);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0x1FFFFF) {
      if (outIdx + 3 >= endIdx) break;
      outU8Array[outIdx++] = 0xF0 | (u >> 18);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0x3FFFFFF) {
      if (outIdx + 4 >= endIdx) break;
      outU8Array[outIdx++] = 0xF8 | (u >> 24);
      outU8Array[outIdx++] = 0x80 | ((u >> 18) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    } else {
      if (outIdx + 5 >= endIdx) break;
      outU8Array[outIdx++] = 0xFC | (u >> 30);
      outU8Array[outIdx++] = 0x80 | ((u >> 24) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 18) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 12) & 63);
      outU8Array[outIdx++] = 0x80 | ((u >> 6) & 63);
      outU8Array[outIdx++] = 0x80 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  outU8Array[outIdx] = 0;
  return outIdx - startIdx;
}
Module["stringToUTF8Array"] = stringToUTF8Array;

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
}
Module["stringToUTF8"] = stringToUTF8;

// Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) {
      ++len;
    } else if (u <= 0x7FF) {
      len += 2;
    } else if (u <= 0xFFFF) {
      len += 3;
    } else if (u <= 0x1FFFFF) {
      len += 4;
    } else if (u <= 0x3FFFFFF) {
      len += 5;
    } else {
      len += 6;
    }
  }
  return len;
}
Module["lengthBytesUTF8"] = lengthBytesUTF8;

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;
function UTF16ToString(ptr) {
  assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
  var endPtr = ptr;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  var idx = endPtr >> 1;
  while (HEAP16[idx]) ++idx;
  endPtr = idx << 1;

  if (endPtr - ptr > 32 && UTF16Decoder) {
    return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  } else {
    var i = 0;

    var str = '';
    while (1) {
      var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
      if (codeUnit == 0) return str;
      ++i;
      // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
      str += String.fromCharCode(codeUnit);
    }
  }
}


// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    HEAP16[((outPtr)>>1)]=codeUnit;
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP16[((outPtr)>>1)]=0;
  return outPtr - startPtr;
}


// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}


function UTF32ToString(ptr) {
  assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
  var i = 0;

  var str = '';
  while (1) {
    var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
    if (utf32 == 0)
      return str;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
}


// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    HEAP32[((outPtr)>>2)]=codeUnit;
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  HEAP32[((outPtr)>>2)]=0;
  return outPtr - startPtr;
}


// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}


function demangle(func) {
  var __cxa_demangle_func = Module['___cxa_demangle'] || Module['__cxa_demangle'];
  if (__cxa_demangle_func) {
    try {
      var s =
        func.substr(1);
      var len = lengthBytesUTF8(s)+1;
      var buf = _malloc(len);
      stringToUTF8(s, buf, len);
      var status = _malloc(4);
      var ret = __cxa_demangle_func(buf, 0, 0, status);
      if (getValue(status, 'i32') === 0 && ret) {
        return Pointer_stringify(ret);
      }
      // otherwise, libcxxabi failed
    } catch(e) {
      // ignore problems here
    } finally {
      if (buf) _free(buf);
      if (status) _free(status);
      if (ret) _free(ret);
    }
    // failure when using libcxxabi, don't demangle
    return func;
  }
  Runtime.warnOnce('warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
  return func;
}

function demangleAll(text) {
  var regex =
    /__Z[\w\d_]+/g;
  return text.replace(regex,
    function(x) {
      var y = demangle(x);
      return x === y ? x : (x + ' [' + y + ']');
    });
}

function jsStackTrace() {
  var err = new Error();
  if (!err.stack) {
    // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
    // so try that as a special-case.
    try {
      throw new Error(0);
    } catch(e) {
      err = e;
    }
    if (!err.stack) {
      return '(no stack trace available)';
    }
  }
  return err.stack.toString();
}

function stackTrace() {
  var js = jsStackTrace();
  if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
  return demangleAll(js);
}
Module["stackTrace"] = stackTrace;

// Memory management

var PAGE_SIZE = 16384;
var WASM_PAGE_SIZE = 65536;
var ASMJS_PAGE_SIZE = 16777216;
var MIN_TOTAL_MEMORY = 16777216;

function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple);
  }
  return x;
}

var HEAP,
/** @type {ArrayBuffer} */
  buffer,
/** @type {Int8Array} */
  HEAP8,
/** @type {Uint8Array} */
  HEAPU8,
/** @type {Int16Array} */
  HEAP16,
/** @type {Uint16Array} */
  HEAPU16,
/** @type {Int32Array} */
  HEAP32,
/** @type {Uint32Array} */
  HEAPU32,
/** @type {Float32Array} */
  HEAPF32,
/** @type {Float64Array} */
  HEAPF64;

function updateGlobalBuffer(buf) {
  Module['buffer'] = buffer = buf;
}

function updateGlobalBufferViews() {
  Module['HEAP8'] = HEAP8 = new Int8Array(buffer);
  Module['HEAP16'] = HEAP16 = new Int16Array(buffer);
  Module['HEAP32'] = HEAP32 = new Int32Array(buffer);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(buffer);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(buffer);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(buffer);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(buffer);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(buffer);
}

var STATIC_BASE, STATICTOP, staticSealed; // static area
var STACK_BASE, STACKTOP, STACK_MAX; // stack area
var DYNAMIC_BASE, DYNAMICTOP_PTR; // dynamic area handled by sbrk

  STATIC_BASE = STATICTOP = STACK_BASE = STACKTOP = STACK_MAX = DYNAMIC_BASE = DYNAMICTOP_PTR = 0;
  staticSealed = false;


// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  assert((STACK_MAX & 3) == 0);
  HEAPU32[(STACK_MAX >> 2)-1] = 0x02135467;
  HEAPU32[(STACK_MAX >> 2)-2] = 0x89BACDFE;
}

function checkStackCookie() {
  if (HEAPU32[(STACK_MAX >> 2)-1] != 0x02135467 || HEAPU32[(STACK_MAX >> 2)-2] != 0x89BACDFE) {
    abort('Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x02135467, but received 0x' + HEAPU32[(STACK_MAX >> 2)-2].toString(16) + ' ' + HEAPU32[(STACK_MAX >> 2)-1].toString(16));
  }
  // Also test the global address 0 for integrity. This check is not compatible with SAFE_SPLIT_MEMORY though, since that mode already tests all address 0 accesses on its own.
  if (HEAP32[0] !== 0x63736d65 /* 'emsc' */) throw 'Runtime error: The application has corrupted its heap memory area (address zero)!';
}

function abortStackOverflow(allocSize) {
  abort('Stack overflow! Attempted to allocate ' + allocSize + ' bytes on the stack, but stack has only ' + (STACK_MAX - Module['asm'].stackSave() + allocSize) + ' bytes available!');
}

function abortOnCannotGrowMemory() {
  abort('Cannot enlarge memory arrays. Either (1) compile with  -s TOTAL_MEMORY=X  with X higher than the current value ' + TOTAL_MEMORY + ', (2) compile with  -s ALLOW_MEMORY_GROWTH=1  which allows increasing the size at runtime but prevents some optimizations, (3) set Module.TOTAL_MEMORY to a higher value before the program runs, or (4) if you want malloc to return NULL (0) instead of this abort, compile with  -s ABORTING_MALLOC=0 ');
}


function enlargeMemory() {
  abortOnCannotGrowMemory();
}


var TOTAL_STACK = Module['TOTAL_STACK'] || 5242880;
var TOTAL_MEMORY = Module['TOTAL_MEMORY'] || 16777216;
if (TOTAL_MEMORY < TOTAL_STACK) Module.printErr('TOTAL_MEMORY should be larger than TOTAL_STACK, was ' + TOTAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

// Initialize the runtime's memory
// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined,
       'JS engine does not provide full typed array support');



// Use a provided buffer, if there is one, or else allocate a new one
if (Module['buffer']) {
  buffer = Module['buffer'];
  assert(buffer.byteLength === TOTAL_MEMORY, 'provided buffer should be ' + TOTAL_MEMORY + ' bytes, but it is ' + buffer.byteLength);
} else {
  // Use a WebAssembly memory where available
  {
    buffer = new ArrayBuffer(TOTAL_MEMORY);
  }
  assert(buffer.byteLength === TOTAL_MEMORY);
}
updateGlobalBufferViews();


function getTotalMemory() {
  return TOTAL_MEMORY;
}

// Endianness check (note: assumes compiler arch was little-endian)
  HEAP32[0] = 0x63736d65; /* 'emsc' */
HEAP16[1] = 0x6373;
if (HEAPU8[2] !== 0x73 || HEAPU8[3] !== 0x63) throw 'Runtime error: expected the system to be little-endian!';

Module['HEAP'] = HEAP;
Module['buffer'] = buffer;
Module['HEAP8'] = HEAP8;
Module['HEAP16'] = HEAP16;
Module['HEAP32'] = HEAP32;
Module['HEAPU8'] = HEAPU8;
Module['HEAPU16'] = HEAPU16;
Module['HEAPU32'] = HEAPU32;
Module['HEAPF32'] = HEAPF32;
Module['HEAPF64'] = HEAPF64;

function callRuntimeCallbacks(callbacks) {
  while(callbacks.length > 0) {
    var callback = callbacks.shift();
    if (typeof callback == 'function') {
      callback();
      continue;
    }
    var func = callback.func;
    if (typeof func === 'number') {
      if (callback.arg === undefined) {
        Module['dynCall_v'](func);
      } else {
        Module['dynCall_vi'](func, callback.arg);
      }
    } else {
      func(callback.arg === undefined ? null : callback.arg);
    }
  }
}

var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the runtime has exited

var runtimeInitialized = false;
var runtimeExited = false;


function preRun() {
  // compatibility - merge in anything from Module['preRun'] at this time
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function ensureInitRuntime() {
  checkStackCookie();
  if (runtimeInitialized) return;
  runtimeInitialized = true;
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  checkStackCookie();
  callRuntimeCallbacks(__ATEXIT__);
  runtimeExited = true;
}

function postRun() {
  checkStackCookie();
  // compatibility - merge in anything from Module['postRun'] at this time
  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}
Module["addOnPreRun"] = addOnPreRun;

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}
Module["addOnInit"] = addOnInit;

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}
Module["addOnPreMain"] = addOnPreMain;

function addOnExit(cb) {
  __ATEXIT__.unshift(cb);
}
Module["addOnExit"] = addOnExit;

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}
Module["addOnPostRun"] = addOnPostRun;

// Tools

/** @type {function(string, boolean=, number=)} */
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}
Module["intArrayFromString"] = intArrayFromString;

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}
Module["intArrayToString"] = intArrayToString;

// Deprecated: This function should not be called because it is unsafe and does not provide
// a maximum length limit of how many bytes it is allowed to write. Prefer calling the
// function stringToUTF8Array() instead, which takes in a maximum length that can be used
// to be secure from out of bounds writes.
/** @deprecated */
function writeStringToMemory(string, buffer, dontAddNull) {
  Runtime.warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');

  var /** @type {number} */ lastChar, /** @type {number} */ end;
  if (dontAddNull) {
    // stringToUTF8Array always appends null. If we don't want to do that, remember the
    // character that existed at the location where the null will be placed, and restore
    // that after the write (below).
    end = buffer + lengthBytesUTF8(string);
    lastChar = HEAP8[end];
  }
  stringToUTF8(string, buffer, Infinity);
  if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
}
Module["writeStringToMemory"] = writeStringToMemory;

function writeArrayToMemory(array, buffer) {
  assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
  HEAP8.set(array, buffer);
}
Module["writeArrayToMemory"] = writeArrayToMemory;

function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    assert(str.charCodeAt(i) === str.charCodeAt(i)&0xff);
    HEAP8[((buffer++)>>0)]=str.charCodeAt(i);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) HEAP8[((buffer)>>0)]=0;
}
Module["writeAsciiToMemory"] = writeAsciiToMemory;

function unSign(value, bits, ignore) {
  if (value >= 0) {
    return value;
  }
  return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value // Need some trickery, since if bits == 32, we are right at the limit of the bits JS uses in bitshifts
                    : Math.pow(2, bits)         + value;
}
function reSign(value, bits, ignore) {
  if (value <= 0) {
    return value;
  }
  var half = bits <= 32 ? Math.abs(1 << (bits-1)) // abs is needed if bits == 32
                        : Math.pow(2, bits-1);
  if (value >= half && (bits <= 32 || value > half)) { // for huge values, we can hit the precision limit and always get true here. so don't do that
                                                       // but, in general there is no perfect solution here. With 64-bit ints, we get rounding and errors
                                                       // TODO: In i64 mode 1, resign the two parts separately and safely
    value = -2*half + value; // Cannot bitshift half, as it may be at the limit of the bits JS uses in bitshifts
  }
  return value;
}

// check for imul support, and also for correctness ( https://bugs.webkit.org/show_bug.cgi?id=126345 )
if (!Math['imul'] || Math['imul'](0xffffffff, 5) !== -5) Math['imul'] = function imul(a, b) {
  var ah  = a >>> 16;
  var al = a & 0xffff;
  var bh  = b >>> 16;
  var bl = b & 0xffff;
  return (al*bl + ((ah*bl + al*bh) << 16))|0;
};
Math.imul = Math['imul'];


if (!Math['clz32']) Math['clz32'] = function(x) {
  x = x >>> 0;
  for (var i = 0; i < 32; i++) {
    if (x & (1 << (31 - i))) return i;
  }
  return 32;
};
Math.clz32 = Math['clz32']

if (!Math['trunc']) Math['trunc'] = function(x) {
  return x < 0 ? Math.ceil(x) : Math.floor(x);
};
Math.trunc = Math['trunc'];

var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_round = Math.round;
var Math_min = Math.min;
var Math_clz32 = Math.clz32;
var Math_trunc = Math.trunc;

// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// PRE_RUN_ADDITIONS (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
  return id;
}

function addRunDependency(id) {
  runDependencies++;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            Module.printErr('still waiting on run dependencies:');
          }
          Module.printErr('dependency: ' + dep);
        }
        if (shown) {
          Module.printErr('(end of list)');
        }
      }, 10000);
    }
  } else {
    Module.printErr('warning: run dependency added without ID');
  }
}
Module["addRunDependency"] = addRunDependency;

function removeRunDependency(id) {
  runDependencies--;
  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }
  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    Module.printErr('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}
Module["removeRunDependency"] = removeRunDependency;

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data



var memoryInitializer = null;



var /* show errors on likely calls to FS when it was not included */ FS = {
  error: function() {
    abort('Filesystem support (FS) was not included. The problem is that you are using files from JS, but files were not used from C/C++, so filesystem support was not auto-included. You can force-include filesystem support with  -s FORCE_FILESYSTEM=1');
  },
  init: function() { FS.error() },
  createDataFile: function() { FS.error() },
  createPreloadedFile: function() { FS.error() },
  createLazyFile: function() { FS.error() },
  open: function() { FS.error() },
  mkdev: function() { FS.error() },
  registerDevice: function() { FS.error() },
  analyzePath: function() { FS.error() },
  loadFilesFromDB: function() { FS.error() },

  ErrnoError: function ErrnoError() { FS.error() },
};
Module['FS_createDataFile'] = FS.createDataFile;
Module['FS_createPreloadedFile'] = FS.createPreloadedFile;



// === Body ===

var ASM_CONSTS = [];




STATIC_BASE = Runtime.GLOBAL_BASE;

STATICTOP = STATIC_BASE + 9616;
/* global initializers */  __ATINIT__.push();


/* memory initializer */ allocate([132,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,119,204,43,51,182,163,19,53,228,98,210,54,143,82,104,56,220,130,198,57,201,71,3,59,185,97,6,60,140,233,212,60,155,136,130,61,70,189,247,61,174,240,53,62,196,208,78,62,174,240,53,62,70,189,247,61,155,136,130,61,140,233,212,60,185,97,6,60,201,71,3,59,220,130,198,57,143,82,104,56,228,98,210,54,182,163,19,53,119,204,43,51,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,23,189,13,58,144,159,141,58,135,37,212,58,245,41,13,59,152,6,48,59,151,154,82,59,174,215,116,59,248,87,139,59,227,10,156,59,248,125,172,59,171,170,188,59,200,138,204,59,47,24,220,59,235,76,235,59,114,35,250,59,30,75,4,60,32,80,11,60,80,30,18,60,85,179,24,60,22,13,31,60,144,41,37,60,234,6,43,60,108,163,48,60,147,253,53,60,253,19,59,60,115,229,63,60,243,112,68,60,156,181,72,60,182,178,76,60,172,103,80,60,29,212,83,60,212,247,86,60,197,210,89,60,6,101,92,60,205,174,94,60,132,176,96,60,185,106,98,60,33,222,99,60,136,11,101,60,229,243,101,60,69,152,102,60,245,249,102,60,43,26,103,60,117,250,102,60,65,156,102,60,60,1,102,60,40,43,101,60,201,27,100,60,12,213,98,60,224,88,97,60,72,169,95,60,93,200,93,60,56,184,91,60,17,123,89,60,12,19,87,60,99,130,84,60,100,203,81,60,72,240,78,60,94,243,75,60,233,214,72,60,35,157,69,60,90,72,66,60,199,218,62,60,174,86,59,60,50,190,55,60,142,19,52,60,217,88,48,60,33,144,44,60,128,187,40,60,239,220,36,60,101,246,32,60,188,9,29,60,203,24,25,60,86,37,21,60,32,49,17,60,182,61,13,60,187,76,9,60,177,95,5,60,250,119,1,60,9,46,251,59,36,124,243,59,157,220,235,59,250,81,228,59,61,222,220,59,106,131,213,59,111,67,206,59,16,32,199,59,184,26,192,59,21,53,185,59,64,112,178,59,142,205,171,59,3,78,165,59,159,242,158,59,15,188,152,59,40,171,146,59,109,192,140,59,94,252,134,59,81,95,129,59,54,211,119,59,165,54,109,59,25,233,98,59,189,234,88,59,60,59,79,59,63,218,69,59,70,199,60,59,208,1,52,59,218,136,43,59,229,91,35,59,153,121,27,59,30,225,19,59,29,145,12,59,107,136,5,59,177,139,253,58,31,143,240,58,26,25,228,58,71,38,216,58,76,179,204,58,36,189,193,58,116,64,183,58,223,57,173,58,13,166,163,58,247,129,154,58,236,201,145,58,61,122,137,58,227,143,129,58,90,14,116,58,47,186,101,58,53,27,88,58,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,100,33,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,3,0,0,0,144,33,0,0,0,4,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,255,255,255,255,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,7,0,0], "i8", ALLOC_NONE, Runtime.GLOBAL_BASE);





/* no memory initializer */
var tempDoublePtr = STATICTOP; STATICTOP += 16;

assert(tempDoublePtr % 8 == 0);

function copyTempFloat(ptr) { // functions, because inlining this code increases code size too much

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

}

function copyTempDouble(ptr) {

  HEAP8[tempDoublePtr] = HEAP8[ptr];

  HEAP8[tempDoublePtr+1] = HEAP8[ptr+1];

  HEAP8[tempDoublePtr+2] = HEAP8[ptr+2];

  HEAP8[tempDoublePtr+3] = HEAP8[ptr+3];

  HEAP8[tempDoublePtr+4] = HEAP8[ptr+4];

  HEAP8[tempDoublePtr+5] = HEAP8[ptr+5];

  HEAP8[tempDoublePtr+6] = HEAP8[ptr+6];

  HEAP8[tempDoublePtr+7] = HEAP8[ptr+7];

}

// {{PRE_LIBRARY}}


   

  
  function ___setErrNo(value) {
      if (Module['___errno_location']) HEAP32[((Module['___errno_location']())>>2)]=value;
      else Module.printErr('failed to set errno from JS');
      return value;
    } 

   

   

   

  function ___lock() {}

   

  
  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.set(HEAPU8.subarray(src, src+num), dest);
      return dest;
    } 

  
  var SYSCALLS={varargs:0,get:function (varargs) {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
        return ret;
      },getStr:function () {
        var ret = Pointer_stringify(SYSCALLS.get());
        return ret;
      },get64:function () {
        var low = SYSCALLS.get(), high = SYSCALLS.get();
        if (low >= 0) assert(high === 0);
        else assert(high === -1);
        return low;
      },getZero:function () {
        assert(SYSCALLS.get() === 0);
      }};function ___syscall140(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // llseek
      var stream = SYSCALLS.getStreamFromFD(), offset_high = SYSCALLS.get(), offset_low = SYSCALLS.get(), result = SYSCALLS.get(), whence = SYSCALLS.get();
      // NOTE: offset_high is unused - Emscripten's off_t is 32-bit
      var offset = offset_low;
      FS.llseek(stream, offset, whence);
      HEAP32[((result)>>2)]=stream.position;
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall146(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // writev
      // hack to support printf in NO_FILESYSTEM
      var stream = SYSCALLS.get(), iov = SYSCALLS.get(), iovcnt = SYSCALLS.get();
      var ret = 0;
      if (!___syscall146.buffer) {
        ___syscall146.buffers = [null, [], []]; // 1 => stdout, 2 => stderr
        ___syscall146.printChar = function(stream, curr) {
          var buffer = ___syscall146.buffers[stream];
          assert(buffer);
          if (curr === 0 || curr === 10) {
            (stream === 1 ? Module['print'] : Module['printErr'])(UTF8ArrayToString(buffer, 0));
            buffer.length = 0;
          } else {
            buffer.push(curr);
          }
        };
      }
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAP32[(((iov)+(i*8))>>2)];
        var len = HEAP32[(((iov)+(i*8 + 4))>>2)];
        for (var j = 0; j < len; j++) {
          ___syscall146.printChar(stream, HEAPU8[ptr+j]);
        }
        ret += len;
      }
      return ret;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___syscall54(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // ioctl
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }

  function ___unlock() {}

  function ___syscall6(which, varargs) {SYSCALLS.varargs = varargs;
  try {
   // close
      var stream = SYSCALLS.getStreamFromFD();
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
/* flush anything remaining in the buffer during shutdown */ __ATEXIT__.push(function() { var fflush = Module["_fflush"]; if (fflush) fflush(0); var printChar = ___syscall146.printChar; if (!printChar) return; var buffers = ___syscall146.buffers; if (buffers[1].length) printChar(1, 10); if (buffers[2].length) printChar(2, 10); });;
DYNAMICTOP_PTR = allocate(1, "i32", ALLOC_STATIC);

STACK_BASE = STACKTOP = Runtime.alignMemory(STATICTOP);

STACK_MAX = STACK_BASE + TOTAL_STACK;

DYNAMIC_BASE = Runtime.alignMemory(STACK_MAX);

HEAP32[DYNAMICTOP_PTR>>2] = DYNAMIC_BASE;

staticSealed = true; // seal the static portion of memory

assert(DYNAMIC_BASE < TOTAL_MEMORY, "TOTAL_MEMORY not big enough for stack");


function nullFunc_ii(x) { Module["printErr"]("Invalid function pointer called with signature 'ii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function nullFunc_iiii(x) { Module["printErr"]("Invalid function pointer called with signature 'iiii'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this)");  Module["printErr"]("Build with ASSERTIONS=2 for more info.");abort(x) }

function invoke_ii(index,a1) {
  try {
    return Module["dynCall_ii"](index,a1);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    Module["setThrew"](1, 0);
  }
}

function invoke_iiii(index,a1,a2,a3) {
  try {
    return Module["dynCall_iiii"](index,a1,a2,a3);
  } catch(e) {
    if (typeof e !== 'number' && e !== 'longjmp') throw e;
    Module["setThrew"](1, 0);
  }
}

Module.asmGlobalArg = { "Math": Math, "Int8Array": Int8Array, "Int16Array": Int16Array, "Int32Array": Int32Array, "Uint8Array": Uint8Array, "Uint16Array": Uint16Array, "Uint32Array": Uint32Array, "Float32Array": Float32Array, "Float64Array": Float64Array, "NaN": NaN, "Infinity": Infinity };

Module.asmLibraryArg = { "abort": abort, "assert": assert, "enlargeMemory": enlargeMemory, "getTotalMemory": getTotalMemory, "abortOnCannotGrowMemory": abortOnCannotGrowMemory, "abortStackOverflow": abortStackOverflow, "nullFunc_ii": nullFunc_ii, "nullFunc_iiii": nullFunc_iiii, "invoke_ii": invoke_ii, "invoke_iiii": invoke_iiii, "___lock": ___lock, "___syscall6": ___syscall6, "___setErrNo": ___setErrNo, "___syscall140": ___syscall140, "_emscripten_memcpy_big": _emscripten_memcpy_big, "___syscall54": ___syscall54, "___unlock": ___unlock, "___syscall146": ___syscall146, "DYNAMICTOP_PTR": DYNAMICTOP_PTR, "tempDoublePtr": tempDoublePtr, "ABORT": ABORT, "STACKTOP": STACKTOP, "STACK_MAX": STACK_MAX };
// EMSCRIPTEN_START_ASM
var asm = (function(global, env, buffer) {
'almost asm';


  var HEAP8 = new global.Int8Array(buffer);
  var HEAP16 = new global.Int16Array(buffer);
  var HEAP32 = new global.Int32Array(buffer);
  var HEAPU8 = new global.Uint8Array(buffer);
  var HEAPU16 = new global.Uint16Array(buffer);
  var HEAPU32 = new global.Uint32Array(buffer);
  var HEAPF32 = new global.Float32Array(buffer);
  var HEAPF64 = new global.Float64Array(buffer);

  var DYNAMICTOP_PTR=env.DYNAMICTOP_PTR|0;
  var tempDoublePtr=env.tempDoublePtr|0;
  var ABORT=env.ABORT|0;
  var STACKTOP=env.STACKTOP|0;
  var STACK_MAX=env.STACK_MAX|0;

  var __THREW__ = 0;
  var threwValue = 0;
  var setjmpId = 0;
  var undef = 0;
  var nan = global.NaN, inf = global.Infinity;
  var tempInt = 0, tempBigInt = 0, tempBigIntS = 0, tempValue = 0, tempDouble = 0.0;
  var tempRet0 = 0;

  var Math_floor=global.Math.floor;
  var Math_abs=global.Math.abs;
  var Math_sqrt=global.Math.sqrt;
  var Math_pow=global.Math.pow;
  var Math_cos=global.Math.cos;
  var Math_sin=global.Math.sin;
  var Math_tan=global.Math.tan;
  var Math_acos=global.Math.acos;
  var Math_asin=global.Math.asin;
  var Math_atan=global.Math.atan;
  var Math_atan2=global.Math.atan2;
  var Math_exp=global.Math.exp;
  var Math_log=global.Math.log;
  var Math_ceil=global.Math.ceil;
  var Math_imul=global.Math.imul;
  var Math_min=global.Math.min;
  var Math_max=global.Math.max;
  var Math_clz32=global.Math.clz32;
  var abort=env.abort;
  var assert=env.assert;
  var enlargeMemory=env.enlargeMemory;
  var getTotalMemory=env.getTotalMemory;
  var abortOnCannotGrowMemory=env.abortOnCannotGrowMemory;
  var abortStackOverflow=env.abortStackOverflow;
  var nullFunc_ii=env.nullFunc_ii;
  var nullFunc_iiii=env.nullFunc_iiii;
  var invoke_ii=env.invoke_ii;
  var invoke_iiii=env.invoke_iiii;
  var ___lock=env.___lock;
  var ___syscall6=env.___syscall6;
  var ___setErrNo=env.___setErrNo;
  var ___syscall140=env.___syscall140;
  var _emscripten_memcpy_big=env._emscripten_memcpy_big;
  var ___syscall54=env.___syscall54;
  var ___unlock=env.___unlock;
  var ___syscall146=env.___syscall146;
  var tempFloat = 0.0;

// EMSCRIPTEN_START_FUNCS

function stackAlloc(size) {
  size = size|0;
  var ret = 0;
  ret = STACKTOP;
  STACKTOP = (STACKTOP + size)|0;
  STACKTOP = (STACKTOP + 15)&-16;
  if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(size|0);

  return ret|0;
}
function stackSave() {
  return STACKTOP|0;
}
function stackRestore(top) {
  top = top|0;
  STACKTOP = top;
}
function establishStackSpace(stackBase, stackMax) {
  stackBase = stackBase|0;
  stackMax = stackMax|0;
  STACKTOP = stackBase;
  STACK_MAX = stackMax;
}

function setThrew(threw, value) {
  threw = threw|0;
  value = value|0;
  if ((__THREW__|0) == 0) {
    __THREW__ = threw;
    threwValue = value;
  }
}

function setTempRet0(value) {
  value = value|0;
  tempRet0 = value;
}
function getTempRet0() {
  return tempRet0|0;
}

function _BeatTrack_Ctor($0,$1) {
 $0 = +$0;
 $1 = $1|0;
 var $10 = 0.0, $100 = 0, $11 = 0, $12 = 0, $13 = 0.0, $14 = 0.0, $15 = 0.0, $16 = 0.0, $17 = 0, $18 = 0, $19 = 0.0, $2 = 0.0, $20 = 0.0, $21 = 0.0, $22 = 0.0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0.0;
 var $28 = 0.0, $29 = 0.0, $3 = 0, $30 = 0.0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0;
 var $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0.0, $60 = 0, $61 = 0, $62 = 0, $63 = 0;
 var $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0.0, $69 = 0.0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0.0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0.0, $8 = 0, $80 = 0, $81 = 0;
 var $82 = 0, $83 = 0, $84 = 0.0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0.0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, label = 0;
 var sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $2 = $0;
 $3 = $1;
 $6 = $2;
 $7 = HEAP32[2]|0;
 HEAPF32[$7>>2] = $6;
 $8 = HEAP32[2]|0;
 $9 = +HEAPF32[$8>>2];
 $10 = $9;
 $11 = $10 > 66150.0;
 if ($11) {
  $12 = HEAP32[2]|0;
  $13 = +HEAPF32[$12>>2];
  $14 = $13;
  $15 = $14 * 0.5;
  $16 = $15;
  $17 = HEAP32[2]|0;
  HEAPF32[$17>>2] = $16;
 }
 $18 = HEAP32[2]|0;
 $19 = +HEAPF32[$18>>2];
 $20 = $19;
 $21 = $20 / 44100.0;
 $22 = $21;
 $23 = HEAP32[2]|0;
 $24 = ((($23)) + 4|0);
 HEAPF32[$24>>2] = $22;
 $25 = HEAP32[2]|0;
 $26 = ((($25)) + 4|0);
 $27 = +HEAPF32[$26>>2];
 $28 = $27;
 $29 = 0.011610000000000001 / $28;
 $30 = $29;
 $31 = HEAP32[2]|0;
 $32 = ((($31)) + 8|0);
 HEAPF32[$32>>2] = $30;
 $33 = (_malloc(2048)|0);
 $34 = HEAP32[2]|0;
 $35 = ((($34)) + 12|0);
 HEAP32[$35>>2] = $33;
 $36 = (_malloc(2048)|0);
 $37 = HEAP32[2]|0;
 $38 = ((($37)) + 16|0);
 HEAP32[$38>>2] = $36;
 $39 = (_malloc(2048)|0);
 $40 = HEAP32[2]|0;
 $41 = ((($40)) + 20|0);
 HEAP32[$41>>2] = $39;
 $42 = HEAP32[2]|0;
 $43 = ((($42)) + 24|0);
 HEAP32[$43>>2] = 1;
 $44 = HEAP32[2]|0;
 $45 = ((($44)) + 2828|0);
 HEAP32[$45>>2] = 699;
 $4 = 0;
 while(1) {
  $46 = $4;
  $47 = ($46|0)<(700);
  $48 = HEAP32[2]|0;
  if (!($47)) {
   break;
  }
  $49 = ((($48)) + 28|0);
  $50 = $4;
  $51 = (($49) + ($50<<2)|0);
  HEAPF32[$51>>2] = 0.0;
  $52 = $4;
  $53 = (($52) + 1)|0;
  $4 = $53;
 }
 $54 = ((($48)) + 2832|0);
 HEAP32[$54>>2] = 14;
 $5 = 0;
 while(1) {
  $55 = $5;
  $56 = ($55|0)<(15);
  $57 = HEAP32[2]|0;
  if (!($56)) {
   break;
  }
  $58 = ((($57)) + 2836|0);
  $59 = $5;
  $60 = (($58) + ($59<<2)|0);
  HEAPF32[$60>>2] = 0.0;
  $61 = $5;
  $62 = (($61) + 1)|0;
  $5 = $62;
 }
 $63 = ((($57)) + 6016|0);
 HEAPF32[$63>>2] = 2.0;
 $64 = HEAP32[2]|0;
 $65 = ((($64)) + 6020|0);
 HEAPF32[$65>>2] = 0.0;
 $66 = HEAP32[2]|0;
 $67 = ((($66)) + 6024|0);
 HEAPF32[$67>>2] = 0.0;
 $68 = $2;
 $69 = 128.0 / $68;
 $70 = HEAP32[2]|0;
 $71 = ((($70)) + 6028|0);
 HEAPF32[$71>>2] = $69;
 $72 = HEAP32[2]|0;
 $73 = ((($72)) + 6024|0);
 $74 = +HEAPF32[$73>>2];
 $75 = HEAP32[2]|0;
 $76 = ((($75)) + 6032|0);
 HEAPF32[$76>>2] = $74;
 $77 = HEAP32[2]|0;
 $78 = ((($77)) + 6016|0);
 $79 = +HEAPF32[$78>>2];
 $80 = HEAP32[2]|0;
 $81 = ((($80)) + 6036|0);
 HEAPF32[$81>>2] = $79;
 $82 = HEAP32[2]|0;
 $83 = ((($82)) + 6028|0);
 $84 = +HEAPF32[$83>>2];
 $85 = HEAP32[2]|0;
 $86 = ((($85)) + 6040|0);
 HEAPF32[$86>>2] = $84;
 $87 = HEAP32[2]|0;
 $88 = ((($87)) + 6044|0);
 HEAP32[$88>>2] = 0;
 $89 = HEAP32[2]|0;
 $90 = ((($89)) + 6048|0);
 HEAP32[$90>>2] = 0;
 $91 = HEAP32[2]|0;
 $92 = ((($91)) + 6052|0);
 HEAP32[$92>>2] = 0;
 $93 = HEAP32[2]|0;
 $94 = ((($93)) + 6056|0);
 HEAP32[$94>>2] = 0;
 $95 = HEAP32[2]|0;
 $96 = ((($95)) + 6072|0);
 HEAP32[$96>>2] = 0;
 $97 = HEAP32[2]|0;
 $98 = ((($97)) + 6076|0);
 HEAP32[$98>>2] = 4;
 $99 = HEAP32[2]|0;
 $100 = ((($99)) + 5992|0);
 HEAP32[$100>>2] = 0;
 STACKTOP = sp;return;
}
function _BeatTrack_Dtor($0) {
 $0 = $0|0;
 var $1 = 0, $10 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $1 = $0;
 $2 = $1;
 $3 = ((($2)) + 12|0);
 $4 = HEAP32[$3>>2]|0;
 _free($4);
 $5 = $1;
 $6 = ((($5)) + 16|0);
 $7 = HEAP32[$6>>2]|0;
 _free($7);
 $8 = $1;
 $9 = ((($8)) + 20|0);
 $10 = HEAP32[$9>>2]|0;
 _free($10);
 STACKTOP = sp;return;
}
function _BeatTrack_next($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $$sink3 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0.0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0;
 var $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0.0, $128 = 0.0, $129 = 0.0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0;
 var $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0.0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0.0;
 var $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0.0, $158 = 0.0, $159 = 0.0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0;
 var $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0;
 var $19 = 0, $190 = 0.0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0.0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0.0, $201 = 0.0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0;
 var $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0;
 var $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0;
 var $243 = 0.0, $244 = 0, $245 = 0, $246 = 0, $247 = 0.0, $248 = 0.0, $249 = 0.0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0;
 var $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0, $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0;
 var $28 = 0, $280 = 0, $281 = 0.0, $282 = 0, $283 = 0, $284 = 0.0, $285 = 0.0, $286 = 0.0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0.0, $291 = 0, $292 = 0, $293 = 0, $294 = 0, $295 = 0.0, $296 = 0, $297 = 0;
 var $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0.0, $301 = 0, $302 = 0, $303 = 0, $304 = 0.0, $305 = 0, $306 = 0, $307 = 0.0, $308 = 0.0, $309 = 0, $31 = 0, $310 = 0, $311 = 0.0, $312 = 0, $313 = 0, $314 = 0;
 var $315 = 0.0, $316 = 0.0, $317 = 0, $318 = 0, $319 = 0.0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0.0, $324 = 0.0, $325 = 0, $326 = 0, $327 = 0, $328 = 0, $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0;
 var $333 = 0.0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0.0, $344 = 0, $345 = 0, $346 = 0, $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0;
 var $351 = 0, $352 = 0, $353 = 0.0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0;
 var $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0;
 var $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0.0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0;
 var $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0.0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0;
 var $97 = 0, $98 = 0, $99 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $2 = $0;
 $3 = $1;
 $4 = 0;
 $5 = 0;
 while(1) {
  $10 = $5;
  $11 = ($10|0)<(8);
  if (!($11)) {
   break;
  }
  $12 = HEAP32[2]|0;
  $13 = ((($12)) + 6068|0);
  $14 = HEAP32[$13>>2]|0;
  $15 = (($14) + 1)|0;
  $16 = HEAP32[2]|0;
  $17 = ((($16)) + 6068|0);
  HEAP32[$17>>2] = $15;
  $18 = HEAP32[2]|0;
  $19 = ((($18)) + 6056|0);
  $20 = HEAP32[$19>>2]|0;
  L4: do {
   switch ($20|0) {
   case 8:  {
    $266 = HEAP32[2]|0;
    _finaldecision($266);
    $267 = HEAP32[2]|0;
    $268 = ((($267)) + 6056|0);
    HEAP32[$268>>2] = 0;
    break;
   }
   case 1:  {
    $21 = HEAP32[2]|0;
    $22 = HEAP32[2]|0;
    $23 = ((($22)) + 6060|0);
    $24 = HEAP32[$23>>2]|0;
    _autocorr($21,$24);
    $25 = HEAP32[2]|0;
    $26 = ((($25)) + 6060|0);
    $27 = HEAP32[$26>>2]|0;
    $28 = (($27) + 1)|0;
    $29 = HEAP32[2]|0;
    $30 = ((($29)) + 6060|0);
    HEAP32[$30>>2] = $28;
    $31 = HEAP32[2]|0;
    $32 = ((($31)) + 6060|0);
    $33 = HEAP32[$32>>2]|0;
    $34 = HEAP32[2]|0;
    $35 = ((($34)) + 6064|0);
    $36 = HEAP32[$35>>2]|0;
    $37 = ($33|0)==($36|0);
    if ($37) {
     $38 = HEAP32[2]|0;
     $39 = ((($38)) + 6056|0);
     HEAP32[$39>>2] = 2;
     $40 = HEAP32[2]|0;
     $41 = ((($40)) + 6064|0);
     HEAP32[$41>>2] = 128;
     $42 = HEAP32[2]|0;
     $43 = ((($42)) + 6060|0);
     HEAP32[$43>>2] = 0;
     $44 = HEAP32[2]|0;
     $45 = ((($44)) + 5460|0);
     HEAP32[$45>>2] = 0;
     $46 = HEAP32[2]|0;
     $47 = ((($46)) + 5456|0);
     HEAPF32[$47>>2] = -1000.0;
    }
    break;
   }
   case 2:  {
    $48 = HEAP32[2]|0;
    $49 = HEAP32[2]|0;
    $50 = ((($49)) + 6060|0);
    $51 = HEAP32[$50>>2]|0;
    _beatperiod($48,$51,0);
    $52 = HEAP32[2]|0;
    $53 = ((($52)) + 6060|0);
    $54 = HEAP32[$53>>2]|0;
    $55 = (($54) + 1)|0;
    $56 = HEAP32[2]|0;
    $57 = ((($56)) + 6060|0);
    HEAP32[$57>>2] = $55;
    $58 = HEAP32[2]|0;
    $59 = ((($58)) + 6060|0);
    $60 = HEAP32[$59>>2]|0;
    $61 = HEAP32[2]|0;
    $62 = ((($61)) + 6064|0);
    $63 = HEAP32[$62>>2]|0;
    $64 = ($60|0)==($63|0);
    if ($64) {
     $65 = HEAP32[2]|0;
     $66 = (+_findtor($65));
     $67 = HEAP32[2]|0;
     $68 = ((($67)) + 5984|0);
     HEAPF32[$68>>2] = $66;
     $69 = HEAP32[2]|0;
     $70 = ((($69)) + 6072|0);
     $71 = HEAP32[$70>>2]|0;
     $72 = ($71|0)==(1);
     $73 = HEAP32[2]|0;
     if ($72) {
      $74 = ((($73)) + 6056|0);
      HEAP32[$74>>2] = 3;
      $75 = HEAP32[2]|0;
      $76 = ((($75)) + 6064|0);
      HEAP32[$76>>2] = 128;
      $77 = HEAP32[2]|0;
      $78 = ((($77)) + 6060|0);
      HEAP32[$78>>2] = 0;
      $79 = HEAP32[2]|0;
      $80 = ((($79)) + 5460|0);
      HEAP32[$80>>2] = 0;
      $81 = HEAP32[2]|0;
      $82 = ((($81)) + 5456|0);
      HEAPF32[$82>>2] = -1000.0;
      break L4;
     } else {
      $83 = ((($73)) + 5988|0);
      HEAPF32[$83>>2] = -1000.0;
      $84 = HEAP32[2]|0;
      $85 = ((($84)) + 6056|0);
      HEAP32[$85>>2] = 4;
      break L4;
     }
    }
    break;
   }
   case 3:  {
    $86 = HEAP32[2]|0;
    $87 = HEAP32[2]|0;
    $88 = ((($87)) + 6060|0);
    $89 = HEAP32[$88>>2]|0;
    _beatperiod($86,$89,1);
    $90 = HEAP32[2]|0;
    $91 = ((($90)) + 6060|0);
    $92 = HEAP32[$91>>2]|0;
    $93 = (($92) + 1)|0;
    $94 = HEAP32[2]|0;
    $95 = ((($94)) + 6060|0);
    HEAP32[$95>>2] = $93;
    $96 = HEAP32[2]|0;
    $97 = ((($96)) + 6060|0);
    $98 = HEAP32[$97>>2]|0;
    $99 = HEAP32[2]|0;
    $100 = ((($99)) + 6064|0);
    $101 = HEAP32[$100>>2]|0;
    $102 = ($98|0)==($101|0);
    if ($102) {
     $103 = HEAP32[2]|0;
     $104 = (+_findtor($103));
     $105 = HEAP32[2]|0;
     $106 = ((($105)) + 5988|0);
     HEAPF32[$106>>2] = $104;
     $107 = HEAP32[2]|0;
     $108 = ((($107)) + 6056|0);
     HEAP32[$108>>2] = 4;
    }
    break;
   }
   case 4:  {
    $109 = HEAP32[2]|0;
    $110 = (_detectperiodchange($109)|0);
    $111 = ($110|0)!=(0);
    $112 = HEAP32[2]|0;
    if (!($111)) {
     $146 = ((($112)) + 6072|0);
     $147 = HEAP32[$146>>2]|0;
     $148 = ($147|0)==(1);
     $149 = HEAP32[2]|0;
     $150 = ((($149)) + 5984|0);
     $151 = ((($149)) + 5988|0);
     $$sink3 = $148 ? $151 : $150;
     $152 = +HEAPF32[$$sink3>>2];
     $153 = HEAP32[2]|0;
     $154 = ((($153)) + 5976|0);
     HEAPF32[$154>>2] = $152;
     $155 = HEAP32[2]|0;
     $156 = ((($155)) + 5976|0);
     $157 = +HEAPF32[$156>>2];
     $158 = $157;
     $159 = $158 + 0.5;
     $160 = (~~(($159)));
     $161 = HEAP32[2]|0;
     $162 = ((($161)) + 5980|0);
     HEAP32[$162>>2] = $160;
     $163 = HEAP32[2]|0;
     $164 = ((($163)) + 6056|0);
     HEAP32[$164>>2] = 7;
     $165 = HEAP32[2]|0;
     $166 = ((($165)) + 5980|0);
     $167 = HEAP32[$166>>2]|0;
     $168 = HEAP32[2]|0;
     $169 = ((($168)) + 6064|0);
     HEAP32[$169>>2] = $167;
     $170 = HEAP32[2]|0;
     $171 = ((($170)) + 6060|0);
     HEAP32[$171>>2] = 0;
     break L4;
    }
    $113 = ((($112)) + 6056|0);
    HEAP32[$113>>2] = 5;
    $114 = HEAP32[2]|0;
    $115 = ((($114)) + 6064|0);
    HEAP32[$115>>2] = 128;
    $116 = HEAP32[2]|0;
    $117 = ((($116)) + 6060|0);
    HEAP32[$117>>2] = 0;
    $118 = HEAP32[2]|0;
    $119 = ((($118)) + 5460|0);
    HEAP32[$119>>2] = 0;
    $120 = HEAP32[2]|0;
    $121 = ((($120)) + 5456|0);
    HEAPF32[$121>>2] = -1000.0;
    $122 = HEAP32[2]|0;
    $123 = ((($122)) + 6072|0);
    HEAP32[$123>>2] = 1;
    $124 = HEAP32[2]|0;
    _findmeter($124);
    $125 = HEAP32[2]|0;
    $126 = ((($125)) + 5984|0);
    $127 = +HEAPF32[$126>>2];
    $128 = $127;
    $129 = $128 + 0.5;
    $130 = (~~(($129)));
    $131 = (128 - ($130))|0;
    $6 = $131;
    $132 = HEAP32[2]|0;
    $133 = ((($132)) + 4944|0);
    $7 = $133;
    $8 = 0;
    while(1) {
     $134 = $8;
     $135 = ($134|0)<(128);
     if (!($135)) {
      break L4;
     }
     $136 = $6;
     $137 = $8;
     $138 = (($136) + ($137))|0;
     $139 = (12 + ($138<<2)|0);
     $140 = +HEAPF32[$139>>2];
     $141 = $7;
     $142 = $8;
     $143 = (($141) + ($142<<2)|0);
     HEAPF32[$143>>2] = $140;
     $144 = $8;
     $145 = (($144) + 1)|0;
     $8 = $145;
    }
    break;
   }
   case 5:  {
    $172 = HEAP32[2]|0;
    $173 = HEAP32[2]|0;
    $174 = ((($173)) + 6060|0);
    $175 = HEAP32[$174>>2]|0;
    _beatperiod($172,$175,1);
    $176 = HEAP32[2]|0;
    $177 = ((($176)) + 6060|0);
    $178 = HEAP32[$177>>2]|0;
    $179 = (($178) + 1)|0;
    $180 = HEAP32[2]|0;
    $181 = ((($180)) + 6060|0);
    HEAP32[$181>>2] = $179;
    $182 = HEAP32[2]|0;
    $183 = ((($182)) + 6060|0);
    $184 = HEAP32[$183>>2]|0;
    $185 = HEAP32[2]|0;
    $186 = ((($185)) + 6064|0);
    $187 = HEAP32[$186>>2]|0;
    $188 = ($184|0)==($187|0);
    if ($188) {
     $189 = HEAP32[2]|0;
     $190 = (+_findtor($189));
     $191 = HEAP32[2]|0;
     $192 = ((($191)) + 5988|0);
     HEAPF32[$192>>2] = $190;
     $193 = HEAP32[2]|0;
     $194 = ((($193)) + 5988|0);
     $195 = +HEAPF32[$194>>2];
     $196 = HEAP32[2]|0;
     $197 = ((($196)) + 5976|0);
     HEAPF32[$197>>2] = $195;
     $198 = HEAP32[2]|0;
     $199 = ((($198)) + 5976|0);
     $200 = +HEAPF32[$199>>2];
     $201 = $200 + 0.5;
     $202 = (~~(($201)));
     $203 = HEAP32[2]|0;
     $204 = ((($203)) + 5980|0);
     HEAP32[$204>>2] = $202;
     $205 = HEAP32[2]|0;
     $206 = ((($205)) + 6056|0);
     HEAP32[$206>>2] = 6;
     $207 = HEAP32[2]|0;
     $208 = ((($207)) + 5980|0);
     $209 = HEAP32[$208>>2]|0;
     $210 = HEAP32[2]|0;
     $211 = ((($210)) + 6064|0);
     HEAP32[$211>>2] = $209;
     $212 = HEAP32[2]|0;
     $213 = ((($212)) + 6060|0);
     HEAP32[$213>>2] = 0;
     $214 = HEAP32[2]|0;
     _setupphaseexpectation($214);
    }
    break;
   }
   case 6:  {
    $215 = HEAP32[2]|0;
    $216 = HEAP32[2]|0;
    $217 = ((($216)) + 6060|0);
    $218 = HEAP32[$217>>2]|0;
    _findphase($215,$218,0,0);
    $219 = HEAP32[2]|0;
    $220 = ((($219)) + 6060|0);
    $221 = HEAP32[$220>>2]|0;
    $222 = (($221) + 1)|0;
    $223 = HEAP32[2]|0;
    $224 = ((($223)) + 6060|0);
    HEAP32[$224>>2] = $222;
    $225 = HEAP32[2]|0;
    $226 = ((($225)) + 6060|0);
    $227 = HEAP32[$226>>2]|0;
    $228 = HEAP32[2]|0;
    $229 = ((($228)) + 6064|0);
    $230 = HEAP32[$229>>2]|0;
    $231 = ($227|0)==($230|0);
    if ($231) {
     $232 = HEAP32[2]|0;
     $233 = ((($232)) + 6056|0);
     HEAP32[$233>>2] = 8;
    }
    break;
   }
   case 7:  {
    $234 = HEAP32[2]|0;
    $235 = HEAP32[2]|0;
    $236 = ((($235)) + 6060|0);
    $237 = HEAP32[$236>>2]|0;
    $238 = HEAP32[2]|0;
    $239 = ((($238)) + 6072|0);
    $240 = HEAP32[$239>>2]|0;
    $241 = HEAP32[2]|0;
    $242 = ((($241)) + 6020|0);
    $243 = +HEAPF32[$242>>2];
    $244 = HEAP32[2]|0;
    $245 = ((($244)) + 5980|0);
    $246 = HEAP32[$245>>2]|0;
    $247 = (+($246|0));
    $248 = $243 * $247;
    $249 = $248 + 0.5;
    $250 = (~~(($249)));
    _findphase($234,$237,$240,$250);
    $251 = HEAP32[2]|0;
    $252 = ((($251)) + 6060|0);
    $253 = HEAP32[$252>>2]|0;
    $254 = (($253) + 1)|0;
    $255 = HEAP32[2]|0;
    $256 = ((($255)) + 6060|0);
    HEAP32[$256>>2] = $254;
    $257 = HEAP32[2]|0;
    $258 = ((($257)) + 6060|0);
    $259 = HEAP32[$258>>2]|0;
    $260 = HEAP32[2]|0;
    $261 = ((($260)) + 6064|0);
    $262 = HEAP32[$261>>2]|0;
    $263 = ($259|0)==($262|0);
    if ($263) {
     $264 = HEAP32[2]|0;
     $265 = ((($264)) + 6056|0);
     HEAP32[$265>>2] = 8;
    }
    break;
   }
   default: {
   }
   }
  } while(0);
  $269 = $5;
  $270 = ($269|0)==(0);
  if ($270) {
   $271 = HEAP32[2]|0;
   $272 = ((($271)) + 24|0);
   $273 = HEAP32[$272>>2]|0;
   $274 = (($273) + 1)|0;
   $275 = HEAP32[2]|0;
   $276 = ((($275)) + 24|0);
   HEAP32[$276>>2] = $274;
   $277 = HEAP32[2]|0;
   $278 = $3;
   _BeatTrack_dofft($277,$278);
  }
  $279 = HEAP32[2]|0;
  $280 = ((($279)) + 6028|0);
  $281 = +HEAPF32[$280>>2];
  $282 = HEAP32[2]|0;
  $283 = ((($282)) + 6024|0);
  $284 = +HEAPF32[$283>>2];
  $285 = $284 + $281;
  HEAPF32[$283>>2] = $285;
  $9 = 0.0;
  $286 = $9;
  $287 = $286 < 0.5;
  $288 = HEAP32[2]|0;
  if ($287) {
   $289 = ((($288)) + 6024|0);
   $290 = +HEAPF32[$289>>2];
   $291 = HEAP32[2]|0;
   $292 = ((($291)) + 6032|0);
   HEAPF32[$292>>2] = $290;
   $293 = HEAP32[2]|0;
   $294 = ((($293)) + 6016|0);
   $295 = +HEAPF32[$294>>2];
   $296 = HEAP32[2]|0;
   $297 = ((($296)) + 6036|0);
   HEAPF32[$297>>2] = $295;
   $298 = HEAP32[2]|0;
   $299 = ((($298)) + 6028|0);
   $300 = +HEAPF32[$299>>2];
   $301 = HEAP32[2]|0;
   $302 = ((($301)) + 6040|0);
   HEAPF32[$302>>2] = $300;
  } else {
   $303 = ((($288)) + 6040|0);
   $304 = +HEAPF32[$303>>2];
   $305 = HEAP32[2]|0;
   $306 = ((($305)) + 6032|0);
   $307 = +HEAPF32[$306>>2];
   $308 = $307 + $304;
   HEAPF32[$306>>2] = $308;
  }
  $309 = HEAP32[2]|0;
  $310 = ((($309)) + 6024|0);
  $311 = +HEAPF32[$310>>2];
  $312 = $311 >= 1.0;
  if ($312) {
   $313 = HEAP32[2]|0;
   $314 = ((($313)) + 6024|0);
   $315 = +HEAPF32[$314>>2];
   $316 = $315 - 1.0;
   HEAPF32[$314>>2] = $316;
  }
  $317 = HEAP32[2]|0;
  $318 = ((($317)) + 6032|0);
  $319 = +HEAPF32[$318>>2];
  $320 = $319 >= 1.0;
  if ($320) {
   $4 = 1;
   $321 = HEAP32[2]|0;
   $322 = ((($321)) + 6032|0);
   $323 = +HEAPF32[$322>>2];
   $324 = $323 - 1.0;
   HEAPF32[$322>>2] = $324;
   $325 = HEAP32[2]|0;
   $326 = ((($325)) + 6044|0);
   HEAP32[$326>>2] = 0;
   $327 = HEAP32[2]|0;
   $328 = ((($327)) + 6048|0);
   HEAP32[$328>>2] = 0;
   $329 = HEAP32[2]|0;
   $330 = ((($329)) + 6052|0);
   HEAP32[$330>>2] = 0;
  }
  $331 = HEAP32[2]|0;
  $332 = ((($331)) + 6032|0);
  $333 = +HEAPF32[$332>>2];
  $334 = $333 >= 0.5;
  if ($334) {
   $335 = HEAP32[2]|0;
   $336 = ((($335)) + 6044|0);
   $337 = HEAP32[$336>>2]|0;
   $338 = ($337|0)==(0);
   if ($338) {
    $339 = HEAP32[2]|0;
    $340 = ((($339)) + 6044|0);
    HEAP32[$340>>2] = 1;
   }
  }
  $341 = HEAP32[2]|0;
  $342 = ((($341)) + 6032|0);
  $343 = +HEAPF32[$342>>2];
  $344 = $343 >= 0.25;
  if ($344) {
   $345 = HEAP32[2]|0;
   $346 = ((($345)) + 6048|0);
   $347 = HEAP32[$346>>2]|0;
   $348 = ($347|0)==(0);
   if ($348) {
    $349 = HEAP32[2]|0;
    $350 = ((($349)) + 6048|0);
    HEAP32[$350>>2] = 1;
   }
  }
  $351 = HEAP32[2]|0;
  $352 = ((($351)) + 6032|0);
  $353 = +HEAPF32[$352>>2];
  $354 = $353 >= 0.75;
  if ($354) {
   $355 = HEAP32[2]|0;
   $356 = ((($355)) + 6052|0);
   $357 = HEAP32[$356>>2]|0;
   $358 = ($357|0)==(0);
   if ($358) {
    $359 = HEAP32[2]|0;
    $360 = ((($359)) + 6052|0);
    HEAP32[$360>>2] = 1;
   }
  }
  $361 = $5;
  $362 = (($361) + 1)|0;
  $5 = $362;
 }
 $363 = $4;
 STACKTOP = sp;return ($363|0);
}
function _autocorr($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $10 = 0.0, $11 = 0, $12 = 0.0, $13 = 0.0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0;
 var $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0.0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0;
 var $47 = 0, $48 = 0, $49 = 0.0, $5 = 0, $50 = 0.0, $51 = 0.0, $52 = 0.0, $53 = 0.0, $54 = 0.0, $55 = 0, $56 = 0, $57 = 0.0, $58 = 0, $59 = 0.0, $6 = 0, $60 = 0.0, $61 = 0, $62 = 0, $63 = 0, $64 = 0;
 var $65 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(48|0);
 $2 = $0;
 $3 = $1;
 $14 = $2;
 $15 = ((($14)) + 6080|0);
 $16 = HEAP32[$15>>2]|0;
 $17 = (($16) + 700)|0;
 $4 = $17;
 $18 = $2;
 $19 = ((($18)) + 28|0);
 $5 = $19;
 $20 = $2;
 $21 = ((($20)) + 2896|0);
 $6 = $21;
 $7 = 0;
 while(1) {
  $22 = $7;
  $23 = ($22|0)<(4);
  if (!($23)) {
   break;
  }
  $24 = $3;
  $25 = $24<<2;
  $26 = $7;
  $27 = (($25) + ($26))|0;
  $8 = $27;
  $28 = $8;
  $29 = (($28) - 512)|0;
  $30 = (Math_abs(($29|0))|0);
  $9 = $30;
  $10 = 0.0;
  $31 = $8;
  $11 = $31;
  while(1) {
   $32 = $11;
   $33 = ($32|0)<(512);
   if (!($33)) {
    break;
   }
   $34 = $5;
   $35 = $11;
   $36 = $4;
   $37 = (($35) + ($36))|0;
   $38 = (($37|0) % 700)&-1;
   $39 = (($34) + ($38<<2)|0);
   $40 = +HEAPF32[$39>>2];
   $12 = $40;
   $41 = $5;
   $42 = $11;
   $43 = $4;
   $44 = (($42) + ($43))|0;
   $45 = $8;
   $46 = (($44) - ($45))|0;
   $47 = (($46|0) % 700)&-1;
   $48 = (($41) + ($47<<2)|0);
   $49 = +HEAPF32[$48>>2];
   $13 = $49;
   $50 = $12;
   $51 = $13;
   $52 = $50 * $51;
   $53 = $10;
   $54 = $53 + $52;
   $10 = $54;
   $55 = $11;
   $56 = (($55) + 1)|0;
   $11 = $56;
  }
  $57 = $10;
  $58 = $9;
  $59 = (+($58|0));
  $60 = $57 * $59;
  $61 = $6;
  $62 = $8;
  $63 = (($61) + ($62<<2)|0);
  HEAPF32[$63>>2] = $60;
  $64 = $7;
  $65 = (($64) + 1)|0;
  $7 = $65;
 }
 STACKTOP = sp;return;
}
function _beatperiod($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $10 = 0.0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0.0, $26 = 0.0, $27 = 0.0, $28 = 0.0, $29 = 0;
 var $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0.0, $43 = 0.0, $44 = 0.0, $45 = 0.0, $46 = 0.0, $47 = 0;
 var $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0.0, $56 = 0, $57 = 0, $58 = 0, $59 = 0.0, $6 = 0, $60 = 0.0, $61 = 0.0, $62 = 0, $63 = 0, $64 = 0.0, $65 = 0;
 var $66 = 0.0, $67 = 0, $68 = 0, $69 = 0, $7 = 0.0, $70 = 0, $71 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(48|0);
 $3 = $0;
 $4 = $1;
 $5 = $2;
 $14 = $3;
 $15 = ((($14)) + 2896|0);
 $6 = $15;
 $7 = 0.0;
 $8 = 1;
 while(1) {
  $16 = $8;
  $17 = $3;
  $18 = ((($17)) + 6076|0);
  $19 = HEAP32[$18>>2]|0;
  $20 = ($16|0)<=($19|0);
  if (!($20)) {
   break;
  }
  $21 = $8;
  $22 = $21<<1;
  $23 = (($22) - 1)|0;
  $9 = $23;
  $24 = $9;
  $25 = (+($24|0));
  $26 = $25;
  $27 = 1.0 / $26;
  $28 = $27;
  $10 = $28;
  $11 = 0;
  while(1) {
   $29 = $11;
   $30 = $9;
   $31 = ($29|0)<($30|0);
   if (!($31)) {
    break;
   }
   $32 = $11;
   $33 = $8;
   $34 = $4;
   $35 = Math_imul($33, $34)|0;
   $36 = (($32) + ($35))|0;
   $12 = $36;
   $37 = $12;
   $38 = ($37|0)<(512);
   if ($38) {
    $39 = $6;
    $40 = $12;
    $41 = (($39) + ($40<<2)|0);
    $42 = +HEAPF32[$41>>2];
    $43 = $10;
    $44 = $42 * $43;
    $45 = $7;
    $46 = $45 + $44;
    $7 = $46;
   }
   $47 = $11;
   $48 = (($47) + 1)|0;
   $11 = $48;
  }
  $49 = $8;
  $50 = (($49) + 1)|0;
  $8 = $50;
 }
 $51 = $5;
 $52 = ($51|0)!=(0);
 if ($52) {
  $13 = 1040;
 } else {
  $53 = $3;
  $54 = ((($53)) + 4944|0);
  $13 = $54;
 }
 $55 = $7;
 $56 = $13;
 $57 = $4;
 $58 = (($56) + ($57<<2)|0);
 $59 = +HEAPF32[$58>>2];
 $60 = $55 * $59;
 $7 = $60;
 $61 = $7;
 $62 = $3;
 $63 = ((($62)) + 5456|0);
 $64 = +HEAPF32[$63>>2];
 $65 = $61 > $64;
 if (!($65)) {
  STACKTOP = sp;return;
 }
 $66 = $7;
 $67 = $3;
 $68 = ((($67)) + 5456|0);
 HEAPF32[$68>>2] = $66;
 $69 = $4;
 $70 = $3;
 $71 = ((($70)) + 5460|0);
 HEAP32[$71>>2] = $69;
 STACKTOP = sp;return;
}
function _findtor($0) {
 $0 = $0|0;
 var $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0.0, $110 = 0, $111 = 0, $112 = 0, $113 = 0.0, $114 = 0, $115 = 0.0, $116 = 0.0;
 var $117 = 0.0, $118 = 0, $119 = 0.0, $12 = 0, $120 = 0.0, $121 = 0.0, $122 = 0.0, $123 = 0, $124 = 0.0, $125 = 0.0, $126 = 0.0, $127 = 0.0, $128 = 0.0, $129 = 0, $13 = 0, $130 = 0.0, $131 = 0, $132 = 0.0, $133 = 0.0, $134 = 0.0;
 var $135 = 0, $136 = 0.0, $137 = 0.0, $138 = 0.0, $139 = 0.0, $14 = 0, $140 = 0.0, $141 = 0.0, $142 = 0.0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0.0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0;
 var $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0.0, $30 = 0, $31 = 0.0, $32 = 0.0, $33 = 0.0, $34 = 0, $35 = 0.0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0;
 var $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0;
 var $61 = 0.0, $62 = 0.0, $63 = 0.0, $64 = 0, $65 = 0.0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0;
 var $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0.0, $95 = 0.0, $96 = 0.0, $97 = 0;
 var $98 = 0.0, $99 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(48|0);
 $1 = $0;
 $13 = $1;
 $14 = ((($13)) + 5460|0);
 $15 = HEAP32[$14>>2]|0;
 $16 = (($15) + 1)|0;
 $7 = $16;
 $17 = $1;
 $18 = ((($17)) + 2896|0);
 $19 = ((($18)) + -4|0);
 $8 = $19;
 $4 = 0;
 $2 = -1000.0;
 $20 = $7;
 $21 = $20<<1;
 $22 = (($21) - 1)|0;
 $9 = $22;
 while(1) {
  $23 = $9;
  $24 = $7;
  $25 = $24<<1;
  $26 = (($25) + 1)|0;
  $27 = ($23|0)<=($26|0);
  if (!($27)) {
   break;
  }
  $28 = $8;
  $29 = $9;
  $30 = (($28) + ($29<<2)|0);
  $31 = +HEAPF32[$30>>2];
  $3 = $31;
  $32 = $3;
  $33 = $2;
  $34 = $32 > $33;
  if ($34) {
   $35 = $3;
   $2 = $35;
   $36 = $9;
   $37 = $7;
   $38 = $37<<1;
   $39 = (($38) - 1)|0;
   $40 = (($36) - ($39))|0;
   $41 = (($40) + 1)|0;
   $4 = $41;
  }
  $42 = $9;
  $43 = (($42) + 1)|0;
  $9 = $43;
 }
 $44 = $4;
 $45 = $7;
 $46 = (($45) + 1)|0;
 $47 = $46<<1;
 $48 = (($44) + ($47))|0;
 $49 = (($48) - 2)|0;
 $4 = $49;
 $5 = 0;
 $2 = -1000.0;
 $50 = $7;
 $51 = ($50*3)|0;
 $52 = (($51) - 2)|0;
 $10 = $52;
 while(1) {
  $53 = $10;
  $54 = $7;
  $55 = ($54*3)|0;
  $56 = (($55) + 2)|0;
  $57 = ($53|0)<=($56|0);
  if (!($57)) {
   break;
  }
  $58 = $8;
  $59 = $10;
  $60 = (($58) + ($59<<2)|0);
  $61 = +HEAPF32[$60>>2];
  $3 = $61;
  $62 = $3;
  $63 = $2;
  $64 = $62 > $63;
  if ($64) {
   $65 = $3;
   $2 = $65;
   $66 = $10;
   $67 = $7;
   $68 = ($67*3)|0;
   $69 = (($68) - 2)|0;
   $70 = (($66) - ($69))|0;
   $71 = (($70) + 1)|0;
   $5 = $71;
  }
  $72 = $10;
  $73 = (($72) + 1)|0;
  $10 = $73;
 }
 $74 = $5;
 $75 = $7;
 $76 = ($75*3)|0;
 $77 = (($74) + ($76))|0;
 $78 = (($77) - 4)|0;
 $5 = $78;
 $79 = $1;
 $80 = ((($79)) + 6076|0);
 $81 = HEAP32[$80>>2]|0;
 $82 = ($81|0)==(4);
 if (!($82)) {
  $129 = $7;
  $130 = (+($129|0));
  $131 = $4;
  $132 = (+($131|0));
  $133 = $132 * 0.5;
  $134 = $130 + $133;
  $135 = $5;
  $136 = (+($135|0));
  $137 = $136 / 3.0;
  $138 = $137;
  $139 = $134 + $138;
  $140 = $139 * 0.3333333;
  $141 = $140;
  $11 = $141;
  $142 = $11;
  STACKTOP = sp;return (+$142);
 }
 $6 = 0;
 $2 = -1000.0;
 $83 = $7;
 $84 = $83<<2;
 $85 = (($84) - 3)|0;
 $12 = $85;
 while(1) {
  $86 = $12;
  $87 = $7;
  $88 = $87<<2;
  $89 = (($88) + 3)|0;
  $90 = ($86|0)<=($89|0);
  if (!($90)) {
   break;
  }
  $91 = $8;
  $92 = $12;
  $93 = (($91) + ($92<<2)|0);
  $94 = +HEAPF32[$93>>2];
  $3 = $94;
  $95 = $3;
  $96 = $2;
  $97 = $95 > $96;
  if ($97) {
   $98 = $3;
   $2 = $98;
   $99 = $12;
   $100 = $7;
   $101 = $100<<2;
   $102 = (($101) - 3)|0;
   $103 = (($99) - ($102))|0;
   $104 = (($103) + 1)|0;
   $6 = $104;
  }
  $105 = $12;
  $106 = (($105) + 1)|0;
  $12 = $106;
 }
 $107 = $6;
 $108 = $7;
 $109 = $108<<2;
 $110 = (($107) + ($109))|0;
 $111 = (($110) - 9)|0;
 $6 = $111;
 $112 = $7;
 $113 = (+($112|0));
 $114 = $4;
 $115 = (+($114|0));
 $116 = $115 * 0.5;
 $117 = $113 + $116;
 $118 = $5;
 $119 = (+($118|0));
 $120 = $119 / 3.0;
 $121 = $120;
 $122 = $117 + $121;
 $123 = $6;
 $124 = (+($123|0));
 $125 = $124 * 0.25;
 $126 = $122 + $125;
 $127 = $126 * 0.25;
 $128 = $127;
 $11 = $128;
 $142 = $11;
 STACKTOP = sp;return (+$142);
}
function _detectperiodchange($0) {
 $0 = $0|0;
 var $$sink = 0, $$sink2 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0.0, $13 = 0.0, $14 = 0.0, $15 = 0.0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0;
 var $26 = 0, $27 = 0, $28 = 0, $29 = 0.0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0;
 var $44 = 0, $45 = 0.0, $46 = 0.0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0.0, $51 = 0.0, $52 = 0, $53 = 0, $54 = 0, $55 = 0.0, $56 = 0.0, $57 = 0.0, $58 = 0.0, $59 = 0, $6 = 0, $60 = 0, $7 = 0;
 var $8 = 0, $9 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $2 = $0;
 $3 = $2;
 $4 = ((($3)) + 5992|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = ($5|0)==(0);
 $7 = $2;
 if ($6) {
  $8 = ((($7)) + 5988|0);
  $9 = +HEAPF32[$8>>2];
  $10 = $2;
  $11 = ((($10)) + 5984|0);
  $12 = +HEAPF32[$11>>2];
  $13 = $9 - $12;
  $14 = $13;
  $15 = (+Math_abs((+$14)));
  $16 = $15 > 3.9017000198364258;
  if ($16) {
   $17 = $2;
   $$sink = 3;$$sink2 = $17;
   label = 5;
  }
 } else {
  $18 = ((($7)) + 5992|0);
  $19 = HEAP32[$18>>2]|0;
  $20 = (($19) - 1)|0;
  $21 = $2;
  $$sink = $20;$$sink2 = $21;
  label = 5;
 }
 if ((label|0) == 5) {
  $22 = ((($$sink2)) + 5992|0);
  HEAP32[$22>>2] = $$sink;
 }
 $23 = $2;
 $24 = ((($23)) + 5992|0);
 $25 = HEAP32[$24>>2]|0;
 $26 = ($25|0)!=(0);
 if ($26) {
  $27 = $2;
  $28 = ((($27)) + 5984|0);
  $29 = +HEAPF32[$28>>2];
  $30 = $2;
  $31 = ((($30)) + 5996|0);
  $32 = $2;
  $33 = ((($32)) + 5992|0);
  $34 = HEAP32[$33>>2]|0;
  $35 = (($34) - 1)|0;
  $36 = (($31) + ($35<<2)|0);
  HEAPF32[$36>>2] = $29;
 }
 $37 = $2;
 $38 = ((($37)) + 5992|0);
 $39 = HEAP32[$38>>2]|0;
 $40 = ($39|0)==(1);
 if ($40) {
  $41 = $2;
  $42 = ((($41)) + 5992|0);
  HEAP32[$42>>2] = 0;
  $43 = $2;
  $44 = ((($43)) + 5996|0);
  $45 = +HEAPF32[$44>>2];
  $46 = 2.0 * $45;
  $47 = $2;
  $48 = ((($47)) + 5996|0);
  $49 = ((($48)) + 4|0);
  $50 = +HEAPF32[$49>>2];
  $51 = $46 - $50;
  $52 = $2;
  $53 = ((($52)) + 5996|0);
  $54 = ((($53)) + 8|0);
  $55 = +HEAPF32[$54>>2];
  $56 = $51 - $55;
  $57 = $56;
  $58 = (+Math_abs((+$57)));
  $59 = $58 < 7.8034000396728515;
  if ($59) {
   $1 = 1;
   $60 = $1;
   STACKTOP = sp;return ($60|0);
  }
 }
 $1 = 0;
 $60 = $1;
 STACKTOP = sp;return ($60|0);
}
function _findmeter($0) {
 $0 = $0|0;
 var $1 = 0, $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $1 = $0;
 $2 = $1;
 $3 = ((($2)) + 6076|0);
 HEAP32[$3>>2] = 4;
 STACKTOP = sp;return;
}
function _setupphaseexpectation($0) {
 $0 = $0|0;
 var $1 = 0, $10 = 0, $11 = 0, $12 = 0.0, $13 = 0.0, $14 = 0.0, $15 = 0.0, $16 = 0.0, $17 = 0.0, $18 = 0.0, $19 = 0.0, $2 = 0, $20 = 0.0, $21 = 0.0, $22 = 0.0, $23 = 0.0, $24 = 0.0, $25 = 0.0, $26 = 0.0, $27 = 0;
 var $28 = 0, $29 = 0.0, $3 = 0.0, $30 = 0.0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0.0, $36 = 0.0, $37 = 0.0, $38 = 0.0, $39 = 0.0, $4 = 0.0, $40 = 0.0, $41 = 0.0, $42 = 0, $43 = 0, $44 = 0, $45 = 0;
 var $46 = 0, $5 = 0.0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $1 = $0;
 $7 = $1;
 $8 = ((($7)) + 5464|0);
 $2 = $8;
 $9 = $1;
 $10 = ((($9)) + 5980|0);
 $11 = HEAP32[$10>>2]|0;
 $12 = (+($11|0));
 $13 = $12 * 0.25;
 $3 = $13;
 $14 = $3;
 $15 = $14;
 $16 = 2.5066283 * $15;
 $17 = 1.0 / $16;
 $18 = $17;
 $4 = $18;
 $19 = $3;
 $20 = $19;
 $21 = 2.0 * $20;
 $22 = $3;
 $23 = $22;
 $24 = $21 * $23;
 $25 = 1.0 / $24;
 $26 = $25;
 $5 = $26;
 $6 = 0;
 while(1) {
  $27 = $6;
  $28 = ($27|0)<(128);
  if (!($28)) {
   break;
  }
  $29 = $4;
  $30 = $29;
  $31 = $6;
  $32 = $6;
  $33 = Math_imul($31, $32)|0;
  $34 = (0 - ($33))|0;
  $35 = (+($34|0));
  $36 = $5;
  $37 = $35 * $36;
  $38 = $37;
  $39 = (+Math_exp((+$38)));
  $40 = $30 * $39;
  $41 = $40;
  $42 = $2;
  $43 = $6;
  $44 = (($42) + ($43<<2)|0);
  HEAPF32[$44>>2] = $41;
  $45 = $6;
  $46 = (($45) + 1)|0;
  $6 = $46;
 }
 STACKTOP = sp;return;
}
function _findphase($0,$1,$2,$3) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 $3 = $3|0;
 var $10 = 0, $11 = 0, $12 = 0.0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0;
 var $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0.0, $47 = 0, $48 = 0;
 var $49 = 0.0, $5 = 0, $50 = 0.0, $51 = 0.0, $52 = 0.0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0;
 var $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0.0, $78 = 0.0, $79 = 0.0, $8 = 0, $80 = 0.0, $81 = 0, $82 = 0, $83 = 0.0, $84 = 0;
 var $85 = 0.0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 64|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(64|0);
 $4 = $0;
 $5 = $1;
 $6 = $2;
 $7 = $3;
 $18 = $4;
 $19 = ((($18)) + 28|0);
 $8 = $19;
 $20 = $4;
 $21 = ((($20)) + 5980|0);
 $22 = HEAP32[$21>>2]|0;
 $9 = $22;
 $23 = $4;
 $24 = ((($23)) + 6084|0);
 $25 = HEAP32[$24>>2]|0;
 $26 = (($25) + 700)|0;
 $10 = $26;
 $11 = -1;
 $27 = $9;
 $28 = ($27|0)!=(0);
 if ($28) {
  $29 = $9;
  $30 = (512 / ($29|0))&-1;
  $31 = (($30) - 1)|0;
  $11 = $31;
 }
 $12 = 0.0;
 $13 = 0;
 while(1) {
  $32 = $13;
  $33 = $11;
  $34 = ($32|0)<($33|0);
  if (!($34)) {
   break;
  }
  $35 = $10;
  $36 = $9;
  $37 = $13;
  $38 = Math_imul($36, $37)|0;
  $39 = (($35) - ($38))|0;
  $40 = $5;
  $41 = (($39) - ($40))|0;
  $42 = (($41|0) % 700)&-1;
  $14 = $42;
  $43 = $8;
  $44 = $14;
  $45 = (($43) + ($44<<2)|0);
  $46 = +HEAPF32[$45>>2];
  $47 = $13;
  $48 = (($47) + 1)|0;
  $49 = (+($48|0));
  $50 = $46 / $49;
  $51 = $12;
  $52 = $51 + $50;
  $12 = $52;
  $53 = $13;
  $54 = (($53) + 1)|0;
  $13 = $54;
 }
 $55 = $6;
 $56 = ($55|0)!=(0);
 if ($56) {
  $57 = $7;
  $58 = $5;
  $59 = (($57) - ($58))|0;
  $60 = (Math_abs(($59|0))|0);
  $15 = $60;
  $61 = $9;
  $62 = $7;
  $63 = (($61) - ($62))|0;
  $64 = $5;
  $65 = (($63) + ($64))|0;
  $66 = (Math_abs(($65|0))|0);
  $16 = $66;
  $67 = $15;
  $68 = $16;
  $69 = ($67|0)<($68|0);
  $70 = $15;
  $71 = $16;
  $72 = $69 ? $70 : $71;
  $17 = $72;
  $73 = $4;
  $74 = ((($73)) + 5464|0);
  $75 = $17;
  $76 = (($74) + ($75<<2)|0);
  $77 = +HEAPF32[$76>>2];
  $78 = $12;
  $79 = $78 * $77;
  $12 = $79;
 }
 $80 = $12;
 $81 = $4;
 $82 = ((($81)) + 6008|0);
 $83 = +HEAPF32[$82>>2];
 $84 = $80 > $83;
 if (!($84)) {
  STACKTOP = sp;return;
 }
 $85 = $12;
 $86 = $4;
 $87 = ((($86)) + 6008|0);
 HEAPF32[$87>>2] = $85;
 $88 = $5;
 $89 = $4;
 $90 = ((($89)) + 6012|0);
 HEAP32[$90>>2] = $88;
 STACKTOP = sp;return;
}
function _finaldecision($0) {
 $0 = $0|0;
 var $1 = 0, $10 = 0.0, $11 = 0.0, $12 = 0.0, $13 = 0.0, $14 = 0.0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0.0, $2 = 0.0, $20 = 0.0, $21 = 0, $22 = 0.0, $23 = 0.0, $24 = 0, $25 = 0, $26 = 0, $27 = 0;
 var $28 = 0, $29 = 0.0, $3 = 0.0, $30 = 0.0, $31 = 0, $32 = 0.0, $33 = 0.0, $34 = 0, $35 = 0, $36 = 0.0, $37 = 0.0, $38 = 0.0, $39 = 0.0, $4 = 0.0, $40 = 0.0, $41 = 0, $42 = 0, $43 = 0.0, $44 = 0.0, $45 = 0;
 var $46 = 0, $47 = 0, $48 = 0.0, $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0.0, $53 = 0.0, $54 = 0.0, $55 = 0.0, $56 = 0.0, $57 = 0.0, $58 = 0.0, $59 = 0.0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0;
 var $7 = 0.0, $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $1 = $0;
 $5 = $1;
 $6 = ((($5)) + 5976|0);
 $7 = +HEAPF32[$6>>2];
 $8 = $1;
 $9 = ((($8)) + 8|0);
 $10 = +HEAPF32[$9>>2];
 $11 = $7 * $10;
 $12 = $11;
 $13 = 1.0 / $12;
 $14 = $13;
 $15 = $1;
 $16 = ((($15)) + 6016|0);
 HEAPF32[$16>>2] = $14;
 $17 = $1;
 $18 = ((($17)) + 6016|0);
 $19 = +HEAPF32[$18>>2];
 $20 = 64.0 * $19;
 $21 = $1;
 $22 = +HEAPF32[$21>>2];
 $23 = $20 / $22;
 $24 = $1;
 $25 = ((($24)) + 6028|0);
 HEAPF32[$25>>2] = $23;
 $26 = $1;
 $27 = ((($26)) + 6068|0);
 $28 = HEAP32[$27>>2]|0;
 $29 = (+($28|0));
 $30 = $29 * 64.0;
 $31 = $1;
 $32 = +HEAPF32[$31>>2];
 $33 = $30 / $32;
 $2 = $33;
 $34 = $1;
 $35 = ((($34)) + 8|0);
 $36 = +HEAPF32[$35>>2];
 $37 = 7.0 * $36;
 $38 = $2;
 $39 = $38 + $37;
 $2 = $39;
 $40 = $2;
 $41 = $1;
 $42 = ((($41)) + 6016|0);
 $43 = +HEAPF32[$42>>2];
 $44 = $40 * $43;
 $3 = $44;
 $45 = $1;
 $46 = ((($45)) + 6012|0);
 $47 = HEAP32[$46>>2]|0;
 $48 = (+($47|0));
 $49 = $1;
 $50 = ((($49)) + 5980|0);
 $51 = HEAP32[$50>>2]|0;
 $52 = (+($51|0));
 $53 = $48 / $52;
 $4 = $53;
 $54 = $4;
 $55 = $3;
 $56 = $54 + $55;
 $57 = $56;
 $58 = (+_fmod($57,1.0));
 $59 = $58;
 $60 = $1;
 $61 = ((($60)) + 6024|0);
 HEAPF32[$61>>2] = $59;
 $62 = $1;
 $63 = ((($62)) + 6020|0);
 HEAPF32[$63>>2] = $59;
 STACKTOP = sp;return;
}
function _BeatTrack_dofft($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0;
 var $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0.0, $42 = 0, $43 = 0, $5 = 0, $6 = 0, $7 = 0;
 var $8 = 0, $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $2 = $0;
 $3 = $1;
 $4 = $2;
 $5 = $3;
 _complexdf($4,$5);
 $6 = $2;
 $7 = ((($6)) + 24|0);
 $8 = HEAP32[$7>>2]|0;
 $9 = (($8|0) % 128)&-1;
 $10 = ($9|0)==(0);
 if (!($10)) {
  STACKTOP = sp;return;
 }
 $11 = $2;
 $12 = ((($11)) + 5460|0);
 HEAP32[$12>>2] = 0;
 $13 = $2;
 $14 = ((($13)) + 5456|0);
 HEAPF32[$14>>2] = -1000.0;
 $15 = $2;
 $16 = ((($15)) + 6008|0);
 HEAPF32[$16>>2] = -1000.0;
 $17 = $2;
 $18 = ((($17)) + 6012|0);
 HEAP32[$18>>2] = 0;
 $19 = $2;
 $20 = ((($19)) + 6056|0);
 HEAP32[$20>>2] = 1;
 $21 = $2;
 $22 = ((($21)) + 6060|0);
 HEAP32[$22>>2] = 0;
 $23 = $2;
 $24 = ((($23)) + 6064|0);
 HEAP32[$24>>2] = 128;
 $25 = $2;
 $26 = ((($25)) + 6068|0);
 HEAP32[$26>>2] = 0;
 $27 = $2;
 $28 = ((($27)) + 2828|0);
 $29 = HEAP32[$28>>2]|0;
 $30 = (($29) + 700)|0;
 $31 = (($30) - 512)|0;
 $32 = $2;
 $33 = ((($32)) + 6080|0);
 HEAP32[$33>>2] = $31;
 $34 = $2;
 $35 = ((($34)) + 2828|0);
 $36 = HEAP32[$35>>2]|0;
 $37 = $2;
 $38 = ((($37)) + 6084|0);
 HEAP32[$38>>2] = $36;
 $39 = $2;
 $40 = ((($39)) + 6024|0);
 $41 = +HEAPF32[$40>>2];
 $42 = $2;
 $43 = ((($42)) + 6020|0);
 HEAPF32[$43>>2] = $41;
 STACKTOP = sp;return;
}
function _BeatTrack_tempo() {
 var $0 = 0, $1 = 0, $2 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = HEAP32[2]|0;
 $1 = ((($0)) + 6036|0);
 $2 = +HEAPF32[$1>>2];
 return (+$2);
}
function _BeatTrack_phase() {
 var $0 = 0, $1 = 0, $2 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = HEAP32[2]|0;
 $1 = ((($0)) + 6032|0);
 $2 = +HEAPF32[$1>>2];
 return (+$2);
}
function _BeatTrack_samplestonextbeat() {
 var $0 = 0, $1 = 0, $10 = 0.0, $11 = 0, $2 = 0.0, $3 = 0.0, $4 = 0, $5 = 0, $6 = 0.0, $7 = 0.0, $8 = 0, $9 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = HEAP32[2]|0;
 $1 = ((($0)) + 6032|0);
 $2 = +HEAPF32[$1>>2];
 $3 = 1.0 - $2;
 $4 = HEAP32[2]|0;
 $5 = ((($4)) + 6036|0);
 $6 = +HEAPF32[$5>>2];
 $7 = $3 / $6;
 $8 = HEAP32[2]|0;
 $9 = +HEAPF32[$8>>2];
 $10 = $7 * $9;
 $11 = (~~(($10)));
 return ($11|0);
}
function _complexdf($0,$1) {
 $0 = $0|0;
 $1 = $1|0;
 var $10 = 0, $100 = 0.0, $101 = 0.0, $102 = 0.0, $103 = 0.0, $104 = 0.0, $105 = 0.0, $106 = 0.0, $107 = 0.0, $108 = 0.0, $109 = 0.0, $11 = 0.0, $110 = 0.0, $111 = 0.0, $112 = 0.0, $113 = 0.0, $114 = 0.0, $115 = 0.0, $116 = 0.0, $117 = 0.0;
 var $118 = 0.0, $119 = 0.0, $12 = 0.0, $120 = 0.0, $121 = 0.0, $122 = 0.0, $123 = 0.0, $124 = 0.0, $125 = 0.0, $126 = 0.0, $127 = 0.0, $128 = 0.0, $129 = 0, $13 = 0.0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0;
 var $136 = 0, $137 = 0, $138 = 0.0, $139 = 0, $14 = 0.0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0.0, $150 = 0, $151 = 0, $152 = 0, $153 = 0;
 var $154 = 0, $155 = 0, $156 = 0, $157 = 0.0, $158 = 0, $159 = 0, $16 = 0.0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0.0, $165 = 0, $166 = 0, $167 = 0, $168 = 0.0, $169 = 0.0, $17 = 0.0, $170 = 0.0, $171 = 0.0;
 var $172 = 0, $173 = 0.0, $174 = 0.0, $175 = 0.0, $176 = 0.0, $177 = 0.0, $178 = 0, $179 = 0, $18 = 0.0, $180 = 0.0, $181 = 0.0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0.0;
 var $190 = 0.0, $191 = 0.0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $2 = 0, $20 = 0.0, $21 = 0.0, $22 = 0, $23 = 0, $24 = 0, $25 = 0.0, $26 = 0, $27 = 0, $28 = 0.0, $29 = 0, $3 = 0;
 var $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0.0, $47 = 0.0, $48 = 0;
 var $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0.0, $53 = 0.0, $54 = 0.0, $55 = 0.0, $56 = 0.0, $57 = 0.0, $58 = 0.0, $59 = 0.0, $6 = 0, $60 = 0.0, $61 = 0.0, $62 = 0.0, $63 = 0.0, $64 = 0, $65 = 0, $66 = 0;
 var $67 = 0.0, $68 = 0.0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0.0, $73 = 0.0, $74 = 0.0, $75 = 0.0, $76 = 0.0, $77 = 0.0, $78 = 0, $79 = 0, $8 = 0.0, $80 = 0, $81 = 0.0, $82 = 0.0, $83 = 0.0, $84 = 0;
 var $85 = 0, $86 = 0, $87 = 0.0, $88 = 0.0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0.0, $93 = 0, $94 = 0, $95 = 0, $96 = 0.0, $97 = 0.0, $98 = 0.0, $99 = 0.0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 112|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(112|0);
 $2 = $0;
 $3 = $1;
 $29 = $3;
 $4 = $29;
 $30 = $2;
 $31 = ((($30)) + 12|0);
 $32 = HEAP32[$31>>2]|0;
 $5 = $32;
 $33 = $2;
 $34 = ((($33)) + 16|0);
 $35 = HEAP32[$34>>2]|0;
 $6 = $35;
 $36 = $2;
 $37 = ((($36)) + 20|0);
 $38 = HEAP32[$37>>2]|0;
 $7 = $38;
 $8 = 0.0;
 $9 = 1;
 while(1) {
  $39 = $9;
  $40 = ($39|0)<(512);
  if (!($40)) {
   break;
  }
  $41 = $9;
  $42 = $41<<1;
  $10 = $42;
  $43 = $4;
  $44 = $10;
  $45 = (($43) + ($44<<3)|0);
  $46 = +HEAPF64[$45>>3];
  $47 = $46;
  $11 = $47;
  $48 = $4;
  $49 = $10;
  $50 = (($49) + 1)|0;
  $51 = (($48) + ($50<<3)|0);
  $52 = +HEAPF64[$51>>3];
  $53 = $52;
  $12 = $53;
  $54 = $11;
  $55 = $11;
  $56 = $54 * $55;
  $57 = $12;
  $58 = $12;
  $59 = $57 * $58;
  $60 = $56 + $59;
  $61 = $60;
  $62 = (+Math_sqrt((+$61)));
  $63 = $62;
  $13 = $63;
  $64 = $5;
  $65 = $9;
  $66 = (($64) + ($65<<2)|0);
  $67 = +HEAPF32[$66>>2];
  $14 = $67;
  $68 = $13;
  $69 = $5;
  $70 = $9;
  $71 = (($69) + ($70<<2)|0);
  HEAPF32[$71>>2] = $68;
  $72 = $12;
  $73 = $72;
  $74 = $11;
  $75 = $74;
  $76 = (+Math_atan2((+$73),(+$75)));
  $77 = $76;
  $15 = $77;
  $78 = $7;
  $79 = $9;
  $80 = (($78) + ($79<<2)|0);
  $81 = +HEAPF32[$80>>2];
  $16 = $81;
  $82 = $15;
  $83 = 2.0 * $82;
  $84 = $6;
  $85 = $9;
  $86 = (($84) + ($85<<2)|0);
  $87 = +HEAPF32[$86>>2];
  $88 = $83 - $87;
  $89 = $7;
  $90 = $9;
  $91 = (($89) + ($90<<2)|0);
  HEAPF32[$91>>2] = $88;
  $92 = $15;
  $93 = $6;
  $94 = $9;
  $95 = (($93) + ($94<<2)|0);
  HEAPF32[$95>>2] = $92;
  $96 = $15;
  $97 = $16;
  $98 = $96 - $97;
  $17 = $98;
  $99 = $14;
  $100 = $99;
  $101 = $13;
  $102 = $101;
  $103 = $17;
  $104 = $103;
  $105 = (+Math_cos((+$104)));
  $106 = $102 * $105;
  $107 = $100 - $106;
  $108 = $107;
  $18 = $108;
  $109 = $13;
  $110 = $109;
  $111 = $17;
  $112 = $111;
  $113 = (+Math_sin((+$112)));
  $114 = $110 * $113;
  $115 = $114;
  $19 = $115;
  $116 = $18;
  $117 = $18;
  $118 = $116 * $117;
  $119 = $19;
  $120 = $19;
  $121 = $119 * $120;
  $122 = $118 + $121;
  $123 = $122;
  $124 = (+Math_sqrt((+$123)));
  $125 = $124;
  $20 = $125;
  $126 = $20;
  $127 = $8;
  $128 = $127 + $126;
  $8 = $128;
  $129 = $9;
  $130 = (($129) + 1)|0;
  $9 = $130;
 }
 $131 = $2;
 $132 = ((($131)) + 2832|0);
 $133 = HEAP32[$132>>2]|0;
 $134 = (($133) + 1)|0;
 $135 = (($134|0) % 15)&-1;
 $136 = $2;
 $137 = ((($136)) + 2832|0);
 HEAP32[$137>>2] = $135;
 $138 = $8;
 $139 = $2;
 $140 = ((($139)) + 2836|0);
 $141 = $2;
 $142 = ((($141)) + 2832|0);
 $143 = HEAP32[$142>>2]|0;
 $144 = (($140) + ($143<<2)|0);
 HEAPF32[$144>>2] = $138;
 $21 = 0.0;
 $145 = $2;
 $146 = ((($145)) + 2836|0);
 $22 = $146;
 $147 = $2;
 $148 = ((($147)) + 2832|0);
 $149 = HEAP32[$148>>2]|0;
 $150 = (($149) + 15)|0;
 $23 = $150;
 $151 = $23;
 $152 = (($151) - 7)|0;
 $153 = (($152|0) % 15)&-1;
 $24 = $153;
 $154 = $22;
 $155 = $24;
 $156 = (($154) + ($155<<2)|0);
 $157 = +HEAPF32[$156>>2];
 $25 = $157;
 $26 = 0;
 while(1) {
  $158 = $26;
  $159 = ($158|0)<(15);
  if (!($159)) {
   break;
  }
  $160 = $23;
  $161 = $26;
  $162 = (($160) - ($161))|0;
  $163 = (($162|0) % 15)&-1;
  $27 = $163;
  $164 = $25;
  $165 = $22;
  $166 = $27;
  $167 = (($165) + ($166<<2)|0);
  $168 = +HEAPF32[$167>>2];
  $169 = $164 - $168;
  $28 = $169;
  $170 = $28;
  $171 = $170;
  $172 = $171 < 0.0;
  if ($172) {
   $173 = $28;
   $174 = $173 * 10.0;
   $28 = $174;
  }
  $175 = $28;
  $176 = $21;
  $177 = $176 + $175;
  $21 = $177;
  $178 = $26;
  $179 = (($178) + 1)|0;
  $26 = $179;
 }
 $180 = $21;
 $181 = $180;
 $182 = $181 < 0.0;
 if (!($182)) {
  $183 = $2;
  $184 = ((($183)) + 2828|0);
  $185 = HEAP32[$184>>2]|0;
  $186 = (($185) + 1)|0;
  $187 = (($186|0) % 700)&-1;
  $188 = $2;
  $189 = ((($188)) + 2828|0);
  HEAP32[$189>>2] = $187;
  $190 = $21;
  $191 = $190 * 0.10000000149011612;
  $192 = $2;
  $193 = ((($192)) + 28|0);
  $194 = $2;
  $195 = ((($194)) + 2828|0);
  $196 = HEAP32[$195>>2]|0;
  $197 = (($193) + ($196<<2)|0);
  HEAPF32[$197>>2] = $191;
  STACKTOP = sp;return;
 }
 $21 = 0.0;
 $183 = $2;
 $184 = ((($183)) + 2828|0);
 $185 = HEAP32[$184>>2]|0;
 $186 = (($185) + 1)|0;
 $187 = (($186|0) % 700)&-1;
 $188 = $2;
 $189 = ((($188)) + 2828|0);
 HEAP32[$189>>2] = $187;
 $190 = $21;
 $191 = $190 * 0.10000000149011612;
 $192 = $2;
 $193 = ((($192)) + 28|0);
 $194 = $2;
 $195 = ((($194)) + 2828|0);
 $196 = HEAP32[$195>>2]|0;
 $197 = (($193) + ($196<<2)|0);
 HEAPF32[$197>>2] = $191;
 STACKTOP = sp;return;
}
function _malloc($0) {
 $0 = $0|0;
 var $$$0172$i = 0, $$$0173$i = 0, $$$4236$i = 0, $$$4329$i = 0, $$$i = 0, $$0 = 0, $$0$i = 0, $$0$i$i = 0, $$0$i$i$i = 0, $$0$i20$i = 0, $$01$i$i = 0, $$0172$lcssa$i = 0, $$01726$i = 0, $$0173$lcssa$i = 0, $$01735$i = 0, $$0192 = 0, $$0194 = 0, $$0201$i$i = 0, $$0202$i$i = 0, $$0206$i$i = 0;
 var $$0207$i$i = 0, $$024370$i = 0, $$0260$i$i = 0, $$0261$i$i = 0, $$0262$i$i = 0, $$0268$i$i = 0, $$0269$i$i = 0, $$0320$i = 0, $$0322$i = 0, $$0323$i = 0, $$0325$i = 0, $$0331$i = 0, $$0336$i = 0, $$0337$$i = 0, $$0337$i = 0, $$0339$i = 0, $$0340$i = 0, $$0345$i = 0, $$1176$i = 0, $$1178$i = 0;
 var $$124469$i = 0, $$1264$i$i = 0, $$1266$i$i = 0, $$1321$i = 0, $$1326$i = 0, $$1341$i = 0, $$1347$i = 0, $$1351$i = 0, $$2234243136$i = 0, $$2247$ph$i = 0, $$2253$ph$i = 0, $$2333$i = 0, $$3$i = 0, $$3$i$i = 0, $$3$i200 = 0, $$3328$i = 0, $$3349$i = 0, $$4$lcssa$i = 0, $$4$ph$i = 0, $$411$i = 0;
 var $$4236$i = 0, $$4329$lcssa$i = 0, $$432910$i = 0, $$4335$$4$i = 0, $$4335$ph$i = 0, $$43359$i = 0, $$723947$i = 0, $$748$i = 0, $$pre = 0, $$pre$i = 0, $$pre$i$i = 0, $$pre$i17$i = 0, $$pre$i195 = 0, $$pre$i210 = 0, $$pre$phi$i$iZ2D = 0, $$pre$phi$i18$iZ2D = 0, $$pre$phi$i211Z2D = 0, $$pre$phi$iZ2D = 0, $$pre$phiZ2D = 0, $$sink1$i = 0;
 var $$sink1$i$i = 0, $$sink14$i = 0, $$sink2$i = 0, $$sink2$i204 = 0, $$sink3$i = 0, $1 = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0;
 var $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0;
 var $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0;
 var $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0;
 var $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0, $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0;
 var $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0, $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0;
 var $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0, $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0;
 var $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0, $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0;
 var $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0, $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0;
 var $257 = 0, $258 = 0, $259 = 0, $26 = 0, $260 = 0, $261 = 0, $262 = 0, $263 = 0, $264 = 0, $265 = 0, $266 = 0, $267 = 0, $268 = 0, $269 = 0, $27 = 0, $270 = 0, $271 = 0, $272 = 0, $273 = 0, $274 = 0;
 var $275 = 0, $276 = 0, $277 = 0, $278 = 0, $279 = 0, $28 = 0, $280 = 0, $281 = 0, $282 = 0, $283 = 0, $284 = 0, $285 = 0, $286 = 0, $287 = 0, $288 = 0, $289 = 0, $29 = 0, $290 = 0, $291 = 0, $292 = 0;
 var $293 = 0, $294 = 0, $295 = 0, $296 = 0, $297 = 0, $298 = 0, $299 = 0, $3 = 0, $30 = 0, $300 = 0, $301 = 0, $302 = 0, $303 = 0, $304 = 0, $305 = 0, $306 = 0, $307 = 0, $308 = 0, $309 = 0, $31 = 0;
 var $310 = 0, $311 = 0, $312 = 0, $313 = 0, $314 = 0, $315 = 0, $316 = 0, $317 = 0, $318 = 0, $319 = 0, $32 = 0, $320 = 0, $321 = 0, $322 = 0, $323 = 0, $324 = 0, $325 = 0, $326 = 0, $327 = 0, $328 = 0;
 var $329 = 0, $33 = 0, $330 = 0, $331 = 0, $332 = 0, $333 = 0, $334 = 0, $335 = 0, $336 = 0, $337 = 0, $338 = 0, $339 = 0, $34 = 0, $340 = 0, $341 = 0, $342 = 0, $343 = 0, $344 = 0, $345 = 0, $346 = 0;
 var $347 = 0, $348 = 0, $349 = 0, $35 = 0, $350 = 0, $351 = 0, $352 = 0, $353 = 0, $354 = 0, $355 = 0, $356 = 0, $357 = 0, $358 = 0, $359 = 0, $36 = 0, $360 = 0, $361 = 0, $362 = 0, $363 = 0, $364 = 0;
 var $365 = 0, $366 = 0, $367 = 0, $368 = 0, $369 = 0, $37 = 0, $370 = 0, $371 = 0, $372 = 0, $373 = 0, $374 = 0, $375 = 0, $376 = 0, $377 = 0, $378 = 0, $379 = 0, $38 = 0, $380 = 0, $381 = 0, $382 = 0;
 var $383 = 0, $384 = 0, $385 = 0, $386 = 0, $387 = 0, $388 = 0, $389 = 0, $39 = 0, $390 = 0, $391 = 0, $392 = 0, $393 = 0, $394 = 0, $395 = 0, $396 = 0, $397 = 0, $398 = 0, $399 = 0, $4 = 0, $40 = 0;
 var $400 = 0, $401 = 0, $402 = 0, $403 = 0, $404 = 0, $405 = 0, $406 = 0, $407 = 0, $408 = 0, $409 = 0, $41 = 0, $410 = 0, $411 = 0, $412 = 0, $413 = 0, $414 = 0, $415 = 0, $416 = 0, $417 = 0, $418 = 0;
 var $419 = 0, $42 = 0, $420 = 0, $421 = 0, $422 = 0, $423 = 0, $424 = 0, $425 = 0, $426 = 0, $427 = 0, $428 = 0, $429 = 0, $43 = 0, $430 = 0, $431 = 0, $432 = 0, $433 = 0, $434 = 0, $435 = 0, $436 = 0;
 var $437 = 0, $438 = 0, $439 = 0, $44 = 0, $440 = 0, $441 = 0, $442 = 0, $443 = 0, $444 = 0, $445 = 0, $446 = 0, $447 = 0, $448 = 0, $449 = 0, $45 = 0, $450 = 0, $451 = 0, $452 = 0, $453 = 0, $454 = 0;
 var $455 = 0, $456 = 0, $457 = 0, $458 = 0, $459 = 0, $46 = 0, $460 = 0, $461 = 0, $462 = 0, $463 = 0, $464 = 0, $465 = 0, $466 = 0, $467 = 0, $468 = 0, $469 = 0, $47 = 0, $470 = 0, $471 = 0, $472 = 0;
 var $473 = 0, $474 = 0, $475 = 0, $476 = 0, $477 = 0, $478 = 0, $479 = 0, $48 = 0, $480 = 0, $481 = 0, $482 = 0, $483 = 0, $484 = 0, $485 = 0, $486 = 0, $487 = 0, $488 = 0, $489 = 0, $49 = 0, $490 = 0;
 var $491 = 0, $492 = 0, $493 = 0, $494 = 0, $495 = 0, $496 = 0, $497 = 0, $498 = 0, $499 = 0, $5 = 0, $50 = 0, $500 = 0, $501 = 0, $502 = 0, $503 = 0, $504 = 0, $505 = 0, $506 = 0, $507 = 0, $508 = 0;
 var $509 = 0, $51 = 0, $510 = 0, $511 = 0, $512 = 0, $513 = 0, $514 = 0, $515 = 0, $516 = 0, $517 = 0, $518 = 0, $519 = 0, $52 = 0, $520 = 0, $521 = 0, $522 = 0, $523 = 0, $524 = 0, $525 = 0, $526 = 0;
 var $527 = 0, $528 = 0, $529 = 0, $53 = 0, $530 = 0, $531 = 0, $532 = 0, $533 = 0, $534 = 0, $535 = 0, $536 = 0, $537 = 0, $538 = 0, $539 = 0, $54 = 0, $540 = 0, $541 = 0, $542 = 0, $543 = 0, $544 = 0;
 var $545 = 0, $546 = 0, $547 = 0, $548 = 0, $549 = 0, $55 = 0, $550 = 0, $551 = 0, $552 = 0, $553 = 0, $554 = 0, $555 = 0, $556 = 0, $557 = 0, $558 = 0, $559 = 0, $56 = 0, $560 = 0, $561 = 0, $562 = 0;
 var $563 = 0, $564 = 0, $565 = 0, $566 = 0, $567 = 0, $568 = 0, $569 = 0, $57 = 0, $570 = 0, $571 = 0, $572 = 0, $573 = 0, $574 = 0, $575 = 0, $576 = 0, $577 = 0, $578 = 0, $579 = 0, $58 = 0, $580 = 0;
 var $581 = 0, $582 = 0, $583 = 0, $584 = 0, $585 = 0, $586 = 0, $587 = 0, $588 = 0, $589 = 0, $59 = 0, $590 = 0, $591 = 0, $592 = 0, $593 = 0, $594 = 0, $595 = 0, $596 = 0, $597 = 0, $598 = 0, $599 = 0;
 var $6 = 0, $60 = 0, $600 = 0, $601 = 0, $602 = 0, $603 = 0, $604 = 0, $605 = 0, $606 = 0, $607 = 0, $608 = 0, $609 = 0, $61 = 0, $610 = 0, $611 = 0, $612 = 0, $613 = 0, $614 = 0, $615 = 0, $616 = 0;
 var $617 = 0, $618 = 0, $619 = 0, $62 = 0, $620 = 0, $621 = 0, $622 = 0, $623 = 0, $624 = 0, $625 = 0, $626 = 0, $627 = 0, $628 = 0, $629 = 0, $63 = 0, $630 = 0, $631 = 0, $632 = 0, $633 = 0, $634 = 0;
 var $635 = 0, $636 = 0, $637 = 0, $638 = 0, $639 = 0, $64 = 0, $640 = 0, $641 = 0, $642 = 0, $643 = 0, $644 = 0, $645 = 0, $646 = 0, $647 = 0, $648 = 0, $649 = 0, $65 = 0, $650 = 0, $651 = 0, $652 = 0;
 var $653 = 0, $654 = 0, $655 = 0, $656 = 0, $657 = 0, $658 = 0, $659 = 0, $66 = 0, $660 = 0, $661 = 0, $662 = 0, $663 = 0, $664 = 0, $665 = 0, $666 = 0, $667 = 0, $668 = 0, $669 = 0, $67 = 0, $670 = 0;
 var $671 = 0, $672 = 0, $673 = 0, $674 = 0, $675 = 0, $676 = 0, $677 = 0, $678 = 0, $679 = 0, $68 = 0, $680 = 0, $681 = 0, $682 = 0, $683 = 0, $684 = 0, $685 = 0, $686 = 0, $687 = 0, $688 = 0, $689 = 0;
 var $69 = 0, $690 = 0, $691 = 0, $692 = 0, $693 = 0, $694 = 0, $695 = 0, $696 = 0, $697 = 0, $698 = 0, $699 = 0, $7 = 0, $70 = 0, $700 = 0, $701 = 0, $702 = 0, $703 = 0, $704 = 0, $705 = 0, $706 = 0;
 var $707 = 0, $708 = 0, $709 = 0, $71 = 0, $710 = 0, $711 = 0, $712 = 0, $713 = 0, $714 = 0, $715 = 0, $716 = 0, $717 = 0, $718 = 0, $719 = 0, $72 = 0, $720 = 0, $721 = 0, $722 = 0, $723 = 0, $724 = 0;
 var $725 = 0, $726 = 0, $727 = 0, $728 = 0, $729 = 0, $73 = 0, $730 = 0, $731 = 0, $732 = 0, $733 = 0, $734 = 0, $735 = 0, $736 = 0, $737 = 0, $738 = 0, $739 = 0, $74 = 0, $740 = 0, $741 = 0, $742 = 0;
 var $743 = 0, $744 = 0, $745 = 0, $746 = 0, $747 = 0, $748 = 0, $749 = 0, $75 = 0, $750 = 0, $751 = 0, $752 = 0, $753 = 0, $754 = 0, $755 = 0, $756 = 0, $757 = 0, $758 = 0, $759 = 0, $76 = 0, $760 = 0;
 var $761 = 0, $762 = 0, $763 = 0, $764 = 0, $765 = 0, $766 = 0, $767 = 0, $768 = 0, $769 = 0, $77 = 0, $770 = 0, $771 = 0, $772 = 0, $773 = 0, $774 = 0, $775 = 0, $776 = 0, $777 = 0, $778 = 0, $779 = 0;
 var $78 = 0, $780 = 0, $781 = 0, $782 = 0, $783 = 0, $784 = 0, $785 = 0, $786 = 0, $787 = 0, $788 = 0, $789 = 0, $79 = 0, $790 = 0, $791 = 0, $792 = 0, $793 = 0, $794 = 0, $795 = 0, $796 = 0, $797 = 0;
 var $798 = 0, $799 = 0, $8 = 0, $80 = 0, $800 = 0, $801 = 0, $802 = 0, $803 = 0, $804 = 0, $805 = 0, $806 = 0, $807 = 0, $808 = 0, $809 = 0, $81 = 0, $810 = 0, $811 = 0, $812 = 0, $813 = 0, $814 = 0;
 var $815 = 0, $816 = 0, $817 = 0, $818 = 0, $819 = 0, $82 = 0, $820 = 0, $821 = 0, $822 = 0, $823 = 0, $824 = 0, $825 = 0, $826 = 0, $827 = 0, $828 = 0, $829 = 0, $83 = 0, $830 = 0, $831 = 0, $832 = 0;
 var $833 = 0, $834 = 0, $835 = 0, $836 = 0, $837 = 0, $838 = 0, $839 = 0, $84 = 0, $840 = 0, $841 = 0, $842 = 0, $843 = 0, $844 = 0, $845 = 0, $846 = 0, $847 = 0, $848 = 0, $849 = 0, $85 = 0, $850 = 0;
 var $851 = 0, $852 = 0, $853 = 0, $854 = 0, $855 = 0, $856 = 0, $857 = 0, $858 = 0, $859 = 0, $86 = 0, $860 = 0, $861 = 0, $862 = 0, $863 = 0, $864 = 0, $865 = 0, $866 = 0, $867 = 0, $868 = 0, $869 = 0;
 var $87 = 0, $870 = 0, $871 = 0, $872 = 0, $873 = 0, $874 = 0, $875 = 0, $876 = 0, $877 = 0, $878 = 0, $879 = 0, $88 = 0, $880 = 0, $881 = 0, $882 = 0, $883 = 0, $884 = 0, $885 = 0, $886 = 0, $887 = 0;
 var $888 = 0, $889 = 0, $89 = 0, $890 = 0, $891 = 0, $892 = 0, $893 = 0, $894 = 0, $895 = 0, $896 = 0, $897 = 0, $898 = 0, $899 = 0, $9 = 0, $90 = 0, $900 = 0, $901 = 0, $902 = 0, $903 = 0, $904 = 0;
 var $905 = 0, $906 = 0, $907 = 0, $908 = 0, $909 = 0, $91 = 0, $910 = 0, $911 = 0, $912 = 0, $913 = 0, $914 = 0, $915 = 0, $916 = 0, $917 = 0, $918 = 0, $919 = 0, $92 = 0, $920 = 0, $921 = 0, $922 = 0;
 var $923 = 0, $924 = 0, $925 = 0, $926 = 0, $927 = 0, $928 = 0, $929 = 0, $93 = 0, $930 = 0, $931 = 0, $932 = 0, $933 = 0, $934 = 0, $935 = 0, $936 = 0, $937 = 0, $938 = 0, $939 = 0, $94 = 0, $940 = 0;
 var $941 = 0, $942 = 0, $943 = 0, $944 = 0, $945 = 0, $946 = 0, $947 = 0, $948 = 0, $949 = 0, $95 = 0, $950 = 0, $951 = 0, $952 = 0, $953 = 0, $954 = 0, $955 = 0, $956 = 0, $957 = 0, $958 = 0, $959 = 0;
 var $96 = 0, $960 = 0, $961 = 0, $962 = 0, $963 = 0, $964 = 0, $965 = 0, $966 = 0, $967 = 0, $968 = 0, $969 = 0, $97 = 0, $970 = 0, $98 = 0, $99 = 0, $cond$i = 0, $cond$i$i = 0, $cond$i208 = 0, $exitcond$i$i = 0, $not$$i = 0;
 var $not$$i$i = 0, $not$$i197 = 0, $not$$i209 = 0, $not$1$i = 0, $not$1$i203 = 0, $not$3$i = 0, $not$5$i = 0, $or$cond$i = 0, $or$cond$i201 = 0, $or$cond1$i = 0, $or$cond10$i = 0, $or$cond11$i = 0, $or$cond11$not$i = 0, $or$cond12$i = 0, $or$cond2$i = 0, $or$cond2$i199 = 0, $or$cond49$i = 0, $or$cond5$i = 0, $or$cond50$i = 0, $or$cond7$i = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $1 = sp;
 $2 = ($0>>>0)<(245);
 do {
  if ($2) {
   $3 = ($0>>>0)<(11);
   $4 = (($0) + 11)|0;
   $5 = $4 & -8;
   $6 = $3 ? 16 : $5;
   $7 = $6 >>> 3;
   $8 = HEAP32[2003]|0;
   $9 = $8 >>> $7;
   $10 = $9 & 3;
   $11 = ($10|0)==(0);
   if (!($11)) {
    $12 = $9 & 1;
    $13 = $12 ^ 1;
    $14 = (($13) + ($7))|0;
    $15 = $14 << 1;
    $16 = (8052 + ($15<<2)|0);
    $17 = ((($16)) + 8|0);
    $18 = HEAP32[$17>>2]|0;
    $19 = ((($18)) + 8|0);
    $20 = HEAP32[$19>>2]|0;
    $21 = ($16|0)==($20|0);
    if ($21) {
     $22 = 1 << $14;
     $23 = $22 ^ -1;
     $24 = $8 & $23;
     HEAP32[2003] = $24;
    } else {
     $25 = ((($20)) + 12|0);
     HEAP32[$25>>2] = $16;
     HEAP32[$17>>2] = $20;
    }
    $26 = $14 << 3;
    $27 = $26 | 3;
    $28 = ((($18)) + 4|0);
    HEAP32[$28>>2] = $27;
    $29 = (($18) + ($26)|0);
    $30 = ((($29)) + 4|0);
    $31 = HEAP32[$30>>2]|0;
    $32 = $31 | 1;
    HEAP32[$30>>2] = $32;
    $$0 = $19;
    STACKTOP = sp;return ($$0|0);
   }
   $33 = HEAP32[(8020)>>2]|0;
   $34 = ($6>>>0)>($33>>>0);
   if ($34) {
    $35 = ($9|0)==(0);
    if (!($35)) {
     $36 = $9 << $7;
     $37 = 2 << $7;
     $38 = (0 - ($37))|0;
     $39 = $37 | $38;
     $40 = $36 & $39;
     $41 = (0 - ($40))|0;
     $42 = $40 & $41;
     $43 = (($42) + -1)|0;
     $44 = $43 >>> 12;
     $45 = $44 & 16;
     $46 = $43 >>> $45;
     $47 = $46 >>> 5;
     $48 = $47 & 8;
     $49 = $48 | $45;
     $50 = $46 >>> $48;
     $51 = $50 >>> 2;
     $52 = $51 & 4;
     $53 = $49 | $52;
     $54 = $50 >>> $52;
     $55 = $54 >>> 1;
     $56 = $55 & 2;
     $57 = $53 | $56;
     $58 = $54 >>> $56;
     $59 = $58 >>> 1;
     $60 = $59 & 1;
     $61 = $57 | $60;
     $62 = $58 >>> $60;
     $63 = (($61) + ($62))|0;
     $64 = $63 << 1;
     $65 = (8052 + ($64<<2)|0);
     $66 = ((($65)) + 8|0);
     $67 = HEAP32[$66>>2]|0;
     $68 = ((($67)) + 8|0);
     $69 = HEAP32[$68>>2]|0;
     $70 = ($65|0)==($69|0);
     if ($70) {
      $71 = 1 << $63;
      $72 = $71 ^ -1;
      $73 = $8 & $72;
      HEAP32[2003] = $73;
      $90 = $73;
     } else {
      $74 = ((($69)) + 12|0);
      HEAP32[$74>>2] = $65;
      HEAP32[$66>>2] = $69;
      $90 = $8;
     }
     $75 = $63 << 3;
     $76 = (($75) - ($6))|0;
     $77 = $6 | 3;
     $78 = ((($67)) + 4|0);
     HEAP32[$78>>2] = $77;
     $79 = (($67) + ($6)|0);
     $80 = $76 | 1;
     $81 = ((($79)) + 4|0);
     HEAP32[$81>>2] = $80;
     $82 = (($79) + ($76)|0);
     HEAP32[$82>>2] = $76;
     $83 = ($33|0)==(0);
     if (!($83)) {
      $84 = HEAP32[(8032)>>2]|0;
      $85 = $33 >>> 3;
      $86 = $85 << 1;
      $87 = (8052 + ($86<<2)|0);
      $88 = 1 << $85;
      $89 = $90 & $88;
      $91 = ($89|0)==(0);
      if ($91) {
       $92 = $90 | $88;
       HEAP32[2003] = $92;
       $$pre = ((($87)) + 8|0);
       $$0194 = $87;$$pre$phiZ2D = $$pre;
      } else {
       $93 = ((($87)) + 8|0);
       $94 = HEAP32[$93>>2]|0;
       $$0194 = $94;$$pre$phiZ2D = $93;
      }
      HEAP32[$$pre$phiZ2D>>2] = $84;
      $95 = ((($$0194)) + 12|0);
      HEAP32[$95>>2] = $84;
      $96 = ((($84)) + 8|0);
      HEAP32[$96>>2] = $$0194;
      $97 = ((($84)) + 12|0);
      HEAP32[$97>>2] = $87;
     }
     HEAP32[(8020)>>2] = $76;
     HEAP32[(8032)>>2] = $79;
     $$0 = $68;
     STACKTOP = sp;return ($$0|0);
    }
    $98 = HEAP32[(8016)>>2]|0;
    $99 = ($98|0)==(0);
    if ($99) {
     $$0192 = $6;
    } else {
     $100 = (0 - ($98))|0;
     $101 = $98 & $100;
     $102 = (($101) + -1)|0;
     $103 = $102 >>> 12;
     $104 = $103 & 16;
     $105 = $102 >>> $104;
     $106 = $105 >>> 5;
     $107 = $106 & 8;
     $108 = $107 | $104;
     $109 = $105 >>> $107;
     $110 = $109 >>> 2;
     $111 = $110 & 4;
     $112 = $108 | $111;
     $113 = $109 >>> $111;
     $114 = $113 >>> 1;
     $115 = $114 & 2;
     $116 = $112 | $115;
     $117 = $113 >>> $115;
     $118 = $117 >>> 1;
     $119 = $118 & 1;
     $120 = $116 | $119;
     $121 = $117 >>> $119;
     $122 = (($120) + ($121))|0;
     $123 = (8316 + ($122<<2)|0);
     $124 = HEAP32[$123>>2]|0;
     $125 = ((($124)) + 4|0);
     $126 = HEAP32[$125>>2]|0;
     $127 = $126 & -8;
     $128 = (($127) - ($6))|0;
     $129 = ((($124)) + 16|0);
     $130 = HEAP32[$129>>2]|0;
     $not$3$i = ($130|0)==(0|0);
     $$sink14$i = $not$3$i&1;
     $131 = (((($124)) + 16|0) + ($$sink14$i<<2)|0);
     $132 = HEAP32[$131>>2]|0;
     $133 = ($132|0)==(0|0);
     if ($133) {
      $$0172$lcssa$i = $124;$$0173$lcssa$i = $128;
     } else {
      $$01726$i = $124;$$01735$i = $128;$135 = $132;
      while(1) {
       $134 = ((($135)) + 4|0);
       $136 = HEAP32[$134>>2]|0;
       $137 = $136 & -8;
       $138 = (($137) - ($6))|0;
       $139 = ($138>>>0)<($$01735$i>>>0);
       $$$0173$i = $139 ? $138 : $$01735$i;
       $$$0172$i = $139 ? $135 : $$01726$i;
       $140 = ((($135)) + 16|0);
       $141 = HEAP32[$140>>2]|0;
       $not$$i = ($141|0)==(0|0);
       $$sink1$i = $not$$i&1;
       $142 = (((($135)) + 16|0) + ($$sink1$i<<2)|0);
       $143 = HEAP32[$142>>2]|0;
       $144 = ($143|0)==(0|0);
       if ($144) {
        $$0172$lcssa$i = $$$0172$i;$$0173$lcssa$i = $$$0173$i;
        break;
       } else {
        $$01726$i = $$$0172$i;$$01735$i = $$$0173$i;$135 = $143;
       }
      }
     }
     $145 = (($$0172$lcssa$i) + ($6)|0);
     $146 = ($$0172$lcssa$i>>>0)<($145>>>0);
     if ($146) {
      $147 = ((($$0172$lcssa$i)) + 24|0);
      $148 = HEAP32[$147>>2]|0;
      $149 = ((($$0172$lcssa$i)) + 12|0);
      $150 = HEAP32[$149>>2]|0;
      $151 = ($150|0)==($$0172$lcssa$i|0);
      do {
       if ($151) {
        $156 = ((($$0172$lcssa$i)) + 20|0);
        $157 = HEAP32[$156>>2]|0;
        $158 = ($157|0)==(0|0);
        if ($158) {
         $159 = ((($$0172$lcssa$i)) + 16|0);
         $160 = HEAP32[$159>>2]|0;
         $161 = ($160|0)==(0|0);
         if ($161) {
          $$3$i = 0;
          break;
         } else {
          $$1176$i = $160;$$1178$i = $159;
         }
        } else {
         $$1176$i = $157;$$1178$i = $156;
        }
        while(1) {
         $162 = ((($$1176$i)) + 20|0);
         $163 = HEAP32[$162>>2]|0;
         $164 = ($163|0)==(0|0);
         if (!($164)) {
          $$1176$i = $163;$$1178$i = $162;
          continue;
         }
         $165 = ((($$1176$i)) + 16|0);
         $166 = HEAP32[$165>>2]|0;
         $167 = ($166|0)==(0|0);
         if ($167) {
          break;
         } else {
          $$1176$i = $166;$$1178$i = $165;
         }
        }
        HEAP32[$$1178$i>>2] = 0;
        $$3$i = $$1176$i;
       } else {
        $152 = ((($$0172$lcssa$i)) + 8|0);
        $153 = HEAP32[$152>>2]|0;
        $154 = ((($153)) + 12|0);
        HEAP32[$154>>2] = $150;
        $155 = ((($150)) + 8|0);
        HEAP32[$155>>2] = $153;
        $$3$i = $150;
       }
      } while(0);
      $168 = ($148|0)==(0|0);
      do {
       if (!($168)) {
        $169 = ((($$0172$lcssa$i)) + 28|0);
        $170 = HEAP32[$169>>2]|0;
        $171 = (8316 + ($170<<2)|0);
        $172 = HEAP32[$171>>2]|0;
        $173 = ($$0172$lcssa$i|0)==($172|0);
        if ($173) {
         HEAP32[$171>>2] = $$3$i;
         $cond$i = ($$3$i|0)==(0|0);
         if ($cond$i) {
          $174 = 1 << $170;
          $175 = $174 ^ -1;
          $176 = $98 & $175;
          HEAP32[(8016)>>2] = $176;
          break;
         }
        } else {
         $177 = ((($148)) + 16|0);
         $178 = HEAP32[$177>>2]|0;
         $not$1$i = ($178|0)!=($$0172$lcssa$i|0);
         $$sink2$i = $not$1$i&1;
         $179 = (((($148)) + 16|0) + ($$sink2$i<<2)|0);
         HEAP32[$179>>2] = $$3$i;
         $180 = ($$3$i|0)==(0|0);
         if ($180) {
          break;
         }
        }
        $181 = ((($$3$i)) + 24|0);
        HEAP32[$181>>2] = $148;
        $182 = ((($$0172$lcssa$i)) + 16|0);
        $183 = HEAP32[$182>>2]|0;
        $184 = ($183|0)==(0|0);
        if (!($184)) {
         $185 = ((($$3$i)) + 16|0);
         HEAP32[$185>>2] = $183;
         $186 = ((($183)) + 24|0);
         HEAP32[$186>>2] = $$3$i;
        }
        $187 = ((($$0172$lcssa$i)) + 20|0);
        $188 = HEAP32[$187>>2]|0;
        $189 = ($188|0)==(0|0);
        if (!($189)) {
         $190 = ((($$3$i)) + 20|0);
         HEAP32[$190>>2] = $188;
         $191 = ((($188)) + 24|0);
         HEAP32[$191>>2] = $$3$i;
        }
       }
      } while(0);
      $192 = ($$0173$lcssa$i>>>0)<(16);
      if ($192) {
       $193 = (($$0173$lcssa$i) + ($6))|0;
       $194 = $193 | 3;
       $195 = ((($$0172$lcssa$i)) + 4|0);
       HEAP32[$195>>2] = $194;
       $196 = (($$0172$lcssa$i) + ($193)|0);
       $197 = ((($196)) + 4|0);
       $198 = HEAP32[$197>>2]|0;
       $199 = $198 | 1;
       HEAP32[$197>>2] = $199;
      } else {
       $200 = $6 | 3;
       $201 = ((($$0172$lcssa$i)) + 4|0);
       HEAP32[$201>>2] = $200;
       $202 = $$0173$lcssa$i | 1;
       $203 = ((($145)) + 4|0);
       HEAP32[$203>>2] = $202;
       $204 = (($145) + ($$0173$lcssa$i)|0);
       HEAP32[$204>>2] = $$0173$lcssa$i;
       $205 = ($33|0)==(0);
       if (!($205)) {
        $206 = HEAP32[(8032)>>2]|0;
        $207 = $33 >>> 3;
        $208 = $207 << 1;
        $209 = (8052 + ($208<<2)|0);
        $210 = 1 << $207;
        $211 = $8 & $210;
        $212 = ($211|0)==(0);
        if ($212) {
         $213 = $8 | $210;
         HEAP32[2003] = $213;
         $$pre$i = ((($209)) + 8|0);
         $$0$i = $209;$$pre$phi$iZ2D = $$pre$i;
        } else {
         $214 = ((($209)) + 8|0);
         $215 = HEAP32[$214>>2]|0;
         $$0$i = $215;$$pre$phi$iZ2D = $214;
        }
        HEAP32[$$pre$phi$iZ2D>>2] = $206;
        $216 = ((($$0$i)) + 12|0);
        HEAP32[$216>>2] = $206;
        $217 = ((($206)) + 8|0);
        HEAP32[$217>>2] = $$0$i;
        $218 = ((($206)) + 12|0);
        HEAP32[$218>>2] = $209;
       }
       HEAP32[(8020)>>2] = $$0173$lcssa$i;
       HEAP32[(8032)>>2] = $145;
      }
      $219 = ((($$0172$lcssa$i)) + 8|0);
      $$0 = $219;
      STACKTOP = sp;return ($$0|0);
     } else {
      $$0192 = $6;
     }
    }
   } else {
    $$0192 = $6;
   }
  } else {
   $220 = ($0>>>0)>(4294967231);
   if ($220) {
    $$0192 = -1;
   } else {
    $221 = (($0) + 11)|0;
    $222 = $221 & -8;
    $223 = HEAP32[(8016)>>2]|0;
    $224 = ($223|0)==(0);
    if ($224) {
     $$0192 = $222;
    } else {
     $225 = (0 - ($222))|0;
     $226 = $221 >>> 8;
     $227 = ($226|0)==(0);
     if ($227) {
      $$0336$i = 0;
     } else {
      $228 = ($222>>>0)>(16777215);
      if ($228) {
       $$0336$i = 31;
      } else {
       $229 = (($226) + 1048320)|0;
       $230 = $229 >>> 16;
       $231 = $230 & 8;
       $232 = $226 << $231;
       $233 = (($232) + 520192)|0;
       $234 = $233 >>> 16;
       $235 = $234 & 4;
       $236 = $235 | $231;
       $237 = $232 << $235;
       $238 = (($237) + 245760)|0;
       $239 = $238 >>> 16;
       $240 = $239 & 2;
       $241 = $236 | $240;
       $242 = (14 - ($241))|0;
       $243 = $237 << $240;
       $244 = $243 >>> 15;
       $245 = (($242) + ($244))|0;
       $246 = $245 << 1;
       $247 = (($245) + 7)|0;
       $248 = $222 >>> $247;
       $249 = $248 & 1;
       $250 = $249 | $246;
       $$0336$i = $250;
      }
     }
     $251 = (8316 + ($$0336$i<<2)|0);
     $252 = HEAP32[$251>>2]|0;
     $253 = ($252|0)==(0|0);
     L74: do {
      if ($253) {
       $$2333$i = 0;$$3$i200 = 0;$$3328$i = $225;
       label = 57;
      } else {
       $254 = ($$0336$i|0)==(31);
       $255 = $$0336$i >>> 1;
       $256 = (25 - ($255))|0;
       $257 = $254 ? 0 : $256;
       $258 = $222 << $257;
       $$0320$i = 0;$$0325$i = $225;$$0331$i = $252;$$0337$i = $258;$$0340$i = 0;
       while(1) {
        $259 = ((($$0331$i)) + 4|0);
        $260 = HEAP32[$259>>2]|0;
        $261 = $260 & -8;
        $262 = (($261) - ($222))|0;
        $263 = ($262>>>0)<($$0325$i>>>0);
        if ($263) {
         $264 = ($262|0)==(0);
         if ($264) {
          $$411$i = $$0331$i;$$432910$i = 0;$$43359$i = $$0331$i;
          label = 61;
          break L74;
         } else {
          $$1321$i = $$0331$i;$$1326$i = $262;
         }
        } else {
         $$1321$i = $$0320$i;$$1326$i = $$0325$i;
        }
        $265 = ((($$0331$i)) + 20|0);
        $266 = HEAP32[$265>>2]|0;
        $267 = $$0337$i >>> 31;
        $268 = (((($$0331$i)) + 16|0) + ($267<<2)|0);
        $269 = HEAP32[$268>>2]|0;
        $270 = ($266|0)==(0|0);
        $271 = ($266|0)==($269|0);
        $or$cond2$i199 = $270 | $271;
        $$1341$i = $or$cond2$i199 ? $$0340$i : $266;
        $272 = ($269|0)==(0|0);
        $not$5$i = $272 ^ 1;
        $273 = $not$5$i&1;
        $$0337$$i = $$0337$i << $273;
        if ($272) {
         $$2333$i = $$1341$i;$$3$i200 = $$1321$i;$$3328$i = $$1326$i;
         label = 57;
         break;
        } else {
         $$0320$i = $$1321$i;$$0325$i = $$1326$i;$$0331$i = $269;$$0337$i = $$0337$$i;$$0340$i = $$1341$i;
        }
       }
      }
     } while(0);
     if ((label|0) == 57) {
      $274 = ($$2333$i|0)==(0|0);
      $275 = ($$3$i200|0)==(0|0);
      $or$cond$i201 = $274 & $275;
      if ($or$cond$i201) {
       $276 = 2 << $$0336$i;
       $277 = (0 - ($276))|0;
       $278 = $276 | $277;
       $279 = $223 & $278;
       $280 = ($279|0)==(0);
       if ($280) {
        $$0192 = $222;
        break;
       }
       $281 = (0 - ($279))|0;
       $282 = $279 & $281;
       $283 = (($282) + -1)|0;
       $284 = $283 >>> 12;
       $285 = $284 & 16;
       $286 = $283 >>> $285;
       $287 = $286 >>> 5;
       $288 = $287 & 8;
       $289 = $288 | $285;
       $290 = $286 >>> $288;
       $291 = $290 >>> 2;
       $292 = $291 & 4;
       $293 = $289 | $292;
       $294 = $290 >>> $292;
       $295 = $294 >>> 1;
       $296 = $295 & 2;
       $297 = $293 | $296;
       $298 = $294 >>> $296;
       $299 = $298 >>> 1;
       $300 = $299 & 1;
       $301 = $297 | $300;
       $302 = $298 >>> $300;
       $303 = (($301) + ($302))|0;
       $304 = (8316 + ($303<<2)|0);
       $305 = HEAP32[$304>>2]|0;
       $$4$ph$i = 0;$$4335$ph$i = $305;
      } else {
       $$4$ph$i = $$3$i200;$$4335$ph$i = $$2333$i;
      }
      $306 = ($$4335$ph$i|0)==(0|0);
      if ($306) {
       $$4$lcssa$i = $$4$ph$i;$$4329$lcssa$i = $$3328$i;
      } else {
       $$411$i = $$4$ph$i;$$432910$i = $$3328$i;$$43359$i = $$4335$ph$i;
       label = 61;
      }
     }
     if ((label|0) == 61) {
      while(1) {
       label = 0;
       $307 = ((($$43359$i)) + 4|0);
       $308 = HEAP32[$307>>2]|0;
       $309 = $308 & -8;
       $310 = (($309) - ($222))|0;
       $311 = ($310>>>0)<($$432910$i>>>0);
       $$$4329$i = $311 ? $310 : $$432910$i;
       $$4335$$4$i = $311 ? $$43359$i : $$411$i;
       $312 = ((($$43359$i)) + 16|0);
       $313 = HEAP32[$312>>2]|0;
       $not$1$i203 = ($313|0)==(0|0);
       $$sink2$i204 = $not$1$i203&1;
       $314 = (((($$43359$i)) + 16|0) + ($$sink2$i204<<2)|0);
       $315 = HEAP32[$314>>2]|0;
       $316 = ($315|0)==(0|0);
       if ($316) {
        $$4$lcssa$i = $$4335$$4$i;$$4329$lcssa$i = $$$4329$i;
        break;
       } else {
        $$411$i = $$4335$$4$i;$$432910$i = $$$4329$i;$$43359$i = $315;
        label = 61;
       }
      }
     }
     $317 = ($$4$lcssa$i|0)==(0|0);
     if ($317) {
      $$0192 = $222;
     } else {
      $318 = HEAP32[(8020)>>2]|0;
      $319 = (($318) - ($222))|0;
      $320 = ($$4329$lcssa$i>>>0)<($319>>>0);
      if ($320) {
       $321 = (($$4$lcssa$i) + ($222)|0);
       $322 = ($$4$lcssa$i>>>0)<($321>>>0);
       if (!($322)) {
        $$0 = 0;
        STACKTOP = sp;return ($$0|0);
       }
       $323 = ((($$4$lcssa$i)) + 24|0);
       $324 = HEAP32[$323>>2]|0;
       $325 = ((($$4$lcssa$i)) + 12|0);
       $326 = HEAP32[$325>>2]|0;
       $327 = ($326|0)==($$4$lcssa$i|0);
       do {
        if ($327) {
         $332 = ((($$4$lcssa$i)) + 20|0);
         $333 = HEAP32[$332>>2]|0;
         $334 = ($333|0)==(0|0);
         if ($334) {
          $335 = ((($$4$lcssa$i)) + 16|0);
          $336 = HEAP32[$335>>2]|0;
          $337 = ($336|0)==(0|0);
          if ($337) {
           $$3349$i = 0;
           break;
          } else {
           $$1347$i = $336;$$1351$i = $335;
          }
         } else {
          $$1347$i = $333;$$1351$i = $332;
         }
         while(1) {
          $338 = ((($$1347$i)) + 20|0);
          $339 = HEAP32[$338>>2]|0;
          $340 = ($339|0)==(0|0);
          if (!($340)) {
           $$1347$i = $339;$$1351$i = $338;
           continue;
          }
          $341 = ((($$1347$i)) + 16|0);
          $342 = HEAP32[$341>>2]|0;
          $343 = ($342|0)==(0|0);
          if ($343) {
           break;
          } else {
           $$1347$i = $342;$$1351$i = $341;
          }
         }
         HEAP32[$$1351$i>>2] = 0;
         $$3349$i = $$1347$i;
        } else {
         $328 = ((($$4$lcssa$i)) + 8|0);
         $329 = HEAP32[$328>>2]|0;
         $330 = ((($329)) + 12|0);
         HEAP32[$330>>2] = $326;
         $331 = ((($326)) + 8|0);
         HEAP32[$331>>2] = $329;
         $$3349$i = $326;
        }
       } while(0);
       $344 = ($324|0)==(0|0);
       do {
        if ($344) {
         $426 = $223;
        } else {
         $345 = ((($$4$lcssa$i)) + 28|0);
         $346 = HEAP32[$345>>2]|0;
         $347 = (8316 + ($346<<2)|0);
         $348 = HEAP32[$347>>2]|0;
         $349 = ($$4$lcssa$i|0)==($348|0);
         if ($349) {
          HEAP32[$347>>2] = $$3349$i;
          $cond$i208 = ($$3349$i|0)==(0|0);
          if ($cond$i208) {
           $350 = 1 << $346;
           $351 = $350 ^ -1;
           $352 = $223 & $351;
           HEAP32[(8016)>>2] = $352;
           $426 = $352;
           break;
          }
         } else {
          $353 = ((($324)) + 16|0);
          $354 = HEAP32[$353>>2]|0;
          $not$$i209 = ($354|0)!=($$4$lcssa$i|0);
          $$sink3$i = $not$$i209&1;
          $355 = (((($324)) + 16|0) + ($$sink3$i<<2)|0);
          HEAP32[$355>>2] = $$3349$i;
          $356 = ($$3349$i|0)==(0|0);
          if ($356) {
           $426 = $223;
           break;
          }
         }
         $357 = ((($$3349$i)) + 24|0);
         HEAP32[$357>>2] = $324;
         $358 = ((($$4$lcssa$i)) + 16|0);
         $359 = HEAP32[$358>>2]|0;
         $360 = ($359|0)==(0|0);
         if (!($360)) {
          $361 = ((($$3349$i)) + 16|0);
          HEAP32[$361>>2] = $359;
          $362 = ((($359)) + 24|0);
          HEAP32[$362>>2] = $$3349$i;
         }
         $363 = ((($$4$lcssa$i)) + 20|0);
         $364 = HEAP32[$363>>2]|0;
         $365 = ($364|0)==(0|0);
         if ($365) {
          $426 = $223;
         } else {
          $366 = ((($$3349$i)) + 20|0);
          HEAP32[$366>>2] = $364;
          $367 = ((($364)) + 24|0);
          HEAP32[$367>>2] = $$3349$i;
          $426 = $223;
         }
        }
       } while(0);
       $368 = ($$4329$lcssa$i>>>0)<(16);
       do {
        if ($368) {
         $369 = (($$4329$lcssa$i) + ($222))|0;
         $370 = $369 | 3;
         $371 = ((($$4$lcssa$i)) + 4|0);
         HEAP32[$371>>2] = $370;
         $372 = (($$4$lcssa$i) + ($369)|0);
         $373 = ((($372)) + 4|0);
         $374 = HEAP32[$373>>2]|0;
         $375 = $374 | 1;
         HEAP32[$373>>2] = $375;
        } else {
         $376 = $222 | 3;
         $377 = ((($$4$lcssa$i)) + 4|0);
         HEAP32[$377>>2] = $376;
         $378 = $$4329$lcssa$i | 1;
         $379 = ((($321)) + 4|0);
         HEAP32[$379>>2] = $378;
         $380 = (($321) + ($$4329$lcssa$i)|0);
         HEAP32[$380>>2] = $$4329$lcssa$i;
         $381 = $$4329$lcssa$i >>> 3;
         $382 = ($$4329$lcssa$i>>>0)<(256);
         if ($382) {
          $383 = $381 << 1;
          $384 = (8052 + ($383<<2)|0);
          $385 = HEAP32[2003]|0;
          $386 = 1 << $381;
          $387 = $385 & $386;
          $388 = ($387|0)==(0);
          if ($388) {
           $389 = $385 | $386;
           HEAP32[2003] = $389;
           $$pre$i210 = ((($384)) + 8|0);
           $$0345$i = $384;$$pre$phi$i211Z2D = $$pre$i210;
          } else {
           $390 = ((($384)) + 8|0);
           $391 = HEAP32[$390>>2]|0;
           $$0345$i = $391;$$pre$phi$i211Z2D = $390;
          }
          HEAP32[$$pre$phi$i211Z2D>>2] = $321;
          $392 = ((($$0345$i)) + 12|0);
          HEAP32[$392>>2] = $321;
          $393 = ((($321)) + 8|0);
          HEAP32[$393>>2] = $$0345$i;
          $394 = ((($321)) + 12|0);
          HEAP32[$394>>2] = $384;
          break;
         }
         $395 = $$4329$lcssa$i >>> 8;
         $396 = ($395|0)==(0);
         if ($396) {
          $$0339$i = 0;
         } else {
          $397 = ($$4329$lcssa$i>>>0)>(16777215);
          if ($397) {
           $$0339$i = 31;
          } else {
           $398 = (($395) + 1048320)|0;
           $399 = $398 >>> 16;
           $400 = $399 & 8;
           $401 = $395 << $400;
           $402 = (($401) + 520192)|0;
           $403 = $402 >>> 16;
           $404 = $403 & 4;
           $405 = $404 | $400;
           $406 = $401 << $404;
           $407 = (($406) + 245760)|0;
           $408 = $407 >>> 16;
           $409 = $408 & 2;
           $410 = $405 | $409;
           $411 = (14 - ($410))|0;
           $412 = $406 << $409;
           $413 = $412 >>> 15;
           $414 = (($411) + ($413))|0;
           $415 = $414 << 1;
           $416 = (($414) + 7)|0;
           $417 = $$4329$lcssa$i >>> $416;
           $418 = $417 & 1;
           $419 = $418 | $415;
           $$0339$i = $419;
          }
         }
         $420 = (8316 + ($$0339$i<<2)|0);
         $421 = ((($321)) + 28|0);
         HEAP32[$421>>2] = $$0339$i;
         $422 = ((($321)) + 16|0);
         $423 = ((($422)) + 4|0);
         HEAP32[$423>>2] = 0;
         HEAP32[$422>>2] = 0;
         $424 = 1 << $$0339$i;
         $425 = $426 & $424;
         $427 = ($425|0)==(0);
         if ($427) {
          $428 = $426 | $424;
          HEAP32[(8016)>>2] = $428;
          HEAP32[$420>>2] = $321;
          $429 = ((($321)) + 24|0);
          HEAP32[$429>>2] = $420;
          $430 = ((($321)) + 12|0);
          HEAP32[$430>>2] = $321;
          $431 = ((($321)) + 8|0);
          HEAP32[$431>>2] = $321;
          break;
         }
         $432 = HEAP32[$420>>2]|0;
         $433 = ($$0339$i|0)==(31);
         $434 = $$0339$i >>> 1;
         $435 = (25 - ($434))|0;
         $436 = $433 ? 0 : $435;
         $437 = $$4329$lcssa$i << $436;
         $$0322$i = $437;$$0323$i = $432;
         while(1) {
          $438 = ((($$0323$i)) + 4|0);
          $439 = HEAP32[$438>>2]|0;
          $440 = $439 & -8;
          $441 = ($440|0)==($$4329$lcssa$i|0);
          if ($441) {
           label = 97;
           break;
          }
          $442 = $$0322$i >>> 31;
          $443 = (((($$0323$i)) + 16|0) + ($442<<2)|0);
          $444 = $$0322$i << 1;
          $445 = HEAP32[$443>>2]|0;
          $446 = ($445|0)==(0|0);
          if ($446) {
           label = 96;
           break;
          } else {
           $$0322$i = $444;$$0323$i = $445;
          }
         }
         if ((label|0) == 96) {
          HEAP32[$443>>2] = $321;
          $447 = ((($321)) + 24|0);
          HEAP32[$447>>2] = $$0323$i;
          $448 = ((($321)) + 12|0);
          HEAP32[$448>>2] = $321;
          $449 = ((($321)) + 8|0);
          HEAP32[$449>>2] = $321;
          break;
         }
         else if ((label|0) == 97) {
          $450 = ((($$0323$i)) + 8|0);
          $451 = HEAP32[$450>>2]|0;
          $452 = ((($451)) + 12|0);
          HEAP32[$452>>2] = $321;
          HEAP32[$450>>2] = $321;
          $453 = ((($321)) + 8|0);
          HEAP32[$453>>2] = $451;
          $454 = ((($321)) + 12|0);
          HEAP32[$454>>2] = $$0323$i;
          $455 = ((($321)) + 24|0);
          HEAP32[$455>>2] = 0;
          break;
         }
        }
       } while(0);
       $456 = ((($$4$lcssa$i)) + 8|0);
       $$0 = $456;
       STACKTOP = sp;return ($$0|0);
      } else {
       $$0192 = $222;
      }
     }
    }
   }
  }
 } while(0);
 $457 = HEAP32[(8020)>>2]|0;
 $458 = ($457>>>0)<($$0192>>>0);
 if (!($458)) {
  $459 = (($457) - ($$0192))|0;
  $460 = HEAP32[(8032)>>2]|0;
  $461 = ($459>>>0)>(15);
  if ($461) {
   $462 = (($460) + ($$0192)|0);
   HEAP32[(8032)>>2] = $462;
   HEAP32[(8020)>>2] = $459;
   $463 = $459 | 1;
   $464 = ((($462)) + 4|0);
   HEAP32[$464>>2] = $463;
   $465 = (($462) + ($459)|0);
   HEAP32[$465>>2] = $459;
   $466 = $$0192 | 3;
   $467 = ((($460)) + 4|0);
   HEAP32[$467>>2] = $466;
  } else {
   HEAP32[(8020)>>2] = 0;
   HEAP32[(8032)>>2] = 0;
   $468 = $457 | 3;
   $469 = ((($460)) + 4|0);
   HEAP32[$469>>2] = $468;
   $470 = (($460) + ($457)|0);
   $471 = ((($470)) + 4|0);
   $472 = HEAP32[$471>>2]|0;
   $473 = $472 | 1;
   HEAP32[$471>>2] = $473;
  }
  $474 = ((($460)) + 8|0);
  $$0 = $474;
  STACKTOP = sp;return ($$0|0);
 }
 $475 = HEAP32[(8024)>>2]|0;
 $476 = ($475>>>0)>($$0192>>>0);
 if ($476) {
  $477 = (($475) - ($$0192))|0;
  HEAP32[(8024)>>2] = $477;
  $478 = HEAP32[(8036)>>2]|0;
  $479 = (($478) + ($$0192)|0);
  HEAP32[(8036)>>2] = $479;
  $480 = $477 | 1;
  $481 = ((($479)) + 4|0);
  HEAP32[$481>>2] = $480;
  $482 = $$0192 | 3;
  $483 = ((($478)) + 4|0);
  HEAP32[$483>>2] = $482;
  $484 = ((($478)) + 8|0);
  $$0 = $484;
  STACKTOP = sp;return ($$0|0);
 }
 $485 = HEAP32[2121]|0;
 $486 = ($485|0)==(0);
 if ($486) {
  HEAP32[(8492)>>2] = 4096;
  HEAP32[(8488)>>2] = 4096;
  HEAP32[(8496)>>2] = -1;
  HEAP32[(8500)>>2] = -1;
  HEAP32[(8504)>>2] = 0;
  HEAP32[(8456)>>2] = 0;
  $487 = $1;
  $488 = $487 & -16;
  $489 = $488 ^ 1431655768;
  HEAP32[$1>>2] = $489;
  HEAP32[2121] = $489;
  $493 = 4096;
 } else {
  $$pre$i195 = HEAP32[(8492)>>2]|0;
  $493 = $$pre$i195;
 }
 $490 = (($$0192) + 48)|0;
 $491 = (($$0192) + 47)|0;
 $492 = (($493) + ($491))|0;
 $494 = (0 - ($493))|0;
 $495 = $492 & $494;
 $496 = ($495>>>0)>($$0192>>>0);
 if (!($496)) {
  $$0 = 0;
  STACKTOP = sp;return ($$0|0);
 }
 $497 = HEAP32[(8452)>>2]|0;
 $498 = ($497|0)==(0);
 if (!($498)) {
  $499 = HEAP32[(8444)>>2]|0;
  $500 = (($499) + ($495))|0;
  $501 = ($500>>>0)<=($499>>>0);
  $502 = ($500>>>0)>($497>>>0);
  $or$cond1$i = $501 | $502;
  if ($or$cond1$i) {
   $$0 = 0;
   STACKTOP = sp;return ($$0|0);
  }
 }
 $503 = HEAP32[(8456)>>2]|0;
 $504 = $503 & 4;
 $505 = ($504|0)==(0);
 L167: do {
  if ($505) {
   $506 = HEAP32[(8036)>>2]|0;
   $507 = ($506|0)==(0|0);
   L169: do {
    if ($507) {
     label = 118;
    } else {
     $$0$i20$i = (8460);
     while(1) {
      $508 = HEAP32[$$0$i20$i>>2]|0;
      $509 = ($508>>>0)>($506>>>0);
      if (!($509)) {
       $510 = ((($$0$i20$i)) + 4|0);
       $511 = HEAP32[$510>>2]|0;
       $512 = (($508) + ($511)|0);
       $513 = ($512>>>0)>($506>>>0);
       if ($513) {
        break;
       }
      }
      $514 = ((($$0$i20$i)) + 8|0);
      $515 = HEAP32[$514>>2]|0;
      $516 = ($515|0)==(0|0);
      if ($516) {
       label = 118;
       break L169;
      } else {
       $$0$i20$i = $515;
      }
     }
     $539 = (($492) - ($475))|0;
     $540 = $539 & $494;
     $541 = ($540>>>0)<(2147483647);
     if ($541) {
      $542 = (_sbrk(($540|0))|0);
      $543 = HEAP32[$$0$i20$i>>2]|0;
      $544 = HEAP32[$510>>2]|0;
      $545 = (($543) + ($544)|0);
      $546 = ($542|0)==($545|0);
      if ($546) {
       $547 = ($542|0)==((-1)|0);
       if ($547) {
        $$2234243136$i = $540;
       } else {
        $$723947$i = $540;$$748$i = $542;
        label = 135;
        break L167;
       }
      } else {
       $$2247$ph$i = $542;$$2253$ph$i = $540;
       label = 126;
      }
     } else {
      $$2234243136$i = 0;
     }
    }
   } while(0);
   do {
    if ((label|0) == 118) {
     $517 = (_sbrk(0)|0);
     $518 = ($517|0)==((-1)|0);
     if ($518) {
      $$2234243136$i = 0;
     } else {
      $519 = $517;
      $520 = HEAP32[(8488)>>2]|0;
      $521 = (($520) + -1)|0;
      $522 = $521 & $519;
      $523 = ($522|0)==(0);
      $524 = (($521) + ($519))|0;
      $525 = (0 - ($520))|0;
      $526 = $524 & $525;
      $527 = (($526) - ($519))|0;
      $528 = $523 ? 0 : $527;
      $$$i = (($528) + ($495))|0;
      $529 = HEAP32[(8444)>>2]|0;
      $530 = (($$$i) + ($529))|0;
      $531 = ($$$i>>>0)>($$0192>>>0);
      $532 = ($$$i>>>0)<(2147483647);
      $or$cond$i = $531 & $532;
      if ($or$cond$i) {
       $533 = HEAP32[(8452)>>2]|0;
       $534 = ($533|0)==(0);
       if (!($534)) {
        $535 = ($530>>>0)<=($529>>>0);
        $536 = ($530>>>0)>($533>>>0);
        $or$cond2$i = $535 | $536;
        if ($or$cond2$i) {
         $$2234243136$i = 0;
         break;
        }
       }
       $537 = (_sbrk(($$$i|0))|0);
       $538 = ($537|0)==($517|0);
       if ($538) {
        $$723947$i = $$$i;$$748$i = $517;
        label = 135;
        break L167;
       } else {
        $$2247$ph$i = $537;$$2253$ph$i = $$$i;
        label = 126;
       }
      } else {
       $$2234243136$i = 0;
      }
     }
    }
   } while(0);
   do {
    if ((label|0) == 126) {
     $548 = (0 - ($$2253$ph$i))|0;
     $549 = ($$2247$ph$i|0)!=((-1)|0);
     $550 = ($$2253$ph$i>>>0)<(2147483647);
     $or$cond7$i = $550 & $549;
     $551 = ($490>>>0)>($$2253$ph$i>>>0);
     $or$cond10$i = $551 & $or$cond7$i;
     if (!($or$cond10$i)) {
      $561 = ($$2247$ph$i|0)==((-1)|0);
      if ($561) {
       $$2234243136$i = 0;
       break;
      } else {
       $$723947$i = $$2253$ph$i;$$748$i = $$2247$ph$i;
       label = 135;
       break L167;
      }
     }
     $552 = HEAP32[(8492)>>2]|0;
     $553 = (($491) - ($$2253$ph$i))|0;
     $554 = (($553) + ($552))|0;
     $555 = (0 - ($552))|0;
     $556 = $554 & $555;
     $557 = ($556>>>0)<(2147483647);
     if (!($557)) {
      $$723947$i = $$2253$ph$i;$$748$i = $$2247$ph$i;
      label = 135;
      break L167;
     }
     $558 = (_sbrk(($556|0))|0);
     $559 = ($558|0)==((-1)|0);
     if ($559) {
      (_sbrk(($548|0))|0);
      $$2234243136$i = 0;
      break;
     } else {
      $560 = (($556) + ($$2253$ph$i))|0;
      $$723947$i = $560;$$748$i = $$2247$ph$i;
      label = 135;
      break L167;
     }
    }
   } while(0);
   $562 = HEAP32[(8456)>>2]|0;
   $563 = $562 | 4;
   HEAP32[(8456)>>2] = $563;
   $$4236$i = $$2234243136$i;
   label = 133;
  } else {
   $$4236$i = 0;
   label = 133;
  }
 } while(0);
 if ((label|0) == 133) {
  $564 = ($495>>>0)<(2147483647);
  if ($564) {
   $565 = (_sbrk(($495|0))|0);
   $566 = (_sbrk(0)|0);
   $567 = ($565|0)!=((-1)|0);
   $568 = ($566|0)!=((-1)|0);
   $or$cond5$i = $567 & $568;
   $569 = ($565>>>0)<($566>>>0);
   $or$cond11$i = $569 & $or$cond5$i;
   $570 = $566;
   $571 = $565;
   $572 = (($570) - ($571))|0;
   $573 = (($$0192) + 40)|0;
   $574 = ($572>>>0)>($573>>>0);
   $$$4236$i = $574 ? $572 : $$4236$i;
   $or$cond11$not$i = $or$cond11$i ^ 1;
   $575 = ($565|0)==((-1)|0);
   $not$$i197 = $574 ^ 1;
   $576 = $575 | $not$$i197;
   $or$cond49$i = $576 | $or$cond11$not$i;
   if (!($or$cond49$i)) {
    $$723947$i = $$$4236$i;$$748$i = $565;
    label = 135;
   }
  }
 }
 if ((label|0) == 135) {
  $577 = HEAP32[(8444)>>2]|0;
  $578 = (($577) + ($$723947$i))|0;
  HEAP32[(8444)>>2] = $578;
  $579 = HEAP32[(8448)>>2]|0;
  $580 = ($578>>>0)>($579>>>0);
  if ($580) {
   HEAP32[(8448)>>2] = $578;
  }
  $581 = HEAP32[(8036)>>2]|0;
  $582 = ($581|0)==(0|0);
  do {
   if ($582) {
    $583 = HEAP32[(8028)>>2]|0;
    $584 = ($583|0)==(0|0);
    $585 = ($$748$i>>>0)<($583>>>0);
    $or$cond12$i = $584 | $585;
    if ($or$cond12$i) {
     HEAP32[(8028)>>2] = $$748$i;
    }
    HEAP32[(8460)>>2] = $$748$i;
    HEAP32[(8464)>>2] = $$723947$i;
    HEAP32[(8472)>>2] = 0;
    $586 = HEAP32[2121]|0;
    HEAP32[(8048)>>2] = $586;
    HEAP32[(8044)>>2] = -1;
    $$01$i$i = 0;
    while(1) {
     $587 = $$01$i$i << 1;
     $588 = (8052 + ($587<<2)|0);
     $589 = ((($588)) + 12|0);
     HEAP32[$589>>2] = $588;
     $590 = ((($588)) + 8|0);
     HEAP32[$590>>2] = $588;
     $591 = (($$01$i$i) + 1)|0;
     $exitcond$i$i = ($591|0)==(32);
     if ($exitcond$i$i) {
      break;
     } else {
      $$01$i$i = $591;
     }
    }
    $592 = (($$723947$i) + -40)|0;
    $593 = ((($$748$i)) + 8|0);
    $594 = $593;
    $595 = $594 & 7;
    $596 = ($595|0)==(0);
    $597 = (0 - ($594))|0;
    $598 = $597 & 7;
    $599 = $596 ? 0 : $598;
    $600 = (($$748$i) + ($599)|0);
    $601 = (($592) - ($599))|0;
    HEAP32[(8036)>>2] = $600;
    HEAP32[(8024)>>2] = $601;
    $602 = $601 | 1;
    $603 = ((($600)) + 4|0);
    HEAP32[$603>>2] = $602;
    $604 = (($600) + ($601)|0);
    $605 = ((($604)) + 4|0);
    HEAP32[$605>>2] = 40;
    $606 = HEAP32[(8500)>>2]|0;
    HEAP32[(8040)>>2] = $606;
   } else {
    $$024370$i = (8460);
    while(1) {
     $607 = HEAP32[$$024370$i>>2]|0;
     $608 = ((($$024370$i)) + 4|0);
     $609 = HEAP32[$608>>2]|0;
     $610 = (($607) + ($609)|0);
     $611 = ($$748$i|0)==($610|0);
     if ($611) {
      label = 145;
      break;
     }
     $612 = ((($$024370$i)) + 8|0);
     $613 = HEAP32[$612>>2]|0;
     $614 = ($613|0)==(0|0);
     if ($614) {
      break;
     } else {
      $$024370$i = $613;
     }
    }
    if ((label|0) == 145) {
     $615 = ((($$024370$i)) + 12|0);
     $616 = HEAP32[$615>>2]|0;
     $617 = $616 & 8;
     $618 = ($617|0)==(0);
     if ($618) {
      $619 = ($581>>>0)>=($607>>>0);
      $620 = ($581>>>0)<($$748$i>>>0);
      $or$cond50$i = $620 & $619;
      if ($or$cond50$i) {
       $621 = (($609) + ($$723947$i))|0;
       HEAP32[$608>>2] = $621;
       $622 = HEAP32[(8024)>>2]|0;
       $623 = ((($581)) + 8|0);
       $624 = $623;
       $625 = $624 & 7;
       $626 = ($625|0)==(0);
       $627 = (0 - ($624))|0;
       $628 = $627 & 7;
       $629 = $626 ? 0 : $628;
       $630 = (($581) + ($629)|0);
       $631 = (($$723947$i) - ($629))|0;
       $632 = (($622) + ($631))|0;
       HEAP32[(8036)>>2] = $630;
       HEAP32[(8024)>>2] = $632;
       $633 = $632 | 1;
       $634 = ((($630)) + 4|0);
       HEAP32[$634>>2] = $633;
       $635 = (($630) + ($632)|0);
       $636 = ((($635)) + 4|0);
       HEAP32[$636>>2] = 40;
       $637 = HEAP32[(8500)>>2]|0;
       HEAP32[(8040)>>2] = $637;
       break;
      }
     }
    }
    $638 = HEAP32[(8028)>>2]|0;
    $639 = ($$748$i>>>0)<($638>>>0);
    if ($639) {
     HEAP32[(8028)>>2] = $$748$i;
    }
    $640 = (($$748$i) + ($$723947$i)|0);
    $$124469$i = (8460);
    while(1) {
     $641 = HEAP32[$$124469$i>>2]|0;
     $642 = ($641|0)==($640|0);
     if ($642) {
      label = 153;
      break;
     }
     $643 = ((($$124469$i)) + 8|0);
     $644 = HEAP32[$643>>2]|0;
     $645 = ($644|0)==(0|0);
     if ($645) {
      break;
     } else {
      $$124469$i = $644;
     }
    }
    if ((label|0) == 153) {
     $646 = ((($$124469$i)) + 12|0);
     $647 = HEAP32[$646>>2]|0;
     $648 = $647 & 8;
     $649 = ($648|0)==(0);
     if ($649) {
      HEAP32[$$124469$i>>2] = $$748$i;
      $650 = ((($$124469$i)) + 4|0);
      $651 = HEAP32[$650>>2]|0;
      $652 = (($651) + ($$723947$i))|0;
      HEAP32[$650>>2] = $652;
      $653 = ((($$748$i)) + 8|0);
      $654 = $653;
      $655 = $654 & 7;
      $656 = ($655|0)==(0);
      $657 = (0 - ($654))|0;
      $658 = $657 & 7;
      $659 = $656 ? 0 : $658;
      $660 = (($$748$i) + ($659)|0);
      $661 = ((($640)) + 8|0);
      $662 = $661;
      $663 = $662 & 7;
      $664 = ($663|0)==(0);
      $665 = (0 - ($662))|0;
      $666 = $665 & 7;
      $667 = $664 ? 0 : $666;
      $668 = (($640) + ($667)|0);
      $669 = $668;
      $670 = $660;
      $671 = (($669) - ($670))|0;
      $672 = (($660) + ($$0192)|0);
      $673 = (($671) - ($$0192))|0;
      $674 = $$0192 | 3;
      $675 = ((($660)) + 4|0);
      HEAP32[$675>>2] = $674;
      $676 = ($668|0)==($581|0);
      do {
       if ($676) {
        $677 = HEAP32[(8024)>>2]|0;
        $678 = (($677) + ($673))|0;
        HEAP32[(8024)>>2] = $678;
        HEAP32[(8036)>>2] = $672;
        $679 = $678 | 1;
        $680 = ((($672)) + 4|0);
        HEAP32[$680>>2] = $679;
       } else {
        $681 = HEAP32[(8032)>>2]|0;
        $682 = ($668|0)==($681|0);
        if ($682) {
         $683 = HEAP32[(8020)>>2]|0;
         $684 = (($683) + ($673))|0;
         HEAP32[(8020)>>2] = $684;
         HEAP32[(8032)>>2] = $672;
         $685 = $684 | 1;
         $686 = ((($672)) + 4|0);
         HEAP32[$686>>2] = $685;
         $687 = (($672) + ($684)|0);
         HEAP32[$687>>2] = $684;
         break;
        }
        $688 = ((($668)) + 4|0);
        $689 = HEAP32[$688>>2]|0;
        $690 = $689 & 3;
        $691 = ($690|0)==(1);
        if ($691) {
         $692 = $689 & -8;
         $693 = $689 >>> 3;
         $694 = ($689>>>0)<(256);
         L237: do {
          if ($694) {
           $695 = ((($668)) + 8|0);
           $696 = HEAP32[$695>>2]|0;
           $697 = ((($668)) + 12|0);
           $698 = HEAP32[$697>>2]|0;
           $699 = ($698|0)==($696|0);
           if ($699) {
            $700 = 1 << $693;
            $701 = $700 ^ -1;
            $702 = HEAP32[2003]|0;
            $703 = $702 & $701;
            HEAP32[2003] = $703;
            break;
           } else {
            $704 = ((($696)) + 12|0);
            HEAP32[$704>>2] = $698;
            $705 = ((($698)) + 8|0);
            HEAP32[$705>>2] = $696;
            break;
           }
          } else {
           $706 = ((($668)) + 24|0);
           $707 = HEAP32[$706>>2]|0;
           $708 = ((($668)) + 12|0);
           $709 = HEAP32[$708>>2]|0;
           $710 = ($709|0)==($668|0);
           do {
            if ($710) {
             $715 = ((($668)) + 16|0);
             $716 = ((($715)) + 4|0);
             $717 = HEAP32[$716>>2]|0;
             $718 = ($717|0)==(0|0);
             if ($718) {
              $719 = HEAP32[$715>>2]|0;
              $720 = ($719|0)==(0|0);
              if ($720) {
               $$3$i$i = 0;
               break;
              } else {
               $$1264$i$i = $719;$$1266$i$i = $715;
              }
             } else {
              $$1264$i$i = $717;$$1266$i$i = $716;
             }
             while(1) {
              $721 = ((($$1264$i$i)) + 20|0);
              $722 = HEAP32[$721>>2]|0;
              $723 = ($722|0)==(0|0);
              if (!($723)) {
               $$1264$i$i = $722;$$1266$i$i = $721;
               continue;
              }
              $724 = ((($$1264$i$i)) + 16|0);
              $725 = HEAP32[$724>>2]|0;
              $726 = ($725|0)==(0|0);
              if ($726) {
               break;
              } else {
               $$1264$i$i = $725;$$1266$i$i = $724;
              }
             }
             HEAP32[$$1266$i$i>>2] = 0;
             $$3$i$i = $$1264$i$i;
            } else {
             $711 = ((($668)) + 8|0);
             $712 = HEAP32[$711>>2]|0;
             $713 = ((($712)) + 12|0);
             HEAP32[$713>>2] = $709;
             $714 = ((($709)) + 8|0);
             HEAP32[$714>>2] = $712;
             $$3$i$i = $709;
            }
           } while(0);
           $727 = ($707|0)==(0|0);
           if ($727) {
            break;
           }
           $728 = ((($668)) + 28|0);
           $729 = HEAP32[$728>>2]|0;
           $730 = (8316 + ($729<<2)|0);
           $731 = HEAP32[$730>>2]|0;
           $732 = ($668|0)==($731|0);
           do {
            if ($732) {
             HEAP32[$730>>2] = $$3$i$i;
             $cond$i$i = ($$3$i$i|0)==(0|0);
             if (!($cond$i$i)) {
              break;
             }
             $733 = 1 << $729;
             $734 = $733 ^ -1;
             $735 = HEAP32[(8016)>>2]|0;
             $736 = $735 & $734;
             HEAP32[(8016)>>2] = $736;
             break L237;
            } else {
             $737 = ((($707)) + 16|0);
             $738 = HEAP32[$737>>2]|0;
             $not$$i$i = ($738|0)!=($668|0);
             $$sink1$i$i = $not$$i$i&1;
             $739 = (((($707)) + 16|0) + ($$sink1$i$i<<2)|0);
             HEAP32[$739>>2] = $$3$i$i;
             $740 = ($$3$i$i|0)==(0|0);
             if ($740) {
              break L237;
             }
            }
           } while(0);
           $741 = ((($$3$i$i)) + 24|0);
           HEAP32[$741>>2] = $707;
           $742 = ((($668)) + 16|0);
           $743 = HEAP32[$742>>2]|0;
           $744 = ($743|0)==(0|0);
           if (!($744)) {
            $745 = ((($$3$i$i)) + 16|0);
            HEAP32[$745>>2] = $743;
            $746 = ((($743)) + 24|0);
            HEAP32[$746>>2] = $$3$i$i;
           }
           $747 = ((($742)) + 4|0);
           $748 = HEAP32[$747>>2]|0;
           $749 = ($748|0)==(0|0);
           if ($749) {
            break;
           }
           $750 = ((($$3$i$i)) + 20|0);
           HEAP32[$750>>2] = $748;
           $751 = ((($748)) + 24|0);
           HEAP32[$751>>2] = $$3$i$i;
          }
         } while(0);
         $752 = (($668) + ($692)|0);
         $753 = (($692) + ($673))|0;
         $$0$i$i = $752;$$0260$i$i = $753;
        } else {
         $$0$i$i = $668;$$0260$i$i = $673;
        }
        $754 = ((($$0$i$i)) + 4|0);
        $755 = HEAP32[$754>>2]|0;
        $756 = $755 & -2;
        HEAP32[$754>>2] = $756;
        $757 = $$0260$i$i | 1;
        $758 = ((($672)) + 4|0);
        HEAP32[$758>>2] = $757;
        $759 = (($672) + ($$0260$i$i)|0);
        HEAP32[$759>>2] = $$0260$i$i;
        $760 = $$0260$i$i >>> 3;
        $761 = ($$0260$i$i>>>0)<(256);
        if ($761) {
         $762 = $760 << 1;
         $763 = (8052 + ($762<<2)|0);
         $764 = HEAP32[2003]|0;
         $765 = 1 << $760;
         $766 = $764 & $765;
         $767 = ($766|0)==(0);
         if ($767) {
          $768 = $764 | $765;
          HEAP32[2003] = $768;
          $$pre$i17$i = ((($763)) + 8|0);
          $$0268$i$i = $763;$$pre$phi$i18$iZ2D = $$pre$i17$i;
         } else {
          $769 = ((($763)) + 8|0);
          $770 = HEAP32[$769>>2]|0;
          $$0268$i$i = $770;$$pre$phi$i18$iZ2D = $769;
         }
         HEAP32[$$pre$phi$i18$iZ2D>>2] = $672;
         $771 = ((($$0268$i$i)) + 12|0);
         HEAP32[$771>>2] = $672;
         $772 = ((($672)) + 8|0);
         HEAP32[$772>>2] = $$0268$i$i;
         $773 = ((($672)) + 12|0);
         HEAP32[$773>>2] = $763;
         break;
        }
        $774 = $$0260$i$i >>> 8;
        $775 = ($774|0)==(0);
        do {
         if ($775) {
          $$0269$i$i = 0;
         } else {
          $776 = ($$0260$i$i>>>0)>(16777215);
          if ($776) {
           $$0269$i$i = 31;
           break;
          }
          $777 = (($774) + 1048320)|0;
          $778 = $777 >>> 16;
          $779 = $778 & 8;
          $780 = $774 << $779;
          $781 = (($780) + 520192)|0;
          $782 = $781 >>> 16;
          $783 = $782 & 4;
          $784 = $783 | $779;
          $785 = $780 << $783;
          $786 = (($785) + 245760)|0;
          $787 = $786 >>> 16;
          $788 = $787 & 2;
          $789 = $784 | $788;
          $790 = (14 - ($789))|0;
          $791 = $785 << $788;
          $792 = $791 >>> 15;
          $793 = (($790) + ($792))|0;
          $794 = $793 << 1;
          $795 = (($793) + 7)|0;
          $796 = $$0260$i$i >>> $795;
          $797 = $796 & 1;
          $798 = $797 | $794;
          $$0269$i$i = $798;
         }
        } while(0);
        $799 = (8316 + ($$0269$i$i<<2)|0);
        $800 = ((($672)) + 28|0);
        HEAP32[$800>>2] = $$0269$i$i;
        $801 = ((($672)) + 16|0);
        $802 = ((($801)) + 4|0);
        HEAP32[$802>>2] = 0;
        HEAP32[$801>>2] = 0;
        $803 = HEAP32[(8016)>>2]|0;
        $804 = 1 << $$0269$i$i;
        $805 = $803 & $804;
        $806 = ($805|0)==(0);
        if ($806) {
         $807 = $803 | $804;
         HEAP32[(8016)>>2] = $807;
         HEAP32[$799>>2] = $672;
         $808 = ((($672)) + 24|0);
         HEAP32[$808>>2] = $799;
         $809 = ((($672)) + 12|0);
         HEAP32[$809>>2] = $672;
         $810 = ((($672)) + 8|0);
         HEAP32[$810>>2] = $672;
         break;
        }
        $811 = HEAP32[$799>>2]|0;
        $812 = ($$0269$i$i|0)==(31);
        $813 = $$0269$i$i >>> 1;
        $814 = (25 - ($813))|0;
        $815 = $812 ? 0 : $814;
        $816 = $$0260$i$i << $815;
        $$0261$i$i = $816;$$0262$i$i = $811;
        while(1) {
         $817 = ((($$0262$i$i)) + 4|0);
         $818 = HEAP32[$817>>2]|0;
         $819 = $818 & -8;
         $820 = ($819|0)==($$0260$i$i|0);
         if ($820) {
          label = 194;
          break;
         }
         $821 = $$0261$i$i >>> 31;
         $822 = (((($$0262$i$i)) + 16|0) + ($821<<2)|0);
         $823 = $$0261$i$i << 1;
         $824 = HEAP32[$822>>2]|0;
         $825 = ($824|0)==(0|0);
         if ($825) {
          label = 193;
          break;
         } else {
          $$0261$i$i = $823;$$0262$i$i = $824;
         }
        }
        if ((label|0) == 193) {
         HEAP32[$822>>2] = $672;
         $826 = ((($672)) + 24|0);
         HEAP32[$826>>2] = $$0262$i$i;
         $827 = ((($672)) + 12|0);
         HEAP32[$827>>2] = $672;
         $828 = ((($672)) + 8|0);
         HEAP32[$828>>2] = $672;
         break;
        }
        else if ((label|0) == 194) {
         $829 = ((($$0262$i$i)) + 8|0);
         $830 = HEAP32[$829>>2]|0;
         $831 = ((($830)) + 12|0);
         HEAP32[$831>>2] = $672;
         HEAP32[$829>>2] = $672;
         $832 = ((($672)) + 8|0);
         HEAP32[$832>>2] = $830;
         $833 = ((($672)) + 12|0);
         HEAP32[$833>>2] = $$0262$i$i;
         $834 = ((($672)) + 24|0);
         HEAP32[$834>>2] = 0;
         break;
        }
       }
      } while(0);
      $959 = ((($660)) + 8|0);
      $$0 = $959;
      STACKTOP = sp;return ($$0|0);
     }
    }
    $$0$i$i$i = (8460);
    while(1) {
     $835 = HEAP32[$$0$i$i$i>>2]|0;
     $836 = ($835>>>0)>($581>>>0);
     if (!($836)) {
      $837 = ((($$0$i$i$i)) + 4|0);
      $838 = HEAP32[$837>>2]|0;
      $839 = (($835) + ($838)|0);
      $840 = ($839>>>0)>($581>>>0);
      if ($840) {
       break;
      }
     }
     $841 = ((($$0$i$i$i)) + 8|0);
     $842 = HEAP32[$841>>2]|0;
     $$0$i$i$i = $842;
    }
    $843 = ((($839)) + -47|0);
    $844 = ((($843)) + 8|0);
    $845 = $844;
    $846 = $845 & 7;
    $847 = ($846|0)==(0);
    $848 = (0 - ($845))|0;
    $849 = $848 & 7;
    $850 = $847 ? 0 : $849;
    $851 = (($843) + ($850)|0);
    $852 = ((($581)) + 16|0);
    $853 = ($851>>>0)<($852>>>0);
    $854 = $853 ? $581 : $851;
    $855 = ((($854)) + 8|0);
    $856 = ((($854)) + 24|0);
    $857 = (($$723947$i) + -40)|0;
    $858 = ((($$748$i)) + 8|0);
    $859 = $858;
    $860 = $859 & 7;
    $861 = ($860|0)==(0);
    $862 = (0 - ($859))|0;
    $863 = $862 & 7;
    $864 = $861 ? 0 : $863;
    $865 = (($$748$i) + ($864)|0);
    $866 = (($857) - ($864))|0;
    HEAP32[(8036)>>2] = $865;
    HEAP32[(8024)>>2] = $866;
    $867 = $866 | 1;
    $868 = ((($865)) + 4|0);
    HEAP32[$868>>2] = $867;
    $869 = (($865) + ($866)|0);
    $870 = ((($869)) + 4|0);
    HEAP32[$870>>2] = 40;
    $871 = HEAP32[(8500)>>2]|0;
    HEAP32[(8040)>>2] = $871;
    $872 = ((($854)) + 4|0);
    HEAP32[$872>>2] = 27;
    ;HEAP32[$855>>2]=HEAP32[(8460)>>2]|0;HEAP32[$855+4>>2]=HEAP32[(8460)+4>>2]|0;HEAP32[$855+8>>2]=HEAP32[(8460)+8>>2]|0;HEAP32[$855+12>>2]=HEAP32[(8460)+12>>2]|0;
    HEAP32[(8460)>>2] = $$748$i;
    HEAP32[(8464)>>2] = $$723947$i;
    HEAP32[(8472)>>2] = 0;
    HEAP32[(8468)>>2] = $855;
    $874 = $856;
    while(1) {
     $873 = ((($874)) + 4|0);
     HEAP32[$873>>2] = 7;
     $875 = ((($874)) + 8|0);
     $876 = ($875>>>0)<($839>>>0);
     if ($876) {
      $874 = $873;
     } else {
      break;
     }
    }
    $877 = ($854|0)==($581|0);
    if (!($877)) {
     $878 = $854;
     $879 = $581;
     $880 = (($878) - ($879))|0;
     $881 = HEAP32[$872>>2]|0;
     $882 = $881 & -2;
     HEAP32[$872>>2] = $882;
     $883 = $880 | 1;
     $884 = ((($581)) + 4|0);
     HEAP32[$884>>2] = $883;
     HEAP32[$854>>2] = $880;
     $885 = $880 >>> 3;
     $886 = ($880>>>0)<(256);
     if ($886) {
      $887 = $885 << 1;
      $888 = (8052 + ($887<<2)|0);
      $889 = HEAP32[2003]|0;
      $890 = 1 << $885;
      $891 = $889 & $890;
      $892 = ($891|0)==(0);
      if ($892) {
       $893 = $889 | $890;
       HEAP32[2003] = $893;
       $$pre$i$i = ((($888)) + 8|0);
       $$0206$i$i = $888;$$pre$phi$i$iZ2D = $$pre$i$i;
      } else {
       $894 = ((($888)) + 8|0);
       $895 = HEAP32[$894>>2]|0;
       $$0206$i$i = $895;$$pre$phi$i$iZ2D = $894;
      }
      HEAP32[$$pre$phi$i$iZ2D>>2] = $581;
      $896 = ((($$0206$i$i)) + 12|0);
      HEAP32[$896>>2] = $581;
      $897 = ((($581)) + 8|0);
      HEAP32[$897>>2] = $$0206$i$i;
      $898 = ((($581)) + 12|0);
      HEAP32[$898>>2] = $888;
      break;
     }
     $899 = $880 >>> 8;
     $900 = ($899|0)==(0);
     if ($900) {
      $$0207$i$i = 0;
     } else {
      $901 = ($880>>>0)>(16777215);
      if ($901) {
       $$0207$i$i = 31;
      } else {
       $902 = (($899) + 1048320)|0;
       $903 = $902 >>> 16;
       $904 = $903 & 8;
       $905 = $899 << $904;
       $906 = (($905) + 520192)|0;
       $907 = $906 >>> 16;
       $908 = $907 & 4;
       $909 = $908 | $904;
       $910 = $905 << $908;
       $911 = (($910) + 245760)|0;
       $912 = $911 >>> 16;
       $913 = $912 & 2;
       $914 = $909 | $913;
       $915 = (14 - ($914))|0;
       $916 = $910 << $913;
       $917 = $916 >>> 15;
       $918 = (($915) + ($917))|0;
       $919 = $918 << 1;
       $920 = (($918) + 7)|0;
       $921 = $880 >>> $920;
       $922 = $921 & 1;
       $923 = $922 | $919;
       $$0207$i$i = $923;
      }
     }
     $924 = (8316 + ($$0207$i$i<<2)|0);
     $925 = ((($581)) + 28|0);
     HEAP32[$925>>2] = $$0207$i$i;
     $926 = ((($581)) + 20|0);
     HEAP32[$926>>2] = 0;
     HEAP32[$852>>2] = 0;
     $927 = HEAP32[(8016)>>2]|0;
     $928 = 1 << $$0207$i$i;
     $929 = $927 & $928;
     $930 = ($929|0)==(0);
     if ($930) {
      $931 = $927 | $928;
      HEAP32[(8016)>>2] = $931;
      HEAP32[$924>>2] = $581;
      $932 = ((($581)) + 24|0);
      HEAP32[$932>>2] = $924;
      $933 = ((($581)) + 12|0);
      HEAP32[$933>>2] = $581;
      $934 = ((($581)) + 8|0);
      HEAP32[$934>>2] = $581;
      break;
     }
     $935 = HEAP32[$924>>2]|0;
     $936 = ($$0207$i$i|0)==(31);
     $937 = $$0207$i$i >>> 1;
     $938 = (25 - ($937))|0;
     $939 = $936 ? 0 : $938;
     $940 = $880 << $939;
     $$0201$i$i = $940;$$0202$i$i = $935;
     while(1) {
      $941 = ((($$0202$i$i)) + 4|0);
      $942 = HEAP32[$941>>2]|0;
      $943 = $942 & -8;
      $944 = ($943|0)==($880|0);
      if ($944) {
       label = 216;
       break;
      }
      $945 = $$0201$i$i >>> 31;
      $946 = (((($$0202$i$i)) + 16|0) + ($945<<2)|0);
      $947 = $$0201$i$i << 1;
      $948 = HEAP32[$946>>2]|0;
      $949 = ($948|0)==(0|0);
      if ($949) {
       label = 215;
       break;
      } else {
       $$0201$i$i = $947;$$0202$i$i = $948;
      }
     }
     if ((label|0) == 215) {
      HEAP32[$946>>2] = $581;
      $950 = ((($581)) + 24|0);
      HEAP32[$950>>2] = $$0202$i$i;
      $951 = ((($581)) + 12|0);
      HEAP32[$951>>2] = $581;
      $952 = ((($581)) + 8|0);
      HEAP32[$952>>2] = $581;
      break;
     }
     else if ((label|0) == 216) {
      $953 = ((($$0202$i$i)) + 8|0);
      $954 = HEAP32[$953>>2]|0;
      $955 = ((($954)) + 12|0);
      HEAP32[$955>>2] = $581;
      HEAP32[$953>>2] = $581;
      $956 = ((($581)) + 8|0);
      HEAP32[$956>>2] = $954;
      $957 = ((($581)) + 12|0);
      HEAP32[$957>>2] = $$0202$i$i;
      $958 = ((($581)) + 24|0);
      HEAP32[$958>>2] = 0;
      break;
     }
    }
   }
  } while(0);
  $960 = HEAP32[(8024)>>2]|0;
  $961 = ($960>>>0)>($$0192>>>0);
  if ($961) {
   $962 = (($960) - ($$0192))|0;
   HEAP32[(8024)>>2] = $962;
   $963 = HEAP32[(8036)>>2]|0;
   $964 = (($963) + ($$0192)|0);
   HEAP32[(8036)>>2] = $964;
   $965 = $962 | 1;
   $966 = ((($964)) + 4|0);
   HEAP32[$966>>2] = $965;
   $967 = $$0192 | 3;
   $968 = ((($963)) + 4|0);
   HEAP32[$968>>2] = $967;
   $969 = ((($963)) + 8|0);
   $$0 = $969;
   STACKTOP = sp;return ($$0|0);
  }
 }
 $970 = (___errno_location()|0);
 HEAP32[$970>>2] = 12;
 $$0 = 0;
 STACKTOP = sp;return ($$0|0);
}
function _free($0) {
 $0 = $0|0;
 var $$0195$i = 0, $$0195$in$i = 0, $$0348 = 0, $$0349 = 0, $$0361 = 0, $$0368 = 0, $$1 = 0, $$1347 = 0, $$1352 = 0, $$1355 = 0, $$1363 = 0, $$1367 = 0, $$2 = 0, $$3 = 0, $$3365 = 0, $$pre = 0, $$pre$phiZ2D = 0, $$sink3 = 0, $$sink5 = 0, $1 = 0;
 var $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0, $104 = 0, $105 = 0, $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0;
 var $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0, $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0;
 var $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0, $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0;
 var $154 = 0, $155 = 0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0, $160 = 0, $161 = 0, $162 = 0, $163 = 0, $164 = 0, $165 = 0, $166 = 0, $167 = 0, $168 = 0, $169 = 0, $17 = 0, $170 = 0, $171 = 0;
 var $172 = 0, $173 = 0, $174 = 0, $175 = 0, $176 = 0, $177 = 0, $178 = 0, $179 = 0, $18 = 0, $180 = 0, $181 = 0, $182 = 0, $183 = 0, $184 = 0, $185 = 0, $186 = 0, $187 = 0, $188 = 0, $189 = 0, $19 = 0;
 var $190 = 0, $191 = 0, $192 = 0, $193 = 0, $194 = 0, $195 = 0, $196 = 0, $197 = 0, $198 = 0, $199 = 0, $2 = 0, $20 = 0, $200 = 0, $201 = 0, $202 = 0, $203 = 0, $204 = 0, $205 = 0, $206 = 0, $207 = 0;
 var $208 = 0, $209 = 0, $21 = 0, $210 = 0, $211 = 0, $212 = 0, $213 = 0, $214 = 0, $215 = 0, $216 = 0, $217 = 0, $218 = 0, $219 = 0, $22 = 0, $220 = 0, $221 = 0, $222 = 0, $223 = 0, $224 = 0, $225 = 0;
 var $226 = 0, $227 = 0, $228 = 0, $229 = 0, $23 = 0, $230 = 0, $231 = 0, $232 = 0, $233 = 0, $234 = 0, $235 = 0, $236 = 0, $237 = 0, $238 = 0, $239 = 0, $24 = 0, $240 = 0, $241 = 0, $242 = 0, $243 = 0;
 var $244 = 0, $245 = 0, $246 = 0, $247 = 0, $248 = 0, $249 = 0, $25 = 0, $250 = 0, $251 = 0, $252 = 0, $253 = 0, $254 = 0, $255 = 0, $256 = 0, $257 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0;
 var $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0;
 var $49 = 0, $5 = 0, $50 = 0, $51 = 0, $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0;
 var $67 = 0, $68 = 0, $69 = 0, $7 = 0, $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0;
 var $85 = 0, $86 = 0, $87 = 0, $88 = 0, $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $cond374 = 0, $cond375 = 0, $not$ = 0, $not$370 = 0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ($0|0)==(0|0);
 if ($1) {
  return;
 }
 $2 = ((($0)) + -8|0);
 $3 = HEAP32[(8028)>>2]|0;
 $4 = ((($0)) + -4|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = $5 & -8;
 $7 = (($2) + ($6)|0);
 $8 = $5 & 1;
 $9 = ($8|0)==(0);
 do {
  if ($9) {
   $10 = HEAP32[$2>>2]|0;
   $11 = $5 & 3;
   $12 = ($11|0)==(0);
   if ($12) {
    return;
   }
   $13 = (0 - ($10))|0;
   $14 = (($2) + ($13)|0);
   $15 = (($10) + ($6))|0;
   $16 = ($14>>>0)<($3>>>0);
   if ($16) {
    return;
   }
   $17 = HEAP32[(8032)>>2]|0;
   $18 = ($14|0)==($17|0);
   if ($18) {
    $78 = ((($7)) + 4|0);
    $79 = HEAP32[$78>>2]|0;
    $80 = $79 & 3;
    $81 = ($80|0)==(3);
    if (!($81)) {
     $$1 = $14;$$1347 = $15;$87 = $14;
     break;
    }
    $82 = (($14) + ($15)|0);
    $83 = ((($14)) + 4|0);
    $84 = $15 | 1;
    $85 = $79 & -2;
    HEAP32[(8020)>>2] = $15;
    HEAP32[$78>>2] = $85;
    HEAP32[$83>>2] = $84;
    HEAP32[$82>>2] = $15;
    return;
   }
   $19 = $10 >>> 3;
   $20 = ($10>>>0)<(256);
   if ($20) {
    $21 = ((($14)) + 8|0);
    $22 = HEAP32[$21>>2]|0;
    $23 = ((($14)) + 12|0);
    $24 = HEAP32[$23>>2]|0;
    $25 = ($24|0)==($22|0);
    if ($25) {
     $26 = 1 << $19;
     $27 = $26 ^ -1;
     $28 = HEAP32[2003]|0;
     $29 = $28 & $27;
     HEAP32[2003] = $29;
     $$1 = $14;$$1347 = $15;$87 = $14;
     break;
    } else {
     $30 = ((($22)) + 12|0);
     HEAP32[$30>>2] = $24;
     $31 = ((($24)) + 8|0);
     HEAP32[$31>>2] = $22;
     $$1 = $14;$$1347 = $15;$87 = $14;
     break;
    }
   }
   $32 = ((($14)) + 24|0);
   $33 = HEAP32[$32>>2]|0;
   $34 = ((($14)) + 12|0);
   $35 = HEAP32[$34>>2]|0;
   $36 = ($35|0)==($14|0);
   do {
    if ($36) {
     $41 = ((($14)) + 16|0);
     $42 = ((($41)) + 4|0);
     $43 = HEAP32[$42>>2]|0;
     $44 = ($43|0)==(0|0);
     if ($44) {
      $45 = HEAP32[$41>>2]|0;
      $46 = ($45|0)==(0|0);
      if ($46) {
       $$3 = 0;
       break;
      } else {
       $$1352 = $45;$$1355 = $41;
      }
     } else {
      $$1352 = $43;$$1355 = $42;
     }
     while(1) {
      $47 = ((($$1352)) + 20|0);
      $48 = HEAP32[$47>>2]|0;
      $49 = ($48|0)==(0|0);
      if (!($49)) {
       $$1352 = $48;$$1355 = $47;
       continue;
      }
      $50 = ((($$1352)) + 16|0);
      $51 = HEAP32[$50>>2]|0;
      $52 = ($51|0)==(0|0);
      if ($52) {
       break;
      } else {
       $$1352 = $51;$$1355 = $50;
      }
     }
     HEAP32[$$1355>>2] = 0;
     $$3 = $$1352;
    } else {
     $37 = ((($14)) + 8|0);
     $38 = HEAP32[$37>>2]|0;
     $39 = ((($38)) + 12|0);
     HEAP32[$39>>2] = $35;
     $40 = ((($35)) + 8|0);
     HEAP32[$40>>2] = $38;
     $$3 = $35;
    }
   } while(0);
   $53 = ($33|0)==(0|0);
   if ($53) {
    $$1 = $14;$$1347 = $15;$87 = $14;
   } else {
    $54 = ((($14)) + 28|0);
    $55 = HEAP32[$54>>2]|0;
    $56 = (8316 + ($55<<2)|0);
    $57 = HEAP32[$56>>2]|0;
    $58 = ($14|0)==($57|0);
    if ($58) {
     HEAP32[$56>>2] = $$3;
     $cond374 = ($$3|0)==(0|0);
     if ($cond374) {
      $59 = 1 << $55;
      $60 = $59 ^ -1;
      $61 = HEAP32[(8016)>>2]|0;
      $62 = $61 & $60;
      HEAP32[(8016)>>2] = $62;
      $$1 = $14;$$1347 = $15;$87 = $14;
      break;
     }
    } else {
     $63 = ((($33)) + 16|0);
     $64 = HEAP32[$63>>2]|0;
     $not$370 = ($64|0)!=($14|0);
     $$sink3 = $not$370&1;
     $65 = (((($33)) + 16|0) + ($$sink3<<2)|0);
     HEAP32[$65>>2] = $$3;
     $66 = ($$3|0)==(0|0);
     if ($66) {
      $$1 = $14;$$1347 = $15;$87 = $14;
      break;
     }
    }
    $67 = ((($$3)) + 24|0);
    HEAP32[$67>>2] = $33;
    $68 = ((($14)) + 16|0);
    $69 = HEAP32[$68>>2]|0;
    $70 = ($69|0)==(0|0);
    if (!($70)) {
     $71 = ((($$3)) + 16|0);
     HEAP32[$71>>2] = $69;
     $72 = ((($69)) + 24|0);
     HEAP32[$72>>2] = $$3;
    }
    $73 = ((($68)) + 4|0);
    $74 = HEAP32[$73>>2]|0;
    $75 = ($74|0)==(0|0);
    if ($75) {
     $$1 = $14;$$1347 = $15;$87 = $14;
    } else {
     $76 = ((($$3)) + 20|0);
     HEAP32[$76>>2] = $74;
     $77 = ((($74)) + 24|0);
     HEAP32[$77>>2] = $$3;
     $$1 = $14;$$1347 = $15;$87 = $14;
    }
   }
  } else {
   $$1 = $2;$$1347 = $6;$87 = $2;
  }
 } while(0);
 $86 = ($87>>>0)<($7>>>0);
 if (!($86)) {
  return;
 }
 $88 = ((($7)) + 4|0);
 $89 = HEAP32[$88>>2]|0;
 $90 = $89 & 1;
 $91 = ($90|0)==(0);
 if ($91) {
  return;
 }
 $92 = $89 & 2;
 $93 = ($92|0)==(0);
 if ($93) {
  $94 = HEAP32[(8036)>>2]|0;
  $95 = ($7|0)==($94|0);
  $96 = HEAP32[(8032)>>2]|0;
  if ($95) {
   $97 = HEAP32[(8024)>>2]|0;
   $98 = (($97) + ($$1347))|0;
   HEAP32[(8024)>>2] = $98;
   HEAP32[(8036)>>2] = $$1;
   $99 = $98 | 1;
   $100 = ((($$1)) + 4|0);
   HEAP32[$100>>2] = $99;
   $101 = ($$1|0)==($96|0);
   if (!($101)) {
    return;
   }
   HEAP32[(8032)>>2] = 0;
   HEAP32[(8020)>>2] = 0;
   return;
  }
  $102 = ($7|0)==($96|0);
  if ($102) {
   $103 = HEAP32[(8020)>>2]|0;
   $104 = (($103) + ($$1347))|0;
   HEAP32[(8020)>>2] = $104;
   HEAP32[(8032)>>2] = $87;
   $105 = $104 | 1;
   $106 = ((($$1)) + 4|0);
   HEAP32[$106>>2] = $105;
   $107 = (($87) + ($104)|0);
   HEAP32[$107>>2] = $104;
   return;
  }
  $108 = $89 & -8;
  $109 = (($108) + ($$1347))|0;
  $110 = $89 >>> 3;
  $111 = ($89>>>0)<(256);
  do {
   if ($111) {
    $112 = ((($7)) + 8|0);
    $113 = HEAP32[$112>>2]|0;
    $114 = ((($7)) + 12|0);
    $115 = HEAP32[$114>>2]|0;
    $116 = ($115|0)==($113|0);
    if ($116) {
     $117 = 1 << $110;
     $118 = $117 ^ -1;
     $119 = HEAP32[2003]|0;
     $120 = $119 & $118;
     HEAP32[2003] = $120;
     break;
    } else {
     $121 = ((($113)) + 12|0);
     HEAP32[$121>>2] = $115;
     $122 = ((($115)) + 8|0);
     HEAP32[$122>>2] = $113;
     break;
    }
   } else {
    $123 = ((($7)) + 24|0);
    $124 = HEAP32[$123>>2]|0;
    $125 = ((($7)) + 12|0);
    $126 = HEAP32[$125>>2]|0;
    $127 = ($126|0)==($7|0);
    do {
     if ($127) {
      $132 = ((($7)) + 16|0);
      $133 = ((($132)) + 4|0);
      $134 = HEAP32[$133>>2]|0;
      $135 = ($134|0)==(0|0);
      if ($135) {
       $136 = HEAP32[$132>>2]|0;
       $137 = ($136|0)==(0|0);
       if ($137) {
        $$3365 = 0;
        break;
       } else {
        $$1363 = $136;$$1367 = $132;
       }
      } else {
       $$1363 = $134;$$1367 = $133;
      }
      while(1) {
       $138 = ((($$1363)) + 20|0);
       $139 = HEAP32[$138>>2]|0;
       $140 = ($139|0)==(0|0);
       if (!($140)) {
        $$1363 = $139;$$1367 = $138;
        continue;
       }
       $141 = ((($$1363)) + 16|0);
       $142 = HEAP32[$141>>2]|0;
       $143 = ($142|0)==(0|0);
       if ($143) {
        break;
       } else {
        $$1363 = $142;$$1367 = $141;
       }
      }
      HEAP32[$$1367>>2] = 0;
      $$3365 = $$1363;
     } else {
      $128 = ((($7)) + 8|0);
      $129 = HEAP32[$128>>2]|0;
      $130 = ((($129)) + 12|0);
      HEAP32[$130>>2] = $126;
      $131 = ((($126)) + 8|0);
      HEAP32[$131>>2] = $129;
      $$3365 = $126;
     }
    } while(0);
    $144 = ($124|0)==(0|0);
    if (!($144)) {
     $145 = ((($7)) + 28|0);
     $146 = HEAP32[$145>>2]|0;
     $147 = (8316 + ($146<<2)|0);
     $148 = HEAP32[$147>>2]|0;
     $149 = ($7|0)==($148|0);
     if ($149) {
      HEAP32[$147>>2] = $$3365;
      $cond375 = ($$3365|0)==(0|0);
      if ($cond375) {
       $150 = 1 << $146;
       $151 = $150 ^ -1;
       $152 = HEAP32[(8016)>>2]|0;
       $153 = $152 & $151;
       HEAP32[(8016)>>2] = $153;
       break;
      }
     } else {
      $154 = ((($124)) + 16|0);
      $155 = HEAP32[$154>>2]|0;
      $not$ = ($155|0)!=($7|0);
      $$sink5 = $not$&1;
      $156 = (((($124)) + 16|0) + ($$sink5<<2)|0);
      HEAP32[$156>>2] = $$3365;
      $157 = ($$3365|0)==(0|0);
      if ($157) {
       break;
      }
     }
     $158 = ((($$3365)) + 24|0);
     HEAP32[$158>>2] = $124;
     $159 = ((($7)) + 16|0);
     $160 = HEAP32[$159>>2]|0;
     $161 = ($160|0)==(0|0);
     if (!($161)) {
      $162 = ((($$3365)) + 16|0);
      HEAP32[$162>>2] = $160;
      $163 = ((($160)) + 24|0);
      HEAP32[$163>>2] = $$3365;
     }
     $164 = ((($159)) + 4|0);
     $165 = HEAP32[$164>>2]|0;
     $166 = ($165|0)==(0|0);
     if (!($166)) {
      $167 = ((($$3365)) + 20|0);
      HEAP32[$167>>2] = $165;
      $168 = ((($165)) + 24|0);
      HEAP32[$168>>2] = $$3365;
     }
    }
   }
  } while(0);
  $169 = $109 | 1;
  $170 = ((($$1)) + 4|0);
  HEAP32[$170>>2] = $169;
  $171 = (($87) + ($109)|0);
  HEAP32[$171>>2] = $109;
  $172 = HEAP32[(8032)>>2]|0;
  $173 = ($$1|0)==($172|0);
  if ($173) {
   HEAP32[(8020)>>2] = $109;
   return;
  } else {
   $$2 = $109;
  }
 } else {
  $174 = $89 & -2;
  HEAP32[$88>>2] = $174;
  $175 = $$1347 | 1;
  $176 = ((($$1)) + 4|0);
  HEAP32[$176>>2] = $175;
  $177 = (($87) + ($$1347)|0);
  HEAP32[$177>>2] = $$1347;
  $$2 = $$1347;
 }
 $178 = $$2 >>> 3;
 $179 = ($$2>>>0)<(256);
 if ($179) {
  $180 = $178 << 1;
  $181 = (8052 + ($180<<2)|0);
  $182 = HEAP32[2003]|0;
  $183 = 1 << $178;
  $184 = $182 & $183;
  $185 = ($184|0)==(0);
  if ($185) {
   $186 = $182 | $183;
   HEAP32[2003] = $186;
   $$pre = ((($181)) + 8|0);
   $$0368 = $181;$$pre$phiZ2D = $$pre;
  } else {
   $187 = ((($181)) + 8|0);
   $188 = HEAP32[$187>>2]|0;
   $$0368 = $188;$$pre$phiZ2D = $187;
  }
  HEAP32[$$pre$phiZ2D>>2] = $$1;
  $189 = ((($$0368)) + 12|0);
  HEAP32[$189>>2] = $$1;
  $190 = ((($$1)) + 8|0);
  HEAP32[$190>>2] = $$0368;
  $191 = ((($$1)) + 12|0);
  HEAP32[$191>>2] = $181;
  return;
 }
 $192 = $$2 >>> 8;
 $193 = ($192|0)==(0);
 if ($193) {
  $$0361 = 0;
 } else {
  $194 = ($$2>>>0)>(16777215);
  if ($194) {
   $$0361 = 31;
  } else {
   $195 = (($192) + 1048320)|0;
   $196 = $195 >>> 16;
   $197 = $196 & 8;
   $198 = $192 << $197;
   $199 = (($198) + 520192)|0;
   $200 = $199 >>> 16;
   $201 = $200 & 4;
   $202 = $201 | $197;
   $203 = $198 << $201;
   $204 = (($203) + 245760)|0;
   $205 = $204 >>> 16;
   $206 = $205 & 2;
   $207 = $202 | $206;
   $208 = (14 - ($207))|0;
   $209 = $203 << $206;
   $210 = $209 >>> 15;
   $211 = (($208) + ($210))|0;
   $212 = $211 << 1;
   $213 = (($211) + 7)|0;
   $214 = $$2 >>> $213;
   $215 = $214 & 1;
   $216 = $215 | $212;
   $$0361 = $216;
  }
 }
 $217 = (8316 + ($$0361<<2)|0);
 $218 = ((($$1)) + 28|0);
 HEAP32[$218>>2] = $$0361;
 $219 = ((($$1)) + 16|0);
 $220 = ((($$1)) + 20|0);
 HEAP32[$220>>2] = 0;
 HEAP32[$219>>2] = 0;
 $221 = HEAP32[(8016)>>2]|0;
 $222 = 1 << $$0361;
 $223 = $221 & $222;
 $224 = ($223|0)==(0);
 do {
  if ($224) {
   $225 = $221 | $222;
   HEAP32[(8016)>>2] = $225;
   HEAP32[$217>>2] = $$1;
   $226 = ((($$1)) + 24|0);
   HEAP32[$226>>2] = $217;
   $227 = ((($$1)) + 12|0);
   HEAP32[$227>>2] = $$1;
   $228 = ((($$1)) + 8|0);
   HEAP32[$228>>2] = $$1;
  } else {
   $229 = HEAP32[$217>>2]|0;
   $230 = ($$0361|0)==(31);
   $231 = $$0361 >>> 1;
   $232 = (25 - ($231))|0;
   $233 = $230 ? 0 : $232;
   $234 = $$2 << $233;
   $$0348 = $234;$$0349 = $229;
   while(1) {
    $235 = ((($$0349)) + 4|0);
    $236 = HEAP32[$235>>2]|0;
    $237 = $236 & -8;
    $238 = ($237|0)==($$2|0);
    if ($238) {
     label = 73;
     break;
    }
    $239 = $$0348 >>> 31;
    $240 = (((($$0349)) + 16|0) + ($239<<2)|0);
    $241 = $$0348 << 1;
    $242 = HEAP32[$240>>2]|0;
    $243 = ($242|0)==(0|0);
    if ($243) {
     label = 72;
     break;
    } else {
     $$0348 = $241;$$0349 = $242;
    }
   }
   if ((label|0) == 72) {
    HEAP32[$240>>2] = $$1;
    $244 = ((($$1)) + 24|0);
    HEAP32[$244>>2] = $$0349;
    $245 = ((($$1)) + 12|0);
    HEAP32[$245>>2] = $$1;
    $246 = ((($$1)) + 8|0);
    HEAP32[$246>>2] = $$1;
    break;
   }
   else if ((label|0) == 73) {
    $247 = ((($$0349)) + 8|0);
    $248 = HEAP32[$247>>2]|0;
    $249 = ((($248)) + 12|0);
    HEAP32[$249>>2] = $$1;
    HEAP32[$247>>2] = $$1;
    $250 = ((($$1)) + 8|0);
    HEAP32[$250>>2] = $248;
    $251 = ((($$1)) + 12|0);
    HEAP32[$251>>2] = $$0349;
    $252 = ((($$1)) + 24|0);
    HEAP32[$252>>2] = 0;
    break;
   }
  }
 } while(0);
 $253 = HEAP32[(8044)>>2]|0;
 $254 = (($253) + -1)|0;
 HEAP32[(8044)>>2] = $254;
 $255 = ($254|0)==(0);
 if ($255) {
  $$0195$in$i = (8468);
 } else {
  return;
 }
 while(1) {
  $$0195$i = HEAP32[$$0195$in$i>>2]|0;
  $256 = ($$0195$i|0)==(0|0);
  $257 = ((($$0195$i)) + 8|0);
  if ($256) {
   break;
  } else {
   $$0195$in$i = $257;
  }
 }
 HEAP32[(8044)>>2] = -1;
 return;
}
function _emscripten_get_global_libc() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (8508|0);
}
function ___stdio_close($0) {
 $0 = $0|0;
 var $1 = 0, $2 = 0, $3 = 0, $4 = 0, $5 = 0, $vararg_buffer = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 16|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(16|0);
 $vararg_buffer = sp;
 $1 = ((($0)) + 60|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = (_dummy_570($2)|0);
 HEAP32[$vararg_buffer>>2] = $3;
 $4 = (___syscall6(6,($vararg_buffer|0))|0);
 $5 = (___syscall_ret($4)|0);
 STACKTOP = sp;return ($5|0);
}
function ___stdio_write($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$0 = 0, $$04756 = 0, $$04855 = 0, $$04954 = 0, $$051 = 0, $$1 = 0, $$150 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $20 = 0, $21 = 0, $22 = 0;
 var $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0, $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0, $4 = 0, $40 = 0;
 var $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $vararg_buffer = 0, $vararg_buffer3 = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr6 = 0;
 var $vararg_ptr7 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 48|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(48|0);
 $vararg_buffer3 = sp + 16|0;
 $vararg_buffer = sp;
 $3 = sp + 32|0;
 $4 = ((($0)) + 28|0);
 $5 = HEAP32[$4>>2]|0;
 HEAP32[$3>>2] = $5;
 $6 = ((($3)) + 4|0);
 $7 = ((($0)) + 20|0);
 $8 = HEAP32[$7>>2]|0;
 $9 = (($8) - ($5))|0;
 HEAP32[$6>>2] = $9;
 $10 = ((($3)) + 8|0);
 HEAP32[$10>>2] = $1;
 $11 = ((($3)) + 12|0);
 HEAP32[$11>>2] = $2;
 $12 = (($9) + ($2))|0;
 $13 = ((($0)) + 60|0);
 $14 = HEAP32[$13>>2]|0;
 $15 = $3;
 HEAP32[$vararg_buffer>>2] = $14;
 $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
 HEAP32[$vararg_ptr1>>2] = $15;
 $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
 HEAP32[$vararg_ptr2>>2] = 2;
 $16 = (___syscall146(146,($vararg_buffer|0))|0);
 $17 = (___syscall_ret($16)|0);
 $18 = ($12|0)==($17|0);
 L1: do {
  if ($18) {
   label = 3;
  } else {
   $$04756 = 2;$$04855 = $12;$$04954 = $3;$26 = $17;
   while(1) {
    $25 = ($26|0)<(0);
    if ($25) {
     break;
    }
    $34 = (($$04855) - ($26))|0;
    $35 = ((($$04954)) + 4|0);
    $36 = HEAP32[$35>>2]|0;
    $37 = ($26>>>0)>($36>>>0);
    $38 = ((($$04954)) + 8|0);
    $$150 = $37 ? $38 : $$04954;
    $39 = $37 << 31 >> 31;
    $$1 = (($39) + ($$04756))|0;
    $40 = $37 ? $36 : 0;
    $$0 = (($26) - ($40))|0;
    $41 = HEAP32[$$150>>2]|0;
    $42 = (($41) + ($$0)|0);
    HEAP32[$$150>>2] = $42;
    $43 = ((($$150)) + 4|0);
    $44 = HEAP32[$43>>2]|0;
    $45 = (($44) - ($$0))|0;
    HEAP32[$43>>2] = $45;
    $46 = HEAP32[$13>>2]|0;
    $47 = $$150;
    HEAP32[$vararg_buffer3>>2] = $46;
    $vararg_ptr6 = ((($vararg_buffer3)) + 4|0);
    HEAP32[$vararg_ptr6>>2] = $47;
    $vararg_ptr7 = ((($vararg_buffer3)) + 8|0);
    HEAP32[$vararg_ptr7>>2] = $$1;
    $48 = (___syscall146(146,($vararg_buffer3|0))|0);
    $49 = (___syscall_ret($48)|0);
    $50 = ($34|0)==($49|0);
    if ($50) {
     label = 3;
     break L1;
    } else {
     $$04756 = $$1;$$04855 = $34;$$04954 = $$150;$26 = $49;
    }
   }
   $27 = ((($0)) + 16|0);
   HEAP32[$27>>2] = 0;
   HEAP32[$4>>2] = 0;
   HEAP32[$7>>2] = 0;
   $28 = HEAP32[$0>>2]|0;
   $29 = $28 | 32;
   HEAP32[$0>>2] = $29;
   $30 = ($$04756|0)==(2);
   if ($30) {
    $$051 = 0;
   } else {
    $31 = ((($$04954)) + 4|0);
    $32 = HEAP32[$31>>2]|0;
    $33 = (($2) - ($32))|0;
    $$051 = $33;
   }
  }
 } while(0);
 if ((label|0) == 3) {
  $19 = ((($0)) + 44|0);
  $20 = HEAP32[$19>>2]|0;
  $21 = ((($0)) + 48|0);
  $22 = HEAP32[$21>>2]|0;
  $23 = (($20) + ($22)|0);
  $24 = ((($0)) + 16|0);
  HEAP32[$24>>2] = $23;
  HEAP32[$4>>2] = $20;
  HEAP32[$7>>2] = $20;
  $$051 = $2;
 }
 STACKTOP = sp;return ($$051|0);
}
function ___stdio_seek($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $$pre = 0, $10 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, $vararg_ptr3 = 0, $vararg_ptr4 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $vararg_buffer = sp;
 $3 = sp + 20|0;
 $4 = ((($0)) + 60|0);
 $5 = HEAP32[$4>>2]|0;
 $6 = $3;
 HEAP32[$vararg_buffer>>2] = $5;
 $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
 HEAP32[$vararg_ptr1>>2] = 0;
 $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
 HEAP32[$vararg_ptr2>>2] = $1;
 $vararg_ptr3 = ((($vararg_buffer)) + 12|0);
 HEAP32[$vararg_ptr3>>2] = $6;
 $vararg_ptr4 = ((($vararg_buffer)) + 16|0);
 HEAP32[$vararg_ptr4>>2] = $2;
 $7 = (___syscall140(140,($vararg_buffer|0))|0);
 $8 = (___syscall_ret($7)|0);
 $9 = ($8|0)<(0);
 if ($9) {
  HEAP32[$3>>2] = -1;
  $10 = -1;
 } else {
  $$pre = HEAP32[$3>>2]|0;
  $10 = $$pre;
 }
 STACKTOP = sp;return ($10|0);
}
function ___syscall_ret($0) {
 $0 = $0|0;
 var $$0 = 0, $1 = 0, $2 = 0, $3 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ($0>>>0)>(4294963200);
 if ($1) {
  $2 = (0 - ($0))|0;
  $3 = (___errno_location()|0);
  HEAP32[$3>>2] = $2;
  $$0 = -1;
 } else {
  $$0 = $0;
 }
 return ($$0|0);
}
function ___errno_location() {
 var $0 = 0, $1 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (___pthread_self_103()|0);
 $1 = ((($0)) + 64|0);
 return ($1|0);
}
function ___pthread_self_103() {
 var $0 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $0 = (_pthread_self()|0);
 return ($0|0);
}
function _pthread_self() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 return (1552|0);
}
function _dummy_570($0) {
 $0 = $0|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 return ($0|0);
}
function ___stdout_write($0,$1,$2) {
 $0 = $0|0;
 $1 = $1|0;
 $2 = $2|0;
 var $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $vararg_buffer = 0, $vararg_ptr1 = 0, $vararg_ptr2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 STACKTOP = STACKTOP + 32|0; if ((STACKTOP|0) >= (STACK_MAX|0)) abortStackOverflow(32|0);
 $vararg_buffer = sp;
 $3 = sp + 16|0;
 $4 = ((($0)) + 36|0);
 HEAP32[$4>>2] = 4;
 $5 = HEAP32[$0>>2]|0;
 $6 = $5 & 64;
 $7 = ($6|0)==(0);
 if ($7) {
  $8 = ((($0)) + 60|0);
  $9 = HEAP32[$8>>2]|0;
  $10 = $3;
  HEAP32[$vararg_buffer>>2] = $9;
  $vararg_ptr1 = ((($vararg_buffer)) + 4|0);
  HEAP32[$vararg_ptr1>>2] = 21523;
  $vararg_ptr2 = ((($vararg_buffer)) + 8|0);
  HEAP32[$vararg_ptr2>>2] = $10;
  $11 = (___syscall54(54,($vararg_buffer|0))|0);
  $12 = ($11|0)==(0);
  if (!($12)) {
   $13 = ((($0)) + 75|0);
   HEAP8[$13>>0] = -1;
  }
 }
 $14 = (___stdio_write($0,$1,$2)|0);
 STACKTOP = sp;return ($14|0);
}
function ___lockfile($0) {
 $0 = $0|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 return 0;
}
function ___unlockfile($0) {
 $0 = $0|0;
 var label = 0, sp = 0;
 sp = STACKTOP;
 return;
}
function _fmod($0,$1) {
 $0 = +$0;
 $1 = +$1;
 var $$ = 0.0, $$070 = 0.0, $$071$lcssa = 0, $$07194 = 0, $$073$lcssa = 0, $$073100 = 0, $$172$ph = 0, $$174 = 0, $$275$lcssa = 0, $$27586 = 0, $$376$lcssa = 0, $$37683 = 0, $$lcssa = 0, $10 = 0, $100 = 0, $101 = 0, $102 = 0, $103 = 0.0, $104 = 0, $105 = 0;
 var $106 = 0, $107 = 0, $108 = 0, $109 = 0, $11 = 0, $110 = 0, $111 = 0, $112 = 0, $113 = 0, $114 = 0, $115 = 0, $116 = 0, $117 = 0, $118 = 0, $119 = 0, $12 = 0, $120 = 0, $121 = 0, $122 = 0, $123 = 0;
 var $124 = 0, $125 = 0, $126 = 0, $127 = 0, $128 = 0, $129 = 0.0, $13 = 0, $130 = 0, $131 = 0, $132 = 0, $133 = 0, $134 = 0, $135 = 0, $136 = 0, $137 = 0, $138 = 0, $139 = 0, $14 = 0, $140 = 0, $141 = 0;
 var $142 = 0, $143 = 0, $144 = 0, $145 = 0, $146 = 0, $147 = 0, $148 = 0, $149 = 0, $15 = 0, $150 = 0, $151 = 0, $152 = 0, $153 = 0, $154 = 0, $155 = 0.0, $156 = 0, $157 = 0, $158 = 0, $159 = 0, $16 = 0;
 var $160 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0.0, $28 = 0.0, $29 = 0, $3 = 0, $30 = 0, $31 = 0, $32 = 0, $33 = 0;
 var $34 = 0, $35 = 0, $36 = 0, $37 = 0, $38 = 0, $39 = 0.0, $4 = 0, $40 = 0, $41 = 0, $42 = 0, $43 = 0, $44 = 0, $45 = 0, $46 = 0, $47 = 0, $48 = 0, $49 = 0, $5 = 0, $50 = 0, $51 = 0;
 var $52 = 0, $53 = 0, $54 = 0, $55 = 0, $56 = 0, $57 = 0, $58 = 0, $59 = 0, $6 = 0, $60 = 0, $61 = 0, $62 = 0, $63 = 0, $64 = 0, $65 = 0, $66 = 0, $67 = 0, $68 = 0, $69 = 0, $7 = 0;
 var $70 = 0, $71 = 0, $72 = 0, $73 = 0, $74 = 0, $75 = 0, $76 = 0, $77 = 0, $78 = 0, $79 = 0, $8 = 0, $80 = 0, $81 = 0, $82 = 0, $83 = 0, $84 = 0, $85 = 0, $86 = 0, $87 = 0, $88 = 0;
 var $89 = 0, $9 = 0, $90 = 0, $91 = 0, $92 = 0, $93 = 0, $94 = 0, $95 = 0, $96 = 0, $97 = 0, $98 = 0, $99 = 0, $or$cond = 0, label = 0, sp = 0;
 sp = STACKTOP;
 HEAPF64[tempDoublePtr>>3] = $0;$2 = HEAP32[tempDoublePtr>>2]|0;
 $3 = HEAP32[tempDoublePtr+4>>2]|0;
 HEAPF64[tempDoublePtr>>3] = $1;$4 = HEAP32[tempDoublePtr>>2]|0;
 $5 = HEAP32[tempDoublePtr+4>>2]|0;
 $6 = (_bitshift64Lshr(($2|0),($3|0),52)|0);
 $7 = tempRet0;
 $8 = $6 & 2047;
 $9 = (_bitshift64Lshr(($4|0),($5|0),52)|0);
 $10 = tempRet0;
 $11 = $9 & 2047;
 $12 = $3 & -2147483648;
 $13 = (_bitshift64Shl(($4|0),($5|0),1)|0);
 $14 = tempRet0;
 $15 = ($13|0)==(0);
 $16 = ($14|0)==(0);
 $17 = $15 & $16;
 L1: do {
  if ($17) {
   label = 3;
  } else {
   $18 = (___DOUBLE_BITS_272($1)|0);
   $19 = tempRet0;
   $20 = $19 & 2147483647;
   $21 = ($20>>>0)>(2146435072);
   $22 = ($18>>>0)>(0);
   $23 = ($20|0)==(2146435072);
   $24 = $23 & $22;
   $25 = $21 | $24;
   $26 = ($8|0)==(2047);
   $or$cond = $26 | $25;
   if ($or$cond) {
    label = 3;
   } else {
    $29 = (_bitshift64Shl(($2|0),($3|0),1)|0);
    $30 = tempRet0;
    $31 = ($30>>>0)>($14>>>0);
    $32 = ($29>>>0)>($13>>>0);
    $33 = ($30|0)==($14|0);
    $34 = $33 & $32;
    $35 = $31 | $34;
    if (!($35)) {
     $36 = ($29|0)==($13|0);
     $37 = ($30|0)==($14|0);
     $38 = $36 & $37;
     $39 = $0 * 0.0;
     $$ = $38 ? $39 : $0;
     return (+$$);
    }
    $40 = ($8|0)==(0);
    if ($40) {
     $41 = (_bitshift64Shl(($2|0),($3|0),12)|0);
     $42 = tempRet0;
     $43 = ($42|0)>(-1);
     $44 = ($41>>>0)>(4294967295);
     $45 = ($42|0)==(-1);
     $46 = $45 & $44;
     $47 = $43 | $46;
     if ($47) {
      $$073100 = 0;$49 = $41;$50 = $42;
      while(1) {
       $48 = (($$073100) + -1)|0;
       $51 = (_bitshift64Shl(($49|0),($50|0),1)|0);
       $52 = tempRet0;
       $53 = ($52|0)>(-1);
       $54 = ($51>>>0)>(4294967295);
       $55 = ($52|0)==(-1);
       $56 = $55 & $54;
       $57 = $53 | $56;
       if ($57) {
        $$073100 = $48;$49 = $51;$50 = $52;
       } else {
        $$073$lcssa = $48;
        break;
       }
      }
     } else {
      $$073$lcssa = 0;
     }
     $58 = (1 - ($$073$lcssa))|0;
     $59 = (_bitshift64Shl(($2|0),($3|0),($58|0))|0);
     $60 = tempRet0;
     $$174 = $$073$lcssa;$87 = $59;$88 = $60;
    } else {
     $61 = $3 & 1048575;
     $62 = $61 | 1048576;
     $$174 = $8;$87 = $2;$88 = $62;
    }
    $63 = ($11|0)==(0);
    if ($63) {
     $64 = (_bitshift64Shl(($4|0),($5|0),12)|0);
     $65 = tempRet0;
     $66 = ($65|0)>(-1);
     $67 = ($64>>>0)>(4294967295);
     $68 = ($65|0)==(-1);
     $69 = $68 & $67;
     $70 = $66 | $69;
     if ($70) {
      $$07194 = 0;$72 = $64;$73 = $65;
      while(1) {
       $71 = (($$07194) + -1)|0;
       $74 = (_bitshift64Shl(($72|0),($73|0),1)|0);
       $75 = tempRet0;
       $76 = ($75|0)>(-1);
       $77 = ($74>>>0)>(4294967295);
       $78 = ($75|0)==(-1);
       $79 = $78 & $77;
       $80 = $76 | $79;
       if ($80) {
        $$07194 = $71;$72 = $74;$73 = $75;
       } else {
        $$071$lcssa = $71;
        break;
       }
      }
     } else {
      $$071$lcssa = 0;
     }
     $81 = (1 - ($$071$lcssa))|0;
     $82 = (_bitshift64Shl(($4|0),($5|0),($81|0))|0);
     $83 = tempRet0;
     $$172$ph = $$071$lcssa;$89 = $82;$90 = $83;
    } else {
     $84 = $5 & 1048575;
     $85 = $84 | 1048576;
     $$172$ph = $11;$89 = $4;$90 = $85;
    }
    $86 = ($$174|0)>($$172$ph|0);
    $91 = (_i64Subtract(($87|0),($88|0),($89|0),($90|0))|0);
    $92 = tempRet0;
    $93 = ($92|0)>(-1);
    $94 = ($91>>>0)>(4294967295);
    $95 = ($92|0)==(-1);
    $96 = $95 & $94;
    $97 = $93 | $96;
    L23: do {
     if ($86) {
      $$27586 = $$174;$101 = $92;$156 = $97;$157 = $87;$158 = $88;$99 = $91;
      while(1) {
       if ($156) {
        $98 = ($99|0)==(0);
        $100 = ($101|0)==(0);
        $102 = $98 & $100;
        if ($102) {
         break;
        } else {
         $104 = $99;$105 = $101;
        }
       } else {
        $104 = $157;$105 = $158;
       }
       $106 = (_bitshift64Shl(($104|0),($105|0),1)|0);
       $107 = tempRet0;
       $108 = (($$27586) + -1)|0;
       $109 = ($108|0)>($$172$ph|0);
       $110 = (_i64Subtract(($106|0),($107|0),($89|0),($90|0))|0);
       $111 = tempRet0;
       $112 = ($111|0)>(-1);
       $113 = ($110>>>0)>(4294967295);
       $114 = ($111|0)==(-1);
       $115 = $114 & $113;
       $116 = $112 | $115;
       if ($109) {
        $$27586 = $108;$101 = $111;$156 = $116;$157 = $106;$158 = $107;$99 = $110;
       } else {
        $$275$lcssa = $108;$$lcssa = $116;$118 = $110;$120 = $111;$159 = $106;$160 = $107;
        break L23;
       }
      }
      $103 = $0 * 0.0;
      $$070 = $103;
      break L1;
     } else {
      $$275$lcssa = $$174;$$lcssa = $97;$118 = $91;$120 = $92;$159 = $87;$160 = $88;
     }
    } while(0);
    if ($$lcssa) {
     $117 = ($118|0)==(0);
     $119 = ($120|0)==(0);
     $121 = $117 & $119;
     if ($121) {
      $129 = $0 * 0.0;
      $$070 = $129;
      break;
     } else {
      $123 = $120;$125 = $118;
     }
    } else {
     $123 = $160;$125 = $159;
    }
    $122 = ($123>>>0)<(1048576);
    $124 = ($125>>>0)<(0);
    $126 = ($123|0)==(1048576);
    $127 = $126 & $124;
    $128 = $122 | $127;
    if ($128) {
     $$37683 = $$275$lcssa;$130 = $125;$131 = $123;
     while(1) {
      $132 = (_bitshift64Shl(($130|0),($131|0),1)|0);
      $133 = tempRet0;
      $134 = (($$37683) + -1)|0;
      $135 = ($133>>>0)<(1048576);
      $136 = ($132>>>0)<(0);
      $137 = ($133|0)==(1048576);
      $138 = $137 & $136;
      $139 = $135 | $138;
      if ($139) {
       $$37683 = $134;$130 = $132;$131 = $133;
      } else {
       $$376$lcssa = $134;$141 = $132;$142 = $133;
       break;
      }
     }
    } else {
     $$376$lcssa = $$275$lcssa;$141 = $125;$142 = $123;
    }
    $140 = ($$376$lcssa|0)>(0);
    if ($140) {
     $143 = (_i64Add(($141|0),($142|0),0,-1048576)|0);
     $144 = tempRet0;
     $145 = (_bitshift64Shl(($$376$lcssa|0),0,52)|0);
     $146 = tempRet0;
     $147 = $143 | $145;
     $148 = $144 | $146;
     $153 = $148;$154 = $147;
    } else {
     $149 = (1 - ($$376$lcssa))|0;
     $150 = (_bitshift64Lshr(($141|0),($142|0),($149|0))|0);
     $151 = tempRet0;
     $153 = $151;$154 = $150;
    }
    $152 = $153 | $12;
    HEAP32[tempDoublePtr>>2] = $154;HEAP32[tempDoublePtr+4>>2] = $152;$155 = +HEAPF64[tempDoublePtr>>3];
    $$070 = $155;
   }
  }
 } while(0);
 if ((label|0) == 3) {
  $27 = $0 * $1;
  $28 = $27 / $27;
  $$070 = $28;
 }
 return (+$$070);
}
function ___DOUBLE_BITS_272($0) {
 $0 = +$0;
 var $1 = 0, $2 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 HEAPF64[tempDoublePtr>>3] = $0;$1 = HEAP32[tempDoublePtr>>2]|0;
 $2 = HEAP32[tempDoublePtr+4>>2]|0;
 tempRet0 = ($2);
 return ($1|0);
}
function ___ofl_lock() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 ___lock((8572|0));
 return (8580|0);
}
function ___ofl_unlock() {
 var label = 0, sp = 0;
 sp = STACKTOP;
 ___unlock((8572|0));
 return;
}
function _fflush($0) {
 $0 = $0|0;
 var $$0 = 0, $$023 = 0, $$02325 = 0, $$02327 = 0, $$024$lcssa = 0, $$02426 = 0, $$1 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0;
 var $21 = 0, $22 = 0, $23 = 0, $24 = 0, $25 = 0, $26 = 0, $27 = 0, $28 = 0, $29 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0, $9 = 0, $phitmp = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ($0|0)==(0|0);
 do {
  if ($1) {
   $8 = HEAP32[480]|0;
   $9 = ($8|0)==(0|0);
   if ($9) {
    $29 = 0;
   } else {
    $10 = HEAP32[480]|0;
    $11 = (_fflush($10)|0);
    $29 = $11;
   }
   $12 = (___ofl_lock()|0);
   $$02325 = HEAP32[$12>>2]|0;
   $13 = ($$02325|0)==(0|0);
   if ($13) {
    $$024$lcssa = $29;
   } else {
    $$02327 = $$02325;$$02426 = $29;
    while(1) {
     $14 = ((($$02327)) + 76|0);
     $15 = HEAP32[$14>>2]|0;
     $16 = ($15|0)>(-1);
     if ($16) {
      $17 = (___lockfile($$02327)|0);
      $26 = $17;
     } else {
      $26 = 0;
     }
     $18 = ((($$02327)) + 20|0);
     $19 = HEAP32[$18>>2]|0;
     $20 = ((($$02327)) + 28|0);
     $21 = HEAP32[$20>>2]|0;
     $22 = ($19>>>0)>($21>>>0);
     if ($22) {
      $23 = (___fflush_unlocked($$02327)|0);
      $24 = $23 | $$02426;
      $$1 = $24;
     } else {
      $$1 = $$02426;
     }
     $25 = ($26|0)==(0);
     if (!($25)) {
      ___unlockfile($$02327);
     }
     $27 = ((($$02327)) + 56|0);
     $$023 = HEAP32[$27>>2]|0;
     $28 = ($$023|0)==(0|0);
     if ($28) {
      $$024$lcssa = $$1;
      break;
     } else {
      $$02327 = $$023;$$02426 = $$1;
     }
    }
   }
   ___ofl_unlock();
   $$0 = $$024$lcssa;
  } else {
   $2 = ((($0)) + 76|0);
   $3 = HEAP32[$2>>2]|0;
   $4 = ($3|0)>(-1);
   if (!($4)) {
    $5 = (___fflush_unlocked($0)|0);
    $$0 = $5;
    break;
   }
   $6 = (___lockfile($0)|0);
   $phitmp = ($6|0)==(0);
   $7 = (___fflush_unlocked($0)|0);
   if ($phitmp) {
    $$0 = $7;
   } else {
    ___unlockfile($0);
    $$0 = $7;
   }
  }
 } while(0);
 return ($$0|0);
}
function ___fflush_unlocked($0) {
 $0 = $0|0;
 var $$0 = 0, $1 = 0, $10 = 0, $11 = 0, $12 = 0, $13 = 0, $14 = 0, $15 = 0, $16 = 0, $17 = 0, $18 = 0, $19 = 0, $2 = 0, $20 = 0, $3 = 0, $4 = 0, $5 = 0, $6 = 0, $7 = 0, $8 = 0;
 var $9 = 0, label = 0, sp = 0;
 sp = STACKTOP;
 $1 = ((($0)) + 20|0);
 $2 = HEAP32[$1>>2]|0;
 $3 = ((($0)) + 28|0);
 $4 = HEAP32[$3>>2]|0;
 $5 = ($2>>>0)>($4>>>0);
 if ($5) {
  $6 = ((($0)) + 36|0);
  $7 = HEAP32[$6>>2]|0;
  (FUNCTION_TABLE_iiii[$7 & 7]($0,0,0)|0);
  $8 = HEAP32[$1>>2]|0;
  $9 = ($8|0)==(0|0);
  if ($9) {
   $$0 = -1;
  } else {
   label = 3;
  }
 } else {
  label = 3;
 }
 if ((label|0) == 3) {
  $10 = ((($0)) + 4|0);
  $11 = HEAP32[$10>>2]|0;
  $12 = ((($0)) + 8|0);
  $13 = HEAP32[$12>>2]|0;
  $14 = ($11>>>0)<($13>>>0);
  if ($14) {
   $15 = $11;
   $16 = $13;
   $17 = (($15) - ($16))|0;
   $18 = ((($0)) + 40|0);
   $19 = HEAP32[$18>>2]|0;
   (FUNCTION_TABLE_iiii[$19 & 7]($0,$17,1)|0);
  }
  $20 = ((($0)) + 16|0);
  HEAP32[$20>>2] = 0;
  HEAP32[$3>>2] = 0;
  HEAP32[$1>>2] = 0;
  HEAP32[$12>>2] = 0;
  HEAP32[$10>>2] = 0;
  $$0 = 0;
 }
 return ($$0|0);
}
function runPostSets() {
}
function _i64Subtract(a, b, c, d) {
    a = a|0; b = b|0; c = c|0; d = d|0;
    var l = 0, h = 0;
    l = (a - c)>>>0;
    h = (b - d)>>>0;
    h = (b - d - (((c>>>0) > (a>>>0))|0))>>>0; // Borrow one from high word to low word on underflow.
    return ((tempRet0 = h,l|0)|0);
}
function _sbrk(increment) {
    increment = increment|0;
    var oldDynamicTop = 0;
    var oldDynamicTopOnChange = 0;
    var newDynamicTop = 0;
    var totalMemory = 0;
    increment = ((increment + 15) & -16)|0;
    oldDynamicTop = HEAP32[DYNAMICTOP_PTR>>2]|0;
    newDynamicTop = oldDynamicTop + increment | 0;

    if (((increment|0) > 0 & (newDynamicTop|0) < (oldDynamicTop|0)) // Detect and fail if we would wrap around signed 32-bit int.
      | (newDynamicTop|0) < 0) { // Also underflow, sbrk() should be able to be used to subtract.
      abortOnCannotGrowMemory()|0;
      ___setErrNo(12);
      return -1;
    }

    HEAP32[DYNAMICTOP_PTR>>2] = newDynamicTop;
    totalMemory = getTotalMemory()|0;
    if ((newDynamicTop|0) > (totalMemory|0)) {
      if ((enlargeMemory()|0) == 0) {
        HEAP32[DYNAMICTOP_PTR>>2] = oldDynamicTop;
        ___setErrNo(12);
        return -1;
      }
    }
    return oldDynamicTop|0;
}
function _i64Add(a, b, c, d) {
    /*
      x = a + b*2^32
      y = c + d*2^32
      result = l + h*2^32
    */
    a = a|0; b = b|0; c = c|0; d = d|0;
    var l = 0, h = 0;
    l = (a + c)>>>0;
    h = (b + d + (((l>>>0) < (a>>>0))|0))>>>0; // Add carry from low word to high word on overflow.
    return ((tempRet0 = h,l|0)|0);
}
function _memset(ptr, value, num) {
    ptr = ptr|0; value = value|0; num = num|0;
    var end = 0, aligned_end = 0, block_aligned_end = 0, value4 = 0;
    end = (ptr + num)|0;

    value = value & 0xff;
    if ((num|0) >= 67 /* 64 bytes for an unrolled loop + 3 bytes for unaligned head*/) {
      while ((ptr&3) != 0) {
        HEAP8[((ptr)>>0)]=value;
        ptr = (ptr+1)|0;
      }

      aligned_end = (end & -4)|0;
      block_aligned_end = (aligned_end - 64)|0;
      value4 = value | (value << 8) | (value << 16) | (value << 24);

      while((ptr|0) <= (block_aligned_end|0)) {
        HEAP32[((ptr)>>2)]=value4;
        HEAP32[(((ptr)+(4))>>2)]=value4;
        HEAP32[(((ptr)+(8))>>2)]=value4;
        HEAP32[(((ptr)+(12))>>2)]=value4;
        HEAP32[(((ptr)+(16))>>2)]=value4;
        HEAP32[(((ptr)+(20))>>2)]=value4;
        HEAP32[(((ptr)+(24))>>2)]=value4;
        HEAP32[(((ptr)+(28))>>2)]=value4;
        HEAP32[(((ptr)+(32))>>2)]=value4;
        HEAP32[(((ptr)+(36))>>2)]=value4;
        HEAP32[(((ptr)+(40))>>2)]=value4;
        HEAP32[(((ptr)+(44))>>2)]=value4;
        HEAP32[(((ptr)+(48))>>2)]=value4;
        HEAP32[(((ptr)+(52))>>2)]=value4;
        HEAP32[(((ptr)+(56))>>2)]=value4;
        HEAP32[(((ptr)+(60))>>2)]=value4;
        ptr = (ptr + 64)|0;
      }

      while ((ptr|0) < (aligned_end|0) ) {
        HEAP32[((ptr)>>2)]=value4;
        ptr = (ptr+4)|0;
      }
    }
    // The remaining bytes.
    while ((ptr|0) < (end|0)) {
      HEAP8[((ptr)>>0)]=value;
      ptr = (ptr+1)|0;
    }
    return (end-num)|0;
}
function _bitshift64Lshr(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = high >>> bits;
      return (low >>> bits) | ((high&ander) << (32 - bits));
    }
    tempRet0 = 0;
    return (high >>> (bits - 32))|0;
}
function _bitshift64Shl(low, high, bits) {
    low = low|0; high = high|0; bits = bits|0;
    var ander = 0;
    if ((bits|0) < 32) {
      ander = ((1 << bits) - 1)|0;
      tempRet0 = (high << bits) | ((low&(ander << (32 - bits))) >>> (32 - bits));
      return low << bits;
    }
    tempRet0 = low << (bits - 32);
    return 0;
}
function _memcpy(dest, src, num) {
    dest = dest|0; src = src|0; num = num|0;
    var ret = 0;
    var aligned_dest_end = 0;
    var block_aligned_dest_end = 0;
    var dest_end = 0;
    // Test against a benchmarked cutoff limit for when HEAPU8.set() becomes faster to use.
    if ((num|0) >=
      8192
    ) {
      return _emscripten_memcpy_big(dest|0, src|0, num|0)|0;
    }

    ret = dest|0;
    dest_end = (dest + num)|0;
    if ((dest&3) == (src&3)) {
      // The initial unaligned < 4-byte front.
      while (dest & 3) {
        if ((num|0) == 0) return ret|0;
        HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
        dest = (dest+1)|0;
        src = (src+1)|0;
        num = (num-1)|0;
      }
      aligned_dest_end = (dest_end & -4)|0;
      block_aligned_dest_end = (aligned_dest_end - 64)|0;
      while ((dest|0) <= (block_aligned_dest_end|0) ) {
        HEAP32[((dest)>>2)]=((HEAP32[((src)>>2)])|0);
        HEAP32[(((dest)+(4))>>2)]=((HEAP32[(((src)+(4))>>2)])|0);
        HEAP32[(((dest)+(8))>>2)]=((HEAP32[(((src)+(8))>>2)])|0);
        HEAP32[(((dest)+(12))>>2)]=((HEAP32[(((src)+(12))>>2)])|0);
        HEAP32[(((dest)+(16))>>2)]=((HEAP32[(((src)+(16))>>2)])|0);
        HEAP32[(((dest)+(20))>>2)]=((HEAP32[(((src)+(20))>>2)])|0);
        HEAP32[(((dest)+(24))>>2)]=((HEAP32[(((src)+(24))>>2)])|0);
        HEAP32[(((dest)+(28))>>2)]=((HEAP32[(((src)+(28))>>2)])|0);
        HEAP32[(((dest)+(32))>>2)]=((HEAP32[(((src)+(32))>>2)])|0);
        HEAP32[(((dest)+(36))>>2)]=((HEAP32[(((src)+(36))>>2)])|0);
        HEAP32[(((dest)+(40))>>2)]=((HEAP32[(((src)+(40))>>2)])|0);
        HEAP32[(((dest)+(44))>>2)]=((HEAP32[(((src)+(44))>>2)])|0);
        HEAP32[(((dest)+(48))>>2)]=((HEAP32[(((src)+(48))>>2)])|0);
        HEAP32[(((dest)+(52))>>2)]=((HEAP32[(((src)+(52))>>2)])|0);
        HEAP32[(((dest)+(56))>>2)]=((HEAP32[(((src)+(56))>>2)])|0);
        HEAP32[(((dest)+(60))>>2)]=((HEAP32[(((src)+(60))>>2)])|0);
        dest = (dest+64)|0;
        src = (src+64)|0;
      }
      while ((dest|0) < (aligned_dest_end|0) ) {
        HEAP32[((dest)>>2)]=((HEAP32[((src)>>2)])|0);
        dest = (dest+4)|0;
        src = (src+4)|0;
      }
    } else {
      // In the unaligned copy case, unroll a bit as well.
      aligned_dest_end = (dest_end - 4)|0;
      while ((dest|0) < (aligned_dest_end|0) ) {
        HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
        HEAP8[(((dest)+(1))>>0)]=((HEAP8[(((src)+(1))>>0)])|0);
        HEAP8[(((dest)+(2))>>0)]=((HEAP8[(((src)+(2))>>0)])|0);
        HEAP8[(((dest)+(3))>>0)]=((HEAP8[(((src)+(3))>>0)])|0);
        dest = (dest+4)|0;
        src = (src+4)|0;
      }
    }
    // The remaining unaligned < 4 byte tail.
    while ((dest|0) < (dest_end|0)) {
      HEAP8[((dest)>>0)]=((HEAP8[((src)>>0)])|0);
      dest = (dest+1)|0;
      src = (src+1)|0;
    }
    return ret|0;
}

  
function dynCall_ii(index,a1) {
  index = index|0;
  a1=a1|0;
  return FUNCTION_TABLE_ii[index&1](a1|0)|0;
}


function dynCall_iiii(index,a1,a2,a3) {
  index = index|0;
  a1=a1|0; a2=a2|0; a3=a3|0;
  return FUNCTION_TABLE_iiii[index&7](a1|0,a2|0,a3|0)|0;
}

function b0(p0) {
 p0 = p0|0; nullFunc_ii(0);return 0;
}
function b1(p0,p1,p2) {
 p0 = p0|0;p1 = p1|0;p2 = p2|0; nullFunc_iiii(1);return 0;
}

// EMSCRIPTEN_END_FUNCS
var FUNCTION_TABLE_ii = [b0,___stdio_close];
var FUNCTION_TABLE_iiii = [b1,b1,___stdout_write,___stdio_seek,___stdio_write,b1,b1,b1];

  return { _i64Subtract: _i64Subtract, setThrew: setThrew, _bitshift64Lshr: _bitshift64Lshr, _bitshift64Shl: _bitshift64Shl, _fflush: _fflush, ___errno_location: ___errno_location, _memset: _memset, _sbrk: _sbrk, _memcpy: _memcpy, _BeatTrack_tempo: _BeatTrack_tempo, stackAlloc: stackAlloc, _BeatTrack_Ctor: _BeatTrack_Ctor, getTempRet0: getTempRet0, setTempRet0: setTempRet0, _BeatTrack_Dtor: _BeatTrack_Dtor, _i64Add: _i64Add, dynCall_iiii: dynCall_iiii, _BeatTrack_samplestonextbeat: _BeatTrack_samplestonextbeat, stackRestore: stackRestore, dynCall_ii: dynCall_ii, _BeatTrack_next: _BeatTrack_next, _BeatTrack_phase: _BeatTrack_phase, stackSave: stackSave, _free: _free, runPostSets: runPostSets, establishStackSpace: establishStackSpace, _emscripten_get_global_libc: _emscripten_get_global_libc, _malloc: _malloc };
})
// EMSCRIPTEN_END_ASM
(Module.asmGlobalArg, Module.asmLibraryArg, buffer);

var real_getTempRet0 = asm["getTempRet0"]; asm["getTempRet0"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_getTempRet0.apply(null, arguments);
};

var real_setThrew = asm["setThrew"]; asm["setThrew"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_setThrew.apply(null, arguments);
};

var real__bitshift64Lshr = asm["_bitshift64Lshr"]; asm["_bitshift64Lshr"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__bitshift64Lshr.apply(null, arguments);
};

var real__bitshift64Shl = asm["_bitshift64Shl"]; asm["_bitshift64Shl"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__bitshift64Shl.apply(null, arguments);
};

var real__fflush = asm["_fflush"]; asm["_fflush"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__fflush.apply(null, arguments);
};

var real____errno_location = asm["___errno_location"]; asm["___errno_location"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real____errno_location.apply(null, arguments);
};

var real__sbrk = asm["_sbrk"]; asm["_sbrk"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__sbrk.apply(null, arguments);
};

var real__BeatTrack_tempo = asm["_BeatTrack_tempo"]; asm["_BeatTrack_tempo"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__BeatTrack_tempo.apply(null, arguments);
};

var real_stackAlloc = asm["stackAlloc"]; asm["stackAlloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_stackAlloc.apply(null, arguments);
};

var real__BeatTrack_Ctor = asm["_BeatTrack_Ctor"]; asm["_BeatTrack_Ctor"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__BeatTrack_Ctor.apply(null, arguments);
};

var real__i64Subtract = asm["_i64Subtract"]; asm["_i64Subtract"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__i64Subtract.apply(null, arguments);
};

var real_setTempRet0 = asm["setTempRet0"]; asm["setTempRet0"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_setTempRet0.apply(null, arguments);
};

var real__BeatTrack_Dtor = asm["_BeatTrack_Dtor"]; asm["_BeatTrack_Dtor"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__BeatTrack_Dtor.apply(null, arguments);
};

var real__i64Add = asm["_i64Add"]; asm["_i64Add"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__i64Add.apply(null, arguments);
};

var real__BeatTrack_samplestonextbeat = asm["_BeatTrack_samplestonextbeat"]; asm["_BeatTrack_samplestonextbeat"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__BeatTrack_samplestonextbeat.apply(null, arguments);
};

var real_stackRestore = asm["stackRestore"]; asm["stackRestore"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_stackRestore.apply(null, arguments);
};

var real__BeatTrack_next = asm["_BeatTrack_next"]; asm["_BeatTrack_next"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__BeatTrack_next.apply(null, arguments);
};

var real__BeatTrack_phase = asm["_BeatTrack_phase"]; asm["_BeatTrack_phase"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__BeatTrack_phase.apply(null, arguments);
};

var real_stackSave = asm["stackSave"]; asm["stackSave"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_stackSave.apply(null, arguments);
};

var real__free = asm["_free"]; asm["_free"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__free.apply(null, arguments);
};

var real_establishStackSpace = asm["establishStackSpace"]; asm["establishStackSpace"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real_establishStackSpace.apply(null, arguments);
};

var real__emscripten_get_global_libc = asm["_emscripten_get_global_libc"]; asm["_emscripten_get_global_libc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__emscripten_get_global_libc.apply(null, arguments);
};

var real__malloc = asm["_malloc"]; asm["_malloc"] = function() {
  assert(runtimeInitialized, 'you need to wait for the runtime to be ready (e.g. wait for main() to be called)');
  assert(!runtimeExited, 'the runtime was exited (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
  return real__malloc.apply(null, arguments);
};
var getTempRet0 = Module["getTempRet0"] = asm["getTempRet0"];
var setThrew = Module["setThrew"] = asm["setThrew"];
var _bitshift64Lshr = Module["_bitshift64Lshr"] = asm["_bitshift64Lshr"];
var _bitshift64Shl = Module["_bitshift64Shl"] = asm["_bitshift64Shl"];
var _fflush = Module["_fflush"] = asm["_fflush"];
var ___errno_location = Module["___errno_location"] = asm["___errno_location"];
var _memset = Module["_memset"] = asm["_memset"];
var _sbrk = Module["_sbrk"] = asm["_sbrk"];
var _memcpy = Module["_memcpy"] = asm["_memcpy"];
var _BeatTrack_tempo = Module["_BeatTrack_tempo"] = asm["_BeatTrack_tempo"];
var stackAlloc = Module["stackAlloc"] = asm["stackAlloc"];
var _BeatTrack_Ctor = Module["_BeatTrack_Ctor"] = asm["_BeatTrack_Ctor"];
var _i64Subtract = Module["_i64Subtract"] = asm["_i64Subtract"];
var setTempRet0 = Module["setTempRet0"] = asm["setTempRet0"];
var _BeatTrack_Dtor = Module["_BeatTrack_Dtor"] = asm["_BeatTrack_Dtor"];
var _i64Add = Module["_i64Add"] = asm["_i64Add"];
var _BeatTrack_samplestonextbeat = Module["_BeatTrack_samplestonextbeat"] = asm["_BeatTrack_samplestonextbeat"];
var stackRestore = Module["stackRestore"] = asm["stackRestore"];
var _BeatTrack_next = Module["_BeatTrack_next"] = asm["_BeatTrack_next"];
var _BeatTrack_phase = Module["_BeatTrack_phase"] = asm["_BeatTrack_phase"];
var stackSave = Module["stackSave"] = asm["stackSave"];
var _free = Module["_free"] = asm["_free"];
var runPostSets = Module["runPostSets"] = asm["runPostSets"];
var establishStackSpace = Module["establishStackSpace"] = asm["establishStackSpace"];
var _emscripten_get_global_libc = Module["_emscripten_get_global_libc"] = asm["_emscripten_get_global_libc"];
var _malloc = Module["_malloc"] = asm["_malloc"];
var dynCall_ii = Module["dynCall_ii"] = asm["dynCall_ii"];
var dynCall_iiii = Module["dynCall_iiii"] = asm["dynCall_iiii"];
;
Runtime.stackAlloc = Module['stackAlloc'];
Runtime.stackSave = Module['stackSave'];
Runtime.stackRestore = Module['stackRestore'];
Runtime.establishStackSpace = Module['establishStackSpace'];
Runtime.setTempRet0 = Module['setTempRet0'];
Runtime.getTempRet0 = Module['getTempRet0'];


// === Auto-generated postamble setup entry stuff ===

Module['asm'] = asm;






/**
 * @constructor
 * @extends {Error}
 */
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
};
ExitStatus.prototype = new Error();
ExitStatus.prototype.constructor = ExitStatus;

var initialStackTop;
var preloadStartTime = null;
var calledMain = false;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!Module['calledRun']) run();
  if (!Module['calledRun']) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
}

Module['callMain'] = Module.callMain = function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on __ATMAIN__)');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  args = args || [];

  ensureInitRuntime();

  var argc = args.length+1;
  function pad() {
    for (var i = 0; i < 4-1; i++) {
      argv.push(0);
    }
  }
  var argv = [allocate(intArrayFromString(Module['thisProgram']), 'i8', ALLOC_NORMAL) ];
  pad();
  for (var i = 0; i < argc-1; i = i + 1) {
    argv.push(allocate(intArrayFromString(args[i]), 'i8', ALLOC_NORMAL));
    pad();
  }
  argv.push(0);
  argv = allocate(argv, 'i32', ALLOC_NORMAL);


  try {

    var ret = Module['_main'](argc, argv, 0);


    // if we're not running an evented main loop, it's time to exit
    exit(ret, /* implicit = */ true);
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'SimulateInfiniteLoop') {
      // running an evented main loop, don't immediately exit
      Module['noExitRuntime'] = true;
      return;
    } else {
      var toLog = e;
      if (e && typeof e === 'object' && e.stack) {
        toLog = [e, e.stack];
      }
      Module.printErr('exception thrown: ' + toLog);
      Module['quit'](1, e);
    }
  } finally {
    calledMain = true;
  }
}




/** @type {function(Array=)} */
function run(args) {
  args = args || Module['arguments'];

  if (preloadStartTime === null) preloadStartTime = Date.now();

  if (runDependencies > 0) {
    return;
  }

  writeStackCookie();

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later
  if (Module['calledRun']) return; // run may have just been called through dependencies being fulfilled just in this very frame

  function doRun() {
    if (Module['calledRun']) return; // run may have just been called while the async setStatus time below was happening
    Module['calledRun'] = true;

    if (ABORT) return;

    ensureInitRuntime();

    preMain();

    if (ENVIRONMENT_IS_WEB && preloadStartTime !== null) {
      Module.printErr('pre-main prep time: ' + (Date.now() - preloadStartTime) + ' ms');
    }

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    if (Module['_main'] && shouldRunNow) Module['callMain'](args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else {
    doRun();
  }
  checkStackCookie();
}
Module['run'] = Module.run = run;

function exit(status, implicit) {
  if (implicit && Module['noExitRuntime']) {
    Module.printErr('exit(' + status + ') implicitly called by end of main(), but noExitRuntime, so not exiting the runtime (you can use emscripten_force_exit, if you want to force a true shutdown)');
    return;
  }

  if (Module['noExitRuntime']) {
    Module.printErr('exit(' + status + ') called, but noExitRuntime, so halting execution but not exiting the runtime or preventing further async execution (you can use emscripten_force_exit, if you want to force a true shutdown)');
  } else {

    ABORT = true;
    EXITSTATUS = status;
    STACKTOP = initialStackTop;

    exitRuntime();

    if (Module['onExit']) Module['onExit'](status);
  }

  if (ENVIRONMENT_IS_NODE) {
    process['exit'](status);
  }
  Module['quit'](status, new ExitStatus(status));
}
Module['exit'] = Module.exit = exit;

var abortDecorators = [];

function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what);
  }

  if (what !== undefined) {
    Module.print(what);
    Module.printErr(what);
    what = JSON.stringify(what)
  } else {
    what = '';
  }

  ABORT = true;
  EXITSTATUS = 1;

  var extra = '';

  var output = 'abort(' + what + ') at ' + stackTrace() + extra;
  if (abortDecorators) {
    abortDecorators.forEach(function(decorator) {
      output = decorator(output, what);
    });
  }
  throw output;
}
Module['abort'] = Module.abort = abort;

// {{PRE_RUN_ADDITIONS}}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;
if (Module['noInitialRun']) {
  shouldRunNow = false;
}


run();

// {{POST_RUN_ADDITIONS}}





// {{MODULE_ADDITIONS}}


    
    
    return BeatTrackModule;
};
if (typeof module === "object" && module.exports) {
    module['exports'] = BeatTrackModule;
};

//Nick Collins audio beat tracking algorithm adapted from my SuperCollider BeatTrack code, itself derived from Matthew Davies beat tracker research


function MMLLBeatTracker(sampleRate) {

    this.fftsize = 1024;
    
    var beatTrackModule = BeatTrackModule({});

    this.beattrackfunction = beatTrackModule.cwrap('BeatTrack_next',
                                         'number', // Function return void
                                         // Integers, Floating point numbers and pointers all
                                         // are considered 'number'
                                         ['number','number']
                                         );
    
    this.destructorfunction = beatTrackModule.cwrap('BeatTrack_Dtor',
                                          null, // Function return void
                                          [] //no arguments
                                          );
    
    
    //BeatTrack_samplestonextbeat
    this.samplestonextbeat = beatTrackModule.cwrap('BeatTrack_samplestonextbeat',
                                       'number', // Function return void
                                       [] //no arguments
                                       );
    
    this.tempo = beatTrackModule.cwrap('BeatTrack_tempo',
                                                    'number', // Function return void
                                                    [] //no arguments
                                                    );
    this.phase = beatTrackModule.cwrap('BeatTrack_phase',
                                       'number', // Function return void
                                       [] //no arguments
                                       );
    
    // Allocate array memory (sizeof double = 8) and
    // get a pointer to it
    this.parr = beatTrackModule._malloc(this.fftsize*8);
    
    // Populate the array
    // We create Float64Array in javascript code and map it to
    // the pointer that we received above. We can then populate
    // the array with values we want to pass as input
    this.arr = new Float64Array(beatTrackModule.HEAPF64.buffer, this.parr, this.fftsize);

    //to hold interleaved real and imag fft calculation results
    this.fftoutput = new Float64Array(this.fftsize);
    
    
    //if sample rate is 88200 or 96000, assume taking double size FFT to start with
	if(this.m_srate >= (44100*2)) {
        
        //presume double size function withfft(powers){}
        this.stft = new MMLLSTFT(this.fftsize * 2,this.fftsize,0);
        
        this.m_srate = this.m_srate/2;
    } else {
        
        this.stft = new MMLLSTFT(this.fftsize,this.fftsize /2 ,0); //0 = rectangular (no) window
        
    }
    
    beatTrackModule.ccall('BeatTrack_Ctor',
                 null, // Function return void
                 // Integers, Floating point numbers and pointers all
                 // are considered 'number'
                 ['number','number'],
                 [sampleRate,this.fftsize / 2]
                 );

 
//must pass in fft data (not power spectrum, need actual fft bins here)
this.next = function(input,audioblocksize) {

    var i,j;
 
    var ready = this.stft.next(input);
    
    var beat = 0;
    
    if(ready) {
       
        var fftdata = this.stft.output;

        var fftoutput = this.fftoutput;
        
        //power spectrum not amps, for QMUL complex onset detection algorithm
        for (var k = 0; k < this.fftsize / 2; ++k) {

            var index = 2*k;
            
            fftoutput[index] = fftdata[index];
            fftoutput[index+1] = fftdata[index+1];
            
        }

        this.arr.set(fftoutput);
        
    //this.arr.set(this.stft.output); //can't go direct, output size is 1026 and target needs 1024
    
        //n, fftdata first argument not really used
    beat = this.beattrackfunction(this.fftsize,this.parr);
        
    }
    
    return beat;
    
  }


}


//onset detection function as used in MMLLOnsetDetector
//assumes sampling rate 44.1kHz


function MMLLBeatTrackerFastReact(sampleRate,threshold=0.34) {
    
    //helpful constants

    //assumes fixed sampling rate
    //FFT data
    this.N = 1024
    this.NOVER2 = 512

    this.NUMERBBANDS = 40;
    this.PASTERBBANDS = 3;
    //3 usually, but time resolution improved if made 1?
    
    //in FFT frames
    //this.MAXEVENTDUR 80;
    this.MINEVENTDUR = 3;
    //4 or maybe 2
    
    //7 frames is about 40 mS
    //peak picker will use 3 back, 3 forward
    this.DFFRAMESSTORED = 7;

	//loudness measure
	this.m_loudbands = new Array(this.NUMERBBANDS); //[NUMERBBANDS][PASTERBBANDS]; //stores previous loudness bands
	//var m_pasterbbandcounter;
    this.m_df = new Float64Array(this.DFFRAMESSTORED);
	//this.m_dfcounter;
	
	//recording state
	//this.m_onsetdetected;

//[43]
this.eqlbandbins = [1,2,3,4,5,6,7,8,9,11,13,15,17,19,22,25,28,32,36,41,46,52,58,65,73,82,92,103,116,129,144,161,180,201,225,251,280,312,348,388,433,483,513];
//[42]
    //last entry was 30, corrected to 29 to avoid grabbing nyquist value, only half fftsize bins actually calculated for power
    //safe anyway since only 40 ERB bands used
this.eqlbandsizes = [1,1,1,1,1,1,1,1,2,2,2,2,2,3,3,3,4,4,5,5,6,6,7,8,9,10,11,13,13,15,17,19,21,24,26,29,32,36,40,45,50,29];

//[42][11]
this.contours = [[ 47.88, 59.68, 68.55, 75.48, 81.71, 87.54, 93.24, 98.84,104.44,109.94,115.31],[ 29.04, 41.78, 51.98, 60.18, 67.51, 74.54, 81.34, 87.97, 94.61,101.21,107.74],[ 20.72, 32.83, 43.44, 52.18, 60.24, 67.89, 75.34, 82.70, 89.97, 97.23,104.49],[ 15.87, 27.14, 37.84, 46.94, 55.44, 63.57, 71.51, 79.34, 87.14, 94.97,102.37],[ 12.64, 23.24, 33.91, 43.27, 52.07, 60.57, 68.87, 77.10, 85.24, 93.44,100.90],[ 10.31, 20.43, 31.03, 40.54, 49.59, 58.33, 66.89, 75.43, 83.89, 92.34,100.80],[  8.51, 18.23, 28.83, 38.41, 47.65, 56.59, 65.42, 74.16, 82.89, 91.61,100.33],[  7.14, 16.55, 27.11, 36.79, 46.16, 55.27, 64.29, 73.24, 82.15, 91.06, 99.97],[  5.52, 14.58, 25.07, 34.88, 44.40, 53.73, 62.95, 72.18, 81.31, 90.44, 99.57],[  3.98, 12.69, 23.10, 32.99, 42.69, 52.27, 61.66, 71.15, 80.54, 89.93, 99.31],[  2.99, 11.43, 21.76, 31.73, 41.49, 51.22, 60.88, 70.51, 80.11, 89.70, 99.30],[  2.35, 10.58, 20.83, 30.86, 40.68, 50.51, 60.33, 70.08, 79.83, 89.58, 99.32],[  2.05, 10.12, 20.27, 30.35, 40.22, 50.10, 59.97, 69.82, 79.67, 89.52, 99.38],[  2.00,  9.93, 20.00, 30.07, 40.00, 49.93, 59.87, 69.80, 79.73, 89.67, 99.60],[  2.19, 10.00, 20.00, 30.00, 40.00, 50.00, 59.99, 69.99, 79.98, 89.98, 99.97],[  2.71, 10.56, 20.61, 30.71, 40.76, 50.81, 60.86, 70.96, 81.01, 91.06,101.17],[  3.11, 11.05, 21.19, 31.41, 41.53, 51.64, 61.75, 71.95, 82.05, 92.15,102.33],[  2.39, 10.69, 21.14, 31.52, 41.73, 51.95, 62.11, 72.31, 82.46, 92.56,102.59],[  1.50, 10.11, 20.82, 31.32, 41.62, 51.92, 62.12, 72.32, 82.52, 92.63,102.56],[ -0.17,  8.50, 19.27, 29.77, 40.07, 50.37, 60.57, 70.77, 80.97, 91.13,101.23],[ -1.80,  6.96, 17.77, 28.29, 38.61, 48.91, 59.13, 69.33, 79.53, 89.71, 99.86],[ -3.42,  5.49, 16.36, 26.94, 37.31, 47.61, 57.88, 68.08, 78.28, 88.41, 98.39],[ -4.73,  4.38, 15.34, 25.99, 36.39, 46.71, 57.01, 67.21, 77.41, 87.51, 97.41],[ -5.73,  3.63, 14.74, 25.48, 35.88, 46.26, 56.56, 66.76, 76.96, 87.06, 96.96],[ -6.24,  3.33, 14.59, 25.39, 35.84, 46.22, 56.52, 66.72, 76.92, 87.04, 97.00],[ -6.09,  3.62, 15.03, 25.83, 36.37, 46.70, 57.00, 67.20, 77.40, 87.57, 97.68],[ -5.32,  4.44, 15.90, 26.70, 37.28, 47.60, 57.90, 68.10, 78.30, 88.52, 98.78],[ -3.49,  6.17, 17.52, 28.32, 38.85, 49.22, 59.52, 69.72, 79.92, 90.20,100.61],[ -0.81,  8.58, 19.73, 30.44, 40.90, 51.24, 61.52, 71.69, 81.87, 92.15,102.63],[  2.91, 11.82, 22.64, 33.17, 43.53, 53.73, 63.96, 74.09, 84.22, 94.45,104.89],[  6.68, 15.19, 25.71, 36.03, 46.25, 56.31, 66.45, 76.49, 86.54, 96.72,107.15],[ 10.43, 18.65, 28.94, 39.02, 49.01, 58.98, 68.93, 78.78, 88.69, 98.83,109.36],[ 13.56, 21.65, 31.78, 41.68, 51.45, 61.31, 71.07, 80.73, 90.48,100.51,111.01],[ 14.36, 22.91, 33.19, 43.09, 52.71, 62.37, 71.92, 81.38, 90.88,100.56,110.56],[ 15.06, 23.90, 34.23, 44.05, 53.48, 62.90, 72.21, 81.43, 90.65, 99.93,109.34],[ 15.36, 23.90, 33.89, 43.31, 52.40, 61.42, 70.29, 79.18, 88.00, 96.69,105.17],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70],[ 15.60, 23.90, 33.60, 42.70, 51.50, 60.20, 68.70, 77.30, 85.80, 94.00,101.70]];
//[11]
this.phons = [2,10,20,30,40,50,60,70,80,90,100];

//empirically determined default value
this.threshold = threshold;

    
//beat tracking code
    
    this.numperiods_ = 100;
    this.numpreviousvalues_= 350;
    this.storepos_ = 0;
    this.store_ = new Array(this.numpreviousvalues_);
    this.crosscomby_ = new Array(this.numperiods_);
	
    this.calcperiod_ = 86;
    this.calccounter_ = 0;
    this.amortcounter_ = 0;
    
    this.halftrigdone_= 0;
    this.quartertrigdone_= 0;
    this.threequarterstrigdone_= 0;
    
    var i; //reusable loop counter
    
    for (i=0; i<this.numpreviousvalues_; ++i)
        this.store_[i] = 0.0;
    
    for (i=0; i<this.numperiods_; ++i)
        this.crosscomby_[i] = 0.0;
    
    this.trigger_ = 0;
    
    this.prevbestperiod_ = 50;
    //this.prevbestphase_ = 0;
    this.period_= 50.0;
    this.periodi_ = -1;
    this.phase_ = 0.0;
    this.phasechange_ = 0.0;
    this.periodinsamples_ = 512* this.period_;
    this.phasenowinsamples_= 0;
    this.lastphaseestimate_= 0;
    this.lastperiodestimate_= 50.0;
    
    
    
    //assumes 512 hop size, [100]
    this.g_periods = [ 57.421875, 56.84765625, 56.284808168317, 55.732996323529, 55.191899271845, 54.661207932692, 54.140625, 53.629864386792, 53.128650700935, 52.63671875, 52.153813073394, 51.6796875, 51.21410472973, 50.7568359375, 50.30766039823, 49.866365131579, 49.432744565217, 49.006600215517, 48.587740384615, 48.175979872881, 47.771139705882, 47.373046875, 46.981534090909, 46.59643954918, 46.217606707317, 45.844884072581, 45.478125, 45.1171875, 44.761934055118, 44.412231445313, 44.067950581395, 43.728966346154, 43.395157442748, 43.06640625, 42.742598684211, 42.423624067164, 42.109375, 41.799747242647, 41.49463959854, 41.193953804348, 40.89759442446, 40.60546875, 40.317486702128, 40.033560739437, 39.753605769231, 39.4775390625, 39.205280172414, 38.936750856164, 38.671875, 38.410578547297, 38.15278942953, 37.8984375, 37.647454470199, 37.399773848684, 37.155330882353, 36.9140625, 36.675907258065, 36.440805288462, 36.208698248408, 35.979529272152, 35.753242924528, 35.52978515625, 35.30910326087, 35.091145833333, 34.875862730061, 34.663205030488, 34.453125, 34.245576054217, 34.040512724551, 33.837890625, 33.637666420118, 33.439797794118, 33.244243421053, 33.050962936047, 32.859916907514, 32.671066810345, 32.484375, 32.2998046875, 32.117319915254, 31.936885533708, 31.758467178771, 31.58203125, 31.407544889503, 31.234975961538, 31.064293032787, 30.895465353261, 30.728462837838, 30.563256048387, 30.399816176471, 30.238115026596, 30.078125, 29.919819078947, 29.763170811518, 29.608154296875, 29.454744170984, 29.302915592784, 29.152644230769, 29.00390625, 28.856678299492, 28.7109375 ];
    //int g_periodsnext[100] =[ 57, 56, 56, 55, 55, 54, 54, 53, 53, 52, 52, 51, 51, 50, 50, 49, 49, 49, 48, 48, 47, 47, 46, 46, 46, 45, 45, 45, 44, 44, 44, 43, 43, 43, 42, 42, 42, 41, 41, 41, 40, 40, 40, 40, 39, 39, 39, 38, 38, 38, 38, 37, 37, 37, 37, 36, 36, 36, 36, 35, 35, 35, 35, 35, 34, 34, 34, 34, 34, 33, 33, 33, 33, 33, 32, 32, 32, 32, 32, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 29, 29, 29, 29, 29, 29, 29, 28, 28 ];
    [100]
    this.g_periodsprev = [ 58, 57, 57, 56, 56, 55, 55, 54, 54, 53, 53, 52, 52, 51, 51, 50, 50, 50, 49, 49, 48, 48, 47, 47, 47, 46, 46, 46, 45, 45, 45, 44, 44, 44, 43, 43, 43, 42, 42, 42, 41, 41, 41, 41, 40, 40, 40, 39, 39, 39, 39, 38, 38, 38, 38, 37, 37, 37, 37, 36, 36, 36, 36, 36, 35, 35, 35, 35, 35, 34, 34, 34, 34, 34, 33, 33, 33, 33, 33, 32, 32, 32, 32, 32, 32, 31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 30, 30, 29, 29 ];
    
    //[100]
    this.g_periods1minusinterp = [ 0.421875, 0.84765625, 0.28480816831684, 0.73299632352941, 0.19189927184466, 0.66120793269231, 0.140625, 0.62986438679246, 0.12865070093459, 0.63671875000001, 0.1538130733945, 0.67968750000001, 0.21410472972973, 0.7568359375, 0.30766039823009, 0.86636513157895, 0.43274456521739, 0.0066002155172455, 0.58774038461539, 0.17597987288136, 0.77113970588236, 0.37304687500001, 0.98153409090909, 0.59643954918033, 0.21760670731709, 0.84488407258065, 0.47812500000001, 0.11718750000001, 0.76193405511812, 0.41223144531251, 0.067950581395358, 0.72896634615385, 0.39515744274809, 0.066406250000007, 0.74259868421054, 0.42362406716418, 0.10937500000001, 0.79974724264707, 0.49463959854016, 0.19395380434784, 0.89759442446044, 0.60546875000001, 0.31748670212767, 0.033560739436631, 0.75360576923078, 0.47753906250001, 0.20528017241381, 0.93675085616439, 0.67187500000001, 0.41057854729731, 0.15278942953022, 0.89843750000001, 0.64745447019869, 0.39977384868422, 0.15533088235295, 0.91406250000001, 0.67590725806453, 0.44080528846155, 0.20869824840766, 0.97952927215191, 0.75324292452832, 0.52978515625001, 0.30910326086958, 0.091145833333343, 0.87586273006136, 0.66320503048782, 0.45312500000001, 0.24557605421688, 0.040512724550908, 0.83789062500001, 0.63766642011836, 0.43979779411766, 0.24424342105264, 0.050962936046524, 0.85991690751446, 0.67106681034484, 0.48437500000001, 0.29980468750001, 0.11731991525425, 0.93688553370788, 0.75846717877096, 0.58203125000001, 0.40754488950277, 0.23497596153847, 0.064293032786896, 0.89546535326088, 0.72846283783785, 0.56325604838711, 0.3998161764706, 0.23811502659576, 0.078125000000014, 0.91981907894738, 0.76317081151834, 0.60815429687501, 0.45474417098447, 0.30291559278352, 0.15264423076924, 0.0039062500000142, 0.8566782994924, 0.71093750000001 ];
    
    //[100]
    this.g_periodsinterp = [ 0.578125, 0.15234375, 0.71519183168316, 0.26700367647059, 0.80810072815534, 0.33879206730769, 0.859375, 0.37013561320754, 0.87134929906541, 0.36328124999999, 0.8461869266055, 0.32031249999999, 0.78589527027027, 0.2431640625, 0.69233960176991, 0.13363486842105, 0.56725543478261, 0.99339978448275, 0.41225961538461, 0.82402012711864, 0.22886029411764, 0.62695312499999, 0.018465909090907, 0.40356045081967, 0.78239329268291, 0.15511592741935, 0.52187499999999, 0.88281249999999, 0.23806594488188, 0.58776855468749, 0.93204941860464, 0.27103365384615, 0.60484255725191, 0.93359374999999, 0.25740131578946, 0.57637593283582, 0.89062499999999, 0.20025275735293, 0.50536040145984, 0.80604619565216, 0.10240557553956, 0.39453124999999, 0.68251329787233, 0.96643926056337, 0.24639423076922, 0.52246093749999, 0.79471982758619, 0.063249143835606, 0.32812499999999, 0.58942145270269, 0.84721057046978, 0.10156249999999, 0.35254552980131, 0.60022615131578, 0.84466911764705, 0.085937499999986, 0.32409274193547, 0.55919471153845, 0.79130175159234, 0.020470727848092, 0.24675707547168, 0.47021484374999, 0.69089673913042, 0.90885416666666, 0.12413726993864, 0.33679496951218, 0.54687499999999, 0.75442394578312, 0.95948727544909, 0.16210937499999, 0.36233357988164, 0.56020220588234, 0.75575657894736, 0.94903706395348, 0.14008309248554, 0.32893318965516, 0.51562499999999, 0.70019531249999, 0.88268008474575, 0.063114466292124, 0.24153282122904, 0.41796874999999, 0.59245511049723, 0.76502403846153, 0.9357069672131, 0.10453464673912, 0.27153716216215, 0.43674395161289, 0.6001838235294, 0.76188497340424, 0.92187499999999, 0.080180921052619, 0.23682918848166, 0.39184570312499, 0.54525582901553, 0.69708440721648, 0.84735576923076, 0.99609374999999, 0.1433217005076, 0.28906249999999 ];
    

    
  

this.setup = function(sampleRate) {
	var i,j;
	
	
	////////time positions//////////
    //frames were in 64 sample blocks... no longer, now 512/64 = 8
	this.m_frame=0;
	this.m_lastdetect=-100;
    
    if(sampleRate >= (44100*2)) {
        
        this.stft = new MMLLSTFT(this.N * 2,this.NOVER2 * 2,1); // 1 = Hanning window
        
    } else {
        
        this.stft = new MMLLSTFT(this.N,this.NOVER2,1);
    }
    
	
	/////////loudness measure////////
	this.m_dfcounter=this.DFFRAMESSTORED-1;
	//zero loudness store 
	for(j=0;j<this.DFFRAMESSTORED;++j) {
		this.m_df[j]=0.0;
	}
	
    //this.m_loudbands = new Array(this.DFFRAMESSTORED); //[NUMERBBANDS][PASTERBBANDS];
    
	//zero previous specific loudness in Bark bands
    for(j=0;j<this.NUMERBBANDS;++j) {
        
        this.m_loudbands[j] = new Float64Array(this.PASTERBBANDS);
    
        for(i=0;i<this.PASTERBBANDS; ++i)
		{
			this.m_loudbands[j][i] = 0.0;
		}
    }
			
    this.m_pasterbbandcounter=0;
	
	this.m_onsetdetected=0;

	this.m_now=0;
    
    
    
    
    
	
}

    
    this.setup(sampleRate);

//must pass in fft data
this.next = function(input) {

    var beat = 0;
    
    var ready = this.stft.next(input);
    
    if(ready) {
        
    //FFT result analysis
    var fftbuf = this.stft.powers;
    
    //HAVE BEEN PASSED FFT POWERS RESULT
    this.m_frame = this.m_frame+1;
    
	//calculate loudness detection function
	this.calculatedf(fftbuf);
	
        
    //now beat tracker code
        
  
        //just arrived =
        //this.m_df[this.m_dfcounter]
        
        beat = this.beattrackcalculation(this.m_df[this.m_dfcounter] * 0.01);

        //console.log('next1',beat,this.m_df[this.m_dfcounter] * 0.01);
        
    
    }
    
    //1 if beat detected this cycle
    return beat;
    
}
    
    
    this.beattrackcalculation = function(value) {
        
            
            var i, j, k;
            
            var prev, next;
            var prev2, next2;
            var interp;
        
        var beatresult = 0;
      
            this.phase_ += this.phasechange_;
            //lastphaseestimate_ += phasechange_;
            if(this.phase_ > this.period_) {
                this.phase_ -= this.period_;
                this.trigger_ = 1;
                beatresult = 1;
                
                
                //printf("beat %f %f \n", phase_, period_);
                
                
                this.halftrigdone_=0;
                this.quartertrigdone_=0;
                this.threequarterstrigdone_=0;
                
            } else {
                
                //trigger_ = 0;
                
                if((this.quartertrigdone_==0) && ((this.phase_*4.0)>this.period_)) {
                    
                    this.trigger_=2;
                    this.quartertrigdone_=1;
                }
                
                if((this.halftrigdone_==0) && ((2.0*this.phase_)>this.period_)) {
                    
                    this.trigger_=3;
                    this.halftrigdone_=1;
                }
                
                
                if((this.threequarterstrigdone_==0) && ((4.0*this.phase_)>(3.0*this.period_))) {
                    
                    this.trigger_=4;
                    this.threequarterstrigdone_=1;
                }
                
            }
            
            
            
            
            this.store_[this.storepos_] = value;
            
            //update leaky integrators
            for (i=0; i<this.numperiods_; ++i) {
                
                var periodtotest = this.g_periods[i];
                
                var sumup = 0.0;
                
                //sum up to previous four beats compared to now
                
                var basepos = ( this.storepos_ + this.numpreviousvalues_ );
                
                for (k=1; k<=4; ++k) {
       
                    var posthen = (basepos - (k*periodtotest))%this.numpreviousvalues_;
                    
                    prev = Math.floor(posthen);
                    next = (prev+1)%this.numpreviousvalues_;
                    
                    //THIS IS ALWAYS ZERO??????
                    interp = posthen-prev;
                    
                    sumup +=  value* ((this.store_[prev]*(1.0-interp)) + ((interp)*this.store_[next]));
       
                }
                
                
                
                //
                //			prev = ( storepos_ -  g_periodsprev[i] + numpreviousvalues_ ) % numpreviousvalues_;
                //
                //			next = ( prev + 1 ) % numpreviousvalues_;
                //
                //			//should also sum over four previous beats?
                //
                //			mult = value * ( (g_periods1minusinterp[i] * store_[prev]) + (g_periodsinterp[i] * store_[next]) );
                //					crosscomby_[i] = (crosscomby_[i] *0.996) + mult;
                
                
                //0.996
                this.crosscomby_[i] = (this.crosscomby_[i] *0.995) + sumup;
            }
            
            
            if (this.calccounter_ == this.calcperiod_) {
                
                this.lastphaseestimate_= (this.lastphaseestimate_ + this.calcperiod_)%this.lastperiodestimate_;
                
                var bestscore = 0.001;
                var secondbestscore = 0.001;
                var besti=0, secondi=0;
                
                //find best scoring crosscomby
                for (i=0; i<this.numperiods_; ++i) {
                    
                    var now = this.crosscomby_[i];
                    
                    if (now>bestscore) {
                        
                        if(bestscore>secondbestscore) {
                            
                            secondbestscore = bestscore;
                            secondi = besti;
                        }
                        
                        
                        bestscore  = now;
                        besti = i;
                        
                    } else if (now>secondbestscore) {
                        
                        
                        secondbestscore = now;
                        secondi = i;
                    }
                    
                    
                    
                    
                }
   
                
                //printf("checks %f %f best %d prevbest %d\n", bestscore, secondbestscore, besti, prevbestperiod_);
     
                
                var period = this.g_periods[besti];
                
                //printf("last period %f new period %f\n", period_, period);
                
                //int sameperiodflag = (periodi_ == besti)?1:0;
                
                //now have candidate tempo; check 20 possible phases.
                
                //( storepos_ -  (4*period) + numpreviousvalues_ ) % numpreviousvalues_;
                
                var phasediv = period/20.0;
                
                var bestphasescore = 0.0;
                var bestphase = 0.0;
                
                var bestphasej = 0;
                
                var basecalc =  this.storepos_ -  (4*period)  + this.numpreviousvalues_ ;
                
                //try 20 phases, summing over four beats
                for (j=0; j<20; ++j) {
                    
                    var basephasepos = (basecalc + (j*phasediv))%this.numpreviousvalues_;
                    
                    var summation = 0.0;
                    
                    for (k=0; k<4; ++k) {
                        
                        var phasenow = (basephasepos+ (k*period))%this.numpreviousvalues_;
                        
                        prev = phasenow;
                        next = (prev+1)%this.numpreviousvalues_;
                        
                        prev2 = prev>0?(prev-1):this.numpreviousvalues_;
                        next2 = (next+1)%this.numpreviousvalues_;
                        
                        interp = phasenow-prev;
                        
                        //summation +=  (store_[prev]*(1.0-interp)) + ((interp)*store_[next]);
                        summation +=  ((this.store_[prev]+this.store_[prev2])*(1.0-interp)) + ((interp)*(this.store_[next]+this.store_[next2]));
                        
                    }
                    
                    if(summation > bestphasescore) {
                        
                        bestphasescore = summation;
                        bestphasej = j;
                        bestphase = (basephasepos+ (3.0*period))%this.numpreviousvalues_;
                        
                    }
                    
                }
                
                //if two consistent estimates for phase in a row, then update phase; else get lots of skipped beats when phase clock resets mid flow
                
                var phaseestimate = (this.storepos_ - bestphase + this.numpreviousvalues_)%this.numpreviousvalues_;
                
                var phasedifference1 =  (phaseestimate - this.lastphaseestimate_ +period )%period;
                var phasedifference2 =  (this.lastphaseestimate_ - phaseestimate  +period )%period;
                var phasedifference = phasedifference1< phasedifference2?phasedifference1: phasedifference2;
                
                this.phasechange_ = 1.0;
              
                
                //printf("phase stringency %f %f diff %f\n", phaseestimate, lastphaseestimate_,phasedifference);
         
                
                //&& ((bestscore/secondbestscore)>1.1)
                
                
                if( Math.abs(besti-this.prevbestperiod_)<3.0 ) {
                    
                    if (phasedifference<(period*0.125)) { 
                        
                        this.periodi_ = besti;
                        
                        this.period_ = period; // * 512.0;
                        this.periodinsamples_ = 512* this.period_;
                        
                        this.phase_ = phaseestimate; //fmod( storepos_ - bestphase + numpreviousvalues_, numpreviousvalues_) ; //phase AT THIS POINT IN TIME
                        
                    }
                    
                } 
                
                
                this.lastphaseestimate_ = this.phase_;  //actually meaningless unless same period to compare
     
                //update if close enough
                
                this.prevbestperiod_ = besti;
                this.lastperiodestimate_ = period;
                
                this.calccounter_ = 0;
            }
            
            this.storepos_ = (this.storepos_ + 1)% this.numpreviousvalues_;
            
            ++this.calccounter_;
        
        return beatresult;
        
    }


	   
//should take fft data
this.calculatedf = function(fftbuf) {
	
	var h, j,k;
	
    //TO SORT
	//float * fftbuf= this.m_FFTBuf;
	
	var dfsum=0.0;
	
	var pastband = this.m_pasterbbandcounter;
	
    var bandstart, bandsize, bsum;
    
    var db, prop, lastloud, diff;
    
	for (k=0; k<this.NUMERBBANDS; ++k){
		
		bandstart = this.eqlbandbins[k];
		//int bandend=eqlbandbins[k+1];
		bandsize = this.eqlbandsizes[k];
		
		bsum = 0.0;
		
		for (h=0; h<bandsize;++h) {
			bsum = bsum+fftbuf[h+bandstart];  //SORT
		}
		
		//store recips of bandsizes?
		bsum = bsum/bandsize;
		
		//into dB, avoid log of 0
		//float db= 10*log10((bsum*10 000 000)+0.001);
		//db = 10*Math.log10((bsum*32382)+0.001);
        
        //empirically determined. If FFT max magnitudes around 512 (half 1024) say (though rarely would see anything max out at all, might see 5 in a band!)
        
        //(10**11)/(512**2)
        db = 10*Math.log10((bsum*381469.7265625)+0.001);
        
        
        
        //near halfway ERB
//        if(k==20) {
//            console.log("db", db, "bsum", bsum, "fftval",fftbuf[bandstart]);
//            
//        }
		
		//printf("bsum %f db %f \n",bsum,db);
		
		//convert via contour
		if(db<this.contours[k][0]) db=0;
        else if (db>this.contours[k][10]) db=this.phons[10];
        else {
            
            prop = 0.0;
			
            for (j=1; j<11; ++j) {
                if(db<this.contours[k][j]) {
                    prop = (db-this.contours[k][j-1])/(this.contours[k][j]-this.contours[k][j-1]);
                    break;
				}
				
				if(j==10) 
					prop = 1.0;
            }
			
            db = (1.0-prop)*this.phons[j-1]+ prop*this.phons[j];
			//printf("prop %f db %f j %d\n",prop,db,j);
			
		}
		
		//float lastloud=this.m_loudbands[k];
        lastloud = 0.0;
		
		for(j=0;j<this.PASTERBBANDS; ++j)
			lastloud += this.m_loudbands[k][j];
		
		lastloud /= this.PASTERBBANDS;
		
        diff = db-lastloud;
        
        if(diff<0.0) diff = 0.0;
        
        //sc_max(db-lastloud,0.0);
		
		dfsum = dfsum+diff; //(bweights[k]*diff);
		
		this.m_loudbands[k][pastband] = db;
	}
	
	this.m_pasterbbandcounter = (pastband+1)%this.PASTERBBANDS;
	
	//increment first so this frame is this.m_dfcounter
	this.m_dfcounter = (this.m_dfcounter+1)%this.DFFRAMESSTORED;
	
	this.m_df[this.m_dfcounter] = dfsum*0.025; //divide by num of bands to get a dB answer
	
	//printf("loudness %f %f \n",this.loudness[this.loudnesscounter], lsum);

}

    
}



//William Sethares sensory dissonance algorithm adapted from my SuperCollider SensoryDissonance UGen code
//Sensory Dissonance model, measuring roughness between pairs of prominent spectral peaks. Follows the algorithm in William A. Sethares (1998) Consonance-Based Spectral Mappings. CMJ 22(1): 56-72

function MMLLSensoryDissonance(sampleRate,fftsize=2048,maxpeaks=100,peakthreshold=0.1,norm,clamp=1) {
    
    
    this.setup = function(sampleRate,fftsize=2048,maxpeaks=100,peakthreshold=0.1,norm,clamp=1) {
        var i;
        
        this.m_srate = sampleRate;
        this.fftsize_ = fftsize;
        
        this.stft = new MMLLSTFT(this.fftsize_,this.fftsize_/2,0);
        
        //for(i=0; i<12; ++i)
        
        this.maxnumpeaks_ = maxpeaks; //100;
        this.peakthreshold_ = peakthreshold;
        this.peakfreqs_ =  new Array(this.maxnumpeaks_);
        this.peakamps_ = new Array(this.maxnumpeaks_);
        
        this.norm_ = (typeof norm !== 'undefined') ?  norm : 0.01/maxpeaks;
        
        this.clamp_ = clamp;
        
        this.topbin_= this.fftsize_*0.25;  //only go up to half the frequency range (i.e., there are half fftsize bins)
        this.frequencyperbin_ = this.m_srate / this.fftsize_;
        
        this.dissonance_ = 0;
        
    }
    
    this.setup(sampleRate,fftsize,maxpeaks,peakthreshold,norm,clamp);
    
    //must pass in fft data (power spectrum)
    this.next = function(input) {
        
        var i,j;
        
        var ready = this.stft.next(input);
        
        if(ready) {
            
            
            var fftbuf = this.stft.powers;
            
            
            var peakfreqs= this.peakfreqs_;
            var peakamps= this.peakamps_;
            
            var real, imag;
            
            var numpeaks = 0;
            var maxnumpeaks = this.maxnumpeaks_;
            
            var intensity;
            var position;
            
            var threshold = this.peakthreshold_;
            
            //create powerspectrum
            
            var prev=0.0, now=0.0, next=0.0;
            
            var frequencyperbin = this.frequencyperbin_;
            
            //float totalpeakpower = 0.0f;
            var temp1, refinement;
            
            for (j=1; j<=this.topbin_; ++j) {
                
                intensity = fftbuf[j];
                
                next = intensity;
                
                if(j>=3) {
                    
                    //hunt for peaks
                    
                    //look for peak by scoring within +-3
                    //assume peak must be centrally greater than 60dB say
                    
                    //powertest_
                    //minpeakdB_ was 60
                    
                    if (now>threshold)  {
                        
                        //y1= powerspectrum_[i-1];
                        //				//y2= valuenow;
                        //				y3= powerspectrum_[i+1];
                        //
                        if ((now>prev) && (now>next)) {
                            
                            //second peak condition; sum of second differences must be positive
                            //NCfloat testsum= (valuenow - powerspectrum_[i-2]) + (valuenow - powerspectrum_[i+2]);
                            
                            //if (testsum>0.0) {
                            
                            //refine estimate of peak using quadratic function
                            //see workbook 28th Jan 2010
                            
                            temp1 = prev+next-(2*now);
                            
                            if (Math.abs(temp1)>0.00001) {
                                position=(prev-next)/(2*temp1);
                                
                                //running quadratic formula
                                refinement = (0.5*temp1*(position*position)) + (0.5*(next-prev)*position) + now;
                                //refinement= y2 -  (((y3-y1)^2)/(8*temp1));
                                
                            } else {
                                //degenerate straight line case; shouldn't occur
                                //since require greater than for peak, not equality
                                
                                position=0.0; //may as well take centre
                                
                                //bettervalue= max([y1,y2,y3]); %straight line through them, find max
                                
                                refinement= now; //must be max for else would have picked another one in previous calculation! %max([y1,y2,y3]);
                                
                            }
                            
                            //correct??????????????????????????????
                            peakfreqs[numpeaks] = (j-1+position)*frequencyperbin; //frequencyconversion;
                            //printf("peakfrequencies %d is %f from i %d position %f freqperbin %f \n", numpeaks_,peakfrequencies_[numpeaks_],i, position, frequencyperbin_);
                            
                            peakamps[numpeaks] = Math.sqrt(refinement); //Sethares formula requires amplitudes
                            //totalpeakpower += refinement;
                            
                            //cout << " peak " << numpeaks_ << " " << peakfrequencies_[numpeaks_] << " " << refinement << " " ;
                            
                            ++numpeaks;
                            
                            //}
                            
                        }
                        
                    }
                    
                    //test against maxnumberpeaks_
                    if ( numpeaks == maxnumpeaks )
                        break;
                    
                    
                    
                }
                
                prev = now; now=next;
                
            }
            
            
            //now have list of peaks: calculate total dissonance:
            
            //iterate through peaks, matching each to min of next 10, and no more than octave, using Sethares p. 58 CMJ article
            
            var dissonancesum = 0;
            
            var f1, v1, f2, v2;
            var d;
            var diff; //, minf;
            var s, a, b;
            var octave;
            var upper;
            
            for (i=0; i<(numpeaks-1); ++i) {
                
                f1 = peakfreqs[i];
                v1 = peakamps[i];
                s = 0.24/(0.21*f1+19); //constant needed as denominator in formula
                a = -3.5*s;
                b= -5.75*s;
                
                octave = 2*f1;
                
                upper = i+20;
                
                if(upper>numpeaks) upper = numpeaks;
                
                for (j=i+1; j<upper; ++j) {
                    
                    f2 = peakfreqs[j];
                    v2 = peakamps[j];
                    
                    if(f2>octave) break; //shortcut escape if separated by more than an octave
                    
                    diff = f2-f1; //no need for fabs, f2>f1
                    //minf =  //always f1 lower
                    
                    d = v1*v2*(Math.exp(a*diff) - Math.exp(b*diff));
                    
                    dissonancesum += d;
                }
                
            }
            
            dissonancesum *= this.norm_;
            
            if(dissonancesum>this.clamp_) dissonancesum = this.clamp_;
            
            this.dissonance_ = dissonancesum;
            //this.dissonance_ = sc_min(this.clamp_,dissonancesum*this.norm_); //numpeaks; //dissonancesum;  //divide by fftsize as compensation for amplitudes via FFT
            
        }
        
        
        //ZOUT0(i) = this.dissonance_;
        return this.dissonance_;
        
        //return ready;
        
    }
    
    
}


//Nick Collins first created 8th June 2018

//support mono and stereo
//asynchronous loading, with function to call upon completion passed in

//shared between Sampler and MMLLWebAudioSetup
function MMLLInputAudio(blocksize)
{
	this.monoinput = new Float32Array(blocksize);
	this.inputL = new Float32Array(blocksize);
	this.inputR = new Float32Array(blocksize);
    this.numChannels = 1;
}
function MMLLOutputAudio(blocksize)
{
	this.outputL = new Float32Array(blocksize);
	this.ouputR = new Float32Array(blocksize);
}


//no longer uses interleaved audio if multiple channels
function MMLLBuffer() {
    
    this.dataL = 0;
    this.dataR = 0;
    this.length = 0;
    this.duration = 0;
    this.sampleRate = 44100.0;
    this.numChannels = 1; //unless otherwise

    
}


//contains state for block by block playback of a mono OR stereo buffer object
function MMLLSamplePlayer() {
    
    this.buffer = 0;
    this.playbackposition = 0;
    this.lengthinsampleframes = 0;
    this.numChannels  = 1;
    this.playing = 0;
    this.offset = 0;
    
    //mix settings for pan and amplitude come later? //to a stereo output bus
    //this.amp = 0.4;
    //this.pan = 0.0;
 
    
    this.reset = function(buffer) {
        
        if(buffer!= null) {
            this.buffer = buffer;
            
            this.lengthinsampleframes = buffer.length;
            
            this.numChannels = buffer.numChannels;
        }
        
        this.playbackposition = 0;
        this.playing = 1;
        
    }
    
    //offset code should abstract out to superclass Player
    
    
    //CHECK FOR STEREO COMPATIBILITY
    
    //arrayL, arrayR not stereo rendering
    this.render = function(inputaudio, numSamples) {
        
        var i;
        
        var samplesleft = this.lengthinsampleframes - this.playbackposition; //this.buffer.length;
        
        var datasource,datasource2; // = this.buffer.data;
        
        var offset = this.offset;
        
        var baseindex, sourceinde
        
        //must make copy else changing original reference and messing up rendering for other active events?
        //actually, probably OK, but will keep this way while debugging an issue right now
        var numsamplesnow = numSamples;
        
        numsamplesnow -= offset;
        
        var samplestodo = numsamplesnow;

        if(numsamplesnow>samplesleft) {
            samplestodo = samplesleft;
             this.playing = 0;
        }
        
        var pos = this.playbackposition;
        
        var outputL = inputaudio.inputL;
        var outputR = inputaudio.inputR;
        var monooutput = inputaudio.monoinput;
        
        
        var temp;
        if(offset>0) {
            
            if(this.numChannels ==1) {
            
                datasource = this.buffer.dataL;
                
            for (i = 0; i < samplestodo; ++i) {
                
                temp = datasource[pos+i];
                outputL[offset+i] += temp; //pos will be zero here since only use offset on first block, however keep code as is in case later have playback of sample starting in middle etc
                
                outputR[offset+i] += temp;
                
                monooutput[offset+i] = temp;
            }
                
            } else {
                
                datasource = this.buffer.dataL;
                datasource2 = this.buffer.dataR;
                
                for (i = 0; i < samplestodo; ++i) {
                    temp = offset+i;
                    outputL[temp] += datasource[pos+i];
                    outputR[temp] += datasource2[pos+i];
                    
                    monooutput[offset+i] = (outputL[temp] + outputR[temp])*0.5;
                }
                
//                for (i = 0; i < samplestodo; ++i) {
//                    baseindex = 2*(offset+i);
//                    sourceindex = 2*(pos+i);
//                    
//                    array[baseindex] += datasource[sourceindex];
//                    array[baseindex+1] += datasource[sourceindex+1];
//                    
//                    
//                    //pos will be zero here since only use offset on first block, however keep code as is in case later have playback of sample starting in middle etc
//                }
                
            }
            
            //only active in first block rendered
            this.offset = 0;
            
        } else
        {
            
            if(this.numChannels ==1) {
                
                datasource = this.buffer.dataL;
                
                temp = datasource[pos+i];
                
                for (i = 0; i < samplestodo; ++i) {
                    outputL[i] += temp; //pos will be zero here since only use offset on first block, however keep code as is in case later have playback of sample starting in middle etc
                    
                    outputR[i] += temp;
                    
                    monooutput[i] +=temp;
                }
                
                
                
//            for (i = 0; i < samplestodo; ++i) {
//                array[i] += datasource[pos+i];
//            }
                
            } else {
                
                datasource = this.buffer.dataL;
                datasource2 = this.buffer.dataR;
                
                for (i = 0; i < samplestodo; ++i) {
                    outputL[i] += datasource[pos+i];
                    outputR[i] += datasource2[pos+i];
                    
                    monooutput[i] = (outputL[i] + outputR[i]) * 0.5; 
                }
                
//                for (i = 0; i < samplestodo; ++i) {
//                    baseindex = 2*i;
//                    sourceindex = 2*(pos+i);
//                    
//                    array[baseindex] += datasource[sourceindex];
//                    array[baseindex+1] += datasource[sourceindex+1];
//                
//                }
                
            }
            
            
            
        }
        
        this.playbackposition += samplestodo;
        
       
        
    }
    
    
    
}



function MMLLSampler() {
    
    
    this.loadcounter = 0;
    this.buffers = 0;
    
    this.loadSamples = function(arrayofpaths, onloadfunction) {
        
        this.numbuffers = arrayofpaths.length;
        
        this.buffers = new Array(this.numbuffers);
        
        for(var i=0; i<arrayofpaths.length; ++i) {
            
            var nowtoload = arrayofpaths[i];
            
            console.log(typeof(nowtoload),nowtoload);
            
            if(typeof(nowtoload)==='string') {
            
            this.loadSample(nowtoload,onloadfunction,i);
                
            } else {
                
            this.loadSample2(nowtoload,onloadfunction,i);
                
            }
            
        }
        
    }
    
    
    
 
    
    this.loadSample2 = function(fileobject,onloadfunction,index) {
        
        //https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
        var self = this;
        
        //http://composerprogrammer.com/music/demo1.mp3
        
        
        var reader = new FileReader();
        
        reader.onload = function(e) {
            
            var audioData = reader.result;
            audiocontext.decodeAudioData(audioData, function(buf) {
                                         //assume only playback one channel, raw format probably interleaved sample frames
                                         
                                         var buffernow = new MMLLBuffer();
                                         
                                         //can get interleaved? Or should already split?
                                         //for machine listening will want in mono
                                         
                                         
                                         buffernow.numChannels = buf.numberOfChannels;
                                         
                                         //at most STEREO
                                         if(buffernow.numChannels>2) buffernow.numChannels = 2;
                                         
                                         buffernow.length = buf.length;
                                         buffernow.duration = buf.duration;
                                         buffernow.sampleRate = buf.sampleRate;
                                         
                                         if(buffernow.numChannels==1) {
                                         
                                         buffernow.dataL = buf.getChannelData(0); //assuming mono
                                         //https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
                                         
                                         } else {
                                         
                                         //assumes 2 channels
                                         //get stereo arrays then interleave into one
                                         
                                         buffernow.dataL = buf.getChannelData(0);
                                         buffernow.dataR = buf.getChannelData(1);
                                         
//                                         var channelL = buf.getChannelData(0);
//                                         var channelR = buf.getChannelData(1);
//                                         
//                                         buffernow.data = new Array(buffernow.length*2);
//                                         
//                                         var where;
//                                         
//                                         for(var k = 0; k<buffernow.length; ++k) {
//                                         
//                                         where = 2*k;
//                                         
//                                         buffernow.data[where] = channelL[k];
//                                         buffernow.data[where+1] = channelR[k];
//                                         
                                         
                                         //}
                                         
                                         
                                         }
                                         
                                       
                                         //console.log('buffer loaded test 1',self,this,self.loadcounter,filename,buf.length,buf.duration, buf.sampleRate); //print
                                         
                                         
                                         //console.log('buffer loaded test 2',self.loadcounter,filename,buffernow.length,buffernow.sampleRate,self.buffers); //print
                                         
                                         self.buffers[index] = buffernow;
                                         
                                         //console.log('buffer loaded',self.loadcounter,filename,buffernow.length,buffernow.samplerate); //print
                                         
                                         
                                         ++(self.loadcounter);
                                         
                                         if(self.loadcounter==self.numbuffers) {
                                         
                                         onloadfunction();
                                         }
                                         
                                         
                                         },
                                         function(e){"Error with decoding audio data" + e.err});
        }
        
        reader.readAsArrayBuffer(fileobject);
        
        
        
    }
    
    
    this.loadSample = function(filename,onloadfunction,index) {
        
        var request = new XMLHttpRequest();
 
        //var filename = "loop"+which+".wav";
        
        //https://stackoverflow.com/questions/20279484/how-to-access-the-correct-this-inside-a-callback
        var self = this;
        
        //http://composerprogrammer.com/music/demo1.mp3
        request.open('GET', filename, true); //viper.ogg
        request.responseType = 'arraybuffer';
     
        
        request.onload = function() {
            var audioData = request.response;
            audiocontext.decodeAudioData(audioData, function(buf) {
                                         //assume only playback one channel, raw format probably interleaved sample frames
                                         
                                         var buffernow = new MMLLBuffer();
                                         
                                         
                                         
                                         
                                         
                                         buffernow.numChannels = buf.numberOfChannels;
                                         
                                         //at most STEREO
                                         if(buffernow.numChannels>2) buffernow.numChannels = 2;
                                         
                                         buffernow.length = buf.length;
                                         buffernow.duration = buf.duration;
                                         buffernow.sampleRate = buf.sampleRate;
                                         
                                         if(buffernow.numChannels==1) {
                                         
                                         buffernow.dataL = buf.getChannelData(0); //assuming mono
                                         //https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
                                         
                                         } else {
                                         
                                         //assumes 2 channels
                                         //get stereo arrays then interleave into one
                                         buffernow.dataL = buf.getChannelData(0);
                                         buffernow.dataR = buf.getChannelData(1);
                                         
//                                         var channelL = buf.getChannelData(0);
//                                         var channelR = buf.getChannelData(1);
//                                         
//                                         buffernow.data = new Array(buffernow.length*2);
//                                         
//                                         var where;
//                                         
//                                         for(var k = 0; k<buffernow.length; ++k) {
//                                         
//                                         where = 2*k;
//                                         
//                                         buffernow.data[where] = channelL[k];
//                                         buffernow.data[where+1] = channelR[k];
//                                         
//                                         
//                                         }
                                         
                                         
                                         }
                                         
                                         
                                         
//                                         buffernow.data = buf.getChannelData(0); //left only, o/w assuming mono
//                                         //https://developer.mozilla.org/en-US/docs/Web/API/AudioBuffer
//                                         buffernow.length = buf.length;
//                                         buffernow.duration = buf.duration;
//                                         buffernow.sampleRate = buf.sampleRate;
//                                         
//                                          //console.log('buffer loaded test 1',self,this,self.loadcounter,filename,buf.length,buf.duration, buf.sampleRate); //print
                                         
                                         
                                         //console.log('buffer loaded test 2',self.loadcounter,filename,buffernow.length,buffernow.sampleRate,self.buffers); //print
                                         
                                         self.buffers[index] = buffernow;
                                         
                                         //console.log('buffer loaded',self.loadcounter,filename,buffernow.length,buffernow.samplerate); //print
                                         
                                         
                                         ++(self.loadcounter);
                                         
                                         if(self.loadcounter==self.numbuffers) {
                                         
                                            onloadfunction();
                                         }
                                         
                                         
                                         },
                                         function(e){"Error with decoding audio data" + e.err});
        }
        request.send();
        
        
        
    }
    

    
}

//put all the awkward Web Audio API setup code here



function MMLLWebAudioSetup(blocksize, inputtype, callback, setup) {
 
    var self = this;
    
    self.audioblocksize = blocksize;
    self.inputtype = inputtype;
    self.inputAudio = new MMLLInputAudio(self.audioblocksize);
    self.outputAudio = new MMLLOutputAudio(self.audioblocksize); //always stereo for now
    
    self.callback = callback;
    self.setup = setup;
    
    self.sampleRate = 0;
    self.audiocontext = 0;
    self.node = 0;
    self.numInputChannels = 1;
    
    
    
    self.initAudio = function(inputstream) {
        
        console.log('initialising audio'); //debug console message
        
        //can request specific sample rate, but leaving as device's default for now
        //https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/AudioContext
        try {
            self.audiocontext = new webkitAudioContext();
            
        } catch (e) {
            
            try {
                
                self.audiocontext = new AudioContext();
                
            } catch(e) {
                
                alert("Your browser does not support Web Audio API!");
                return;
            }
            
        }
        
        self.sampleRate = self.audiocontext.sampleRate; //usually 44100.0
        
        console.log("AudioContext established with sample rate:",self.sampleRate," and now setting up for input type:",self.inputtype); //print
        
        self.setup(sampleRate);
        
        if((self.inputtype == 1) || (self.inputtype == 2)) {
            
            var audioinput = self.audiocontext.createMediaStreamSource(inputstream);
            
            self.numInputChannels = self.inputtype; //1 or 2 inputs
            
            self.inputAudio.numChannels = self.numInputChannels;
            
            self.node = self.audiocontext.createScriptProcessor(self.audioblocksize,self.numInputChannels,2); //1 or 2 inputs, 2 outputs
            
            audioinput.connect(node);
            
            self.node.onaudioprocess = self.process;  //self is nil since self isn't what you think it is here
            
            self.node.connect(self.audiocontext.destination);
            
        } else {
            
            //            self.node = self.audiocontext.createScriptProcessor(self.audioblocksize,0,2); //0 input, 2 outputs
            //
            //            self.node.onaudioprocess = self.processSoundFile;
            //
            self.initSoundFileRead(self.inputtype);
            
        }
        
        
    };
    
    self.initSoundFileRead = function(filename) {
        
        self.sampler = new MMLLSampler();
        self.sampleplayer;
        //was Float64Array
        //self.samplearray = new Float32Array(audioblocksize);
        
        //"/sounds/05_radiohead_killer_cars.wav"
        sampler.loadSamples([filename],
                            function onload() {
                            
                            self.sampleplayer = new MMLLSamplePlayer();
                            self.sampleplayer.reset(self.sampler.buffers[0]);
                            //self.sampleplayer.numChannels = self.sampler.buffers[0]
                            
                            if(self.sampleplayer.numChannels>1) {
                            //interleaved input
                            self.numInputChannels = 2;
                            
                            self.inputAudio.numChannels = self.numInputChannels;
                            //self.samplearray = new Float32Array(2*audioblocksize);
                            
                            }
                            
                            //samplearray depends on number of Channels whether interleaved
                            
                            // This AudioNode will create the samples directly in JavaScript
                            //proceed with hop size worth of samples
                            self.node = self.audiocontext.createScriptProcessor(self.audioblocksize,0,2); //0 input, 2 outputs
                            self.node.onaudioprocess = self.processSoundFile;
                            
                            //direct synthesis
                            self.node.connect(self.audiocontext.destination);
                            
                            
                            });
        
    };
    
    
    self.processSoundFile = function(event) {
        // Get output arrays
        var outputArrayL = event.outputBuffer.getChannelData(0);
        var outputArrayR = event.outputBuffer.getChannelData(1);
        //var input = event.inputBuffer.getChannelData(0);

        //number of samples to calculate is based on (common) length of these buffers
        var n = outputArrayL.length; //outputArrayL.length;
        
        var i;
        //console.log("processSoundFile",event,n);
        
//        if(self.numInputChannels==2) {
//           
//            
//            
//            
//            for (i = 0; i< 2*n; ++i)
//                self.samplearray[i] = 0.0;
//            
//           
//        } else {
//        
//        //listening
//        for (i = 0; i< n; ++i)
//            self.samplearray[i] = 0.0;
//        
//        }
        
        //safety, zero out input if accumulating to it
        
        for (var i = 0; i < n; ++i) self.inputAudio.monoinput[i] = self.inputAudio.inputL[i] = self.inputAudio.inputR[i] = 0.0;
        
        
        //self.sampleplayer.render(self.samplearray,n);
        self.sampleplayer.render(self.inputAudio,n);
   
       
        //safety, zero out output if accumulating to it
        for (var i = 0; i < n; ++i) outputArrayL[i] = outputArrayR[i] = 0.0;
        
        self.outputAudio.outputL = outputArrayL;
        self.outputAudio.outputR = outputArrayR;
        
       
        
        
        //self.callback(inputL,outputArrayL,outputArrayR,n);
        self.callback(self.inputAudio,self.outputAudio,n);
        
        
        //self.callback(self.samplearray,outputArrayL,outputArrayR,n);
        
    };
    
    self.process = function(event) {
        // Get output arrays
        var outputArrayL = event.outputBuffer.getChannelData(0);
        var outputArrayR = event.outputBuffer.getChannelData(1);
        var inputL = event.inputBuffer.getChannelData(0);
       
        
        //number of samples to calculate is based on (common) length of these buffers
        var n = inputL.length; //outputArrayL.length;

        //console.log("process",event,n);
        
        //denormal safety checks on input
        
        for (var i = 0; i < n; ++i) {
            
            inputnow = inputL[i];
            
            //clip input deliberately to avoid blowing filters later
            if(inputnow>1.0) inputnow = 1.0;
            if(inputnow<-1.0) inputnow = -1.0;
            
            //subnormal floating point protection on input
            absx = Math.abs(inputnow);
            inputL[i] = (absx > 1e-15 && absx < 1e15) ? inputnow : 0.;
            
        }
        
        if(self.numInputChannels == 2) {
            var inputR = event.inputBuffer.getChannelData(1);
            
            
            for (var i = 0; i < n; ++i) {
                
                inputnow = inputR[i];
                
                //clip input deliberately to avoid blowing filters later
                if(inputnow>1.0) inputnow = 1.0;
                if(inputnow<-1.0) inputnow = -1.0;
                
                //subnormal floating point protection on input
                absx = Math.abs(inputnow);
                inputR[i] = (absx > 1e-15 && absx < 1e15) ? inputnow : 0.;
                
            }

            var left, right;
            var monoinput = self.inputAudio.monoinput;

            for (var i = 0; i < n; ++i) {
                
                left = inputL[i];
                right = inputR[i];
                monoinput[i] = (left+right)*0.5;
                
            }
            
            self.inputAudio.inputL = inputL;
            self.inputAudio.inputR = inputR;
            
            
        } else {
            
            self.inputAudio.monoinput = inputL;
            self.inputAudio.inputL = inputL;
            self.inputAudio.inputR = inputL;
            
//            left = self.inputAudio.inputL;
//            right = self.inputAudio.inputR;
//            
//            for (var i = 0; i < n; ++i) {
//                
//                left[i] = inputL[i];
//                right[i] = inputL[i];
//                
//            }
            
            
        }
        
        //safety, zero out output if accumulating to it
        for (var i = 0; i < n; ++i) outputArrayL[i] = outputArrayR[i] = 0.0;
        
        self.outputAudio.outputL = outputArrayL;
        self.outputAudio.outputR = outputArrayR;
        
        //self.callback(inputL,outputArrayL,outputArrayR,n);
        self.callback(self.inputAudio,self.outputAudio,n);
        
    };
    
    if(self.audionotrunning) {
        
        console.log('init MMLLWebAudioSetup');
        
        //microphone input
        if(inputtype == 1) {
            
            //navigator.mediaDevices.getUserMedia
            //https://stackoverflow.com/questions/37673000/typeerror-getusermedia-called-on-an-object-that-does-not-implement-interface
            
            if (!navigator.getUserMedia)
                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                 navigator.mozGetUserMedia || navigator.msGetUserMedia;
            
            navigator.getUserMedia({audio:true}, self.initAudio, function(e) {
                                   alert('Error getting audio');
                                   console.log(e);
                                   });
            
            
        } else {
            
            self.initAudio();
            
        }
        
        self.audionotrunning = 0;
        
    };
    
}

//put all the awkward Web Audio API setup code here

function MMLLBasicGUISetup(callback,setup,audioblocksize=256,microphone=true,audiofileload=true) {
 
    var self = this;
    this.audionotrunning = true;
    this.webaudio;
    this.audioblocksize = audioblocksize;
    this.callback = callback;
    this.setup = setup;
    
//    <button onclick="initMic()">Open Microphone</button><br>
//    <button onclick="document.getElementById('file-input').click();">Open Audio File</button>
//    <input id="file-input" type="file" name="name" style="display: none;" /><br><br>
 
//    <canvas id="canvas" width="800" height="400">
//    This text is displayed if your browser does not support HTML5 Canvas.
//        </canvas>
    
//    var canvas = document.getElementById('canvas');
//    var context = canvas.getContext('2d');

    if(microphone) {
        
    this.openmicbutton = document.createElement("BUTTON");        // Create a <button> element
    var t = document.createTextNode("Open Microphone");       // Create a text node
    this.openmicbutton.appendChild(t);                                // Append the text to <button>
    
        this.openmicbutton.onclick = function() {
            
            if(self.audionotrunning) {
                
                self.webaudio = MMLLWebAudioSetup(self.audioblocksize,1,self.callback,self.setup);
                
                self.audionotrunning = false;
            }
            
            
        }
    
    document.body.appendChild(this.openmicbutton);                    // Append <button> to <body>
    
    }
   
    document.body.appendChild(document.createTextNode(' --- '));
    
    if(audiofileload) {
        
        this.inputfile = document.createElement('input');
        this.inputfile.type = "file";
        this.inputfile.style = "display: none;";
        
        this.inputfile.addEventListener("change",function uploadFile()
                                    {
                                    console.log(self.inputfile.files[0],self.inputfile.files[0].name);
                                    
                                    
                                    if(self.audionotrunning) {
                                    
                                    //pass in filename or 1 for audio input
                                    self.webaudio = MMLLWebAudioSetup(self.audioblocksize,self.inputfile.files[0],self.callback,self.setup);
                                    
                                    //webaudio.initSoundFileRead(file_input.files[0]);
                                    
                                    self.audionotrunning = false;
                                    }
                                    
                                    }, false);
        
        document.body.appendChild(this.inputfile);
        
        this.openaudiofilebutton = document.createElement("BUTTON");
        var t = document.createTextNode("Open Audio File");
        this.openaudiofilebutton.appendChild(t);
        
        
        this.openaudiofilebutton.onclick = function() {
        self.inputfile.click();
        };
        
       
        document.body.appendChild(this.openaudiofilebutton);
        
        
    }
    
    
    
//    this.whateverfunction = function(inputarg) {
//        
//        console.log('initialise GUI'); //debug console message
//    
//    };
    
}

