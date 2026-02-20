
let myDB = {
    Data: null,
    key: "users",
  
    async intiate()
    {
        if (!localStorage.getItem(this.key))
        {
            let initialData = await fetch("../DB.json").then((res) => res.json());
            localStorage.setItem(this.key, JSON.stringify(initialData.users));
        } else return;
    },
    async LoadData()
    {
        let users = await JSON.parse(localStorage.getItem(this.key));
        this.Data = users;
        console.log(this.Data);
        
    },
    async update_local_Storge(updatedData)
    {
        if (!updatedData) return false;
        this.Data = updatedData;
        await localStorage.setItem(this.key, JSON.stringify(updatedData));
        return true;
    },
    async get_user(card_number, password)
    {
        console.log(card_number, password);
        
        let index = this.Data.findIndex((user) =>(user.card == card_number && user.password == password));
            
        let user = this.Data[index];
        let state = user !== undefined ? true : false;
        return { state, user, index };
    },
    async withdraw(card_number, password, amount)
    {
        let { state, user, index } = await this.get_user(card_number, password);
        if (state && user.balance >= amount)
        {
            user.balance -= amount;
            console.log("current user =",user);
            
            user.transactions.unshift({amount,date: new Date(),type: "withdraw",});
            await this.update_local_Storge(this.Data);
            return { state: true, balance: user.balance, transactions: user.transactions[0] };
        }
        else
        {
            return { state: false, balance: user ? user.balance : null, transactions: null };
        }
    },
    async deposit(card_number, password, amount)
    {
        let { state, user, index } = await this.get_user(card_number, password,);
        if (state)
        {
            user.balance += amount;
            user.transactions.unshift({ amount, date: new Date(),type:"deposit" });
            await this.update_local_Storge(this.Data);
            return { state: true, balance: user.balance, transactions: user.transactions[0] };
        } else
        {
            return { state: false, balance: user ? user.balance : null, transactions: null };
        }
    },
    async get_Balance(card_number, password)
    {
        let { state, user, index } = await this.get_user(card_number, password,);
        if (state)
            return { state: true, balance: user.balance };
        else
            return { state: false, balance: user ? user.balance : null };
        
    },
    async get_history(card_number, password)
    {
        let { state, user, index } = await this.get_user(card_number, password,);
        if (state)        
            return { state: true, transactions: user.transactions };
        else
            return { state: false, transactions:null };
    },
}
// export default my_localStorge;


