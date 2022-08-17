export class Goal {
    id !: number;
    amount!: number;
    currentAmount!: number;
    category!: string;
    startDate!: string;
    completionDate!: string;

    public Goal(id: number, amount: number, currentAmount : number, category : string, startDate: string, completionDate: string ){
        this.id = id;
        this.amount = amount;
        this.currentAmount = currentAmount;
        this.category = category;
        this.startDate = startDate;
        this.completionDate = completionDate;
    }
}
