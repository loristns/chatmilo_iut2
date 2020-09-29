import * as wisty from 'wisty';

const bow = new wisty.featurizers.BOW(200);

const frenchEmbeddings = new wisty.tools.KeyedVectors({
    loaderFunction: async () => fetch('./fr.wiki.bpe.vs5000.d25.w2v.json').then(
        (response) => response.text()
    ),
    size: 25,
    tokenization: 'byte_pair',
    maxDistance: 0,
    unknownKey: '<unk>'
});

const wordFeatures = new wisty.featurizers.WordEmbedding(frenchEmbeddings);

const classSlot = new wisty.slots.CategoricalSlot({
    name: 'class',
    categories: {
        m3100: [
            'M3100', 'm3100', 'semaine anglaise', 'semaine bloquée en anglais'
        ],
        m3101: [
            'M3101', 'm3101', "principe des systèmes d'exploitation",
            "systèmes d'exploitation", 'OS'
        ],
        m3102: [
            'M3102', 'm3102', 'services réseaux', 'réseau'
        ],
        m3103: [
            'M3103', 'm3103', 'algorithmique avancée', 'algorithmique', 'algo'
        ],
        m3105: [
            'M3105', 'm3105', 'C++', 'c++', 'Programmation objet avancée', 'C plus plus'
        ],
        m3106c: [
            'M3106C', 'm3106c', 'M3106', 'm3106', 'base de données avancées',
            'base de données', 'bdd', 'BDD'
        ],
        m3201: [
            'M3201', 'm3201', 'Probabilité et statistiques', 'proba', 'stat',
            'probabilités', 'statistiques'
        ],
        m3202c: [
            'M3202C', 'm3202c', 'M3202', 'm3202', 'Modélisation mathématiques',
            'modélisation', 'maths'
        ],
        m3205: [
            'M3205', 'm3205', 'Communication professionnelle', 'communication',
            'comm', 'com'
        ],
        m3206: [
            'M3206', 'm3206', 'Anglais 3', 'Anglais', 'anglais', 'english'
        ],
        m3301: [
            'M3301', 'm3301', "Méthodologie de la production d'applications",
            'projet'
        ],
        m3302: [
            'M3302', 'm3302', 'Semaine bloquée de C'
        ],
        m3303: [
            'M3303', 'm3303', 'Préciser son projet', 'PPP', 'ppp'
        ],
        m3104: [
            'M3104', 'm3104', 'Programmation web coté serveur', 'PHP', 'php', 'web'
        ],
        m3204: [
            'M3204', 'm3204', "Gestion des systèmes d'information",
            'Gestion des SI'
        ],
        m3203: [
            'M3203', 'm3203', 'Droit des TIC',
            "Droit des technologies de l'information", 'droit'
        ],
        m4106: [
            'M4106', 'm4106', 'Projets tutorés', "Projets d'approfondissement",
            'PT', 'pt'
        ]
    },
    dependantActions: ['openClass'],
    invDependantActions: ['askClass']
});

const actionRules = new wisty.featurizers.ActionFeaturizer({
    maskPreviousAction: false
});

const bot = new wisty.models.HCN({
    actions: ['openADE', 'askClass', 'openClass', 'openNotes', 'openZimbra', 'help', 'unknown', 'LUS'],
    featurizers: [bow, wordFeatures, classSlot, actionRules],
    hiddenSize: 16,
    temperature: 2
});

export const nlu = new wisty.tools.NLUFormatter({
    model: bot,
    slots: [classSlot]
});

export async function train() {
    await bot.init();

    const dataset = await fetch('./dataset.md').then((response) => response.text());
    const { stories } = wisty.tools.parseWistyML(dataset);

    await bot.train({
        stories,
        nEpochs: 25,
        onEpochEnd: (metrics) => console.log('Train: ', metrics)
    });

    console.log(bot.export());
}

export async function load() {
    await bot.init();

    const model = await fetch('./model.json').then((response) => response.text());
    bot.load(model);
}

export const actions = {
    openADE: {
        message: 'Ouverture de votre agenda',
        url: 'https://scolarite-informatique.iut2.univ-grenoble-alpes.fr/app/edtGroupe.php'
    },

    askClass: {
        message: 'Quel module souhaitez-vous ouvrir ?'
    },

    openClass: {
        message: 'Ouverture du module $class',
        url: 'https://chamilo.iut2.univ-grenoble-alpes.fr/courses/INFO$class/index.php'
    },

    openNotes: {
        message: 'Ouverture de votre bulletin de notes',
        url: 'https://scolarite-informatique.iut2.univ-grenoble-alpes.fr/app/ficheEtudiant.php'
    },

    openZimbra: {
        message: 'Ouverture de votre messagerie Zimbra',
        url: 'https://webmail.etu.univ-grenoble-alpes.fr'
    },

    unknown: {
        message: 'Désolé, je ne peut pas répondre à votre requête. Je peut ouvrir vos cours, vos mails, vos notes et votre agenda.'
    },

    help: {
        message: 'Je suis Chatmilo, je peut ouvrir vos cours, vos mails, vos notes et votre agenda.'
    }
};
