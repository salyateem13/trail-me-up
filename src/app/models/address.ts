export class Address {
    constructor(
        public address: string,
        public city: string,
        public state: string
        ){}

        toString(){
            return this.address + ' ' + this.city + ' ' + this.state;
        }
}
