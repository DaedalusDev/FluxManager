export const CONST = {
  dataStructure: {
    entity: {
      id: {
        type: Number,
        label: 'Id'
      },
      nom: {
        type: String,
        label: 'Nom'
      },
      solrSearch: {
        type: Boolean,
        label: 'Recherche Solr'
      },
      ancre: {
        type: String,
        label: 'Ancre'
      },
      instances: {
        type: Array,
        label: 'Instances',
        _format: {
          nom: {
            type: String,
            label: 'Nom'
          },
          description: {
            type: String,
            label: 'Description'
          },
          affichageFonctionnel: {
            type: String,
            label: 'Affichage fonctionnel'
          },
          form: {
            type: Boolean,
            label: 'Form generator'
          }
        }
      },
      attributs: {
        type: Array,
        label: 'Attributs',
        _format: {
          nomDuChamp: {
            type: String,
            label: 'Nom du champ'
          },
          lien: {
            type: String,
            label: 'Lien'
          },
          sousObjet: {
            type: String,
            label: 'Sous objet'
          },
          libelle: {
            type: String,
            label: 'Libelle'
          },
          libelleLong: {
            type: String,
            label: 'Libelle long'
          },
          referentiel: {
            type: String,
            label: 'Référentiel'
          },
          taille: {
            type: Number,
            label: 'Taille'
          },
          hauteur: {
            type: Number,
            label: 'Hauteur'
          },
          offsetG: {
            type: Number,
            label: 'Offset G.'
          },
          position: {
            type: Number,
            label: 'Position'
          },
          aLaLigne: {
            type: Boolean,
            label: 'A la ligne'
          },
          required: {
            type: Boolean,
            label: 'Obligatoire'
          },
          type: {
            type: String,
            label: 'Type'
          },
          typeIHM: {
            type: String,
            label: 'Type IHM'
          },
          indexSolr: {
            type: Boolean,
            label: 'Index Solr'
          },
          rechercheSolr: {
            type: Boolean,
            label: 'Recherche Solr'
          },
          cleFonc: {
            type: Number,
            label: 'Clé fonc.'
          },
          entitesAssociees: {
            type: String,
            label: 'Entités asso.'
          },
          evolution: {
            type: Boolean,
            label: 'Évolution'
          },
          commentaire: {
            type: String,
            label: 'Commentaire'
          }
        }
      }
    }
  }
}

const ApplicationConst = {
  install (Vue) {
    Vue.prototype.CONST = CONST
  }
}

export default ApplicationConst
