export class CommonService {
    static getRandomNum(digit = 6) {
        return parseInt((Math.random() * Math.pow(10, digit)).toString()) 
    }
}