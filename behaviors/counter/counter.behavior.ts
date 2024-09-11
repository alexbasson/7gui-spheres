import {behavior, effect, example, fact, step} from "esbehavior";
import {expect, is, stringContaining} from "great-expectations";
import {useBrowser} from "best-behavior/browser";

export default behavior("counter", [
    example(useBrowser({init: (browser) => browser}))
        .description("it displays a counter")
        .script({
            suppose: [
                fact("the page is loaded", async (browser) => {
                    await browser.page.goto("/counter")
                })
            ],
            observe: [
                effect("there exists a counter set to 0 and a button", async (browser) => {
                    const counterLabel = browser.page.locator("p").first()
                    expect(await counterLabel.innerText(), is(stringContaining("0")))
                })
            ]
    }),
    example(useBrowser({init: (browser) => browser}))
        .description("when the button is clicked")
        .script({
            suppose: [
                fact("the page loads", async (browser) => {
                    await browser.page.goto("/counter")
                }),
                fact("the counter is initially zero", async (browser) => {
                    const counterLabel = browser.page.locator("p")
                    expect(await counterLabel.innerText(), is(stringContaining("0")))
                })
            ],
            perform: [
                step("click the button", async (browser) => {
                    const button = browser.page.locator("button")
                    await button.click()
                })
            ],
            observe: [
                effect("the counter label increments", async (browser) => {
                    const counterLabel = browser.page.locator("p")
                    expect(await counterLabel.innerText(), is(stringContaining("1")))
                })
            ]
        })
])
