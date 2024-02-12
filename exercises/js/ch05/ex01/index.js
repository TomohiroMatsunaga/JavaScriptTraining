scopeExample();

function scopeExample() {
    {
        const x = 1;
        console.log(x); // 1
    }

    {
        const x = 2;
        console.log(x); // 2
    }

    {
        const x = 3;
        console.log(x); // 3
    }
}