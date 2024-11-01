window.addEventListener("DOMContentLoaded", () => new FireworkTyping("#textField"));
class FireworkTyping {
    particles = 24;
    value = "";
    constructor(qs) {
        this.input = document.querySelector(qs);
        this.input?.addEventListener("input", this.fireworks.bind(this));
    }
    fireworks() {
        const { selectionStart, value } = this.input;
        const { top, left, height } = this.input.getBoundingClientRect();
        const charDifference = value.length - this.value.length;
        const charDifferenceAbs = Math.abs(charDifference);
        let currentPosition = selectionStart || 0;
        if (charDifference < 0) currentPosition += charDifferenceAbs;
        for (let i = 0; i < charDifferenceAbs; ++i) {
            const hue = Utils.random(0, 359, true);
            for (let j = 0; j < this.particles; ++j) {
                const el = document.createElement("div");
                const color = `hsl(${hue}, 90%, 50%)`;
                const x = `calc(${left}px + ${(currentPosition <= 24 ? currentPosition : 24) - i - 0.5}ch)`;
                const y = `${top + height / 2}px`;
                const angle = Utils.random(0, 359, true);
                const isRing = j === 0;
                const d = isRing ? Utils.random(3, 5) : Utils.random(2, 4);
                el.classList.add("particle");
                if (isRing) {
                    el.classList.add("particles-ring");
                    el.style.color = color;
                    el.style.height = `${d}em`;
                    el.style.width = `${d}em`;
                } else { el.style.backgroundColor = color; }
                el.style.top = y;
                el.style.left = x;
                document.body.appendChild(el);
                const center = "translate(-50%, -50%)";
                const ringKeyFrames = [
                    { opacity: 1, transform: `${center} scale(0)` },
                    { opacity: 0, transform: `${center} scale(1)` }
                ];
                const particleKeyFrames = [
                    { transform: `${center} rotate(${angle}deg) translateY(0) scale(1)` },
                    { transform: `${center} rotate(${angle}deg) translateY(${d}em) scale(0)` }
                ];
                const movement = el.animate(isRing ? ringKeyFrames : particleKeyFrames, {
                    duration: isRing ? 600 : 960, easing: "cubic-bezier(0, 0, 0.15, 1)"
                });
                movement.onfinish = () => el.remove();
            }
        }
        this.value = value;
    }
}
class Utils {
    static random(min, max, round = false) {
        const percent = crypto.getRandomValues(new Uint32Array(1))[0] / 2 ** 32;
        const relativeValue = (max - min) * percent;
        return (min + (round === true ? Math.round(relativeValue) : +relativeValue.toFixed(2)));
    }
}