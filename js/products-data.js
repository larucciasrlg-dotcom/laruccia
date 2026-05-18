const productSections = [
  {
    id: "ceramiche",
    title: "Ceramiche",
    subtitle: "Collezioni d'eccellenza",
    description: "Superfici dove l’innovazione incontra l’estetica per dettagli architettonici unici.",
    brands: [
      { name: "41zero42", slug: "41zero42", image: "img/prodotti/ceramiche/ceramiche_41zero42.webp", alt: "41zero42" },
      { name: "Abk", slug: "Abk", image: "img/prodotti/ceramiche/ceramiche_abk.webp", alt: "Abk" },
      { name: "Argenta", slug: "Argenta", image: "img/prodotti/ceramiche/ceramiche_argenta.webp", alt: "Argenta" },
      { name: "Arpa", slug: "Arpa", image: "img/prodotti/ceramiche/ceramiche_arpa.webp", alt: "Arpa" },
      { name: "Antiche Fornaci D'Agostino", slug: "AnticheFornaciDAgostino", image: "img/prodotti/ceramiche/ceramiche_antiche-fornaci-dagostino.webp", alt: "Antiche Fornaci D'agostino" },
      { name: "Cerdisa", slug: "Cerdisa", image: "img/prodotti/ceramiche/ceramiche_cerdisa.webp", alt: "Cerdisa" },
      { name: "Cerdomus", slug: "Cerdomus", image: "img/prodotti/ceramiche/ceramiche_cerdomus.webp", alt: "Cerdomus" },
      { name: "Dado Ceramica", slug: "Dado", image: "img/prodotti/ceramiche/ceramiche_dadoceramica.webp", alt: "Dado" },
      { name: "Decoratori Bassanesi", slug: "DecoratoriBassanesi", image: "img/prodotti/ceramiche/ceramiche_decoratoribassanesi.webp", alt: "Decoratori Bassanesi" },
      { name: "Evoluzioni", slug: "Evoluzioni", image: "img/prodotti/ceramiche/ceramiche_evoluzioni.webp", alt: "Evoluzioni" },
      { name: "Flaviker", slug: "Flaviker", image: "img/prodotti/ceramiche/ceramiche_flaviker.webp", alt: "Flaviker" },
      { name: "Floor Italia", slug: "FloorItalia", image: "img/prodotti/ceramiche/ceramiche_flooritalia.webp", alt: "Floor Italia" },
      { name: "Florim", slug: "Florim", image: "img/prodotti/ceramiche/ceramiche_florim.webp", alt: "Florim" },
      { name: "Francesco De Maio", slug: "FrancescoDeMaio", image: "img/prodotti/ceramiche/ceramiche_francescodemaio.webp", alt: "Francesco De Maio" },
      { name: "Il Cavallino", slug: "IlCavallino", image: "img/prodotti/ceramiche/ceramiche_ilcavallino.webp", alt: "Il Cavallino" },
      { name: "Imso", slug: "Imso", image: "img/prodotti/ceramiche/ceramiche_imso.webp", alt: "Imso" },
      { name: "Kronos", slug: "Kronos", image: "img/prodotti/ceramiche/ceramiche_kronos.webp", alt: "Kronos" },
      { name: "Ktl", slug: "Ktl", image: "img/prodotti/ceramiche/ceramiche_ktl.webp", alt: "ktl" },
      { name: "Laminam", slug: "Laminam", image: "img/prodotti/ceramiche/ceramiche_laminam.webp", alt: "Laminam" },
      { name: "Mariner", slug: "Mariner", image: "img/prodotti/ceramiche/ceramiche_mariner.webp", alt: "Mariner" },
      { name: "Piemme", slug: "Piemme", image: "img/prodotti/ceramiche/ceramiche_piemme.webp", alt: "Piemme" },
      { name: "Provenza", slug: "Provenza", image: "img/prodotti/ceramiche/ceramiche_provenza.webp", alt: "Provenza" },
      { name: "Ricchetti", slug: "Ricchetti", image: "img/prodotti/ceramiche/ceramiche_ricchetti.webp", alt: "Ricchetti" },
      { name: "Saime", slug: "Saime", image: "img/prodotti/ceramiche/ceramiche_saime.webp", alt: "Saime" },
      { name: "Settecento", slug: "Settecento", image: "img/prodotti/ceramiche/ceramiche_settecento.webp", alt: "Settecento" },
      { name: "Studio One Equipe", slug: "StudioOneEquipe", image: "img/prodotti/ceramiche/ceramiche_studiooneequipe.webp", alt: "Studio One Equipe" }
    ]
  },
  {
    id: "pietre",
    title: "Pietre",
    subtitle: "Estetica Ancestrale",
    description: "Texture autentiche e venature naturali nate per conferire un carattere eterno allo spazio.",
    brands: [
      { name: "Artesia", slug: "Artesia", image: "img/prodotti/pietre/pietre_artesia.webp", alt: "Artesia" },
      { name: "Boxer", slug: "Boxer", image: "img/prodotti/pietre/pietre_boxer.webp", alt: "Boxer" },
      { name: "Mipa", slug: "Mipa", image: "img/prodotti/pietre/pietre_mipa.webp", alt: "Mipa" },
      { name: "Nero Sicilia", slug: "NeroSicilia", image: "img/prodotti/pietre/pietre_nerosicilia.webp", alt: "Nero Sicilia" },
      { name: "Pecchioli Franco", slug: "PecchioliFranco", image: "img/prodotti/pietre/pietre_pecchiolifranco.webp", alt: "Pecchioli Franco" },
      { name: "Salvatori Marmi", slug: "SalvatoriMarmi", image: "img/prodotti/pietre/pietre_salvatorimarmi.webp", alt: "Salvatori Marmi" },
      { name: "Oltremateria", slug: "Oltremateria", image: "img/prodotti/pietre/pietre_oltremateria.webp", alt: "Oltremateria" }
   ]
  },
{
  id: "parquet",
  title: "Parquet",
  subtitle: "Calore Naturale",
  description: "Essenze pregiate lavorate con maestria per trasformare ogni ambiente in un luogo accogliente.",
  brands: [
    { name: "Original Parquet", slug: "OriginalParquet", image: "img/prodotti/parquet/parquet_originalparquet.webp", alt: "Original Parquet" },
    { name: "CP Parquet", slug: "CPParquet", image: "img/prodotti/parquet/parquet_cpparquet.webp", alt: "CP Parquet" }
  ]
},
{
  id: "cartadaparati",
  title: "Carta da Parati",
  subtitle: "Visioni d'Arredo",
  description: "Trame decorative e design contemporaneo per trasformare le pareti in opere d'arte.",
  brands: [
    { name: "Inkiostro Bianco", slug: "InkiostroBianco", image: "img/prodotti/cartadaparati/cartadaparati_inkiostrobianco.webp", alt: "Inkiostro Bianco" },
    { name: "Rimura", slug: "Rimura", image: "img/prodotti/cartadaparati/cartadaparati_rimura.webp", alt: "Rimura" }
  ]
},
{
  id: "sanitari",
  title: "Sanitari",
  subtitle: "Purezza Formale",
  description: "L’equilibrio perfetto tra ergonomia e igiene attraverso linee essenziali in ceramica.",
  brands: [
    { name: "Flaminia", slug: "Flaminia", image: "img/prodotti/sanitari/sanitari_flaminia.webp", alt: "Flaminia" },
    { name: "GSG", slug: "GSG", image: "img/prodotti/sanitari/sanitari_gsg.webp", alt: "GSG" },
    { name: "Laufen", slug: "Laufen", image: "img/prodotti/sanitari/sanitari_laufen.webp", alt: "Laufen" },
    { name: "Nic", slug: "Nic", image: "img/prodotti/sanitari/sanitari_nic.webp", alt: "Nic" },
    { name: "Olympia", slug: "Olympia", image: "img/prodotti/sanitari/sanitari_olympia.webp", alt: "Olympia" },
    { name: "The Art Ceram", slug: "TheArtCeram", image: "img/prodotti/sanitari/sanitari_theartceram.webp", alt: "The Art Ceram" }
  ]
},
{
  id: "rubinetteria",
  title: "Rubinetteria",
  subtitle: "L'Essenza dell'Acqua",
  description: "Sistemi di erogazione e miscelatori nati per un'esperienza di puro benessere quotidiano.",
  brands: [
    { name: "Bongio", slug: "Bongio", image: "img/prodotti/rubinetteria/rubinetteria_bongio.webp", alt: "Bongio" },
    { name: "Cea", slug: "Cea", image: "img/prodotti/rubinetteria/rubinetteria_cea.webp", alt: "Cea" },
    { name: "Paini", slug: "Paini", image: "img/prodotti/rubinetteria/rubinetteria_paini.webp", alt: "Paini" },
    { name: "Ritmonio", slug: "Ritmonio", image: "img/prodotti/rubinetteria/rubinetteria_ritmonio.webp", alt: "Ritmonio" },
    { name: "Tubico", slug: "Tubico", image: "img/prodotti/rubinetteria/rubinetteria_tubico.webp", alt: "Tubico" },
    { name: "DMP", slug: "DMP", image: "img/prodotti/rubinetteria/rubinetteria_dmp.webp", alt: "DMP" },
    { name: "GME", slug: "GME", image: "img/prodotti/rubinetteria/rubinetteria_gme.webp", alt: "GME" },
    { name: "Zanetti Chini", slug: "ZanettiChini", image: "img/prodotti/rubinetteria/rubinetteria_zanettichini.webp", alt: "Zanetti Chini" }
  ]
},
{
  id: "arredobagno",
  title: "Arredo Bagno",
  subtitle: "Architetture Sartoriali",
  description: "Soluzioni su misura che combinano estetica e razionalità per organizzare lo spazio.",
  brands: [
    { name: "Antonio Lupi", slug: "AntonioLupi", image: "img/prodotti/arredobagno/arredobagno_antoniolupi.webp", alt: "Antonio Lupi" },
    { name: "Cerasa", slug: "Cerasa", image: "img/prodotti/arredobagno/arredobagno_cerasa.webp", alt: "Cerasa" },
    { name: "Inda", slug: "Inda", image: "img/prodotti/arredobagno/arredobagno_inda.webp", alt: "Inda" },
    { name: "Nic Design", slug: "NicDesign", image: "img/prodotti/arredobagno/arredobagno_nic.webp", alt: "Nic Design" },
    { name: "Rexa Design", slug: "RexaDesign", image: "img/prodotti/arredobagno/arredobagno_rexa.webp", alt: "Rexa Design" },
    { name: "Royo", slug: "Royo", image: "img/prodotti/arredobagno/arredobagno_royo.webp", alt: "Royo" },
    { name: "Taylor Made Stocco", slug: "TaylorMadeStocco", image: "img/prodotti/arredobagno/arredobagno_taylormade.webp", alt: "Taylor Made Stocco" },
    { name: "Xilon", slug: "Xilon", image: "img/prodotti/arredobagno/arredobagno_xilon.webp", alt: "Xilon" }
  ]
},
{
  id: "box-doccia",
  title: "Box Doccia",
  subtitle: "Spazi Rigeneranti",
  description: "Trasparenze cristalline e profili minimali per un'area doccia dal comfort superiore.",
  brands: [
    { name: "Inda", slug: "Inda", image: "img/box/inda.jpg", alt: "Inda" },
    { name: "Sphera Docce", slug: "SpheraDocce", image: "img/box/sphera.jpg", alt: "Sphera Docce" },
    { name: "Spring", slug: "Spring", image: "img/box/spring.jpg", alt: "Spring" },
    { name: "Thermodesign", slug: "Thermodesign", image: "img/box/thermodesign.jpg", alt: "Thermodesign" },
    { name: "GME", slug: "GME", image: "img/box/gme.jpg", alt: "GME" },
    { name: "Duplach", slug: "Duplach", image: "img/box/duplach.jpg", alt: "Duplach" }
  ]
},
{
  id: "wellness",
  title: "Wellness",
  subtitle: "Oasi di Benessere",
  description: "Dalle saune hi-tech agli arredi outdoor per una totale armonia tra mente e corpo.",
  brands: [
    { name: "Idromassaggio Treesse", slug: "Treesse", image: "img/wellness/treesse.jpg", alt: "Treesse" },
    { name: "Saune Effegibi", slug: "Effegibi", image: "img/wellness/effegibi.jpg", alt: "Effegibi" },
    { name: "Atmosphera", slug: "Atmosphera", image: "img/outdoor/atmosphera.jpg", alt: "Atmosphera" },
    { name: "Il Parco", slug: "IlParco", image: "img/outdoor/ilparco.jpg", alt: "Il Parco" },
    { name: "Caminetti Palazzetti", slug: "Palazzetti", image: "img/wellness/palazzetti.jpg", alt: "Palazzetti" }
  ]
},
{
  id: "radiatori",
  title: "Radiatori",
  subtitle: "Calore e Design",
  description: "Efficienza energetica e ricerca estetica per corpi scaldanti dalla presenza distintiva.",
  brands: [
    { name: "Brem", slug: "Brem", image: "img/radiatori/brem.jpg", alt: "Brem" },
    { name: "Lazzarini", slug: "Lazzarini", image: "img/radiatori/lazzarini.jpg", alt: "Lazzarini" },
    { name: "Brandoni", slug: "Brandoni", image: "img/radiatori/brandoni.jpg", alt: "Brandoni" }
  ]
},
{
  id: "specchi",
  title: "Specchi",
  subtitle: "Riflessi di Luce",
  description: "Superfici tecnologiche studiate per amplificare lo spazio con dettagli di pura luce.",
  brands: [
    { name: "Genexia", slug: "Genexia", image: "img/prodotti/specchi/specchi_genexia.jpg", alt: "Genexia" },
    { name: "Specchi Sartoriali", slug: "SpecchiSartoriali", image: "img/prodotti/specchi/specchi_specchi_sartoriali.png", alt: "Specchi Sartoriali" },
    { name: "Stocco", slug: "Stocco", image: "img/prodotti/specchi/specchi_stocco.jpg", alt: "Stocco" }
  ]
},
{
  id: "accessoribagno",
  title: "Accessori",
  subtitle: "Dettagli di Carattere",
  description: "Il tocco finale funzionale per aggiungere un accento stilistico coordinato al bagno.",
  brands: [
    { name: "Capannoli", slug: "Capannoli", image: "img/accessori/capannoli.jpg", alt: "Capannoli" },
    { name: "Colombo", slug: "Colombo", image: "img/accessori/colombo.jpg", alt: "Colombo" },
    { name: "Geelli", slug: "Geelli", image: "img/accessori/geelli.jpg", alt: "Geelli" }
  ]
}
];