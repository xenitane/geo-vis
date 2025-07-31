document.addEventListener("alpine:init", function () {
    Alpine.data("__form_state__", function (max_order) {
        return {
            max_order: max_order,
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
                if (this.order < this.max_order) {
                    this.order++;
                }
            },
            resetState() {
                this.order = 0;
                this.animate.state = this.animate.def;
                this.color.state = this.color.def;
            },
            getState() {
                const o = this.order;
                const a = this.animate.state;
                const c = this.color.state;
                return { order: o, animate: a, color: c };
            },
        };
    });
});
