/**
 * SQUELETTON
 * {
      id: 1,
      nom: 'PROCEDURE',
      solrSearch: true,
      ancre: null,
      instances: [
        {
          nom: 'PROCEDURE',
          description: 'Procédure',
          affichageFonctionnel: '{MNEMONIQUE_PROCEDURE}',
          form: false
        },
        {
          nom: 'COURRIER',
          description: 'Courrier',
          affichageFonctionnel: '{NUMERO_PROCEDURE}',
          form: false
        }
      ],
      attributs: [
        {
          sousObjet: '',
          nom: '',
          libelle: '',
          libelleLong: '',
          referentiel: '',
          taille: '',
          hauteur: '',
          offsetG: '',
          position: '',
          aLaLigne: '',
          required: '',
          type: '',
          typeIHM: '',
          indexSolr: '',
          solrSearch: '',
          cleFonc: '',
          entitesAssociees: '',
          systCentraux: [],
          evolution: false,
          commentaire: ''
        }
      ]
    }
 */

export default {
  1: {
    id: 1,
    nom: 'PROCEDURE',
    solrSearch: true,
    ancre: null,
    instances: [
      {
        nom: 'PROCEDURE',
        description: 'Procédure',
        affichageFonctionnel: '{MNEMONIQUE_PROCEDURE}',
        form: false
      },
      {
        nom: 'COURRIER',
        description: 'Courrier',
        affichageFonctionnel: '{NUMERO_PROCEDURE}',
        form: false
      }
    ],
    attributs: [
      {
        sousObjet: '',
        nom: 'NUMERO_PROCEDURE',
        libelle: 'Numéro de procédure',
        libelleLong: '',
        referentiel: '',
        taille: 4,
        hauteur: 1,
        offsetG: '',
        position: 1,
        aLaLigne: true,
        required: false,
        type: 'TEXTE',
        typeIHM: '',
        indexSolr: true,
        solrSearch: true,
        cleFonc: 0,
        entitesAssociees: 'COURRIER',
        evolution: false,
        commentaire: ''
      }
    ]
  },
  2: {
    id: 2,
    nom: 'PIECE_PROCEDURE',
    solrSearch: true,
    ancre: null,
    instances: [
      {
        nom: 'PROCEDURE',
        description: 'Procédure',
        affichageFonctionnel: '{MNEMONIQUE_PROCEDURE}',
        form: false
      },
      {
        nom: 'COURRIER',
        description: 'Courrier',
        affichageFonctionnel: '{NUMERO_PROCEDURE}',
        form: false
      }
    ],
    attributs: [
      {
        sousObjet: '',
        nom: '',
        libelle: '',
        libelleLong: '',
        referentiel: '',
        taille: '',
        hauteur: '',
        offsetG: '',
        position: '',
        aLaLigne: '',
        required: '',
        type: '',
        typeIHM: '',
        indexSolr: '',
        solrSearch: '',
        cleFonc: '',
        entitesAssociees: '',
        systCentraux: [],
        evolution: false,
        commentaire: ''
      }
    ]
  },
  3: {
    id: 3,
    nom: 'PERSONNE_PHYSIQUE',
    solrSearch: true,
    ancre: null,
    instances: [
      {
        nom: 'PROCEDURE',
        description: 'Procédure',
        affichageFonctionnel: '{MNEMONIQUE_PROCEDURE}',
        form: false
      }
    ],
    attributs: [
      {
        sousObjet: '',
        nom: '',
        libelle: '',
        libelleLong: '',
        referentiel: '',
        taille: '',
        hauteur: '',
        offsetG: '',
        position: '',
        aLaLigne: '',
        required: '',
        type: '',
        typeIHM: '',
        indexSolr: '',
        solrSearch: '',
        cleFonc: '',
        entitesAssociees: '',
        systCentraux: [],
        evolution: false,
        commentaire: ''
      }
    ]
  },
  4: {
    id: 4,
    nom: 'VEHICULE',
    solrSearch: true,
    ancre: null,
    instances: [
      {
        nom: 'VOITURE',
        description: 'Voiture',
        affichageFonctionnel: '{IMMATRICULATION}',
        form: false
      },
      {
        nom: 'BATEAU',
        description: 'Bateau',
        affichageFonctionnel: '{IMMATRICULATION}',
        form: false
      }
    ],
    attributs: [
      {
        sousObjet: '',
        nom: '',
        libelle: '',
        libelleLong: '',
        referentiel: '',
        taille: '',
        hauteur: '',
        offsetG: '',
        position: '',
        aLaLigne: '',
        required: '',
        type: '',
        typeIHM: '',
        indexSolr: '',
        solrSearch: '',
        cleFonc: '',
        entitesAssociees: '',
        systCentraux: [],
        evolution: false,
        commentaire: ''
      }
    ]
  }
}
