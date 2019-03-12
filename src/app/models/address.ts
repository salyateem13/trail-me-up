export class Address {
    constructor(
        public address: string,
        public city: string,
        public state: string
        ){}

        toString():string{
            return this.address.toString() ;
        }
}
