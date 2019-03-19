export function QuickSort<T>(arr:T[],start:number,end:number,cmp:(one:T,other:T)=>boolean){
    let x=start; let y=end;
    let tmp=arr[x];
    if(x>=y)return;
    while(x!=y){
        while(x<y && cmp(tmp,arr[y]))y--;
        while(x<y && !cmp(tmp,arr[x]))x++;
        if(x<y){
            let t=arr[x];
            arr[x]=arr[y];
            arr[y]=t;
        }
    }
    arr[start]=arr[x];
    arr[x]=tmp;
    QuickSort(arr,start,x-1,cmp);
    QuickSort(arr,x+1,end,cmp);
}
