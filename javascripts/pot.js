const DINOSAUR_NAMES = { "achillobator": 2, "acrocanthosaurus": 4, "albertaceratops": 2, "alioramus": 2, "allosaurus": 3, "amargasaurus": 3, "ampelosaurus": 4, "anodontosaurus": 3, "apatosaurus": 4, "argentinosaurus": 5, "barsboldia": 4, "camptosaurus": 1, "carnotaurus": 2, "ceratosaurus": 2, "citipati": 2, "compsognathus": 0, "concavenator": 2, "daspletosaurus": 3, "deinocheirus": 4, "deinonychus": 1, "deinosuchus": 4, "dilophosaurus": 2, "dimetrodon": 3, "dracoviper": 3, "dryosaurus": 0, "eotriceratops": 4, "eurhinosaurus": 2, "giganotosaurus": 4, "hatzegopteryx": 2, "iguanodon": 3, "kaiwhekea": 2, "kaprosuchus": 2, "kelenken": 2, "kentrosaurus": 2, "kryptops": 3, "lambeosaurus": 2, "latenivenatrix": 1, "maip": 3, "megalania": 2, "metriacanthosaurus": 2, "miragaia": 3, "moraquile": 4, "mosasaurus": 4, "nasutoceratops": 3, "noviana": 3, "nyctatyrannus": 3, "ocepechelon": 3, "ophis": 4, "pachycephalosaurus": 2, "parasaurolophus": 4, "psittacosaurus": 1, "pycnonemosaurus": 3, "quetzalcoatlus": 2, "rhamphorhynchus": 0, "sachicasaurus": 4, "sarcosuchus": 3, "smilodon": 2, "spinosaurus": 4, "stegosaurus": 3, "struthiomimus": 1, "styracosaurus": 2, "suchomimus": 3, "susecdurus": 3, "thalassodromeus": 1, "therizinosaurus": 3, "tyrannosaurus": 4, "utahraptor": 2, "yunnanosaurus": 3, "yutyrannus": 3 }

/**
 * Add tiers after each dinosaur name, because.
 */

document$.subscribe(function () {

    const dinosaurRegex = new RegExp(Object.keys(DINOSAUR_NAMES).join('|'), 'gi');
    const elements = document.querySelectorAll('.md-content li');

    elements.forEach((span) => {
        const newContent = span.innerHTML.replace(dinosaurRegex, (match) => {
            const tier = DINOSAUR_NAMES[match.toLowerCase()]; // Convert match to lowercase
            return `
          <span class="tier-wrapper">
            <span class="tier-name">
              <a href="/docs/dinos/${match.toLowerCase()}">
                ${match}
              </a>
            </span>
            <span class="tier-badge tier-${tier}">
              ${tier}
            </span>
          </span>
        `;
        });

        span.innerHTML = newContent;
    });

});

/** 
 * Add the smöl dinosaur icons to the menu.
 */

document$.subscribe(function () {

    document.querySelectorAll('li.md-nav__item span.md-ellipsis').forEach(span => {

        const text = span.textContent.match(/[a-zA-Z]/g);

        if (!text) return;

        const dinosaurName = text.join('');
        if (!DINOSAUR_NAMES[dinosaurName]) return;

        const img_path = `/assets/images/dinos/${dinosaurName.toLowerCase()}.webp`;

        const img = new Image();
        img.src = img_path;

        img.onload = () => {
            img.width = 16;
            img.height = 16;
            span.parentNode.insertBefore(img, span);
        };

    });
});
