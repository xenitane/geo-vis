document.addEventListener("alpine:init", function () {
    Alpine.store("isCanvasEmpty", {
        value: true,
        set() {
            this.value = true;
        },
        unset() {
            this.value = false;
        },
    });

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
                disable: false,
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
        value: {
            a: true,
        },

        async addNew() {
            while (true) {
                const key = [...new Uint8Array(await crypto.subtle.digest("sha-1", new TextEncoder().encode(`${Date.now()}`)))]
                    .slice(0, 4)
                    .map((x) => x.toString(16).padStart(2, 0))
                    .join("");
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
                return false;
            }
            const val = this.value[old_key];
            this.remove(old_key);
            this.value[new_key] = val;
            return true;
        },

        updateValue(key, newValue) {
            this.value[key] = newValue;
        },
    });
    Alpine.store("__transforms__", {
        value: {
            I: [false, [["move"]], "II"],
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

function updateState(id, [new_id, value]) {
    if (typeof value !== "number" && typeof value !== "boolean") {
        console.log(value, typeof value);
        return false;
    }
    if (new_id === "" || (new_id !== id && !Alpine.store("__state__").changeKey(id, new_id))) {
        return false;
    }
    Alpine.store("__state__").updateValue(new_id, value);
    return true;
}
