document.addEventListener("alpine:init", function () {
    Alpine.data("__form_state__", function () {
        return {
            max_order: 20,
            order: 0,
            animate: {
                def: false,
                state: false,
                disable: false,
            },
            color: {
                def: false,
                state: false,
                disable: true,
            },

            decreaseOrder() {
                if (this.order > 0) {
                    this.order--;
                }
            },
            increaseOrder() {
                this.order++;
            },
            resetState() {
                this.order = 0;
                this.animate.state = this.animate.def;
                this.color.state = this.color.def;
            },
            getState() {
                return {
                    order: this.order,
                    animate: this.animate.state,
                    color: this.color.state,
                };
            },
        };
    });
    Alpine.store("__state__", {
        value: { k: true },

        async addNew() {
            while (true) {
                const key = [...new Uint8Array(await crypto.subtle.digest("sha-1", new TextEncoder().encode(`${Date.now()}`)))]
                    .map((x) => x.toString(16).padStart(2, 0))
                    .join("")
                    .slice(0, 8);
                if (undefined === this.value[key]) {
                    this.value[key] = false;
                    break;
                }
            }
        },
        remove(key) {
            delete this.value[key];
        },

        changeKey(old_key, new_key) {
            if (undefined !== this.value[new_key]) {
                throw new Error("this key already exists");
            }
            const val = this.value[old_key];
            delete this.val[old_key];
            this.value[new_key] = val;
        },

        updateValue(key, newValue) {
            this.value[key] = newValue;
        },
    });
    Alpine.store("__transforms__", {
        value: {
            I: [true, [["ret"]]],
        },
    });
});

function __newRules__() {
    return {
        shift: 1,
        state: Alpine.store("__state__").value,
        transforms: Alpine.store("__transforms__").value,
    };
}
