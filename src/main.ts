import { renderToDOM } from "spheres/view";
import { container, update, Store } from "spheres/store";
import { HTMLBuilder } from "spheres/view";

const clickCount = container({ initialValue: 0 })

function counter(root: HTMLBuilder) {
    root.main(element => {
        element.children
            .p(counterLabel => {
                counterLabel.children.textNode((get) => `Clicks: ${get(clickCount)}`)
            })
            .button(button => {
                button.config.on("click", () => update(clickCount, (count) => count + 1))
                button.children.textNode("Count!")
            })
    })
}

renderToDOM(new Store(), document.getElementById("app")!, counter)
