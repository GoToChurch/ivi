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
            .usingServer("http://chrome:4444/wd/hub")
            .build();
    }

    getDriver() {
        return this.driver;
    }
}