/**
 * SQUELETTON
 *
 {
   id: 1,
   source: 1,
   target: 2
 }
 */

export default [
  {
    id: 1,
    source: 1,
    target: 2,
    linksType: [
      'Fond de dossier'
    ]
  },
  {
    id: 2,
    source: 2,
    target: 3,
    linksType: [
      'Rédacteur',
      'Assisté de',
      'En compagnie de',
      'En présence de'
    ]
  },
  {
    id: 3,
    source: 3,
    target: 4,
    linksType: [
      'Propriétaire',
      'Locataire'
    ]
  },
  {
    id: 4,
    source: 2,
    target: 4,
    linksType: [
      'Mis en cause'
    ]
  },
  {
    id: 5,
    source: 1,
    target: 3,
    linksType: [
      'Victime',
      'Mis en cause',
      'Victime et mis en cause'
    ]
  }
]
