import {behavior, effect, example, fact, step} from "esbehavior";
import {expect, is, stringContaining} from "great-expectations";
import {BrowserTestInstrument, useBrowser} from "best-behavior/browser"

class CounterPage {
    constructor(private browser: BrowserTestInstrument) {}

    public async loadPage() {
        await this.browser.page.goto("/counter")
    }

    public get counterLabel() {
        return this.browser.page.locator("p")
    }

    public get button() {
        return this.browser.page.locator("button")
    }
}

export default behavior("counter", [
    example(useBrowser({init: (browser) => new CounterPage(browser)}))
        .description("it displays a counter")
        .script({
            suppose: [
                fact("the page is loaded", async (counterPage) => {
                    await counterPage.loadPage()
                })
            ],
            observe: [
                effect("there exists a counter set to 0 and a button", async (counterPage) => {
                    expect(await counterPage.counterLabel.innerText(), is(stringContaining("0")))
                })
            ]
    }),
    example(useBrowser({init: (browser) => new CounterPage(browser)}))
        .description("when the button is clicked")
        .script({
            suppose: [
                fact("the page loads", async (counterPage) => {
                    await counterPage.loadPage()
                }),
                fact("the counter is initially zero", async (counterPage) => {
                    expect(await counterPage.counterLabel.innerText(), is(stringContaining("0")))
                })
            ],
            perform: [
                step("click the button", async (counterPage) => {
                    await counterPage.button.click()
                })
            ],
            observe: [
                effect("the counter label increments", async (counterPage) => {
                    expect(await counterPage.counterLabel.innerText(), is(stringContaining("1")))
                })
            ]
        })
])
