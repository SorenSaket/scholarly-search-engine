// activations functions
function identity (x){
    return(x)
}
function binarystep (x){
    if(x <= 0){
        return 0
    }else if (x => 0){
        return 1
    }
}
function softstep (x){
    ans = 1/(1+Math.E.toExponential(x));
    return ans;
}
function tanh (x){
    ans = (2/(1+Math.E.toExponential((-2*x))))-1;
    return ans;
}
function arctan (x){
    ans = 1/(x.toExponential(2)+1)
}
function rectifiedlinear (x){
    if(x < 0){
        return 0
    }else if (x => 0){
        return x
    }
}
function leakyrectifiedlinear (x){
    if(x < 0){
        return x*0.01
    }else if (x => 0){
        return x
    }
}
function softplus (x){
    ans = 1(1+ Math.E.toExponential(-x))
    return ans
}
function bentidentity (x){
    ans = x/(2(Math.sqrt(x.toExponential(2)+1)))+1
    return ans
}
function sinc (x){
    if (x != 0){
        ans = (Math.cos(x)/x)-(Math.sin(x)/x.toExponential(2))
    }else {
        return 0
    }
}
function sinusoid (x){
    ans = Math.sin(x)
    return ans
}
function gaussian (x){
    ans = -2*x*e.toExponential(-x.toExponential(2))
    return ans
}

//Neurons and Weights
function neuron (input,activation){
    output = activation +"(" + input + ")";
    return output
}
function weight (){
    
}