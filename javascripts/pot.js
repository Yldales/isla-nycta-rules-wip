const DINOSAUR_NAMES = { "Achillobator": 2, "Acrocanthosaurus": 4, "Albertaceratops": 2, "Alioramus": 2, "Allosaurus": 3, "Amargasaurus": 3, "Ampelosaurus": 4, "Anodontosaurus": 3, "Apatosaurus": 4, "Argentinosaurus": 5, "Barsboldia": 4, "Camptosaurus": 1, "Carnotaurus": 2, "Ceratosaurus": 2, "Citipati": 2, "Compsognathus": 0, "Concavenator": 2, "Daspletosaurus": 3, "Deinocheirus": 4, "Deinonychus": 1, "Deinosuchus": 4, "Dilophosaurus": 2, "Dimetrodon": 3, "Dracoviper": 3, "Dryosaurus": 0, "Eotriceratops": 4, "Eurhinosaurus": 2, "Giganotosaurus": 4, "Hatzegopteryx": 2, "Iguanodon": 3, "Kaiwhekea": 2, "Kaprosuchus": 2, "Kelenken": 2, "Kentrosaurus": 2, "Kryptops": 3, "Lambeosaurus": 2, "Latenivenatrix": 1, "Maip": 3, "Megalania": 2, "Metriacanthosaurus": 2, "Miragaia": 3, "Moraquile": 4, "Mosasaurus": 4, "Nasutoceratops": 3, "Noviana": 3, "Nyctatyrannus": 3, "Ocepechelon": 3, "Ophis": 4, "Pachycephalosaurus": 2, "Parasaurolophus": 4, "Psittacosaurus": 1, "Pycnonemosaurus": 3, "Quetzalcoatlus": 2, "Rhamphorhynchus": 0, "Sachicasaurus": 4, "Sarcosuchus": 3, "Smilodon": 2, "Spinosaurus": 4, "Stegosaurus": 3, "Struthiomimus": 1, "Styracosaurus": 2, "Suchomimus": 3, "Susecdurus": 3, "Thalassodromeus": 1, "Therizinosaurus": 3, "Tyrannosaurus": 4, "Utahraptor": 2, "Yunnanosaurus": 3, "Yutyrannus": 3 }

/**
 * Add tiers after each dinosaur name, because.
 */

document$.subscribe(function () {

    Object.entries(DINOSAUR_NAMES).forEach(([name, tier]) => {

        const regex = new RegExp(name, 'gi');
        const elements = document.querySelectorAll('.md-content li');

        elements.forEach(span => {

            if (!regex.test(span.textContent)) return;

            console.log(span);

            // Put the occurrence in a flexible span.
            const newContent = span.textContent.replace(regex, match => `
                <span class="tier-wrapper">
                    <span class="tier-name">
                        <a href="/docs/dinos/${name.toLowerCase()}">
                            ${match}
                        </a>
                    </span>
                    <span class="tier-badge tier-${tier}">
                        ${tier}
                    </span>
                </span>
            `);
            span.innerHTML = newContent;

        });
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
