const express = require('express');
const path = require('path');
const hbs = require('hbs');
const fs = require('fs');

const app = express();
const PORT = 3000;

/* ===========================
   CONFIGURACIÓN GENERAL
=========================== */

// Carpeta pública (CSS)
app.use(express.static(path.join(__dirname, '../public')));

// Motor de plantillas
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Registrar parciales
hbs.registerPartials(path.join(__dirname, 'views/partials'));

/* ===========================
   HELPER lte (menor o igual)
=========================== */
hbs.registerHelper('lte', function (a, b) {
    return a <= b;
});

/* ===========================
   RUTA PRINCIPAL "/"
   Usa SOLO site.json
=========================== */
app.get('/', (req, res) => {

    const siteData = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'data/site.json'), 'utf-8')
    );

    res.render('index', siteData);
});

/* ===========================
   RUTA "/informe"
   Usa 3 JSON combinados
=========================== */
app.get('/informe', (req, res) => {

    const siteData = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'data/site.json'), 'utf-8')
    );

    const citiesData = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'data/cities.json'), 'utf-8')
    );

    const countriesData = JSON.parse(
        fs.readFileSync(path.join(__dirname, 'data/countries.json'), 'utf-8')
    );

    res.render('informe', {
        title: siteData.title,
        subtitle: siteData.subtitle,
        cities: citiesData.cities,
        countries: countriesData.countries,
        limit: 800000
    });
});

/* ===========================
   INICIAR SERVIDOR
=========================== */
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});