let io = new IO();

io.subscribe('data_waves');

io.on('connect', () => {
    console.log('connected');
});

io.on('data_waves', data => {
    const waves = [{
        name: 'delta', value: 0, property: 'sommeil profond'
    }, {
        name: 'theta', value: 0, property: 'sommeil léger'
    }, {
        name: 'alpha', value: 0, property: 'relaxation'
    }, {
        name: 'beta', value: 0, property: 'concentration'
    }, {
        name: 'gamma', value: 0, property: 'perception'
    }]

    let total = 0;

    for (let timestamp in data) {
        for (let wave of waves) {
            const value = Math.abs(data[timestamp]['Fpz_' + wave.name]);
            total += value;
            wave.value += value;
        }
    }

    const percent = (x) => (x / total * 100).toFixed(2);

    for (let wave of waves) {
        updateWave(percent(wave.value), wave.name);
    }

    updateDominantWave(waves.reduce((a, b) => a.value > b.value ? a : b));
});

function updateWave(value, key) {
    document.getElementById(key + '-percent').value = value;
    document.getElementById(key + '-value').innerHTML = value;
}

function updateDominantWave(wave) {
    document.getElementById('dominant-wave').innerHTML = wave.name;
    document.getElementById('dominant-wave-property').innerHTML = wave.property;
}