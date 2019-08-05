window.requestAnimFrame = function () {
    return (
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
    );
}();

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

let dpi = window.devicePixelRatio || 1;
ctx.scale(dpi, dpi);
console.log(dpi);

function fix_dpi() {
    let style_height = +getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
    let style_width = +getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);

    canvas.setAttribute('height', style_height * dpi);
    canvas.setAttribute('width', style_width * dpi);
}

var particle_count = 20,
    particles = [],
    colors = ["#eeeeee","#d9d9d9", "#dddddd", "#c9c9c9"];

function Particle() {
    this.connected = false;
    this.radius = Math.round((Math.random() * 1));
    this.x = Math.floor((Math.random() * ((+getComputedStyle(canvas).getPropertyValue("width").slice(0, -2) * dpi) - this.radius + 1) + this.radius));
    this.y = Math.floor((Math.random() * ((+getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) * dpi) - this.radius + 1) + this.radius));
    this.color = colors[Math.round(Math.random() * colors.length)];
    this.speed = Math.round((Math.random() * 10)) / 20;

    this.grow = function () {
        ctx.beginPath();
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 0.1;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 8;
        ctx.stroke();
        ctx.fillStyle = "#000000";
        ctx.fill();
        ctx.closePath();

        this.radius = this.radius + this.speed;

        if (this.radius > (Math.random() * 20000)) {
            this.radius = Math.round((Math.random() * 1));
            this.x = Math.floor((Math.random() * ((+getComputedStyle(canvas).getPropertyValue("width").slice(0, -2) * dpi) - this.radius + 1) + this.radius));
            this.y = Math.floor((Math.random() * ((+getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) * dpi) - this.radius + 1) + this.radius));
            this.color = colors[Math.round(Math.random() * colors.length)];
            this.speed = Math.round((Math.random() * 10)) / 20;
        }
    };
};

for (var i = 0; i < particle_count; i++) {
    fix_dpi();
    var particle = new Particle();
    particles.push(particle);
}

function animate() {
    fix_dpi();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < particle_count; i++) {
        particles[i].grow();
    }
    requestAnimFrame(animate);
}

animate();