require("chromedriver");
const {Builder} = require("selenium-webdriver");

export class Driver {
    driver
    static #onlyInstance = null;

    constructor(){
        if(!Driver.#onlyInstance){
            Driver.#onlyInstance = this;
        } else {
            return Driver.#onlyInstance;
        }
    }

    async startDriver() {
        this.driver = await new Builder()
            .forBrowser("chrome")
            .build();
    // .usingServer('http://chrome:4444/wd/hub')
    }

    getDriver() {
        return this.driver;
    }
}