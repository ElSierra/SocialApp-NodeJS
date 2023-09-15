class OnlineUserSet {
    private static instance: OnlineUserSet;
    private values: Set<string> = new Set();
  
    private constructor() {}
  
    public static getInstance(): OnlineUserSet {
      if (!OnlineUserSet.instance) {
        OnlineUserSet.instance = new OnlineUserSet();
      }
      return OnlineUserSet.instance;
    }
  
    public addValue(value: string): void {
      this.values.add(value);
    }
  
    public deleteValue(value: string): void {
      this.values.delete(value);
    }
  
    public getValues(): string[] {
      return Array.from(this.values);
    }
  }
  

  export const onlineState = OnlineUserSet.getInstance();
