//Type Assertion

let anything:any;
anything ="Hasan";

const kgToGMConverter =(input:string | number)=>
{
    if( typeof input==="number")
    {
        return (input*1000);
    }
    else if(typeof input==="string")
    {
        const [value]= input.split(" "); //input slit to value
        return `Converterd Output is: ${Number(value)*1000}`; //number dhiye convert value
    }
};
const result =kgToGMConverter(2); //Here, result is numbr | String | undefined
console.log(result);
const resultAssertion =kgToGMConverter(2) as number; //Here, result is numbr :::Called type assertion
console.log(`Assertion result: ${resultAssertion}`);

const sum = kgToGMConverter("2 kg"); //Here, Sum is Number | String | Undefined
console.log(sum);
const sumAssertion = kgToGMConverter("2 kg") as String; //Here, Sum is String ::: as string called Assertion
console.log(`String Assertion Result is: ${sumAssertion}`);