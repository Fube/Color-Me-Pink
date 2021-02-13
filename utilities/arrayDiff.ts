export default function<T>(a1:Array<T>, a2:Array<T>): Set<T> {


    const all:Set<T> = new Set([
        ...a1,
        ...a2,
    ]); 
    
    for(const item of all){

        if(a1.includes(item) && a2.includes(item)){
            all.delete(item);
        }
    }
    return all;
};